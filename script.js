// Stacks Echo | Dashboard Logic
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    // Initialize theme based on user preference
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    let isDark = localStorage.getItem("theme") ? localStorage.getItem("theme") === "dark" : true;
    if(!isDark) body.classList.add("light-mode");
    themeBtn.innerHTML = isDark ? '<span class="sun">☀️</span>' : '<span class="moon">🌙</span>';

    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        body.classList.toggle('light-mode');
        themeBtn.innerHTML = isDark ? '<span class="sun">☀️</span>' : '<span class="moon">🌙</span>';
        
        // Update Chart colors if needed
        updateCharts(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Price Chart (Mini Area Chart)
    const priceCtx = document.getElementById('priceChart').getContext('2d');
    let priceChart = new Chart(priceCtx, {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                data: [2.1, 2.3, 2.2, 2.5, 2.4, 2.6, 2.45],
                borderColor: '#fb923c',
                borderWidth: 2,
                fill: true,
                backgroundColor: 'rgba(251, 146, 60, 0.1)',
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });

    // Portfolio Allocation Chart (Donut)
    const portfolioCtx = document.getElementById('portfolioChart').getContext('2d');
    let portfolioChart = new Chart(portfolioCtx, {
        type: 'doughnut',
        data: {
            labels: ['STX', 'BTC', 'ALEX', 'Other'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [
                    '#fb923c',
                    '#f59e0b',
                    '#38bdf8',
                    '#6366f1'
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: isDark ? '#94a3b8' : '#475569',
                        font: { family: 'Outfit', size: 12 },
                        padding: 20
                    }
                }
            }
        }
    });

    function updateCharts(dark) {
        const textColor = dark ? '#94a3b8' : '#475569';
        portfolioChart.options.plugins.legend.labels.color = textColor;
        portfolioChart.update();
    }

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .activity-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Set current year
if (document.getElementById("year")) {
    document.getElementById("year").textContent = new Date().getFullYear();
}
