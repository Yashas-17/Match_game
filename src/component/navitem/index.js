import './index.css'

const NavItems = props => {
  const {score, timer} = props
  return (
    <>
      <li className="nav-item">
        <img
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          className="logo-img"
        />
      </li>
      <li>
        <div className="score-timer-container">
          <p className="para">
            Score: <span className="score">{score}</span>
          </p>
          <div className="timer-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timer-img"
            />
            <p className="para">{timer} sec</p>
          </div>
        </div>
      </li>
    </>
  )
}
export default NavItems
