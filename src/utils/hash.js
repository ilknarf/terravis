// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hash(str) {
  let hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default hash;