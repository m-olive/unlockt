package learn.unlockt.controller;

import learn.unlockt.model.User;

public record AvatarResponse(String avatar, String steamAvatarUrl) {

    public static AvatarResponse from(User user) {
        return new AvatarResponse(user.getAvatar(), user.getSteamAvatarUrl());
    }
}
