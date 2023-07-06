import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useQueryClient } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';



interface IssueItemProps {
    issue: Issue;
}

function splitText(text: string, limit:number = 50) {
    if (text?.length > limit) {
        return text.substring(0, limit) + ' ...';
    } else {
        return text;
    }
}

export const IssueItem: FC<IssueItemProps> = ({ issue }) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    
    const prefetchData = () => {

        queryClient.prefetchQuery(
            ['issue', issue.number],
             () => getIssueInfo(issue.number),
        );

        queryClient.prefetchQuery(
            ['issue', issue.number, 'comments'],
             () => getIssueComments(issue.number),
        );

    }

    const preSetData = () => {
        queryClient.setQueryData(
            ['issue', issue.number],
             issue,
             {
                updatedAt: Date.now() + 10000,
             }
        );
    }


    return (
        <div className="card mb-2 issue"
            onClick={() => navigate(`/issues/issue/${issue.number}`)}
            onMouseEnter={preSetData}
            // onMouseEnter={prefetchData}
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Open
                    ? <FiInfo size={30} color="red" />
                    : <FiCheckCircle size={30} color="green" />

                }
                <div className="d-flex flex-column flex-fill px-2">
                    <span>{splitText(issue.title)}</span>
                    <span className="issue-subinfo">#{issue.number} opened 2 days ago by <span className='fw-bold'>{issue.user.login}</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
