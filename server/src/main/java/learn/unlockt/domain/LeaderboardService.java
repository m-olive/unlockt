package learn.unlockt.domain;

import learn.unlockt.data.AchievementLeaderboardRow;
import learn.unlockt.data.LeaderboardRow;
import learn.unlockt.data.LibraryEntryRepository;
import learn.unlockt.data.UserAchievementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaderboardService {
    private static final long MIN_VOTES = 2;
    private static final int TOP_N = 10;

    private final LibraryEntryRepository libraryEntryRepository;
    private final UserAchievementRepository userAchievementRepository;

    public LeaderboardService(LibraryEntryRepository libraryEntryRepository, UserAchievementRepository userAchievementRepository) {
        this.libraryEntryRepository = libraryEntryRepository;
        this.userAchievementRepository = userAchievementRepository;
    }

    public List<LeaderboardRow> findLeaderboard() {
        return libraryEntryRepository.findLeaderboard(MIN_VOTES).stream()
                .limit(TOP_N)
                .toList();
    }

    public List<AchievementLeaderboardRow> findAchievementLeaderboard() {
        return userAchievementRepository.findAchievementLeaderboard(MIN_VOTES).stream()
                .limit(TOP_N)
                .toList();
    }
}
