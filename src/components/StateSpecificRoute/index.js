/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  XAxis,
  YAxis,
  BarChart,
  ResponsiveContainer,
  Bar,
  Tooltip,
} from 'recharts'
import Header from '../Header'
import DistrictCaseItem from '../DistrictCaseItem'
import LineCharts from '../LineCharts'
import Footer from '../Footer'
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

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class StateSpecificRoute extends Component {
  state = {
    stateData: '',
    stateName: '',
    apiStatus: apiStatusConstants.initial,
    activeTotalCasesType: 'confirmed',
    timeLinesData: '',
    timeLineApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStatesApi()
    this.getTimeLinesApi()
  }

  getTimeLinesApi = async () => {
    this.setState({timeLineApiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`,
    )

    const data = await response.json()
    console.log(data)
    const {dates} = data[stateCode]

    const datesKeys = Object.keys(dates)

    const modifiedDates = datesKeys.map(date => {
      const totalCases = dates[date].total
      const activeCaases =
        totalCases.confirmed - (totalCases.recovered + totalCases.deceased)

      return {
        date,
        confirmed: totalCases.confirmed,
        deceased: totalCases.deceased,
        recovered: totalCases.recovered,
        active: activeCaases,
        tested: totalCases.tested,
      }
    })

    if (response.ok) {
      this.setState({
        timeLinesData: modifiedDates,
        timeLineApiStatus: apiStatusConstants.success,
      })
    }
  }

  getStatesApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    console.log(response)
    const data = await response.json()

    console.log(data[stateCode])
    const stateName = statesList.filter(each => each.state_code === stateCode)
    if (response.ok) {
      this.setState({
        stateData: data[stateCode],
        stateName: stateName[0].state_name,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderStateCaronaCases = () => {
    const {stateData, activeTotalCasesType} = this.state

    const {confirmed, deceased, recovered} = stateData.total

    const activeCases = confirmed - (deceased + recovered)

    const confirmedCasesBtn = () => {
      this.setState({activeTotalCasesType: 'confirmed'})
    }

    const activeCasesBtn = () => {
      this.setState({activeTotalCasesType: 'active'})
    }

    const recoveredCasesBtn = () => {
      this.setState({activeTotalCasesType: 'recovered'})
    }

    const deceasedCasesBtn = () => {
      this.setState({activeTotalCasesType: 'deceased'})
    }

    return (
      <div className="state-specific-cases-card">
        <div
          className="cases-card"
          testid="stateSpecificConfirmedCasesContainer"
        >
          <button
            type="button"
            className={`  state-cases-btn ${
              activeTotalCasesType === 'confirmed' && 'confirmed-cases-card'
            }`}
            onClick={confirmedCasesBtn}
          >
            <p className="cases-text confirm-text ">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/utmd9bcqyhitkhrceuzc"
              alt="state specific confirmed cases pic"
              className="case-icon"
            />
            <p className="count-text confirm-text">{confirmed}</p>
          </button>
        </div>
        <div className="cases-card" testid="stateSpecificActiveCasesContainer">
          <button
            type="button"
            className={`  state-cases-btn ${
              activeTotalCasesType === 'active' && 'active-cases-type'
            }`}
            onClick={activeCasesBtn}
          >
            <p className="cases-text active-text">Active</p>
            <img
              src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/zxsor3clwarodcytp70z"
              alt="state specific active cases pic"
              className="case-icon"
            />
            <p className="count-text active-text">{activeCases}</p>
          </button>
        </div>
        <div
          className="cases-card"
          testid="stateSpecificRecoveredCasesContainer"
        >
          <button
            type="button"
            className={`  state-cases-btn ${
              activeTotalCasesType === 'recovered' && 'recovered-cases-type'
            }`}
            onClick={recoveredCasesBtn}
          >
            <p className="cases-text recover-text">Recovered</p>
            <img
              src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/vli7qwtx8x2hxpk4agj1"
              alt="state specific recovered cases pic"
              className="case-icon"
            />
            <p className="count-text recover-text">{recovered}</p>
          </button>
        </div>
        <div
          className="cases-card"
          testid="stateSpecificDeceasedCasesContainer"
        >
          <button
            type="button"
            className={`  state-cases-btn ${
              activeTotalCasesType === 'deceased' && 'deceased-cases-type'
            }`}
            onClick={deceasedCasesBtn}
          >
            <p className="cases-text decrease-text">Deceased</p>
            <img
              src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/yhlzlhv68pkjkuwbhilj"
              alt="state specific deceased cases pic"
              className="case-icon"
            />
            <p className="count-text decrease-text">{deceased}</p>
          </button>
        </div>
      </div>
    )
  }

  LoadingView = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader
        type="Circles"
        color="rgba(0, 123, 255, 1)"
        height={40}
        width={40}
        radius={0}
      />
    </div>
  )

  renderBarChart = () => {
    const {timeLinesData, activeTotalCasesType} = this.state

    const DataFormatter = number => {
      if (number > 1000000) {
        return `${(number / 1000000).toFixed(1)}L`
      }
      if (number > 1000) {
        return `${(number / 1000).toFixed(1)}K`
      }
      return number.toString()
    }

    let color

    switch (activeTotalCasesType) {
      case 'confirmed':
        color = 'rgba(154, 14, 49, 1)'
        break
      case 'recovered':
        color = 'rgba(33, 104, 55, 1)'
        break
      case 'deceased':
        color = 'rgba(71, 76, 87, 1)'
        break
      case 'active':
        color = 'rgba(10, 79, 160, 1)'
        break
      default:
        break
    }
    const lastTenDaysData = timeLinesData.slice(timeLinesData.length - 10)

    console.log(lastTenDaysData)

    const dateFormatter = date => {
      const newDate = new Date(date)
      return `${newDate.getDate()} ${month[newDate.getMonth()].slice(0, 3)}`
    }

    const CustomTooltip = ({active, payload, label}) => {
      if (active) {
        return (
          <div className="custom-tooltip">
            <p className="label ">{`${label}`}</p>
            <p className="label ">{`${payload[0].value}`}</p>
          </div>
        )
      }

      return null
    }

    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={lastTenDaysData}>
          <XAxis
            dataKey="date"
            tick={{
              stroke: `${color}`,
              strokeWidth: 1,
              fontFamily: 'Roboto',
              fontSize: 10,
              fontWeight: 400,
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={dateFormatter}
          />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{
              backgroundColor: 'rgba(226, 232, 240, 1)',
              padding: '10px',
              color: `${color}`,
            }}
            active={false}
            cursor={false}
          />
          <YAxis
            dataKey={activeTotalCasesType}
            tickFormatter={DataFormatter}
            hide
          />
          <Bar
            dataKey={activeTotalCasesType}
            fill={color}
            className="bar"
            radius={[10, 10, 0, 0]}
            label={{
              fill: color,
              position: 'top',
              fontSize: 12,
              formatter: DataFormatter,
              fontWeight: 500,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  renderTopDistricts = () => {
    const {stateData, activeTotalCasesType} = this.state

    const {districts} = stateData

    const objectKeys = Object.entries(districts)

    const districtsArr = objectKeys.map(each => {
      const activeCases =
        each[1].total.confirmed -
        (each[1].total.deceased + each[1].total.recovered)

      const {deceased} = each[1].total
      const {confirmed} = each[1].total
      const {recovered} = each[1].total

      return {
        districtName: each[0],
        data: {
          ...each[1],
          total: {
            ...each[1].total,
            active: activeCases > 0 ? activeCases : 0,
            deceased: deceased === undefined ? 0 : deceased,
            confirmed: confirmed === undefined ? 0 : confirmed,
            recovered: recovered === undefined ? 0 : recovered,
          },
        },
      }
    })

    const DistrictDescOrderCases = districtsArr.sort(
      (a, b) =>
        b.data.total[activeTotalCasesType] - a.data.total[activeTotalCasesType],
    )

    return (
      <div>
        <h1 className="top-dis-head">Top Districts</h1>
        <ul className="top-districts-list" testid="topDistrictsUnorderedList">
          {DistrictDescOrderCases.map(each => (
            <DistrictCaseItem
              key={each.districtName}
              name={each.districtName}
              cases={each.data.total[activeTotalCasesType]}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderStateView = () => {
    const {stateName, stateData} = this.state

    const {tested} = stateData.total
    const lastUpdated = stateData.meta.last_updated
    console.log(lastUpdated)
    const date = new Date(lastUpdated)

    return (
      <>
        <div className="state-name-nd-tested-card">
          <h1 className="state-name">{stateName}</h1>
          <div className="tested-cases-card">
            <p className="tested-heading">Tested</p>
            <p className="tested-cases">{tested}</p>
          </div>
        </div>
        <p className="updated-date">
          Last update on {month[date.getMonth()]} {date.getDate()}{' '}
          {date.getFullYear()}.
        </p>
        {this.renderStateCaronaCases()}
        {this.renderTopDistricts()}
      </>
    )
  }

  renderStateSpecificRouteView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.LoadingView()
      case apiStatusConstants.success:
        return this.renderStateView()

      default:
        return null
    }
  }

  timeLineLoadingView = () => (
    <div className="loader-container" testid="timelinesDataLoader">
      <Loader
        type="ThreeDots"
        color="rgba(0, 123, 255, 1)"
        height={40}
        width={40}
        radius={0}
      />
    </div>
  )

  renderTimeLineView = () => {
    const {timeLineApiStatus, timeLinesData} = this.state

    switch (timeLineApiStatus) {
      case apiStatusConstants.inProgress:
        return this.timeLineLoadingView()
      case apiStatusConstants.success:
        return (
          <>
            {this.renderBarChart()}
            <LineCharts data={timeLinesData} />
          </>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-specific-page">
        <Header />
        <div className="state-card">
          {this.renderStateSpecificRouteView()}
          {this.renderTimeLineView()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default StateSpecificRoute
