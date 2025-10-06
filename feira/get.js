import { Produto } from "./schema.js"

export const getProduto = async (req, res) => {
    try {
        return await Produto.find()
    } catch (error) {
        console.log('erro ao buscar os Produtos', error.message)
        throw error
    }
}