// @flow
// @NOTE tests nothing right now

import { Container } from "unstated";
import { proxyContainer } from '../src/unstated-action-proxy'

type State = {
  detailMode: boolean,
}
class PortfolioBase extends Container<State> {
  actions = {
    enterDetailMode: () => {
      this.setState({ detailMode: true })
    }
  }
}

let p = new PortfolioBase()

let d: typeof PortfolioBase.actions = p.actions
console.log(d)

export default proxyContainer(PortfolioBase)

export function withContainer (containerMap) {
  return (Inner) => (
    <Subscribe to={Object.values(containerMap)}>{(...containers) => <Inner />}
  )
}