/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
import StateCaseItem from '../StateCaseItem'
import Footer from '../Footer'
import SearchResultItem from '../SearchResultItem'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    countryConfirmedCases: '',
    countryActiveCases: '',
    countryRecoveredCases: '',
    countryDecreasedCases: '',
    statesCasesList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getCasesApi()
  }

  getCasesApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)

      let confirmedCases = 0
      let recoveredCases = 0
      let decreasedCases = 0

      const arr = statesList.map(each => {
        const stateCode = each.state_code
        const state = data[stateCode]
        confirmedCases += state.total.confirmed
        recoveredCases += state.total.recovered
        decreasedCases += state.total.deceased
        return ''
      })

      console.log(arr)

      const stateCasesList = statesList.map(each => {
        const stateCode = each.state_code

        return {id: each.state_name, ...data[stateCode]}
      })

      this.setState({statesCasesList: stateCasesList})

      console.log(stateCasesList)

      const activeCases = confirmedCases - (recoveredCases + decreasedCases)

      this.setState({
        countryConfirmedCases: confirmedCases,
        countryActiveCases: activeCases,
        countryDecreasedCases: decreasedCases,
        countryRecoveredCases: recoveredCases,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  ascendingOrderStates = () => {
    const {statesCasesList} = this.state
    const ascendingOrder = statesCasesList
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id))

    this.setState({statesCasesList: ascendingOrder})
  }

  descendingOrderStates = () => {
    const {statesCasesList} = this.state

    const descendingOrder = statesCasesList
      .slice()
      .sort((a, b) => b.id.localeCompare(a.id))

    this.setState({statesCasesList: descendingOrder})
  }

  renderCountryCaronaCases = () => {
    const {
      countryActiveCases,
      countryConfirmedCases,
      countryDecreasedCases,
      countryRecoveredCases,
    } = this.state

    return (
      <div className="country-cases-card">
        <div className="cases-card" testid="countryWideConfirmedCases">
          <p className="cases-text confirm-text">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/utmd9bcqyhitkhrceuzc"
            alt="country wide confirmed cases pic"
            className="case-icon"
          />
          <p className="count-text confirm-text">{countryConfirmedCases}</p>
        </div>
        <div className="cases-card" testid="countryWideActiveCases">
          <p className="cases-text active-text">Active</p>
          <img
            src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/zxsor3clwarodcytp70z"
            alt="country wide active cases pic"
            className="case-icon"
          />
          <p className="count-text active-text">{countryActiveCases}</p>
        </div>
        <div className="cases-card" testid="countryWideRecoveredCases">
          <p className="cases-text recover-text">Recovered</p>
          <img
            src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/vli7qwtx8x2hxpk4agj1"
            alt="country wide recovered cases pic"
            className="case-icon"
          />
          <p className="count-text recover-text">{countryRecoveredCases}</p>
        </div>
        <div className="cases-card" testid="countryWideDeceasedCases">
          <p className="cases-text decrease-text">Deceased</p>
          <img
            src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/yhlzlhv68pkjkuwbhilj"
            alt="country wide deceased cases pic"
            className="case-icon"
          />
          <p className="count-text decrease-text">{countryDecreasedCases}</p>
        </div>
      </div>
    )
  }

  renderStateWiseCard = () => {
    const {statesCasesList} = this.state

    return (
      <div className="state-wise-cases-card" testid="stateWiseCovidDataTable">
        <div className="table-head-card">
          <div className="table-head-column-card">
            <p className="table-head-text">States/UT</p>
            <div className="sort-btn-card">
              <button
                type="button"
                className="sort-btn"
                onClick={this.ascendingOrderStates}
                testid="ascendingSort"
              >
                <FcGenericSortingAsc className="sort-icon" />
              </button>
              <button
                type="button"
                className="sort-btn"
                onClick={this.descendingOrderStates}
                testid="descendingSort"
              >
                <FcGenericSortingDesc className="sort-icon" />
              </button>
            </div>
          </div>
          <div className="column-card">
            <p className="table-head-text">Confirmed</p>
          </div>
          <div className="column-card">
            <p className="table-head-text">Active</p>
          </div>
          <div className="column-card">
            <p className="table-head-text">Recovered</p>
          </div>
          <div className="column-card">
            <p className="table-head-text">Deceased</p>
          </div>
          <div className="column-card">
            <p className="table-head-text">Population</p>
          </div>
        </div>
        <hr className="hr-line" />
        <ul className="state-case-list">
          {statesCasesList.map(each => (
            <StateCaseItem state={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSearchQueries = () => {
    const {searchInput} = this.state

    const searchQuires = statesList.filter(each =>
      each.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(searchInput)
    console.log(searchQuires)

    return (
      <ul className="search-quires-list" testid="searchResultsUnorderedList">
        {searchQuires.map(each => (
          <SearchResultItem
            item={each}
            key={each.state_code}
            isLastChild={searchQuires.indexOf(each) === searchQuires.length - 1}
          />
        ))}
      </ul>
    )
  }

  LoadingView = () => (
    <div className="loader-container" testid="homeRouteLoader">
      <Loader
        type="Circles"
        color="rgba(0, 123, 255, 1)"
        height={40}
        width={40}
        radius={0}
      />
    </div>
  )

  renderHomeView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.LoadingView()
      case apiStatusConstants.success:
        return (
          <>
            {this.renderCountryCaronaCases()}
            {this.renderStateWiseCard()}
            <Footer />
          </>
        )

      default:
        return null
    }
  }

  render() {
    const {searchInput, apiStatus} = this.state

    return (
      <div className="home-page">
        <Header />

        <div className="home-content">
          {apiStatus === apiStatusConstants.success && (
            <div className="input-card">
              <BsSearch className="search-icon" />
              <input
                type="search"
                className="search-input"
                placeholder="Enter the state"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          )}
          {searchInput.length !== 0
            ? this.renderSearchQueries()
            : this.renderHomeView()}
        </div>
      </div>
    )
  }
}

export default Home
