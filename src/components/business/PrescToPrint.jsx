import React from 'react';
import parse from 'html-react-parser';

const PrescToPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            {parse(props.prescText)}
        </div>
    )
})
export default PrescToPrint