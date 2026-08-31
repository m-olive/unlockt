package learn.unlockt.data;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Disabled("Live integration test: makes real Steam Web API calls, needs a database and STEAM_API_KEY")
@SpringBootTest
class SteamClientTest {

    static final String PUBLIC_STEAM_ID64 = "76561198253773512";
    static final String NONEXISTENT_STEAM_ID64 = "76561199999999999";

    @Autowired
    SteamClient steamClient;

    @Test
    void shouldResolveKnownVanityName() {
        Optional<String> actual = steamClient.resolveVanityUrl("bsdlv");

        assertTrue(actual.isPresent());
        assertEquals(PUBLIC_STEAM_ID64, actual.get());
    }

    @Test
    void shouldReturnEmptyForUnknownVanityName() {
        Optional<String> actual = steamClient.resolveVanityUrl("does-not-exist-abczyx-123");

        assertTrue(actual.isEmpty());
    }

    @Test
    void shouldGetOwnedGames() {
        Optional<List<OwnedGame>> actual = steamClient.getOwnedGames(PUBLIC_STEAM_ID64);

        assertTrue(actual.isPresent());
        assertFalse(actual.get().isEmpty());

        OwnedGame first = actual.get().getFirst();

        assertNotNull(first.appId());
        assertNotNull(first.name());
        assertFalse(first.name().isBlank());
    }

    @Test
    void shouldFindGamesWithVisibleStats() {
        Optional<List<OwnedGame>> actual = steamClient.getOwnedGames(PUBLIC_STEAM_ID64);

        assertTrue(actual.isPresent());
        assertTrue(actual.get().stream().anyMatch(OwnedGame::hasCommunityVisibleStats));
    }

    @Test
    void shouldReturnEmptyForNonexistentSteamId() {
        Optional<List<OwnedGame>> actual = steamClient.getOwnedGames(NONEXISTENT_STEAM_ID64);

        assertTrue(actual.isEmpty());
    }

    @Test
    void shouldGetCommunityVisibilityForPublicProfile() {
        Optional<Integer> actual = steamClient.getCommunityVisibility(PUBLIC_STEAM_ID64);

        assertTrue(actual.isPresent());
        assertEquals(3, actual.get());
    }

    @Test
    void shouldReturnEmptyVisibilityForNonexistentSteamId() {
        Optional<Integer> actual = steamClient.getCommunityVisibility(NONEXISTENT_STEAM_ID64);

        assertTrue(actual.isEmpty());
    }
}
