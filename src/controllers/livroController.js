import book from "../models/books.js";
import { author } from "../models/author.js";

class BookController {

    static async listBooks (req, res) {
        try {
            const bookList = await book.find({});
            if (bookList.length === 0) {
                return res
                   .status(404)
                   .json({ message: "No books found" });
            }
            res.status(200).json(bookList);
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to list books` });
        }
    };

    static async getBookById (req, res) {
        try {
            const id = req.params.id;
            const foundBook = await book.findById(id);
            
            if (!foundBook) {
                return res
                   .status(404)
                   .json({ message: "Book not found" });
            }
            res.status(200).json(foundBook);
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to retrieve book` });
        }
    };

    static async createBook (req, res) {
        const newBook = req.body;
        try {
            const foundAuthor = await author.findById(newBook.author);
            const completeBook = { ...newBook, author: { ...foundAuthor._doc }};
            const createdBook = await book.create(completeBook);
            res.status(201).json({ message: "Successfully created!", book: createdBook });
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to create book`});
        }
    };

    static async updateBook (req, res) {
        try {
            const id = req.params.id;
            let foundBook = await book.findByIdAndUpdate(id, req.body);

            if (!foundBook) {
                return res
                   .status(404)
                   .json({ message: "Book not found" });
            }
            res.status(200).json({ message: `Book updated!`});
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to update book` });
        }
    };

    static async deleteBook (req, res) {
        try {
            const id = req.params.id;
            let foundBook = await book.findByIdAndDelete(id);

            if (!foundBook) {
                return res
                   .status(404)
                   .json({ message: "Book not found" });
            }
            res.status(200).json({ message: "Book successfully deleted!" });

        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to delete book` });
        }
    };

    static async listBooksByPublisher (req, res) {
        const publisher = req.query.publisher;
        try {
            const booksByPublisher = await book.find({ publisher });
            
            if (booksByPublisher.length === 0) {
                return res
                   .status(404)
                   .json({ message: "No books found for the publisher" });
            }
            return res.status(200).json(booksByPublisher);
        } catch (error) {
            res
               .status(500)
               .json({ message: `${error.message} - failed to find books by publisher` });
        }
    };
};

export default BookController;
