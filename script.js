// Function to simulate trading backtesting
function runBacktest() {
    let initialCapital = parseFloat(document.getElementById("initialCapital").value);
    
    if (isNaN(initialCapital) || initialCapital <= 0) {
        alert("Please enter a valid initial capital.");
        return;
    }

    let balance = initialCapital;
    let profitLossData = [];
    let labels = [];
    
    for (let i = 1; i <= 30; i++) {
        let dailyChange = (Math.random() - 0.5) * 10; // Random price movement
        balance += (balance * dailyChange) / 100;
        profitLossData.push(balance.toFixed(2));
        labels.push(`Day ${i}`);
    }

    document.getElementById("profitLoss").innerHTML = 
        `Final Balance: <strong>$${balance.toFixed(2)}</strong>`;

    drawChart(labels, profitLossData);
}

// Function to draw the profit/loss chart
function drawChart(labels, data) {
    let ctx = document.getElementById("chart").getContext("2d");
    
    if (window.myChart) {
        window.myChart.destroy(); // Destroy existing chart before creating a new one
    }

    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Balance Over Time ($)",
                data: data,
                borderColor: "blue",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { display: true },
                y: { display: true }
            }
        }
    });
}
