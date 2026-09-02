package learn.unlockt.domain;

import learn.unlockt.data.SteamClient;
import learn.unlockt.data.UserRepository;
import learn.unlockt.model.SyncStatus;
import learn.unlockt.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService {
    private static final Set<String> PRESET_AVATARS = Set.of("CONTROLLER", "TROPHY", "ALIEN", "JOYSTICK", "GHOST", "SWORD");

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final SteamClient steamClient;

    public UserService(UserRepository repository, PasswordEncoder encoder, SteamClient steamClient) {
        this.repository = repository;
        this.encoder = encoder;
        this.steamClient = steamClient;
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User findById(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Result<User> add(User user) {
        Result<User> result = validate(user);
        if(!result.isSuccess()) {
            return result;
        }

        validateAdd(result);
        if(!result.isSuccess()) {
            return result;
        }

        user.setPasswordHash(encoder.encode(user.getPasswordHash()));
        user.setSyncStatus(SyncStatus.IDLE);
        result.setPayload(repository.save(user));

        return result;
    }

    @Transactional
    public Result<User> updateAvatar(UUID userId, String avatar) {
        Result<User> result = new Result<>();

        Optional<User> found = repository.findById(userId);
        if(found.isEmpty()) {
            result.addMessage("user not found", ResultType.NOT_FOUND);
            return result;
        }

        if(avatar != null && !avatar.equals("STEAM") && !PRESET_AVATARS.contains(avatar)) {
            result.addMessage("that is not an avatar option", ResultType.INVALID);
            return result;
        }

        User user = found.get();

        if("STEAM".equals(avatar)) {
            if(user.getSteamId64() == null) {
                result.addMessage("link your Steam account first", ResultType.INVALID);
                return result;
            }

            if(user.getSteamAvatarUrl() == null) {
                steamClient.getAvatarUrl(user.getSteamId64()).ifPresent(user::setSteamAvatarUrl);
            }

            if(user.getSteamAvatarUrl() == null) {
                result.addMessage("we couldn't read your Steam profile picture, please try again", ResultType.INVALID);
                return result;
            }
        }

        user.setAvatar(avatar);
        result.setPayload(repository.save(user));

        return result;
    }

    private Result<User> validate(User user) {
        Result<User> result = new Result<>();

        if(user == null) {
            result.addMessage("user cannot be null", ResultType.INVALID);
            return result;
        }

        if(Validation.isNullOrBlank(user.getEmail())) {
            result.addMessage("email is required", ResultType.INVALID);
        }

        if(Validation.isNullOrBlank(user.getDisplayName())) {
            result.addMessage("display name is required", ResultType.INVALID);
        }

        if(Validation.isNullOrBlank(user.getPasswordHash())) {
            result.addMessage("password cannot be blank", ResultType.INVALID);
        } else if(user.getPasswordHash().length() < 8) {
            result.addMessage("password length must be at least 8 characters", ResultType.INVALID);
        }

        if(!result.isSuccess()) {
            return result;
        }

        result.setPayload(user);
        return result;
    }

    private void validateAdd(Result<User> result) {
        User user = result.getPayload();

        if(user.getId() != null) {
            result.addMessage("id cannot be set for `add` operation", ResultType.INVALID);
        }

        if(repository.existsByEmail(user.getEmail())) {
            result.addMessage("email already associated with another account", ResultType.INVALID);
        }
    }
}
