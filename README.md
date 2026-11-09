# Bhim Majhi — Portfolio + Firebase Live Gallery

## One-line commands
Run locally:
```
python3 -m http.server 8000
```
Deploy to GitHub Pages:
```
git add -A && git commit -m "update" && git push
```

## Firebase setup (once)
1. Authentication → enable Email/Password, create admin user.
2. Create Firestore Database and Storage.
3. Paste `firebase/firestore.rules` and `firebase/storage.rules` into the Rules tabs and Publish.

Upload new posts from `/admin.html`; the public site updates in real time.
