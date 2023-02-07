import React from "react";
import { prettyDate } from '../../services/dateutils'

const RepSalespersonLayout = React.forwardRef((props, refs) => {
  var totalValue = 0
  let currentCov = ''
  var printCovValue = 0
  var printCovName = ''
  var covTotal = 0

  const totalCov = (covenant, covValue) => {
    if (currentCov === '') {
      currentCov = covenant
      covTotal = covValue
      totalValue = covValue
      return (
        <>
          <tr key={parseInt(Math.random * 100000)}>
            {/* <td style={{ 'width': '30px' }}></td> */}
            <td style={{ 'textAlign': 'right', 'width': '120px', 'fontWeight': 'bold' }}>Convênio: &nbsp;</td>
            <td style={{ 'textAlign': 'left', 'width': '120px', 'fontWeight': 'bold' }}>{currentCov}</td>
          </tr>
          <tr><td>&nbsp;</td></tr>
        </>
      )
    }
    if (covenant === '*') {
      return (
        <>
          <tr key={parseInt(Math.random * 100000)}>
            {/* <td style={{ 'width': '30px' }}></td> */}
            <td style={{ 'textAlign': 'right', 'width': '120px', 'fontWeight': 'bold' }}>Total &nbsp;</td>
            <td style={{ 'textAlign': 'left', 'width': '120px', 'fontWeight': 'bold' }}>{currentCov}</td>
            {/* <td style={{ 'width': '30px' }}></td> */}
            {/* <td style={{ 'width': '30px' }}></td> */}
            <td style={{ 'textAlign': 'right', 'fontWeight': 'bold' }}>{covTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          </tr>
        </>
      )
    }
    if (currentCov !== covenant) {
      printCovValue = covTotal
      printCovName = currentCov
      currentCov = covenant
      covTotal = covValue
      totalValue += covValue
      // <h5>Convênio: {props.billcovenant} </h5>
      return (
        <>
          <tr key={parseInt(Math.random * 100000)}>
            {/* <td style={{ 'width': '30px' }}></td> */}
            <td style={{ 'textAlign': 'right', 'width': '120px', 'fontWeight': 'bold' }}>Total &nbsp;</td>
            <td style={{ 'textAlign': 'left', 'width': '120px', 'fontWeight': 'bold' }}>{printCovName}</td>
            {/* <td style={{ 'width': '30px' }}></td> */}
            {/* <td style={{ 'width': '30px' }}></td> */}
            <td style={{ 'textAlign': 'right', 'fontWeight': 'bold' }}>{printCovValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          </tr>
          <tr><td>&nbsp;</td></tr>
          <tr key={parseInt(Math.random * 100000)}>
            {/* <td style={{ 'width': '30px' }}></td> */}
            <td style={{ 'textAlign': 'right', 'width': '120px', 'fontWeight': 'bold' }}>Convênio: &nbsp;</td>
            <td style={{ 'textAlign': 'left', 'width': '120px', 'fontWeight': 'bold' }}>{currentCov}</td>
          </tr>
          <tr><td>&nbsp;</td></tr>
        </>
      )
    } else {
      covTotal += covValue
      totalValue += covValue
    }
  }

  return (
    <div ref={refs} style={{ 'marginLeft': '20px' }}>
      <h1>&nbsp;</h1>
      <h4>Biopace</h4>
      <h5>Período: {prettyDate(props.dateInit)} a {prettyDate(props.dateEnd)}</h5>
      {/* <h3>&nbsp;</h3> */}
      <table>
        <thead>
          <tr key={parseInt(Math.random * 100000)}><td>&nbsp;</td></tr>
          <tr >
            <td style={{ 'width': '100px', 'fontWeight': 'bold' }}>Data</td>
            <td style={{ 'textAlign': 'left', 'width': '300px', 'fontWeight': 'bold' }}>Paciente</td>
            <td style={{ 'textAlign': 'left', 'width': '200px', 'fontWeight': 'bold' }}>Procedimento</td>
            <td style={{ 'textAlign': 'left', 'width': '200px', 'fontWeight': 'bold' }}>Plano</td>
            <td style={{ 'textAlign': 'right', 'width': '180px', 'fontWeight': 'bold' }}>Valor</td>
            <td style={{ 'width': '30px' }}></td>
          </tr>
        </thead>
        <tbody>
          <tr key={parseInt(Math.random * 100000)}><td>&nbsp;</td></tr>
          {props.list.map((item, index) => {
            return (
              <>
                {totalCov(item.covenant_name[0], item.amount)}
                <tr key={index}>
                  <td style={{ 'textAlign': 'rileft' }}>{prettyDate(item.attendanceDate)}</td>
                  <td style={{ 'textAlign': 'left' }}>{item.patient_name}</td>
                  <td style={{ 'textAlign': 'left' }}>{item.procedure_name}</td>
                  <td style={{ 'textAlign': 'left' }}>{item.covenantplan_name}</td>
                  <td style={{ 'textAlign': 'right' }}>{item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                </tr>
              </>
            )
          })}
          {totalCov('*', 0)}
          <tr key={parseInt(Math.random * 100000)}><td>&nbsp;</td></tr>
          <tr key={parseInt(Math.random * 100000)}><td>&nbsp;</td></tr>
          {/* <tr key={10009}>
            <td style={{ 'textAlign': 'left', 'fontWeight': 'bold' }}>Valor Total: {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          </tr> */}
        </tbody>
      </table>
      <h5>Valor Total Geral: {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
    </div>
  )
})

export default RepSalespersonLayout