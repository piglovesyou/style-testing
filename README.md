# Style Testing

Style testing utilities with using `getComputedStyle`

## Concept

Style is one of the most vulnerable feature in the Web context, even if it's 2016 or you introduce the idea of CSS Modules or something. As long as your component depents on shared css file or accepts style customising, it can always get affected in bad way. So why don't you test it? If it's easy, every one can start style testing.

## Install

```
$ npm install --save-dev style-testing
```

# Try it out

```
$ git clone git@github.com:piglovesyou/style-testing.git
$ cd example/minimum
$ npm install
$ npm test
```

## License

MIT
