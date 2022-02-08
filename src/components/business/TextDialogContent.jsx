import React, { useState, useEffect, useRef } from 'react'
import {
    Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Box, Typography
} from "@mui/material";
import DataTable from 'react-data-table-component'
import JoditEditor from "jodit-react"

import { getList } from '../../services/apiconnect'
import { customStyles1, paginationBr } from '../../services/datatablestyle'

// import TextEditor from "../layout/TextEditor";
import { defaultDateBr, prettyDate } from '../../services/dateutils';
import { parseTextMacro } from '../../services/textutils';

const TextDialogContent = props => {

    const [loadDialog, loadDialogSet] = useState(false)
    const [textApplied, textAppliedSet] = useState('')
    const [textList, textListSet] = useState('')
    const [confirmDialog, confirmDialogSet] = useState(false)
    const [selectText, selectTextSet] = useState('')
    const [textContent, textContentSet] = useState('')
    const [editorFocus, editorFocusSet] = useState(true)

    useEffect(() => {
        getList('texttemplate/')
            .then(items => {
                textListSet(items.record)
            })
    }, [])

    useEffect(() => {
        let uptoDated = prettyDate(defaultDateBr())
        if (props.textContent && !props.textContent.includes(uptoDated)) {
            textContentSet(`${props.textContent} <strong>${uptoDated}:</strong><p> </p>`)
        } else {
            textContentSet(`${props.textContent}`)
        }

    }, [props.textContent])

    const columns = [
        {
            name: 'Nome',
            selector: row => row.name,
            sortable: true,
            width: '20vw',
        },
        {
            name: 'Tipo',
            selector: row => row.type,
            sortable: true,
            width: '10vw',
        },
    ]

    const loadDialogOpen = () => {
        editorFocusSet(false)
        loadDialogSet(true)
    }

    const loadText = (textName, textToLoad) => {
        selectTextSet(textName)
        textAppliedSet(textToLoad)
        confirmDialogSet(true)
    }

    const loadTextConfirm = async function () {
        await parseTextMacro(textApplied, props.patientId)
            .then(newText => {
                textContentSet(textContent + newText);
                console.log('newText', props.textContent + newText);
                confirmDialogSet(false);
                loadDialogSet(false);
                editorFocusSet(true);
                // document.getElementById('text-editor-dialog').focus();
            });
    }

    const loadDialogClose = () => {
        confirmDialogSet(false)
        editorFocusSet(true)
        loadDialogSet(false)
        document.getElementById('text-editor-dialog').focus();
    }

    const confirmDialogClose = () => {
        confirmDialogSet(false)
    }

    const editor = useRef(null)

    const config = {
        readonly: false, // props.disabled, // all options from https://xdsoft.net/jodit/doc/
        statusbar: false,
        language: 'pt_br',
        removeButtons: [
            'fullsize',
            'dots',
            'source',
        ],
        height: 380,
        width: 980,
        useSplitMode: true,
        autofocus: editorFocus,
    }

    const handleEditor = (newContent) => {
        props.textContentSet(newContent);
    }

    return (
        <>
            <DialogContent>
                <Box display="flex" backgroundColor={props.textColor}>
                    <Box >
                        <Typography
                            variant="h5"
                            className="tool-title2"
                            noWrap={true}
                            sx={{color: '#fff', 'padding': '10px'}}
                        >
                            {props.textTitle}
                        </Typography>
                    </Box>
                    <Box m={1}>
                        <Button onClick={loadDialogOpen} variant="outlined" sx={{backgroundColor: '#fff'}}>
                            Carregar Texto Padrão
                        </Button>
                    </Box>
                </Box>
                <Box display="flex">

                    <div className='text-editor'>
                        <JoditEditor
                            id={'text-editor-dialog'}
                            ref={editor}
                            value={textContent}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => handleEditor(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => { }}
                        />
                    </div>

                </Box>
            </DialogContent>

            <Dialog open={loadDialog} maxWidth={'md'}>
                <DialogTitle id="alert-dialog-title">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            Textos Padrões
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <div >
                        <DataTable
                            // title=""
                            noHeader={true}
                            columns={columns}
                            customStyles={customStyles1}
                            data={textList}
                            //selectableRows 
                            Clicked
                            // onSelectedRowsChange={handleChange}
                            keyField={'_id'}
                            highlightOnHover={true}
                            pagination={false}
                            fixedHeader={true}
                            // noContextMenu={true}
                            paginationComponentOptions={paginationBr}
                            paginationPerPage={10}
                            noDataComponent={'Nenhum registro disponível.'}
                            onRowClicked={(row, event) => { loadText(row.name, row.text) }}
                        />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={loadDialogClose} color="secondary" variant="contained" size='small'>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"Confirma o carregamento do texto selecionado?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {selectText}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={loadTextConfirm} color="primary" variant="contained" autoFocus size='small'>
                            Confirmar
                        </Button>
                        <Button onClick={confirmDialogClose} color="secondary" variant="contained" size='small'>
                            Cancelar
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default TextDialogContent