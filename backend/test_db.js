const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection established.');
    const [results] = await sequelize.query("SHOW TABLES");
    console.log('Tables:', results.map(r => Object.values(r)[0]));
    process.exit(0);
  } catch (error) {
    console.error('DB Error:', error);
    process.exit(1);
  }
};

testConnection();
