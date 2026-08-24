package learn.unlockt.data;

import learn.unlockt.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GameRepository extends JpaRepository<Game, UUID> {

    Optional<Game> findBySteamAppId(String steamAppId);

    Optional<Game> findByIgdbId(String igdbId);
}
