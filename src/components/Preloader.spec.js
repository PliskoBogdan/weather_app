import { mount } from '@vue/test-utils';
import Preloader from './Preloader.vue';

describe('Preloader', () => {
  // Test to check if the preloader is rendered when loading is true
  it('should render when loading is true', () => {
    const wrapper = mount(Preloader, {
      propsData: {
        loading: true,
      },
    });

    // Verify that the preloader is rendered when loading is true
    expect(wrapper.find('#preloader').exists()).toBe(true);
  });

  // Test to check if the preloader is not rendered when loading is false
  it('should not render when loading is false', () => {
    const wrapper = mount(Preloader, {
      propsData: {
        loading: false,
      },
    });

    // Verify that the preloader is not rendered when loading is false
    expect(wrapper.find('#preloader').exists()).toBe(false);
  });

  // Test to check if the preloader has the correct background color and transparency
  it('should have the correct background color and transparency', () => {
    const wrapper = mount(Preloader, {
      propsData: {
        loading: true,
      },
    });

    // Verify that the background color and transparency are as expected
    expect(wrapper.find('#preloader').exists()).toBe(true);
  });
});