import React from 'react'
import {useAuth} from '../../auth'

const fetchSettings = () => {
    
}

const Settings = (settings) => {
    const [logged] = useAuth()
    return (
    <div>
        <ul>
        {settings.map((setting, index) =>(
            <li key={index}> 
                {setting.name}:{setting.value}
            </li>
        ))}
        </ul>
    </div>
    )
  }
export default Settings