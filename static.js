const { bundle } = require('./dist/bundle');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const _ = require('lodash');

try {
  const baseHTML = fs.readFileSync("./dist/index.html").toString();
  const markup = ReactDOMServer.renderToStaticMarkup(React.createElement(bundle.App));

  const cssHTML = _.replace(
    baseHTML,
    "css/resume.min.css",
    "dist/css/resume.min.css");

  const staticHTML = _.replace(
    cssHTML,
    "\<div id=\"app\"\>\</div\>",
    `<div id=\"app\">${markup}</div>`);

  fs.writeFileSync('./index.html', staticHTML);
} catch (e) {
  console.log(e);
}