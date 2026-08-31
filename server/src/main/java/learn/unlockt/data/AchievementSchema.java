package learn.unlockt.data;

public record AchievementSchema(
        String steamKey,
        String displayName,
        String description,
        String icon
) {}
