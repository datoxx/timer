

const Length = ({title, changeTime, type, time, formatTime}) => {
    return ( 
        <div>
            <h4>{title}</h4>
            <div className="time-sets">
                <button className="btn green accent-5"
                    onClick={() => changeTime(-60, type)}
                >
                    <i className="large material-icons">arrow_downward</i>
                </button>
                <h4>{formatTime(time)}</h4>
                <button className="btn green accent-5"
                    onClick={() => changeTime(60, type)}
                >
                    <i className="large material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
     );
}
 
export default Length;