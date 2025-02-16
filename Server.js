const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const apiRouter = require('./ReminderAPi');
mongoose.connect('mongodb://localhost:27017/Reminder_List', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Middleware to log each request with timestamp to a file
app.use((req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFile(path.join(__dirname, 'server.log'), logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
    next();
});

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'client/dist/client')));

// Use the router for API routes
app.use('/api', apiRouter);

// Catch-all route to serve Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/client/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server with Socket.io
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});