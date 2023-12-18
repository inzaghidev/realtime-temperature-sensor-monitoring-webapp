let sensorsData = [];

$("#addSensorBtn").on("click", function () {
  const sensorName = prompt("Enter Sensor Name :");
  if (sensorName !== null && sensorName.trim() !== "") {
    addSensor(sensorName);
  }
});

$(document).on("click", ".deleteSensorBtn", function () {
  const sensorId = $(this).data("sensor-id");
  const confirmDelete = confirm("Are you want to Delete this Sensor?");
  if (confirmDelete) {
    deleteSensor(sensorId);
  }
});

function updateTemperature() {
  setInterval(function () {
    sensorsData.forEach((sensor) => {
      const temperature = Math.random() * 20 + 20;
      sensor.temperature = temperature;

      updateCircularProgressBar(sensor.id, temperature, sensor.number);
    });
  }, 2000);
}

function updateCircularProgressBar(elementId, temperature, textElementId) {
  const progress = ((temperature - 20) / 20) * 360;
  $("#" + elementId).text(temperature.toFixed(2) + " °C");
  $("#" + textElementId + "Text").text(
    "Sensor " + textElementId + ": " + temperature.toFixed(2) + " °C"
  );

  $("#" + elementId).animate(
    { deg: progress },
    {
      duration: 1000,
      step: function (now) {
        $("#" + elementId).css("transform", "rotate(" + now + "deg)");
      },
    }
  );
}

$(document).ready(function () {
  for (let i = 1; i <= 6; i++) {
    const sensorId = "sensor" + i + "Progress";
    const sensorTextId = "sensor" + i + "Text";
    const sensorName = "Sensor " + i;

    sensorsData.push({
      id: sensorId,
      number: i,
      temperature: 0,
    });

    addSensorCard(sensorId, sensorTextId, sensorName);
  }

  updateTemperature();
});

function addSensor(sensorName) {
  const sensorNumber = sensorsData.length + 1;
  const sensorId = "sensor" + sensorNumber + "Progress";
  const sensorTextId = "sensor" + sensorNumber + "Text";

  sensorsData.push({
    id: sensorId,
    number: sensorNumber,
    temperature: 0,
  });

  addSensorCard(sensorId, sensorTextId, sensorName);
}

function deleteSensor(sensorId) {
  sensorsData = sensorsData.filter((sensor) => sensor.id !== sensorId);

  $("#" + sensorId)
    .closest(".col-lg-4")
    .remove();
}

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
