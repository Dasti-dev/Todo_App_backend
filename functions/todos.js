// functions/todos.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const todosDataFile = './data/todos.json';

// Helper function to read todos data
const readTodosData = () => {
  try {
    const fileContent = fs.readFileSync(todosDataFile, 'utf8');
    return fileContent ? JSON.parse(fileContent) : [];
  } catch (error) {
    return []; // Return an empty array if there's an error reading the file
  }
};

// Create a new todo
router.post('/create', (req, res) => {
  try {
    const { title, description, timestamp, notification = false, timeToRemind, todoType } = req.body;

    const todosData = readTodosData();
    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
      timestamp,
      notification,
      timeToRemind,
      todoType,
    };

    todosData.push(newTodo);
    fs.writeFileSync(todosDataFile, JSON.stringify(todosData));

    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all todos
router.get('/getAll', (req, res) => {
  try {
    const todosData = readTodosData();
    res.json({ todos: todosData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a todo
router.put('/update/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, timestamp, notification, timeToRemind, todoType } = req.body;

    const todosData = readTodosData();
    const todoIndex = todosData.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todosData[todoIndex] = {
      ...todosData[todoIndex],
      title: title || todosData[todoIndex].title,
      description: description || todosData[todoIndex].description,
      timestamp: timestamp || todosData[todoIndex].timestamp,
      notification: notification || todosData[todoIndex].notification,
      timeToRemind: timeToRemind || todosData[todoIndex].timeToRemind,
      todoType: todoType || todosData[todoIndex].todoType,
    };

    fs.writeFileSync(todosDataFile, JSON.stringify(todosData));

    res.json({ message: 'Todo updated successfully', todo: todosData[todoIndex] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a todo
router.delete('/delete/:id', (req, res) => {
  try {
    const { id } = req.params;

    const todosData = readTodosData();
    const updatedTodos = todosData.filter(todo => todo.id !== id);

    if (todosData.length === updatedTodos.length) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    fs.writeFileSync(todosDataFile, JSON.stringify(updatedTodos));

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
