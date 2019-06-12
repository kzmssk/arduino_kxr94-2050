# arduino_kxr94-2050

A sketch for reading data from [KXR94-2050](http://akizukidenshi.com/catalog/g/gM-05153/) using Aruduino

## How to start

```bash
npm i
./node_modules/.bin/electron-rebuild
```

## How to start

1. Connect Arduino with kxr94-2050
2. Write code/update code of Arduino.
3. Make sure that `port_name` in `main.js` is the path to serial port of Arduino.
4. Launch GUI by:

```bash
npm run start
```

## Run tests

```bash
npm run test
```
