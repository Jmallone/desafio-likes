import User from '../models/user.model';
import { connection } from '../server/database';

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
    try{
        const UserRepository = connection!.getRepository(User);

        const user = new User();
        user.username = userBody.username;
        user.email = userBody.email;
        user.password = userBody.password;
        user.date = new Date();
    
        await UserRepository.save(user);
        return user;
    } catch (err) {
        throw Error('Erro durante a criação do usuário.');
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


export default { createUser, editUser, getUsers, getUserById, deleteUser };