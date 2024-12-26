import React from 'react';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from 'cdbreact';

const signUp = () => {
  return (
    <CDBContainer>
      <CDBCard style={{ width: '30rem' }}>
        <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="h4 font-weight-bold"> Sign in </p>
          </div>
          <CDBInput label="E-mail" type="email" icon="envelope" iconClass="text-muted" />
          <CDBInput label="Password" type="password" icon="lock" iconClass="text-muted" />
          <CDBBtn color="success" style={{ width: '40%' }} className="btn-block mt-5 mx-auto">
            Login
          </CDBBtn>
        </CDBCardBody>
        
      </CDBCard>
    </CDBContainer>
  );
};
export default signUp;