// The API URL will automatically point to your Render domain
const API_URL = '/api/jobs';

// 1. Fetch and Display Jobs
async function fetchJobs(category = '') {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '<p>Loading jobs...</p>';

    try {
        // If a category is selected, add it to the URL query
        const url = category ? `${API_URL}?category=${category}` : API_URL;

        const response = await fetch(url);

        if (!response.ok) throw new Error('Network response was not ok');

        const jobs = await response.json();

        jobList.innerHTML = ''; // Clear loading message

        if (jobs.length === 0) {
            jobList.innerHTML = '<p class="no-jobs">No jobs found in this category.</p>';
            return;
        }

        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Type:</strong> ${job.type}</p>
                <span class="category-tag">${job.category}</span>
            `;
            jobList.appendChild(jobCard);
        });

    } catch (error) {
        console.error('Error fetching jobs:', error);
        jobList.innerHTML = `<p class="error">❌ Cannot connect to server. Please try again later.</p>`;
    }
}

// 2. Handle Form Submission (Add New Job)
const jobForm = document.getElementById('job-form');
if (jobForm) {
    jobForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            title: document.getElementById('title').value,
            company: document.getElementById('company').value,
            location: document.getElementById('location').value,
            category: document.getElementById('category').value,
            type: document.getElementById('type').value
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('✅ Job posted successfully!');
                jobForm.reset();
                fetchJobs(); // Refresh the list
            } else {
                alert('❌ Failed to post job.');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('❌ Server error. Please try again.');
        }
    });
}

// 3. Filter Buttons Logic
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        fetchJobs(category);
    });
});

// 4. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    fetchJobs();
});