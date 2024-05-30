// Import Laravel Echo and Pusher
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

// Configure Laravel Echo
window.Echo = new Echo({
    broadcaster: "pusher",
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: true,
});

// Function to subscribe to the Sensor channel
function subscribeToSensorChannel(sensorId) {
    window.Echo.channel(`sensor.${sensorId}`).listen(
        "TemperatureUpdate",
        (event) => {
            const temperature = event.temperature;
            const sensorId = event.sensorId;
            const textElementId = `sensor${sensorId}Text`;

            // Update the circular progress bar and text for each sensor
            updateCircularProgressBar(
                `sensor${sensorId}Progress`,
                temperature,
                sensorId
            );
        }
    );
}

// Function to update the circular progress bar based on temperature value
function updateCircularProgressBar(elementId, temperature, textElementId) {
    const progress = ((temperature - 20) / 20) * 360; // Map temperature to degrees
    $("#" + elementId).text(temperature.toFixed(2) + " °C");
    $("#" + textElementId + "Text").text(
        "Sensor " + textElementId + ": " + temperature.toFixed(2) + " °C"
    );

    // Animate the circular progress
    $("#" + elementId).animate(
        { deg: progress },
        {
            duration: 1000, // Animation duration in milliseconds
            step: function (now) {
                $("#" + elementId).css("transform", "rotate(" + now + "deg)");
            },
        }
    );
}

// Start updating temperature values
$(document).ready(function () {
    // Initialize sensors data when the document is ready
    for (let i = 1; i <= 6; i++) {
        const sensorId = i;

        // Subscribe to the Sensor channel for each sensor
        subscribeToSensorChannel(sensorId);

        // Add sensor card to the DOM
        addSensorCard(
            `sensor${sensorId}Progress`,
            `sensor${sensorId}Text`,
            `Sensor ${sensorId}`
        );
    }
});
