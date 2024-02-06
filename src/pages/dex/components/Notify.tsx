import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export function Notify(props: any) {
  return (
    <>
      <ToastContainer position={props.position} className="m-3 position-fixed">
        <Toast
        style={{maxWidth: '240px'}}
          show={props.show}
          className="bg-primary text-white text-center fw-500 border-0 overflow-hidden rounded-8 shadow-sm"
          onClose={props.onClose}
          delay={3000}
          autohide
        >
          <Toast.Body>{props.text}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
