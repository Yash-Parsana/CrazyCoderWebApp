# Android vs Web: Firebase behavior differences

Living document. Tracks every place the Android app (`CrazyCoderApp/`) and
this web app talk to the same Firebase project differently, so Android can
be migrated to match. Two sections: **Existing** (found during the initial
audit, independent of any web-app change) and **New** (introduced by a
change made to the web app after that audit - each entry says which commit).

Update this file whenever a web-app change affects Firestore/Storage
paths, field names, security rules, or auth flow in a way Android also
touches.

## Existing mismatches (found 2026-08-26, before any web-app schema change)

### 1. Username lookup mechanism differs entirely

- **Web** (`src/services/firebaseService.js`, `isUsernameExist`): runs a
  Firestore query, `where('username', '==', username)`, directly against
  the `users` collection.
- **Android** (`SignIn.kt`, `SignUp.kt`, `Fragment/chatFragment.kt`): reads
  and writes a single side-index document, `users/userNameToId`, a flat
  `{ username: uid }` map. Signup does
  `firestoreDb.collection("users").document("userNameToId").update(username, uid)`;
  lookups do `it1[userName]` against that same doc.
- **Effect**: a web-app signup is never added to `userNameToId`, so
  Android's add-friend flow can't find/add anyone who signed up through
  the web app. The reverse works (web's query reads the real `username`
  field on every user doc, regardless of which app created it).
- **Decision (2026-08-26)**: drop `userNameToId` entirely. Android should
  switch to the same query-based lookup the web app uses instead of
  maintaining a separate index.
- **Status**: `firestore.rules` no longer grants any special write
  permission for `users/userNameToId` (see commit removing that carve-out).
  **Deploying that rules change before migrating Android will break
  Android's signup flow** (the `userNameToId` write will get
  `permission-denied`) until Android stops writing to that doc.
- **Action needed in Android**: replace every `users/userNameToId` read/
  write with a Firestore query equivalent to `isUsernameExist` above
  (e.g. `firestoreDb.collection("users").whereEqualTo("username", userName).get()`),
  and stop writing to `userNameToId` at signup.

### 2. Avatar upload content-type

- **Web** (`src/services/firebaseService.js`, `uploadImage`): calls
  `uploadBytes(storageRef, file)` with a browser `File` object, which
  carries its own MIME type (e.g. `image/png`) - Storage records a real
  `image/*` content-type automatically.
- **Android** (`Fragment/profileFragment.kt`): calls
  `reference.putBytes(finalImage!!)` with no `StorageMetadata` anywhere in
  the codebase, so the uploaded object's content-type defaults to
  `application/octet-stream`.
- **Effect**: `storage.rules`' avatar-upload rule does **not** enforce an
  `image/*` content-type check, specifically because it would reject every
  Android upload as currently written.
- **Action needed in Android (optional)**: pass
  `StorageMetadata.Builder().setContentType("image/jpeg").build()` (or the
  actual detected type) to `putBytes(bytes, metadata)`. Once both clients
  set a real content-type, the check can be safely added back to
  `storage.rules` for defense-in-depth.

### 3. Platform handles (Codeforces/LeetCode/AtCoder/CodeChef) never sync to Firestore on Android

- **Web**: handles live in Firestore at `handles/{uid}`
  (`myhandles`/`friendshandles` maps), read/written by `Profile.jsx` and
  `LeaderBoard.jsx`.
- **Android**: handle data lives only in a local Room SQLite database
  (`Dao.kt`, `MyDatabase.kt`, `DbRepository.kt`) - grepped the whole app
  tree, no `handles` collection reference exists anywhere in Android.
- **Effect**: handles added on one platform are invisible on the other -
  this isn't a bug introduced by anything in this audit, it's how both
  apps have always worked, but it means the two clients don't actually
  share this part of a user's data despite sharing the same Firebase
  project. Flagging since it's the kind of gap easy to assume is already
  handled.
- **Action needed in Android**: none required unless you want cross-client
  handle sync - that would mean adding Firestore read/write calls to
  Android for the `handles/{uid}` collection, matching the web schema.

## Verified compatible (no action needed)

- **Chat room IDs**: both apps build `chat/{room}/{room}/{messageId}` with
  `room = senderUid + receiverUid` (both directions, no separator) -
  `LetUsChatActivity.kt` matches `Chat.jsx`/`firebaseService.js` exactly.
- **Chat message fields**: `message` (string), `senderId` (string), `time`
  (numeric epoch milliseconds) match exactly on both clients.
- **Auth**: both apps use Firebase Auth natively (email/password + Google
  sign-in) with no custom token/JWT scheme of their own. The web app's
  custom JWT layer removed in this audit was web-only (stored in
  `localStorage`, never touched Firestore or a shared backend), so its
  removal has zero effect on Android.
- **`users/{uid}` core fields**: `email`, `status`, `username`,
  `chatfriends`, `pic` match in name and type on both clients.
- **`chatfriends` cross-user write**: both apps write directly into
  *another* user's `chatfriends` array when adding a friend (no backend
  mediates it) - `firestore.rules` allows this on both sides via a rule
  scoped to only the `chatfriends` field.

## New (introduced by a web-app change after the initial audit)

_(none yet - append here as web-app changes affect anything Android touches)_
