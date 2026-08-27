import * as THREE from 'three';

export type ChameleonNodes = {
  root: THREE.Group;
  body: THREE.Group;
  neck: THREE.Group;
  headPivot: THREE.Group;
  leftEyePivot: THREE.Group;
  leftEye: THREE.Group;
  rightEyePivot: THREE.Group;
  rightEye: THREE.Group;
  jawPivot: THREE.Group;
  tailRoot: THREE.Group;
};

export type ChameleonModel = { root: THREE.Group; nodes: ChameleonNodes };

const skin = new THREE.MeshPhysicalMaterial({ color: '#79ae87', roughness: 0.68, metalness: 0, clearcoat: 0.08, clearcoatRoughness: 0.72 });
const skinDark = new THREE.MeshStandardMaterial({ color: '#3f7967', roughness: 0.76 });
const skinLight = new THREE.MeshStandardMaterial({ color: '#a9c98f', roughness: 0.72 });
const ochre = new THREE.MeshStandardMaterial({ color: '#a99b63', roughness: 0.76 });
const mouth = new THREE.MeshStandardMaterial({ color: '#7f4437', roughness: 0.62 });
const pupil = new THREE.MeshPhysicalMaterial({ color: '#080b08', roughness: 0.12, clearcoat: 1 });
const iris = new THREE.MeshPhysicalMaterial({ color: '#c2a653', roughness: 0.24, clearcoat: 0.7, clearcoatRoughness: 0.16 });
const catchlight = new THREE.MeshBasicMaterial({ color: '#fffdf0' });

function mesh(name: string, geometry: THREE.BufferGeometry, material: THREE.Material = skin) {
  const value = new THREE.Mesh(geometry, material);
  value.name = name;
  value.castShadow = true;
  value.receiveShadow = true;
  return value;
}

function ellipsoid(name: string, scale: [number, number, number], material: THREE.Material = skin, segments = 32) {
  const value = mesh(name, new THREE.SphereGeometry(1, segments, Math.max(16, segments / 2)), material);
  value.scale.set(...scale);
  return value;
}

function capsuleBetween(name: string, start: THREE.Vector3, end: THREE.Vector3, radius: number, material: THREE.Material = skin) {
  const length = start.distanceTo(end);
  const value = mesh(name, new THREE.CapsuleGeometry(radius, Math.max(0.02, length - radius * 2), 8, 18), material);
  value.position.copy(start).add(end).multiplyScalar(0.5);
  value.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize());
  return value;
}

function addScales(parent: THREE.Object3D, count: number, zone: { center: THREE.Vector3; spread: THREE.Vector3; scale: number }, seed = 1) {
  const geometry = new THREE.SphereGeometry(1, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2);
  const material = new THREE.MeshStandardMaterial({ color: '#82b48b', roughness: 0.82 });
  const scales = new THREE.InstancedMesh(geometry, material, count);
  scales.name = `${parent.name}-scale-field`;
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const size = new THREE.Vector3();
  let state = seed >>> 0;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let index = 0; index < count; index += 1) {
    const angle = random() * Math.PI * 2;
    const radial = Math.sqrt(random());
    position.set(
      zone.center.x + Math.cos(angle) * zone.spread.x * radial,
      zone.center.y + (random() - 0.5) * zone.spread.y,
      zone.center.z + zone.spread.z * (0.9 + random() * 0.035),
    );
    quaternion.setFromEuler(new THREE.Euler((random() - 0.5) * 0.25, 0, angle));
    const s = zone.scale * (0.72 + random() * 0.46);
    size.set(s, s * 0.78, s * 0.08);
    matrix.compose(position, quaternion, size);
    scales.setMatrixAt(index, matrix);
  }
  scales.castShadow = true;
  parent.add(scales);
}

function createEye(side: 'left' | 'right') {
  const pivot = new THREE.Group();
  pivot.name = `${side}EyePivot`;
  const eye = new THREE.Group();
  eye.name = `${side}Eye`;
  pivot.add(eye);

  const turret = ellipsoid(`${side}-eye-turret`, [0.47, 0.52, 0.32], skinLight, 36);
  eye.add(turret);
  const outerRing = mesh(`${side}-eye-outer-ring`, new THREE.TorusGeometry(0.39, 0.052, 10, 42), skinDark);
  outerRing.position.z = 0.285;
  eye.add(outerRing);
  const innerRing = mesh(`${side}-eye-inner-ring`, new THREE.TorusGeometry(0.225, 0.034, 10, 36), ochre);
  innerRing.position.z = 0.322;
  eye.add(innerRing);
  const irisMesh = mesh(`${side}-iris`, new THREE.CircleGeometry(0.198, 40), iris);
  irisMesh.position.z = 0.36;
  eye.add(irisMesh);
  const pupilMesh = mesh(`${side}-pupil`, new THREE.CircleGeometry(0.076, 32), pupil);
  pupilMesh.position.z = 0.369;
  eye.add(pupilMesh);
  const glint = mesh(`${side}-catchlight`, new THREE.CircleGeometry(0.038, 18), catchlight);
  glint.position.set(-0.055, 0.07, 0.376);
  eye.add(glint);
  return { pivot, eye };
}

