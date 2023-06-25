import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed,label } = props;

  const containerStyles = {
    height: "10%",
    width: '30%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    textAlign:"center",
  }

  const fillerStyles = {
    height: '120%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    transition: 'width 1s ease-in-out',
    borderRadius: 'inherit',
    textAlign: 'right',
  }

  const labelStyles = {
    height:"",
    color: 'white',
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyles}>
    <span style={{position:"absolute",right:"",top:"10px"}}>{label}</span>
      <div style={fillerStyles}>
        {/* <span style={labelStyles}>{`${completed}%`}</span> */}
      </div>
    </div>
  );
};

export default ProgressBar;