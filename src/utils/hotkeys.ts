export function registerHotKey(
  key: string,
  eventName: "keydown" | "keypress" | "keyup",
  callback: (e: KeyboardEvent) => void
) {
  function callbackWrapper(e: KeyboardEvent) {
    if (e.key.toLowerCase() === key.toLowerCase()) {
      callback(e);
    }
  }
  document.addEventListener(eventName, callbackWrapper);
  return () => document.removeEventListener(eventName, callbackWrapper);
}
