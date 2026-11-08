const $=id=>document.getElementById(id);
const EVQ=((location.hash+location.search).match(/event=(\w+)/)||[])[1]||'';
const _dt=new Date(),MMDD=(_dt.getMonth()+1)*100+_dt.getDate();
const evOn=k=>EVQ?(EVQ==k||(EVQ=='halloween'&&k=='infection')):(k=='summer'?MMDD>=601&&MMDD<=715:k=='halloween'?MMDD>=1025&&MMDD<=1103:k=='winter'?MMDD>=1115&&MMDD<=1231:k=='infection'?MMDD>=1030&&MMDD<=1031:false);
const EV=evOn('winter')?'winter':evOn('summer')?'summer':evOn('halloween')?'halloween':'';
const SKYC=EV=='halloween'?[[0,'#0a0208'],[.3,'#220a1c'],[.45,'#5a1a10'],[.5,'#ff7a00'],[.501,'#0a0208'],[1,'#0a0208']]:EV=='summer'?[[0,'#0a2a6a'],[.3,'#1f6fd0'],[.45,'#6fc3ff'],[.5,'#ffd38a'],[.501,'#1b3a5a'],[1,'#1b3a5a']]:EV=='winter'?[[0,'#04102a'],[.3,'#0b2a52'],[.45,'#3a6a9c'],[.5,'#cfe8ff'],[.501,'#0b1a2e'],[1,'#0b1a2e']]:[[0,'#03010a'],[.3,'#10052e'],[.45,'#3a1272'],[.5,'#d62bd6'],[.501,'#07050f'],[1,'#07050f']];
const FOGC=EV=='halloween'?0x1a0a10:EV=='summer'?0x6fa8d8:EV=='winter'?0x2a4a6a:0x0a0720;
const T4=[{n:'Cyan',c:0x00e5ff},{n:'Magenta',c:0xff2bd6},{n:'Lime',c:0x9dff00},{n:'Orange',c:0xff9100}],T2=[{n:'Neon Red',c:0xff2040},{n:'Neon Blue',c:0x2a6bff}];
const MODES=[{n:'4 TEAMS',d:'Cyan · Magenta · Lime · Orange',t:T4},{n:'2 TEAMS',d:'Neon Red vs Neon Blue',t:T2},{n:'JUGGERNAUT',d:'1 Juggernaut (5000 HP) vs 15 Hunters',t:[{n:'Juggernaut',c:0xff2040},{n:'Hunters',c:0x00e5ff}]},
{n:'DEATHMATCH',d:'Free for all · 100 × 100 map',t:Array.from({length:16},(_,i)=>({n:'P'+i,c:new THREE.Color().setHSL(i/16,1,.55).getHex()})),fm:4},
{n:'CAPTURE THE FLAG',d:'Red vs Blue · 110 × 75 map',t:T2.map(x=>({...x})),fm:5},
{n:'SLIPPERY',d:'❄ Winter · 4 teams on ice',t:T4.map(x=>({...x})),ev:'winter'},
{n:'INFECTION',d:'🎃 Halloween · 3 min · zombies with knives',t:[{n:'Humans',c:0x00e5ff},{n:'Zombies',c:0x7dff3a}],fm:6,ev:'infection'},{n:'DUEL',d:'1v1 · 2v2 · 4v4',t:T2.map(x=>({...x})),hid:1}];
const avail=()=>MODES.map((m,i)=>i).filter(i=>!MODES[i].hid&&(!MODES[i].ev||evOn(MODES[i].ev)));
let MD=0,MP=0,T=MODES[0].t,A=34;
const WP=[{n:'Pistol',d:24,cd:.32,sp:.008,v:82,p:1,r:[7,15],rc:.5,fd:0,mag:7,res:21,rt:.65},{n:'SMG',d:9,cd:.09,sp:.04,v:82,p:1,r:[6,13],rc:.25,fd:0,mag:15,res:75,rt:.75},
{n:'Shotgun',d:11,cd:.85,sp:.07,v:82,p:6,r:[3,7],rc:1,fd:45,mag:7,res:28,rt:2.5},{n:'Sniper',d:68,cd:1.4,sp:0,v:120,p:1,r:[14,26],rc:1.2,fd:0,mag:3,res:9,rt:1},{n:'Minigun',d:14,cd:.07,sp:.07,v:82,p:1,r:[8,18],rc:.15,fd:0,inf:1,mag:1e9,res:0,rt:0},
{n:'Paint Knife',d:40,cd:.25,sp:0,v:60,p:1,r:[0,1.6],rc:.2,fd:0,inf:1,mag:1e9,res:0,rt:0,life:.055},{n:'Grenade',d:120,cd:.6,sp:0,v:20,p:1,r:[8,22],rc:.3,fd:0,mag:1,res:1,rt:.3,gren:1},
{n:'Rocket Launcher',d:140,cd:.8,sp:0,v:45,p:1,r:[10,28],rc:1.4,fd:0,mag:1,res:4,rt:1.25,rk:1,life:6,gf:.15}];
const NM=['Neo','Vector','Pixel','Cyber','Luna','Rocket','Shadow','Spark','Volt','Zeus','Nova','Blink','Hedgehog','Drift','Quantum','Chaos'];
const MOB=matchMedia('(pointer:coarse)').matches||/Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent),DET=MOB?.7:1,GFX=MOB?.75:1;
if(MOB)document.body.classList.add('m');addEventListener('touchstart',()=>document.body.classList.add('m'),{once:true,passive:true});
const hex=c=>'#'+c.toString(16).padStart(6,'0'),LB={x:0,z:200,r:12},EYE=1.6,GR=9.8,rnd=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const r2=v=>Math.round(v*100)/100,r3=v=>Math.round(v*1000)/1000;
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const ad=(a,b)=>{let d=b-a;while(d>Math.PI)d-=6.2832;while(d<-Math.PI)d+=6.2832;return d};
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const cv=$('g'),renderer=new THREE.WebGLRenderer({canvas:cv,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)*GFX);renderer.setSize(innerWidth,innerHeight,false);renderer.shadowMap.enabled=!MOB;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();scene.fog=new THREE.Fog(FOGC,40,170);
const cam=new THREE.PerspectiveCamera(78,innerWidth/innerHeight,.05,700);cam.rotation.order='YXZ';scene.add(cam);
const fov=(w=innerWidth,h=innerHeight)=>{cam.fov=w<h?100:78;cam.aspect=w/h;cam.updateProjectionMatrix();vm.position.x=w<h?.17:.3};
const tex=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);return new THREE.CanvasTexture(c)};
const skyT=tex(8,256,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);SKYC.forEach(s=>g.addColorStop(s[0],s[1]));c.fillStyle=g;c.fillRect(0,0,w,h)});
scene.add(new THREE.Mesh(new THREE.SphereGeometry(600,24,16),new THREE.MeshBasicMaterial({map:skyT,side:THREE.BackSide,fog:false})));
{const pos=[];for(let i=0;i<600;i++){const a=rnd(0,6.28),e=rnd(.05,1.4);pos.push(Math.cos(a)*Math.cos(e)*550,Math.sin(e)*550,Math.sin(a)*Math.cos(e)*550)}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));scene.add(new THREE.Points(g,new THREE.PointsMaterial({size:2,sizeAttenuation:false,fog:false})))}
scene.add(new THREE.HemisphereLight(0x9a8cff,0x1a1030,.9));
const sun=new THREE.DirectionalLight(0xb9a8ff,.7);sun.position.set(40,80,30);sun.castShadow=!MOB;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.near=10;sun.shadow.camera.far=220;sun.shadow.bias=-.0005;scene.add(sun);
function sunFit(){const c=sun.shadow.camera;c.left=c.bottom=-A-8;c.right=c.top=A+8;c.updateProjectionMatrix()}
const ft=tex(256,256,(c,w,h)=>{c.fillStyle='#0c0820';c.fillRect(0,0,w,h);c.strokeStyle='#4a2bd0';c.lineWidth=4;c.strokeRect(0,0,w,h);c.strokeStyle='rgba(0,229,255,.28)';c.lineWidth=1;for(let i=1;i<4;i++){c.beginPath();c.moveTo(i*64,0);c.lineTo(i*64,h);c.moveTo(0,i*64);c.lineTo(w,i*64);c.stroke()}});
ft.wrapS=ft.wrapT=THREE.RepeatWrapping;
const fl=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.MeshStandardMaterial({map:ft,roughness:.4,metalness:.3}));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;scene.add(fl);
const gnd=new THREE.Mesh(new THREE.PlaneGeometry(2400,2400),new THREE.MeshBasicMaterial({color:0x07050f}));gnd.rotation.x=-Math.PI/2;gnd.position.y=-.05;scene.add(gnd);
const MG=new THREE.Group();scene.add(MG);
function skyline(cx,cz,n,r0,r1,par){par=par||scene;const cs=[0x00e5ff,0xff2bd6,0x9dff00,0xff9100,0x8a5cff];for(let i=0;i<n;i++){const a=i/n*6.283+rnd(0,.1),r=rnd(r0,r1),w=rnd(4,12),h=rnd(10,45),g=new THREE.BoxGeometry(w,h,w);
 const b=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0x0b0820}));b.position.set(cx+Math.cos(a)*r,h/2,cz+Math.sin(a)*r);par.add(b);
 const l=new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:cs[i%5]}));l.position.copy(b.position);par.add(l)}}
skyline(LB.x,LB.z,Math.round(26*DET),32,60);
const OB=[];
function add(x,z,w,d,h,c){OB.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2,h});const g=new THREE.BoxGeometry(w,h,d),m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0x1a1240,emissive:c,emissiveIntensity:.14,roughness:.5,metalness:.4}));m.position.set(x,h/2,z);m.castShadow=m.receiveShadow=true;MG.add(m);
 const l=new THREE.LineSegments(new THREE.EdgesGeometry(g),new THREE.LineBasicMaterial({color:c}));l.position.copy(m.position);MG.add(l);
 const s=new THREE.Mesh(new THREE.BoxGeometry(w+.06,.1,d+.06),new THREE.MeshBasicMaterial({color:c}));s.position.set(x,h,z);MG.add(s);const s2=s.clone();s2.position.y=.12;MG.add(s2);if(EV=='winter'&&h<7){const cap=new THREE.Mesh(bx(w+.12,.14,d+.12),mat(0xffffff));cap.position.set(x,h+.1,z);MG.add(cap)}
 if(!MOB)for(const sx of[-1,1])for(const sz of[-1,1]){const v=new THREE.Mesh(new THREE.BoxGeometry(.07,h,.07),new THREE.MeshBasicMaterial({color:c}));v.position.set(x+sx*w/2,h/2,z+sz*d/2);MG.add(v)}}
const PAL=EV=='halloween'?[0xff7a00,0x9b30ff,0x7dff3a,0xff2a2a]:EV=='winter'?[0x9fe8ff,0xffffff,0x7fc8ff,0xc8f0ff]:EV=='summer'?[0xffd400,0x00e5ff,0xff5fa2,0x7dff3a]:[0x00e5ff,0xff2bd6,0x9dff00,0xff9100];
const MAPS=[{n:'NEON ARENA',reg:1,A:34,L:[[14,5,6,2,3.2],[20,16,2,8,3.2],[9,19,4,4,2.4],[26,7,3,3,1.1],[12,26,6,1.5,1.1],[5,11,2,2,3.2],[17,-3,1.5,5,1.1],[7,0,1.6,1.6,3.4]],K:[5,5,3.6]},
{n:'CROSSROADS',reg:1,A:26,L:[[9,0,1.5,9,3.2],[15,9,3,3,1.1],[5,16,6,1.5,1.1],[19,2,2,2,3.2]],K:[3,3,2.6]},
{n:'GRID CITY',reg:1,A:44,L:[[11,11,8,8,3.6],[26,9,6,10,3.2],[9,27,10,6,3.2],[24,24,5,5,2.6],[34,6,2,6,1.1],[3,18,2,6,3.2],[33,-14,2,6,1.1]],K:[6,6,3.6]},
{n:'RING FORTRESS',reg:1,A:38,L:[[13,6,2,10,3.4],[19,19,6,2,3.4],[6,26,4,4,2.4],[28,9,3,3,1.1],[21,1,1.5,5,1.1],[10,16,2,2,3.4]],K:[7,7,3.8]},
{n:'DEATHMATCH ARENA',A:50,L:[[16,6,8,2,3.4],[32,12,2,12,3.2],[10,30,12,2,3.2],[24,24,6,6,2.6],[42,22,3,3,1.1],[8,16,2,2,3.2],[36,-2,2,8,1.1],[40,6,2,6,1.1]],K:[8,8,3.8]},
{n:'CTF FIELD',A:55,Wz:37.5,mir:1,L:[[14,8,6,2,3.2],[26,22,2,8,3.2],[38,10,3,3,1.1],[20,30,6,1.5,1.1],[6,20,2,2,3.2],[44,26,4,4,2.4],[30,4,2,4,1.1],[10,30,3,3,1.1],[34,30,6,2,3.2],[22,14,3,3,1.1],[40,18,2,2,3.2],[8,12,2,2,3.2],[30,14,6,1.5,1.1],[16,34,2,2,3.2],[2,28,2,3,1.1],[28,10,2,2,3.2],[16,20,2,3,1.1],[34,22,3,2,1.1],[36,6,2,2,3.2],[24,6,2,2,1.1],[12,22,2,2,3.2],[18,4,2,2,1.1],[50,28,2,2,3.2],[30,26,2,2,3.2],[42,6,4,2,1.1],[40,32,3,3,1.1],[50,32,2,2,3.2],[50,10,2,2,3.2],[36,26,4,2,1.1],[48,6,4,2,1.1],[36,16,2,2,3.2],[44,10,4,2,1.1],[40,14,2,2,3.2],[38,22,2,2,3.2]],K:[6,8,3.6],G:{x:[-26,-9,9,26],z:[-42,-24,-8,8,24,42]},S:[[-49,-18],[49,-18],[49,18],[-49,18]],F:[[-48,0],[48,0]],dim:'110 × 75'},
{n:'DEAD CITY',A:45,L:[[10,10,8,6,3.6],[26,8,6,10,3.2],[8,26,10,6,3.2],[22,22,4,4,2.6],[36,24,2,6,1.1],[3,16,2,6,3.2],[34,-8,2,6,1.1]],K:[6,6,3.6]}];
const REG=MAPS.map((m,i)=>i).filter(i=>MAPS[i].reg);
const inB=(x,z,y=1.4)=>OB.find(o=>y<o.h&&x>o.x0&&x<o.x1&&z>o.z0&&z<o.z1);
const los=(a,b)=>{for(let i=1;i<14;i++){const t=i/14;if(inB(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t))return false}return true};
function push(e,r=.5){OB.forEach(o=>{if((o.h<1.6&&e.y>=o.h-.25)||(e.fly&&e.y>o.h))return;const cx=clamp(e.x,o.x0,o.x1),cz=clamp(e.z,o.z0,o.z1);let dx=e.x-cx,dz=e.z-cz,d=Math.hypot(dx,dz);if(d<r){if(d<1e-4){dx=1;dz=0;d=1}e.x+=dx/d*(r-d);e.z+=dz/d*(r-d);e.hit=true}})}
const groundAt=e=>{let b=0;OB.forEach(o=>{if(o.h<1.6&&e.y>=o.h-.3&&e.x>o.x0&&e.x<o.x1&&e.z>o.z0&&e.z<o.z1)b=Math.max(b,o.h)});return b};
const MC={},mat=c=>MC[c]||(MC[c]=new THREE.MeshBasicMaterial({color:c})),DM={},dm=c=>DM[c]||(DM[c]=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.9,side:2,polygonOffset:true,polygonOffsetFactor:-2}));
const AM={},am=c=>AM[c]||(AM[c]=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));
const boxG=new THREE.BoxGeometry(1,1,1),bulG=new THREE.SphereGeometry(.07,6,6),ringG=new THREE.RingGeometry(.9,1,40),discG=new THREE.CircleGeometry(1,16),bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d);
const glowT=tex(64,64,c=>{const g=c.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,'rgba(255,255,255,.5)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(0,0,64,64)});
const glow=(c,s)=>{const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glowT,color:c,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));sp.scale.set(s,s,1);return sp};
const SM={},sm=c=>SM[c]||(SM[c]=new THREE.SpriteMaterial({map:glowT,color:c,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
const addM=(g,c,o)=>new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,blending:THREE.AdditiveBlending,depthWrite:false,side:2}));
{const mo=glow(0xcfd8ff,120);mo.position.set(-260,170,-380);mo.material.fog=false;scene.add(mo);const pl2=glow(0xff2bd6,200);pl2.position.set(320,120,-300);pl2.material.fog=false;scene.add(pl2);
 const rg2=new THREE.Mesh(new THREE.TorusGeometry(95,1.6,6,80),new THREE.MeshBasicMaterial({color:0x00e5ff,fog:false}));rg2.position.copy(pl2.position);rg2.rotation.set(1.3,.3,0);scene.add(rg2)}
