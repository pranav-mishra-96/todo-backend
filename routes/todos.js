const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../dbConfig');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.todos');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new todo
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request().query(
      `INSERT INTO dbo.todos (title, completed) VALUES ('${title}', 0)`
    );
    res.status(201).send('Todo added successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .query(
        `UPDATE dbo.todos SET title = '${title}', completed = ${completed} WHERE id = ${id}`
      );
    res.send('Todo updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request().query(`DELETE FROM dbo.todos WHERE id = ${id}`);
    res.send('Todo deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
