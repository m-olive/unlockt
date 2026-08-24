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
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
