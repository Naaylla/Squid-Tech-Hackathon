const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const login = require('../controllers/auth.controller');
const router_auth = express.Router();

// Route de connexion
router_auth.post('/login', login);

// Route de deconnexion
router_auth.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

// Route de succès de OAuth
router_auth.get('/login/success', (req, res) => {
    if (req.user) {
        const token = jwt.sign(req.user, process.env.JWT_SECRET_KEY);
        res.status(200).json({
            success: true,
            message: "Succès",
            user: req.user,
            token: token
        });
        res.redirect(`${BASE_URL}`)
    } else {
        res.status(401).json({
            success: false,
            message: "Utilisateur non authentifié"
        });
    }
});

// Route d'échec de OAuth
router_auth.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "Erreur d'authentification"
    });
});

// Route d'authentification avec Google
router_auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de Google OAuth
router_auth.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login/failed" }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

module.exports = router_auth;
