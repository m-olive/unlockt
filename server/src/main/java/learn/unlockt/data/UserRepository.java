package learn.unlockt.data;

import learn.unlockt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findBySteamId64(String steamId64);

    Optional<User> findByOauthProviderAndOauthId(String oauthProvider, String oauthId);
}
