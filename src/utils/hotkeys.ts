export function registerHotKey(
  key: string,
  eventName: "keydown" | "keypress" | "keyup",
  callback: (e: KeyboardEvent) => void,
  contextMatcher: (e: KeyboardEvent) => boolean
) {
  function callbackWrapper(e: KeyboardEvent) {
    if (e.key.toLowerCase() === key.toLowerCase() && contextMatcher(e)) {
      callback(e);
    }
  }
  document.addEventListener(eventName, callbackWrapper);
  return () => document.removeEventListener(eventName, callbackWrapper);
}
