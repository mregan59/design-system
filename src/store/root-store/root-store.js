import { Instance, SnapshotOut, types } from 'mobx-state-tree'
//import { CampaignStoreModel } from '../campaign-store'
import { TestModel } from '../Test'
import { UIStoreModel } from '../ui-store'
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model('RootStore').props({
    test: TestModel,
    uiStore: UIStoreModel,
    // exampleStore: QuestionStoreModel,
})

/**
 * The RootStore instance.
 */
//export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
//export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
