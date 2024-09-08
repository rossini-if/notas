// importação da classe que gerencia as notas no MongoDB
const notas = require('../model/notaMongo.js')

// cria e já exporta a função que será responsável pela criação de nota
exports.cria_get = async function(req, res){
    contexto = {
        titulo_pagina: "Criação de Nota",
    }
    
    // renderiza o arquivo dentro da pasta view
    res.render('criaNota', contexto)
}

// cria e já exporta a função que será responsável pela criação de nota
exports.cria_post = async function(req, res){
    // obtém as informações do formulário
    var nota = req.body

    // cria a nota nota
    await notas.cria(nota)
    
    // redireciona para a página principal
    res.redirect('/')
}

// cria e já exporta a função que será responsável pela consulta a nota
exports.consulta = async function(req, res){
    //informação passada como parâmetro na url
    var chave = req.params.chave_nota
    var nota = await notas.consulta(chave)
    nota.lida = true

    //atualização no banco de dados
    await notas.atualiza(nota)
    
    contexto = {
        titulo_pagina: "Consulta a Nota",
        nota: nota, //não preciso mais passar cada campo
    }
    // renderiza o arquivo dentro da pasta view
    res.render('consultaNota', contexto)
}

// cria e já exporta a função que será responsável pela alteração de nota
exports.altera_get = async function(req, res){
    //informação passada como parâmetro na url
    var chave = req.params.chave_nota
    var nota = await notas.consulta(chave)
    
    contexto = {
        titulo_pagina: "Altera a Nota",
        nota: nota,
    }
    
    // renderiza o arquivo dentro da pasta view
    res.render('alteraNota', contexto)
}

// cria e já exporta a função que será responsável pela criação de nota
exports.altera_post = async function(req, res){
    // obtem as informações do formulário
    var nota = req.body

    if(req.body.status === 'on'){
        nota.lida = true
        delete nota.status //deleta este atributo para ele não ser armazenado em BD
    }
    else
        nota.lida = false

    // atualiza a nota com a chave e o status também
    await notas.atualiza(nota)
    
    // redireciona para a página principal
    res.redirect('/')
}

// cria e já exporta a função que será responsável pela exclusão da nota
exports.deleta = async function(req, res){
    //informação passada como parâmetro na url
    var chave = req.params.chave_nota
    await notas.deleta(chave)
    
    // redireciona para a página principal
    res.redirect('/')
}

//cria e já exporta a função que será responsável pela alteração do status da nota para lida
exports.lida = async function(req, res){
    var chave = req.params.chave_nota

    var nota = await notas.consulta(chave)
    nota.lida = true

    //atualização no banco de dados
    await notas.atualiza(nota)

    // redireciona para a página principal
    res.redirect('/')
}

//cria e já exporta a função que será responsável pela alteração do status da nota para não lida
exports.naolida = async function(req, res){
    var chave = req.params.chave_nota

    var nota = await notas.consulta(chave)
    nota.lida = false

    //atualização no banco de dados
    await notas.atualiza(nota)

    // redireciona para a página principal
    res.redirect('/')
}


exports.cria_notas_teste = async function(req, res){
    //nota criada para teste
    var nota = {
        chave: 'nota_1', 
        titulo: "Olá Mundo, Notas",
        texto: "Esta é uma nota para testar as funcionalidades da aplicação de notas.", 
        importancia: 1,
    }
    await notas.cria(nota)

    nota = {
        chave: 'nota_avaliacao', 
        titulo: "Tópicos para Avaliação",
        texto: "Anotações de tópicos importantes para as avaliações da disciplina.", 
        importancia: 5,
    }
    await notas.cria(nota)

    nota = {
        chave: 'nota_projeto', 
        titulo: "Texto para Utilizar na Criação de Projeto",
        texto: "Anotações de tópicos importantes para desenvolvimento do projeto da disciplina.", 
        importancia: 4,
    }
    await notas.cria(nota)
    
    nota = {
        chave: 'importante', 
        titulo: "Pontos de Anteção para Disciplina",
        texto: "Questão que são importantes na disciplina e precisão de mais atenção.", 
        importancia: 3,
    }
    await notas.cria(nota)
    
    // redireciona para a página principal
    res.redirect('/')
}