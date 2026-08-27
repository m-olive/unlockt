package learn.unlockt.controller;

import learn.unlockt.domain.GameService;
import learn.unlockt.model.Game;
import learn.unlockt.model.LibraryEntry;
import learn.unlockt.security.AppUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/games")
public class GameController {
    private final GameService service;

    public GameController(GameService service) {
        this.service = service;
    }

    @GetMapping("/{gameId}")
    public ResponseEntity<Object> findById(@AuthenticationPrincipal AppUserDetails details, @PathVariable UUID gameId) {
        Game game = service.findById(gameId);
        if (game == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UUID userId = details == null ? null : details.getUser().getId();
        LibraryEntry entry = service.findEntry(userId, gameId);

        return ResponseEntity.ok(GameDetailResponse.from(
                game,
                service.findAverageOverallRating(gameId),
                service.countOverallRatings(gameId),
                service.findAverageDifficulty(gameId),
                service.countDifficultyRatings(gameId),
                entry));
    }
}
