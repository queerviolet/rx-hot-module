# RxHotModule

When in the presence of Hot Module Replacement, export an Observable.

# Example

```js
// hot.js
import rxHot from './rxhot'

export default rxHot (module) ('hello world')
```

```js
// entry.js
import hot from './hot'

if (typeof hot.subscribe === 'function') {
  // Module is hot
  hot
    .map(phrase => phrase.length)
    .subscribe(console.log)
} else {
  console.log(hot.length)
}
```

If HMR is disabled, `rxHot` returns the data object by default. To change
this behavior and always return an Observable, pass the `{alwaysRx: true}`
to `rxHot`


```js
// hot.js
import rxHot from './rxhot'

export default rxHot (module, {alwaysRx: true}) ('hello world')
```

```js
// entry.js
import hot from './hot'

// Module is always Observable
hot
  .map(phrase => phrase.length)
  .subscribe(console.log)
```