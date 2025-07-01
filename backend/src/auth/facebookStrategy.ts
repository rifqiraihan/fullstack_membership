import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { findUserByEmail, createUser } from "../models/userModel";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const email = profile.emails?.[0].value;
      const name = profile.displayName;

      if (!email) return done(null, false);

      let user = await findUserByEmail(email);
      if (!user) {
        user = await createUser(name, email, "", "facebook");
      }

      done(null, user);
    }
  )
);
