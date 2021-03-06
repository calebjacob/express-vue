export default function timer(delay) {
  return new Promise(resolve => {
    window.setTimeout(resolve, delay);
  });
}
