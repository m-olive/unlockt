package learn.unlockt.controller;

import learn.unlockt.domain.Result;
import learn.unlockt.domain.UserService;
import learn.unlockt.model.User;
import learn.unlockt.security.AppUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody User user) {
        Result<User> result = service.add(user);

        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }

        return ErrorResponse.build(result);
    }

    @PutMapping("/me/avatar")
    public ResponseEntity<Object> updateAvatar(@AuthenticationPrincipal AppUserDetails details, @RequestBody AvatarRequest request) {
        Result<User> result = service.updateAvatar(details.getUser().getId(), request.avatar());

        if(result.isSuccess()) {
            return ResponseEntity.ok(AvatarResponse.from(result.getPayload()));
        }

        return ErrorResponse.build(result);
    }
}
