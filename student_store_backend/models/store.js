const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Store {
    static async listProducts() {
        const query = `SELECT * FROM products`;
        const result = await db.query(query);
        const products = result.rows;
        console.log("list products", products);
        return products
    }
}

module.exports = Store