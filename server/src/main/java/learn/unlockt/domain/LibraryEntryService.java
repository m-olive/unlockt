package learn.unlockt.domain;

import learn.unlockt.data.GameRepository;
import learn.unlockt.data.LibraryEntryRepository;
import learn.unlockt.data.UserRepository;
import learn.unlockt.model.Game;
import learn.unlockt.model.LibraryEntry;
import learn.unlockt.model.LibraryStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LibraryEntryService {
    private final LibraryEntryRepository repository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    public LibraryEntryService(LibraryEntryRepository repository, GameRepository gameRepository, UserRepository userRepository) {
        this.repository = repository;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<LibraryEntry> findByUserId(UUID userId, LibraryStatus status, String genre, String platform, String sort) {
        List<LibraryEntry> entries = repository.findAllByUserId(userId);

        return entries.stream()
                .filter(e -> status == null || e.getStatus() == status)
                .filter(e -> genre == null || genre.equalsIgnoreCase(e.getGame().getGenre()))
                .filter(e -> platform == null || platform.equalsIgnoreCase(e.getGame().getPlatform()))
                .sorted(comparatorFor(sort))
                .toList();
    }

    @Transactional(readOnly = true)
    public LibraryEntry findByIdAndUserId(UUID id, UUID userId) {
        return repository.findByIdAndUserId(id, userId).orElse(null);
    }

    @Transactional
    public Result<LibraryEntry> add(UUID userId, UUID gameId, LibraryEntry data) {
        Result<LibraryEntry> result = validate(data);
        if(!result.isSuccess()) {
            return result;
        }

        if(gameId == null) {
            result.addMessage("game id is required", ResultType.INVALID);
            return result;
        }

        Optional<Game> game = gameRepository.findById(gameId);
        if(game.isEmpty()) {
            result.addMessage("game not found", ResultType.NOT_FOUND);
            return result;
        }

        if(repository.existsByUserIdAndGameId(userId, gameId)) {
            result.addMessage("game is already in your library", ResultType.INVALID);
            return result;
        }

        LibraryEntry entry = new LibraryEntry();
        entry.setUser(userRepository.getReferenceById(userId));
        entry.setGame(game.get());
        entry.setStatus(data.getStatus() == null ? LibraryStatus.BACKLOG : data.getStatus());
        entry.setOverallRating(data.getOverallRating());
        entry.setDifficultyRating(data.getDifficultyRating());
        entry.setNotes(data.getNotes());

        result.setPayload(repository.save(entry));
        return result;
    }

    @Transactional
    public Result<LibraryEntry> update(UUID id, UUID userId, LibraryEntry data) {
        Result<LibraryEntry> result = validate(data);
        if(!result.isSuccess()) {
            return result;
        }

        Optional<LibraryEntry> existing = repository.findByIdAndUserId(id, userId);
        if(existing.isEmpty()) {
            result.addMessage("library entry not found", ResultType.NOT_FOUND);
            return result;
        }

        LibraryEntry entry = existing.get();
        if(data.getStatus() != null) {
            entry.setStatus(data.getStatus());
        }
        entry.setOverallRating(data.getOverallRating());
        entry.setDifficultyRating(data.getDifficultyRating());
        entry.setNotes(data.getNotes());

        result.setPayload(repository.save(entry));
        return result;
    }

    @Transactional
    public Result<LibraryEntry> deleteByIdAndUserId(UUID id, UUID userId) {
        Result<LibraryEntry> result = new Result<>();

        Optional<LibraryEntry> existing = repository.findByIdAndUserId(id, userId);
        if(existing.isEmpty()) {
            result.addMessage("library entry not found", ResultType.NOT_FOUND);
            return result;
        }

        repository.delete(existing.get());
        return result;
    }

    private Result<LibraryEntry> validate(LibraryEntry data) {
        Result<LibraryEntry> result = new Result<>();

        if(data == null) {
            result.addMessage("library entry cannot be null", ResultType.INVALID);
            return result;
        }

        if(!isValidRating(data.getOverallRating())) {
            result.addMessage("overall rating must be between 1 and 5", ResultType.INVALID);
        }

        if(!isValidRating(data.getDifficultyRating())) {
            result.addMessage("difficulty rating must be between 1 and 5", ResultType.INVALID);
        }

        if(!result.isSuccess()) {
            return result;
        }

        result.setPayload(data);
        return result;
    }

    private boolean isValidRating(Integer rating) {
        return rating == null || (rating >= 1 && rating <= 5);
    }

    private Comparator<LibraryEntry> comparatorFor(String sort) {
        Comparator<LibraryEntry> byTitle = Comparator.comparing(
                e -> e.getGame().getTitle(), Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER));

        if(sort == null) {
            return byTitle;
        }

        return switch(sort) {
            case "added" -> Comparator.comparing(
                    LibraryEntry::getAddedAt, Comparator.nullsLast(Comparator.reverseOrder()));
            case "difficulty" -> Comparator.comparing(
                    LibraryEntry::getDifficultyRating, Comparator.nullsLast(Comparator.reverseOrder()));
            case "rating" -> Comparator.comparing(
                    LibraryEntry::getOverallRating, Comparator.nullsLast(Comparator.reverseOrder()));
            default -> byTitle;
        };
    }
}
