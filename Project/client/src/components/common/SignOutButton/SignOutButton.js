
import React from 'react'

const SignOutButton = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }
  return (
    <div>SignOutButton</div>
  )
}

export default SignOutButton