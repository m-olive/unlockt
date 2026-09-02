package learn.unlockt.domain;

import learn.unlockt.data.GameRatingRow;
import learn.unlockt.data.GameRepository;
import learn.unlockt.data.LibraryEntryRepository;
import learn.unlockt.model.Game;
import learn.unlockt.model.LibraryEntry;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GameService {
    private static final int BROWSE_SAMPLE_SIZE = 25;

    private final GameRepository repository;
    private final LibraryEntryRepository libraryEntryRepository;

    public GameService(GameRepository repository, LibraryEntryRepository libraryEntryRepository) {
        this.repository = repository;
        this.libraryEntryRepository = libraryEntryRepository;
    }

    public List<GameSearchView> search(String q) {
        List<Game> games = q == null || q.isBlank()
                ? repository.findRandomSample(BROWSE_SAMPLE_SIZE)
                : repository.findTop50ByTitleContainingIgnoreCaseOrderByTitleAsc(q.trim());

        if (games.isEmpty()) {
            return List.of();
        }

        Map<UUID, GameRatingRow> ratings = libraryEntryRepository
                .findRatingsByGameIds(games.stream().map(Game::getId).toList())
                .stream()
                .collect(Collectors.toMap(GameRatingRow::gameId, row -> row));

        return games.stream()
                .map(game -> {
                    GameRatingRow row = ratings.get(game.getId());

                    return new GameSearchView(
                            game.getId(),
                            game.getTitle(),
                            game.getCoverArtUrl(),
                            row == null ? null : row.averageDifficulty(),
                            row == null ? 0 : row.voteCount());
                })
                .toList();
    }

    public Game findById(UUID gameId) {
        return repository.findById(gameId).orElse(null);
    }

    public Double findAverageDifficulty(UUID gameId) {
        return libraryEntryRepository.findAverageDifficultyByGameId(gameId);
    }

    public long countDifficultyRatings(UUID gameId) {
        return libraryEntryRepository.countByGameIdAndDifficultyRatingNotNull(gameId);
    }

    public Double findAverageOverallRating(UUID gameId) {
        return libraryEntryRepository.findAverageOverallRatingByGameId(gameId);
    }

    public long countOverallRatings(UUID gameId) {
        return libraryEntryRepository.countByGameIdAndOverallRatingNotNull(gameId);
    }

    public LibraryEntry findEntry(UUID userId, UUID gameId) {
        if (userId == null) {
            return null;
        }

        return libraryEntryRepository.findByUserIdAndGameId(userId, gameId).orElse(null);
    }
}
