import {Observable} from 'rxjs/Observable'

export default function rxHot(module, {alwaysRx=false}={}) {
  if (module.hot) {
    return self => {
      const {data = {}} = module.hot
          , {
            observers = [],
            update = self => {
              // Emit a new version of ourselves to all observers.
              const {length} = observers
              for (let i = 0; i != length; ++i)
                observers[i].next(self)
            },
            observable = Observable.create(obs => {
              observers.push(obs)
              obs.next(self)
            })
          } = data
      
      module.hot.dispose(data => {
        Object.assign(data, {update, observable, observers})
      })

      module.hot.accept(console.error)

      update(self)
      
      return observable
    }
  }

  return always ? self => Observable.of(self) : self => self
}
