import React, { useEffect, useState } from 'react';
import {
    Box, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, List, ListItem, ListItemButton, ListItemText, 
    IconButton, Button
} from "@mui/material";
import parse from 'html-react-parser';

import { prettyDate } from '../../../services/dateutils'

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const PrescHist = props => {
    const [dialog, dialogSet] = useState(false)
    const [dialogText, dialogTextSet] = useState("")
    const [update, updateSet] = useState(false)
    const prescList = props.prescList
    const prescListSet = props.prescListSet
    const extMedicineSet = props.extMedicineSet
    const intMedicineSet = props.intMedicineSet
    const [deleteDialog, setDeleteDialog] = useState(false);

    useEffect(() => {
        updateSet(false)
    }, [update]);

    const deletePresc = () => {
        setDeleteDialog(true);
    };

    const delConfirm = (item) => {
        var array = prescList;
        array.splice(array.indexOf(item), 1);
        prescListSet(array);
        updateSet(true)
        setDeleteDialog(false);
    }

    const delCancel = () => {
        setDeleteDialog(false);
    };

    const openText = (content) => {
        let contentS = null;
        if (content.search("Uso externo:") !== -1) {
            contentS = content.split("Uso externo:");
            console.log(contentS, content);
            extMedicineSet("Uso externo:" + contentS[1]);
            intMedicineSet(contentS[0]);
        } else {
            intMedicineSet(content);
        }
        updateSet(true)
    }

    return (
        <>
            <List dense={true} style={{ maxHeight: '100%', overflow: 'auto' }}>
                {prescList.map((item, index) => {
                    return (
                        <ListItem
                            disablePadding={true}
                            key={index}
                            secondaryAction={
                                <Box>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deletePresc(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="Open" onClick={() => openText(item.prescContent)}>
                                        <OpenInNewIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemButton onClick={() => {
                                dialogSet(true)
                                dialogTextSet(item.prescContent)
                            }}>
                                {/* <ListItemAvatar>
                                    <Avatar>
                                        <ReceiptLongIcon />
                                    </Avatar>
                                </ListItemAvatar> */}
                                <ListItemText
                                    primary={prettyDate(item.date)}
                                />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Dialog open={dialog} onClose={() => { dialogSet(false) }} >
                <DialogContent >
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', minWidth: 296, minHeight: 420 }}>
                        {parse(dialogText)}
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"Apagar a receita selecionada?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Após confirmada essa operação não poderá ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={delCancel} color="primary" variant="contained" autoFocus>Cancelar</Button>
                    <Button onClick={delConfirm} color="secondary" variant="contained">Confirmar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PrescHist