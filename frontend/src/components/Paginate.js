import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  useEffect(() => {}, [pages, page]);

  return (
    pages > 1 && (
      <div className='d-flex justify-content-center'>
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/ordernow/page/${x + 1}`
                  : `/admin/menulist/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      </div>
    )
  );
};

export default Paginate;
