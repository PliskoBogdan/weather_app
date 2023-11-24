import { mount } from "@vue/test-utils";
import SidebarMenu from "./SidebarMenu.vue";

describe("SidebarMenu.vue", () => {
  // Check if the component renders correctly
  it("renders correctly", () => {
    const wrapper = mount(SidebarMenu);
    expect(wrapper.exists()).toBe(true);
    const links = wrapper.findAll(".left-drawer .sidebar-link");
    expect(links.length).toBe(2);
  });

  // Check if clicking the close button collapses the drawer
  it("collapses the drawer when close button is clicked", async () => {
    const wrapper = mount(SidebarMenu);
    await wrapper.find(".close").trigger("click");
    expect(wrapper.vm.isCollapsed).toBe(false);
  });

  // Check if EventBus "open" event expands the drawer
  it('expands the drawer when EventBus "open" event is emitted', async () => {
    const wrapper = mount(SidebarMenu);

    // Emit the "open" event on EventBus
    wrapper.vm.$root.$emit("open");
    // Ensure that Vue has processed any resulting asynchronous code
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isCollapsed).toBe(true);
  });

  // Check if clicking the mask collapses the drawer
  it("collapses the drawer when mask is clicked", async () => {
    const wrapper = mount(SidebarMenu);

    wrapper.setData({ isCollapsed: true });
    // Click the drawer mask
    await wrapper.find(".drawer-mask").trigger("click");
    expect(wrapper.vm.isCollapsed).toBe(false);
  });
});
