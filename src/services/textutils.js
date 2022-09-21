import { getList } from "./apiconnect"
import { ageCalc, defaultDateBr, prettyDate } from "./dateutils"

export async function parseTextMacro(textToParse, patientId) {
    let parsedText = ''
    let refDate = prettyDate(defaultDateBr().substr(0,10))
    return getList('patientid/' + patientId)
    .then((items) => {
        const address = items.record[0].address || ''
        const addressNumber = items.record[0].addressNumber  || ''
        const addressComplement = items.record[0].addressComplement || ''
        const city = items.record[0].city ? ' - ' + items.record[0].city : ''
        const state = items.record[0].state ? '/' + items.record[0].state :  ''

        parsedText = textToParse.replace(/@data/g, refDate)
        parsedText = parsedText.replace(/@nome/g, `${items.record[0].name} ${items.record[0].lastname}`)
        parsedText = parsedText.replace(/@idade/g, `${ageCalc(items.record[0].birthDate)}`)
        parsedText = parsedText.replace(/@sexo/g, `${items.record[0].gender}`)
        parsedText = parsedText.replace(/@nasc/g, `${items.record[0].birthDate}`)
        parsedText = parsedText.replace(/@reg/g, `${items.record[0].internalRegister}`)
        parsedText = parsedText.replace(/@ender/g, `${address} ${addressNumber} ${addressComplement}${city}${state} `)
        return parsedText
    })
}