const wave=addM(ringG,0x00e5ff,.5);wave.rotation.x=-Math.PI/2;wave.position.y=.06;scene.add(wave);
let CN=[],curKey='',ANI=[],ICE=false,LX=34,LZ=34;
function suitDark(){return new THREE.MeshStandardMaterial({color:0x17122e,roughness:.5,metalness:.4})}
const suitM2=suitDark();
const PL=[0,1,2,3].map(()=>{const l=new THREE.PointLight(0xffffff,1.3,34);scene.add(l);return l});
const holoC=new THREE.Mesh(new THREE.TorusGeometry(2.6,.08,8,48),mat(0xffffff));holoC.position.set(0,6.2,0);holoC.rotation.x=Math.PI/2;scene.add(holoC);
const holoC2=new THREE.Mesh(new THREE.TorusGeometry(2,.06,8,48),mat(0xff2bd6));holoC2.position.set(0,6.2,0);scene.add(holoC2);
const FFN=Math.round(90*DET),ffP=new Float32Array(FFN*3),ffG=new THREE.BufferGeometry();
ffG.setAttribute('position',new THREE.BufferAttribute(ffP,3));const ff=new THREE.Points(ffG,new THREE.PointsMaterial({color:0x66f6ff,size:3,sizeAttenuation:false,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(ff);
function teamCorners(t){return (MD==1||MD==4||MD==7)?(t==0?[0,3]:[1,2]):MD==2?(t==0?[0]:[1,2,3]):MD==3?[0,1,2,3]:MD==6?(t==0?[1,2,3]:[0]):[t]}
function padCol(i){return (MD==1||MD==4||MD==7)?(i==0||i==3?T[0].c:T[1].c):MD==2?(i==0?T[0].c:T[1].c):MD==3?0xffffff:MD==6?(i==0?T[1].c:T[0].c):T[i].c}
function decor(M){if(!EV)return;const lim=(M.Wz||A)-3,place=(n,fn)=>{n=Math.max(2,Math.round(n*DET));for(let i=0,t=0;i<n&&t<n*14;t++){const x=rnd(-A+4,A-4),z=rnd(-lim,lim);if(!inB(x,z,0)&&CN.every(c=>Math.hypot(x-c[0],z-c[1])>8)){fn(x,z);i++}}};
 if(EV=='halloween'){place(18,(x,z)=>{const g=new THREE.Group(),sk=new THREE.MeshStandardMaterial({color:0xe8650a,emissive:0x7a2200,emissiveIntensity:.35,roughness:.55});
   for(let k=0;k<8;k++){const a=k/8*6.283,lb=new THREE.Mesh(new THREE.SphereGeometry(.34,10,8),sk);lb.scale.set(.8,1,.8);lb.position.set(Math.cos(a)*.22,.4,Math.sin(a)*.22);g.add(lb)}
   const ct=new THREE.Mesh(new THREE.SphereGeometry(.36,10,8),sk);ct.scale.set(.85,1,.85);ct.position.y=.4;g.add(ct);
   const st=new THREE.Mesh(new THREE.CylinderGeometry(.05,.09,.28,6),mat(0x4a6a1a));st.position.set(.03,.84,0);st.rotation.z=.25;g.add(st);
   const vn=new THREE.Mesh(new THREE.TorusGeometry(.12,.015,5,10,4.2),mat(0x3a8a1a));vn.position.set(.15,.9,0);g.add(vn);
   const fc=new THREE.MeshBasicMaterial({color:0xffd24a});[-.16,.16].forEach(sx=>{const ey=new THREE.Mesh(new THREE.CircleGeometry(.09,3),fc);ey.position.set(sx,.5,.47);ey.rotation.z=sx<0?.5:-.5;g.add(ey)});
   const nz2=new THREE.Mesh(new THREE.CircleGeometry(.05,3),fc);nz2.position.set(0,.4,.5);nz2.rotation.z=Math.PI;g.add(nz2);
   for(let k=-3;k<=3;k++){const th=new THREE.Mesh(bx(.07,.07+(k%2?0:.05),.02),fc);th.position.set(k*.065,.27+(k%2?0:-.02),.5-Math.abs(k)*.03);g.add(th)}
   const gl=glow(0xff8a2a,2.2);gl.position.y=.55;g.add(gl);g.position.set(x,0,z);g.rotation.y=rnd(0,6.28);g.scale.setScalar(rnd(.8,1.3));MG.add(g);ANI.push(t=>{gl.material.opacity=.7+Math.sin(t*9+x)*.2})});
  place(7,(x,z)=>{const g=glow(0xffffff,2.4);g.position.set(x,3,z);MG.add(g);const y0=rnd(2.5,4),ph=rnd(0,6);ANI.push(t=>{g.position.y=y0+Math.sin(t*1.6+ph)*.5;g.material.opacity=.45+Math.sin(t*2+ph)*.2})});
  for(let i=0;i<Math.round(9*DET);i++){const g=new THREE.Group(),wm=new THREE.MeshBasicMaterial({color:0x111111,side:2}),w1=new THREE.Mesh(new THREE.PlaneGeometry(.5,.25),wm),w2=new THREE.Mesh(new THREE.PlaneGeometry(.5,.25),wm);w1.position.x=-.25;w2.position.x=.25;g.add(w1,w2);MG.add(g);const R0=rnd(8,A-6),y0=rnd(5,9),sp=rnd(.2,.5)*(i%2?1:-1),ph=rnd(0,6);
   ANI.push(t=>{const an=t*sp+ph;g.position.set(Math.cos(an)*R0,y0+Math.sin(t*3+ph),Math.sin(an)*R0);g.rotation.y=-an;w1.rotation.z=Math.sin(t*14+ph)*.7;w2.rotation.z=-Math.sin(t*14+ph)*.7})}
  const mo=glow(0xff9a3a,150);mo.position.set(-120,90,-260);mo.material.fog=false;MG.add(mo)}
 if(EV=='summer'){const sun=glow(0xfff2a0,200);sun.position.set(200,230,-320);sun.material.fog=false;MG.add(sun);
  place(14,(x,z)=>{const g=new THREE.Group(),tr=new THREE.Mesh(new THREE.CylinderGeometry(.16,.24,4,8),mat(0x8a5a2a));tr.position.y=2;g.add(tr);for(let k=0;k<6;k++){const fr=new THREE.Mesh(bx(2.2,.05,.5),mat(0x2faa3a));fr.position.set(Math.cos(k*1.05)*1,4.1,Math.sin(k*1.05)*1);fr.rotation.y=-k*1.05;fr.rotation.z=-.35;g.add(fr)}g.position.set(x,0,z);MG.add(g)});
  place(8,(x,z)=>{const b=new THREE.Mesh(new THREE.SphereGeometry(.45,12,10),new THREE.MeshStandardMaterial({color:PAL[Math.random()*4|0],emissive:0x331100,roughness:.4}));b.position.set(x,.45,z);MG.add(b)})}
 if(EV=='winter'){place(14,(x,z)=>{const g=new THREE.Group();for(let k=0;k<3;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(1.2-k*.3,1.6,8),mat(0x1f6a3a));c.position.y=1.2+k*1.0;g.add(c);const tp=new THREE.Mesh(new THREE.ConeGeometry(.7-k*.2,.5,8),mat(0xffffff));tp.position.y=1.7+k*1.0;g.add(tp)}g.position.set(x,0,z);MG.add(g)});
  place(6,(x,z)=>{const g=new THREE.Group();[.55,.4,.28].forEach((r,k)=>{const b=new THREE.Mesh(new THREE.SphereGeometry(r,12,10),mat(0xffffff));b.position.y=.55+k*.7;g.add(b)});const cr=new THREE.Mesh(new THREE.ConeGeometry(.06,.35,6),mat(0xff7a00));cr.rotation.x=Math.PI/2;cr.position.set(0,2,.3);g.add(cr);g.position.set(x,0,z);MG.add(g)});
  const N=Math.round(260*DET),pa=new Float32Array(N*3);for(let i=0;i<N;i++){pa[i*3]=rnd(-A,A);pa[i*3+1]=rnd(0,16);pa[i*3+2]=rnd(-A,A)}const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.BufferAttribute(pa,3));
  MG.add(new THREE.Points(gg,new THREE.PointsMaterial({color:0xffffff,size:3,sizeAttenuation:false,transparent:true,opacity:.85,depthWrite:false})));
  ANI.push((t,dt)=>{for(let i=0;i<N;i++){pa[i*3+1]-=dt*2.2;pa[i*3]+=Math.sin(t+i)*dt*.3;if(pa[i*3+1]<0)pa[i*3+1]=16}gg.attributes.position.needsUpdate=true})}}
function buildWalls(M){const Wz=M.Wz||A,TH=1.5,GW=5,DP=6,C=0x6a5acd,Hh=7,G=M.G||{x:[-.5*Wz,.5*Wz],z:[-.5*A,.5*A]};
 const side=(vert,pos,half,gaps)=>{const g=gaps.slice().sort((a,b)=>a-b);let u=-half-TH;const segs=[];g.forEach(c=>{segs.push([u,c-GW/2]);u=c+GW/2});segs.push([u,half+TH]);
  segs.forEach(([a,b])=>{if(b-a>.3)vert?add(pos,(a+b)/2,TH,b-a,Hh,C):add((a+b)/2,pos,b-a,TH,Hh,C)});
  const o=Math.sign(pos),rp=pos+o*(DP+TH),len=2*(half+TH+DP+TH);vert?add(rp,0,TH,len,Hh,C):add(0,rp,len,TH,Hh,C)};
 const zp=M.Wz?M.Wz+.75:A;[-1,1].forEach(sg=>{side(true,sg*A,Wz,G.x);side(false,sg*zp,A,G.z)});LX=A+DP+TH+3;LZ=zp+DP+TH+3}
function buildMap(i){const key=i+'/'+MD;if(key===curKey)return;curKey=key;const M=MAPS[i];A=M.A;
 MG.children.slice().forEach(c=>{MG.remove(c);if(c.geometry)c.geometry.dispose()});OB.length=0;ANI=[];
 fl.scale.set(A,A,1);ft.repeat.set(A*2/4,A*2/4);CN=M.S||[[-A+6,A-6],[A-6,A-6],[A-6,-A+6],[-A+6,-A+6]];
 skyline(0,0,Math.round(56*DET),A+28,A+76,MG);
 (M.mir?[[1,1],[-1,1],[-1,-1],[1,-1]]:[0,1,2,3]).forEach((v,k)=>{M.L.forEach(b=>{let [x,z,w,d,h]=b;if(M.mir){x*=v[0];z*=v[1]}else for(let r=0;r<k;r++){[x,z]=[-z,x];[w,d]=[d,w]}add(x,z,w,d,h,PAL[k%4])})});
 add(0,0,M.K[0],M.K[1],M.K[2],0xffffff);
 buildWalls(M);
 [[7.5,.4],[10.5,.25]].forEach(([r,w])=>{const m=addM(new THREE.RingGeometry(r,r+w,64),0xffffff,.35);m.rotation.x=-Math.PI/2;m.position.y=.05;MG.add(m)});
 CN.forEach(([x,z],k)=>{const c=padCol(k),d=addM(new THREE.CircleGeometry(5,40),c,.18),r=addM(new THREE.RingGeometry(4.6,5,40),c,.9);
  [d,r].forEach(o=>{o.rotation.x=-Math.PI/2;o.position.set(x,.04,z);MG.add(o)});
  for(const sd of[-1,1]){const p=new THREE.Mesh(bx(.4,4.5,.4),mat(c));p.position.set(x+sd*4,2.25,z);MG.add(p)}
  const ar=new THREE.Mesh(bx(8.4,.4,.4),mat(c));ar.position.set(x,4.5,z);MG.add(ar);PL[k].color.setHex(c);PL[k].position.set(x,4,z)});
 const q=A-2.5;[[-q,0],[q,0],[0,-q],[0,q],[-q,A/2],[q,-A/2],[A/2,q],[-A/2,-q]].forEach(([x,z],k)=>{const p=new THREE.Mesh(bx(.25,5,.25),suitM2),g=glow(PAL[k%4],3.5);p.position.set(x,2.5,z);g.position.set(x,5.2,z);MG.add(p);MG.add(g)});
 for(let k=0;k<FFN;k++){ffP[k*3]=rnd(-A,A);ffP[k*3+1]=rnd(.5,7);ffP[k*3+2]=rnd(-A,A)}ffG.attributes.position.needsUpdate=true;decor(M);sunFit()}
buildMap(0);
const lob=new THREE.Mesh(new THREE.CylinderGeometry(LB.r+1.5,LB.r+1.5,.4,48),new THREE.MeshStandardMaterial({color:0x1a1038,roughness:.3,metalness:.5}));lob.position.set(LB.x,-.2,LB.z);scene.add(lob);
const lr=addM(new THREE.RingGeometry(LB.r+1.2,LB.r+1.6,48),0x00e5ff,1);lr.rotation.x=-Math.PI/2;lr.position.set(LB.x,.03,LB.z);scene.add(lr);
const holo=new THREE.Mesh(new THREE.TorusKnotGeometry(1.4,.4,80,10),new THREE.MeshBasicMaterial({color:0xff2bd6,wireframe:true}));holo.position.set(LB.x,3.5,LB.z);scene.add(holo);
for(let i=0;i<10;i++){const a=i/10*6.283,x=LB.x+Math.cos(a)*(LB.r+1),z=LB.z+Math.sin(a)*(LB.r+1),c=T[i%4].c,p=new THREE.Mesh(bx(.5,5,.5),mat(c));p.position.set(x,2.5,z);scene.add(p)}
const lpl=new THREE.PointLight(0xffffff,1.2,40);lpl.position.set(LB.x,8,LB.z);scene.add(lpl);
let AC,NB,MS,amb,mute=false,sndN=0;
function ac(){try{if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();MS=AC.createGain();MS.gain.value=.9;const cp=AC.createDynamicsCompressor();MS.connect(cp);cp.connect(AC.destination);
 NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 const o=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain();o.frequency.value=55;o2.frequency.value=82.5;g.gain.value=.012;o.connect(g);o2.connect(g);g.connect(MS);o.start();o2.start();amb=g;setTimeout(musicStart,50)}
 if(AC.state=='suspended')AC.resume()}catch(e){AC=null}return AC}
function sp(x,z){const p=ME;if(x===undefined||!p)return[0,1];const dx=x-p.x,dz=z-p.z,d=Math.hypot(dx,dz),s=Math.sin(p.a),c=Math.cos(p.a);return[clamp((-dx*c+dz*s)/(d+1),-1,1),1/(1+d*.07)]}
function out(g,pan,t0,d){if(AC.createStereoPanner){const pn=AC.createStereoPanner();pn.pan.value=pan;g.connect(pn);pn.connect(MS)}else g.connect(MS)}
function tone(f,d,type='square',v=.07,sl=0,x,z){if(mute||sndN++>8||!ac())return;const[pan,gn]=sp(x,z),t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(25,f+sl),t+d);
 g.gain.setValueAtTime(v*gn,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);out(g,pan);o.start(t);o.stop(t+d+.02)}
function noise(d,v=.1,f0=2000,f1=300,x,z,type='lowpass',q=1){if(mute||sndN++>8||!ac())return;const[pan,gn]=sp(x,z),t=AC.currentTime,s=AC.createBufferSource(),fl2=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NB;s.loop=true;fl2.type=type;fl2.Q.value=q;
 fl2.frequency.setValueAtTime(f0,t);fl2.frequency.exponentialRampToValueAtTime(Math.max(40,f1),t+d);g.gain.setValueAtTime(v*gn,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl2);fl2.connect(g);out(g,pan);s.start(t,Math.random());s.stop(t+d+.02)}
function fireSnd(w,x,z){if(w==0){noise(.09,.16,3200,300,x,z);tone(200,.1,'sawtooth',.1,-150,x,z)}else if(w==1){noise(.06,.12,3600,500,x,z);tone(280,.06,'square',.05,-150,x,z)}
 else if(w==5){noise(.12,.1,5000,800,x,z,'bandpass')}else if(w==6){tone(180,.12,'sine',.1,300,x,z)}else if(w==7){noise(.5,.25,1500,150,x,z);tone(100,.4,'sawtooth',.15,-60,x,z)}else if(w==4){noise(.05,.14,2800,300,x,z);tone(140,.06,'sawtooth',.1,-80,x,z)}else if(w==2){noise(.3,.28,2400,120,x,z);tone(90,.22,'sawtooth',.2,-50,x,z)}else{noise(.5,.3,4200,100,x,z);tone(70,.35,'sawtooth',.25,-40,x,z);tone(1800,.04,'square',.06,-1200,x,z)}}
let banning=false,musOn=true,musT=0,musStep=0,MUSG=null,DID=0,killTs=[];
const mn=m=>440*Math.pow(2,(m-69)/12),CHD=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],BSN=[33,29,36,31];
let DUCK=null,DLY=null,CURVE=null;
function distCurve(k){const n=256,c=new Float32Array(n);for(let i=0;i<n;i++){const x=i*2/n-1;c[i]=(3+k)*x*20*(Math.PI/180)/(Math.PI+k*Math.abs(x))}return c}
function musicStart(){if(MUSG||!ac())return;const bus=AC.createGain();MBUS=bus;bus.gain.value=.9;const cp=AC.createDynamicsCompressor();cp.threshold.value=-20;cp.ratio.value=5;cp.attack.value=.003;cp.release.value=.2;bus.connect(cp);cp.connect(MS);
 MUSG=AC.createGain();MUSG.gain.value=.26;MUSG.connect(bus);DUCK=AC.createGain();DUCK.connect(bus);CURVE=distCurve(60);
 DLY=AC.createDelay(1);DLY.delayTime.value=60/128*.75;const fb=AC.createGain(),lp=AC.createBiquadFilter(),wet=AC.createGain();fb.gain.value=.38;lp.type='lowpass';lp.frequency.value=2600;wet.gain.value=.45;DLY.connect(lp);lp.connect(fb);fb.connect(DLY);lp.connect(wet);wet.connect(bus);
 musT=AC.currentTime+.15;setInterval(musTick,70)}
function mO(type,f,t,d,v,o){o=o||{};const g=AC.createGain(),dest=o.dest||DUCK;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0003,v),t+(o.a||.01));g.gain.exponentialRampToValueAtTime(.0001,t+d);
 let sink=g;if(o.wsh){const w=AC.createWaveShaper();w.curve=CURVE;w.connect(g);sink=w}
 (o.det||[0]).forEach(c=>{const s=AC.createOscillator();s.type=type;s.detune.value=c;s.frequency.setValueAtTime(f,t);if(o.f2)s.frequency.exponentialRampToValueAtTime(o.f2,t+d);let n=s;if(o.flt){const b=AC.createBiquadFilter();b.type='lowpass';b.frequency.setValueAtTime(o.flt,t);if(o.flt2)b.frequency.exponentialRampToValueAtTime(o.flt2,t+d);s.connect(b);n=b}n.connect(sink);s.start(t);s.stop(t+d+.05)});
 g.connect(dest);if(o.send)g.connect(DLY)}
function nzm(t,d,v,type,f,f2,dest){const s=AC.createBufferSource(),b=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NB;s.loop=true;b.type=type;b.frequency.setValueAtTime(f,t);if(f2)b.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(b);b.connect(g);g.connect(dest||MUSG);s.start(t,Math.random());s.stop(t+d+.05)}
const duckT=t=>{DUCK.gain.cancelScheduledValues(t);DUCK.gain.setValueAtTime(.3,t);DUCK.gain.linearRampToValueAtTime(1,t+.2)};
const kickM=t=>{mO('sine',165,t,.24,1,{f2:38,dest:MUSG,a:.002});nzm(t,.015,.3,'highpass',2500);duckT(t)};
const snareM=t=>{nzm(t,.17,.3,'bandpass',1900,900);mO('triangle',200,t,.12,.25,{f2:110,dest:MUSG})};
const clapM=t=>{[0,.012,.024].forEach(o=>nzm(t+o,.09,.2,'bandpass',1600,1200))};
const hatM=(t,op,v)=>nzm(t,op?.2:.04,v,'highpass',8000);
const CH=[[53,56,60],[49,53,56],[56,60,63],[51,55,58]],BS=[29,25,32,27],SCL=[65,68,70,72,75,77];
function musNote(st,t){const stp=st%16,bar=Math.floor(st/16),ch=(bar>>1)%4,ph=bar%16,hot=phase=='match',mid=phase=='lobby'||phase=='pick',iv=hot?1:mid?.6:.35,C=CH[ch],brk=hot&&ph>=14,rt=BS[ch];
 if(!brk){if(hot){if(stp%4==0)kickM(t)}else if(mid){if(stp==0||stp==8)kickM(t)}else if(stp==0)kickM(t)}
 if(hot){if(stp==4||stp==12){snareM(t);clapM(t)}if(brk&&ph==15&&stp>=8&&stp%2==0)snareM(t)}else if(mid&&stp==12)clapM(t);
 if(stp%2==0)hatM(t,stp%4==2,hot?.1:.05);if(hot&&!brk&&stp%2==1)hatM(t,false,.04);
 if(!brk){const pat=[1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,0];if(hot&&pat[stp])mO('sawtooth',mn(rt+(stp==10||stp==14?12:0)),t,.16,.34,{flt:1100,flt2:180,wsh:1});
  else if(mid&&(stp==0||stp==6||stp==10))mO('sawtooth',mn(rt),t,.3,.3,{flt:900,flt2:200,wsh:1});else if(!hot&&!mid&&stp==0)mO('sawtooth',mn(rt),t,1.6,.26,{flt:500,flt2:150});
  if((hot&&pat[stp])||(mid&&(stp==0||stp==6||stp==10))||(!hot&&!mid&&stp==0))mO('sine',mn(rt),t,hot?.16:.3,.4)}
 if(hot&&!brk&&stp%2==0)mO('sawtooth',mn(SCL[((stp>>1)+ch*2)%6]+(stp%8==0?12:0)),t,.2,.05,{det:[-14,0,14],flt:3400,flt2:1400,send:1});
 else if(mid&&stp%4==0)mO('sawtooth',mn(SCL[(stp>>2)%6]),t,.3,.045,{det:[-14,0,14],flt:3000,flt2:1400,send:1});
 else if(!hot&&!mid&&stp%8==0)mO('sawtooth',mn(SCL[((stp>>3)+ch)%6]),t,1.2,.035,{det:[-14,0,14],flt:2200,flt2:900,send:1});
 if(stp==0&&bar%2==0)C.forEach(n=>mO('sawtooth',mn(n),t,3.5,.045+(1-iv)*.02,{det:[-9,9],flt:900,a:.7}));
 if(stp==0&&ph==15&&hot){nzm(t,1.9,.18,'highpass',300,9000);mO('sine',200,t,1.9,.1,{f2:1600,dest:MUSG})}
 if(stp==0&&ph==0&&bar>0&&hot)nzm(t,1.2,.2,'highpass',3500)}
function musTick(){if(!AC||mute||!musOn||AC.state!='running'||!MUSG)return;const spb=60/128/4;while(musT<AC.currentTime+.3){musNote(musStep,musT);musT+=spb;musStep++}}
const uiSnd=()=>{tone(640,.04,'square',.04);noise(.03,.06,4000,1500)};
document.addEventListener('pointerdown',e=>{if(e.target.closest&&e.target.closest('button,.sk,.cb,#wbar div,#fb,#jb'))uiSnd()},true);
['pointerdown','keydown','touchend'].forEach(ev=>addEventListener(ev,()=>{ac();musicStart()},{passive:true}));
const BAN_MIN=[15,30,60,120,180,300,720,1440,2880,4320,7200,10080,43200,86400,129600,172800,216000,259200,525600];
const banRec=()=>{const a=lsGet('ban_'+(ACC?ACC.key:'guest'),null),d=lsGet('ban_dev',null),c=ACC&&ACC.ban?ACC.ban:null;return[a,d,c].filter(Boolean).sort((x,y)=>y.until-x.until)[0]||null};
const banLeft=()=>{const b=banRec();return b&&b.until>Date.now()?b.until-Date.now():0};
function applyBan(){if(banning)return;banning=true;const key=ACC?ACC.key:'guest',lv=Math.max(-1,lsGet('ban_'+key,{lvl:-1}).lvl,ACC&&ACC.ban?ACC.ban.lvl:-1),lvl=ACC?Math.min(lv+1,BAN_MIN.length-1):0,b={until:Date.now()+BAN_MIN[lvl]*60000,lvl};
 lsSet('ban_'+key,b);lsSet('ban_dev',b);if(ACC){ACC.ban=b;lsSet('acc',ACC);if(ACC.cloud)cloudUpd({ban:b})}
 try{R&&R.leave()}catch(e){}setTimeout(()=>location.reload(),400)}
let B=[],S=[],P=[],FX=[],DP=[],SPD=[];
function pts(x,y,z,col,n,spd,up,sz,life,g=18,stk=false){n=Math.max(1,Math.round(n*DET));for(let i=0;i<n;i++){if(P.length>650*DET){scene.remove(P.shift().m)}const m=new THREE.Mesh(boxG,mat(Array.isArray(col)?col[i%col.length]:col)),a=rnd(0,6.283),s=rnd(.3,1)*spd*rnd(.4,1),sc=rnd(.4,1)*sz;
 m.position.set(x,y,z);m.scale.setScalar(sc);scene.add(m);P.push({m,vx:Math.cos(a)*s,vy:rnd(.3,1)*up,vz:Math.sin(a)*s,rx:rnd(-9,9),ry:rnd(-9,9),l:rnd(.6,1)*life,g,sc,stk})}}
function dec(x,y,z,nx,nz,col,r,tag){tag=tag||++DID;const s=new THREE.Mesh(discG,dm(col));s.scale.setScalar(r*.35);SPD.push({m:s,r,t:0});if(nx||nz){s.position.set(x+nx*.03,y,z+nz*.03);s.lookAt(x+nx,y,z+nz)}else{s.rotation.x=-Math.PI/2;s.position.set(x,y||(.02+Math.random()*.02),z)}
 const yy=s.position.y;for(let i=S.length-1;i>=0;i--){const u=S[i].userData;if(u.tg&&u.tg!==tag&&u.nx===nx&&u.nz===nz&&Math.hypot(u.x-x,u.y-yy,u.z-z)<(r+u.r)*.7){scene.remove(S[i]);S.splice(i,1)}}
 s.userData={tg:tag,nx,nz,x,y:yy,z,r};scene.add(s);S.push(s);if(S.length>420*DET)scene.remove(S.shift())}
function blob(x,y,z,nx,nz,col,r){const tg=++DID;dec(x,y,z,nx,nz,col,r,tg);const tx=nz,tz=-nx,fl0=!nx&&!nz;for(let i=0;i<4;i++){const o=rnd(-1,1)*r*.9,o2=rnd(-1,1)*r*.9,rr=r*rnd(.2,.5);
 if(fl0)dec(x+o,0,z+o2,0,0,col,rr,tg);else dec(x+tx*o,y+o2,z+tz*o,nx,nz,col,rr,tg)}}
const planeG=new THREE.PlaneGeometry(1,1);
function drips(x,y,z,nx,nz,col,r){const n=1+(Math.random()*3|0),tx=nz,tz=-nx;
 for(let i=0;i<n;i++){const o=rnd(-.5,.5)*r,px=x+nx*.035+tx*o,pz=z+nz*.035+tz*o,t=new THREE.Mesh(planeG,dm(col)),h=new THREE.Mesh(discG,dm(col)),wd=rnd(.04,.09);
  t.position.set(px,y,pz);t.lookAt(px+nx,y,pz+nz);t.scale.set(wd,.001,1);h.position.set(px,y,pz);h.lookAt(px+nx,y,pz+nz);h.scale.setScalar(wd*.65);
  scene.add(t,h);if(DP.length>80){const d=DP.shift();S.push(d.t,d.h)}DP.push({t,h,y0:y,len:0,v:r*rnd(.8,1.6),w:rnd(.1,.5),wd})}}
function stick(q,o,col){const d=[q.x-o.x0,o.x1-q.x,q.z-o.z0,o.z1-q.z],k=d.indexOf(Math.min(...d));let nx=0,nz=0,x=q.x,z=q.z;
 if(k==0){nx=-1;x=o.x0}else if(k==1){nx=1;x=o.x1}else if(k==2){nz=-1;z=o.z0}else{nz=1;z=o.z1}
 const y=Math.min(q.y,o.h-.05),r=rnd(.07,.2);dec(x,y,z,nx,nz,col,r);if(Math.random()<.4)drips(x,y,z,nx,nz,col,r*1.5)}
const fx=(m,d,u)=>{scene.add(m);FX.push({m,t:0,d,u})};
const ring=(x,z,c,mx,d,y=.08)=>{const m=addM(ringG,c,1);m.rotation.x=-Math.PI/2;m.position.set(x,y,z);fx(m,d,k=>{m.scale.setScalar(1+k*mx);m.material.opacity=1-k})};
const beam=(x,z,c,h=10)=>{const m=addM(new THREE.CylinderGeometry(.5,.5,h,16,1,true),c,.9);m.position.set(x,h/2,z);fx(m,.5,k=>{m.scale.set(1-k*.8,1,1-k*.8);m.material.opacity=.9*(1-k)})};
const flash=(x,y,z,c,s0,s1,d)=>{const m=glow(c,s0);m.position.set(x,y,z);fx(m,d,k=>{m.scale.setScalar(s0+k*(s1-s0));m.material.opacity=1-k})};
let ban_t;function banner(t,c){const b=$('ban');b.innerHTML=t;b.style.color=c||'#fff';b.style.animation='none';void b.offsetWidth;b.style.animation='pop 1.5s forwards'}
function ragdoll(e,c1){const c2=T[e.team].c,x=e.x,z=e.z,y0=e.y;
 [[.5,.5,.3,1.27],[.42,.4,.26,.95],[.42,.3,.3,1.65],[.16,.5,.16,1.1],[.16,.5,.16,1.1],[.18,.55,.2,.5],[.18,.55,.2,.4],[.1,.1,.4,1.2]].forEach((d,i)=>{if(P.length>650)scene.remove(P.shift().m);
  const m=new THREE.Mesh(bx(d[0],d[1],d[2]),i%3==2?mat(c2):suitM);m.position.set(x+rnd(-.2,.2),y0+d[3],z+rnd(-.2,.2));scene.add(m);const a=rnd(0,6.28),s=rnd(3,9);
  P.push({m,vx:Math.cos(a)*s,vy:rnd(4,11),vz:Math.sin(a)*s,rx:rnd(-12,12),ry:rnd(-12,12),l:rnd(1.8,3),g:20,sc:1})})}
