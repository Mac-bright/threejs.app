import React from 'react'
import {easing} from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows,RandomizedLight } from '@react-three/drei'

const Backdrop = () => {
  return (
    <AccumulativeShadows 
    position={[0,0,-0.14]}
    alphaTest={0.85}
    scale={10}
    rotation={[Math.PI/2,0,0]}
    >
      <RandomizedLight amount={4}
        radius={9}
        intensity={2}
        ambient={0.65}
        position={[5,5,-10]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop