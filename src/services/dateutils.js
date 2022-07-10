
export function dateBr(argDate) {
  if (!argDate) return ''
  const tempDate = new Date(argDate)
  // return tempDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  return tempDate.toLocaleDateString()
}

export function stdTime(argTime) {
  if (!argTime) return ''
  const tempDate = new Date(argTime)
  return tempDate.toLocaleTimeString('pt-BR', { timeZone: 'UTC' })
  //return tempDate.toLocaleTimeString()
}

export function timeBr(argTime) {
  if (!argTime) return ''
  const tempDate = new Date(argTime)
  // return tempDate.toLocaleTimeString('pt-BR', { timeZone: 'UTC' })
  return tempDate.toLocaleTimeString()
}

export function defaultDateBr() {
  const dateDefault = new Date()
  const tempDate = dateDefault.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const stringDate = tempDate.substring(6, 10) + '-' + tempDate.substring(3, 5) + '-' + tempDate.substring(0, 2)
  return stringDate
}

export function dateISO(parmDate) {
  const stringDate = parmDate.substr(6, 4) + '-' + parmDate.substr(3, 2) + '-' + parmDate.substr(0, 2)
  return stringDate
}

export function prettyDate(parmDate) {
  const stringDate = parmDate.substr(8, 2) + '/' + parmDate.substr(5, 2) + '/' + parmDate.substr(2, 2)
  return stringDate
}

export function ageCalc(birthday) {
  if (!birthday) return null;
  let [year, month, day] = birthday.split("-");
  year = Number(year);
  month = Number(month);
  day = Number(day);
  const actualDate = new Date();
  let age = actualDate.getFullYear() - year;
  if (month === 2 && day === 29) {
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


