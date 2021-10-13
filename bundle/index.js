!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports["neeto-utils"]=n():e["neeto-utils"]=n()}(self,(function(){return function(){"use strict";var __webpack_modules__={141:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Slugify": function() { return /* binding */ Slugify; }\n/* harmony export */ });\nvar Slugify = function Slugify(string) {\n  return string.toString().toLowerCase().replace(/\\s+/g, "-") // Replace spaces with -\n  .replace(/&/g, "-and-") // Replace & with \'and\'\n  .replace(/[^\\w\\-]+/g, "") // Remove all non-word characters\n  .replace(/\\-\\-+/g, "-") // Replace multiple - with single -\n  .replace(/^-+/, "") // Trim - from start of text\n  .replace(/-+$/, ""); // Trim - from end of text\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQxLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZWV0by11dGlscy8uL2xpYi91dGlscy5qcz8zNjQyIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBTbHVnaWZ5ID0gZnVuY3Rpb24gU2x1Z2lmeShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCBcIi1cIikgLy8gUmVwbGFjZSBzcGFjZXMgd2l0aCAtXG4gIC5yZXBsYWNlKC8mL2csIFwiLWFuZC1cIikgLy8gUmVwbGFjZSAmIHdpdGggJ2FuZCdcbiAgLnJlcGxhY2UoL1teXFx3XFwtXSsvZywgXCJcIikgLy8gUmVtb3ZlIGFsbCBub24td29yZCBjaGFyYWN0ZXJzXG4gIC5yZXBsYWNlKC9cXC1cXC0rL2csIFwiLVwiKSAvLyBSZXBsYWNlIG11bHRpcGxlIC0gd2l0aCBzaW5nbGUgLVxuICAucmVwbGFjZSgvXi0rLywgXCJcIikgLy8gVHJpbSAtIGZyb20gc3RhcnQgb2YgdGV4dFxuICAucmVwbGFjZSgvLSskLywgXCJcIik7IC8vIFRyaW0gLSBmcm9tIGVuZCBvZiB0ZXh0XG59O1xuXG5leHBvcnQgeyBTbHVnaWZ5IH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///141\n')}},__webpack_require__={d:function(e,n){for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},o:function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},__webpack_exports__={};return __webpack_modules__[141](0,__webpack_exports__,__webpack_require__),__webpack_exports__}()}));