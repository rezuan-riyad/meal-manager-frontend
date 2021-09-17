function debounce(func, wait) {
  let timeout;
  let x = 0;
  console.log(timeout)
  return function () {
    let context = this, args = arguments;
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}