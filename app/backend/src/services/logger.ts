export function logError(e: Error): void {
  console.error(e);
}

export function logInfo(message: string, data?: Record<string, unknown>): void {
  console.log(`[INFO] ${message}`);

  if (data) {
    console.dir(data, {
      depth: null
    });
  }
}

export default { logError, logInfo };
