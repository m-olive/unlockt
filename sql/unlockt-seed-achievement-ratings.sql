USE unlockt;

INSERT INTO user_achievement (id, user_id, achievement_id, unlocked, difficulty_rating)
SELECT UUID(), u.id, a.id, 0, r.rating
FROM (
    SELECT '367520' AS appid, 'Embrace the Void' AS ach, 'test@test.com' AS email, 5 AS rating
    UNION ALL SELECT '367520', 'Embrace the Void', 'other@test.com', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'b@b.com', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'newuser@test.com', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'newlogin@test.com', 5
    UNION ALL SELECT '367520', 'Steel Soul', 'test@test.com', 5
    UNION ALL SELECT '367520', 'Steel Soul', 'other@test.com', 5
    UNION ALL SELECT '367520', 'Steel Soul', 'b@b.com', 4
    UNION ALL SELECT '367520', 'Steel Soul', 'newuser@test.com', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'test@test.com', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'other@test.com', 4
    UNION ALL SELECT '367520', 'Pure Completion', 'test@test.com', 4
    UNION ALL SELECT '367520', 'Pure Completion', 'other@test.com', 5
    UNION ALL SELECT '367520', 'Pure Completion', 'b@b.com', 4
    UNION ALL SELECT '367520', 'Speed Completion', 'test@test.com', 4
    UNION ALL SELECT '367520', 'Speed Completion', 'other@test.com', 4
    UNION ALL SELECT '367520', 'Speed Completion', 'b@b.com', 4
    UNION ALL SELECT '367520', 'Dream No More', 'test@test.com', 3
    UNION ALL SELECT '367520', 'Dream No More', 'other@test.com', 4
    UNION ALL SELECT '367520', 'Dream No More', 'b@b.com', 3
    UNION ALL SELECT '268910', 'Perfect Run', 'test@test.com', 5
    UNION ALL SELECT '268910', 'Perfect Run', 'other@test.com', 4
    UNION ALL SELECT '268910', 'Perfect Run', 'b@b.com', 5
    UNION ALL SELECT '268910', 'Pacifist', 'test@test.com', 4
    UNION ALL SELECT '268910', 'Pacifist', 'other@test.com', 4
    UNION ALL SELECT '268910', 'Pacifist', 'b@b.com', 5
    UNION ALL SELECT '268910', 'Beat The Devil At His Own Game', 'test@test.com', 4
    UNION ALL SELECT '268910', 'Beat The Devil At His Own Game', 'other@test.com', 4
    UNION ALL SELECT '268910', 'A King''s Admiration', 'test@test.com', 3
    UNION ALL SELECT '268910', 'A King''s Admiration', 'other@test.com', 4
    UNION ALL SELECT '268910', 'A King''s Admiration', 'b@b.com', 3
    UNION ALL SELECT '268910', 'Souls Saved', 'test@test.com', 3
    UNION ALL SELECT '268910', 'Souls Saved', 'other@test.com', 2
    UNION ALL SELECT '268910', 'Souls Saved', 'b@b.com', 3
    UNION ALL SELECT '268910', 'Coffers Full', 'test@test.com', 2
    UNION ALL SELECT '268910', 'Coffers Full', 'other@test.com', 2
    UNION ALL SELECT '268910', 'A Day at the Fair', 'test@test.com', 2
    UNION ALL SELECT '268910', 'A Day at the Fair', 'other@test.com', 1
    UNION ALL SELECT '268910', 'A Day at the Fair', 'b@b.com', 2
) AS r
JOIN game g ON g.steam_appid = r.appid
JOIN achievement a ON a.game_id = g.id AND a.name = r.ach
JOIN `user` u ON u.email = r.email
ON DUPLICATE KEY UPDATE difficulty_rating = VALUES(difficulty_rating);
