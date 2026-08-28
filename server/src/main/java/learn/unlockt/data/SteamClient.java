package learn.unlockt.data;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

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

    private record VanityUrlResponse(VanityUrlResult response) {
    }

    private record VanityUrlResult(String steamid, int success) {
    }
}
