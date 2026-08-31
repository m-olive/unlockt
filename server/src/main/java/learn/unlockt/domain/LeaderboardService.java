package learn.unlockt.domain;

import learn.unlockt.data.LeaderboardRow;
import learn.unlockt.data.LibraryEntryRepository;

import java.util.List;

public class LeaderboardService {
    private static final long MIN_VOTES = 2;
    private final LibraryEntryRepository libraryEntryRepository;

    public LeaderboardService(LibraryEntryRepository libraryEntryRepository) {
        this.libraryEntryRepository = libraryEntryRepository;
    }

    public List<LeaderboardRow> getLeaderboard() {
        return libraryEntryRepository.findLeaderboard(MIN_VOTES);
    }
}
