export async function asyncWithRetry<T>(
  toCall: () => Promise<T>,
  retryCount = 0
): Promise<any> {
  try {
    await delay(retryCount * 1000);
    return await toCall();
  } catch (err) {
    if (retryCount === 5) throw err;
    retryCount++;
    return asyncWithRetry(toCall, retryCount);
  }
}

async function delay(duration = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
