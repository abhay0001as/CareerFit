const headerHTML = `
<nav style="display: flex; justify-content: space-between; align-items: center; padding: 15px 10%; background: #fff; border-bottom: 1px solid #edeff2; position: sticky; top: 0; z-index: 1000;">
    <a href="index.html" style="text-decoration: none; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 24px; font-weight: 800; color: #0052cc;">CareerFit</span>
    </a>
    <div style="display: flex; gap: 20px; align-items: center;">
        <a href="search.html" style="text-decoration: none; color: #44546f; font-weight: 600; font-size: 14px;">Jobs</a>
        <button onclick="location.href='login.html'" style="background: #e9f2ff; color: #0052cc; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer;">Login</button>
    </div>
</nav>
`;

const footerHTML = `
<footer style="background: #091e42; color: #fff; padding: 40px 10%; margin-top: 60px; text-align: center;">
    <div style="margin-bottom: 20px;">
        <h3 style="color: #00c7e4;">CareerFit</h3>
        <p style="color: #a5adba; font-size: 14px;">Your verified path to a better career.</p>
    </div>
    <div style="border-top: 1px solid #253858; padding-top: 20px; font-size: 12px; color: #a5adba;">
        &copy; 2026 CareerFit Inc. All rights reserved. | <a href="#" style="color: #fff;">Privacy Policy</a>
    </div>
</footer>
`;

// This function injects the HTML into the placeholders
window.addEventListener('DOMContentLoaded', () => {
    const headerPlace = document.getElementById('header-placeholder');
    const footerPlace = document.getElementById('footer-placeholder');

    if (headerPlace) headerPlace.innerHTML = headerHTML;
    if (footerPlace) footerPlace.innerHTML = footerHTML;
});