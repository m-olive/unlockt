package learn.unlockt.data;

import java.util.UUID;

public record AchievementRatingRow(UUID achievementId, Double averageDifficulty, Long voteCount) {
}
