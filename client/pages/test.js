import React from 'react'
import './styled.js'
import { KeyTest } from './styled.js'

function AutoGrowInput({ value, onChange }) {
  return (
    <div
      className="auto-grow-input"
      style={{
        display: 'inline-grid',
        alignItems: 'center',
        justifyItems: 'start',
        padding: 8,
        border: '1px solid #ccc',
        borderRadius: 4,
        minWidth:'20px'
      }}
    >
      <input
        value={value}
        placeholder='키워드'
        onChange={(event) => onChange(event.target.value)}
        style={{
          gridArea: '1 / 1 / 1 / 1',
          width: '100%',
          padding: 0,
          border: 'none',
        }}
      />
      <span
        style={{
          gridArea: '1 / 1 / 1 / 1',
          visibility: 'hidden',
        }}
      >
        {value}
      </span>
    </div>
  )
}


export default function App() {
  const [value, setValue] = React.useState('')

  return (
    <div className="App">
        <KeyTest>
      <h2>Input</h2>
      <AutoGrowInput value={value} onChange={setValue} />

        </KeyTest>
    </div>
  )
}
