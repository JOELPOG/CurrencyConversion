import useCurrencyInfo from "./hooks/useCurrencyInfo"
import { useState } from 'react'
import { InputBox } from './components/index.js'

function App() {
  const [state, setState] = useState({
    amount: 0,
    from: 'usd',
    to: 'inr',
    convertedAmount: 0
  })

  const currencyInfo = useCurrencyInfo(state.from)
  const options = Object.keys(currencyInfo)

  const convert = () => {
    setState((prev) => ({...prev, 
      convertedAmount: prev.amount*currencyInfo[prev.to]
    }))
  }

  const swap = () => {
    setState((prev) => ({...prev, 
      to: prev.from, 
      from: prev.to, 
      convertedAmount: prev.amount, 
      amount: prev.convertedAmount
    }))
  }
  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{backgroundImage: `url(./src/assets/bg.jpg)`}}>
      <div className="w-full ">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}>
            <div className="w-full mb-1">
              <InputBox 
              label="from"
              amount={state.amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => {
                setState((prev) => ({...prev, from: currency}))
              }}
              onAmountChange={(amount) => {
                setState((prev) => ({...prev, amount: amount}))
              }}
              selectedCurrency={state.from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md
              bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox 
              label="to"
              currencyOptions={options}
              amount={state.convertedAmount}
              onCurrencyChnage={(currency) => setState((prev) =>({
                ...prev, to:currency
              }))}
              selectedCurrency={state.to}
              amountDisabled
              />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >Convert {state.from.toUpperCase()} to {state.to.toUpperCase()}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
