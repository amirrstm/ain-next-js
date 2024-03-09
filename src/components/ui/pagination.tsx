import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import React from 'react'
import ReactPaginate from 'react-paginate'

type Props = { forcePage?: number; pageCount: number; paginate: ({ selected }: { selected: number }) => void }
const Pagination: React.FC<Props> = ({ forcePage, pageCount, paginate }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={paginate}
      pageLinkClassName={'page'}
      activeLinkClassName={'active'}
      nextLinkClassName={'page-number'}
      containerClassName={'pagination'}
      previousLinkClassName={'page-number'}
      nextLabel={<IconChevronRight className="w-4 h-4 flex" />}
      previousLabel={<IconChevronLeft className="w-4 h-4 flex" />}
    />
  )
}

export default Pagination
