
import { useQuery } from "@tanstack/react-query";
import { Issue, State } from "../interfaces";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { useEffect, useState } from "react";

interface Props{
    state?: State;
    labels: string[];
    page?: number;
}

const getIssues = async ( { labels, state, page = 1 }:Props ):Promise<Issue[]> => { 
    await sleep(2);

    const params = new URLSearchParams();
    
    if (state) params.append('state', state);
    if (labels.length) params.append('labels', labels.join(','));

    params.append('per_page', '5');
    params.append('page', page.toString());

    const {data} = await githubApi.get<Issue[]>('/issues',{ params });
    return data;
};


export const useIssues = ( { state, labels }:Props ) => {
  
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
      setPage(1);
    }, [state, labels]);

    const issuesQuery = useQuery(
        ['issues', {state, labels, page}],
        () => getIssues({labels, state, page}),
    );
    
    const nextPage = () => {
      if(issuesQuery.data?.length === 0) return;
      setPage(page + 1);
    }

    const prevPage = () => {
      if(page > 1) setPage(page - 1);
    }

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? 'loading...' : page,
    nextPage,
    prevPage
  };
}
