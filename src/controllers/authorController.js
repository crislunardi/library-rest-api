import { autor } from "../models/autor.js";

class AutorController {

    static async listarAutores (req, res) {
        try {
            const listarAutores = await autor.find({});

            if (listarAutores.length === 0) {
                return res
                   .status(404)
                   .json({ message: "Nenhum autor encontrado" });
            }
            res.status(200).json(listarAutores);
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao listar autores` });
        }
    };

    static async listarAutorPorId (req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            
            if (!autorEncontrado) {
                return res
                   .status(404)
                   .json({ message: "Autor não encontrado" });
            }
            res.status(200).json(autorEncontrado);
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao buscar autor` });
        }
    };

    static async cadastrarAutor (req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Criado com sucesso!", autor: novoAutor });
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao cadastrar autor`});
        }
    };

    static async atualizarAutor (req, res) {
        try {
            const id = req.params.id;
            let autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

            if (!autorEncontrado) {
                return res
                   .status(404)
                   .json({ message: "Autor não encontrado" });
            }
            res.status(200).json({ message: `Autor atualizado!`});
        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao atualizar autor` });
        }
    };

    static async excluirAutor (req, res) {
        try {
            const id = req.params.id;
            let autorEncontrado = await autor.findByIdAndDelete(id);

            if (!autorEncontrado) {
                return res
                   .status(404)
                   .json({ message: "Autor não encontrado" });
            }
            res.status(200).json({ message: "Autor excluído com sucesso!" });

        } catch (erro) {
            res
                .status(500)
                .json({ message: `${erro.message} - falha ao excluir autor` });
        }
    };
};

export default AutorController;