import { shallowMount } from '@vue/test-utils'
import AppHamburger from '../../src/components/AppHamburger.vue'

describe('AppHamburger.vue', () => {
  it('emits toggle event when toggle button is pressed', async () => {
    const wrapper = shallowMount(AppHamburger)
    await wrapper.find('[data-test-id="toggle"]').trigger('click')
    expect(wrapper.emitted().toggle).toBeTruthy()
  })
})
