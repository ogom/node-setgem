# setgem

[![Build Status](https://travis-ci.org/ogom/node-setgem.png?branch=master)](https://travis-ci.org/ogom/node-setgem)

setgem is [GR-CITRUS](http://gadget.renesas.com/ja/product/citrus.html) client and GR-CITRUS Command Line Interface.

## Features

* CLI is sub command style.
* Compile mruby and send file.

## Installation

```
$ npm install setgem -g
```

## Usage

### CLI

Invoke interactive configuration.

```
$ setgem init
? Serial Port? /dev/cu.usbmodem1_1
? Baud Rate? 9600
? Data Bits? 8
? Parity? none
? Stop Bits? 1
citrus: 2.08(2016/9/22)f3(256KB)
mruby: 1.2.0
```

#### Write and Running

Write and Running or Execrate.

```
$ setgem write main ./main.rb
$ setgem run main
$ setgem exec main ./main.rb --build
```

### Program

```
var setgem = require('setgem');
var client = setgem.createClient({
  serialport: {
    port: '/dev/cu.usbmodem1_1',
    options: {
      baudRate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1
    }
  }
});

client.citrus.info(function(err, res) {
  console.log(res) # { citrus: '2.08(2016/9/22)f3(256KB)', mruby: '1.2.0' }
});
```

## Tests

```
$ npm test
```

## Licence

* MIT
