import { Produto } from "./schema.js";

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export const pesqPorIdBaralho = async (idBaralho) => {
    try {
      return await Produto.find({ idBaralho: idBaralho }).exec();
    } catch (error) {
      console.error('Erro ao pesquisar Produto', error.message);
      throw error;
    }
}

export const pesqPorPreco = async (preco) => {
    try {
      return await Produto.find({ preco: preco }).exec();
    } catch (error) {
      console.error('Erro ao pesquisar Produto', error.message);
      throw error;
    }
}

export const pesqPorNome = async (nome) => {
    try {
      const safeNome = escapeRegex(nome);
      return await Produto.find({ nome: { $regex: safeNome, $options: "i" } }).exec();
    } catch (error) {
      console.error('Erro ao pesquisar Produto', error.message);
      throw error;
    }
}