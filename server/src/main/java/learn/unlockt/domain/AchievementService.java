package learn.unlockt.domain;

import learn.unlockt.data.AchievementRepository;
import learn.unlockt.data.AchievementSchema;
import learn.unlockt.data.SteamClient;
import learn.unlockt.model.Achievement;
import learn.unlockt.model.Game;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AchievementService {
    private final AchievementRepository achievementRepository;
    private final SteamClient client;

    public AchievementService(SteamClient client, AchievementRepository achievementRepository) {
        this.client = client;
        this.achievementRepository = achievementRepository;
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
}
