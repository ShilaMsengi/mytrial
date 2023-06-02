// When the document has loaded
$(document).ready(function() {

    // Connect to the WebSocket server running on the ESP8266
    var socket = new WebSocket("ws://" + location.hostname + ":81/");
  
    // When the WebSocket connection is opened
    socket.onopen = function(event) {
      console.log("WebSocket connected");
    };
  
    // When a message is received from the WebSocket server
    socket.onmessage = function(event) {
      // Parse the JSON message
      var data = JSON.parse(event.data);
      
      // If the message contains the sensor readings
      if (data.type == "sensor") {
        // Update the corresponding HTML element with the new sensor value
        if (data.sensor == 1) {
          $("#sensor1-value").text(data.value);
        } else if (data.sensor == 2) {
          $("#sensor2-value").text(data.value);
        }
      }
    };
  
    // When a button is clicked
    $("button").click(function() {
      // Get the ID of the button that was clicked
      var buttonId = $(this).attr("id");
  
      // Construct the command based on the button ID
      var command;
      if (buttonId == "relay1-button") {
        command = "relay1";
      } else if (buttonId == "relay2-button") {
        command = "relay2";
      }
  
      // Send the command to the WebSocket server
      socket.send(command);
    });
  });
  