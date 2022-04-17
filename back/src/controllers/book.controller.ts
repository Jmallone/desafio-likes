import { Request, Response } from "express";
import bookService from "../services/book.service";

const createBook = async (req: Request, res: Response) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(200).json({ success: true, details: book });

    } catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }
}

const getBooks = async (_req: Request, res: Response) => {
    try {
        const books = await bookService.getBooks();
        res.status(200).json({ success: true, details: books });
    } catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }
}

const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.status(200).json({ success: true, details: book });
    } catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }
}

const getBooksByUserId = async (req: Request, res: Response) => {
    try {
        const books = await bookService.getBooksByUserId(req.params.id);
        res.status(200).json({ success: true, details: books });
    } catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }
}

const editBook = async (req: Request, res: Response) => {
    try {
        const book = await bookService.editBook(req.params.id, req.body);
        res.status(200).json({ success: true, details: book });
    } catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }
}

const deleteBook = async (req: Request, res: Response) => {
    try {
        await bookService.deleteBook(req.params.id);
        res.status(200).json({ success: true, details: "Livro deletado com sucesso." });
    } catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }
}


export default { createBook, getBooks, getBookById, getBooksByUserId, editBook, deleteBook };