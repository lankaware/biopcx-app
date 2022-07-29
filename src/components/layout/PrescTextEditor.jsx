import React, { useRef, useState, useEffect } from 'react'
import JoditEditor from "jodit-react"

const PrescTextEditor = props => {

    const [content, contentSet] = useState("")

    const editor = useRef(null)

    useEffect(() => {
        contentSet(props.intMedicine + props.extMedicine)
    }, [props.intMedicine, props.extMedicine]);

    const config = {
        readonly: props.disabled, // all options from https://xdsoft.net/jodit/doc/
        statusbar: false,
        language: 'pt_br',
        removeButtons: [
            'fullsize',
            'dots',
            'source',
            // 'bold',
            // 'italic',
            // 'ul',
            // 'ol',
            // 'eraser',
            // 'font',
            // 'fontsize',
            // 'brush',
            // 'paragraph',
            // 'image',
            // 'table',
            // 'link',
            // 'align',
            // 'undo',
            // 'redo',
            // 'hr',
            // 'copyformat',
        ],
        height: 320,
        width: 680,
        useSplitMode: true,
        autofocus: props.autofocus,
        enter: "BR",
        // style: {
        //     font: '24px Arial'
        // },
    }

    const handleEditor = (newContent) => {
        let contentS = null;
        if (newContent.search("Uso externo:") !== -1) {
            contentS = newContent.split("Uso externo:");
            props.intMedicineSet(contentS[0]);
            props.extMedicineSet("Uso externo:" + contentS[1]);
        } else {
            props.intMedicineSet(newContent)
        }
        console.log('contentS', contentS)

    }

    return (
        <div className='text-editor'>
            <JoditEditor
                id={'text-editor-dialog'}
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => handleEditor(newContent)} // preferred to use only this option to update the content for performance reasons
            />
        </div>
    )
}

export default PrescTextEditor