function deathFx(v,o){const c1=T[o.team].c,c2=T[v.team].c,x=v.x,z=v.z,y=v.y;
 pts(x,y+1.2,z,[c1,c1,c2,0xffffff],90,12,13,.18,1.9,18,true);pts(x,y+1,z,[c2,c1],20,6,9,.42,2.3,14);ragdoll(v,c1);
 ring(x,z,c1,12,.8);ring(x,z,c2,7,.55);ring(x,z,0xffffff,4,.3);beam(x,z,c1);flash(x,y+1.2,z,0xffffff,3,12,.35);flash(x,y+1.2,z,c1,5,18,.55);
 blob(x,0,z,0,0,c1,1.9);for(let i=0;i<6;i++)blob(x+rnd(-2.5,2.5),0,z+rnd(-2.5,2.5),0,0,i%3?c1:c2,rnd(.4,1.3));
 noise(.8,.35,2500,60,x,z);tone(180,.6,'sawtooth',.18,-140,x,z);tone(70,.5,'square',.14,-30,x,z)}
const suitM=suitDark();
const SKINS=[{n:'Midnight',c:0x17122e},{n:'Forest',c:0x1d3b2a},{n:'Desert',c:0x6b5a3a},{n:'Crimson Ops',c:0x4a1218},{n:'Arctic',c:0xc9d6e2},
{n:'Gold Rush',c:0xd4af37,m:.9,r:.25,rare:1,key:'k',goal:100,task:'Get 100 kills'},{n:'Chrome',c:0xb9c2cc,m:1,r:.1,rare:1,key:'dmg',goal:10000,task:'Deal 10,000 HP of damage'},
{n:'Obsidian',c:0x0a0612,m:.8,r:.1,em:0x5b2bd6,rare:1,key:'w',goal:5,task:'Win 5 matches'},{n:'Neon Samurai',c:0x14102a,em:0xff2bd6,rare:1,key:'kn',goal:20,task:'Get 20 knife kills'},
{n:'Cyber Punk',c:0x101a2e,em:0x00e5ff,rare:1,key:'hs',goal:25,task:'Land 25 headshots'},{n:'Inferno',c:0x3a0a06,em:0xff4a10,pulse:1,rare:1,key:'rk',goal:15,task:'Get 15 rocket kills'},
{n:'Ghost',c:0xe8f0ff,op:.55,rare:1,key:'a',goal:30,task:'Get 30 assists'},{n:'Galaxy',c:0x120a3a,em:0x2a3aff,rare:1,key:'m',goal:25,task:'Play 25 matches'},
{n:'Toxic',c:0x0e2a12,em:0x4dff3a,rare:1,key:'gr',goal:15,task:'Get 15 grenade kills'},{n:'Royal',c:0x3a1a6a,em:0xd4af37,m:.6,rare:1,key:'cf',goal:5,task:'Capture the flag 5 times'},
{n:'Phoenix',c:0x2a0a04,em:0xff6a00,pulse:1,rare:1,leg:1,key:'k',goal:500,task:'Get 500 kills'},{n:'Dragon',c:0x0a2a12,em:0x00ff6a,m:.7,rare:1,leg:1,key:'dmg',goal:100000,task:'Deal 100,000 HP of damage'},
{n:'Titan',c:0x8a8f99,m:1,r:.15,em:0x3a6aff,rare:1,leg:1,key:'w',goal:25,task:'Win 25 matches'},{n:'Reaper',c:0x050505,em:0xff0030,pulse:1,rare:1,leg:1,key:'kn',goal:100,task:'Get 100 knife kills'},
{n:'Valkyrie',c:0xe8dca0,m:.9,r:.2,em:0xfff0a0,rare:1,leg:1,key:'hs',goal:150,task:'Land 150 headshots'},{n:'Nebula',c:0x1a0a3a,em:0xb04aff,pulse:1,rare:1,leg:1,key:'rk',goal:75,task:'Get 75 rocket kills'},
{n:'Spectre',c:0xbfe8ff,op:.4,em:0x66ccff,rare:1,leg:1,key:'a',goal:200,task:'Get 200 assists'},{n:'Hydra',c:0x0a3a3a,em:0x00ffd0,m:.6,rare:1,leg:1,key:'m',goal:100,task:'Play 100 matches'},
{n:'Omega',c:0x14141a,m:1,r:.1,em:0xffffff,pulse:1,rare:1,leg:1,key:'gr',goal:75,task:'Get 75 grenade kills'},{n:'Eclipse',c:0x000000,em:0xffd400,m:.8,pulse:1,rare:1,leg:1,key:'cf',goal:25,task:'Capture the flag 25 times'}];
const FXS={'Gold Rush':{aura:0xffd34a},'Chrome':{aura:0xcfe6ff},'Obsidian':{aura:0x7a3cff},'Neon Samurai':{aura:0xff2bd6},'Cyber Punk':{aura:0x00e5ff},'Inferno':{aura:0xff4a10},'Ghost':{aura:0xffffff},'Galaxy':{aura:0x4a5aff},'Toxic':{aura:0x4dff3a},'Royal':{aura:0xd4af37},
 'Phoenix':{aura:0xff7a1a,trail:0xff4a10},'Dragon':{aura:0x00ff6a,trail:0x00ff6a},'Titan':{aura:0x6a9aff,trail:0x9ab6ff},'Reaper':{aura:0xff0030,trail:0xff0030},'Valkyrie':{aura:0xfff0a0,trail:0xffe27a},'Nebula':{aura:0xb04aff,trail:0xc88aff,cyc:1},'Spectre':{aura:0x9fe0ff,trail:0xbfefff},'Hydra':{aura:0x00ffd0,trail:0x00ffd0,cyc:1},'Omega':{aura:0xffffff,trail:0xffffff,cyc:1},'Eclipse':{aura:0xffd400,trail:0xffa000,cyc:1}};
SKINS.forEach(k=>Object.assign(k,FXS[k.n]||{}));
const ST0=()=>({k:0,d:0,a:0,dmg:0,hs:0,kn:0,gr:0,rk:0,cf:0,m:0,w:0});
let ACC=null,ST=ST0(),SKIN=0,DB=null;
const lsGet=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const akey=n=>n.toLowerCase().replace(/[^a-z0-9_]/g,'_'),skinOpen=i=>!SKINS[i].rare||(ST[SKINS[i].key]||0)>=SKINS[i].goal;
async function getDb(){if(DB)return DB;try{DB=typeof claude!=='undefined'?await claude.use('db'):null}catch(e){DB=null}return DB}
async function sha(t){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){let h=0;for(const c of t)h=(h*31+c.charCodeAt(0))|0;return 'x'+h}}
function loadSession(){let a=lsGet('acc',null);if(a&&Date.now()-a.last>7*864e5){lsSet('acc',null);a=null}if(a){a.last=Date.now();lsSet('acc',a)}ACC=a;const id=ACC?ACC.key:'guest';ST=Object.assign(ST0(),lsGet('st_'+id,{}));SKIN=lsGet('sk_'+id,0);if(!skinOpen(SKIN))SKIN=0}
function guestName(){let g=lsGet('gname',null);if(!g){g='Guest'+(100+Math.random()*899|0);lsSet('gname',g)}return g}
function saveAcc(){const id=ACC?ACC.key:'guest';lsSet('st_'+id,ST);lsSet('sk_'+id,SKIN);if(ACC&&ACC.cloud)cloudUpd({st:ST,sk:SKIN});else if(!ACC)cloudGuest()}
let UID;async function priv(){const d=await getDb();if(!d)return null;if(UID===undefined){try{const u=typeof claude!=='undefined'?await claude.use('user'):null;UID=u?await u.id():null}catch(e){UID=null}}return UID?{d,uid:UID}:null}
async function cloudUpd(o){const P=await priv();if(!P||!ACC)return;try{await P.d.collection('data/users/'+P.uid).doc('acct_'+ACC.key).update(o)}catch(e){}}
let MBUS=null,micOn=false,MIC=null,PCS={},SPK={},micIv=0,chatOpen=false;
let HUB=null,HUBMSG='Checking server…';
const hubShow=()=>{const e=document.getElementById('hubs');if(e)e.textContent=HUBMSG};
async function hubInit(){if(HUB)return;if(typeof claude==='undefined'){HUBMSG='Offline copy: online play is not available';hubShow();return}let rm=null;try{rm=await claude.use('room')}catch(e){}
 if(!rm){HUBMSG='🔴 Server unavailable: sign in to Claude, and ask the creator for Contributor access';hubShow();return}
 try{HUB=await rm.join('hub');HUB.presence({nm:NICK||'player'});const upd=()=>{const n=HUB.peers().filter(p=>p.kind=='viewer').length;HUBMSG='🟢 Server online · '+n+' player'+(n==1?'':'s')+' online';hubShow()};HUB.onPeers(upd);upd()}
 catch(e){HUBMSG='🔴 Server unavailable ('+((e&&e.code=='not_permitted')?'ask the creator for Contributor access':((e&&e.message)||'connection error'))+')';hubShow()}}
async function cloudGuest(){const P=await priv();if(!P)return;try{await P.d.collection('data/users/'+P.uid).doc('guest').set({st:ST,sk:SKIN})}catch(e){}}
async function cloudSession(on){const P=await priv();if(!P)return;try{await P.d.collection('data/users/'+P.uid).doc('session').set(on&&ACC?{key:ACC.key,last:Date.now(),adm:ACC.adm?1:0}:{key:'',last:0})}catch(e){}}
const refreshMenu=()=>{if(phase=='menu'&&ov.style.display!='none'&&ov.querySelector('#bm'))scrMain()};
async function restoreSession(){if(ACC)return;const P=await priv();if(!P)return;try{const col=P.d.collection('data/users/'+P.uid),sn=await col.doc('session').get(),s=sn.exists?sn.data():null;
 if(s&&s.key&&Date.now()-s.last<7*864e5){const as=await col.doc('acct_'+s.key).get();if(as.exists){const r=as.data();ACC={nick:r.nick,key:s.key,cloud:true,last:Date.now(),ban:r.ban||null,adm:!!s.adm&&s.key==='plmi14'};lsSet('acc',ACC);ST=Object.assign(ST0(),r.st||{});SKIN=r.sk||0;if(!skinOpen(SKIN))SKIN=0;if(r.ban)lsSet('ban_'+s.key,r.ban);cloudSession(true);refreshMenu();return}}
 const g=await col.doc('guest').get();if(g.exists&&!lsGet('st_guest',null)){const r=g.data();ST=Object.assign(ST0(),r.st||{});SKIN=r.sk||0;lsSet('st_guest',ST);lsSet('sk_guest',SKIN);refreshMenu()}}catch(e){}}
async function kdf(pw,salt){try{const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveBits']),b=await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:200000,hash:'SHA-256'},k,256);return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return sha(salt+pw)}}
const rhex=n=>[...crypto.getRandomValues(new Uint8Array(n))].map(x=>x.toString(16).padStart(2,'0')).join('');
const ADM_SALT='pb3d-adm-7f3a91c2e5d84b06',ADM_HASH='12158cdf63ee6c8c9c08dbbc5814a2958a8a30b75107d408a9fb6d220f985fa2';
async function admChk(key,pw){return key==='plmi14'&&(await kdf(pw,ADM_SALT))===ADM_HASH}
async function signUp(n,pw,pw2){n=(n||'').trim();if(!/^[A-Za-z0-9_]{3,12}$/.test(n))return'Nickname: 3–12 letters, digits or _';if((pw||'').length<6)return'Password needs at least 6 characters';if(pw!==pw2)return'Passwords do not match';
 const key=akey(n),salt=rhex(16),hash=await kdf(pw,salt),P=await priv();let cloud=false;
 if(P){try{const nref=P.d.doc('nicks/'+key),sn=await nref.get();if(sn.exists&&sn.data().u!==P.uid)return'This nickname is already taken';
  const aref=P.d.collection('data/users/'+P.uid).doc('acct_'+key);if((await aref.get()).exists)return'You already have this account. Use Sign In';
  await nref.set({u:P.uid,t:Date.now()});await aref.set({nick:n,salt,hash,v:2,st:ST0(),sk:0,created:Date.now()});cloud=true}catch(e){cloud=false}}
 if(!cloud){const L=lsGet('accs2',{});if(L[key])return'This nickname is already taken on this device';L[key]={nick:n,salt,hash};lsSet('accs2',L)}
 ACC={nick:n,key,cloud,last:Date.now(),adm:await admChk(key,pw)};lsSet('acc',ACC);ST=ST0();SKIN=0;saveAcc();cloudSession(true);return''}
async function signIn(n,pw){n=(n||'').trim();const key=akey(n),P=await priv();let rec=null,cloud=false,legacy=false;
 if(P){try{const sn=await P.d.collection('data/users/'+P.uid).doc('acct_'+key).get();if(sn.exists){rec=sn.data();cloud=true}}catch(e){}
  if(!rec){try{const sn=await P.d.doc('accounts/'+key).get();if(sn.exists){rec=sn.data();legacy=true}}catch(e){}}}
 if(!rec){const L=lsGet('accs2',{});if(L[key])rec=L[key];else{const O=lsGet('accs',{});if(O[key]){rec=O[key];legacy=true}}}
 if(!rec)return'This account does not exist for your Claude account or this device';
 const okp=legacy?(await sha(rec.salt+pw))===rec.hash:(await kdf(pw,rec.salt))===rec.hash;if(!okp)return'Wrong password';
 if(legacy&&P){try{const salt=rhex(16),hash=await kdf(pw,salt),aref=P.d.collection('data/users/'+P.uid).doc('acct_'+key),nref=P.d.doc('nicks/'+key),sn=await nref.get();
  if(!sn.exists||sn.data().u===P.uid){await nref.set({u:P.uid,t:Date.now()});await aref.set({nick:rec.nick,salt,hash,v:2,st:rec.st||ST0(),sk:rec.sk||0,ban:rec.ban||null,created:Date.now()});cloud=true;try{await P.d.doc('accounts/'+key).delete()}catch(e){}}}catch(e){}}
 ACC={nick:rec.nick,key,cloud,last:Date.now(),ban:rec.ban||null,adm:await admChk(key,pw)};if(rec.ban)lsSet('ban_'+key,rec.ban);lsSet('acc',ACC);
 ST=Object.assign(ST0(),(cloud||(legacy&&rec.st))?(rec.st||{}):lsGet('st_'+key,{}));SKIN=(cloud||(legacy&&rec.sk!==undefined))?(rec.sk||0):lsGet('sk_'+key,0);if(!skinOpen(SKIN))SKIN=0;saveAcc();cloudSession(true);return''}
function logOut(){cloudSession(false);ACC=null;lsSet('acc',null);loadSession()}
function applySkin(e,i){const K=SKINS[i]||SKINS[0],m=e.suit;e.skin=i;m.color.setHex(K.c);m.metalness=K.m===undefined?.4:K.m;m.roughness=K.r===undefined?.5:K.r;m.emissive.setHex(K.em||0);m.emissiveIntensity=K.em?.45:0;m.transparent=!!K.op;m.opacity=K.op||1;
 if(e.p){vmS.color.setHex(K.c);vmS.metalness=m.metalness;vmS.roughness=m.roughness;vmS.emissive.setHex(K.em||0);vmS.emissiveIntensity=m.emissiveIntensity}}
function addStats(won){const b=SKINS.map((k,i)=>skinOpen(i)),sc=ME.sc;ST.k+=ME.k;ST.d+=ME.d;ST.a+=ME.ast;ST.dmg+=ME.dmg;ST.hs+=sc.hs;ST.kn+=sc.kn;ST.gr+=sc.gr;ST.rk+=sc.rk;ST.cf+=sc.cf;ST.m++;if(won)ST.w++;
 const nu=SKINS.map((k,i)=>i).filter(i=>!b[i]&&skinOpen(i));saveAcc();if(nu.length)setTimeout(()=>banner('NEW SKIN UNLOCKED!<br><small>'+nu.map(i=>SKINS[i].n).join(', ')+'</small>','#ffd400'),2500)}
loadSession();setTimeout(restoreSession,700);setTimeout(hubInit,900);setInterval(()=>{if(ACC){ACC.last=Date.now();lsSet('acc',ACC)}},6e5);
const tagTex=(n,c)=>{const t=tex(256,48,(g,w,h)=>{g.font='bold 30px system-ui';g.textAlign='center';g.fillStyle='rgba(0,0,0,.55)';g.fillRect(40,4,w-80,40);g.fillStyle=hex(c);g.fillText(n,w/2,34)});return t};
function mk(i){const sM=suitM.clone();
 const tint=new THREE.MeshBasicMaterial({color:0xffffff}),m=new THREE.Group(),r=new THREE.Group();m.add(r);m.visible=false;
 const pt=(g,mm,x,y,z,p)=>{const o=new THREE.Mesh(g,mm);o.castShadow=true;o.position.set(x,y,z);p.add(o);return o};
 const tor=new THREE.Group();r.add(tor);const ch=new THREE.Group();tor.add(ch);
 pt(bx(.5,.5,.3),sM,0,1.27,0,ch);pt(bx(.42,.22,.26),sM,0,.95,0,tor);pt(bx(.44,.06,.28),tint,0,.86,0,tor);pt(bx(.3,.06,.02),tint,0,1.36,.16,ch);
 pt(bx(.34,.22,.14),sM,0,1.28,-.21,ch);pt(bx(.1,.16,.06),tint,0,1.28,-.29,ch);[-1,1].forEach(s=>{pt(bx(.18,.1,.2),sM,s*.3,1.52,0,ch);pt(bx(.19,.03,.21),tint,s*.3,1.58,0,ch)});
 const hd=new THREE.Group();hd.position.y=1.62;r.add(hd);pt(new THREE.SphereGeometry(.2,14,10),sM,0,.08,0,hd);pt(bx(.3,.08,.12),tint,0,.08,.15,hd);pt(bx(.05,.1,.32),tint,0,.27,0,hd);pt(bx(.12,.08,.1),sM,0,-.1,0,hd);
 const lt=[],kn=[],ar=[],el=[];
 [-1,1].forEach(s=>{const h=new THREE.Group();h.position.set(s*.13,.84,0);pt(bx(.18,.4,.2),sM,0,-.2,0,h);const k=new THREE.Group();k.position.y=-.4;pt(bx(.15,.4,.17),sM,0,-.2,0,k);pt(bx(.04,.34,.04),tint,s*.08,-.2,.09,k);pt(bx(.18,.1,.28),sM,0,-.43,.04,k);h.add(k);r.add(h);lt.push(h);kn.push(k);
  const a=new THREE.Group();a.position.set(s*.34,1.45,0);pt(bx(.13,.34,.13),sM,0,-.17,0,a);const e=new THREE.Group();e.position.y=-.34;pt(bx(.11,.3,.11),sM,0,-.15,0,e);pt(bx(.12,.1,.12),tint,0,-.32,0,e);a.add(e);r.add(a);ar.push(a);el.push(e)});
 const gg=new THREE.Group();gg.position.set(.28,1.2,.25);r.add(gg);pt(bx(.1,.12,.6),sM,0,0,.25,gg);pt(bx(.11,.03,.5),tint,0,.07,.25,gg);pt(bx(.06,.14,.08),sM,0,-.1,.1,gg);
 const mz=glow(0xffffff,1.6);mz.position.set(0,0,.75);mz.material.opacity=0;gg.add(mz);
 const sh=new THREE.Mesh(discG,new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.45}));sh.rotation.x=-Math.PI/2;sh.position.y=.03;sh.scale.setScalar(.6);m.add(sh);
 const bg=new THREE.Sprite(new THREE.SpriteMaterial({color:0,depthTest:false})),fg=new THREE.Sprite(new THREE.SpriteMaterial({color:0xffffff,depthTest:false})),nt=new THREE.Sprite(new THREE.SpriteMaterial({transparent:true,depthTest:false}));
 bg.scale.set(1.1,.18,1);bg.position.y=2.3;bg.renderOrder=10;fg.center.set(0,.5);fg.position.set(-.5,2.3,0);fg.scale.set(1,.1,1);fg.renderOrder=11;nt.scale.set(1.8,.34,1);nt.position.y=2.6;nt.renderOrder=12;const ol=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(.8,2,.6)),new THREE.LineBasicMaterial({color:0xffffff,depthTest:false,transparent:true}));ol.position.y=1;ol.renderOrder=15;ol.visible=false;const au=glow(0xffffff,3);au.position.y=1.1;au.visible=false;m.add(bg,fg,nt,ol,au);scene.add(m);
 return{i,name:'',p:!i,bot:true,peer:null,gid:-1,m,r,tint,lt,kn,ar,el,suit:sM,skin:0,tor,ch,hd,gg,mz,bg,fg,nt,sh,ol,au,cr:0,tcr:0,tk:'',vis:false,team:0,w:0,hp:100,alive:false,k:0,d:0,dmg:0,cd:0,t:0,mode:1,x:0,z:0,y:0,vy:0,a:0,pitch:0,vx:0,vz:0,inv:0,rt:0,mem:0,react:.3,fl:0,gx:0,gz:0,wk:0,mv:0,mzT:0,gl:0,bn:0,ast:0,pw:undefined,invs:null,slot:0,rl:0,sw:0,sc:{hs:0,kn:0,gr:0,rk:0,cf:0},mhp:100,jug:false,st:[0,0,0,0],si:1,dust:0,rv:0};
}
const E=[];for(let i=0;i<17;i++)E.push(mk(i));const ME=E[0];let G=[];
const vm=new THREE.Group(),vmM=new THREE.MeshStandardMaterial({color:0x211a3d,roughness:.4,metalness:.6}),vmL=new THREE.MeshStandardMaterial({color:0x8a86a8,roughness:.25,metalness:.9}),vmT=new THREE.MeshBasicMaterial({color:0xffffff}),vmS=new THREE.MeshStandardMaterial({color:0x17122e,roughness:.6}),vmG=new THREE.MeshStandardMaterial({color:0x2e2850,roughness:.7}),
 vmz=glow(0xfff2b0,.9),vmz2=glow(0xffffff,.45),mzl=new THREE.PointLight(0xffd080,0,10);
vm.add(vmz,vmz2,mzl);cam.add(vm);vm.position.set(.3,-.3,-.6);const VMN=3;
const VS=[[[.06,.07,.28,0,.02,-.05,2],[.055,.05,.22,0,-.02,0,0],[.05,.13,.07,0,-.1,.08,0],[.062,.012,.26,0,.058,-.05,1],[.03,.03,.06,0,.02,-.2,0],[.02,.025,.02,0,.07,.07,1]],
 [[.08,.1,.46,0,0,0,0],[.085,.015,.4,0,.06,0,1],[.05,.2,.07,0,-.14,-.02,0],[.035,.035,.18,0,.01,-.32,2],[.06,.08,.2,0,-.01,.3,0],[.03,.04,.03,0,.075,-.05,1],[.05,.12,.06,0,-.1,.1,0]],
 [[.05,.05,.7,0,.02,-.1,2],[.045,.045,.6,0,-.03,-.05,0],[.085,.06,.2,0,-.05,-.15,1],[.07,.09,.25,0,0,.2,0],[.065,.1,.3,0,-.02,.5,0],[.052,.012,.68,0,.05,-.1,1],[.05,.1,.06,0,-.07,.25,0]],
 [[.07,.09,.9,0,0,0,0],[.035,.035,.5,0,.01,-.65,2],[.055,.055,.35,0,.1,-.05,0],[.07,.07,.04,0,.1,-.24,1],[.07,.07,.04,0,.1,.14,1],[.065,.11,.3,0,-.02,.55,0],[.05,.1,.06,0,-.09,.15,0],[.075,.012,.85,0,.05,0,1]],
 [[.14,.14,.5,0,0,0,0],[.04,.04,.5,.04,.03,-.45,2],[.04,.04,.5,-.04,.03,-.45,2],[.04,.04,.5,0,-.04,-.45,2],[.145,.02,.45,0,.08,0,1],[.1,.2,.1,0,-.16,.05,0],[.08,.1,.3,0,-.02,.4,0]],
 [[.022,.075,.36,0,.01,-.18,2],[.045,.05,.16,0,-.02,.14,0],[.07,.02,.02,0,0,.05,2],[.024,.01,.3,0,.05,-.16,1]],
 [[.1,.1,.1,0,0,0,1],[.02,.04,.02,0,.07,0,2],[.07,.03,.03,.05,.04,0,0]],
 [[.12,.12,.9,0,.02,-.1,0],[.15,.15,.12,0,.02,-.6,1],[.14,.14,.1,0,.02,.4,1],[.05,.12,.06,0,-.1,.1,0],[.1,.03,.3,0,.09,-.1,2]]],
 VF=[-.32,-.42,-.48,-.95,-.72,-.4,-.1,-.7],VH=[[[0,-.1,.08],[.02,-.06,-.04]],[[0,-.1,.1],[0,-.05,-.2]],[[0,-.08,.25],[0,-.06,-.15]],[[0,-.08,.3],[0,-.05,-.25]],[[0,-.1,.12],[0,-.08,-.2]],[[0,-.04,.14],[.03,-.08,0]],[[0,-.02,0],[.02,-.05,.1]],[[0,-.1,.12],[0,-.06,-.3]]];
