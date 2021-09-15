import { types } from 'mobx-state-tree'

export const TestModel = types
  .model({
    name: types.optional(types.string, ''),
    done: types.optional(types.boolean, false),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    name: 'John',
  }))
  .postProcessSnapshot((snapshot) => {
    console.log('snapshot')
    console.log(snapshot)
    return snapshot
  })
  .actions((self) => ({
    setName(newName) {
      console.log('I AM HERE')
      self.name = newName
    },

    toggle() {
      self.done = !self.done
    },
  }))
