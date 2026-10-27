const NOISE = `float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(p);p=p*2.03+vec2(3.1,1.7);a*=.5;}return s;}`;

/** Full-screen liquid gradient background. */
export const bgVertex = "void main(){gl_Position=vec4(position.xy,0.,1.);}";
export const bgFragment = `uniform float uT,uV;uniform vec2 uR,uM;uniform vec3 uC1,uC2,uC3,uA,uRip;${NOISE}
void main(){vec2 uv=gl_FragCoord.xy/uR;vec2 p=(uv-.5)*vec2(uR.x/uR.y,1.);float t=uT*.06;
vec2 q=vec2(fbm(p*1.5+t),fbm(p*1.5-t+5.));vec2 w=p+(q-.5)*(.8+uV*1.0);float f=fbm(w*1.8+t*2.);
float g=uv.y+(f-.5)*.5;vec3 c=mix(uC3,uC2,smoothstep(.0,.55,g));c=mix(c,uC1,smoothstep(.45,1.,g));
c=mix(c,uA,smoothstep(.62,.9,f)*.04);
vec2 mp=uM*vec2(uR.x/uR.y,1.)*.5;c=mix(c,uA,exp(-length(p-mp)*3.2)*.12);
float d=length(p-uRip.xy);c=mix(c,uA,exp(-pow((d-uRip.z)*14.,2.))*.5*(1.-uRip.z/2.));
c+=(h(gl_FragCoord.xy+uT)-.5)*.02;gl_FragColor=vec4(c,1.);}`;

/** Particle wave field (DPRX is replaced with the renderer pixel ratio). */
export const waveVertex = `attribute float aR;uniform float uT,uV,uB;uniform vec2 uMW;varying float vA;
void main(){vec3 p=position;float w=sin(p.x*.42+uT*.45)*.5+sin(p.z*.5-uT*.38+p.x*.18)*.45+sin((p.x+p.z)*.75+uT*.8)*.14;w*=1.+uV*1.6;
float d=length(p.xz-uMW);w+=exp(-d*.5)*(.8+uB*1.8)*sin(d*2.2-uT*3.2);p.y=w-3.;
vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;float dep=-mv.z;
gl_PointSize=clamp((1.4+aR*1.6)*DPRX*(16./dep),1.,7.);vA=smoothstep(32.,7.,dep)*(.35+.65*aR)*max(.55+w*.45,.15);}`;
export const waveFragment = `uniform vec3 uA;uniform float uDk;varying float vA;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 c=mix(vec3(.02,.22,.14),uA,uDk);gl_FragColor=vec4(c,smoothstep(.5,.1,d)*vA*mix(.18,.9,uDk));}`;

/** Portrait: soft-masked rigid head motion + subtle face shift (no lens distortion). */
export const portraitVertex =
  "varying vec2 vU;uniform vec2 uM;void main(){vU=uv;vec3 p=position;float w=smoothstep(.30,.54,uv.y);vec2 pv=vec2(-.0130,-.16);float a=-uM.x*.075*w;vec2 d=p.xy-pv;p.xy=pv+vec2(cos(a)*d.x-sin(a)*d.y,sin(a)*d.x+cos(a)*d.y);p.xy+=vec2(uM.x*.035,uM.y*.028)*w;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}";
export const portraitFragment =
  "varying vec2 vU;uniform sampler2D uMap;uniform vec2 uM;void main(){float f=1.-smoothstep(.08,.23,length((vU-vec2(.49,.56))*vec2(1.,1.2)));vec2 q=vU-vec2(uM.x*.012,uM.y*.008)*f;gl_FragColor=texture2D(uMap,q);}";
