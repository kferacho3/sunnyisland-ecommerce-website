export const fireVertexShader = `
  varying vec3 vWorldPos;
  void main() {
      vWorldPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fireFragmentShader = `
  uniform vec3 color;
  uniform float time;
  uniform sampler2D fireTex;
  varying vec3 vWorldPos;
  
  void main() {
      vec3 p = vWorldPos;
      float n = sin(dot(p, vec3(1.0)) * 10.0 + time);
      gl_FragColor = texture2D(fireTex, p.xy) * vec4(color, 1.0) * n;
  }
`;
