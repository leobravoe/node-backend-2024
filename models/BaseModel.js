// models/BaseModel.js
const DataBase = require("../database/DataBase");

class BaseModel {
    // cada subclasse define só:
    //   static tableName = "MinhaTabela";
    // opcionalmente pode pré‑definir insertable/updatable para sobrescrever o padrão

    // cache interno
    static _colsCache = null;
    static _pkCache = null;

    constructor(data = {}) {
        // popula só os campos que vieram na linha
        Object.assign(this, data);
    }

    // nome da tabela – obrigatório em cada model filho
    static tableName = "";

    // Pega colunas da tabela (lazy + cache)
    static async _getColumns() {
        if (!this._colsCache) {
            this._colsCache = await DataBase.getTableColumns(this.tableName);
        }
        return this._colsCache;
    }

    // Pega cols da PK (lazy + cache)
    static async _getPKCols() {
        if (!this._pkCache) {
            this._pkCache = await DataBase.getPrimaryKeyColumns(this.tableName);
        }
        return this._pkCache;
    }

    // Campos para INSERT (ou usa o array pré‑definido em subclass)
    static async _getInsertableCols() {
        if (this.insertable && this.insertable.length) {
            return this.insertable;
        }
        const cols = await this._getColumns();
        const pk = await this._getPKCols();
        // remove PK e timestamps
        return cols.filter(c =>
            !pk.includes(c)
            && c !== "dataCriacao"
            && c !== "dataAtualizacao"
        );
    }

    // Campos para UPDATE (ou usa o array pré‑definido em subclass)
    static async _getUpdatableCols() {
        if (this.updatable && this.updatable.length) {
            return this.updatable;
        }
        const cols = await this._getColumns();
        const pk = await this._getPKCols();
        return cols.filter(c =>
            !pk.includes(c)
            && c !== "dataCriacao"
        );
    }

    // === CRUD genérico ===

    static async findOne(pk) {
        const table = this.tableName;
        const pkCols = await this._getPKCols();

        let where, params;
        if (pkCols.length === 1) {
            where = `${pkCols[0]} = ?`;
            params = [pk];
        } else {
            where = pkCols.map(c => `${c} = ?`).join(" AND ");
            params = pkCols.map(c => pk[c]);
        }

        const rows = await DataBase.executeSQLQuery(
            `SELECT * FROM ${table} WHERE ${where}`,
            params
        );
        return rows[0] ? new this(rows[0]) : null;
    }

    static async findAll() {
        const rows = await DataBase.executeSQLQuery(
            `SELECT * FROM ${this.tableName}`
        );
        return rows.map(r => new this(r));
    }

    async save() {
        const cls = this.constructor;
        const now = new Date().toISOString().slice(0, 19).replace("T", " ");
        const cols = await cls._getInsertableCols();
        cols.push("dataCriacao", "dataAtualizacao");

        const vals = cols.map(c => this[c] ?? now);
        const ph = cols.map(_ => "?").join(", ");

        const result = await DataBase.executeSQLQuery(
            `INSERT INTO ${cls.tableName} (${cols.join(",")}) VALUES (${ph})`,
            vals
        );

        // retorna o objeto recarregado
        if ((await cls._getPKCols()).length === 1) {
            return cls.findOne(result.insertId);
        }
        return this;
    }

    async update() {
        const cls = this.constructor;
        const now = new Date().toISOString().slice(0, 19).replace("T", " ");
        const cols = await cls._getUpdatableCols();
        cols.push("dataAtualizacao");

        const setClause = cols.map(c => `${c} = ?`).join(", ");
        const vals = cols.map(c => this[c] ?? now);

        const pkCols = await cls._getPKCols();
        const where = pkCols.map(c => `${c} = ?`).join(" AND ");
        const pkVals = pkCols.map(c => this[c]);

        await DataBase.executeSQLQuery(
            `UPDATE ${cls.tableName} SET ${setClause} WHERE ${where}`,
            [...vals, ...pkVals]
        );
        return this;
    }

    async delete() {
        const cls = this.constructor;
        const pkCols = await cls._getPKCols();
        const where = pkCols.map(c => `${c} = ?`).join(" AND ");
        const pkVals = pkCols.map(c => this[c]);

        await DataBase.executeSQLQuery(
            `DELETE FROM ${cls.tableName} WHERE ${where}`,
            pkVals
        );
        return this;
    }
}

module.exports = BaseModel;
