import { Produto } from "./schema.js"

export const createProduto = async (idBarraca, nome, preco) => {
    try {
        const newProduto = new Produto({ idBarraca, nome, preco })
        return await newProduto.save()
    } catch (error) {
        console.error('Erro ao criar Produto', error.message)
        throw error
    }
}