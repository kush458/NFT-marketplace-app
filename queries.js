const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'kush',
    host: 'localhost',
    database: 'api',
    password: 'kush',
    port: 5432,
});

/**
 * Function to get all users from the postgres database.
 * GET from /users endpoint
 * @param {*} req request object
 * @param {*} res response object
 */
const getUsers = (req, res) => {
    // console.log("here");
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

/**
 * Function to get a user by ID from the postgres database.
 * GET from /users/:id endpoint
 * @param {*} req 
 * @param {*} res 
 */
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

/**
 * Function to create a new user and insert it in the postgres database.
 * POST to /users endpoint
 * @param {*} req 
 * @param {*} res 
 */
const createUser = (req, res) => {
    const { name, email } = req.body;

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error;
        }
        // There is no actual difference between res.send and res.json, both methods are almost identical. res.json calls res.send at the end
        res.status(201).send(`User added with ID: ${results.rows[0]}`);
    });
};




/**
 * Function to update an existing user in the postgres database.
 * PUT to /users/:id endpoint 
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const UpdateVal = pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
          if (error) {
            // console.log('GAY');
            throw error;
          }
        //   console.log('GAY');
          res.status(200).send(`User modified with ID: ${id}`);
    });
};

/**
 * Function to delete an existing user in the postgres database.
 * DELETE from /users/:id endpoint
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};