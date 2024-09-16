const Notification = ({msg}) => {
    const successMsg = { 
        color: 'green',
        font: '25px Times New Roman',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderColor: 'green',
        borderRadius: '5px',
        borderWidth: '3px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (msg === null){
        return null
    }

    return (
        <div style={successMsg}>
          {msg}
        </div>
      )
}

export default Notification