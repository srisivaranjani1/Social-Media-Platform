exports.googleCallback = async (req, res) => {
  try {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
   
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  } catch (err) {
    console.error('Google OAuth Error:', err.message);
    res.status(500).send('Authentication failed');
  }
};
