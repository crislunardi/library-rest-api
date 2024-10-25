import livro from "../models/livros.js";
import { autor } from "../models/autor.js";

class LivroController {

    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({});
            if (listaLivros.length === 0) {
                return res
                   .status(404)
                   .json({ message: "Nenhum livro encontrado" });
            }
            res.status(200).json(listaLivros);
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao listar livro` });
        }
    };

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            
            if (!livroEncontrado) {
                return res
                   .status(404)
                   .json({ message: "Livro não encontrado" });
            }
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao buscar livro` });
        }
    };

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Criado com sucesso!", livro: livroCriado });
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao cadastrar livros`});
        }
    };

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            let livroEncontrado = await livro.findByIdAndUpdate(id, req.body);

            if (!livroEncontrado) {
                return res
                   .status(404)
                   .json({ message: "Livro não encontrado" });
            }
            res.status(200).json({ message: `Livro atualizado!`});
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao atualizar livro` });
        }
    };

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id;
            let livroEncontrado = await livro.findByIdAndDelete(id);

            if (!livroEncontrado) {
                return res
                   .status(404)
                   .json({ message: "Livro não encontrado" });
            }
            res.status(200).json({ message: "Livro excluído com sucesso!" });

        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao excluir livro` });
        }
    };

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora });
            
            if (livrosPorEditora.length === 0) {
                return res
                   .status(404)
                   .json({ message: "Nenhum livro encontrado para a editora" });
            }
            return res.status(200).json(livrosPorEditora);
        } catch (erro) {
            res
               .status(500)
               .json({ message: `${erro.message} - falha ao buscar livros por editora` });
        }
    };
};

export default LivroController;