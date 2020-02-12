// In order to use the functions below, need to require this module using:
// const date = require(__dirname + "/date.js");

// exports this function so this function can be used outside of this file.
exports.getDate = function() {
  const date = new Date();    // JavaScript date object.
  const options = {   // Format the date.
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return date.toLocaleDateString("en-US", options);
}

// exports this function so this function can be used outside of this file.
exports.getDay = function() {
  const date = new Date();    // JavaScript date object.
  const options = {   // Format the date.
    weekday: "long",
  };
  return date.toLocaleDateString("en-US", options);
}
  
