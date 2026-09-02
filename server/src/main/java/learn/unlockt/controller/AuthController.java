package learn.unlockt.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import learn.unlockt.model.User;
import learn.unlockt.domain.UserService;
import learn.unlockt.security.AppUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authManager;
    private final SecurityContextRepository securityContextRepository;
    private final UserService userService;

    public AuthController(AuthenticationManager authManager, SecurityContextRepository securityContextRepository, UserService userService) {
        this.authManager = authManager;
        this.securityContextRepository = securityContextRepository;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Credentials creds, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(creds.email(), creds.password());
        try {
            Authentication auth = authManager.authenticate(token);
            if(auth.isAuthenticated()) {
                AppUserDetails details = (AppUserDetails) auth.getPrincipal();

                SecurityContext ctx = SecurityContextHolder.createEmptyContext();
                ctx.setAuthentication(auth);
                SecurityContextHolder.setContext(ctx);
                securityContextRepository.saveContext(ctx, request, response);

                return ResponseEntity.ok(toPayload(details.getUser()));
            }
        } catch(AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<Object> me(@AuthenticationPrincipal AppUserDetails details) {
        if(details == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userService.findById(details.getUser().getId());
        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(toPayload(user));
    }

    private Map<String, Object> toPayload(User user) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", user.getId().toString());
        payload.put("email", user.getEmail());
        payload.put("displayName", user.getDisplayName());
        payload.put("steamId64", user.getSteamId64());
        payload.put("lastSyncedAt", user.getLastSyncedAt());
        payload.put("avatar", user.getAvatar());
        payload.put("steamAvatarUrl", user.getSteamAvatarUrl());

        return payload;
    }

    public record Credentials(String email, String password) {}
}
