// Import necessary libraries and the component
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import SidebarLink from "./SidebarLink.vue";
const SIcon = {
  template: '<div class="s-icon">Mock Icon</div>',
};

const localVue = createLocalVue();
localVue.component("s-icon", SIcon);
localVue.use(VueRouter);
const router = new VueRouter();

describe("SidebarLink", () => {
  // It renders the component with the provided props
  it("should renders the component with the correct props", () => {
    const to = "/example";
    const icon = "example-icon";

    const wrapper = shallowMount(SidebarLink, {
      localVue,
      router,
      propsData: { to, icon },
    });

    expect(wrapper.props().to).toBe(to);
    expect(wrapper.props().icon).toBe(icon);
  });

  // It correctly computes the isActive property
  it("should computes the isActive property correctly", () => {
    const to = "/example";
    const icon = "example-icon";

    const wrapper = shallowMount(SidebarLink, {
      localVue,
      router,
      propsData: { to, icon },
    });

    // Set a different route path to test isActive
    router.push("/different-path");

    expect(wrapper.vm.isActive).toBe(false);

    // Set the route path to match the 'to' prop
    router.push(to);

    expect(wrapper.vm.isActive).toBe(true);
  });

  // It responds to route changes by updating the isActive class
  it("should updates the isActive class on route changes", async () => {
    const to = "/my-route";
    const icon = "example-icon";

    const wrapper = shallowMount(SidebarLink, {
      localVue,
      router,
      propsData: { to, icon },
    });
    expect(wrapper.classes("active")).toBe(false);

    await router.push(to);
    await wrapper.vm.$nextTick();
    expect(wrapper.classes("active")).toBe(true);
  });
});
