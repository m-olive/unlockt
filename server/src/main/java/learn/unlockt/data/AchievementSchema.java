package learn.unlockt.data;

public record AchievementSchema(
        String steamKey,
        String name,
        String description,
        String iconUrl
) {}
