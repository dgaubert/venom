# Venom

Simple way to add DI to your javascript projects.

## Installation

On project path:

```
npm install venom
```

## Examples

Node projects:

```js
var venom = require('venom');

bla, bla, ...

```

Browser:

```js
<script type="text/javascript" src="venom.min.js"></script>
<script type="text/javascript">
  venom.add('dependency', dependency);

  bla, bla, ..
</script>
```

To view a full guide, take a look: [guide.md](https://github.com/dgaubert/venom/blob/master/docs/guide.md)

## Contributions

Do you want to contribute?. Please, follow the below suggestions:
  - To add features, `pull requests` to `develop` branch.
  - To fix bugs in release version, `pull request` both `master` and `develop` branches.
  - Be consistent with style and design decisions.
  - Cover your implementation with tests, add it under `test/*-test.js`.

## Change history

To view change history, please visit: [history.md](https://github.com/dgaubert/venom/blob/master/docs/hystory.md)

Versioning strategy:

  - The major version will increase for any backward-incompatible changes.
  - The minor version will increase for added features.
  - The patch version will increase for bug-fixes.

## License

To view the MIT license, please visit: [The MIT License (MIT)](https://github.com/dgaubert/venom/blob/master/LICENSE)
