import React, { useState, useRef } from 'react'
import JoditEditor from "jodit-react"
{/* <script src="jodit/lang/pt.js"></script> */}

const TextEditor = props => {

    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        statusbar: false,
        language: 'pt',
    }

    const handleEditor = (newContent) => {
        console.log('content type', typeof(newContent))
        console.log('content ', newContent)
        setContent(newContent)
    }

    return (
        <div className='container-div'>
            <JoditEditor
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

export default TextEditor