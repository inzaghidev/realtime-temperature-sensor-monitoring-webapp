// Array to store sensor data
let sensorsData = [];

// Add Sensor button click handler
$("#addSensorBtn").on("click", function () {
  // Show a dialog to add a new sensor
  const sensorName = prompt("Enter Sensor Name :");
  if (sensorName !== null && sensorName.trim() !== "") {
    addSensor(sensorName);
  }
});

// Delete Sensor button click handler
$(document).on("click", ".deleteSensorBtn", function () {
  const sensorId = $(this).data("sensor-id");
  const confirmDelete = confirm("Are you want to Delete this Sensor?");
  if (confirmDelete) {
    // Call a function to delete the sensor with the given ID
    deleteSensor(sensorId);
  }
});

// Function to update the circular progress bar and text for each sensor
// Simulate real-time temperature updates
function updateTemperature() {
  setInterval(function () {
    sensorsData.forEach((sensor) => {
      const temperature = Math.random() * 20 + 20; // Simulate temperature values between 20 and 40 degrees Celsius
      sensor.temperature = temperature;

      // Update the circular progress bar and text for each sensor
      updateCircularProgressBar(sensor.id, temperature, sensor.number);
    });
  }, 2000); // Update every 2 seconds
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
    const sensorId = "sensor" + i + "Progress";
    const sensorTextId = "sensor" + i + "Text";
    const sensorName = "Sensor " + i;

    // Add sensor data to the array
    sensorsData.push({
      id: sensorId,
      number: i,
      temperature: 0,
    });

    // Add sensor card to the DOM
    addSensorCard(sensorId, sensorTextId, sensorName);
  }

  // Start updating temperature values
  updateTemperature();
});

// Function to add a new sensor
function addSensor(sensorName) {
  const sensorNumber = sensorsData.length + 1;
  const sensorId = "sensor" + sensorNumber + "Progress";
  const sensorTextId = "sensor" + sensorNumber + "Text";

  // Add sensor data to the array
  sensorsData.push({
    id: sensorId,
    number: sensorNumber,
    temperature: 0,
  });

  // Add sensor card to the DOM
  addSensorCard(sensorId, sensorTextId, sensorName);
}

// Function to delete a sensor
function deleteSensor(sensorId) {
  // Remove sensor data from the array
  sensorsData = sensorsData.filter((sensor) => sensor.id !== sensorId);

  // Remove sensor card from the DOM
  $("#" + sensorId)
    .closest(".col-lg-4")
    .remove();
}

// Function to add a sensor card to the DOM
function addSensorCard(sensorId, sensorTextId, sensorName) {
  const newSensorCard = `
    <div class="col-lg-4 col-md-6" style="padding: 10px">
      <div class="card sensor-card text-center">
        <div class="card-body">
          <div class="circular-progress">
            <div class="progress-value" id="${sensorId}">
              Loading...
            </div>
          </div>
          <p class="text" id="${sensorTextId}">${sensorName}</p>
          <button class="btn btn-danger deleteSensorBtn" data-sensor-id="${sensorId}">Delete</button>
        </div>
      </div>
    </div>
  `;

  $("#sensorContainer").append(newSensorCard);
}
