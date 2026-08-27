package learn.unlockt.controller;

import learn.unlockt.model.Game;
import learn.unlockt.model.LibraryEntry;

import java.util.UUID;

public record GameDetailResponse(
        UUID gameId,
        String title,
        String coverArtUrl,
        String platform,
        String genre,
        String steamAppId,
        Double averageOverallRating,
        long overallRatingCount,
        Double averageDifficulty,
        long difficultyRatingCount,
        boolean owned,
        LibraryEntryResponse entry) {

    public static GameDetailResponse from(Game game, Double averageOverallRating, long overallRatingCount,
                                          Double averageDifficulty, long difficultyRatingCount, LibraryEntry entry) {
        return new GameDetailResponse(
                game.getId(),
                game.getTitle(),
                game.getCoverArtUrl(),
                game.getPlatform(),
                game.getGenre(),
                game.getSteamAppId(),
                averageOverallRating,
                overallRatingCount,
                averageDifficulty,
                difficultyRatingCount,
                entry != null,
                entry == null ? null : LibraryEntryResponse.from(entry));
    }
}
