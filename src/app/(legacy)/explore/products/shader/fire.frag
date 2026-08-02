#pragma glslify: snoise = require(glsl-noise/simplex/3d)

uniform vec3 color;
uniform float time;
uniform sampler2D fireTex;
varying vec3 vWorldPos;

void main() {
    vec3 p = vWorldPos;
    float n = snoise(p * 3.0 + time);
    gl_FragColor = texture2D(fireTex, p.xy) * vec4(color, 1.0) * n;
}