function seg(a,b,t,mm){const d=new THREE.Vector3().subVectors(b,a),l=d.length(),o=new THREE.Mesh(boxG,mm);o.scale.set(t,t,l);o.position.copy(a).addScaledVector(d,.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),d.normalize());vm.add(o)}
function buildVM(w,c){while(vm.children.length>VMN)vm.remove(vm.children[VMN]);vmT.color.setHex(c);
 VS[w].forEach(s=>{const o=new THREE.Mesh(bx(s[0],s[1],s[2]),[vmM,vmT,vmL][s[6]]);o.position.set(s[3],s[4],s[5]);vm.add(o)});
 const V=(a)=>new THREE.Vector3(a[0],a[1],a[2]),hr=V(VH[w][0]),hl=V(VH[w][1]),sr=new THREE.Vector3(.38,-.5,.75),sl=new THREE.Vector3(-.42,-.5,.75),er=new THREE.Vector3(.2,-.3,.4),el2=new THREE.Vector3(-.22,-.28,.4);
 [[sr,er,hr],[sl,el2,hl]].forEach(([s,e,h])=>{seg(s,e,.1,vmS);seg(e,h,.085,vmS);const g=new THREE.Mesh(bx(.075,.075,.1),vmG);g.position.copy(h);vm.add(g);const wb=new THREE.Mesh(bx(.09,.09,.03),vmT);wb.position.copy(h).lerp(e,.3);wb.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3().subVectors(e,h).normalize());vm.add(wb)});
 vmz.position.set(0,.02,VF[w]);vmz2.position.copy(vmz.position);mzl.position.copy(vmz.position)}
let stabT=0,thrT=0,CR=[],crTimer=0,DUELM=false,DUEL={n:1,ai:true},playedMatch=false,crT=false,pickHold=0,started=false,tabOn=false,mouse2=false,adsK=0,aiPick={},myVm=-1,myVp=-1,TS=[0,0],winT=-1,confT=0,lastCd=-1;
let phase='menu',tm=0,sbT=0,feed=[],hudT=0,ts=1,tsT=0,shake=0,vig=0,hmT=0,fireHeld=false,touchMode=false,kt=0,kick=0,stickL=null,jumpReq=false,jumpHeld=false,sway=0,swayP=0,landT=0;
let MODE='single',R=null,myId='solo',isHost=true,ASG=null,asgV=0,pid=0,PRIV=false,srchCd=12,NICK='',codeStr='',lastSt=0,bt=0,pt2=0,sp2=0,tmr=0,hostCache=null;
const net=(t,d)=>{if(R)try{R.emit(t,d).catch(()=>{})}catch(e){}};
const pres=p=>{if(R)try{R.presence(p).catch(()=>{})}catch(e){}};
const hsc=v=>(v.jug?1.45:1)*(1-.28*(v.cr||0));
const owned=v=>v===ME||(isHost&&v.bot);
let NETERR='';
async function netJoin(name,hs){NETERR='';let rm=null;if(typeof claude==='undefined'){NETERR='This copy of the game is not running inside Claude (for example a GitHub copy), so online play is not available.';return false}
 try{rm=await claude.use('room')}catch(e){NETERR='Could not reach the room service: '+((e&&e.message)||e)}
 if(!rm){NETERR=NETERR||'The room service is not available for you. Sign in to Claude and ask the game creator to share it with you as a Contributor (the Viewer role cannot play online). Your internet connection is probably fine.';return false}
 try{R=await rm.join(name)}catch(e){R=null;NETERR=(e&&e.code=='not_permitted')?'The creator has not given you permission to play online. Ask them to share the game with the Contributor role.':'Could not join the room: '+((e&&e.message)||e);return false}
 pres({nm:NICK,hs:hs?1:0,sk:SKIN});R.on('st',onSt);R.on('fire',onFire);R.on('hurt',onHurt);R.on('bots',onBots);R.on('flg',onFlg);R.on('crate',m=>{const d=m.data;if(!d||!started||(m.isMe&&m.sameTab)||phase!='match')return;d.c.forEach(c=>{if(!CR.some(q=>q.id==c[0]))mkCrate(c[0],c[1],c[2],c[3]||0)})});R.on('pick',m=>{const d=m.data;if(d&&!(m.isMe&&m.sameTab))removeCrate(d.id)});
 R.on('chat',m=>{const d=m.data;if(!d||(m.isMe&&m.sameTab))return;chatAdd(String(d.n||'?').slice(0,12),String(d.t||'').slice(0,120),/^#[0-9a-f]{6}$/i.test(d.c)?d.c:'#00e5ff')});
 R.on('rtc',onRtc);
 R.on('cmd',m=>{const d=m.data;if(!d||(m.isMe&&m.sameTab)||phase!='match'||d.k!='kill')return;const by=G[d.by];if(!by||!peersV().some(p=>p.peer===by.peer&&p.presence.adm==1))return;
  G.forEach(v=>{if(v===by||!v.alive||!owned(v))return;if(d.t=='e'||v.name.toLowerCase()==String(d.t)){v.inv=0;hurtLocal(v,by,99999,false,v.x,v.y+1,v.z,'',7)}})});return true}
const peersV=()=>R?R.peers().filter(p=>p.kind=='viewer'):[];
function hostOf(ps){const c=ps.find(p=>p.presence.hs==1);return c?c.peer:ps.map(p=>p.peer).sort()[0]}
const nmOf=p=>String(p.presence.nm||'Player').replace(/[<>&]/g,'').slice(0,12)||'Player';
function remap(){const old=G.slice(),used=new Set([ME]),nG=[];
 ASG.forEach((a,j)=>{let e=null;if(a[2]===myId)e=ME;else{const o=old[j];if(o&&o!==ME&&!used.has(o))e=o}nG[j]=e;if(e)used.add(e)});
 ASG.forEach((a,j)=>{if(!nG[j]){nG[j]=E.find(x=>!used.has(x));used.add(nG[j])}});
 const had=G.includes(ME);G=nG;
 G.forEach((e,j)=>{const a=ASG[j];e.gid=j;e.jug=a[4]==1;e.zom=a[4]==2;e.mhp=e.jug?5000:100;if(MD==3)T[j].n=a[3];e.team=a[0];e.pw=a[1];if(!e.invs)e.w=a[1];e.peer=a[2];e.bot=a[2]===null;e.name=a[3];e.p=e===ME;e.tint.color.setHex(T[e.team].c);e.fg.material.color.setHex(T[e.team].c);
  e.tk='';if(e.bot)applySkin(e,(j+pid)%5);else if(e===ME)applySkin(e,SKIN);e.m.visible=e.alive&&!e.p});
 E.forEach(e=>{if(!G.includes(e)){e.m.visible=false;e.gid=-1;e.alive=false}});
 if(G.includes(ME)&&!had&&phase=='match'){ME.hp=ME.mhp;ME.alive=true;spawn(ME);buildVM(ME.w,T[ME.team].c)}else if(G.includes(ME)&&!had&&phase=='lobby'){const a=rnd(0,6.28),r=Math.sqrt(Math.random())*(LB.r-2);ME.x=LB.x+Math.cos(a)*r;ME.z=LB.z+Math.sin(a)*r;ME.hp=ME.mhp;ME.alive=true;ME.y=0;ME.vy=0}}
const tally=(k,n)=>{const c=Array(n).fill(0);if(MODE=='single'){const mv=k=='vm'?myVm:myVp;if(mv>=0&&mv<n)c[mv]+=1}else peersV().forEach(p=>{const v=p.presence[k];if(v>=0&&v<n)c[v]+=1});if(aiPick[k]!==undefined&&aiPick[k]<n)c[aiPick[k]]+=.5;
 for(let i=0;i<n;i++)if(k=='vm'?((MODES[i].ev&&!evOn(MODES[i].ev))||MODES[i].hid):!MAPS[i].reg)c[i]=-1;
 let b=-1,bv=0;for(let i=0;i<n;i++)if(c[i]>bv){bv=c[i];b=i}if(b<0){const av=k=='vm'?avail():REG;return av[Math.floor(performance.now()/7)%av.length]}return b};
const CAP=()=>MD==7?[DUEL.n,DUEL.n]:(MD==0||MD==5)?[4,4,4,4]:(MD==1||MD==4)?[8,8]:[1,15];
function pickCounts(ps){const c=T.map(()=>0);ps.forEach(p=>{if(p.isMe&&p.sameTab)return;const v=p.presence.tc;if(v>=0&&v<T.length)c[v]++});return c}
function canJoin(t,ps){const c=pickCounts(ps),cap=CAP();if(c[t]>=cap[t])return false;if(MD==2)return true;return c[t]<=Math.min(...c)}
function pickUI(){const ps=peersV(),c=T.map(()=>[]);ps.forEach(p=>{const v=p.presence.tc;if(v>=0&&v<T.length)c[v].push(nmOf(p)+((p.isMe&&p.sameTab)?' (you)':''))});
 const me=ps.find(p=>p.isMe&&p.sameTab),mine=me?me.presence.tc:-1,cap=CAP();$('ov').style.display='flex';
 $('ov').innerHTML=`<h1>CHOOSE YOUR TEAM</h1><p>${MODES[MD].n} · ${MAPS[MP].n} · starting in ${Math.max(0,Math.ceil(tm))}s</p><p style="font-size:13px">You can only join a team that does not have more players than the other team(s). Empty spots are filled by AI.</p><div class="row">`+
 T.map((t,i)=>{const ok=canJoin(i,ps)||mine===i;return `<div style="border:2px solid ${hex(t.c)};border-radius:12px;padding:8px 12px;min-width:130px"><b style="color:${hex(t.c)}">${t.n}</b> <small>${c[i].length}/${cap[i]}</small><div style="min-height:44px;font-size:14px;margin:4px 0">${c[i].join('<br>')||'—'}</div><button data-t="${i}" class="${mine===i?'':'alt'}" ${ok?'':'disabled style="opacity:.35;box-shadow:none"'}>${mine===i?'Joined ✓':ok?'Join':'Full / wait'}</button></div>`}).join('')+`</div>`}
function hostPick(){if(!started)return;if(MODE!='multi')return hostStart();pid++;if(DUELM){MD=7;MP=REG[Math.random()*REG.length|0]}else{const av=avail();MD=av[Math.random()*av.length|0];MP=MODES[MD].fm!==undefined?MODES[MD].fm:REG[Math.random()*REG.length|0]}T=MODES[MD].t;if(MD==3||MD==6){hostStart(true);return}phase='pick';tm=20;pickHold=0;net('st',{pid,ph:'pick',tm:20,md:MD,mp:MP,dn:DUEL.n,da:DUEL.ai?1:0});pickUI()}
function hostStart(keep){if(!started)return;pid++;const hs=MODE=='single'?[{peer:'solo',presence:{nm:NICK}}]:peersV(),order=shuffle([...Array(16).keys()]);let as=[];
 if(!keep){MD=tally('vm',MODES.length);MP=MODES[MD].fm!==undefined?MODES[MD].fm:tally('vp',MAPS.length)}if(DUELM){MD=7;if(!keep)MP=tally('vp',MAPS.length)}T=MODES[MD].t;
 if(MD==7&&!DUEL.ai&&hs.length<2)DUEL.ai=true;const nmj=j=>NM[(j*5+3)%NM.length],P3=j=>1+j%3;
 if(MD==0||MD==5){const ws=[0,1,2,3].map(()=>shuffle([1,2,3,1+(Math.random()*3|0)]));order.forEach((id,j)=>{const t=j%4;as[j]=[t,ws[t][j>>2],null,nmj(j),0]})}
 else if(MD==1||MD==4){const ws=[0,1].map(()=>shuffle([1,2,3,1,2,3,1,2]));order.forEach((id,j)=>{const t=j%2;as[j]=[t,ws[t][j>>1],null,nmj(j),0]})}
 else if(MD==2){const ws=shuffle([1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1]);order.forEach((id,j)=>{as[j]=j==0?[0,4,null,NM[3],1]:[1,ws[j],null,nmj(j),0]})}
 else if(MD==7){const n2=DUEL.n*2;for(let j=0;j<n2;j++)as[j]=[j%2,1+((j>>1)+j)%3,null,nmj(j),0]}
 else if(MD==3){const o3=Math.random()*3|0;order.forEach((id,j)=>{as[j]=[j,P3(j+o3),null,nmj(j),0]})}
 else{order.forEach((id,j)=>{as[j]=j<2?[1,5,null,nmj(j),2]:[0,P3(j),null,nmj(j),0]})}
 const free=()=>as.map((a,k)=>k).filter(k=>as[k][2]===null);hs.slice(0,MD==7?DUEL.n*2:16).forEach(p=>{const tc=p.presence.tc;let f=[];if(tc>=0&&tc<T.length)f=free().filter(k=>as[k][0]==tc);if(!f.length)f=free();const j=f[Math.random()*f.length|0];as[j][2]=p.peer;as[j][3]=nmOf(p)});
 if(MD==7&&!DUEL.ai){const kept=as.filter(a=>a[2]!==null);if(kept.length>=2)as=kept}
 ASG=as;asgV++;remap();beginMatch(MD==6?180:300);sendSt()}
function sendSt(){if(!isHost||!R)return;const d={pid,ph:phase,tm:Math.round(tm),as:ASG,v:asgV,md:MD,mp:MP,dn:DUEL.n,da:DUEL.ai?1:0};if(phase=='lobby'){d.ss=G.map(e=>[e.k,e.d,e.dmg,e.ast]);d.ts=TS;d.ai=aiPick}net('st',d)}
function onSt(m){const d=m.data;if(!d||!started||(m.isMe&&m.sameTab))return;if(d.dn){DUEL.n=d.dn;DUEL.ai=!!d.da}if(d.ph=='pick'){if(phase!='pick'){pid=d.pid;MD=d.md;MP=d.mp;T=MODES[MD].t;phase='pick'}tm=d.tm;return}if(d.ph=='search'){srchCd=d.cd;return}if(!d.as)return;
 if(d.pid>pid){pid=d.pid;MD=d.md||0;MP=d.mp||0;T=MODES[MD].t;ASG=d.as;asgV=d.v;remap();if(d.ph=='match')beginMatch(d.tm);else if(d.ph=='lobby'){beginLobby(d.ss,d.tm,d.ts);if(d.ai)aiPick=d.ai}}
 else if(d.pid==pid){if(d.ai)aiPick=d.ai;if(Math.abs(tm-d.tm)>1.5)tm=d.tm;if(d.v!==asgV){ASG=d.as;asgV=d.v;remap()}}}
function onFire(m){const d=m.data;if(!d||(m.isMe&&m.sameTab)||phase!='match')return;const e=G[d.g];if(!e||owned(e))return;e.w=d.w===undefined?e.w:d.w;spawnB(e,d.a,d.pt,d.sd,d.x,d.z,d.y,d.bn)}
function onHurt(m){const d=m.data;if(!d||(m.isMe&&m.sameTab))return;const v=G[d.v],o=G[d.o];if(!v||!o)return;if(d.b)rmB(d.b);applyHurt(v,o,d.dm,d.hd,d.hp,d.dead,d.x,d.y,d.z,d.w)}
function onBots(m){const d=m.data;if(!d||isHost||(m.isMe&&m.sameTab))return;d.s.forEach(s=>{const e=G[s[0]];if(e&&e.bot)setTg(e,s[1],s[2],s[8],s[3],s[4],s[5],s[6],s[7])})}
function setTg(e,x,z,y,a,p,h,al,mv){if(e.tx===undefined){e.x=x;e.z=z;e.y=y||0;e.a=a}e.tx=x;e.tz=z;e.ty=y||0;e.ta=a;e.tp=p;e.tmv=mv;
 if(al&&!e.alive&&e.rt<4.3){e.alive=true;e.hp=e.mhp;e.m.visible=true;e.si=0;e.x=x;e.z=z;ring(x,z,T[e.team].c,5,.6);beam(x,z,T[e.team].c);noise(.4,.12,300,2500,x,z)}
 else if(!al&&e.alive&&e.rv<=0){e.alive=false;e.m.visible=false;e.rt=5;pts(e.x,1,e.z,T[e.team].c,30,8,9,.2,1.2)}
 if(e.alive)e.hp=h}
function syncPeers(){R.peers().forEach(p=>{if((p.isMe&&p.sameTab)||p.kind!='viewer')return;const e=G.find(x=>x.peer===p.peer),s=p.presence;if(e&&s.x!==undefined){setTg(e,s.x,s.z,s.y,s.a,s.pt,s.h,s.al,s.mv);e.tcr=s.cr||0;if(s.mh)e.mhp=s.mh;if(s.sk!==undefined&&e.skin!==s.sk)applySkin(e,s.sk)}})}
function rep(e,dt){if(e.tx===undefined)return;const k=Math.min(1,dt*12),ox=e.x,oz=e.z;if(Math.hypot(e.tx-e.x,e.tz-e.z)>6){e.x=e.tx;e.z=e.tz}else{e.x+=(e.tx-e.x)*k;e.z+=(e.tz-e.z)*k}
 e.y+=(e.ty-e.y)*k;e.cr+=((e.tcr||0)-e.cr)*k;e.a+=ad(e.a,e.ta)*k;e.pitch+=((e.tp||0)-e.pitch)*k;const sv=Math.hypot(e.x-ox,e.z-oz)/Math.max(dt,1e-4);e.vx=e.vx*.6+((e.x-ox)/Math.max(dt,1e-4))*.4;e.vz=e.vz*.6+((e.z-oz)/Math.max(dt,1e-4))*.4;e.mv=clamp(sv/6,0,1)}
function spawn(e){const cs=teamCorners(e.team),C=CN[cs[Math.random()*cs.length|0]];for(let k=0;k<12;k++){e.x=C[0]+rnd(-3,3);e.z=C[1]+rnd(-3,3);if(!inB(e.x,e.z,0))break}e.a=Math.atan2(-e.x,-e.z);e.pitch=0;e.y=0;e.vy=0;e.vx=e.vz=0;e.m.visible=!e.p;e.mem=0;e.si=0;e.rv=1;e.tx=undefined;
 ring(e.x,e.z,T[e.team].c,5,.6);beam(e.x,e.z,T[e.team].c);flash(e.x,1,e.z,T[e.team].c,2,7,.4);pts(e.x,.3,e.z,T[e.team].c,18,3,8,.12,1,12);noise(.5,.14,300,3000,e.x,e.z)}
function clearAll(){GN.forEach(g=>scene.remove(g.m));GN=[];CR.forEach(c=>scene.remove(c.g));CR=[];FG.children.slice().forEach(c=>FG.remove(c));FLG=[];[...B.map(b=>b.m),...S,...P.map(p=>p.m),...FX.map(f=>f.m)].forEach(o=>scene.remove(o));DP.forEach(d=>{scene.remove(d.t);scene.remove(d.h)});B=[];S=[];P=[];FX=[];DP=[];SPD=[]}
function beginMatch(tv){clearAll();phase='match';tm=tv;sbT=0;winT=-1;mouse2=false;crT=false;playedMatch=true;killTs=[];ME.fly=false;crTimer=12;ME.sc={hs:0,kn:0,gr:0,rk:0,cf:0};TS=T.map(()=>0);$('sb').style.display='none';$('ov').style.display='none';$('lb').style.display='none';$('vt').style.display='none';buildMap(MP);ICE=MD==5;fl.material.color.setHex(ICE?0xbfe9ff:EV=='summer'?0xffe9c4:EV=='winter'?0xdfefff:0xffffff);fl.material.roughness=ICE?.08:.4;fl.material.metalness=ICE?.75:.3;if(MD==4)initFlags();
 G.forEach(e=>{e.k=e.d=e.dmg=e.ast=0;e.hp=e.mhp;e.alive=true;e.inv=2;e.cd=1;e.rt=0;e.bn=0;giveInv(e);e.tx=undefined;e.gg.visible=true;e.m.visible=!e.p;if(owned(e)||tv>=(MD==6?179:299))spawn(e);else e.m.visible=true});
 if(G.includes(ME)){buildVM(ME.w,T[ME.team].c);const c=hex(T[ME.team].c);banner(ME.jug?`YOU ARE THE <span style="color:${c}">JUGGERNAUT</span><br><small>5000 HP · Minigun · ${MAPS[MP].n}</small>`:`TEAM <span style="color:${c}">${T[ME.team].n.toUpperCase()}</span><br><small>${WP[ME.w].n} · ${MODES[MD].n} · ${MAPS[MP].n}</small>`,'#fff')}
 [330,440,550].forEach((f,i)=>setTimeout(()=>tone(f,.15,'square',.07),i*120))}
function beginLobby(ss,tv,tsv){try{document.exitPointerLock&&document.exitPointerLock()}catch(e){}clearAll();phase='lobby';tm=tv===undefined?30:tv;sbT=10;ME.rd=0;myVm=myVp=-1;pres({rd:0,vm:-1,vp:-1});
 if(isHost)aiPick={vm:avail()[Math.random()*avail().length|0],vp:REG[Math.random()*REG.length|0]};
 if(ss)G.forEach((e,j)=>{if(ss[j]){e.k=ss[j][0];e.d=ss[j][1];e.dmg=ss[j][2];e.ast=ss[j][3]||0}});if(tsv)TS=tsv;if(MD==6)TS=G.some(e=>e.team==0)?[1,0]:[0,1];
 const mx=Math.max(...TS),wl=TS.map((v,i)=>v==mx?i:-1).filter(i=>i>=0),w=wl.length==1?wl[0]:-1,rows=[...G].sort((a,b)=>b.k-a.k||b.dmg-a.dmg);winT=w;confT=w>=0?7:0;if(playedMatch&&G.includes(ME)){addStats(w==ME.team&&w>=0);playedMatch=false}
 const head=w>=0?`<span style="color:${hex(T[w].c)}">${T[w].n.toUpperCase()}</span> WINS!`:'DRAW!';
 $('sb').innerHTML=`<h1>${head}</h1><p style="font-size:16px">Final score: ${scoreLine()}</p>
 <table><tr><th>Player</th><th>Kills</th><th>Assists</th><th>Deaths</th><th>Damage (HP)</th></tr>${rows.map(e=>`<tr class="${e.p?'me':''}"><td style="color:${hex(T[e.team].c)}">${e.name}${e.p?' (you)':''}${e.jug?' 👑':''} · ${WP[e.pw===undefined?e.w:e.pw].n}</td><td>${e.k}</td><td>${e.ast}</td><td>${e.d}</td><td>${e.dmg}</td></tr>`).join('')}</table>`;
 $('sb').style.display='flex';$('lb').style.display='flex';$('lc').textContent='Continue';$('lc').disabled=false;
 G.forEach(e=>{e.hp=e.mhp;e.alive=true;e.m.visible=!e.p;e.gg.visible=false;e.y=0;e.vy=0;e.tx=undefined;if(owned(e)){const a=rnd(0,6.28),r=Math.sqrt(Math.random())*(LB.r-2);e.x=LB.x+Math.cos(a)*r;e.z=LB.z+Math.sin(a)*r;e.a=Math.PI;e.pitch=0}});vig=0;
 const mine=w==ME.team&&w>=0;{const fe=$('fl');fe.className='';void fe.offsetWidth;fe.className=mine?'win':(w<0?'':'lose')}banner(w<0?'DRAW':`<span style="color:${hex(T[w].c)}">${T[w].n.toUpperCase()}</span> WINS!<br><small>${mine?'VICTORY! 🏆':'DEFEAT'}</small>`,'#fff');
 (mine?[523,659,784,1046]:w<0?[440,440]:[440,392,330,262]).forEach((f,i)=>setTimeout(()=>tone(f,.25,mine?'square':'triangle',.09),i*160))}
function hostEnd(){pid++;beginLobby(null,30);sendSt()}
function moveIce(e,vx,vz,sp,dt){if(!ICE){e.x+=vx*sp*dt;e.z+=vz*sp*dt;e.pvx=e.pvz=0;return}e.pvx=e.pvx||0;e.pvz=e.pvz||0;const k=Math.min(1,dt*1.1);e.pvx+=(vx*sp-e.pvx)*k;e.pvz+=(vz*sp-e.pvz)*k;e.x+=e.pvx*dt;e.z+=e.pvz*dt}
let FLG=[],CAPS=[0,0],flgT=0,lastCapG=-1;const FG=new THREE.Group();scene.add(FG);
function mkFlag(t,hx,hz){const g=new THREE.Group(),c=T[t].c,pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,3.2,8),mat(0xffffff));pole.position.y=1.6;g.add(pole);
 const ban=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.9),new THREE.MeshBasicMaterial({color:c,side:2}));ban.position.set(.7,2.7,0);g.add(ban);const gl=glow(c,4);gl.position.y=2.4;g.add(gl);
 const rg=addM(new THREE.RingGeometry(1.6,2,32),c,.8);rg.rotation.x=-Math.PI/2;rg.position.set(hx,.06,hz);FG.add(rg);FG.add(g);g.position.set(hx,0,hz);return{t,hx,hz,x:hx,z:hz,car:-1,home:true,m:g,ban}}
