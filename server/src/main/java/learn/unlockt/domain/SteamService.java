package learn.unlockt.domain;

import learn.unlockt.data.SteamClient;
import learn.unlockt.data.UserRepository;
import learn.unlockt.model.User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SteamService {
    private final SteamClient client;
    private final UserRepository userRepository;

    public SteamService(SteamClient client, UserRepository userRepository) {
        this.client = client;
        this.userRepository = userRepository;
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
}
