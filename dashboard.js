document.addEventListener("DOMContentLoaded", () => {
    const oxygenSpan = document.getElementById("oxygen");
    const bloodFlowSpan = document.getElementById("bloodFlow");
    
    // Randomly simulate data changes
    setInterval(() => {
        const oxygenLevel = Math.floor(Math.random() * 5) + 95;  // Simulating 95-99% oxygen
        const bloodFlow = ["Normal", "Low", "Critical"][Math.floor(Math.random() * 3)];

        oxygenSpan.textContent = oxygenLevel;
        bloodFlowSpan.textContent = bloodFlow;
    }, 3000);

    // Chart.js Configuration
    const ctx = document.getElementById("dataChart").getContext("2d");

    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["1 min ago", "50s", "40s", "30s", "20s", "10s", "Now"],
            datasets: [{
                label: "Oxygen Level (%)",
                data: [98, 97, 96, 95, 97, 98, 99],
                borderColor: "#00FFAA",
                backgroundColor: "rgba(0,255,170,0.1)",
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 90,
                    suggestedMax: 100
                }
            }
        }
    });

    setInterval(() => {
        chart.data.datasets[0].data.push(Math.floor(Math.random() * 5) + 95);
        chart.data.datasets[0].data.shift();
        chart.update();
    }, 5000);
});