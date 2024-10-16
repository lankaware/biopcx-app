import React from 'react';
import parse from 'html-react-parser';

const PrescToPrint = React.forwardRef((props, ref) => {
    const prescSign1 = () => {
        if (props.dateAdd)
            return `${props.printLocal}, ${(new Date()).toLocaleDateString('pt-BR', { 'day': 'numeric', 'month': 'long', 'year': 'numeric' })} `
        else
            return ''
    }
    const prescSign2 = ` ___________________________________ `
    const prescSign3 = `${props.doctorName}`
    const prescSign4 = `CRM ${props.doctorCrm}`

    const defHeader = () => {
        if (props.headerAdd)
            // return <img src={`${process.env.PUBLIC_URL}/image2.png`} alt={'Biopace'} weight='438' height='114' />  // Abbas
            return <img src={`${process.env.PUBLIC_URL}/image2.png`} alt={'Biopace'} weight='307' height='80' />   // Biopace
        else
            return ''
    }

    return (
        <div ref={ref} >
            <style>
                {`@media print {@page {width: 210mm; heigth: 297mm; margin: 15mm 15mm 0mm 15mm}}`}
            </style>

            <table >
                <thead style={{ 'verticalAlign': 'top' }}>
                    <tr>
                        <td style={{ 'width': '100vw', 'height': '10vh' }}>
                            {/* {parse(props.header)} */}
                            {defHeader()}
                        </td>
                    </tr>
                </thead >
                <tbody >
                    <tr>
                        <td style={{ 'height': '80vh', 'fontSize': '16px', 'verticalAlign': 'top' }}>
                            {parse(props.prescText)}
                            <table>
                                <tbody>
                                    <tr style={{ 'height': '3vh' }}></tr>
                                    <tr style={{ 'width': '80vw', 'fontSize': '16px', 'display': 'flex', 'justifyContent': 'center' }}>
                                        <td >
                                            {prescSign1()}
                                        </td>
                                    </tr>
                                    <tr style={{ 'height': '1vh' }}></tr>
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

export default PrescToPrint
