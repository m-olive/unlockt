USE unlockt;

INSERT INTO library_entry (id, user_id, game_id, status, overall_rating, difficulty_rating)
SELECT UUID(), u.id, g.id, r.status, r.overall, r.difficulty
FROM (
    SELECT '367520' AS appid, 'hollowsoul@demo.unlockt' AS email, 'COMPLETED' AS status, 5 AS overall, 5 AS difficulty
    UNION ALL SELECT '367520', 'parrykin@demo.unlockt', 'PLAYING', 5, 5
    UNION ALL SELECT '367520', 'nogold@demo.unlockt', 'DROPPED', 4, 5
    UNION ALL SELECT '367520', 'ashenone@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '367520', 'deathless@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '367520', 'strawberry@demo.unlockt', 'COMPLETED', 4, 5
    UNION ALL SELECT '367520', 'shinobi@demo.unlockt', 'PLAYING', 5, 5
    UNION ALL SELECT '367520', 'voidheart@demo.unlockt', 'DROPPED', 5, 5
    UNION ALL SELECT '367520', 'solseeker@demo.unlockt', 'COMPLETED', 4, 5
    UNION ALL SELECT '367520', 'onehitwonder@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '1245620', 'hollowsoul@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '1245620', 'parrykin@demo.unlockt', 'PLAYING', 5, 5
    UNION ALL SELECT '1245620', 'nogold@demo.unlockt', 'DROPPED', 4, 5
    UNION ALL SELECT '1245620', 'ashenone@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '1245620', 'deathless@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '1245620', 'strawberry@demo.unlockt', 'COMPLETED', 4, 5
    UNION ALL SELECT '1245620', 'shinobi@demo.unlockt', 'PLAYING', 5, 5
    UNION ALL SELECT '1245620', 'voidheart@demo.unlockt', 'DROPPED', 5, 5
    UNION ALL SELECT '1245620', 'solseeker@demo.unlockt', 'COMPLETED', 4, 4
    UNION ALL SELECT '1245620', 'onehitwonder@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '1809540', 'hollowsoul@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '1809540', 'parrykin@demo.unlockt', 'PLAYING', 5, 5
    UNION ALL SELECT '1809540', 'nogold@demo.unlockt', 'DROPPED', 4, 5
    UNION ALL SELECT '1809540', 'ashenone@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '1809540', 'deathless@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '1809540', 'strawberry@demo.unlockt', 'COMPLETED', 4, 5
    UNION ALL SELECT '1809540', 'shinobi@demo.unlockt', 'PLAYING', 5, 4
    UNION ALL SELECT '1809540', 'voidheart@demo.unlockt', 'DROPPED', 5, 4
    UNION ALL SELECT '1809540', 'solseeker@demo.unlockt', 'COMPLETED', 4, 4
    UNION ALL SELECT '1809540', 'onehitwonder@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '814380', 'hollowsoul@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '814380', 'parrykin@demo.unlockt', 'PLAYING', 5, 5
    UNION ALL SELECT '814380', 'nogold@demo.unlockt', 'DROPPED', 4, 5
    UNION ALL SELECT '814380', 'ashenone@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '814380', 'deathless@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '814380', 'strawberry@demo.unlockt', 'COMPLETED', 4, 4
    UNION ALL SELECT '814380', 'shinobi@demo.unlockt', 'PLAYING', 5, 4
    UNION ALL SELECT '814380', 'voidheart@demo.unlockt', 'DROPPED', 5, 4
    UNION ALL SELECT '814380', 'solseeker@demo.unlockt', 'COMPLETED', 4, 4
    UNION ALL SELECT '814380', 'onehitwonder@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '504230', 'hollowsoul@demo.unlockt', 'COMPLETED', 5, 5
    UNION ALL SELECT '504230', 'parrykin@demo.unlockt', 'PLAYING', 5, 5
    UNION ALL SELECT '504230', 'nogold@demo.unlockt', 'DROPPED', 4, 5
    UNION ALL SELECT '504230', 'ashenone@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '504230', 'deathless@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '504230', 'strawberry@demo.unlockt', 'COMPLETED', 4, 4
    UNION ALL SELECT '504230', 'shinobi@demo.unlockt', 'PLAYING', 5, 4
    UNION ALL SELECT '504230', 'voidheart@demo.unlockt', 'DROPPED', 5, 4
    UNION ALL SELECT '504230', 'solseeker@demo.unlockt', 'COMPLETED', 4, 4
    UNION ALL SELECT '504230', 'onehitwonder@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '268910', 'hollowsoul@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '268910', 'parrykin@demo.unlockt', 'PLAYING', 5, 4
    UNION ALL SELECT '268910', 'nogold@demo.unlockt', 'DROPPED', 4, 4
    UNION ALL SELECT '268910', 'ashenone@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '268910', 'deathless@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '268910', 'strawberry@demo.unlockt', 'COMPLETED', 4, 4
    UNION ALL SELECT '268910', 'shinobi@demo.unlockt', 'PLAYING', 5, 4
    UNION ALL SELECT '268910', 'voidheart@demo.unlockt', 'DROPPED', 5, 4
    UNION ALL SELECT '268910', 'solseeker@demo.unlockt', 'COMPLETED', 4, 4
    UNION ALL SELECT '268910', 'onehitwonder@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '374320', 'hollowsoul@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '374320', 'parrykin@demo.unlockt', 'PLAYING', 5, 4
    UNION ALL SELECT '374320', 'nogold@demo.unlockt', 'DROPPED', 4, 4
    UNION ALL SELECT '374320', 'ashenone@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '374320', 'deathless@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '374320', 'strawberry@demo.unlockt', 'COMPLETED', 4, 3
    UNION ALL SELECT '374320', 'shinobi@demo.unlockt', 'PLAYING', 5, 3
    UNION ALL SELECT '374320', 'voidheart@demo.unlockt', 'DROPPED', 5, 3
    UNION ALL SELECT '250900', 'hollowsoul@demo.unlockt', 'COMPLETED', 5, 4
    UNION ALL SELECT '250900', 'parrykin@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '250900', 'nogold@demo.unlockt', 'PLAYING', 4, 3
    UNION ALL SELECT '250900', 'ashenone@demo.unlockt', 'DROPPED', 5, 3
    UNION ALL SELECT '250900', 'deathless@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '250900', 'strawberry@demo.unlockt', 'COMPLETED', 4, 3
    UNION ALL SELECT '250900', 'shinobi@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '588650', 'hollowsoul@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '588650', 'parrykin@demo.unlockt', 'PLAYING', 5, 3
    UNION ALL SELECT '588650', 'nogold@demo.unlockt', 'DROPPED', 4, 3
    UNION ALL SELECT '588650', 'ashenone@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '588650', 'deathless@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '588650', 'strawberry@demo.unlockt', 'COMPLETED', 4, 3
    UNION ALL SELECT '1145360', 'hollowsoul@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '1145360', 'parrykin@demo.unlockt', 'COMPLETED', 5, 3
    UNION ALL SELECT '1145360', 'nogold@demo.unlockt', 'COMPLETED', 4, 3
    UNION ALL SELECT '1145360', 'ashenone@demo.unlockt', 'PLAYING', 5, 3
    UNION ALL SELECT '1145360', 'deathless@demo.unlockt', 'DROPPED', 5, 2
    UNION ALL SELECT '1145360', 'strawberry@demo.unlockt', 'COMPLETED', 4, 2
    UNION ALL SELECT '105600', 'hollowsoul@demo.unlockt', 'PLAYING', 5, 3
    UNION ALL SELECT '105600', 'parrykin@demo.unlockt', 'DROPPED', 5, 3
    UNION ALL SELECT '105600', 'nogold@demo.unlockt', 'COMPLETED', 4, 2
    UNION ALL SELECT '105600', 'ashenone@demo.unlockt', 'COMPLETED', 5, 2
    UNION ALL SELECT '105600', 'deathless@demo.unlockt', 'COMPLETED', 5, 2
    UNION ALL SELECT '753640', 'hollowsoul@demo.unlockt', 'PLAYING', 5, 2
    UNION ALL SELECT '753640', 'parrykin@demo.unlockt', 'DROPPED', 5, 2
    UNION ALL SELECT '753640', 'nogold@demo.unlockt', 'COMPLETED', 4, 2
    UNION ALL SELECT '753640', 'ashenone@demo.unlockt', 'COMPLETED', 5, 2
    UNION ALL SELECT '753640', 'deathless@demo.unlockt', 'COMPLETED', 5, 2
    UNION ALL SELECT '620', 'hollowsoul@demo.unlockt', 'PLAYING', 5, 2
    UNION ALL SELECT '620', 'parrykin@demo.unlockt', 'DROPPED', 5, 2
    UNION ALL SELECT '620', 'nogold@demo.unlockt', 'COMPLETED', 4, 2
    UNION ALL SELECT '620', 'ashenone@demo.unlockt', 'COMPLETED', 5, 2
    UNION ALL SELECT '620', 'deathless@demo.unlockt', 'COMPLETED', 5, 1
    UNION ALL SELECT '413150', 'hollowsoul@demo.unlockt', 'PLAYING', 5, 2
    UNION ALL SELECT '413150', 'parrykin@demo.unlockt', 'DROPPED', 5, 1
    UNION ALL SELECT '413150', 'nogold@demo.unlockt', 'COMPLETED', 4, 1
    UNION ALL SELECT '413150', 'ashenone@demo.unlockt', 'COMPLETED', 5, 1
) AS r
JOIN game g ON g.steam_appid = r.appid
JOIN `user` u ON u.email = r.email
ON DUPLICATE KEY UPDATE difficulty_rating = VALUES(difficulty_rating), overall_rating = VALUES(overall_rating);

