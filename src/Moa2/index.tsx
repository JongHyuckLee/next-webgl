import React, { Suspense, useEffect } from "react";
import {
  Environment,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  SpotLight,
  Stats,
  useFBX,
  useTexture,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import dat from "dat.gui";
const Scene = ({ camera }: { camera: any }) => {
  const fbx = useFBX("/fbx/moa3.fbx");
  fbx.scale.set(0.1, 0.1, 0.1);
  const marsTexture = useTexture("textures/mars.jpeg");
  const mercuryTexture = useTexture("textures/mercury.jpeg");
  const venusTexture = useTexture("textures/venus.jpeg");
  const scene = new THREE.Scene();
  const group = new THREE.Group();

  // const group1 = new THREE.Group();
  // const group2 = new THREE.Group();
  // const group3 = new THREE.Group();
  const clock = new THREE.Clock();

  // const geometry = new THREE.SphereGeometry(5, 32, 32);
  //
  // const material1 = new THREE.MeshPhongMaterial({
  //   specular: 0x050505,
  //   shininess: 50,
  //   map: marsTexture,
  // });
  // const material2 = new THREE.MeshPhongMaterial({
  //   specular: 0x050505,
  //   shininess: 50,
  //   map: venusTexture,
  // });
  // const material3 = new THREE.MeshPhongMaterial({
  //   specular: 0x050505,
  //   shininess: 50,
  //   map: mercuryTexture,
  // });
  //
  // const box1 = new THREE.Mesh(geometry, material1);
  // box1.position.set(-40, 14, 100);
  // box1.scale.set(10, 10, 10);
  //
  // const box2 = new THREE.Mesh(geometry, material2);
  // box2.scale.set(8, 8, 8);
  // box2.position.x = -250;
  //
  // const box3 = new THREE.Mesh(geometry, material3);
  // box3.scale.set(6, 6, 6);
  // box3.position.x = -350;
  //
  // group3.add(box3);
  // group2.add(box2, group3);
  // group1.add(box1, group2);
  // scene.add(group1);

  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: "hotpink",
  });

  const group1 = new THREE.Group();
  const material1 = new THREE.MeshStandardMaterial({
    roughness: 50,
    map: marsTexture,
  });
  const material2 = new THREE.MeshPhongMaterial({
    specular: 0x050505,
    shininess: 50,
    map: venusTexture,
  });
  const material3 = new THREE.MeshPhongMaterial({
    specular: 0x050505,
    shininess: 50,
    map: mercuryTexture,
  });

  const box1 = new THREE.Mesh(geometry, material1);

  const group2 = new THREE.Group();
  // const box2 = new THREE.Mesh(geometry, material);
  const box2 = new THREE.Mesh(geometry, material2);
  box2.scale.set(0.3, 0.3, 0.3);
  group2.position.x = 15;

  // const group3 = new THREE.Object3D();
  const group3 = new THREE.Group();
  const box3 = new THREE.Mesh(geometry, material3);
  box3.scale.set(0.15, 0.15, 0.15);
  box3.position.x = 5;

  group3.add(box3);
  group2.add(box2, group3);
  group1.add(box1, group2);
  scene.add(group1);
  // group.position.set(0, 0, 0);
  // group.rotation.z = THREE.MathUtils.degToRad(90);
  // group.rotation.x = THREE.MathUtils.degToRad(180);
  // group.rotation.reorder("XYZ");
  // group.scale.set(1.5, 1.5, 1.5);
  camera.lookAt(group1.position);
  camera.position.set(30, 30, 30);
  // fbx.position.set(350, 350, 350);
  // fbx.scale.set(1, 1, 1);

  fbx.position.y = 20;
  group.add(fbx);
  scene.add(camera);
  scene.add(group);

  useEffect(() => {
    (async () => {
      const dat = await import("dat.gui");
      const gui = new dat.GUI();
      gui.add(group.position, "y", -100, 100, 0.01).name("그룹 포지션 y");
      gui.add(group.position, "x", -100, 100, 0.01).name("그룹 포지션 x");
      gui.add(group.position, "z", -100, 100, 0.01).name("그룹 포지션 z");
      gui.add(group.rotation, "z", -100, 100, 0.01).name("그룹 로테이션 z");
      gui.add(camera.position, "x", -500, 500, 0.01).name("카메라 포지션 x");
      gui.add(camera.position, "y", -500, 500, 0.01).name("카메라 포지션 y");
      gui.add(camera.position, "z", -500, 500, 0.01).name("카메라 포지션 z");
      group.rotation.reorder("XYZ");
      camera.lookAt(group.position);
    })();
  }, [group, camera]);

  useEffect(() => {
    const draw = () => {
      const delta = clock.getDelta();
      group1.rotation.y += delta;
      group2.rotation.y += delta;
      group3.rotation.y += delta;
      camera.lookAt(group1.position);
      requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <Suspense fallback={null}>
      <primitive object={scene} scale={0.006} />
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1} position={[0, 10, 40]} />
      <Stats />
      <planeGeometry />
      <axesHelper />
      <gridHelper />
      <OrbitControls />
    </Suspense>
  );
};
const Moa2 = () => {
  let camera = new THREE.PerspectiveCamera(75, 1000, 0.1, 1000);

  camera.position.y = 1.5;
  camera.position.z = 4;

  return (
    <div className="App">
      <Canvas
        gl={{ antialias: true, pixelRatio: 2 }}
        camera={camera}
        style={{ height: "100vh", width: "100wh" }}
      >
        <Scene camera={camera} />
      </Canvas>
    </div>
  );
};
export default Moa2;
