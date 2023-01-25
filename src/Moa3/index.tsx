import React, { useEffect, useRef } from "react";
import { useFBX } from "@react-three/drei";
import { FBXLoader } from "three-stdlib";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Object3D } from "three";

const Moa3 = () => {
  const loader = new FBXLoader();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });
      renderer.outputEncoding = THREE.sRGBEncoding;
      const camera = new THREE.PerspectiveCamera(90, 1, 1, 1000);
      const controls = new OrbitControls(camera, renderer.domElement);

      camera.position.set(0, -200, 200);
      const light = new THREE.DirectionalLight("white", 100);
      scene.background = new THREE.Color("white");
      scene.add(light);
      const meshes: Array<THREE.Object3D<THREE.Event>> = [];
      loader.load("/fbx/moa3.fbx", (fbx) => {
        meshes.push(...fbx.children);
        scene.add(...meshes);

        renderer.render(scene, camera);
      });

      const animate = () => {
        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();
        meshes.forEach((mesh) => {
          mesh.rotation.y += 0.001;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    }
  });
  return <canvas ref={canvasRef} id="canvas" width="500" height="500" />;
};
export default Moa3;
