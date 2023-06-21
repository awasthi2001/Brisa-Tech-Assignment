import React from "react";
import { formatDistanceToNow } from "date-fns";
import { CommentIcon, IssueOpenedIcon } from "@primer/octicons-react";
import "../Styles/GitHubIssuesPage.css";
import { Link } from "react-router-dom";
export const IssueContent = ({ issue, idx, issues }) => {
  return (
    <div
      className="Box"
      key={issue.id}
      style={{
        borderBottom: issues.length - 1 === idx ? "none" : "1px solid #e1e4e8",
      }}
    >
      <div className="Box-body">
        <div className="Box-row">
          <h5 className="issue-title">
            <span className="open-issue-icon">
              <IssueOpenedIcon size={15} />
            </span>
            <Link to={`https://github.com/microsoft/WSL/issues/10210`}>
              {issue.title}
            </Link>
          </h5>
          <span className="issue__comments">
            {issue.comments != 0 ? <CommentIcon size={16} /> : ""}
            {issue.comments != 0 ? (
              <span className="comment-numbers">{issue.comments}</span>
            ) : (
              ""
            )}
          </span>
        </div>

        <div className="Box-row2">
          <span className="issue">
            <span className="issue__details">
              #{issue.number} opened{" "}
              {formatDistanceToNow(new Date(issue.created_at))} by{" "}
              <span className="user">{issue.user.login}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
