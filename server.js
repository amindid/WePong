// const express = require('express');
// const app = express();
// const path = require('path');
// const port = 3000;
//
// let tt = path.join(__dirname)

// app.use(express.static(tt + '/frontend'));

// app.use(function(req, res, next) {
//   res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net");
//   return next();
// });

// app.get('/', (req, res) => {
//     res.sendFile(tt + '/frontend/html/base.html');
// })

// app.listen(port, () => {
//   console.log(`App listening at http://127.0.0.1:${port}`);
// });

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Set the path to your frontend directory
const frontendPath = path.join(__dirname, 'frontend');

// Serve static files from the frontend directory
app.use(express.static(frontendPath));

// Set Content Security Policy header
app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net");
  next();
});

// Serve the base HTML file for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'html', 'base.html'));
});

// Catch-all route to serve the base HTML file for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'html', 'base.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://127.0.0.1:${port}`);
});
