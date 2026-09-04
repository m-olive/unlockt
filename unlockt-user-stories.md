# User stories

## Auth (MVP)

- User clicks "register," enters an email and password: new account created.
- User clicks "register," enters an email that is already taken: error message.
- User clicks "log in," enters their email and password: taken to their library.
- User clicks "log in," enters an incorrect email or password: error message.
- User clicks "log out": returned to the landing page as a signed-out visitor.

## Third-party login

- User clicks "Continue with GitHub" on the log in or register page, authorizes the app, and is returned to their library with an account created.
- User clicks "Continue with Google" on the log in or register page, authorizes the app, and is returned to their library with an account created.
- User who already has a password account signs in with a provider using the same email address is logged into the same account.

## Steam linking and import (MVP)

- User clicks "Link Steam," enters their Steam profile URL or vanity name: their owned games are imported into their library.
- User sees a summary after importing: how many games were added, how many were already in their library, and how many they own on Steam.
- User with a private profile sees an error message explaining that their Steam privacy settings are blocking the import.
- User who is already linked sees their Steam ID and the date of their last import, can click "Update my library" to re-import automatically.
- User re-imports and their existing statuses, notes, and ratings are left untouched.
- User clicks "Link a different account" to replace the Steam account their library is linked to.

## Library management (MVP)

- User clicks a game in their library and changes its status.
- User clicks a game in their library and enters personal notes.
- User clicks a game in their library and sets an overall rating.
- User clicks a game in their library and sets a difficulty rating.
- User clicks a filter option: library narrowed to matching games.
- User clicks a sort option: library reordered.
- User clicks remove on a library entry: deleted from their library.

## Game detail

- User clicks a game: cover art, title, and the community's average overall rating and average difficulty rating
- Signed-out visitor opens a game's page directly by link.
- User who owns the game sees an "Owned" badge.
- User saves a change: the community averages on the page update to include it.

## Achievement tracking (MVP)

- User clicks a game: a list of that game's achievements, each marked unlocked or locked, with its icon and description.
- User sees how many of the game's achievements they have unlocked, as a count of the total.
- User sees the date and time an unlocked achievement was unlocked.
- User filters the achievement list to show only unlocked or only locked achievements.
- User sets a personal difficulty rating on an individual achievement.

## Community achievement difficulty

- User sees each achievement's community average difficulty and how many people have rated it, or "No community rating yet."

## Browse and search

- Visitor clicks "Browse games": a sample of games already in the app, reshuffled on each visit.
- Visitor searches by title: matching games, each with its community difficulty or "No ratings yet."

## Difficulty leaderboards (MVP)

- Visitor clicks "Leaderboard": games ranked by average community difficulty, hardest first, alongside a second board ranking individual achievements the same way.
- Visitor sees each row's average difficulty and the number of votes behind it.
- Games and achievements with too few ratings to meet the minimum-vote threshold are excluded from ranking.

## Appearance

- User opens the account menu and switches between dark and light mode; the choice survives a reload.
- User opens the account menu and sets their profile picture to their Steam avatar, one of the preset icons, or back to their initial.
