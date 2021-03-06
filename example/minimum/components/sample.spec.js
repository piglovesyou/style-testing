const assert = require('assert');
const {render, renderWithCSS, createContext, computedStyleOf} = require('../../../lib');

describe('sample component', () => {
  let ctx;

  beforeEach(() => {
    ctx && ctx.clean();
  });

  it('Style must be the same as expected', () => {
    const expectedRootElement = render(`
      <div class="sample" style="
        border: 4px pink solid;
        padding: 8px;
        font-weight: bold;
        ">baa</div>
      `, {rootSelector: '.sample'});

    renderWithCSS('<div class="sample">baa</div>',
        ['base/components/sample.compiled.css'], {rootSelector: '.sample'})
    .then((actualRootElement) => {
      assert.deepEqual(computedStyleOf(expectedRootElement),
          computedStyleOf(actualRootElement));
    });
  });

  it('Style must be the same as expected even if you use RenderingContext', () => {
    ctx = createContext({ rootSelector: '.sample' });

    const expectedRootElement = ctx.render(`
    <div class="sample" style="
      border: 4px pink solid;
      padding: 8px;
      font-weight: bold;
      ">baa</div>
      `);

    ctx.renderWithCSS('<div class="sample">baa</div>',
        ['base/components/sample.compiled.css'])
    .then((actualRootElement) => {
      assert.deepEqual(computedStyleOf(expectedRootElement),
          computedStyleOf(actualRootElement));
    });
  });
});

// When you use html2js and supposing there is "sample.spec.html":
// const Path = require('path');
// const base = Path.join(__dirname.slice('/'.length), Path.basename(__filename, '.spec.js'));
// window.__html__[base + '.spec.html']; // will return html string
