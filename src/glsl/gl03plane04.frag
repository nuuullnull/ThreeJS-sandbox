varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

@import ./shaping/powerCurve;
@import ./util/transform;
@import ./shape/circle;
@import ./shape/rect;
@import ./util/noise;

#define PI 3.14159263

void main () {
    vec2 st = (gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
    float speed = 1.0;

    float t = powerCurve(0.3, 0.7, sin(time * speed)) * 10.0;

    float a = abs(t);

    float rct = rect(rotate2d(st, a), vec2(0.0), vec2(0.1 * t) + 0.1) - rect(rotate2d(st, a), vec2(0.0), vec2(0.1 * t) + 0.2 * t * 0.8);

    st.x += time * 0.8;

    for(int i = 1; i < 20; i++){
        st.x+= 0.5 / float(i) * (sin(float(i) * 0.5 * st.y + t) + sin(float(i) * 1.2 * st.y + st.x + t)) * 0.5;
        st.y+= 0.5 / float(i) * (cos(float(i) * 1.7 * st.x + t) + cos(float(i) * 0.8 * st.x + st.y + t)) * 0.5;
    }
    for(int i = 1; i < 20; i++){
        st.x+= 0.5 / float(i) * (cos(float(i) * 0.5 * st.y + t) + cos(float(i) * 1.2 * st.y + st.x + t)) * 0.5;
        st.y+= 0.5 / float(i) * (sin(float(i) * 1.7 * st.x + t) + sin(float(i) * 0.8 * st.x + st.y + t)) * 0.5;
    }
    float r = cos(st.x+st.y+1.)*.5+.5;
    float g = (cos(st.x+st.y) + sin(st.x+st.y))*.5+.5;
    float b = sin(st.x+st.y+1.)*.5+.5;

    float d = 1.0 - (r + g + b) / 3.0;

    vec3 color = mix(vec3(0.364, 0.827, 0.9271 * g), vec3(0.9271 * r, 0.364, 0.564), d);

    vec3 dist = (color * (1.0 - rct));
    dist += ((1.0 - color) * (rct));

    gl_FragColor = vec4(dist, 1.0); 
}