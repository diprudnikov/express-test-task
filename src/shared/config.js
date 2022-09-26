const dbConfig = {
    dialect: 'sqlite',
    storage: './database.sqlite3'
};

const appConfig = {
    port: 3001
}

module.exports = { dbConfig, appConfig }
