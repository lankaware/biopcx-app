import React, { useRef, useState, useEffect } from 'react'
import JoditEditor from "jodit-react"

const ReqTextEditor = props => {

    const [content, contentSet] = useState("")

    const editor = useRef(null)

    useEffect(() => {
        contentSet(props.reqText)

    }, [props.reqText]);

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
        width: 680,
        useSplitMode: true,
        autofocus: props.autofocus,
    }

    const handleEditor = (newContent) => {
        props.reqTextSet(newContent)

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

export default ReqTextEditor