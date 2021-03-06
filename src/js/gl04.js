import Core from './webgl/Core';
import param from './const/param4';
import vertShader from '../glsl/gl03plane.vert';
import FragShader from '../glsl/gl04plane.frag';

class WG extends Core {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.clock = new THREE.Clock();
  }
  init() {
    super.init();
    this.camera = super.createCamera();
    super.updatePerspectiveCamera(this.camera, this.width, this.height);
    this._initPlane();

    console.log(this.uniforms);
  }
  _initPlane() {
    this.uniforms = {
      time: {type: 'f', value: 0},
      resolution: {type: 'v2', value: new THREE.Vector2(this.width, this.height)},
      tDiffuse: {type: 't', value: new THREE.TextureLoader().load( 'https://www.sway.tokyo/blur/images/sample.jpg' )},
      speed: {type: 'f', value: param.base.speed.value },
      force: {type: 'i', value: param.base.force.value },
      offsetX: {type: 'f', value: param.base.offsetX.value },
      frequency: {type: 'f', value: param.base.frequency.value },
    }

    this.geometory = new THREE.PlaneBufferGeometry(this.width, this.height);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: FragShader,
      uniforms: this.uniforms
    });
    this.mesh = new THREE.Mesh(this.geometory, this.material);

    this.mainScene.add(this.mesh);
  }
  _updateUniforms() {
    this.uniforms.time.value += this.clock.getDelta();
  }
  update() {
    this._updateUniforms();
    super.update();
  }
}

let wg = new WG();
wg.init();

const tick = () => {
  requestAnimationFrame(tick);
  wg.update();
};
tick();


param.base.speed.gui.onChange((val) => {
  wg.uniforms.speed.value = val;
});
param.base.force.gui.onChange((val) => {
  wg.uniforms.force.value = val;
});
param.base.offsetX.gui.onChange((val) => {
  wg.uniforms.offsetX.value = val;
});
param.base.frequency.gui.onChange((val) => {
  wg.uniforms.frequency.value = val;
});