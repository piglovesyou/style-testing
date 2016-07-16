class RenderingContext {
  constructor(options) {
    this.options = Object.assign({
      rootSelector: 'div',
      viewportWidth: undefined,
      viewportHeight: undefined,
    }, options);
    this.frames = [];
  }

  render(htmlOrElement) {
    const frame = renderAndGetFrame.call(this, htmlOrElement);
    return frame.contentDocument.querySelector(this.options.rootSelector);
  }

  async renderWithCSS(htmlOrElement, stylesheets) {
    const frame = renderAndGetFrame.call(this, htmlOrElement);
    for (let s of stylesheets) {
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = s;
      frame.contentDocument.head.appendChild(linkEl);
    }
    await waitForCSSLoad(frame.contentDocument);
    return frame.contentDocument.querySelector(this.options.rootSelector);
  }

  promiseStyles(...elements) {
    return Promise.all(elements.map(waitForCSSLoad))
      .then(elements => elements.map(computedStyleOf));
  }

  clean() {
    const {frames} = this;
    this.frames = [];
    for (let f of frames) {
      f.parentNode.removeChild(f);
    }
  }

  static createContext(options) {
    return new RenderingContext(options);
  }

  static computedStyleOf(element) {
    return computedStyleOf(element);
  }
}

module.exports = RenderingContext;

function renderAndGetFrame(htmlOrElement) {
  const frame = createFrame(this.options);
  this.frames.push(frame);
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
