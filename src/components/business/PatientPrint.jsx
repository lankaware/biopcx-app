import React from 'react';
import parse from 'html-react-parser';
import { ageCalc, prettyDate } from "../../services/dateutils";
import { imcCalc } from "../../services/genfunctions";

const PrescToPrint = React.forwardRef((props, ref) => {
    const covName = props.covenantList[props.covenantList.findIndex((item) => { return item._id === props.recToPrint.covenant_id })].name
    const planName = props.covenantplanList[props.covenantplanList.findIndex((item) => { return item._id === props.recToPrint.covenantplan_id })].name
    const unitName = props.unitList[props.unitList.findIndex((item) => { return item._id === props.recToPrint.unit_id })].name
    // const prescSign1 = `${props.printLocal}, ${(new Date()).toLocaleDateString('pt-BR', { 'day': 'numeric', 'month': 'long', 'year': 'numeric' })} `
    // const prescSign2 = ` ___________________________________ `
    // const prescSign3 = `${props.doctorName}`
    // const prescSign4 = `CRM ${props.doctorCrm}`
    return (
        <div ref={ref} >
            <style>
                {`@media print {@page {width: 210mm; heigth: 297mm; margin: 15mm 15mm 0mm 15mm}}`}
            </style>

            <table >
                <tbody >
                    <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>NOME</td>
                        <td style={{ 'width': '40vw' }}>SOBRENOME</td>
                        <td style={{ 'width': '5vw' }}>SEXO</td>
                        <td style={{ 'width': '25vw' }}>RG CLÍNICA</td>
                        <td style={{ 'width': '5vw' }}>ALTURA</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.name)}</td>
                        <td>{parse(props.recToPrint.lastname)}</td>
                        <td>{parse(props.recToPrint.gender)}</td>
                        <td>{parse(props.recToPrint.rg)}</td>
                        <td>{parse(props.recToPrint.height.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                    <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>DT NASC.</td>
                        <td style={{ 'width': '10vw' }}>IDADE</td>
                        <td style={{ 'width': '15vw' }}>CPF</td>
                        <td style={{ 'width': '20vw' }}>CONVÊNIO</td>
                        <td style={{ 'width': '25vw' }}>PLANO</td>
                        <td style={{ 'width': '5vw' }}>PESO</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(prettyDate(props.recToPrint.birthDate || ''))}</td>
                        <td>{parse(ageCalc(props.recToPrint.birthDate).toString())}</td>
                        <td>{parse(props.recToPrint.cpf.toString())}</td>
                        <td>{parse(covName)}</td>
                        <td>{parse(planName)}</td>
                        <td>{parse(props.recToPrint.weight.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                    <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>MATR. CONVÊNIO</td>
                        <td style={{ 'width': '10vw' }}>VAL. PLANO</td>
                        <td style={{ 'width': '15vw' }}>UNIDADE</td>
                        <td style={{ 'width': '45vw' }}>DT CADASTRO</td>
                        <td style={{ 'width': '5vw' }}>IMC</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.covRegistration.toString())}</td>
                        <td>{parse(prettyDate(props.recToPrint.covValid || ''))}</td>
                        <td>{parse(unitName)}</td>
                        <td>{parse(prettyDate(props.recToPrint.createdAt || ''))}</td>
                        <td>{parse(imcCalc(props.recToPrint.weight, props.recToPrint.height).toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                    <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>FONES FIXO/MÓVEL</td>
                        <td style={{ 'width': '25vw' }}>EMAIL</td>
                        <td style={{ 'width': '30vw' }}>ENDEREÇO</td>
                        <td style={{ 'width': '10vw' }}>NÚMERO</td>
                        <td style={{ 'width': '5vw' }}>COMPLEMENTO</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.phone.toString())}</td>
                        <td>{parse(props.recToPrint.email).toString()}</td>
                        <td>{parse(props.recToPrint.address.toString())}</td>
                        <td>{parse(props.recToPrint.addressNumber.toString())}</td>
                        <td>{parse(props.recToPrint.addressComplement.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                    <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>BAIRRO</td>
                        <td style={{ 'width': '25vw' }}>CIDADE</td>
                        <td style={{ 'width': '20vw' }}>ESTADO</td>
                        <td style={{ 'width': '10vw' }}>CEP</td>
                        <td style={{ 'width': '20vw' }}>INDICADO POR</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.neighborhood.toString())}</td>
                        <td>{parse(props.recToPrint.city.toString())}</td>
                        <td>{parse(props.recToPrint.state.toString())}</td>
                        <td>{parse(props.recToPrint.zip.toString())}</td>
                        <td>{parse(props.recToPrint.indicatedBy.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                    <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>CID. NASCIMENTO</td>
                        <td style={{ 'width': '25vw' }}>ESTADO NASC.</td>
                        <td style={{ 'width': '20vw' }}>ESTADO CIVIL</td>
                        <td style={{ 'width': '10vw' }}>RG</td>
                        <td style={{ 'width': '15vw' }}>TIPO SANGUE</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.birthCity.toString())}</td>
                        <td>{parse(props.recToPrint.birthState.toString())}</td>
                        <td>{parse(props.recToPrint.maritalStatus.toString())}</td>
                        <td>{parse(props.recToPrint.rg.toString())}</td>
                        <td>{parse(props.recToPrint.blodyType.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                    <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>RESPONSÁVEL</td>
                        <td style={{ 'width': '25vw' }}>FONE RESPONSÁVEL</td>
                        <td style={{ 'width': '20vw' }}>DT 1ª CONSULTA</td>
                        <td style={{ 'width': '20vw' }}>DT ÚLTIMA CONSULTA</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.responsible.toString())}</td>
                        <td>{parse(props.recToPrint.responsiblePhone.toString())}</td>
                        <td>{parse(prettyDate(props.recToPrint.firstAppoint || ''))}</td>
                        <td>{parse(prettyDate(props.recToPrint.lastAppoint || ''))}</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
})

export default PrescToPrint
