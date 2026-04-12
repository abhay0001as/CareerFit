const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// This line is very important: It serves your index.html, style.css, and script.js 
// automatically when you open the website URL.
app.use(express.static(path.join(__dirname, '.')));

// --- 2. DATA INITIALIZATION ---
const DATA_FILE = path.join(__dirname, 'jobs.json');

// Ensure jobs.json exists so the server doesn't crash on startup
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// --- 3. API ROUTES ---

// GET: Fetch all jobs (or filter by category)
app.get('/api/jobs', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        let jobs = JSON.parse(data);

        const category = req.query.category;
        if (category) {
            jobs = jobs.filter(j => j.category.toLowerCase() === category.toLowerCase());
        }

        res.json(jobs);
    } catch (error) {
        console.error("Error reading jobs:", error);
        res.status(500).json({ error: "Failed to load jobs" });
    }
});

// POST: Add a new job
app.post('/api/jobs', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const jobs = JSON.parse(data);

        const newJob = {
            id: Date.now(), // Unique ID based on timestamp
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            category: req.body.category,
            type: req.body.type
        };

        jobs.push(newJob);
        fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));

        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error saving job:", error);
        res.status(500).json({ error: "Failed to save job" });
    }
});

// --- 4. START SERVER ---
// We use process.env.PORT because Render tells the server which port to use.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running!`);
    console.log(`🏠 Local: http://localhost:${PORT}`);
});