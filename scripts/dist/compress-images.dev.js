"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Compresses every image in src/image so the site stays fast.
 *
 * Runs automatically before each build (see "prebuild" in package.json),
 * so new photos can be dropped in straight from a phone or camera.
 *
 * - Photos: fit inside 1800x1800 (portrait and landscape), EXIF rotation
 *   applied, all metadata (incl. GPS location) stripped, JPEG ~200-450 KB.
 * - Photos saved as PNG are converted to .jpg (the .png is removed).
 * - Logos (any file with "logo" in its name) stay PNG with transparency.
 * - Files that are already optimised are skipped, so running it on every
 *   build never re-compresses (and never degrades) the same photo twice.
 */
var fs = require("fs");

var path = require("path");

var sharp = require("sharp");

var ROOT = path.join(__dirname, "..", "src", "image");
var MAX_SIDE = 1800;
var PHOTO_TARGET = 450 * 1024;
var LOGO_MAX_WIDTH = 600;
var LOGO_TARGET = 150 * 1024;

function walk(dir) {
  var out = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fs.readdirSync(dir, {
      withFileTypes: true
    })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;
      var full = path.join(dir, entry.name);
      if (entry.isDirectory()) out.push.apply(out, _toConsumableArray(walk(full)));else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return out;
}

var kb = function kb(n) {
  return "".concat(Math.round(n / 1024), "KB");
};

var isLogo = function isLogo(file) {
  return /logo/i.test(path.basename(file));
};

