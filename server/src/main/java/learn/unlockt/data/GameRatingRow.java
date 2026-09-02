package learn.unlockt.data;

import java.util.UUID;

public record GameRatingRow(UUID gameId, Double averageDifficulty, Long voteCount) {
}
