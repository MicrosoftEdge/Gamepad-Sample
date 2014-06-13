// --------------------------------------
// AxisVisualizer
// --------------------------------------
function AxisVisualizer(elemId) {
  this.XAxisValue = 0.0;
  this.YAxisValue = 0.0;
  this.elemId = elemId;
  this.cxCursor = 11;

  this.setElemStyles = function AxisVisualizer_setElemStyles(elem) {
    var cxImage = 100 + (this.cxCursor - 1);
    var cxOffset = (this.cxCursor - 1) / 2;
    elem.style.width = cxImage + "px";
    elem.style.height = cxImage + "px";
    var xAxisLeft = Math.round((this.XAxisValue + 1.0) * 50);
    var yAxisRight = Math.round((this.YAxisValue + 1.0) * 50);
    elem.style.backgroundPosition = xAxisLeft + "px " + yAxisRight + "px, " + cxOffset + "px " + cxOffset + "px";

    if (this.value > 1.0 || this.value < -1.0) { alert('Invalid Value!') };
    var childNodes = elem.childNodes;
    var lastChild = childNodes[childNodes.length - 1];
    lastChild.innerHTML = FloatValueAsString(this.XAxisValue) + ',' + FloatValueAsString(this.YAxisValue);
  }

  this.setXAxisValue = function AxisVisualizer_setXAxisValue(val) {
    if (val < -1.0) {
      val = -1.0;
    }
    else if (val > 1.0) {
      val = 1.0;
    }
    this.XAxisValue = val;
    this.onValueChange();
  }

  this.setYAxisValue = function AxisVisualizer_setYAxisValue(val) {
    if (val < -1.0) {
      val = -1.0;
    }
    else if (val > 1.0) {
      val = 1.0;
    }
    this.YAxisValue = val;
    this.onValueChange();
  }

  this.onValueChange = function AxisVisualizer_onValueChange() {
    var elem = document.getElementById(this.elemId);
    this.setElemStyles(elem);
  }
}

// --------------------------------------
// AnalogButtonVisualizer
// --------------------------------------
function AnalogButtonVisualizer(elemId) {
  this.elemId = elemId;
  this.value = 0;
  this.fIsPressed = false;

  this.setElemStyles = function AnalogButtonVisualizer_setElemStyles(elem) {
    var cxHeight = Math.round(this.value * 98);
    var top = 100 - cxHeight - 1
    elem.style.backgroundPosition = "1px " + top + "px, 0px 0px";
    elem.style.backgroundSize = "28px " + cxHeight + "px, 30px 100px";
    if (this.fIsPressed === true) {
      elem.style.color = "salmon";
    }
    else {
      elem.style.color = "black";
    }

    if (this.value > 1.0 || this.value < 0) { alert('oops!') };
    var childNodes = elem.childNodes;
    var lastChild = childNodes[childNodes.length - 1];
    lastChild.innerHTML = FloatValueAsString(this.value);
  }

  this.setValue = function AnalogButtonVisualizer_setValue(val, fIsPressed) {
    if (val < -1.0) {
      val = -1.0;
    }
    else if (val > 1.0) {
      val = 1.0;
    }
    this.value = val;
    this.fIsPressed = fIsPressed;

    var elem = document.getElementById(this.elemId);
    this.setElemStyles(elem);
  }
}

// --------------------------------------
// DigitalButtonVisualizer
// --------------------------------------
function DigitalButtonVisualizer(elemId) {
  this.elemId = elemId;
  this.value = 0;
  this.fIsPressed = false;

  this.setElemStyles = function DigitalButtonVisualizer_setElemStyles(elem) {
    if (this.value === 1.0) {
      elem.style.backgroundColor = "#8AFF59";
    } else {
      elem.style.backgroundColor = "transparent";
    }

    if (this.fIsPressed === true) {
      elem.style.color = "salmon";
    }
    else {
      elem.style.color = "black";
    }
  }

  this.setValue = function DigitalButtonVisualizer_setValue(val, fIsPressed) {
    this.value = val;
    this.fIsPressed = fIsPressed;
    var elem = document.getElementById(this.elemId);
    this.setElemStyles(elem);
  }
}

