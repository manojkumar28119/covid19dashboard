import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {isMenuActive: false}

  onClickMenuBtn = () => {
    this.setState(prevState => ({isMenuActive: !prevState.isMenuActive}))
  }

  renderNavLinks = () => {
    const {match} = this.props
    const {path} = match
    return (
      <>
        <Link to="/" className="nav-link-head">
          <button
            type="button"
            className={`nav-text ${path === '/' && 'active-nav-text'}`}
          >
            Home
          </button>
        </Link>
        <Link to="/about" className="nav-link-head">
          <button
            type="button"
            className={`nav-text ${path === '/about' && 'active-nav-text'}`}
          >
            About
          </button>
        </Link>
      </>
    )
  }

  render() {
    const {isMenuActive} = this.state
    return (
      <>
        <div className="nav-bar">
          <div className="nav-content">
            <Link to="/" className="nav-link">
              <h1 className="website-heading">
                COVID19<span className="website-hd-highlight">INDIA</span>
              </h1>
            </Link>
            <button
              type="button"
              className="menu-btn"
              onClick={this.onClickMenuBtn}
            >
              <img
                src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/x06hyokxc7ywc43wpoe4"
                alt="menu"
              />
            </button>

            <ul className="nav-links-card">{this.renderNavLinks()}</ul>
          </div>
        </div>
        {isMenuActive && (
          <div className="mobile-menu-content">
            <ul className="mb-nav-links-card">{this.renderNavLinks()}</ul>

            <button
              type="button"
              className="menu-btn close-btn"
              onClick={this.onClickMenuBtn}
            >
              <img
                src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/jmdyu6sc0gfdsbntamxu"
                alt="menu"
              />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
