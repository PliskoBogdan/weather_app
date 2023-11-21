import moment from "moment";

export default function setCustomFilters(Vue) {
  Vue.filter("formattedDate", function (value) {
    if (value) {
      return moment(value).format("ddd, MMM D");
    }
  });
}
