import dados from '../models/dados.js';
const { barbies } = dados;

const getAllBarbies = (req, res) => {
    let resultado = barbies;

    res.status(200).json({
        total: resultado.length,
        bruxos: resultado  // Aqui se quiser, pode mudar para 'barbies' pra ficar consistente
    })
}

const getBarbiesById = (req, res) => {
    const id = parseInt(req.params.id);
    let resultado = barbies.find(b => b.id === id)

    if (!resultado) {
        return res.status(404).json({ message: "Barbie não encontrada" });
    }

    res.status(200).json({
        total: 1,
        barbie: resultado
    })
}

const createBarbie = (req, res) => {
    const { nome, profissao, anoLancamento } = req.body;

    if (!nome || !profissao){
        return res.status(400).json({
            success: false,
            message: "nome e profissao sao obrigatorias"
        });
    }

    const novaBarbie = {
        id: barbies.length + 1,
        nome: nome,
        profissao: profissao,
        anoLancamento: parseInt(anoLancamento),
    }

    barbies.push(novaBarbie);

    res.status(201).json({
        success: true,
        message: "Barbie cadastrada com sucesso",
        barbie: novaBarbie
    })

}

const deleteBarbie = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        })
    }

    const BarbieParaRemover = barbies.find(b => b.id === id);

    if(!BarbieParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Barbie com o id: ${id} nao existe`
        })
    }

    const barbiesFiltradas = barbies.filter(barbie => barbie.id !== id);

    barbies.splice(0, barbies.length, ...barbiesFiltradas);

    res.status(200).json({
        success: true,
        message: `A Barbie ${id} foi removida com sucesso!`
    })
}

const updateBarbie = (req, res) => {
    //fazer a lógica do put/update
    const id = parseInt(req.params.id);
    const { nome, profissao, anoLancamento } = req.body;

    //Para nao ficar cofuso, vou renomear o id que vamos editar
    const idParaEditar = id;

    //validar se o Id existe
    if (isNaN(idParaEditar)){
        return res.status(400).json({
            sucess: false,
            message: "O id deve ser válido"
        })
    }

    //Verificar se a barbie com Id: idParaEditar existe
    const barbieExiste = barbies.find(barbie => barbie.id === idParaEditar);
    if(!barbieExiste){
        return res.status(404).json({
            success: false,
            message: `A Barbie com o id: ${idParaEditar} nao existe`
        })
    }

    //agora depois de passar todas as verificações, vamos atualizar a barbie com id: idParaEditar
    const barbiesAtualizadas = barbies.map(barbie => barbie.id === idParaEditar ? {
        ...barbie,
        ...(nome && { nome }),
        ...(profissao && { profissao }),
        ...(anoLancamento && { anoLancamento: parseInt(anoLancamento) })
}

    : barbie
);

//atualizar o array original
barbies.splice(0, barbies.length, ...barbiesAtualizadas);

res.status(200).json({
    success: true,
    message: "Dados da barbie com sucesso",
    barbie: barbieExiste

})

}

export {getAllBarbies, getBarbiesById, createBarbie, deleteBarbie, updateBarbie};
