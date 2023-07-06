import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";



const getLabels = async ():Promise<Label[]> => {

    await sleep(2);
    const {data} = await githubApi.get('/labels');
    return data;
}


export const useLabels = () => {

    const labelsQuery = useQuery(
        ['labels'],
         getLabels,
          {
        // refetchOnWindowFocus: true,
        // staleTime: 1000 * 60 * 60,
        placeholderData: [
            {
                "id": 52079258,
                "node_id": "MDU6TGFiZWw1MjA3OTI1OA==",
                "url": "https://api.github.com/repos/facebook/react/labels/Difficulty:%20starter",
                "name": "Difficulty: starter",
                "color": "94ce52",
                "default": false,
            },
            {
                "id": 725156255,
                "node_id": "MDU6TGFiZWw3MjUxNTYyNTU=",
                "url": "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
                "name": "good first issue (taken)",
                "color": "b60205",
                "default": false,
            }
        ],
        // initialData: [
        //     {
        //         "id": 52079258,
        //         "node_id": "MDU6TGFiZWw1MjA3OTI1OA==",
        //         "url": "https://api.github.com/repos/facebook/react/labels/Difficulty:%20starter",
        //         "name": "Difficulty: starter",
        //         "color": "94ce52",
        //         "default": false,
        //     },
        //     {
        //         "id": 725156255,
        //         "node_id": "MDU6TGFiZWw3MjUxNTYyNTU=",
        //         "url": "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
        //         "name": "good first issue (taken)",
        //         "color": "b60205",
        //         "default": false,
        //     }
        // ],
      });


    return labelsQuery;
}