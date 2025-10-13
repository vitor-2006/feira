import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema({
    idBarraca: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
})
export const Produto = mongoose.model('produto', ProdutoSchema)