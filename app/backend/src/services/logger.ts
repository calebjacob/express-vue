function error(e: Error): void {
  console.error(e);
}

function info(message: string, data?: Record<string, unknown>): void {
  console.log(`[INFO] ${message}`);

  if (data) {
    console.dir(data, {
      depth: null
    });
  }
}

export default { error, info };
