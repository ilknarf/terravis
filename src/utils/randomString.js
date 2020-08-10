function randomString() {
  let bytes = new Int8Array(16);
  window.crypto.getRandomValues(bytes);

  return [...bytes]
    .map(v => Math.abs(v).toString(16).padStart(2, '0')).join('');
}

export default randomString;