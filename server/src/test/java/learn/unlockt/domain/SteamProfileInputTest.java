package learn.unlockt.domain;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class SteamProfileInputTest {

    @ParameterizedTest
    @ValueSource(strings = {
            "76561198253773512",
            "  76561198253773512  ",
            "https://steamcommunity.com/profiles/76561198253773512",
            "https://steamcommunity.com/profiles/76561198253773512/",
            "steamcommunity.com/profiles/76561198253773512/games/?tab=all",
            "HTTPS://WWW.STEAMCOMMUNITY.COM/PROFILES/76561198253773512"
    })
    void shouldRecognizeSteamId64(String raw) {
        Optional<SteamProfileInput> actual = SteamProfileInput.parseInput(raw);

        assertTrue(actual.isPresent(), raw);
        assertTrue(actual.get().isValidId());
        assertEquals("76561198253773512", actual.get().steamId64());
        assertNull(actual.get().vanityName());
    }

    @ParameterizedTest
    @CsvSource({
            "gabelogannewell, gabelogannewell",
            "'  gabelogannewell  ', gabelogannewell",
            "https://steamcommunity.com/id/gabelogannewell, gabelogannewell",
            "https://steamcommunity.com/id/gabelogannewell/, gabelogannewell",
            "steamcommunity.com/id/gabelogannewell/games/?tab=all, gabelogannewell",
            "some_name-1, some_name-1",
            "7656119825377351, 7656119825377351"
    })
    void shouldRecognizeVanityName(String raw, String expected) {
        Optional<SteamProfileInput> actual = SteamProfileInput.parseInput(raw);

        assertTrue(actual.isPresent(), raw);
        assertFalse(actual.get().isValidId());
        assertEquals(expected, actual.get().vanityName());
        assertNull(actual.get().steamId64());
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "",
            "   ",
            "a",
            "has spaces",
            "nineteencharacters1",
            "bad!chars",
            "https://example.com/foo"
    })
    void shouldRejectInvalidInput(String raw) {
        assertTrue(SteamProfileInput.parseInput(raw).isEmpty(), raw);
    }

    @Test
    void shouldRejectNull() {
        assertTrue(SteamProfileInput.parseInput(null).isEmpty());
    }
}
