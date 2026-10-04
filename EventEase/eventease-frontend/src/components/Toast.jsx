import React, { useEffect } from "react";

const Toast = ({ message, setToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [message, setToast]);

  return <div style={{color:"green", marginTop:"10px"}}>{message}</div>;
};

export default Toast;
