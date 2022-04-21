import React from 'react';
import parse from 'html-react-parser';

const PrescToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} >
            <style>
                {`@media print {@page {width: 210mm; heigth: 297mm; margin: 15mm 15mm 0mm 15mm}}`}
            </style>

            <table >
                <thead style={{ 'verticalAlign': 'top' }}>
                    <td style={{ 'width': '100vw', 'height': '10vh' }}>
                        {parse(props.header)}
                    </td>
                </thead >
                <tbody >
                    <td style={{ 'height': '80vh', 'fontSize': '21px', 'verticalAlign': 'top' }}>
                        {parse(props.prescText)}
                    </td>
                </tbody>
                <tfoot >
                    <td style={{ 'width': '100vw', 'height': '5vh' }}>
                        {parse(props.footer)}
                    </td>
                </tfoot>
            </table>
        </div>
    )
})
export default PrescToPrint