function initFlags(){FG.children.slice().forEach(c=>FG.remove(c));FLG=MAPS[MP].F.map((f,t)=>mkFlag(t,f[0],f[1]));CAPS=[0,0]}
function flagMsg(e,f,k){if(k=='take')banner(e===ME?'YOU HAVE THE FLAG!':`${e.name} took the ${T[f.t].n} flag`,hex(T[e.team].c));else if(k=='ret')banner(`${T[f.t].n} flag returned`,hex(T[f.t].c));
 else{banner(`${T[e.team].n.toUpperCase()} CAPTURED THE FLAG! +5`,hex(T[e.team].c));if(e===ME)ME.sc.cf++;lastCapG=e.gid}tone(k=='cap'?900:600,.2,'triangle',.08)}
function ctfStep(){let chg=false;FLG.forEach(f=>{const car=f.car>=0?G[f.car]:null;
  if(car){if(!car.alive){f.car=-1;f.x=car.x;f.z=car.z;f.home=false;chg=true}else{f.x=car.x;f.z=car.z}}
  else{for(const e of G){if(!e.alive||Math.hypot(e.x-f.x,e.z-f.z)>2.2)continue;if(e.team!=f.t){f.car=e.gid;f.home=false;chg=true;flagMsg(e,f,'take')}else if(!f.home){f.x=f.hx;f.z=f.hz;f.home=true;chg=true;flagMsg(e,f,'ret')}if(chg)break}}
  if(f.car>=0){const c=G[f.car],own=FLG[c.team];if(Math.hypot(c.x-own.hx,c.z-own.hz)<2.6){CAPS[c.team]++;TS[c.team]+=5;f.car=-1;f.x=f.hx;f.z=f.hz;f.home=true;chg=true;flagMsg(c,f,'cap')}}});return chg}
function onFlg(m){const d=m.data;if(!d||!started||isHost||(m.isMe&&m.sameTab)||!FLG.length)return;FLG.forEach((f,i)=>{const sv=d.f[i];if(!sv)return;const was=f.car;f.car=sv[0];f.x=sv[1];f.z=sv[2];f.home=!!sv[3];if(f.car>=0&&was!==f.car&&G[f.car])flagMsg(G[f.car],f,'take')});
 d.cp.forEach((n,t)=>{if(n>CAPS[t]){const dd=n-CAPS[t];CAPS[t]=n;TS[t]+=5*dd;banner(`${T[t].n.toUpperCase()} CAPTURED THE FLAG! +5`,hex(T[t].c));if(d.lc===ME.gid)ME.sc.cf++;tone(900,.2,'triangle',.08)}})}
function mkCrate(id,x,z,tp){const cc=tp==1?0x32ff6a:0xffd400,g=new THREE.Group(),b=new THREE.Mesh(bx(1.1,.8,1.1),new THREE.MeshStandardMaterial({color:tp==1?0xf4f4f4:0x2a2a3a,emissive:cc,emissiveIntensity:.35,metalness:.5,roughness:.5}));b.position.y=.4;g.add(b);
 const st=new THREE.Mesh(bx(1.14,.14,1.14),mat(cc));st.position.y=.4;g.add(st);if(tp==1){const c1=new THREE.Mesh(bx(.7,.06,.2),mat(0xff2040)),c2=new THREE.Mesh(bx(.2,.06,.7),mat(0xff2040));c1.position.y=c2.position.y=.83;g.add(c1,c2)}
 const pc=new THREE.Mesh(new THREE.SphereGeometry(1.6,12,8,0,6.283,0,1.5),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.75,side:2}));pc.position.y=2.6;g.add(pc);
 const bm=addM(new THREE.CylinderGeometry(.5,.5,30,12,1,true),cc,.35);bm.position.y=15;g.add(bm);g.position.set(x,45,z);scene.add(g);const c={id,x,z,g,pc,bm,y:45,landed:false,tp:tp||0};CR.push(c);return c}
function removeCrate(id){const i=CR.findIndex(c=>c.id==id);if(i>=0){scene.remove(CR[i].g);CR.splice(i,1)}}
function refill(e){if(!e.invs)return;e.invs.forEach(I=>{const W=WP[I.w];I.m=W.mag;I.r=W.res});e.rl=0}
function crateStep(dt){for(let i=CR.length-1;i>=0;i--){const c=CR[i],cc=c.tp==1?0x32ff6a:0xffd400;if(!c.landed){c.y-=9*dt;if(c.y<=0){c.y=0;c.landed=true;c.pc.visible=false;ring(c.x,c.z,cc,4,.6);pts(c.x,.5,c.z,[cc,0x999999],14,4,4,.15,.8);tone(300,.15,'triangle',.07,-100,c.x,c.z)}c.g.position.y=c.y}
  else{c.g.rotation.y+=dt*.8;c.bm.material.opacity=.25+Math.sin(performance.now()/250)*.1;for(const e of G){if(!e.alive||!owned(e)||Math.hypot(e.x-c.x,e.z-c.z)>1.9)continue;if(c.tp==1&&e.hp>=e.mhp)continue;
   if(c.tp==1){e.hp=Math.min(e.mhp,e.hp+Math.max(60,e.mhp*.6));if(e.p){banner('HEALED','#32ff6a');tone(700,.15,'triangle',.08)}pts(e.x,e.y+1,e.z,0x32ff6a,12,2,5,.12,.9,-2)}
   else{refill(e);if(e.p){banner('AMMO RESTOCKED','#ffd400');tone(880,.15,'triangle',.08)}}removeCrate(c.id);net('pick',{id:c.id});break}}}}
function spawnCrates(){const M=MAPS[MP],ar=[];for(let k=0;k<4;k++){let x,z,t=0;do{x=rnd(-A+5,A-5);z=rnd(-(M.Wz||A)+5,(M.Wz||A)-5);t++}while(inB(x,z,0)&&t<40);const id=(Date.now()%1e6)*8+k,tp=k<2?0:1;mkCrate(id,x,z,tp);ar.push([id,r2(x),r2(z),tp])}net('crate',{c:ar})}
function giveInv(e){const mk2=w=>({w,m:WP[w].mag,r:WP[w].res});if(e.pw===undefined)e.pw=e.w;e.invs=e.jug?[mk2(4)]:(e.zom?[mk2(5)]:[mk2(e.pw),mk2(0),mk2(5),mk2(6)].concat(Math.random()<.1?[mk2(7)]:[]));e.slot=0;e.w=e.invs[0].w;e.rl=0;e.sw=0;e.dmg2={};if(e.p&&e.invs.length>4)feed.push({t:5,s:'🚀 You got a Rocket Launcher! (key 5)'});if(e.p)buildVM(e.w,T[e.team].c)}
function switchSlot(e,i){if(!e.invs||i<0||i>=e.invs.length||i===e.slot)return;e.slot=i;e.w=e.invs[i].w;e.rl=0;e.sw=.28;if(e.p){buildVM(e.w,T[e.team].c);tone(420,.05,'square',.04)}}
function startReload(e){const I=e.invs&&e.invs[e.slot],W=WP[e.w];if(!I||W.inf||I.m>=W.mag||I.r<=0||e.rl>0||e.sw>0)return;e.rl=W.rt;if(e.p){tone(260,.08,'triangle',.05);setTimeout(()=>noise(.05,.12,2500,800,undefined,undefined,'bandpass'),W.rt*600)}}
function tryFire(e,a,pt){const I=e.invs[e.slot],W=WP[e.w];if(e.sw>0||e.rl>0||e.cd>0)return false;if(!W.inf&&I.m<=0){startReload(e);return false}
 fire(e,a,pt);if(!W.inf){I.m--;if(I.m<=0)startReload(e)}return true}
function botSlot(e,tg,dist){if(!e.invs||e.invs.length<2||e.sw>0||e.rl>0||(e.swt||0)>0)return;const iv=e.invs,has=i=>iv[i]&&(WP[iv[i].w].inf||iv[i].m+iv[i].r>0);let want=0;
 if(tg){if(dist<2.4&&has(2))want=2;else if(dist>10&&has(4)&&Math.random()<.4)want=4;else if(dist>7&&dist<22&&has(3)&&Math.random()<.3)want=3;else if(has(0))want=0;else if(has(1))want=1;else want=2}
 else if(e.mem>0&&has(3)&&Math.random()<.15)want=3;else want=has(0)?0:has(1)?1:2;
 if(want!==e.slot){switchSlot(e,want);e.swt=.8}}
let GN=[];
function grenade(e,a,pt,x,z,y,bn){const col=T[e.team].c,m=new THREE.Mesh(new THREE.SphereGeometry(.14,10,8),mat(col)),dx=Math.sin(a)*Math.cos(pt),dy=Math.sin(pt),dz=Math.cos(a)*Math.cos(pt);
 m.position.set(x+dx*.8,y-.1+dy*.8,z+dz*.8);scene.add(m);GN.push({m,vx:dx*20+e.vx*.3,vy:dy*20+1.5,vz:dz*20+e.vz*.3,fuse:1.6,o:e,col,d:WP[6].d,wid:6,id:`${e.gid}.${bn}.g`})}
function boom(x,y,z,b){const R=b.rk?5.5:6.5,D=b.d,c=b.col,dm0=Math.hypot(x-ME.x,z-ME.z);
 flash(x,y+.3,z,0xffffff,3,14,.3);flash(x,y+.3,z,c,6,22,.55);ring(x,z,c,R*1.7,.55);ring(x,z,0xffffff,R,.3);{const dm3=addM(new THREE.SphereGeometry(1,16,12),c,.6);dm3.position.set(x,y,z);fx(dm3,.5,k=>{dm3.scale.setScalar(1+k*R*1.1);dm3.material.opacity=.6*(1-k)})}pts(x,y+.4,z,[0x444444,0x666666,0x222222],26,3,4,.4,2.4,-1.5);dec(x,0,z,0,0,0x151515,R*.45);noise(1.4,.25,400,40,x,z);pts(x,y,z,[c,0xffffff,0xffd400,0xff7a00],70,11,11,.2,1.6,18,true);blob(x,0,z,0,0,c,2.2);
 shake=Math.max(shake,clamp(1.3-dm0/26,0,1.2));noise(.9,.4,1800,60,x,z);tone(60,.6,'sawtooth',.25,-30,x,z);
 G.forEach(v=>{if(!v.alive||v.team==b.o.team||!owned(v))return;const d=Math.hypot(v.x-x,v.z-z,(v.y+1)-y);if(d>R)return;const k=Math.pow(1-d/R,.7),vis=los({x,z},v)?1:.35;hurtLocal(v,b.o,Math.max(5,D*k*vis),false,v.x,v.y+1,v.z,'',b.wid)})}
function fire(e,a,pt){const sd=Math.random()*1e9|0,bn=++e.bn,y=(e.p?EYE*(e.jug?1.3:1):1.4*(e.jug?1.45:1))+e.y;spawnB(e,a,pt,sd,e.x,e.z,y,bn);e.cd=WP[e.w].cd*(e.p?1:1.35);if(e.w<=4)pts(e.x-Math.cos(e.a)*.28+Math.sin(e.a)*.2,y-.2,e.z+Math.sin(e.a)*.28+Math.cos(e.a)*.2,0xd4af37,1,2,2.5,.05,.7,14);
 if(e===ME||(isHost&&e.bot))net('fire',{g:e.gid,a:r3(a),pt:r3(pt),sd,x:r2(e.x),z:r2(e.z),y:r2(y),bn,w:e.w})}
function spawnB(e,a,pt,sd,x,z,y,bn){const W=WP[e.w];if(W.gren){e.mzT=.05;if(e.p)thrT=.4;grenade(e,a,pt,x,z,y,bn);fireSnd(e.w,e.p?undefined:x,z);return}if(e.w==5){flash(x+Math.sin(a)*1.1,y-.25,z+Math.cos(a)*1.1,T[e.team].c,.5,2,.14);if(e.p){kick=Math.max(kick,.2);stabT=.3}}
 const rg=rng(sd),sp3=(W.sp+(e.p?0:.06))*(e.p?1-adsK*.7:1),col=T[e.team].c;e.mzT=.08;if(e.p){kick=Math.max(kick,W.rc);shake=Math.max(shake,.12*W.rc)}
 for(let i=0;i<W.p;i++){const an=a+(rg()*2-1)*sp3,pp=pt+(rg()*2-1)*sp3*.6,dx=Math.sin(an)*Math.cos(pp),dy=Math.sin(pp),dz=Math.cos(an)*Math.cos(pp),g=new THREE.Group();
  const core=new THREE.Mesh(bulG,mat(col));core.scale.set(1,1,4);const st=new THREE.Mesh(boxG,am(col));st.scale.set(.06,.06,3);st.position.z=-1.7;const gl=new THREE.Sprite(sm(col));gl.scale.set(.6,.6,1);g.add(core,st,gl);if(e.w==5)g.visible=false;if(W.rk){core.scale.set(2.2,2.2,7);gl.scale.set(1.6,1.6,1)}
  g.position.set(x+dx*.8,y-.1+dy*.8,z+dz*.8);g.lookAt(g.position.x+dx,g.position.y+dy,g.position.z+dz);scene.add(g);
  B.push({m:g,vx:dx*W.v,vy:dy*W.v,vz:dz*W.v,o:e,d:W.d,fd:W.fd,tr:0,life:W.life||16,gf:W.gf===undefined?1:W.gf,rk:!!W.rk,wid:e.w,col,id:`${e.gid}.${bn}.${i}`,py:g.position.y})}
 fireSnd(e.w,e.p?undefined:x,z)}
const rmB=id=>{const i=B.findIndex(b=>b.id===id);if(i>=0){scene.remove(B[i].m);B.splice(i,1)}};
function hurtLocal(v,o,d,head,x,y,z,bid,wid){if(!v.alive||v.inv>0)return;const dm2=Math.max(1,Math.round(d*(head?1.5:1))),hp=Math.max(0,v.hp-dm2),dead=hp<=0;
 applyHurt(v,o,dm2,head,hp,dead,x,y,z,wid);net('hurt',{v:v.gid,o:o.gid,dm:dm2,hd:head?1:0,hp,dead:dead?1:0,b:bid,x:r2(x),y:r2(y),z:r2(z),w:wid})}
function applyHurt(v,o,dm2,head,hp,dead,x,y,z,wid){wid=wid===undefined?o.w:wid;if(!v.alive)return;{const rl2=Math.min(dm2,v.hp);o.dmg+=rl2;v.dmg2=v.dmg2||{};v.dmg2[o.gid]={a:(v.dmg2[o.gid]?v.dmg2[o.gid].a:0)+rl2,t:performance.now()}}if(o===ME&&head)ME.sc.hs++;v.hp=hp;v.fl=.15;v.mode*=-1;if(v.bot&&o&&o.alive){v.alertT=2.5;v.lx=o.x;v.lz=o.z;v.mem=3}pts(x,y,z,T[o.team].c,18,5,5,.12,.9,16,true);flash(x,y,z,T[o.team].c,.6,1.6,.15);
 if(o===ME){hmT=.3;$('hm').style.color=head?'#ffd400':'#fff';tone(head?1500:900,.07,'square',.08);if(head)setTimeout(()=>tone(2000,.08,'square',.07),60)}
 if(v===ME){vig=1;shake=.6;tone(170,.15,'sawtooth',.12,-80);noise(.12,.15,800,200)}
 if(dead){v.hp=0;v.alive=false;v.d++;o.k++;{const nw2=performance.now();for(const gid in v.dmg2){const at=G[+gid],q2=v.dmg2[gid];if(at&&at!==o&&nw2-q2.t<8000&&q2.a>=15){at.ast++;if(at===ME){feed.push({t:4,s:'<small>🤝 Assist</small>'});tone(900,.08,'triangle',.06)}}}v.dmg2={};if(MD==6&&v.team==0){v.team=1;v.zom=true;v.pw=5;v.rt=3;v.tint.color.setHex(T[1].c);v.fg.material.color.setHex(T[1].c);v.tk='';if(ASG&&ASG[v.gid]){ASG[v.gid][0]=1;ASG[v.gid][1]=5;ASG[v.gid][4]=2}TS[1]=(TS[1]||0)+1;if(v===ME){buildVM(5,T[1].c);banner('YOU ARE INFECTED!','#7dff3a')}}if(o===ME){if(wid==5)ME.sc.kn++;if(wid==6)ME.sc.gr++;if(wid==7)ME.sc.rk++;if(wid!=6&&wid!=7){const nw3=performance.now();killTs.push(nw3);killTs=killTs.filter(t=>nw3-t<500);if(killTs.length>=5)applyBan()}}}TS[o.team]=(TS[o.team]||0)+(v.jug?10:1);v.rt=5;v.m.visible=false;v.rv=0;deathFx(v,o);
  feed.push({t:5,s:`<b style="color:${hex(T[o.team].c)}">${o.name}</b> <small>${WP[wid].n}${head?' 🎯':''}</small> ➜ <b style="color:${hex(T[v.team].c)}">${v.name}</b>`});if(feed.length>5)feed.shift();
  if(o===ME){banner('+1 KILL'+(head?'<br><small>HEADSHOT!</small>':''),hex(T[o.team].c));ts=.35;tsT=.4;[700,1100,1500].forEach((f,i)=>setTimeout(()=>tone(f,.12,'square',.08),i*80))}
  if(v===ME){banner('ELIMINATED BY<br><small>'+o.name+' · '+WP[wid].n+'</small>',hex(T[o.team].c));ts=.3;tsT=.7;kt=0;vig=1;shake=1}}}
function wallHit(q,o,b){const top=b.py>=o.h-.05;if(top){blob(q.x,o.h+.065,q.z,0,0,b.col,rnd(.3,.7));pts(q.x,o.h+.12,q.z,b.col,9,4,5,.1,.7,14);return}
 const d=[q.x-o.x0,o.x1-q.x,q.z-o.z0,o.z1-q.z],k=d.indexOf(Math.min(...d));let nx=0,nz=0,x=q.x,z=q.z;
 if(k==0){nx=-1;x=o.x0}else if(k==1){nx=1;x=o.x1}else if(k==2){nz=-1;z=o.z0}else{nz=1;z=o.z1}
 const rr=rnd(.3,.8),yy=Math.min(q.y,o.h-.1);blob(x,yy,z,nx,nz,b.col,rr);drips(x,yy,z,nx,nz,b.col,rr);pts(x+nx*.1,q.y,z+nz*.1,b.col,10,4,4,.1,.7,14,true);ring(x+nx*.05,z+nz*.05,b.col,.8,.2,q.y);noise(.05,.1,5000,1500,x,z,'bandpass')}
const keys={};addEventListener('keydown',e=>{const tg=e.target&&e.target.tagName;if(tg=='INPUT'||tg=='TEXTAREA')return;if(chatHotkey(e))return;keys[e.code]=1;if(e.code=='Space'||e.code=='Tab')e.preventDefault();if(e.code=='Tab'){tabOn=true;tabUI()}if(phase=='match'&&ME.alive&&ME.invs){if(/^Digit[1-5]$/.test(e.code))switchSlot(ME,+e.code[5]-1);if(e.code=='KeyR')startReload(ME)}});addEventListener('keyup',e=>{keys[e.code]=0;if(e.code=='Tab'){tabOn=false;$('tb').style.display='none'}});addEventListener('blur',()=>{for(const k in keys)keys[k]=0;tabOn=false;mouse2=false});addEventListener('contextmenu',e=>e.preventDefault());['mousedown','mouseup','mousemove'].forEach(ev=>addEventListener(ev,e=>{if(touchMode)return;if(e.target.closest&&e.target.closest('button,#vt,#ov,#help'))return;mouse.down=!!(e.buttons&1);mouse2=!!(e.buttons&2)},true));
const mouse={down:false},tp={},help=$('help');
const blocked=e=>['BUTTON','A','INPUT'].includes(e.target.tagName)||e.target.id=='fb'||e.target.id=='jb'||e.target.id=='ab'||e.target.id=='cb2'||(e.target.parentNode&&e.target.parentNode.id=='wbar')||help.style.display=='flex'||$('ov').style.display!='none';
addEventListener('pointerdown',e=>{if(blocked(e))return;if(e.pointerType=='mouse'){if(phase=='match'){const r=cv.requestPointerLock&&cv.requestPointerLock();if(r&&r.catch)r.catch(()=>{})}}
 else{touchMode=true;const side=e.clientX<innerWidth/2?'l':'r',t=tp[e.pointerId]={side,sx:e.clientX,sy:e.clientY,lx:e.clientX,ly:e.clientY,x:0,y:0};if(side=='l')stickL=t}});
addEventListener('pointermove',e=>{const t=tp[e.pointerId];if(!t)return;
 if(t.side=='r'){if(ME.alive){const dx=e.clientX-t.lx;ME.a-=dx*.006;sway+=dx*.004;ME.pitch=clamp(ME.pitch-(e.clientY-t.ly)*.005,-1.4,1.4)}t.lx=e.clientX;t.ly=e.clientY}
 else{const dx=e.clientX-t.sx,dy=e.clientY-t.sy,d=Math.hypot(dx,dy)||1,k=Math.min(1,d/54),m=k<.12?0:(k-.12)/.88;t.x=dx/d*m;t.y=dy/d*m}});
