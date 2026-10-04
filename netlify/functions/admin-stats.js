const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async (event) => {
  try {
    const usersRes = await pool.query('SELECT COUNT(*) FROM users');
    const productsRes = await pool.query('SELECT COUNT(*) FROM products');
    const ordersRes = await pool.query('SELECT COUNT(*) FROM orders');
    const salesRes = await pool.query("SELECT COALESCE(SUM(amount), 0) as total FROM orders WHERE status = 'completed'");

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        users: parseInt(usersRes.rows[0].count),
        products: parseInt(productsRes.rows[0].count),
        orders: parseInt(ordersRes.rows[0].count),
        sales: parseFloat(salesRes.rows[0].total)
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
