package learn.unlockt.security;

import learn.unlockt.model.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public class OAuth2AppUserDetails extends AppUserDetails implements OAuth2User {
    private final Map<String, Object> attributes;
    private final String key;

    public OAuth2AppUserDetails(User user, Map<String, Object> attributes, String key) {
        super(user);
        this.attributes = attributes;
        this.key = key;

    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return String.valueOf(attributes.get(key));
    }
}