function error(e: Error): void {
  console.error(e);
}

function info(message: string, data: object = {}, localOnly = true): void {
  if (localOnly && window.location.hostname !== 'localhost') {
    return;
  }

  console.log(`[INFO] ${message}`, data);
}

export default { error, info };
