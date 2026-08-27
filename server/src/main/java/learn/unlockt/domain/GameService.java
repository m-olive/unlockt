package learn.unlockt.domain;

import learn.unlockt.data.GameRepository;
import learn.unlockt.data.LibraryEntryRepository;
import learn.unlockt.model.Game;
import learn.unlockt.model.LibraryEntry;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GameService {
    private final GameRepository repository;
    private final LibraryEntryRepository libraryEntryRepository;

    public GameService(GameRepository repository, LibraryEntryRepository libraryEntryRepository) {
        this.repository = repository;
        this.libraryEntryRepository = libraryEntryRepository;
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
