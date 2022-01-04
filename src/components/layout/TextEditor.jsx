import React, { useRef } from 'react'
import JoditEditor from "jodit-react"

const TextEditor = props => {

    const editor = useRef(null)

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
        width: 1000, 
        useSplitMode: true,
        autofocus: props.autofocus,
    }

    const handleEditor = (newContent) => {
        props.textSet(newContent);
    }

    return (
        <div className='text-editor'>
            <JoditEditor
                id={'text-editor-dialog'}
                ref={editor}
                value={props.content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => handleEditor(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
            />
        </div>
    )
}

export default TextEditor