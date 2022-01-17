import React from 'react';
import parse from 'html-react-parser';

// A5: Ratio: 1:1.41 Size: 149mm x 210mm

const PrescToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <table style={{ 'width': '298px', 'height': '420px' }}>
                <thead style={{ 'width': '1', 'maxHeight': '15%', 'minHeight': '10%' }}>
                    <td>
                        {console.log(parse(props.header))}
                        {parse(props.header)}
                    </td>
                </thead>
                <tbody style={{ 'width': '1', 'minHeight': '70%', 'maxHeight': '80%' }}>
                    <td>{parse(props.prescText)}</td>
                </tbody>
                <tfoot style={{ 'width': '1', 'maxHeight': '15%', 'minHeight': '10%' }}>
                    <td>
                        {console.log(parse(props.footer))}
                        {parse(props.footer)}</td>
                </tfoot>
            </table>
        </div>
    )
})
export default PrescToPrint