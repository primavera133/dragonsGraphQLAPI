import type { AboutStore, TaxonInfo } from '../_types'

class AboutAPI {
  private store: AboutStore
  private context: unknown

  constructor({ store }: { store: AboutStore }) {
    this.store = store
  }

  initialize(config: { context: unknown }): void {
    this.context = config.context
  }

  aboutGenus(name: string): TaxonInfo | undefined {
    return this.store.genera[name.toLowerCase()]
  }

  aboutFamily(name: string): TaxonInfo | undefined {
    return this.store.families[name.toLowerCase().replace(' ', '_')]
  }
}

export = AboutAPI
