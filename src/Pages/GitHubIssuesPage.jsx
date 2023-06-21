import React, { useEffect, useState } from "react";
import PaginatedIssues from "../Components/PaginatedIssues";
import { CircularProgress } from "@mui/material";
import { IssueContent } from "../Components/IssueContent";
export const GitHubIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, [currentPage]);
  const fetchIssues = async () => {
    try {
      setloading(true);
      const response = await fetch(
        `https://api.github.com/repos/microsoft/WSL/issues?page=${currentPage}&per_page=25`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      setIssues(data);
      setloading(false);
      const linkHeader = response.headers.get("Link");
      if (linkHeader) {
        const totalPagesMatch = linkHeader.match(
          /page=(\d+)&per_page=25>;\srel="last"/
        );
        if (totalPagesMatch) {
          setTotalPages(parseInt(totalPagesMatch[1]));
        }
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div
        style={{
          marginTop: "200px",
        }}
      >
        <CircularProgress size={75} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="issues-list">
        <div className="issues-list__body">
          {issues.map((issue, idx) => (
            <IssueContent
              key={issue.id}
              issue={issue}
              idx={idx}
              issues={issues}
            />
          ))}
        </div>
      </div>
      <div>
        <PaginatedIssues
          currentPage={currentPage}
          totalPages={totalPages}
          handleClick={handlePageChange}
        />
      </div>
    </div>
  );
};
