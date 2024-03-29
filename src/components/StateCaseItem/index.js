import './index.css'

const StateCaseItem = props => {
  const {state} = props
  const {total, id, meta} = state
  const {population} = meta
  const {confirmed, recovered, deceased} = total

  const activeCases = confirmed - (recovered + deceased)

  return (
    <li className="state-case-item">
      <div className="column-card-1">
        <p className="state-case-text">{id}</p>
      </div>
      <div className="state-column-card-1">
        <p className="state-case-text confirm-text">{confirmed}</p>
      </div>
      <div className="state-column-card-2">
        <p className="state-case-text active-text">{activeCases}</p>
      </div>
      <div className="state-column-card-2">
        <p className="state-case-text recover-text ">{recovered}</p>
      </div>
      <div className="state-column-card-2">
        <p className="state-case-text decrease-text">{deceased}</p>
      </div>
      <div className="state-column-card-2">
        <p className="state-case-text population-text">{population}</p>
      </div>
    </li>
  )
}

export default StateCaseItem
