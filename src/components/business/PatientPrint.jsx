import React from 'react';
import parse from 'html-react-parser';
import { ageCalc, prettyDate } from "../../services/dateutils";
import { imcCalc } from "../../services/genfunctions";

const PrescToPrint = React.forwardRef((props, ref) => {
    console.log('props.stateList', props.stateList)
    console.log('props.recToPrint', props.recToPrint)
    const covName = props.recToPrint.covenant_id ? props.covenantList[props.covenantList.findIndex((item) => { return item._id === props.recToPrint.covenant_id })].name : ''
    const planName = props.recToPrint.covenantplan_id ? props.covenantplanList[props.covenantplanList.findIndex((item) => { return item._id === props.recToPrint.covenantplan_id })].name : ''
    const unitName = props.recToPrint.unit_id ? props.unitList[props.unitList.findIndex((item) => { return item._id === props.recToPrint.unit_id })].name : ''
    // const stateName = props.recToPrint.state ? props.stateList[props.stateList.findIndex((item) => { return item._id === props.recToPrint.state })].acronym : ''
    // const birthstateName = props.recToPrint.birthstate ? props.stateList[props.stateList.findIndex((item) => { return item._id === props.recToPrint.birthstate })].acronym : ''
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
                        <td>{parse(props.recToPrint.name || '')}</td>
                        <td>{parse(props.recToPrint.lastname || '')}</td>
                        <td>{parse(props.recToPrint.gender || '')}</td>
                        <td>{parse(props.recToPrint.rg || '')}</td>
                        <td>{parse(props.recToPrint.height|| '').toString()}</td>
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
                        <td>{parse((ageCalc(props.recToPrint.birthDate) || '').toString())}</td>
                        <td>{parse(props.recToPrint.cpf || '')}</td>
                        <td>{parse(covName)}</td>
                        <td>{parse(planName)}</td>
                        <td>{parse(props.recToPrint.weight || '').toString()}</td>
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
                        <td>{parse(props.recToPrint.covRegistration || '')}</td>
                        <td>{parse(prettyDate(props.recToPrint.covValid || ''))}</td>
                        <td>{parse(unitName)}</td>
                        <td>{parse(prettyDate(props.recToPrint.createdAt || ''))}</td>
                        <td>{parse((imcCalc(props.recToPrint.weight, props.recToPrint.height) || '').toString())}</td>
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
                        <td>{parse(props.recToPrint.phone || '')}</td>
                        <td>{parse(props.recToPrint.email || '')}</td>
                        <td>{parse(props.recToPrint.address || '')}</td>
                        <td>{parse(props.recToPrint.addressNumber || '')}</td>
                        <td>{parse(props.recToPrint.addressComplement || '')}</td>
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
                        <td>{parse(props.recToPrint.neighborhood || '')}</td>
                        <td>{parse(props.recToPrint.city || '')}</td>
                        <td>{parse(props.recToPrint.state)}</td>
                        <td>{parse(props.recToPrint.zip || '')}</td>
                        <td>{parse(props.recToPrint.indicatedBy || '')}</td>
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
                        <td>{parse(props.recToPrint.birthCity || '')}</td>
                        <td>{parse(props.recToPrint.birthState || '')}</td>
                        <td>{parse(props.recToPrint.maritalStatus || '')}</td>
                        <td>{parse(props.recToPrint.rg || '')}</td>
                        <td>{parse(props.recToPrint.blodyType || '')}</td>
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
                        <td>{parse(props.recToPrint.responsible || '')}</td>
                        <td>{parse(props.recToPrint.responsiblePhone || '')}</td>
                        <td>{parse(prettyDate(props.recToPrint.firstAppoint || ''))}</td>
                        <td>{parse(prettyDate(props.recToPrint.lastAppoint || ''))}</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
})

export default PrescToPrint
