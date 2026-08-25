package learn.unlockt.controller;

import java.util.UUID;

public record LibraryEntryRequest(
        UUID gameId,
        String status,
        Integer overallRating,
        Integer difficultyRating,
        String notes) {
}
