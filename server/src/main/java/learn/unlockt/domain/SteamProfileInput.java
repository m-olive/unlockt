package learn.unlockt.domain;

import java.util.Optional;
import java.util.regex.Pattern;

public record SteamProfileInput(String steamId64, String vanityName) {

    private static final Pattern STEAM_ID_64 = Pattern.compile("7656\\d{13}");
    private static final Pattern VANITY_NAME = Pattern.compile("[A-Za-z0-9_-]{2,18}");

    public static Optional<SteamProfileInput> parseInput(String raw) {
        if (raw == null) {
            return Optional.empty();
        }

        String value = raw.trim();
        value = stripPrefix(value, "http://");
        value = stripPrefix(value, "https://");
        value = stripPrefix(value, "www.");
        value = stripPrefix(value, "steamcommunity.com/");
        value = stripPrefix(value, "id/");
        value = stripPrefix(value, "profiles/");
        value = firstSegment(value);

        if (STEAM_ID_64.matcher(value).matches()) {
            return Optional.of(new SteamProfileInput(value, null));
        }

        if (VANITY_NAME.matcher(value).matches()) {
            return Optional.of(new SteamProfileInput(null, value));
        }

        return Optional.empty();
    }

    public boolean isValidId() {
        return steamId64 != null;
    }

    private static String stripPrefix(String value, String prefix) {
        if (value.regionMatches(true, 0, prefix, 0, prefix.length())) {
            return value.substring(prefix.length());
        }
        return value;
    }

    private static String firstSegment(String value) {
        for (int i = 0; i < value.length(); i++) {
            char c = value.charAt(i);
            if (c == '/' || c == '?' || c == '#') {
                return value.substring(0, i);
            }
        }
        return value;
    }
}
