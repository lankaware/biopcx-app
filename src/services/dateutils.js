
export function dateBr(argDate) {
  if (!argDate) return ''
  const tempDate = new Date(argDate)
  return tempDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

export function defaultDateBr() {
  const dateDefault = new Date()
  const tempDate = dateDefault.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const stringDate = tempDate.substr(6,4)+'-'+tempDate.substr(3,2)+'-'+tempDate.substr(0,2)
  return stringDate
}

export function dateISO(parmDate) {
  const stringDate = parmDate.substr(6,4)+'-'+parmDate.substr(3,2)+'-'+parmDate.substr(0,2)
  return stringDate
}
