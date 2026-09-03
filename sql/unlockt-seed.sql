USE unlockt;

UPDATE game SET cover_art_url = 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg'
    WHERE steam_appid = '367520' AND cover_art_url LIKE 'http://example.com/%';
UPDATE game SET cover_art_url = 'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg'
    WHERE steam_appid = '504230' AND cover_art_url LIKE 'http://example.com/%';

INSERT IGNORE INTO game (id, title, cover_art_url, platform, genre, steam_appid) VALUES
('a1d9c694-9ffb-11f1-92fd-005056c00001', 'Hollow Knight',                 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg',  'PC', 'Metroidvania', '367520'),
('a1d9c961-9ffb-11f1-92fd-005056c00001', 'Celeste',                       'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg',  'PC', 'Platformer',   '504230'),
('b0000000-0000-4000-8000-000000000014', 'Nine Sols',                     'https://cdn.cloudflare.steamstatic.com/steam/apps/1809540/header.jpg', 'PC', 'Metroidvania', '1809540'),
('b0000000-0000-4000-8000-000000000003', 'Dark Souls III',                'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg',  'PC', 'Action RPG',   '374320'),
('b0000000-0000-4000-8000-000000000004', 'Sekiro: Shadows Die Twice',     'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg',  'PC', 'Action RPG',   '814380'),
('b0000000-0000-4000-8000-000000000005', 'Elden Ring',                    'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg', 'PC', 'Action RPG',   '1245620'),
('b0000000-0000-4000-8000-000000000006', 'Hades',                         'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg', 'PC', 'Roguelike',    '1145360'),
('b0000000-0000-4000-8000-000000000007', 'Cuphead',                       'https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg',  'PC', 'Run and Gun',  '268910'),
('b0000000-0000-4000-8000-000000000008', 'Stardew Valley',                'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg',  'PC', 'Farming Sim',  '413150'),
('b0000000-0000-4000-8000-000000000009', 'The Binding of Isaac: Rebirth', 'https://cdn.cloudflare.steamstatic.com/steam/apps/250900/header.jpg',  'PC', 'Roguelike',    '250900'),
('b0000000-0000-4000-8000-000000000010', 'Terraria',                      'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg',  'PC', 'Sandbox',      '105600'),
('b0000000-0000-4000-8000-000000000011', 'Portal 2',                      'https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg',     'PC', 'Puzzle',       '620'),
('b0000000-0000-4000-8000-000000000012', 'Outer Wilds',                   'https://cdn.cloudflare.steamstatic.com/steam/apps/753640/header.jpg',  'PC', 'Adventure',    '753640'),
('b0000000-0000-4000-8000-000000000013', 'Dead Cells',                    'https://cdn.cloudflare.steamstatic.com/steam/apps/588650/header.jpg',  'PC', 'Roguelike',    '588650');

INSERT IGNORE INTO library_entry (id, user_id, game_id, status, overall_rating, difficulty_rating, notes) VALUES
('c0000000-0000-4000-8000-000000000001', (SELECT id FROM `user` WHERE email = 'test@test.com'),    'a1d9c694-9ffb-11f1-92fd-005056c00001', 'COMPLETED', 5, 4,    'Radiance took me three nights.'),
('c0000000-0000-4000-8000-000000000002', (SELECT id FROM `user` WHERE email = 'test@test.com'),    'b0000000-0000-4000-8000-000000000003', 'COMPLETED', 5, 5,    NULL),
('c0000000-0000-4000-8000-000000000003', (SELECT id FROM `user` WHERE email = 'test@test.com'),    'b0000000-0000-4000-8000-000000000004', 'PLAYING',   4, 5,    'Stuck on Genichiro.'),
('c0000000-0000-4000-8000-000000000004', (SELECT id FROM `user` WHERE email = 'test@test.com'),    'b0000000-0000-4000-8000-000000000006', 'COMPLETED', 5, 3,    NULL),
('c0000000-0000-4000-8000-000000000005', (SELECT id FROM `user` WHERE email = 'test@test.com'),    'b0000000-0000-4000-8000-000000000008', 'PLAYING',   4, 1,    NULL),
('c0000000-0000-4000-8000-000000000006', (SELECT id FROM `user` WHERE email = 'test@test.com'),    'b0000000-0000-4000-8000-000000000011', 'COMPLETED', 5, 2,    NULL),
('c0000000-0000-4000-8000-000000000007', (SELECT id FROM `user` WHERE email = 'test@test.com'),    'b0000000-0000-4000-8000-000000000013', 'BACKLOG',   NULL, NULL, NULL),
('c0000000-0000-4000-8000-000000000008', (SELECT id FROM `user` WHERE email = 'test@test.com'),    'b0000000-0000-4000-8000-000000000012', 'DROPPED',   2, 2,    'Bounced off it.'),

('c0000000-0000-4000-8000-000000000009', (SELECT id FROM `user` WHERE email = 'other@test.com'),   'a1d9c694-9ffb-11f1-92fd-005056c00001', 'COMPLETED', 4, 4,    NULL),
('c0000000-0000-4000-8000-000000000010', (SELECT id FROM `user` WHERE email = 'other@test.com'),   'a1d9c961-9ffb-11f1-92fd-005056c00001', 'COMPLETED', 5, 4,    NULL),
('c0000000-0000-4000-8000-000000000011', (SELECT id FROM `user` WHERE email = 'other@test.com'),   'b0000000-0000-4000-8000-000000000003', 'COMPLETED', 4, 5,    NULL),
('c0000000-0000-4000-8000-000000000012', (SELECT id FROM `user` WHERE email = 'other@test.com'),   'b0000000-0000-4000-8000-000000000004', 'COMPLETED', 5, 5,    NULL),
('c0000000-0000-4000-8000-000000000013', (SELECT id FROM `user` WHERE email = 'other@test.com'),   'b0000000-0000-4000-8000-000000000005', 'PLAYING',   5, 5,    NULL),
('c0000000-0000-4000-8000-000000000014', (SELECT id FROM `user` WHERE email = 'other@test.com'),   'b0000000-0000-4000-8000-000000000007', 'PLAYING',   4, 5,    NULL),
('c0000000-0000-4000-8000-000000000015', (SELECT id FROM `user` WHERE email = 'other@test.com'),   'b0000000-0000-4000-8000-000000000009', 'PLAYING',   5, 4,    NULL),
('c0000000-0000-4000-8000-000000000016', (SELECT id FROM `user` WHERE email = 'other@test.com'),   'b0000000-0000-4000-8000-000000000010', 'BACKLOG',   NULL, NULL, NULL),

('c0000000-0000-4000-8000-000000000017', (SELECT id FROM `user` WHERE email = 'newuser@test.com'), 'a1d9c694-9ffb-11f1-92fd-005056c00001', 'COMPLETED', 5, 5,    NULL),
('c0000000-0000-4000-8000-000000000018', (SELECT id FROM `user` WHERE email = 'newuser@test.com'), 'a1d9c961-9ffb-11f1-92fd-005056c00001', 'COMPLETED', 4, 3,    NULL),
('c0000000-0000-4000-8000-000000000019', (SELECT id FROM `user` WHERE email = 'newuser@test.com'), 'b0000000-0000-4000-8000-000000000003', 'COMPLETED', 5, 4,    NULL),
('c0000000-0000-4000-8000-000000000020', (SELECT id FROM `user` WHERE email = 'newuser@test.com'), 'b0000000-0000-4000-8000-000000000004', 'COMPLETED', 4, 5,    NULL),
('c0000000-0000-4000-8000-000000000021', (SELECT id FROM `user` WHERE email = 'newuser@test.com'), 'b0000000-0000-4000-8000-000000000007', 'COMPLETED', 5, 4,    NULL),
('c0000000-0000-4000-8000-000000000022', (SELECT id FROM `user` WHERE email = 'newuser@test.com'), 'b0000000-0000-4000-8000-000000000008', 'COMPLETED', 5, 1,    NULL),
('c0000000-0000-4000-8000-000000000023', (SELECT id FROM `user` WHERE email = 'newuser@test.com'), 'b0000000-0000-4000-8000-000000000011', 'COMPLETED', 5, 2,    NULL),

('c0000000-0000-4000-8000-000000000024', (SELECT id FROM `user` WHERE email = 'newlogin@test.com'),'b0000000-0000-4000-8000-000000000005', 'COMPLETED', 5, 4,    NULL),
('c0000000-0000-4000-8000-000000000025', (SELECT id FROM `user` WHERE email = 'newlogin@test.com'),'b0000000-0000-4000-8000-000000000006', 'COMPLETED', 4, 3,    NULL),
('c0000000-0000-4000-8000-000000000026', (SELECT id FROM `user` WHERE email = 'newlogin@test.com'),'b0000000-0000-4000-8000-000000000007', 'PLAYING',   4, 5,    NULL),
('c0000000-0000-4000-8000-000000000027', (SELECT id FROM `user` WHERE email = 'newlogin@test.com'),'b0000000-0000-4000-8000-000000000009', 'COMPLETED', 4, 4,    NULL),
('c0000000-0000-4000-8000-000000000028', (SELECT id FROM `user` WHERE email = 'newlogin@test.com'),'b0000000-0000-4000-8000-000000000013', 'PLAYING',   4, 4,    NULL);
