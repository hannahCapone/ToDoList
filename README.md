# To-Do List

A to-do list app with a database behind it, built for Server Side Web Development at the University of Westminster in London. Add, edit, and remove tasks; everything is saved in MongoDB.

**Live:** https://hannahcapone.github.io/ToDoList/

**Built with:** Node.js, Express, EJS, MongoDB (Mongoose)

GitHub Pages can't run a Node server, so the live link is `index.html`: the same pages in the browser, with tasks saved in your browser's storage instead of MongoDB. The full Express + MongoDB app is `index.js`, `models/`, and `views/`.

## Run it locally

1. `npm install`
2. Copy `.env.example` to `.env` and set `DB_CONNECT` to your MongoDB connection string (a free MongoDB Atlas cluster works).
3. `npm start`, then open http://localhost:3000
