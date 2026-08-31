package learn.unlockt.data;

public record OwnedGame(
        String appId,
        String name,
        boolean hasCommunityVisibleStats
) {}