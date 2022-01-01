import React from 'react'
import ReactDOM from 'react-dom'
import { compose, pipe } from 'lodash/fp'

const App = (params) => {
  const x = 2

  const double = (number) => number * 2
  const square = (number) => number * number
  const half = (number) => number / 2

  const divide = (num2) => {
    return function (num1) {
      return num1 / num2
    }
  }

  // const mathCalculate = compose(half, square, double)
  const mathCalculate = pipe(double, square, half, divide(3))

  return <h1>{mathCalculate(x)}</h1>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
