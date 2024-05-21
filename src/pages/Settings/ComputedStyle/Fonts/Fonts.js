export const Fonts = (props) => {
  return (
    <div className="settings__font">
      <p>Value: {props.count.fontSize ? props.count.fontSize : props.FS}px </p>
      <p>Here you can set a custom font size for the entire page</p>
      <button className="btn" onClick={props.decrement}>
        decrease
      </button>
      <button className="btn" onClick={props.reset}>
        reset
      </button>
      <button className="btn" onClick={props.increment}>
        increase
      </button>
    </div>
  )
}
