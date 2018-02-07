#!/usr/bin/env node

'use strict';

console.info(`start...`);
// const rpio = require('rpio');
const i2cBus = require('i2c-bus');

let wire = i2cBus.openSync(1);



const DATA_START = 0x10;
const DATA_END = 0x20;

const DATA_RED = 0x00;
const DATA_GREEN = 0x01;
const DATA_BLUE = 0x02;

const colors = [DATA_RED, DATA_GREEN, DATA_BLUE];

// while (true) {
//   run();
// }




// process.exit();
function run() {
  console.info(`'run'`);
  let pages = generatePages();
  pages.forEach((page, color) => {
    console.info(`Reading page ${color}`/*, page, page.length*/);
  
    let txBuffer = Buffer.from(page);
    // console.info(txBuffer.toString('hex'));
    console.info(color);
    let writeStatus = wire.i2cWriteSync(0x20, txBuffer.length, txBuffer);
  
    console.info(`write statusf`, writeStatus);
  });
}

/** 
 * We send each color in a seperate message
 * The message is made up of 
 * start byte + colour + 64 pixel data + end byte
 */


setInterval(run, Number.POSITIVE_INFINITY);

console.info(`...stop`);
// process.exit(`bye`);
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
