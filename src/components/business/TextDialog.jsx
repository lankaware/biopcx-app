import React, { useState, useEffect } from 'react'
import {
    Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText
} from "@mui/material";
import DataTable from 'react-data-table-component'

import { getList } from '../../services/apiconnect'
import { customStyles1, paginationBr } from '../../services/datatablestyle'

import TextEditor from "../layout/TextEditor";
import { defaultDateBr, prettyDate } from '../../services/dateutils';
import { parseTextMacro } from '../../services/textutils';

const TextDialog = props => {

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
            let uptoDated = prettyDate(defaultDateBr().substr(0,10))
            textContentSet(`${props.textContent} <strong>${uptoDated}:</strong><p> </p>`)
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
                console.log('newText', newText);
                textContentSet(textContent + newText);
                confirmDialogSet(false);
                editorFocusSet(true);
                loadDialogSet(false);
                document.getElementById('text-editor-dialog').focus();
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

    const updateOriginText = () => {
        props.textContentSet(textContent)
        props.setEditMode(true); 
        props.textDialogSet(false);
    }

    const cancelUpdateText = () => {
        textContentSet(props.textContent)
        props.setEditMode(true); 
        props.textDialogSet(false);
    }

    return (
        <>
            <Dialog open={props.textDialog} maxWidth={false}>
                <DialogTitle id="alert-dialog-title">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            {props.textTitle}
                        </Grid>
                        <Grid item xs={4} sx={{ alignContent: "right" }}>
                            <Button onClick={loadDialogOpen} color="primary" variant="outlined">
                                Carregar Texto Padrão
                            </Button>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <TextEditor 
                    content={textContent} 
                    textSet={textContentSet}
                    autofocus={editorFocus}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateOriginText} color="primary" variant="contained" size='small'>
                        Salvar
                    </Button>
                    <Button onClick={cancelUpdateText} color="secondary" variant="contained" size='small'>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={loadDialog} maxWidth={false}>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={loadTextConfirm} color="primary" variant="contained" autoFocus size='small'>
                        Confirmar
                    </Button>
                    <Button onClick={confirmDialogClose} color="secondary" variant="contained" size='small'>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default TextDialog