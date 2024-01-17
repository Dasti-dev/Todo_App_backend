const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./functions/auth');
const authMiddleware = require('./middlewares/authMiddleware');
const todosRoutes = require('./functions/todos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware.verifyToken, todosRoutes);

// Protected route
app.get('/protected', authMiddleware.verifyToken, (req, res) => {
  res.json({ message: 'You have access to this protected route.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
