import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Page404() {
    const navigate = useNavigate()
  return (
    <div>
      <h1>404 page not found</h1>
      <Link to={"/login"}>back</Link>
    </div>
  )
}
