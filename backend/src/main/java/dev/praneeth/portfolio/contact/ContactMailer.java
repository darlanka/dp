package dev.praneeth.portfolio.contact;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

/** Emails each contact message to the site owner. Runs in the background so the form never waits on Gmail. */
@Component
public class ContactMailer {

    private static final Logger log = LoggerFactory.getLogger(ContactMailer.class);

    private final ObjectProvider<JavaMailSender> mailSender;
    private final String to;
    private final String from;

    public ContactMailer(ObjectProvider<JavaMailSender> mailSender,
                         @Value("${portfolio.contact.notify-to:}") String to,
                         @Value("${spring.mail.username:}") String from) {
        this.mailSender = mailSender;
        this.to = to;
        this.from = from;
    }

    @Async
    public void send(ContactRequest request) {
        JavaMailSender sender = mailSender.getIfAvailable();
        if (sender == null || to.isBlank() || from.isBlank()) {
            log.warn("Email is not configured. The message was saved to the file only.");
            return;
        }

        var mail = new SimpleMailMessage();
        mail.setFrom(from);
        mail.setTo(to);
        mail.setReplyTo(request.email().strip()); // hitting Reply in Gmail writes to the visitor
        mail.setSubject("Portfolio message from " + oneLine(request.name()));
        mail.setText("""
                Name: %s
                Email: %s

                %s
                """.formatted(oneLine(request.name()), request.email().strip(), request.message().strip()));

        try {
            sender.send(mail);
        } catch (MailException e) {
            log.error("Could not send the contact email", e);
        }
    }

    // Line breaks in a header value could be used to inject extra headers.
    private static String oneLine(String text) {
        return text.replaceAll("[\\r\\n]+", " ").strip();
    }
}