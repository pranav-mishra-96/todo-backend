const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all todos
router.get('/', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new todo
router.post('/', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO todos (title) VALUES (?)', [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, completed: 0 });
  });
});

// Update a todo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  db.run(
    'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
    [title, completed, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Todo updated successfully' });
    }
  );
});

// Delete a todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo deleted successfully' });
  });
});

module.exports = router;
