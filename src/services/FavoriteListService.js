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

  findInList(lat, lon) {
    const list = this.getList();

    const indexFavorite = list.findIndex(
      ({ latitude, longitude }) => latitude === lat && longitude === lon
    );

    return indexFavorite;
  }
}

export default new FavoriteListService();
