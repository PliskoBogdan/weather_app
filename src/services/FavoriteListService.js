class FavoriteListService {
  getList() {
    try {
      const list = JSON.parse(localStorage.getItem("favorite")) || [];

      return list;
    } catch (error) {
      console.error("Error when try to get favorite list");
      return [];
    }
  }

  findInList(id) {
    const list = this.getList();

    const indexFavorite = list.findIndex((item) => id === item.id);

    return indexFavorite;
  }

  isItemInList(id) {
    return this.findInList(id) !== -1;
  }

  setFavorite(item) {
    return new Promise((res) => {
      const response = { success: null, isInFavorite: null };
      const list = this.getList();

      const indexCurrentLocationInFavorit = this.findInList(item.id);

      // Delete from favorite
      if (indexCurrentLocationInFavorit !== -1) {
        list.splice(indexCurrentLocationInFavorit, 1);
        response.isInFavorite = false;
      } else {
        list.push({
          latitude: item.latitude,
          longitude: item.longitude,
          title: `${item.country}, ${item.city}`,
          id: item.id,
        });

        response.isInFavorite = true;
      }

      try {
        localStorage.setItem("favorite", JSON.stringify(list));
        response.success = true;
        res(response);
      } catch (error) {
        response.success = false;
        console.error("Error when set item in favorite list", error);
      } finally {
        res(response);
      }
    });
  }
}

export default new FavoriteListService();
