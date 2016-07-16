const defaultOptions = {
  rootSelector: 'div',
  viewportWidth: undefined,
  viewportHeight: undefined,
};

export default class RenderingContext {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.frames = [];
  }

  render(htmlOrElement) {
    const [frame, element] = _render(htmlOrElement, this.options);
    this.frames.push(frame);
    return element;
  }

  async renderWithCSS(htmlOrElement, stylesheets) {
    const [frame, element] = await _renderWithCSS(htmlOrElement, stylesheets, this.options);
    this.frames.push(frame);
    return element;
  }

  clean() {
    const {frames} = this;
    this.frames = [];
    for (let f of frames) {
      f.parentNode.removeChild(f);
    }
  }
}

export function createContext(options) {
  return new RenderingContext(options);
}

export function computedStyleOf(element) {
  return computedStyleOf(element);
}

export function render(htmlOrElement, options) {
  const [_, element] = _render(htmlOrElement, options);
  return element;
}

export async function renderWithCSS(htmlOrElement, stylesheets, options) {
  const [_, element] = await _renderWithCSS(htmlOrElement, stylesheets, options);
  return element;
}

function _render(htmlOrElement, options) {
  options = Object.assign({}, defaultOptions, options);
  const frame = renderAndGetFrame(htmlOrElement, options);
  return [frame, frame.contentDocument.querySelector(options.rootSelector)];
}

async function _renderWithCSS(htmlOrElement, stylesheets, options) {
  options = Object.assign({}, defaultOptions, options);
  const frame = renderAndGetFrame(htmlOrElement, options);
  appendStylesheets(frame, stylesheets);
  await waitForCSSLoad(frame.contentDocument);
  return [frame, frame.contentDocument.querySelector(options.rootSelector)]
}


function appendStylesheets(frame, stylesheets) {
  for (let s of stylesheets) {
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = s;
    frame.contentDocument.head.appendChild(linkEl);
  }
}

function renderAndGetFrame(htmlOrElement, options) {
  const frame = createFrame(options);
  if (typeof htmlOrElement === 'string') {
    frame.contentDocument.body.innerHTML = htmlOrElement;
  } else if (htmlOrElement.nodeType === 1) {
    frame.contentDocument.body.appendChild(htmlOrElement);
  } else {
    throw new Error();
  }
  return frame;
}

function createFrame(options) {
  const {viewportWidth, viewportHeight} = options;
  const frame = document.createElement('iframe');
  if (typeof viewportWidth === 'number') {
    frame.style.width = viewportWidth + 'px';
  }
  if (typeof viewportHeight === 'number') {
    frame.style.height = viewportHeight + 'px';
  }
  window.document.body.appendChild(frame);
  return frame;
}

function computedStyleOf(element) {
  return element.ownerDocument.defaultView.getComputedStyle(element);
}

function waitForCSSLoad(element) {
  const doc = element.ownerDocument || (element.defaultView ? element : null);
  if (!doc) throw new Error('Invalid element was passed');
  const len = doc.querySelectorAll('link[rel="stylesheet"]').length;
  return new Promise((resolve, reject) => {
    let intervalTimer = setInterval(check, 40);
    let timeoutTimer = setTimeout(timeout, 1000);
    if (check()) return;
    function check() {
      if (doc.styleSheets.length >= len) {
        clearTimer();
        resolve(element);
        return true;
      }
    }
    function timeout() {
      clearTimer();
      reject(new Error('Stylesheet load timeout'));
    }
    function clearTimer() {
      clearInterval(intervalTimer);
      clearTimeout(timeoutTimer);
    }
  });
}
