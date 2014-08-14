
module.exports = function(attrVal){
  var suggestion,
      error = false,
      TRACK_REGEXP = /track\s+by\s+\S*/,
      FILTER_REGEXP = /filter\s*:\s*\w+(?:\.\w+)*/;
  var trackMatch = attrVal.match(TRACK_REGEXP);
  var filterMatch = attrVal.match(FILTER_REGEXP);
  var breakIndex = attrVal.indexOf('|') > -1 ? attrVal.indexOf('|') : Infinity;

  if(!trackMatch && filterMatch && breakIndex === Infinity) {
    return 'Try: " | '+filterMatch[0]+'"';
  }

  if(trackMatch && filterMatch) {
    var trackInd = attrVal.indexOf(trackMatch[0]);
    var filterInd = attrVal.indexOf(filterMatch[0]);
    if(!(breakIndex < filterInd && filterInd < trackInd)) {
      return 'Try: " | '+filterMatch[0]+' '+trackMatch[0]+'"';
    }
  }
}