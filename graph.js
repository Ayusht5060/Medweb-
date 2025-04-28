const ctx = document.getElementById('tissueChart').getContext('2d');

// Dynamic data arrays
let timeLabels = [];
let perfectCondition = [];
let sensorData = [];
let aiPrediction = [];

const maxDataPoints = 10; // Maximum data points shown on the graph

// Chart initialization
const tissueChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [
            {
                label: 'Perfect Condition',
                data: perfectCondition,
                borderColor: 'rgba(0, 255, 0, 0.8)',
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            },
            {
                label: 'Sensor Data',
                data: sensorData,
                borderColor: 'rgba(0, 176, 255, 0.8)',
                backgroundColor: 'rgba(0, 176, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            },
            {
                label: 'AI Prediction',
                data: aiPrediction,
                borderColor: 'rgba(255, 165, 0, 0.8)',
                backgroundColor: 'rgba(255, 165, 0, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 5.5,
                suggestedMax: 8.0,
                title: {
                    display: true,
                    text: "pH Level"
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Time"
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
});

// Simulated real-time data generator
function getLiveData() {
    let currentTime = new Date().toLocaleTimeString();

    let perfectValue = 7.2 + (Math.random() * 0.2 - 0.1);
    let sensorValue = 6.8 + (Math.random() * 0.4 - 0.2);
    let aiPredictedValue = 6.9 + (Math.random() * 0.4 - 0.2);

    // Push new data
    timeLabels.push(currentTime);
    perfectCondition.push(perfectValue);
    sensorData.push(sensorValue);
    aiPrediction.push(aiPredictedValue);

    // Remove old data to maintain fixed graph size
    if (timeLabels.length > maxDataPoints) {
        timeLabels.shift();
        perfectCondition.shift();
        sensorData.shift();
        aiPrediction.shift();
    }

    // Update graph
    tissueChart.update();

    // Update status indicator
    updateStatus(aiPredictedValue);
}

// Function to update status indicator
function updateStatus(value) {
    let statusLabel = document.getElementById('statusLabel');

    if (value >= 7.0) {
        statusLabel.textContent = "Normal";
        statusLabel.className = "status-label normal";
    } else if (value >= 6.5) {
        statusLabel.textContent = "Warning";
        statusLabel.className = "status-label warning";
    } else {
        statusLabel.textContent = "Critical Failure";
        statusLabel.className = "status-label critical";
    }
}

// Update the graph every 3 seconds
setInterval(getLiveData, 3000);