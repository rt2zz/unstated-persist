// @flow

// @NOTE this component is just a conveinence, child can easily just check `if (![containersICareAbout].every(isBootstrapped)) ...`
import React from 'react'
import { Subscribe } from 'unstated'
import { isBootstrapped } from 'unstated-persist'

type SubscribeProps = {
  loading: React.ReactNode,
  to: Array<ContainerType<any>>,
  children(...instances: Array<Container<any>>): React.ReactNode,
}
export default function SubscribeGate(props: SubscribeProps): React.ReactNode {
  return (
    <Subscribe {...props}>
      {(...args) => {
        if (
          !this.bootstrapped &&
          args.every(isBootstrapped)
        )
          this.bootstrapped = true;
        if (this.bootstrapped) return props.children(...args);
        else return props.loading || null;
      }}
    </Subscribe>
  );
}
