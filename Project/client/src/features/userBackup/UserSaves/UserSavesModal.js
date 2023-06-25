import React,{useState} from 'react'
import DataModal from '../../../components/ui/PopupModal/DataModal'
import UserSavesForm from './UserSavesForm'

const UserSavesModal = () => {
    const [open,setOpen] = useState(false)

    function handleSetOpen(value){
        setOpen(value)
    }

  return (
    <div>
        <DataModal isOpen={open} handleSetOpen={handleSetOpen}>
            <UserSavesForm />
        </DataModal>
    </div>
  )
}

export default UserSavesModal