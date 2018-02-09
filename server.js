// Dependencies
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');

// App setup
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Nextjs instance
app
  .prepare()
  .then(() => {
    const server = express();

    // App routes
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    // App listen
    server.listen(3000, err => {
      if (err) throw err;
      else console.log('App running on port 3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
