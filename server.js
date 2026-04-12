const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// --- 2. LOCAL DATA STORAGE ---
// Instead of MongoDB, we use a simple JSON file
const DATA_FILE = path.join(__dirname, 'jobs.json');

// Initialize the file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper functions to read/write data
const getJobsFromFile = () => JSON.parse(fs.readFileSync(DATA_FILE));
const saveJobsToFile = (jobs) => fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));

// --- 3. API ROUTES ---

// Get all jobs
app.get('/api/jobs', (req, res) => {
    try {
        const jobs = getJobsFromFile();
        const { category } = req.query;

        if (category) {
            const filteredJobs = jobs.filter(j => j.category === category);
            return res.json(filteredJobs);
        }

        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Could not read data" });
    }
});

// Add a new job
app.post('/api/jobs', (req, res) => {
    try {
        const jobs = getJobsFromFile();
        const newJob = {
            id: Date.now(), // Generate a simple ID
            ...req.body,
            posted: new Date().toISOString()
        };

        jobs.push(newJob);
        saveJobsToFile(jobs);

        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ error: "Could not save job" });
    }
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- 4. START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    ===========================================
    🚀 CareerFit is LIVE (Offline-Data Mode)
    🌐 URL: http://localhost:${PORT}
    
    ===========================================
    `);
});