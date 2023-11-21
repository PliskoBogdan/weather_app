/**
 *
 * @param {Array[Record<any, any>]} list
 * @return { Record<Date, any> }
 */
export default function weatherByDaysMapper(list) {
  const weatherByDay = {};
  let currentTimeInfo = null;

  for (let i = 0; i < list.length; i++) {
    const curr = list[i];
    //Get date from date + time string
    const pattern = /\b(\d{4}-\d{2}-\d{2})\b/;

    const dateText = curr.dt_txt;
    const date = dateText.match(pattern)[1];

    if (i === 0) {
      currentTimeInfo = curr
    }

    if (!weatherByDay[date]) {
      weatherByDay[date] = [];
    }

    weatherByDay[date].push(curr);
  }

  return { list: weatherByDay, currentTimeInfo };
}
