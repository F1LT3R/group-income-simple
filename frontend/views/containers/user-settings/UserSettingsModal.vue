<template lang='pug'>
modal-base-template(class='has-background' :a11yTitle='L("Settings")')
  .wrapper-container
    tab-wrapper(:title='L("Settings")' :tabNav='settings' @close='$emit("close")')
      tab-item
        user-profile
      tab-item
        tab-placeholder(name='Privacy & Safety')
      tab-item
        tab-placeholder(name='Notifications')
      tab-item
        appearence
      tab-item
        app-logs(@setQueries='handleSetQueries')
      tab-item
        troubleshooting
</template>

<script>
import sbp from '~/shared/sbp.js'
import { SET_MODAL_QUERIES } from '@utils/events.js'
import ModalBaseTemplate from '@components/modal/ModalBaseTemplate.vue'
import TabItem from '@components/tabs/TabItems.vue'
import TabWrapper from '@components/tabs/TabWrapper.vue'
import TabPlaceholder from './Placeholder.vue'
import Appearence from './Appearence.vue'
import AppLogs from './AppLogs.vue'
import Troubleshooting from './Troubleshooting.vue'
import UserProfile from './UserProfile.vue'
import settings from './settings.js'

export default {
  name: 'SettingsWrapper',
  components: {
    ModalBaseTemplate,
    TabWrapper,
    TabItem,
    Appearence,
    AppLogs,
    Troubleshooting,
    UserProfile,
    TabPlaceholder
  },
  data () {
    return settings
  },
  created () {
    sbp('okTurtles.events/emit', SET_MODAL_QUERIES, 'UserSettingsModal', { section: true })
  },
  methods: {
    handleSetQueries (queries) {
      sbp('okTurtles.events/emit', SET_MODAL_QUERIES, 'UserSettingsModal', {
        section: true,
        ...queries
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@assets/style/_variables.scss";

.wrapper-container {
  height: 100%;
  width: 100%;
  opacity: 1;
  background-color: $general_2;
}

.settings-container {
  position: relative;
  margin: 0 26px;
  width: 100%;
  max-width: 38rem;
}
</style>
