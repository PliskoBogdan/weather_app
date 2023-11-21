import getMidDayItemIndex from "./getMidDayItemIndex";

describe("getMidDayItemIndex function", () => {
  it('should returns correct index for a list with "15:00:00"', () => {
    const list = [
      { dt_txt: "2023-11-21 12:00:00" },
      { dt_txt: "2023-11-21 15:00:00" },
      { dt_txt: "2023-11-21 18:00:00" },
    ];
    expect(getMidDayItemIndex(list)).toBe(1);
  });

  it('should returns default index for a list without "15:00:00"', () => {
    // Default index - means mid of list
    const testData = [
      {
        list: [
          { dt_txt: "2023-11-21 12:00:00" },
          { dt_txt: "2023-11-21 09:00:00" },
          { dt_txt: "2023-11-21 18:00:00" },
        ],
        expectedIndex: 1,
      },
      {
        list: [
          { dt_txt: "2023-11-21 12:00:00" },
          { dt_txt: "2023-11-21 08:00:00" },
          { dt_txt: "2023-11-21 18:00:00" },
        ],
        expectedIndex: 1,
      },
      {
        list: [
          { dt_txt: "2023-11-21 12:00:00" },
          { dt_txt: "2023-11-21 18:00:00" },
        ],
        expectedIndex: 1,
      },
    ];

    testData.forEach(({ list, expectedIndex }) => {
      expect(getMidDayItemIndex(list)).toBe(expectedIndex);
    });
  });

  it("should returns 0 for an empty list", () => {
    const list = [];
    expect(getMidDayItemIndex(list)).toBe(0);
  });

  it("should returns 0 for a list with one element", () => {
    const list = [{ dt_txt: "2023-11-21 12:00:00" }];
    expect(getMidDayItemIndex(list)).toBe(0);
  });
});
