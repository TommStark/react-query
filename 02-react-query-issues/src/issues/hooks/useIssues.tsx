
import { useQuery } from "@tanstack/react-query";
import { Issue, State } from "../interfaces";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";

interface Props{
    state?: State;
    labels: string[];
}

const getIssues = async ( labels:string[], state?:State ):Promise<Issue[]> => { 
    await sleep(2);

    const params = new URLSearchParams();
    
    if (state) params.append('state', state);
    if (labels.length) params.append('labels', labels.join(','));

    params.append('per_page', '5');
    params.append('page', '1');


    const {data} = await githubApi.get<Issue[]>('/issues',{ params });
    return data;
};


export const useIssues = ( { state, labels }:Props ) => {


    const issuesQuery = useQuery(
        ['issues', {state, labels}],
        () => getIssues(labels, state),
    );


  return {
    issuesQuery
  };
}
