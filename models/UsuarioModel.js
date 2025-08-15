// models/UsuarioModel.js
const BaseModel = require("./BaseModel");
const DataBase = require("../database/DataBase");
const crypto = require("crypto");

class UsuarioModel extends BaseModel {
  static tableName = "Usuario";

  // Para manter o comportamento anterior:
  // - update padrão só altera "nome" (email/senha continuam no método específico)
  static updatable = ["nome"];

  constructor(data = {}) {
    super(data);
  }

  // -------- Métodos específicos (mantidos) --------

  /**
   * Valida um usuário pelo e-mail e senha.
   * @param {string} email
   * @param {string} senha
   * @returns {UsuarioModel|null}
   */
  static async validateUser(email, senha) {
    const result = await DataBase.executeSQLQuery(
      `SELECT * FROM Usuario WHERE email = ?`,
      [email]
    );

    if (result && result.length === 1) {
      const usuario = result[0];
      const hashSenha = crypto
        .createHash("sha512")
        .update(String(senha) + String(email))
        .digest("hex");

      if (usuario.senha === hashSenha) {
        return new UsuarioModel(usuario);
      }
    }
    return null;
  }

  /**
   * Busca um usuário por e-mail.
   * @param {string} email
   * @returns {UsuarioModel|null}
   */
  static async findOneByEmail(email) {
    const result = await DataBase.executeSQLQuery(
      `SELECT * FROM Usuario WHERE email = ? LIMIT 1`,
      [email]
    );
    if (result && result.length === 1) {
      return new UsuarioModel(result[0]);
    }
    return null;
  }

  /**
   * Criação com hash de senha (mantendo comportamento anterior).
   * Usa super.save() do BaseModel após aplicar o hash.
   */
  async save() {
    const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Gera o hash de senha = sha512(senha + email)
    if (this.senha && this.email) {
      const hashSenha = crypto
        .createHash("sha512")
        .update(String(this.senha) + String(this.email))
        .digest("hex");
      this.senha = hashSenha;
    }

    // super.save() vai:
    // - montar INSERT com colunas insertáveis (nome, email, senha, ...)
    // - adicionar dataCriacao/dataAtualizacao
    // - retornar o registro recarregado via PK
    return await super.save();
  }

  /**
   * Atualiza email e senha (com hash) — comportamento igual ao método antigo.
   */
  async updateEmailPassword() {
    const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Gera o hash com senha+email
    const hashSenha = crypto
      .createHash("sha512")
      .update(String(this.senha) + String(this.email))
      .digest("hex");

    await DataBase.executeSQLQuery(
      `UPDATE Usuario
          SET email = ?,
              senha = ?,
              dataAtualizacao = ?
        WHERE Usuario.id = ?`,
      [this.email, hashSenha, timestamp, this.id]
    );

    // Mantém a instância coerente
    this.senha = hashSenha;

    const usuario = await DataBase.executeSQLQuery(
      `SELECT * FROM Usuario WHERE Usuario.id = ?`,
      [this.id]
    );
    return new UsuarioModel(usuario[0]);
  }
}

module.exports = UsuarioModel;
