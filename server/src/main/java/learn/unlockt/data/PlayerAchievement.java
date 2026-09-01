package learn.unlockt.data;


import java.time.LocalDateTime;

public record PlayerAchievement(
        String steamKey,
        boolean unlocked,
        LocalDateTime unlockedAt
) {}
