package learn.unlockt.data;

import learn.unlockt.model.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, UUID> {

    Optional<UserAchievement> findByUserIdAndAchievementId(UUID userId, UUID achievementId);

    @Query("select ua from UserAchievement ua join fetch ua.achievement where ua.user.id = :userId and ua.achievement.game.id = :gameId")
    List<UserAchievement> findByUserIdAndGameId(@Param("userId") UUID userId, @Param("gameId") UUID gameId);

    @Query("select new learn.unlockt.data.AchievementRatingRow(ua.achievement.id, avg(ua.difficultyRating), count(ua.difficultyRating)) " +
            "from UserAchievement ua " +
            "where ua.achievement.id in :achievementIds and ua.difficultyRating is not null " +
            "group by ua.achievement.id")
    List<AchievementRatingRow> findRatingsByAchievementIds(@Param("achievementIds") List<UUID> achievementIds);

    @Query("select new learn.unlockt.data.AchievementLeaderboardRow(a.id, g.id, a.name, a.iconUrl, g.title, " +
            "avg(ua.difficultyRating), count(ua.difficultyRating)) " +
            "from UserAchievement ua " +
            "join ua.achievement a " +
            "join a.game g " +
            "where ua.difficultyRating is not null " +
            "group by a.id, g.id, a.name, a.iconUrl, g.title " +
            "having count(ua.difficultyRating) >= :minVotes " +
            "order by avg(ua.difficultyRating) desc, count(ua.difficultyRating) desc, a.name asc")
    List<AchievementLeaderboardRow> findAchievementLeaderboard(@Param("minVotes") long minVotes);
}
