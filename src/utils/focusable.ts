const textInputRegex = /^(?:input|select|textarea)$/i;

function isHTMLElement(element: any): element is HTMLElement {
  return !!element.nodeName;
}

export function isTextInput(element: HTMLElement | EventTarget) {
  return isHTMLElement(element) && textInputRegex.test(element.nodeName);
}