addEventListener('mousemove',e=>{if(phase!='match'&&phase!='lobby'||!ME.alive)return;if(document.pointerLockElement||mouse.down){const ss=1-adsK*(ME.w==3?.75:.45);ME.a-=e.movementX*.0022*ss;sway+=e.movementX*.0015;ME.pitch=clamp(ME.pitch-e.movementY*.0022*ss,-1.4,1.4)}});
const up=e=>{const t=tp[e.pointerId];if(t&&t.side=='l')stickL=null;delete tp[e.pointerId]};addEventListener('pointerup',up);addEventListener('pointercancel',up);
const fb=$('fb');fb.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();fireHeld=true;touchMode=true;tp[e.pointerId]={side:'r',lx:e.clientX,ly:e.clientY,x:0,y:0}});
['pointerup','pointercancel'].forEach(n=>fb.addEventListener(n,e=>{fireHeld=false;delete tp[e.pointerId];e.stopPropagation()}));
const jb=$('jb');jb.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();jumpReq=true;jumpHeld=true;touchMode=true;ac()});['pointerup','pointercancel'].forEach(n=>jb.addEventListener(n,e=>{jumpHeld=false;e.stopPropagation()}));
document.querySelectorAll('#wbar div').forEach(b=>b.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();touchMode=true;if(!ME.invs||phase!='match')return;const i=+b.dataset.s;if(i==5)startReload(ME);else switchSlot(ME,i)}));
const ab=$('ab'),cb2=$('cb2');ab.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();mouse2=!mouse2;touchMode=true});cb2.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();crT=!crT;touchMode=true});
const fit=()=>{const w=cv.clientWidth||innerWidth,h=cv.clientHeight||innerHeight;renderer.setSize(w,h,false);fov(w,h)};['resize','orientationchange'].forEach(ev=>addEventListener(ev,fit));if(window.visualViewport)visualViewport.addEventListener('resize',fit);if(window.ResizeObserver)new ResizeObserver(fit).observe(cv);fit();setTimeout(fit,300);setTimeout(fit,1500);
function setMute(v){mute=v;$('mt').textContent=mute?'🔇':'🔊';$('mt2').textContent='Sound: '+(mute?'OFF':'ON');if(amb)amb.gain.value=mute?0:.012}
$('mt').onclick=$('mt2').onclick=()=>setMute(!mute);$('mus2').onclick=()=>{musOn=!musOn;$('mus2').textContent='Music: '+(musOn?'ON':'OFF')};
const fsb=$('fs'),de=document.documentElement,fsOn=()=>document.fullscreenElement||document.webkitFullscreenElement;
$('nt').href=location.href;$('hb').onclick=()=>help.style.display='flex';$('hc').onclick=()=>help.style.display='none';
fsb.onclick=async()=>{const rq=de.requestFullscreen||de.webkitRequestFullscreen;if(!rq){help.style.display='flex';return}
 try{if(fsOn()){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}else{await rq.call(de);try{await screen.orientation.lock('landscape')}catch(e){}setTimeout(()=>{if(!fsOn())help.style.display='flex'},500)}}catch(e){help.style.display='flex'}};
['fullscreenerror','webkitfullscreenerror'].forEach(n=>document.addEventListener(n,()=>help.style.display='flex'));
$('lq').onclick=$('ex').onclick=()=>{try{R&&R.leave()}catch(e){}location.reload()};
$('lc').onclick=()=>{ME.rd=1;$('sb').style.display='none';sbT=0;$('lc').textContent='Ready ✓';$('lc').disabled=true;pres({rd:1})};
function playerStep(e,dt,match){let mx=(keys.KeyD?1:0)-(keys.KeyA?1:0),mf=(keys.KeyW?1:0)-(keys.KeyS?1:0);if(stickL){mx=stickL.x;mf=-stickL.y}e.cr+=(((keys.ControlLeft||keys.ControlRight||keys.KeyC||crT)&&e.y<.05?1:0)-e.cr)*Math.min(1,dt*12);
 const l=Math.hypot(mx,mf);if(l>1){mx/=l;mf/=l}const s=Math.sin(e.a),c=Math.cos(e.a),sp3=(e.fly?9:(e.y>.05?5.2:6))*(e.jug?.75:e.zom?1.2:1)*(1-.5*e.cr)*(1-adsK*.3);moveIce(e,s*mf-c*mx,c*mf+s*mx,sp3,dt);
 e.a+=((keys.ArrowLeft||keys.KeyQ?1:0)-(keys.ArrowRight||keys.KeyE?1:0))*2.2*dt;e.pitch=clamp(e.pitch+((keys.ArrowUp?1:0)-(keys.ArrowDown?1:0))*1.6*dt,-1.4,1.4);
 const g0=groundAt(e);if(!e.fly&&(keys.Space||jumpReq||jumpHeld)&&e.y<=g0+.03){e.vy=8.4;jumpReq=false;tone(300,.15,'sine',.07,400);noise(.1,.05,600,2000)}jumpReq=false;
 if(e.fly){const up2=(keys.Space||jumpHeld?1:0)-((keys.ControlLeft||keys.ControlRight||keys.KeyC||crT)?1:0);e.vy=up2*10;e.y=clamp(e.y+e.vy*dt,0,70)}else{e.vy-=22*dt;e.y+=e.vy*dt}if(!e.fly&&e.y<=g0){if(e.vy<-5){landT=1;noise(.15,.18,500,90);ring(e.x,e.z,0x6a5acd,1.6,.3);pts(e.x,.1,e.z,0x6a5acd,10,3,2,.1,.5,6)}e.y=g0;e.vy=0}
 if(match&&(fireHeld||mouse.down||keys.KeyF)&&e.cd<=0){let a=e.a,pt=e.pitch;
  if(touchMode){let bd=.16,bt2=null;G.forEach(o=>{if(o.alive&&o.team!=e.team){const dd=Math.abs(ad(e.a,Math.atan2(o.x-e.x,o.z-e.z)));if(dd<bd&&los(e,o)){bd=dd;bt2=o}}});
   if(bt2){const d=Math.hypot(bt2.x-e.x,bt2.z-e.z),tt=d/82;a+=ad(e.a,Math.atan2(bt2.x-e.x,bt2.z-e.z))*.7;pt+=(Math.atan2(1.25-EYE+.5*GR*tt*tt,d)-pt)*.7}}
  tryFire(e,a,pt)}}
function botMatch(e,dt){const W=WP[e.w];let tg=null,bs=1e9,near=null,nd=1e9;
 G.forEach(o=>{if(!o.alive||o.team==e.team)return;const d=Math.hypot(o.x-e.x,o.z-e.z);if(d<nd){nd=d;near=o}if(d<32&&los(e,o)&&(d<5||e.alertT>0||Math.abs(ad(e.a,Math.atan2(o.x-e.x,o.z-e.z)))<1.75)){const s=d*(.6+o.hp/o.mhp*.4);if(s<bs){bs=s;tg=o}}});
 if(tg){if(e.tg!==tg)e.react=rnd(.5,.95);e.tg=tg;e.mem=3;e.lx=tg.x;e.lz=tg.z;e.react-=dt}else{e.mem-=dt;e.tg=null}
 e.t-=dt;if(e.t<0||e.hit){e.t=rnd(.6,1.9);e.err=rnd(-.09,.09);if(Math.random()<.5)e.mode*=-1;e.gl=Math.random()<.3?rnd(-1.4,1.4):0;e.hit=false}
 let hx=0,hz=0,f=0,str=0,sp3=4.6*(e.jug?.75:e.zom?1.25:1),ta=e.a,dist=0,tt=0;
 let obj=null,carrying=false,noFire=false;if(MD==4&&FLG.length){const mf=FLG[e.team],ef=FLG[1-e.team];carrying=ef.car===e.gid;if(carrying)obj=[mf.hx,mf.hz];else if(e.gid%3!=2)obj=!mf.home?[mf.x,mf.z]:[ef.x,ef.z]}
 if(obj&&(!tg||carrying)){const an=Math.atan2(obj[0]-e.x,obj[1]-e.z);hx=Math.sin(an);hz=Math.cos(an);f=1;ta=an;noFire=true;sp3*=1.1}else if(tg){const dx=tg.x-e.x,dz=tg.z-e.z,d=Math.hypot(dx,dz),an=Math.atan2(dx,dz);tt=d/W.v;dist=d;ta=Math.atan2(tg.x+tg.vx*tt*.55-e.x,tg.z+tg.vz*tt*.55-e.z)+(e.err||0);hx=Math.sin(an);hz=Math.cos(an);
  if(e.hp<e.mhp*.35){f=-1;str=.8;sp3=5.2}else{f=d>W.r[1]?1:d<W.r[0]?-1:0;str=.9}}
 else if(e.mem>0){const dx=e.lx-e.x,dz=e.lz-e.z,an=Math.atan2(dx,dz);if(Math.hypot(dx,dz)<1.5)e.mem=0;hx=Math.sin(an);hz=Math.cos(an);f=1;ta=an+e.gl}
 else if(near&&e.hp>=e.mhp*.35){const an=Math.atan2(near.x-e.x,near.z-e.z);hx=Math.sin(an);hz=Math.cos(an);f=1;ta=an+e.gl}
 else if(!near){e.wt=(e.wt||0)-dt;if(e.wt<=0||Math.hypot(e.gx-e.x,e.gz-e.z)<1.5){for(let k=0;k<8;k++){e.gx=rnd(-A+4,A-4);e.gz=rnd(-A+4,A-4);if(!inB(e.gx,e.gz,.5))break}e.wt=rnd(3,7)}const an=Math.atan2(e.gx-e.x,e.gz-e.z);hx=Math.sin(an);hz=Math.cos(an);f=1;ta=an+e.gl;sp3*=.8}
 let vx=hx*f+hz*str*e.mode,vz=hz*f-hx*str*e.mode;const l=Math.hypot(vx,vz)||1;vx/=l;vz/=l;
 if(inB(e.x+vx*1.7,e.z+vz*1.7,.5)||Math.abs(e.x+vx*1.7)>A-1||Math.abs(e.z+vz*1.7)>A-1){[vx,vz]=[vz*e.mode,-vx*e.mode]}
 moveIce(e,(f||str)?vx:0,(f||str)?vz:0,sp3,dt);
 e.a+=ad(e.a,ta)*Math.min(1,dt*4);e.pitch+=((tg?Math.atan2(1.25-1.4+.5*GR*tt*tt,dist):0)-e.pitch)*Math.min(1,dt*8);
 botSlot(e,tg,dist);if(!tg&&e.invs){const I=e.invs[e.slot];if(I&&WP[e.w].mag<1e8&&I.m<WP[e.w].mag)startReload(e)}
 {const W2=WP[e.w];let pit=e.pitch;if(W2.gren)pit=.5*Math.asin(clamp(dist*GR/400,0,1));if(tg&&!noFire&&e.react<=0&&e.cd<=0&&Math.abs(ad(e.a,ta))<.12&&dist<W2.r[1]*1.5)tryFire(e,e.a,pit)}}
function botLobby(e,dt){e.t-=dt;if(e.t<0){const a=rnd(0,6.28),r=Math.sqrt(Math.random())*(LB.r-2);e.gx=LB.x+Math.cos(a)*r;e.gz=LB.z+Math.sin(a)*r;e.t=rnd(2,6)}
 const dx=e.gx-e.x,dz=e.gz-e.z,d=Math.hypot(dx,dz);if(d>.5){e.x+=dx/d*3*dt;e.z+=dz/d*3*dt;e.a+=ad(e.a,Math.atan2(dx,dz))*Math.min(1,dt*6)}}
function tagDraw(e){if(!e.tc){e.tc=document.createElement('canvas');e.tc.width=256;e.tc.height=84;e.tt=new THREE.CanvasTexture(e.tc);e.nt.material.map=e.tt;e.nt.material.needsUpdate=true}
 const c=e.tc.getContext('2d'),w=256,h=84,f=clamp(e.hp/e.mhp,0,1);c.clearRect(0,0,w,h);c.fillStyle='rgba(0,0,0,.65)';c.fillRect(6,4,w-12,h-8);
 c.fillStyle=hex(T[e.team].c);c.font='bold 27px system-ui';c.textAlign='center';c.fillText(e.name,w/2,32);
 c.fillStyle='#1b1b24';c.fillRect(16,42,w-32,26);c.fillStyle=f>.5?'#3dff6a':f>.25?'#ffd400':'#ff3b3b';c.fillRect(16,42,(w-32)*f,26);
 c.fillStyle='#fff';c.font='bold 20px system-ui';c.fillText(Math.ceil(e.hp)+' / '+e.mhp,w/2,62);e.tt.needsUpdate=true}
function los3(ax,ay,az,bx,by,bz){for(let i=1;i<18;i++){const t=i/18;if(inB(ax+(bx-ax)*t,az+(bz-az)*t,ay+(by-ay)*t))return false}return true}
function pose(e,dt){const air=e.y>.05,mv=e.mv,wk=e.wk,sw=Math.sin(wk),f=1-Math.exp(-dt*18),s=e.st,now=performance.now()/1000,rk=Math.max(0,e.mzT)*12,jg=e.jug?1.45:1,cr=e.cr||0,lose=phase=='lobby'&&winT>=0&&!e.p&&e.team!=winT,win=phase=='lobby'&&winT>=0&&!e.p&&e.team==winT;
 let tg=air?[-1.15,-.7,1.7,1.3]:[sw*.9*mv,-sw*.9*mv,Math.max(0,-Math.sin(wk+.6))*1.2*mv+.05,Math.max(0,Math.sin(wk+.6))*1.2*mv+.05];
 if(cr>.01&&!air)tg=tg.map((v,i)=>v*(1-cr)+[-.95,-.95,1.7,1.7][i]*cr);
 for(let i=0;i<4;i++)s[i]+=(tg[i]-s[i])*f;
 e.lt[0].rotation.x=s[0];e.lt[1].rotation.x=s[1];e.kn[0].rotation.x=s[2];e.kn[1].rotation.x=s[3];
 const ta=(e.p?.06*mv:.16*mv)+(air?(e.p?.05:.25):0)+(e.fl>0?.3:0)-rk*.04+cr*.3+(lose?.3:0),tc=Math.cos(ta),tsn=Math.sin(ta);
 e.tor.rotation.set(ta,Math.sin(wk)*.2*mv,Math.sin(wk)*.03*mv);e.tor.position.set(0,.85*(1-tc)-(e.p?.05:0),-.85*tsn-(e.p?.1:0));
 e.hd.position.set(0,.85+.77*tc,.77*tsn);e.hd.rotation.set(-e.pitch*.8-.1*mv+(lose?.6:0),-Math.sin(wk)*.12*mv,0);
 const rls=e.rl>0&&e.invs?Math.sin((1-e.rl/WP[e.w].rt)*Math.PI):0,sy=.85+.6*tc,sz=.6*tsn,ph=-1.45-e.pitch*.9+rk*.15+rls*.7;e.ar[0].position.set(-.34,sy,sz);e.ar[1].position.set(.34,sy,sz);
 e.ar[1].rotation.x=ph;e.ar[0].rotation.x=-1.2-e.pitch*.9+rk*.08+Math.sin(wk)*.15*mv;e.ar[0].rotation.z=-.35;e.el[1].rotation.x=-.5+rk*.1;e.el[0].rotation.x=-.9;
 e.gg.position.set(.31,sy-Math.cos(ph)*.62,sz-Math.sin(ph)*.62-rk*.02);e.gg.rotation.x=-e.pitch+rk*.05;
 e.r.position.y=Math.abs(sw)*.06*mv+Math.sin(now*2+e.i)*.008-cr*.28;e.r.rotation.z=Math.sin(wk)*.04*mv;
 let bounce=0;if(win){e.ar[0].rotation.x=e.ar[1].rotation.x=-2.9+Math.sin(now*9+e.i)*.35;e.ar[0].rotation.z=-.5;e.el[0].rotation.x=e.el[1].rotation.x=-.2;bounce=Math.abs(Math.sin(now*5+e.i))*.4}
 e.si=Math.min(1,e.si+dt*3);const k2=e.si,sc=e.alive?(k2>=1?1:1-Math.pow(1-k2,3)+Math.sin(k2*Math.PI)*.18):1;e.m.scale.setScalar(Math.max(.01,sc)*jg);
 e.m.position.set(e.x,e.y+bounce,e.z);e.r.rotation.y=e.a;e.tint.color.setHex(e.fl>0||(e.inv>0&&((performance.now()/80|0)%2))?0xffffff:T[e.team].c);
 if(SKINS[e.skin||0].pulse)e.suit.emissiveIntensity=.3+Math.sin(now*4)*.25;e.mz.material.opacity=e.mzT>0?1:0;e.mz.scale.setScalar(rnd(1,2));e.sh.scale.setScalar(Math.max(.2,.6-e.y*.2));
 if(e.p){e.m.visible=e.alive&&(phase=='match'||phase=='lobby');e.hd.visible=e.gg.visible=false;e.ar[0].visible=e.ar[1].visible=false;e.ch.visible=false;e.tor.visible=true;e.lt[0].position.z=e.lt[1].position.z=0}else e.ch.visible=true;
 {const K=SKINS[e.skin||0];if(K.aura&&!e.p&&e.alive){e.au.visible=true;e.au.material.color.setHex(K.aura);e.au.material.opacity=(K.leg?.5:.22)+Math.sin(now*3+e.i)*.1;e.au.scale.setScalar((K.leg?3.4:2.6)*(1+Math.sin(now*2+e.i)*.05))}else e.au.visible=false;
  if(K.cyc)e.suit.emissive.setHSL((now*.15+e.i*.1)%1,1,.5);if(K.trail&&mv>.5&&Math.random()<.5)pts(e.x,e.y+.15,e.z,K.trail,1,.6,.4,.1,.7,2)}
 e.bg.visible=e.fg.visible=false;
 const d=Math.hypot(e.x-ME.x,e.z-ME.z),ally=!e.p&&e.team==ME.team&&MD!=3&&e.alive&&phase=='match',show=!e.p&&e.alive&&phase=='match'&&d<(ally?70:45)&&(ally||los3(cam.position.x,cam.position.y,cam.position.z,e.x,e.y+2.2*jg,e.z));e.nt.visible=show;e.ol.visible=ally;if(ally)e.ol.material.color.setHex(T[e.team].c);
 if(show){const key=Math.ceil(e.hp)+e.name+e.team;if(e.tk!==key){e.tk=key;tagDraw(e)}const w=clamp(d*.1,1.7,4.5)/jg;e.nt.scale.set(w,w*.33,1);e.nt.position.y=2.5}}
function step(dt,raw){if(phase!='match'&&phase!='lobby')return;const match=phase=='match';tm-=raw;
 if(isHost&&match&&MD==6&&G.length&&!G.some(e=>e.team==0)){hostEnd();return}
 if(isHost&&tm<=0){tm=0;if(match)hostEnd();else hostStart();return}else if(tm<0)tm=0;
 if(sbT>0){sbT-=raw;if(sbT<=0)$('sb').style.display='none'}
 feed.forEach(f=>f.t-=raw);feed=feed.filter(f=>f.t>0);
 G.forEach(e=>{e.cd-=dt;e.inv-=dt;e.fl-=dt;e.mzT-=dt;e.rv-=dt;e.sw-=dt;e.swt=(e.swt||0)-dt;e.alertT=(e.alertT||0)-dt;if(e.rl>0){e.rl-=dt;if(e.rl<=0&&e.invs){const I=e.invs[e.slot],W=WP[e.w];if(I){const n=Math.min(W.mag-I.m,I.r);I.m+=n;I.r-=n;if(e.p){tone(520,.06,'square',.05);noise(.06,.1,3000,900)}}}}
  if(!e.alive){e.rt-=dt;if(match&&e.rt<=0&&owned(e)){e.hp=e.mhp;e.alive=true;e.inv=2;spawn(e);giveInv(e)}pose(e,dt);return}
  const ox=e.x,oz=e.z;
  if(e.p){playerStep(e,dt,match)}else if(owned(e)){match?botMatch(e,dt):botLobby(e,dt)}else rep(e,dt);
  if(owned(e)){if(!e.p&&e.y>0){e.vy-=22*dt;e.y=Math.max(0,e.y+e.vy*dt)}
   if(match){e.x=clamp(e.x,-LX,LX);e.z=clamp(e.z,-LZ,LZ);e.hit=false;push(e);if(ICE&&e.hit){e.pvx*=-.4;e.pvz*=-.4}}else{const dx=e.x-LB.x,dz=e.z-LB.z,d=Math.hypot(dx,dz);if(d>LB.r){e.x=LB.x+dx/d*LB.r;e.z=LB.z+dz/d*LB.r}}
   const sv=Math.hypot(e.x-ox,e.z-oz)/Math.max(dt,1e-4);e.vx=e.vx*.6+((e.x-ox)/Math.max(dt,1e-4))*.4;e.vz=e.vz*.6+((e.z-oz)/Math.max(dt,1e-4))*.4;e.mv=clamp(sv/6,0,1)}
  e.wk+=dt*10*e.mv;e.dust-=dt;if(e.mv>.6&&e.y<.05&&e.dust<=0){e.dust=.26;pts(e.x,.08,e.z,0x7a6acd,2,1.4,1.5,.07,.5,3);if(e.p)noise(.05,.05,700,300)}
  pose(e,dt)});
 if(match)for(let i=B.length-1;i>=0;i--){const b=B[i];let gone=false;b.life-=dt;if(b.life<0)gone=true;b.py=b.m.position.y;const sv=Math.hypot(b.vx,b.vy,b.vz),n=Math.ceil(sv*dt/.9),sd=dt/n,q=b.m.position;
  for(let s=0;s<n&&!gone;s++){b.vy-=GR*b.gf*sd;q.x+=b.vx*sd;q.y+=b.vy*sd;q.z+=b.vz*sd;b.tr+=sv*sd;
   if(q.y<.05){if(Math.hypot(q.x,q.z)<45){blob(q.x,0,q.z,0,0,b.col,rnd(.25,.6));pts(q.x,.1,q.z,b.col,7,3,3,.09,.5,14)}if(b.rk)boom(q.x,.1,q.z,b);gone=true;break}
   const o=inB(q.x,q.z,q.y);if(o){if(b.rk)boom(q.x,q.y,q.z,b);wallHit(q,o,b);gone=true;break}
   for(const v of G)if((owned(v)||b.rk)&&v.alive&&v.team!=b.o.team&&Math.hypot(v.x-q.x,v.z-q.z)<.55*(v.jug?1.45:1)&&q.y>v.y+.1&&q.y<v.y+1.95*hsc(v)){const k=b.fd?clamp(1-b.tr/b.fd,.2,1):1;if(b.rk)boom(q.x,q.y,q.z,b);else hurtLocal(v,b.o,b.d*k,q.y>v.y+1.5*hsc(v),q.x,q.y,q.z,b.id,b.wid);gone=true;break}}
  if(Math.abs(q.x)>1500||Math.abs(q.z)>1500)gone=true;
  if(gone){scene.remove(b.m);B.splice(i,1)}else{b.m.lookAt(q.x+b.vx,q.y+b.vy,q.z+b.vz);if(b.rk)pts(q.x,q.y,q.z,[0xffd400,0xff7a00,0x999999],1,.5,.3,.12,.5,0)}}
 if(match&&MD==4&&isHost&&FLG.length){const ch=ctfStep();flgT-=raw;if(ch||flgT<=0){flgT=.3;net('flg',{f:FLG.map(f=>[f.car,r2(f.x),r2(f.z),f.home?1:0]),cp:CAPS,lc:lastCapG})}}
 if(match){crateStep(dt);crTimer-=raw;if(isHost&&crTimer<=0){crTimer=25;spawnCrates()}}
 if(match)for(let i=GN.length-1;i>=0;i--){const g=GN[i],p=g.m.position;g.fuse-=dt;g.vy-=GR*dt;const nx=p.x+g.vx*dt,nz=p.z+g.vz*dt;if(inB(nx,p.z,p.y))g.vx*=-.5;else p.x=nx;if(inB(p.x,nz,p.y))g.vz*=-.5;else p.z=nz;p.y+=g.vy*dt;
  if(p.y<.14){p.y=.14;if(g.vy<-1.5)g.vy*=-.45;else g.vy=0;g.vx*=.8;g.vz*=.8}g.m.scale.setScalar(1+(g.fuse<.6?Math.sin(g.fuse*40)*.12:0));if(g.fuse<=0){boom(p.x,p.y,p.z,g);scene.remove(g.m);GN.splice(i,1)}}
 for(let i=P.length-1;i>=0;i--){const p=P[i],m=p.m;p.l-=dt;if(p.l<=0){scene.remove(m);P.splice(i,1);continue}p.vy-=p.g*dt;m.position.x+=p.vx*dt;m.position.y+=p.vy*dt;m.position.z+=p.vz*dt;if(p.stk){const o=inB(m.position.x,m.position.z,m.position.y);if(o){stick(m.position,o,m.material.color.getHex());scene.remove(m);P.splice(i,1);continue}}
  if(m.position.y<.06){m.position.y=.06;p.vy*=-.35;p.vx*=.6;p.vz*=.6;p.rx*=.5;p.ry*=.5}m.rotation.x+=p.rx*dt;m.rotation.y+=p.ry*dt;m.scale.setScalar(p.sc*Math.min(1,p.l/.35))}
 if(phase=='lobby'&&confT>0){confT-=raw;if(Math.random()<.6)pts(ME.x+rnd(-9,9),9,ME.z+rnd(-9,9),[T[winT>=0?winT:0].c,0xffffff,0xffd400],5,1.5,0,.13,4,2.5)}
 {const nw=performance.now()/1000;for(let i=S.length-1;i>=0;i--){const m=S[i],u=m.userData;if(u.t0===undefined)u.t0=nw;const age=nw-u.t0;if(age>35){if(!u.s0)u.s0=m.scale.clone();const k=(age-35)/3;if(k>=1){scene.remove(m);S.splice(i,1)}else m.scale.copy(u.s0).multiplyScalar(1-k)}}}
 for(let i=SPD.length-1;i>=0;i--){const d=SPD[i];d.t+=raw;const k=Math.min(1,d.t/.18);d.m.scale.setScalar(d.r*(.35+.65*(1-(1-k)*(1-k))));if(k>=1)SPD.splice(i,1)}
 for(let i=DP.length-1;i>=0;i--){const d=DP[i];d.w-=raw;if(d.w>0)continue;d.v*=Math.exp(-raw*1.1);d.len+=d.v*raw;if(d.y0-d.len<.08){d.len=Math.max(.001,d.y0-.08);d.v=0}
  d.t.scale.set(d.wd,Math.max(.001,d.len),1);d.t.position.y=d.y0-d.len/2;d.h.position.y=d.y0-d.len;if(d.v<.015){S.push(d.t,d.h);DP.splice(i,1)}}
 for(let i=FX.length-1;i>=0;i--){const f=FX[i];f.t+=raw;const k=f.t/f.d;if(k>=1){scene.remove(f.m);f.m.material.dispose();FX.splice(i,1)}else f.u(k)}}
