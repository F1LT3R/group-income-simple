<template lang='pug'>
  // Note: .cpr- is from payment-row
  payment-row(:payment='payment')
    template(slot='cellAmount')
      strong {{ withGroupCurrency(payment.amount) }}
      payment-not-received-tooltip(v-if='notReceived' :member='payment.displayName')

    template(slot='cellActions')
      .cpr-date.has-text-1 {{ humanDate(payment.date) }}
      payment-actions-menu
        menu-item(
          tag='button'
          item-id='message'
          icon='info'
          @click='openModal("PaymentDetail", { payment })'
        )
          i18n Payment details

        menu-item(
          tag='button'
          item-id='message'
          icon='times'
          @click='markNotReceived'
        )
          i18n I did not receive this
</template>

<script>
import sbp from '~/shared/sbp.js'
import { mapGetters } from 'vuex'
import PaymentRow from './payment-row/PaymentRow.vue'
import PaymentActionsMenu from './payment-row/PaymentActionsMenu.vue'
import PaymentNotReceivedTooltip from './payment-row/PaymentNotReceivedTooltip.vue'
import { MenuItem } from '@components/menu/index.js'
import { OPEN_MODAL } from '@utils/events.js'
import { PAYMENT_NOT_RECEIVED } from '@model/contracts/payments/index.js'
import { humanDate } from '@utils/time.js'
import L from '@view-utils/translations.js'

// TODO: handle showing PAYMENT_CANCELLED ?

export default {
  name: 'PaymentRowReceived',
  components: {
    MenuItem,
    PaymentActionsMenu,
    PaymentNotReceivedTooltip,
    PaymentRow
  },
  props: {
    payment: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'withGroupCurrency'
    ]),
    notReceived () {
      return this.payment.data.status === PAYMENT_NOT_RECEIVED
    }
  },
  methods: {
    humanDate,
    openModal (name, props) {
      sbp('okTurtles.events/emit', OPEN_MODAL, name, props)
    },
    // TODO: make multiple payments
    async markNotReceived () {
      try {
        if (this.payment.data.status === PAYMENT_NOT_RECEIVED) {
          alert(L('Already marked as not received!'))
          return
        }
        await sbp('gi.actions/group/paymentUpdate', {
          paymentHash: this.payment.hash,
          updatedProperties: {
            status: PAYMENT_NOT_RECEIVED
          }
        }, this.$store.state.currentGroupId)
      } catch (e) {
        console.error(e)
        alert(e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@assets/style/_variables.scss";

</style>
