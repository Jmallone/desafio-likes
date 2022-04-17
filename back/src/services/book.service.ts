import Book from '../models/book.model';
import { connection } from '../server/database';

const createBook = async (bookBody:any) => {
    try{
        const BookRepository = connection!.getRepository(Book);

        const book = new Book();
        book.name = bookBody.name;
        book.author = bookBody.author;
        book.user = bookBody.user;

        await BookRepository.save(book);
        return book;

    } catch (err) {
        throw Error('Erro durante a criação do livro.');
    }
}

const getBooks = async () => {
    try{
        const BookRepository = connection!.getRepository(Book);

        const books = await BookRepository.find();
        return books;

    }
    catch (err) {
        throw Error('Erro durante a busca de livros.');
    }
}

const getBookById = async (id:string) => {
    try{
        const BookRepository = connection!.getRepository(Book);

        const book = await BookRepository.findOne(id);
        return book;
    } catch (err) {
        throw Error('Erro durante a busca de livro.');
    }
}

const getBooksByUserId = async (id:string) => {
    try {
        const BookRepository = connection!.getRepository(Book);

        const books = await BookRepository.find({ where: { user: id } });
        return books;
    }  catch (err) {
        throw Error('Erro durante a busca de livros por usuário.');
    }
}

const editBook = async (id:string, bookBody:any) => {
    try{
        const BookRepository = connection!.getRepository(Book);
        const book = await BookRepository.findOne(id) as Book;

        book.name = bookBody.name;
        book.author = bookBody.author;
        await BookRepository.save(book);
        return book;
    }
    catch (err) {
        throw Error('Erro durante a edição do livro.');
    }
}

const deleteBook = async (id:string) => {
    try {
        const BookRepository = connection!.getRepository(Book);
        const book = await BookRepository.findOne(id) as Book;
        await BookRepository.remove(book);
        return book;

    } catch (err) {
        throw Error('Erro durante a exclusão do livro.');
    }
}

export default {createBook, getBooks, getBookById, getBooksByUserId, editBook, deleteBook};

