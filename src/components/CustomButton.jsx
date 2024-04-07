import React from 'react'
import { snapshot } from 'valtio'
import { getContrastingColor } from '../config/helpers'

import state from '../store'

function CustomButton({handleClick, type,title,customstyles}) {

    const snap = snapshot(state)

    const generateStyle = (types) => {
        if(types === 'filled'){
            return {
                backgroundColor:snap.color,
                color:getContrastingColor(snap.color)
              
            }
        }else if(type === 'outline'){
            return{
                borderWidth:'1px',
                borderColor:snap.color,
                color:getContrastingColor(snap.color)
            }
        }
    }

  return (
    <button
        className={`px-2 py-1 flex-1 rounded-md ${customstyles}`}
       style={generateStyle(type)}
       onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default CustomButton