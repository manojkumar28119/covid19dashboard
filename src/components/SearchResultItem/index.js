import {BiChevronRightSquare} from 'react-icons/bi'

import {Link} from 'react-router-dom'

import './index.css'

const SearchResultItem = props => {
  const {item, isLastChild} = props
  const stateCode = item.state_code
  console.log(isLastChild)

  return (
    <Link className="nav-link" to={`/state/${stateCode}`}>
      <li className={`search-query-item ${isLastChild ? '' : 'item-border'}`}>
        <p>{item.state_name}</p>
        <div className="state-code-card">
          {item.state_code}
          <BiChevronRightSquare className="arrow-card" />
        </div>
      </li>
    </Link>
  )
}

export default SearchResultItem
