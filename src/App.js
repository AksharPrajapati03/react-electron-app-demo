import kiraGLB from "./imvu1.glb"
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  Environment,
  Stars,
  useTexture,
  Sky
} from "@react-three/drei";
import "./App.css";

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1 : 0.5}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : active ? 'white' :  'orange'} />
    </mesh>
  )
}


function Model() {
  const gltf = useGLTF(kiraGLB);

  return (
    <group scale={1}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function App() {
  return (
    <Suspense>
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Canvas>
          <ambientLight />
          <Box position={[-1.6, 0, -4]} />
          <Box position={[1.6, 0, -4]} />
           <Center>
            <Model/> 
           </Center>
          <OrbitControls/> 
          <Environment preset="forest" />
        </Canvas>
      </div>
    </Suspense>
  );
}

export default App;