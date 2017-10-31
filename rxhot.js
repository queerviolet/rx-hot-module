import {Observable} from 'rxjs/Observable'

export default function rxHot(module, {alwaysRx=false}={}) {
  if (module.hot) {
    return self => {
      const {data = {}} = module.hot
          , {observers = [], version = 0} = data

      module.hot.dispose(data => {
        Object.assign(data, {observers, version: version + 1})
      })

      module.hot.accept(console.error)

      // Emit a new version of ourselves to all observers.
      const {length} = observers
      for (let i = 0; i != length; ++i)
        observers[i].next(self)
            
      return Observable.create(obs => {
        observers.push(obs)
        obs.next(self)
      })
    }
  }

  return always ? self => Observable.of(self) : self => self
}
