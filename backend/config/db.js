import { Sequelize } from "sequelize";

const db = new Sequelize("contact_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
