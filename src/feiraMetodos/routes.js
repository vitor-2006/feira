import express from 'express'
import { getProduto } from './get.js'
import { createProduto } from './post.js';
import { updateProduto } from "./put.js"
import { deleteProduto } from './delete.js';
import { pesqPorIdBaralho, pesqPorNome, pesqPorPreco } from './pesquisa.js';
import { middleWare } from '../middleware/authentication.js';

const routesProduto  = express.Router();

routesProduto.get('/produto', middleWare, async (req, res) => {
    const Produtos = await getProduto()
    if(Produtos) {
        return res.status(200).send(Produtos)
    } else {
        return res.status(404).send({ message: 'não têm Produtos registrados' })
    }
});

routesProduto.post('/produto', middleWare, async (req, res) => {
    const { idBarraca, nome, preco } = req.body
    const newProduto = await createProduto(idBarraca, nome, preco)
    if(!newProduto) {
        return res.status(400).send("Produto inválido!")
    }
    return res.status(201).send({ message: 'Produto criado com sucesso', produto: newProduto })
});

routesProduto.put('/produto/:id', middleWare, async (req, res) => {
    const { id } = req.params
    const { nome, preco } = req.body
    const updatedProduto = await updateProduto(id, nome, preco)
    if(!updatedProduto) {
        return res.status(404).send({ message: 'Produto não encontrado ou inválido' })
    }
    return res.status(200).send({ message: 'Produto atualizado com sucesso', produto: updatedProduto })
});

routesProduto.delete('/produto/:id', middleWare, async (req, res) => {
    const { id } = req.params
    const deletedProduto = deleteProduto(id)
    if(deletedProduto) {
        return res.status(200).send({ message:'Produto deletado com sucesso', produto: deletedProduto })
    } else {
        return res.status(404).send({ message: 'Produto não encontrado' })
    }
});

routesProduto.get('/produto/search', middleWare, async (req, res) => {
    const { idBaralho, nome, preco } = req.query
    let searchProduto 
    if(idBaralho) {
       searchProduto = await pesqPorIdBaralho(idBaralho)
    } else if(nome) {
        searchProduto = await pesqPorNome(nome)
    } else if(preco) {
        searchProduto = await pesqPorPreco(preco)
    }
    if(searchProduto) {
        return res.status(200).send(searchProduto)
    } else {
        return res.status(404).send({ message: 'Produto não encontrada' })
    }
})

export {routesProduto}
