<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Realtime Temperature Monitoring Sensors</title>
    <!-- Bootstrap CSS -->
    <link
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <!-- Link to your app.css using asset() function -->
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}" type="text/css" />
  </head>
  <body>
    <div class="row">
      <div class="col-12">
        <div class="dashboard">
          <h1 class="dashboard-title">
            Realtime Temperature Monitoring Sensors
          </h1>
          <button class="btn btn-primary" id="addSensorBtn">Add Sensor</button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" id="sensorContainer">
        <!-- Sensors will be dynamically added here -->
      </div>
    </div>

    <!-- jQuery and Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <!-- Link to your script.js using asset() function -->
    <script src="{{ asset('assets/js/script.js') }}"></script>
  </body>
</html>

<!-- https://www.youtube.com/watch?v=9Nnj1zx48iY -->