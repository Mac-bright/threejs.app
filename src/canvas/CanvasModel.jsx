import React from 'react'
import {Canvas} from '@react-three/fiber'
import {Environment,Center} from '@react-three/drei'

import Shirt from './shirt'
import Backdrop  from './Backdrop'
import CameraRig from './CameraRig'

import state from '../store'
import {useSnapshot} from 'valtio'


const CanvasModel = () => {
  const snap = useSnapshot(state)
  return (
    <Canvas
      shadows
      camera={{position:[0,0,0],fov:35}}
      gl={{preventDrawingBuffer:true}}
      className='w-full max-w-full h-full transition-all ease-in'
    >
      <ambientLight intensity={3}/>
     
      <CameraRig>
        {/* <Backdrop/> */}
        <Center>
          <Shirt/>
        </Center>
      </CameraRig>
     
      
    </Canvas>
  )
}

export default CanvasModel
