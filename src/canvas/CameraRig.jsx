import React,{useRef} from 'react'
import {easing} from 'maath'
import {snapshot, useSnapshot} from 'valtio'
import { useFrame } from '@react-three/fiber'

import state from '../store'

const CameraRig = ({children}) => {
  const group = useRef();
  const snap = snapshot(state)



useFrame((state,delta) => {

  
  const isBreakPoint = window.innerWidth <= 1260;
  const isMobile = window.innerWidth <= 600;

  
let targetPosition = [-0.4,0,2]
if(snap.intro){
  if(isBreakPoint) targetPosition = [0,0,1]
  if(isMobile) targetPosition = [0,0.2,2]
}else{
  if(isMobile) targetPosition = [0,0,2.5]
  else targetPosition = [0,0,1.5];
}

  easing.damp3(state.camera.position, targetPosition , 0.25,delta)


  easing.dampE(
    group.current.rotation,
    [state.pointer.y/7, -state.pointer.x/5, 0],
    0.25,
    delta
  )

})



  return <group ref={group}>
    {children}
  </group>
}

export default CameraRig