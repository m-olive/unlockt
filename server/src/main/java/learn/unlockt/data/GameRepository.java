package learn.unlockt.data;

import learn.unlockt.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GameRepository extends JpaRepository<Game, UUID> {

    Optional<Game> findBySteamAppId(String steamAppId);

    @Query(value = "select * from game order by rand() limit :count", nativeQuery = true)
    List<Game> findRandomSample(@Param("count") int count);

    List<Game> findTop50ByTitleContainingIgnoreCaseOrderByTitleAsc(String title);
}
