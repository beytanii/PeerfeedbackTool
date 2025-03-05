const express = require("express");
var cors = require("cors");
const app = express();

const allowedOrigins = [
  'https://peerfeedback.betbet.website',  // Production frontend
  'http://localhost:5173'                 // Local development frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Import routes
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const formRoutes = require('./routes/formRoutes');
const answersRoutes = require('./routes/answersRoutes');
const loginRoutes = require('./routes/loginRoutes');
const teamRoutes = require('./routes/teamRoutes');
const { auth } = require('express-openid-connect');

// Attach routes to application
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/forms', formRoutes);
app.use('/answers', answersRoutes);
app.use('/teams', teamRoutes);

// Auth0 configuration
const config = {
  authRequired: true, // Require authentication on each access
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'https://peerfeedback.betbet.website',
  clientID: 'Zze2CJFNGtgqYvYAKiFWjTuNdx32Gk6d',
  issuerBaseURL: 'https://dev-z2llo60h8iwncw7w.us.auth0.com',
  authorizationParams: {
    prompt: 'login' // Force Okta to prompt for login each time
  }
};


// Auth middleware (attaches /login, /logout, and /callback routes)
app.use(auth(config));

// Root route to check login status
app.get('/', (req, res) => {
  console.log(req.oidc.isAuthenticated());
  if (req.oidc.isAuthenticated()) {
    res.redirect('https://peerfeedback.betbet.website:5173/')
  } else {
    res.redirect('https://api.peerfeedback.betbet.website/login')
  }
});

app.get('/logout', (req, res) => {
  res.oidc.logout({ returnTo: 'https://api.peerfeedback.betbet.website' }); // Adjust 'returnTo' URL as needed
});

// Profile route to get user information
app.get('/profile', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.json(req.oidc.user); // Sends user info as JSON
  } else {
    res.status(401).json({ message: 'User is not authenticated' });
  }
});

// Start the server
app.listen(1000, () => {
  console.log("Started application on port 1000");
});
