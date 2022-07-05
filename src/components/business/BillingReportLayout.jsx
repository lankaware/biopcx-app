import React from "react";
import { prettyDate } from '../../services/dateutils'

const RepSalespersonLayout = React.forwardRef((props, refs) => {
  let totalValue = 0

  let currentMonth = ''
  let printValue = 0
  let currentSalesperson = ''
  let personValue = 0
  let printPersonValue = 0
  let printSalesperson = ''

  const personTitle = () => {
    return (props.billcovenant === '*' ? '(todos)' : props.billcovenant)
  }

  return (
    <div ref={refs} style={{ 'marginLeft': '20px' }}>
      <h1>&nbsp;</h1>
      <h4>Biopace</h4>
      <h5>Convênio: {personTitle()} </h5>
      <h5>Período: {prettyDate(props.dateInit)} a {prettyDate(props.dateEnd)}</h5>
      {/* <h3>&nbsp;</h3> */}
      <table>
        <thead>
          <tr key={10007}><td>&nbsp;</td></tr>
          <tr >
            <td style={{ 'width': '100px', 'fontWeight': 'bold' }}>Data</td>
            <td style={{ 'textAlign': 'left', 'width': '300px', 'fontWeight': 'bold' }}>Paciente</td>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'textAlign': 'left', 'width': '200px', 'fontWeight': 'bold' }}>Procedimento</td>
            <td style={{ 'textAlign': 'left', 'width': '200px', 'fontWeight': 'bold' }}>Plano</td>
            <td style={{ 'textAlign': 'right', 'width': '180px', 'fontWeight': 'bold' }}>Valor</td>
            <td style={{ 'width': '30px' }}></td>
          </tr>
        </thead>
        <tbody>
          <tr key={10008}><td>&nbsp;</td></tr>
          {props.list.map((item) => {
            totalValue += item.amount
            return (
              <>
                <tr key={item._id}>
                  <td style={{ 'textAlign': 'rileft' }}>{prettyDate(item.attendanceDate)}</td>
                  <td style={{ 'textAlign': 'left' }}>{item.patient_name}</td>
                  <td style={{ 'width': '30px' }}></td>
                  <td style={{ 'textAlign': 'left' }}>{item.procedure_name}</td>
                  <td style={{ 'textAlign': 'left' }}>{item.covenantplan_name}</td>
                  <td style={{ 'textAlign': 'right' }}>{item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                </tr>
              </>
            )
          })}
          <tr key={10009}><td>&nbsp;</td></tr>
          <tr key={10010}><td>&nbsp;</td></tr>
          {/* <tr key={10009}>
            <td style={{ 'textAlign': 'left', 'fontWeight': 'bold' }}>Valor Total: {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          </tr> */}
        </tbody>
      </table>
      <h5>Valor Total: {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
    </div>
  )
})

export default RepSalespersonLayout