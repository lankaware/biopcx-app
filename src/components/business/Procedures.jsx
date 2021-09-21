import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField, } from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import SearchIcon from '@material-ui/icons/Search'

import { useStyles } from '../../services/stylemui'

import { getList, putRec } from '../../services/apiconnect'

const Procedures = props => {

    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const customStyles = {
        table: {
            style: {
                minHeight: '400px',
                // minWidth: '900px'
            }
        },
        rows: {
            style: {
                minHeight: '30px', // override the row height
            }
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    const columns = [
        {
            name: 'Nome',
            selector: 'name',
            sortable: true,
            width: '30vh',
            cell: row => (<Link to={"/procedure/" + row._id}>{row.name}</Link>)
        },
        {
            name: 'Código CBHPM',
            selector: 'cbhpm',
            sortable: true,
            width: '60vh'
        },
        {
            name: 'Porte',
            selector: 'carry',
            sortable: true,
            width: '10vh',
            right: true,
        },
    ];

    const paginationBr = {
        rowsPerPageText: 'Linhas por página:',
        rangeSeparatorText: 'de',
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todas'
    }
    const classes = useStyles();
    const [list, setList] = useState([])
    const [codprodFilter, setCodProdFilter] = useState('')
    const [discrFilter, setDiscrFilter] = useState('')
    const [saldoFilter, setSaldoFilter] = useState('')
    const [tabelaFilter, setTabelaFilter] = useState('')


    useEffect(() => {
        getList('procedure')
            .then(items => {
                setList(items.record)
            })
    }, [])

    const refreshRec = () => {
        let recObj = {}
        if (codprodFilter) recObj = { 'CODPROD': { "$regex": codprodFilter } }
        if (discrFilter) recObj = { ...recObj, 'DISCR': { "$regex": discrFilter } }
        if (saldoFilter) recObj = { ...recObj, 'SALDO': saldoCondition(saldoFilter) }
        if (tabelaFilter) recObj = { ...recObj, 'TABELA': tabelaCondition(tabelaFilter) }

        recObj = JSON.stringify(recObj)
        putRec('produtos/', recObj)
            .then(items => {
                setList(items.produto)
            })
    }

    const saldoCondition = (saldo) => {
        let pos, val
        pos = saldo.search('>=')
        if (pos > -1) {
            val = parseInt(saldoFilter.substring(pos + 2).trim())
            return ({ "$gte": val })
        }
        pos = saldo.search('<=')
        if (pos > -1) {
            val = parseInt(saldoFilter.substring(pos + 2).trim())
            return ({ "$lte": val })
        }
        pos = saldo.search('>')
        if (pos > -1) {
            val = parseInt(saldoFilter.substring(pos + 1).trim())
            return ({ "$gt": val })
        }
        pos = saldo.search('<')
        if (pos > -1) {
            val = parseInt(saldoFilter.substring(pos + 1).trim())
            return ({ "$lt": val })
        }
        pos = saldo.search('=')
        if (pos > -1) {
            val = parseInt(saldoFilter.substring(pos + 1).trim())
            return ({ "$eq": val })
        }
        val = parseInt(saldoFilter.substring(pos).trim())
        return ({ "$eq": val })
    }

    const tabelaCondition = (tabela) => {
        let pos, val
        pos = tabela.search('>=')
        if (pos > -1) {
            val = parseFloat(tabelaFilter.substring(pos + 2).trim())
            return ({ "$gte": val })
        }
        pos = tabela.search('<=')
        if (pos > -1) {
            val = parseFloat(tabelaFilter.substring(pos + 2).trim())
            return ({ "$lte": val })
        }
        pos = tabela.search('>')
        if (pos > -1) {
            val = parseFloat(tabelaFilter.substring(pos + 1).trim())
            return ({ "$gt": val })
        }
        pos = tabela.search('<')
        if (pos > -1) {
            val = parseFloat(tabelaFilter.substring(pos + 1).trim())
            return ({ "$lt": val })
        }
        pos = tabela.search('=')
        if (pos > -1) {
            val = parseFloat(tabelaFilter.substring(pos + 1).trim())
            return ({ "$eq": val })
        }
        val = parseFloat(tabelaFilter.substring(pos).trim())
        return ({ "$eq": val })
    }

    const handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', state.selectedRows);
    };

    const launchSearch = (e) => {
        if (e.key === 'Enter') {
            document.getElementById("searchButton").click();
        }
    }

    return (
        <div>
            <div className='tool-bar'>
                <div >
                    <Typography variant='h6' className='tool-title'>Lista de Produtos</Typography>
                </div>

                <div className={classes.toolButtons + ' button-link'}>
                    <Box m={1}>
                        <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />}
                            href="/product">INCLUIR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' size='small' variant='contained' startIcon={<KeyboardReturnIcon />}
                            href="/" id='backButton'>VOLTAR
                        </Button>
                    </Box>
                </div>
            </div>
            <div className='tool-bar-filters'>
                <Grid item xs={1}>
                    <Typography variant='h6'>Filtros:</Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={codprodFilter}
                        onChange={(event) => { setCodProdFilter(event.target.value.toUpperCase()) }}
                        id='codprodFilter'
                        label='Código Produto'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={discrFilter}
                        onChange={(event) => { setDiscrFilter(event.target.value.toUpperCase()) }}
                        id='discrFilter'
                        label='Discriminação'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={saldoFilter}
                        onChange={(event) => { setSaldoFilter(event.target.value) }}
                        id='saldoFilter'
                        label='Estoque (>, <, >=, <=, =)'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={tabelaFilter}
                        onChange={(event) => { setTabelaFilter(event.target.value) }}
                        id='tabelaFilter'
                        label='Preço (>, <, >=, <=, =)'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                    />
                </Grid>
                <Button color='primary' size='large' id='searchButton' startIcon={<SearchIcon />}
                    onClick={_ => refreshRec()} >
                </Button>
            </div>
            <div className='data-table'>
                <DataTable
                    // title="Cadastro de Profissionais"
                    noHeader={true}
                    columns={columns}
                    customStyles={customStyles}
                    data={list}
                    // selectableRows 
                    Clicked
                    onSelectedRowsChange={handleChange}
                    keyField={'_id'}
                    highlightOnHover={true}
                    pagination={true}
                    fixedHeader={true}
                    // noContextMenu={true}
                    paginationComponentOptions={paginationBr}
                    paginationPerPage={10}
                />
            </div>

        </div>
    )
}

export default Procedures
