import { mount } from "@vue/test-utils";
import TruncatedCard from "./TruncatedWeatherCard.vue";

describe("TruncatedCard.vue", () => {
  // Check if the component renders correctly with props
  it("renders correctly with props", () => {
    const item = [
      {
        dt: 1630000000,
        main: {
          temp_max: 25.3,
          temp_min: 15.3,
          temp: 20,
        },
        weather: [{ icon: "01d", description: "Clear sky" }],
      },
    ];

    const wrapper = mount(TruncatedCard, {
      propsData: {
        item,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".truncated__card-header").text()).toBe(
      `${item[0].dt}, ${item[0].main.temp}`
    );
    expect(wrapper.find(".text-center").text()).toBe(
      item[0].weather[0].description
    );
    expect(wrapper.find(".temp__area").text()).toBe(
      `${Math.round(item[0].main.temp_min)} / ${Math.round(
        item[0].main.temp_max
      )}`
    );
    // Correct url
    expect(wrapper.find(".truncated__card-body img").attributes("src")).toBe(
      `http://openweathermap.org/img/wn/${item[0].weather[0].icon}@2x.png`
    );
  });
});
