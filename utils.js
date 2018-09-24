function debounce(fn, wait = 250, callFirst = true) {
  let timeout;

  return function() {
    let args = arguments;
    if (!wait) return fn(...args);

    let callNow = callFirst && !timeout;
    clearTimeout(timeout);

    timeout = setTimeout(function() {
      timeout = null;
      if (!callNow) return fn(...args);
    }, wait);

    if (callNow) return fn(...args);
  };
}
