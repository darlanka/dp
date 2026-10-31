package dev.praneeth.portfolio.contact;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ContactService {

    private static final Duration WINDOW = Duration.ofHours(1);

    private final ObjectMapper mapper;
    private final Path file;
    private final int limitPerHour;
    private final Map<String, Deque<Instant>> recentByIp = new ConcurrentHashMap<>();

    public ContactService(ObjectMapper mapper,
                          @Value("${portfolio.contact.file}") String file,
                          @Value("${portfolio.contact.limit-per-hour}") int limitPerHour) {
        this.mapper = mapper;
        this.file = Path.of(file);
        this.limitPerHour = limitPerHour;
    }

    public void save(ContactRequest request, String ip) {
        checkRate(ip);

        var entry = Map.of(
                "receivedAt", Instant.now().toString(),
                "name", request.name().strip(),
                "email", request.email().strip(),
                "message", request.message().strip());

        try {
            String line = mapper.writeValueAsString(entry) + System.lineSeparator();
            writeLine(line);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Could not serialise message", e);
        }
    }

    // Several requests can arrive together, so appends are serialised.
    private synchronized void writeLine(String line) {
        try {
            Path parent = file.toAbsolutePath().getParent();
            if (parent != null) {
                Files.createDirectories(parent);
            }
            Files.writeString(file, line, StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (IOException e) {
            throw new UncheckedIOException("Could not store message", e);
        }
    }

    private void checkRate(String ip) {
        Deque<Instant> hits = recentByIp.computeIfAbsent(ip, key -> new ArrayDeque<>());
        Instant cutoff = Instant.now().minus(WINDOW);
        synchronized (hits) {
            while (!hits.isEmpty() && hits.peekFirst().isBefore(cutoff)) {
                hits.pollFirst();
            }
            if (hits.size() >= limitPerHour) {
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Too many messages");
            }
            hits.addLast(Instant.now());
        }
    }
}
