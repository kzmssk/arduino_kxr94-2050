var assert = require("assert");
var parse_message = require("../parse_message");

describe("test parse_message", () => {
  it("can parse message", () => {
    const [x, y, z] = parse_message.parse_message(
      "x = 255.1, y = 258.0, z = 358"
    );
    assert.equal(x, 255.1);
    assert.equal(y, 258.0);
    assert.equal(z, 358);
  });

  it("can parse message with spaces", () => {
    const [x, y, z] = parse_message.parse_message(
      "  x  =  255.1 ,  y  =  258.0 ,    z = 358   "
    );
    assert.equal(x, 255.1);
    assert.equal(y, 258.0);
    assert.equal(z, 358);
  });

  it("can parse message with negative value expressions", () => {
    const [x, y, z] = parse_message.parse_message(
      "x = -255.1, y = -258.0, z = -358"
    );
    assert.equal(x, -255.1);
    assert.equal(y, -258.0);
    assert.equal(z, -358);
  });
});
