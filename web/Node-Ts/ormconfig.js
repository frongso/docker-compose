module.exports = {
  "type": "mariadb",
  "host": process.env.DATABASE_HOST,
  "port": process.env.MYSQL_PORT,
  "username": process.env.MYSQL_USER,
  "password": process.env.MYSQL_PASSWORD,
  "database": process.env.MYSQL_DATABASE,
  "entities": ["src/entities/*.ts"],
  "logging": true,
  "synchronize": true
}


