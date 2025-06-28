
import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

const TVMount = ({ tvSize, mountType }: { tvSize: number; mountType: string }) => {
  const tvWidth = (tvSize * 0.87) / 10; // Convert TV size to 3D scale
  const tvHeight = (tvSize * 0.49) / 10;
  
  return (
    <group>
      {/* Wall */}
      <Plane args={[8, 6]} position={[0, 0, -0.1]} rotation={[0, 0, 0]}>
        <meshLambertMaterial color="#f5f5f5" />
      </Plane>
      
      {/* TV Screen */}
      <Box args={[tvWidth, tvHeight, 0.1]} position={[0, 0, 0]}>
        <meshLambertMaterial color="#000000" />
      </Box>
      
      {/* TV Frame */}
      <Box args={[tvWidth + 0.1, tvHeight + 0.1, 0.05]} position={[0, 0, -0.05]}>
        <meshLambertMaterial color="#333333" />
      </Box>
      
      {/* Wall Mount */}
      <Box args={[0.6, 0.4, 0.1]} position={[0, 0, -0.2]}>
        <meshLambertMaterial color="#666666" />
      </Box>
      
      {/* Mount Arms */}
      <Box args={[0.1, 0.1, 0.3]} position={[-0.2, 0, -0.15]}>
        <meshLambertMaterial color="#444444" />
      </Box>
      <Box args={[0.1, 0.1, 0.3]} position={[0.2, 0, -0.15]}>
        <meshLambertMaterial color="#444444" />
      </Box>
    </group>
  );
};

export const TVDemo3D = () => {
  const [tvSize, setTvSize] = useState(55);
  const [mountType, setMountType] = useState('fixed');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-[500px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">3D Preview</h3>
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              TV Size
            </label>
            <select
              value={tvSize}
              onChange={(e) => setTvSize(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value={32}>32"</option>
              <option value={43}>43"</option>
              <option value={55}>55"</option>
              <option value={65}>65"</option>
              <option value={75}>75"</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mount Type
            </label>
            <select
              value={mountType}
              onChange={(e) => setMountType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="fixed">Fixed</option>
              <option value="tilting">Tilting</option>
              <option value="articulating">Full Motion</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="h-80 rounded-lg overflow-hidden border">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          <TVMount tvSize={tvSize} mountType={mountType} />
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Drag to rotate • Scroll to zoom • Preview shows approximate sizing
      </p>
    </div>
  );
};
