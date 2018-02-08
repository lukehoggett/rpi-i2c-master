'use strict';

console.info(`start...`);
const rpio = require('rpio');

const DATA_START = 0x10;
const DATA_END = 0x20;

const DATA_RED = 0x00;
const DATA_GREEN = 0x01;
const DATA_BLUE = 0x02;

const colors = [DATA_RED, DATA_GREEN, DATA_BLUE];

const ADDRESS_1 = 0x20;
const BAUD_RATE = 100000;

rpio.i2cBegin();
rpio.i2cSetSlaveAddress(ADDRESS_1);
rpio.i2cSetBaudRate(BAUD_RATE);    /* 100kHz */

function run() {
  let pages = generatePages();
  pages.forEach((page, color) => {
    console.info(`Writing page ${color}`/*, page, page.length*/);
    
    let txBuffer = Buffer.from(page);
    // console.info(txBuffer.toString('hex'));
    let writeStatus = rpio.i2cWrite(txBuffer, txBuffer.length);
    console.info(`write status`, writeStatus);
    
    // let rxSize = 32;
    // let rxBuffer = Buffer.alloc(rxSize);
    // let readStatus = rpio.i2cRead(rxBuffer);
    // console.info(`readStatus`, readStatus, rxBuffer);
    
  });
}
// rpio.i2cEnd();
/** 
 * We send each color in a seperate message
 * The message is made up of 
 * start byte + colour + 64 pixel data + end byte
 */

run();
// setInterval(run, Number.POSITIVE_INFINITY);
console.info(`...stop`);

// let txData = [0x10, 0x00, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x20];
// let txData = [0x10, 0x30, 0x20];
// let txData = "some string";
// let txData = new String('this is a test');
// let txData = [0x03, 0x03, 0x03, 0x02, 0x28, 0x0c, 0x01, 0x06];
// let txData = [0x62, 0x75, 0x66, 0x66, 0x65, 0x72];
// console.info(`length of data ${txData.length}`);
// const txbuf = Buffer.from(txData);
// console.info(`Buffer length ${txbuf.length}, ${txbuf}`);
// // let txbuf = new Buffer(["hello"]);
// 
// rpio.i2cWrite(txbuf);           /* Sends 4 bytes */


// need to generate a random number between 0 and 255
function randomPrimaryColor() {
  return Math.floor(Math.random() * 256);
  // return Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
}

function generatePages() {
  let data = [];
  colors.forEach((color, key) => {
    // console.info(color, key);
    data[color] = [];
    for (var i = 0; i < 64; i++) {
      let pixel = randomPrimaryColor();
      data[color].push(pixel);
    }
    data[color].unshift(color);
    data[color].unshift(DATA_START);
    data[color].push(DATA_END);
    // console.info(data, data.length);
    
  });
  
  return data;
}
