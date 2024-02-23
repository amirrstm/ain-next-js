import { ChevronLeft, ChevronRight } from 'lucide-react'
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
      nextLabel={<ChevronRight className="w-4 h-4 flex" />}
      previousLabel={<ChevronLeft className="w-4 h-4 flex" />}
    />
  )
}

export default Pagination
