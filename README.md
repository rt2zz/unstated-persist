## Unstated Persist

unstated container w/ persistence

### Usage
Usage is simple, replace Container with PersistContainer and add persist config as a class property
```js
import { PersistContainer } from 'unstated-persist'
import localForage from 'localforage'

type CounterState = {
  count: number
};

class CounterContainer extends PersistContainer<CounterState> {
  persist = {
    key: 'counter',
    version: 1,
    storage: localForage,
  }
 // ...
}
```

### FAQ
#### Class inheritance are you crazy?
Well it works, and [its tiny and simple](https://github.com/rt2zz/unstated-persist/blob/master/packages/unstated-persist/src/unstated-persist.js). Risk of inheritance collision / confusion is minimal in this case.

#### Migrations
In the future we will add redux-persist like migrations / transforms. For now, changing persist version will simply clobber stored state. 

#### PersistGate
An example of how PersistGate might be implemented [lives here](https://github.com/rt2zz/unstated-persist/tree/master/packages/unstated-persist-gate). However it is so simple, I expect in most cases components will their own gating. Something like:
```js
import { Subscribe } from 'unstated'
import { isBootstrapped } from 'unstated-persist'

//...

<Subscribe to={[containers]}>
  {(...containers) => {
    if (!containers.every(isBootstrapped)) return <Loading />
    return <App />
  }}
</Subscribe>
```