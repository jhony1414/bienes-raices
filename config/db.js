import { Sequelize } from "sequelize";



/* // Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres */

// Option 2: Passing parameters separately (sqlite)
const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'bienes_raices_node_mvc.db',
  define: {
    timestamps: true
  },

  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

/* // Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' 
}); */

export default db