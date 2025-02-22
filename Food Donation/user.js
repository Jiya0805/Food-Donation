
// logout
function logout() {
    isLoggedIn = false;
    userName = '';
    userEmail = '';
    history.back();
}

// sort table
function sortTable(columnIndex) {
    const tableBody = document.getElementById('historyTable');
    const rows = Array.from(tableBody.getElementsByClassName('table-row'));
    let sortedRows;

    sortedRows = rows.sort((a, b) => {
        const cellA = a.getElementsByClassName('table-cell')[columnIndex].innerText;
        const cellB = b.getElementsByClassName('table-cell')[columnIndex].innerText;

        if (columnIndex === 0) {
            return new Date(cellA) - new Date(cellB);
        } else if (columnIndex === 1) {
            return parseInt(cellA.replace(/[^0-9]/g, '')) - parseInt(cellB.replace(/[^0-9]/g, ''));
        }
    });

    tableBody.innerHTML = '';
    sortedRows.forEach(row => tableBody.appendChild(row));
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

// receipt
async function downloadReceipt(date, amount, type, status) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add receipt content
    doc.setFontSize(18);
    doc.text("Donation Receipt", 70, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 20, 40);
    doc.text(`Amount: ${amount}`, 20, 50);
    doc.text(`Type: ${type}`, 20, 60);
    doc.text(`Status: ${status}`, 20, 70);

    doc.setFontSize(14);
    doc.text("Thank you for your generous donation!", 20, 90);

    // Save the PDF
    doc.save(`Receipt_${date}.pdf`);
}