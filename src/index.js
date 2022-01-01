import React from 'react'
import ReactDOM from 'react-dom'

const App = (params) => {
  // const arr = [' some', '  new', ' data']

  // function formatArray(el){return el + ' some'}

  // function someFn(func) {
  //   return function () {
  //     return 'Apps'
  //   }
  // }

  // const fn = someFn()

  // function fn(func) {
  //   return func()
  // }

  // return <h1>{arr.map(formatArray)}</h1>
  return <h1>App</h1>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
