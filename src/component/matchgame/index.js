import {Component} from 'react'
import './index.css'
import ShowImages from '../showimages'
import Tabitem from '../tabItem'
import NavItems from '../navitem'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesList: props.imagesList,
      tabsList: props.tabsList,
      timer: 60,
      score: 0,
      activeTabid: 'FRUIT',
      activeImgIndex: 0,
    }
    this.intervalId = null
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  tick = () => {
    this.setState(prev => {
      if (prev.timer === 1) {
        clearInterval(this.intervalId)
        return {timer: 0}
      }
      return {timer: prev.timer - 1}
    })
  }

  clickTabItem = tabId => {
    this.setState({activeTabid: tabId})
  }

  ClickedImage = id => {
    const {imagesList, activeImgIndex} = this.state
    if (imagesList[activeImgIndex].id === id) {
      this.setState(prev => ({
        score: prev.score + 1,
        activeImgIndex: Math.floor(Math.random() * imagesList.length),
      }))
    } else {
      clearInterval(this.intervalId)
      this.setState({timer: 0})
    }
  }

  onClickReset = () => {
    const {imagesList}=this.state
    clearInterval(this.intervalId)
    this.setState({
      timer: 60,
      score: 0,
      activeTabid: 'FRUIT',
      activeImgIndex: Math.floor(Math.random() * imagesList.length),
    })
    this.intervalId = setInterval(this.tick, 1000)
  }

  render() {
    const {tabsList, imagesList, activeTabid, activeImgIndex, timer, score} =
      this.state
    const filteredImages = imagesList.filter(
      each => each.category === activeTabid,
    )
    const displayDetails = imagesList[activeImgIndex]
    return (
      <div className="bg-container">
        <ul className="top-nav-container">
          <NavItems timer={timer} score={score} />
        </ul>
        {timer > 0 ? (
          <>
            <div className="main-img-container">
              <img
                alt="match"
                className="main-img"
                src={displayDetails.imageUrl}
              />
            </div>
            <ul className="tabs-container">
              {tabsList.map(tabDetails => (
                <Tabitem
                  key={tabDetails.tabId}
                  tabDetails={tabDetails}
                  clickTabItem={this.clickTabItem}
                  isActive={activeTabid === tabDetails.tabId}
                />
              ))}
            </ul>
            <ul className="list-container">
              {filteredImages.map(each => (
                <ShowImages
                  key={each.id}
                  details={each}
                  clickedImage={this.ClickedImage}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className="game-over-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy-img"
            />
            <p className="final-score">Your Score: {score}</p>
            <button onClick={this.onClickReset} className="reset-btn" type="button">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
                className="reset-img"
              />
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
