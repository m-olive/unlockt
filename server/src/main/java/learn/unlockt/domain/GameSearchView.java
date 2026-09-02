package learn.unlockt.domain;

import java.util.UUID;

public record GameSearchView(UUID gameId, String title, String coverArtUrl, Double averageDifficulty, long voteCount) {
}
