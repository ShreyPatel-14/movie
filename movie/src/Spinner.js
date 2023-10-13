import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
const Spinner = () => {
    return (
      <div className='text-center my-3'>
        <CircularProgress style={{color:'white',height:'50px',width:'50px'}}/>
      </div>
    )
}

export default Spinner