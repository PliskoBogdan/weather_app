import moment from "moment";
import Vue from "vue";
import i18n from "@/i18n";

export default function setCustomFilters() {
  Vue.filter("formattedDate", function (value) {
    if (!value) {
      return "";
    }

    let date = value;

    if (typeof date === "number") {
      date = new Date(value * 1000);
    }

    return moment(date).format("ddd, MMM D");
  });

  Vue.filter("formatTime", function (datetimeString) {
    const momentTime = moment(datetimeString, "YYYY-MM-DD HH:mm:ss");

    moment.locale(i18n.locale);

    const formattedTime = momentTime.format("LT");

    return formattedTime;
  });
}
