import { Produto } from "./schema.js"

export const deleteProduto = async (id) => {
    try {
        return await Produto.findByIdAndDelete(id)
    } catch (error) {
        console.error('Erro ao deletar Produto:', error.message)
        throw error
    }
}