const express = require('express');
const path = require('path');
const app = express();
const PORT = 3003;
const cors = require('cors');

const bodyParser = require('body-parser');
const fs = require('fs');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fashionAdvisorController = require('./controllers/fashionAdvisorController');
const SB_func = require('./controllers/imgSave');
const userController = require('./controllers/userController');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not set in environment variables');
  process.exit(1);
}
console.log('JWT_SECRET is set and its length is:', JWT_SECRET.length);

app.use(express.json()); //delete if no need for json
app.use(cookieParser());

// commenting out, check with yiqun value of limiting CORS policies
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.post('/api/signup', userController.signUp);
app.post('/api/login', userController.login);
app.post('/api/oauth', userController.oauth);

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { email: decoded.email };
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.clearCookie('authToken');
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Use this middleware for protected routes
app.get('/api/getsaveImg', authMiddleware, SB_func.getSavedImg);
app.post('/api/save', authMiddleware, SB_func.insertItemsToDatabase);
app.get('/api/getsaveImg', authMiddleware, SB_func.getSavedImg);
app.post('/api/save', authMiddleware, SB_func.insertItemsToDatabase);
app.get('/api/check-auth', authMiddleware, (req, res) => {
  res.status(200).json({ authenticated: true });
});

app.post(
  '/api/genImage',
  fashionAdvisorController.ImgGenService,
  (req, res) => {
    console.log('serving image generator');

    return res.status(200);
  }
);

app.post('/api/refineGenImage', (req, res) => {
  console.log('refining generated image');
  return res.status(200);
});

app.post(
  '/api/editImage',
  upload.single('uploadImage'),
  fashionAdvisorController.ImgEditService,
  (req, res) => {
    res.status(200).json({ image_url: res.locals.url });
  }
);

app.post('/api/bing', fashionAdvisorController.matchService, (req, res) => {
  console.log('serving match generator');

  return res.status(200);
});

app.post(
  '/api/bingUpload',
  upload.single('uploadImage'),
  fashionAdvisorController.uploadMatch,
  (req, res) => {
    console.log('serving upload match search');

    return res.status(200);
  }
);

// this should take the user to the first page
app.get('/search', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.delete('/api/deleteImage/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from('images').delete().eq('id', id);

    if (error) throw error;

    res.status(200).send({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  console.log('error finding url');
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  console.log('hit global error');

  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
