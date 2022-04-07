import { withAuthenticationRequired } from "@auth0/auth0-react"
import React from "react";

const ProtectedComponent = ({children}: any) => {
  return children
}

export default withAuthenticationRequired(ProtectedComponent);
