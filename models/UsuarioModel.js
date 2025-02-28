const DataBase = require("../database/DataBase");
const crypto = require('crypto');

class UsuarioModel {
    /** 
     * Os atributos da classe Model precisam ser correspondentes às colunas do banco de dados.
     */
    id = null;
    nome = null;
    email = null;
    senha = null;
    dataAtualizacao = null;
    dataCriacao = null;

    /**
     * Construtor da Classe UsuarioModel
     * @param {UsuarioModel}     usuario     O objeto de entrada é simples (precisa conter apenas chave e valor, sem métodos) e precisa conter as chaves: id, nome, email, senha, dataAtualizacao e dataCriacao. Esses campos são as colunas da tabela no banco de dados. Caso não passe um objeto com esses campos, um model vazio será criado.
     */
    constructor(usuario) {
        if (usuario &&
            "id" in usuario &&
            "nome" in usuario &&
            "email" in usuario &&
            "senha" in usuario &&
            "dataAtualizacao" in usuario &&
            "dataCriacao" in usuario
        ) {
            this.id = usuario.id;
            this.nome = usuario.nome;
            this.email = usuario.email;
            this.senha = usuario.senha;
            this.dataAtualizacao = usuario.dataAtualizacao;
            this.dataCriacao = usuario.dataCriacao;
        }
    }

    /**
     * Busca um objeto UsuarioModel no banco de dados
     * @param  {Number}               id      ID do usuario a ser procurado no banco de dados.
     * @return {UsuarioModel}             Retorna um objeto UsuarioModel com as informações encontradas, caso não encontre, retorna null.
     */
    static async findOne(id) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Usuario WHERE Usuario.id = ?`, [id]);
        if (result && result.length == 1)
            return new UsuarioModel(result[0]);
        return null;
    }

    /**
     * Busca todos objetos UsuarioModel no banco de dados.
     * @return {[UsuarioModel, ...]} Retorna um array com objetos UsuarioModel que contém apenas as informações encontradas, caso não encontre, retorna um array vazio [].
     */
    static async findAll() {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Usuario`);
        if (result && result.length > 0) {
            // Transforma um array de Usuario [Usuario, ...] em uma array de UsuarioModel [UsuarioModel, ...]
            const modelArray = result.map(function (obj) {
                obj = new UsuarioModel(obj);
                return obj;
            });
            return modelArray;
        }
        return [];
    }

    /**
    * Valida um usuário pelo e-mail e senha.
    * @param {string} email - O e-mail do usuário.
    * @param {string} senha - A senha do usuário.
    * @returns {UsuarioModel | null} Retorna um objeto UsuarioModel se a validação for bem-sucedida, caso contrário, retorna null.
    */
    static async validateUser(email, senha) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Usuario WHERE email = ?`, [email]);

        if (result && result.length === 1) {
            const usuario = result[0];

            // Gera o hash da senha fornecida
            const senhaCombinada = senha + email;
            const hashSenha = crypto.createHash('sha512').update(senhaCombinada).digest('hex');

            // Compara o hash gerado com o armazenado no banco
            if (usuario.senha === hashSenha) {
                return new UsuarioModel(usuario);
            }
        }

        return null;
    }

    /**
     * Busca um objeto UsuarioModel no banco de dados pelo e-mail.
     * @param {string} email - O e-mail do usuário a ser procurado no banco de dados.
     * @return {UsuarioModel | null} Retorna um objeto UsuarioModel com as informações encontradas, caso não encontre, retorna null.
     */
    static async findOneByEmail(email) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Usuario WHERE email = ? LIMIT 1`, [email]);

        if (result && result.length === 1) {
            return new UsuarioModel(result[0]);
        }
        return null;
    }

    /**
     * Salva um objeto UsuarioModel no banco de dados. O atributo que deve ser informado: "numero", "estado". Os atributos: "id" "dataAtualizacao" e "dataCriacao" são criados automaticamente.
     * @returns {UsuarioModel} Retorna um objeto UsuarioModel com as informações recém inseridas no banco de dados.
     */
    async save() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        // Concatena a senha com o email antes de aplicar o hash
        const senhaCombinada = this.senha + this.email;
        const hashSenha = crypto.createHash('sha512').update(senhaCombinada).digest('hex'); // 128 caracteres
        const result = await DataBase.executeSQLQuery(`INSERT INTO Usuario VALUES (null, ?, ?, ?, ?, ?);`,
            [
                this.nome,
                this.email,
                hashSenha,
                timestamp,
                timestamp
            ]
        );
        // Atualiza a senha
        this.senha = hashSenha;
        const usuario = await DataBase.executeSQLQuery(`SELECT * FROM Usuario WHERE Usuario.id = ?`, [result.insertId]);
        return new UsuarioModel(usuario[0]);
    }

    /**
     * Atualiza um objeto UsuarioModel no banco de dados. O atributo que deve ser informado: "numero", "estado". O atributo: "dataAtualizacao" é atualizado automaticamente. Os atributos: "id" e "dataCriacao" não são alterados.
     * @returns {UsuarioModel} Retorna um objeto UsuarioModel com as informações atualizadas no banco de dados.
     */
    async update() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`UPDATE Usuario
                                                           SET nome = ?,
                                                               dataAtualizacao = ?
                                                           WHERE Usuario.id = ?`,
            [
                this.nome,
                timestamp,
                this.id
            ]
        );
        const usuario = await DataBase.executeSQLQuery(`SELECT * FROM Usuario WHERE Usuario.id = ?`, [this.id]);
        return new UsuarioModel(usuario[0]);
    }

    /**
     * Atualiza um objeto UsuarioModel no banco de dados. O atributo que deve ser informado: "numero", "estado". O atributo: "dataAtualizacao" é atualizado automaticamente. Os atributos: "id" e "dataCriacao" não são alterados.
     * @returns {UsuarioModel} Retorna um objeto UsuarioModel com as informações atualizadas no banco de dados.
     */
    async updateEmailPassword() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        // Concatena a senha com o email antes de aplicar o hash
        const senhaCombinada = this.senha + this.email;
        const hashSenha = crypto.createHash('sha512').update(senhaCombinada).digest('hex'); // 128 caracteres
        const result = await DataBase.executeSQLQuery(`UPDATE Usuario
                                                           SET email = ?,
                                                               senha = ?,
                                                               dataAtualizacao = ?
                                                           WHERE Usuario.id = ?`,
            [
                this.email,
                hashSenha,
                timestamp,
                this.id
            ]
        );
        const usuario = await DataBase.executeSQLQuery(`SELECT * FROM Usuario WHERE Usuario.id = ?`, [this.id]);
        return new UsuarioModel(usuario[0]);
    }

    /**
     * Deleta um objeto UsuarioModel no banco de dados.
     * @returns {UsuarioModel} Retorna um objeto UsuarioModel com as informações removidas banco de dados.
     */
    async delete() {
        const result = await DataBase.executeSQLQuery(`DELETE FROM Usuario WHERE Usuario.id = ?`, [this.id]);
        return this;
    }
}

module.exports = UsuarioModel;
