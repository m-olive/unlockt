package learn.unlockt.domain;

import learn.unlockt.data.UserRepository;
import learn.unlockt.model.SyncStatus;
import learn.unlockt.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
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
