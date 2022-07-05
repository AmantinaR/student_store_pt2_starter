const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Order {
    static async listOrdersForUser(user) {
        //list orders that an authenticated user has created
        console.log("list orders")
        const query = `
            SELECT o.id AS "orderId",
                o.customer_id AS "customerId",
                od.quantity AS "quantity",
                p.name AS "name",
                p.price AS "price" FROM orders AS o
            INNER JOIN order_details AS od ON o.id = od.order_id
            INNER JOIN products as p ON p.id = od.product_id
            WHERE o.customer_id = (SELECT id FROM users WHERE email = $1)
        `
        const result = await db.query(query, [user.email])
    }
    static async createOrder({order, user}) {
        //takes user's order and stores it in database
        let user_id = await db.query(`SELECT id FROM users WHERE email = $1`, [user.email]);
        user_id = user_id.rows[0];
        const query = `INSERT INTO orders (
            customer_id
        )
        VALUES ($1)
        RETURNING id;
    `
    let orderId = await db.query(query, [user_id]);
    orderId = orderId.rows[0]
    order.forEach((product) => {
        /*order_id    INTEGER NOT NULL,
  product_id  INTEGER NOT NULL,
  quantity    INTEGER NOT NULL DEFAULT 1,
  discount    INTEGER NOT NULL */
        const query = `INSERT INTO order_details (
            order_id,
            product_id,
            quantity,
            discount
        )
        VALUES ($1, $2, $3, $4)
        RETURNING order_id;
        `;
        db.query(query, [orderId, product.id, product.quantity, product.discount])
    })
    }
}

module.exports = Order