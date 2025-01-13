import { author } from "../models/author.js";

class AuthorController {

    static async listAuthors (req, res) {
        try {
            const authorsList = await author.find({});

            if (authorsList.length === 0) {
                return res
                   .status(404)
                   .json({ message: "No authors found" });
            }
            res.status(200).json(authorsList);
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to list authors` });
        }
    };

    static async getAuthorById (req, res) {
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);
            
            if (!foundAuthor) {
                return res
                   .status(404)
                   .json({ message: "Author not found" });
            }
            res.status(200).json(foundAuthor);
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to retrieve author` });
        }
    };

    static async createAuthor (req, res) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({ message: "Successfully created!", author: newAuthor });
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to create author`});
        }
    };

    static async updateAuthor (req, res) {
        try {
            const id = req.params.id;
            let foundAuthor = await author.findByIdAndUpdate(id, req.body);

            if (!foundAuthor) {
                return res
                   .status(404)
                   .json({ message: "Author not found" });
            }
            res.status(200).json({ message: `Author updated!`});
        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to update author` });
        }
    };

    static async deleteAuthor (req, res) {
        try {
            const id = req.params.id;
            let foundAuthor = await author.findByIdAndDelete(id);

            if (!foundAuthor) {
                return res
                   .status(404)
                   .json({ message: "Author not found" });
            }
            res.status(200).json({ message: "Author successfully deleted!" });

        } catch (error) {
            res
                .status(500)
                .json({ message: `${error.message} - failed to delete author` });
        }
    };
};

export default AuthorController;
