# @monolithed/sri

[![Build Status](https://travis-ci.org/monolithed/sri.png)](https://travis-ci.org/monolithed/sri)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)


A [Subresource Integrity (SRI)](https://w3c.github.io/webappsec-subresource-integrity/#toc) generator.

## Installation

Install with npm or Yarn:

**npm**:

```
npm install @monolithed/sri --save
```

**Yarn**:

```
yarn add @monolithed/sri
```

## Synopsis

```ts
generate(file: string, {algorithm: string}): Promise<string>;
```

## Basic usage

```typescript
import {generate} from '@monolithed/sri';

generate('file.js')
    .then((integrity) => {
            // sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==
    })
    .catch((error) => {
        console.error(error);
    });
```

Weak signature algorithms like 'md5', 'sha1' or 'des' are not allowed.

## API

### algorithm

Response verification algorithms:

```typescript
import {generate} from '@monolithed/sri';

await generate('file.js', {algorithm: 'sha256'})
// sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=
```

## Contributing
   
Feel free to submit a pull request if you find any bugs. 
Please make sure all commits are properly documented.

## Tests

```
npm test
```

## Publishing

```
npm publish --access public --verbose
```

## License

MIT
