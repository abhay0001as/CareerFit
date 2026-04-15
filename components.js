/**
 * CareerFit Global Components
 * Modifying these will update the Header and Footer across all linked pages.
 */

const components = {
    // MODIFIED HEADER: Added glass effect and active link styling
    header: `
    <nav style="display: flex; justify-content: space-between; align-items: center; padding: 12px 10%; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #dfe1e6; position: sticky; top: 0; z-index: 1000; font-family: 'Plus Jakarta Sans', sans-serif;">
        <a href="index.html" style="display: flex; align-items: center; text-decoration: none; gap: 10px;">
            <div style="background: #0052cc; width: 35px; height: 35px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800;">C</div>
            <span style="font-size: 20px; font-weight: 800; color: #091e42; letter-spacing: -0.5px;">CareerFit</span>
        </a>
        
        <div style="display: flex; align-items: center; gap: 30px;">
            <a href="search.html" style="text-decoration: none; color: #44546f; font-weight: 600; font-size: 14px; transition: 0.2s;" onmouseover="this.style.color='#0052cc'" onmouseout="this.style.color='#44546f'">Find Jobs</a>
            <a href="dashboard.html" style="text-decoration: none; color: #44546f; font-weight: 600; font-size: 14px; transition: 0.2s;" onmouseover="this.style.color='#0052cc'" onmouseout="this.style.color='#44546f'">Dashboard</a>
            <button onclick="logout()" style="background: #f4f5f7; color: #ff5630; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px; transition: 0.3s;" onmouseover="this.style.background='#ffebe6'" onmouseout="this.style.background='#f4f5f7'">
                Logout
            </button>
        </div>
    </nav>
    `,

    // MODIFIED FOOTER: Added more sections and social-style layout
    footer: `
    <footer style="background: #091e42; color: white; padding: 60px 10% 20px; font-family: 'Plus Jakarta Sans', sans-serif;">
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 50px; margin-bottom: 40px;">
            <div>
                <h3 style="color: #00c7e4; margin-bottom: 15px;">CareerFit</h3>
                <p style="color: #a5adba; line-height: 1.6; font-size: 14px; max-width: 300px;">
                    Connecting talented professionals with verified career opportunities. We skip the middleman to get you hired faster.
                </p>
            </div>
            <div>
                <h4 style="font-size: 16px; margin-bottom: 20px;">For Candidates</h4>
                <ul style="list-style: none; padding: 0; font-size: 14px; color: #a5adba; line-height: 2;">
                    <li><a href="search.html" style="color: inherit; text-decoration: none;">Browse Jobs</a></li>
                    <li><a href="#" style="color: inherit; text-decoration: none;">Career Advice</a></li>
                    <li><a href="#" style="color: inherit; text-decoration: none;">Help Center</a></li>
                </ul>
            </div>
            <div>
                <h4 style="font-size: 16px; margin-bottom: 20px;">Support</h4>
                <p style="font-size: 14px; color: #a5adba;">support@careerfit.com</p>
                <div style="display: flex; gap: 15px; margin-top: 15px;">
                    <span style="cursor:pointer">🐦</span> <span style="cursor:pointer">📸</span> <span style="cursor:pointer">💼</span>
                </div>
            </div>
        </div>
        <div style="border-top: 1px solid #253858; padding-top: 20px; text-align: center; color: #6b778c; font-size: 12px;">
            &copy; 2026 CareerFit Inc. All rights reserved. Made for the future of work.
        </div>
    </footer>
    `,

    render: function () {
        const hp = document.getElementById('header-placeholder');
        const fp = document.getElementById('footer-placeholder');
        if (hp) hp.innerHTML = this.header;
        if (fp) fp.innerHTML = this.footer;
    }
};

// Auto-render
document.addEventListener('DOMContentLoaded', () => components.render());