USE unlockt;

ALTER TABLE `user`
    ADD COLUMN avatar           VARCHAR(32)  NULL AFTER steam_id64,
    ADD COLUMN steam_avatar_url VARCHAR(500) NULL AFTER avatar;
