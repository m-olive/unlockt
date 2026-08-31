package learn.unlockt.data;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class SteamClient {
    private final RestClient client;
    private final String apiKey;

    public SteamClient(RestClient.Builder clientBuilder, @Value("${steam.api-key}") String apiKey) {
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
                        .path("/IPlayerService/GetOwnedGames/v1/")
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
        result.games().forEach(game -> {
                    OwnedGame ownedGame = new OwnedGame(
                      game.appid(),
                      game.name(),
                      game.has_community_visible_stats()
                );

            ownedGames.add(ownedGame);
        });

        return Optional.of(ownedGames);
    }

    public Optional<Integer> getCommunityVisibility(String steamId64) {
        VisibilityResponse body = client.get()
                .uri(builder -> builder
                        .path("/ISteamUser/GetPlayerSummaries/v2/")
                        .queryParam("key", apiKey)
                        .queryParam("steamids", steamId64)
                        .build())
                .retrieve()
                .body(VisibilityResponse.class);

        if (body == null || body.response() == null) {
            return Optional.empty();
        }

        VisibilityResult result = body.response();

        if (result.players() == null || result.players().isEmpty()) {
            return Optional.empty();
        }

        return Optional.ofNullable(result.players().getFirst().communityvisibilitystate());
    }

    public Optional<List<AchievementSchema>> getGameAchievementSchema(String appId) {
        SchemaResponse body = client.get()
                .uri(builder -> builder
                        .path("/ISteamUserStats/GetSchemaForGame/v2/")
                        .queryParam("key", apiKey)
                        .queryParam("appid", appId)
                        .build())
                .retrieve()
                .body(SchemaResponse.class);

        if (body == null || body.game() == null) {
            return Optional.empty();
        }

        SchemaResult result = body.game();

        if (result.availableGameStats() == null || result.availableGameStats().achievements() == null) {
            return Optional.of(List.of());
        }

        List<AchievementSchema> schemas = new ArrayList<>();

        SchemaAvailableStats availableStats = result.availableGameStats();
        List<SchemaRecord> achievements = availableStats.achievements();

        achievements.forEach(achievement -> {
            AchievementSchema schema = new AchievementSchema(
                    achievement.name(),
                    achievement.displayName(),
                    achievement.description(),
                    achievement.icon()
            );

            schemas.add(schema);
        });

        return Optional.of(schemas);
    }


    private record VanityUrlResponse(VanityUrlResult response) {}

    private record VanityUrlResult(String steamid, int success) {}

    private record OwnedGamesResponse(OwnedGamesResult response) {}

    private record OwnedGamesResult(List<GameRecord> games) {}

    private record GameRecord(String appid, String name, boolean has_community_visible_stats) {}

    private record VisibilityResponse(VisibilityResult response) {}

    private record VisibilityResult(List<CommunityVisibilityRecord> players) {}

    private record CommunityVisibilityRecord(String steamid, Integer communityvisibilitystate) {}

    private record SchemaResponse(SchemaResult game) {}

    private record SchemaResult(SchemaAvailableStats availableGameStats) {}

    private record SchemaAvailableStats(List<SchemaRecord> achievements) {}

    private record SchemaRecord(String name, String displayName, String description, String icon) {}


}
