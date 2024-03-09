import { ChevronRight } from 'lucide-react'
import React from 'react'

import { Link } from './navigation'

type Props = { items: { title: string; link?: string }[] }
const Breadcrumb: React.FC<Props> = ({ items }) => {
  return (
    <nav>
      <ol className="m-0 p-0 flex items-center text-sm">
        <li className="flex items-center">
          <Link href="/" className="text-primary">
            Home
          </Link>
          <span className="mx-1 text-neutral-500 dark:text-neutral-400 flex">
            <ChevronRight className="w-4 h-4" />
          </span>
        </li>

        {items.map((item, index) =>
          !item.link ? (
            <li key={index} className="text-neutral-500 dark:text-neutral-400">
              {item.title}
            </li>
          ) : (
            <li key={index} className="flex items-center">
              <Link href={item.link} className="text-primary">
                {item.title}
              </Link>
              <span className="mx-1 text-neutral-500 dark:text-neutral-400 flex">
                <ChevronRight className="w-4 h-4" />
              </span>
            </li>
          ),
        )}
      </ol>
    </nav>
  )
}

export default Breadcrumb
