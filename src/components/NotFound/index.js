import './index.css'

const NotFound = props => {
  const onClickHomeBtn = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="nt-fnd-page">
      <img
        src="https://res.cloudinary.com/dyvuuyt4s/image/upload/f_auto,q_auto/lczd8h08sjfkdzxtez87"
        alt="not-found-pic"
        className="nt-fnd-img"
      />

      <h1 className="not-fnd-heading">PAGE NOT FOUND</h1>
      <p className="nt-fnd-text">
        we are sorry, the page you requested could not be found
      </p>
      <p className="nt-fnd-text">Please go back to the homepage</p>
      <button onClick={onClickHomeBtn} className="nt-fnd-btn" type="button">
        Home
      </button>
    </div>
  )
}

export default NotFound
