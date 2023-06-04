import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const MeshComponent = () => {
  const meshRef = useRef<Mesh>(null);

  // 매 프레임마다 실행되는 hook이며, 이를 이용하며 애니메이션을 구현할 수 있다.
  useFrame(() => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.position.y += 0.001;
      mesh.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={"green"} />
    </mesh>
  );
};

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas
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
        <MeshComponent />
      </Canvas>
    </div>
  );
}

export default App;
