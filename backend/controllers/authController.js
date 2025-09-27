// backend/controllers/authController.js
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const generateToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        userRecord = await admin.auth().createUser({ email, password });
      } else { throw error; }
    }
    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      token: generateToken(userRecord.uid),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      token: generateToken(userRecord.uid),
    });
  } catch (error) {
    res.status(401).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, loginUser };