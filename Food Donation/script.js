
// on load
window.onload = function () {
    // theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-theme');

    // sample chart
    const chartData = {
        daily: [30, 50, 20],
        weekly: [40, 30, 30],
        monthly: [25, 35, 40]
    };

    const labels = ['Food', 'Funds', 'Volunteer'];

    const ctx = document.getElementById('donationChart').getContext('2d');

    let donationChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: chartData.daily,
                backgroundColor: ['#60a5fa', '#3b82f6', '#1e40af'],
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-color')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });

    function updateChart(period) {
        donationChart.data.datasets[0].data = chartData[period];
        donationChart.update();
    }

    document.querySelector('.daily-btn').addEventListener('click', function () {
        updateChart('daily');
        setActiveButton(this);
    });

    document.querySelector('.weekly-btn').addEventListener('click', function () {
        updateChart('weekly');
        setActiveButton(this);
    });

    document.querySelector('.monthly-btn').addEventListener('click', function () {
        updateChart('monthly');
        setActiveButton(this);
    });

    function setActiveButton(activeButton) {
        const buttons = document.querySelectorAll('.chart-btn');
        buttons.forEach(button => button.classList.remove('font-bold'));
        activeButton.classList.add('font-bold');
    }
}

// theme toggler
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// login and register
let userName = '';
let userEmail = '';
let isLoggedIn = false;
let isAdmin = false;

// Attach event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleSignup);
    document.getElementById('logoutOption').addEventListener('click', logout);
    updateDropdown();
});

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    const enteredUsername = document.getElementById('loginUsername').value;
    const enteredEmail = document.getElementById('loginEmail').value;
    const enteredPassword = document.getElementById('loginPassword').value;

    // Check if fields are filled
    if (enteredUsername && enteredEmail && enteredPassword) {
        userName = enteredUsername;
        userEmail = enteredEmail;
        isLoggedIn = true;

        // Check if the user is an admin
        if (enteredEmail === 'admin@example.com' || enteredUsername.toLowerCase() === 'admin') {
            isAdmin = true;
        } else {
            isAdmin = false;
        }
        updateDropdown();
        document.getElementById('loginForm').reset();
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    } else {
        alert('Please enter valid credentials');
    }
}

// Function to handle signup
function handleSignup(event) {
    event.preventDefault();
    const enteredName = document.getElementById('registerName').value;
    const enteredEmail = document.getElementById('registerEmail').value;
    const enteredPassword = document.getElementById('registerPassword').value;

    if (enteredName && enteredEmail && enteredPassword) {
        userName = enteredName;
        userEmail = enteredEmail;
        isLoggedIn = true;
        isAdmin = false; // New users are not admins by default

        updateDropdown();
        document.getElementById('registerForm').reset();
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
    } else {
        alert('Please fill in all fields');
    }
}

// Function to logout
function logout() {
    isLoggedIn = false;
    isAdmin = false;
    userName = '';
    userEmail = '';
    updateDropdown();
}

// Update dropdown content based on login state
function updateDropdown() {
    document.getElementById('loginOption').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('signupOption').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('dashboardOption').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('logoutOption').style.display = isLoggedIn ? 'block' : 'none';

    // Update Dashboard Link
    if (isAdmin) {
        document.getElementById('dashboardLink').textContent = 'Admin Dashboard';
        document.getElementById('dashboardLink').setAttribute('href', 'admin-dashboard.html');
    } else {
        document.getElementById('dashboardLink').textContent = 'User Dashboard';
        document.getElementById('dashboardLink').setAttribute('href', 'user-dashboard.html');
    }
}

// contact us
function sendMessage(event){
    event.preventDefault();
    alert("Message sent")
    document.getElementById('name').value='';
    document.getElementById('message').value='';
    document.getElementById('email').value='';
}

// back to top
window.addEventListener('scroll', function () {
    const backToTopLink = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTopLink.style.display = 'block';
    } else {
        backToTopLink.style.display = 'none';
    }
});