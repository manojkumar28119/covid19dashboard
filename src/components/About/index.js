/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import FaqItem from '../FaqItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {
    responseData: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAboutApi()
  }

  getAboutApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid19-faqs'

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)

      this.setState({
        apiStatus: apiStatusConstants.success,
        responseData: data.faq,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFaqList = () => {
    const {responseData} = this.state

    return (
      <>
        <h1 className="ab-heading">About</h1>
        <p className="ab-text">Last update on march 28th 2021.</p>
        <p className="ab-heading2">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="faq-list" testid="faqsUnorderedList">
          {responseData.map(eachItem => (
            <FaqItem item={eachItem} key={eachItem.qno} />
          ))}
        </ul>
      </>
    )
  }

  LoadingView = () => (
    <div className="loader-container" testid="aboutRouteLoader">
      <Loader
        type="Circles"
        color="rgba(0, 123, 255, 1)"
        height={40}
        width={40}
        radius={0}
      />
    </div>
  )

  renderAboutView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.LoadingView()
      case apiStatusConstants.success:
        return this.renderFaqList()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-page">
        <Header />
        <div className="about-card">{this.renderAboutView()}</div>
        <Footer />
      </div>
    )
  }
}

export default About
