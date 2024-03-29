/* eslint-disable react/no-danger */
import './index.css'

const FaqItem = props => {
  const {item} = props
  const {answer, question} = item

  return (
    <li>
      <p className="question">{question}</p>
      <p className="answer" dangerouslySetInnerHTML={{__html: answer}} />
    </li>
  )
}

export default FaqItem
