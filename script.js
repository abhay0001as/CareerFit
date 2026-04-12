async function searchJobs() {
    const jobList = document.getElementById('job-list');

    try {
        // We use '/api/jobs' so it works on Render automatically
        const response = await fetch('/api/jobs');

        if (!response.ok) throw new Error('Not found');

        const jobs = await response.json();
        jobList.innerHTML = '';

        jobs.forEach(job => {
            const div = document.createElement('div');
            div.className = 'job-card';
            div.innerHTML = `<h3>${job.title}</h3><p>${job.company}</p>`;
            jobList.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        alert("Cannot connect to server. Ensure the Render site is live!");
    }
}