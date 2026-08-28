package learn.unlockt.data;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SteamClientTest {

    @Autowired
    SteamClient steamClient;

    @Test
    void shouldResolveKnownVanityName() {
        Optional<String> actual = steamClient.resolveVanityUrl("gabelogannewell");

        assertTrue(actual.isPresent());
        assertTrue(actual.get().matches("7656\\d{13}"), "unexpected steamid: " + actual.orElse(null));
    }

    @Test
    void shouldReturnEmptyForUnknownVanityName() {
        Optional<String> actual = steamClient.resolveVanityUrl("no-such-user-zzz-9f3a1c7e");

        assertTrue(actual.isEmpty());
    }
}