function addLimb(parent: THREE.Group, side: -1 | 1, front: boolean) {
  const prefix = `${side === 1 ? 'left' : 'right'}-${front ? 'arm' : 'leg'}`;
  if (front) {
    const shoulder = new THREE.Vector3(side * 0.67, 1.85, 0.01);
    const elbow = new THREE.Vector3(side * 0.95, 1.08, 0.13);
    const wrist = new THREE.Vector3(side * 1.05, 0.48, 0.22);
    parent.add(capsuleBetween(`${prefix}-upper`, shoulder, elbow, 0.18));
    parent.add(capsuleBetween(`${prefix}-fore`, elbow, wrist, 0.145));
    const palm = ellipsoid(`${prefix}-hand`, [0.18, 0.26, 0.13], skinLight, 20);
    palm.position.copy(wrist).add(new THREE.Vector3(0, -0.16, 0));
    parent.add(palm);
    [-0.1, 0, 0.1].forEach((offset, index) => {
      const digitStart = wrist.clone().add(new THREE.Vector3(side * offset, -0.25, 0.02));
      const digitEnd = digitStart.clone().add(new THREE.Vector3(side * (index - 1) * 0.08, -0.28 - index * 0.025, 0.06));
      parent.add(capsuleBetween(`${prefix}-digit-${index + 1}`, digitStart, digitEnd, 0.052, skinLight));
    });
    return;
  }
  const hip = new THREE.Vector3(side * 0.48, 0.2, 0);
  const knee = new THREE.Vector3(side * 0.72, -0.62, 0.15);
  const ankle = new THREE.Vector3(side * 0.58, -1.2, 0.26);
  parent.add(capsuleBetween(`${prefix}-thigh`, hip, knee, 0.27));
  parent.add(capsuleBetween(`${prefix}-shin`, knee, ankle, 0.22));
  const sole = ellipsoid(`${prefix}-foot`, [0.42, 0.13, 0.34], skinLight, 24);
  sole.position.set(side * 0.58, -1.34, 0.43);
  parent.add(sole);
  [-1, 0, 1].forEach((digit, index) => {
    const start = new THREE.Vector3(side * (0.58 + digit * 0.12), -1.35, 0.53);
    const end = new THREE.Vector3(side * (0.58 + digit * 0.19), -1.37, 0.88 - Math.abs(digit) * 0.04);
    parent.add(capsuleBetween(`${prefix}-toe-${index + 1}`, start, end, 0.075, skinLight));
  });
}

function createTail() {
  const tailRoot = new THREE.Group();
  tailRoot.name = 'tailRoot';
  const points: THREE.Vector3[] = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.48, 0.05, -0.03),
    new THREE.Vector3(1.02, 0.2, -0.02),
    new THREE.Vector3(1.34, 0.36, 0),
  ];
  for (let index = 0; index <= 64; index += 1) {
    const t = index / 64;
    const angle = t * Math.PI * 3.55;
    const radius = 0.98 * (1 - t * 0.79);
    points.push(new THREE.Vector3(1.34 + Math.sin(angle) * radius, 1.32 - Math.cos(angle) * radius, t * 0.035));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const tailGeometry = new THREE.TubeGeometry(curve, 150, 0.29, 14, false);
  const tailPositions = tailGeometry.getAttribute('position');
  const ringSize = 15;
  const point = new THREE.Vector3();
  const center = new THREE.Vector3();
  for (let index = 0; index < tailPositions.count; index += 1) {
    const ring = Math.floor(index / ringSize);
    const t = Math.min(1, ring / 150);
    center.copy(curve.getPoint(t));
    point.fromBufferAttribute(tailPositions, index);
    point.sub(center).multiplyScalar(1 - t * 0.74).add(center);
    tailPositions.setXYZ(index, point.x, point.y, point.z);
  }
  tailPositions.needsUpdate = true;
  tailGeometry.computeVertexNormals();
  const tail = mesh('tail', tailGeometry, skin);
  tailRoot.add(tail);
  return tailRoot;
}

