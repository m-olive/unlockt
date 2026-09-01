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
}
