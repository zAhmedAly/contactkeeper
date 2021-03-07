import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import AlertContext from "../context/alert/AlertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  console.log("Alerts = ", alerts);
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert key={alert.id} variant={alert.type}>
        {alert.msg}
      </Alert>
      // <div key={alert.id} className={`alert alert-${alert.type}`}>
      //   <i className="fas fa-info-circle" /> {alert.msg}
      // </div>
    ))
  );
};

export default Alerts;
