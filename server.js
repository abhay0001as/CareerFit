const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serves your HTML/CSS/JS files from the root folder
app.use(express.static(path.join(__dirname, '.')));

const DATA_FILE = path.join(__dirname, 'jobs.json');

// --- 1. GET: Load all jobs (Used for searching) ---
app.get('/api/jobs', (req, res) => {
    try {
        // Ensure the file exists before reading
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify([]));
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error("Error reading jobs:", error);
        res.status(500).json({ error: "Failed to load jobs" });
    }
});

// --- 2. POST: Add a new job (Used for publishing) ---
app.post('/api/jobs', (req, res) => {
    try {
        // Read existing jobs
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const jobs = JSON.parse(data);

        // Create new job from request body
        const newJob = {
            id: Date.now(),
            title: req.body.title,
            company: req.body.company,
            degree: req.body.degree,
            skill: req.body.skill || "General",
            salary: req.body.salary,
            type: req.body.type || "Full-Time",
            postedAt: new Date().toISOString()
        };

        // Add to array and save back to file
        jobs.push(newJob);
        fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));

        console.log("Job added successfully:", newJob.title);
        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error saving job:", error);
        res.status(500).json({ error: "Failed to save job" });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});