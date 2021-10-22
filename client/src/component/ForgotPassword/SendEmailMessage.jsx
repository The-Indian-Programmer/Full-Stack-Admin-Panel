import axios from "axios";
import React, { useState } from "react";

const SendEmailMessage = ({ handleEmailSubmit, email, setEmail }) => {
  return (
    <div className="sendmail">
      <form onSubmit={handleEmailSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email Your Registered Email
          </label>
          <input
            type="text"
            class="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendEmailMessage;
