package learn.unlockt.data;

import java.util.UUID;

public record AchievementLeaderboardRow(UUID achievementId, UUID gameId, String name, String iconUrl,
                                        String gameTitle, Double averageDifficulty, Long voteCount) {
}
