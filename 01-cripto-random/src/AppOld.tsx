import { useEffect, useReducer, useState } from 'react'
import './App.css'

const getRandomNumberFromApi = async (): Promise<number> => {
  const response = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
  const data = await response.text();
  return +data;
}

const App = () => {

  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceUpdate] = useReducer(x => x + 1, 0)

useEffect(() => {
  setIsLoading(true);
  getRandomNumberFromApi()
    .then( setNumber )
    .catch( (err) => setError(err.message) )
},[key])

useEffect(() => {
  if (number) setIsLoading(false);
}, [number])

useEffect(() => {
  if (error) setIsLoading(false);
}, [error])

  return (
      <div>
        {
        isLoading 
          ?  <h2>is loading...</h2> 
          : <h2>Random Number: {number}</h2>
         }
         {isLoading && error && <h3>{error}</h3>}

         <button onClick={forceUpdate} disabled={isLoading}>
         {isLoading 
          ?  '...'
          : 'numero random'
         }
         </button>
      </div>
  )
}

export default App
