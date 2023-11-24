import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";
import Vuex from "vuex";
import LanguageSwitcher from "./LocaleSwitch.vue";
import { locales } from "@/vars";

const localVue = createLocalVue();

// Use Vuex and VueI18n plugins
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({});
i18n.changeLocale = jest.fn();
i18n.locale = locales[0];

describe("LanguageSwitcher.vue", () => {
  let actions;
  let getters;
  let mutations;
  let store;

  beforeEach(() => {
    actions = {
      getUserLocationWeather: jest.fn(),
    };

    mutations = {
      ADD_LOADING_PROCESS: jest.fn(),
      CANCEL_LOADING_PROCESS: jest.fn(),
    };

    getters = {
      model: () => ({ a: 1 }),
    };

    store = new Vuex.Store({
      actions,
      mutations,
      getters,
    });
  });

  it("should renders correctly", async () => {
    const wrapper = mount(LanguageSwitcher, {
      localVue,
      i18n,
      store,
    });


    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);

    // Assert that the activator content is correct
    expect(wrapper.find(".header-lang__switch-activator").text()).toBe(
      wrapper.vm.$i18n.locale
    );

    // Assert that the menu items are rendered based on locales
    const menuItems = wrapper.findAll(".header-lang__switch-lang");
    expect(menuItems.length).toBe(wrapper.vm.locales.length);
    for (let i = 0; i < wrapper.vm.locales.length; i++) {
      expect(menuItems.at(i).text()).toBe(wrapper.vm.locales[i]);
    }
  });

  // Check if clicking on a language item triggers changeLocale method
  it("shoukd triggers changeLocale method on language item click", async () => {
    const wrapper = shallowMount(LanguageSwitcher, { localVue, i18n, store });

    // Spy on the changeLocale method
    const changeLocaleSpy = jest.spyOn(wrapper.vm, "changeLocale");

    // Click on the first language item
    await wrapper.findAll(".header-lang__switch-lang").at(0).trigger("click");

    expect(changeLocaleSpy).toHaveBeenCalledWith(wrapper.vm.locales[0]);
  });

  // Test Case 3: Check if changeLocale updates i18n locale and triggers Vuex action
  it("updates i18n locale and triggers Vuex action when changeLocale is called", async () => {
    const wrapper = shallowMount(LanguageSwitcher, {
      localVue,
      i18n,
      store,
    });

    const button = wrapper.findAll(".header-lang__switch-lang").at(0);
    button.trigger("click");
    expect(mutations.ADD_LOADING_PROCESS).toHaveBeenCalled();
    expect(i18n.changeLocale).toHaveBeenCalledWith(locales[0]);
    expect(actions.getUserLocationWeather).toHaveBeenCalledWith(
      expect.anything(),
      { a: 1 }
    );
    await wrapper.vm.$nextTick();
    expect(mutations.CANCEL_LOADING_PROCESS).toHaveBeenCalled();
  });
});
