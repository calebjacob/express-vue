export default function timer(delay: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });
}
