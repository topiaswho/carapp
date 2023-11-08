import { useState } from 'react'
import Carlist from './components/carlist'
import { AppBar, Typography } from '@mui/material'

function App() {


  return (
    <>
    <AppBar position='relative'>
      <Typography variant='h5'>
      Candyshop
      </Typography>
</AppBar>
<Carlist />

    </>
  )
}

export default App
