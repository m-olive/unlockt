package learn.unlockt.data;

import java.util.UUID;

public record LeaderboardRow(UUID gameId,
                             String title,
                             String coverArtUrl,
                             Double averageDifficulty,
                             Long voteCount) {}
