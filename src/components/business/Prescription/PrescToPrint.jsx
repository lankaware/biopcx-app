import React from 'react';
import parse from 'html-react-parser';
import { dateBr } from '../../../services/dateutils'

const PrescToPrint = React.forwardRef((props, ref) => {

    const prescSign1 = `${props.printLocal}, ${(new Date()).toLocaleDateString('pt-BR', { 'day': 'numeric', 'month': 'long', 'year': 'numeric' })} `
    const prescSign2 = ` ___________________________________ `
    const prescSign3 = `${props.doctorName}`
    const prescSign4 = `CRM ${props.doctorCrm}`

    return (
        <div ref={ref} >
            <style>
                {`@media print {@page {width: 210mm; heigth: 297mm; margin: 15mm 15mm 0mm 15mm}}`}
            </style>

            <table >
                <thead style={{ 'verticalAlign': 'top' }}>
                    <tr>
                        <td style={{ 'width': '100vw', 'height': '10vh' }}>
                            {parse(props.header)}
                        </td>
                    </tr>
                </thead >
                <tbody >
                    <tr>
                        <td style={{ 'height': '60vh', 'fontSize': '21px', 'verticalAlign': 'top' }}>
                            {parse(props.prescText)}
                            <tr style={{ 'height': '5vh', 'fontSize': '21px', 'verticalAlign': 'top', 'display': 'flex', 'justifyContent': 'center' }}>
                                <td >
                                    {parse(prescSign1)}
                                </td>
                            </tr>
                            <tr style={{ 'fontSize': '21px', 'verticalAlign': 'top', 'display': 'flex', 'justifyContent': 'center' }}>
                                <td >
                                    {parse(prescSign2)}
                                </td>
                            </tr>
                            <tr style={{ 'fontSize': '21px', 'verticalAlign': 'top', 'display': 'flex', 'justifyContent': 'center' }}>
                                <td>
                                    {parse(prescSign3)}
                                </td>
                            </tr>
                            <tr style={{ 'fontSize': '21px', 'verticalAlign': 'top', 'display': 'flex', 'justifyContent': 'center' }}>
                                <td>
                                    {parse(prescSign4)}
                                </td>
                            </tr>
                        </td>
                    </tr>
                </tbody>
                <tfoot >
                    <tr>
                        <td style={{ 'width': '100vw', 'height': '5vh' }}>
                            {parse(props.footer)}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
})

export default PrescToPrint
