export interface Matriz2D {
  a: number; // scaleX
  b: number; // skewY
  c: number; // skewX
  d: number; // scaleY
  e: number; // translateX
  f: number; // translateY
}

export function mat2dToMatriz2D(m: Float32Array): Matriz2D {
  return { a: m[0], b: m[1], c: m[2], d: m[3], e: m[4], f: m[5] };
}
