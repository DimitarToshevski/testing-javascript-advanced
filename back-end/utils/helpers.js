// Shamelessly stolen from here - https://gist.github.com/gordonbrander/2230317
function generateId() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

module.exports = {
  generateId
};
