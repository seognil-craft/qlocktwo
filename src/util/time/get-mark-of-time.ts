// * 0 for 'oclock'
// * 1 for 'past'
// * 2 for 'to'
type Prefix = 0 | 1 | 2;
type ValidHour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ValidMinute = 0 | 5 | 10 | 15 | 20 | 25 | 30;

// * ----------------

export const getMarkOfTime = ([hour, minute]: [number, number]): {
  prefix: Prefix;
  hour: ValidHour;
  minute: ValidMinute;
} => {
  const is2ndHalf = minute > 30;
  const disHour = ((minute > 30 ? hour + 1 : hour) % 12 || 12) as ValidHour;
  const disMinute = (minute <= 30 ? minute : 60 - minute) as ValidMinute;

  return {
    prefix: minute === 0 ? 0 : is2ndHalf ? 2 : 1,
    hour: disHour,
    minute: disMinute,
  };
};
