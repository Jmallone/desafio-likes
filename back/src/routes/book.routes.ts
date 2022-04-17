import express from 'express';
import bookController from '../controllers/book.controller';

const router = express.Router();

router
    .get("/", bookController.getBooks)
    .get("/:id", bookController.getBookById)
    .get("/user/:id", bookController.getBooksByUserId)
    .post("/", bookController.createBook)
    .put("/:id", bookController.editBook)
    .delete("/:id", bookController.deleteBook)

export default router;