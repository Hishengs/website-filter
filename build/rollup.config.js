import path from 'path';

export default {
  input: path.resolve(__dirname, '../src/content_script.js'),
  output: {
    file: path.resolve(__dirname, '../dist/content_script.js'),
    format: 'iife',
  }
};