INSERT INTO user_achievement (id, user_id, achievement_id, unlocked, difficulty_rating)
SELECT UUID(), u.id, a.id, 0, r.rating
FROM (
    SELECT '367520' AS appid, 'Embrace the Void' AS ach, 'hollowsoul@demo.unlockt' AS email, 5 AS rating
    UNION ALL SELECT '367520', 'Embrace the Void', 'parrykin@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'nogold@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'ashenone@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'deathless@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'strawberry@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'shinobi@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'voidheart@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'solseeker@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Embrace the Void', 'onehitwonder@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'hollowsoul@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'parrykin@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'nogold@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'ashenone@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'deathless@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'strawberry@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'shinobi@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'voidheart@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'solseeker@demo.unlockt', 5
    UNION ALL SELECT '367520', 'Steel Heart', 'onehitwonder@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Farewell', 'hollowsoul@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Farewell', 'parrykin@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Farewell', 'nogold@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Farewell', 'ashenone@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Farewell', 'deathless@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Farewell', 'strawberry@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Farewell', 'shinobi@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Farewell', 'voidheart@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Farewell', 'solseeker@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Farewell', 'onehitwonder@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Wow', 'hollowsoul@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Wow', 'parrykin@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Wow', 'nogold@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Wow', 'ashenone@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Wow', 'deathless@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Wow', 'strawberry@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Wow', 'shinobi@demo.unlockt', 5
    UNION ALL SELECT '504230', 'Wow', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Wow', 'solseeker@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Wow', 'onehitwonder@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'Shooting Star', 'hollowsoul@demo.unlockt', 5
    UNION ALL SELECT '1809540', 'Shooting Star', 'parrykin@demo.unlockt', 5
    UNION ALL SELECT '1809540', 'Shooting Star', 'nogold@demo.unlockt', 5
    UNION ALL SELECT '1809540', 'Shooting Star', 'ashenone@demo.unlockt', 5
    UNION ALL SELECT '1809540', 'Shooting Star', 'deathless@demo.unlockt', 5
    UNION ALL SELECT '1809540', 'Shooting Star', 'strawberry@demo.unlockt', 5
    UNION ALL SELECT '1809540', 'Shooting Star', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'Shooting Star', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'Shooting Star', 'solseeker@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'Shooting Star', 'onehitwonder@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'hollowsoul@demo.unlockt', 5
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'parrykin@demo.unlockt', 5
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'nogold@demo.unlockt', 5
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'ashenone@demo.unlockt', 5
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'deathless@demo.unlockt', 5
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'solseeker@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Shardbearer Malenia', 'onehitwonder@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Demon of Hatred', 'hollowsoul@demo.unlockt', 5
    UNION ALL SELECT '814380', 'Demon of Hatred', 'parrykin@demo.unlockt', 5
    UNION ALL SELECT '814380', 'Demon of Hatred', 'nogold@demo.unlockt', 5
    UNION ALL SELECT '814380', 'Demon of Hatred', 'ashenone@demo.unlockt', 5
    UNION ALL SELECT '814380', 'Demon of Hatred', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Demon of Hatred', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Demon of Hatred', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Demon of Hatred', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Demon of Hatred', 'solseeker@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Demon of Hatred', 'onehitwonder@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Sword Saint, Isshin Ashina', 'hollowsoul@demo.unlockt', 5
    UNION ALL SELECT '814380', 'Sword Saint, Isshin Ashina', 'parrykin@demo.unlockt', 5
    UNION ALL SELECT '814380', 'Sword Saint, Isshin Ashina', 'nogold@demo.unlockt', 5
    UNION ALL SELECT '814380', 'Sword Saint, Isshin Ashina', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Sword Saint, Isshin Ashina', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Sword Saint, Isshin Ashina', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Sword Saint, Isshin Ashina', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Sword Saint, Isshin Ashina', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Sword Saint, Isshin Ashina', 'solseeker@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'One Man Army', 'hollowsoul@demo.unlockt', 5
    UNION ALL SELECT '1809540', 'One Man Army', 'parrykin@demo.unlockt', 5
    UNION ALL SELECT '1809540', 'One Man Army', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'One Man Army', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'One Man Army', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'One Man Army', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'One Man Army', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'One Man Army', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'One Man Army', 'solseeker@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Pacifist', 'hollowsoul@demo.unlockt', 5
    UNION ALL SELECT '268910', 'Pacifist', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Pacifist', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Pacifist', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Pacifist', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Pacifist', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Pacifist', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Pacifist', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Pacifist', 'solseeker@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Pacifist', 'onehitwonder@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Steel Soul', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Steel Soul', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Steel Soul', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Steel Soul', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Steel Soul', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Steel Soul', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Steel Soul', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Steel Soul', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Dragonlord Placidusax', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Dragonlord Placidusax', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Dragonlord Placidusax', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Dragonlord Placidusax', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Dragonlord Placidusax', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Dragonlord Placidusax', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Dragonlord Placidusax', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Dragonlord Placidusax', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'No Pain, No Gain', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'No Pain, No Gain', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'No Pain, No Gain', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'No Pain, No Gain', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'No Pain, No Gain', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'No Pain, No Gain', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'No Pain, No Gain', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'No Pain, No Gain', 'voidheart@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Perfect Run', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Perfect Run', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Perfect Run', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Perfect Run', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Perfect Run', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Perfect Run', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Perfect Run', 'shinobi@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Perfect Run', 'voidheart@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Perfect Run', 'solseeker@demo.unlockt', 3
    UNION ALL SELECT '504230', 'Impress Your Friends', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Impress Your Friends', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Impress Your Friends', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Impress Your Friends', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Impress Your Friends', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Impress Your Friends', 'strawberry@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Impress Your Friends', 'shinobi@demo.unlockt', 3
    UNION ALL SELECT '367520', 'Pure Completion', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Pure Completion', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Pure Completion', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Pure Completion', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Pure Completion', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Pure Completion', 'strawberry@demo.unlockt', 3
    UNION ALL SELECT '367520', 'Pure Completion', 'shinobi@demo.unlockt', 3
    UNION ALL SELECT '1245620', 'Maliketh the Black Blade', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Maliketh the Black Blade', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Maliketh the Black Blade', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Maliketh the Black Blade', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Maliketh the Black Blade', 'deathless@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Maliketh the Black Blade', 'strawberry@demo.unlockt', 3
    UNION ALL SELECT '1245620', 'Maliketh the Black Blade', 'shinobi@demo.unlockt', 3
    UNION ALL SELECT '268910', 'A King''s Admiration', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '268910', 'A King''s Admiration', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '268910', 'A King''s Admiration', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '268910', 'A King''s Admiration', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '268910', 'A King''s Admiration', 'deathless@demo.unlockt', 3
    UNION ALL SELECT '268910', 'A King''s Admiration', 'strawberry@demo.unlockt', 3
    UNION ALL SELECT '268910', 'A King''s Admiration', 'shinobi@demo.unlockt', 3
    UNION ALL SELECT '814380', 'Master of the Arts', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Master of the Arts', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Master of the Arts', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Master of the Arts', 'ashenone@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Master of the Arts', 'deathless@demo.unlockt', 3
    UNION ALL SELECT '814380', 'Master of the Arts', 'strawberry@demo.unlockt', 3
    UNION ALL SELECT '1809540', 'The Warrior Within', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'The Warrior Within', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'The Warrior Within', 'nogold@demo.unlockt', 4
    UNION ALL SELECT '1809540', 'The Warrior Within', 'ashenone@demo.unlockt', 3
    UNION ALL SELECT '1809540', 'The Warrior Within', 'deathless@demo.unlockt', 3
    UNION ALL SELECT '1809540', 'The Warrior Within', 'strawberry@demo.unlockt', 3
    UNION ALL SELECT '1245620', 'Legendary Sorceries and Incantations', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Legendary Sorceries and Incantations', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '1245620', 'Legendary Sorceries and Incantations', 'nogold@demo.unlockt', 3
    UNION ALL SELECT '1245620', 'Legendary Sorceries and Incantations', 'ashenone@demo.unlockt', 3
    UNION ALL SELECT '1245620', 'Legendary Sorceries and Incantations', 'deathless@demo.unlockt', 3
    UNION ALL SELECT '1245620', 'Legendary Sorceries and Incantations', 'strawberry@demo.unlockt', 3
    UNION ALL SELECT '367520', 'Speedrun 2', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Speedrun 2', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '367520', 'Speedrun 2', 'nogold@demo.unlockt', 3
    UNION ALL SELECT '367520', 'Speedrun 2', 'ashenone@demo.unlockt', 3
    UNION ALL SELECT '367520', 'Speedrun 2', 'deathless@demo.unlockt', 3
    UNION ALL SELECT '367520', 'Speedrun 2', 'strawberry@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Beat The Devil At His Own Game', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Beat The Devil At His Own Game', 'parrykin@demo.unlockt', 4
    UNION ALL SELECT '268910', 'Beat The Devil At His Own Game', 'nogold@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Beat The Devil At His Own Game', 'ashenone@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Beat The Devil At His Own Game', 'deathless@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Beat The Devil At His Own Game', 'strawberry@demo.unlockt', 3
    UNION ALL SELECT '504230', 'Strawberry Medal', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '504230', 'Strawberry Medal', 'parrykin@demo.unlockt', 3
    UNION ALL SELECT '504230', 'Strawberry Medal', 'nogold@demo.unlockt', 3
    UNION ALL SELECT '504230', 'Strawberry Medal', 'ashenone@demo.unlockt', 3
    UNION ALL SELECT '504230', 'Strawberry Medal', 'deathless@demo.unlockt', 3
    UNION ALL SELECT '814380', 'Great Shinobi - Owl', 'hollowsoul@demo.unlockt', 4
    UNION ALL SELECT '814380', 'Great Shinobi - Owl', 'parrykin@demo.unlockt', 3
    UNION ALL SELECT '814380', 'Great Shinobi - Owl', 'nogold@demo.unlockt', 3
    UNION ALL SELECT '814380', 'Great Shinobi - Owl', 'ashenone@demo.unlockt', 3
    UNION ALL SELECT '814380', 'Great Shinobi - Owl', 'deathless@demo.unlockt', 3
    UNION ALL SELECT '1809540', 'Well Prepared', 'hollowsoul@demo.unlockt', 3
    UNION ALL SELECT '1809540', 'Well Prepared', 'parrykin@demo.unlockt', 3
    UNION ALL SELECT '1809540', 'Well Prepared', 'nogold@demo.unlockt', 3
    UNION ALL SELECT '1809540', 'Well Prepared', 'ashenone@demo.unlockt', 3
    UNION ALL SELECT '1809540', 'Well Prepared', 'deathless@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Souls Saved', 'hollowsoul@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Souls Saved', 'parrykin@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Souls Saved', 'nogold@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Souls Saved', 'ashenone@demo.unlockt', 3
    UNION ALL SELECT '268910', 'Souls Saved', 'deathless@demo.unlockt', 2
) AS r
JOIN game g ON g.steam_appid = r.appid
JOIN achievement a ON a.game_id = g.id AND a.name = r.ach
JOIN `user` u ON u.email = r.email
ON DUPLICATE KEY UPDATE difficulty_rating = VALUES(difficulty_rating);
