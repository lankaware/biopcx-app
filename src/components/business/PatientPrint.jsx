import React from 'react';
import parse from 'html-react-parser';
import { ageCalc, prettyDate } from "../../services/dateutils";
import { imcCalc } from "../../services/genfunctions";

const PrescToPrint = React.forwardRef((props, ref) => {
    const covName = props.recToPrint.covenant_id ? props.covenantList[props.covenantList.findIndex((item) => { return item._id === props.recToPrint.covenant_id })].name : ''
    const planName = props.recToPrint.covenantplan_id ? props.covenantplanList[props.covenantplanList.findIndex((item) => { return item._id === props.recToPrint.covenantplan_id })].name : ''
    const unitName = props.recToPrint.unit_id ? props.unitList[props.unitList.findIndex((item) => { return item._id === props.recToPrint.unit_id })].name : ''
    return (
        <div ref={ref} >
            <style>
                {`@media print {@page {width: 210mm; heigth: 297mm; margin: 15mm 15mm 0mm 15mm}}`}
            </style>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src={`${process.env.PUBLIC_URL}/image2.png`} alt={'Biopace'} weight='438' height='114' />
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <table >
                                <tbody>
                                    <tr style={{ 'height': '2vh', 'fontSize': '16px', 'fontWeight': 'bold', 'verticalAlign': 'top' }}>
                                        <td style={{ 'fontFamily': 'times-new-roman', 'fontSize': '24px', 'width': '50vw' }}>{parse(props.recToPrint.name || '')} &nbsp; {parse(props.recToPrint.lastname || '')}</td>
                                        <td style={{ 'width': '25vw' }}>SEXO: {parse(props.recToPrint.gender || '')}</td>
                                        <td style={{ 'width': '25vw' }}>RG CLÍNICA: {parse((props.recToPrint.internalRegister || '').toString())}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table >
                                <tbody >
                                    <tr style={{ 'height': '2vh', 'fontSize': '16px', 'fontWeight': 'bold', 'verticalAlign': 'top' }}>
                                        <td style={{ 'width': '25vw' }}>DT NASC.</td>
                                        <td style={{ 'width': '25vw' }}>IDADE</td>
                                        <td style={{ 'width': '25vw' }}>CPF</td>
                                        <td style={{ 'width': '25vw' }}>CONVÊNIO</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'verticalAlign': 'top' }}>
                                        <td>{parse(prettyDate(props.recToPrint.birthDate || ''))}</td>
                                        <td>{parse((ageCalc(props.recToPrint.birthDate) || '').toString())}</td>
                                        <td>{parse(props.recToPrint.cpf || '')}</td>
                                        <td>{parse(covName)}</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'fontSize': '16px', 'fontWeight': 'bold', 'verticalAlign': 'top' }}>
                                        <td>PLANO</td>
                                        <td>MATR. CONVÊNIO</td>
                                        <td>VAL. PLANO</td>
                                        <td>UNIDADE</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'verticalAlign': 'top' }}>
                                        <td>{parse(planName)}</td>
                                        <td>{parse(props.recToPrint.covRegistration || '')}</td>
                                        <td>{parse(prettyDate(props.recToPrint.covValid || ''))}</td>
                                        <td>{parse(unitName)}</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'fontSize': '16px', 'fontWeight': 'bold', 'verticalAlign': 'top' }}>
                                        <td>DT CADASTRO</td>
                                        <td>FONES FIXO/MÓVEL</td>
                                        <td>EMAIL</td>
                                        <td>ENDEREÇO</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'verticalAlign': 'top' }}>
                                        <td>{parse(prettyDate(props.recToPrint.createdAt || ''))}</td>
                                        <td>{parse(props.recToPrint.phone || '')}</td>
                                        <td>{parse(props.recToPrint.email || '')}</td>
                                        <td>{parse(props.recToPrint.address || '')}</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'fontSize': '16px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '100vw' }}>
                                        <td>NÚMERO</td>
                                        <td>COMPLEMENTO</td>
                                        <td>BAIRRO</td>
                                        <td>CIDADE</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'verticalAlign': 'top' }}>
                                        <td>{parse(props.recToPrint.addressNumber || '')}</td>
                                        <td>{parse(props.recToPrint.addressComplement || '')}</td>
                                        <td>{parse(props.recToPrint.neighborhood || '')}</td>
                                        <td>{parse(props.recToPrint.city || '')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td style={{ 'verticalAlign': 'top', 'padding': '40px' }}>
                                            {/* <img src={props.recToPrint.photo} alt={'Foto do Paciente' } weight='519' height='230' />  */}
                                            <img src={props.recToPrint.photo} alt={'Foto do Paciente'} width='160' height='200' />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <table >
                                <tbody >
                                    <tr style={{ 'height': '2vh', 'fontSize': '16px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '600px' }}>
                                        <td style={{ 'width': '25vw' }}>ESTADO</td>
                                        <td style={{ 'width': '25vw' }}>CEP</td>
                                        <td style={{ 'width': '25vw' }}>INDICADO POR</td>
                                        <td style={{ 'width': '25vw' }}>CID. NASCIMENTO</td>
                                        <td style={{ 'width': '25vw' }}>ESTADO NASC.</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'verticalAlign': 'top' }}>
                                        <td>{parse(props.recToPrint.state || '')}</td>
                                        <td>{parse(props.recToPrint.zip || '')}</td>
                                        <td>{parse(props.recToPrint.indicatedBy || '')}</td>
                                        <td>{parse(props.recToPrint.birthCity || '')}</td>
                                        <td>{parse(props.recToPrint.birthState || '')}</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'fontSize': '16px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '600px' }}>
                                        <td>ESTADO CIVIL</td>
                                        <td>RG</td>
                                        <td>TIPO SANGUE</td>
                                        <td>RESPONSÁVEL</td>
                                        <td>FONE RESPONSÁVEL</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'verticalAlign': 'top' }}>
                                        <td>{parse(props.recToPrint.maritalStatus || '')}</td>
                                        <td>{parse(props.recToPrint.rg || '')}</td>
                                        <td>{parse(props.recToPrint.blodyType || '')}</td>
                                        <td>{parse(props.recToPrint.responsible || '')}</td>
                                        <td>{parse(props.recToPrint.responsiblePhone || '')}</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'fontSize': '16px', 'fontWeight': 'bold', 'verticalAlign': 'top', 'width': '600px' }}>
                                        <td>DT 1ª CONSULTA</td>
                                        <td>DT ÚLTIMA CONSULTA</td>
                                        <td>ALTURA</td>
                                        <td>PESO</td>
                                        <td>IMC</td>
                                    </tr>
                                    <tr style={{ 'height': '2vh', 'verticalAlign': 'top' }}>
                                        <td>{parse(prettyDate(props.recToPrint.firstAppoint || ''))}</td>
                                        <td>{parse(prettyDate(props.recToPrint.lastAppoint || ''))}</td>
                                        <td>{parse((props.recToPrint.height || '').toString())}</td>
                                        <td>{parse((props.recToPrint.weight || '').toString())}</td>
                                        <td>{parse((imcCalc(props.recToPrint.weight, props.recToPrint.height) || '').toString())}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
})

export default PrescToPrint

// width: 16vw; height: 20vw;