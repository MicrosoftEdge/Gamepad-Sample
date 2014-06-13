function Init() {
  if (navigator.getGamepads === undefined) {
    // MATTES: TELL THEM TO UPGRADE THEIR BROWSER.
  } else {
    window.requestAnimationFrame(runAnimation);
  }
}

// --------------------------------------
// Animation loop
// --------------------------------------
function runAnimation() {
  var gamepads = navigator.getGamepads();
  for (var i = 0; i < gamepads.length; ++i) {
    var pad = gamepads[i];
    if (pad != undefined) {
      var fStandarMapping = (pad.mapping != undefined && pad.mapping === "standard");
      var gpVisualizer = fStandarMapping ? new StandardGamepadVisualizer(i) : new GenericGamepadVisualizer(i);
      gpVisualizer.UpdateView(pad);
      UpdateGamepadStateTable(pad, i);
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

function BoolToYesNo(boolean) {
  return boolean ? "yes" : "no";
}
function BoolToString(boolean) {
  return boolean ? "true" : "false";
}

g_stateTableRowTemplate = '\
  <td><div>gpIndex</div></td>\
  <td><div>gpTimestamp</div></td>\
  <td><div>gpMapping</div></td>\
  <td><div>gpId</div></td>\
';

function UpdateGamepadStateTable(gamepad, index) {
  var fConnected = false;
  var indexStr = "N/A";
  var timestampStr = "N/A";
  var mappingStr = "N/A";
  var idStr = "N/A";
  if (gamepad != undefined) {
    idStr = (gamepad.id != undefined) ? gamepad.id : "undefined";
    mappingStr = (gamepad.mapping != undefined) ? gamepad.mapping : "undefined";
    indexStr = (gamepad.index != undefined) ? gamepad.index : "undefined";
    timestampStr = (gamepad.timestamp != undefined) ? (gamepad.timestamp / 1000) + "s" : "undefined";
  }

  var newRow = g_stateTableRowTemplate;
  newRow = newRow.replace(/gpIndex/g, indexStr);
  newRow = newRow.replace(/gpTimestamp/g, timestampStr);
  newRow = newRow.replace(/gpMapping/g, mappingStr);
  newRow = newRow.replace(/gpId/g, idStr);
  var containerElem = document.getElementById("gpStateTableRow" + index);
  containerElem.innerHTML = newRow.replace(/\[#\]/g, index);
}