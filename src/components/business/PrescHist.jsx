import React, { useEffect } from 'react';
import {
    Box, Tab, Tabs, Dialog, DialogContent
} from "@mui/material";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';
import TabPanel, { posTab } from '../commons/TabPanel';
import parse from 'html-react-parser';
import { prettyDate } from '../../services/dateutils'

const PrescHist = props => {
    const [tabValue, tabValueSet] = useState(false);
    const [dialog, dialogSet] = useState(false)
    const [dialogText, dialogTextSet] = useState("")
    const prescList = props.prescList

    const deletePresc = () => {
        
    }

    return (
        <>
            <Tabs
                value={tabValue}
                onChange={(event, newValue) => { tabValueSet(newValue) }}
                orientation="vertical"
                variant="scrollable"
                scrollButtons={false}
                sx={{ borderRight: 1, borderColor: 'divider', height: 1 }}
            >
                {/* <List dense={dense}> */}
                    {prescList.map((item, index) => {
                        console.log("date ", item.date, "index:", index);
                        return (
                            <Tab label={prettyDate(item.date)} onClick={() => {
                                dialogSet(true)
                                dialogTextSet(item.prescContent)
                            }} />
                        )

                        // return (
                        //     <ListItem
                        //         secondaryAction={
                        //             <IconButton edge="end" aria-label="delete" onClick={deletePresc(item.id)}>
                        //                 <DeleteIcon />
                        //             </IconButton>
                        //         }
                        //     >
                        //         <ListItemAvatar>
                        //             <Avatar>
                        //                 <FolderIcon />
                        //             </Avatar>
                        //         </ListItemAvatar>
                        //         <ListItemText
                        //             primary="Single-line item"
                        //             secondary={secondary ? 'Secondary text' : null}
                        //         />
                        //     </ListItem>
                        // )
                    })}
                {/* </List> */}
            </Tabs>
            {/* {prescList.map((item, index) => {
                return (
                    <TabPanel value={tabValue} index={index}>{parse(item.prescContent)}</TabPanel>

                )
            })} */}
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

export default PrescHist