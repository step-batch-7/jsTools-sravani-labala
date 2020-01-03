'use strict';

class StreamPicker {
  constructor(stdin, createReadStream) {
    this.createReadStream = createReadStream;
    this.stdin = stdin;
  }
  pick(fileName) {
    return fileName ? this.createReadStream(fileName) : this.stdin;
  }
}

module.exports = StreamPicker;
