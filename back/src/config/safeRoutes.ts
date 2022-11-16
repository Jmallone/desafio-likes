
import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';

import User from '../models/user.model';

export const checkToken = Router().use(
    passport.authenticate('jwt', { session: false }), async (req, _res, next) => {
        console.log("1")
        if (!req.user) throw new Error('No user found');
        const user = req.user as User;
        req.body.userId = user.id;
        return next();
});

export function is(role: string) {
    return async (req: Request, response: Response, next: NextFunction) => {
        const user = req.user as User;
        if (!user) return response.status(404).json('Usuário não encotrado.');
        if (user.role !== role) return response.status(403).json('Acesso negado.');
        return next();
    };
}
