# setgem

[![Build Status](https://travis-ci.org/ogom/node-setgem.png?branch=master)](https://travis-ci.org/ogom/node-setgem)

setgem is [GR-CITRUS](http://gadget.renesas.com/ja/product/citrus.html) client and GR-CITRUS Command Line Interface.

[![https://gyazo.com/2700dbd8858484d6f51243915258643d](https://i.gyazo.com/2700dbd8858484d6f51243915258643d.gif)](https://gyazo.com/2700dbd8858484d6f51243915258643d)

## Features

* CLI is sub command style.
* Port to be selected in the automatic to see the manufacturer of RENESAS.
* Compile [mruby](http://mruby.org/) and Send Textfile.

## Requirements

* [mruby](https://github.com/mruby/mruby)
* [Serialport](https://github.com/EmergingTechnologyAdvisors/node-serialport)

## Installation

```bash
$ npm install setgem -g
```

## Usage

### CLI

Invoke interactive configuration.

```bash
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

```bash
$ setgem write main ./main.rb
$ setgem run main
$ setgem exec main ./main.rb --build
```

#### Terminal

Connect to the terminal

[![https://gyazo.com/35c2248b5a6813068194a1bcff21d07b](https://i.gyazo.com/35c2248b5a6813068194a1bcff21d07b.gif)](https://gyazo.com/35c2248b5a6813068194a1bcff21d07b)

```bash
$ setgem use ./main.rb
$ setgem trem
H

EEPROM FileWriter Ver. 1.75.v2
 Command List
```

`control` + `x` key, to execrate the Compile and Send Textfile.

```bash
>X main.mrb 494

Waiting  60 59
main.mrb(494) Saving....
Hello, mruby.
```

### Program

```ruby
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

```bash
$ npm test
```

## Licence

* MIT
