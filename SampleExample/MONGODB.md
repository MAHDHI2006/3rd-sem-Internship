# MongoDB setup

This project includes `bd.js` to connect to MongoDB Atlas. For security, the connection string is read from an environment variable.

Steps to connect:

1. Copy `.env.example` to `.env` at the project root.
2. Set `MONGODB_URI` to your MongoDB connection string (do NOT commit your `.env`).

Example `.env` content:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/mydatabase?retryWrites=true&w=majority
```

`bd.js` loads environment variables via `dotenv`. Ensure `dotenv` is installed if you run server-side scripts:

```bash
npm install dotenv
```

If you want, I can add a small `server.js` that imports `bd.js` and starts an Express server.
