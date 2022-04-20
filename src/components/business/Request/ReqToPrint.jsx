import React from 'react';
import parse from 'html-react-parser';

// A5: Ratio: 1:1.41 Size: 149mm x 210mm

const RecToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <style>
                {`@media print {@page {width: 210mm; heigth: 297mm; margin: 15mm 15mm 0mm 15mm}}`}
            </style>
            <table >
                <thead style={{ 'verticalAlign': 'top' }}>
                    <td style={{ 'width': '100vw', 'height': '10vh' }}>
                        {parse(props.header)}
                    </td>
                </thead>
                <tbody>
                    <td style={{ 'height': '80vh', 'fontSize': '21px', 'verticalAlign': 'top' }}>
                        {parse(props.reqText)}
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
export default RecToPrint
