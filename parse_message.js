var assert = require("assert");

function parse_number(msg) {
  const s = msg.split("=");
  assert(s.length, 2);
  let res = s[1];
  return Number(res);
}

function parse_message(msg) {
  // parse string message like "x = 255, y = 258, z = 358"
  const s = msg.split(",");
  assert(s.length, 3);
  const x = parse_number(s[0]);
  const y = parse_number(s[1]);
  const z = parse_number(s[2]);
  return [x, y, z];
}

module.exports.parse_message = parse_message;
