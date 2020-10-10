import React from 'react'
import { Pagination } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => (
  pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <NavLink
          key={x + 1}
          to={
            !isAdmin
              ? keyword
              ? `/search/${keyword}/page/${x + 1}`
              : `/page/${x + 1}`
            : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </NavLink>
      ))}
    </Pagination>
  )
)

export default Paginate