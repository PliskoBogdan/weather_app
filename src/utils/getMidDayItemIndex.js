export default function getMidDayItemIndex(list) {
  const sec =
    !list?.length || list?.length === 1 ? 0 : Math.round(list.length / 2);
  const index = list?.findIndex(({ dt_txt }) => dt_txt?.includes("15:00:00"));
  if (index === -1) {
    return sec;
  }

  return index;
}
