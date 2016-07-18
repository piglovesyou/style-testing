# Style Testing

Style testing utilities with using `getComputedStyle`

## Concept

Style testing is still controvercial in 2016. How do we acheive that? Is Comparison of screen captures worth while? Do we have to do it in the first place? Yes, it's always better idea than doing nothing. Because, as long as your components depend on shared css file or accept style customising, they can always get affected in bad way. So let's start with `style-testing` using simple `getComputedStyle` and compare inline-style rendered and CSS-or-JS rendered DOMs.

## Install

```
$ npm install --save-dev style-testing
```

## API

For now [please see here](https://github.com/piglovesyou/style-testing/blob/master/example/minimum/components/sample.spec.js#L2).

## Try it out

```
$ git clone git@github.com:piglovesyou/style-testing.git
$ npm install
$ cd example/minimum
$ npm install
$ npm test
```

## License

MIT