function compressPhoto(file) {
  var before, meta, isPng, longest, base, out, _i, _arr, quality, target;

  return regeneratorRuntime.async(function compressPhoto$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          before = fs.statSync(file).size;
          _context.next = 3;
          return regeneratorRuntime.awrap(sharp(file).metadata());

        case 3:
          meta = _context.sent;
          isPng = /\.png$/i.test(file);
          longest = Math.max(meta.width, meta.height);

          if (!(!isPng && before <= PHOTO_TARGET && longest <= MAX_SIDE)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", null);

        case 8:
          base = sharp(fs.readFileSync(file)).rotate().resize({
            width: MAX_SIDE,
            height: MAX_SIDE,
            fit: "inside",
            withoutEnlargement: true
          });
          _i = 0, _arr = [80, 72, 64, 56];

        case 10:
          if (!(_i < _arr.length)) {
            _context.next = 20;
            break;
          }

          quality = _arr[_i];
          _context.next = 14;
          return regeneratorRuntime.awrap(base.clone().jpeg({
            quality: quality,
            mozjpeg: true,
            progressive: true
          }).toBuffer());

        case 14:
          out = _context.sent;

          if (!(out.length <= Math.min(PHOTO_TARGET, before))) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("break", 20);

        case 17:
          _i++;
          _context.next = 10;
          break;

        case 20:
          target = isPng ? file.replace(/\.png$/i, ".jpg") : file;
          fs.writeFileSync(target, out);
          if (target !== file) fs.unlinkSync(file);
          return _context.abrupt("return", {
            file: target,
            before: before,
            after: out.length,
            size: "".concat(meta.width, "x").concat(meta.height),
            renamed: target !== file
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  });
}

function compressLogo(file) {
  var before, meta, out;
  return regeneratorRuntime.async(function compressLogo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          before = fs.statSync(file).size;
          _context2.next = 3;
          return regeneratorRuntime.awrap(sharp(file).metadata());

        case 3:
          meta = _context2.sent;

          if (!(before <= LOGO_TARGET && meta.width <= LOGO_MAX_WIDTH)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", null);

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(sharp(fs.readFileSync(file)).resize({
            width: LOGO_MAX_WIDTH,
            withoutEnlargement: true
          }).png({
            compressionLevel: 9,
            palette: true,
            quality: 90
          }).toBuffer());

        case 8:
          out = _context2.sent;
          fs.writeFileSync(file, out);
          return _context2.abrupt("return", {
            file: file,
            before: before,
            after: out.length,
            size: "".concat(meta.width, "x").concat(meta.height)
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}

(function _callee() {
  var results, failed, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, file, _r2, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, r, saved, renamed, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _r;

  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          results = [];
          failed = 0;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 5;
          _iterator2 = walk(ROOT)[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context3.next = 30;
            break;
          }

          file = _step2.value;
          _context3.prev = 9;

          if (!isLogo(file)) {
            _context3.next = 16;
            break;
          }

          _context3.next = 13;
          return regeneratorRuntime.awrap(compressLogo(file));

        case 13:
          _context3.t0 = _context3.sent;
          _context3.next = 19;
          break;

        case 16:
          _context3.next = 18;
          return regeneratorRuntime.awrap(compressPhoto(file));

        case 18:
          _context3.t0 = _context3.sent;

        case 19:
          _r2 = _context3.t0;
          if (_r2) results.push(_r2);
          _context3.next = 27;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t1 = _context3["catch"](9);
          failed++;
          console.error("\u2717 ".concat(path.relative(ROOT, file), ": ").concat(_context3.t1.message));

        case 27:
          _iteratorNormalCompletion2 = true;
          _context3.next = 7;
          break;

        case 30:
          _context3.next = 36;
          break;

        case 32:
          _context3.prev = 32;
          _context3.t2 = _context3["catch"](5);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t2;

        case 36:
          _context3.prev = 36;
          _context3.prev = 37;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 39:
          _context3.prev = 39;

          if (!_didIteratorError2) {
            _context3.next = 42;
            break;
          }

          throw _iteratorError2;

        case 42:
          return _context3.finish(39);

        case 43:
          return _context3.finish(36);

        case 44:
          if (results.length) {
            _context3.next = 48;
            break;
          }

          console.log("Images: all already optimised.");
          _context3.next = 89;
          break;

        case 48:
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context3.prev = 51;

          for (_iterator3 = results[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            r = _step3.value;
            console.log("\u2713 ".concat(path.relative(ROOT, r.file), ": ").concat(kb(r.before), " -> ").concat(kb(r.after), " (was ").concat(r.size, ")"));
          }

          _context3.next = 59;
          break;

        case 55:
          _context3.prev = 55;
          _context3.t3 = _context3["catch"](51);
          _didIteratorError3 = true;
          _iteratorError3 = _context3.t3;

        case 59:
          _context3.prev = 59;
          _context3.prev = 60;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 62:
          _context3.prev = 62;

          if (!_didIteratorError3) {
            _context3.next = 65;
            break;
          }

          throw _iteratorError3;

        case 65:
          return _context3.finish(62);

        case 66:
          return _context3.finish(59);

        case 67:
          saved = results.reduce(function (s, r) {
            return s + r.before - r.after;
          }, 0);
          console.log("Saved ".concat((saved / 1024 / 1024).toFixed(1), " MB across ").concat(results.length, " file(s)."));
          renamed = results.filter(function (r) {
            return r.renamed && !r.file.includes("".concat(path.sep, "rooms").concat(path.sep));
          });
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context3.prev = 73;

          for (_iterator4 = renamed[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            _r = _step4.value;
            console.warn("! ".concat(path.relative(ROOT, _r.file), " was converted from PNG \u2014 update its import to .jpg"));
          }

          _context3.next = 81;
          break;

        case 77:
          _context3.prev = 77;
          _context3.t4 = _context3["catch"](73);
          _didIteratorError4 = true;
          _iteratorError4 = _context3.t4;

        case 81:
          _context3.prev = 81;
          _context3.prev = 82;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 84:
          _context3.prev = 84;

          if (!_didIteratorError4) {
            _context3.next = 87;
            break;
          }

          throw _iteratorError4;

        case 87:
          return _context3.finish(84);

        case 88:
          return _context3.finish(81);

        case 89:
          if (failed) process.exit(1);

        case 90:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 32, 36, 44], [9, 23], [37,, 39, 43], [51, 55, 59, 67], [60,, 62, 66], [73, 77, 81, 89], [82,, 84, 88]]);
})();