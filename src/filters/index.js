import moment from "moment";
import Vue from "vue";

export default function setCustomFilters() {
  Vue.filter("formattedDate", function (value) {
    if (!value) {
      return "";
    }

    let date = value;

    if (typeof date === 'number') {
        date = new Date(value * 1000);
    }

    return moment(date).format("ddd, MMM D");
  });
}
