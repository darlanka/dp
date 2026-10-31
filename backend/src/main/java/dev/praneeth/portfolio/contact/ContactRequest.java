package dev.praneeth.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank @Size(max = 80) String name,
        @NotBlank @Email @Size(max = 120) String email,
        @NotBlank @Size(min = 10, max = 2000) String message,
        // Honeypot. The form hides this field, so only bots fill it in.
        String website) {

    public boolean looksLikeBot() {
        return website != null && !website.isBlank();
    }
}
