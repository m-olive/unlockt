package learn.unlockt.data;

import learn.unlockt.model.LibraryEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LibraryEntryRepository extends JpaRepository<LibraryEntry, UUID> {

    @Query("select le from LibraryEntry le join fetch le.game where le.user.id = :userId")
    List<LibraryEntry> findAllByUserId(@Param("userId") UUID userId);

    @Query("select le from LibraryEntry le join fetch le.game where le.id = :id and le.user.id = :userId")
    Optional<LibraryEntry> findByIdAndUserId(@Param("id") UUID id, @Param("userId") UUID userId);

    boolean existsByUserIdAndGameId(UUID userId, UUID gameId);
}