export function createChameleonModel(): ChameleonModel {
  const root = new THREE.Group();
  root.name = 'root';
  root.userData.sculptRuntime = { version: 1, interactive: true, colliders: [], nodes: {} };

  const body = new THREE.Group();
  body.name = 'body';
  root.add(body);
  const torso = ellipsoid('torso', [0.78, 1.28, 0.57], skin, 40);
  torso.position.y = 0.72;
  body.add(torso);
  const belly = ellipsoid('belly', [0.58, 0.98, 0.045], skinLight, 30);
  belly.position.set(0, 0.65, 0.555);
  body.add(belly);
  [
    [-0.44, 1.28, 0.525, 0.2, 0.34, -0.16],
    [0.46, 0.95, 0.53, 0.16, 0.27, 0.18],
    [-0.37, 0.37, 0.52, 0.18, 0.26, 0.08],
  ].forEach(([x, y, z, sx, sy, rz], index) => {
    const patch = ellipsoid(`torso-teal-patch-${index + 1}`, [sx, sy, 0.025], skinDark, 18);
    patch.position.set(x, y, z);
    patch.rotation.z = rz;
    body.add(patch);
  });
  addScales(body, 150, { center: new THREE.Vector3(0, 0.82, 0), spread: new THREE.Vector3(0.52, 1.65, 0.55), scale: 0.032 }, 22);
  addLimb(body, 1, true);
  addLimb(body, -1, true);
  addLimb(body, 1, false);
  addLimb(body, -1, false);

  const neck = new THREE.Group();
  neck.name = 'neck';
  neck.position.set(0, 1.72, -0.02);
  body.add(neck);
  const neckMesh = ellipsoid('neck-volume', [0.55, 0.72, 0.45], skin, 30);
  neckMesh.position.y = 0.25;
  neck.add(neckMesh);

  const headPivot = new THREE.Group();
  headPivot.name = 'headPivot';
  headPivot.position.set(0, 0.52, 0.01);
  neck.add(headPivot);
  const cranium = ellipsoid('cranium', [1.02, 0.86, 0.63], skin, 44);
  cranium.position.set(0, 0.45, 0.02);
  headPivot.add(cranium);
  const muzzle = ellipsoid('broad-muzzle', [0.94, 0.39, 0.31], skinLight, 40);
  muzzle.position.set(0, 0.08, 0.5);
  headPivot.add(muzzle);
  const cheekPatch = ellipsoid('cheek-teal-patch', [0.24, 0.17, 0.025], skinDark, 18);
  cheekPatch.position.set(0.43, -0.08, 0.77);
  cheekPatch.rotation.z = -0.2;
  headPivot.add(cheekPatch);
  addScales(headPivot, 120, { center: new THREE.Vector3(0, 0.3, 0.15), spread: new THREE.Vector3(0.72, 0.7, 0.58), scale: 0.029 }, 91);

  const casque = mesh('casque', new THREE.ConeGeometry(0.68, 1.12, 3, 3), skin);
  casque.position.set(0, 1.03, -0.1);
  casque.rotation.y = Math.PI / 2;
  casque.rotation.z = -0.08;
  casque.scale.z = 0.42;
  headPivot.add(casque);
  for (let index = 0; index < 9; index += 1) {
    const plate = ellipsoid(`casque-edge-plate-${index}`, [0.075, 0.1, 0.07], ochre, 12);
    const t = index / 8;
    plate.position.set(-0.58 + t * 0.75, 0.68 + Math.sin(t * Math.PI) * 0.7, 0.28);
    headPivot.add(plate);
  }

  const left = createEye('left');
  left.pivot.position.set(0.61, 0.48, 0.51);
  left.pivot.scale.setScalar(0.92);
  left.pivot.rotation.y = -0.1;
  headPivot.add(left.pivot);
  const right = createEye('right');
  right.pivot.position.set(-0.61, 0.48, 0.51);
  right.pivot.scale.setScalar(0.92);
  right.pivot.rotation.y = 0.1;
  headPivot.add(right.pivot);

  const jawPivot = new THREE.Group();
  jawPivot.name = 'jawPivot';
  jawPivot.position.set(0, -0.02, 0.28);
  headPivot.add(jawPivot);
  const jaw = ellipsoid('lower-jaw', [0.84, 0.28, 0.34], skinLight, 36);
  jaw.position.set(0, -0.19, 0.18);
  jawPivot.add(jaw);
  const mouthCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.68, 0.02, 0),
    new THREE.Vector3(-0.34, -0.01, 0.025),
    new THREE.Vector3(0, -0.025, 0.035),
    new THREE.Vector3(0.34, -0.01, 0.025),
    new THREE.Vector3(0.68, 0.025, 0),
  ]);
  const mouthLine = mesh('mouth', new THREE.TubeGeometry(mouthCurve, 42, 0.018, 6, false), mouth);
  mouthLine.position.set(0, 0.02, 0.57);
  jawPivot.add(mouthLine);
  const nostril = mesh('nostril', new THREE.TorusGeometry(0.055, 0.018, 7, 20), mouth);
  nostril.position.set(0.29, 0.21, 0.785);
  headPivot.add(nostril);

  for (let index = 0; index < 7; index += 1) {
    const spine = mesh(`dorsal-spine-${index}`, new THREE.ConeGeometry(0.09 - index * 0.006, 0.22 - index * 0.01, 5), ochre);
    spine.position.set(0, 0.2 - index * 0.25, -0.57 - index * 0.005);
    spine.rotation.x = -0.25;
    neck.add(spine);
  }

  const tailRoot = createTail();
  tailRoot.position.set(-0.15, -0.02, -0.37);
  body.add(tailRoot);

  root.position.y = 0.1;
  root.rotation.y = -0.1;
  const nodes = { root, body, neck, headPivot, leftEyePivot: left.pivot, leftEye: left.eye, rightEyePivot: right.pivot, rightEye: right.eye, jawPivot, tailRoot };
  root.userData.sculptRuntime.nodes = nodes;
  root.traverse((child) => { child.userData.selectable = true; });
  return { root, nodes };
}
