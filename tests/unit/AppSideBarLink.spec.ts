import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import AppSideBarLink from '../../src/components/AppSideBarLink.vue'

describe('AppSideBarLink.vue', () => {
  it('redirects to specified path emitting navigation event when link is pressed', async () => {
    const mockLink = '/some/link'
    const wrapper = shallowMount(AppSideBarLink, {
      props: {
        label: 'label',
        icon: 'icon',
        isOpen: true,
        to: mockLink
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        },
        mocks: {
          $route: {
            fullPath: mockLink
          }
        }
      }
    })
    const linkElement = wrapper.findComponent(RouterLinkStub)
    expect(linkElement.props().to).toBe(mockLink)

    await linkElement.trigger('click')
    expect(wrapper.vm.$route.fullPath).toBe(mockLink)
    expect(wrapper.emitted().navigation).toBeTruthy()
  })
})
