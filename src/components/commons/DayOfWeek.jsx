export const DaysOfWeek = [
  {
    value: 0,
    label: 'domingo'
  },
  {
    value: 1,
    label: 'segunda-feira'
  },
  {
    value: 2,
    label: 'terça-feira'
  },
  {
    value: 3,
    label: 'quarta-feira'
  },
  {
    value: 4,
    label: 'quinta-feira'
  },
  {
    value: 5,
    label: 'sexta-feira'
  },
  {
    value: 6,
    label: 'sábado'
  },
]

export function dayOfWeekLabel (dayNumber) {
  return DaysOfWeek[(dayNumber)].label
}

export function dayOfWeekIndex (weekName) {
  const indWeek = DaysOfWeek.findIndex((item) => { return item.label === weekName })
  return DaysOfWeek[(indWeek || 0)].value
}

