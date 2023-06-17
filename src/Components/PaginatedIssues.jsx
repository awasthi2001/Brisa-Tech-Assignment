import React from 'react';
import usePagination from '@mui/material/usePagination/usePagination';
import '../Styles/Pagination.css'
import { styled } from "@mui/material/styles";
const List = styled("ul")({
  listStyle: "none",
  gap: 5,
  padding: 0,
  margin: 0,
  display: "flex"
});

const PaginatedIssues = ({ totalPages, currentPage, handleClick }) => {
    const { items } = usePagination({
        count: totalPages,
        onChange: (event, page) => handleClick(page),
        page : currentPage || 1
      });
      return (
        <div className='Pagination-container' >
          <List>
            {items.map(({ page, type, selected, ...item }, index) => {
              //  console.log(item)
              let children = null;
              if (type === "start-ellipsis" || type === "end-ellipsis") {
                children = "…";
              } else if (type === "page") {
                children = (
                  <button
                    type="button"
                    
                    style={{
                      backgroundColor: selected ? "#0969da" : 'transparent',
                      color: selected ? "white" : "black",

                    }}
                    className={selected?'button-numbers2':'button-numbers'}
                    {...item}
                  >
                    {page}
                  </button>
                );
              } else {
                children = (
                  <button
                    type="button"
                     {...item}
                    className='Pagination-button'
                  >
                    {type === "previous" ? "< Previous" : "Next >"}
                  </button>
                );
              }
    
              return <li key={index}>{children}</li>;
            })}
          </List>
        </div>
      );
};

export default PaginatedIssues;
