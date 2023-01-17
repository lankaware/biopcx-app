import React from 'react';
import parse from 'html-react-parser';
import { ageCalc } from "../../services/dateutils";

const PrescToPrint = React.forwardRef((props, ref) => {
    console.log('props.recToPrint 1', props.recToPrint)
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
                        <td style={{ 'width': '30vw' }}>NOME</td>
                        <td style={{ 'width': '40vw' }}>SOBRENOME</td>
                        <td style={{ 'width': '5vw' }}>SEXO</td>
                        <td style={{ 'width': '15vw' }}>RG CLÍNICA</td>
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
                        <td style={{ 'width': '5vw' }}>IDADE</td>
                        <td style={{ 'width': '20vw' }}>CPF</td>
                        <td style={{ 'width': '25vw' }}>CONVÊNIO</td>
                        <td style={{ 'width': '25vw' }}>PLANO</td>
                        <td style={{ 'width': '5vw' }}>PESO</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.birthDate.toString())}</td>
                        <td>{parse(`${ageCalc(props.recToPrint.birthDate)}`.toString())}</td>
                        <td>{parse(props.recToPrint.cpf.toString())}</td>
                        <td>{parse(props.recToPrint.covenant_id.toString())}</td>
                        <td>{parse(props.recToPrint.covenantplan_id.toString())}</td>
                        <td>{parse(props.recToPrint.weight.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>MATR. CONVÊNIO</td>
                        <td style={{ 'width': '5vw' }}>VALIDADE PLANO</td>
                        <td style={{ 'width': '20vw' }}>UNIDADE</td>
                        <td style={{ 'width': '25vw' }}>DT CADASTRO</td>
                        <td style={{ 'width': '25vw' }}>IMC</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.birthDate.toString())}</td>
                        <td>{parse(`${ageCalc(props.recToPrint.birthDate)}`.toString())}</td>
                        <td>{parse(props.recToPrint.cpf.toString())}</td>
                        <td>{parse(props.recToPrint.covenant_id.toString())}</td>
                        <td>{parse(props.recToPrint.covenantplan_id.toString())}</td>
                        <td>{parse(props.recToPrint.weight.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>FONES FIXO/MÓVEL</td>
                        <td style={{ 'width': '5vw' }}>EMAIL</td>
                        <td style={{ 'width': '20vw' }}>ENDEREÇO</td>
                        <td style={{ 'width': '25vw' }}>NÚMERO</td>
                        <td style={{ 'width': '25vw' }}>COMPLEMENTO</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.birthDate.toString())}</td>
                        <td>{parse(`${ageCalc(props.recToPrint.birthDate)}`.toString())}</td>
                        <td>{parse(props.recToPrint.cpf.toString())}</td>
                        <td>{parse(props.recToPrint.covenant_id.toString())}</td>
                        <td>{parse(props.recToPrint.covenantplan_id.toString())}</td>
                        <td>{parse(props.recToPrint.weight.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>BAIRRO</td>
                        <td style={{ 'width': '5vw' }}>CIDADE</td>
                        <td style={{ 'width': '20vw' }}>ESTADO</td>
                        <td style={{ 'width': '25vw' }}>CEP</td>
                        <td style={{ 'width': '25vw' }}>RESPONSÁVEL</td>
                        <td style={{ 'width': '25vw' }}>FONE RESPONSÁVEL</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.birthDate.toString())}</td>
                        <td>{parse(`${ageCalc(props.recToPrint.birthDate)}`.toString())}</td>
                        <td>{parse(props.recToPrint.cpf.toString())}</td>
                        <td>{parse(props.recToPrint.covenant_id.toString())}</td>
                        <td>{parse(props.recToPrint.covenantplan_id.toString())}</td>
                        <td>{parse(props.recToPrint.weight.toString())}</td>
                        <td>{parse(props.recToPrint.weight.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>CID. NASCIMENTO</td>
                        <td style={{ 'width': '5vw' }}>ESTADO NASSC.</td>
                        <td style={{ 'width': '20vw' }}>ESTADO CIVIL</td>
                        <td style={{ 'width': '25vw' }}>RG</td>
                        <td style={{ 'width': '25vw' }}>TIPO SANGUE</td>
                        <td style={{ 'width': '25vw' }}>INDICADO POR</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.birthDate.toString())}</td>
                        <td>{parse(`${ageCalc(props.recToPrint.birthDate)}`.toString())}</td>
                        <td>{parse(props.recToPrint.cpf.toString())}</td>
                        <td>{parse(props.recToPrint.covenant_id.toString())}</td>
                        <td>{parse(props.recToPrint.covenantplan_id.toString())}</td>
                        <td>{parse(props.recToPrint.weight.toString())}</td>
                        <td>{parse(props.recToPrint.weight.toString())}</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <tbody >
                <tr style={{ 'height': '3vh', 'fontSize': '18px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '500px' }}>
                        <td style={{ 'width': '20vw' }}>DT 1ª CONSULTA</td>
                        <td style={{ 'width': '20vw' }}>DT ÚLTIMA CONSULTA</td>
                    </tr>
                    <tr style={{ 'height': '7vh', 'verticalAlign': 'top' }}>
                        <td>{parse(props.recToPrint.birthDate.toString())}</td>
                        <td>{parse(`${ageCalc(props.recToPrint.birthDate)}`.toString())}</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
})

export default PrescToPrint