function netStep(raw){
 if(R){const ps=peersV(),me=ps.find(p=>p.isMe&&p.sameTab);if(me)myId=me.peer;isHost=ps.length?hostOf(ps)===myId:true;
  sp2-=raw;if(sp2<=0&&(phase=='match'||phase=='lobby')){sp2=.05;syncPeers()}
  pt2-=raw;if(pt2<=0&&(phase=='match'||phase=='lobby')&&G.includes(ME)){pt2=.1;pres({g:ME.gid,x:r2(ME.x),z:r2(ME.z),y:r2(ME.y),a:r3(ME.a),pt:r3(ME.pitch),h:Math.ceil(ME.hp),al:ME.alive?1:0,mv:r2(ME.mv),cr:r2(ME.cr),sk:SKIN,mh:ME.mhp,adm:isAdmin()?1:0})}
  bt-=raw;if(bt<=0&&isHost&&(phase=='match'||phase=='lobby')){bt=.1;const s=G.filter(e=>e.bot).map(e=>[e.gid,r2(e.x),r2(e.z),r3(e.a),r3(e.pitch),Math.ceil(e.hp),e.alive?1:0,r2(e.mv),r2(e.y)]);net('bots',{s})}
  tmr-=raw;if(tmr<=0){tmr=.3;if(ASG&&(phase=='match'||phase=='lobby')&&!G.includes(ME)&&ASG.some(a=>a[2]===myId))remap();
   if(phase=='pick'){pickUI();if(isHost){net('st',{pid,ph:'pick',tm:Math.round(tm),md:MD,mp:MP,dn:DUEL.n,da:DUEL.ai?1:0});if(ps.length&&ps.every(p=>p.presence.tc>=0))pickHold+=.3;else pickHold=0;if(tm<=0||pickHold>=1.5)hostStart(true)}}
   if(phase=='search'){const n=ps.length;if(isHost&&!PRIV){srchCd-=.3;net('st',{ph:'search',cd:Math.ceil(srchCd)});if(srchCd<=0&&n>=1)hostPick()}uiSearch(ps)}
   if(isHost&&ASG&&(phase=='match'||phase=='lobby')){let ch=false;const ids=ps.map(p=>p.peer);
    ASG.forEach((a,j)=>{if(a[2]&&!ids.includes(a[2])){a[2]=null;a[3]=NM[(j*5+3)%NM.length];ch=true}});
    ps.forEach(p=>{if(!ASG.some(a=>a[2]===p.peer)){const cnt=[0,0,0,0];ASG.forEach(a=>{if(a[2])cnt[a[0]]++});const c=ASG.map((a,j)=>j).filter(j=>ASG[j][2]===null).sort((x,y)=>cnt[ASG[x][0]]-cnt[ASG[y][0]]);if(c.length){ASG[c[0]][2]=p.peer;ASG[c[0]][3]=nmOf(p);ch=true}}});
    if(ch){asgV++;remap();sendSt()}
    }
   if(isHost&&Math.floor(performance.now()/1000)!=lastSt){lastSt=Math.floor(performance.now()/1000);sendSt()}}}
 else{isHost=true}}
const ov=$('ov');
ov.addEventListener('pointerdown',e=>{const b=e.target.closest('button[data-t]');if(!b||b.disabled)return;const t=+b.dataset.t;if(canJoin(t,peersV())){pres({tc:t});pickUI();tone(600,.08,'square',.06)}});
function nick(){NICK=ACC?ACC.nick:guestName();started=true;return true}
const evLine=()=>EV=='halloween'?'🎃 HALLOWEEN EVENT'+(evOn('infection')?' · ☠ INFECTION MODE ACTIVE':''):EV=='winter'?'❄ WINTER EVENT · SLIPPERY MODE ACTIVE':EV=='summer'?'☀ SUMMER EVENT':'';
function scrMain(){DUELM=false;if(banLeft()>0)return scrBan();ov.style.display='flex';loadSession();
 ov.innerHTML=`<h1 class="mt">NEON PAINTBALL 3D</h1><div class="badge">${ACC?'👤 '+ACC.nick:'👤 Guest · '+guestName()}</div><div class="small" id="hubs"></div>${evLine()?`<div class="ev">${evLine()}</div>`:''}
 <div class="mrow"><button id="bm">🎮 Multiplayer</button><button id="bk" class="alt">👕 Skins</button></div>
 <div class="mrow"><button id="bs">🤖 Singleplayer</button><button id="bt" class="alt">📊 Stats</button></div>
 <div class="mrow"><button id="bd" class="alt">⚔ Duels</button><button id="ba" class="dim">⚙ Account settings</button><button id="bu" class="dim">📰 Updates · v${UPDATES[0].v}</button><button id="bi" class="dim">💡 Ideas</button></div>
 <div class="red">To choose a different mode you must leave the game and join again (the "Leave" button in the lobby, the red ✕ button, or refresh the page).</div>`;
 $('bs').onclick=()=>{if(banLeft()>0)return scrBan();nick();ac();MODE='single';R=null;myId='solo';isHost=true;ov.style.display='none';hostStart()};$('bm').onclick=()=>{if(banLeft()>0)return scrBan();nick();ac();MODE='multi';scrSearch()};
 $('bk').onclick=scrSkins;$('bt').onclick=scrStats;$('ba').onclick=scrAcct;$('bd').onclick=scrDuel;$('bu').onclick=scrUpdates;$('bi').onclick=scrIdeas;hubShow()}
function scrBan(){ov.style.display='flex';let iv=0;const draw=()=>{const l=banLeft();if(l<=0){clearInterval(iv);scrMain();return}const t=Math.ceil(l/1000),d=Math.floor(t/86400),h=Math.floor(t%86400/3600),m=Math.floor(t%3600/60),sc=t%60,e=$('bt2');if(e)e.textContent=(d?d+'d ':'')+(h?h+'h ':'')+m+'m '+sc+'s'};
 ov.innerHTML=`<h1 class="mt">YOU ARE BANNED</h1><p>Suspicious activity was detected on your account.</p><div class="code" id="bt2" style="font-size:38px;letter-spacing:2px">…</div><p class="small"></p>`;iv=setInterval(draw,1000);draw()}
function scrDuel(){if(banLeft()>0)return scrBan();ov.innerHTML=`<h1 class="mt">DUELS</h1><div class="mrow"><button id="d1">1 v 1</button><button id="d2">2 v 2</button><button id="d4">4 v 4</button></div><div class="mrow"><button id="bb" class="dim">Back</button></div>`;[1,2,4].forEach(n=>$('d'+n).onclick=()=>scrDuelMode(n));$('bb').onclick=scrMain}
function scrDuelMode(n){ov.innerHTML=`<h1 class="mt">${n} v ${n} DUEL</h1><div class="mrow"><button id="dc">Create duel server</button><button id="dj" class="alt">Join duel server</button></div><div class="mrow"><button id="bb" class="dim">Back</button></div>`;$('bb').onclick=scrDuel;$('dc').onclick=()=>duelCreate(n);$('dj').onclick=()=>duelJoin(n)}
async function duelCreate(n){nick();ac();MODE='multi';DUELM=true;DUEL={n,ai:true};codeStr=String(10000+Math.random()*89999|0);phase='search';PRIV=true;
 ov.innerHTML=`<h1 class="mt">${n} v ${n} DUEL SERVER</h1><div class="code">${codeStr}</div><p>Tell this number to the other players</p><div class="mrow"><button id="ai" class="alt">AI bots in game: ON</button></div><div class="mrow"><button id="ps">Start</button><button id="bkd" class="dim">Back</button></div><p class="red" id="dm"></p><div id="nl"></div>`;
 $('bkd').onclick=backToMenu;$('ai').onclick=()=>{DUEL.ai=!DUEL.ai;$('ai').textContent='AI bots in game: '+(DUEL.ai?'ON':'OFF')};
 $('ps').onclick=()=>{if(!isHost)return;if(!DUEL.ai&&peersV().length<2){$('dm').textContent='Need at least 2 players, or turn AI bots on';return}hostPick()};if(!await netJoin('d'+codeStr,true))fail()}
function duelJoin(n){ov.innerHTML=`<h1 class="mt">Join ${n} v ${n} duel</h1><input id="ci" maxlength="5" inputmode="numeric" placeholder="5 digits"><button id="pf">Find</button><p id="pm"></p><button id="bb" class="dim">Back</button>`;$('bb').onclick=()=>scrDuelMode(n);
 $('pf').onclick=async()=>{const c=($('ci').value||'').replace(/\D/g,'');if(c.length!=5){$('pm').textContent='Enter a 5-digit number';return}$('pm').textContent='Searching…';nick();ac();MODE='multi';DUELM=true;DUEL={n,ai:true};
  if(!await netJoin('d'+c,false))return fail();phase='search';PRIV=true;let k=0;const iv=setInterval(()=>{const ps=peersV();if(ps.some(p=>p.presence.hs==1)){clearInterval(iv);ov.innerHTML=`<h1 class="mt">Duel found</h1><div class="code">${c}</div><p>Waiting for the host to press "Start"</p><div id="nl"></div>`}
   else if(++k>10){clearInterval(iv);try{R.leave()}catch(e){}R=null;phase='menu';DUELM=false;$('pm').textContent='No duel server with this number was found'}},300)}}
// UPDATES: add a new entry at the TOP of this list for every release
const UPDATES=[
{v:'2.0',date:'2026-11-07',items:['Med kits fall from the sky together with the ammo crates','Teammates now have a see-through outline, and their name and health are always visible','Enemy names are shown only when you can really see them','Outer walls now have holes that lead into long corridors running around the whole arena (same height as the walls)','Capture the Flag: more cover blocks near both spawns','Server status in the menu (shows how many players are online)','Text chat (press T) and a microphone button for voice chat','Legend skins now have auras, trails and colour effects, rare skins have a softer aura','Fixed: spaces in the idea board, camera stuck on an orbit after joining a match, nicer scroll bars']},
{v:'1.9',date:'2026-11-06',items:['Holes in the outer walls with short tunnels on every map (instead of inner corridors)','Capture the Flag: many more cover blocks, 10 tunnels, easier flag capture','Weaker, fairer bots that cannot see you behind their back','Ammo crates fall from the sky (2 every 25 seconds)','New music and sounds, button click sounds','Better animations: shooting, reloading, paint knife, grenade throw and explosion, win and defeat','Holding the right mouse button and shooting now works together','Back buttons in the multiplayer menus and clearer connection errors','Idea board where players can post ideas (to fix / to add / to change)','Your account, stats and skins come back automatically after game updates','New game icon','Fixed: wrong weapon model after respawn, mouse stuck in the lobby']},
{v:'1.8',date:'2026-11-04',items:['Rocket launcher now appears for only 10% of players/AI each life (key 5)','Capture the Flag map got 24 more blocks','Fixed the half-screen game view on phones','Accounts are now stored in a private area other players cannot read, passwords use PBKDF2 (6+ characters)','Music now plays in all menus from your first tap','Paint overlap fix: new paint also replaces other players\' old paint','New "Updates" button with this changelog']},
{v:'1.7',date:'2026-11-03',items:['Duels: 1v1, 2v2, 4v4 with create/join server and an "AI bots in game" switch','10 new legend skins (25 skins total)','DJ-style generated music','New paint replaces old paint underneath it, old paint fades after 35 s','More realistic pumpkins, weapon slot bar on PC']},
{v:'1.6',date:'2026-11-02',items:['Paint knife, grenade and rocket launcher, weapon slots 1–5, ammo and reload','Assists and a new leaderboard column','Corridors along the outer walls','Deathmatch (100×100) and Capture the Flag (110×75) with new maps','Events: Summer, Halloween (with Infection mode), Winter (with Slippery mode)','Accounts, skins with tasks, stats and a new gaming-style menu']},
{v:'1.5',date:'2026-10-30',items:['Team choosing before a match (balanced teams)','Phone buttons for aiming and crouching','Soft shadows, glowing details, moon and planets']},
{v:'1.4',date:'2026-10-28',items:['Game modes: 4 Teams, 2 Teams, Juggernaut','4 maps, voting for mode and map in the lobby','Winner announcements, countdowns, new animations','English translation, full-screen help']},
{v:'1.3',date:'2026-10-26',items:['Online multiplayer with private matches','Jump, crouch, scope, Tab leaderboard, exit button','Visible arms, legs and nameplates']},
{v:'1.0',date:'2026-10-24',items:['First neon paintball: 4 teams, bots, first-person view']}];
async function scrIdeas(){ov.innerHTML=`<h1 class="mt">IDEA BOARD</h1><p class="small">Write an idea for the game and choose at least one tag: <b>to fix</b>, <b>to add</b> or <b>to change</b> (or all together). Everyone can read all ideas.</p>
 <div class="mrow tags"><label><input type="checkbox" id="c1"> to fix</label><label><input type="checkbox" id="c2"> to add</label><label><input type="checkbox" id="c3"> to change</label></div>
 <textarea id="it" maxlength="240" placeholder="Your idea…"></textarea><div class="red" id="im"></div><div class="mrow"><button id="isb">Post idea</button><button id="bb" class="dim">Back</button></div><div class="upd" id="il">Loading…</div>`;
 $('bb').onclick=scrMain;let lastPost=0;
 const load=async()=>{const il=$('il'),d=await getDb();if(!il)return;if(!d){il.textContent='The idea board needs the Claude connection (open the game inside Claude).';return}
  try{const q=await d.collection('ideas').orderBy('ts','desc').limit(60).get();il.textContent='';if(!q.docs.length){il.textContent='No ideas yet. Be the first!';return}
   q.docs.forEach(x=>{const r=x.data(),div=document.createElement('div');div.className='ue';const b=document.createElement('b');b.textContent=String(r.nick||'?').slice(0,12);const sm=document.createElement('small');sm.textContent=' '+new Date(r.ts||0).toLocaleDateString()+'  '+(Array.isArray(r.tags)?r.tags.slice(0,3).join(' · '):'');const p=document.createElement('div');p.textContent=String(r.text||'').slice(0,240);div.append(b,sm,p);il.appendChild(div)})}catch(e){il.textContent='Could not load the ideas.'}};
 $('isb').onclick=async()=>{const t=($('it').value||'').trim(),tags=[['c1','to fix'],['c2','to add'],['c3','to change']].filter(a=>$(a[0]).checked).map(a=>a[1]);
  if(t.length<5){$('im').textContent='Write at least 5 characters';return}if(!tags.length){$('im').textContent='Choose at least one tag: to fix / to add / to change';return}
  if(Date.now()-lastPost<30000){$('im').textContent='Please wait a little before posting again';return}
  const d=await getDb();if(!d){$('im').textContent='You need the Claude connection to post';return}
  try{await d.collection('ideas').add({nick:ACC?ACC.nick:guestName(),text:t,tags,ts:Date.now()});lastPost=Date.now();$('it').value='';$('im').textContent='';load()}catch(e){$('im').textContent='Posting needs Contributor access to the game'}};
 load()}
