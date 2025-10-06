import { Produto } from "./schema.js"

export const updateProduto = async (id, idBarraca, nome, preco) => {
    try {
        const updatedProduto = await Produto.findByIdAndUpdate(
            id,
            { idBarraca, nome, preco },
            { new:true, runValidators:true }
        )
        return updatedProduto
    } catch (error) {
        console.error('Erro ao atualizar Produto:', error.message)
        throw error
    }
}