const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Order {
    static async listOrdersForUser() {
        //list orders that an authenticated user has created
    }
    static async createOrder({order, user}) {
        //takes user's order and stores it in database
    }
}

module.exports = Order