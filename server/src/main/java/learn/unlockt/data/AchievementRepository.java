package learn.unlockt.data;

import learn.unlockt.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, UUID> {

    List<Achievement> findByGameId(UUID gameId);

    Optional<Achievement> findByGameIdAndSteamKey(UUID gameId, String steamKey);
}
