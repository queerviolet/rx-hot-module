import 'rxjs/add/operator/scan'

import hot from './hot'

console.log('in entry point')
console.log('hot=', hot)
hot.subscribe(console.log)
window.xxx = hot
