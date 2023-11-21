import { mount } from '@vue/test-utils';
import SimpleMenu from './CMenu.vue';

describe('SimpleMenu', () => {
  it('should have initial state', () => {
    const wrapper = mount(SimpleMenu, { slots: { default: '' } });
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('should toggle menu on click', async () => {
    const wrapper = mount(SimpleMenu);

    expect(wrapper.vm.isOpen).toBe(false);

    await wrapper.find('.pointer').trigger('click');

    expect(wrapper.vm.isOpen).toBe(true);

    await wrapper.find('.pointer').trigger('click');

    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('should close menu on item click', async () => {
    const wrapper = mount(SimpleMenu, { slots: { default: '<li class="menu-item">Menu item</li>' } });

    wrapper.setData({ isOpen: true });
    const listItem = wrapper.find('.menu-item');
    expect(listItem.exists()).toBe(true);
    await listItem.trigger('click');
    expect(wrapper.vm.isOpen).toBe(false);
  });
});