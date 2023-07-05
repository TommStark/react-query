import './App.css'
import { useRandom } from './hooks/useRandom';



const App = () => {

  const query = useRandom();

  return (
      <div>
        {
        query.isFetching 
          ?  <h2>is loading...</h2> 
          : <h2>Random Number: {query.data}</h2>
         }
          
          {query.isLoading && query.isError && <h3> `error`</h3>}
          
         <button onClick={() => query.refetch()} disabled={query.isFetching }>
         {query.isFetching 
          ?  '...'
          : 'numero random'
         }
         </button>
      </div>
  )
}

export default App
