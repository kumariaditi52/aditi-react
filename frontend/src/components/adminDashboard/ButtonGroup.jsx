/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
function ButtonGroup({ buttons, isSelected, setIsSelected,icons }) {
    return (
        <div className="button-container">
            {
                // eslint-disable-next-line react/prop-types
                buttons.map((text, index) => (
                    <button
                        key={index}  // Added key for each button
                        className={isSelected === index ? "selected-button" : "button"}
                        onClick={() => setIsSelected(index)}
                    >
                        <span className="material-icons">{icons[index]}</span>
                        {text}
                    </button>
                ))
            }
        </div>
    )
}

export default ButtonGroup;
