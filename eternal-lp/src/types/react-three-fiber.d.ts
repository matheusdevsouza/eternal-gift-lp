declare module "@react-three/fiber" {
  import { ReactThreeFiber } from "@react-three/fiber";
  import * as THREE from "three";

  global {
    namespace JSX {
      interface IntrinsicElements {
        ambientLight: ReactThreeFiber.Object3DNode<
          THREE.AmbientLight,
          typeof THREE.AmbientLight
        >;
        directionalLight: ReactThreeFiber.Object3DNode<
          THREE.DirectionalLight,
          typeof THREE.DirectionalLight
        >;
        pointLight: ReactThreeFiber.Object3DNode<
          THREE.PointLight,
          typeof THREE.PointLight
        >;
        mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
        boxGeometry: ReactThreeFiber.BufferGeometryNode<
          THREE.BoxGeometry,
          typeof THREE.BoxGeometry
        >;
        meshStandardMaterial: ReactThreeFiber.MaterialNode<
          THREE.MeshStandardMaterial,
          typeof THREE.MeshStandardMaterial
        >;
        group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
        primitive: { object: any; [key: string]: any };
        spotLight: any;
      }
    }
  }
}
