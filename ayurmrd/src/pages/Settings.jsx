import React from 'react'
import Container from '../components/Container'
import DarkModeCheckbox from '../components/others/DarkModeCheckbox'

const Settings = () => {

  return (
    <Container page_name='Settings' active_menu='Settings' type='flex' >

        <DarkModeCheckbox/>
       
    </Container>
  )
}

export default Settings