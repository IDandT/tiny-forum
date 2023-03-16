import './LocationHeader.css'

export default function LocationHeader(props) {
  return (
    <div className="location-header">
      {props.path.map((part, index) => {
        return (
          <div key={index} className="location-part">
            {'>>  '}
            {part}
          </div>
        )
      })}
    </div>
  )
}
