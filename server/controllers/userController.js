// server/controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://lcrvtqwzfotayluyrocd.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const JWT_SECRET = process.env.JWT_SECRET;

const userController = {};

userController.signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('user')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into the database
    const { data, error } = await supabase.from('user').insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ error: error.message });
  }
};

userController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create and assign a token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('Generated token:', token);

    // Set the token as an HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
      path: '/',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: error.message });
  }
};

userController.oauth = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let currentUser;
    // Check if user already exists
    const { data: user, error } = await supabase
      .from('user')
      .select('email')
      .eq('email', email)
      .single();
    if (user) {
      currentUser = user;
    } else {
      // Create empty password
      const password = '';

      // Insert user into the database
      const { data: newUser, err } = await supabase
        .from('user')
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
          },
        ])
        .select()
        .single();
      // console.log('response:', response);
      currentUser = newUser;
      console.log('currentUser ID', currentUser.id);
      if (err) throw err;
    }
    // Create and assign a token
    const token = jwt.sign(
      { id: currentUser.id, email: currentUser.email },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    console.log('Generated token:', token);

    // Set the token as an HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
      path: '/',
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = userController;
