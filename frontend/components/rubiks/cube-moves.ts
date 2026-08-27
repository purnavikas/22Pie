export type Axis = 'x' | 'y' | 'z';
export type Layer = -1 | 1;
export type TurnDirection = -1 | 1;

export type CubeMove = {
  axis: Axis;
  direction: TurnDirection;
  layer: Layer;
  name: 'R' | 'L' | 'U' | 'D' | 'F' | 'B';
};

const MOVE_FACES: Omit<CubeMove, 'direction'>[] = [
  { axis: 'x', layer: 1, name: 'R' },
  { axis: 'x', layer: -1, name: 'L' },
  { axis: 'y', layer: 1, name: 'U' },
  { axis: 'y', layer: -1, name: 'D' },
  { axis: 'z', layer: 1, name: 'F' },
  { axis: 'z', layer: -1, name: 'B' },
];

export function randomMove(previous?: CubeMove): CubeMove {
  const choices = MOVE_FACES.filter(
    (move) => !previous || move.axis !== previous.axis || move.layer !== previous.layer,
  );
  const face = choices[Math.floor(Math.random() * choices.length)];
  return { ...face, direction: Math.random() > 0.5 ? 1 : -1 };
}
