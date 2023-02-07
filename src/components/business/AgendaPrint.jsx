import React from 'react';
import parse from 'html-react-parser';
import { ageCalc, prettyDate } from "../../services/dateutils";
import { imcCalc } from "../../services/genfunctions";

const AgendaPrint = React.forwardRef((props, ref) => {
    console.log('props.list', props.listToPrint)
    return (
        <div ref={ref} >
            <style>
                {`@media print {@page {width: 210mm; heigth: 297mm; margin: 15mm 15mm 0mm 15mm}}`}
            </style>
            <h2></h2>
            <table>
                <thead>
                    <tr key={10007}><td>&nbsp;</td></tr>
                    <tr >
                        <td style={{ 'width': '100px', 'fontWeight': 'bold' }}>Data</td>
                        <td style={{ 'textAlign': 'left', 'width': '100px', 'fontWeight': 'bold' }}>Início</td>
                        <td style={{ 'textAlign': 'left', 'width': '100px', 'fontWeight': 'bold' }}>Fim</td>
                        <td style={{ 'textAlign': 'left', 'width': '300px', 'fontWeight': 'bold' }}>Paciente</td>
                        <td style={{ 'textAlign': 'left', 'width': '150px', 'fontWeight': 'bold' }}>Procedimento</td>
                        <td style={{ 'textAlign': 'left', 'width': '200px', 'fontWeight': 'bold' }}>Fone</td>
                        <td style={{ 'textAlign': 'left', 'width': '200px', 'fontWeight': 'bold' }}>E-mail</td>
                    </tr>
                </thead>
                <tbody>
                    <tr key={10008}><td>&nbsp;</td></tr>
                    {props.listToPrint.map((item) => {
                        return (
                            <>
                                <tr key={item._id}>
                                    <td style={{ 'textAlign': 'rileft' }}>{prettyDate(item.date)}</td>
                                    <td style={{ 'textAlign': 'left' }}>{item.initialTime.substr(0, 5)}</td>
                                    <td style={{ 'textAlign': 'left' }}>{item.finalTime.substr(0, 5)}</td>
                                    <td style={{ 'textAlign': 'left' }}>{item.patient_name}</td>
                                    <td style={{ 'textAlign': 'left' }}>{item.procedure_name}</td>
                                    <td style={{ 'textAlign': 'left' }}>{item.phone}</td>
                                    <td style={{ 'textAlign': 'left' }}>{item.email}</td>
                                    {/* <td style={{ 'textAlign': 'left' }}>{item.professional_name}</td> */}
                                </tr>
                            </>
                        )
                    })}
                    <tr key={10009}><td>&nbsp;</td></tr>
                    <tr key={10010}><td>&nbsp;</td></tr>
                </tbody>
            </table>
        </div >
    )
})

export default AgendaPrint
