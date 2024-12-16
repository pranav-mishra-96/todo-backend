const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
