import React from 'react';
import parse from 'html-react-parser';

// A5: Ratio: 1:1.41 Size: 149mm x 210mm
// const styleTable = { 'A4': { 'width': '210mm', 'height': '297mm' }, 'A5': { 'width': '210mm', 'height': '297mm' } }
// const styleHeader = { 'A4': { 'width': '210mm', 'height': '50mm' }, 'A5': { 'width': '210mm', 'height': '50mm' } }
// const styleFooter = { 'A4': { 'width': '210mm', 'height': '20mm' }, 'A5': { 'width': '210mm', 'height': '20mm' } }
// const paperStyle = 'A'
// style={styleHeader[paperStyle]}

const PrescToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} >
            <style>
                {/* {`@media print {@page {size: A4 portrait; margin: 10mm}}`} */}
                {`@media print {@page {width: 210mm; heigth: 297mm; margin: 15mm}}`}
            </style>

            <table >
                <thead style={{ 'borderStyle': 'dotted' }}>
                    <td style={{ 'width': '100vw', 'height': '30vh' }}>
                        {parse(props.header)}
                    </td>
                </thead >
                <tbody >
                    <td style={{ 'height': '50vh', 'fontSize': '18px', 'verticalAlign': 'top', 'borderStyle': 'dotted' }}>
                        {parse(props.prescText)}
                    </td>
                </tbody>
                <tfoot style={{ 'borderStyle': 'dotted' }}>
                    <td style={{ 'width': '100vw', 'height': '10vh' }}>
                        {parse(props.footer)}</td>
                </tfoot>
            </table>
        </div>
    )
})
export default PrescToPrint
