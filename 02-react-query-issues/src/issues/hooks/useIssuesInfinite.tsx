import { useInfiniteQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers";
import { Issue, State } from "../interfaces";


interface Props{
    state?: State;
    labels: string[];
    page?: number;
}

interface QueryProps{
    pageParams?: number;
    queryKey:(string | Props)[];
}

const getIssues = async ( {pageParams = 1, queryKey}:QueryProps ):Promise<Issue[]> => { 

    const [,,args] = queryKey;
    const { labels, state } = args as Props;

    await sleep(2);

    const params = new URLSearchParams();
    
    if (state) params.append('state', state);
    if (labels.length) params.append('labels', labels.join(','));

    params.append('per_page', '5');
    params.append('page', pageParams.toString());

    const {data} = await githubApi.get<Issue[]>('/issues',{ params });
    return data;
};



export const useIssuesInfinite = ({ state, labels }:Props) => {

    const issuesQuery = useInfiniteQuery(
        ['issues','infinite', {state, labels}],
        (data) => getIssues(data),
        {
            getNextPageParam: (lastPage, pages) => {
                if(lastPage.length === 0) return undefined;
                return pages.length + 1;
            }
        }
    );


  return { issuesQuery } ;
}
