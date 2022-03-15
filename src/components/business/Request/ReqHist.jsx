import React, { useEffect, useState } from 'react';
import {
    Box, Dialog, Avatar, DialogContent, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, IconButton
} from "@mui/material";
import parse from 'html-react-parser';

import { prettyDate } from '../../../services/dateutils'

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ReqHist = props => {
    const [dialog, dialogSet] = useState(false)
    const [dialogText, dialogTextSet] = useState("")
    const [update, updateSet] = useState(false)
    const reqList = props.reqList
    const reqListSet = props.reqListSet
    const reqTextSet = props.reqTextSet

    useEffect(() => {
        updateSet(false)
    }, [update]);

    const deleteReq = (item) => {
        var array = reqList;
        array.splice(array.indexOf(item), 1);
        reqListSet(array);
        updateSet(true)
    }

    const openText = (content) => {
        reqTextSet(content)
        updateSet(true)
    }

    return (
        <>
            <List style={{ maxHeight: '100%', overflow: 'auto' }}>

                {reqList && reqList.map((item, index) => {
                    return (
                        <ListItem
                            secondaryAction={
                                <Box>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteReq(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="Open">
                                        <SendIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="Open" onClick={() => openText(item.reqContent)}>
                                        <OpenInNewIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemButton onClick={() => {
                                dialogSet(true)
                                dialogTextSet(item.reqContent)
                            }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ReceiptLongIcon />
                                    </Avatar>
                                </ListItemAvatar>
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
        </>
    )
}

export default ReqHist