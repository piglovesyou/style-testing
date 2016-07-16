const assert = require('assert');
const StyleTest = require('../../..');
const {computedStyleOf} = StyleTest;

describe('sample component', () => {
  let ctx;

  beforeEach(() => {
    ctx && ctx.clean();
  });

  it('Style of .spec.html must be the same as one using external stylesheet', async () => {
    ctx = StyleTest.createContext({ rootSelector: '.sample' });

    const expectedRootElement = ctx.render(`
    <div class="sample" style="
      border: 4px pink solid;
      padding: 8px;
      font-weight: bold;
      ">baa</div>
      `);

    const actualRootElement = await ctx.renderWithCSS(
        '<div class="sample">baa</div>', ['base/components/sample.compiled.css']);

    assert.deepEqual(computedStyleOf(expectedRootElement),
        computedStyleOf(actualRootElement));
  });
});

// When you use html2js and supposing there is "sample.spec.html":
// const Path = require('path');
// const base = Path.join(__dirname.slice('/'.length), Path.basename(__filename, '.spec.js'));
// window.__html__[base + '.spec.html']; // will return html string
