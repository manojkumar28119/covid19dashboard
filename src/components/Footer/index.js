import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-card">
      <h1 className="website-heading">
        COVID19<span className="website-hd-highlight">INDIA</span>
      </h1>
      <p className="footer-text">
        we stand with everyone fighting on the front lines
      </p>
      <div>
        <VscGithubAlt className="footer-icon" />
        <FiInstagram className="footer-icon" />
        <FaTwitter className="footer-icon" />
      </div>
    </div>
  )
}
