const sqlite = require("sqlite3").verbose();

/**
 * Datenbankklasse
 */
class DB {

    /**
     * @author Sebastian Eberspach
     * @description Konstruktor hat den Pfad der Sqlite Datei als Parameter und
     *              erstellt eine Instanz und aktiviert die Funktion für Fremdschlüssel
     * @param db_file
     */
    constructor(db_file = "./db.sqlite3"){
        this.db = new sqlite.Database(db_file);
        // Für Fremdschlüssel aktivieren
        this.db.exec("PRAGMA foreign_key = ON");
    }

    /**
     * @author Sebastian Eberspach
     * @description Die Funktion erstellt die Tabellen "users", "genders", "haircolor", "eyescolor", "bodys", "chat",
     *              wenn Sie nicht existieren
     * @returns {Promise<void>}
     */
    async init(){
        await this.cmd("" +
            "CREATE TABLE IF NOT EXISTS personal" +
            "(" +
            "id INTEGER NOT NULL PRIMARY KEY," +
            "name TEXT NOT NULL," +
            "email TEXT NOT NULL," +
            "age TEXT NOT NULL" +
            ") WITHOUT ROWID;"
        );
    }


    /**
     * @author Sebastian Eberspach
     * @description Funktion mit Sql-Anweisung als Parameter, die zum Erstellen und Bearbeiten von Tabellen genutzt
     *              werden und startet die Datenbank.
     * @param sql
     * @param params
     * @returns {*}
     */
    cmd(sql,...params){
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err)
            {
                if (err !== null){
                    reject(err);
                }
                if (this !== undefined){
                    resolve(this);
                }
                reject('Das sollte nie passieren! FATAL ERROR #5751515517');
            });
        })
    }

    /**
     * @author Sebastian Eberspach
     * @description Funktion mit Sql-Anweisung als Parameter und holt die Daten aus der Datenbank und jeweiligen Tabelle
     * @param sql
     * @param params
     * @returns {Promise<any>}
     */
    get_row(sql,...params){
        return new Promise((resolve, reject) => {
            this.db.get(sql, params,(err,row) =>
            {
                if (err !== null){
                    reject();
                } else {
                    resolve(row);
                }
            });
        })
    }

    /**
     * Funktion dient zum Löschen von Tabellen, wenn Sie existieren
     * @returns {Promise<any>}
     */
    cleanup() {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run('DROP TABLE IF EXISTS personal');
                this.init().then( () => resolve() )
            });
        });
    }

}

module.exports = DB;