package dev.praneeth.portfolio.profile;

import java.util.List;

import dev.praneeth.portfolio.profile.Profile.ProjectImage;
import dev.praneeth.portfolio.profile.Profile.ProjectLink;

/**
 * Everything the site shows. Loaded from profile.json so content changes never
 * need a rebuild of the UI.
 */
public record Profile(
        String name,
        String title,
        String location,
        String tagline,
        String focus,
        List<String> about,
        Links links,
        List<Job> experience,
        List<Project> projects,
        List<Research> research,
        List<SkillGroup> skills,
        Education education,
        List<String> achievements,
        List<Metric> metrics) {

    public record Links(String email, String github, String linkedin) {
    }

    /** summary and certificate are optional and may be null. */
    public record Job(String company, String role, String period, String location, String summary,
            List<String> highlights, Certificate certificate) {
    }

    public record Certificate(String label, String src) {
    }

    public record Project(String title, String context, String summary, List<String> highlights,
            List<String> stack, List<String> steps, List<ProjectImage> images,
            List<ProjectLink> links, String embedUrl) {
    }

    public record ProjectImage(String src, String alt, String caption) {
    }

    public record ProjectLink(String label, String url) {
    }

    public record Research(String title, String stack, String venue, List<String> highlights) {
    }

    public record SkillGroup(String label, List<String> items) {
    }

    public record Education(String school, String degree, String period, String score) {
    }

    public record Metric(String tag, String label, int value, String prefix, String suffix) {
    }
}
