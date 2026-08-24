DROP DATABASE IF EXISTS unlockt;

CREATE DATABASE unlockt;
USE unlockt;

CREATE TABLE users (
    id              CHAR(36)     PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NULL,
    oauth_provider  VARCHAR(50)  NULL,
    oauth_id        VARCHAR(255) NULL,
    display_name    VARCHAR(100) NOT NULL,
    steam_id64      VARCHAR(20)  NULL,
    sync_status     VARCHAR(20)  NOT NULL DEFAULT 'IDLE',
    last_synced_at  TIMESTAMP    NULL,
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_users_oauth UNIQUE (oauth_provider, oauth_id),
    CONSTRAINT uq_users_steam_id64 UNIQUE (steam_id64),
    CONSTRAINT chk_users_sync_status CHECK (sync_status IN ('IDLE', 'SYNCING', 'FAILED')),
    CONSTRAINT chk_users_auth_path CHECK (password_hash IS NOT NULL OR (oauth_provider IS NOT NULL AND oauth_id IS NOT NULL))
);

CREATE TABLE games (
    id             CHAR(36)     PRIMARY KEY,
    title          VARCHAR(255) NOT NULL,
    cover_art_url  VARCHAR(500) NULL,
    platform       VARCHAR(50)  NULL,
    genre          VARCHAR(100) NULL,
    steam_appid    VARCHAR(20)  NULL,
    igdb_id        VARCHAR(50)  NULL,
    CONSTRAINT uq_games_steam_appid UNIQUE (steam_appid),
    CONSTRAINT uq_games_igdb_id UNIQUE (igdb_id)
);

CREATE TABLE library_entries (
    id                CHAR(36)    PRIMARY KEY,
    user_id           CHAR(36)    NOT NULL,
    game_id           CHAR(36)    NOT NULL,
    status            VARCHAR(20) NOT NULL DEFAULT 'BACKLOG',
    overall_rating    INT         NULL,
    difficulty_rating INT         NULL,
    notes             TEXT        NULL,
    added_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_library_entries_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_library_entries_game FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE,
    CONSTRAINT uq_library_entries_user_game UNIQUE (user_id, game_id),
    CONSTRAINT chk_library_entries_status CHECK (status IN ('BACKLOG', 'PLAYING', 'COMPLETED', 'DROPPED')),
    CONSTRAINT chk_library_entries_overall_rating CHECK (overall_rating BETWEEN 1 AND 5),
    CONSTRAINT chk_library_entries_difficulty_rating CHECK (difficulty_rating BETWEEN 1 AND 5)
);

CREATE TABLE achievements (
    id          CHAR(36)     PRIMARY KEY,
    game_id     CHAR(36)     NOT NULL,
    steam_key   VARCHAR(255) NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description TEXT         NULL,
    icon_url    VARCHAR(500) NULL,
    CONSTRAINT fk_achievements_game FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE,
    CONSTRAINT uq_achievements_game_steam_key UNIQUE (game_id, steam_key)
);

CREATE TABLE user_achievements (
    id                CHAR(36)  PRIMARY KEY,
    user_id           CHAR(36)  NOT NULL,
    achievement_id    CHAR(36)  NOT NULL,
    unlocked          BIT(1)    NOT NULL DEFAULT 0,
    unlocked_at       TIMESTAMP NULL,
    difficulty_rating INT       NULL,
    CONSTRAINT fk_user_achievements_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_achievements_achievement FOREIGN KEY (achievement_id) REFERENCES achievements (id) ON DELETE CASCADE,
    CONSTRAINT uq_user_achievements_user_achievement UNIQUE (user_id, achievement_id),
    CONSTRAINT chk_user_achievements_difficulty_rating CHECK (difficulty_rating BETWEEN 1 AND 5)
);
