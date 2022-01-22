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
        height: 380,
        width: 700,
        useSplitMode: true,
        autofocus: props.autofocus,
    }

    const handleEditor = (newContent) => {
        let contentS = null;
        if (newContent.search("Externo:") !== -1) {
            contentS = newContent.split("Externo:");
            props.extMedicineSet("Externo:" + contentS[1]);
            props.intMedicineSet(contentS[0]);
        }

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
                onChange={newContent => { }}
            />
        </div>
    )
}

export default PrescTextEditor
