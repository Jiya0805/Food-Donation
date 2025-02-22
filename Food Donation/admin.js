// on load
window.onload = function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-theme');

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        donors: [10, 15, 12, 20, 25, 22, 18],
        volunteers: [5, 8, 7, 12, 10, 14, 9]
    };

    const ctx = document.getElementById('donationChart').getContext('2d');

    let donationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: 'Donors',
                    data: chartData.donors,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-color')
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Days of the Week'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of People'
                    },
                    beginAtZero: true
                }
            }
        }
    });

    function updateChart(type) {
        if (type === 'donor') {
            donationChart.data.datasets[0].label = 'Donors';
            donationChart.data.datasets[0].data = chartData.donors;
            donationChart.data.datasets[0].borderColor = '#3b82f6';
            donationChart.data.datasets[0].backgroundColor = 'rgba(59, 130, 246, 0.2)';
        } else if (type === 'volunteer') {
            donationChart.data.datasets[0].label = 'Volunteers';
            donationChart.data.datasets[0].data = chartData.volunteers;
            donationChart.data.datasets[0].borderColor = '#60a5fa';
            donationChart.data.datasets[0].backgroundColor = 'rgba(96, 165, 250, 0.2)';
        }
        donationChart.update();
    }

    document.querySelector('.donor-btn').addEventListener('click', function () {
        updateChart('donor');
        setActiveButton(this);
    });

    document.querySelector('.volunteer-btn').addEventListener('click', function () {
        updateChart('volunteer');
        setActiveButton(this);
    });

    function setActiveButton(activeButton) {
        const buttons = document.querySelectorAll('.chart-btn');
        buttons.forEach(button => button.classList.remove('font-bold'));
        activeButton.classList.add('font-bold');
    }
}

// logout
function logout() {
    isLoggedIn = false;
    userName = '';
    userEmail = '';
    history.back();
}

// back to top
window.addEventListener('scroll', () => {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (window.scrollY > 200) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const detailsBtn = document.querySelector('.details-btn');
    const amountBtn = document.querySelector('.amount-btn');
    const detailsTable = document.querySelector('.details-table');
    const amountTable = document.querySelector('.amount-table');

    detailsBtn.addEventListener('click', function() {
        detailsTable.classList.remove('hidden');
        amountTable.classList.add('hidden');
        detailsBtn.classList.add('active');
        amountBtn.classList.remove('active');
    });

    amountBtn.addEventListener('click', function() {
        amountTable.classList.remove('hidden');
        detailsTable.classList.add('hidden');
        amountBtn.classList.add('active');
        detailsBtn.classList.remove('active');
    });

    document.querySelectorAll('.approve-btn, .reject-btn').forEach(button => {
        button.addEventListener('click', function() {
            const siblingButton = this.nextElementSibling || this.previousElementSibling;
            siblingButton.disabled = true;
            this.classList.add('font-bold');
        });
    });
});

// report
async function downloadManagedDonationsReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const logoUrl = 'logo.png'; 

    const logoImage = new Image();
    logoImage.src = logoUrl;
    logoImage.onload = function () {
        // Add Logo
        doc.addImage(logoImage, 'PNG', 10, 10, 30, 30);

        // Add Title and Header
        doc.setFontSize(18);
        doc.text("Food Donation Report", 70, 20);
        doc.setFontSize(12);
        doc.text("Managed Donations", 20, 50);

        // Add Table Header
        doc.setFontSize(10);
        doc.text("Name", 20, 60);
        doc.text("Type", 50, 60);
        doc.text("Details", 80, 60);  
        doc.text("Amount", 140, 60);
        doc.text("Status", 170, 60);

        // Sample Data
        const sampleData = [
            { name: "John Doe", type: "Food", detail: "Canned Goods and Dry Snacks", amt: 500, status: "Approved" },
            { name: "Jane Smith", type: "Funds", detail: "Charity Event Support", amt: 1000, status: "Rejected" },
            { name: "Emily Brown", type: "Volunteer", detail: "Event Coordination and Help", amt: "N/A", status: "Approved" }
        ];

        // Add Data Rows
        let yPosition = 70;
        sampleData.forEach(item => {
            doc.text(item.name, 20, yPosition);
            doc.text(item.type, 50, yPosition);
            doc.text(item.detail, 80, yPosition); 
            doc.text(item.amt.toString(), 140, yPosition);
            doc.text(item.status, 170, yPosition);
            yPosition += 10;
        });

        // Footer
        doc.setFontSize(10);
        doc.text("Thank you for supporting the cause!", 70, yPosition + 10);

        // Save the PDF
        doc.save("Donation_Report.pdf");
    };
}
