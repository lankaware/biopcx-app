export function ageCalc(birthday) {
  if (!birthday) return null;
  let [year, month, day] = birthday.split("-");
  year = Number(year);
  month = Number(month);
  day = Number(day);
  const actualDate = new Date();
  let age = actualDate.getFullYear() - year;
  if (month == 2 && day == 29) {
    month++;
    day = 1;
  }
  if (
    actualDate.getMonth() < month ||
    (actualDate.getMonth() === month && actualDate.getDate() < day)
  ) {
    age--;
  }
  return age;
}
