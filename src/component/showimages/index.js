import './index.css'

const ShowImages = props => {
  const {details, clickedImage} = props
  const {id, thumbnailUrl} = details
  const onClickImage = () => {
    clickedImage(id)
  }
  return (
    <li className="li-ele">
      <button type="button" onClick={onClickImage} className="thumbnail-btn">
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnailImg" />
      </button>
    </li>
  )
}
export default ShowImages
