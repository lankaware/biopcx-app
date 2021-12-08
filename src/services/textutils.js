import { getList } from "./apiconnect"
import { ageCalc, defaultDateBr, prettyDate } from "./dateutils"

export async function parseTextMacro(textToParse, patientId) {
    let parsedText = ''
    let refDate = prettyDate(defaultDateBr().substr(0,10))
    return getList('patientid/' + patientId)
    .then((items) => {
        parsedText = textToParse.replace(/@data/g, refDate)
        parsedText = parsedText.replace(/@nome/g, `${items.record[0].name} ${items.record[0].lastname}`)
        parsedText = parsedText.replace(/@idade/g, `${ageCalc(items.record[0].birthDate)}`)
        parsedText = parsedText.replace(/@sexo/g, `${items.record[0].gender}`)
        parsedText = parsedText.replace(/@nasc/g, `${prettyDate(items.record[0].birthDate)}`)
        parsedText = parsedText.replace(/@matr/g, `${items.record[0].internalRegister}`)
        parsedText = parsedText.replace(/@ender/g, `${items.record[0].address} ${items.record[0].addressNumber} ${items.record[0].addressComplement} - ${items.record[0].city_name}/(estado) `)
        return parsedText
    })
}