function scrUpdates(){ov.innerHTML=`<h1 class="mt">UPDATES</h1><div class="upd">${UPDATES.map(u=>`<div class="ue"><b>v${u.v}</b> <small>${u.date}</small><ul>${u.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('')}</div><button id="bb" class="dim">Back</button>`;$('bb').onclick=scrMain}
function scrStats(){const r=ST.d?(ST.k/ST.d).toFixed(2):ST.k.toFixed(2);ov.innerHTML=`<h1 class="mt">STATS</h1><div class="badge">${ACC?'👤 '+ACC.nick:'Guest (saved on this device)'}</div>
 <div class="grid st">${[['Kills',ST.k],['Deaths',ST.d],['Assists',ST.a],['HP dealt',ST.dmg],['K/D',r],['Matches',ST.m],['Wins',ST.w],['Headshots',ST.hs]].map(a=>`<div class="sk"><b>${a[1]}</b><small>${a[0]}</small></div>`).join('')}</div><button id="bb" class="dim">Back</button>`;$('bb').onclick=scrMain}
function scrSkins(){ov.innerHTML=`<h1 class="mt">SKINS</h1><p>5 standard skins are unlocked. Complete the tasks to unlock 10 rare and 10 legend skins.</p><div class="grid">`+SKINS.map((k,i)=>{const un=skinOpen(i),pg=k.rare?Math.min(1,(ST[k.key]||0)/k.goal):1,hx='#'+k.c.toString(16).padStart(6,'0'),em=k.em?'#'+k.em.toString(16).padStart(6,'0'):'#00e5ff';
  return `<div class="sk${i==SKIN?' sel':''}${un?'':' lock'}${k.leg?' leg':''}" data-i="${i}"><div class="sw" style="background:${hx};box-shadow:0 0 ${k.leg?28:k.rare?14:6}px ${k.rare?em:'#000'};opacity:${k.op||1}"></div><b>${k.n}</b><small>${un?(k.leg?'Legend · unlocked ✓':k.rare?'Rare · unlocked ✓':'Standard'):'🔒 '+k.task}</small>${k.rare&&!un?`<div class="pb"><i style="width:${pg*100}%"></i></div><small>${Math.min(ST[k.key]||0,k.goal)} / ${k.goal}</small>`:''}</div>`}).join('')+`</div><button id="bb" class="dim">Back</button>`;
 $('bb').onclick=scrMain;ov.querySelectorAll('.sk').forEach(el=>el.onclick=()=>{const i=+el.dataset.i;if(!skinOpen(i)){tone(200,.1,'square',.05);return}SKIN=i;applySkin(ME,i);saveAcc();scrSkins();tone(700,.08,'square',.05)})}
function scrAcct(){ov.innerHTML=`<h1 class="mt">ACCOUNT SETTINGS</h1><div class="badge">${ACC?'Signed in as '+ACC.nick+(ACC.cloud?' · cloud':' · this device'):'Not signed in (guest)'}</div>
 <div class="mrow">${ACC?'':'<button id="su">Sign Up</button><button id="si2" class="alt">Sign In</button>'}${ACC?'<button id="lo" class="danger">Log Out</button>':''}</div><div class="mrow"><button id="bb" class="dim">Back</button></div>
 <p class="small">Passwords are never stored as plain text: they are salted and run through PBKDF2 (200,000 rounds), and cloud account data sits in a private area that other players cannot read. Do not reuse a real password anyway. You are logged out automatically after 7 days of not playing.</p>`;
 $('bb').onclick=scrMain;if($('su'))$('su').onclick=()=>scrForm(true);if($('si2'))$('si2').onclick=()=>scrForm(false);if($('lo'))$('lo').onclick=()=>{logOut();scrAcct()}}
function scrForm(up){ov.innerHTML=`<h1 class="mt">${up?'SIGN UP':'SIGN IN'}</h1><input id="an" maxlength="12" placeholder="${up?'New nickname':'Nickname'}" autocomplete="off"><input id="pw" type="password" maxlength="32" placeholder="${up?'New password':'Password'}">${up?'<input id="pw2" type="password" maxlength="32" placeholder="Confirm password">':''}
 <div class="red" id="am"></div><div class="mrow"><button id="go2">${up?'Create account':'Sign In'}</button><button id="bb" class="dim">Back</button></div>`;$('bb').onclick=scrAcct;
 $('go2').onclick=async()=>{$('am').textContent='Please wait…';const m=up?await signUp($('an').value,$('pw').value,$('pw2').value):await signIn($('an').value,$('pw').value);if(m)$('am').textContent=m;else scrMain()}}
async function scrSearch(){phase='search';PRIV=false;srchCd=12;ov.innerHTML=`<div class="sp"></div><h1>Searching for a match…</h1><p id="si">Connecting…</p><div id="nl"></div><button id="corner" class="dim">Private match</button><button id="bk2" class="dim">Back</button>`;$('corner').onclick=scrPriv;$('bk2').onclick=backToMenu;
 const ok=await netJoin('pub',false);if(!ok)return fail()}
const chatEl=document.getElementById('chat'),ci2=document.getElementById('ci2');
function chatAdd(nm,tx,col){const d=document.createElement('div'),b=document.createElement('b'),s=document.createElement('span');b.style.color=col||'#00e5ff';b.textContent=nm?nm+': ':'';s.textContent=tx;d.append(b,s);chatEl.appendChild(d);while(chatEl.children.length>7)chatEl.removeChild(chatEl.firstChild);setTimeout(()=>{d.style.opacity=0;setTimeout(()=>d.remove(),1000)},12000)}
function chatHotkey(e){if(e.code=='KeyT'&&!chatOpen&&(phase=='match'||phase=='lobby')){e.preventDefault();openChat();return true}return false}
function openChat(){chatOpen=true;try{document.exitPointerLock&&document.exitPointerLock()}catch(e){}ci2.style.display='block';ci2.value='';setTimeout(()=>ci2.focus(),10);for(const k in keys)keys[k]=0;mouse.down=false}
function closeChat(){chatOpen=false;ci2.style.display='none';ci2.blur()}
ci2.addEventListener('keydown',e=>{e.stopPropagation();if(e.key=='Enter'){const t=ci2.value.trim();closeChat();if(t)sendChat(t)}else if(e.key=='Escape')closeChat()});
function sendChat(t){t=t.slice(0,120);if(t[0]=='/'){if(!runCmd(t))chatAdd('','Unknown command','#ff6b6b');return}const col=hex(T[ME.team]?T[ME.team].c:0xffffff);chatAdd(NICK,t,col);net('chat',{n:NICK,t,c:col})}
const WNAME={pistol:0,smg:1,shotgun:2,sniper:3,minigun:4,knife:5,paintknife:5,grenade:6,rocket:7,rocketlauncher:7};
const isAdmin=()=>!!(ACC&&ACC.key==='plmi14'&&ACC.adm);
function adminWeapon(id){if(!ME.invs)return;const mk2=w=>({w,m:WP[w].mag,r:WP[w].res});let i=ME.invs.findIndex(q=>q.w==id);if(i<0){const slot=id>=1&&id<=4?0:id==0?1:id==5?2:id==6?3:4;if(slot<ME.invs.length)ME.invs[slot]=mk2(id);else ME.invs.push(mk2(id));i=ME.invs.findIndex(q=>q.w==id)}ME.slot=-1;switchSlot(ME,i);if(id>=1&&id<=4)ME.pw=id;chatAdd('','Weapon: '+WP[id].n,'#9dff00')}
function adminKill(w){const k1=v=>{if(v.alive&&owned(v)){v.inv=0;hurtLocal(v,ME,99999,false,v.x,v.y+1,v.z,'',7)}};
 if(w=='me')k1(ME);else{G.forEach(v=>{if(v!==ME&&(w=='e'||v.name.toLowerCase()==w))k1(v)});net('cmd',{k:'kill',t:w,by:ME.gid})}chatAdd('','Kill: '+w,'#9dff00')}
function runCmd(t){if(!isAdmin())return false;const a=t.slice(1).trim().split(/\s+/),c=(a[0]||'').toLowerCase(),arg=a.slice(1).join(' ');
 if(c=='fly'){ME.fly=true;chatAdd('','Fly ON (Space up, Ctrl/C down)','#9dff00');return true}
 if(c=='unfly'){ME.fly=false;chatAdd('','Fly OFF','#9dff00');return true}
 if(c=='hp'){const n=parseInt(arg);if(!(n>0))return false;ME.mhp=Math.min(n,1e6);ME.hp=ME.mhp;chatAdd('','HP set to '+ME.mhp,'#9dff00');return true}
 if(c=='kill'&&arg){adminKill(arg.toLowerCase());return true}
 if(c=='weapon'){const id=WNAME[arg.toLowerCase().replace(/\s+/g,'')];if(id===undefined)return false;adminWeapon(id);return true}return false}
const ICE_SRV={iceServers:[{urls:'stun:stun.l.google.com:19302'}]};
function speakDetect(stream,key){try{const src=AC.createMediaStreamSource(stream),an=AC.createAnalyser();an.fftSize=512;src.connect(an);SPK[key]={an,buf:new Uint8Array(512)}}catch(e){}}
function micTick(){if(micOn)micConnectAll();let any=false;for(const k in SPK){const o=SPK[k];o.an.getByteTimeDomainData(o.buf);let s=0;for(let i=0;i<o.buf.length;i++){const v=(o.buf[i]-128)/128;s+=v*v}if(Math.sqrt(s/o.buf.length)>.03)any=true}
 document.getElementById('mic').classList.toggle('sp',any);if(MBUS&&AC)MBUS.gain.setTargetAtTime(any?.25:.9,AC.currentTime,.08)}
function newPC(peer,send){const pc=new RTCPeerConnection(ICE_SRV);pc.onicecandidate=ev=>{if(ev.candidate)net('rtc',{to:peer,from:myId,k:'ice',d:ev.candidate})};
 pc.ontrack=ev=>{const a=new Audio();a.srcObject=ev.streams[0];a.play().catch(()=>{});speakDetect(ev.streams[0],peer)};
 if(send&&MIC)MIC.getTracks().forEach(t=>pc.addTrack(t,MIC));else pc.addTransceiver('audio',{direction:'recvonly'});return pc}
async function micConnect(peer){if(PCS[peer])return;const pc=newPC(peer,true);PCS[peer]={pc};try{const of=await pc.createOffer();await pc.setLocalDescription(of);net('rtc',{to:peer,from:myId,k:'offer',d:pc.localDescription})}catch(e){}}
function micConnectAll(){peersV().forEach(p=>{if(!(p.isMe&&p.sameTab))micConnect(p.peer)})}
async function onRtc(m){const d=m.data;if(!d||d.to!==myId||(m.isMe&&m.sameTab))return;const from=d.from,e=PCS[from];try{
 if(d.k=='offer'){if(e)try{e.pc.close()}catch(x){}ac();const pc=newPC(from,false);PCS[from]={pc};await pc.setRemoteDescription(d.d);const an=await pc.createAnswer();await pc.setLocalDescription(an);net('rtc',{to:from,from:myId,k:'answer',d:pc.localDescription})}
 else if(d.k=='answer'&&e)await e.pc.setRemoteDescription(d.d);else if(d.k=='ice'&&e&&d.d)await e.pc.addIceCandidate(d.d)}catch(x){}}
function micStop(){micOn=false;document.getElementById('mic').classList.remove('on');pres({mic:0});if(MIC){MIC.getTracks().forEach(t=>t.stop());MIC=null}delete SPK.me;clearInterval(micIv)}
async function micToggle(){if(micOn){micStop();return}if(!R){chatAdd('','Voice chat works inside an online match','#ffd400');return}
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){chatAdd('','Microphone is not available in this window. Try "Open separately" from the help menu.','#ff6b6b');return}
 try{MIC=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}})}catch(e){chatAdd('','Microphone permission denied or blocked here','#ff6b6b');return}
 ac();micOn=true;document.getElementById('mic').classList.add('on');pres({mic:1});speakDetect(MIC,'me');micConnectAll();micIv=setInterval(micTick,150);chatAdd('','Microphone ON','#9dff00')}
document.getElementById('mic').onclick=micToggle;
function backToMenu(){try{R&&R.leave()}catch(e){}R=null;phase='menu';started=false;DUELM=false;PRIV=false;scrMain()}
function fail(){phase='menu';DUELM=false;PRIV=false;ov.innerHTML=`<h1 class="mt">NOT CONNECTED</h1><p>${NETERR||'Online mode is unavailable right now.'}</p><div class="mrow"><button id="rt">Retry</button><button id="bs2" class="alt">Singleplayer</button><button id="bb" class="dim">Back</button></div>`;
 $('bb').onclick=backToMenu;$('rt').onclick=()=>{MODE='multi';scrSearch()};$('bs2').onclick=()=>{MODE='single';R=null;myId='solo';isHost=true;ov.style.display='none';hostStart()}}
function scrPriv(){try{R&&R.leave()}catch(e){}R=null;phase='menu';ov.innerHTML=`<h1>Private match</h1><div class="row"><button id="pc">Create private match</button><button id="pj" class="alt">Join private match</button></div><button id="bk0" class="dim">Back</button>`;$('bk0').onclick=backToMenu;
 $('pc').onclick=async()=>{codeStr=String(10000+Math.random()*89999|0);phase='search';PRIV=true;ov.innerHTML=`<h1>Private match</h1><div class="code">${codeStr}</div><p>Tell this number to your friends</p><button id="ps">Start</button><button id="bkp" class="dim">Back</button><div id="nl"></div>`;
  $('bkp').onclick=backToMenu;$('ps').onclick=()=>{if(isHost)hostPick()};if(!await netJoin('p'+codeStr,true))fail()};
 $('pj').onclick=()=>{ov.innerHTML=`<h1>Join private match</h1><input id="ci" maxlength="5" inputmode="numeric" placeholder="5 digits"><button id="pf">Find</button><p id="pm"></p><button id="bkj" class="dim">Back</button>`;$('bkj').onclick=scrPriv;
  $('pf').onclick=async()=>{const c=($('ci').value||'').replace(/\D/g,'');if(c.length!=5){$('pm').textContent='Enter a 5-digit number';return}$('pm').textContent='Searching…';
   if(!await netJoin('p'+c,false))return fail();phase='search';PRIV=true;let n=0;const iv=setInterval(()=>{const ps=peersV();if(ps.some(p=>p.presence.hs==1)){clearInterval(iv);ov.innerHTML=`<h1>Match found</h1><div class="code">${c}</div><p>Waiting for the host to press "Start"</p><div id="nl"></div>`}
    else if(++n>10){clearInterval(iv);try{R.leave()}catch(e){}R=null;phase='menu';$('pm').textContent='No match with this number was found'}},300)}}}
function uiSearch(ps){const nl=$('nl');if(nl)nl.innerHTML=ps.map(p=>`<div>👤 ${nmOf(p)}${p.presence.hs==1?' (host)':''}${(p.isMe&&p.sameTab)?' · you':''}</div>`).join('');
 const si=$('si');if(si)si.textContent=`Players found: ${ps.length} · starting in ${Math.max(0,Math.ceil(srchCd))}s (empty spots will be filled by bots)`;
 const ps2=$('ps');if(ps2)ps2.style.display=isHost?'inline-block':'none'}
function ffaChips(){const r=[...G].sort((a,b)=>b.k-a.k),me=ME;return `<span class="chip" style="border-color:${hex(T[me.team].c)}">You: ${me.k}</span><span class="chip">👑 ${r[0].name}: ${r[0].k}</span>`}
function scoreLine(){const idx=T.map((t,i)=>i);if(T.length>4)idx.sort((a,b)=>(TS[b]||0)-(TS[a]||0));return idx.slice(0,T.length>4?3:99).map(i=>`<b style="color:${hex(T[i].c)}">${T[i].n} ${TS[i]||0}</b>`).join(' · ')}
function hud(){const match=phase=='match',p=ME,ts2=TS;const s=Math.max(0,Math.ceil(tm)),tf=`${s/60|0}:${String(s%60).padStart(2,'0')}`;
 $('hud').innerHTML=`<span class="chip${match&&tm<=10?' hot':''}" style="font-size:15px">${match?'⏱ '+tf:'LOBBY · next match in '+s+'s'}</span>`+(match?(T.length>4?ffaChips():'')+T.slice(0,T.length>4?0:99).map((t,i)=>`<span class="chip" style="border-color:${hex(t.c)};color:${hex(t.c)}${i==p.team?';box-shadow:0 0 12px '+hex(t.c)+';background:rgba(255,255,255,.14)':''}">${t.n}${i==p.team?' ★':''}: ${ts2[i]}</span>`).join(''):'')+(R?`<span class="chip">🌐 ${peersV().length}</span>`:'');
 $('msg').textContent=match&&!p.alive?`Respawning in ${Math.ceil(Math.max(0,p.rt))}s`:'';
 const c=hex(T[p.team].c);$('wp').innerHTML=`<div style="width:${Math.ceil(p.hp/p.mhp*100)}%;height:100%;background:${c};box-shadow:0 0 8px ${c}"></div>`;
 {const I=p.invs&&p.invs[p.slot],W=WP[p.w],am=I?(W.inf?'∞':I.m+' / '+I.r):'';$('hud').innerHTML+=`<span class="chip" style="border-color:${c}">${match?'['+(p.slot+1)+'] '+W.n+' '+am+(p.rl>0?' ⟳':'')+' · ':''}❤ ${Math.ceil(p.hp)} · 🎯 ${p.k} · 🤝 ${p.ast} · 💀 ${p.d}</span>`}
 $('kf').innerHTML=feed.map(f=>f.s).join('<br>');if(MD==4&&FLG.length&&match){const en=FLG[1-p.team];$('hud').innerHTML+=`<span class="chip">⚑ Enemy flag: ${en.car>=0?(G[en.car]===p?'YOU HAVE IT!':G[en.car].name+' has it'):en.home?'at base':'dropped'}</span>`}voteUI();cdUI();tabUI()}
function voteUI(){const el=$('vt'),st=phase!='lobby'||tm>20?0:tm>10?1:2;if(!st||(DUELM&&st==1)){el.style.display='none';return}
 const k=st==1?'vm':'vp',left=Math.ceil(st==1?tm-10:tm),mine=st==1?myVm:myVp,ids=st==1?avail():REG,all=st==1?MODES:MAPS;let h=`<h2>VOTE: ${st==1?'GAME MODE':'MAP'} · ${left}s</h2>`;
 const lead=DUELM?7:tally('vm',MODES.length);
 if(st==2&&MODES[lead].fm!==undefined)h+=`<p>${MODES[lead].n} is played on its own map: <b>${MAPS[MODES[lead].fm].n}</b></p>`;
 else{const c={};ids.forEach(i=>c[i]=0);if(MODE=='single'){if(mine>=0&&c[mine]!==undefined)c[mine]++}else peersV().forEach(p=>{const v=p.presence[k];if(c[v]!==undefined)c[v]++});
  h+=`<div class="row">`+ids.map(i=>{const it=all[i];return `<button class="vb${mine==i?' sel':''}" data-k="${k}" data-i="${i}"><b>${it.n}</b><small>${it.d||('Arena '+it.A*2+' × '+it.A*2)}</small><span>${c[i]} vote${c[i]==1?'':'s'}</span></button>`}).join('')+`</div>`}
 const el0=(st==1?20:10)-tm,pk=aiPick[k],ai=pk===undefined?'…':(el0<2.5?all[ids[(performance.now()/90|0)%ids.length]].n:all[pk].n);
 el.innerHTML=h+`<p>🤖 AI vote: <b>${ai}</b></p>`;el.style.display='flex'}
function tabUI(){const el=$('tb');if(!tabOn||!G.length||(phase!='match'&&phase!='lobby')){el.style.display='none';return}
 const rows=[...G].sort((a,b)=>b.k-a.k||b.dmg-a.dmg);
 el.innerHTML=`<h2 style="text-align:center">${MODES[MD].n} · ${MAPS[MP].n}</h2><p style="text-align:center">${scoreLine()}</p><table><tr><th>Player</th><th>Weapon</th><th>K</th><th>A</th><th>D</th><th>Damage</th><th>HP</th></tr>${rows.map(e=>`<tr class="${e.p?'me':''}"><td style="color:${hex(T[e.team].c)}">${e.name}${e.jug?' 👑':''}</td><td>${WP[e.pw===undefined?e.w:e.pw].n}</td><td>${e.k}</td><td>${e.ast}</td><td>${e.d}</td><td>${e.dmg}</td><td>${e.alive?Math.ceil(e.hp):'💀'}</td></tr>`).join('')}</table>`;el.style.display='block'}
$('vt').addEventListener('pointerdown',e=>{const b=e.target.closest('button');if(!b)return;const k=b.dataset.k,i=+b.dataset.i;if(k=='vm')myVm=i;else myVp=i;pres({[k]:i});voteUI();tone(520+i*90,.09,'square',.06);e.stopPropagation()});
function cdUI(){const el=$('cd'),n=Math.ceil(tm),show=(phase=='lobby'&&tm<=5&&tm>0)||(phase=='match'&&tm<=10&&tm>0);
 if(!show){el.style.opacity=0;lastCd=-1;return}
 if(n!==lastCd){lastCd=n;el.textContent=n;el.style.color=phase=='match'?'#ff4d4d':'#00e5ff';el.style.animation='none';void el.offsetWidth;el.style.animation='cdp 1s forwards';tone(phase=='match'?500:700+(5-n)*80,.1,'square',.06)}}
const rc=$('rd').getContext('2d');
function radar(p){rc.clearRect(0,0,224,224);rc.save();rc.beginPath();rc.arc(112,112,110,0,6.283);rc.clip();const sn=Math.sin(p.a),cs=Math.cos(p.a),Sc=3.5,tr=(x,z)=>{const dx=x-p.x,dz=z-p.z;return[112+(-dx*cs+dz*sn)*Sc,112-(dx*sn+dz*cs)*Sc]};
 rc.fillStyle='rgba(255,255,255,.22)';OB.forEach(o=>{rc.beginPath();[[o.x0,o.z0],[o.x1,o.z0],[o.x1,o.z1],[o.x0,o.z1]].forEach(([x,z],i)=>{const q=tr(x,z);i?rc.lineTo(q[0],q[1]):rc.moveTo(q[0],q[1])});rc.fill()});
 G.forEach(e=>{if(!e.alive||e.p)return;const q=tr(e.x,e.z);rc.fillStyle=hex(T[e.team].c);rc.beginPath();rc.arc(q[0],q[1],e.team==p.team?6:7,0,6.283);rc.fill()});
 CR.forEach(c=>{const q=tr(c.x,c.z);rc.fillStyle=c.tp==1?'#32ff6a':'#ffd400';rc.fillRect(q[0]-4,q[1]-4,8,8)});rc.restore();rc.fillStyle='#fff';rc.beginPath();rc.moveTo(112,98);rc.lineTo(120,118);rc.lineTo(104,118);rc.fill()}
let last=performance.now(),rf=0;
function loop(now){requestAnimationFrame(loop);const raw=Math.min((now-last)/1000,.05);last=now;
 if(tsT>0)tsT-=raw;else ts+=(1-ts)*Math.min(1,raw*6);const dt=raw*ts;sndN=0;if(phase=='pick')tm-=raw;netStep(raw);step(dt,raw);
 hudT+=raw;if(hudT>.2&&(phase=='match'||phase=='lobby')&&G.includes(ME)){hudT=0;hud()}
 const p=ME,match=phase=='match',inGame=(match||phase=='lobby')&&G.includes(ME);if(![p.x,p.z,p.a,p.pitch,p.y].every(Number.isFinite)){p.a=0;p.pitch=0;p.y=0;p.vy=0;if(G.includes(p)&&match)spawn(p);else{p.x=0;p.z=0}}if(!isFinite(adsK))adsK=0;if(!isFinite(shake))shake=0;shake=Math.max(0,shake-raw*2.5);vig=Math.max(0,vig-raw*1.1);hmT=Math.max(0,hmT-raw);kick=Math.max(0,kick-raw*9);landT=Math.max(0,landT-raw*5);
 $('vig').style.opacity=vig;adsK+=(((mouse2&&match&&p.alive)?1:0)-adsK)*Math.min(1,raw*12);{const bf=innerWidth<innerHeight?100:78,tf=bf*(1-adsK*(1-[.8,.7,.85,.25,.8,1,1,.8][p.w]));if(Math.abs(cam.fov-tf)>.05){cam.fov=tf;cam.updateProjectionMatrix()}{const rlE=$('rl');const rv=p.rl>0;rlE.style.display=rv?'block':'none';if(rv)rlE.firstChild.style.width=(1-p.rl/WP[p.w].rt)*100+'%';document.querySelectorAll('#wbar div').forEach((d,i)=>{d.classList.toggle('on',i==p.slot);if(i==4)d.style.display=(p.invs&&p.invs.length<5)?'none':''})}{const sl=$('slots'),show=match&&!MOB&&p.invs&&p.alive;sl.style.display=show?'flex':'none';if(show){const NMS=['PIS','SMG','SHG','SNP','MNG','KNF','GRN','RKT'],h=p.invs.map((q,i)=>{const W=WP[q.w];return `<div class="sl${i==p.slot?' on':''}">${i+1} ${NMS[q.w]}<br>${W.inf?'∞':q.m+'/'+q.r}</div>`}).join('');if(sl.dataset.k!==h){sl.dataset.k=h;sl.innerHTML=h}}}
 $('ab').classList.toggle('on',mouse2);$('cb2').classList.toggle('on',crT);const sce=$('sc');sce.className='s'+p.w;sce.style.opacity=p.w>=4?0:(p.w==3?Math.max(0,(adsK-.55)*2.2):adsK)}$('hm').style.opacity=Math.min(1,hmT*6);{const k=((now/1000)%8)/8;wave.scale.setScalar(2+k*A*1.4);wave.material.opacity=.45*(1-k);wave.visible=phase!='lobby'}{const tt=now/1000;ANI.forEach(f=>f(tt,raw))}
 FLG.forEach(f=>{const car=f.car>=0?G[f.car]:null;f.m.position.set(car?car.x:f.x,car?car.y+.4:0,car?car.z:f.z);f.ban.rotation.y=Math.sin(now/250)*.4});
 holo.rotation.y+=raw;holo.rotation.x+=raw*.5;holoC.rotation.z+=raw*.6;holoC2.rotation.y+=raw*.8;
 for(let i=0;i<FFN;i++){ffP[i*3+1]+=Math.sin(now/900+i)*.004;ffP[i*3]+=Math.cos(now/1300+i*2)*.004}ffG.attributes.position.needsUpdate=true;
 if(!inGame){cam.position.set(Math.sin(now/5000)*40,14,Math.cos(now/5000)*40);cam.lookAt(0,2,0);vm.visible=false;$('cross').style.display='none';$('rd').style.display='none';$('lb').style.display=phase=='lobby'?'flex':'none'}
 else if(p.alive){const bob=Math.sin(p.wk*2)*.04*p.mv*(p.y>.05?0:1);cam.position.set(p.x+rnd(-1,1)*shake*.06,EYE*(p.jug?1.3:1)+p.y+bob-landT*.12-p.cr*.55+rnd(-1,1)*shake*.05,p.z+rnd(-1,1)*shake*.06);
  cam.rotation.set(p.pitch+rnd(-1,1)*shake*.012+kick*.015,p.a+Math.PI,Math.sin(p.wk)*.006*p.mv);
  vm.visible=match&&!(p.w==3&&adsK>.8);sway*=.85;vm.position.x=(innerWidth<innerHeight?.17:.3)*(1-adsK*.85);vm.position.y=-.3+adsK*.07+Math.sin(p.wk*2)*.008*p.mv-(p.y>.05?.02:0)+landT*.03;{const rl=p.rl>0?(1-p.rl/WP[p.w].rt):0,rs=Math.sin(rl*Math.PI),sb=stabT>0?Math.sin((1-stabT/.3)*Math.PI):0,th=thrT>0?Math.sin((1-thrT/.4)*Math.PI):0,w5=p.w==5;stabT=Math.max(0,stabT-raw);thrT=Math.max(0,thrT-raw);
  vm.position.z=-.6+kick*.12-sb*.45-th*.35+(p.w==2?Math.sin(rl*20)*.02:0);vm.position.x+=(w5?-.1:0)-sb*.12;vm.position.y+=-rs*.28+(w5?.08:0)+th*.15;
  vm.rotation.x=kick*.2+(p.y>.05?.05:0)+rs*.75+(w5?.35:0)-sb*.5-th*.9;vm.rotation.y=-sway*.3+sb*.45;vm.rotation.z=sway*.2+rs*.5*(p.w==2?0:1)+(w5?-.5:0)+kick*(Math.random()-.5)*.04;
  vm.scale.setScalar(p.w==6&&p.invs&&p.invs[p.slot]&&p.invs[p.slot].m<=0&&p.rl<=0?.01:1)}
  const fl2=p.mzT>0;vmz.material.opacity=fl2?1:0;vmz2.material.opacity=fl2?1:0;vmz.scale.setScalar(rnd(.6,1.1));mzl.intensity=fl2?3:0;
  $('cross').style.display=match&&adsK<.2?'block':'none';$('rd').style.display=match?'block':'none';$('lb').style.display=phase=='lobby'?'flex':'none'}
 else{kt+=raw;vm.visible=false;cam.position.set(p.x+Math.sin(kt*.8)*4.5,3+p.y,p.z+Math.cos(kt*.8)*4.5);cam.lookAt(p.x,1,p.z);cam.rotateZ(Math.min(kt,1.5)*.2);$('cross').style.display='none'}
 $('cross').style.setProperty('--g',(6+p.mv*8+kick*12)+'px');
 if(match&&inGame&&(rf^=1))radar(p);
 renderer.render(scene,cam)}
addEventListener('pageshow',ev=>{if(ev.persisted&&!started)scrMain()});scrMain();requestAnimationFrame(loop);
