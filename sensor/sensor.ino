int serial_speed = 9600;
int analog_port_x = 0;
int analog_port_y = 1;
int analog_port_z = 2;
int loop_delay_ms = 100;

void setup() {
  Serial.begin(serial_speed);

}

void print_data(long x, long y, long z) {
  // print x, y, z in console
  Serial.print("x = ");
  Serial.print(x);
  Serial.print(", y = ");
  Serial.print(y);
  Serial.print(", z = ");
  Serial.print(z);
  Serial.print("\n"); // end of line
}

void loop() {
  // init variables
  long x = 0;
  long y = 0;
  long z = 0;

  // read sensor data
  x = analogRead(analog_port_x);
  y = analogRead(analog_port_y);
  z = analogRead(analog_port_z);

  // print data
  print_data(x, y, z);

  // delay for the next loop
  delay(loop_delay_ms);
}
