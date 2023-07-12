import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesInfinite } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';


export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>()
  const { issuesQuery } = useIssuesInfinite({state, labels: selectedLabels});

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
              issues={issuesQuery.data?.pages.flat() || []}
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
        <button 
            className='btn btn-outline-primary mt-2'
            onClick={() => issuesQuery.fetchNextPage()}
            disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
            >
          loadMore
        </button>
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
