(()=>{var Wi=["#5FE3B0","#FFD23F","#FF8FD1","#8C6BFF","#5CC8FF","#7FD88A","#C9B6E8","#FFC38A","#4C6FFF","#2EC4B6","#FF5FA2","#C6E05A","#9BB6FF","#F0B429","#FF8A7A","#7AD0FF"],kf={raceSeconds:180,countdownBeats:3,goHold:.65,racers:16,seats:8,collapseDelay:6,collapseArrive:168,crackTime:1.05,crackJitter:.7,fallTime:1.2,skirtLead:22,fragileCrack:.62,accel:78,airAccel:46,maxSpeed:8.4,playerSpeed:1,friction:36,iceAccel:14,iceFriction:5,gravity:29,fallGravityMul:1.48,jumpVel:10.15,coyoteTime:.16,jumpBuffer:.15,ungroundTime:.1,maxFallSpeed:28,bodyRadius:.44,stepUp:.55,voidY:-16,bumpPush:7.4,bumpUp:3.6,bumpCooldown:.32,diveDashSpeed:12.4,diveDashTime:.28,diveFall:26,diveCooldown:.55,slideHeight:.55,poundRadius:2.15,poundPush:7.5,poundUp:4.6,padUp:12.4,padForward:6.5,padRadius:1.65,padCooldown:.4,bumperPush:11,bumperUp:5.2,bumperRadius:1.05,bumperCooldown:.36,spinnerLength:1.62,spinnerPush:9.5,spinnerUp:4.2,spinnerHit:.58,spinnerMinY:.55,spinnerMaxY:1.45,spinnerCooldown:.45,lavaRadius:1.35,lavaHop:6.5,lavaStartY:-3.4,lavaRisePerSec:.022,platformRadius:2.15,platformTop:.28,stunTime:.48,knockCooldown:.55,windPush:3.6,boardHalfX:4.2,boardZMin:-8.5,boardZMax:-.4,botSpeeds:[1.05,1.02,.99,.97,.95,.93,.9,.88,.85,.82,.78,.74,.7,.66,.62],camDist:8.4,camDistPortrait:7.6,defaultPitch:.62,minPitch:.28,maxPitch:1.12,lookSens:.0052,mouseSens:.0042,autoFollowDelay:.85,autoYaw:2.6,autoPitch:1.5,camLerp:7.5,fovPortrait:64,fovLandscape:50,shipScale:1.7,seatBuddyScale:.44,dprCap:1.25,fogNear:42,fogFar:125,bedGain:.15,rumbleMax:.32};function lh(i={}){let e={...kf,quick:!!i.quick,auto:!!i.auto,seed:i.seed||1};return i.quick&&(e.raceSeconds=46,e.collapseArrive=42,e.collapseDelay=2.5,e.playerSpeed=1.12,e.botSpeeds=e.botSpeeds.map(t=>t*.9),e.lavaRisePerSec=.08),e}var Rr={meadow:[.34,.78,.4],canyon:[.18,.12,.13],sky:[.62,.88,.74],ice:[.55,.9,1],climb:[.95,.62,.22],ship:[.95,.86,.62]};function Xi(i,e,t){return i+(e-i)*t}function Hf(i){return[{id:"meadow",name:"MEADOW",z0:0,z1:i*.16},{id:"canyon",name:"LAVA CANYON",z0:i*.16,z1:i*.38},{id:"sky",name:"SKY ISLANDS",z0:i*.38,z1:i*.58},{id:"ice",name:"ICE SLIDE",z0:i*.58,z1:i*.74},{id:"climb",name:"THE CLIMB",z0:i*.74,z1:i*.9},{id:"ship",name:"ESCAPE SHIP",z0:i*.9,z1:i}]}function hh(i,e){let t=i[0].id;for(let n of i)e>=n.z0&&(t=n.id);return t}function Vf(i,e,t,n,s,r){let o=Rr[r]||Rr.meadow,a=3,c=18,l=[],h=[],u=[],f=c+1;for(let p=0;p<=a;p++){let g=p/a,_=g>.78?(g-.78)*(g-.78)*10:0,m=g>.78?.72:1-g*.04;for(let d=0;d<=c;d++){let v=d/c*Math.PI*2,y=1+Math.sin(v*3+i*.2+t*.05)*.07;l.push(i+Math.cos(v)*n*g*y,e-_,t+Math.sin(v)*s*g*y),h.push(o[0]*m,o[1]*m,o[2]*m)}}for(let p=0;p<a;p++)for(let g=0;g<c;g++){let _=p*f+g,m=_+f;u.push(_,m,_+1,_+1,m,m+1)}return{positions:new Float32Array(l),colors:new Float32Array(h),indices:new Uint16Array(u)}}function Gf(i,e,t,n,s,r,o,a){let c=Rr[a]||Rr.meadow,l=10,h=[],u=[],f=[],p=t-i,g=n-e,_=Math.hypot(p,g)||1,m=-g/_,d=p/_;for(let v=0;v<=l;v++){let y=v/l,x=Xi(i,t,y),I=Xi(e,n,y),C=Math.sin(y*Math.PI)*.4;for(let R=-1;R<=1;R+=2){let P=(o*.5+C)*R;h.push(x+m*P,Xi(s,r,y),I+d*P),u.push(c[0],c[1],c[2])}}for(let v=0;v<l;v++){let y=v*2;f.push(y,y+2,y+1,y+1,y+2,y+3)}return{positions:new Float32Array(h),colors:new Float32Array(u),indices:new Uint16Array(f)}}function uh(i,e,t,n,s){let r={index:i.length,z0:t,z1:n,zone:e,gap:!s,state:"solid",crackT:0,fallT:0,fallY:0,dirty:!0,fragile:!1,ice:e==="ice",jitter:i.length%7/7,tilt:0};return s&&Object.assign(r,s),i.push(r),r.index}function Cr(i,e,t){let n=i.floors||[],s=null;for(let r=0;r<n.length;r++){let o=n[r],a=i.chunks[o.chunk];if(!a||a.state==="falling"||a.state==="gone")continue;let c=(e-o.x)/o.rx,l=(t-o.z)/o.rz,h=o.zone==="meadow"?1.08:1;c*c+l*l>h||(!s||o.y>=s.y)&&(s={y:o.y,x:o.x,z:t,ice:o.zone==="ice",conveyX:o.conveyX||0,zone:o.zone,chunk:a,state:a.state,fragile:!!a.fragile})}if(!s){let r=null,o=1e9;for(let a=0;a<n.length;a++){let c=n[a],l=i.chunks[c.chunk];if(!l||l.state==="falling"||l.state==="gone")continue;let h=e-c.x,u=t-c.z,f=Math.hypot(h,u),p=Math.max(c.rx,c.rz)+(c.zone==="meadow"?8:2.4);f<p&&f<o&&(o=f,r=c)}if(r){let a=i.chunks[r.chunk];s={y:r.y,x:r.x,z:t,ice:r.zone==="ice",conveyX:r.conveyX||0,zone:r.zone,chunk:a,state:a.state,fragile:!!a.fragile}}}if(!s&&i.islands)for(let r of i.islands){let o=e-r.x,a=t-r.z;o*o+a*a>r.r*r.r||(s={y:r.y,x:r.x,z:t,ice:!1,conveyX:0,zone:r.zone,chunk:null,state:"solid",fragile:!1})}return s}function fh(i){let t=!!i.quick?.42:1,n=de=>de*t,s=n(760),r=Hf(s),o=[],a=[],l=(i.seed||1)>>>0,h=()=>(l=Math.imul(1664525,l)+1013904223>>>0,l/4294967296),u=Math.floor(h()*3);function f(de,k,j,re,he,Pe,Le){let ke=uh(o,Pe,j-he,j+he,Vf(de,k,j,re,he,Pe)),Ke={x:de,y:k,z:j,rx:re,rz:he,zone:Pe,chunk:ke,conveyX:Le&&Le.conveyX};return a.push(Ke),Le&&Le.fragile&&(o[ke].fragile=!0),Ke}function p(de,k,j,re,he,Pe,Le,ke,Ke){let $e=Ke&&Ke.gap,L=uh(o,ke,Math.min(k,re),Math.max(k,re),Gf(de,k,j,re,he,Pe,Le,ke)),S=[],oe=Math.hypot(j-de,re-k),ue=Math.max(4,Math.ceil(oe/Math.max(2.2,Le*.5)));for(let fe=0;fe<=ue;fe++){let ye=fe/ue;if($e&&Math.abs(ye-$e)<.12)continue;let Je={x:Xi(de,j,ye),z:Xi(k,re,ye),y:Xi(he,Pe,ye),rx:Le*.78,rz:Le*.78,zone:ke,chunk:L,conveyX:Ke&&Ke.conveyX};a.push(Je),S.push(Je)}return S}f(0,0,n(48),20,n(46),"meadow"),f(-14,.15,n(70),8,n(10),"meadow"),f(12,1.6,n(62),6,n(8),"meadow"),f(12,.7,n(50),5,n(6),"meadow"),f(0,.1,n(118),18,n(28),"meadow"),f(0,.2,n(150),14,n(16),"canyon");let g=.45+h()*.1;p(-14,n(166),-10,n(262),.3,.3,6.2,"canyon"),p(0,n(166),0,n(262),.4,.4,4.6,"canyon",{gap:g}),p(14,n(166),10,n(262),.4,2.4,4.6,"canyon"),f(14,1.2,n(190),3.2,3.2,"canyon"),f(14,2.2,n(210),3.2,3.2,"canyon"),f(0,.2,n(268),14,n(14),"canyon"),f(0,2.2,n(305),12,n(24),"canyon"),f(0,4,n(330),12,n(12),"sky"),p(-12,n(342),-8,n(446),4.2,4.2,5.2,"sky"),p(0,n(342),0,n(446),5.2,5.2,4.2,"sky",{gap:.55}),p(12,n(342),8,n(446),4.4,7.2,4.4,"sky"),f(0,5.4,n(386),3.4,3.4,"sky"),f(0,4.2,n(448),12,n(12),"sky"),f(0,3.6,n(478),12,n(20),"sky"),f(0,3.2,n(510),16,n(28),"ice",{conveyX:0}),f(-12,3.5,n(500),6,n(10),"ice",{conveyX:6}),f(12,4.6,n(520),5,n(8),"ice",{conveyX:-6}),f(0,2.2,n(555),10,n(10),"ice"),f(0,2.2,n(575),12,n(16),"ice"),f(0,2.2,n(590),12,n(12),"climb"),p(-10,n(602),-6,n(684),2.3,4.6,5.4,"climb"),p(0,n(602),0,n(684),2.3,6.4,4.4,"climb"),p(10,n(602),6,n(684),2.3,8.2,4.2,"climb"),f(0,6.5,n(690),14,n(22),"ship");let _=a[a.length-1],m={x:_.x,y:_.y,z:_.z+n(6)};function d(de){let k=[];for(let[j,re,he]of de)k.push({x:re,y:he||0,z:n(j)});return k.push({x:m.x,y:m.y,z:m.z-4}),k}let v=[d([[20,-4,0],[70,-10,.2],[150,-8,.2],[210,-12,.3],[268,-6,.2],[330,-10,4],[400,-11,4.2],[450,-4,4.2],[510,-8,3.4],[600,-6,2.2],[650,-8,3.4],[690,0,6.5]]),d([[30,0,0],[90,0,0],[170,0,.4],[220,0,.4],[268,0,.2],[350,0,5.2],[410,0,5.2],[460,0,4.2],[520,0,3.2],[620,0,5.5],[670,0,5.5],[690,0,6.5]]),d([[45,8,.7],[62,12,1.6],[180,14,2.4],[230,14,2.4],[262,8,2.4],[350,12,7.2],[420,11,7.2],[530,10,4.6],[640,8,8.2],[680,2,6.5],[690,0,6.5]])],y=[];for(let de=0;de<=s;de+=8){let k=hh(r,de);y.push({x:0,y:0,z:de,half:k==="meadow"?16:12,zone:k,gap:!1,chunk:0,ice:k==="ice",conveyX:0,route:0,shelf:0,shelfH:0,guard:k==="meadow"&&de<50*t})}let x=[];for(let de of a)if(!(de.rx<6))for(let k=0;k<6;k++){let j=h()*Math.PI*2;x.push({x:de.x+Math.cos(j)*de.rx*.85,y:de.y,z:de.z+Math.sin(j)*de.rz*.75,zone:de.zone,col:Math.cos(j)>0?4:-4,row:Math.floor(de.z)})}let I=[];for(let de of v)for(let k=2;k<de.length;k+=3){let j=de[k];I.push({x:j.x+(h()-.5)*3,y:j.y+1.1,z:j.z})}let C=[];for(let de=0;de<x.length;de+=4)C.push({x:x[de].x,y:x[de].y,z:x[de].z,r:.7});for(let de=0;de<3;de++)de!==u&&C.push({x:10+de*2.4,y:2.4,z:n(230),r:1.05});C.push({x:m.x,y:m.y,z:m.z,r:2.4,ship:!0});let R=(de,k,j)=>({x:k,y:j,z:n(de),zone:hh(r,n(de))}),P=[R(40,-8,0),R(55,6,.4),R(200,-14,.3),R(500,4,3.2),R(630,-8,3.2)],T=[R(58,0,0),R(150,0,.2),R(175,0,.4),R(360,0,5.2),R(64,12,1.6),R(640,0,5.5)],b=[{id:0,kind:"ferry",originX:0,originZ:n(386),x:0,z:n(386),prevX:0,prevZ:n(386),y:5.5,originY:5.5,amp:3.2,speed:.8,phase:h()*3,radius:2.4,axis:"x"},{id:1,kind:"spin",originX:12,originZ:n(400),x:12,z:n(400),prevX:12,prevZ:n(400),y:7.3,originY:7.3,amp:0,speed:1.1,phase:0,radius:2.1,axis:"spin"},{id:2,kind:"seesaw",originX:-6,originZ:n(515),x:-6,z:n(515),prevX:-6,prevZ:n(515),y:3.5,originY:3.5,amp:.55,speed:1.3,phase:h(),radius:2.6,axis:"bob"},{id:3,kind:"seesaw",originX:6,originZ:n(530),x:6,z:n(530),prevX:6,prevZ:n(530),y:3.6,originY:3.6,amp:.5,speed:1.1,phase:h()*2,radius:2.4,axis:"tilt"}],D=[R(90,4,0),R(360,-12,4.2),R(640,8,8.2)].map((de,k)=>({...de,angle:h()*3,spin:k%2?1.4:-1.5})),V=[R(190,2,.4),R(220,-2,.4)].map((de,k)=>({...de,period:2.4+k*.4,t:h()*2,hot:!1,wasHot:!1,warn:!1,radius:1.15})),G=[{...R(100,0,.9),originX:0,amp:6,speed:.9,halfLen:2.2,height:.9,full:!0,radius:.7},{...R(400,-12,5.1),originX:-12,amp:3,speed:1.2,halfLen:1.8,height:.9,full:!1,radius:.6},{...R(650,0,6.4),originX:0,amp:4,speed:1.1,halfLen:2,height:.9,full:!1,radius:.62}],Z=[{...R(370,6,8.4),len:2.6,amp:.9,speed:1.2,phase:h(),radius:.75},{...R(660,-6,6.4),len:2.4,amp:.8,speed:1.3,phase:h(),radius:.7}],ne=[{...R(80,8,1.3),x0:6,x1:14,dir:1,speed:2.4,radius:.9,rot:0},{...R(210,-14,1.2),x0:-18,x1:-10,dir:-1,speed:2.8,radius:1,rot:0},{...R(520,0,4),x0:-4,x1:4,dir:1,speed:2.2,radius:.85,rot:0,snow:!0}],J=[{...R(230,4,.4),homeX:4,homeZ:n(230),homeY:.4,vy:0,hopping:!1,t:h(),period:1.6,dirx:1,dirz:0,radius:.9}],le=[{cx:0,cz:n(400),cy:8,x:0,y:8,z:n(400),ang:h()*6,span:8,radius:.9}],q=[{z0:n(400),z1:n(440),x0:-8,x1:8,y0:3,y1:12,ax:1}],me={z0:n(160),z1:n(255),x0:-30,x1:30},Me=["meadow","canyon","sky","ice","climb"].map(de=>{let k=r.find(j=>j.id===de);return{x:0,y:0,z:k.z0+8,name:k.name,row:0}}),Ie=[{x:0,y:0,z:n(18),row:0,col:0}];for(let de=1;de<16;de++){let k=Math.floor((de-1)/5),j=(de-1)%5;Ie.push({x:(j-2)*2.2,y:0,z:n(24+k*3.2),row:k+1,col:j})}let Qe=[{x:0,y:.5,z:n(198),r:2.4,zone:"canyon"},{x:0,y:.5,z:n(214),r:2.4,zone:"canyon"},{x:0,y:5.4,z:n(390),r:2.6,zone:"sky"},{x:0,y:5.4,z:n(406),r:2.4,zone:"sky"}];return{len:s,stations:y,chunks:o,floors:a,tiles:x,islands:Qe,blockers:C,coins:I,zones:r,bumpers:P,spinners:D,pads:T,platforms:b,pendulums:Z,sweepers:G,geysers:V,rollers:ne,hoppers:J,flyers:le,winds:q,lava:me,checkpoints:Me,waypoints:v[0],routes:v,openDoor:u,spawns:Ie,ship:m,endZ:m.z}}function Wf(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function Ir(i,e,t){return Math.max(e,Math.min(t,i))}function bi(i,e){return Math.hypot(i,e)}function ua(i,e,t=1){let n=Wf(t||1),s=i.spawns.slice(),r=s.find(h=>h.col===0&&h.row===s[0].row+3)||s[Math.min(8,s.length-1)],o=s.filter(h=>h!==r);for(let h=o.length-1;h>0;h--){let u=Math.floor(n()*(h+1)),f=o[h];o[h]=o[u],o[u]=f}let a=[];for(let h=0;h<e.racers;h++){let u=h===0?r:o[h-1]||r,f=h===0?e.playerSpeed:e.botSpeeds[Math.min(h-1,e.botSpeeds.length-1)];a.push({id:h,isPlayer:h===0,useAI:h!==0,color:Wi[h%Wi.length],pos:{x:u.x,y:u.y,z:u.z},lastSafe:{x:u.x,y:u.y,z:u.z},vel:{x:0,y:0,z:0},yaw:0,grounded:!0,platformId:null,coyote:e.coyoteTime,buffer:0,ungroundT:0,flail:0,invuln:.4,controlLock:0,sliding:0,squash:0,seated:!1,seatIndex:-1,eliminated:!1,cp:0,padCd:0,boost:0,bumpCd:0,spinCd:0,diveCd:0,knockCd:0,diving:!1,wasDiving:!1,dashX:0,dashZ:1,onIce:!1,emote:"idle",attached:!1,profile:{speed:f,skill:f>.96?.94:f>.86?.78:.5,mistake:h===0?0:f>.96?.012:f>.86?.035:.07,phase:n()*6},wait:h===0?0:(u.row||0)*.42+n()*.55,stumble:0,wp:0,routeId:h%3})}let c={cfg:e,course:i,racers:a,player:a[0],seed:t,rand:n,phase:"countdown",countClock:0,countCue:-1,time:0,collapseZ:i.zones[0].z0-16,collapseSpeed:1,seats:Array(e.seats).fill(null),seatsFilled:0,lastSeatEvent:!1,result:null,launchT:0,launchV:0,launchY:0,shipY:i.ship.y,events:[],platforms:i.platforms.map(h=>({...h})),spinners:i.spinners.map(h=>({...h})),geysers:i.geysers.map(h=>({...h})),rollers:i.rollers.map(h=>({...h})),hoppers:i.hoppers.map(h=>({...h})),flyers:i.flyers.map(h=>({...h})),pendulums:i.pendulums.map(h=>({...h,bobX:h.x,bobY:h.y-h.len,bobZ:h.z})),sweepers:i.sweepers.map(h=>({...h})),lavaY:e.lavaStartY,shake:0,activated:!1,zoneId:"meadow"},l=Math.max(30,i.ship.z-i.zones[0].z0);c.collapseSpeed=l/Math.max(8,e.collapseArrive-e.collapseDelay);for(let h of i.chunks)h.state="solid",h.crackT=0,h.fallT=0,h.fallY=0,h.dirty=!0,h.tilt=0,h.stepped=!1,h.spawned=!1;return c}function gh(i,e){for(let n of i.course.chunks)n.state="solid",n.crackT=0,n.fallT=0,n.fallY=0,n.dirty=!0,n.tilt=0,n.stepped=!1;let t=ua(i.course,i.cfg,e||i.seed+17>>>0);return Object.assign(i,t),i}function xh(i){return i&&(i.state==="solid"||i.state==="cracking")}function dh(i,e,t,n){return i<t-n||i>t+1.35&&e>t+.4?!1:e<=t+.28||i<=t+.2}function Xf(i,e,t,n,s){let r=i.cfg.stepUp,o=null,a=i.platforms;for(let l=0;l<a.length;l++){let h=a[l],u=e-h.x,f=t-h.z;u*u+f*f>h.radius*h.radius||dh(n,s,h.y,r+.1)&&(!o||h.y>=o.y)&&(o={y:h.y,platformId:l,tile:null})}let c=Cr(i.course,e,t);return c&&xh(c)&&dh(n,s,c.y,r)&&(!o||c.y>=o.y-.02)&&(o={y:c.y,platformId:null,tile:c}),o}function ph(i,e,t,n){let s=Cr(i.course,e,t);if(s&&xh(s)&&Math.abs(s.y-n)<1.4)return!0;for(let r of i.platforms){let o=e-r.x,a=t-r.z;if(o*o+a*a<=r.radius*r.radius&&Math.abs(r.y-n)<1.6)return!0}return!1}function _h(i,e){for(let t of i.course.winds)if(e.pos.z>=t.z0&&e.pos.z<=t.z1&&e.pos.x>=t.x0&&e.pos.x<=t.x1&&e.pos.y>=t.y0&&e.pos.y<=t.y1)return t;return null}function Yi(i,e,t,n,s){e.seated||e.eliminated||e.invuln>0||e.knockCd>0||(e.vel.x+=t,e.vel.z+=n,e.vel.y=Math.max(e.vel.y,s),e.grounded=!1,e.platformId=null,e.ungroundT=Math.max(e.ungroundT,.08),e.flail=Math.max(e.flail,i.cfg.stunTime),e.controlLock=Math.max(e.controlLock,i.cfg.stunTime),e.knockCd=i.cfg.knockCooldown,e.sliding=0,i.events.push({t:"bump",id:e.id,big:!0}),e.isPlayer&&(i.shake=Math.max(i.shake,.72)))}function Yf(i,e){let t=i.course.stations,n=i.course.chunks,s=a=>{if(!a||a.gap||a.zone==="ship")return!1;let c=n[a.chunk];return c&&(c.state==="solid"||c.state==="cracking")},r=Math.max(0,Math.min(t.length-1,e.row||0));for(let a=r;a>=0;a--)if(s(t[a]))return t[a];let o=Math.max(0,Math.round(i.collapseZ/2));for(let a=o;a<t.length;a++)if(s(t[a]))return t[a];for(let a of t)if(s(a))return a;return t[0]||null}function mh(i,e){let t=i.course.checkpoints[e.cp]||i.course.checkpoints[0],n=Yf(i,t),s=e.lastSafe,o=s&&Cr(i.course,s.x,s.z)?s:n;o&&(e.pos.x=o.x,e.pos.y=o.y+1.1,e.pos.z=o.z,e.vel.x=0,e.vel.y=4.2,e.vel.z=0,e.grounded=!1,e.platformId=null,e.flail=.7,e.invuln=.85,e.controlLock=.25,e.sliding=0,e.diving=!1,e.wasDiving=!1,i.events.push({t:"respawn",id:e.id}),e.isPlayer&&(i.shake=Math.max(i.shake,.3)))}function qf(i,e){let t=i.cfg;for(let n of i.racers){if(n===e||n.seated||n.invuln>0)continue;let s=n.pos.x-e.pos.x,r=n.pos.z-e.pos.z,o=Math.hypot(s,r);if(o<t.poundRadius&&Math.abs(n.pos.y-e.pos.y)<1.5){let a=o>.05?s/o:1,c=o>.05?r/o:0;n.vel.x+=a*t.poundPush,n.vel.z+=c*t.poundPush,n.vel.y=Math.max(n.vel.y,t.poundUp),n.grounded=!1,n.flail=.35,n.ungroundT=.06}}i.events.push({t:"bump",id:e.id,big:!0})}function Zf(i,e){let t=i.course.blockers;if(!t)return;let n=i.course.ship;for(let s=0;s<t.length;s++){let r=t[s];if(Math.abs(e.pos.y-r.y)>2.2)continue;if(r.ship){let p=e.pos.z-n.z;if(p<-.5&&p>-9)continue}let o=e.pos.x-r.x,a=e.pos.z-r.z,c=Math.hypot(o,a);if(c>=r.r||c<1e-4)continue;let l=o/c,h=a/c,u=r.r-c;e.pos.x+=l*u,e.pos.z+=h*u;let f=e.vel.x*l+e.vel.z*h;f<0&&(e.vel.x-=l*f,e.vel.z-=h*f)}}function Kf(i,e,t,n,s,r,o){let a=bi(e,t),c=r*Math.min(1,a),l=0,h=0;a>.001&&(l=e/a,h=t/a);let u=l*c+(o||0),f=h*c,p=u-i.vel.x,g=f-i.vel.z,_=Math.hypot(p,g),m=Math.min(_,s*n);_>1e-4&&(i.vel.x+=p/_*m,i.vel.z+=g/_*m)}function Jf(i,e,t,n){let s=i.cfg;if(e.seated||e.eliminated)return;if(e.controlLock>0&&(e.controlLock-=n,t={x:0,z:0,jump:!1,dive:!1}),e.invuln>0&&(e.invuln-=n),e.padCd>0&&(e.padCd-=n),e.bumpCd>0&&(e.bumpCd-=n),e.spinCd>0&&(e.spinCd-=n),e.diveCd>0&&(e.diveCd-=n),e.knockCd>0&&(e.knockCd-=n),e.flail>0&&(e.flail-=n),e.squash>0&&(e.squash=Math.max(0,e.squash-n*3.2)),e.grounded&&e.platformId!=null){let v=i.platforms[e.platformId];if(v&&(e.pos.x+=v.x-v.prevX,e.pos.z+=v.z-v.prevZ,v.axis==="spin")){let y=e.pos.x-v.x,x=e.pos.z-v.z;e.vel.x+=-x*v.speed*n*5.5,e.vel.z+=y*v.speed*n*5.5}}if(e.grounded?e.coyote=s.coyoteTime:e.coyote=Math.max(0,e.coyote-n),t.jump?e.buffer=s.jumpBuffer:e.buffer=Math.max(0,e.buffer-n),t.dive&&e.diveCd<=0){let v=bi(t.x,t.z);v>.15?(e.dashX=t.x/v,e.dashZ=t.z/v):(e.dashX=Math.sin(e.yaw),e.dashZ=Math.cos(e.yaw)),e.grounded?(e.sliding=s.diveDashTime,e.diveCd=s.diveCooldown,i.events.push({t:"dive",id:e.id})):(e.vel.y=-s.diveFall,e.diving=!0,e.wasDiving=!0,e.diveCd=s.diveCooldown,e.grounded=!1,i.events.push({t:"dive",id:e.id}))}let r=_h(i,e),o=r?r.ax*s.windPush:0,a=e.controlLock>0?8:e.onIce?bi(t.x,t.z)>.1?s.iceAccel:s.iceFriction:bi(t.x,t.z)>.08?s.accel:s.friction,c=s.maxSpeed*(e.profile.speed||1);if(e.sliding>0)e.sliding-=n,e.vel.x=e.dashX*s.diveDashSpeed,e.vel.z=e.dashZ*s.diveDashSpeed,e.vel.x+=t.x*10*n,e.vel.z+=t.z*10*n;else if(e.grounded)Kf(e,t.x,t.z,n,a,c,o),e.groundTile&&e.groundTile.conveyX&&(e.vel.x+=e.groundTile.conveyX*n);else{e.vel.x+=t.x*s.airAccel*n+o*n*.6,e.vel.z+=t.z*s.airAccel*n;let v=e.diving?s.diveDashSpeed:e.boost>0?s.padForward+c:c*1.18;e.boost>0&&(e.boost-=n);let y=bi(e.vel.x,e.vel.z);y>v&&(e.vel.x*=v/y,e.vel.z*=v/y)}let l=!1;e.buffer>0&&e.ungroundT<=0&&(e.grounded||e.coyote>0)&&e.sliding<=0&&(e.vel.y=s.jumpVel,e.grounded=!1,e.platformId=null,e.coyote=0,e.buffer=0,e.ungroundT=s.ungroundTime,l=!0,i.events.push({t:"jump",id:e.id}));let h=s.gravity;e.vel.y<0&&(h*=s.fallGravityMul),e.vel.y-=h*n,e.vel.y<-s.maxFallSpeed&&(e.vel.y=-s.maxFallSpeed),e.vel.x=Ir(e.vel.x,-24,24),e.vel.z=Ir(e.vel.z,-24,24),e.ungroundT>0&&(e.ungroundT-=n);let u=e.grounded,f=e.pos.x,p=e.pos.z;e.pos.x+=e.vel.x*n,e.pos.z+=e.vel.z*n,Zf(i,e);let g=e.pos.y+e.vel.y*n;if(e.ungroundT>0||l)e.pos.y=g,e.grounded=!1,e.platformId=null;else{let v=Xf(i,e.pos.x,e.pos.z,e.pos.y,g);if(v&&e.vel.y<=.85){let y=-e.vel.y,x=!e.grounded;e.pos.y=v.y,e.vel.y=0,e.grounded=!0,e.platformId=v.platformId,e.groundTile=v.tile,e.onIce=!!(v.tile&&v.tile.ice),e.diving=!1,x&&y>2.4&&(e.squash=Ir(y/16,.12,1),i.events.push({t:"land",id:e.id,impact:y}),e.wasDiving&&y>8&&qf(i,e)),e.wasDiving=!1,v.tile&&(e.lastSafe={x:v.tile.x,y:v.y,z:e.pos.z}),v.tile&&v.tile.chunk&&v.tile.state==="solid"&&v.tile.fragile&&!v.tile.chunk.stepped&&(v.tile.chunk.stepped=!0,v.tile.chunk.state="cracking",v.tile.chunk.crackT=s.fragileCrack,v.tile.chunk.dirty=!0,i.events.push({t:"crack"}))}else u&&e.pos.z<50&&e.vel.y<=.6?(e.pos.x=f,e.pos.z=p,e.vel.x*=.15,e.vel.z*=.15,e.grounded=!0):(e.pos.y=g,e.grounded=!1,e.platformId=null,e.groundTile=null,e.onIce=!1)}let _=i.course.checkpoints;for(;e.grounded&&e.cp<_.length-1&&e.pos.z>_[e.cp+1].z-1.5;)e.cp++,e.isPlayer&&i.events.push({t:"checkpoint",name:_[e.cp].name});e.pos.y<s.voidY&&mh(i,e);let m=i.course.lava;e.pos.z>m.z0&&e.pos.z<m.z1&&e.pos.x>m.x0&&e.pos.x<m.x1&&e.pos.y<i.lavaY+.2&&!e.seated&&mh(i,e),bi(e.vel.x,e.vel.z)>.7&&e.sliding<=0?e.yaw=Math.atan2(e.vel.x,e.vel.z):e.sliding>0&&(e.yaw=Math.atan2(e.dashX,e.dashZ)),!e.grounded&&e.vel.y<-2&&(e.flail=Math.max(e.flail,.12))}function $f(i,e,t){let n={x:0,z:0,jump:!1,dive:!1};if(e.wait>0)return e.wait-=t,n;if(e.stumble>0)return e.stumble-=t,n;let s=e.profile;i.rand()<s.mistake*t&&(e.stumble=.18+i.rand()*.28);let r=i.course.routes,o=r&&r[e.routeId]||i.course.waypoints;for(;e.wp<o.length-1;){let x=o[e.wp],I=e.pos.x-x.x,C=e.pos.z-x.z;if(I*I+C*C>9)break;e.wp++}let a=o[Math.min(e.wp,o.length-1)],c=(e.id%5-2)*(e.pos.y>5.5?.4:.85),l=a.x+c;a.gap&&(l=a.x);for(let x of i.course.pads){let I=x.z-e.pos.z;I>0&&I<9&&(l=x.x)}let h=a.z,u=a.y;if(a.z-e.pos.z>6){let x=null,I=1e9;for(let C of i.platforms){if(C.kind!=="ferry"||C.z<e.pos.z+.5||C.z>a.z+1)continue;let R=C.z-e.pos.z;R<I&&(I=R,x=C)}x&&(l=x.x,h=x.z,u=x.y)}let f=l-e.pos.x,p=h-e.pos.z;_h(i,e)&&(f-=2.4*s.skill);for(let x of i.spinners){let I=x.z-e.pos.z;I>-.2&&I<7&&Math.abs(x.x-e.pos.x)<2.2&&(f+=(e.pos.x>=x.x?1:-1)*3.2*s.skill)}for(let x of i.sweepers){let I=x.z-e.pos.z;I>.3&&I<6&&Math.abs(x.x-e.pos.x)<1.6&&(x.full&&s.skill>.4||(f+=(e.pos.x>=x.x?1:-1)*3*s.skill))}for(let x of i.geysers){if(!x.warn&&!x.hot)continue;let I=x.z-e.pos.z;I>-.5&&I<7&&Math.abs(x.x-e.pos.x)<2.4&&(f+=(e.pos.x>=x.x?1:-1)*4.2*s.skill)}for(let x of i.rollers)Math.abs(x.z-e.pos.z)<3&&Math.abs(x.x-e.pos.x)<3&&(p+=2.5,f+=(e.pos.x>=x.x?1:-1)*2);let g=Math.hypot(f,p)||1;f/=g,p/=g;let _=!1,m=e.pos.x+f*1.05,d=e.pos.z+p*1.05,v=ph(i,m,d,e.pos.y);e.grounded&&!v&&(ph(i,e.pos.x+f*3.2,e.pos.z+p*4.2,e.pos.y)||u>e.pos.y-.4?_=!0:p*=.15),e.grounded&&u>e.pos.y+.65&&Math.hypot(l-e.pos.x,h-e.pos.z)<3.2&&(_=!0);let y=!1;for(let x of i.course.pads){let I=x.z-e.pos.z;I>-.4&&I<8&&Math.abs(x.x-e.pos.x)<2.2&&(y=!0)}y&&(_=!1);for(let x of i.sweepers){if(!x.full)continue;let I=x.z-e.pos.z;e.grounded&&I>.6&&I<2.8&&(_=!0)}return{x:f,z:p,jump:_,dive:!1}}function jf(i){let e=i.cfg,t=i.racers,n=e.bodyRadius*2.55;for(let s=0;s<t.length;s++){let r=t[s];if(!(r.seated||r.eliminated))for(let o=s+1;o<t.length;o++){let a=t[o];if(a.seated||a.eliminated)continue;let c=a.pos.x-r.pos.x,l=a.pos.z-r.pos.z;if(Math.abs(r.pos.y-a.pos.y)>1.3)continue;let u=Math.hypot(c,l);if(u<8e-4&&(c=.02,u=.02),u>=n)continue;let f=c/u,p=l/u,g=(n-u)*.5;if(r.invuln<=0&&(r.pos.x-=f*g,r.pos.z-=p*g),a.invuln<=0&&(a.pos.x+=f*g,a.pos.z+=p*g),(r.vel.x-a.vel.x)*f+(r.vel.z-a.vel.z)*p>1.1&&r.bumpCd<=0&&a.bumpCd<=0&&r.invuln<=0&&a.invuln<=0){r.vel.x-=f*e.bumpPush,r.vel.z-=p*e.bumpPush,a.vel.x+=f*e.bumpPush,a.vel.z+=p*e.bumpPush,r.vel.y=Math.max(r.vel.y,e.bumpUp),a.vel.y=Math.max(a.vel.y,e.bumpUp),r.grounded=!1,a.grounded=!1,r.ungroundT=Math.max(r.ungroundT,.05),a.ungroundT=Math.max(a.ungroundT,.05),r.flail=Math.max(r.flail,.28),a.flail=Math.max(a.flail,.28),r.bumpCd=e.bumpCooldown,a.bumpCd=e.bumpCooldown;let m=r.isPlayer?r.id:a.isPlayer?a.id:r.id;i.events.push({t:"bump",id:m}),(r.isPlayer||a.isPlayer)&&(i.shake=Math.max(i.shake,.18))}}}}function Qf(i,e){let t=i.cfg;for(let n of i.spinners)n.angle+=n.spin*e;for(let n of i.course.bumpers)for(let s of i.racers){if(s.seated||s.bumpCd>0||s.invuln>0)continue;let r=s.pos.x-n.x,o=s.pos.z-n.z,a=Math.hypot(r,o);if(a<t.bumperRadius+.2&&Math.abs(s.pos.y-n.y)<1.4){let c=a>.05?r/a:1,l=a>.05?o/a:0;s.vel.x=c*t.bumperPush,s.vel.z=l*t.bumperPush,s.vel.y=Math.max(s.vel.y,t.bumperUp),s.grounded=!1,s.ungroundT=.08,s.flail=.4,s.bumpCd=t.bumperCooldown,s.controlLock=Math.max(s.controlLock,.12),i.events.push({t:"bump",id:s.id,big:!0}),s.isPlayer&&(i.shake=Math.max(i.shake,.28))}}for(let n of i.spinners){let s=Math.cos(n.angle),r=Math.sin(n.angle),o=s*t.spinnerLength,a=r*t.spinnerLength,c=n.x-o,l=n.z-a,h=n.x+o,u=n.z+a,f=h-c,p=u-l,g=f*f+p*p||1;for(let _ of i.racers){if(_.seated||_.spinCd>0||_.invuln>0||_.sliding>0)continue;let m=_.pos.y-n.y;if(m<t.spinnerMinY||m>t.spinnerMaxY)continue;let d=((_.pos.x-c)*f+(_.pos.z-l)*p)/g;d=Ir(d,0,1);let v=c+f*d,y=l+p*d,x=_.pos.x-v,I=_.pos.z-y;if(x*x+I*I>t.spinnerHit*t.spinnerHit)continue;let C=-r,R=s,P=Math.sign((_.pos.x-n.x)*C+(_.pos.z-n.z)*R)||1;Yi(i,_,C*P*t.spinnerPush,R*P*t.spinnerPush,t.spinnerUp),_.spinCd=t.spinnerCooldown}}for(let n of i.course.pads)for(let s of i.racers){if(s.seated||s.padCd>0)continue;let r=s.pos.x-n.x,o=s.pos.z-n.z;if(r*r+o*o>t.padRadius*t.padRadius||Math.abs(s.pos.y-n.y)>1.1)continue;let a=bi(s.vel.x,s.vel.z)>.4?Math.atan2(s.vel.x,s.vel.z):0;s.vel.y=t.padUp,s.vel.x+=Math.sin(a)*t.padForward*.35,s.vel.z+=Math.cos(a)*t.padForward,s.vel.z<t.padForward*.65&&(s.vel.z=t.padForward*.65),s.grounded=!1,s.platformId=null,s.ungroundT=.12,s.padCd=t.padCooldown,s.boost=.85,i.events.push({t:"jump",id:s.id,pad:!0})}for(let n of i.geysers){n.t+=e;let s=n.t%n.period;if(n.warn=s>n.period-.7&&s<n.period-.18,n.hot=s>=n.period-.18||s<.28,n.hot&&!n.wasHot)for(let r of i.racers){if(r.seated)continue;Math.hypot(r.pos.x-n.x,r.pos.z-n.z)<n.radius+.3&&Math.abs(r.pos.y-n.y)<1.3&&(r.vel.y=Math.max(r.vel.y,13),r.grounded=!1,r.ungroundT=.1,r.flail=.3,i.events.push({t:"geyser",id:r.id}),r.isPlayer&&(i.shake=Math.max(i.shake,.2)))}n.wasHot=n.hot}for(let n of i.sweepers){n.x=n.originX+Math.sin(i.time*n.speed+n.z)*n.amp;for(let s of i.racers){if(s.seated||s.invuln>0||s.knockCd>0||Math.abs(s.pos.z-n.z)>1.15||Math.abs(s.pos.x-n.x)>n.radius+.45)continue;let r=s.pos.y-(n.y-n.height),o=s.sliding>0?t.slideHeight:1.35;if(r>o||s.pos.y+.2<n.y-.35||s.sliding>0&&n.height>.8)continue;let a=Math.cos(i.time*n.speed+n.z)>=0?1:-1;Yi(i,s,a*8,3.5,3.2)}}for(let n of i.pendulums){let s=Math.sin(i.time*n.speed+n.phase)*n.amp;n.bobX=n.x+Math.sin(s)*n.len,n.bobY=n.y-Math.cos(s)*n.len,n.bobZ=n.z;let r=Math.cos(i.time*n.speed+n.phase);for(let o of i.racers){if(o.seated||o.invuln>0)continue;Math.hypot(o.pos.x-n.bobX,o.pos.z-n.bobZ)<n.radius+.35&&Math.abs(o.pos.y+.7-n.bobY)<1&&Yi(i,o,r*9,2,3)}}}function ed(i,e){for(let t of i.rollers){t.x+=t.dir*t.speed*e,t.rot+=e*2.4,t.x>t.x1&&(t.dir=-1),t.x<t.x0&&(t.dir=1);for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+.35&&Math.abs(n.pos.y-t.y)<1.4){let r=s>.05?(n.pos.x-t.x)/s:t.dir;Yi(i,n,r*10+t.dir*4,2,4.5)}}}for(let t of i.hoppers){if(t.t+=e,!t.hopping&&t.t>t.period){t.t=0,t.hopping=!0,t.vy=8;let n=t.homeX+Math.sin(i.time)*2.5,s=t.homeZ,r=12;for(let l of i.racers){if(l.seated)continue;let h=Math.hypot(l.pos.x-t.x,l.pos.z-t.z);h<r&&(r=h,n=l.pos.x,s=l.pos.z)}let o=n-t.x,a=s-t.z,c=Math.hypot(o,a)||1;t.dirx=o/c,t.dirz=a/c}if(t.hopping&&(t.vy-=18*e,t.y+=t.vy*e,t.x+=t.dirx*4.2*e,t.z+=t.dirz*4.2*e,t.y<=t.homeY)){t.y=t.homeY,t.hopping=!1;for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+.55&&Math.abs(n.pos.y-t.y)<1.3){let r=s>.05?(n.pos.x-t.x)/s:1;Yi(i,n,r*9,3,5)}}}}for(let t of i.flyers){t.ang+=e*.85,t.x=t.cx+Math.sin(t.ang)*t.span,t.z=t.cz+Math.cos(t.ang)*t.span*.45,t.y=t.cy+Math.sin(t.ang*2)*.7;for(let n of i.racers){if(n.seated)continue;Math.hypot(n.pos.x-t.x,n.pos.z-t.z)<t.radius+.4&&Math.abs(n.pos.y+.8-t.y)<1.1&&Yi(i,n,Math.cos(t.ang)*8,Math.sin(t.ang)*6,3.4)}}}function td(i,e){for(let t of i.platforms)t.prevX=t.x,t.prevZ=t.z,t.phase+=e*t.speed,t.axis==="x"?t.x=t.originX+Math.sin(t.phase)*t.amp:(t.axis==="bob"||t.axis==="tilt")&&(t.y=t.originY+Math.sin(t.phase)*t.amp)}function nd(i,e){let t=i.cfg;if(i.time<t.collapseDelay)return;let n=i.course.ship.z-18;i.collapseZ+=i.collapseSpeed*e,i.collapseZ>n&&(i.collapseZ=n),i.lavaY=t.lavaStartY+i.time*t.lavaRisePerSec;let s=!1;for(let r of i.course.chunks)if(!(r.zone==="ship"||r.gap)){if(r.state==="solid")i.collapseZ>r.z0&&(r.state="cracking",r.crackT=t.crackTime+r.jitter*.35,r.dirty=!0,s=!0);else if(r.state==="cracking"){if(r.crackT-=e,r.dirty=!0,r.crackT<=0){r.state="falling",r.fallT=t.fallTime;let o=(r.z0+r.z1)*.5,a=i.player.pos.z-o;a*a<420&&(i.shake=Math.max(i.shake,.42))}}else r.state==="falling"&&(r.fallT-=e,r.fallY-=(7+r.jitter*6)*e,r.dirty=!0,r.fallT<=0&&(r.state="gone"));r.ice&&(r.tilt=Math.sin(i.time*1.35+r.jitter*8)*.22)}s&&i.events.push({t:"crack"})}function id(i){if(i.seatsFilled>=i.cfg.seats)return;let e=i.course.ship,t=i.cfg,n=[];for(let s of i.racers){if(s.seated||s.eliminated||!s.grounded)continue;let r=s.pos.x-e.x,o=s.pos.z-e.z;Math.abs(r)<t.boardHalfX&&o<t.boardZMax&&o>t.boardZMin&&Math.abs(s.pos.y-e.y)<1.8&&n.push({r:s,d:r*r+o*o})}n.sort((s,r)=>s.d-r.d||(s.r.isPlayer?-1:1)-(r.r.isPlayer?-1:1));for(let s of n){if(i.seatsFilled>=t.seats)break;let r=s.r,o=i.seatsFilled;i.seats[o]=r.id,i.seatsFilled++,r.seated=!0,r.seatIndex=o,r.vel.x=r.vel.y=r.vel.z=0,r.emote="cheer",r.isPlayer&&(i.seatCine=1.85),i.events.push({t:"seat",id:r.id,seat:o,pop:!0}),i.seatsFilled===t.seats-1&&!i.lastSeatEvent&&(i.lastSeatEvent=!0,i.events.push({t:"lastseat"}))}}function sd(i){i.phase="launch",i.launchT=0,i.launchV=1.5,i.seatCine=0,i.result=i.player.seated?"escaped":"missed",i.player.seated||(i.player.flail=.8,i.player.emote="wave",i.player.waveT=0),i.events.push({t:"launch"}),i.events.push({t:i.result,time:i.time}),i.shake=.65}function yh(i,e,t){let n=i.cfg;if(i.events.length>80&&i.events.splice(0,i.events.length-80),i.phase==="countdown"){i.countClock+=e;let s=i.countClock<1?3:i.countClock<2?2:i.countClock<3?1:0;s!==i.countCue&&(i.countCue=s,i.events.push({t:s===0?"go":"tick",n:s})),i.countClock>=n.countdownBeats+n.goHold&&(i.phase="race",i.activated=!0,i.time=0);return}if(i.phase==="race"){i.activated=!0,i.time+=e,i.seatCine>0&&(i.seatCine-=e),td(i,e),nd(i,e);for(let r of i.racers){if(r.seated||r.eliminated)continue;let o=r.isPlayer&&!r.useAI?t||{x:0,z:0,jump:!1,dive:!1}:$f(i,r,e);Jf(i,r,o,e)}jf(i),Qf(i,e),ed(i,e),id(i);let s=rd(i,i.player.pos.z);if(s&&s!==i.zoneId){i.zoneId=s;let r=i.course.zones.find(o=>o.id===s);r&&i.events.push({t:"zone",name:r.name})}(i.seatsFilled>=n.seats||i.time>=n.raceSeconds)&&sd(i),i.shake>0&&(i.shake=Math.max(0,i.shake-e*1.5));return}(i.phase==="launch"||i.phase==="results")&&(i.launchT+=e,i.launchV+=4.5*e,i.launchY+=i.launchV*e,i.shipY=i.course.ship.y+i.launchY,i.player.emote==="wave"&&(i.player.waveT=(i.player.waveT||0)+e,i.player.waveT>.7&&i.player.waveT<2.2&&(i.player.emote="cheer"),i.player.waveT>=2.2&&(i.player.emote="idle")),i.phase==="launch"&&i.launchT>1.25&&(i.phase="results"),i.shake>0&&(i.shake=Math.max(0,i.shake-e*.7)))}function rd(i,e){let t=i.course.zones[0].id;for(let n of i.course.zones)e>=n.z0&&(t=n.id);return t}var sl="170";var od=0,vh=1,ad=2;var zu=1,cd=2,Gn=3,Un=0,Xt=1,Lt=2,pi=0,gs=1,Mh=2,Sh=3,bh=4,ld=5,Pi=100,hd=101,ud=102,fd=103,dd=104,pd=200,md=201,gd=202,xd=203,Xa=204,Ya=205,_d=206,yd=207,vd=208,Md=209,Sd=210,bd=211,Ed=212,Td=213,wd=214,qa=0,Za=1,Ka=2,vs=3,Ja=4,$a=5,ja=6,Qa=7,rl=0,Ad=1,Rd=2,mi=0,Cd=1,Id=2,Pd=3,ol=4,Ld=5,Dd=6,Nd=7,Eh="attached",Ud="detached",Bu=300,Ms=301,Ss=302,ec=303,tc=304,Wo=306,Di=1e3,Xn=1001,hr=1002,kt=1003,al=1004;var fs=1005;var an=1006,or=1007;var Nn=1008;var Zn=1009,ku=1010,Hu=1011,ur=1012,cl=1013,Ni=1014,Rn=1015,vr=1016,ll=1017,hl=1018,bs=1020,Vu=35902,Gu=1021,Wu=1022,yn=1023,Xu=1024,Yu=1025,xs=1026,Es=1027,ul=1028,fl=1029,qu=1030,dl=1031;var pl=1033,ao=33776,co=33777,lo=33778,ho=33779,nc=35840,ic=35841,sc=35842,rc=35843,oc=36196,ac=37492,cc=37496,lc=37808,hc=37809,uc=37810,fc=37811,dc=37812,pc=37813,mc=37814,gc=37815,xc=37816,_c=37817,yc=37818,vc=37819,Mc=37820,Sc=37821,uo=36492,bc=36494,Ec=36495,Zu=36283,Tc=36284,wc=36285,Ac=36286,Fd=2200,Od=2201,zd=2202,Ts=2300,ws=2301,fa=2302,ds=2400,ps=2401,fo=2402,ml=2500,Bd=2501,Ku=0,Xo=1,Mr=2,kd=3200,Hd=3201;var Yo=0,Vd=1,Dn="",Ft="srgb",Zt="srgb-linear",qo="linear",bt="srgb";var qi=7680;var Th=519,Gd=512,Wd=513,Xd=514,Ju=515,Yd=516,qd=517,Zd=518,Kd=519,Rc=35044,$u=35048;var wh="300 es",Yn=2e3,po=2001,Kn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ah=1234567,ar=Math.PI/180,As=180/Math.PI;function Cn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function jt(i,e,t){return Math.max(e,Math.min(t,i))}function gl(i,e){return(i%e+e)%e}function Jd(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function $d(i,e,t){return i!==e?(t-i)/(e-i):0}function cr(i,e,t){return(1-t)*i+t*e}function jd(i,e,t,n){return cr(i,e,1-Math.exp(-t*n))}function Qd(i,e=1){return e-Math.abs(gl(i,e*2)-e)}function ep(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function tp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function np(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ip(i,e){return i+Math.random()*(e-i)}function sp(i){return i*(.5-Math.random())}function rp(i){i!==void 0&&(Ah=i);let e=Ah+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function op(i){return i*ar}function ap(i){return i*As}function cp(i){return(i&i-1)===0&&i!==0}function lp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function hp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function up(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function An(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function yt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ju={DEG2RAD:ar,RAD2DEG:As,generateUUID:Cn,clamp:jt,euclideanModulo:gl,mapLinear:Jd,inverseLerp:$d,lerp:cr,damp:jd,pingpong:Qd,smoothstep:ep,smootherstep:tp,randInt:np,randFloat:ip,randFloatSpread:sp,seededRandom:rp,degToRad:op,radToDeg:ap,isPowerOfTwo:cp,ceilPowerOfTwo:lp,floorPowerOfTwo:hp,setQuaternionFromProperEuler:up,normalize:yt,denormalize:An},Xe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},st=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],_=s[0],m=s[3],d=s[6],v=s[1],y=s[4],x=s[7],I=s[2],C=s[5],R=s[8];return r[0]=o*_+a*v+c*I,r[3]=o*m+a*y+c*C,r[6]=o*d+a*x+c*R,r[1]=l*_+h*v+u*I,r[4]=l*m+h*y+u*C,r[7]=l*d+h*x+u*R,r[2]=f*_+p*v+g*I,r[5]=f*m+p*y+g*C,r[8]=f*d+p*x+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,p=l*r-o*c,g=t*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=f*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(da.makeScale(e,t)),this}rotate(e){return this.premultiply(da.makeRotation(-e)),this}translate(e,t){return this.premultiply(da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},da=new st;function Qu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fp(){let i=fr("canvas");return i.style.display="block",i}var Rh={};function sr(i){i in Rh||(Rh[i]=!0,console.warn(i))}function dp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function pp(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function mp(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var lt={enabled:!0,workingColorSpace:Zt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===bt&&(i.r=qn(i.r),i.g=qn(i.g),i.b=qn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===bt&&(i.r=_s(i.r),i.g=_s(i.g),i.b=_s(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Dn?qo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _s(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ch=[.64,.33,.3,.6,.15,.06],Ih=[.2126,.7152,.0722],Ph=[.3127,.329],Lh=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dh=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);lt.define({[Zt]:{primaries:Ch,whitePoint:Ph,transfer:qo,toXYZ:Lh,fromXYZ:Dh,luminanceCoefficients:Ih,workingColorSpaceConfig:{unpackColorSpace:Ft},outputColorSpaceConfig:{drawingBufferColorSpace:Ft}},[Ft]:{primaries:Ch,whitePoint:Ph,transfer:bt,toXYZ:Lh,fromXYZ:Dh,luminanceCoefficients:Ih,outputColorSpaceConfig:{drawingBufferColorSpace:Ft}}});var Zi,Cc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Zi===void 0&&(Zi=fr("canvas")),Zi.width=e.width,Zi.height=e.height;let n=Zi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Zi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=fr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=qn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qn(t[n]/255)*255):t[n]=qn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},gp=0,mo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=Cn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(pa(s[o].image)):r.push(pa(s[o]))}else r=pa(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function pa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Cc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var xp=0,Yt=class i extends Kn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Xn,s=Xn,r=an,o=Nn,a=yn,c=Zn,l=i.DEFAULT_ANISOTROPY,h=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Cn(),this.name="",this.source=new mo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Di:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case hr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Di:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case hr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=Bu;Yt.DEFAULT_ANISOTROPY=1;var dt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],g=c[9],_=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,x=(p+1)/2,I=(d+1)/2,C=(h+f)/4,R=(u+_)/4,P=(g+m)/4;return y>x&&y>I?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=C/n,r=R/n):x>I?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=C/s,r=P/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=R/r,s=P/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-_)/v,this.z=(f-h)/v,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ic=class extends Kn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Yt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new mo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Jn=class extends Ic{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},go=class extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Pc=class extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var cn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==f||l!==p||h!==g){let m=1-a,d=c*f+l*p+h*g+u*_,v=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){let I=Math.sqrt(y),C=Math.atan2(I,d*v);m=Math.sin(m*C)/I,a=Math.sin(a*C)/I}let x=a*v;if(c=c*m+f*x,l=l*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-a){let I=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=I,l*=I,h*=I,u*=I}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*f,e[t+1]=c*g+h*f+l*u-a*p,e[t+2]=l*g+h*p+a*f-c*u,e[t+3]=h*g-a*u-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"YZX":this._x=f*h*u+l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u-f*p*g;break;case"XZY":this._x=f*h*u-l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(jt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ma.copy(this).projectOnVector(e),this.sub(ma)}reflect(e){return this.sub(ma.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(jt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ma=new N,Nh=new cn,vn=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pr.copy(n.boundingBox)),Pr.applyMatrix4(e.matrixWorld),this.union(Pr)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),Lr.subVectors(this.max,qs),Ki.subVectors(e.a,qs),Ji.subVectors(e.b,qs),$i.subVectors(e.c,qs),oi.subVectors(Ji,Ki),ai.subVectors($i,Ji),Ei.subVectors(Ki,$i);let t=[0,-oi.z,oi.y,0,-ai.z,ai.y,0,-Ei.z,Ei.y,oi.z,0,-oi.x,ai.z,0,-ai.x,Ei.z,0,-Ei.x,-oi.y,oi.x,0,-ai.y,ai.x,0,-Ei.y,Ei.x,0];return!ga(t,Ki,Ji,$i,Lr)||(t=[1,0,0,0,1,0,0,0,1],!ga(t,Ki,Ji,$i,Lr))?!1:(Dr.crossVectors(oi,ai),t=[Dr.x,Dr.y,Dr.z],ga(t,Ki,Ji,$i,Lr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(On),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},On=[new N,new N,new N,new N,new N,new N,new N,new N],En=new N,Pr=new vn,Ki=new N,Ji=new N,$i=new N,oi=new N,ai=new N,Ei=new N,qs=new N,Lr=new N,Dr=new N,Ti=new N;function ga(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ti.fromArray(i,r);let a=s.x*Math.abs(Ti.x)+s.y*Math.abs(Ti.y)+s.z*Math.abs(Ti.z),c=e.dot(Ti),l=t.dot(Ti),h=n.dot(Ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var _p=new vn,Zs=new N,xa=new N,dn=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):_p.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zs.subVectors(e,this.center);let t=Zs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Zs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zs.copy(e.center).add(xa)),this.expandByPoint(Zs.copy(e.center).sub(xa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},zn=new N,_a=new N,Nr=new N,ci=new N,ya=new N,Ur=new N,va=new N,Rs=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zn.copy(this.origin).addScaledVector(this.direction,t),zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){_a.copy(e).add(t).multiplyScalar(.5),Nr.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(_a);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Nr),a=ci.dot(this.direction),c=-ci.dot(Nr),l=ci.lengthSq(),h=Math.abs(1-o*o),u,f,p,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let _=1/h;u*=_,f*=_,p=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(_a).addScaledVector(Nr,f),p}intersectSphere(e,t){zn.subVectors(e.center,this.origin);let n=zn.dot(this.direction),s=zn.dot(zn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,zn)!==null}intersectTriangle(e,t,n,s,r){ya.subVectors(t,e),Ur.subVectors(n,e),va.crossVectors(ya,Ur);let o=this.direction.dot(va),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,e);let c=a*this.direction.dot(Ur.crossVectors(ci,Ur));if(c<0)return null;let l=a*this.direction.dot(ya.cross(ci));if(l<0||c+l>o)return null;let h=-a*ci.dot(va);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},tt=class i{constructor(e,t,n,s,r,o,a,c,l,h,u,f,p,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,f,p,g,_,m)}set(e,t,n,s,r,o,a,c,l,h,u,f,p,g,_,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/ji.setFromMatrixColumn(e,0).length(),r=1/ji.setFromMatrixColumn(e,1).length(),o=1/ji.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*h,p=c*u,g=l*h,_=l*u;t[0]=f+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*h,p=c*u,g=l*h,_=l*u;t[0]=f-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=f*l+_,t[1]=c*u,t[5]=_*l+f,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-f*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=f-_*u}else if(e.order==="XZY"){let f=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yp,e,vp)}lookAt(e,t,n){let s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),li.crossVectors(n,un),li.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),li.crossVectors(n,un)),li.normalize(),Fr.crossVectors(un,li),s[0]=li.x,s[4]=Fr.x,s[8]=un.x,s[1]=li.y,s[5]=Fr.y,s[9]=un.y,s[2]=li.z,s[6]=Fr.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],v=n[3],y=n[7],x=n[11],I=n[15],C=s[0],R=s[4],P=s[8],T=s[12],b=s[1],D=s[5],V=s[9],G=s[13],Z=s[2],ne=s[6],J=s[10],le=s[14],q=s[3],me=s[7],Me=s[11],Ie=s[15];return r[0]=o*C+a*b+c*Z+l*q,r[4]=o*R+a*D+c*ne+l*me,r[8]=o*P+a*V+c*J+l*Me,r[12]=o*T+a*G+c*le+l*Ie,r[1]=h*C+u*b+f*Z+p*q,r[5]=h*R+u*D+f*ne+p*me,r[9]=h*P+u*V+f*J+p*Me,r[13]=h*T+u*G+f*le+p*Ie,r[2]=g*C+_*b+m*Z+d*q,r[6]=g*R+_*D+m*ne+d*me,r[10]=g*P+_*V+m*J+d*Me,r[14]=g*T+_*G+m*le+d*Ie,r[3]=v*C+y*b+x*Z+I*q,r[7]=v*R+y*D+x*ne+I*me,r[11]=v*P+y*V+x*J+I*Me,r[15]=v*T+y*G+x*le+I*Ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*p-n*c*p)+_*(+t*c*p-t*l*f+r*o*f-s*o*p+s*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+d*(-s*a*h-t*c*u+t*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],v=u*m*l-_*f*l+_*c*p-a*m*p-u*c*d+a*f*d,y=g*f*l-h*m*l-g*c*p+o*m*p+h*c*d-o*f*d,x=h*_*l-g*u*l+g*a*p-o*_*p-h*a*d+o*u*d,I=g*u*c-h*_*c-g*a*f+o*_*f+h*a*m-o*u*m,C=t*v+n*y+s*x+r*I;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/C;return e[0]=v*R,e[1]=(_*f*r-u*m*r-_*s*p+n*m*p+u*s*d-n*f*d)*R,e[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*d+n*c*d)*R,e[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*p-n*c*p)*R,e[4]=y*R,e[5]=(h*m*r-g*f*r+g*s*p-t*m*p-h*s*d+t*f*d)*R,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*d-t*c*d)*R,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*p+t*c*p)*R,e[8]=x*R,e[9]=(g*u*r-h*_*r-g*n*p+t*_*p+h*n*d-t*u*d)*R,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*d+t*a*d)*R,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*R,e[12]=I*R,e[13]=(h*_*s-g*u*s+g*n*f-t*_*f-h*n*m+t*u*m)*R,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*m-t*a*m)*R,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*f+t*a*f)*R,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,p=r*h,g=r*u,_=o*h,m=o*u,d=a*u,v=c*l,y=c*h,x=c*u,I=n.x,C=n.y,R=n.z;return s[0]=(1-(_+d))*I,s[1]=(p+x)*I,s[2]=(g-y)*I,s[3]=0,s[4]=(p-x)*C,s[5]=(1-(f+d))*C,s[6]=(m+v)*C,s[7]=0,s[8]=(g+y)*R,s[9]=(m-v)*R,s[10]=(1-(f+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=ji.set(s[0],s[1],s[2]).length(),o=ji.set(s[4],s[5],s[6]).length(),a=ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Tn.copy(this);let l=1/r,h=1/o,u=1/a;return Tn.elements[0]*=l,Tn.elements[1]*=l,Tn.elements[2]*=l,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=u,Tn.elements[9]*=u,Tn.elements[10]*=u,t.setFromRotationMatrix(Tn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Yn){let c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),p,g;if(a===Yn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===po)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Yn){let c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),f=(t+e)*l,p=(n+s)*h,g,_;if(a===Yn)g=(o+r)*u,_=-2*u;else if(a===po)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ji=new N,Tn=new tt,yp=new N(0,0,0),vp=new N(1,1,1),li=new N,Fr=new N,un=new N,Uh=new tt,Fh=new cn,In=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Uh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fh.setFromEuler(this),this.setFromQuaternion(Fh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};In.DEFAULT_ORDER="XYZ";var xo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Mp=0,Oh=new N,Qi=new cn,Bn=new tt,Or=new N,Ks=new N,Sp=new N,bp=new cn,zh=new N(1,0,0),Bh=new N(0,1,0),kh=new N(0,0,1),Hh={type:"added"},Ep={type:"removed"},es={type:"childadded",child:null},Ma={type:"childremoved",child:null},vt=class i extends Kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new N,t=new In,n=new cn,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new tt},normalMatrix:{value:new st}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qi.setFromAxisAngle(e,t),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(e,t){return Qi.setFromAxisAngle(e,t),this.quaternion.premultiply(Qi),this}rotateX(e){return this.rotateOnAxis(zh,e)}rotateY(e){return this.rotateOnAxis(Bh,e)}rotateZ(e){return this.rotateOnAxis(kh,e)}translateOnAxis(e,t){return Oh.copy(e).applyQuaternion(this.quaternion),this.position.add(Oh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zh,e)}translateY(e){return this.translateOnAxis(Bh,e)}translateZ(e){return this.translateOnAxis(kh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Or.copy(e):Or.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(Ks,Or,this.up):Bn.lookAt(Or,Ks,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),Qi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hh),es.child=e,this.dispatchEvent(es),es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ep),Ma.child=e,this.dispatchEvent(Ma),Ma.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hh),es.child=e,this.dispatchEvent(es),es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,Sp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,bp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};vt.DEFAULT_UP=new N(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wn=new N,kn=new N,Sa=new N,Hn=new N,ts=new N,ns=new N,Vh=new N,ba=new N,Ea=new N,Ta=new N,wa=new dt,Aa=new dt,Ra=new dt,fi=class i{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),wn.subVectors(e,t),s.cross(wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){wn.subVectors(s,t),kn.subVectors(n,t),Sa.subVectors(e,t);let o=wn.dot(wn),a=wn.dot(kn),c=wn.dot(Sa),l=kn.dot(kn),h=kn.dot(Sa),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Hn.x),c.addScaledVector(o,Hn.y),c.addScaledVector(a,Hn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return wa.setScalar(0),Aa.setScalar(0),Ra.setScalar(0),wa.fromBufferAttribute(e,t),Aa.fromBufferAttribute(e,n),Ra.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(wa,r.x),o.addScaledVector(Aa,r.y),o.addScaledVector(Ra,r.z),o}static isFrontFacing(e,t,n,s){return wn.subVectors(n,t),kn.subVectors(e,t),wn.cross(kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),wn.cross(kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;ts.subVectors(s,n),ns.subVectors(r,n),ba.subVectors(e,n);let c=ts.dot(ba),l=ns.dot(ba);if(c<=0&&l<=0)return t.copy(n);Ea.subVectors(e,s);let h=ts.dot(Ea),u=ns.dot(Ea);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(ts,o);Ta.subVectors(e,r);let p=ts.dot(Ta),g=ns.dot(Ta);if(g>=0&&p<=g)return t.copy(r);let _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(ns,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Vh.subVectors(r,s),a=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(Vh,a);let d=1/(m+_+f);return o=_*d,a=f*d,t.copy(n).addScaledVector(ts,o).addScaledVector(ns,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ef={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},zr={h:0,s:0,l:0};function Ca(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ce=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,lt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=lt.workingColorSpace){if(e=gl(e,1),t=jt(t,0,1),n=jt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ca(o,r,e+1/3),this.g=Ca(o,r,e),this.b=Ca(o,r,e-1/3)}return lt.toWorkingColorSpace(this,s),this}setStyle(e,t=Ft){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){let n=ef[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return lt.fromWorkingColorSpace($t.copy(this),e),Math.round(jt($t.r*255,0,255))*65536+Math.round(jt($t.g*255,0,255))*256+Math.round(jt($t.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.fromWorkingColorSpace($t.copy(this),t);let n=$t.r,s=$t.g,r=$t.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=lt.workingColorSpace){return lt.fromWorkingColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Ft){lt.fromWorkingColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,s=$t.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(zr);let n=cr(hi.h,zr.h,t),s=cr(hi.s,zr.s,t),r=cr(hi.l,zr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ce;Ce.NAMES=ef;var Tp=0,Qt=class extends Kn{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=Cn(),this.name="",this.blending=gs,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xa,this.blendDst=Ya,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Th,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==Un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ya&&(n.blendDst=this.blendDst),this.blendEquation!==Pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Th&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Pt=class extends Qt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Ot=new N,Br=new Xe,Et=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rc,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Br.fromBufferAttribute(this,t),Br.applyMatrix3(e),this.setXY(t,Br.x,Br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix3(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=An(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=An(t,this.array)),t}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=An(t,this.array)),t}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=An(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=An(t,this.array)),t}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),s=yt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),s=yt(s,this.array),r=yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rc&&(e.usage=this.usage),e}};var _o=class extends Et{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var yo=class extends Et{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ht=class extends Et{constructor(e,t,n){super(new Float32Array(e),t,n)}},wp=0,_n=new tt,Ia=new vt,is=new N,fn=new vn,Js=new vn,Wt=new N,At=class i extends Kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qu(e)?yo:_o)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return Ia.lookAt(e),Ia.updateMatrix(),this.applyMatrix4(Ia.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ht(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Js.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(fn.min,Js.min),fn.expandByPoint(Wt),Wt.addVectors(fn.max,Js.max),fn.expandByPoint(Wt)):(fn.expandByPoint(Js.min),fn.expandByPoint(Js.max))}fn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Wt.fromBufferAttribute(a,l),c&&(is.fromBufferAttribute(e,l),Wt.add(is)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Et(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new N,c[P]=new N;let l=new N,h=new N,u=new N,f=new Xe,p=new Xe,g=new Xe,_=new N,m=new N;function d(P,T,b){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,b),f.fromBufferAttribute(r,P),p.fromBufferAttribute(r,T),g.fromBufferAttribute(r,b),h.sub(l),u.sub(l),p.sub(f),g.sub(f);let D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(D),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(D),a[P].add(_),a[T].add(_),a[b].add(_),c[P].add(m),c[T].add(m),c[b].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let P=0,T=v.length;P<T;++P){let b=v[P],D=b.start,V=b.count;for(let G=D,Z=D+V;G<Z;G+=3)d(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let y=new N,x=new N,I=new N,C=new N;function R(P){I.fromBufferAttribute(s,P),C.copy(I);let T=a[P];y.copy(T),y.sub(I.multiplyScalar(I.dot(T))).normalize(),x.crossVectors(C,T);let D=x.dot(c[P])<0?-1:1;o.setXYZW(P,y.x,y.y,y.z,D)}for(let P=0,T=v.length;P<T;++P){let b=v[P],D=b.start,V=b.count;for(let G=D,Z=D+V;G<Z;G+=3)R(e.getX(G+0)),R(e.getX(G+1)),R(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Et(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,h=new N,u=new N;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let d=0;d<h;d++)f[g++]=l[p++]}return new Et(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],p=e(f,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gh=new tt,wi=new Rs,kr=new dn,Wh=new N,Hr=new N,Vr=new N,Gr=new N,Pa=new N,Wr=new N,Xh=new N,Xr=new N,ze=class extends vt{constructor(e=new At,t=new Pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Wr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Pa.fromBufferAttribute(u,e),o?Wr.addScaledVector(Pa,h):Wr.addScaledVector(Pa.sub(t),h))}t.add(Wr)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(r),wi.copy(e.ray).recast(e.near),!(kr.containsPoint(wi.origin)===!1&&(wi.intersectSphere(kr,Wh)===null||wi.origin.distanceToSquared(Wh)>(e.far-e.near)**2))&&(Gh.copy(r).invert(),wi.copy(e.ray).applyMatrix4(Gh),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],d=o[m.materialIndex],v=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=v,I=y;x<I;x+=3){let C=a.getX(x),R=a.getX(x+1),P=a.getX(x+2);s=Yr(this,d,e,n,l,h,u,C,R,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){let v=a.getX(m),y=a.getX(m+1),x=a.getX(m+2);s=Yr(this,o,e,n,l,h,u,v,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],d=o[m.materialIndex],v=Math.max(m.start,p.start),y=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=v,I=y;x<I;x+=3){let C=x,R=x+1,P=x+2;s=Yr(this,d,e,n,l,h,u,C,R,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){let v=m,y=m+1,x=m+2;s=Yr(this,o,e,n,l,h,u,v,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Ap(i,e,t,n,s,r,o,a){let c;if(e.side===Xt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Un,a),c===null)return null;Xr.copy(a),Xr.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Xr);return l<t.near||l>t.far?null:{distance:l,point:Xr.clone(),object:i}}function Yr(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Hr),i.getVertexPosition(c,Vr),i.getVertexPosition(l,Gr);let h=Ap(i,e,t,n,Hr,Vr,Gr,Xh);if(h){let u=new N;fi.getBarycoord(Xh,Hr,Vr,Gr,u),s&&(h.uv=fi.getInterpolatedAttribute(s,a,c,l,u,new Xe)),r&&(h.uv1=fi.getInterpolatedAttribute(r,a,c,l,u,new Xe)),o&&(h.normal=fi.getInterpolatedAttribute(o,a,c,l,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new N,materialIndex:0};fi.getNormal(Hr,Vr,Gr,f.normal),h.face=f,h.barycoord=u}return h}var pn=class i extends At{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(u,2));function g(_,m,d,v,y,x,I,C,R,P,T){let b=x/R,D=I/P,V=x/2,G=I/2,Z=C/2,ne=R+1,J=P+1,le=0,q=0,me=new N;for(let Me=0;Me<J;Me++){let Ie=Me*D-G;for(let Qe=0;Qe<ne;Qe++){let de=Qe*b-V;me[_]=de*v,me[m]=Ie*y,me[d]=Z,l.push(me.x,me.y,me.z),me[_]=0,me[m]=0,me[d]=C>0?1:-1,h.push(me.x,me.y,me.z),u.push(Qe/R),u.push(1-Me/P),le+=1}}for(let Me=0;Me<P;Me++)for(let Ie=0;Ie<R;Ie++){let Qe=f+Ie+ne*Me,de=f+Ie+ne*(Me+1),k=f+(Ie+1)+ne*(Me+1),j=f+(Ie+1)+ne*Me;c.push(Qe,de,j),c.push(de,k,j),q+=6}a.addGroup(p,q,T),p+=q,f+=le}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Cs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function sn(i){let e={};for(let t=0;t<i.length;t++){let n=Cs(i[t]);for(let s in n)e[s]=n[s]}return e}function Rp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function tf(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}var Cp={clone:Cs,merge:sn},Ip=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,rn=class extends Qt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ip,this.fragmentShader=Pp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cs(e.uniforms),this.uniformsGroups=Rp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},vo=class extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=Yn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ui=new N,Yh=new Xe,qh=new Xe,zt=class extends vo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=As*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return As*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ui.x,ui.y).multiplyScalar(-e/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-e/ui.z)}getViewSize(e,t){return this.getViewBounds(e,Yh,qh),t.subVectors(qh,Yh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ar*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ss=-90,rs=1,Lc=class extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new zt(ss,rs,e,t);s.layers=this.layers,this.add(s);let r=new zt(ss,rs,e,t);r.layers=this.layers,this.add(r);let o=new zt(ss,rs,e,t);o.layers=this.layers,this.add(o);let a=new zt(ss,rs,e,t);a.layers=this.layers,this.add(a);let c=new zt(ss,rs,e,t);c.layers=this.layers,this.add(c);let l=new zt(ss,rs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Yn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===po)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Mo=class extends Yt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Ms,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dc=class extends Jn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Mo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:an}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new pn(5,5,5),r=new rn({name:"CubemapFromEquirect",uniforms:Cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:pi});r.uniforms.tEquirect.value=t;let o=new ze(s,r),a=t.minFilter;return t.minFilter===Nn&&(t.minFilter=an),new Lc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},La=new N,Lp=new N,Dp=new st,Wn=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=La.subVectors(n,t).cross(Lp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(La),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Dp.getNormalMatrix(e),s=this.coplanarPoint(La).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ai=new dn,qr=new N,dr=class{constructor(e=new Wn,t=new Wn,n=new Wn,s=new Wn,r=new Wn,o=new Wn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yn){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],_=s[10],m=s[11],d=s[12],v=s[13],y=s[14],x=s[15];if(n[0].setComponents(c-r,f-l,m-p,x-d).normalize(),n[1].setComponents(c+r,f+l,m+p,x+d).normalize(),n[2].setComponents(c+o,f+h,m+g,x+v).normalize(),n[3].setComponents(c-o,f-h,m-g,x-v).normalize(),n[4].setComponents(c-a,f-u,m-_,x-y).normalize(),t===Yn)n[5].setComponents(c+a,f+u,m+_,x+y).normalize();else if(t===po)n[5].setComponents(a,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){return Ai.center.set(0,0,0),Ai.radius=.7071067811865476,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(qr.x=s.normal.x>0?e.max.x:e.min.x,qr.y=s.normal.y>0?e.max.y:e.min.y,qr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(qr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function nf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Np(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){let g=u[f],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){let _=u[p];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var gi=class i extends At{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){let v=d*f-o;for(let y=0;y<l;y++){let x=y*u-r;g.push(x,-v,0),_.push(0,0,1),m.push(y/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<a;v++){let y=v+l*d,x=v+l*(d+1),I=v+1+l*(d+1),C=v+1+l*d;p.push(y,x,C),p.push(x,I,C)}this.setIndex(p),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Up=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Op=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Vp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Wp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Kp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,em=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,im=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,sm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,om=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,am=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,um="gl_FragColor = linearToOutputTexel( gl_FragColor );",fm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,pm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,gm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_m=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ym=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Em=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Am=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Rm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Im=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Dm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Um=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Fm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Om=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,km=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ym=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Km=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$m=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ig=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ag=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ug=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_g=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,vg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ag=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ug=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Og=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Vg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Gg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Kg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$g=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,t0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,n0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,r0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,a0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,l0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,h0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,f0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,d0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rt={alphahash_fragment:Up,alphahash_pars_fragment:Fp,alphamap_fragment:Op,alphamap_pars_fragment:zp,alphatest_fragment:Bp,alphatest_pars_fragment:kp,aomap_fragment:Hp,aomap_pars_fragment:Vp,batching_pars_vertex:Gp,batching_vertex:Wp,begin_vertex:Xp,beginnormal_vertex:Yp,bsdfs:qp,iridescence_fragment:Zp,bumpmap_pars_fragment:Kp,clipping_planes_fragment:Jp,clipping_planes_pars_fragment:$p,clipping_planes_pars_vertex:jp,clipping_planes_vertex:Qp,color_fragment:em,color_pars_fragment:tm,color_pars_vertex:nm,color_vertex:im,common:sm,cube_uv_reflection_fragment:rm,defaultnormal_vertex:om,displacementmap_pars_vertex:am,displacementmap_vertex:cm,emissivemap_fragment:lm,emissivemap_pars_fragment:hm,colorspace_fragment:um,colorspace_pars_fragment:fm,envmap_fragment:dm,envmap_common_pars_fragment:pm,envmap_pars_fragment:mm,envmap_pars_vertex:gm,envmap_physical_pars_fragment:Am,envmap_vertex:xm,fog_vertex:_m,fog_pars_vertex:ym,fog_fragment:vm,fog_pars_fragment:Mm,gradientmap_pars_fragment:Sm,lightmap_pars_fragment:bm,lights_lambert_fragment:Em,lights_lambert_pars_fragment:Tm,lights_pars_begin:wm,lights_toon_fragment:Rm,lights_toon_pars_fragment:Cm,lights_phong_fragment:Im,lights_phong_pars_fragment:Pm,lights_physical_fragment:Lm,lights_physical_pars_fragment:Dm,lights_fragment_begin:Nm,lights_fragment_maps:Um,lights_fragment_end:Fm,logdepthbuf_fragment:Om,logdepthbuf_pars_fragment:zm,logdepthbuf_pars_vertex:Bm,logdepthbuf_vertex:km,map_fragment:Hm,map_pars_fragment:Vm,map_particle_fragment:Gm,map_particle_pars_fragment:Wm,metalnessmap_fragment:Xm,metalnessmap_pars_fragment:Ym,morphinstance_vertex:qm,morphcolor_vertex:Zm,morphnormal_vertex:Km,morphtarget_pars_vertex:Jm,morphtarget_vertex:$m,normal_fragment_begin:jm,normal_fragment_maps:Qm,normal_pars_fragment:eg,normal_pars_vertex:tg,normal_vertex:ng,normalmap_pars_fragment:ig,clearcoat_normal_fragment_begin:sg,clearcoat_normal_fragment_maps:rg,clearcoat_pars_fragment:og,iridescence_pars_fragment:ag,opaque_fragment:cg,packing:lg,premultiplied_alpha_fragment:hg,project_vertex:ug,dithering_fragment:fg,dithering_pars_fragment:dg,roughnessmap_fragment:pg,roughnessmap_pars_fragment:mg,shadowmap_pars_fragment:gg,shadowmap_pars_vertex:xg,shadowmap_vertex:_g,shadowmask_pars_fragment:yg,skinbase_vertex:vg,skinning_pars_vertex:Mg,skinning_vertex:Sg,skinnormal_vertex:bg,specularmap_fragment:Eg,specularmap_pars_fragment:Tg,tonemapping_fragment:wg,tonemapping_pars_fragment:Ag,transmission_fragment:Rg,transmission_pars_fragment:Cg,uv_pars_fragment:Ig,uv_pars_vertex:Pg,uv_vertex:Lg,worldpos_vertex:Dg,background_vert:Ng,background_frag:Ug,backgroundCube_vert:Fg,backgroundCube_frag:Og,cube_vert:zg,cube_frag:Bg,depth_vert:kg,depth_frag:Hg,distanceRGBA_vert:Vg,distanceRGBA_frag:Gg,equirect_vert:Wg,equirect_frag:Xg,linedashed_vert:Yg,linedashed_frag:qg,meshbasic_vert:Zg,meshbasic_frag:Kg,meshlambert_vert:Jg,meshlambert_frag:$g,meshmatcap_vert:jg,meshmatcap_frag:Qg,meshnormal_vert:e0,meshnormal_frag:t0,meshphong_vert:n0,meshphong_frag:i0,meshphysical_vert:s0,meshphysical_frag:r0,meshtoon_vert:o0,meshtoon_frag:a0,points_vert:c0,points_frag:l0,shadow_vert:h0,shadow_frag:u0,sprite_vert:f0,sprite_frag:d0},ve={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Ln={basic:{uniforms:sn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:sn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Ce(0)}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:sn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:sn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:sn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new Ce(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:sn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:sn([ve.points,ve.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:sn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:sn([ve.common,ve.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:sn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:sn([ve.sprite,ve.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distanceRGBA:{uniforms:sn([ve.common,ve.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distanceRGBA_vert,fragmentShader:rt.distanceRGBA_frag},shadow:{uniforms:sn([ve.lights,ve.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};Ln.physical={uniforms:sn([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var Zr={r:0,b:0,g:0},Ri=new In,p0=new tt;function m0(i,e,t,n,s,r,o){let a=new Ce(0),c=r===!0?0:1,l,h,u=null,f=0,p=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function _(v){let y=!1,x=g(v);x===null?d(a,c):x&&x.isColor&&(d(x,1),y=!0);let I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,y){let x=g(y);x&&(x.isCubeTexture||x.mapping===Wo)?(h===void 0&&(h=new ze(new pn(1,1,1),new rn({name:"BackgroundCubeMaterial",uniforms:Cs(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ri.copy(y.backgroundRotation),Ri.x*=-1,Ri.y*=-1,Ri.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ri.y*=-1,Ri.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(p0.makeRotationFromEuler(Ri)),h.material.toneMapped=lt.getTransfer(x.colorSpace)!==bt,(u!==x||f!==x.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,p=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ze(new gi(2,2),new rn({name:"BackgroundMaterial",uniforms:Cs(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=lt.getTransfer(x.colorSpace)!==bt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,p=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function d(v,y){v.getRGB(Zr,tf(i)),n.buffers.color.setClear(Zr.r,Zr.g,Zr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),c=y,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,d(a,c)},render:_,addToRenderList:m}}function g0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(b,D,V,G,Z){let ne=!1,J=u(G,V,D);r!==J&&(r=J,l(r.object)),ne=p(b,G,V,Z),ne&&g(b,G,V,Z),Z!==null&&e.update(Z,i.ELEMENT_ARRAY_BUFFER),(ne||o)&&(o=!1,x(b,D,V,G),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function c(){return i.createVertexArray()}function l(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function u(b,D,V){let G=V.wireframe===!0,Z=n[b.id];Z===void 0&&(Z={},n[b.id]=Z);let ne=Z[D.id];ne===void 0&&(ne={},Z[D.id]=ne);let J=ne[G];return J===void 0&&(J=f(c()),ne[G]=J),J}function f(b){let D=[],V=[],G=[];for(let Z=0;Z<t;Z++)D[Z]=0,V[Z]=0,G[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:V,attributeDivisors:G,object:b,attributes:{},index:null}}function p(b,D,V,G){let Z=r.attributes,ne=D.attributes,J=0,le=V.getAttributes();for(let q in le)if(le[q].location>=0){let Me=Z[q],Ie=ne[q];if(Ie===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(Ie=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(Ie=b.instanceColor)),Me===void 0||Me.attribute!==Ie||Ie&&Me.data!==Ie.data)return!0;J++}return r.attributesNum!==J||r.index!==G}function g(b,D,V,G){let Z={},ne=D.attributes,J=0,le=V.getAttributes();for(let q in le)if(le[q].location>=0){let Me=ne[q];Me===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(Me=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(Me=b.instanceColor));let Ie={};Ie.attribute=Me,Me&&Me.data&&(Ie.data=Me.data),Z[q]=Ie,J++}r.attributes=Z,r.attributesNum=J,r.index=G}function _(){let b=r.newAttributes;for(let D=0,V=b.length;D<V;D++)b[D]=0}function m(b){d(b,0)}function d(b,D){let V=r.newAttributes,G=r.enabledAttributes,Z=r.attributeDivisors;V[b]=1,G[b]===0&&(i.enableVertexAttribArray(b),G[b]=1),Z[b]!==D&&(i.vertexAttribDivisor(b,D),Z[b]=D)}function v(){let b=r.newAttributes,D=r.enabledAttributes;for(let V=0,G=D.length;V<G;V++)D[V]!==b[V]&&(i.disableVertexAttribArray(V),D[V]=0)}function y(b,D,V,G,Z,ne,J){J===!0?i.vertexAttribIPointer(b,D,V,Z,ne):i.vertexAttribPointer(b,D,V,G,Z,ne)}function x(b,D,V,G){_();let Z=G.attributes,ne=V.getAttributes(),J=D.defaultAttributeValues;for(let le in ne){let q=ne[le];if(q.location>=0){let me=Z[le];if(me===void 0&&(le==="instanceMatrix"&&b.instanceMatrix&&(me=b.instanceMatrix),le==="instanceColor"&&b.instanceColor&&(me=b.instanceColor)),me!==void 0){let Me=me.normalized,Ie=me.itemSize,Qe=e.get(me);if(Qe===void 0)continue;let de=Qe.buffer,k=Qe.type,j=Qe.bytesPerElement,re=k===i.INT||k===i.UNSIGNED_INT||me.gpuType===cl;if(me.isInterleavedBufferAttribute){let he=me.data,Pe=he.stride,Le=me.offset;if(he.isInstancedInterleavedBuffer){for(let ke=0;ke<q.locationSize;ke++)d(q.location+ke,he.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let ke=0;ke<q.locationSize;ke++)m(q.location+ke);i.bindBuffer(i.ARRAY_BUFFER,de);for(let ke=0;ke<q.locationSize;ke++)y(q.location+ke,Ie/q.locationSize,k,Me,Pe*j,(Le+Ie/q.locationSize*ke)*j,re)}else{if(me.isInstancedBufferAttribute){for(let he=0;he<q.locationSize;he++)d(q.location+he,me.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let he=0;he<q.locationSize;he++)m(q.location+he);i.bindBuffer(i.ARRAY_BUFFER,de);for(let he=0;he<q.locationSize;he++)y(q.location+he,Ie/q.locationSize,k,Me,Ie*j,Ie/q.locationSize*he*j,re)}}else if(J!==void 0){let Me=J[le];if(Me!==void 0)switch(Me.length){case 2:i.vertexAttrib2fv(q.location,Me);break;case 3:i.vertexAttrib3fv(q.location,Me);break;case 4:i.vertexAttrib4fv(q.location,Me);break;default:i.vertexAttrib1fv(q.location,Me)}}}}v()}function I(){P();for(let b in n){let D=n[b];for(let V in D){let G=D[V];for(let Z in G)h(G[Z].object),delete G[Z];delete D[V]}delete n[b]}}function C(b){if(n[b.id]===void 0)return;let D=n[b.id];for(let V in D){let G=D[V];for(let Z in G)h(G[Z].object),delete G[Z];delete D[V]}delete n[b.id]}function R(b){for(let D in n){let V=n[D];if(V[b.id]===void 0)continue;let G=V[b.id];for(let Z in G)h(G[Z].object),delete G[Z];delete V[b.id]}}function P(){T(),o=!0,r!==s&&(r=s,l(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:T,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function x0(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function c(l,h,u,f){if(u===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function _0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==yn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let P=R===vr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Zn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Rn&&!P)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:I,maxSamples:C}}function y0(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Wn,a=new st,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let v=r?0:n,y=v*4,x=d.clippingState||null;c.value=x,x=h(g,f,y,p);for(let I=0;I!==y;++I)x[I]=t[I];d.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,p,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let d=p+_*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<d)&&(m=new Float32Array(d));for(let y=0,x=p;y!==_;++y,x+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function v0(i){let e=new WeakMap;function t(o,a){return a===ec?o.mapping=Ms:a===tc&&(o.mapping=Ss),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ec||a===tc)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Dc(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Is=class extends vo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ms=4,Zh=[.125,.215,.35,.446,.526,.582],Li=20,Da=new Is,Kh=new Ce,Na=null,Ua=0,Fa=0,Oa=!1,Ii=(1+Math.sqrt(5))/2,os=1/Ii,Jh=[new N(-Ii,os,0),new N(Ii,os,0),new N(-os,0,Ii),new N(os,0,Ii),new N(0,Ii,-os),new N(0,Ii,os),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],So=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Na=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Na,Ua,Fa),this._renderer.xr.enabled=Oa,e.scissorTest=!1,Kr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ms||e.mapping===Ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Na=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:vr,format:yn,colorSpace:Zt,depthBuffer:!1},s=$h(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$h(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=M0(r)),this._blurMaterial=S0(r,e,t)}return s}_compileMaterial(e){let t=new ze(this._lodPlanes[0],e);this._renderer.compile(t,Da)}_sceneToCubeUV(e,t,n,s){let a=new zt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Kh),h.toneMapping=mi,h.autoClear=!1;let p=new Pt({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),g=new ze(new pn,p),_=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Kh),_=!0);for(let d=0;d<6;d++){let v=d%3;v===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):v===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));let y=this._cubeSize;Kr(s,v*y,d>2?y:0,y,y),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ms||e.mapping===Ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jh());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ze(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Kr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Da)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Jh[(s-r-1)%Jh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ze(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Li-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Li;m>Li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Li}`);let d=[],v=0;for(let R=0;R<Li;++R){let P=R/_,T=Math.exp(-P*P/2);d.push(T),R===0?v+=T:R<m&&(v+=2*T)}for(let R=0;R<d.length;R++)d[R]=d[R]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;let x=this._sizeLods[s],I=3*x*(s>y-ms?s-y+ms:0),C=4*(this._cubeSize-x);Kr(t,I,C,3*x,2*x),c.setRenderTarget(t),c.render(u,Da)}};function M0(i){let e=[],t=[],n=[],s=i,r=i-ms+1+Zh.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-ms?c=Zh[o-i+ms-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,d=1,v=new Float32Array(_*g*p),y=new Float32Array(m*g*p),x=new Float32Array(d*g*p);for(let C=0;C<p;C++){let R=C%3*2/3-1,P=C>2?0:-1,T=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];v.set(T,_*g*C),y.set(f,m*g*C);let b=[C,C,C,C,C,C];x.set(b,d*g*C)}let I=new At;I.setAttribute("position",new Et(v,_)),I.setAttribute("uv",new Et(y,m)),I.setAttribute("faceIndex",new Et(x,d)),e.push(I),s>ms&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function $h(i,e,t){let n=new Jn(i,e,t);return n.texture.mapping=Wo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Kr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function S0(i,e,t){let n=new Float32Array(Li),s=new N(0,1,0);return new rn({name:"SphericalGaussianBlur",defines:{n:Li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function jh(){return new rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function Qh(){return new rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function xl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function b0(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===ec||c===tc,h=c===Ms||c===Ss;if(l||h){let u=e.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new So(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new So(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function E0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&sr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function T0(i,e,t,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)e.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)e.update(f[g],i.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let _=p[g];for(let m=0,d=_.length;m<d;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(u){let f=[],p=u.index,g=u.attributes.position,_=0;if(p!==null){let v=p.array;_=p.version;for(let y=0,x=v.length;y<x;y+=3){let I=v[y+0],C=v[y+1],R=v[y+2];f.push(I,C,C,R,R,I)}}else if(g!==void 0){let v=g.array;_=g.version;for(let y=0,x=v.length/3-1;y<x;y+=3){let I=y+0,C=y+1,R=y+2;f.push(I,C,C,R,R,I)}}else return;let m=new(Qu(f)?yo:_o)(f,1);m.version=_;let d=r.get(u);d&&e.remove(d),r.set(u,m)}function h(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function w0(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function l(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*o,g),t.update(p,n,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,n,1)}function u(f,p,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,_,0,g);let d=0;for(let v=0;v<g;v++)d+=p[v]*_[v];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function A0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function R0(i,e,t){let n=new WeakMap,s=new dt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let T=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;p===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let x=a.attributes.position.count*y,I=1;x>e.maxTextureSize&&(I=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let C=new Float32Array(x*I*4*u),R=new go(C,x,I,u);R.type=Rn,R.needsUpdate=!0;let P=y*4;for(let b=0;b<u;b++){let D=m[b],V=d[b],G=v[b],Z=x*I*4*b;for(let ne=0;ne<D.count;ne++){let J=ne*P;p===!0&&(s.fromBufferAttribute(D,ne),C[Z+J+0]=s.x,C[Z+J+1]=s.y,C[Z+J+2]=s.z,C[Z+J+3]=0),g===!0&&(s.fromBufferAttribute(V,ne),C[Z+J+4]=s.x,C[Z+J+5]=s.y,C[Z+J+6]=s.z,C[Z+J+7]=0),_===!0&&(s.fromBufferAttribute(G,ne),C[Z+J+8]=s.x,C[Z+J+9]=s.y,C[Z+J+10]=s.z,C[Z+J+11]=G.itemSize===4?s.w:1)}}f={count:u,texture:R,size:new Xe(x,I)},n.set(a,f),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];let g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function C0(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var bo=class extends Yt{constructor(e,t,n,s,r,o,a,c,l,h=xs){if(h!==xs&&h!==Es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===xs&&(n=Ni),n===void 0&&h===Es&&(n=bs),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:kt,this.minFilter=c!==void 0?c:kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},sf=new Yt,eu=new bo(1,1),rf=new go,of=new Pc,af=new Mo,tu=[],nu=[],iu=new Float32Array(16),su=new Float32Array(9),ru=new Float32Array(4);function Vs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=tu[s];if(r===void 0&&(r=new Float32Array(s),tu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Zo(i,e){let t=nu[e];t===void 0&&(t=new Int32Array(e),nu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function I0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function P0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function L0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function D0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function N0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;ru.set(n),i.uniformMatrix2fv(this.addr,!1,ru),Vt(t,n)}}function U0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;su.set(n),i.uniformMatrix3fv(this.addr,!1,su),Vt(t,n)}}function F0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;iu.set(n),i.uniformMatrix4fv(this.addr,!1,iu),Vt(t,n)}}function O0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function B0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function k0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function H0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function V0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function G0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function W0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function X0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(eu.compareFunction=Ju,r=eu):r=sf,t.setTexture2D(e||r,s)}function Y0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||of,s)}function q0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||af,s)}function Z0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||rf,s)}function K0(i){switch(i){case 5126:return I0;case 35664:return P0;case 35665:return L0;case 35666:return D0;case 35674:return N0;case 35675:return U0;case 35676:return F0;case 5124:case 35670:return O0;case 35667:case 35671:return z0;case 35668:case 35672:return B0;case 35669:case 35673:return k0;case 5125:return H0;case 36294:return V0;case 36295:return G0;case 36296:return W0;case 35678:case 36198:case 36298:case 36306:case 35682:return X0;case 35679:case 36299:case 36307:return Y0;case 35680:case 36300:case 36308:case 36293:return q0;case 36289:case 36303:case 36311:case 36292:return Z0}}function J0(i,e){i.uniform1fv(this.addr,e)}function $0(i,e){let t=Vs(e,this.size,2);i.uniform2fv(this.addr,t)}function j0(i,e){let t=Vs(e,this.size,3);i.uniform3fv(this.addr,t)}function Q0(i,e){let t=Vs(e,this.size,4);i.uniform4fv(this.addr,t)}function ex(i,e){let t=Vs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function tx(i,e){let t=Vs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nx(i,e){let t=Vs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ix(i,e){i.uniform1iv(this.addr,e)}function sx(i,e){i.uniform2iv(this.addr,e)}function rx(i,e){i.uniform3iv(this.addr,e)}function ox(i,e){i.uniform4iv(this.addr,e)}function ax(i,e){i.uniform1uiv(this.addr,e)}function cx(i,e){i.uniform2uiv(this.addr,e)}function lx(i,e){i.uniform3uiv(this.addr,e)}function hx(i,e){i.uniform4uiv(this.addr,e)}function ux(i,e,t){let n=this.cache,s=e.length,r=Zo(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||sf,r[o])}function fx(i,e,t){let n=this.cache,s=e.length,r=Zo(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||of,r[o])}function dx(i,e,t){let n=this.cache,s=e.length,r=Zo(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||af,r[o])}function px(i,e,t){let n=this.cache,s=e.length,r=Zo(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||rf,r[o])}function mx(i){switch(i){case 5126:return J0;case 35664:return $0;case 35665:return j0;case 35666:return Q0;case 35674:return ex;case 35675:return tx;case 35676:return nx;case 5124:case 35670:return ix;case 35667:case 35671:return sx;case 35668:case 35672:return rx;case 35669:case 35673:return ox;case 5125:return ax;case 36294:return cx;case 36295:return lx;case 36296:return hx;case 35678:case 36198:case 36298:case 36306:case 35682:return ux;case 35679:case 36299:case 36307:return fx;case 35680:case 36300:case 36308:case 36293:return dx;case 36289:case 36303:case 36311:case 36292:return px}}var Nc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=K0(t.type)}},Uc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mx(t.type)}},Fc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},za=/(\w+)(\])?(\[|\.)?/g;function ou(i,e){i.seq.push(e),i.map[e.id]=e}function gx(i,e,t){let n=i.name,s=n.length;for(za.lastIndex=0;;){let r=za.exec(n),o=za.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ou(t,l===void 0?new Nc(a,i,e):new Uc(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Fc(a),ou(t,u)),t=u}}}var ys=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);gx(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function au(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var xx=37297,_x=0;function yx(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var cu=new st;function vx(i){lt._getMatrix(cu,lt.workingColorSpace,i);let e=`mat3( ${cu.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(i)){case qo:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function lu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+yx(i.getShaderSource(e),o)}else return s}function Mx(i,e){let t=vx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Sx(i,e){let t;switch(e){case Cd:t="Linear";break;case Id:t="Reinhard";break;case Pd:t="Cineon";break;case ol:t="ACESFilmic";break;case Dd:t="AgX";break;case Nd:t="Neutral";break;case Ld:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Jr=new N;function bx(){lt.getLuminanceCoefficients(Jr);let i=Jr.x.toFixed(4),e=Jr.y.toFixed(4),t=Jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ex(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rr).join(`
`)}function Tx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function wx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function rr(i){return i!==""}function hu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ax=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oc(i){return i.replace(Ax,Cx)}var Rx=new Map;function Cx(i,e){let t=rt[e];if(t===void 0){let n=Rx.get(e);if(n!==void 0)t=rt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oc(t)}var Ix=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fu(i){return i.replace(Ix,Px)}function Px(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function du(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Lx(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===zu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===cd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function Dx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ms:case Ss:e="ENVMAP_TYPE_CUBE";break;case Wo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Nx(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ss:e="ENVMAP_MODE_REFRACTION";break}return e}function Ux(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case rl:e="ENVMAP_BLENDING_MULTIPLY";break;case Ad:e="ENVMAP_BLENDING_MIX";break;case Rd:e="ENVMAP_BLENDING_ADD";break}return e}function Fx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Ox(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Lx(t),l=Dx(t),h=Nx(t),u=Ux(t),f=Fx(t),p=Ex(t),g=Tx(r),_=s.createProgram(),m,d,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(rr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(rr).join(`
`),d.length>0&&(d+=`
`)):(m=[du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rr).join(`
`),d=[du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==mi?"#define TONE_MAPPING":"",t.toneMapping!==mi?rt.tonemapping_pars_fragment:"",t.toneMapping!==mi?Sx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,Mx("linearToOutputTexel",t.outputColorSpace),bx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(rr).join(`
`)),o=Oc(o),o=hu(o,t),o=uu(o,t),a=Oc(a),a=hu(a,t),a=uu(a,t),o=fu(o),a=fu(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===wh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let y=v+m+o,x=v+d+a,I=au(s,s.VERTEX_SHADER,y),C=au(s,s.FRAGMENT_SHADER,x);s.attachShader(_,I),s.attachShader(_,C),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(D){if(i.debug.checkShaderErrors){let V=s.getProgramInfoLog(_).trim(),G=s.getShaderInfoLog(I).trim(),Z=s.getShaderInfoLog(C).trim(),ne=!0,J=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,I,C);else{let le=lu(s,I,"vertex"),q=lu(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+V+`
`+le+`
`+q)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(G===""||Z==="")&&(J=!1);J&&(D.diagnostics={runnable:ne,programLog:V,vertexShader:{log:G,prefix:m},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(I),s.deleteShader(C),P=new ys(s,_),T=wx(s,_)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,xx)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_x++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=C,this}var zx=0,zc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Bc(e),t.set(e,n)),n}},Bc=class{constructor(e){this.id=zx++,this.code=e,this.usedTimes=0}};function Bx(i,e,t,n,s,r,o){let a=new xo,c=new zc,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return l.add(T),T===0?"uv":`uv${T}`}function m(T,b,D,V,G){let Z=V.fog,ne=G.geometry,J=T.isMeshStandardMaterial?V.environment:null,le=(T.isMeshStandardMaterial?t:e).get(T.envMap||J),q=le&&le.mapping===Wo?le.image.height:null,me=g[T.type];T.precision!==null&&(p=s.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));let Me=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,Ie=Me!==void 0?Me.length:0,Qe=0;ne.morphAttributes.position!==void 0&&(Qe=1),ne.morphAttributes.normal!==void 0&&(Qe=2),ne.morphAttributes.color!==void 0&&(Qe=3);let de,k,j,re;if(me){let w=Ln[me];de=w.vertexShader,k=w.fragmentShader}else de=T.vertexShader,k=T.fragmentShader,c.update(T),j=c.getVertexShaderID(T),re=c.getFragmentShaderID(T);let he=i.getRenderTarget(),Pe=i.state.buffers.depth.getReversed(),Le=G.isInstancedMesh===!0,ke=G.isBatchedMesh===!0,Ke=!!T.map,$e=!!T.matcap,L=!!le,S=!!T.aoMap,oe=!!T.lightMap,ue=!!T.bumpMap,fe=!!T.normalMap,ye=!!T.displacementMap,Je=!!T.emissiveMap,xe=!!T.metalnessMap,A=!!T.roughnessMap,M=T.anisotropy>0,B=T.clearcoat>0,te=T.dispersion>0,se=T.iridescence>0,$=T.sheen>0,De=T.transmission>0,ge=M&&!!T.anisotropyMap,Ae=B&&!!T.clearcoatMap,ct=B&&!!T.clearcoatNormalMap,ae=B&&!!T.clearcoatRoughnessMap,we=se&&!!T.iridescenceMap,We=se&&!!T.iridescenceThicknessMap,Ze=$&&!!T.sheenColorMap,Te=$&&!!T.sheenRoughnessMap,ot=!!T.specularMap,Re=!!T.specularColorMap,pt=!!T.specularIntensityMap,F=De&&!!T.transmissionMap,_e=De&&!!T.thicknessMap,K=!!T.gradientMap,ie=!!T.alphaMap,Se=T.alphaTest>0,be=!!T.alphaHash,et=!!T.extensions,It=mi;T.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(It=i.toneMapping);let Gt={shaderID:me,shaderType:T.type,shaderName:T.name,vertexShader:de,fragmentShader:k,defines:T.defines,customVertexShaderID:j,customFragmentShaderID:re,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:ke,batchingColor:ke&&G._colorsTexture!==null,instancing:Le,instancingColor:Le&&G.instanceColor!==null,instancingMorph:Le&&G.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Zt,alphaToCoverage:!!T.alphaToCoverage,map:Ke,matcap:$e,envMap:L,envMapMode:L&&le.mapping,envMapCubeUVHeight:q,aoMap:S,lightMap:oe,bumpMap:ue,normalMap:fe,displacementMap:f&&ye,emissiveMap:Je,normalMapObjectSpace:fe&&T.normalMapType===Vd,normalMapTangentSpace:fe&&T.normalMapType===Yo,metalnessMap:xe,roughnessMap:A,anisotropy:M,anisotropyMap:ge,clearcoat:B,clearcoatMap:Ae,clearcoatNormalMap:ct,clearcoatRoughnessMap:ae,dispersion:te,iridescence:se,iridescenceMap:we,iridescenceThicknessMap:We,sheen:$,sheenColorMap:Ze,sheenRoughnessMap:Te,specularMap:ot,specularColorMap:Re,specularIntensityMap:pt,transmission:De,transmissionMap:F,thicknessMap:_e,gradientMap:K,opaque:T.transparent===!1&&T.blending===gs&&T.alphaToCoverage===!1,alphaMap:ie,alphaTest:Se,alphaHash:be,combine:T.combine,mapUv:Ke&&_(T.map.channel),aoMapUv:S&&_(T.aoMap.channel),lightMapUv:oe&&_(T.lightMap.channel),bumpMapUv:ue&&_(T.bumpMap.channel),normalMapUv:fe&&_(T.normalMap.channel),displacementMapUv:ye&&_(T.displacementMap.channel),emissiveMapUv:Je&&_(T.emissiveMap.channel),metalnessMapUv:xe&&_(T.metalnessMap.channel),roughnessMapUv:A&&_(T.roughnessMap.channel),anisotropyMapUv:ge&&_(T.anisotropyMap.channel),clearcoatMapUv:Ae&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:ct&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:We&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ze&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Te&&_(T.sheenRoughnessMap.channel),specularMapUv:ot&&_(T.specularMap.channel),specularColorMapUv:Re&&_(T.specularColorMap.channel),specularIntensityMapUv:pt&&_(T.specularIntensityMap.channel),transmissionMapUv:F&&_(T.transmissionMap.channel),thicknessMapUv:_e&&_(T.thicknessMap.channel),alphaMapUv:ie&&_(T.alphaMap.channel),vertexTangents:!!ne.attributes.tangent&&(fe||M),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!ne.attributes.uv&&(Ke||ie),fog:!!Z,useFog:T.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Pe,skinning:G.isSkinnedMesh===!0,morphTargets:ne.morphAttributes.position!==void 0,morphNormals:ne.morphAttributes.normal!==void 0,morphColors:ne.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:Qe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:Ke&&T.map.isVideoTexture===!0&&lt.getTransfer(T.map.colorSpace)===bt,decodeVideoTextureEmissive:Je&&T.emissiveMap.isVideoTexture===!0&&lt.getTransfer(T.emissiveMap.colorSpace)===bt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Lt,flipSided:T.side===Xt,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:et&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(et&&T.extensions.multiDraw===!0||ke)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Gt.vertexUv1s=l.has(1),Gt.vertexUv2s=l.has(2),Gt.vertexUv3s=l.has(3),l.clear(),Gt}function d(T){let b=[];if(T.shaderID?b.push(T.shaderID):(b.push(T.customVertexShaderID),b.push(T.customFragmentShaderID)),T.defines!==void 0)for(let D in T.defines)b.push(D),b.push(T.defines[D]);return T.isRawShaderMaterial===!1&&(v(b,T),y(b,T),b.push(i.outputColorSpace)),b.push(T.customProgramCacheKey),b.join()}function v(T,b){T.push(b.precision),T.push(b.outputColorSpace),T.push(b.envMapMode),T.push(b.envMapCubeUVHeight),T.push(b.mapUv),T.push(b.alphaMapUv),T.push(b.lightMapUv),T.push(b.aoMapUv),T.push(b.bumpMapUv),T.push(b.normalMapUv),T.push(b.displacementMapUv),T.push(b.emissiveMapUv),T.push(b.metalnessMapUv),T.push(b.roughnessMapUv),T.push(b.anisotropyMapUv),T.push(b.clearcoatMapUv),T.push(b.clearcoatNormalMapUv),T.push(b.clearcoatRoughnessMapUv),T.push(b.iridescenceMapUv),T.push(b.iridescenceThicknessMapUv),T.push(b.sheenColorMapUv),T.push(b.sheenRoughnessMapUv),T.push(b.specularMapUv),T.push(b.specularColorMapUv),T.push(b.specularIntensityMapUv),T.push(b.transmissionMapUv),T.push(b.thicknessMapUv),T.push(b.combine),T.push(b.fogExp2),T.push(b.sizeAttenuation),T.push(b.morphTargetsCount),T.push(b.morphAttributeCount),T.push(b.numDirLights),T.push(b.numPointLights),T.push(b.numSpotLights),T.push(b.numSpotLightMaps),T.push(b.numHemiLights),T.push(b.numRectAreaLights),T.push(b.numDirLightShadows),T.push(b.numPointLightShadows),T.push(b.numSpotLightShadows),T.push(b.numSpotLightShadowsWithMaps),T.push(b.numLightProbes),T.push(b.shadowMapType),T.push(b.toneMapping),T.push(b.numClippingPlanes),T.push(b.numClipIntersection),T.push(b.depthPacking)}function y(T,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),T.push(a.mask)}function x(T){let b=g[T.type],D;if(b){let V=Ln[b];D=Cp.clone(V.uniforms)}else D=T.uniforms;return D}function I(T,b){let D;for(let V=0,G=h.length;V<G;V++){let Z=h[V];if(Z.cacheKey===b){D=Z,++D.usedTimes;break}}return D===void 0&&(D=new Ox(i,b,T,r),h.push(D)),D}function C(T){if(--T.usedTimes===0){let b=h.indexOf(T);h[b]=h[h.length-1],h.pop(),T.destroy()}}function R(T){c.remove(T)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:I,releaseProgram:C,releaseShaderCache:R,programs:h,dispose:P}}function kx(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Hx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function pu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function mu(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,p,g,_,m){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=m),e++,d}function a(u,f,p,g,_,m){let d=o(u,f,p,g,_,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):t.push(d)}function c(u,f,p,g,_,m){let d=o(u,f,p,g,_,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||Hx),n.length>1&&n.sort(f||pu),s.length>1&&s.sort(f||pu)}function h(){for(let u=e,f=i.length;u<f;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Vx(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new mu,i.set(n,[o])):s>=r.length?(o=new mu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Gx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Ce};break;case"SpotLight":t={position:new N,direction:new N,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function Wx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Xx=0;function Yx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function qx(i){let e=new Gx,t=Wx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let s=new N,r=new tt,o=new tt;function a(l){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,v=0,y=0,x=0,I=0,C=0,R=0;l.sort(Yx);for(let T=0,b=l.length;T<b;T++){let D=l[T],V=D.color,G=D.intensity,Z=D.distance,ne=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=V.r*G,u+=V.g*G,f+=V.b*G;else if(D.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(D.sh.coefficients[J],G);R++}else if(D.isDirectionalLight){let J=e.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let le=D.shadow,q=t.get(D);q.shadowIntensity=le.intensity,q.shadowBias=le.bias,q.shadowNormalBias=le.normalBias,q.shadowRadius=le.radius,q.shadowMapSize=le.mapSize,n.directionalShadow[p]=q,n.directionalShadowMap[p]=ne,n.directionalShadowMatrix[p]=D.shadow.matrix,v++}n.directional[p]=J,p++}else if(D.isSpotLight){let J=e.get(D);J.position.setFromMatrixPosition(D.matrixWorld),J.color.copy(V).multiplyScalar(G),J.distance=Z,J.coneCos=Math.cos(D.angle),J.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),J.decay=D.decay,n.spot[_]=J;let le=D.shadow;if(D.map&&(n.spotLightMap[I]=D.map,I++,le.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[_]=le.matrix,D.castShadow){let q=t.get(D);q.shadowIntensity=le.intensity,q.shadowBias=le.bias,q.shadowNormalBias=le.normalBias,q.shadowRadius=le.radius,q.shadowMapSize=le.mapSize,n.spotShadow[_]=q,n.spotShadowMap[_]=ne,x++}_++}else if(D.isRectAreaLight){let J=e.get(D);J.color.copy(V).multiplyScalar(G),J.halfWidth.set(D.width*.5,0,0),J.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=J,m++}else if(D.isPointLight){let J=e.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity),J.distance=D.distance,J.decay=D.decay,D.castShadow){let le=D.shadow,q=t.get(D);q.shadowIntensity=le.intensity,q.shadowBias=le.bias,q.shadowNormalBias=le.normalBias,q.shadowRadius=le.radius,q.shadowMapSize=le.mapSize,q.shadowCameraNear=le.camera.near,q.shadowCameraFar=le.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=ne,n.pointShadowMatrix[g]=D.shadow.matrix,y++}n.point[g]=J,g++}else if(D.isHemisphereLight){let J=e.get(D);J.skyColor.copy(D.color).multiplyScalar(G),J.groundColor.copy(D.groundColor).multiplyScalar(G),n.hemi[d]=J,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let P=n.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==d||P.numDirectionalShadows!==v||P.numPointShadows!==y||P.numSpotShadows!==x||P.numSpotMaps!==I||P.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+I-C,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,P.directionalLength=p,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=d,P.numDirectionalShadows=v,P.numPointShadows=y,P.numSpotShadows=x,P.numSpotMaps=I,P.numLightProbes=R,n.version=Xx++)}function c(l,h){let u=0,f=0,p=0,g=0,_=0,m=h.matrixWorldInverse;for(let d=0,v=l.length;d<v;d++){let y=l[d];if(y.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(y.isSpotLight){let x=n.spot[p];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(y.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let x=n.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function gu(i){let e=new qx(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Zx(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new gu(i),e.set(s,[a])):r>=o.length?(a=new gu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var kc=class extends Qt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=kd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Hc=class extends Qt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Kx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function $x(i,e,t){let n=new dr,s=new Xe,r=new Xe,o=new dt,a=new kc({depthPacking:Hd}),c=new Hc,l={},h=t.maxTextureSize,u={[Un]:Xt,[Xt]:Un,[Lt]:Lt},f=new rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:Kx,fragmentShader:Jx}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new At;g.setAttribute("position",new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ze(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zu;let d=this.type;this.render=function(C,R,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let T=i.getRenderTarget(),b=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),V=i.state;V.setBlending(pi),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let G=d!==Gn&&this.type===Gn,Z=d===Gn&&this.type!==Gn;for(let ne=0,J=C.length;ne<J;ne++){let le=C[ne],q=le.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",le,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let me=q.getFrameExtents();if(s.multiply(me),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/me.x),s.x=r.x*me.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/me.y),s.y=r.y*me.y,q.mapSize.y=r.y)),q.map===null||G===!0||Z===!0){let Ie=this.type!==Gn?{minFilter:kt,magFilter:kt}:{};q.map!==null&&q.map.dispose(),q.map=new Jn(s.x,s.y,Ie),q.map.texture.name=le.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let Me=q.getViewportCount();for(let Ie=0;Ie<Me;Ie++){let Qe=q.getViewport(Ie);o.set(r.x*Qe.x,r.y*Qe.y,r.x*Qe.z,r.y*Qe.w),V.viewport(o),q.updateMatrices(le,Ie),n=q.getFrustum(),x(R,P,q.camera,le,this.type)}q.isPointLightShadow!==!0&&this.type===Gn&&v(q,P),q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(T,b,D)};function v(C,R){let P=e.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Jn(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(R,null,P,f,_,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(R,null,P,p,_,null)}function y(C,R,P,T){let b=null,D=P.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)b=D;else if(b=P.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let V=b.uuid,G=R.uuid,Z=l[V];Z===void 0&&(Z={},l[V]=Z);let ne=Z[G];ne===void 0&&(ne=b.clone(),Z[G]=ne,R.addEventListener("dispose",I)),b=ne}if(b.visible=R.visible,b.wireframe=R.wireframe,T===Gn?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:u[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let V=i.properties.get(b);V.light=P}return b}function x(C,R,P,T,b){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&b===Gn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,C.matrixWorld);let G=e.update(C),Z=C.material;if(Array.isArray(Z)){let ne=G.groups;for(let J=0,le=ne.length;J<le;J++){let q=ne[J],me=Z[q.materialIndex];if(me&&me.visible){let Me=y(C,me,T,b);C.onBeforeShadow(i,C,R,P,G,Me,q),i.renderBufferDirect(P,null,G,Me,C,q),C.onAfterShadow(i,C,R,P,G,Me,q)}}}else if(Z.visible){let ne=y(C,Z,T,b);C.onBeforeShadow(i,C,R,P,G,ne,null),i.renderBufferDirect(P,null,G,ne,C,null),C.onAfterShadow(i,C,R,P,G,ne,null)}}let V=C.children;for(let G=0,Z=V.length;G<Z;G++)x(V[G],R,P,T,b)}function I(C){C.target.removeEventListener("dispose",I);for(let P in l){let T=l[P],b=C.target.uuid;b in T&&(T[b].dispose(),delete T[b])}}}var jx={[qa]:Za,[Ka]:ja,[Ja]:Qa,[vs]:$a,[Za]:qa,[ja]:Ka,[Qa]:Ja,[$a]:vs};function Qx(i,e){function t(){let F=!1,_e=new dt,K=null,ie=new dt(0,0,0,0);return{setMask:function(Se){K!==Se&&!F&&(i.colorMask(Se,Se,Se,Se),K=Se)},setLocked:function(Se){F=Se},setClear:function(Se,be,et,It,Gt){Gt===!0&&(Se*=It,be*=It,et*=It),_e.set(Se,be,et,It),ie.equals(_e)===!1&&(i.clearColor(Se,be,et,It),ie.copy(_e))},reset:function(){F=!1,K=null,ie.set(-1,0,0,0)}}}function n(){let F=!1,_e=!1,K=null,ie=null,Se=null;return{setReversed:function(be){if(_e!==be){let et=e.get("EXT_clip_control");_e?et.clipControlEXT(et.LOWER_LEFT_EXT,et.ZERO_TO_ONE_EXT):et.clipControlEXT(et.LOWER_LEFT_EXT,et.NEGATIVE_ONE_TO_ONE_EXT);let It=Se;Se=null,this.setClear(It)}_e=be},getReversed:function(){return _e},setTest:function(be){be?he(i.DEPTH_TEST):Pe(i.DEPTH_TEST)},setMask:function(be){K!==be&&!F&&(i.depthMask(be),K=be)},setFunc:function(be){if(_e&&(be=jx[be]),ie!==be){switch(be){case qa:i.depthFunc(i.NEVER);break;case Za:i.depthFunc(i.ALWAYS);break;case Ka:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case Ja:i.depthFunc(i.EQUAL);break;case $a:i.depthFunc(i.GEQUAL);break;case ja:i.depthFunc(i.GREATER);break;case Qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ie=be}},setLocked:function(be){F=be},setClear:function(be){Se!==be&&(_e&&(be=1-be),i.clearDepth(be),Se=be)},reset:function(){F=!1,K=null,ie=null,Se=null,_e=!1}}}function s(){let F=!1,_e=null,K=null,ie=null,Se=null,be=null,et=null,It=null,Gt=null;return{setTest:function(w){F||(w?he(i.STENCIL_TEST):Pe(i.STENCIL_TEST))},setMask:function(w){_e!==w&&!F&&(i.stencilMask(w),_e=w)},setFunc:function(w,U,Q){(K!==w||ie!==U||Se!==Q)&&(i.stencilFunc(w,U,Q),K=w,ie=U,Se=Q)},setOp:function(w,U,Q){(be!==w||et!==U||It!==Q)&&(i.stencilOp(w,U,Q),be=w,et=U,It=Q)},setLocked:function(w){F=w},setClear:function(w){Gt!==w&&(i.clearStencil(w),Gt=w)},reset:function(){F=!1,_e=null,K=null,ie=null,Se=null,be=null,et=null,It=null,Gt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,v=null,y=null,x=null,I=null,C=null,R=new Ce(0,0,0),P=0,T=!1,b=null,D=null,V=null,G=null,Z=null,ne=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,le=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(q)[1]),J=le>=1):q.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),J=le>=2);let me=null,Me={},Ie=i.getParameter(i.SCISSOR_BOX),Qe=i.getParameter(i.VIEWPORT),de=new dt().fromArray(Ie),k=new dt().fromArray(Qe);function j(F,_e,K,ie){let Se=new Uint8Array(4),be=i.createTexture();i.bindTexture(F,be),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let et=0;et<K;et++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,ie,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(_e+et,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return be}let re={};re[i.TEXTURE_2D]=j(i.TEXTURE_2D,i.TEXTURE_2D,1),re[i.TEXTURE_CUBE_MAP]=j(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[i.TEXTURE_2D_ARRAY]=j(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),re[i.TEXTURE_3D]=j(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),he(i.DEPTH_TEST),o.setFunc(vs),ue(!1),fe(vh),he(i.CULL_FACE),S(pi);function he(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function Pe(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function Le(F,_e){return u[F]!==_e?(i.bindFramebuffer(F,_e),u[F]=_e,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_e),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function ke(F,_e){let K=p,ie=!1;if(F){K=f.get(_e),K===void 0&&(K=[],f.set(_e,K));let Se=F.textures;if(K.length!==Se.length||K[0]!==i.COLOR_ATTACHMENT0){for(let be=0,et=Se.length;be<et;be++)K[be]=i.COLOR_ATTACHMENT0+be;K.length=Se.length,ie=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,ie=!0);ie&&i.drawBuffers(K)}function Ke(F){return g!==F?(i.useProgram(F),g=F,!0):!1}let $e={[Pi]:i.FUNC_ADD,[hd]:i.FUNC_SUBTRACT,[ud]:i.FUNC_REVERSE_SUBTRACT};$e[fd]=i.MIN,$e[dd]=i.MAX;let L={[pd]:i.ZERO,[md]:i.ONE,[gd]:i.SRC_COLOR,[Xa]:i.SRC_ALPHA,[Sd]:i.SRC_ALPHA_SATURATE,[vd]:i.DST_COLOR,[_d]:i.DST_ALPHA,[xd]:i.ONE_MINUS_SRC_COLOR,[Ya]:i.ONE_MINUS_SRC_ALPHA,[Md]:i.ONE_MINUS_DST_COLOR,[yd]:i.ONE_MINUS_DST_ALPHA,[bd]:i.CONSTANT_COLOR,[Ed]:i.ONE_MINUS_CONSTANT_COLOR,[Td]:i.CONSTANT_ALPHA,[wd]:i.ONE_MINUS_CONSTANT_ALPHA};function S(F,_e,K,ie,Se,be,et,It,Gt,w){if(F===pi){_===!0&&(Pe(i.BLEND),_=!1);return}if(_===!1&&(he(i.BLEND),_=!0),F!==ld){if(F!==m||w!==T){if((d!==Pi||x!==Pi)&&(i.blendEquation(i.FUNC_ADD),d=Pi,x=Pi),w)switch(F){case gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mh:i.blendFunc(i.ONE,i.ONE);break;case Sh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mh:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Sh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}v=null,y=null,I=null,C=null,R.set(0,0,0),P=0,m=F,T=w}return}Se=Se||_e,be=be||K,et=et||ie,(_e!==d||Se!==x)&&(i.blendEquationSeparate($e[_e],$e[Se]),d=_e,x=Se),(K!==v||ie!==y||be!==I||et!==C)&&(i.blendFuncSeparate(L[K],L[ie],L[be],L[et]),v=K,y=ie,I=be,C=et),(It.equals(R)===!1||Gt!==P)&&(i.blendColor(It.r,It.g,It.b,Gt),R.copy(It),P=Gt),m=F,T=!1}function oe(F,_e){F.side===Lt?Pe(i.CULL_FACE):he(i.CULL_FACE);let K=F.side===Xt;_e&&(K=!K),ue(K),F.blending===gs&&F.transparent===!1?S(pi):S(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let ie=F.stencilWrite;a.setTest(ie),ie&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Je(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?he(i.SAMPLE_ALPHA_TO_COVERAGE):Pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function ue(F){b!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),b=F)}function fe(F){F!==od?(he(i.CULL_FACE),F!==D&&(F===vh?i.cullFace(i.BACK):F===ad?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Pe(i.CULL_FACE),D=F}function ye(F){F!==V&&(J&&i.lineWidth(F),V=F)}function Je(F,_e,K){F?(he(i.POLYGON_OFFSET_FILL),(G!==_e||Z!==K)&&(i.polygonOffset(_e,K),G=_e,Z=K)):Pe(i.POLYGON_OFFSET_FILL)}function xe(F){F?he(i.SCISSOR_TEST):Pe(i.SCISSOR_TEST)}function A(F){F===void 0&&(F=i.TEXTURE0+ne-1),me!==F&&(i.activeTexture(F),me=F)}function M(F,_e,K){K===void 0&&(me===null?K=i.TEXTURE0+ne-1:K=me);let ie=Me[K];ie===void 0&&(ie={type:void 0,texture:void 0},Me[K]=ie),(ie.type!==F||ie.texture!==_e)&&(me!==K&&(i.activeTexture(K),me=K),i.bindTexture(F,_e||re[F]),ie.type=F,ie.texture=_e)}function B(){let F=Me[me];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function te(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function se(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function De(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ge(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ae(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ct(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ae(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function we(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function We(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ze(F){de.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),de.copy(F))}function Te(F){k.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),k.copy(F))}function ot(F,_e){let K=l.get(_e);K===void 0&&(K=new WeakMap,l.set(_e,K));let ie=K.get(F);ie===void 0&&(ie=i.getUniformBlockIndex(_e,F.name),K.set(F,ie))}function Re(F,_e){let ie=l.get(_e).get(F);c.get(_e)!==ie&&(i.uniformBlockBinding(_e,ie,F.__bindingPointIndex),c.set(_e,ie))}function pt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},me=null,Me={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,v=null,y=null,x=null,I=null,C=null,R=new Ce(0,0,0),P=0,T=!1,b=null,D=null,V=null,G=null,Z=null,de.set(0,0,i.canvas.width,i.canvas.height),k.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:he,disable:Pe,bindFramebuffer:Le,drawBuffers:ke,useProgram:Ke,setBlending:S,setMaterial:oe,setFlipSided:ue,setCullFace:fe,setLineWidth:ye,setPolygonOffset:Je,setScissorTest:xe,activeTexture:A,bindTexture:M,unbindTexture:B,compressedTexImage2D:te,compressedTexImage3D:se,texImage2D:we,texImage3D:We,updateUBOMapping:ot,uniformBlockBinding:Re,texStorage2D:ct,texStorage3D:ae,texSubImage2D:$,texSubImage3D:De,compressedTexSubImage2D:ge,compressedTexSubImage3D:Ae,scissor:Ze,viewport:Te,reset:pt}}function xu(i,e,t,n){let s=e_(n);switch(t){case Gu:return i*e;case Xu:return i*e;case Yu:return i*e*2;case ul:return i*e/s.components*s.byteLength;case fl:return i*e/s.components*s.byteLength;case qu:return i*e*2/s.components*s.byteLength;case dl:return i*e*2/s.components*s.byteLength;case Wu:return i*e*3/s.components*s.byteLength;case yn:return i*e*4/s.components*s.byteLength;case pl:return i*e*4/s.components*s.byteLength;case ao:case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case lo:case ho:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ic:case rc:return Math.max(i,16)*Math.max(e,8)/4;case nc:case sc:return Math.max(i,8)*Math.max(e,8)/2;case oc:case ac:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case cc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case lc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case uc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case dc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case pc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case mc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case gc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case xc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _c:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case yc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case vc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Mc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Sc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case uo:case bc:case Ec:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Zu:case Tc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case wc:case Ac:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function e_(i){switch(i){case Zn:case ku:return{byteLength:1,components:1};case ur:case Hu:case vr:return{byteLength:2,components:1};case ll:case hl:return{byteLength:2,components:4};case Ni:case cl:case Rn:return{byteLength:4,components:1};case Vu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function t_(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xe,h=new WeakMap,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return p?new OffscreenCanvas(A,M):fr("canvas")}function _(A,M,B){let te=1,se=xe(A);if((se.width>B||se.height>B)&&(te=B/Math.max(se.width,se.height)),te<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let $=Math.floor(te*se.width),De=Math.floor(te*se.height);u===void 0&&(u=g($,De));let ge=M?g($,De):u;return ge.width=$,ge.height=De,ge.getContext("2d").drawImage(A,0,0,$,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+$+"x"+De+")."),ge}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),A;return A}function m(A){return A.generateMipmaps}function d(A){i.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(A,M,B,te,se=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let $=M;if(M===i.RED&&(B===i.FLOAT&&($=i.R32F),B===i.HALF_FLOAT&&($=i.R16F),B===i.UNSIGNED_BYTE&&($=i.R8)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.R8UI),B===i.UNSIGNED_SHORT&&($=i.R16UI),B===i.UNSIGNED_INT&&($=i.R32UI),B===i.BYTE&&($=i.R8I),B===i.SHORT&&($=i.R16I),B===i.INT&&($=i.R32I)),M===i.RG&&(B===i.FLOAT&&($=i.RG32F),B===i.HALF_FLOAT&&($=i.RG16F),B===i.UNSIGNED_BYTE&&($=i.RG8)),M===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RG8UI),B===i.UNSIGNED_SHORT&&($=i.RG16UI),B===i.UNSIGNED_INT&&($=i.RG32UI),B===i.BYTE&&($=i.RG8I),B===i.SHORT&&($=i.RG16I),B===i.INT&&($=i.RG32I)),M===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGB8UI),B===i.UNSIGNED_SHORT&&($=i.RGB16UI),B===i.UNSIGNED_INT&&($=i.RGB32UI),B===i.BYTE&&($=i.RGB8I),B===i.SHORT&&($=i.RGB16I),B===i.INT&&($=i.RGB32I)),M===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGBA8UI),B===i.UNSIGNED_SHORT&&($=i.RGBA16UI),B===i.UNSIGNED_INT&&($=i.RGBA32UI),B===i.BYTE&&($=i.RGBA8I),B===i.SHORT&&($=i.RGBA16I),B===i.INT&&($=i.RGBA32I)),M===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),M===i.RGBA){let De=se?qo:lt.getTransfer(te);B===i.FLOAT&&($=i.RGBA32F),B===i.HALF_FLOAT&&($=i.RGBA16F),B===i.UNSIGNED_BYTE&&($=De===bt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function x(A,M){let B;return A?M===null||M===Ni||M===bs?B=i.DEPTH24_STENCIL8:M===Rn?B=i.DEPTH32F_STENCIL8:M===ur&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ni||M===bs?B=i.DEPTH_COMPONENT24:M===Rn?B=i.DEPTH_COMPONENT32F:M===ur&&(B=i.DEPTH_COMPONENT16),B}function I(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==kt&&A.minFilter!==an?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function C(A){let M=A.target;M.removeEventListener("dispose",C),P(M),M.isVideoTexture&&h.delete(M)}function R(A){let M=A.target;M.removeEventListener("dispose",R),b(M)}function P(A){let M=n.get(A);if(M.__webglInit===void 0)return;let B=A.source,te=f.get(B);if(te){let se=te[M.__cacheKey];se.usedTimes--,se.usedTimes===0&&T(A),Object.keys(te).length===0&&f.delete(B)}n.remove(A)}function T(A){let M=n.get(A);i.deleteTexture(M.__webglTexture);let B=A.source,te=f.get(B);delete te[M.__cacheKey],o.memory.textures--}function b(A){let M=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(M.__webglFramebuffer[te]))for(let se=0;se<M.__webglFramebuffer[te].length;se++)i.deleteFramebuffer(M.__webglFramebuffer[te][se]);else i.deleteFramebuffer(M.__webglFramebuffer[te]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[te])}else{if(Array.isArray(M.__webglFramebuffer))for(let te=0;te<M.__webglFramebuffer.length;te++)i.deleteFramebuffer(M.__webglFramebuffer[te]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let te=0;te<M.__webglColorRenderbuffer.length;te++)M.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[te]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let B=A.textures;for(let te=0,se=B.length;te<se;te++){let $=n.get(B[te]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(B[te])}n.remove(A)}let D=0;function V(){D=0}function G(){let A=D;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),D+=1,A}function Z(A){let M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function ne(A,M){let B=n.get(A);if(A.isVideoTexture&&ye(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){let te=A.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(B,A,M);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function J(A,M){let B=n.get(A);if(A.version>0&&B.__version!==A.version){k(B,A,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function le(A,M){let B=n.get(A);if(A.version>0&&B.__version!==A.version){k(B,A,M);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function q(A,M){let B=n.get(A);if(A.version>0&&B.__version!==A.version){j(B,A,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}let me={[Di]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[hr]:i.MIRRORED_REPEAT},Me={[kt]:i.NEAREST,[al]:i.NEAREST_MIPMAP_NEAREST,[fs]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[or]:i.LINEAR_MIPMAP_NEAREST,[Nn]:i.LINEAR_MIPMAP_LINEAR},Ie={[Gd]:i.NEVER,[Kd]:i.ALWAYS,[Wd]:i.LESS,[Ju]:i.LEQUAL,[Xd]:i.EQUAL,[Zd]:i.GEQUAL,[Yd]:i.GREATER,[qd]:i.NOTEQUAL};function Qe(A,M){if(M.type===Rn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===an||M.magFilter===or||M.magFilter===fs||M.magFilter===Nn||M.minFilter===an||M.minFilter===or||M.minFilter===fs||M.minFilter===Nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,me[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,me[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,me[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Me[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Me[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Ie[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===kt||M.minFilter!==fs&&M.minFilter!==Nn||M.type===Rn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function de(A,M){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",C));let te=M.source,se=f.get(te);se===void 0&&(se={},f.set(te,se));let $=Z(M);if($!==A.__cacheKey){se[$]===void 0&&(se[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),se[$].usedTimes++;let De=se[A.__cacheKey];De!==void 0&&(se[A.__cacheKey].usedTimes--,De.usedTimes===0&&T(M)),A.__cacheKey=$,A.__webglTexture=se[$].texture}return B}function k(A,M,B){let te=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(te=i.TEXTURE_3D);let se=de(A,M),$=M.source;t.bindTexture(te,A.__webglTexture,i.TEXTURE0+B);let De=n.get($);if($.version!==De.__version||se===!0){t.activeTexture(i.TEXTURE0+B);let ge=lt.getPrimaries(lt.workingColorSpace),Ae=M.colorSpace===Dn?null:lt.getPrimaries(M.colorSpace),ct=M.colorSpace===Dn||ge===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let ae=_(M.image,!1,s.maxTextureSize);ae=Je(M,ae);let we=r.convert(M.format,M.colorSpace),We=r.convert(M.type),Ze=y(M.internalFormat,we,We,M.colorSpace,M.isVideoTexture);Qe(te,M);let Te,ot=M.mipmaps,Re=M.isVideoTexture!==!0,pt=De.__version===void 0||se===!0,F=$.dataReady,_e=I(M,ae);if(M.isDepthTexture)Ze=x(M.format===Es,M.type),pt&&(Re?t.texStorage2D(i.TEXTURE_2D,1,Ze,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,Ze,ae.width,ae.height,0,we,We,null));else if(M.isDataTexture)if(ot.length>0){Re&&pt&&t.texStorage2D(i.TEXTURE_2D,_e,Ze,ot[0].width,ot[0].height);for(let K=0,ie=ot.length;K<ie;K++)Te=ot[K],Re?F&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Te.width,Te.height,we,We,Te.data):t.texImage2D(i.TEXTURE_2D,K,Ze,Te.width,Te.height,0,we,We,Te.data);M.generateMipmaps=!1}else Re?(pt&&t.texStorage2D(i.TEXTURE_2D,_e,Ze,ae.width,ae.height),F&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae.width,ae.height,we,We,ae.data)):t.texImage2D(i.TEXTURE_2D,0,Ze,ae.width,ae.height,0,we,We,ae.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Re&&pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Ze,ot[0].width,ot[0].height,ae.depth);for(let K=0,ie=ot.length;K<ie;K++)if(Te=ot[K],M.format!==yn)if(we!==null)if(Re){if(F)if(M.layerUpdates.size>0){let Se=xu(Te.width,Te.height,M.format,M.type);for(let be of M.layerUpdates){let et=Te.data.subarray(be*Se/Te.data.BYTES_PER_ELEMENT,(be+1)*Se/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,be,Te.width,Te.height,1,we,et)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Te.width,Te.height,ae.depth,we,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Ze,Te.width,Te.height,ae.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?F&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Te.width,Te.height,ae.depth,we,We,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,Ze,Te.width,Te.height,ae.depth,0,we,We,Te.data)}else{Re&&pt&&t.texStorage2D(i.TEXTURE_2D,_e,Ze,ot[0].width,ot[0].height);for(let K=0,ie=ot.length;K<ie;K++)Te=ot[K],M.format!==yn?we!==null?Re?F&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,Te.width,Te.height,we,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,K,Ze,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?F&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,Te.width,Te.height,we,We,Te.data):t.texImage2D(i.TEXTURE_2D,K,Ze,Te.width,Te.height,0,we,We,Te.data)}else if(M.isDataArrayTexture)if(Re){if(pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Ze,ae.width,ae.height,ae.depth),F)if(M.layerUpdates.size>0){let K=xu(ae.width,ae.height,M.format,M.type);for(let ie of M.layerUpdates){let Se=ae.data.subarray(ie*K/ae.data.BYTES_PER_ELEMENT,(ie+1)*K/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ie,ae.width,ae.height,1,we,We,Se)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,we,We,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ze,ae.width,ae.height,ae.depth,0,we,We,ae.data);else if(M.isData3DTexture)Re?(pt&&t.texStorage3D(i.TEXTURE_3D,_e,Ze,ae.width,ae.height,ae.depth),F&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,we,We,ae.data)):t.texImage3D(i.TEXTURE_3D,0,Ze,ae.width,ae.height,ae.depth,0,we,We,ae.data);else if(M.isFramebufferTexture){if(pt)if(Re)t.texStorage2D(i.TEXTURE_2D,_e,Ze,ae.width,ae.height);else{let K=ae.width,ie=ae.height;for(let Se=0;Se<_e;Se++)t.texImage2D(i.TEXTURE_2D,Se,Ze,K,ie,0,we,We,null),K>>=1,ie>>=1}}else if(ot.length>0){if(Re&&pt){let K=xe(ot[0]);t.texStorage2D(i.TEXTURE_2D,_e,Ze,K.width,K.height)}for(let K=0,ie=ot.length;K<ie;K++)Te=ot[K],Re?F&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,we,We,Te):t.texImage2D(i.TEXTURE_2D,K,Ze,we,We,Te);M.generateMipmaps=!1}else if(Re){if(pt){let K=xe(ae);t.texStorage2D(i.TEXTURE_2D,_e,Ze,K.width,K.height)}F&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,We,ae)}else t.texImage2D(i.TEXTURE_2D,0,Ze,we,We,ae);m(M)&&d(te),De.__version=$.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function j(A,M,B){if(M.image.length!==6)return;let te=de(A,M),se=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+B);let $=n.get(se);if(se.version!==$.__version||te===!0){t.activeTexture(i.TEXTURE0+B);let De=lt.getPrimaries(lt.workingColorSpace),ge=M.colorSpace===Dn?null:lt.getPrimaries(M.colorSpace),Ae=M.colorSpace===Dn||De===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let ct=M.isCompressedTexture||M.image[0].isCompressedTexture,ae=M.image[0]&&M.image[0].isDataTexture,we=[];for(let ie=0;ie<6;ie++)!ct&&!ae?we[ie]=_(M.image[ie],!0,s.maxCubemapSize):we[ie]=ae?M.image[ie].image:M.image[ie],we[ie]=Je(M,we[ie]);let We=we[0],Ze=r.convert(M.format,M.colorSpace),Te=r.convert(M.type),ot=y(M.internalFormat,Ze,Te,M.colorSpace),Re=M.isVideoTexture!==!0,pt=$.__version===void 0||te===!0,F=se.dataReady,_e=I(M,We);Qe(i.TEXTURE_CUBE_MAP,M);let K;if(ct){Re&&pt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,ot,We.width,We.height);for(let ie=0;ie<6;ie++){K=we[ie].mipmaps;for(let Se=0;Se<K.length;Se++){let be=K[Se];M.format!==yn?Ze!==null?Re?F&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se,0,0,be.width,be.height,Ze,be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se,ot,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se,0,0,be.width,be.height,Ze,Te,be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se,ot,be.width,be.height,0,Ze,Te,be.data)}}}else{if(K=M.mipmaps,Re&&pt){K.length>0&&_e++;let ie=xe(we[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,ot,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(ae){Re?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,we[ie].width,we[ie].height,Ze,Te,we[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ot,we[ie].width,we[ie].height,0,Ze,Te,we[ie].data);for(let Se=0;Se<K.length;Se++){let et=K[Se].image[ie].image;Re?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se+1,0,0,et.width,et.height,Ze,Te,et.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se+1,ot,et.width,et.height,0,Ze,Te,et.data)}}else{Re?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ze,Te,we[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ot,Ze,Te,we[ie]);for(let Se=0;Se<K.length;Se++){let be=K[Se];Re?F&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se+1,0,0,Ze,Te,be.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Se+1,ot,Ze,Te,be.image[ie])}}}m(M)&&d(i.TEXTURE_CUBE_MAP),$.__version=se.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function re(A,M,B,te,se,$){let De=r.convert(B.format,B.colorSpace),ge=r.convert(B.type),Ae=y(B.internalFormat,De,ge,B.colorSpace),ct=n.get(M),ae=n.get(B);if(ae.__renderTarget=M,!ct.__hasExternalTextures){let we=Math.max(1,M.width>>$),We=Math.max(1,M.height>>$);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,$,Ae,we,We,M.depth,0,De,ge,null):t.texImage2D(se,$,Ae,we,We,0,De,ge,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),fe(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,se,ae.__webglTexture,0,ue(M)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,se,ae.__webglTexture,$),t.bindFramebuffer(i.FRAMEBUFFER,null)}function he(A,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){let te=M.depthTexture,se=te&&te.isDepthTexture?te.type:null,$=x(M.stencilBuffer,se),De=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=ue(M);fe(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge,$,M.width,M.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,$,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,$,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,De,i.RENDERBUFFER,A)}else{let te=M.textures;for(let se=0;se<te.length;se++){let $=te[se],De=r.convert($.format,$.colorSpace),ge=r.convert($.type),Ae=y($.internalFormat,De,ge,$.colorSpace),ct=ue(M);B&&fe(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,Ae,M.width,M.height):fe(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,Ae,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pe(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let te=n.get(M.depthTexture);te.__renderTarget=M,(!te.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),ne(M.depthTexture,0);let se=te.__webglTexture,$=ue(M);if(M.depthTexture.format===xs)fe(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(M.depthTexture.format===Es)fe(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Le(A){let M=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){let te=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),te){let se=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,te.removeEventListener("dispose",se)};te.addEventListener("dispose",se),M.__depthDisposeCallback=se}M.__boundDepthTexture=te}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Pe(M.__webglFramebuffer,A)}else if(B){M.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[te]),M.__webglDepthbuffer[te]===void 0)M.__webglDepthbuffer[te]=i.createRenderbuffer(),he(M.__webglDepthbuffer[te],A,!1);else{let se=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,$)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),he(M.__webglDepthbuffer,A,!1);else{let te=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,se)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(A,M,B){let te=n.get(A);M!==void 0&&re(te.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Le(A)}function Ke(A){let M=A.texture,B=n.get(A),te=n.get(M);A.addEventListener("dispose",R);let se=A.textures,$=A.isWebGLCubeRenderTarget===!0,De=se.length>1;if(De||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=M.version,o.memory.textures++),$){B.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[ge]=[];for(let Ae=0;Ae<M.mipmaps.length;Ae++)B.__webglFramebuffer[ge][Ae]=i.createFramebuffer()}else B.__webglFramebuffer[ge]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let ge=0;ge<M.mipmaps.length;ge++)B.__webglFramebuffer[ge]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(De)for(let ge=0,Ae=se.length;ge<Ae;ge++){let ct=n.get(se[ge]);ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&fe(A)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ge=0;ge<se.length;ge++){let Ae=se[ge];B.__webglColorRenderbuffer[ge]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ge]);let ct=r.convert(Ae.format,Ae.colorSpace),ae=r.convert(Ae.type),we=y(Ae.internalFormat,ct,ae,Ae.colorSpace,A.isXRRenderTarget===!0),We=ue(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,we,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,B.__webglColorRenderbuffer[ge])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),he(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),Qe(i.TEXTURE_CUBE_MAP,M);for(let ge=0;ge<6;ge++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ae=0;Ae<M.mipmaps.length;Ae++)re(B.__webglFramebuffer[ge][Ae],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae);else re(B.__webglFramebuffer[ge],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(M)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let ge=0,Ae=se.length;ge<Ae;ge++){let ct=se[ge],ae=n.get(ct);t.bindTexture(i.TEXTURE_2D,ae.__webglTexture),Qe(i.TEXTURE_2D,ct),re(B.__webglFramebuffer,A,ct,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,0),m(ct)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let ge=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ge=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,te.__webglTexture),Qe(ge,M),M.mipmaps&&M.mipmaps.length>0)for(let Ae=0;Ae<M.mipmaps.length;Ae++)re(B.__webglFramebuffer[Ae],A,M,i.COLOR_ATTACHMENT0,ge,Ae);else re(B.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,ge,0);m(M)&&d(ge),t.unbindTexture()}A.depthBuffer&&Le(A)}function $e(A){let M=A.textures;for(let B=0,te=M.length;B<te;B++){let se=M[B];if(m(se)){let $=v(A),De=n.get(se).__webglTexture;t.bindTexture($,De),d($),t.unbindTexture()}}}let L=[],S=[];function oe(A){if(A.samples>0){if(fe(A)===!1){let M=A.textures,B=A.width,te=A.height,se=i.COLOR_BUFFER_BIT,$=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,De=n.get(A),ge=M.length>1;if(ge)for(let Ae=0;Ae<M.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,De.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,De.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Ae=0;Ae<M.length;Ae++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),ge){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,De.__webglColorRenderbuffer[Ae]);let ct=n.get(M[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ct,0)}i.blitFramebuffer(0,0,B,te,0,0,B,te,se,i.NEAREST),c===!0&&(L.length=0,S.length=0,L.push(i.COLOR_ATTACHMENT0+Ae),A.depthBuffer&&A.resolveDepthBuffer===!1&&(L.push($),S.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,S)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,L))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ge)for(let Ae=0;Ae<M.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,De.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,De.__webglColorRenderbuffer[Ae]);let ct=n.get(M[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,De.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,ct,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function ue(A){return Math.min(s.maxSamples,A.samples)}function fe(A){let M=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ye(A){let M=o.render.frame;h.get(A)!==M&&(h.set(A,M),A.update())}function Je(A,M){let B=A.colorSpace,te=A.format,se=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Zt&&B!==Dn&&(lt.getTransfer(B)===bt?(te!==yn||se!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function xe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=V,this.setTexture2D=ne,this.setTexture2DArray=J,this.setTexture3D=le,this.setTextureCube=q,this.rebindTextures=ke,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=re,this.useMultisampledRTT=fe}function n_(i,e){function t(n,s=Dn){let r,o=lt.getTransfer(s);if(n===Zn)return i.UNSIGNED_BYTE;if(n===ll)return i.UNSIGNED_SHORT_4_4_4_4;if(n===hl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Vu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ku)return i.BYTE;if(n===Hu)return i.SHORT;if(n===ur)return i.UNSIGNED_SHORT;if(n===cl)return i.INT;if(n===Ni)return i.UNSIGNED_INT;if(n===Rn)return i.FLOAT;if(n===vr)return i.HALF_FLOAT;if(n===Gu)return i.ALPHA;if(n===Wu)return i.RGB;if(n===yn)return i.RGBA;if(n===Xu)return i.LUMINANCE;if(n===Yu)return i.LUMINANCE_ALPHA;if(n===xs)return i.DEPTH_COMPONENT;if(n===Es)return i.DEPTH_STENCIL;if(n===ul)return i.RED;if(n===fl)return i.RED_INTEGER;if(n===qu)return i.RG;if(n===dl)return i.RG_INTEGER;if(n===pl)return i.RGBA_INTEGER;if(n===ao||n===co||n===lo||n===ho)if(o===bt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ao)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ao)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ho)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===nc||n===ic||n===sc||n===rc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===nc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ic)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===sc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===rc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oc||n===ac||n===cc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===oc||n===ac)return o===bt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===cc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===lc||n===hc||n===uc||n===fc||n===dc||n===pc||n===mc||n===gc||n===xc||n===_c||n===yc||n===vc||n===Mc||n===Sc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===lc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===hc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===uc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===gc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_c)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sc)return o===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===uo||n===bc||n===Ec)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===uo)return o===bt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ec)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zu||n===Tc||n===wc||n===Ac)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===uo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ac)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Vc=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Bt=class extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}},i_={type:"move"},lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),d=this._getHandJoint(l,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(i_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},s_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,r_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Gc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new Yt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new rn({vertexShader:s_,fragmentShader:r_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ze(new gi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Wc=class extends Kn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,g=null,_=new Gc,m=t.getContextAttributes(),d=null,v=null,y=[],x=[],I=new Xe,C=null,R=new zt;R.viewport=new dt;let P=new zt;P.viewport=new dt;let T=[R,P],b=new Vc,D=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let j=y[k];return j===void 0&&(j=new lr,y[k]=j),j.getTargetRaySpace()},this.getControllerGrip=function(k){let j=y[k];return j===void 0&&(j=new lr,y[k]=j),j.getGripSpace()},this.getHand=function(k){let j=y[k];return j===void 0&&(j=new lr,y[k]=j),j.getHandSpace()};function G(k){let j=x.indexOf(k.inputSource);if(j===-1)return;let re=y[j];re!==void 0&&(re.update(k.inputSource,k.frame,l||o),re.dispatchEvent({type:k.type,data:k.inputSource}))}function Z(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",ne);for(let k=0;k<y.length;k++){let j=x[k];j!==null&&(x[k]=null,y[k].disconnect(j))}D=null,V=null,_.reset(),e.setRenderTarget(d),p=null,f=null,u=null,s=null,v=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){a=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(k){l=k},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",ne),m.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(I),s.renderState.layers===void 0){let j={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new Jn(p.framebufferWidth,p.framebufferHeight,{format:yn,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let j=null,re=null,he=null;m.depth&&(he=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=m.stencil?Es:xs,re=m.stencil?bs:Ni);let Pe={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(Pe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Jn(f.textureWidth,f.textureHeight,{format:yn,type:Zn,depthTexture:new bo(f.textureWidth,f.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),de.setContext(s),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ne(k){for(let j=0;j<k.removed.length;j++){let re=k.removed[j],he=x.indexOf(re);he>=0&&(x[he]=null,y[he].disconnect(re))}for(let j=0;j<k.added.length;j++){let re=k.added[j],he=x.indexOf(re);if(he===-1){for(let Le=0;Le<y.length;Le++)if(Le>=x.length){x.push(re),he=Le;break}else if(x[Le]===null){x[Le]=re,he=Le;break}if(he===-1)break}let Pe=y[he];Pe&&Pe.connect(re)}}let J=new N,le=new N;function q(k,j,re){J.setFromMatrixPosition(j.matrixWorld),le.setFromMatrixPosition(re.matrixWorld);let he=J.distanceTo(le),Pe=j.projectionMatrix.elements,Le=re.projectionMatrix.elements,ke=Pe[14]/(Pe[10]-1),Ke=Pe[14]/(Pe[10]+1),$e=(Pe[9]+1)/Pe[5],L=(Pe[9]-1)/Pe[5],S=(Pe[8]-1)/Pe[0],oe=(Le[8]+1)/Le[0],ue=ke*S,fe=ke*oe,ye=he/(-S+oe),Je=ye*-S;if(j.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Je),k.translateZ(ye),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),Pe[10]===-1)k.projectionMatrix.copy(j.projectionMatrix),k.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let xe=ke+ye,A=Ke+ye,M=ue-Je,B=fe+(he-Je),te=$e*Ke/A*xe,se=L*Ke/A*xe;k.projectionMatrix.makePerspective(M,B,te,se,xe,A),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function me(k,j){j===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(j.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let j=k.near,re=k.far;_.texture!==null&&(_.depthNear>0&&(j=_.depthNear),_.depthFar>0&&(re=_.depthFar)),b.near=P.near=R.near=j,b.far=P.far=R.far=re,(D!==b.near||V!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),D=b.near,V=b.far),R.layers.mask=k.layers.mask|2,P.layers.mask=k.layers.mask|4,b.layers.mask=R.layers.mask|P.layers.mask;let he=k.parent,Pe=b.cameras;me(b,he);for(let Le=0;Le<Pe.length;Le++)me(Pe[Le],he);Pe.length===2?q(b,R,P):b.projectionMatrix.copy(R.projectionMatrix),Me(k,b,he)};function Me(k,j,re){re===null?k.matrix.copy(j.matrixWorld):(k.matrix.copy(re.matrixWorld),k.matrix.invert(),k.matrix.multiply(j.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(j.projectionMatrix),k.projectionMatrixInverse.copy(j.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=As*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(k){c=k,f!==null&&(f.fixedFoveation=k),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=k)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(b)};let Ie=null;function Qe(k,j){if(h=j.getViewerPose(l||o),g=j,h!==null){let re=h.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let he=!1;re.length!==b.cameras.length&&(b.cameras.length=0,he=!0);for(let Le=0;Le<re.length;Le++){let ke=re[Le],Ke=null;if(p!==null)Ke=p.getViewport(ke);else{let L=u.getViewSubImage(f,ke);Ke=L.viewport,Le===0&&(e.setRenderTargetTextures(v,L.colorTexture,f.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(v))}let $e=T[Le];$e===void 0&&($e=new zt,$e.layers.enable(Le),$e.viewport=new dt,T[Le]=$e),$e.matrix.fromArray(ke.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(ke.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Le===0&&(b.matrix.copy($e.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),he===!0&&b.cameras.push($e)}let Pe=s.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")){let Le=u.getDepthInformation(re[0]);Le&&Le.isValid&&Le.texture&&_.init(e,Le,s.renderState)}}for(let re=0;re<y.length;re++){let he=x[re],Pe=y[re];he!==null&&Pe!==void 0&&Pe.update(he,j,l||o)}Ie&&Ie(k,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}let de=new nf;de.setAnimationLoop(Qe),this.setAnimationLoop=function(k){Ie=k},this.dispose=function(){}}},Ci=new In,o_=new tt;function a_(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,tf(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,v,y,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,v,y):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Xt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Xt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let v=e.get(d),y=v.envMap,x=v.envMapRotation;y&&(m.envMap.value=y,Ci.copy(x),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),m.envMapRotation.value.setFromMatrix4(o_.makeRotationFromEuler(Ci)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,v,y){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*v,m.scale.value=y*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,v){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Xt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){let v=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function c_(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){let x=y.program;n.uniformBlockBinding(v,x)}function l(v,y){let x=s[v.id];x===void 0&&(g(v),x=h(v),s[v.id]=x,v.addEventListener("dispose",m));let I=y.program;n.updateUBOMapping(v,I);let C=e.render.frame;r[v.id]!==C&&(f(v),r[v.id]=C)}function h(v){let y=u();v.__bindingPointIndex=y;let x=i.createBuffer(),I=v.__size,C=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,I,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let y=s[v.id],x=v.uniforms,I=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let C=0,R=x.length;C<R;C++){let P=Array.isArray(x[C])?x[C]:[x[C]];for(let T=0,b=P.length;T<b;T++){let D=P[T];if(p(D,C,T,I)===!0){let V=D.__offset,G=Array.isArray(D.value)?D.value:[D.value],Z=0;for(let ne=0;ne<G.length;ne++){let J=G[ne],le=_(J);typeof J=="number"||typeof J=="boolean"?(D.__data[0]=J,i.bufferSubData(i.UNIFORM_BUFFER,V+Z,D.__data)):J.isMatrix3?(D.__data[0]=J.elements[0],D.__data[1]=J.elements[1],D.__data[2]=J.elements[2],D.__data[3]=0,D.__data[4]=J.elements[3],D.__data[5]=J.elements[4],D.__data[6]=J.elements[5],D.__data[7]=0,D.__data[8]=J.elements[6],D.__data[9]=J.elements[7],D.__data[10]=J.elements[8],D.__data[11]=0):(J.toArray(D.__data,Z),Z+=le.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,y,x,I){let C=v.value,R=y+"_"+x;if(I[R]===void 0)return typeof C=="number"||typeof C=="boolean"?I[R]=C:I[R]=C.clone(),!0;{let P=I[R];if(typeof C=="number"||typeof C=="boolean"){if(P!==C)return I[R]=C,!0}else if(P.equals(C)===!1)return P.copy(C),!0}return!1}function g(v){let y=v.uniforms,x=0,I=16;for(let R=0,P=y.length;R<P;R++){let T=Array.isArray(y[R])?y[R]:[y[R]];for(let b=0,D=T.length;b<D;b++){let V=T[b],G=Array.isArray(V.value)?V.value:[V.value];for(let Z=0,ne=G.length;Z<ne;Z++){let J=G[Z],le=_(J),q=x%I,me=q%le.boundary,Me=q+me;x+=me,Me!==0&&I-Me<le.storage&&(x+=I-Me),V.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=x,x+=le.storage}}}let C=x%I;return C>0&&(x+=I-C),v.__size=x,v.__cache={},this}function _(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){let y=v.target;y.removeEventListener("dispose",m);let x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function d(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}var Eo=class{constructor(e={}){let{canvas:t=fp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,d=null,v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ft,this.toneMapping=mi,this.toneMappingExposure=1;let x=this,I=!1,C=0,R=0,P=null,T=-1,b=null,D=new dt,V=new dt,G=null,Z=new Ce(0),ne=0,J=t.width,le=t.height,q=1,me=null,Me=null,Ie=new dt(0,0,J,le),Qe=new dt(0,0,J,le),de=!1,k=new dr,j=!1,re=!1,he=new tt,Pe=new tt,Le=new N,ke=new dt,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$e=!1;function L(){return P===null?q:1}let S=n;function oe(E,O){return t.getContext(E,O)}try{let E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${sl}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",be,!1),S===null){let O="webgl2";if(S=oe(O,E),S===null)throw oe(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ue,fe,ye,Je,xe,A,M,B,te,se,$,De,ge,Ae,ct,ae,we,We,Ze,Te,ot,Re,pt,F;function _e(){ue=new E0(S),ue.init(),Re=new n_(S,ue),fe=new _0(S,ue,e,Re),ye=new Qx(S,ue),fe.reverseDepthBuffer&&f&&ye.buffers.depth.setReversed(!0),Je=new A0(S),xe=new kx,A=new t_(S,ue,ye,xe,fe,Re,Je),M=new v0(x),B=new b0(x),te=new Np(S),pt=new g0(S,te),se=new T0(S,te,Je,pt),$=new C0(S,se,te,Je),Ze=new R0(S,fe,A),ae=new y0(xe),De=new Bx(x,M,B,ue,fe,pt,ae),ge=new a_(x,xe),Ae=new Vx,ct=new Zx(ue),We=new m0(x,M,B,ye,$,p,c),we=new $x(x,$,fe),F=new c_(S,Je,fe,ye),Te=new x0(S,ue,Je),ot=new w0(S,ue,Je),Je.programs=De.programs,x.capabilities=fe,x.extensions=ue,x.properties=xe,x.renderLists=Ae,x.shadowMap=we,x.state=ye,x.info=Je}_e();let K=new Wc(x,S);this.xr=K,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let E=ue.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=ue.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(E){E!==void 0&&(q=E,this.setSize(J,le,!1))},this.getSize=function(E){return E.set(J,le)},this.setSize=function(E,O,W=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=E,le=O,t.width=Math.floor(E*q),t.height=Math.floor(O*q),W===!0&&(t.style.width=E+"px",t.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(J*q,le*q).floor()},this.setDrawingBufferSize=function(E,O,W){J=E,le=O,q=W,t.width=Math.floor(E*W),t.height=Math.floor(O*W),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(Ie)},this.setViewport=function(E,O,W,X){E.isVector4?Ie.set(E.x,E.y,E.z,E.w):Ie.set(E,O,W,X),ye.viewport(D.copy(Ie).multiplyScalar(q).round())},this.getScissor=function(E){return E.copy(Qe)},this.setScissor=function(E,O,W,X){E.isVector4?Qe.set(E.x,E.y,E.z,E.w):Qe.set(E,O,W,X),ye.scissor(V.copy(Qe).multiplyScalar(q).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(E){ye.setScissorTest(de=E)},this.setOpaqueSort=function(E){me=E},this.setTransparentSort=function(E){Me=E},this.getClearColor=function(E){return E.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor.apply(We,arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha.apply(We,arguments)},this.clear=function(E=!0,O=!0,W=!0){let X=0;if(E){let z=!1;if(P!==null){let pe=P.texture.format;z=pe===pl||pe===dl||pe===fl}if(z){let pe=P.texture.type,Ee=pe===Zn||pe===Ni||pe===ur||pe===bs||pe===ll||pe===hl,Ne=We.getClearColor(),Ue=We.getClearAlpha(),je=Ne.r,it=Ne.g,Fe=Ne.b;Ee?(g[0]=je,g[1]=it,g[2]=Fe,g[3]=Ue,S.clearBufferuiv(S.COLOR,0,g)):(_[0]=je,_[1]=it,_[2]=Fe,_[3]=Ue,S.clearBufferiv(S.COLOR,0,_))}else X|=S.COLOR_BUFFER_BIT}O&&(X|=S.DEPTH_BUFFER_BIT),W&&(X|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),S.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Ae.dispose(),ct.dispose(),xe.dispose(),M.dispose(),B.dispose(),$.dispose(),pt.dispose(),F.dispose(),De.dispose(),K.dispose(),K.removeEventListener("sessionstart",ee),K.removeEventListener("sessionend",Ge),qe.stop()};function ie(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let E=Je.autoReset,O=we.enabled,W=we.autoUpdate,X=we.needsUpdate,z=we.type;_e(),Je.autoReset=E,we.enabled=O,we.autoUpdate=W,we.needsUpdate=X,we.type=z}function be(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function et(E){let O=E.target;O.removeEventListener("dispose",et),It(O)}function It(E){Gt(E),xe.remove(E)}function Gt(E){let O=xe.get(E).programs;O!==void 0&&(O.forEach(function(W){De.releaseProgram(W)}),E.isShaderMaterial&&De.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,W,X,z,pe){O===null&&(O=Ke);let Ee=z.isMesh&&z.matrixWorld.determinant()<0,Ne=Mt(E,O,W,X,z);ye.setMaterial(X,Ee);let Ue=W.index,je=1;if(X.wireframe===!0){if(Ue=se.getWireframeAttribute(W),Ue===void 0)return;je=2}let it=W.drawRange,Fe=W.attributes.position,ft=it.start*je,wt=(it.start+it.count)*je;pe!==null&&(ft=Math.max(ft,pe.start*je),wt=Math.min(wt,(pe.start+pe.count)*je)),Ue!==null?(ft=Math.max(ft,0),wt=Math.min(wt,Ue.count)):Fe!=null&&(ft=Math.max(ft,0),wt=Math.min(wt,Fe.count));let Rt=wt-ft;if(Rt<0||Rt===1/0)return;pt.setup(z,X,Ne,W,Ue);let on,mt=Te;if(Ue!==null&&(on=te.get(Ue),mt=ot,mt.setIndex(on)),z.isMesh)X.wireframe===!0?(ye.setLineWidth(X.wireframeLinewidth*L()),mt.setMode(S.LINES)):mt.setMode(S.TRIANGLES);else if(z.isLine){let Oe=X.linewidth;Oe===void 0&&(Oe=1),ye.setLineWidth(Oe*L()),z.isLineSegments?mt.setMode(S.LINES):z.isLineLoop?mt.setMode(S.LINE_LOOP):mt.setMode(S.LINE_STRIP)}else z.isPoints?mt.setMode(S.POINTS):z.isSprite&&mt.setMode(S.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)mt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(ue.get("WEBGL_multi_draw"))mt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let Oe=z._multiDrawStarts,Fn=z._multiDrawCounts,gt=z._multiDrawCount,bn=Ue?te.get(Ue).bytesPerElement:1,Gi=xe.get(X).currentProgram.getUniforms();for(let hn=0;hn<gt;hn++)Gi.setValue(S,"_gl_DrawID",hn),mt.render(Oe[hn]/bn,Fn[hn])}else if(z.isInstancedMesh)mt.renderInstances(ft,Rt,z.count);else if(W.isInstancedBufferGeometry){let Oe=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Fn=Math.min(W.instanceCount,Oe);mt.renderInstances(ft,Rt,Fn)}else mt.render(ft,Rt)};function w(E,O,W){E.transparent===!0&&E.side===Lt&&E.forceSinglePass===!1?(E.side=Xt,E.needsUpdate=!0,Be(E,O,W),E.side=Un,E.needsUpdate=!0,Be(E,O,W),E.side=Lt):Be(E,O,W)}this.compile=function(E,O,W=null){W===null&&(W=E),d=ct.get(W),d.init(O),y.push(d),W.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),E!==W&&E.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),d.setupLights();let X=new Set;return E.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let pe=z.material;if(pe)if(Array.isArray(pe))for(let Ee=0;Ee<pe.length;Ee++){let Ne=pe[Ee];w(Ne,W,z),X.add(Ne)}else w(pe,W,z),X.add(pe)}),y.pop(),d=null,X},this.compileAsync=function(E,O,W=null){let X=this.compile(E,O,W);return new Promise(z=>{function pe(){if(X.forEach(function(Ee){xe.get(Ee).currentProgram.isReady()&&X.delete(Ee)}),X.size===0){z(E);return}setTimeout(pe,10)}ue.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let U=null;function Q(E){U&&U(E)}function ee(){qe.stop()}function Ge(){qe.start()}let qe=new nf;qe.setAnimationLoop(Q),typeof self<"u"&&qe.setContext(self),this.setAnimationLoop=function(E){U=E,K.setAnimationLoop(E),E===null?qe.stop():qe.start()},K.addEventListener("sessionstart",ee),K.addEventListener("sessionend",Ge),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(O),O=K.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,O,P),d=ct.get(E,y.length),d.init(O),y.push(d),Pe.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),k.setFromProjectionMatrix(Pe),re=this.localClippingEnabled,j=ae.init(this.clippingPlanes,re),m=Ae.get(E,v.length),m.init(),v.push(m),K.enabled===!0&&K.isPresenting===!0){let pe=x.xr.getDepthSensingMesh();pe!==null&&Ye(pe,O,-1/0,x.sortObjects)}Ye(E,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(me,Me),$e=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,$e&&We.addToRenderList(m,E),this.info.render.frame++,j===!0&&ae.beginShadows();let W=d.state.shadowsArray;we.render(W,E,O),j===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();let X=m.opaque,z=m.transmissive;if(d.setupLights(),O.isArrayCamera){let pe=O.cameras;if(z.length>0)for(let Ee=0,Ne=pe.length;Ee<Ne;Ee++){let Ue=pe[Ee];Y(X,z,E,Ue)}$e&&We.render(E);for(let Ee=0,Ne=pe.length;Ee<Ne;Ee++){let Ue=pe[Ee];H(m,E,Ue,Ue.viewport)}}else z.length>0&&Y(X,z,E,O),$e&&We.render(E),H(m,E,O);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),E.isScene===!0&&E.onAfterRender(x,E,O),pt.resetDefaultState(),T=-1,b=null,y.pop(),y.length>0?(d=y[y.length-1],j===!0&&ae.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Ye(E,O,W,X){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)d.pushLight(E),E.castShadow&&d.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||k.intersectsSprite(E)){X&&ke.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Pe);let Ee=$.update(E),Ne=E.material;Ne.visible&&m.push(E,Ee,Ne,W,ke.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||k.intersectsObject(E))){let Ee=$.update(E),Ne=E.material;if(X&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ke.copy(E.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),ke.copy(Ee.boundingSphere.center)),ke.applyMatrix4(E.matrixWorld).applyMatrix4(Pe)),Array.isArray(Ne)){let Ue=Ee.groups;for(let je=0,it=Ue.length;je<it;je++){let Fe=Ue[je],ft=Ne[Fe.materialIndex];ft&&ft.visible&&m.push(E,Ee,ft,W,ke.z,Fe)}}else Ne.visible&&m.push(E,Ee,Ne,W,ke.z,null)}}let pe=E.children;for(let Ee=0,Ne=pe.length;Ee<Ne;Ee++)Ye(pe[Ee],O,W,X)}function H(E,O,W,X){let z=E.opaque,pe=E.transmissive,Ee=E.transparent;d.setupLightsView(W),j===!0&&ae.setGlobalState(x.clippingPlanes,W),X&&ye.viewport(D.copy(X)),z.length>0&&ce(z,O,W),pe.length>0&&ce(pe,O,W),Ee.length>0&&ce(Ee,O,W),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function Y(E,O,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[X.id]===void 0&&(d.state.transmissionRenderTarget[X.id]=new Jn(1,1,{generateMipmaps:!0,type:ue.has("EXT_color_buffer_half_float")||ue.has("EXT_color_buffer_float")?vr:Zn,minFilter:Nn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:lt.workingColorSpace}));let pe=d.state.transmissionRenderTarget[X.id],Ee=X.viewport||D;pe.setSize(Ee.z,Ee.w);let Ne=x.getRenderTarget();x.setRenderTarget(pe),x.getClearColor(Z),ne=x.getClearAlpha(),ne<1&&x.setClearColor(16777215,.5),x.clear(),$e&&We.render(W);let Ue=x.toneMapping;x.toneMapping=mi;let je=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),d.setupLightsView(X),j===!0&&ae.setGlobalState(x.clippingPlanes,X),ce(E,W,X),A.updateMultisampleRenderTarget(pe),A.updateRenderTargetMipmap(pe),ue.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let Fe=0,ft=O.length;Fe<ft;Fe++){let wt=O[Fe],Rt=wt.object,on=wt.geometry,mt=wt.material,Oe=wt.group;if(mt.side===Lt&&Rt.layers.test(X.layers)){let Fn=mt.side;mt.side=Xt,mt.needsUpdate=!0,He(Rt,W,X,on,mt,Oe),mt.side=Fn,mt.needsUpdate=!0,it=!0}}it===!0&&(A.updateMultisampleRenderTarget(pe),A.updateRenderTargetMipmap(pe))}x.setRenderTarget(Ne),x.setClearColor(Z,ne),je!==void 0&&(X.viewport=je),x.toneMapping=Ue}function ce(E,O,W){let X=O.isScene===!0?O.overrideMaterial:null;for(let z=0,pe=E.length;z<pe;z++){let Ee=E[z],Ne=Ee.object,Ue=Ee.geometry,je=X===null?Ee.material:X,it=Ee.group;Ne.layers.test(W.layers)&&He(Ne,O,W,Ue,je,it)}}function He(E,O,W,X,z,pe){E.onBeforeRender(x,O,W,X,z,pe),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),z.onBeforeRender(x,O,W,X,E,pe),z.transparent===!0&&z.side===Lt&&z.forceSinglePass===!1?(z.side=Xt,z.needsUpdate=!0,x.renderBufferDirect(W,O,X,z,E,pe),z.side=Un,z.needsUpdate=!0,x.renderBufferDirect(W,O,X,z,E,pe),z.side=Lt):x.renderBufferDirect(W,O,X,z,E,pe),E.onAfterRender(x,O,W,X,z,pe)}function Be(E,O,W){O.isScene!==!0&&(O=Ke);let X=xe.get(E),z=d.state.lights,pe=d.state.shadowsArray,Ee=z.state.version,Ne=De.getParameters(E,z.state,pe,O,W),Ue=De.getProgramCacheKey(Ne),je=X.programs;X.environment=E.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(E.isMeshStandardMaterial?B:M).get(E.envMap||X.environment),X.envMapRotation=X.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,je===void 0&&(E.addEventListener("dispose",et),je=new Map,X.programs=je);let it=je.get(Ue);if(it!==void 0){if(X.currentProgram===it&&X.lightsStateVersion===Ee)return nt(E,Ne),it}else Ne.uniforms=De.getUniforms(E),E.onBeforeCompile(Ne,x),it=De.acquireProgram(Ne,Ue),je.set(Ue,it),X.uniforms=Ne.uniforms;let Fe=X.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Fe.clippingPlanes=ae.uniform),nt(E,Ne),X.needsLights=Nt(E),X.lightsStateVersion=Ee,X.needsLights&&(Fe.ambientLightColor.value=z.state.ambient,Fe.lightProbe.value=z.state.probe,Fe.directionalLights.value=z.state.directional,Fe.directionalLightShadows.value=z.state.directionalShadow,Fe.spotLights.value=z.state.spot,Fe.spotLightShadows.value=z.state.spotShadow,Fe.rectAreaLights.value=z.state.rectArea,Fe.ltc_1.value=z.state.rectAreaLTC1,Fe.ltc_2.value=z.state.rectAreaLTC2,Fe.pointLights.value=z.state.point,Fe.pointLightShadows.value=z.state.pointShadow,Fe.hemisphereLights.value=z.state.hemi,Fe.directionalShadowMap.value=z.state.directionalShadowMap,Fe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Fe.spotShadowMap.value=z.state.spotShadowMap,Fe.spotLightMatrix.value=z.state.spotLightMatrix,Fe.spotLightMap.value=z.state.spotLightMap,Fe.pointShadowMap.value=z.state.pointShadowMap,Fe.pointShadowMatrix.value=z.state.pointShadowMatrix),X.currentProgram=it,X.uniformsList=null,it}function _t(E){if(E.uniformsList===null){let O=E.currentProgram.getUniforms();E.uniformsList=ys.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function nt(E,O){let W=xe.get(E);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function Mt(E,O,W,X,z){O.isScene!==!0&&(O=Ke),A.resetTextureUnits();let pe=O.fog,Ee=X.isMeshStandardMaterial?O.environment:null,Ne=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Zt,Ue=(X.isMeshStandardMaterial?B:M).get(X.envMap||Ee),je=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,it=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Fe=!!W.morphAttributes.position,ft=!!W.morphAttributes.normal,wt=!!W.morphAttributes.color,Rt=mi;X.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Rt=x.toneMapping);let on=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,mt=on!==void 0?on.length:0,Oe=xe.get(X),Fn=d.state.lights;if(j===!0&&(re===!0||E!==b)){let xn=E===b&&X.id===T;ae.setState(X,E,xn)}let gt=!1;X.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Fn.state.version||Oe.outputColorSpace!==Ne||z.isBatchedMesh&&Oe.batching===!1||!z.isBatchedMesh&&Oe.batching===!0||z.isBatchedMesh&&Oe.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Oe.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Oe.instancing===!1||!z.isInstancedMesh&&Oe.instancing===!0||z.isSkinnedMesh&&Oe.skinning===!1||!z.isSkinnedMesh&&Oe.skinning===!0||z.isInstancedMesh&&Oe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Oe.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Oe.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Oe.instancingMorph===!1&&z.morphTexture!==null||Oe.envMap!==Ue||X.fog===!0&&Oe.fog!==pe||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ae.numPlanes||Oe.numIntersection!==ae.numIntersection)||Oe.vertexAlphas!==je||Oe.vertexTangents!==it||Oe.morphTargets!==Fe||Oe.morphNormals!==ft||Oe.morphColors!==wt||Oe.toneMapping!==Rt||Oe.morphTargetsCount!==mt)&&(gt=!0):(gt=!0,Oe.__version=X.version);let bn=Oe.currentProgram;gt===!0&&(bn=Be(X,O,z));let Gi=!1,hn=!1,Xs=!1,Ct=bn.getUniforms(),Pn=Oe.uniforms;if(ye.useProgram(bn.program)&&(Gi=!0,hn=!0,Xs=!0),X.id!==T&&(T=X.id,hn=!0),Gi||b!==E){ye.buffers.depth.getReversed()?(he.copy(E.projectionMatrix),pp(he),mp(he),Ct.setValue(S,"projectionMatrix",he)):Ct.setValue(S,"projectionMatrix",E.projectionMatrix),Ct.setValue(S,"viewMatrix",E.matrixWorldInverse);let si=Ct.map.cameraPosition;si!==void 0&&si.setValue(S,Le.setFromMatrixPosition(E.matrixWorld)),fe.logarithmicDepthBuffer&&Ct.setValue(S,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Ct.setValue(S,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,hn=!0,Xs=!0)}if(z.isSkinnedMesh){Ct.setOptional(S,z,"bindMatrix"),Ct.setOptional(S,z,"bindMatrixInverse");let xn=z.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),Ct.setValue(S,"boneTexture",xn.boneTexture,A))}z.isBatchedMesh&&(Ct.setOptional(S,z,"batchingTexture"),Ct.setValue(S,"batchingTexture",z._matricesTexture,A),Ct.setOptional(S,z,"batchingIdTexture"),Ct.setValue(S,"batchingIdTexture",z._indirectTexture,A),Ct.setOptional(S,z,"batchingColorTexture"),z._colorsTexture!==null&&Ct.setValue(S,"batchingColorTexture",z._colorsTexture,A));let Ys=W.morphAttributes;if((Ys.position!==void 0||Ys.normal!==void 0||Ys.color!==void 0)&&Ze.update(z,W,bn),(hn||Oe.receiveShadow!==z.receiveShadow)&&(Oe.receiveShadow=z.receiveShadow,Ct.setValue(S,"receiveShadow",z.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Pn.envMap.value=Ue,Pn.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(Pn.envMapIntensity.value=O.environmentIntensity),hn&&(Ct.setValue(S,"toneMappingExposure",x.toneMappingExposure),Oe.needsLights&&St(Pn,Xs),pe&&X.fog===!0&&ge.refreshFogUniforms(Pn,pe),ge.refreshMaterialUniforms(Pn,X,q,le,d.state.transmissionRenderTarget[E.id]),ys.upload(S,_t(Oe),Pn,A)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ys.upload(S,_t(Oe),Pn,A),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Ct.setValue(S,"center",z.center),Ct.setValue(S,"modelViewMatrix",z.modelViewMatrix),Ct.setValue(S,"normalMatrix",z.normalMatrix),Ct.setValue(S,"modelMatrix",z.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){let xn=X.uniformsGroups;for(let si=0,ri=xn.length;si<ri;si++){let ch=xn[si];F.update(ch,bn),F.bind(ch,bn)}}return bn}function St(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function Nt(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(E,O,W){xe.get(E.texture).__webglTexture=O,xe.get(E.depthTexture).__webglTexture=W;let X=xe.get(E);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){let W=xe.get(E);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,W=0){P=E,C=O,R=W;let X=!0,z=null,pe=!1,Ee=!1;if(E){let Ue=xe.get(E);if(Ue.__useDefaultFramebuffer!==void 0)ye.bindFramebuffer(S.FRAMEBUFFER,null),X=!1;else if(Ue.__webglFramebuffer===void 0)A.setupRenderTarget(E);else if(Ue.__hasExternalTextures)A.rebindTextures(E,xe.get(E.texture).__webglTexture,xe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Fe=E.depthTexture;if(Ue.__boundDepthTexture!==Fe){if(Fe!==null&&xe.has(Fe)&&(E.width!==Fe.image.width||E.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(E)}}let je=E.texture;(je.isData3DTexture||je.isDataArrayTexture||je.isCompressedArrayTexture)&&(Ee=!0);let it=xe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(it[O])?z=it[O][W]:z=it[O],pe=!0):E.samples>0&&A.useMultisampledRTT(E)===!1?z=xe.get(E).__webglMultisampledFramebuffer:Array.isArray(it)?z=it[W]:z=it,D.copy(E.viewport),V.copy(E.scissor),G=E.scissorTest}else D.copy(Ie).multiplyScalar(q).floor(),V.copy(Qe).multiplyScalar(q).floor(),G=de;if(ye.bindFramebuffer(S.FRAMEBUFFER,z)&&X&&ye.drawBuffers(E,z),ye.viewport(D),ye.scissor(V),ye.setScissorTest(G),pe){let Ue=xe.get(E.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ue.__webglTexture,W)}else if(Ee){let Ue=xe.get(E.texture),je=O||0;S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,Ue.__webglTexture,W||0,je)}T=-1},this.readRenderTargetPixels=function(E,O,W,X,z,pe,Ee){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ne=Ne[Ee]),Ne){ye.bindFramebuffer(S.FRAMEBUFFER,Ne);try{let Ue=E.texture,je=Ue.format,it=Ue.type;if(!fe.textureFormatReadable(je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!fe.textureTypeReadable(it)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-X&&W>=0&&W<=E.height-z&&S.readPixels(O,W,X,z,Re.convert(je),Re.convert(it),pe)}finally{let Ue=P!==null?xe.get(P).__webglFramebuffer:null;ye.bindFramebuffer(S.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(E,O,W,X,z,pe,Ee){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ne=Ne[Ee]),Ne){let Ue=E.texture,je=Ue.format,it=Ue.type;if(!fe.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!fe.textureTypeReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-X&&W>=0&&W<=E.height-z){ye.bindFramebuffer(S.FRAMEBUFFER,Ne);let Fe=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,Fe),S.bufferData(S.PIXEL_PACK_BUFFER,pe.byteLength,S.STREAM_READ),S.readPixels(O,W,X,z,Re.convert(je),Re.convert(it),0);let ft=P!==null?xe.get(P).__webglFramebuffer:null;ye.bindFramebuffer(S.FRAMEBUFFER,ft);let wt=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await dp(S,wt,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,Fe),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,pe),S.deleteBuffer(Fe),S.deleteSync(wt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,W=0){E.isTexture!==!0&&(sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);let X=Math.pow(2,-W),z=Math.floor(E.image.width*X),pe=Math.floor(E.image.height*X),Ee=O!==null?O.x:0,Ne=O!==null?O.y:0;A.setTexture2D(E,0),S.copyTexSubImage2D(S.TEXTURE_2D,W,0,0,Ee,Ne,z,pe),ye.unbindTexture()},this.copyTextureToTexture=function(E,O,W=null,X=null,z=0){E.isTexture!==!0&&(sr("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,E=arguments[1],O=arguments[2],z=arguments[3]||0,W=null);let pe,Ee,Ne,Ue,je,it,Fe,ft,wt,Rt=E.isCompressedTexture?E.mipmaps[z]:E.image;W!==null?(pe=W.max.x-W.min.x,Ee=W.max.y-W.min.y,Ne=W.isBox3?W.max.z-W.min.z:1,Ue=W.min.x,je=W.min.y,it=W.isBox3?W.min.z:0):(pe=Rt.width,Ee=Rt.height,Ne=Rt.depth||1,Ue=0,je=0,it=0),X!==null?(Fe=X.x,ft=X.y,wt=X.z):(Fe=0,ft=0,wt=0);let on=Re.convert(O.format),mt=Re.convert(O.type),Oe;O.isData3DTexture?(A.setTexture3D(O,0),Oe=S.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),Oe=S.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),Oe=S.TEXTURE_2D),S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,O.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,O.unpackAlignment);let Fn=S.getParameter(S.UNPACK_ROW_LENGTH),gt=S.getParameter(S.UNPACK_IMAGE_HEIGHT),bn=S.getParameter(S.UNPACK_SKIP_PIXELS),Gi=S.getParameter(S.UNPACK_SKIP_ROWS),hn=S.getParameter(S.UNPACK_SKIP_IMAGES);S.pixelStorei(S.UNPACK_ROW_LENGTH,Rt.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Rt.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Ue),S.pixelStorei(S.UNPACK_SKIP_ROWS,je),S.pixelStorei(S.UNPACK_SKIP_IMAGES,it);let Xs=E.isDataArrayTexture||E.isData3DTexture,Ct=O.isDataArrayTexture||O.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){let Pn=xe.get(E),Ys=xe.get(O),xn=xe.get(Pn.__renderTarget),si=xe.get(Ys.__renderTarget);ye.bindFramebuffer(S.READ_FRAMEBUFFER,xn.__webglFramebuffer),ye.bindFramebuffer(S.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let ri=0;ri<Ne;ri++)Xs&&S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,xe.get(E).__webglTexture,z,it+ri),E.isDepthTexture?(Ct&&S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,xe.get(O).__webglTexture,z,wt+ri),S.blitFramebuffer(Ue,je,pe,Ee,Fe,ft,pe,Ee,S.DEPTH_BUFFER_BIT,S.NEAREST)):Ct?S.copyTexSubImage3D(Oe,z,Fe,ft,wt+ri,Ue,je,pe,Ee):S.copyTexSubImage2D(Oe,z,Fe,ft,wt+ri,Ue,je,pe,Ee);ye.bindFramebuffer(S.READ_FRAMEBUFFER,null),ye.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else Ct?E.isDataTexture||E.isData3DTexture?S.texSubImage3D(Oe,z,Fe,ft,wt,pe,Ee,Ne,on,mt,Rt.data):O.isCompressedArrayTexture?S.compressedTexSubImage3D(Oe,z,Fe,ft,wt,pe,Ee,Ne,on,Rt.data):S.texSubImage3D(Oe,z,Fe,ft,wt,pe,Ee,Ne,on,mt,Rt):E.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,z,Fe,ft,pe,Ee,on,mt,Rt.data):E.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,z,Fe,ft,Rt.width,Rt.height,on,Rt.data):S.texSubImage2D(S.TEXTURE_2D,z,Fe,ft,pe,Ee,on,mt,Rt);S.pixelStorei(S.UNPACK_ROW_LENGTH,Fn),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,gt),S.pixelStorei(S.UNPACK_SKIP_PIXELS,bn),S.pixelStorei(S.UNPACK_SKIP_ROWS,Gi),S.pixelStorei(S.UNPACK_SKIP_IMAGES,hn),z===0&&O.generateMipmaps&&S.generateMipmap(Oe),ye.unbindTexture()},this.copyTextureToTexture3D=function(E,O,W=null,X=null,z=0){return E.isTexture!==!0&&(sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,E=arguments[2],O=arguments[3],z=arguments[4]||0),sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,O,W,X,z)},this.initRenderTarget=function(E){xe.get(E).__webglFramebuffer===void 0&&A.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),ye.unbindTexture()},this.resetState=function(){C=0,R=0,P=null,ye.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}};var To=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ce(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},wo=class extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ps=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rc,this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},nn=new N,Ui=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=An(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=An(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=An(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=An(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=An(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),s=yt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),s=yt(s,this.array),r=yt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Et(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},pr=class extends Qt{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},as,$s=new N,cs=new N,ls=new N,hs=new Xe,js=new Xe,cf=new tt,$r=new N,Qs=new N,jr=new N,_u=new Xe,Ba=new Xe,yu=new Xe,Ao=class extends vt{constructor(e=new pr){if(super(),this.isSprite=!0,this.type="Sprite",as===void 0){as=new At;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ps(t,5);as.setIndex([0,1,2,0,2,3]),as.setAttribute("position",new Ui(n,3,0,!1)),as.setAttribute("uv",new Ui(n,2,3,!1))}this.geometry=as,this.material=e,this.center=new Xe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),cs.setFromMatrixScale(this.matrixWorld),cf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ls.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cs.multiplyScalar(-ls.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Qr($r.set(-.5,-.5,0),ls,o,cs,s,r),Qr(Qs.set(.5,-.5,0),ls,o,cs,s,r),Qr(jr.set(.5,.5,0),ls,o,cs,s,r),_u.set(0,0),Ba.set(1,0),yu.set(1,1);let a=e.ray.intersectTriangle($r,Qs,jr,!1,$s);if(a===null&&(Qr(Qs.set(-.5,.5,0),ls,o,cs,s,r),Ba.set(0,1),a=e.ray.intersectTriangle($r,jr,Qs,!1,$s),a===null))return;let c=e.ray.origin.distanceTo($s);c<e.near||c>e.far||t.push({distance:c,point:$s.clone(),uv:fi.getInterpolation($s,$r,Qs,jr,_u,Ba,yu,new Xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Qr(i,e,t,n,s,r){hs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(js.x=r*hs.x-s*hs.y,js.y=s*hs.x+r*hs.y):js.copy(hs),i.copy(e),i.x+=js.x,i.y+=js.y,i.applyMatrix4(cf)}var vu=new N,Mu=new dt,Su=new dt,l_=new N,bu=new tt,eo=new N,ka=new dn,Eu=new tt,Ha=new Rs,Ls=class extends ze{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Eh,this.bindMatrix=new tt,this.bindMatrixInverse=new tt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new vn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,eo),this.boundingBox.expandByPoint(eo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new dn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,eo),this.boundingSphere.expandByPoint(eo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ka.copy(this.boundingSphere),ka.applyMatrix4(s),e.ray.intersectsSphere(ka)!==!1&&(Eu.copy(s).invert(),Ha.copy(e.ray).applyMatrix4(Eu),!(this.boundingBox!==null&&Ha.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ha)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new dt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Eh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ud?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Mu.fromBufferAttribute(s.attributes.skinIndex,e),Su.fromBufferAttribute(s.attributes.skinWeight,e),vu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Su.getComponent(r);if(o!==0){let a=Mu.getComponent(r);bu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(l_.copy(vu).applyMatrix4(bu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},mr=class extends vt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ro=class extends Yt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=kt,h=kt,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Tu=new tt,h_=new tt,Co=class i{constructor(e=[],t=[]){this.uuid=Cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new tt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new tt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:h_;Tu.multiplyMatrices(a,t[r]),Tu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ro(t,e,e,yn,Rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new mr),this.bones.push(o),this.boneInverses.push(new tt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Fi=class extends Et{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},us=new tt,wu=new tt,to=[],Au=new vn,u_=new tt,er=new ze,tr=new dn,$n=class extends ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Fi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,u_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,us),Au.copy(e.boundingBox).applyMatrix4(us),this.boundingBox.union(Au)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new dn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,us),tr.copy(e.boundingSphere).applyMatrix4(us),this.boundingSphere.union(tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(er.geometry=this.geometry,er.material=this.material,er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tr.copy(this.boundingSphere),tr.applyMatrix4(n),e.ray.intersectsSphere(tr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,us),wu.multiplyMatrices(n,us),er.matrixWorld=wu,er.raycast(e,to);for(let o=0,a=to.length;o<a;o++){let c=to[o];c.instanceId=r,c.object=this,t.push(c)}to.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Fi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ro(new Float32Array(s*this.count),s,this.count,ul,Rn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var gr=class extends Qt{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Io=new N,Po=new N,Ru=new tt,nr=new Rs,no=new dn,Va=new N,Cu=new N,Ds=class extends vt{constructor(e=new At,t=new gr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Io.fromBufferAttribute(t,s-1),Po.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Io.distanceTo(Po);e.setAttribute("lineDistance",new ht(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(s),no.radius+=r,e.ray.intersectsSphere(no)===!1)return;Ru.copy(s).invert(),nr.copy(e.ray).applyMatrix4(Ru);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){let d=h.getX(_),v=h.getX(_+1),y=io(this,e,nr,c,d,v);y&&t.push(y)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(p),d=io(this,e,nr,c,_,m);d&&t.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){let d=io(this,e,nr,c,_,_+1);d&&t.push(d)}if(this.isLineLoop){let _=io(this,e,nr,c,g-1,p);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function io(i,e,t,n,s,r){let o=i.geometry.attributes.position;if(Io.fromBufferAttribute(o,s),Po.fromBufferAttribute(o,r),t.distanceSqToSegment(Io,Po,Va,Cu)>n)return;Va.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Va);if(!(c<e.near||c>e.far))return{distance:c,point:Cu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var Iu=new N,Pu=new N,Lo=class extends Ds{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Iu.fromBufferAttribute(t,s),Pu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Iu.distanceTo(Pu);e.setAttribute("lineDistance",new ht(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Do=class extends Ds{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Oi=class extends Qt{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Lu=new tt,Xc=new Rs,so=new dn,ro=new N,Ns=class extends vt{constructor(e=new At,t=new Oi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),so.copy(n.boundingSphere),so.applyMatrix4(s),so.radius+=r,e.ray.intersectsSphere(so)===!1)return;Lu.copy(s).invert(),Xc.copy(e.ray).applyMatrix4(Lu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=f,_=p;g<_;g++){let m=l.getX(g);ro.fromBufferAttribute(u,m),Du(ro,m,c,s,e,t,this)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=f,_=p;g<_;g++)ro.fromBufferAttribute(u,g),Du(ro,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Du(i,e,t,n,s,r,o){let a=Xc.distanceSqToPoint(i);if(a<t){let c=new N;Xc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Us=class extends Yt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var xr=class i extends At{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new N,h=new Xe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let p=n+u/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ht(o,3)),this.setAttribute("normal",new ht(a,3)),this.setAttribute("uv",new ht(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},en=class i extends At{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],p=[],g=0,_=[],m=n/2,d=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ht(u,3)),this.setAttribute("normal",new ht(f,3)),this.setAttribute("uv",new ht(p,2));function v(){let x=new N,I=new N,C=0,R=(t-e)/n;for(let P=0;P<=r;P++){let T=[],b=P/r,D=b*(t-e)+e;for(let V=0;V<=s;V++){let G=V/s,Z=G*c+a,ne=Math.sin(Z),J=Math.cos(Z);I.x=D*ne,I.y=-b*n+m,I.z=D*J,u.push(I.x,I.y,I.z),x.set(ne,R,J).normalize(),f.push(x.x,x.y,x.z),p.push(G,1-b),T.push(g++)}_.push(T)}for(let P=0;P<s;P++)for(let T=0;T<r;T++){let b=_[T][P],D=_[T+1][P],V=_[T+1][P+1],G=_[T][P+1];(e>0||T!==0)&&(h.push(b,D,G),C+=3),(t>0||T!==r-1)&&(h.push(D,V,G),C+=3)}l.addGroup(d,C,0),d+=C}function y(x){let I=g,C=new Xe,R=new N,P=0,T=x===!0?e:t,b=x===!0?1:-1;for(let V=1;V<=s;V++)u.push(0,m*b,0),f.push(0,b,0),p.push(.5,.5),g++;let D=g;for(let V=0;V<=s;V++){let Z=V/s*c+a,ne=Math.cos(Z),J=Math.sin(Z);R.x=T*J,R.y=m*b,R.z=T*ne,u.push(R.x,R.y,R.z),f.push(0,b,0),C.x=ne*.5+.5,C.y=J*.5*b+.5,p.push(C.x,C.y),g++}for(let V=0;V<s;V++){let G=I+V,Z=D+V;x===!0?h.push(Z,Z+1,G):h.push(Z+1,Z,G),P+=3}l.addGroup(d,P,x===!0?1:2),d+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},jn=class i extends en{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},No=class i extends At{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new ht(r,3)),this.setAttribute("normal",new ht(r.slice(),3)),this.setAttribute("uv",new ht(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let y=new N,x=new N,I=new N;for(let C=0;C<t.length;C+=3)p(t[C+0],y),p(t[C+1],x),p(t[C+2],I),c(y,x,I,v)}function c(v,y,x,I){let C=I+1,R=[];for(let P=0;P<=C;P++){R[P]=[];let T=v.clone().lerp(x,P/C),b=y.clone().lerp(x,P/C),D=C-P;for(let V=0;V<=D;V++)V===0&&P===C?R[P][V]=T:R[P][V]=T.clone().lerp(b,V/D)}for(let P=0;P<C;P++)for(let T=0;T<2*(C-P)-1;T++){let b=Math.floor(T/2);T%2===0?(f(R[P][b+1]),f(R[P+1][b]),f(R[P][b])):(f(R[P][b+1]),f(R[P+1][b+1]),f(R[P+1][b]))}}function l(v){let y=new N;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(v),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function h(){let v=new N;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];let x=m(v)/2/Math.PI+.5,I=d(v)/Math.PI+.5;o.push(x,1-I)}g(),u()}function u(){for(let v=0;v<o.length;v+=6){let y=o[v+0],x=o[v+2],I=o[v+4],C=Math.max(y,x,I),R=Math.min(y,x,I);C>.9&&R<.1&&(y<.2&&(o[v+0]+=1),x<.2&&(o[v+2]+=1),I<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function p(v,y){let x=v*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function g(){let v=new N,y=new N,x=new N,I=new N,C=new Xe,R=new Xe,P=new Xe;for(let T=0,b=0;T<r.length;T+=9,b+=6){v.set(r[T+0],r[T+1],r[T+2]),y.set(r[T+3],r[T+4],r[T+5]),x.set(r[T+6],r[T+7],r[T+8]),C.set(o[b+0],o[b+1]),R.set(o[b+2],o[b+3]),P.set(o[b+4],o[b+5]),I.copy(v).add(y).add(x).divideScalar(3);let D=m(I);_(C,b+0,v,D),_(R,b+2,y,D),_(P,b+4,x,D)}}function _(v,y,x,I){I<0&&v.x===1&&(o[y]=v.x-1),x.x===0&&x.z===0&&(o[y]=I/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function d(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var zi=class i extends No{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Uo=class i extends No{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Fs=class i extends At{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=e,f=(t-e)/s,p=new N,g=new Xe;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){let d=r+m/n*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){let m=_*(n+1);for(let d=0;d<n;d++){let v=d+m,y=v,x=v+n+1,I=v+n+2,C=v+1;a.push(y,x,C),a.push(x,I,C)}}this.setIndex(a),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(l,3)),this.setAttribute("uv",new ht(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var qt=class i extends At{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new N,f=new N,p=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){let v=[],y=d/n,x=0;d===0&&o===0?x=.5/t:d===n&&c===Math.PI&&(x=-.5/t);for(let I=0;I<=t;I++){let C=I/t;u.x=-e*Math.cos(s+C*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(s+C*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(C+x,1-y),v.push(l++)}h.push(v)}for(let d=0;d<n;d++)for(let v=0;v<t;v++){let y=h[d][v+1],x=h[d][v],I=h[d+1][v],C=h[d+1][v+1];(d!==0||o>0)&&p.push(y,x,C),(d!==n-1||c<Math.PI)&&p.push(x,I,C)}this.setIndex(p),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Bi=class i extends At{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new N,u=new N,f=new N;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){let _=g/s*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){let _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,v=(s+1)*p+g;o.push(_,m,v),o.push(m,d,v)}this.setIndex(o),this.setAttribute("position",new ht(a,3)),this.setAttribute("normal",new ht(c,3)),this.setAttribute("uv",new ht(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Os=class extends Qt{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},mn=class extends Os{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Xe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ut=class extends Qt{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new Ce(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var zs=class extends Qt{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yo,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function oo(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function f_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function d_(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Nu(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function lf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var xi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Yc=class extends xi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ds,endingEnd:ds}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case ps:r=e,a=2*t-n;break;case fo:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case ps:o=e,c=2*n-t;break;case fo:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,d=-f*m+2*f*_-f*g,v=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,y=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let I=0;I!==a;++I)r[I]=d*o[h+I]+v*o[l+I]+y*o[c+I]+x*o[u+I];return r}},Fo=class extends xi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},qc=class extends xi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Mn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=oo(t,this.TimeBufferType),this.values=oo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:oo(e.times,Array),values:oo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new qc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Yc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ts:t=this.InterpolantFactoryMethodDiscrete;break;case ws:t=this.InterpolantFactoryMethodLinear;break;case fa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ts;case this.InterpolantFactoryMethodLinear:return ws;case this.InterpolantFactoryMethodSmooth:return fa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&f_(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===fa,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,f=u-n,p=u+n;for(let g=0;g!==n;++g){let _=t[u+g];if(_!==t[f+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let p=0;p!==n;++p)t[f+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=ws;var _i=class extends Mn{constructor(e,t,n){super(e,t,n)}};_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=Ts;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends Mn{};Oo.prototype.ValueTypeName="color";var Qn=class extends Mn{};Qn.prototype.ValueTypeName="number";var Zc=class extends xi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)cn.slerpFlat(r,0,o,l-a,o,l,c);return r}},ei=class extends Mn{InterpolantFactoryMethodLinear(e){return new Zc(this.times,this.values,this.getValueSize(),e)}};ei.prototype.ValueTypeName="quaternion";ei.prototype.InterpolantFactoryMethodSmooth=void 0;var yi=class extends Mn{constructor(e,t,n){super(e,t,n)}};yi.prototype.ValueTypeName="string";yi.prototype.ValueBufferType=Array;yi.prototype.DefaultInterpolation=Ts;yi.prototype.InterpolantFactoryMethodLinear=void 0;yi.prototype.InterpolantFactoryMethodSmooth=void 0;var ti=class extends Mn{};ti.prototype.ValueTypeName="vector";var Bs=class{constructor(e="",t=-1,n=[],s=ml){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Cn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(m_(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Mn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=d_(c);c=Nu(c,1,h),l=Nu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Qn(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,p,g,_){if(p.length!==0){let m=[],d=[];lf(p,m,d,g),m.length!==0&&_.push(new u(f,m,d))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let p={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)p[f[g].morphTargets[_]]=-1;for(let _ in p){let m=[],d=[];for(let v=0;v!==f[g].morphTargets.length;++v){let y=f[g];m.push(y.time),d.push(y.morphTarget===_?1:0)}s.push(new Qn(".morphTargetInfluence["+_+"]",m,d))}c=p.length*o}else{let p=".bones["+t[u].name+"]";n(ti,p+".position",f,"pos",s),n(ei,p+".quaternion",f,"rot",s),n(ti,p+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function p_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Qn;case"vector":case"vector2":case"vector3":case"vector4":return ti;case"color":return Oo;case"quaternion":return ei;case"bool":case"boolean":return _i;case"string":return yi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function m_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=p_(i.type);if(i.times===void 0){let t=[],n=[];lf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var di={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Kc=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},g_=new Kc,ni=class{constructor(e){this.manager=e!==void 0?e:g_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ni.DEFAULT_MATERIAL_NAME="__DEFAULT";var Vn={},Jc=class extends Error{constructor(e,t){super(e),this.response=t}},_r=class extends ni{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=di.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Vn[e]!==void 0){Vn[e].push({onLoad:t,onProgress:n,onError:s});return}Vn[e]=[],Vn[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Vn[e],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=f?parseInt(f):0,g=p!==0,_=0,m=new ReadableStream({start(d){v();function v(){u.read().then(({done:y,value:x})=>{if(y)d.close();else{_+=x.byteLength;let I=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let C=0,R=h.length;C<R;C++){let P=h[C];P.onProgress&&P.onProgress(I)}d.enqueue(x),v()}},y=>{d.error(y)})}}});return new Response(m)}else throw new Jc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(f);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{di.add(e,l);let h=Vn[e];delete Vn[e];for(let u=0,f=h.length;u<f;u++){let p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{let h=Vn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Vn[e];for(let u=0,f=h.length;u<f;u++){let p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var $c=class extends ni{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=di.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=fr("img");function c(){h(),di.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var zo=class extends ni{constructor(e){super(e)}load(e,t,n,s){let r=new Yt,o=new $c(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},ks=class extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ce(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Bo=class extends ks{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ce(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ga=new tt,Uu=new N,Fu=new N,yr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dr,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Uu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Uu),Fu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Fu),t.updateMatrixWorld(),Ga.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ga),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ga)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},jc=class extends yr{constructor(){super(new zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=As*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ko=class extends ks{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new jc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Ou=new tt,ir=new N,Wa=new N,Qc=class extends yr{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Xe(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ir.setFromMatrixPosition(e.matrixWorld),n.position.copy(ir),Wa.copy(n.position),Wa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Wa),n.updateMatrixWorld(),s.makeTranslation(-ir.x,-ir.y,-ir.z),Ou.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ou)}},Ho=class extends ks{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Qc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},el=class extends yr{constructor(){super(new Is(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hs=class extends ks{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new el}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var vi=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Vo=class extends ni{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=di.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return di.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),di.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});di.add(e,c),r.manager.itemStart(e)}};var tl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){cn.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;cn.multiplyQuaternionsFlat(e,o,e,t,e,n),cn.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},_l="\\[\\]\\.:\\/",x_=new RegExp("["+_l+"]","g"),yl="[^"+_l+"]",__="[^"+_l.replace("\\.","")+"]",y_=/((?:WC+[\/:])*)/.source.replace("WC",yl),v_=/(WCOD+)?/.source.replace("WCOD",__),M_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yl),S_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yl),b_=new RegExp("^"+y_+v_+M_+S_+"$"),E_=["material","materials","bones","map"],nl=class{constructor(e,t,n){let s=n||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Tt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(x_,"")}static parseTrackName(e){let t=b_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);E_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Tt.Composite=nl;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var il=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:ds,endingEnd:ds};for(let l=0;l!==o;++l){let h=r[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Od,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Bd:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case ml:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===zd;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===Fd){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=ps,s.endingEnd=ps):(e?s.endingStart=this.zeroSlopeAtStart?ps:ds:s.endingStart=fo,t?s.endingEnd=this.zeroSlopeAtEnd?ps:ds:s.endingEnd=fo)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},T_=new Float32Array(1),Go=class extends Kn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=s[u],p=f.name,g=h[p];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}let _=t&&t._propertyBindings[u].binding.parsedPath;g=new tl(Tt.create(n,p,_),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Fo(new Float32Array(2),new Float32Array(2),1,T_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Bs.findByName(s,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=ml),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let h=new il(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Bs.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sl);function vl(i,e){if(e===Ku)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Mr||e===Xo){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Mr)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var Ko=class extends ni{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Al(t)}),this.register(function(t){return new Rl(t)}),this.register(function(t){return new Ol(t)}),this.register(function(t){return new zl(t)}),this.register(function(t){return new Bl(t)}),this.register(function(t){return new Il(t)}),this.register(function(t){return new Pl(t)}),this.register(function(t){return new Ll(t)}),this.register(function(t){return new Dl(t)}),this.register(function(t){return new wl(t)}),this.register(function(t){return new Nl(t)}),this.register(function(t){return new Cl(t)}),this.register(function(t){return new Fl(t)}),this.register(function(t){return new Ul(t)}),this.register(function(t){return new El(t)}),this.register(function(t){return new kl(t)}),this.register(function(t){return new Hl(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=vi.extractUrlBase(e);o=vi.resolveURL(l,this.path)}else o=vi.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new _r(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===mf){try{o[at.KHR_BINARY_GLTF]=new Vl(e)}catch(u){s&&s(u);return}r=JSON.parse(o[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Kl(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case at.KHR_MATERIALS_UNLIT:o[u]=new Tl;break;case at.KHR_DRACO_MESH_COMPRESSION:o[u]=new Gl(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:o[u]=new Wl;break;case at.KHR_MESH_QUANTIZATION:o[u]=new Xl;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function w_(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},El=class{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ce(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Zt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Hs(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ho(h),l.distance=u;break;case"spot":l=new ko(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,ii(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Tl=class{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return Pt}extendParams(e,t,n){let s=[];e.color=new Ce(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Zt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Ft))}return Promise.all(s)}},wl=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Al=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Xe(a,a)}return Promise.all(r)}},Rl=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Cl=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Il=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ce(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Zt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ft)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Pl=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Ll=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ce().setRGB(a[0],a[1],a[2],Zt),Promise.all(r)}},Dl=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Nl=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ce().setRGB(a[0],a[1],a[2],Zt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ft)),Promise.all(r)}},Ul=class{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Fl=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:mn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Ol=class{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},zl=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Bl=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},kl=class{constructor(e){this.name=at.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,f,s.mode,s.filter),p})})}else return null}},Hl=class{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Sn.TRIANGLES&&l.mode!==Sn.TRIANGLE_STRIP&&l.mode!==Sn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,p=[];for(let g of u){let _=new tt,m=new N,d=new cn,v=new N(1,1,1),y=new $n(g.geometry,g.material,f);for(let x=0;x<f;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,x),c.SCALE&&v.fromBufferAttribute(c.SCALE,x),y.setMatrixAt(x,_.compose(m,d,v));for(let x in c)if(x==="_COLOR_0"){let I=c[x];y.instanceColor=new Fi(I.array,I.itemSize,I.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);vt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),p.push(y)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},mf="glTF",Sr=12,uf={JSON:1313821514,BIN:5130562},Vl=class{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Sr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==mf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Sr,r=new DataView(e,Sr),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===uf.JSON){let l=new Uint8Array(e,Sr+o,a);this.content=n.decode(l)}else if(c===uf.BIN){let l=Sr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Gl=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=ql[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=ql[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[e.attributes[h]],p=Gs[f.componentType];l[u]=p.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(p){for(let g in p.attributes){let _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(p)},a,l,Zt,f)})})}},Wl=class{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Xl=class{constructor(){this.name=at.KHR_MESH_QUANTIZATION}},Jo=class extends xi{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,f=u*u,p=f*u,g=e*l,_=g-l,m=-2*p+3*f,d=p-f,v=1-m,y=d-f+u;for(let x=0;x!==a;x++){let I=o[_+x+a],C=o[_+x+c]*h,R=o[g+x+a],P=o[g+x]*h;r[x]=v*I+y*C+m*R+d*P}return r}},A_=new cn,Yl=class extends Jo{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return A_.fromArray(r).normalize().toArray(r),r}},Sn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Gs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ff={9728:kt,9729:an,9984:al,9985:or,9986:fs,9987:Nn},df={33071:Xn,33648:hr,10497:Di},Ml={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ql={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Mi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},R_={CUBICSPLINE:void 0,LINEAR:ws,STEP:Ts},Sl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function C_(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Os({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Un})),i.DefaultMaterial}function ki(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ii(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function I_(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function P_(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function L_(i){let e,t=i.extensions&&i.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+bl(t.attributes):e=i.indices+":"+bl(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+bl(i.targets[n]);return e}function bl(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Zl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function D_(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var N_=new tt,Kl=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new w_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new zo(this.options.manager):this.textureLoader=new Vo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _r(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ki(r,a,s),ii(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(vi.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=Ml[s.type],a=Gs[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Et(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Ml[s.type],l=Gs[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,_,m;if(p&&p!==u){let d=Math.floor(f/p),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+d+":"+s.count,y=t.cache.get(v);y||(_=new l(a,d*p,s.count*p/h),y=new Ps(_,p/h),t.cache.add(v,y)),m=new Ui(y,c,f%p/h,g)}else a===null?_=new l(s.count*c):_=new l(a,f,s.count*c),m=new Et(_,c,g);if(s.sparse!==void 0){let d=Ml.SCALAR,v=Gs[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,I=new v(o[1],y,s.sparse.count*d),C=new l(o[2],x,s.sparse.count*c);a!==null&&(m=new Et(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,P=I.length;R<P;R++){let T=I[R];if(m.setX(T,C[R*c]),c>=2&&m.setY(T,C[R*c+1]),c>=3&&m.setZ(T,C[R*c+2]),c>=4&&m.setW(T,C[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=ff[f.magFilter]||an,h.minFilter=ff[f.minFilter]||Nn,h.wrapS=df[f.wrapS]||Di,h.wrapT=df[f.wrapT]||Di,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==kt&&h.minFilter!==an,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,p){let g=f;t.isImageBitmapLoader===!0&&(g=function(_){let m=new Yt(_);m.needsUpdate=!0,f(m)}),t.load(vi.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),ii(u,o),u.userData.mimeType=o.mimeType||D_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Oi,Qt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new gr,Qt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Os}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[at.KHR_MATERIALS_UNLIT]){let u=s[at.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Ce(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Zt),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Ft)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Lt);let h=r.alphaMode||Sl.OPAQUE;if(h===Sl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Sl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Pt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Xe(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Pt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Pt){let u=r.emissiveFactor;a.emissive=new Ce().setRGB(u[0],u[1],u[2],Zt)}return r.emissiveTexture!==void 0&&o!==Pt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Ft)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),ii(u,r),t.associations.set(u,{materials:e}),r.extensions&&ki(s,u,r),u})}createUniqueName(e){let t=Tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return pf(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=L_(l),u=s[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[at.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=pf(new At,l,t),s[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?C_(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let _=h[p],m=o[p],d,v=l[p];if(m.mode===Sn.TRIANGLES||m.mode===Sn.TRIANGLE_STRIP||m.mode===Sn.TRIANGLE_FAN||m.mode===void 0)d=r.isSkinnedMesh===!0?new Ls(_,v):new ze(_,v),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),m.mode===Sn.TRIANGLE_STRIP?d.geometry=vl(d.geometry,Xo):m.mode===Sn.TRIANGLE_FAN&&(d.geometry=vl(d.geometry,Mr));else if(m.mode===Sn.LINES)d=new Lo(_,v);else if(m.mode===Sn.LINE_STRIP)d=new Ds(_,v);else if(m.mode===Sn.LINE_LOOP)d=new Do(_,v);else if(m.mode===Sn.POINTS)d=new Ns(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(d.geometry.morphAttributes).length>0&&P_(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),ii(d,r),m.extensions&&ki(s,d,m),t.assignFinalMaterial(d),u.push(d)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&ki(s,u[0],r),u[0];let f=new Bt;r.extensions&&ki(s,f,r),t.associations.set(f,{meshes:e});for(let p=0,g=u.length;p<g;p++)f.add(u[p]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new zt(ju.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Is(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ii(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let f=new tt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Co(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let p=s.channels[u],g=s.samplers[p.sampler],_=p.target,m=_.node,d=s.parameters!==void 0?s.parameters[g.input]:g.input,v=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",v)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],p=u[1],g=u[2],_=u[3],m=u[4],d=[];for(let v=0,y=f.length;v<y;v++){let x=f[v],I=p[v],C=g[v],R=_[v],P=m[v];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();let T=n._createAnimationTracks(x,I,C,R,P);if(T)for(let b=0;b<T.length;b++)d.push(T[b])}return new Bs(r,void 0,d)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(f,N_)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new mr:l.length>1?h=new Bt:l.length===1?h=l[0]:h=new vt,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),ii(h,r),r.extensions&&ki(n,h,r),r.matrix!==void 0){let u=new tt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Bt;n.name&&(r.name=s.createUniqueName(n.name)),ii(r,n),n.extensions&&ki(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,p]of s.associations)(f instanceof Qt||f instanceof Yt)&&u.set(f,p);return h.traverse(f=>{let p=s.associations.get(f);p!=null&&u.set(f,p)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];Mi[r.path]===Mi.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Mi[r.path]){case Mi.weights:l=Qn;break;case Mi.rotation:l=ei;break;case Mi.position:case Mi.scale:l=ti;break;default:switch(n.itemSize){case 1:l=Qn;break;case 2:case 3:default:l=ti;break}break}let h=s.interpolation!==void 0?R_[s.interpolation]:ws,u=this._getArrayFromAccessor(n);for(let f=0,p=c.length;f<p;f++){let g=new l(c[f]+"."+Mi[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Zl(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof ei?Yl:Jo;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function U_(i,e,t){let n=e.attributes,s=new vn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),a.normalized){let h=Zl(Gs[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new N,c=new N;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],p=f.min,g=f.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),f.normalized){let _=Zl(Gs[f.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new dn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function pf(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=ql[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return lt.workingColorSpace!==Zt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${lt.workingColorSpace}" not supported.`),ii(i,e),U_(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?I_(i,e.targets,t):i})}function gf(i){let e=new Map,t=new Map,n=i.clone();return xf(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function xf(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)xf(i.children[n],e.children[n],t)}var _f={meadow:{top:6080767,mid:10477823,fog:9426162,bot:7323530,near:72,far:230},canyon:{top:16742970,mid:16756858,fog:16751202,bot:12863520,near:64,far:200},sky:{top:8309759,mid:13168383,fog:12051711,bot:9357552,near:78,far:250},ice:{top:12971263,mid:15202047,fog:12049912,bot:7255791,near:70,far:230},climb:{top:16762218,mid:16769184,fog:16764806,bot:14716976,near:68,far:210},ship:{top:9426175,mid:16770992,fog:13165823,bot:9355504,near:80,far:240}};function yf(i){return _f[i]||_f.meadow}function xt(i){let e=Math.sin(i*127.1)*43758.5453;return e-Math.floor(e)}function vf(){let i=document.createElement("canvas");i.width=4,i.height=1;let e=i.getContext("2d");e.fillStyle="#b7c3dc",e.fillRect(0,0,1,1),e.fillStyle="#e7eef8",e.fillRect(1,0,1,1),e.fillStyle="#ffffff",e.fillRect(2,0,2,1);let t=new Us(i);return t.magFilter=kt,t.minFilter=kt,t.generateMipmaps=!1,t.colorSpace=Dn||Zt,t}function Dt(i,e){return new Ut({color:i,gradientMap:e,side:Lt})}function Mf(i,e,t){let n=new vt,s=new Ce,r=[];function o(L,S,oe,ue){if(!oe.length)return null;let fe=new $n(L,S,oe.length);return oe.forEach((ye,Je)=>{ue(n,ye,Je),n.updateMatrix(),fe.setMatrixAt(Je,n.matrix),ye.color&&(s.set(ye.color),fe.setColorAt(Je,s))}),fe.instanceMatrix.needsUpdate=!0,fe.instanceColor&&(fe.instanceColor.needsUpdate=!0),i.add(fe),r.push(fe),fe}let a={meadow:[],canyon:[],sky:[],ice:[],climb:[],ship:[]};for(let L of e.tiles)a[L.zone]&&(Math.abs(L.col)<2||Math.abs(L.col*5+L.row*3)%3===0&&a[L.zone].push(L));let c=new en(.12,.16,.45,7),l=new qt(.38,10,8),h=new jn(.28,1.15,5),u=new zi(.55,0),f=new qt(.32,8,6),p=new en(.18,.18,1.4,8),g=new zi(.9,0),_=a.meadow;o(c,Dt(16774885,t),_,(L,S,oe)=>{let ue=xt(oe+S.z);L.position.set(S.x+(S.col>0?.5:-.5)+(ue-.5)*1.4,S.y+.22,S.z+(xt(oe+3)-.5)*1.2),L.rotation.set(0,ue*4,0),L.scale.setScalar(.7+ue*.7)}),o(l,Dt(16736162,t),_,(L,S,oe)=>{let ue=xt(oe+S.z);L.position.set(S.x+(S.col>0?.5:-.5)+(ue-.5)*1.4,S.y+.55,S.z+(xt(oe+3)-.5)*1.2),L.rotation.set(0,ue*5,0);let fe=.65+xt(oe+8)*.7;L.scale.set(fe,fe*.62,fe)}),o(f,Dt(8378506,t),_.filter((L,S)=>S%2===0),(L,S)=>{L.position.set(S.x,S.y+.28,S.z+.6),L.rotation.set(0,0,0),L.scale.set(1,.7,1)}),o(u,Dt(12876373,t),a.canyon,(L,S,oe)=>{L.position.set(S.x,S.y+.35,S.z),L.rotation.set(oe,oe*.5,0),L.scale.set(1,.75,1.1)}),o(p,Dt(3029611,t),a.canyon.filter((L,S)=>S%2===0),(L,S)=>{L.position.set(S.x,S.y+.35,S.z),L.rotation.set(0,0,Math.PI/2),L.scale.set(1,1,1)}),o(h,Dt(12051711,t),a.sky,(L,S,oe)=>{L.position.set(S.x,S.y+.55,S.z),L.rotation.set(.1,oe,.2),L.scale.setScalar(.8+oe%3*.15)}),o(h,Dt(13219583,t),a.ice,(L,S,oe)=>{L.position.set(S.x,S.y+.7,S.z),L.rotation.set(0,oe,.15),L.scale.setScalar(1+oe%3*.2)}),o(f,Dt(16055295,t),a.ice.filter((L,S)=>S%2===0),(L,S)=>{L.position.set(S.x,S.y+.28,S.z),L.rotation.set(0,0,0),L.scale.set(1.15,.7,1.15)}),o(u,Dt(14721370,t),a.climb,(L,S,oe)=>{L.position.set(S.x,S.y+.4,S.z),L.rotation.set(.2,oe,0),L.scale.setScalar(.7)});let m=new jn(.22,.7,5),d=new en(.12,.16,1.3,6),v=new qt(.55,8,6),y=new pn(.12,.7,.12),x=new en(.28,.34,2.4,6),I=new qt(.45,8,6),C=new qt(.42,10,8),R=new en(.7,.7,.12,7),P=new pn(.16,1.6,.16),T=new qt(.12,6,6),b=_.filter((L,S)=>S%2===0);o(m,Dt(4106314,t),b,(L,S,oe)=>{L.position.set(S.x+(S.col>0?.3:-.3),S.y+.35,S.z),L.rotation.set(.1,oe,0),L.scale.set(1,1,1)}),o(f,Dt(16748497,t),_.filter((L,S)=>S%3===0),(L,S)=>{L.position.set(S.x,S.y+.16,S.z+.4),L.rotation.set(0,0,0),L.scale.set(.45,.35,.45)}),o(d,Dt(12876373,t),_.filter((L,S)=>S%4===0),(L,S,oe)=>{let ue=xt(oe+11);L.position.set(S.x+(ue-.5)*1.6,S.y+.7,S.z+(xt(oe+4)-.5)*1.4),L.rotation.set(0,ue*3,(ue-.5)*.15),L.scale.set(.8+ue*.5,.7+xt(oe+2)*.8,.8+ue*.5)}),o(v,Dt(8378506,t),_.filter((L,S)=>S%4===0),(L,S,oe)=>{let ue=xt(oe+11);L.position.set(S.x+(ue-.5)*1.6,S.y+1.55,S.z+(xt(oe+4)-.5)*1.4),L.rotation.set(0,oe+ue,0);let fe=.85+xt(oe+6)*.6;L.scale.set(fe,fe*.75,fe)}),o(y,Dt(16774885,t),_.filter((L,S)=>S%5===0),(L,S)=>{L.position.set(S.x,S.y+.35,S.z+.8),L.rotation.set(0,0,0),L.scale.set(1,1,1)});let D=a.canyon.filter((L,S)=>xt(S+4)>.62);o(new zi(.7,1),Dt(2759714,t),D,(L,S,oe)=>{let ue=xt(oe+S.z);L.position.set(S.x+(ue-.5)*1.8,S.y+.15+ue*.4,S.z+(xt(oe+2)-.5)*1.6),L.rotation.set(ue*2,xt(oe)*4,xt(oe+9)),L.scale.set(.45+ue*1.3,.55+xt(oe+3)*1.6,.5+xt(oe+6)*1.1)}),o(C,Dt(16748497,t),a.sky.filter((L,S)=>S%3===0),(L,S,oe)=>{L.position.set(S.x,S.y+3.2+oe%3,S.z),L.rotation.set(0,0,0),L.scale.set(1,1.15,1)}),o(f,Dt(16777215,t),a.sky,(L,S,oe)=>{L.position.set(S.x+(S.col>0?2:-2),S.y+2.4,S.z),L.rotation.set(0,oe,0),L.scale.set(1.6,.7,1.2)}),o(R,Dt(16055295,t),a.ice.filter((L,S)=>S%2===0),(L,S)=>{L.position.set(S.x,S.y+.08,S.z),L.rotation.set(0,0,0),L.scale.set(1,1,1)}),o(h,Dt(10189823,t),a.ice.filter((L,S)=>S%2===1),(L,S,oe)=>{L.position.set(S.x,S.y+1.1,S.z+.4),L.rotation.set(.2,oe,0),L.scale.setScalar(1.35)}),o(P,Dt(16774885,t),a.climb.filter((L,S)=>S%2===0),(L,S)=>{L.position.set(S.x,S.y+.8,S.z),L.rotation.set(0,0,0),L.scale.set(1,1,1)}),o(u,Dt(9067066,t),a.climb.filter((L,S)=>S%3===0),(L,S,oe)=>{L.position.set(S.x,S.y+.3,S.z+.6),L.rotation.set(.4,oe,.2),L.scale.setScalar(.55)});let V=new Ut({color:16739179,emissive:16739179,emissiveIntensity:.7,gradientMap:t});o(T,V,a.climb.filter((L,S)=>S%2===0),(L,S)=>{L.position.set(S.x,S.y+1.7,S.z),L.rotation.set(0,0,0),L.scale.set(1,1,1)});function G(){let L=new zi(1,1),S=L.attributes.position;for(let oe=0;oe<S.count;oe++){let ue=S.getX(oe),fe=S.getY(oe),ye=S.getZ(oe),Je=1+Math.sin(ue*2.8+fe*1.7)*.22+Math.sin(ye*2.4+.6)*.16,xe=fe>.15?.62:1.05;S.setXYZ(oe,ue*Je,fe*Je*xe+.2,ye*Je)}return L.computeVertexNormals(),L}function Z(){let L=new en(1,1.25,1.1,7,3),S=L.attributes.position,oe=new Float32Array(S.count*3);for(let ue=0;ue<S.count;ue++){let fe=S.getY(ue),ye=fe>.25;oe[ue*3]=ye?.35:.45,oe[ue*3+1]=ye?.72:.32,oe[ue*3+2]=ye?.32:.24,fe>.35&&S.setY(ue,fe*.45+.35)}return L.setAttribute("color",new Et(oe,3)),L.computeVertexNormals(),L}let ne={meadow:3971656,canyon:4858912,sky:8300240,ice:4034516,climb:12085800,ship:14858360},J=[],le=e.stations||[];for(let L=0;L<le.length;L+=14){let S=le[L];if(!(!S||S.gap))for(let oe=0;oe<2;oe++)for(let ue of[-1,1]){let fe=xt(L+oe*17+ue*3),ye=(oe===0?16:30)+fe*8,Je=3.2+xt(L+4+oe)*4.2;J.push({x:S.x+ue*ye,y:S.y-.8,z:S.z+(xt(L+oe+6)-.5)*12,s:Je*(oe===0?1:1.35),ry:fe*6.2,rx:(xt(L+2)-.5)*.4,color:ne[S.zone]||8378506,zone:S.zone,side:ue})}}let q=o(G(),Dt(16777215,t),J,(L,S)=>{L.position.set(S.x,S.y+S.s*.35,S.z),L.rotation.set(S.rx,S.ry,S.rx*.5),L.scale.set(S.s,S.s*.72,S.s*.9)}),me=new Ut({vertexColors:!0,gradientMap:t}),Me=J.filter((L,S)=>S%3===0).map(L=>({...L,color:0}));o(Z(),me,Me,(L,S)=>{L.position.set(S.x,S.y+.4,S.z),L.rotation.set(0,S.ry,0),L.scale.set(S.s*.85,S.s*.55,S.s*.8)});let Ie=[];function Qe(L){let S=le.filter(M=>M&&M.zone==="canyon"&&!M.gap);if(S.length<4)return;let oe=2,ue=[];for(let M=0;M<S.length;M+=oe)ue.push(S[M]);let fe=[],ye=[],Je=[];ue.forEach((M,B)=>{let te=Math.sin(M.z*.09)*.9+Math.sin(M.z*.027)*.55,se=1.15+Math.sin(M.z*.06+L)*.4,$=M.x+L*(M.half+1.15+te*.35);fe.push($-se*.65,M.y-.55,M.z,$+se*.65,M.y-.42,M.z);let De=B/Math.max(1,ue.length-1);ye.push(0,De*8,1,De*8)});for(let M=0;M<ue.length-1;M++){let B=M*2;Je.push(B,B+2,B+1,B+1,B+2,B+3)}let xe=new At;xe.setAttribute("position",new ht(fe,3)),xe.setAttribute("uv",new ht(ye,2)),xe.setIndex(Je);let A=new rn({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float flow=fract(vUv.y-uTime*0.35); float lane=abs(vUv.x-0.5); float body=smoothstep(0.5,0.08,lane); float streak=smoothstep(0.12,0.9,flow); vec3 col=mix(vec3(0.42,0.04,0.01), vec3(1.0,0.55,0.05), streak*body); float rim=smoothstep(0.2,0.38,lane)*(1.0-smoothstep(0.38,0.5,lane)); col+=vec3(1.0,0.8,0.25)*rim; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }"});i.add(new ze(xe,A)),Ie.push(A)}Qe(1),Qe(-1);let de=J.filter((L,S)=>(L.zone==="meadow"||L.zone==="sky")&&S%7===0).slice(0,10),k=new rn({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float f=fract(vUv.y*3.0-uTime*0.8); float a=smoothstep(0.0,0.15,vUv.x)*smoothstep(1.0,0.85,vUv.x)*0.55; vec3 col=mix(vec3(0.75,0.92,1.0), vec3(1.0,1.0,1.0), f); gl_FragColor=vec4(col,a); }"});Ie.push(k);for(let L of de){let S=new ze(new gi(1.4,4.2),k);S.position.set(L.x+L.side*1.5,L.y+L.s*.2,L.z),i.add(S)}let j=[],re={meadow:8378506,canyon:16742938,sky:12051711,ice:14152703,climb:16762218,ship:16774885};for(let L=0;L<36;L++){let S=e.ship.z*(L+.5)/36,oe=L%2===0?-1:1,ue=e.zones[0].id;for(let fe of e.zones)S>=fe.z0&&(ue=fe.id);j.push({x:oe*(14+xt(L)*8),y:6+xt(L+3)*8,z:S,s:.6+xt(L+9)*.9,phase:xt(L+2)*6,color:re[ue]||16774885})}let he=o(g,Dt(16777215,t),j,(L,S)=>{L.position.set(S.x,S.y,S.z),L.rotation.set(S.phase,S.phase*.3,0),L.scale.setScalar(S.s)}),Pe=160,Le=new Float32Array(Pe*3),ke=[];for(let L=0;L<Pe;L++)ke.push({ox:(xt(L)-.5)*18,oy:xt(L+1)*6,oz:(xt(L+2)-.4)*22,sp:.4+xt(L+4)*1.6});let Ke=new At;Ke.setAttribute("position",new Et(Le,3));let $e=new Ns(Ke,new Oi({color:16774885,size:.16,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0}));return i.add($e),{update(L,S){let oe=L.time||0;he&&(j.forEach((xe,A)=>{n.position.set(xe.x,xe.y+Math.sin(oe*.7+xe.phase)*.45,xe.z),n.rotation.set(xe.phase,oe*.15+xe.phase,0),n.scale.setScalar(xe.s),n.updateMatrix(),he.setMatrixAt(A,n.matrix)}),he.instanceMatrix.needsUpdate=!0);for(let xe of Ie)xe.uniforms.uTime.value=oe;let ue=L.player,fe=L.zoneId||"meadow",ye=fe==="canyon"?16742938:fe==="ice"?16055295:fe==="sky"?16777215:fe==="climb"?16765503:16774856;$e.material.color.setHex(ye),$e.material.size=fe==="ice"?.28:fe==="canyon"?.22:.16,$e.material.opacity=fe==="ice"?.55+Math.abs(Math.sin(oe*7))*.4:.85;let Je=fe==="sky"?4:fe==="canyon"?.4:.8;for(let xe=0;xe<Pe;xe++){let A=ke[xe],M=(oe*A.sp*Je+A.oy)%7;Le[xe*3]=ue.pos.x+A.ox+(fe==="sky"?Math.sin(oe+xe)*.4:0),Le[xe*3+1]=ue.pos.y+.4+M,Le[xe*3+2]=ue.pos.z+A.oz}Ke.attributes.position.needsUpdate=!0}}}var Sf={buddy:"assets/models/space_buddy.glb",bumper:"assets/models/obstacle_bumper.glb",spinner:"assets/models/obstacle_spinner.glb",pad:"assets/models/obstacle_jump_pad.glb",platform:"assets/models/obstacle_moving_platform.glb",lava:"assets/models/obstacle_lava_pool.glb",chunk:"assets/models/obstacle_falling_chunk.glb",ship:"assets/models/escape_ship.glb",roller:"assets/models/enemy_roller.glb",hopper:"assets/models/enemy_hopper.glb",flyer:"assets/models/enemy_flyer.glb",geyser:"assets/models/hazard_geyser.glb",sweeper:"assets/models/hazard_sweeper.glb",pendulum:"assets/models/hazard_pendulum.glb"},tn=vf();function O_(i){let e=i&&i.color&&i.color.isColor?i.color.clone():new Ce(16777215),t=i&&i.emissive&&i.emissive.isColor?i.emissive.clone():new Ce(0),n=new Ut({color:e,emissive:t,emissiveIntensity:i&&i.emissiveIntensity||0,gradientMap:tn,transparent:!!(i&&i.transparent),opacity:i&&i.opacity!=null?i.opacity:1,side:Lt,name:i&&i.name||""});return/Lava|Glow|Antenna|Thruster|Pad|Crack|Star|Hot/.test(n.name)&&(n.emissive.copy(e),n.emissiveIntensity=Math.max(n.emissiveIntensity,.55)),n}function z_(i){let e=new Map;i.traverse(t=>{if(!t.isMesh)return;let n=s=>{if(!s)return new zs({color:16777215});if(e.has(s.uuid))return e.get(s.uuid);let r=O_(s);return e.set(s.uuid,r),r};Array.isArray(t.material)?t.material=t.material.map(n):t.material=n(t.material)})}function bf(i){i.updateWorldMatrix(!0,!0);let e=[];return i.traverse(t=>{if(!t.isMesh)return;let n=t.geometry.clone();n.applyMatrix4(t.matrixWorld),n.computeBoundingBox();let s=Array.isArray(t.material)?t.material[0]:t.material;e.push({geom:n,mat:s,name:s&&s.name||t.name||"",maxY:n.boundingBox.max.y})}),e}function gn(i,e,t,n){return e+(i-e)*Math.exp(-t*n)}function B_(i,e,t,n){let s=e-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-t*n))}async function Ef(i,e,t,n){let s=new Eo({canvas:i,antialias:!1,alpha:!1,powerPreference:"high-performance"});s.outputColorSpace=Ft,s.toneMapping=ol,s.toneMappingExposure=1.12;let r=Math.min(window.devicePixelRatio||1,t.dprCap),o=new URLSearchParams(location.search).get("dpr");o&&(r=Math.max(.75,Math.min(2,Number(o)||r)));let a=new wo;a.fog=new To(10479871,t.fogNear,t.fogFar);let c=new zt(t.fovPortrait,1,.15,500),l=new Bo(15399167,12965098,.95),h=new Hs(16774888,1.2);h.position.set(-18,42,14),a.add(l,h);let u=new ze(new qt(380,18,12),new rn({side:Xt,depthWrite:!1,fog:!1,uniforms:{top:{value:new Ce(6080767)},mid:{value:new Ce(10479871)},bot:{value:new Ce(9361328)}},vertexShader:"varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 bot; void main(){ float h=normalize(vP).y; vec3 c=mix(mid, top, smoothstep(0.0, 0.55, h)); c=mix(bot, c, smoothstep(-0.35, 0.08, h)); gl_FragColor=vec4(c,1.0); }"}));a.add(u);let f=new Ko,p=Object.keys(Sf),g={},_=0;await Promise.all(p.map(w=>new Promise((U,Q)=>{f.load(Sf[w],ee=>{z_(ee.scene),g[w]=ee,_++,n&&n(_/p.length),U()},void 0,Q)})));let m=new vt,d=new Ce;function v(w,U,Q){let ee=bf(w.scene),Ge=0;for(let Ye of ee)Ge=Math.max(Ge,Ye.maxY);let qe=[];for(let Ye of ee){Ye.geom.translate(0,-Ge,0);let H=/Crack|Glow/.test(Ye.name),Y=H?new Ut({color:16742938,emissive:16742938,emissiveIntensity:.85,gradientMap:tn}):new Ut({color:16777215,gradientMap:tn}),ce=new $n(Ye.geom,Y,U.length);ce.instanceMatrix.setUsage($u);for(let He=0;He<U.length;He++){let Be=U[He];if(m.position.set(Be.x,Be.y,Be.z),m.rotation.set(0,0,0),m.scale.set(1,1,1),m.updateMatrix(),ce.setMatrixAt(He,m.matrix),H)d.set(16742938),ce.setColorAt(He,d);else{let _t=Ye.maxY>Ge-.25?Be.topColor:Be.sideColor;d.set(Q==="crack"&&Ye.maxY>Ge-.25?Be.topColor:_t),ce.setColorAt(He,d)}}Q==="crack"&&y(ce,U.length),ce.instanceMatrix.needsUpdate=!0,ce.instanceColor&&(ce.instanceColor.needsUpdate=!0),ce.computeBoundingSphere(),a.add(ce),qe.push(ce)}return qe}function y(w,U){for(let Q=0;Q<U;Q++)m.position.set(0,-80,0),m.scale.set(0,0,0),m.rotation.set(0,0,0),m.updateMatrix(),w.setMatrixAt(Q,m.matrix)}let x=Mf(a,e,tn),I=new Ut({vertexColors:!0,gradientMap:tn,side:Lt}),C=new Ut({vertexColors:!0,color:16765104,emissive:16742938,emissiveIntensity:.28,gradientMap:tn,side:Lt}),R=[];for(let w of e.chunks){if(w.gap||!w.positions){R.push(null);continue}let U=new At;U.setAttribute("position",new Et(w.positions,3)),U.setAttribute("color",new Et(w.colors,3)),U.setIndex(new Et(w.indices,1)),U.computeVertexNormals();let Q=new ze(U,I);Q.frustumCulled=!0,a.add(Q),w.mesh=Q,R.push(Q)}let P={meadow:[.26,.52,.3],canyon:[.5,.16,.1],sky:[.42,.58,.75],ice:[.25,.55,.95],climb:[.58,.32,.14],ship:[.68,.5,.28]},T=[],b=[],D=[],V=[],G=14,Z=9;for(let w=0;w<=e.len;w+=G){let U=e.stations[Math.min(e.stations.length-1,Math.round(w/2))],Q=P[U.zone]||P.meadow,ee=[];for(let Ge=0;Ge<Z;Ge++){let qe=(Ge/(Z-1)*2-1)*32,Ye=(Math.abs(qe)/12)**2;T.push(U.x+qe,U.y-8.2-Ye,U.z);let H=.86+Math.sin(U.z*.04+qe*.2)*.08;b.push(Q[0]*H,Q[1]*H,Q[2]*H),ee.push(T.length/3-1)}V.push(ee)}for(let w=0;w<V.length-1;w++)for(let U=0;U<Z-1;U++){let Q=V[w][U],ee=V[w][U+1],Ge=V[w+1][U],qe=V[w+1][U+1];D.push(Q,Ge,ee,ee,Ge,qe)}let ne=new At;if(ne.setAttribute("position",new Et(new Float32Array(T),3)),ne.setAttribute("color",new Et(new Float32Array(b),3)),ne.setIndex(D),ne.computeVertexNormals(),a.add(new ze(ne,I)),e.coins){let w=new en(.28,.28,.08,10),U=new Ut({color:16765503,emissive:16765503,emissiveIntensity:.25,gradientMap:tn}),Q=new $n(w,U,e.coins.length),ee=new vt;e.coins.forEach((Ge,qe)=>{ee.position.set(Ge.x,Ge.y,Ge.z),ee.rotation.x=Math.PI/2,ee.updateMatrix(),Q.setMatrixAt(qe,ee.matrix)}),a.add(Q)}for(let w of e.islands||[]){let U=new ze(new en(w.r,w.r*.7,.85,10),new Ut({color:w.zone==="canyon"?13720114:9425034,gradientMap:tn}));U.position.set(w.x,w.y-.25,w.z),a.add(U)}let J=bf(g.chunk.scene)[0].geom,le=new zs({color:12166105}),q=[];for(let w=0;w<24;w++){let U=new ze(J,le);U.visible=!1,U.scale.setScalar(.85),a.add(U),q.push({mesh:U,active:!1,vy:0,life:0})}function me(w){let U=w.scene.clone(!0);return U.traverse(Q=>{!Q.isMesh||!Q.material||(Q.material=Array.isArray(Q.material)?Q.material.map(ee=>ee.clone()):Q.material.clone())}),U}function Me(w,U,Q,ee,Ge=0,qe=1){let Ye=w.scene.clone(!0);return Ye.position.set(U,Q,ee),Ye.rotation.y=Ge,Ye.scale.setScalar(qe),a.add(Ye),Ye}let Ie=e.bumpers.map(w=>Me(g.bumper,w.x,w.y,w.z)),Qe=e.pads.map(w=>Me(g.pad,w.x,w.y,w.z)),de=[];for(let w=0;w<8;w++){let U=e.lava.z0+(e.lava.z1-e.lava.z0)*(w+.5)/8;de.push(Me(g.lava,0,.2,U,0,1.8))}let k=e.spinners.map(w=>{let U=Me(g.spinner,w.x,w.y,w.z),Q=U.getObjectByName("Spinner_Bar");return{obj:U,bar:Q}}),j=[];e.platforms.forEach((w,U)=>{let Q=Me(g.platform,w.x,w.y,w.z,0,w.kind==="spin"?1.15:1.35);j[U]=Q});let re=g.ship.scene;re.scale.setScalar(t.shipScale),re.position.set(e.ship.x,e.ship.y,e.ship.z),re.rotation.y=Math.PI,a.add(re);let he=[],Pe=[];for(let w=1;w<=8;w++){he.push(re.getObjectByName("SeatSocket_"+w));let U=re.getObjectByName("Seat_"+w),Q=[];U&&U.traverse(ee=>{if(!ee.isMesh)return;let qe=(Array.isArray(ee.material)?ee.material:[ee.material]).filter(Boolean).map(Ye=>{let H=Ye.clone();return Q.push({mat:H,color:H.color?H.color.clone():new Ce(16777215),emissive:H.emissive?H.emissive.clone():new Ce(0),intensity:H.emissiveIntensity||0}),H});ee.material=Array.isArray(ee.material)?qe:qe[0]}),Pe.push(Q)}let Le=new ze(new en(.55,1.3,34,10,1,!0),new Pt({color:16765503,transparent:!0,opacity:.08,side:Lt,depthWrite:!1}));Le.position.y=20,re.add(Le);let ke=new ze(new Fs(3.1,3.7,28),new Pt({color:16765503,side:Lt,transparent:!0,opacity:.9,depthWrite:!1}));ke.rotation.x=-Math.PI/2,ke.position.set(e.ship.x,e.ship.y+.08,e.ship.z-4.2),a.add(ke);let Ke=new ze(new jn(.85,2.2,8),new Pt({color:16765503}));Ke.rotation.x=Math.PI,Ke.position.y=.15,Ke.visible=!1;let $e=Ke.clone();$e.material=new Pt({color:16739179}),$e.scale.setScalar(.55),Ke.add($e),re.add(Ke);let L=new ze(new xr(26,28),new Pt({color:16742938}));L.rotation.x=-Math.PI/2,L.position.set(0,t.lavaStartY,(e.lava.z0+e.lava.z1)/2),a.add(L);let S=e.geysers.map(w=>{let U=me(g.geyser);return U.position.set(w.x,w.y,w.z),U.userData.jet=U.getObjectByName("GeyserJet"),U.userData.ring=U.getObjectByName("GeyserRing"),a.add(U),U}),oe=e.pendulums.map(()=>{let w=me(g.pendulum),U=new ze(new en(.07,.07,1,6),new Ut({color:1975360,gradientMap:tn}));return a.add(w,U),{bob:w,rope:U}}),ue=e.sweepers.map(w=>{let U=me(g.sweeper);U.scale.set(w.full?1.15:1,1,1);let Q=U.getObjectByName("SweeperBar");return Q&&Q.material&&Q.material.color&&Q.material.color.set(w.full?16742938:16739179),a.add(U),U});function fe(w){let U=[];w.traverse(Q=>{Q.isMesh&&U.push(Q)});for(let Q of U){let ee=new ze(Q.geometry,new Pt({color:1975360,side:Xt}));ee.scale.setScalar(1.08),Q.add(ee)}}let ye=new Ut({color:16765503,gradientMap:tn}),Je=new Ut({color:16739179,gradientMap:tn}),xe=e.rollers.map(w=>{let U=me(g.roller);U.scale.setScalar(w.radius),w.snow&&U.traverse(Ye=>{!Ye.isMesh||!Ye.material||!Ye.material.color||Ye.name==="RollerEye"||Ye.name==="RollerMouth"||Ye.material.color.set(16251903)});let Q=new ze(new Bi(1.2,.07,6,18),new Pt({color:w.snow?14152959:16765503,transparent:!0,opacity:.85}));Q.rotation.x=Math.PI/2,Q.position.y=-.82,U.add(Q),U.userData.ring=Q;let ee=new ze(new jn(.34,.42,7),ye);ee.position.y=1.05;let Ge=new ze(new pn(.08,.1,.06),new Ut({color:16774885,gradientMap:tn}));Ge.position.set(-.08,-.08,.95);let qe=Ge.clone();return qe.position.x=.08,U.add(ee,Ge,qe),fe(U),a.add(U),U}),A=e.hoppers.map(()=>{let w=me(g.hopper);w.userData.body=w.getObjectByName("HopperBody"),w.userData.eyes=w.getObjectByName("HopperEye");let U=new ze(new pn(.46,.16,.08),Je);U.position.set(0,.15,.62);let Q=new ze(new qt(.09,8,6),Je);Q.position.set(.28,.02,.48);let ee=Q.clone();ee.position.x=-.28;let Ge=new ze(new qt(.28,10,8),new Ut({color:16771266,gradientMap:tn}));return Ge.scale.set(1,.7,.45),Ge.position.set(0,-.12,.42),w.add(U,Q,ee,Ge),fe(w),a.add(w),w}),M=e.flyers.map(()=>{let w=me(g.flyer);w.userData.wing=w.getObjectByName("FlyerWings"),w.userData.eyes=w.getObjectByName("FlyerEye");let U=new ze(new Bi(.16,.04,6,10),ye);U.position.set(.16,.12,.34);let Q=U.clone();return Q.position.x=-.16,w.add(U,Q),fe(w),a.add(w),w});function B(w){let Q=[],ee=[],Ge=[],qe=[];for(let Y=0;Y<6;Y++){let ce=Y/6*Math.PI*2+w,He=.75+(Y*3+w*5)%3*.28;qe.push([Math.cos(ce)*He,Math.sin(ce)*He])}Q.push(0,.18,0),ee.push(.28,.16,.12),qe.forEach(([Y,ce])=>{Q.push(Y,.18,ce),ee.push(1,.45,.08)}),Q.push(0,-.18,0),ee.push(.35,.18,.1),qe.forEach(([Y,ce])=>{Q.push(Y*.92,-.22,ce*.92),ee.push(.85,.22,.04)});for(let Y=0;Y<6;Y++){let ce=1+Y,He=1+(Y+1)%6;Ge.push(0,He,ce);let Be=8+Y,_t=8+(Y+1)%6;Ge.push(7,Be,_t),Ge.push(ce,He,_t,ce,_t,Be)}let Ye=6*2+2;Q.push(.2,-.85,.15),ee.push(1,.4,.05),Q.push(.05,-.2,.05),ee.push(1,.55,.08),Q.push(.35,-.2,.22),ee.push(1,.35,.04),Ge.push(Ye,Ye+1,Ye+2);let H=new At;return H.setAttribute("position",new ht(Q,3)),H.setAttribute("color",new ht(ee,3)),H.setIndex(Ge),H.computeVertexNormals(),H}let te=[],se=new Ut({vertexColors:!0,emissive:16742938,emissiveIntensity:.35,gradientMap:tn,side:Lt});for(let w=0;w<12;w++){let U=new ze(B(w*.7),se);U.scale.setScalar(2.6+w%3*.9),U.visible=!1,a.add(U);let Q=w%2===0?-1:1;te.push({mesh:U,ox:Q*(7.5+w%5*2.6),oy:7+w%4*3.4,oz:-1-w%5*2.4,spin:.7+w%5*.22,fall:.18+w%3*.08})}let $=new Bt;for(let w=0;w<10;w++){let U=new ze(new pn(.05,.05,1.6),new Pt({color:16774885,transparent:!0,opacity:.75}));U.position.set(w%5-2,.4+w%3*.35,-.4-w%4*.35),$.add(U)}$.visible=!1,a.add($);for(let w=0;w<7;w++){let U=new ze(new qt(2.2+w%3,8,6),new zs({color:16774885}));U.position.set(-18+w*9,16+w%2*3,e.zones[2].z0+20+w*18),U.scale.y=.45,a.add(U)}let De=e.checkpoints.map(w=>{let U=new ze(new Fs(.7,.95,18),new Pt({color:16765503,side:Lt,transparent:!0,opacity:.85,depthWrite:!1}));return U.rotation.x=-Math.PI/2,U.position.set(w.x,w.y+.08,w.z),a.add(U),U});function ge(w){return new Ut({color:w,gradientMap:tn})}function Ae(w){let U={},Q=new Bt,ee=new ze(new en(.035,.035,.28,5),ge(16739179));ee.position.y=1.62;let Ge=new ze(new pn(.72,.045,.1),ge(16765503));Ge.position.y=1.76,Q.add(ee,Ge),Q.userData.blade=Ge,U.heli=Q;let qe=new Bt;for(let St of[-.18,.18]){let Nt=new ze(new Bi(.13,.04,6,10),ge(6044462));Nt.position.set(St,1.18,.36),qe.add(Nt)}U.goggles=qe;let Ye=new Bt;for(let St of[-.18,.18]){let Nt=new ze(new Uo(.12,0),ge(1975360));Nt.position.set(St,1.18,.4),Nt.scale.z=.35,Ye.add(Nt)}U.stars=Ye;let H=new Bt,Y=new ze(new qt(.16,8,6),ge(16748497));Y.position.y=1.7,Y.scale.y=.45;let ce=new ze(new qt(.07,6,6),ge(16765503));ce.position.y=1.72,H.add(Y,ce),U.flower=H;let He=new ze(new Bi(.28,.07,6,12),ge(6080767));He.position.y=.78,He.rotation.x=Math.PI/2,U.scarf=He;let Be=new Bt,_t=new ze(new qt(.16,8,8),new Ut({color:10479871,transparent:!0,opacity:.75,gradientMap:tn}));_t.position.y=1.72;let nt=new ze(new qt(.07,6,6),ge(16747130));nt.position.y=1.72,Be.add(_t,nt),U.fish=Be;let Mt=new ze(new jn(.16,.22,5),ge(16765503));Mt.position.y=1.72,U.crown=Mt;for(let St of Object.values(U))St.visible=!1,w.add(St);return U}let ct=g.buddy,ae=[],we=new Bt;a.add(we);let We=new xr(.48,14),Ze=k_();for(let w of e.spawns.length?Array.from({length:t.racers}):[]);for(let w=0;w<t.racers;w++){let U=gf(ct.scene),Q=["#5FE3B0","#FFD23F","#FF8FD1","#8C6BFF","#5CC8FF","#7FD88A","#C9B6E8","#FFC38A","#4C6FFF","#2EC4B6","#FF5FA2","#C6E05A","#9BB6FF","#F0B429","#FF8A7A","#7AD0FF"][w%16];U.traverse(Be=>{if(!Be.isMesh)return;let nt=(Array.isArray(Be.material)?Be.material:[Be.material]).map(Mt=>{if(Mt.name==="Buddy_Mint"){let St=Mt.clone();return St.color.set(Q),St}return Mt});Be.material=Array.isArray(Be.material)?nt:nt[0]});let ee=new Go(U),Ge={};for(let Be of ct.animations){let _t=ee.clipAction(Be);_t.play(),_t.setEffectiveWeight(Be.name==="Idle"?1:0),Ge[Be.name]=_t}w===0&&U.traverse(Be=>{if(!Be.isSkinnedMesh)return;let _t=new Ls(Be.geometry,new Pt({color:1975360,side:Xt,transparent:!0,opacity:.9}));_t.bind(Be.skeleton,Be.bindMatrix),_t.scale.setScalar(1.05),Be.parent.add(_t)});let qe=Ae(U),Ye=["classic","heli","goggles","stars","flower","scarf","fish","crown"],H=Ye[w%Ye.length];qe[H]&&(qe[H].visible=!0);let Y=new Bt;Y.add(U);let ce=new ze(We,new Pt({color:1975360,transparent:!0,opacity:.28,depthWrite:!1}));ce.rotation.x=-Math.PI/2,Y.add(ce);let He=null;if(w===0){let Be=new ze(new Fs(.5,.68,18),new Pt({color:16765503,side:Lt,depthWrite:!1}));Be.rotation.x=-Math.PI/2,Be.position.y=.05,Y.add(Be),He=new Ao(new pr({map:Ze,depthTest:!0})),He.scale.set(.95,.42,1),He.position.y=2.05,Y.add(He)}we.add(Y),ae.push({group:Y,model:U,mixer:ee,actions:Ge,shadow:ce,current:"Idle",docked:!1,accessories:qe,pick:H,dusted:!1,starred:!1})}let Te=[],ot=[16765503,16739179,6284208,16748497,6080767];for(let w=0;w<70;w++){let U=new ze(new gi(.16,.22),new Pt({color:ot[w%ot.length],side:Lt}));U.visible=!1,a.add(U),Te.push({mesh:U,v:new N,alive:!1})}let Re={yaw:0,pitch:t.defaultPitch,autoWait:0,portrait:!0,shake:0};function pt(){let w=i.clientWidth||window.innerWidth,U=i.clientHeight||window.innerHeight;Re.portrait=U>=w,s.setPixelRatio(r),s.setSize(w,U,!1),c.aspect=w/Math.max(1,U),c.fov=Re.portrait?t.fovPortrait:t.fovLandscape,c.updateProjectionMatrix()}pt();function F(w,U){let Q=Pe[w];if(Q)for(let ee of Q){if(!ee.mat.color)return;U?(ee.mat.color.set(U),ee.mat.emissive&&(ee.mat.emissive.set(U),ee.mat.emissiveIntensity=.35)):(ee.mat.color.copy(ee.color),ee.mat.emissive&&(ee.mat.emissive.copy(ee.emissive),ee.mat.emissiveIntensity=ee.intensity))}}function _e(w,U,Q){for(let ee of Te)if(!ee.alive){ee.alive=!0,ee.mesh.visible=!0,ee.mesh.position.set(w,U,Q),ee.v.set((Math.random()-.5)*4,2+Math.random()*3,(Math.random()-.5)*4);break}}let K=!1;function ie(w,U,Q){for(let H of e.chunks){let Y=H.mesh;if(!Y)continue;if(H.state==="gone"){Y.visible=!1,H.dirty=!1;continue}Y.visible=!0,Y.material=H.state==="cracking"?C:I;let ce=H.state==="cracking"?Math.sin(w.time*18+H.jitter*9)*.045:0;if(Y.position.y=(H.fallY||0)+ce,H.state==="falling"&&H.dirty&&!H.spawned){H.spawned=!0;let He=q.find(Be=>!Be.active);He&&(He.active=!0,He.life=1.4,He.vy=.6,He.mesh.visible=!0,He.mesh.position.set(0,H.positions[1]||0,(H.z0+H.z1)*.5),He.mesh.rotation.set(0,Math.random(),0))}H.dirty=!1}for(let H of q)H.active&&(H.vy-=12*U,H.mesh.position.y+=H.vy*U,H.mesh.rotation.x+=U,H.life-=U,H.life<=0&&(H.active=!1,H.mesh.visible=!1));for(let H=0;H<w.spinners.length;H++){let Y=k[H].bar;Y&&(Y.rotation.y=w.spinners[H].angle)}for(let H=0;H<w.platforms.length;H++){let Y=w.platforms[H],ce=j[H];ce.position.set(Y.x,Y.y,Y.z),Y.axis==="spin"&&(ce.rotation.y+=U*Y.speed)}for(let H=0;H<w.geysers.length;H++){let Y=w.geysers[H],ce=S[H],He=Y.hot?3.1:Y.warn?.85:.12,Be=ce.userData.jet;Be.scale.set(Y.hot?1.3:1,He,Y.hot?1.3:1),Be.position.y=He*.5,Be.material.color.set(Y.hot?16742938:16765503),ce.userData.ring.material.color.set(Y.warn||Y.hot?16765503:16742938),ce.userData.ring.scale.setScalar(Y.warn?1.25:1)}for(let H=0;H<w.pendulums.length;H++){let Y=w.pendulums[H],ce=oe[H];ce.bob.position.set(Y.bobX,Y.bobY,Y.bobZ),ce.rope.position.set((Y.x+Y.bobX)/2,(Y.y+Y.bobY)/2,Y.z),ce.rope.scale.y=Y.len,ce.rope.lookAt(Y.bobX,Y.bobY,Y.bobZ)}for(let H=0;H<w.sweepers.length;H++){let Y=w.sweepers[H];ue[H].position.set(Y.x,Y.y,Y.z)}for(let H=0;H<w.rollers.length;H++){let Y=w.rollers[H];xe[H].position.set(Y.x,Y.y,Y.z),xe[H].rotation.z=Y.rot;let ce=xe[H].userData.ring;ce&&ce.scale.setScalar(1+Math.sin(w.time*7+H)*.14);let He=!1;for(let nt of w.racers){if(nt.flail<.2)continue;let Mt=nt.pos.x-Y.x,St=nt.pos.z-Y.z;Mt*Mt+St*St<5&&(He=!0)}let Be=He?.78:1,_t=1+Math.sin(w.time*2.2+H)*.04;xe[H].scale.set(Y.radius*(He?1.15:_t),Y.radius*Be,Y.radius)}for(let H=0;H<w.hoppers.length;H++){let Y=w.hoppers[H];A[H].position.set(Y.x,Y.y+.55,Y.z);let ce=A[H].userData.body;ce&&(ce.scale.y=Y.hopping?1.18:.62+Math.sin(w.time*3+H)*.04,ce.scale.x=Y.hopping?.86:1.12);let He=A[H].userData.eyes;He&&(He.scale.y=Math.sin(w.time*2.4+H*2)>.96?.12:1)}for(let H=0;H<w.flyers.length;H++){let Y=w.flyers[H];M[H].position.set(Y.x,Y.y,Y.z),M[H].rotation.y=-Y.ang;let ce=M[H].userData.wing;ce&&(ce.rotation.z=Math.sin(w.time*14+H)*.55),M[H].scale.y=1+Math.sin(w.time*14+H)*.08;let He=M[H].userData.eyes;He&&(He.scale.y=Math.sin(w.time*3+H)>.97?.15:1)}L.position.y=w.lavaY;let ee=.85+Math.sin(w.time*3)*.15;L.material.color.setRGB(1*ee,.35*ee,.08),re.position.y=w.shipY;let Ge=w.phase!=="countdown";if(Le.material.opacity=Ge?.16+Math.sin(w.time*4)*.05:.04,Ke.visible=w.phase==="launch"||w.phase==="results",Ke.visible){let H=.85+Math.sin(w.launchT*30)*.12;Ke.scale.set(H,H,H)}ke.material.opacity=w.phase==="race"?.55+Math.sin(w.time*5)*.25:.2;for(let H=0;H<w.racers.length;H++){let Y=w.racers[H],ce=ae[H];if(ce.mixer.update(U),Y.seated){!ce.docked&&he[Y.seatIndex]&&(he[Y.seatIndex].add(ce.group),ce.group.position.set(0,.05,0),ce.group.rotation.set(0,Math.PI,0),ce.group.scale.setScalar(t.seatBuddyScale),ce.shadow.visible=!1,ce.docked=!0,F(Y.seatIndex,Y.color)),Se(ce,"Cheer",1);continue}ce.group.position.set(Y.pos.x,Y.pos.y,Y.pos.z),ce.group.rotation.y=Y.yaw;let He=Y.squash||0,Be=Y.sliding>0?.38:0,_t=!Y.grounded&&Y.vel.y>1.4?.16:0;if(ce.model.position.y=Be*-.15,ce.model.scale.set(1+He*.16+Be*.2-_t*.4,1-He*.26-Be+_t,1+He*.12),Y.squash>.32&&!ce.dusted){ce.dusted=!0;for(let Nt=0;Nt<3;Nt++)_e(Y.pos.x+(Nt-1)*.2,Y.pos.y+.1,Y.pos.z)}if(Y.squash<.05&&(ce.dusted=!1),Y.flail>.4&&!ce.starred){ce.starred=!0;for(let Nt=0;Nt<5;Nt++)_e(Y.pos.x,Y.pos.y+1.55,Y.pos.z)}Y.flail<.05&&(ce.starred=!1),Y.sliding>0&&H===0&&_e(Y.pos.x,Y.pos.y+.15,Y.pos.z),H===0&&($.visible=!!(Y.diving||Y.sliding>0),$.visible&&($.position.set(Y.pos.x,Y.pos.y+.9,Y.pos.z),$.rotation.y=Y.yaw));let nt=ce.accessories&&ce.accessories.heli&&ce.accessories.heli.userData.blade;nt&&ce.accessories.heli.visible&&(nt.rotation.y+=U*14);let Mt=Math.hypot(Y.vel.x,Y.vel.z),St="Idle";Y.emote==="cheer"||Y.emote==="wave"&&Y.flail<=0?St="Cheer":Y.flail>.05||!Y.grounded&&Y.vel.y<-2?St="Flail":(Mt>.8||Y.sliding>0)&&(St="Run"),Se(ce,St,Mt/7),ce.shadow&&(ce.shadow.visible=Y.grounded,ce.shadow.position.y=.04)}if(w.phase==="results"&&w.result==="escaped"&&!K){K=!0;let H=ae[0].group,Y=new N;H.getWorldPosition(Y);for(let ce=0;ce<48;ce++)_e(re.position.x+(Math.random()-.5)*3,re.position.y+2+Math.random()*3,re.position.z-2)}for(let H of Te)H.alive&&(H.v.y-=6*U,H.mesh.position.addScaledVector(H.v,U),H.mesh.rotation.z+=U*4,H.mesh.position.y<e.ship.y-1&&(H.alive=!1,H.mesh.visible=!1));let qe=w.phase==="launch"||w.phase==="results";for(let H of te)H.mesh.visible=qe,qe&&(H.mesh.position.set(e.ship.x+H.ox,e.ship.y+H.oy-w.launchT*H.fall*1.6,e.ship.z+H.oz),H.mesh.rotation.x=-.7,H.mesh.rotation.y=w.launchT*H.spin);Le.visible=w.phase!=="launch"&&w.phase!=="results"&&w.seatCine<=0,x.update(w,U);let Ye=yf(w.zoneId||"meadow");u.material.uniforms.top.value.setHex(Ye.top),u.material.uniforms.mid.value.setHex(Ye.mid),Ye.bot&&u.material.uniforms.bot.value.setHex(Ye.bot),a.fog.color.setHex(Ye.fog),a.fog.near=Ye.near,a.fog.far=Ye.far,be(w,U,Q),u.position.copy(c.position);for(let H of De)H.rotation.z=w.time*.4}function Se(w,U,Q){if(w.current===U){w.actions.Run&&U==="Run"&&w.actions.Run.setEffectiveTimeScale(Math.max(.65,Math.min(1.45,Q||1)));return}for(let ee of Object.keys(w.actions)){let Ge=ee===U;w.actions[ee].enabled=!0,w.actions[ee].setEffectiveWeight(Ge?1:0)}!w.actions[U]&&w.actions.Idle&&w.actions.Idle.setEffectiveWeight(1),w.current=U}function be(w,U,Q){let ee=w.player;if(Q&&Q.overview){let nt=Q.overview;c.position.set(nt.x,nt.y,nt.z),c.lookAt(nt.lx,nt.ly,nt.lz);return}let Ge=!!(Q&&(Q.looking||Math.abs(Q.lookDx)+Math.abs(Q.lookDy)>0));if(Q&&Q.intro>0){let nt=1-Math.max(0,Math.min(1,Q.intro/3.3)),Mt=nt*nt*(3-2*nt),St=Re.portrait?t.camDistPortrait:t.camDist,Nt=St*Math.cos(t.defaultPitch),E=St*Math.sin(t.defaultPitch),O=(1-Mt)*(ee.pos.x+8)+Mt*(ee.pos.x+Math.sin(Re.yaw)*Nt),W=(1-Mt)*(ee.pos.y+22)+Mt*(ee.pos.y+E+.4),X=(1-Mt)*(ee.pos.z-26)+Mt*(ee.pos.z-Nt);c.position.set(O,W,X),c.lookAt(ee.pos.x,ee.pos.y+1,ee.pos.z+18*(1-Mt));return}if(w.seatCine>0&&w.player.seated){let nt=new N;ae[0].group.getWorldPosition(nt),c.position.x=gn(c.position.x,re.position.x+6.5,4.2,U),c.position.y=gn(c.position.y,re.position.y+4.2,4.2,U),c.position.z=gn(c.position.z,re.position.z-22,4.2,U),c.lookAt(nt.x,nt.y+.45,nt.z);return}if(w.phase==="results"||w.phase==="launch"){let nt,Mt,St,Nt,E,O;if(w.result==="escaped")nt=re.position.x+2,Mt=re.position.y+8,St=re.position.z+22,Nt=re.position.x,E=re.position.y+1.5,O=re.position.z-18;else{nt=ee.pos.x-6,Mt=ee.pos.y+4.2,St=ee.pos.z-8;let W=Math.max(0,re.position.z-ee.pos.z);Nt=re.position.x,E=re.position.y+3+Math.min(8,W*.02),O=re.position.z-6}c.position.x=gn(c.position.x,nt,3.2,U),c.position.y=gn(c.position.y,Mt,3.2,U),c.position.z=gn(c.position.z,St,3.2,U),c.lookAt(Nt,E,O);return}if(ee.seated){let nt=e.ship.x+2,Mt=w.shipY+8,St=e.ship.z+22;c.position.x=gn(c.position.x,nt,3,U),c.position.y=gn(c.position.y,Mt,3,U),c.position.z=gn(c.position.z,St,3,U),c.lookAt(e.ship.x,w.shipY+2.2,e.ship.z-36);return}if(Ge){let nt=Q.mouse?t.mouseSens:t.lookSens;Re.yaw+=Q.lookDx*nt,Re.pitch=Math.max(t.minPitch,Math.min(t.maxPitch,Re.pitch+Q.lookDy*nt)),Re.autoWait=t.autoFollowDelay}else Re.autoWait>0?Re.autoWait-=U:(Math.hypot(ee.vel.x,ee.vel.z)>1.15&&(Re.yaw=B_(Re.yaw,Math.atan2(ee.vel.x,ee.vel.z),t.autoYaw,U)),Re.pitch=gn(Re.pitch,t.defaultPitch,t.autoPitch,U));let qe=Re.portrait?t.camDistPortrait:t.camDist,Ye=qe*Math.cos(Re.pitch),H=qe*Math.sin(Re.pitch),Y=ee.pos.x+Math.sin(Re.yaw)*Ye,ce=ee.pos.y+H+.35,He=ee.pos.z-Math.cos(Re.yaw)*Ye,Be=w.phase==="countdown"?1:0;ce+=Be*2.2,He-=Be*2.4;let _t=(w.shake||0)*.18;_t>.01&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(Y+=(Math.random()-.5)*_t,ce+=(Math.random()-.5)*_t*.5),c.position.x=gn(c.position.x,Y,t.camLerp,U),c.position.y=gn(c.position.y,ce,t.camLerp,U),c.position.z=gn(c.position.z,He,t.camLerp,U),c.lookAt(ee.pos.x,ee.pos.y+1.15,ee.pos.z+Math.cos(Re.yaw)*1.4)}function et(){K=!1;for(let w of e.chunks)w.spawned=!1,w.dirty=!0,w.fallY=0,w.mesh&&(w.mesh.visible=!w.gap,w.mesh.position.y=0,w.mesh.material=I);for(let w of q)w.active=!1,w.mesh.visible=!1;for(let w of Te)w.alive=!1,w.mesh.visible=!1;for(let w=0;w<ae.length;w++){let U=ae[w];U.docked&&(we.add(U.group),U.group.scale.setScalar(1),U.group.rotation.set(0,0,0),U.shadow.visible=!0,U.docked=!1)}for(let w=0;w<Pe.length;w++)F(w,null);re.position.y=e.ship.y,Ke.visible=!1,Re.yaw=0,Re.pitch=t.defaultPitch}function It(){s.render(a,c)}c.position.set(0,8,-10),c.lookAt(0,1,4),s.render(a,c);function Gt(w,U){let Q=ae[0];if(Q){Q.model.traverse(ee=>{if(!ee.isMesh)return;let Ge=Array.isArray(ee.material)?ee.material:[ee.material];for(let qe of Ge)qe&&qe.name==="Buddy_Mint"&&qe.color&&qe.color.set(w)});for(let ee of Object.keys(Q.accessories||{}))Q.accessories[ee].visible=ee===U}}return{resize:pt,update:ie,reset:et,render:It,applyLook:Gt,setDpr(w){r=w,pt()},get yaw(){return Re.yaw},get canvas(){return i}}}function k_(){let i=document.createElement("canvas");i.width=128,i.height=64;let e=i.getContext("2d");e.fillStyle="#FFF6E5",H_(e,4,8,120,48,16),e.fill(),e.fillStyle="#1E2440",e.font="700 32px Fredoka, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("YOU",64,34);let t=new Us(i);return t.colorSpace=Ft,t}function H_(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}var Tf={ui_tap:"assets/audio/ui_tap.mp3",ui_confirm:"assets/audio/ui_confirm.mp3",jump:"assets/audio/sfx_jump.mp3",land:"assets/audio/sfx_land.mp3",bump:"assets/audio/sfx_bump_boing.mp3",tick:"assets/audio/sfx_countdown_tick.mp3",go:"assets/audio/sfx_countdown_go.mp3",crack:"assets/audio/sfx_ground_crack.mp3",seat:"assets/audio/sfx_seat_filled.mp3",last:"assets/audio/sfx_last_seat_alert.mp3",launch:"assets/audio/sfx_ship_launch.mp3",escaped:"assets/audio/jingle_escaped.mp3",missed:"assets/audio/jingle_missed.mp3",bed:"assets/audio/amb_planet_bed_loop.mp3",rumble:"assets/audio/amb_collapse_rumble_loop.mp3"};function wf(){let i=window.AudioContext||window.webkitAudioContext,e=i?new i({latencyHint:"interactive"}):null,t={},n={},s,r,o,a,c,l=!1;e&&(s=e.createGain(),s.gain.value=1,s.connect(e.destination),r=e.createGain(),r.gain.value=0,r.connect(s),o=e.createGain(),o.gain.value=0,o.connect(s));async function h(m){if(!e)return;let d=Object.keys(Tf),v=0;await Promise.all(d.map(async y=>{let I=await(await fetch(Tf[y])).arrayBuffer();t[y]=await e.decodeAudioData(I.slice(0)),v++,m&&m(v/d.length)}))}function u(){if(!e)return;e.state==="suspended"&&e.resume();let m=e.createBuffer(1,1,22050),d=e.createBufferSource();d.buffer=m,d.connect(e.destination),d.start(0)}function f(m){!e||l||(l=!0,t.bed&&(a=e.createBufferSource(),a.buffer=t.bed,a.loop=!0,a.connect(r),a.start(0),r.gain.setTargetAtTime(m,e.currentTime,.4)),t.rumble&&(c=e.createBufferSource(),c.buffer=t.rumble,c.loop=!0,c.connect(o),c.start(0)))}function p(m){!o||!e||o.gain.setTargetAtTime(Math.max(0,Math.min(.5,m)),e.currentTime,.2)}function g(m){if(!e||!s)return;(m==="win"?[523,659,784,1046]:[440,349,262]).forEach((v,y)=>{let x=e.createOscillator(),I=e.createGain();x.type=m==="win"?"triangle":"sawtooth",x.frequency.value=v;let C=e.currentTime+y*.09;I.gain.setValueAtTime(1e-4,C),I.gain.exponentialRampToValueAtTime(m==="win"?.07:.05,C+.03),I.gain.exponentialRampToValueAtTime(1e-4,C+.32),x.connect(I),I.connect(s),x.start(C),x.stop(C+.34)})}function _(m,d=.5,v=.07){if(!e||!t[m])return;let y=e.currentTime;if(n[m]&&y-n[m]<v)return;n[m]=y;let x=e.createBufferSource(),I=e.createGain();I.gain.value=d,x.buffer=t[m],x.connect(I),I.connect(s),x.start(0)}return{load:h,unlock:u,startBeds:f,setRumble:p,play:_,flourish:g,get ctx(){return e}}}function Af(i){let e=document.getElementById("stick"),t=document.getElementById("knob"),n=new Set,s=new Map,r=0,o=0,a=!1,c=!1,l=0,h=0,u=!1,f=54;function p(y){let x=y.target;if(x.closest&&x.closest("#jump"))return"jump";if(x.closest&&x.closest("#dive"))return"dive";if(x.closest&&x.closest("button, a"))return"ui";let I=window.innerWidth||1;return y.pointerType==="mouse"?"look":y.clientX<I*.46?"move":"look"}function g(y){if(y.target.closest&&y.target.closest("#title, #result"))return;let x=p(y);if(x!=="ui"){y.preventDefault();try{i.setPointerCapture?.(y.pointerId)}catch{}s.set(y.pointerId,{kind:x,x:y.clientX,y:y.clientY,ox:y.clientX,oy:y.clientY}),x==="jump"&&(a=!0),x==="dive"&&(c=!0),x==="move"&&d(y.clientX,y.clientY,y.clientX,y.clientY)}}function _(y){let x=s.get(y.pointerId);x&&(y.preventDefault(),x.kind==="look"&&(r+=y.clientX-x.x,o+=y.clientY-x.y,u=!0),x.kind==="move"&&d(x.ox,x.oy,y.clientX,y.clientY),x.x=y.clientX,x.y=y.clientY)}function m(y){let x=s.get(y.pointerId);s.delete(y.pointerId),x&&x.kind==="move"&&([...s.values()].some(C=>C.kind==="move")||(l=0,h=0,t.style.transform="translate(-50%, -50%)")),x&&x.kind==="look"&&![...s.values()].some(I=>I.kind==="look")&&(u=!1)}function d(y,x,I,C){let R=I-y,P=C-x,T=Math.hypot(R,P)||1,b=Math.min(T,f);R=R/T*b,P=P/T*b,l=R/f,h=-P/f,t.style.transform=`translate(calc(-50% + ${R}px), calc(-50% + ${P}px))`}i.addEventListener("pointerdown",g),i.addEventListener("pointermove",_),i.addEventListener("pointerup",m),i.addEventListener("pointercancel",m),window.addEventListener("keydown",y=>{({KeyW:1,KeyA:1,KeyS:1,KeyD:1,ArrowUp:1,ArrowDown:1,ArrowLeft:1,ArrowRight:1,Space:1,ShiftLeft:1,ShiftRight:1})[y.code]&&y.preventDefault(),!y.repeat&&(n.add(y.code),y.code==="Space"&&(a=!0),(y.code==="ShiftLeft"||y.code==="ShiftRight")&&(c=!0))}),window.addEventListener("keyup",y=>n.delete(y.code)),window.addEventListener("blur",()=>n.clear());function v(){let y=0,x=0;(n.has("KeyA")||n.has("ArrowLeft"))&&(y-=1),(n.has("KeyD")||n.has("ArrowRight"))&&(y+=1),(n.has("KeyW")||n.has("ArrowUp"))&&(x+=1),(n.has("KeyS")||n.has("ArrowDown"))&&(x-=1);let I=l+y,C=h+x,R=Math.hypot(I,C);R>1&&(I/=R,C/=R);let P=(s.size&&[...s.values()].some(b=>b.kind==="look"&&s.values()),1),T={stickX:I,stickY:C,lookDx:r*(n.size?1:P),lookDy:o,looking:u,mouse:[...s.values()].some(b=>b.kind==="look"),jump:a,dive:c};return r=0,o=0,a=!1,c=!1,T}return{read:v}}function Rf(i,e,t){let n=-Math.sin(i),s=Math.cos(i),r=-Math.cos(i),o=-Math.sin(i);return{x:r*e+n*t,z:o*e+s*t}}var Qo=new URLSearchParams(location.search),ln=lh({quick:Qo.has("quick"),auto:Qo.has("auto"),seed:Number(Qo.get("seed"))||Date.now()%1e5}),V_=document.getElementById("app"),G_=document.getElementById("view"),Ff=document.getElementById("title"),Vi=document.getElementById("play"),Of=document.getElementById("lobby"),W_=document.getElementById("start"),Cf=document.getElementById("colors"),If=document.getElementById("gear"),ra=document.getElementById("tutor"),Pf=document.getElementById("place"),rh=document.getElementById("hud"),wr=document.getElementById("controls"),zf=document.getElementById("countdown"),Ws=document.getElementById("count-num"),X_=document.getElementById("count-label"),Jl=document.getElementById("timer"),Y_=document.getElementById("progress"),oh=document.getElementById("seats"),Lf=document.getElementById("seats-label"),Bf=document.getElementById("last-banner"),nh=document.getElementById("zone"),ih=document.getElementById("toast"),Tr=document.getElementById("result"),q_=document.getElementById("result-kicker"),Z_=document.getElementById("result-title"),Df=document.getElementById("result-sub"),$l=document.getElementById("result-time"),sh=document.getElementById("again"),K_=document.getElementById("danger"),ut=wf(),J_=Af(V_),jl="space-buddies-best",ea,Ve,Kt,ca=!1,oa=!1,la=!1,ta=0,Er=0,na=0,Si={x:0,z:0},Nf=!1,$_=["classic","heli","goggles","stars","flower","scarf","fish","crown"],j_=["Classic","Sunny","Goggles","Stars","Flower","Scarf","Fish","Crown"],Ar=Wi[0],ah="classic",ia=0,aa=0,Ql=0;var sa=0,$o=1/60,jo=0,eh=0;for(let i=0;i<8;i++){let e=document.createElement("i");e.className="seat",oh.appendChild(e)}function Q_(){return ea=fh(ln),Ve=ua(ea,ln,ln.seed),ln.auto&&(Ve.player.useAI=!0),Ef(G_,ea,ln,()=>{})}var ey=Q_().then(i=>{Kt=i,Kt.resize()}),ty=ut.load();Promise.all([ey,ty]).then(()=>{ca=!0,Vi.textContent="TAP TO PLAY",Vi.disabled=!1,la&&ha()}).catch(i=>{console.error(i),Vi.textContent="COULD NOT LOAD"});function ha(){if(!oa){if(!ca){la=!0,Vi.textContent="LOADING";return}oa=!0,ut.startBeds(ln.bedGain),ut.play("ui_confirm",.55,0),Ff.classList.add("hide"),Of.hidden=!0,Ve.player.color=Ar,Kt.applyLook&&Kt.applyLook(Ar,ah),Er=ln.auto?.2:3.3,rh.hidden=!1,wr.hidden=!0,ra.hidden=!0,window.__sb={race:Ve,cfg:ln,get fps(){return sa}}}}function ny(){if(ut.unlock(),!ca){la=!0,Vi.textContent="LOADING";return}if(ln.auto){ha();return}Ff.classList.add("hide"),Of.hidden=!1,ut.play("ui_tap",.4,0)}Vi.addEventListener("pointerdown",i=>{i.preventDefault(),ny()});Vi.addEventListener("click",i=>{i.preventDefault(),ut.unlock(),la&&ca&&ha()});W_.addEventListener("pointerdown",i=>{i.preventDefault(),ut.unlock(),ha()});Wi.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="swatch"+(e===0?" on":""),t.style.background=i,t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),Ar=i,Cf.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),ut.play("ui_tap",.35,.02)}),Cf.appendChild(t)});$_.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="gear"+(e===0?" on":""),t.textContent=j_[e],t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),ah=i,If.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),ut.play("ui_tap",.35,.02)}),If.appendChild(t)});sh.addEventListener("pointerdown",i=>{i.preventDefault(),ut.unlock(),ut.play("ui_confirm",.5,0),iy()});function iy(){let i=Ve.seed+1+Math.floor(Math.random()*50)>>>0;gh(Ve,i),Si.x=0,Si.z=0,ln.auto&&(Ve.player.useAI=!0),Ve.player.color=Ar,Kt.applyLook&&Kt.applyLook(Ar,ah),Kt.reset(),Tr.hidden=!0,Tr.classList.remove("show"),zf.hidden=!1,wr.hidden=!1,Bf.hidden=!0,rh.classList.remove("last")}function br(i){let e=Math.max(0,Math.ceil(i)),t=Math.floor(e/60),n=e%60;return t+":"+String(n).padStart(2,"0")}function Uf(i){ih.textContent=i,ih.hidden=!1,ta=1.5}function sy(i){nh.textContent=i,nh.hidden=!1,ia=1.7}var th=!1;function ry(i){let e=Ve.phase==="countdown"?ln.raceSeconds:Math.max(0,ln.raceSeconds-Ve.time),t=br(e);Jl.textContent!==t&&(Jl.textContent=t),Jl.classList.toggle("low",Ve.phase==="race"&&e<=15);let n=0;for(let m of Ve.racers)m!==Ve.player&&!m.seated&&m.pos.z>Ve.player.pos.z+.4&&n++;let s=n+1,o=s+(s===1?"ST":s===2?"ND":s===3?"RD":"TH");Pf.textContent!==o&&(Pf.textContent=o);let a=Ve.phase==="race"&&Ve.zoneId==="meadow"&&Ve.time<8&&!ln.auto;ra.hidden=!a,a&&(ra.textContent=Ve.time<2.6?"DRAG THE LEFT SIDE TO RUN":Ve.time<5.2?"DRAG THE RIGHT SIDE TO LOOK":"JUMP AND DIVE");let c=Math.max(0,Math.min(1,Ve.player.pos.z/ea.ship.z));Y_.style.transform="scaleX("+c.toFixed(3)+")";let l=oh.children;for(let m=0;m<8;m++){let d=Ve.seats[m],v=l[m];d==null?(v.style.background="#FFF6E5",v.classList.toggle("open",Ve.seatsFilled===7)):(v.style.background=Ve.racers[d].color,v.classList.remove("open"))}let h="SEATS "+Ve.seatsFilled+"/8";Lf.textContent!==h&&(Lf.textContent=h);let u=Ve.seatsFilled===7&&Ve.phase==="race";Bf.hidden=!u,rh.classList.toggle("last",u);let f=Ve.phase==="countdown"||Ve.phase==="race"&&Ve.time<.45;if(zf.hidden=!f,f){let m=Ve.phase==="race"?0:Ve.countCue,d=m>0?String(m):"GO";Ws.textContent!==d&&(Ws.textContent=d,Ws.classList.remove("pop"),Ws.offsetWidth,Ws.classList.add("pop")),X_.textContent=m>0?"GET READY":"GO",Ws.style.color=m>0?"#FF6B6B":"#FFD23F"}let p=Ve.player.pos.z-Ve.collapseZ,g=Ve.phase==="race"?Math.max(0,Math.min(1,1-p/22)):0;K_.style.opacity=String(g),ta>0&&(ta-=i,ta<=0&&(ih.hidden=!0)),ia>0&&(ia-=i,ia<=0&&(nh.hidden=!0));let _=Ve.phase==="results";if(wr.hidden=_||!oa,_&&!th){th=!0;let m=Ve.result==="escaped";if(Tr.hidden=!1,Tr.classList.add("show"),Tr.classList.toggle("miss",!m),q_.textContent="SPACE BUDDIES",Z_.textContent=m?"YOU ESCAPED!":"MISSED THE SHIP!",m){Df.textContent="SEAT "+(Ve.player.seatIndex+1)+" OF 8",sh.textContent="PLAY AGAIN";let d=Ve.time*1e3,v=!1;try{let y=Number(localStorage.getItem(jl)||0);(!y||d<y)&&(localStorage.setItem(jl,String(Math.round(d))),v=!0);let x=Number(localStorage.getItem(jl)||d);$l.textContent="TIME "+br(Ve.time)+(v?". NEW BEST.":". BEST "+br(x/1e3)+".")}catch{$l.textContent="TIME "+br(Ve.time)}}else Df.textContent="SO CLOSE",sh.textContent="TRY AGAIN",$l.textContent="TIME "+br(Ve.time)}_||(th=!1)}function oy(){let i=!1;for(let e of Ve.events)if(e.t==="tick")ut.play("tick",.55,.05);else if(e.t==="go")ut.play("go",.6,.05);else if(e.t==="jump"&&e.id===0)ut.play("jump",.4,.05);else if(e.t==="land"&&e.id===0&&e.impact>3)ut.play("land",.35,.08);else if(e.t==="bump")ut.play("bump",e.id===0?.5:.22,.06),e.id===0&&e.big&&(na=.08);else if(e.t==="dive"&&e.id===0)ut.play("jump",.28,.04);else if(e.t==="crack")i=!0;else if(e.t==="seat"){ut.play("seat",.5,.02);let t=oh.children[e.seat];t&&(t.classList.add("pop"),setTimeout(()=>t.classList.remove("pop"),400)),e.id===0&&Uf("SEAT "+(e.seat+1)+" LOCKED")}else e.t==="lastseat"?ut.play("last",.7,.2):e.t==="launch"?ut.play("launch",.65,.2):e.t==="escaped"?(ut.play("escaped",.7,.2),ut.flourish&&ut.flourish("win")):e.t==="missed"?(ut.play("missed",.65,.2),ut.flourish&&ut.flourish("miss")):e.t==="checkpoint"&&e.name&&e.name!=="START"?Uf("CHECKPOINT"):e.t==="zone"?sy(e.name):e.t==="geyser"&&ut.play("bump",e.id===0?.4:.18,.08);i&&aa<=0&&(ut.play("crack",.32,.12),aa=.34),Ve.events.length=0}function Hi(i){requestAnimationFrame(Hi);let e=Math.min(.1,eh?(i-eh)/1e3:$o);if(eh=i,document.hidden||(Ql++,Hi.lastWall||(Hi.lastWall=i),i-Hi.lastWall>=500&&(sa=Ql/((i-Hi.lastWall)/1e3),Ql=0,Hi.lastWall=i),!Kt))return;if(!oa){Kt.render();return}if(Er>0){Er-=e,Kt.update(Ve,e,{intro:Er,lookDx:0,lookDy:0,looking:!1}),Kt.render(),ra.hidden=!0,wr.hidden=!0,Er<=0&&(wr.hidden=!1);return}let t=J_.read(),n=Rf(Kt.yaw,t.stickX,t.stickY),s=1-Math.exp(-16*e);Si.x+=(n.x-Si.x)*s,Si.z+=(n.z-Si.z)*s;let r={x:Si.x,z:Si.z,jump:t.jump,dive:t.dive};Ve.phase!=="race"&&(r={x:0,z:0,jump:!1,dive:!1}),na>0?na-=e:jo+=e;let o=0;for(;na<=0&&jo>=$o&&o<8;){try{yh(Ve,$o,o===0?r:{x:r.x,z:r.z,jump:!1,dive:!1})}catch(l){console.error(l),jo=0;break}jo-=$o,o++}aa=Math.max(0,aa-e),oy();let a=Ve.player.pos.z-Ve.collapseZ,c=Ve.phase==="race"?Math.max(0,Math.min(1,1-a/36)):Ve.phase==="launch"?.4:0;ut.setRumble(c*ln.rumbleMax),!Nf&&!Qo.get("dpr")&&sa>0&&sa<24&&Ve.time>5&&Kt.setDpr&&(Nf=!0,Kt.setDpr(1)),window.__sbOverview&&(t.overview=window.__sbOverview),Kt.update(Ve,e,t),Kt.render(),ry(e)}window.addEventListener("resize",()=>Kt&&Kt.resize());document.addEventListener("visibilitychange",()=>{document.hidden&&ut.ctx?ut.ctx.suspend():ut.ctx&&ut.ctx.resume()});requestAnimationFrame(Hi);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
