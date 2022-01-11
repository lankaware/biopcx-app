import React, { useEffect } from 'react';
import {
    Box, Tab, Tabs, Dialog, DialogContent
} from "@mui/material";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';
// import { getList, putRec } from "../../services/apiconnect";
// import { prettyDate } from '../../services/dateutils';
import TabPanel, { posTab } from '../commons/TabPanel';
import parse from 'html-react-parser';
import { prettyDate } from '../../services/dateutils'

const PrescHist = props => {
    const [tabValue, tabValueSet] = useState(false);
    const [dialog, dialogSet] = useState(false)
    const [dialogText, dialogTextSet] = useState("")

    console.log("prescHist list", props.prescList)
    const prescList = props.prescList


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
                {prescList.map((item, index) => {
                    console.log("date ", item.date, "index:", index);
                    return (
                        <Tab label={prettyDate(item.date)} onClick={() => {
                            dialogSet(true)
                            dialogTextSet(item.prescContent)
                        }} /> // openPopper(item.prescContent) onClick={}
                    )
                })}
            </Tabs>
            {/* {prescList.map((item, index) => {
                return (
                    <TabPanel value={tabValue} index={index}>{parse(item.prescContent)}</TabPanel>

                )
            })} */}
                <Dialog open={dialog} onClose={() => {dialogSet(false)}} >
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