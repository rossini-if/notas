// importação da classe que gerencia as notas no MongoDB
const notas = require('../model/notaMongo.js')

// cria e já exporta a função que será responsável pela tela principal
exports.tela_principal = async function(req, res){
    var pesquisa, lista
    var estados = []
    var importancias = []
    var filtros = {}

    if( req.body.btn_pesquisar != undefined ){
        pesquisa = req.body.pesquisa
        lista = await notas.pesquisa(pesquisa)
    }
    else if( req.body.btn_filtro != undefined  ){

        if( req.body.lida ){
            estados.push(true)
            filtros.lida = true
        }

        if( req.body.naolida ){
            estados.push(false)
            filtros.nao_lida = true
        } 

        if( req.body.importancia1 ){
            importancias.push(1)
            filtros.importancia1 = true
        } 

        if( req.body.importancia2 ){
            importancias.push(2)
            filtros.importancia2 = true
        } 

        if( req.body.importancia3 ){
            importancias.push(3)
            filtros.importancia3 = true
        } 

        if( req.body.importancia4 ){
            importancias.push(4)
            filtros.importancia4 = true
        } 

        if( req.body.importancia5 ) {
            importancias.push(5)
            filtros.importancia5 = true
        } 

        if( (estados.length > 0) || (importancias.length > 0) )
            lista = await notas.filtro(estados, importancias)
        else
            lista = await notas.lista()
    }
    else
        lista = await notas.lista()

    contexto = {
        titulo_pagina: "Gerenciador de Notas de Texto",
        notas: lista,
        pesquisa: pesquisa,
        filtros: filtros,
    }

    // renderiza o arquivo index.hbs, dentro da pasta view
    res.render('index', contexto);
}

exports.sobre = async function(req, res){
    contexto = {
        titulo_pagina: "Sobre o Aplicativo",
    }

    // renderiza o arquivo na dentro da pasta view
    res.render('sobre', contexto);
}