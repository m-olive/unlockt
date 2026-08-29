package learn.unlockt.data;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class SteamClient {
    private final RestClient client;
    private final String apiKey;

    public SteamClient(RestClient.Builder clientBuilder, @Value("${STEAM_API_KEY}") String apiKey) {
        this.apiKey = apiKey;
        this.client = clientBuilder
                .baseUrl("https://api.steampowered.com")
                .build();
    }

    public Optional<String> resolveVanityUrl(String vanityName) {
        VanityUrlResponse body = client.get()
                .uri(builder -> builder
                        .path("/ISteamUser/ResolveVanityURL/v1/")
                        .queryParam("key", apiKey)
                        .queryParam("vanityurl", vanityName)
                        .build())
                .retrieve()
                .body(VanityUrlResponse.class);

        if (body == null || body.response() == null) {
            return Optional.empty();
        }

        VanityUrlResult result = body.response();

        if (result.success() != 1 || result.steamid() == null) {
            return Optional.empty();
        }

        return Optional.of(result.steamid());
    }

    public Optional<List<OwnedGame>> getOwnedGames(String steamId64) {
        OwnedGamesResponse body = client.get()
                .uri(builder -> builder
                        .path("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/")
                        .queryParam("key", apiKey)
                        .queryParam("steamid", steamId64)
                        .queryParam("include_appinfo", 1)
                        .queryParam("include_played_free_games", 1)
                        .build())
                .retrieve()
                .body(OwnedGamesResponse.class);

        if (body == null || body.response() == null) {
            return Optional.empty();
        }

        OwnedGamesResult result = body.response();

        if (result.games() == null) {
            return Optional.empty();
        }

        List<OwnedGame> ownedGames = new ArrayList<>();

        List<GameRecord> games = result.games();
        games.forEach(game -> {
                    OwnedGame ownedGame = new OwnedGame(
                      game.appid(),
                      game.name(),
                      game.has_community_visible_stats()
                );

            ownedGames.add(ownedGame);
        });

        return Optional.of(ownedGames);
    }


    private record VanityUrlResponse(VanityUrlResult response) {
    }

    private record VanityUrlResult(String steamid, int success) {
    }

    private record OwnedGamesResponse(OwnedGamesResult response) {}

    private record OwnedGamesResult(int game_count, List<GameRecord> games) {}

    private record GameRecord(String appid, String name, boolean has_community_visible_stats) {}

}
