import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CommentIcon, IssueOpenedIcon } from '@primer/octicons-react';
import '../Styles/GitHubIssuesPage.css';
import {Link} from 'react-router-dom'
import PaginatedIssues from '../Components/PaginatedIssues';
export const GitHubIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading,setloading] = useState(false)

  useEffect(() => {
    fetchIssues();
  }, [currentPage]);

  const fetchIssues = async () => {
    try {
      setloading(true)
      const response = await fetch(`https://api.github.com/repos/microsoft/WSL/issues?page=${currentPage}`);
      const data = await response.json();
      setIssues(data);
      setloading(false)
      const linkHeader = response.headers.get('Link');
      if (linkHeader) {
        const totalPagesMatch = linkHeader.match(/page=(\d+)>;\srel="last"/);
        if (totalPagesMatch) {
          setTotalPages(parseInt(totalPagesMatch[1]));
        }
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    console.log('pagenumber',pageNumber)
    setCurrentPage(pageNumber);
  };

  if(loading){
    return <h1>...loading</h1>
  }
  return (
    <div className="container">
      <div className="issues-list">
        <div className="issues-list__body">
          {issues.map((issue,idx) => (
            <div className="Box" key={issue.id} style={{
              borderBottom : issues.length-1===idx ?'none': "1px solid #e1e4e8"
            }}>
              <div className="Box-body">
                <div className="Box-row">
                  <h5 className="issue-title">
                 <span 
                 className='open-issue-icon'><IssueOpenedIcon size={15}/></span>
                    <Link to={`/issue/${issue.id}`} title={issue.title} >{issue.title}</Link>
                  </h5>
                  <span className="issue__comments">
                    {
                      issue.comments!=0 ? <CommentIcon size={16} /> : ""
                    }               
                    {issue.comments!=0?<span className='comment-numbers'>{issue.comments}</span>:""}
                  </span>
                </div>

                <div className="Box-row2">
                  <span className="issue">
                  <span className="issue__details">
                    #{issue.number} opened {formatDistanceToNow(new Date(issue.created_at))} by {issue.user.login}
                  </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
       
      </div>
      <div>
      <PaginatedIssues currentPage={currentPage} totalPages={totalPages} handleClick={handlePageChange}/>
      </div>
    </div>
  );
};




// <Pagination count={10} shape="rounded" color="primary" renderItem={(item) => (
//   <PaginationItem
//     component={IconButton}
//     // onClick={item.page === 'previous' ? handlePreviousClick : handleNextClick}
//   >
//     {/* {item.page === 'previous' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
//   </PaginationItem>
// )}  />
