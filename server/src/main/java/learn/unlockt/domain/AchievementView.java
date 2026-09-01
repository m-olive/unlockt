package learn.unlockt.domain;

import java.time.LocalDateTime;
import java.util.UUID;

public record AchievementView(
    UUID achievementId,
    String name,
    String description,
    String iconUrl,
    boolean unlocked,
    LocalDateTime unlockedAt,
    Integer difficultyRating
) {}