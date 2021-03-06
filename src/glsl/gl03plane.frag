varying vec2 vUv;

uniform float time;
uniform vec2 resolution;
uniform sampler2D tDiffuse;

@import ./shaping/powerCurve;
@import ./util/transform;
@import ./shape/circle;
@import ./shape/rect;
@import ./util/noise;

#define PI 3.14159263

void main () {
    vec2 st = (gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);

    vec4 baseColor = texture2D(tDiffuse, vUv);

    vec2 q = vec2(0.);

    float t = time;

    q.x = fbm( st + 0.00 * t);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15 * t );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126 * t);

    float f = fbm(st+r);

    vec4 color = texture2D(tDiffuse, vUv + f * 0.15 - 0.075);

    vec3 c = mix(vec3(0.829102,0.229102,0.898039),
                color.rgb,
                clamp((f*f)*4.0,0.0,1.0));

    c =  mix(c,
                vec3(0.229102,0.25023,0.232381),
                clamp(length(q),0.0,1.0));

    c = mix(c,
                vec3(0.623166667,0.837837,1),
                clamp(length(r.x),0.0,1.0));

    gl_FragColor = vec4(c, 1.0);


    // float speed = 1.0;

    // float t = powerCurve(0.3, 0.7, sin(time * speed)) * 10.0;

    // float a = abs(t);

    // float rct = rect(rotate2d(st, a), vec2(0.0), vec2(0.1 * t) + 0.1) - rect(rotate2d(st, a), vec2(0.0), vec2(0.1 * t) + 0.2 * t * 0.8);

    // st.x += time * 0.8;

    // for(int i = 1; i < 20; i++){
    //     st.x+= 0.5 / float(i) * (sin(float(i) * 0.5 * st.y + t) + sin(float(i) * 1.2 * st.y + st.x + t)) * 0.5;
    //     st.y+= 0.5 / float(i) * (cos(float(i) * 1.7 * st.x + t) + cos(float(i) * 0.8 * st.x + st.y + t)) * 0.5;
    // }
    // for(int i = 1; i < 20; i++){
    //     st.x+= 0.5 / float(i) * (cos(float(i) * 0.5 * st.y + t) + cos(float(i) * 1.2 * st.y + st.x + t)) * 0.5;
    //     st.y+= 0.5 / float(i) * (sin(float(i) * 1.7 * st.x + t) + sin(float(i) * 0.8 * st.x + st.y + t)) * 0.5;
    // }
    // float r = cos(st.x+st.y+1.)*.5+.5;
    // float g = (cos(st.x+st.y) + sin(st.x+st.y))*.5+.5;
    // float b = sin(st.x+st.y+1.)*.5+.5;

    // float d = 1.0 - (r + g + b) / 3.0;

    // vec3 color = mix(vec3(0.364, 0.827, 0.9271 * g), vec3(0.9271 * r, 0.364, 0.564), d);

    // vec3 dist = (color * (1.0 - rct));
    // dist += ((1.0 - color) * (rct));

}