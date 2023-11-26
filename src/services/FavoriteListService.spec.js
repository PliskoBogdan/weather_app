import FavoriteListService from "./FavoriteListService";

describe("FavoriteListService", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("should return an empty array if localStorage is empty or malformed", () => {
    const result = FavoriteListService.getList();

    expect(result).toEqual([]);
  });

  it("should return the correct index of an item in the list", () => {
    localStorage.setItem(
      "favorite",
      JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
    );

    const index = FavoriteListService.findInList(2);

    expect(index).toBe(1);
  });

  it("should return -1 for an item not in the list", () => {
    localStorage.setItem(
      "favorite",
      JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
    );

    const index = FavoriteListService.findInList(4);

    expect(index).toBe(-1);
  });

  it("should correctly check if an item is in the list", () => {

    localStorage.setItem(
      "favorite",
      JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
    );

    const isInList = FavoriteListService.isItemInList(2);

    expect(isInList).toBe(true);
  });

  it("should correctly check if an item is not in the list", () => {
    localStorage.setItem(
      "favorite",
      JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
    );

    const isInList = FavoriteListService.isItemInList(4);

    expect(isInList).toBe(false);
  });

  it("should add an item to the list when calling setFavorite", async () => {

    await FavoriteListService.setFavorite({
      id: 1,
      country: "Country1",
      city: "City1",
      latitude: 1,
      longitude: 1,
    });

    const list = JSON.parse(localStorage.getItem("favorite"));
    expect(list.length).toBe(1);
    expect(list[0].id).toBe(1);
  });

  it("should remove an item from the list when calling setFavorite", async () => {
    localStorage.setItem(
      "favorite",
      JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
    );

    await FavoriteListService.setFavorite({ id: 2 });

    const list = JSON.parse(localStorage.getItem("favorite"));
    expect(list.length).toBe(2);
    expect(list.map((item) => item.id)).not.toContain(2);
  });
});
