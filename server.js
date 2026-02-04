const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock Data (Database Simulation)
const projects = [
    {
        id: 1,
        title: 'Portfolio Website',
        description: 'Responsive personal portfolio using HTML, CSS, and JavaScript.'
    },
    {
        id: 2,
        title: 'E-Commerce Website',
        description: 'Full stack web application with authentication and payments.'
    },
    {
        id: 3,
        title: 'Student Management System',
        description: 'CRUD-based project using Python and database.'
    }
];

// API Routes
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Simulate saving to database or sending email
    console.log('Contact Form Submission:', { name, email, message });

    if (name && email && message) {
        res.status(200).json({ success: true, message: 'Message received successfully!' });
    } else {
        res.status(400).json({ success: false, message: 'All fields are required.' });
    }
});

// Serve Frontend (Fallback)
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
