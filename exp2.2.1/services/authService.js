// services/authService.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import constants from '../config/constants.js';
import { ConflictError, AuthenticationError } from '../utils/errors.js';

class AuthService {
  static async register(username, password) {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, constants.BCRYPT_ROUNDS);

    const user = await User.create(username, hashedPassword);

    return user.toPublicData();
  }

  static async login(username, password) {
    
    const user = await User.findByUsername(username);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      constants.JWT_SECRET,
      { expiresIn: constants.JWT_EXPIRES_IN }
    );

    return { token, user: user.toPublicData() };
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, constants.JWT_SECRET);
    } catch (error) {
      throw new AuthenticationError('Invalid token');
    }
  }

  static async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new AuthenticationError('User not found');
    }
    return user.toPublicData();
  }
}

export default AuthService;
