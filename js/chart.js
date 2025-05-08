document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#dataTable tbody');
    const myChartCanvas = document.getElementById('myChart');
    const chartContainer = document.querySelector('.content');

    // Táblázat adatok
    const tableData = [
        { id: 1, values: [23, 45, 67, 12, 34] },
        { id: 2, values: [33, 56, 78, 22, 44] },
        { id: 3, values: [13, 35, 57, 42, 54] },
        { id: 4, values: [43, 12, 65, 18, 29] },
        { id: 5, values: [53, 26, 48, 30, 61] },
    ];

    // Táblázat dinamikus kitöltése
    tableData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.id}</td>
            <td>${data.values[0]}</td>
            <td>${data.values[1]}</td>
            <td>${data.values[2]}</td>
            <td>${data.values[3]}</td>
            <td>${data.values[4]}</td>
        `;
        tableBody.appendChild(row);
    });

    // Vonaldiagram generálása
    let chart;

    function generateChart(data) {
        const labels = ['Érték 1', 'Érték 2', 'Érték 3', 'Érték 4', 'Érték 5'];
        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Adatok',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(myChartCanvas, {
            type: 'line',
            data: chartData,
        });
    }

    // Kattintás esemény a táblázat soraira
    tableBody.addEventListener('click', function(event) {
        const clickedRow = event.target.closest('tr');
        if (clickedRow) {
            const rowId = clickedRow.children[0].textContent;
            const selectedData = tableData.find(item => item.id == rowId);
            generateChart(selectedData.values);
        }
    });
});
