import React from 'react';
import parse from 'html-react-parser';

// A5: Ratio: 1:1.41 Size: 149mm x 210mm

const RecToPrint = React.forwardRef((props, ref) => {
    console.log('props.printLocal 2', props.printLocal)
    const prescSign1 = `${props.printLocal}, ${(new Date()).toLocaleDateString('pt-BR', { 'day': 'numeric', 'month': 'long', 'year': 'numeric' })} `
    const prescSign2 = ` ___________________________________ `
    const prescSign3 = `${props.doctorName}`
    const prescSign4 = `CRM ${props.doctorCrm}`
    return (
        <div ref={ref}>
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
                </thead>
                <tbody>
                    <tr>
                        <td style={{ 'height': '60vh', 'fontSize': '18px', 'verticalAlign': 'top' }}>
                            {parse(props.reqText)}
                            <table>
                                <tbody>
                                    <tr style={{ 'height': '10vh' }}></tr>
                                    <tr style={{ 'width': '80vw', 'fontSize': '16px', 'display': 'flex', 'justifyContent': 'center' }}>
                                        <td >
                                            {parse(prescSign1)}
                                        </td>
                                    </tr>
                                    <tr style={{ 'height': '3vh' }}></tr>
                                    <tr style={{ 'fontSize': '16px', 'verticalAlign': 'top', 'display': 'flex', 'justifyContent': 'center' }}>
                                        <td >
                                            {parse(prescSign2)}
                                        </td>
                                    </tr>
                                    <tr style={{ 'fontSize': '16px', 'verticalAlign': 'top', 'display': 'flex', 'justifyContent': 'center' }}>
                                        <td>
                                            {parse(prescSign3)}
                                        </td>
                                    </tr>
                                    <tr style={{ 'fontSize': '16px', 'verticalAlign': 'top', 'display': 'flex', 'justifyContent': 'center' }}>
                                        <td>
                                            {parse(prescSign4)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
export default RecToPrint
