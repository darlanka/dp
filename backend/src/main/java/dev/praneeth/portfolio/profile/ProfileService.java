package dev.praneeth.portfolio.profile;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProfileService {

    private final Profile profile;

    // Read once at startup. If the JSON is malformed the app refuses to start,
    // which is better than serving a half-empty site.
    public ProfileService(ObjectMapper mapper) {
        try (InputStream in = new ClassPathResource("profile.json").getInputStream()) {
            this.profile = mapper.readValue(in, Profile.class);
        } catch (IOException e) {
            throw new UncheckedIOException("Could not read profile.json", e);
        }
    }

    public Profile get() {
        return profile;
    }
}
