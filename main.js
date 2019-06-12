const { app, BrowserWindow, ipcMain } = require("electron");
const { parse_message } = require("./parse_message");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const port_name = "/dev/cu.usbmodem14311";
const port = new SerialPort(port_name, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));

let x = 0;
let y = 0;
let z = 0;

// update x, y, z by data from arduino
parser.on("data", input => {
  try {
    // parse message from arduino
    const [new_x, new_y, new_z] = parse_message(input);
    x = new_x;
    y = new_y;
    z = new_z;
  } catch (e) {
    console.log("ERROR: cannot parse msg from arduino: " + e);
    return;
  }
});

ipcMain.on("synchronous-message", (event, arg) => {
  event.returnValue = [x, y, z];
});

function createWindow() {
  let win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile("static/index.html");
}

app.on("ready", createWindow);
