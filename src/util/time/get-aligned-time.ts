// * given point & keypoint list, get closest keypoint

type SearchNumbers = number[];
const minuteSlots: SearchNumbers = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const secondSlots: SearchNumbers = minuteSlots.map((e) => e * 60);

const getNearestMinOfSec = (second: number): number => {
  const deltaList = secondSlots.map((e) => Math.abs(second - e));
  const minDelta = Math.min(...deltaList);
  const index = deltaList.indexOf(minDelta);
  const minute = minuteSlots[index];
  return minute;
};

export const getAlignedTime = (date: Date): [number, number] => {
  const [hour, second] = [date.getHours() % 12 || 12, date.getMinutes() * 60 + date.getSeconds()];
  const minute = getNearestMinOfSec(second);
  return minute === 60 ? [hour + 1, 0] : [hour, minute];
};
