# MVP user stories

## Auth

- User clicks "register", enters email and password that are already taken, gets error message
- User clicks "log in," enters incorrect email and password, gets error message 
- User clicks "register," enters email and password, and gets a new account created.
- User clicks "log in," enters email and password, and is taken to their dashboard.
- User clicks "log out" and is returned to the login page.

## Steam linking

- User clicks "link Steam account," enters their Steam profile URL/vanity name, and their owned - games are imported into their library.
- User clicks "link Steam account" with a private profile and sees an error message explaining their Steam privacy settings are blocking the import.

## Manual game entry

- User clicks "add game," searches by title for game that doesn't exist, sees Game not found message.
- User clicks "add game," searches by title, and selects a result to add it to their library.
- User clicks "add game" and finds a result missing key info (cover art, genre) and can still add it with the available data.

## Library management

- User clicks a game in their library and changes its status (backlog/playing/completed/dropped).
- User clicks a game in their library and enters a personal notes field.
- User clicks a game in their library and sets an overall rating (1-5).
- User clicks a game in their library and sets an overall difficulty rating (1-5).
- User clicks a filter option (status, genre, platform) and sees their library narrowed to matching games.
- User clicks a sort option and sees their library reordered accordingly.
- User clicks "remove" on a library entry and it's deleted from their library.

## Achievement tracking

- User clicks a game in their library and sees a list of that game's achievements, each marked unlocked or locked.
- User clicks an unlocked achievement and sees the date it was unlocked.
- User clicks an achievement and sets a personal difficulty rating (1-5) for it.
- User clicks a game with no achievement data available (e.g., a manually-added non-Steam game) and sees a message that achievements aren't tracked for that title.

## Difficulty leaderboard

- User clicks "leaderboard" and sees games ranked by average community difficulty rating, highest first.
- User clicks a game on the leaderboard and is taken to that game's detail page.
- User views the leaderboard and games with too few ratings to meet the minimum-vote threshold are excluded from ranking.
