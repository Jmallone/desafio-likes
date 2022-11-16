import { AppError } from '../exceptions';
import User from '../models/user.model';
import { connection } from '../server/database';
import ActiveSession from '../models/activeSession.model';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getUsers = async () => {
    try{
        const UserRepository = connection!.getRepository(User);
        const users = await UserRepository.find();
        
        return users;
    } catch (err) {
        throw new Error('Erro durante a busca de usuários.');
    }
}

const getUserById = async (id:string) => {
    try{
        const UserRepository = connection!.getRepository(User);
        const user = await UserRepository.findOne(id);
        
        return user;
    }
    catch (err) {
        throw new Error('Erro durante a busca de usuário.');
    }
}

const createUser = async (userBody:any) => {
    const { username, email, password } = userBody;
    
    const UserRepository = connection!.getRepository(User);
    
    const isExistEmail = await UserRepository.findOne({ email });
    if (isExistEmail) {
        AppError.raise({ statusCode: 400, msg: 'Email já cadastrado!' });
    }
    

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.date = new Date();
    
    try{
        await UserRepository.save(user);
        return user;
    } catch (err) {
        AppError.raise({ statusCode: 400, msg: 'Erro durante a criação do usuário no DB.' })
    }
}

const editUser = async (id:string, userBody:any) => {
    try{
        const UserRepository = connection!.getRepository(User);
        const user = await UserRepository.findOne(id) as User;

        user.username = userBody.username;
        user.email = userBody.email;
        user.password = userBody.password;
        user.date = new Date();
        await UserRepository.save(user);
        return user;
    }
    catch (err) {
        throw Error('Erro durante a edição do usuário.');
    }
}

const deleteUser = async (id:string) => {
    try{
        const UserRepository = connection!.getRepository(User);
        const user = await UserRepository.findOne(id) as User;
        await UserRepository.remove(user);
        return user;
    }
    catch (err) {
        throw Error('Erro durante a exclusão do usuário.');
    }
}

const loginUser = async (userBody:any) => {
    const {email, password} = userBody;
    const UserRepository = connection!.getRepository(User);
    const activeSessionRepository = connection!.getRepository(ActiveSession);

    const isExistUser = await UserRepository.findOne({ email });
    if (!isExistUser) {
        AppError.notFound('Email ou Senha Incorretos!' );
    }

    const isMatch = await bcrypt.compare(password, isExistUser!.password);
    if (isMatch && isExistUser ) {
        if (!process.env.SECRET) {
            throw new Error('SECRET not provided');
        }

        const token = jwt.sign(
            {
                id: isExistUser.id,
                username: isExistUser.username,
                email: isExistUser.email
            },
            process.env.SECRET,
            {
                expiresIn: 86400 // 1 week
            }
        );

        const session = new ActiveSession;
        session.userId = isExistUser.id;

        session.token = token;

        try{
            await activeSessionRepository.save(session);
            return session;
        } catch (err) {
            AppError.raise({ statusCode: 400, msg: 'Erro durante a criação da session no DB.' })
        }

    }

} 

const logoutUser = async (userBody:any) => {
    const { token } = userBody;
    const activeSessionRepository = connection!.getRepository(ActiveSession);
    try{
        await activeSessionRepository.delete({ token });
        return "Token Revogado "
    } catch (err) {
        AppError.raise({ statusCode: 400, msg: 'Erro durante a exclusão do Token no DB.' })
    }
}
export default { createUser, editUser, getUsers, getUserById, deleteUser, loginUser, logoutUser };