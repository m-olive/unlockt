package learn.unlockt.controller;

import learn.unlockt.domain.AchievementService;
import learn.unlockt.domain.AchievementView;
import learn.unlockt.domain.Result;
import learn.unlockt.security.AppUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/games/{gameId}/achievements")
public class AchievementController {
    private final AchievementService service;

    public AchievementController(AchievementService achievementService) {
        this.service = achievementService;
    }

    @GetMapping
    public ResponseEntity<Object> findAchievements(@AuthenticationPrincipal AppUserDetails details,
                                                   @PathVariable UUID gameId) {
        UUID userId = details == null ? null : details.getUser().getId();
        Result<List<AchievementView>> result = service.findAchievements(gameId, userId);

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.OK);
        }

        return ErrorResponse.build(result);
    }

    @PutMapping("/{achievementId}/rating")
    public ResponseEntity<Object> rateAchievement(@AuthenticationPrincipal AppUserDetails details,
                                                  @PathVariable UUID achievementId,
                                                  @RequestBody AchievementRatingRequest request) {
        Result<AchievementView> result = service.rateAchievement(details.getUser().getId(), achievementId,
                request.difficultyRating());

        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.OK);
        }

        return ErrorResponse.build(result);
    }
}
