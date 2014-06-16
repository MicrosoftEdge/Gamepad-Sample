function Init() {
  if (navigator.getGamepads === undefined) {
    document.getElementById("gamepadSupportedDiv").style.display = "block";
    document.getElementById("gamepadDisplayDiv").style.display = "none";
  } else {
    window.requestAnimationFrame(runAnimation);
  }
}

// --------------------------------------
// Animation loop
// --------------------------------------
var buttonPressedOnAnyGamepadEver = false;
var gamepadVisualizers = [];
function runAnimation() {

  // Get the latest gamepad state.
  var gamepads = navigator.getGamepads();
  for (var i = 0; i < gamepads.length; i++) {
    var pad = gamepads[i];
    if (pad) {

      if (!buttonPressedOnAnyGamepadEver) {
        document.getElementById("buttonNeverPressedDiv").style.display = "none";
        document.getElementById("buttonPressedDiv").style.display = "block";
        buttonPressedOnAnyGamepadEver = true;
      }

      var fStandardMapping = (pad.mapping && pad.mapping === "standard");
      var gpVisualizer = fStandardMapping ? new StandardGamepadVisualizer(pad) : new GenericGamepadVisualizer(pad);
      gamepadVisualizers[i] = gpVisualizer;
    } else {
      if (gamepadVisualizers[i]) {
        gamepadVisualizers[i].fRetired = true;
      }
    }
  }

  for (var i = 0; i < gamepadVisualizers.length; i++) {
    var gpVisualizer = gamepadVisualizers[i];
    if (gamepadVisualizers[i]) {
      gpVisualizer.UpdateView();
    }
  }
  
  window.requestAnimationFrame(runAnimation);
}

// --------------------------------------
// Misc.
// --------------------------------------
function FloatValueAsString(flValue) {
  var strVal = flValue.toString();
  strVal = strVal.substring(0, 4);
  return strVal;
}

g_stateTableRowTemplate = '\
  <td><div>gpIndex</div></td>\
  <td><div>gpTimestamp</div></td>\
  <td><div>gpMapping</div></td>\
  <td><div>gpConnected</div></td>\
  <td><div>gpId</div></td>\
';

function UpdateGamepadStateTable(gamepad, index) {
  var connectedStr = "N/A";
  var indexStr = "N/A";
  var timestampStr = "N/A";
  var mappingStr = "N/A";
  var idStr = "N/A";
  if (gamepad) {
    idStr = (gamepad.id) ? gamepad.id : "undefined";
    mappingStr = (gamepad.mapping) ? gamepad.mapping : "undefined";
    indexStr = (gamepad.index) ? gamepad.index : "undefined";
    connectedStr = (gamepad.connected !== undefined) ? gamepad.connected : "undefined";
    timestampStr = (gamepad.timestamp) ? (gamepad.timestamp / 1000) + "s" : "undefined";
  }

  var newRow = g_stateTableRowTemplate;
  newRow = newRow.replace(/gpIndex/g, indexStr);
  newRow = newRow.replace(/gpTimestamp/g, timestampStr);
  newRow = newRow.replace(/gpMapping/g, mappingStr);
  newRow = newRow.replace(/gpConnected/g, connectedStr);
  newRow = newRow.replace(/gpId/g, idStr);
  var containerElem = document.getElementById("gpStateTableRow" + index);
  containerElem.innerHTML = newRow.replace(/\[#\]/g, index);
}

function ClearGamepadStateTableRow(index) {
  var containerElem = document.getElementById("gpStateTableRow" + index);
  containerElem.innerHTML = "";
}