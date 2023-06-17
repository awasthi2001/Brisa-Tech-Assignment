import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CommentIcon, IssueOpenedIcon } from '@primer/octicons-react';
import './GitHubIssuesPage.css';
import {Link} from 'react-router-dom'
export const GitHubIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchIssues();
  }, [currentPage]);

  const fetchIssues = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/microsoft/WSL/issues?page=${currentPage}`);
      const data = await response.json();
      console.log(data)
      setIssues(data);
      const linkHeader = response.headers.get('Link');
      if (linkHeader) {
        const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (totalPagesMatch) {
          setTotalPages(parseInt(totalPagesMatch[1]));
        }
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-lg">
      <div className="issues-listing">
        <div className="issues-listing__body">
          {issues.map((issue) => (
            <div className="Box" key={issue.id}>
              <div className="Box-body">
                <div className="Box-row">
                  <h4 className="issue-title">
                 <span className='open-issue-icon'><IssueOpenedIcon size={16}/></span>
                    <Link to={`/issue/${issue.id}`} title={issue.title} >{issue.title}</Link>
                  </h4>
                  <span className="issue-meta__comments" style={{
                    
                  }}>
                    {
                      issue.comments!=0 ? <CommentIcon size={16} /> : ""
                    }               
                    {issue.comments!=0?<span className='comment-numbers'>{issue.comments}</span>:""}
                  </span>
                </div>

                <div className="Box-row2">
                  <span className="issue-meta">
                  <span className="issue-meta__details">
                    #{issue.number} opened {formatDistanceToNow(new Date(issue.created_at))} by {issue.user.login}
                  </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <div className="pagination__container">
            <button
              className={`btn btn-outline BtnGroup-item ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`btn btn-outline BtnGroup-item ${pageNumber === currentPage ? 'selected' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className={`btn btn-outline BtnGroup-item ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


