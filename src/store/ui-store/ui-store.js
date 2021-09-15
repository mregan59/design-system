import { types, getRoot } from 'mobx-state-tree'
import { withEnvironment } from '../extensions'

export const UIStoreModel = types
  .model('UIStore')
  .props({
    templateMenuState: types.enumeration('TemplateMenuState', ['Closed', 'Edit', 'Add']),
    gridColumnSize: types.enumeration('ColumnSizes', ['XSmall', 'Small', 'Medium', 'Large']),
    sideMenuExpanded: types.boolean,
    highlightedId: types.maybeNull(types.string),
    visibleCampaignTypes: types.array(types.enumeration('CampaignTypes', ['interrupt', 'email'])),
    visibleInterruptDevices: types.array(types.enumeration('Devices', ['desktop', 'mobile', 'app'])),
    slideoutOpen: types.boolean,
    editorView: types.enumeration('ColumnSizes', ['default', 'style', 'json', 'minimized']),
  })
  .preProcessSnapshot((snapshot) => {
    return {
      ...snapshot,
      templateMenuState: 'Closed',
      sideMenuExpanded: false,
      gridColumnSize: 'Small',
      visibleCampaignTypes: ['email', 'interrupt'],
      visibleInterruptDevices: ['desktop'],
      slideoutOpen: false,
      editorView: 'default',
    }
  })
  .extend(withEnvironment)
  .views((self) => ({
    get interruptVisible() {
      return self.visibleCampaignTypes.includes('interrupt')
    },
    get emailVisible() {
      return self.visibleCampaignTypes.includes('email')
    },
  }))
  .actions((self) => ({
    editTemplateMenu: () => {
      self.templateMenuState = 'Edit'
    },
    closeTemplateMenu: () => {
      self.templateMenuState = 'Closed'
    },
    addTemplateMenu: () => {
      self.templateMenuState = 'Add'
    },
    toggleSideMenu: () => {
      self.sideMenuExpanded = !self.sideMenuExpanded
    },
    setGridColumnSize: (size) => {
      self.gridColumnSize = size
    },
    setEditorView: (view) => {
      self.editorView = view
    },
    setHighlightedId: (id) => {
      self.highlightedId = id
    },
    setVisibleCampaignTypes: (values) => {
      self.visibleCampaignTypes = values
    },
    setVisibleInterruptDevices: (values) => {
      self.visibleInterruptDevices = values
    },
    setSlideoutOpen: (open) => {
      //check if selectedCampaign
      const campaignStore = getRoot(self).campaignStore
      if (open && campaignStore.selectedCampaign) {
        self.slideoutOpen = open
      } else if (!open) {
        campaignStore.setSelectedCampaign(null)
        self.slideoutOpen = open
      }
    },
  }))

export const createUIStoreDefaultModel = () => types.optional(UIStoreModel, {})
