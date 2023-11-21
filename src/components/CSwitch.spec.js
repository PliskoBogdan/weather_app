import { mount } from "@vue/test-utils";
import CSwitch from "./CSwitch.vue";

describe("CSwitch", () => {
  // Test to check the initial state of the component
  it("should have initial state", () => {
    const wrapper = mount(CSwitch, {
      propsData: {
        value: false,
      },
    });

    // Verify that the "value" prop is initially set correctly
    expect(wrapper.props("value")).toBe(false);

    // Verify that the background styles are initially set correctly
    expect(wrapper.find(".toggle-background").classes()).toContain(
      "gray-lighter"
    );

    // Verify that the indicator styles are initially set correctly
    expect(wrapper.find(".toggle-indicator").element.style.transform).toBe(
      "translateX(0)"
    );
  });
});