// --------------------------------------
// StandardGamepadVisualizer
// --------------------------------------
function StandardGamepadVisualizer(idx) {
  this.idx = idx;
  this.containerElemId = "gp" + idx + "Cell";
  this.leftThumb = new AxisVisualizer("gp" + idx + "leftThumb");
  this.rightThumb = new AxisVisualizer("gp" + idx + "rightThumb");
  this.leftTrigger = new AnalogButtonVisualizer("gp" + idx + "LT");
  this.rightTrigger = new AnalogButtonVisualizer("gp" + idx + "RT");

  this.buttonMap = [
    //              elemId is prefixed with "gp#"   
    { buttonIdx: 0, elemId: "BtnA" },
    { buttonIdx: 1, elemId: "BtnB" },
    { buttonIdx: 2, elemId: "BtnX" },
    { buttonIdx: 3, elemId: "BtnY" },
    { buttonIdx: 4, elemId: "BtnLB" },
    { buttonIdx: 5, elemId: "BtnRB" },
    { buttonIdx: 8, elemId: "BtnSelect" },
    { buttonIdx: 9, elemId: "BtnStart" },
    { buttonIdx: 10, elemId: "BtnLThumb" },
    { buttonIdx: 11, elemId: "BtnRThumb" },
    { buttonIdx: 12, elemId: "BtnDU" },
    { buttonIdx: 13, elemId: "BtnDD" },
    { buttonIdx: 14, elemId: "BtnDL" },
    { buttonIdx: 15, elemId: "BtnDR" }
  ];

  this.UpdateView = function StandardGamepadVisualizer_UpdateView(pad) {
    var containerElem = document.getElementById(this.containerElemId);
    if (pad != undefined) {
      if (pad.mapping === "standard") {
        var templateStr = g_starndardGamepadVisualizerTemplate.replace(/gp\[#\]/g, "gp" + this.idx);
        containerElem.innerHTML = templateStr;
        this.leftThumb.setXAxisValue(pad.axes[0]);
        this.leftThumb.setYAxisValue(pad.axes[1]);
        this.rightThumb.setXAxisValue(pad.axes[2]);
        this.rightThumb.setYAxisValue(pad.axes[3]);
        var buttonLeftTrigger = pad.buttons[6];
        var buttonRightTrigger = pad.buttons[7];
        this.leftTrigger.setValue(buttonLeftTrigger.value, buttonLeftTrigger.pressed);
        this.rightTrigger.setValue(buttonRightTrigger.value, buttonRightTrigger.pressed);
        this.UpdateButtons(pad);
      }
    } else {
      containerElem.innerHTML = "<div class='gpNotConnectedText'>Gamepad not connected.</div>";
    }
  }

  this.UpdateButtons = function StandardGamepadVisualizer_UpdateButtons(pad) {
    for (var i = 0; i < this.buttonMap.length; i++) {
      var visualizer = this.buttonMap[i].visualizer;
      if (this.buttonMap[i].buttonIdx < pad.buttons.length) {
        var idx = this.buttonMap[i].buttonIdx;
        var button = pad.buttons[idx];
        visualizer.setValue(button.value, button.pressed);
      }
    }
  }

  this.Init = function _Init() {
    for (var i = 0; i < this.buttonMap.length; i++) {
      var elemId = "gp" + this.idx + this.buttonMap[i].elemId;
      this.buttonMap[i].visualizer = new DigitalButtonVisualizer(elemId);
    }
  }
  this.Init();
}


// --------------------------------------
// GenericGamepadVisualizer
// --------------------------------------
function GenericGamepadVisualizer(pad) {
  this.idx = pad.index;
  this.containerElemId = "gp" + this.idx + "Cell";

  this.Init = function GenericGamepadVisualizer_Init(pad) {
    var containerElem = document.getElementById(this.containerElemId);
    var strInject = "";

    var buttonTemplateStr = '<div id="gp[#]" class="AnalogButtonVisualizer VisualizerGeneric" style="">[BTN#]<div id="val"></div></div>';
    for (var idx = 0; idx < pad.buttons.length; idx++) {
      var elemId = "gp" + this.idx + "Btn" + idx;
      var buttonStr = buttonTemplateStr.replace(/gp\[#\]/g, elemId);
      buttonStr = buttonStr.replace(/\[BTN#\]/g, "B" + idx);
      strInject += buttonStr;
    }
    strInject += "<br>";

    var axisTemplateStr = '<div id="gp[#]" class="AxisVisualizer VisualizerGeneric"><div id="val"></div></div>';
    for (var idx = 0; idx < pad.axes.length; idx += 2) {
      var elemId = "gp" + this.idx + "Axis" + idx;
      var axisStr = axisTemplateStr.replace(/gp\[#\]/g, elemId);
      strInject += axisStr;
    }

    containerElem.innerHTML = strInject;
  }

  this.UpdateView = function GenericGamepadVisualizer_UpdateView(pad) {
    var containerElem = document.getElementById(this.containerElemId);
    if (pad != undefined) {
      if (pad.mapping === "" /*firefox*/) {
        for (var idx = 0; idx < pad.buttons.length; idx++) {
          var elemId = "gp" + this.idx + "Btn" + idx;
          var visualizer = new AnalogButtonVisualizer(elemId);
          var button = pad.buttons[idx];
          visualizer.setValue(button.value, button.pressed);
        }

        for (var idx = 0; idx < pad.axes.length; idx += 2) {
          var elemId = "gp" + this.idx + "Axis" + idx;
          var visualizer = new AxisVisualizer(elemId);
          visualizer.setXAxisValue(pad.axes[idx]);
          if (pad.axes[idx + 1] != undefined) {
            visualizer.setYAxisValue(pad.axes[idx + 1]);
          }
        }

      }
    } else {
      containerElem.innerHTML = "<div class='gpNotConnectedText'>Gamepad not connected.</div>";
    }
  }
  this.Init(pad);
}


g_starndardGamepadVisualizerTemplate = '\
  <table class="gamepadVisualizer">\
    <tr>\
      <th></th>\
      <td colspan="3"><div id="gp[#]BtnLB" class="oval && bumper">LB</div></td>\
      <td colspan="2"></td>\
      <td id="gp[#]BtnRB" colspan="3"><div class="oval && bumper">RB</div></td>\
      <th></th>\
    </tr>\
    <tr>\
      <td rowspan="3"><div id="gp[#]LT" class="AnalogButtonVisualizer">LT<div id="val"></div></div></td>\
      <td colspan="3" rowspan="3"><div class="DPad" id="DPad1"><div class="btnDU" id="gp[#]BtnDU"></div><div class="btnDL" id="gp[#]BtnDL"></div><div class="btnDR" id="gp[#]BtnDR"></div><div class="btnDD" id="gp[#]BtnDD"></div></div></td>\
      <td colspan="3"></td>\
      <td><div id="gp[#]BtnY" class="circle">Y</div></td>\
      <td></td>\
      <td rowspan="3"><div id="gp[#]RT" class="AnalogButtonVisualizer">RT<div id="val"></div></div></td>\
    </tr>\
    <tr>\
      <td><div id="gp[#]BtnSelect" class="oval && selOrStart">Select</div></td>\
      <td><div id="gp[#]BtnStart" class="oval && selOrStart">Start</div></td>\
      <td><div id="gp[#]BtnX" class="circle">X</div></td>\
      <td></td>\
      <td><div id="gp[#]BtnB" class="circle">B</div></td>\
    </tr>\
    <tr><td colspan="3"></td><td><div id="gp[#]BtnA" class="circle">A</div></td></tr>\
    <tr>\
      <td></td>\
      <td colspan="4"><div id="gp[#]BtnLThumb" class="oval">Left Thumb</div></td>\
      <td colspan="4"><div id="gp[#]BtnRThumb" class="oval">Right Thumb</div></td>\
    </tr>\
    <tr>\
      <td></td>\
      <td colspan="4"><div id="gp[#]leftThumb" class="AxisVisualizer"><div id="val"></div></div></td>\
      <td colspan="4"><div id="gp[#]rightThumb" class="AxisVisualizer"><div id="val"></div></div></td>\
    </tr>\
  </table>\
';