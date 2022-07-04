import React from "react";
import { prettyDate } from '../../services/dateutils'

const RepSalespersonLayout = React.forwardRef((props, refs) => {
  let currentMonth = ''
  let totalValue = 0
  let printValue = 0

  let currentSalesperson = ''
  let personValue = 0
  let printPersonValue = 0
  let printSalesperson = ''

  const totalMonth = (month, person, valor) => {
    if (currentMonth === '') {
      currentMonth = month
    }
    if (currentMonth !== month || currentSalesperson !== person) {
      printValue = totalValue

      personValue = personValue + totalValue

      totalValue = valor || 0
      currentMonth = month

      if (printValue !== 0) {
        return (
          <>
            <tr key={10001}>
              <td style={{ 'width': '30px' }}></td>
              <td style={{ 'width': '30px' }}></td>
              <td style={{ 'width': '30px' }}></td>
              <td style={{ 'textAlign': 'left', 'width': '120px', 'fontWeight': 'bold' }}>Total no Mês</td>
              {/* <td style={{ 'width': '30px' }}></td> */}
              <td style={{ 'textAlign': 'right', 'fontWeight': 'bold' }}>{printValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
            <tr key={10002}><td>&nbsp;</td></tr>
          </>
        )
      }
    } else {
      totalValue = totalValue + valor || 0
    }
  }

  const totalPerson = (person, valor) => {
    if (currentSalesperson === '') {
      currentSalesperson = person
      return (
        <>
          <tr key={10003}>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'textAlign': 'left', 'width': '120px', 'fontWeight': 'bold' }}>Vendedor: {person}</td>
            {/* <td style={{ 'width': '120px' }}>{person}</td> */}
          </tr>
        </>
      )
    }
    if (currentSalesperson !== person) {
      printPersonValue = personValue
      printSalesperson = currentSalesperson

      personValue = 0
      currentSalesperson = person

      const nextPerson = (person !== '' ? 'Vendedor: ' + person : '')
      return (
        <>
          <tr key={10004}>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'textAlign': 'left', 'width': '280px', 'fontWeight': 'bold' }}>Total do Vendedor {printSalesperson}</td>
            {/* <td style={{ 'width': '30px' }}></td> */}
            <td style={{ 'textAlign': 'right', 'fontWeight': 'bold' }}>{printPersonValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          </tr>
          <tr key={10005}><td>&nbsp;</td></tr>
          <tr key={10006}>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'width': '30px' }}></td>
            <td style={{ 'textAlign': 'left', 'width': '120px', 'fontWeight': 'bold' }}>{nextPerson}</td>
          </tr>

        </>
      )
    }
  }

  const personTitle = () => {
    return (props.billcovenant === '*' ? '(todos)' : props.billcovenant)
  }
  
  return (
    <div ref={refs} style={{ 'marginLeft': '20px' }}>
      <h4>Biopace</h4>
      <h4>Convênio: {personTitle()} </h4>
      <h4>Período: {prettyDate(props.dateInit)} a {prettyDate(props.dateEnd)}</h4>
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
            return (
              <>
                {/* {totalMonth(item.DATA.substr(5, 2), item.VENDEDOR, item.TOTAL)}
                {totalPerson(item.VENDEDOR, item.TOTAL)} */}
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
          {totalMonth('', 0)}
          {totalPerson('', 0)}
        </tbody>
      </table>
    </div>
  )
})

export default RepSalespersonLayout