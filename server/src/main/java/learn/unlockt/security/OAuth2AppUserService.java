package learn.unlockt.security;

import learn.unlockt.data.UserRepository;
import learn.unlockt.model.User;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OAuth2AppUserService extends DefaultOAuth2UserService {
    private static final String GITHUB_EMAILS_URL = "https://api.github.com/user/emails";

    private final UserRepository userRepository;
    private final RestClient restClient = RestClient.create();

    public OAuth2AppUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String key;
        String displayName;
        String email = asString(attributes.get("email"));

        switch (registrationId) {
            case "google" -> {
                key = "sub";
                displayName = asString(attributes.get("name"));
            }
            case "github" -> {
                key = "id";
                displayName = asString(attributes.get("name"));

                if (displayName == null) {
                    displayName = asString(attributes.get("login"));
                }

                if (email == null) {
                    email = fetchGithubEmail(userRequest);
                }
            }
            default -> throw new OAuth2AuthenticationException("unsupported provider " + registrationId);
        }

        if (email == null) {
            throw new OAuth2AuthenticationException("no verified email available from " + registrationId);
        }

        String oauthId = asString(attributes.get(key));

        if (oauthId == null) {
            throw new OAuth2AuthenticationException("no subject id from " + registrationId);
        }

        User user = findOrCreate(registrationId, oauthId, email, displayName);

        return new OAuth2AppUserDetails(user, attributes, key);
    }

    private User findOrCreate(String provider, String oauthId, String email, String displayName) {
        Optional<User> byProvider = userRepository.findByOauthProviderAndOauthId(provider, oauthId);

        if (byProvider.isPresent()) {
            return byProvider.get();
        }

        Optional<User> byEmail = userRepository.findByEmail(email);

        if (byEmail.isPresent()) {
            User existing = byEmail.get();
            existing.setOauthProvider(provider);
            existing.setOauthId(oauthId);

            return userRepository.save(existing);
        }

        User created = new User();
        created.setEmail(email);
        created.setDisplayName(displayName == null ? email : displayName);
        created.setOauthProvider(provider);
        created.setOauthId(oauthId);

        return userRepository.save(created);
    }

    private String fetchGithubEmail(OAuth2UserRequest userRequest) {
        List<GithubEmail> emails = restClient.get()
                .uri(GITHUB_EMAILS_URL)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userRequest.getAccessToken().getTokenValue())
                .header(HttpHeaders.ACCEPT, "application/vnd.github+json")
                .retrieve()
                .body(new ParameterizedTypeReference<List<GithubEmail>>() {});

        if (emails == null) {
            return null;
        }

        return emails.stream()
                .filter(e -> e.primary() && e.verified())
                .map(GithubEmail::email)
                .findFirst()
                .orElse(null);
    }

    private static String asString(Object value) {
        return value == null ? null : value.toString();
    }

    private record GithubEmail(String email, boolean primary, boolean verified) {}
}
