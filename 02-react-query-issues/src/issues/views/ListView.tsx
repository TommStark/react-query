import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';


export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>()
  const { issuesQuery, page, nextPage, prevPage} = useIssues({state, labels: selectedLabels});

  const onLabelChanged = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter(l => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  }

  return (
    <div className="row mt-5">
      <div className="col-8">
        {
          issuesQuery.isLoading 
            ? ( <LoadingIcon/> ) 
            : ( 
            <IssueList  
              issues={issuesQuery.data || []}
              state={state}
              onStateChange={(newState?: State) => setState(newState)}
            /> )
        }
        {
          issuesQuery.isError && (
            <div className="alert alert-danger">
              Error fetching issues
            </div>
          )
        }
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button 
            className='btn btn-outline-primary'
            onClick={prevPage}
            disabled={issuesQuery.isFetching}
          >Prev</button>
          <span>{ page }</span>
          <button 
            className='btn btn-outline-primary'
            onClick={nextPage}  
            disabled={issuesQuery.isFetching} 
          >Next</button>
        </div>
      </div>
      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={ (labelName: string)=> onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
