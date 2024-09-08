// Neste arquivo serão definidos todos os modelos de dados da aplicação
class Nota {
    chave
    titulo
    texto
    importancia
    lida
    
    //valor padrão para o parâmetro "lida"
    constructor(chave, titulo, texto, importancia, lida=false) {
        this.chave = chave
        this.titulo = titulo
        this.texto = texto
        this.importancia = importancia
        this.lida = lida
    }
    get chave() {
        return this.chave
    }
    get titulo() {
        return this.titulo
    }
    get texto() {
        return this.texto
    }
    get importancia() {
        return this.importancia
    }
    get lida() {
        return this.lida
    }
    set titulo(novoTitulo) {
        this.titulo = novoTitulo
    }
    set texto(novoTexto) {
        this.texto = novoTexto
    }
    set importancia(novaImportancia) {
        this.importancia = novaImportancia
    }
    set lida(novoStatus) {
        this.lida = novoStatus
    }
}

module.exports = Nota
