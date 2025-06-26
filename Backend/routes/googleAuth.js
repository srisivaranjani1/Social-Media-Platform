const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
const EMAIL_DOMAIN = '@sece.ac.in'; 

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    hd: 'sece.ac.in', 
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  (req, res) => {
    const userEmail = req.user.email.toLowerCase().trim();

   
    if (!userEmail.endsWith(EMAIL_DOMAIN)) {
      return res.status(403).send('Only @sece.ac.in emails are allowed');
    }

    
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

module.exports = router;
