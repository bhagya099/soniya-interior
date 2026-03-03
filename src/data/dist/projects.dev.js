"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _img = _interopRequireDefault(require("../image/img"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var projects = [{
  id: 1,
  title: "Modern Living Room",
  description: "A bright modern living room with neutral palette and layered textures.",
  image: _img["default"].Project_pics[0],
  category: "Residential"
}, {
  id: 2,
  title: "Elegant Dining Space",
  description: "Custom joinery and ambient lighting to elevate dining experiences.",
  image: _img["default"].Project_pics[1],
  category: "Residential"
}, {
  id: 3,
  title: "Compact Kitchen Remodel",
  description: "Functional layout and durable finishes for small-footprint kitchens.",
  image: _img["default"].Project_pics[2],
  category: "Residential"
}, {
  id: 4,
  title: "Office Interior",
  description: "Collaborative office with flexible seating and natural light.",
  image: _img["default"].Project_pics[3],
  category: "Commercial"
}, {
  id: 5,
  title: "Bathroom Update",
  description: "Spa-like bathroom with clean lines and modern fixtures.",
  image: _img["default"].Project_pics[4],
  category: "Residential"
}, {
  id: 6,
  title: "Bedroom Retreat",
  description: "A calm, layered bedroom with soft textiles and warm tones.",
  image: _img["default"].Project_pics[5],
  category: "Residential"
}];
var _default = projects;
exports["default"] = _default;