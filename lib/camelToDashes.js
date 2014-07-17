module.exports = function(str) {
 return str.replace(/([A-Z])/g, function($1){return '-'+$1.toLowerCase();});
};
