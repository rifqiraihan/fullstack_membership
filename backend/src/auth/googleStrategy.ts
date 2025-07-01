import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { findUserByEmail, createUser } from "../models/userModel";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails?.[0].value;
      const name = profile.displayName;

      if (!email) return done(null, false);

      let user = await findUserByEmail(email);

      if (!user) {
        user = await createUser(name, email, "", "google");
      }

      done(null, user);
    }
  )
);
