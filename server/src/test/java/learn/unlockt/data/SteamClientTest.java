package learn.unlockt.data;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SteamClientTest {

    static final String PUBLIC_STEAM_ID64 = "76561198253773512";
    static final String NONEXISTENT_STEAM_ID64 = "76561197960287931";

    @Autowired
    SteamClient steamClient;

    @Test
    void shouldResolveKnownVanityName() {
        Optional<String> actual = steamClient.resolveVanityUrl("bsdlv");

        assertNotNull(actual);
        assertEquals(PUBLIC_STEAM_ID64, actual.get());
    }

    @Test
    void shouldReturnEmptyForUnknownVanityName() {
        Optional<String> actual = steamClient.resolveVanityUrl("does-not-exist-abczyx-123");

        assertTrue(actual.isEmpty());
    }

    @Test
    void shouldGetOwnedGames() {
        Optional<String> name = steamClient.resolveVanityUrl("bsdlv");
        Optional<List<OwnedGame>> games = steamClient.getOwnedGames(name.orElse(null));

        assertNotNull(games);
        List<OwnedGame> actual = games.get();
        assertFalse(actual.isEmpty());

        OwnedGame first = actual.getFirst();

        assertNotNull(first.appId());
        assertEquals(PUBLIC_STEAM_ID64, first.appId());
        assertNotNull(first.name());
        assertFalse(first.name().isBlank());
    }

    @Test
    void shouldReturnEmptyForNonexistentSteamId() {
        Optional<List<OwnedGame>> actual = steamClient.getOwnedGames(NONEXISTENT_STEAM_ID64);

        assertTrue(actual.isEmpty());
    }
}
