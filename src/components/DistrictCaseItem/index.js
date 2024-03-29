import './index.css'

const DistrictCaseItem = props => {
  const {name, cases} = props

  return (
    <li className="district-item">
      <p className="district-cases">{cases}</p>
      <p className="district-name">{name}</p>
    </li>
  )
}

export default DistrictCaseItem
