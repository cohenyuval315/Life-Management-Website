import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function AccessDeniedPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <h1>Access Denied</h1>
      <p>
        You tried to access a protected page while not logged in. In a real app, this could redirect
        you to a login page, or back to the homepage.
      </p>
      <p>
        <Link to="/">Go back home</Link>.
        <button onClick={goBack}>Go Back</button>
      </p>
    </div>
  )
}
