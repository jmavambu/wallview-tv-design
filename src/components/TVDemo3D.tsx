
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

const FallbackPreview = ({ tvSize, mountType }: { tvSize: number; mountType: string }) => {
  return (
    <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
      <div className="text-center space-y-4">
        <div className="relative mx-auto" style={{ width: `${Math.min(tvSize * 3, 200)}px`, height: `${Math.min(tvSize * 1.7, 120)}px` }}>
          {/* Wall representation */}
          <div className="absolute inset-0 bg-gray-200 rounded"></div>
          
          {/* TV representation */}
          <div 
            className="absolute bg-black rounded border-2 border-gray-800"
            style={{
              width: `${Math.min(tvSize * 2.5, 160)}px`,
              height: `${Math.min(tvSize * 1.4, 90)}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-medium">{tvSize}"</span>
            </div>
          </div>
          
          {/* Mount representation */}
          <div 
            className="absolute bg-gray-600 rounded"
            style={{
              width: '20px',
              height: '12px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translateZ(-10px)'
            }}
          ></div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">TV Preview</h4>
          <p className="text-xs text-gray-500">
            {tvSize}" TV with {mountType} mount
          </p>
          <p className="text-xs text-gray-400">
            3D preview unavailable - WebGL not supported
          </p>
        </div>
      </div>
    </div>
  );
};

// Error boundary component for Canvas
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('3D Canvas error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export const TVDemo3D = () => {
  const [tvSize, setTvSize] = useState(55);
  const [mountType, setMountType] = useState('fixed');
  const [webglSupported, setWebglSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
    }
  }, []);

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
      
      {webglSupported ? (
        <>
          <div className="h-80 rounded-lg overflow-hidden border">
            <CanvasErrorBoundary fallback={<FallbackPreview tvSize={tvSize} mountType={mountType} />}>
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                onCreated={(state) => {
                  console.log('Canvas created successfully');
                }}
                onError={(error) => {
                  console.error('Canvas error:', error);
                  setWebglSupported(false);
                }}
              >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <pointLight position={[-10, -10, -10]} intensity={0.3} />
                <TVMount tvSize={tvSize} mountType={mountType} />
                <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
              </Canvas>
            </CanvasErrorBoundary>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Drag to rotate • Scroll to zoom • Preview shows approximate sizing
          </p>
        </>
      ) : (
        <>
          <FallbackPreview tvSize={tvSize} mountType={mountType} />
          <p className="text-xs text-gray-500 mt-2">
            Static preview - 3D visualization requires WebGL support
          </p>
        </>
      )}
    </div>
  );
};
