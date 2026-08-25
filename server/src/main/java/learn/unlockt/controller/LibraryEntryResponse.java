package learn.unlockt.controller;

import learn.unlockt.model.Game;
import learn.unlockt.model.LibraryEntry;

import java.time.LocalDateTime;
import java.util.UUID;

public record LibraryEntryResponse(
        UUID id,
        UUID gameId,
        String title,
        String coverArtUrl,
        String platform,
        String genre,
        String steamAppId,
        String status,
        Integer overallRating,
        Integer difficultyRating,
        String notes,
        LocalDateTime addedAt,
        LocalDateTime updatedAt) {

    public static LibraryEntryResponse from(LibraryEntry entry) {
        Game game = entry.getGame();

        return new LibraryEntryResponse(
                entry.getId(),
                game.getId(),
                game.getTitle(),
                game.getCoverArtUrl(),
                game.getPlatform(),
                game.getGenre(),
                game.getSteamAppId(),
                entry.getStatus().name(),
                entry.getOverallRating(),
                entry.getDifficultyRating(),
                entry.getNotes(),
                entry.getAddedAt(),
                entry.getUpdatedAt());
    }
}
