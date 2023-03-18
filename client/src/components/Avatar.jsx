import defaultAvatarImage from '../assets/default-avatar.png'

export default function Avatar({ imageURL, imageWidth, imageHeight }) {
  const imgStyle = {
    width: String(imageWidth) + 'px',
    height: String(imageHeight) + 'px',
    margin: '0px',
    padding: '0px',
    borderRadius: String(imageWidth / 2) + 'px',
  }

  return (
    <img
      style={imgStyle}
      src={imageURL || defaultAvatarImage}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = defaultAvatarImage
      }}
    ></img>
  )
}
