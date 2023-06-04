import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh } from "three";

import * as THREE from "three";

const MeshComponent = () => {
  const meshRef = useRef<Mesh>(null);

  // 매 프레임마다 실행되는 hook이며, 이를 이용하며 애니메이션을 구현할 수 있다.
  // useFrame(() => {
  //   const mesh = meshRef.current;
  //   if (mesh) {
  //     mesh.position.y += 0.001;
  //     mesh.rotation.y += 0.01;
  //   }
  // });

  // props에 castShadow, receiveShadow를 추가하였다.
  return (
    <mesh castShadow receiveShadow ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={"green"} />
    </mesh>
  );
};

// 그림자를 받을 평면을 컴포넌트로 추가한다.
const PlaneComponent = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial />
    </mesh>
  );
};

// directionalLight를 별도의 컴포넌트로 분리했다.
const LightComponent = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  useEffect(() => {
    const light = lightRef.current;
    if (light) {
      light.lookAt(0, 0, 0);
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      light.shadow.camera.near = 1;
      light.shadow.camera.far = 60;
    }
  });
  return <directionalLight ref={lightRef} castShadow position={[3, 3, 3]} />;
};

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas
        shadows={{
          enabled: true,
          autoUpdate: true,
          type: THREE.PCFSoftShadowMap,
        }}
        camera={{
          isPerspectiveCamera: true,
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.01,
          far: 1000,
          position: [0, 2, 5],
        }}
      >
        <OrbitControls dampingFactor={0.05} />
        <LightComponent />
        <PlaneComponent />
        <MeshComponent />
      </Canvas>
    </div>
  );
}

export default App;
