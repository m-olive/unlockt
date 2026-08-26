DROP DATABASE IF EXISTS unlockt;

CREATE DATABASE unlockt;
USE unlockt;

CREATE TABLE `user` (
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
    CONSTRAINT uq_user_oauth UNIQUE (oauth_provider, oauth_id),
    CONSTRAINT uq_user_steam_id64 UNIQUE (steam_id64),
    CONSTRAINT chk_user_sync_status CHECK (sync_status IN ('IDLE', 'SYNCING', 'FAILED')),
    CONSTRAINT chk_user_auth_path CHECK (password_hash IS NOT NULL OR (oauth_provider IS NOT NULL AND oauth_id IS NOT NULL))
);

CREATE TABLE game (
    id             CHAR(36)     PRIMARY KEY,
    title          VARCHAR(255) NOT NULL,
    cover_art_url  VARCHAR(500) NULL,
    platform       VARCHAR(50)  NULL,
    genre          VARCHAR(100) NULL,
    steam_appid    VARCHAR(20)  NULL,
    igdb_id        VARCHAR(50)  NULL,
    CONSTRAINT uq_game_steam_appid UNIQUE (steam_appid),
    CONSTRAINT uq_game_igdb_id UNIQUE (igdb_id)
);

CREATE TABLE library_entry (
    id                CHAR(36)    PRIMARY KEY,
    user_id           CHAR(36)    NOT NULL,
    game_id           CHAR(36)    NOT NULL,
    status            VARCHAR(20) NOT NULL DEFAULT 'BACKLOG',
    overall_rating    INT         NULL,
    difficulty_rating INT         NULL,
    notes             TEXT        NULL,
    added_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_library_entry_user FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE,
    CONSTRAINT fk_library_entry_game FOREIGN KEY (game_id) REFERENCES game (id) ON DELETE CASCADE,
    CONSTRAINT uq_library_entry_user_game UNIQUE (user_id, game_id),
    CONSTRAINT chk_library_entry_status CHECK (status IN ('BACKLOG', 'PLAYING', 'COMPLETED', 'DROPPED')),
    CONSTRAINT chk_library_entry_overall_rating CHECK (overall_rating BETWEEN 1 AND 5),
    CONSTRAINT chk_library_entry_difficulty_rating CHECK (difficulty_rating BETWEEN 1 AND 5)
);

CREATE TABLE achievement (
    id          CHAR(36)     PRIMARY KEY,
    game_id     CHAR(36)     NOT NULL,
    steam_key   VARCHAR(255) NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description TEXT         NULL,
    icon_url    VARCHAR(500) NULL,
    CONSTRAINT fk_achievement_game FOREIGN KEY (game_id) REFERENCES game (id) ON DELETE CASCADE,
    CONSTRAINT uq_achievement_game_steam_key UNIQUE (game_id, steam_key)
);

CREATE TABLE user_achievement (
    id                CHAR(36)  PRIMARY KEY,
    user_id           CHAR(36)  NOT NULL,
    achievement_id    CHAR(36)  NOT NULL,
    unlocked          BIT(1)    NOT NULL DEFAULT 0,
    unlocked_at       TIMESTAMP NULL,
    difficulty_rating INT       NULL,
    CONSTRAINT fk_user_achievement_user FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_achievement_achievement FOREIGN KEY (achievement_id) REFERENCES achievement (id) ON DELETE CASCADE,
    CONSTRAINT uq_user_achievement_user_achievement UNIQUE (user_id, achievement_id),
    CONSTRAINT chk_user_achievement_difficulty_rating CHECK (difficulty_rating BETWEEN 1 AND 5)
);
