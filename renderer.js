const { ipcRenderer } = require("electron");
paper.install(window);

const x_min = 200;
const x_max = 400;

function convert_x2hue(x) {
  // cap x
  let y = Math.max(Math.min(x_max, x), x_min);

  // normalize into [0, 360]
  y = (y - x_min) / (x_max - x_min); // [0, 1]
  y *= 360; // [0, 360]
  return y;
}

window.onload = () => {
  paper.setup("my_canvas");

  const radius = 10;
  const font_size = 20;
  const x_offset = 20;
  const y_offset = 20;

  let x_circle = new Path.Circle({
    center: [x_offset, 0 + y_offset],
    radius: radius,
    fillColor: "red"
  });

  let x_text = new PointText({
    point: [x_offset * 2, 0 + y_offset],
    fontSize: font_size,
    fillColor: "black"
  });

  let y_circle = new Path.Circle({
    center: [x_offset, 40 + y_offset],
    radius: radius,
    fillColor: "blue"
  });

  let y_text = new PointText({
    point: [x_offset * 2, 40 + y_offset],
    fontSize: font_size,
    fillColor: "black"
  });

  let z_circle = new Path.Circle({
    center: [x_offset, 80 + y_offset],
    radius: radius,
    fillColor: "red"
  });

  let z_text = new PointText({
    point: [x_offset * 2, 80 + y_offset],
    fontSize: font_size,
    fillColor: "black"
  });

  view.onFrame = event => {
    // get sensor data from main process
    const [x, y, z] = ipcRenderer.sendSync("synchronous-message", "get_hue");

    // update content of paper.js
    const h_x = convert_x2hue(x);
    x_circle.fillColor.hue = h_x;
    x_text.content = "x = " + x + ", hue = " + h_x;

    const h_y = convert_x2hue(y);
    y_circle.fillColor.hue = h_y;
    y_text.content = "y = " + y + ", hue = " + h_y;

    const h_z = convert_x2hue(z);
    z_circle.fillColor.hue = h_z;
    z_text.content = "z = " + z + ", hue = " + h_z;
  };
};
