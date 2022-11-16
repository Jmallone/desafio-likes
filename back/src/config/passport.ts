import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import User from '../models/user.model';
import { connection } from '../server/database';

export default () => {
    console.log("2")
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: process.env.SECRET
    };

    return passport.use(
        new JwtStrategy(opts, async (jwtPayload, done) => {
            try {
                const userRepository = connection!.getRepository(User);
                const user = await userRepository.findOne(jwtPayload.id);
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};
