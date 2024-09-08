const mongodb = require('mongodb')

// cria uma instância do cliente do mongo
const ClienteMongo = mongodb.MongoClient;

var cliente;

// estabelece conexão com o Banco de Dados
const conexao_bd = async () => {
    if(!cliente)
        cliente = await ClienteMongo.connect('mongodb://127.0.0.1:27017');
}

// retorna o referência para o banco de dados da aplicação
const bd = () => { 
    return cliente.db('notas'); 
}

class NotaMongo {

    async close() {
        if (cliente) 
            cliente.close()
        cliente = undefined
    }

    async atualiza(nota) {
        await conexao_bd();
        const colecao = bd().collection("notas")
        await colecao.updateOne( 
            { chave: nota.chave },
            { $set: { titulo: nota.titulo, texto: nota.texto, importancia: nota.importancia, lida: nota.lida } }
        )
    }

    async cria(nota) {
        await conexao_bd()
        const colecao = bd().collection("notas")
        nota.lida = false //toda nota deve ser criada como não lida
        await colecao.insertOne(nota)
    }

    async consulta(chave) {
        await conexao_bd()
        const colecao = bd().collection("notas")
        const nota = await colecao.findOne({ chave: chave })
        
        return nota
    }

    async deleta(chave) {
        await conexao_bd()
        const colecao = bd().collection("notas")
        const doc = await colecao.findOne({ chave: chave })
        if (!doc) {
            throw new Error(`Não existe a nota com chave: ${chave}`)
        } else {
            await colecao.findOneAndDelete({ chave: chave })
        }
    }

    async lista() {
        await conexao_bd()
        const colecao = bd().collection("notas")
        var notas = await colecao.find({}).toArray()
        return notas
    }
    
    async lista_chaves() {
        await conexao_bd()
        const colecao = bd().collection("notas")
        const chaves = await new Promise((resolve, reject) => {
            const chaves = []
            colecao.find({}).forEach(
                (nota) => {
                    chaves.push(nota.chave)
                },
                (err) => {
                    if (err) reject(err)
                    else resolve(chaves)
                }
            )
        })
        return chaves
    }

    async qtd() {
        await conexao_bd()
        const colecao = bd().collection("notas")
        const qtd = await colecao.count({})
        return qtd
    }

    async pesquisa(termo) {
        await conexao_bd()
        const colecao = bd().collection("notas")
        await colecao.createIndex({ "titulo": "text" })
        var notas = await colecao.find({ $text: {$search: termo} }).toArray()
        
        return notas
    }

    async filtro( estados, importancias ) {
        await conexao_bd()
        const colecao = bd().collection("notas")
        var opcoes = []

        for(var estado of estados)
            opcoes.push({lida: estado})
        
        for(var importancia of importancias)
            opcoes.push({importancia: importancia})

        var notas = await colecao.find({ $or: opcoes }).toArray()
        
        return notas
    }
}

module.exports = new NotaMongo()