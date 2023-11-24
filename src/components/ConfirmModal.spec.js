import { mount, shallowMount } from "@vue/test-utils";
import ConfirmModal from "@/components/ConfirmModal.vue";

describe("ConfirmModal", () => {
  it("should render the modal content", async () => {
    const wrapper = mount(ConfirmModal, {
      mocks: { $t: () => {} },
      data() {
        return { isOpen: true };
      },
    });
    expect(wrapper.find(".modal-content").exists()).toBe(true);
  });
  it("should don't render anythink", async () => {
    const wrapper = mount(ConfirmModal, {
      mocks: { $t: () => {} },
      data() {
        return { isOpen: false };
      },
    });

    expect(wrapper.find(".modal-content").exists()).toBe(false);
  })
  it("should display the confirmation message", async () => {
    const message = "Are you sure you want to do this?";
    const wrapper = shallowMount(ConfirmModal, {
      data() {
        return { isOpen: true, message };
      },
      mocks: { $t: () => {} },
    });

    expect(wrapper.find(".modal-text").text()).toBe(message);
  });

  it("should emit a 'confirm' event when the 'Yes' button is clicked", async () => {
    const wrapper = mount(ConfirmModal, {
      mocks: { $t: (val) => val },
      data() {
        return { isOpen: true };
      },
    });
    const yesButton = wrapper.findAll(".CButton").at(0);
    yesButton.trigger("click");
    expect(wrapper.emitted().confirm).toBeTruthy();
    expect(wrapper.emitted().confirm[0]).toEqual([true]);
  });

  it("should emit a 'cancel' event when the 'Cancel' button is clicked", () => {
    const wrapper = mount(ConfirmModal, {
      mocks: { $t: (val) => val },
      data() {
        return { isOpen: true };
      },
    });
    const cancelButton = wrapper.find(".CButton:last-child");
    cancelButton.trigger("click");
    expect(wrapper.emitted().confirm).toBeTruthy();
    expect(wrapper.emitted().confirm[0]).toEqual([false]);
  });
});
