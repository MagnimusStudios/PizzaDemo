import{av as F,aw as S,aH as H,aF as M,aO as W,aS as w,cJ as D,aQ as E,aR as O}from"./three.module-492dddd8.js";const d={node:"node",material:"material",camera:"camera",light:"light"},R="KHR_animation_pointer",B={CUBICSPLINE:void 0,LINEAR:H,STEP:W},K=F.findNode;let C=!1;class L{constructor(r){this.parser=r,this.name=R,this.animationPointerResolver=null}setAnimationPointerResolver(r){return this.animationPointerResolver=r,this}_patchPropertyBindingFindNode(){C||(C=!0,F.findNode=function(r,n){if(n.startsWith(".materials.")){const i=n.substring(11).substring(n.indexOf(".")),e=i.indexOf("."),t=e<0?i:i.substring(0,e);let s=null;return r.traverse(o=>{s!==null||o.type!=="Mesh"&&o.type!=="SkinnedMesh"||o.material&&(o.material.uuid===t||o.material.name===t)&&(s=o.material,s!==null&&(i.endsWith(".map")?s=s.map:i.endsWith(".emissiveMap")&&(s=s.emissiveMap)))}),s}else if(n.startsWith(".nodes.")||n.startsWith(".lights.")||n.startsWith(".cameras.")){const i=n.split(".");let e;for(let t=1;t<i.length;t++){const s=i[t];if(s.length==36)e=r.getObjectByProperty("uuid",s);else if(e&&e[s]){const c=Number.parseInt(s);let a=s;c>=0&&(a=c),e=e[a]}else{const c=r.getObjectByName(s);c&&(e=c)}}if(!e){const t=K(r,i[2]);return t||console.warn(R+": Property binding not found",n,r,r.name,i),t}return e}return K(r,n)})}loadAnimationTargetFromChannel(r){const n=r.target,i=n.node!==void 0?n.node:n.id;return this.parser.getDependency("node",i)}loadAnimationTargetFromChannelWithAnimationPointer(r){this._havePatchedPropertyBindings||this._patchPropertyBindingFindNode();const n=r.target,i=n.extensions&&n.extensions[R]&&n.path&&n.path==="pointer";if(!i)return null;let e,t=d.node,s;if(i){const c=n.extensions[R];let a=c.pointer;if(!a){console.warn("Invalid path",c,n);return}if(a.startsWith("/materials/")?t=d.material:a.startsWith("/extensions/KHR_lights_punctual/lights/")?t=d.light:a.startsWith("/cameras/")&&(t=d.camera),s=this._tryResolveTargetId(a,t),s===null||isNaN(s)){console.warn("Failed resolving animation node id: "+s,a);return}switch(t){case d.material:const x=("/materials/"+s.toString()+"/").length,u=a.substring(0,x);switch(e=a.substring(x),e){case"pbrMetallicRoughness/baseColorFactor":e="color";break;case"pbrMetallicRoughness/roughnessFactor":e="roughness";break;case"pbrMetallicRoughness/metallicFactor":e="metalness";break;case"emissiveFactor":e="emissive";break;case"alphaCutoff":e="alphaTest";break;case"occlusionTexture/strength":e="aoMapIntensity";break;case"normalTexture/scale":e="normalScale";break;case"pbrMetallicRoughness/baseColorTexture/extensions/KHR_texture_transform/scale":e="map/repeat";break;case"pbrMetallicRoughness/baseColorTexture/extensions/KHR_texture_transform/offset":e="map/offset";break;case"emissiveTexture/extensions/KHR_texture_transform/scale":e="emissiveMap/repeat";break;case"emissiveTexture/extensions/KHR_texture_transform/offset":e="emissiveMap/offset";break;case"extensions/KHR_materials_emissive_strength/emissiveStrength":e="emissiveIntensity";break;case"extensions/KHR_materials_transmission/transmissionFactor":e="transmission";break;case"extensions/KHR_materials_ior/ior":e="ior";break;case"extensions/KHR_materials_volume/thicknessFactor":e="thickness";break;case"extensions/KHR_materials_volume/attenuationColor":e="attenuationColor";break;case"extensions/KHR_materials_volume/attenuationDistance":e="attenuationDistance";break;case"extensions/KHR_materials_iridescence/iridescenceFactor":e="iridescence";break;case"extensions/KHR_materials_iridescence/iridescenceIor":e="iridescenceIOR";break;case"extensions/KHR_materials_iridescence/iridescenceThicknessMinimum":e="iridescenceThicknessRange[0]";break;case"extensions/KHR_materials_iridescence/iridescenceThicknessMaximum":e="iridescenceThicknessRange[1]";break;case"extensions/KHR_materials_clearcoat/clearcoatFactor":e="clearcoat";break;case"extensions/KHR_materials_clearcoat/clearcoatRoughnessFactor":e="clearcoatRoughness";break;case"extensions/KHR_materials_sheen/sheenColorFactor":e="sheenColor";break;case"extensions/KHR_materials_sheen/sheenRoughnessFactor":e="sheenRoughness";break;case"extensions/KHR_materials_specular/specularFactor":e="specularIntensity";break;case"extensions/KHR_materials_specular/specularColorFactor":e="specularColor";break}a=u+e;break;case d.node:const l=("/nodes/"+s.toString()+"/").length,m=a.substring(0,l);switch(e=a.substring(l),e){case"translation":e="position";break;case"rotation":e="quaternion";break;case"scale":e="scale";break;case"weights":e="morphTargetInfluences";break}a=m+e;break;case d.light:const h=("/extensions/KHR_lights_punctual/lights/"+s.toString()+"/").length;switch(e=a.substring(h),e){case"color":break;case"intensity":break;case"spot/innerConeAngle":e="penumbra";break;case"spot/outerConeAngle":e="angle";break;case"range":e="distance";break}a="/lights/"+s.toString()+"/"+e;break;case d.camera:const p=("/cameras/"+s.toString()+"/").length,f=a.substring(0,p);switch(e=a.substring(p),e){case"perspective/yfov":e="fov";break;case"perspective/znear":case"orthographic/znear":e="near";break;case"perspective/zfar":case"orthographic/zfar":e="far";break;case"perspective/aspect":e="aspect";break;case"orthographic/xmag":e="zoom";break;case"orthographic/ymag":e="zoom";break}a=f+e;break}const _=this.animationPointerResolver;_&&_.resolvePath&&(a=_.resolvePath(a)),n.extensions[R].pointer=a}if(s===null||isNaN(s)){console.warn("Failed resolving animation node id: "+s,n);return}let o;return t===d.node?o=this.parser.getDependency("node",s):t===d.material?o=this.parser.getDependency("material",s):t===d.light?o=this.parser.getDependency("light",s):t===d.camera?o=this.parser.getDependency("camera",s):console.error("Unhandled type",t),o}createAnimationTracksWithAnimationPointer(r,n,i,e,t){if(!(t.extensions&&t.extensions[R]&&t.path&&t.path==="pointer"))return null;let o=t.extensions[R].pointer;if(!o)return null;const c=[];o=o.replaceAll("/",".");const a=o.split(".");var x=r.name!==void 0&&r.name!==null?r.name:r.uuid;if(a[2]=x,a[3]==="morphTargetInfluences"&&r.type==="Group"){for(const l of r.children)l instanceof S&&l.morphTargetInfluences&&(a[3]=l.name,a[4]="morphTargetInfluences",u(this.parser));return c}u(this.parser);function u(l){o=a.join(".");let m;switch(i.itemSize){case 1:m=O;break;case 2:case 3:m=E;break;case 4:o.endsWith(".quaternion")?m=w:m=D;break}const h=e.interpolation!==void 0?B[e.interpolation]:H;let p=l._getArrayFromAccessor(i);o.endsWith(".fov")&&(p=p.map(b=>b/Math.PI*180));const f=new m(o,n.array,p,h);if(h==="CUBICSPLINE"&&l._createCubicSplineTrackInterpolant(f),c.push(f),o&&i.itemSize===4&&o.startsWith(".materials.")&&o.endsWith(".color")){const b=new Float32Array(p.length/4);for(let T=0,k=p.length/4;T<k;T+=1)b[T]=p[T*4+3];const g=new m(o.replace(".color",".opacity"),n.array,b,h);h==="CUBICSPLINE"&&l._createCubicSplineTrackInterpolant(f),c.push(g)}}return c}_tryResolveTargetId(r,n){let i="";return n==="node"?i=r.substring(7):n==="material"?i=r.substring(11):n==="light"?i=r.substring(39):n==="camera"&&(i=r.substring(9)),i=i.substring(0,i.indexOf("/")),Number.parseInt(i)}loadAnimation(r){const n=this,i=this.parser.json,e=this.parser,t=i.animations[r],s=t.name?t.name:"animation_"+r,o=[],c=[],a=[],_=[],x=[];for(let u=0,l=t.channels.length;u<l;u++){const m=t.channels[u],h=t.samplers[m.sampler],p=m.target,f=t.parameters!==void 0?t.parameters[h.input]:h.input,b=t.parameters!==void 0?t.parameters[h.output]:h.output;let g=n.loadAnimationTargetFromChannelWithAnimationPointer(m);g||(g=n.loadAnimationTargetFromChannel(m)),o.push(g),c.push(e.getDependency("accessor",f)),a.push(e.getDependency("accessor",b)),_.push(h),x.push(p)}return Promise.all([Promise.all(o),Promise.all(c),Promise.all(a),Promise.all(_),Promise.all(x)]).then(function(u){const l=u[0],m=u[1],h=u[2],p=u[3],f=u[4],b=[];for(let g=0,T=l.length;g<T;g++){const k=l[g],P=m[g],v=h[g],A=p[g],N=f[g];if(k===void 0)continue;k.updateMatrix&&(k.updateMatrix(),k.matrixAutoUpdate=!0);let y=n.createAnimationTracksWithAnimationPointer(k,P,v,A,N);if(y||(y=e._createAnimationTracks(k,P,v,A,N)),y)for(let I=0;I<y.length;I++)b.push(y[I])}return new M(s,void 0,b)})}}export{L as GLTFAnimationPointerExtension};
