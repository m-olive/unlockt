package learn.unlockt.domain;

import learn.unlockt.data.*;
import learn.unlockt.model.Game;
import learn.unlockt.model.LibraryEntry;
import learn.unlockt.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SteamService {
    private final SteamClient client;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final LibraryEntryRepository libraryEntryRepository;

    public SteamService(SteamClient client, UserRepository userRepository, GameRepository gameRepository, LibraryEntryRepository libraryEntryRepository) {
        this.client = client;
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
        this.libraryEntryRepository = libraryEntryRepository;
    }

    public Result<String> linkSteamAccount(UUID userId, String raw) {
        Result<String> result = new Result<>();

        Optional<SteamProfileInput> parsed = SteamProfileInput.parseInput(raw);
        if (parsed.isEmpty()) {
            result.addMessage("That doesn't look like a Steam profile URL or vanity name.", ResultType.INVALID);
            return result;
        }

        SteamProfileInput input = parsed.get();
        String steamId64 = "";

        if (input.isValidId()) {
            steamId64 = input.steamId64();
        } else {
            Optional<String> resolved = client.resolveVanityUrl(input.vanityName());
            if (resolved.isEmpty()) {
                result.addMessage("We couldn't find a Steam account with that name.", ResultType.NOT_FOUND);
                return result;
            }
            steamId64 = resolved.get();
        }

        Optional<User> existing = userRepository.findBySteamId64(steamId64);
        if (existing.isPresent() && !existing.get().getId().equals(userId)) {
            result.addMessage("That Steam account is already linked to another user.", ResultType.INVALID);
            return result;
        }

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            result.addMessage("User not found.", ResultType.NOT_FOUND);
            return result;
        }

        user.get().setSteamId64(steamId64);
        userRepository.save(user.get());

        result.setPayload(steamId64);
        return result;
    }

    public Result<ImportSummary> importLibrary(UUID userId) {
        Result<ImportSummary> result = new Result<>();

        if(userRepository.findById(userId).isEmpty()) {
            result.addMessage("User not found.", ResultType.NOT_FOUND);
            return result;
        }

        User user = userRepository.findById(userId).get();

        if(user.getSteamId64() == null) {
            result.addMessage("You must link your Steam account to import library", ResultType.INVALID);
            return result;
        }

        Optional<List<OwnedGame>> ownedGames = client.getOwnedGames(user.getSteamId64());
        if (ownedGames.isEmpty()) {
            Optional<Integer> visibility = client.getCommunityVisibility(user.getSteamId64());

            if (visibility.isEmpty()) {
                result.addMessage("We couldn't read your Steam library. Please try again.", ResultType.INVALID);
                return result;
            }

            if (visibility.get() == 1) {
                result.addMessage("Your Steam game details aren't public. Set Game details to Public in your Steam privacy settings, then try again.", ResultType.INVALID);
                return result;
            }

            result.setPayload(new ImportSummary(0, 0, 0));
            return result;
        }

        int alreadyInLibrary = 0;
        int gamesAdded = 0;

        for(OwnedGame ownedGame : ownedGames.get()) {
            Optional<Game> existingGame = gameRepository.findBySteamAppId(ownedGame.appId());
            Game game;

            if (existingGame.isPresent()) {
                game = existingGame.get();
            } else {
                Game created = new Game();
                created.setSteamAppId(ownedGame.appId());
                created.setTitle(ownedGame.name());
                created.setPlatform("PC");
                created.setCoverArtUrl(String.format("https://cdn.cloudflare.steamstatic.com/steam/apps/%s/header.jpg", ownedGame.appId()));
                game = gameRepository.save(created);
            }

            if(libraryEntryRepository.existsByUserIdAndGameId(userId, game.getId())) {
                alreadyInLibrary++;
            } else {
                LibraryEntry entry = new LibraryEntry();
                entry.setGame(game);
                entry.setUser(user);

                libraryEntryRepository.save(entry);
                gamesAdded++;
            }
        }

        ImportSummary summary = new ImportSummary(alreadyInLibrary, gamesAdded, ownedGames.get().size());
        result.setPayload(summary);

        return result;
    }
}
