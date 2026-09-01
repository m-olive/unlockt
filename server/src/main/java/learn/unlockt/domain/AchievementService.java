package learn.unlockt.domain;

import learn.unlockt.data.*;
import learn.unlockt.model.Achievement;
import learn.unlockt.model.Game;
import learn.unlockt.model.User;
import learn.unlockt.model.UserAchievement;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AchievementService {
    private final AchievementRepository achievementRepository;
    private final GameRepository gameRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final UserRepository userRepository;
    private final SteamClient client;

    public AchievementService(SteamClient client, AchievementRepository achievementRepository, GameRepository gameRepository, UserAchievementRepository userAchievementRepository, UserRepository userRepository) {
        this.client = client;
        this.achievementRepository = achievementRepository;
        this.gameRepository = gameRepository;
        this.userAchievementRepository = userAchievementRepository;
        this.userRepository = userRepository;
    }

    public boolean syncAchievements(Game game) {
        if (game.getSteamAppId() == null) {
            return false;
        }

        Optional<List<AchievementSchema>> achievements = client.getGameAchievementSchema(game.getSteamAppId());
        if (achievements.isEmpty()) {
            return false;
        }

        Set<String> existingKeys = achievementRepository.findByGameId(game.getId()).stream()
                .map(Achievement::getSteamKey)
                .collect(Collectors.toSet());

        List<Achievement> newAchievements = new ArrayList<>();

        achievements.get().forEach(achievement -> {
            if (!existingKeys.contains(achievement.steamKey())) {
                Achievement newAchievement = new Achievement();
                newAchievement.setGame(game);
                newAchievement.setDescription(achievement.description());
                newAchievement.setSteamKey(achievement.steamKey());
                newAchievement.setIconUrl(achievement.iconUrl());
                newAchievement.setName(achievement.name());
                newAchievements.add(newAchievement);
            }
        });
        achievementRepository.saveAll(newAchievements);

        return true;
    }

    public Result<List<AchievementView>> findAchievements(UUID gameId, UUID userId) {
        Result<List<AchievementView>> result = new Result<>();
        Game game = gameRepository.findById(gameId).orElse(null);

        if (game == null) {
            result.addMessage("Game does not exist", ResultType.NOT_FOUND);
            return result;
        }

        List<Achievement> achievements = achievementRepository.findByGameId(game.getId());

        if (achievements.isEmpty()) {
            if (!syncAchievements(game)) {
                result.addMessage("Steam is unavailable", ResultType.INVALID);
                return result;
            }
            achievements = achievementRepository.findByGameId(game.getId());
        }

        Map<UUID, UserAchievement> overlay = userId == null ? Map.of() :
                userAchievementRepository.findByUserIdAndGameId(userId, gameId).stream()
                  .collect(Collectors.toMap(ua -> ua.getAchievement().getId(), ua -> ua));

        List<AchievementView> views = new ArrayList<>();

        achievements.forEach(achievement -> {
            UserAchievement userAchievement = overlay.get(achievement.getId());

            AchievementView view = new AchievementView(
                    achievement.getId(),
                    achievement.getName(),
                    achievement.getDescription(),
                    achievement.getIconUrl(),
                    userAchievement != null && userAchievement.isUnlocked(),
                    userAchievement == null ? null : userAchievement.getUnlockedAt(),
                    userAchievement == null ? null : userAchievement.getDifficultyRating());

            views.add(view);
        });

        result.setPayload(views);
        return result;
    }

    public Result<AchievementView> rateAchievement(UUID userId, UUID achievementId, Integer difficultyRating) {
        Result<AchievementView> result = new Result<>();

        if (difficultyRating != null && (difficultyRating < 1 || difficultyRating > 5)) {
            result.addMessage("Difficulty rating must be between 1 and 5", ResultType.INVALID);
            return result;
        }

        Achievement achievement = achievementRepository.findById(achievementId).orElse(null);

        if (achievement == null) {
            result.addMessage("Achievement does not exist", ResultType.NOT_FOUND);
            return result;
        }

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            result.addMessage("User does not exist", ResultType.NOT_FOUND);
            return result;
        }

        UserAchievement userAchievement = userAchievementRepository
                .findByUserIdAndAchievementId(userId, achievementId)
                .orElse(null);

        if (userAchievement == null) {
            userAchievement = new UserAchievement();
            userAchievement.setUser(user);
            userAchievement.setAchievement(achievement);
        }

        userAchievement.setDifficultyRating(difficultyRating);

        UserAchievement saved = userAchievementRepository.save(userAchievement);

        AchievementView view = new AchievementView(
                achievement.getId(),
                achievement.getName(),
                achievement.getDescription(),
                achievement.getIconUrl(),
                saved.isUnlocked(),
                saved.getUnlockedAt(),
                saved.getDifficultyRating());

        result.setPayload(view);

        return result;
    }
}
