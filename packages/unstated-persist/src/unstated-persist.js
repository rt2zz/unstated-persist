// @flow

import tickedoff from 'tickedoff'
import { Container } from "unstated";

type PersistConfig = {
  key: string,
  version: number,
  storage: any, // @TODO add storage typing
}

export type PersistStatePartial = {
  _persist_version: number
}

export class PersistContainer<State: Object> extends Container<State> {
  persist: PersistConfig;

  constructor() {
    super();

    const rehydrate = async () => {
      let config = this.persist
      let persistStatePartial = { _persist_version: config.version }
      try {
        let serialState = await config.storage.getItem(config.key);
        if (serialState !== null) {
          let incomingState = JSON.parse(serialState)
          // @NOTE no migrations yet, just clear state. Can be added later with similar api to redux-persist.
          if (incomingState._persist_version !== config.version) {
            if (process.env.NODE_ENV !== 'production') console.log('unstated-persist: state version mismatch, skipping rehydration')
            await this.setState(persistStatePartial)
          } else await this.setState(incomingState) // state versions match, set state as is
        } else {
          await this.setState(persistStatePartial)
        }
      } catch (err) {
        await this.setState(persistStatePartial)
        if (process.env.NODE_ENV !== 'production') console.log("err during rehydate", err);
      } finally {
        // dont start persisting until rehydration is complete
        this.subscribe(() => {
          config.storage.setItem(config.key, JSON.stringify(this.state)).catch((err) => {
            if (process.env.NODE_ENV !== 'production') console.log("unstated-persist: err during store", err);
          })
        });
      }
    };
    
    tickedoff(rehydrate);
  }
}

export const isBootstrapped = (container: Container<*>) => container.state._persist_version !== undefined
