import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmail, findUserById } from '../models/user.model.js';

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = findUserByEmail(email);
    const isPasswordValid = user && await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return done(null, false);

    return done(null, { id: user.id, email: user.email, displayName: user.display_name });
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  try {
    const user = findUserById(id);
    if (!user) return done(null, false);
    return done(null, { id: user.id, email: user.email, displayName: user.display_name });
  } catch (error) {
    return done(error);
  }
});

export { passport };
