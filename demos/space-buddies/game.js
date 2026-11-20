(()=>{var Vi=["#5FE3B0","#FFD23F","#FF8FD1","#8C6BFF","#5CC8FF","#7FD88A","#C9B6E8","#FFC38A","#4C6FFF","#2EC4B6","#FF5FA2","#C6E05A","#9BB6FF","#F0B429","#FF8A7A","#7AD0FF"],Zf={raceSeconds:180,countdownBeats:3,goHold:.65,racers:16,seats:8,collapseDelay:6,collapseArrive:168,crackTime:1.05,crackJitter:.7,fallTime:1.2,skirtLead:22,fragileCrack:.62,accel:78,airAccel:46,maxSpeed:8.4,playerSpeed:1,friction:36,iceAccel:14,iceFriction:5,gravity:29,fallGravityMul:1.48,jumpVel:10.15,coyoteTime:.16,jumpBuffer:.15,ungroundTime:.1,maxFallSpeed:28,bodyRadius:.44,stepUp:.55,voidY:-16,bumpPush:7.4,bumpUp:3.6,bumpCooldown:.32,diveDashSpeed:12.4,diveDashTime:.28,diveFall:26,diveCooldown:.55,slideHeight:.55,poundRadius:2.15,poundPush:7.5,poundUp:4.6,padUp:12.4,padForward:6.5,padRadius:1.65,padCooldown:.4,bumperPush:11,bumperUp:5.2,bumperRadius:1.05,bumperCooldown:.36,spinnerLength:1.62,spinnerPush:9.5,spinnerUp:4.2,spinnerHit:.58,spinnerMinY:.55,spinnerMaxY:1.45,spinnerCooldown:.45,lavaRadius:1.35,lavaHop:6.5,lavaStartY:-3.4,lavaRisePerSec:.022,platformRadius:2.15,platformTop:.28,stunTime:.48,knockCooldown:.55,windPush:3.6,boardHalfX:4.2,boardZMin:-8.5,boardZMax:-.4,botSpeeds:[1.05,1.02,.99,.97,.95,.93,.9,.88,.85,.82,.78,.74,.7,.66,.62],camDist:8.4,camDistPortrait:7.6,defaultPitch:.62,minPitch:.28,maxPitch:1.12,lookSens:.0052,mouseSens:.0042,autoFollowDelay:.85,autoYaw:2.6,autoPitch:1.5,camLerp:7.5,fovPortrait:64,fovLandscape:50,shipScale:1.7,seatBuddyScale:.44,dprCap:1.25,fogNear:42,fogFar:125,bedGain:.15,rumbleMax:.32};function mh(i={}){let e={...Zf,quick:!!i.quick,auto:!!i.auto,seed:i.seed||1};return i.quick&&(e.raceSeconds=46,e.collapseArrive=42,e.collapseDelay=2.5,e.playerSpeed=1.12,e.botSpeeds=e.botSpeeds.map(t=>t*.9),e.lavaRisePerSec=.08),e}var Cr={meadow:[.38,.8,.36],canyon:[.18,.12,.13],sky:[.62,.88,.74],ice:[.55,.9,1],climb:[.95,.62,.22],ship:[.95,.86,.62]};function Gi(i,e,t){return i+(e-i)*t}function Kf(i){return[{id:"meadow",name:"MEADOW",z0:0,z1:i*.16},{id:"canyon",name:"LAVA CANYON",z0:i*.16,z1:i*.38},{id:"sky",name:"SKY ISLANDS",z0:i*.38,z1:i*.58},{id:"ice",name:"ICE SLIDE",z0:i*.58,z1:i*.74},{id:"climb",name:"THE CLIMB",z0:i*.74,z1:i*.9},{id:"ship",name:"ESCAPE SHIP",z0:i*.9,z1:i}]}function gh(i,e){let t=i[0].id;for(let n of i)e>=n.z0&&(t=n.id);return t}function Jf(i,e,t,n,s,r,o){let a=Cr[r]||Cr.meadow,c=3,l=18,h=[],u=[],f=[],p=l+1;for(let g=0;g<=c;g++){let y=g/c,m=y>.78?(y-.78)*(y-.78)*10:0;for(let d=0;d<=l;d++){let _=d/l*Math.PI*2,v=1+Math.sin(_*3+i*.2+t*.05)*.07;h.push(i+Math.cos(_)*n*y*v,e-m,t+Math.sin(_)*s*y*v);let x=r==="canyon"&&Math.abs(Math.sin(_*5+g*2.2+i))>.82,P=o&&y>.72;if(x)u.push(1,.42,.06);else if(P)u.push(.15,.35,.75);else if(o)u.push(.85,.97,1);else if(r==="canyon")u.push(.16,.1,.11);else if(r==="ice")u.push(.62,.9,1);else{let R=y>.78?.7:1-y*.05;u.push(a[0]*R,a[1]*R,a[2]*R)}}}for(let g=0;g<c;g++)for(let y=0;y<l;y++){let m=g*p+y,d=m+p;f.push(m,d,m+1,m+1,d,d+1)}return{positions:new Float32Array(h),colors:new Float32Array(u),indices:new Uint16Array(f)}}function $f(i,e,t,n,s,r,o,a){let c=Cr[a]||Cr.meadow,l=10,h=[],u=[],f=[],p=t-i,g=n-e,y=Math.hypot(p,g)||1,m=-g/y,d=p/y;for(let _=0;_<=l;_++){let v=_/l,x=Gi(i,t,v),P=Gi(e,n,v),R=Math.sin(v*Math.PI)*.4;for(let L=-1;L<=1;L+=2){let N=(o*.5+R)*L;h.push(x+m*N,Gi(s,r,v),P+d*N),u.push(c[0],c[1],c[2])}}for(let _=0;_<l;_++){let v=_*2;f.push(v,v+2,v+1,v+1,v+2,v+3)}return{positions:new Float32Array(h),colors:new Float32Array(u),indices:new Uint16Array(f)}}function xh(i,e,t,n,s){let r={index:i.length,z0:t,z1:n,zone:e,gap:!s,state:"solid",crackT:0,fallT:0,fallY:0,dirty:!0,fragile:!1,ice:e==="ice",jitter:i.length%7/7,tilt:0};return s&&Object.assign(r,s),i.push(r),r.index}function Ir(i,e,t){let n=i.floors||[],s=null;for(let r=0;r<n.length;r++){let o=n[r],a=i.chunks[o.chunk];if(!a||a.state==="falling"||a.state==="gone")continue;let c=(e-o.x)/o.rx,l=(t-o.z)/o.rz,h=o.zone==="meadow"?1.08:1;c*c+l*l>h||(!s||o.y>=s.y)&&(s={y:o.y,x:o.x,z:t,ice:o.zone==="ice",conveyX:o.conveyX||0,zone:o.zone,chunk:a,state:a.state,fragile:!!a.fragile})}if(!s){let r=null,o=1e9;for(let a=0;a<n.length;a++){let c=n[a],l=i.chunks[c.chunk];if(!l||l.state==="falling"||l.state==="gone")continue;let h=e-c.x,u=t-c.z,f=Math.hypot(h,u),p=Math.max(c.rx,c.rz)+(c.zone==="meadow"?8:2.4);f<p&&f<o&&(o=f,r=c)}if(r){let a=i.chunks[r.chunk];s={y:r.y,x:r.x,z:t,ice:r.zone==="ice",conveyX:r.conveyX||0,zone:r.zone,chunk:a,state:a.state,fragile:!!a.fragile}}}if(!s&&i.islands)for(let r of i.islands){let o=e-r.x,a=t-r.z;o*o+a*a>r.r*r.r||(s={y:r.y,x:r.x,z:t,ice:!1,conveyX:0,zone:r.zone,chunk:null,state:"solid",fragile:!1})}return s}function _h(i){let t=!!i.quick?.42:1,n=ae=>ae*t,s=n(400),r=Kf(s),o=[],a=[],c=i.seed||1,l=c>>>0,h=()=>(l=Math.imul(1664525,l)+1013904223>>>0,l/4294967296),u=Math.floor(h()*3);function f(ae,de,Te,le,Xe,De,C){let b=xh(o,De,Te-Xe,Te+Xe,Jf(ae,de,Te,le,Xe,De,C&&C.hex)),V={x:ae,y:de,z:Te,rx:le,rz:Xe,zone:De,chunk:b,conveyX:C&&C.conveyX};return a.push(V),C&&C.fragile&&(o[b].fragile=!0),V}function p(ae,de,Te,le,Xe,De,C,b,V){let ie=V&&V.gap,re=xh(o,b,Math.min(de,le),Math.max(de,le),$f(ae,de,Te,le,Xe,De,C,b)),te=[],Ue=Math.hypot(Te-ae,le-de),ye=Math.max(4,Math.ceil(Ue/Math.max(2.2,C*.5)));for(let Se=0;Se<=ye;Se++){let Ze=Se/ye;if(ie&&Math.abs(Ze-ie)<.12)continue;let he={x:Gi(ae,Te,Ze),z:Gi(de,le,Ze),y:Gi(Xe,De,Ze),rx:C*.78,rz:C*.78,zone:b,chunk:re,conveyX:V&&V.conveyX};a.push(he),te.push(he)}return te}f(0,0,n(40),24,24,"meadow"),f(0,2.6,n(40),1.8,1.8,"meadow"),f(-16,.2,n(28),7,7,"meadow"),f(16,.8,n(52),6,6,"meadow"),f(0,.2,n(92),16,14,"canyon"),p(0,n(78),-16,n(100),.15,.3,7,"canyon"),p(-16,n(100),-18,n(118),.3,.35,6.5,"canyon"),p(-18,n(118),-6,n(136),.35,.3,6.5,"canyon"),p(2,n(86),14,n(108),.2,1.6,5.5,"canyon"),p(14,n(108),16,n(126),1.6,2.6,5.2,"canyon"),p(0,n(96),6,n(112),.3,.45,4.2,"canyon"),p(6,n(114),-4,n(128),.45,.35,4.2,"canyon"),p(16,n(126),2,n(140),2.6,.4,5.5,"canyon",{gap:.48}),f(0,.25,n(148),16,12,"canyon"),f(0,4,n(178),12,11,"sky"),f(-16,4.4,n(196),7,6,"sky"),f(14,6.8,n(194),6,6,"sky"),f(0,5.6,n(210),6,5,"sky"),p(0,n(186),-14,n(196),4,4.4,5,"sky"),p(-14,n(200),0,n(214),4.4,5.6,4.6,"sky"),p(4,n(184),14,n(194),4.1,6.8,4.4,"sky"),p(12,n(200),2,n(214),6.8,5.6,4.2,"sky"),f(0,5.2,n(232),13,11,"sky"),p(-2,n(156),6,n(172),.35,4,6.6,"canyon"),p(2,n(62),10,n(80),.05,.2,7.2,"meadow"),p(0,n(240),-10,n(258),5.2,3.3,6.2,"sky"),p(4,n(236),12,n(264),5.2,3.3,6,"sky"),p(0,n(336),-3,n(352),6.2,8,5.8,"climb"),p(0,n(292),6,n(306),3.1,3,6.2,"ice"),p(6,n(304),4,n(318),3,3.4,5.4,"climb"),f(-14,3.2,n(268),8,8,"ice",{conveyX:5}),f(14,3.3,n(270),8,8,"ice",{conveyX:-5}),f(0,3.1,n(286),10,8,"ice");for(let ae=-2;ae<=2;ae++)for(let de=-3;de<=3;de++)(de+ae)%2===0&&h()<.15||f(-7+de*2.5,3.15,n(268+ae*2.4),1.25,1.25,"ice",{fragile:!0,hex:!0});f(0,3,n(312),12,10,"climb"),f(-14,4.4,n(326),6,6,"climb"),f(0,6.2,n(334),6,5,"climb"),f(14,7.6,n(324),6,6,"climb"),p(-2,n(318),-14,n(326),3,4.4,5,"climb"),p(-12,n(330),0,n(336),4.4,6.2,4.6,"climb"),p(2,n(316),14,n(324),3.1,7.6,4.4,"climb"),p(12,n(330),0,n(348),7.6,8,5,"climb"),f(0,8,n(360),14,12,"ship");let g=a[a.length-1],y={x:g.x,y:g.y,z:g.z+n(6)};function m(ae){let de=[];for(let[Te,le,Xe,De]of ae)de.push({x:le,y:Xe||0,z:n(Te),gap:!!De});return de.push({x:y.x,y:y.y,z:y.z-4}),de}let d=[-8,-4,0,4,8],_=d.map((ae,de)=>de);for(let ae=_.length-1;ae>0;ae--){let de=Math.floor(h()*(ae+1)),Te=_[ae];_[ae]=_[de],_[de]=Te}let v=2+c%2,x=new Set(_.slice(0,v)),P=d.map((ae,de)=>({x:ae,y:.35,z:n(146),solid:x.has(de)})),R=P.filter(ae=>!ae.solid).map(ae=>ae.x),L=ae=>R[ae%R.length],N=[m([[24,-6,0],[34,-16,.2],[50,-14,0],[64,2,0],[82,8,.2],[100,-14,.3],[118,-18,.35],[136,-8,.3],[146,L(0),.3,!0],[156,-2,.25],[168,4,2.4],[186,-6,4],[198,-14,4.4],[214,-2,5.6],[232,0,5.2],[258,-10,3.3],[270,-14,3.2],[286,-2,3.1],[306,4,3],[318,-4,3.2],[328,-12,4.4],[334,0,6.2],[350,0,8],[360,0,8]]),m([[26,4,0],[42,10,.2],[58,12,.6],[80,6,.2],[96,2,.3],[112,4,.4],[128,-4,.35],[146,L(1),.3,!0],[156,2,.25],[168,4,2.4],[186,2,4.1],[196,-12,4.4],[210,-2,5.6],[232,2,5.2],[250,-6,4.2],[262,-10,3.3],[272,-12,3.2],[286,-2,3.1],[312,0,3],[326,-10,4.4],[336,0,6.2],[348,-2,7.6],[360,0,8]]),m([[28,6,0],[44,12,.4],[52,14,.8],[70,12,.2],[90,8,.4],[108,14,1.6],[126,16,2.6],[141,3,.5],[146,L(2),.3,!0],[168,5,2.4],[184,8,4.6],[194,14,6.8],[208,6,6.2],[232,2,5.2],[248,8,4.4],[264,13,3.3],[274,14,3.3],[286,4,3.1],[304,6,3],[316,8,4.6],[324,14,7.6],[340,6,7.8],[352,0,8],[360,0,8]])],E=[];for(let ae=0;ae<=s;ae+=8){let de=gh(r,ae);E.push({x:0,y:0,z:ae,half:de==="meadow"?16:12,zone:de,gap:!1,chunk:0,ice:de==="ice",conveyX:0,route:0,shelf:0,shelfH:0,guard:de==="meadow"&&ae<50*t})}let S=[];for(let ae of a)if(!(ae.rx<6))for(let de=0;de<6;de++){let Te=h()*Math.PI*2;S.push({x:ae.x+Math.cos(Te)*ae.rx*.85,y:ae.y,z:ae.z+Math.sin(Te)*ae.rz*.75,zone:ae.zone,col:Math.cos(Te)>0?4:-4,row:Math.floor(ae.z)})}let F=[],W=(ae,de,Te)=>F.push({x:de,y:Te+1.15,z:n(ae),got:!1}),G=N[2];for(let ae=1;ae<G.length-1;ae+=2)W(G[ae].z/t,G[ae].x,G[ae].y);W(52,14,.8),W(108,14,1.6),W(194,14,6.8),W(324,14,7.6),W(40,-10,.2);let Z=[{x:0,y:1.2,z:n(40),r:2.3}];for(let ae of P)ae.solid&&Z.push({x:ae.x,y:ae.y+1.2,z:ae.z,r:1.35});Z.push({x:-13.2,y:1.4,z:n(146),r:2.6}),Z.push({x:13.2,y:1.4,z:n(146),r:2.6}),Z.push({x:y.x,y:y.y,z:y.z,r:2.4,ship:!0});let J=(ae,de,Te)=>({x:de,y:Te,z:n(ae),zone:gh(r,n(ae))}),q=(ae,de,Te,le)=>Math.atan2(Te-ae,le-de),ue=[J(30,12,0),J(48,-8,0),J(178,6,4),J(312,-6,3)],K=[{...J(32,0,0),face:q(0,32,0,40)},{...J(40,0,2.6),face:q(0,40,14,52)},{...J(100,8,.6),face:q(8,100,14,108)},{...J(126,16,2.6),face:q(16,126,2,140)},{...J(316,6,3.4),face:q(6,316,14,324)}],me=[{id:0,kind:"ferry",originX:0,originZ:n(204),x:0,z:n(204),prevX:0,prevZ:n(204),y:6.4,originY:6.4,amp:8,speed:.7,phase:h()*2,radius:2.8,axis:"x"},{id:1,kind:"spin",originX:-16,originZ:n(196),x:-16,z:n(196),prevX:-16,prevZ:n(196),y:4.7,originY:4.7,amp:0,speed:1.3,phase:0,radius:3.1,axis:"spin"},{id:2,kind:"seesaw",originX:0,originZ:n(278),x:0,z:n(278),prevX:0,prevZ:n(278),y:3.7,originY:3.7,amp:0,speed:0,phase:0,radius:3.6,axis:"seesaw",tilt:0,face:Math.PI/2},{id:3,kind:"seesaw",originX:0,originZ:n(338),x:0,z:n(338),prevX:0,prevZ:n(338),y:6.8,originY:6.8,amp:0,speed:0,phase:0,radius:3.4,axis:"seesaw",tilt:0,face:Math.PI/2}],_e=[{...J(36,-8,.15),len:3.6,angle:h()*3,spin:1.5},{...J(148,-8,.4),len:3.2,angle:h()*2,spin:-1.35},{...J(210,0,5.7),len:2.8,angle:.4,spin:1.6},{...J(312,4,3.1),len:3.1,angle:1,spin:-1.4}],we=[J(104,3,.4),J(118,-2,.2)].map((ae,de)=>({...ae,period:2.6+de*.35,t:h()*2,hot:!1,wasHot:!1,warn:!1,radius:1.35})),Be=[{...J(44,0,1.15),originX:0,amp:6,speed:.85,halfLen:3.2,height:1.05,full:!1,radius:1.15,scale:1.7},{...J(108,-16,1.15),originX:-16,amp:4.5,speed:1.05,halfLen:2.6,height:1.05,full:!0,radius:1.05,scale:1.55},{...J(268,-14,4.15),originX:-14,amp:4,speed:1.1,halfLen:2.4,height:1,full:!1,radius:1,scale:1.45}],et=[{...J(68,8,4.6),len:3.2,amp:1.05,speed:1.15,phase:h(),radius:.95},{...J(207,-7,9.2),len:3.4,amp:1.1,speed:1.25,phase:h(),radius:1},{...J(330,-6,8.4),len:3.1,amp:1,speed:1.2,phase:h()*2,radius:.9}],Q=[{...J(116,14,2.5),x0:10,x1:18,dir:1,speed:3.1,radius:1.15,rot:0},{...J(270,14,4.2),x0:8,x1:18,dir:-1,speed:2.6,radius:1.05,rot:0,snow:!0},{...J(324,14,8.5),x0:8,x1:18,dir:1,speed:2.8,radius:1.1,rot:0}],D=[{...J(152,6,.4),homeX:6,homeZ:n(152),homeY:.4,vy:0,hopping:!1,t:h(),period:1.7,dirx:1,dirz:0,radius:.95}],O=[{cx:0,cz:n(210),cy:9.2,x:0,y:9.2,z:n(210),ang:h()*6,span:7,radius:.95}],X=[{z0:n(198),z1:n(216),x0:-10,x1:12,y0:4,y1:12,ax:1}],ce={z0:n(108),z1:n(128),x0:-7,x1:7},fe={x:0,y:.08,z:n(118),r:7.5},Pe=[{x:0,z:n(40),zone:"meadow",r:26},{x:0,z:n(118),zone:"canyon",r:24},{x:0,z:n(204),zone:"sky",r:22},{x:0,z:n(274),zone:"ice",r:20},{x:0,z:n(332),zone:"climb",r:20}],Ge=[{kind:"mushroom",x:0,y:0,z:n(40)},{kind:"tower",x:0,y:5.6,z:n(210)}],Ce=["meadow","canyon","sky","ice","climb"].map(ae=>{let de=r.find(Te=>Te.id===ae);return{x:0,y:0,z:de.z0+8,name:de.name,row:0}}),tt=[{x:0,y:0,z:n(22),row:0,col:0}];for(let ae=1;ae<16;ae++){let de=Math.floor((ae-1)/5),Te=(ae-1)%5;tt.push({x:(Te-2)*2.1,y:0,z:n(26+de*2.2),row:de+1,col:Te})}return{len:s,stations:E,chunks:o,floors:a,tiles:S,islands:[],blockers:Z,coins:F,zones:r,bumpers:ue,spinners:_e,pads:K,platforms:me,pendulums:et,sweepers:Be,geysers:we,rollers:Q,hoppers:D,flyers:O,winds:X,lava:ce,crater:fe,hubs:Pe,landmarks:Ge,doors:P,checkpoints:Ce,waypoints:N[0],routes:N,openDoor:u,spawns:tt,ship:y,endZ:y.z}}function jf(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function Pr(i,e,t){return Math.max(e,Math.min(t,i))}function _i(i,e){return Math.hypot(i,e)}function pa(i,e,t=1){let n=jf(t||1),s=i.spawns.slice(),r=s.find(h=>h.col===0&&h.row===s[0].row+3)||s[Math.min(8,s.length-1)],o=s.filter(h=>h!==r);for(let h=o.length-1;h>0;h--){let u=Math.floor(n()*(h+1)),f=o[h];o[h]=o[u],o[u]=f}let a=[];for(let h=0;h<e.racers;h++){let u=h===0?r:o[h-1]||r,f=h===0?e.playerSpeed:e.botSpeeds[Math.min(h-1,e.botSpeeds.length-1)];a.push({id:h,isPlayer:h===0,useAI:h!==0,color:Vi[h%Vi.length],pos:{x:u.x,y:u.y,z:u.z},lastSafe:{x:u.x,y:u.y,z:u.z},vel:{x:0,y:0,z:0},yaw:0,grounded:!0,platformId:null,coyote:e.coyoteTime,buffer:0,ungroundT:0,flail:0,invuln:.4,controlLock:0,sliding:0,squash:0,seated:!1,seatIndex:-1,eliminated:!1,cp:0,padCd:0,boost:0,bumpCd:0,spinCd:0,diveCd:0,knockCd:0,diving:!1,wasDiving:!1,dashX:0,dashZ:1,onIce:!1,emote:"idle",attached:!1,profile:{speed:f,skill:f>.96?.94:f>.86?.78:.5,mistake:h===0?0:f>.96?.012:f>.86?.035:.07,phase:n()*6},wait:h===0?0:(u.row||0)*.42+n()*.55,stumble:0,wp:0,routeId:h%3})}let c={cfg:e,course:i,racers:a,player:a[0],seed:t,rand:n,phase:"countdown",countClock:0,countCue:-1,time:0,collapseZ:i.zones[0].z0-16,collapseSpeed:1,seats:Array(e.seats).fill(null),seatsFilled:0,lastSeatEvent:!1,result:null,launchT:0,launchV:0,launchY:0,shipY:i.ship.y,events:[],platforms:i.platforms.map(h=>({...h})),spinners:i.spinners.map(h=>({...h})),geysers:i.geysers.map(h=>({...h})),rollers:i.rollers.map(h=>({...h})),hoppers:i.hoppers.map(h=>({...h})),flyers:i.flyers.map(h=>({...h})),pendulums:i.pendulums.map(h=>({...h,bobX:h.x,bobY:h.y-h.len,bobZ:h.z})),sweepers:i.sweepers.map(h=>({...h})),lavaY:e.lavaStartY,coins:0,shake:0,activated:!1,zoneId:"meadow"},l=Math.max(30,i.ship.z-i.zones[0].z0);c.collapseSpeed=l/Math.max(8,e.collapseArrive-e.collapseDelay);for(let h of i.chunks)h.state="solid",h.crackT=0,h.fallT=0,h.fallY=0,h.dirty=!0,h.tilt=0,h.stepped=!1,h.spawned=!1;return c}function bh(i,e){for(let n of i.course.chunks)n.state="solid",n.crackT=0,n.fallT=0,n.fallY=0,n.dirty=!0,n.tilt=0,n.stepped=!1;let t=pa(i.course,i.cfg,e||i.seed+17>>>0);return Object.assign(i,t),i}function Sh(i){return i&&(i.state==="solid"||i.state==="cracking")}function yh(i,e,t,n){return i<t-n||i>t+1.35&&e>t+.4?!1:e<=t+.28||i<=t+.2}function Qf(i,e,t){if(i.axis!=="seesaw")return i.y;let n=i.face||0,s=(e-i.x)*Math.cos(n)+(t-i.z)*Math.sin(n);return i.originY-s*Math.sin(i.tilt||0)}function ed(i,e,t,n,s){let r=i.cfg.stepUp,o=null,a=i.platforms;for(let l=0;l<a.length;l++){let h=a[l],u=e-h.x,f=t-h.z;if(u*u+f*f>h.radius*h.radius)continue;let p=Qf(h,e,t);yh(n,s,p,r+.1)&&(!o||p>=o.y)&&(o={y:p,platformId:l,tile:null})}let c=Ir(i.course,e,t);return c&&Sh(c)&&yh(n,s,c.y,r)&&(!o||c.y>=o.y-.02)&&(o={y:c.y,platformId:null,tile:c}),o}function vh(i,e,t,n){let s=Ir(i.course,e,t);if(s&&Sh(s)&&Math.abs(s.y-n)<1.4)return!0;for(let r of i.platforms){let o=e-r.x,a=t-r.z;if(o*o+a*a<=r.radius*r.radius&&Math.abs(r.y-n)<1.6)return!0}return!1}function Eh(i,e){for(let t of i.course.winds)if(e.pos.z>=t.z0&&e.pos.z<=t.z1&&e.pos.x>=t.x0&&e.pos.x<=t.x1&&e.pos.y>=t.y0&&e.pos.y<=t.y1)return t;return null}function Wi(i,e,t,n,s){e.seated||e.eliminated||e.invuln>0||e.knockCd>0||(e.vel.x+=t,e.vel.z+=n,e.vel.y=Math.max(e.vel.y,s),e.grounded=!1,e.platformId=null,e.ungroundT=Math.max(e.ungroundT,.08),e.flail=Math.max(e.flail,i.cfg.stunTime),e.controlLock=Math.max(e.controlLock,i.cfg.stunTime),e.knockCd=i.cfg.knockCooldown,e.sliding=0,i.events.push({t:"bump",id:e.id,big:!0}),e.isPlayer&&(i.shake=Math.max(i.shake,.72)))}function td(i,e){let t=i.course.stations,n=i.course.chunks,s=a=>{if(!a||a.gap||a.zone==="ship")return!1;let c=n[a.chunk];return c&&(c.state==="solid"||c.state==="cracking")},r=Math.max(0,Math.min(t.length-1,e.row||0));for(let a=r;a>=0;a--)if(s(t[a]))return t[a];let o=Math.max(0,Math.round(i.collapseZ/2));for(let a=o;a<t.length;a++)if(s(t[a]))return t[a];for(let a of t)if(s(a))return a;return t[0]||null}function Mh(i,e){let t=i.course.checkpoints[e.cp]||i.course.checkpoints[0],n=td(i,t),s=e.lastSafe,o=s&&Ir(i.course,s.x,s.z)?s:n;o&&(e.pos.x=o.x,e.pos.y=o.y+1.1,e.pos.z=o.z,e.vel.x=0,e.vel.y=4.2,e.vel.z=0,e.grounded=!1,e.platformId=null,e.flail=.7,e.invuln=.85,e.controlLock=.25,e.sliding=0,e.diving=!1,e.wasDiving=!1,i.events.push({t:"respawn",id:e.id}),e.isPlayer&&(i.shake=Math.max(i.shake,.3)))}function nd(i,e){let t=i.cfg;for(let n of i.racers){if(n===e||n.seated||n.invuln>0)continue;let s=n.pos.x-e.pos.x,r=n.pos.z-e.pos.z,o=Math.hypot(s,r);if(o<t.poundRadius&&Math.abs(n.pos.y-e.pos.y)<1.5){let a=o>.05?s/o:1,c=o>.05?r/o:0;n.vel.x+=a*t.poundPush,n.vel.z+=c*t.poundPush,n.vel.y=Math.max(n.vel.y,t.poundUp),n.grounded=!1,n.flail=.35,n.ungroundT=.06}}i.events.push({t:"bump",id:e.id,big:!0})}function id(i,e){let t=i.course.blockers;if(!t)return;let n=i.course.ship;for(let s=0;s<t.length;s++){let r=t[s];if(Math.abs(e.pos.y-r.y)>2.2)continue;if(r.ship){let p=e.pos.z-n.z;if(p<-.5&&p>-9)continue}let o=e.pos.x-r.x,a=e.pos.z-r.z,c=Math.hypot(o,a);if(c>=r.r||c<1e-4)continue;let l=o/c,h=a/c,u=r.r-c;e.pos.x+=l*u,e.pos.z+=h*u;let f=e.vel.x*l+e.vel.z*h;f<0&&(e.vel.x-=l*f,e.vel.z-=h*f)}}function sd(i,e,t,n,s,r,o){let a=_i(e,t),c=r*Math.min(1,a),l=0,h=0;a>.001&&(l=e/a,h=t/a);let u=l*c+(o||0),f=h*c,p=u-i.vel.x,g=f-i.vel.z,y=Math.hypot(p,g),m=Math.min(y,s*n);y>1e-4&&(i.vel.x+=p/y*m,i.vel.z+=g/y*m)}function rd(i,e,t,n){let s=i.cfg;if(e.seated||e.eliminated)return;if(e.controlLock>0&&(e.controlLock-=n,t={x:0,z:0,jump:!1,dive:!1}),e.invuln>0&&(e.invuln-=n),e.padCd>0&&(e.padCd-=n),e.bumpCd>0&&(e.bumpCd-=n),e.spinCd>0&&(e.spinCd-=n),e.diveCd>0&&(e.diveCd-=n),e.knockCd>0&&(e.knockCd-=n),e.flail>0&&(e.flail-=n),e.squash>0&&(e.squash=Math.max(0,e.squash-n*3.2)),e.grounded&&e.platformId!=null){let _=i.platforms[e.platformId];if(_){if(e.pos.x+=_.x-_.prevX,e.pos.z+=_.z-_.prevZ,_.axis==="spin"){let v=e.pos.x-_.x,x=e.pos.z-_.z;e.vel.x+=-x*_.speed*n*5.5,e.vel.z+=v*_.speed*n*5.5}else if(_.axis==="seesaw"){let v=_.face||0,x=Math.sin(_.tilt||0)*9*n;e.vel.x+=Math.cos(v)*x,e.vel.z+=Math.sin(v)*x}}}if(e.grounded?e.coyote=s.coyoteTime:e.coyote=Math.max(0,e.coyote-n),t.jump?e.buffer=s.jumpBuffer:e.buffer=Math.max(0,e.buffer-n),t.dive&&e.diveCd<=0){let _=_i(t.x,t.z);_>.15?(e.dashX=t.x/_,e.dashZ=t.z/_):(e.dashX=Math.sin(e.yaw),e.dashZ=Math.cos(e.yaw)),e.grounded?(e.sliding=s.diveDashTime,e.diveCd=s.diveCooldown,i.events.push({t:"dive",id:e.id})):(e.vel.y=-s.diveFall,e.diving=!0,e.wasDiving=!0,e.diveCd=s.diveCooldown,e.grounded=!1,i.events.push({t:"dive",id:e.id}))}let r=Eh(i,e),o=r?r.ax*s.windPush:0,a=e.controlLock>0?8:e.onIce?_i(t.x,t.z)>.1?s.iceAccel:s.iceFriction:_i(t.x,t.z)>.08?s.accel:s.friction,c=s.maxSpeed*(e.profile.speed||1);if(e.sliding>0)e.sliding-=n,e.vel.x=e.dashX*s.diveDashSpeed,e.vel.z=e.dashZ*s.diveDashSpeed,e.vel.x+=t.x*10*n,e.vel.z+=t.z*10*n;else if(e.grounded)sd(e,t.x,t.z,n,a,c,o),e.groundTile&&e.groundTile.conveyX&&(e.vel.x+=e.groundTile.conveyX*n);else{e.vel.x+=t.x*s.airAccel*n+o*n*.6,e.vel.z+=t.z*s.airAccel*n;let _=e.diving?s.diveDashSpeed:e.boost>0?s.padForward+c:c*1.18;e.boost>0&&(e.boost-=n);let v=_i(e.vel.x,e.vel.z);v>_&&(e.vel.x*=_/v,e.vel.z*=_/v)}let l=!1;e.buffer>0&&e.ungroundT<=0&&(e.grounded||e.coyote>0)&&e.sliding<=0&&(e.vel.y=s.jumpVel,e.grounded=!1,e.platformId=null,e.coyote=0,e.buffer=0,e.ungroundT=s.ungroundTime,l=!0,i.events.push({t:"jump",id:e.id}));let h=s.gravity;e.vel.y<0&&(h*=s.fallGravityMul),e.vel.y-=h*n,e.vel.y<-s.maxFallSpeed&&(e.vel.y=-s.maxFallSpeed),e.vel.x=Pr(e.vel.x,-24,24),e.vel.z=Pr(e.vel.z,-24,24),e.ungroundT>0&&(e.ungroundT-=n);let u=e.grounded,f=e.pos.x,p=e.pos.z;e.pos.x+=e.vel.x*n,e.pos.z+=e.vel.z*n,id(i,e);let g=e.pos.y+e.vel.y*n;if(e.ungroundT>0||l)e.pos.y=g,e.grounded=!1,e.platformId=null;else{let _=ed(i,e.pos.x,e.pos.z,e.pos.y,g);if(_&&e.vel.y<=.85){let v=-e.vel.y,x=!e.grounded;e.pos.y=_.y,e.vel.y=0,e.grounded=!0,e.platformId=_.platformId,e.groundTile=_.tile,e.onIce=!!(_.tile&&_.tile.ice),e.diving=!1,x&&v>2.4&&(e.squash=Pr(v/16,.12,1),i.events.push({t:"land",id:e.id,impact:v}),e.wasDiving&&v>8&&nd(i,e)),e.wasDiving=!1,_.tile&&!_.tile.fragile&&(e.lastSafe={x:_.tile.x,y:_.y,z:e.pos.z}),_.tile&&_.tile.chunk&&_.tile.state==="solid"&&_.tile.fragile&&!_.tile.chunk.stepped&&(_.tile.chunk.stepped=!0,_.tile.chunk.state="cracking",_.tile.chunk.crackT=s.fragileCrack,_.tile.chunk.dirty=!0,i.events.push({t:"crack"}))}else u&&e.pos.z<50&&e.vel.y<=.6?(e.pos.x=f,e.pos.z=p,e.vel.x*=.15,e.vel.z*=.15,e.grounded=!0):(e.pos.y=g,e.grounded=!1,e.platformId=null,e.groundTile=null,e.onIce=!1)}let y=i.course.checkpoints;for(;e.grounded&&e.cp<y.length-1&&e.pos.z>y[e.cp+1].z-1.5;)e.cp++,e.isPlayer&&i.events.push({t:"checkpoint",name:y[e.cp].name});e.pos.y<s.voidY&&Mh(i,e);let m=i.course.lava;e.pos.z>m.z0&&e.pos.z<m.z1&&e.pos.x>m.x0&&e.pos.x<m.x1&&e.pos.y<i.lavaY+.2&&!e.seated&&Mh(i,e),_i(e.vel.x,e.vel.z)>.7&&e.sliding<=0?e.yaw=Math.atan2(e.vel.x,e.vel.z):e.sliding>0&&(e.yaw=Math.atan2(e.dashX,e.dashZ)),!e.grounded&&e.vel.y<-2&&(e.flail=Math.max(e.flail,.12))}function od(i,e,t){let n={x:0,z:0,jump:!1,dive:!1};if(e.wait>0)return e.wait-=t,n;if(e.stumble>0)return e.stumble-=t,n;let s=e.profile;i.rand()<s.mistake*t&&(e.stumble=.18+i.rand()*.28);let r=i.course.routes,o=r&&r[e.routeId]||i.course.waypoints;for(;e.wp<o.length-1;){let x=o[e.wp],P=e.pos.x-x.x,R=e.pos.z-x.z;if(P*P+R*R>9)break;e.wp++}let a=o[Math.min(e.wp,o.length-1)],c=(e.id%5-2)*(e.pos.y>5.5?.4:.85),l=a.x+c;a.gap&&(l=a.x);for(let x of i.course.pads){let P=(x.x-a.x)**2+(x.z-a.z)**2<36,R=(x.x-e.pos.x)**2+(x.z-e.pos.z)**2<49;P&&R&&(l=x.x)}let h=a.z,u=a.y;if(a.z-e.pos.z>6){let x=null,P=1e9;for(let R of i.platforms){if(R.kind!=="ferry"||R.z<e.pos.z+.5||R.z>a.z+1)continue;let L=R.z-e.pos.z;L<P&&(P=L,x=R)}x&&(l=x.x,h=x.z,u=x.y)}let f=l-e.pos.x,p=h-e.pos.z;Eh(i,e)&&(f-=2.4*s.skill);for(let x of i.spinners){let P=x.z-e.pos.z;P>-.2&&P<7&&Math.abs(x.x-e.pos.x)<2.2&&(f+=(e.pos.x>=x.x?1:-1)*3.2*s.skill)}for(let x of i.sweepers){let P=x.z-e.pos.z;P>.3&&P<6&&Math.abs(x.x-e.pos.x)<1.6&&(x.full&&s.skill>.4||(f+=(e.pos.x>=x.x?1:-1)*3*s.skill))}for(let x of i.geysers){if(!x.warn&&!x.hot)continue;let P=x.z-e.pos.z;P>-.5&&P<7&&Math.abs(x.x-e.pos.x)<2.4&&(f+=(e.pos.x>=x.x?1:-1)*4.2*s.skill)}for(let x of i.rollers)Math.abs(x.z-e.pos.z)<3&&Math.abs(x.x-e.pos.x)<3&&(p+=2.5,f+=(e.pos.x>=x.x?1:-1)*2);let g=Math.hypot(f,p)||1;f/=g,p/=g;let y=!1,m=e.pos.x+f*1.05,d=e.pos.z+p*1.05,_=vh(i,m,d,e.pos.y);e.grounded&&!_&&(vh(i,e.pos.x+f*3.2,e.pos.z+p*4.2,e.pos.y)||u>e.pos.y-.4?y=!0:p*=.15),e.grounded&&u>e.pos.y+.65&&Math.hypot(l-e.pos.x,h-e.pos.z)<3.2&&(y=!0);let v=!1;for(let x of i.course.pads){let P=x.z-e.pos.z;P>-.4&&P<8&&Math.abs(x.x-e.pos.x)<2.2&&(v=!0)}v&&(y=!1);for(let x of i.sweepers){if(!x.full)continue;let P=x.z-e.pos.z;e.grounded&&P>.6&&P<2.8&&(y=!0)}return{x:f,z:p,jump:y,dive:!1}}function ad(i){let e=i.cfg,t=i.racers,n=e.bodyRadius*2.55;for(let s=0;s<t.length;s++){let r=t[s];if(!(r.seated||r.eliminated))for(let o=s+1;o<t.length;o++){let a=t[o];if(a.seated||a.eliminated)continue;let c=a.pos.x-r.pos.x,l=a.pos.z-r.pos.z;if(Math.abs(r.pos.y-a.pos.y)>1.3)continue;let u=Math.hypot(c,l);if(u<8e-4&&(c=.02,u=.02),u>=n)continue;let f=c/u,p=l/u,g=(n-u)*.5;if(r.invuln<=0&&(r.pos.x-=f*g,r.pos.z-=p*g),a.invuln<=0&&(a.pos.x+=f*g,a.pos.z+=p*g),(r.vel.x-a.vel.x)*f+(r.vel.z-a.vel.z)*p>1.1&&r.bumpCd<=0&&a.bumpCd<=0&&r.invuln<=0&&a.invuln<=0){r.vel.x-=f*e.bumpPush,r.vel.z-=p*e.bumpPush,a.vel.x+=f*e.bumpPush,a.vel.z+=p*e.bumpPush,r.vel.y=Math.max(r.vel.y,e.bumpUp),a.vel.y=Math.max(a.vel.y,e.bumpUp),r.grounded=!1,a.grounded=!1,r.ungroundT=Math.max(r.ungroundT,.05),a.ungroundT=Math.max(a.ungroundT,.05),r.flail=Math.max(r.flail,.28),a.flail=Math.max(a.flail,.28),r.bumpCd=e.bumpCooldown,a.bumpCd=e.bumpCooldown;let m=r.isPlayer?r.id:a.isPlayer?a.id:r.id;i.events.push({t:"bump",id:m}),(r.isPlayer||a.isPlayer)&&(i.shake=Math.max(i.shake,.18))}}}}function cd(i,e){let t=i.cfg;for(let n of i.spinners)n.angle+=n.spin*e;for(let n of i.course.bumpers)for(let s of i.racers){if(s.seated||s.bumpCd>0||s.invuln>0)continue;let r=s.pos.x-n.x,o=s.pos.z-n.z,a=Math.hypot(r,o);if(a<t.bumperRadius+.2&&Math.abs(s.pos.y-n.y)<1.4){let c=a>.05?r/a:1,l=a>.05?o/a:0;s.vel.x=c*t.bumperPush,s.vel.z=l*t.bumperPush,s.vel.y=Math.max(s.vel.y,t.bumperUp),s.grounded=!1,s.ungroundT=.08,s.flail=.4,s.bumpCd=t.bumperCooldown,s.controlLock=Math.max(s.controlLock,.12),i.events.push({t:"bump",id:s.id,big:!0}),s.isPlayer&&(i.shake=Math.max(i.shake,.28))}}for(let n of i.spinners){let s=Math.cos(n.angle),r=Math.sin(n.angle),o=n.len||t.spinnerLength,a=s*o,c=r*o,l=n.x-a,h=n.z-c,u=n.x+a,f=n.z+c,p=u-l,g=f-h,y=p*p+g*g||1;for(let m of i.racers){if(m.seated||m.spinCd>0||m.invuln>0||m.sliding>0)continue;let d=m.pos.y-n.y;if(d<t.spinnerMinY||d>t.spinnerMaxY)continue;let _=((m.pos.x-l)*p+(m.pos.z-h)*g)/y;_=Pr(_,0,1);let v=l+p*_,x=h+g*_,P=m.pos.x-v,R=m.pos.z-x;if(P*P+R*R>t.spinnerHit*t.spinnerHit)continue;let L=-r,N=s,E=Math.sign((m.pos.x-n.x)*L+(m.pos.z-n.z)*N)||1;Wi(i,m,L*E*t.spinnerPush,N*E*t.spinnerPush,t.spinnerUp),m.spinCd=t.spinnerCooldown}}for(let n of i.course.pads)for(let s of i.racers){if(s.seated||s.padCd>0)continue;let r=s.pos.x-n.x,o=s.pos.z-n.z;if(r*r+o*o>t.padRadius*t.padRadius||Math.abs(s.pos.y-n.y)>1.1)continue;let a=n.face!=null?n.face:_i(s.vel.x,s.vel.z)>.4?Math.atan2(s.vel.x,s.vel.z):0;s.vel.y=t.padUp,s.vel.x=Math.sin(a)*t.padForward,s.vel.z=Math.cos(a)*t.padForward,s.grounded=!1,s.platformId=null,s.ungroundT=.12,s.padCd=t.padCooldown,s.boost=.85,i.events.push({t:"jump",id:s.id,pad:!0})}for(let n of i.geysers){n.t+=e;let s=n.t%n.period;if(n.warn=s>n.period-.7&&s<n.period-.18,n.hot=s>=n.period-.18||s<.28,n.hot&&!n.wasHot)for(let r of i.racers){if(r.seated)continue;Math.hypot(r.pos.x-n.x,r.pos.z-n.z)<n.radius+.3&&Math.abs(r.pos.y-n.y)<1.3&&(r.vel.y=Math.max(r.vel.y,13),r.grounded=!1,r.ungroundT=.1,r.flail=.3,i.events.push({t:"geyser",id:r.id}),r.isPlayer&&(i.shake=Math.max(i.shake,.2)))}n.wasHot=n.hot}for(let n of i.sweepers){n.x=n.originX+Math.sin(i.time*n.speed+n.z)*n.amp;for(let s of i.racers){if(s.seated||s.invuln>0||s.knockCd>0||Math.abs(s.pos.z-n.z)>1.15||Math.abs(s.pos.x-n.x)>n.radius+.45)continue;let r=s.pos.y-(n.y-n.height),o=s.sliding>0?t.slideHeight:1.35;if(r>o||s.pos.y+.2<n.y-.35||s.sliding>0&&n.height>.8)continue;let a=Math.cos(i.time*n.speed+n.z)>=0?1:-1;Wi(i,s,a*8,3.5,3.2)}}for(let n of i.pendulums){let s=Math.sin(i.time*n.speed+n.phase)*n.amp;n.bobX=n.x+Math.sin(s)*n.len,n.bobY=n.y-Math.cos(s)*n.len,n.bobZ=n.z;let r=Math.cos(i.time*n.speed+n.phase);for(let o of i.racers){if(o.seated||o.invuln>0)continue;Math.hypot(o.pos.x-n.bobX,o.pos.z-n.bobZ)<n.radius+.35&&Math.abs(o.pos.y+.7-n.bobY)<1&&Wi(i,o,r*9,2,3)}}}function ld(i,e){for(let t of i.rollers){t.x+=t.dir*t.speed*e,t.rot+=e*2.4,t.x>t.x1&&(t.dir=-1),t.x<t.x0&&(t.dir=1);for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+.35&&Math.abs(n.pos.y-t.y)<1.4){let r=s>.05?(n.pos.x-t.x)/s:t.dir;Wi(i,n,r*10+t.dir*4,2,4.5)}}}for(let t of i.hoppers){if(t.t+=e,!t.hopping&&t.t>t.period){t.t=0,t.hopping=!0,t.vy=8;let n=t.homeX+Math.sin(i.time)*2.5,s=t.homeZ,r=12;for(let l of i.racers){if(l.seated)continue;let h=Math.hypot(l.pos.x-t.x,l.pos.z-t.z);h<r&&(r=h,n=l.pos.x,s=l.pos.z)}let o=n-t.x,a=s-t.z,c=Math.hypot(o,a)||1;t.dirx=o/c,t.dirz=a/c}if(t.hopping&&(t.vy-=18*e,t.y+=t.vy*e,t.x+=t.dirx*4.2*e,t.z+=t.dirz*4.2*e,t.y<=t.homeY)){t.y=t.homeY,t.hopping=!1;for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+.55&&Math.abs(n.pos.y-t.y)<1.3){let r=s>.05?(n.pos.x-t.x)/s:1;Wi(i,n,r*9,3,5)}}}}for(let t of i.flyers){t.ang+=e*.85,t.x=t.cx+Math.sin(t.ang)*t.span,t.z=t.cz+Math.cos(t.ang)*t.span*.45,t.y=t.cy+Math.sin(t.ang*2)*.7;for(let n of i.racers){if(n.seated)continue;Math.hypot(n.pos.x-t.x,n.pos.z-t.z)<t.radius+.4&&Math.abs(n.pos.y+.8-t.y)<1.1&&Wi(i,n,Math.cos(t.ang)*8,Math.sin(t.ang)*6,3.4)}}}function hd(i,e){for(let t of i.platforms)if(t.prevX=t.x,t.prevZ=t.z,t.phase+=e*t.speed,t.axis==="x")t.x=t.originX+Math.sin(t.phase)*t.amp;else if(t.axis==="bob"||t.axis==="tilt")t.y=t.originY+Math.sin(t.phase)*t.amp;else if(t.axis==="seesaw"){let n=0,s=0,r=t.face||0;for(let a of i.racers){if(a.seated||a.eliminated||!a.grounded)continue;let c=a.pos.x-t.x,l=a.pos.z-t.z;if(c*c+l*l>t.radius*t.radius||Math.abs(a.pos.y-t.originY)>1.8)continue;let h=c*Math.cos(r)+l*Math.sin(r);n+=Math.max(-1,Math.min(1,h/(t.radius*.65))),s++}let o=s?n/s*.62:0;t.tilt=(t.tilt||0)+(o-(t.tilt||0))*Math.min(1,e*3.2),t.tilt=Math.max(-.5,Math.min(.5,t.tilt)),t.y=t.originY}}function ud(i,e){let t=i.cfg;if(i.time<t.collapseDelay)return;let n=i.course.ship.z-18;i.collapseZ+=i.collapseSpeed*e,i.collapseZ>n&&(i.collapseZ=n),i.lavaY=t.lavaStartY+i.time*t.lavaRisePerSec;let s=!1;for(let r of i.course.chunks)if(!(r.zone==="ship"||r.gap)){if(r.state==="solid")i.collapseZ>r.z0&&(r.state="cracking",r.crackT=t.crackTime+r.jitter*.35,r.dirty=!0,s=!0);else if(r.state==="cracking"){if(r.crackT-=e,r.dirty=!0,r.crackT<=0){r.state="falling",r.fallT=t.fallTime;let o=(r.z0+r.z1)*.5,a=i.player.pos.z-o;a*a<420&&(i.shake=Math.max(i.shake,.42))}}else r.state==="falling"&&(r.fallT-=e,r.fallY-=(7+r.jitter*6)*e,r.dirty=!0,r.fallT<=0&&(r.state="gone"));r.ice&&(r.tilt=Math.sin(i.time*1.35+r.jitter*8)*.22)}s&&i.events.push({t:"crack"})}function fd(i){if(i.seatsFilled>=i.cfg.seats)return;let e=i.course.ship,t=i.cfg,n=[];for(let s of i.racers){if(s.seated||s.eliminated||!s.grounded)continue;let r=s.pos.x-e.x,o=s.pos.z-e.z;Math.abs(r)<t.boardHalfX&&o<t.boardZMax&&o>t.boardZMin&&Math.abs(s.pos.y-e.y)<1.8&&n.push({r:s,d:r*r+o*o})}n.sort((s,r)=>s.d-r.d||(s.r.isPlayer?-1:1)-(r.r.isPlayer?-1:1));for(let s of n){if(i.seatsFilled>=t.seats)break;let r=s.r,o=i.seatsFilled;i.seats[o]=r.id,i.seatsFilled++,r.seated=!0,r.seatIndex=o,r.vel.x=r.vel.y=r.vel.z=0,r.emote="cheer",r.isPlayer&&(i.seatCine=1.85),i.events.push({t:"seat",id:r.id,seat:o,pop:!0}),i.seatsFilled===t.seats-1&&!i.lastSeatEvent&&(i.lastSeatEvent=!0,i.events.push({t:"lastseat"}))}}function dd(i){i.phase="launch",i.launchT=0,i.launchV=1.5,i.seatCine=0,i.result=i.player.seated?"escaped":"missed",i.player.seated||(i.player.flail=.8,i.player.emote="wave",i.player.waveT=0),i.events.push({t:"launch"}),i.events.push({t:i.result,time:i.time}),i.shake=.65}function wh(i,e,t){let n=i.cfg;if(i.events.length>80&&i.events.splice(0,i.events.length-80),i.phase==="countdown"){i.countClock+=e;let s=i.countClock<1?3:i.countClock<2?2:i.countClock<3?1:0;s!==i.countCue&&(i.countCue=s,i.events.push({t:s===0?"go":"tick",n:s})),i.countClock>=n.countdownBeats+n.goHold&&(i.phase="race",i.activated=!0,i.time=0);return}if(i.phase==="race"){i.activated=!0,i.time+=e,i.seatCine>0&&(i.seatCine-=e),hd(i,e),ud(i,e);for(let o of i.racers){if(o.seated||o.eliminated)continue;let a=o.isPlayer&&!o.useAI?t||{x:0,z:0,jump:!1,dive:!1}:od(i,o,e);rd(i,o,a,e)}ad(i);let s=i.course.coins;if(s){let o=i.player;for(let a=0;a<s.length;a++){let c=s[a];if(c.got||o.seated)continue;let l=o.pos.x-c.x,h=o.pos.z-c.z;l*l+h*h>1.6||Math.abs(o.pos.y+.8-c.y)>1.5||(c.got=!0,i.coins++,i.events.push({t:"coin",n:i.coins}))}}cd(i,e),ld(i,e),fd(i);let r=pd(i,i.player.pos.z);if(r&&r!==i.zoneId){i.zoneId=r;let o=i.course.zones.find(a=>a.id===r);o&&i.events.push({t:"zone",name:o.name})}(i.seatsFilled>=n.seats||i.time>=n.raceSeconds)&&dd(i),i.shake>0&&(i.shake=Math.max(0,i.shake-e*1.5));return}(i.phase==="launch"||i.phase==="results")&&(i.launchT+=e,i.launchV+=4.5*e,i.launchY+=i.launchV*e,i.shipY=i.course.ship.y+i.launchY,i.player.emote==="wave"&&(i.player.waveT=(i.player.waveT||0)+e,i.player.waveT>.7&&i.player.waveT<2.2&&(i.player.emote="cheer"),i.player.waveT>=2.2&&(i.player.emote="idle")),i.phase==="launch"&&i.launchT>1.25&&(i.phase="results"),i.shake>0&&(i.shake=Math.max(0,i.shake-e*.7)))}function pd(i,e){let t=i.course.zones[0].id;for(let n of i.course.zones)e>=n.z0&&(t=n.id);return t}var al="170";var md=0,Th=1,gd=2;var Gu=1,xd=2,zn=3,Cn=0,Ct=1,bt=2,ci=0,ps=1,po=2,Ah=3,Rh=4,_d=5,Ti=100,yd=101,vd=102,Md=103,bd=104,Sd=200,Ed=201,wd=202,Td=203,Za=204,Ka=205,Ad=206,Rd=207,Cd=208,Id=209,Pd=210,Ld=211,Dd=212,Nd=213,Ud=214,Ja=0,$a=1,ja=2,_s=3,Qa=4,ec=5,tc=6,nc=7,cl=0,Fd=1,Od=2,li=0,zd=1,Bd=2,kd=3,ll=4,Hd=5,Vd=6,Gd=7,Ch="attached",Wd="detached",Wu=300,ys=301,vs=302,ic=303,sc=304,Yo=306,Ri=1e3,kn=1001,hr=1002,Lt=1003,hl=1004;var hs=1005;var Qt=1006,or=1007;var Rn=1008;var Gn=1009,Xu=1010,Yu=1011,ur=1012,ul=1013,Ci=1014,bn=1015,yr=1016,fl=1017,dl=1018,Ms=1020,qu=35902,Zu=1021,Ku=1022,dn=1023,Ju=1024,$u=1025,ms=1026,bs=1027,pl=1028,ml=1029,ju=1030,gl=1031;var xl=1033,co=33776,lo=33777,ho=33778,uo=33779,rc=35840,oc=35841,ac=35842,cc=35843,lc=36196,hc=37492,uc=37496,fc=37808,dc=37809,pc=37810,mc=37811,gc=37812,xc=37813,_c=37814,yc=37815,vc=37816,Mc=37817,bc=37818,Sc=37819,Ec=37820,wc=37821,fo=36492,Tc=36494,Ac=36495,Qu=36283,Rc=36284,Cc=36285,Ic=36286,Xd=2200,Yd=2201,qd=2202,Ss=2300,Es=2301,ma=2302,us=2400,fs=2401,mo=2402,_l=2500,Zd=2501,ef=0,qo=1,vr=2,Kd=3200,Jd=3201;var Zo=0,$d=1,An="",At="srgb",zt="srgb-linear",Ko="linear",gt="srgb";var Xi=7680;var Ih=519,jd=512,Qd=513,ep=514,tf=515,tp=516,np=517,ip=518,sp=519,Pc=35044,nf=35048;var Ph="300 es",Hn=2e3,go=2001,Wn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lh=1234567,ar=Math.PI/180,ws=180/Math.PI;function Sn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function Gt(i,e,t){return Math.max(e,Math.min(t,i))}function yl(i,e){return(i%e+e)%e}function rp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function op(i,e,t){return i!==e?(t-i)/(e-i):0}function cr(i,e,t){return(1-t)*i+t*e}function ap(i,e,t,n){return cr(i,e,1-Math.exp(-t*n))}function cp(i,e=1){return e-Math.abs(yl(i,e*2)-e)}function lp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function hp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function up(i,e){return i+Math.floor(Math.random()*(e-i+1))}function fp(i,e){return i+Math.random()*(e-i)}function dp(i){return i*(.5-Math.random())}function pp(i){i!==void 0&&(Lh=i);let e=Lh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function mp(i){return i*ar}function gp(i){return i*ws}function xp(i){return(i&i-1)===0&&i!==0}function _p(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function yp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function vp(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Mn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var sf={DEG2RAD:ar,RAD2DEG:ws,generateUUID:Sn,clamp:Gt,euclideanModulo:yl,mapLinear:rp,inverseLerp:op,lerp:cr,damp:ap,pingpong:cp,smoothstep:lp,smootherstep:hp,randInt:up,randFloat:fp,randFloatSpread:dp,seededRandom:pp,degToRad:mp,radToDeg:gp,isPowerOfTwo:xp,ceilPowerOfTwo:_p,floorPowerOfTwo:yp,setQuaternionFromProperEuler:vp,normalize:pt,denormalize:Mn},Ve=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ke=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],y=s[0],m=s[3],d=s[6],_=s[1],v=s[4],x=s[7],P=s[2],R=s[5],L=s[8];return r[0]=o*y+a*_+c*P,r[3]=o*m+a*v+c*R,r[6]=o*d+a*x+c*L,r[1]=l*y+h*_+u*P,r[4]=l*m+h*v+u*R,r[7]=l*d+h*x+u*L,r[2]=f*y+p*_+g*P,r[5]=f*m+p*v+g*R,r[8]=f*d+p*x+g*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,p=l*r-o*c,g=t*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=u*y,e[1]=(s*l-h*n)*y,e[2]=(a*n-s*o)*y,e[3]=f*y,e[4]=(h*t-s*c)*y,e[5]=(s*r-a*t)*y,e[6]=p*y,e[7]=(n*c-l*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ga.makeScale(e,t)),this}rotate(e){return this.premultiply(ga.makeRotation(-e)),this}translate(e,t){return this.premultiply(ga.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ga=new Ke;function rf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mp(){let i=fr("canvas");return i.style.display="block",i}var Dh={};function sr(i){i in Dh||(Dh[i]=!0,console.warn(i))}function bp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Sp(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ep(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var nt={enabled:!0,workingColorSpace:zt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===gt&&(i.r=Vn(i.r),i.g=Vn(i.g),i.b=Vn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===gt&&(i.r=gs(i.r),i.g=gs(i.g),i.b=gs(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===An?Ko:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Vn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Nh=[.64,.33,.3,.6,.15,.06],Uh=[.2126,.7152,.0722],Fh=[.3127,.329],Oh=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zh=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);nt.define({[zt]:{primaries:Nh,whitePoint:Fh,transfer:Ko,toXYZ:Oh,fromXYZ:zh,luminanceCoefficients:Uh,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:Nh,whitePoint:Fh,transfer:gt,toXYZ:Oh,fromXYZ:zh,luminanceCoefficients:Uh,outputColorSpaceConfig:{drawingBufferColorSpace:At}}});var Yi,Lc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Yi===void 0&&(Yi=fr("canvas")),Yi.width=e.width,Yi.height=e.height;let n=Yi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Yi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=fr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Vn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Vn(t[n]/255)*255):t[n]=Vn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},wp=0,xo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=Sn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(xa(s[o].image)):r.push(xa(s[o]))}else r=xa(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function xa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Lc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Tp=0,Ot=class i extends Wn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=kn,s=kn,r=Qt,o=Rn,a=dn,c=Gn,l=i.DEFAULT_ANISOTROPY,h=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=Sn(),this.name="",this.source=new xo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ri:e.x=e.x-Math.floor(e.x);break;case kn:e.x=e.x<0?0:1;break;case hr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ri:e.y=e.y-Math.floor(e.y);break;case kn:e.y=e.y<0?0:1;break;case hr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Wu;Ot.DEFAULT_ANISOTROPY=1;var ht=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],g=c[9],y=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,x=(p+1)/2,P=(d+1)/2,R=(h+f)/4,L=(u+y)/4,N=(g+m)/4;return v>x&&v>P?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=R/n,r=L/n):x>P?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=R/s,r=N/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=L/r,s=N/r),this.set(n,s,r,t),this}let _=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(u-y)/_,this.z=(f-h)/_,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Dc=class extends Wn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Ot(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new xo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xn=class extends Dc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},_o=class extends Ot{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Nc=class extends Ot{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var en=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],p=r[o+1],g=r[o+2],y=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=y;return}if(u!==y||c!==f||l!==p||h!==g){let m=1-a,d=c*f+l*p+h*g+u*y,_=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){let P=Math.sqrt(v),R=Math.atan2(P,d*_);m=Math.sin(m*R)/P,a=Math.sin(a*R)/P}let x=a*_;if(c=c*m+f*x,l=l*m+p*x,h=h*m+g*x,u=u*m+y*x,m===1-a){let P=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=P,l*=P,h*=P,u*=P}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*f,e[t+1]=c*g+h*f+l*u-a*p,e[t+2]=l*g+h*p+a*f-c*u,e[t+3]=h*g-a*u-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"YZX":this._x=f*h*u+l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u-f*p*g;break;case"XZY":this._x=f*h*u-l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Gt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _a.copy(this).projectOnVector(e),this.sub(_a)}reflect(e){return this.sub(_a.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_a=new z,Bh=new en,Wt=class{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,_n):_n.fromBufferAttribute(r,o),_n.applyMatrix4(e.matrixWorld),this.expandByPoint(_n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lr.copy(n.boundingBox)),Lr.applyMatrix4(e.matrixWorld),this.union(Lr)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_n),_n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),Dr.subVectors(this.max,qs),qi.subVectors(e.a,qs),Zi.subVectors(e.b,qs),Ki.subVectors(e.c,qs),ei.subVectors(Zi,qi),ti.subVectors(Ki,Zi),yi.subVectors(qi,Ki);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-yi.z,yi.y,ei.z,0,-ei.x,ti.z,0,-ti.x,yi.z,0,-yi.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-yi.y,yi.x,0];return!ya(t,qi,Zi,Ki,Dr)||(t=[1,0,0,0,1,0,0,0,1],!ya(t,qi,Zi,Ki,Dr))?!1:(Nr.crossVectors(ei,ti),t=[Nr.x,Nr.y,Nr.z],ya(t,qi,Zi,Ki,Dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Ln=[new z,new z,new z,new z,new z,new z,new z,new z],_n=new z,Lr=new Wt,qi=new z,Zi=new z,Ki=new z,ei=new z,ti=new z,yi=new z,qs=new z,Dr=new z,Nr=new z,vi=new z;function ya(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){vi.fromArray(i,r);let a=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),c=e.dot(vi),l=t.dot(vi),h=n.dot(vi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Ap=new Wt,Zs=new z,va=new z,an=class{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ap.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zs.subVectors(e,this.center);let t=Zs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Zs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(va.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zs.copy(e.center).add(va)),this.expandByPoint(Zs.copy(e.center).sub(va))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Dn=new z,Ma=new z,Ur=new z,ni=new z,ba=new z,Fr=new z,Sa=new z,Ts=class{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Dn.copy(this.origin).addScaledVector(this.direction,t),Dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ma.copy(e).add(t).multiplyScalar(.5),Ur.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(Ma);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ur),a=ni.dot(this.direction),c=-ni.dot(Ur),l=ni.lengthSq(),h=Math.abs(1-o*o),u,f,p,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let y=1/h;u*=y,f*=y,p=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ma).addScaledVector(Ur,f),p}intersectSphere(e,t){Dn.subVectors(e.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Dn)!==null}intersectTriangle(e,t,n,s,r){ba.subVectors(t,e),Fr.subVectors(n,e),Sa.crossVectors(ba,Fr);let o=this.direction.dot(Sa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ni.subVectors(this.origin,e);let c=a*this.direction.dot(Fr.crossVectors(ni,Fr));if(c<0)return null;let l=a*this.direction.dot(ba.cross(ni));if(l<0||c+l>o)return null;let h=-a*ni.dot(Sa);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qe=class i{constructor(e,t,n,s,r,o,a,c,l,h,u,f,p,g,y,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,f,p,g,y,m)}set(e,t,n,s,r,o,a,c,l,h,u,f,p,g,y,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=y,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Ji.setFromMatrixColumn(e,0).length(),r=1/Ji.setFromMatrixColumn(e,1).length(),o=1/Ji.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,p=o*u,g=a*h,y=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*h,p=c*u,g=l*h,y=l*u;t[0]=f+y*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*h,p=c*u,g=l*h,y=l*u;t[0]=f-y*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*h,p=o*u,g=a*h,y=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=f*l+y,t[1]=c*u,t[5]=y*l+f,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,p=o*l,g=a*c,y=a*l;t[0]=c*h,t[4]=y-f*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=f-y*u}else if(e.order==="XZY"){let f=o*c,p=o*l,g=a*c,y=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+y,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=y*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rp,e,Cp)}lookAt(e,t,n){let s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ii.crossVectors(n,rn),ii.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ii.crossVectors(n,rn)),ii.normalize(),Or.crossVectors(rn,ii),s[0]=ii.x,s[4]=Or.x,s[8]=rn.x,s[1]=ii.y,s[5]=Or.y,s[9]=rn.y,s[2]=ii.z,s[6]=Or.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],y=n[6],m=n[10],d=n[14],_=n[3],v=n[7],x=n[11],P=n[15],R=s[0],L=s[4],N=s[8],E=s[12],S=s[1],F=s[5],W=s[9],G=s[13],Z=s[2],J=s[6],q=s[10],ue=s[14],K=s[3],me=s[7],_e=s[11],we=s[15];return r[0]=o*R+a*S+c*Z+l*K,r[4]=o*L+a*F+c*J+l*me,r[8]=o*N+a*W+c*q+l*_e,r[12]=o*E+a*G+c*ue+l*we,r[1]=h*R+u*S+f*Z+p*K,r[5]=h*L+u*F+f*J+p*me,r[9]=h*N+u*W+f*q+p*_e,r[13]=h*E+u*G+f*ue+p*we,r[2]=g*R+y*S+m*Z+d*K,r[6]=g*L+y*F+m*J+d*me,r[10]=g*N+y*W+m*q+d*_e,r[14]=g*E+y*G+m*ue+d*we,r[3]=_*R+v*S+x*Z+P*K,r[7]=_*L+v*F+x*J+P*me,r[11]=_*N+v*W+x*q+P*_e,r[15]=_*E+v*G+x*ue+P*we,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],y=e[7],m=e[11],d=e[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*p-n*c*p)+y*(+t*c*p-t*l*f+r*o*f-s*o*p+s*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+d*(-s*a*h-t*c*u+t*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],y=e[13],m=e[14],d=e[15],_=u*m*l-y*f*l+y*c*p-a*m*p-u*c*d+a*f*d,v=g*f*l-h*m*l-g*c*p+o*m*p+h*c*d-o*f*d,x=h*y*l-g*u*l+g*a*p-o*y*p-h*a*d+o*u*d,P=g*u*c-h*y*c-g*a*f+o*y*f+h*a*m-o*u*m,R=t*_+n*v+s*x+r*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/R;return e[0]=_*L,e[1]=(y*f*r-u*m*r-y*s*p+n*m*p+u*s*d-n*f*d)*L,e[2]=(a*m*r-y*c*r+y*s*l-n*m*l-a*s*d+n*c*d)*L,e[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*p-n*c*p)*L,e[4]=v*L,e[5]=(h*m*r-g*f*r+g*s*p-t*m*p-h*s*d+t*f*d)*L,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*d-t*c*d)*L,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*p+t*c*p)*L,e[8]=x*L,e[9]=(g*u*r-h*y*r-g*n*p+t*y*p+h*n*d-t*u*d)*L,e[10]=(o*y*r-g*a*r+g*n*l-t*y*l-o*n*d+t*a*d)*L,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*L,e[12]=P*L,e[13]=(h*y*s-g*u*s+g*n*f-t*y*f-h*n*m+t*u*m)*L,e[14]=(g*a*s-o*y*s-g*n*c+t*y*c+o*n*m-t*a*m)*L,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*f+t*a*f)*L,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,p=r*h,g=r*u,y=o*h,m=o*u,d=a*u,_=c*l,v=c*h,x=c*u,P=n.x,R=n.y,L=n.z;return s[0]=(1-(y+d))*P,s[1]=(p+x)*P,s[2]=(g-v)*P,s[3]=0,s[4]=(p-x)*R,s[5]=(1-(f+d))*R,s[6]=(m+_)*R,s[7]=0,s[8]=(g+v)*L,s[9]=(m-_)*L,s[10]=(1-(f+y))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Ji.set(s[0],s[1],s[2]).length(),o=Ji.set(s[4],s[5],s[6]).length(),a=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],yn.copy(this);let l=1/r,h=1/o,u=1/a;return yn.elements[0]*=l,yn.elements[1]*=l,yn.elements[2]*=l,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=u,yn.elements[9]*=u,yn.elements[10]*=u,t.setFromRotationMatrix(yn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Hn){let c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),p,g;if(a===Hn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===go)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Hn){let c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),f=(t+e)*l,p=(n+s)*h,g,y;if(a===Hn)g=(o+r)*u,y=-2*u;else if(a===go)g=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=y,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ji=new z,yn=new qe,Rp=new z(0,0,0),Cp=new z(1,1,1),ii=new z,Or=new z,rn=new z,kh=new qe,Hh=new en,En=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return kh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hh.setFromEuler(this),this.setFromQuaternion(Hh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};En.DEFAULT_ORDER="XYZ";var yo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ip=0,Vh=new z,$i=new en,Nn=new qe,zr=new z,Ks=new z,Pp=new z,Lp=new en,Gh=new z(1,0,0),Wh=new z(0,1,0),Xh=new z(0,0,1),Yh={type:"added"},Dp={type:"removed"},ji={type:"childadded",child:null},Ea={type:"childremoved",child:null},lt=class i extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new z,t=new En,n=new en,s=new z(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new Ke}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.multiply($i),this}rotateOnWorldAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.premultiply($i),this}rotateX(e){return this.rotateOnAxis(Gh,e)}rotateY(e){return this.rotateOnAxis(Wh,e)}rotateZ(e){return this.rotateOnAxis(Xh,e)}translateOnAxis(e,t){return Vh.copy(e).applyQuaternion(this.quaternion),this.position.add(Vh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gh,e)}translateY(e){return this.translateOnAxis(Wh,e)}translateZ(e){return this.translateOnAxis(Xh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zr.copy(e):zr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Ks,zr,this.up):Nn.lookAt(zr,Ks,this.up),this.quaternion.setFromRotationMatrix(Nn),s&&(Nn.extractRotation(s.matrixWorld),$i.setFromRotationMatrix(Nn),this.quaternion.premultiply($i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yh),ji.child=e,this.dispatchEvent(ji),ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dp),Ea.child=e,this.dispatchEvent(Ea),Ea.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yh),ji.child=e,this.dispatchEvent(ji),ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,e,Pp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,Lp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};lt.DEFAULT_UP=new z(0,1,0);lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var vn=new z,Un=new z,wa=new z,Fn=new z,Qi=new z,es=new z,qh=new z,Ta=new z,Aa=new z,Ra=new z,Ca=new ht,Ia=new ht,Pa=new ht,oi=class i{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),vn.subVectors(e,t),s.cross(vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){vn.subVectors(s,t),Un.subVectors(n,t),wa.subVectors(e,t);let o=vn.dot(vn),a=vn.dot(Un),c=vn.dot(wa),l=Un.dot(Un),h=Un.dot(wa),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Fn.x),c.addScaledVector(o,Fn.y),c.addScaledVector(a,Fn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Ca.setScalar(0),Ia.setScalar(0),Pa.setScalar(0),Ca.fromBufferAttribute(e,t),Ia.fromBufferAttribute(e,n),Pa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ca,r.x),o.addScaledVector(Ia,r.y),o.addScaledVector(Pa,r.z),o}static isFrontFacing(e,t,n,s){return vn.subVectors(n,t),Un.subVectors(e,t),vn.cross(Un).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),vn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Qi.subVectors(s,n),es.subVectors(r,n),Ta.subVectors(e,n);let c=Qi.dot(Ta),l=es.dot(Ta);if(c<=0&&l<=0)return t.copy(n);Aa.subVectors(e,s);let h=Qi.dot(Aa),u=es.dot(Aa);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Qi,o);Ra.subVectors(e,r);let p=Qi.dot(Ra),g=es.dot(Ra);if(g>=0&&p<=g)return t.copy(r);let y=p*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(es,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return qh.subVectors(r,s),a=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(qh,a);let d=1/(m+y+f);return o=y*d,a=f*d,t.copy(n).addScaledVector(Qi,o).addScaledVector(es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},of={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},Br={h:0,s:0,l:0};function La(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Le=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=nt.workingColorSpace){if(e=yl(e,1),t=Gt(t,0,1),n=Gt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=La(o,r,e+1/3),this.g=La(o,r,e),this.b=La(o,r,e-1/3)}return nt.toWorkingColorSpace(this,s),this}setStyle(e,t=At){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){let n=of[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vn(e.r),this.g=Vn(e.g),this.b=Vn(e.b),this}copyLinearToSRGB(e){return this.r=gs(e.r),this.g=gs(e.g),this.b=gs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return nt.fromWorkingColorSpace(Vt.copy(this),e),Math.round(Gt(Vt.r*255,0,255))*65536+Math.round(Gt(Vt.g*255,0,255))*256+Math.round(Gt(Vt.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.fromWorkingColorSpace(Vt.copy(this),t);let n=Vt.r,s=Vt.g,r=Vt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.fromWorkingColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=At){nt.fromWorkingColorSpace(Vt.copy(this),e);let t=Vt.r,n=Vt.g,s=Vt.b;return e!==At?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(si),this.setHSL(si.h+e,si.s+t,si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(si),e.getHSL(Br);let n=cr(si.h,Br.h,t),s=cr(si.s,Br.s,t),r=cr(si.l,Br.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Vt=new Le;Le.NAMES=of;var Np=0,Xt=class extends Wn{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=Sn(),this.name="",this.blending=ps,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Za,this.blendDst=Ka,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ps&&(n.blending=this.blending),this.side!==Cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Za&&(n.blendSrc=this.blendSrc),this.blendDst!==Ka&&(n.blendDst=this.blendDst),this.blendEquation!==Ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_s&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ih&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},_t=class extends Xt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Rt=new z,kr=new Ve,xt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pc,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix3(e),this.setXY(t,kr.x,kr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pc&&(e.usage=this.usage),e}};var vo=class extends xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Mo=class extends xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var it=class extends xt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Up=0,fn=new qe,Da=new lt,ts=new z,on=new Wt,Js=new Wt,Ft=new z,vt=class i extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rf(e)?Mo:vo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,n){return fn.makeTranslation(e,t,n),this.applyMatrix4(fn),this}scale(e,t,n){return fn.makeScale(e,t,n),this.applyMatrix4(fn),this}lookAt(e){return Da.lookAt(e),Da.updateMatrix(),this.applyMatrix4(Da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new it(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new an);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){let n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Js.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(on.min,Js.min),on.expandByPoint(Ft),Ft.addVectors(on.max,Js.max),on.expandByPoint(Ft)):(on.expandByPoint(Js.min),on.expandByPoint(Js.max))}on.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ft));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ft.fromBufferAttribute(a,l),c&&(ts.fromBufferAttribute(e,l),Ft.add(ts)),s=Math.max(s,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let N=0;N<n.count;N++)a[N]=new z,c[N]=new z;let l=new z,h=new z,u=new z,f=new Ve,p=new Ve,g=new Ve,y=new z,m=new z;function d(N,E,S){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,N),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,S),h.sub(l),u.sub(l),p.sub(f),g.sub(f);let F=1/(p.x*g.y-g.x*p.y);isFinite(F)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(F),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(F),a[N].add(y),a[E].add(y),a[S].add(y),c[N].add(m),c[E].add(m),c[S].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let N=0,E=_.length;N<E;++N){let S=_[N],F=S.start,W=S.count;for(let G=F,Z=F+W;G<Z;G+=3)d(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let v=new z,x=new z,P=new z,R=new z;function L(N){P.fromBufferAttribute(s,N),R.copy(P);let E=a[N];v.copy(E),v.sub(P.multiplyScalar(P.dot(E))).normalize(),x.crossVectors(R,E);let F=x.dot(c[N])<0?-1:1;o.setXYZW(N,v.x,v.y,v.z,F)}for(let N=0,E=_.length;N<E;++N){let S=_[N],F=S.start,W=S.count;for(let G=F,Z=F+W;G<Z;G+=3)L(e.getX(G+0)),L(e.getX(G+1)),L(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new z,r=new z,o=new z,a=new z,c=new z,l=new z,h=new z,u=new z;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),p=0,g=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?p=c[y]*a.data.stride+a.offset:p=c[y]*h;for(let d=0;d<h;d++)f[g++]=l[p++]}return new xt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],p=e(f,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zh=new qe,Mi=new Ts,Hr=new an,Kh=new z,Vr=new z,Gr=new z,Wr=new z,Na=new z,Xr=new z,Jh=new z,Yr=new z,Ne=class extends lt{constructor(e=new vt,t=new _t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Xr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Na.fromBufferAttribute(u,e),o?Xr.addScaledVector(Na,h):Xr.addScaledVector(Na.sub(t),h))}t.add(Xr)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(r),Mi.copy(e.ray).recast(e.near),!(Hr.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(Hr,Kh)===null||Mi.origin.distanceToSquared(Kh)>(e.far-e.near)**2))&&(Zh.copy(r).invert(),Mi.copy(e.ray).applyMatrix4(Zh),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Mi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=_,P=v;x<P;x+=3){let R=a.getX(x),L=a.getX(x+1),N=a.getX(x+2);s=qr(this,d,e,n,l,h,u,R,L,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){let _=a.getX(m),v=a.getX(m+1),x=a.getX(m+2);s=qr(this,o,e,n,l,h,u,_,v,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],d=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=_,P=v;x<P;x+=3){let R=x,L=x+1,N=x+2;s=qr(this,d,e,n,l,h,u,R,L,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),y=Math.min(c.count,p.start+p.count);for(let m=g,d=y;m<d;m+=3){let _=m,v=m+1,x=m+2;s=qr(this,o,e,n,l,h,u,_,v,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Fp(i,e,t,n,s,r,o,a){let c;if(e.side===Ct?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Cn,a),c===null)return null;Yr.copy(a),Yr.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Yr);return l<t.near||l>t.far?null:{distance:l,point:Yr.clone(),object:i}}function qr(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Vr),i.getVertexPosition(c,Gr),i.getVertexPosition(l,Wr);let h=Fp(i,e,t,n,Vr,Gr,Wr,Jh);if(h){let u=new z;oi.getBarycoord(Jh,Vr,Gr,Wr,u),s&&(h.uv=oi.getInterpolatedAttribute(s,a,c,l,u,new Ve)),r&&(h.uv1=oi.getInterpolatedAttribute(r,a,c,l,u,new Ve)),o&&(h.normal=oi.getInterpolatedAttribute(o,a,c,l,u,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new z,materialIndex:0};oi.getNormal(Vr,Gr,Wr,f.normal),h.face=f,h.barycoord=u}return h}var Jt=class i extends vt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(u,2));function g(y,m,d,_,v,x,P,R,L,N,E){let S=x/L,F=P/N,W=x/2,G=P/2,Z=R/2,J=L+1,q=N+1,ue=0,K=0,me=new z;for(let _e=0;_e<q;_e++){let we=_e*F-G;for(let Be=0;Be<J;Be++){let et=Be*S-W;me[y]=et*_,me[m]=we*v,me[d]=Z,l.push(me.x,me.y,me.z),me[y]=0,me[m]=0,me[d]=R>0?1:-1,h.push(me.x,me.y,me.z),u.push(Be/L),u.push(1-_e/N),ue+=1}}for(let _e=0;_e<N;_e++)for(let we=0;we<L;we++){let Be=f+we+J*_e,et=f+we+J*(_e+1),Q=f+(we+1)+J*(_e+1),D=f+(we+1)+J*_e;c.push(Be,et,D),c.push(et,Q,D),K+=6}a.addGroup(p,K,E),p+=K,f+=ue}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function As(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Kt(i){let e={};for(let t=0;t<i.length;t++){let n=As(i[t]);for(let s in n)e[s]=n[s]}return e}function Op(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function af(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}var zp={clone:As,merge:Kt},Bp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Yt=class extends Xt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bp,this.fragmentShader=kp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=As(e.uniforms),this.uniformsGroups=Op(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},bo=class extends lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=Hn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ri=new z,$h=new Ve,jh=new Ve,It=class extends bo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ri.x,ri.y).multiplyScalar(-e/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ri.x,ri.y).multiplyScalar(-e/ri.z)}getViewSize(e,t){return this.getViewBounds(e,$h,jh),t.subVectors(jh,$h)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ar*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ns=-90,is=1,Uc=class extends lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new It(ns,is,e,t);s.layers=this.layers,this.add(s);let r=new It(ns,is,e,t);r.layers=this.layers,this.add(r);let o=new It(ns,is,e,t);o.layers=this.layers,this.add(o);let a=new It(ns,is,e,t);a.layers=this.layers,this.add(a);let c=new It(ns,is,e,t);c.layers=this.layers,this.add(c);let l=new It(ns,is,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===go)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},So=class extends Ot{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:ys,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Fc=class extends Xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new So(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Jt(5,5,5),r=new Yt({name:"CubemapFromEquirect",uniforms:As(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:ci});r.uniforms.tEquirect.value=t;let o=new Ne(s,r),a=t.minFilter;return t.minFilter===Rn&&(t.minFilter=Qt),new Uc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Ua=new z,Hp=new z,Vp=new Ke,Bn=class{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Ua.subVectors(n,t).cross(Hp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ua),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Vp.getNormalMatrix(e),s=this.coplanarPoint(Ua).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},bi=new an,Zr=new z,dr=class{constructor(e=new Bn,t=new Bn,n=new Bn,s=new Bn,r=new Bn,o=new Bn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Hn){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],y=s[10],m=s[11],d=s[12],_=s[13],v=s[14],x=s[15];if(n[0].setComponents(c-r,f-l,m-p,x-d).normalize(),n[1].setComponents(c+r,f+l,m+p,x+d).normalize(),n[2].setComponents(c+o,f+h,m+g,x+_).normalize(),n[3].setComponents(c-o,f-h,m-g,x-_).normalize(),n[4].setComponents(c-a,f-u,m-y,x-v).normalize(),t===Hn)n[5].setComponents(c+a,f+u,m+y,x+v).normalize();else if(t===go)n[5].setComponents(a,u,y,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(e){return bi.center.set(0,0,0),bi.radius=.7071067811865476,bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Zr.x=s.normal.x>0?e.max.x:e.min.x,Zr.y=s.normal.y>0?e.max.y:e.min.y,Zr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function cf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Gp(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){let g=u[f],y=u[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,u[f]=y)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){let y=u[p];i.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var hi=class i extends vt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,p=[],g=[],y=[],m=[];for(let d=0;d<h;d++){let _=d*f-o;for(let v=0;v<l;v++){let x=v*u-r;g.push(x,-_,0),y.push(0,0,1),m.push(v/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let _=0;_<a;_++){let v=_+l*d,x=_+l*(d+1),P=_+1+l*(d+1),R=_+1+l*d;p.push(v,x,R),p.push(x,P,R)}this.setIndex(p),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(y,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Wp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xp=`#ifdef USE_ALPHAHASH
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
#endif`,Yp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jp=`#ifdef USE_AOMAP
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
#endif`,$p=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jp=`#ifdef USE_BATCHING
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
#endif`,Qp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,im=`#ifdef USE_IRIDESCENCE
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
#endif`,sm=`#ifdef USE_BUMPMAP
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
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,um=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,dm=`#define PI 3.141592653589793
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
} // validated`,pm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,mm=`vec3 transformedNormal = objectNormal;
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
#endif`,gm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_m=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ym=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bm=`#ifdef USE_ENVMAP
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
#endif`,Sm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Em=`#ifdef USE_ENVMAP
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
#endif`,wm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tm=`#ifdef USE_ENVMAP
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
#endif`,Am=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Im=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pm=`#ifdef USE_GRADIENTMAP
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
}`,Lm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Um=`uniform bool receiveShadow;
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
#endif`,Fm=`#ifdef USE_ENVMAP
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
#endif`,Om=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,km=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hm=`PhysicalMaterial material;
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
#endif`,Vm=`struct PhysicalMaterial {
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
}`,Gm=`
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
#endif`,Wm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Xm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ym=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Km=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$m=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Qm=`#if defined( USE_POINTS_UV )
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
#endif`,eg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ng=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ig=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rg=`#ifdef USE_MORPHTARGETS
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
#endif`,og=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ag=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ug=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fg=`#ifdef USE_NORMALMAP
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
#endif`,dg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_g=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,yg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Eg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ag=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Rg=`float getShadowMask() {
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
}`,Cg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ig=`#ifdef USE_SKINNING
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
#endif`,Pg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lg=`#ifdef USE_SKINNING
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
#endif`,Dg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ng=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ug=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Og=`#ifdef USE_TRANSMISSION
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
#endif`,zg=`#ifdef USE_TRANSMISSION
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
#endif`,Bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Gg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wg=`uniform sampler2D t2D;
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
}`,Xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`#include <common>
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
}`,Jg=`#if DEPTH_PACKING == 3200
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
}`,$g=`#define DISTANCE
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
}`,jg=`#define DISTANCE
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
}`,Qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,e0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`uniform float scale;
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
}`,n0=`uniform vec3 diffuse;
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
}`,i0=`#include <common>
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
}`,s0=`uniform vec3 diffuse;
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
}`,r0=`#define LAMBERT
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
}`,o0=`#define LAMBERT
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
}`,a0=`#define MATCAP
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
}`,c0=`#define MATCAP
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
}`,l0=`#define NORMAL
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
}`,h0=`#define NORMAL
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
}`,u0=`#define PHONG
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
}`,f0=`#define PHONG
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
}`,d0=`#define STANDARD
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
}`,p0=`#define STANDARD
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
}`,m0=`#define TOON
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
}`,g0=`#define TOON
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
}`,x0=`uniform float size;
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
}`,_0=`uniform vec3 diffuse;
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
}`,y0=`#include <common>
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
}`,v0=`uniform vec3 color;
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
}`,M0=`uniform float rotation;
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
}`,b0=`uniform vec3 diffuse;
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
}`,Je={alphahash_fragment:Wp,alphahash_pars_fragment:Xp,alphamap_fragment:Yp,alphamap_pars_fragment:qp,alphatest_fragment:Zp,alphatest_pars_fragment:Kp,aomap_fragment:Jp,aomap_pars_fragment:$p,batching_pars_vertex:jp,batching_vertex:Qp,begin_vertex:em,beginnormal_vertex:tm,bsdfs:nm,iridescence_fragment:im,bumpmap_pars_fragment:sm,clipping_planes_fragment:rm,clipping_planes_pars_fragment:om,clipping_planes_pars_vertex:am,clipping_planes_vertex:cm,color_fragment:lm,color_pars_fragment:hm,color_pars_vertex:um,color_vertex:fm,common:dm,cube_uv_reflection_fragment:pm,defaultnormal_vertex:mm,displacementmap_pars_vertex:gm,displacementmap_vertex:xm,emissivemap_fragment:_m,emissivemap_pars_fragment:ym,colorspace_fragment:vm,colorspace_pars_fragment:Mm,envmap_fragment:bm,envmap_common_pars_fragment:Sm,envmap_pars_fragment:Em,envmap_pars_vertex:wm,envmap_physical_pars_fragment:Fm,envmap_vertex:Tm,fog_vertex:Am,fog_pars_vertex:Rm,fog_fragment:Cm,fog_pars_fragment:Im,gradientmap_pars_fragment:Pm,lightmap_pars_fragment:Lm,lights_lambert_fragment:Dm,lights_lambert_pars_fragment:Nm,lights_pars_begin:Um,lights_toon_fragment:Om,lights_toon_pars_fragment:zm,lights_phong_fragment:Bm,lights_phong_pars_fragment:km,lights_physical_fragment:Hm,lights_physical_pars_fragment:Vm,lights_fragment_begin:Gm,lights_fragment_maps:Wm,lights_fragment_end:Xm,logdepthbuf_fragment:Ym,logdepthbuf_pars_fragment:qm,logdepthbuf_pars_vertex:Zm,logdepthbuf_vertex:Km,map_fragment:Jm,map_pars_fragment:$m,map_particle_fragment:jm,map_particle_pars_fragment:Qm,metalnessmap_fragment:eg,metalnessmap_pars_fragment:tg,morphinstance_vertex:ng,morphcolor_vertex:ig,morphnormal_vertex:sg,morphtarget_pars_vertex:rg,morphtarget_vertex:og,normal_fragment_begin:ag,normal_fragment_maps:cg,normal_pars_fragment:lg,normal_pars_vertex:hg,normal_vertex:ug,normalmap_pars_fragment:fg,clearcoat_normal_fragment_begin:dg,clearcoat_normal_fragment_maps:pg,clearcoat_pars_fragment:mg,iridescence_pars_fragment:gg,opaque_fragment:xg,packing:_g,premultiplied_alpha_fragment:yg,project_vertex:vg,dithering_fragment:Mg,dithering_pars_fragment:bg,roughnessmap_fragment:Sg,roughnessmap_pars_fragment:Eg,shadowmap_pars_fragment:wg,shadowmap_pars_vertex:Tg,shadowmap_vertex:Ag,shadowmask_pars_fragment:Rg,skinbase_vertex:Cg,skinning_pars_vertex:Ig,skinning_vertex:Pg,skinnormal_vertex:Lg,specularmap_fragment:Dg,specularmap_pars_fragment:Ng,tonemapping_fragment:Ug,tonemapping_pars_fragment:Fg,transmission_fragment:Og,transmission_pars_fragment:zg,uv_pars_fragment:Bg,uv_pars_vertex:kg,uv_vertex:Hg,worldpos_vertex:Vg,background_vert:Gg,background_frag:Wg,backgroundCube_vert:Xg,backgroundCube_frag:Yg,cube_vert:qg,cube_frag:Zg,depth_vert:Kg,depth_frag:Jg,distanceRGBA_vert:$g,distanceRGBA_frag:jg,equirect_vert:Qg,equirect_frag:e0,linedashed_vert:t0,linedashed_frag:n0,meshbasic_vert:i0,meshbasic_frag:s0,meshlambert_vert:r0,meshlambert_frag:o0,meshmatcap_vert:a0,meshmatcap_frag:c0,meshnormal_vert:l0,meshnormal_frag:h0,meshphong_vert:u0,meshphong_frag:f0,meshphysical_vert:d0,meshphysical_frag:p0,meshtoon_vert:m0,meshtoon_frag:g0,points_vert:x0,points_frag:_0,shadow_vert:y0,shadow_frag:v0,sprite_vert:M0,sprite_frag:b0},Me={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Tn={basic:{uniforms:Kt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:Kt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Le(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:Kt([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:Kt([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:Kt([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new Le(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:Kt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:Kt([Me.points,Me.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:Kt([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:Kt([Me.common,Me.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:Kt([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:Kt([Me.sprite,Me.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:Kt([Me.common,Me.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:Kt([Me.lights,Me.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};Tn.physical={uniforms:Kt([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};var Kr={r:0,b:0,g:0},Si=new En,S0=new qe;function E0(i,e,t,n,s,r,o){let a=new Le(0),c=r===!0?0:1,l,h,u=null,f=0,p=null;function g(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?t:e).get(v)),v}function y(_){let v=!1,x=g(_);x===null?d(a,c):x&&x.isColor&&(d(x,1),v=!0);let P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,v){let x=g(v);x&&(x.isCubeTexture||x.mapping===Yo)?(h===void 0&&(h=new Ne(new Jt(1,1,1),new Yt({name:"BackgroundCubeMaterial",uniforms:As(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Si.copy(v.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(S0.makeRotationFromEuler(Si)),h.material.toneMapped=nt.getTransfer(x.colorSpace)!==gt,(u!==x||f!==x.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,p=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Ne(new hi(2,2),new Yt({name:"BackgroundMaterial",uniforms:As(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=nt.getTransfer(x.colorSpace)!==gt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,p=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function d(_,v){_.getRGB(Kr,af(i)),n.buffers.color.setClear(Kr.r,Kr.g,Kr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(_,v=1){a.set(_),c=v,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,d(a,c)},render:y,addToRenderList:m}}function w0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(S,F,W,G,Z){let J=!1,q=u(G,W,F);r!==q&&(r=q,l(r.object)),J=p(S,G,W,Z),J&&g(S,G,W,Z),Z!==null&&e.update(Z,i.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,x(S,F,W,G),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,F,W){let G=W.wireframe===!0,Z=n[S.id];Z===void 0&&(Z={},n[S.id]=Z);let J=Z[F.id];J===void 0&&(J={},Z[F.id]=J);let q=J[G];return q===void 0&&(q=f(c()),J[G]=q),q}function f(S){let F=[],W=[],G=[];for(let Z=0;Z<t;Z++)F[Z]=0,W[Z]=0,G[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:W,attributeDivisors:G,object:S,attributes:{},index:null}}function p(S,F,W,G){let Z=r.attributes,J=F.attributes,q=0,ue=W.getAttributes();for(let K in ue)if(ue[K].location>=0){let _e=Z[K],we=J[K];if(we===void 0&&(K==="instanceMatrix"&&S.instanceMatrix&&(we=S.instanceMatrix),K==="instanceColor"&&S.instanceColor&&(we=S.instanceColor)),_e===void 0||_e.attribute!==we||we&&_e.data!==we.data)return!0;q++}return r.attributesNum!==q||r.index!==G}function g(S,F,W,G){let Z={},J=F.attributes,q=0,ue=W.getAttributes();for(let K in ue)if(ue[K].location>=0){let _e=J[K];_e===void 0&&(K==="instanceMatrix"&&S.instanceMatrix&&(_e=S.instanceMatrix),K==="instanceColor"&&S.instanceColor&&(_e=S.instanceColor));let we={};we.attribute=_e,_e&&_e.data&&(we.data=_e.data),Z[K]=we,q++}r.attributes=Z,r.attributesNum=q,r.index=G}function y(){let S=r.newAttributes;for(let F=0,W=S.length;F<W;F++)S[F]=0}function m(S){d(S,0)}function d(S,F){let W=r.newAttributes,G=r.enabledAttributes,Z=r.attributeDivisors;W[S]=1,G[S]===0&&(i.enableVertexAttribArray(S),G[S]=1),Z[S]!==F&&(i.vertexAttribDivisor(S,F),Z[S]=F)}function _(){let S=r.newAttributes,F=r.enabledAttributes;for(let W=0,G=F.length;W<G;W++)F[W]!==S[W]&&(i.disableVertexAttribArray(W),F[W]=0)}function v(S,F,W,G,Z,J,q){q===!0?i.vertexAttribIPointer(S,F,W,Z,J):i.vertexAttribPointer(S,F,W,G,Z,J)}function x(S,F,W,G){y();let Z=G.attributes,J=W.getAttributes(),q=F.defaultAttributeValues;for(let ue in J){let K=J[ue];if(K.location>=0){let me=Z[ue];if(me===void 0&&(ue==="instanceMatrix"&&S.instanceMatrix&&(me=S.instanceMatrix),ue==="instanceColor"&&S.instanceColor&&(me=S.instanceColor)),me!==void 0){let _e=me.normalized,we=me.itemSize,Be=e.get(me);if(Be===void 0)continue;let et=Be.buffer,Q=Be.type,D=Be.bytesPerElement,O=Q===i.INT||Q===i.UNSIGNED_INT||me.gpuType===ul;if(me.isInterleavedBufferAttribute){let X=me.data,ce=X.stride,fe=me.offset;if(X.isInstancedInterleavedBuffer){for(let Pe=0;Pe<K.locationSize;Pe++)d(K.location+Pe,X.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Pe=0;Pe<K.locationSize;Pe++)m(K.location+Pe);i.bindBuffer(i.ARRAY_BUFFER,et);for(let Pe=0;Pe<K.locationSize;Pe++)v(K.location+Pe,we/K.locationSize,Q,_e,ce*D,(fe+we/K.locationSize*Pe)*D,O)}else{if(me.isInstancedBufferAttribute){for(let X=0;X<K.locationSize;X++)d(K.location+X,me.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let X=0;X<K.locationSize;X++)m(K.location+X);i.bindBuffer(i.ARRAY_BUFFER,et);for(let X=0;X<K.locationSize;X++)v(K.location+X,we/K.locationSize,Q,_e,we*D,we/K.locationSize*X*D,O)}}else if(q!==void 0){let _e=q[ue];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv(K.location,_e);break;case 3:i.vertexAttrib3fv(K.location,_e);break;case 4:i.vertexAttrib4fv(K.location,_e);break;default:i.vertexAttrib1fv(K.location,_e)}}}}_()}function P(){N();for(let S in n){let F=n[S];for(let W in F){let G=F[W];for(let Z in G)h(G[Z].object),delete G[Z];delete F[W]}delete n[S]}}function R(S){if(n[S.id]===void 0)return;let F=n[S.id];for(let W in F){let G=F[W];for(let Z in G)h(G[Z].object),delete G[Z];delete F[W]}delete n[S.id]}function L(S){for(let F in n){let W=n[F];if(W[S.id]===void 0)continue;let G=W[S.id];for(let Z in G)h(G[Z].object),delete G[Z];delete W[S.id]}}function N(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:E,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfProgram:L,initAttributes:y,enableAttribute:m,disableUnusedAttributes:_}}function T0(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function c(l,h,u,f){if(u===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y]*f[y];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function A0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(L){return!(L!==dn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){let N=L===yr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Gn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==bn&&!N)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:P,maxSamples:R}}function R0(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Bn,a=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){let g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let _=r?0:n,v=_*4,x=d.clippingState||null;c.value=x,x=h(g,f,v,p);for(let P=0;P!==v;++P)x[P]=t[P];d.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,p,g){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=c.value,g!==!0||m===null){let d=p+y*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,x=p;v!==y;++v,x+=4)o.copy(u[v]).applyMatrix4(_,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function C0(i){let e=new WeakMap;function t(o,a){return a===ic?o.mapping=ys:a===sc&&(o.mapping=vs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ic||a===sc)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Fc(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Rs=class extends bo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ds=4,Qh=[.125,.215,.35,.446,.526,.582],Ai=20,Fa=new Rs,eu=new Le,Oa=null,za=0,Ba=0,ka=!1,wi=(1+Math.sqrt(5))/2,ss=1/wi,tu=[new z(-wi,ss,0),new z(wi,ss,0),new z(-ss,0,wi),new z(ss,0,wi),new z(0,wi,-ss),new z(0,wi,ss),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],Eo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Oa=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),Ba=this._renderer.getActiveMipmapLevel(),ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=su(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=iu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Oa,za,Ba),this._renderer.xr.enabled=ka,e.scissorTest=!1,Jr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ys||e.mapping===vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oa=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),Ba=this._renderer.getActiveMipmapLevel(),ka=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:yr,format:dn,colorSpace:zt,depthBuffer:!1},s=nu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=I0(r)),this._blurMaterial=P0(r,e,t)}return s}_compileMaterial(e){let t=new Ne(this._lodPlanes[0],e);this._renderer.compile(t,Fa)}_sceneToCubeUV(e,t,n,s){let a=new It(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(eu),h.toneMapping=li,h.autoClear=!1;let p=new _t({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),g=new Ne(new Jt,p),y=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,y=!0):(p.color.copy(eu),y=!0);for(let d=0;d<6;d++){let _=d%3;_===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):_===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));let v=this._cubeSize;Jr(s,_*v,d>2?v:0,v,v),h.setRenderTarget(s),y&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ys||e.mapping===vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=su()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=iu());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ne(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Jr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Fa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=tu[(s-r-1)%tu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ne(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ai-1),y=r/g,m=isFinite(r)?1+Math.floor(h*y):Ai;m>Ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ai}`);let d=[],_=0;for(let L=0;L<Ai;++L){let N=L/y,E=Math.exp(-N*N/2);d.push(E),L===0?_+=E:L<m&&(_+=2*E)}for(let L=0;L<d.length;L++)d[L]=d[L]/_;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;let x=this._sizeLods[s],P=3*x*(s>v-ds?s-v+ds:0),R=4*(this._cubeSize-x);Jr(t,P,R,3*x,2*x),c.setRenderTarget(t),c.render(u,Fa)}};function I0(i){let e=[],t=[],n=[],s=i,r=i-ds+1+Qh.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-ds?c=Qh[o-i+ds-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,y=3,m=2,d=1,_=new Float32Array(y*g*p),v=new Float32Array(m*g*p),x=new Float32Array(d*g*p);for(let R=0;R<p;R++){let L=R%3*2/3-1,N=R>2?0:-1,E=[L,N,0,L+2/3,N,0,L+2/3,N+1,0,L,N,0,L+2/3,N+1,0,L,N+1,0];_.set(E,y*g*R),v.set(f,m*g*R);let S=[R,R,R,R,R,R];x.set(S,d*g*R)}let P=new vt;P.setAttribute("position",new xt(_,y)),P.setAttribute("uv",new xt(v,m)),P.setAttribute("faceIndex",new xt(x,d)),e.push(P),s>ds&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function nu(i,e,t){let n=new Xn(i,e,t);return n.texture.mapping=Yo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Jr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function P0(i,e,t){let n=new Float32Array(Ai),s=new z(0,1,0);return new Yt({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:vl(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function iu(){return new Yt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vl(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function su(){return new Yt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function vl(){return`

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
	`}function L0(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===ic||c===sc,h=c===ys||c===vs;if(l||h){let u=e.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Eo(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Eo(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function D0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&sr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function N0(i,e,t,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let y=f.morphAttributes[g];for(let m=0,d=y.length;m<d;m++)e.remove(y[m])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)e.update(f[g],i.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let y=p[g];for(let m=0,d=y.length;m<d;m++)e.update(y[m],i.ARRAY_BUFFER)}}function l(u){let f=[],p=u.index,g=u.attributes.position,y=0;if(p!==null){let _=p.array;y=p.version;for(let v=0,x=_.length;v<x;v+=3){let P=_[v+0],R=_[v+1],L=_[v+2];f.push(P,R,R,L,L,P)}}else if(g!==void 0){let _=g.array;y=g.version;for(let v=0,x=_.length/3-1;v<x;v+=3){let P=v+0,R=v+1,L=v+2;f.push(P,R,R,L,L,P)}}else return;let m=new(rf(f)?Mo:vo)(f,1);m.version=y;let d=r.get(u);d&&e.remove(d),r.set(u,m)}function h(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function U0(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function l(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*o,g),t.update(p,n,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,n,1)}function u(f,p,g,y){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/o,p[d],y[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,y,0,g);let d=0;for(let _=0;_<g;_++)d+=p[_]*y[_];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function F0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function O0(i,e,t){let n=new WeakMap,s=new ht;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let E=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],v=0;p===!0&&(v=1),g===!0&&(v=2),y===!0&&(v=3);let x=a.attributes.position.count*v,P=1;x>e.maxTextureSize&&(P=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let R=new Float32Array(x*P*4*u),L=new _o(R,x,P,u);L.type=bn,L.needsUpdate=!0;let N=v*4;for(let S=0;S<u;S++){let F=m[S],W=d[S],G=_[S],Z=x*P*4*S;for(let J=0;J<F.count;J++){let q=J*N;p===!0&&(s.fromBufferAttribute(F,J),R[Z+q+0]=s.x,R[Z+q+1]=s.y,R[Z+q+2]=s.z,R[Z+q+3]=0),g===!0&&(s.fromBufferAttribute(W,J),R[Z+q+4]=s.x,R[Z+q+5]=s.y,R[Z+q+6]=s.z,R[Z+q+7]=0),y===!0&&(s.fromBufferAttribute(G,J),R[Z+q+8]=s.x,R[Z+q+9]=s.y,R[Z+q+10]=s.z,R[Z+q+11]=G.itemSize===4?s.w:1)}}f={count:u,texture:L,size:new Ve(x,P)},n.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let y=0;y<l.length;y++)p+=l[y];let g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function z0(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var wo=class extends Ot{constructor(e,t,n,s,r,o,a,c,l,h=ms){if(h!==ms&&h!==bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ms&&(n=Ci),n===void 0&&h===bs&&(n=Ms),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Lt,this.minFilter=c!==void 0?c:Lt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},lf=new Ot,ru=new wo(1,1),hf=new _o,uf=new Nc,ff=new So,ou=[],au=[],cu=new Float32Array(16),lu=new Float32Array(9),hu=new Float32Array(4);function Bs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=ou[s];if(r===void 0&&(r=new Float32Array(s),ou[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Jo(i,e){let t=au[e];t===void 0&&(t=new Int32Array(e),au[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function B0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function k0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function H0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function V0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function G0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;hu.set(n),i.uniformMatrix2fv(this.addr,!1,hu),Nt(t,n)}}function W0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;lu.set(n),i.uniformMatrix3fv(this.addr,!1,lu),Nt(t,n)}}function X0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Dt(t,n))return;cu.set(n),i.uniformMatrix4fv(this.addr,!1,cu),Nt(t,n)}}function Y0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function q0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function Z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function K0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function J0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function $0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function j0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function Q0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function ex(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ru.compareFunction=tf,r=ru):r=lf,t.setTexture2D(e||r,s)}function tx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||uf,s)}function nx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||ff,s)}function ix(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||hf,s)}function sx(i){switch(i){case 5126:return B0;case 35664:return k0;case 35665:return H0;case 35666:return V0;case 35674:return G0;case 35675:return W0;case 35676:return X0;case 5124:case 35670:return Y0;case 35667:case 35671:return q0;case 35668:case 35672:return Z0;case 35669:case 35673:return K0;case 5125:return J0;case 36294:return $0;case 36295:return j0;case 36296:return Q0;case 35678:case 36198:case 36298:case 36306:case 35682:return ex;case 35679:case 36299:case 36307:return tx;case 35680:case 36300:case 36308:case 36293:return nx;case 36289:case 36303:case 36311:case 36292:return ix}}function rx(i,e){i.uniform1fv(this.addr,e)}function ox(i,e){let t=Bs(e,this.size,2);i.uniform2fv(this.addr,t)}function ax(i,e){let t=Bs(e,this.size,3);i.uniform3fv(this.addr,t)}function cx(i,e){let t=Bs(e,this.size,4);i.uniform4fv(this.addr,t)}function lx(i,e){let t=Bs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function hx(i,e){let t=Bs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ux(i,e){let t=Bs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function fx(i,e){i.uniform1iv(this.addr,e)}function dx(i,e){i.uniform2iv(this.addr,e)}function px(i,e){i.uniform3iv(this.addr,e)}function mx(i,e){i.uniform4iv(this.addr,e)}function gx(i,e){i.uniform1uiv(this.addr,e)}function xx(i,e){i.uniform2uiv(this.addr,e)}function _x(i,e){i.uniform3uiv(this.addr,e)}function yx(i,e){i.uniform4uiv(this.addr,e)}function vx(i,e,t){let n=this.cache,s=e.length,r=Jo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||lf,r[o])}function Mx(i,e,t){let n=this.cache,s=e.length,r=Jo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||uf,r[o])}function bx(i,e,t){let n=this.cache,s=e.length,r=Jo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||ff,r[o])}function Sx(i,e,t){let n=this.cache,s=e.length,r=Jo(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||hf,r[o])}function Ex(i){switch(i){case 5126:return rx;case 35664:return ox;case 35665:return ax;case 35666:return cx;case 35674:return lx;case 35675:return hx;case 35676:return ux;case 5124:case 35670:return fx;case 35667:case 35671:return dx;case 35668:case 35672:return px;case 35669:case 35673:return mx;case 5125:return gx;case 36294:return xx;case 36295:return _x;case 36296:return yx;case 35678:case 36198:case 36298:case 36306:case 35682:return vx;case 35679:case 36299:case 36307:return Mx;case 35680:case 36300:case 36308:case 36293:return bx;case 36289:case 36303:case 36311:case 36292:return Sx}}var Oc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=sx(t.type)}},zc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ex(t.type)}},Bc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Ha=/(\w+)(\])?(\[|\.)?/g;function uu(i,e){i.seq.push(e),i.map[e.id]=e}function wx(i,e,t){let n=i.name,s=n.length;for(Ha.lastIndex=0;;){let r=Ha.exec(n),o=Ha.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){uu(t,l===void 0?new Oc(a,i,e):new zc(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Bc(a),uu(t,u)),t=u}}}var xs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);wx(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function fu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Tx=37297,Ax=0;function Rx(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var du=new Ke;function Cx(i){nt._getMatrix(du,nt.workingColorSpace,i);let e=`mat3( ${du.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(i)){case Ko:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function pu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Rx(i.getShaderSource(e),o)}else return s}function Ix(i,e){let t=Cx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Px(i,e){let t;switch(e){case zd:t="Linear";break;case Bd:t="Reinhard";break;case kd:t="Cineon";break;case ll:t="ACESFilmic";break;case Vd:t="AgX";break;case Gd:t="Neutral";break;case Hd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var $r=new z;function Lx(){nt.getLuminanceCoefficients($r);let i=$r.x.toFixed(4),e=$r.y.toFixed(4),t=$r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rr).join(`
`)}function Nx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ux(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function rr(i){return i!==""}function mu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Fx=/^[ \t]*#include +<([\w\d./]+)>/gm;function kc(i){return i.replace(Fx,zx)}var Ox=new Map;function zx(i,e){let t=Je[e];if(t===void 0){let n=Ox.get(e);if(n!==void 0)t=Je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return kc(t)}var Bx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xu(i){return i.replace(Bx,kx)}function kx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _u(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Hx(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Gu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===xd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===zn&&(e="SHADOWMAP_TYPE_VSM"),e}function Vx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ys:case vs:e="ENVMAP_TYPE_CUBE";break;case Yo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Gx(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vs:e="ENVMAP_MODE_REFRACTION";break}return e}function Wx(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case cl:e="ENVMAP_BLENDING_MULTIPLY";break;case Fd:e="ENVMAP_BLENDING_MIX";break;case Od:e="ENVMAP_BLENDING_ADD";break}return e}function Xx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Yx(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Hx(t),l=Vx(t),h=Gx(t),u=Wx(t),f=Xx(t),p=Dx(t),g=Nx(r),y=s.createProgram(),m,d,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(rr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(rr).join(`
`),d.length>0&&(d+=`
`)):(m=[_u(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rr).join(`
`),d=[_u(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==li?"#define TONE_MAPPING":"",t.toneMapping!==li?Je.tonemapping_pars_fragment:"",t.toneMapping!==li?Px("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,Ix("linearToOutputTexel",t.outputColorSpace),Lx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(rr).join(`
`)),o=kc(o),o=mu(o,t),o=gu(o,t),a=kc(a),a=mu(a,t),a=gu(a,t),o=xu(o),a=xu(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let v=_+m+o,x=_+d+a,P=fu(s,s.VERTEX_SHADER,v),R=fu(s,s.FRAGMENT_SHADER,x);s.attachShader(y,P),s.attachShader(y,R),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function L(F){if(i.debug.checkShaderErrors){let W=s.getProgramInfoLog(y).trim(),G=s.getShaderInfoLog(P).trim(),Z=s.getShaderInfoLog(R).trim(),J=!0,q=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,P,R);else{let ue=pu(s,P,"vertex"),K=pu(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+W+`
`+ue+`
`+K)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(G===""||Z==="")&&(q=!1);q&&(F.diagnostics={runnable:J,programLog:W,vertexShader:{log:G,prefix:m},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(P),s.deleteShader(R),N=new xs(s,y),E=Ux(s,y)}let N;this.getUniforms=function(){return N===void 0&&L(this),N};let E;this.getAttributes=function(){return E===void 0&&L(this),E};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(y,Tx)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ax++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=P,this.fragmentShader=R,this}var qx=0,Hc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Vc(e),t.set(e,n)),n}},Vc=class{constructor(e){this.id=qx++,this.code=e,this.usedTimes=0}};function Zx(i,e,t,n,s,r,o){let a=new yo,c=new Hc,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,S,F,W,G){let Z=W.fog,J=G.geometry,q=E.isMeshStandardMaterial?W.environment:null,ue=(E.isMeshStandardMaterial?t:e).get(E.envMap||q),K=ue&&ue.mapping===Yo?ue.image.height:null,me=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let _e=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,we=_e!==void 0?_e.length:0,Be=0;J.morphAttributes.position!==void 0&&(Be=1),J.morphAttributes.normal!==void 0&&(Be=2),J.morphAttributes.color!==void 0&&(Be=3);let et,Q,D,O;if(me){let at=Tn[me];et=at.vertexShader,Q=at.fragmentShader}else et=E.vertexShader,Q=E.fragmentShader,c.update(E),D=c.getVertexShaderID(E),O=c.getFragmentShaderID(E);let X=i.getRenderTarget(),ce=i.state.buffers.depth.getReversed(),fe=G.isInstancedMesh===!0,Pe=G.isBatchedMesh===!0,Ge=!!E.map,Ce=!!E.matcap,tt=!!ue,B=!!E.aoMap,ae=!!E.lightMap,de=!!E.bumpMap,Te=!!E.normalMap,le=!!E.displacementMap,Xe=!!E.emissiveMap,De=!!E.metalnessMap,C=!!E.roughnessMap,b=E.anisotropy>0,V=E.clearcoat>0,ie=E.dispersion>0,re=E.iridescence>0,te=E.sheen>0,Ue=E.transmission>0,ye=b&&!!E.anisotropyMap,Se=V&&!!E.clearcoatMap,Ze=V&&!!E.clearcoatNormalMap,he=V&&!!E.clearcoatRoughnessMap,Ae=re&&!!E.iridescenceMap,ke=re&&!!E.iridescenceThicknessMap,He=te&&!!E.sheenColorMap,Ie=te&&!!E.sheenRoughnessMap,je=!!E.specularMap,Ye=!!E.specularColorMap,rt=!!E.specularIntensityMap,H=Ue&&!!E.transmissionMap,ge=Ue&&!!E.thicknessMap,$=!!E.gradientMap,se=!!E.alphaMap,ve=E.alphaTest>0,be=!!E.alphaHash,We=!!E.extensions,Et=li;E.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Et=i.toneMapping);let Tt={shaderID:me,shaderType:E.type,shaderName:E.name,vertexShader:et,fragmentShader:Q,defines:E.defines,customVertexShaderID:D,customFragmentShaderID:O,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Pe,batchingColor:Pe&&G._colorsTexture!==null,instancing:fe,instancingColor:fe&&G.instanceColor!==null,instancingMorph:fe&&G.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:X===null?i.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:zt,alphaToCoverage:!!E.alphaToCoverage,map:Ge,matcap:Ce,envMap:tt,envMapMode:tt&&ue.mapping,envMapCubeUVHeight:K,aoMap:B,lightMap:ae,bumpMap:de,normalMap:Te,displacementMap:f&&le,emissiveMap:Xe,normalMapObjectSpace:Te&&E.normalMapType===$d,normalMapTangentSpace:Te&&E.normalMapType===Zo,metalnessMap:De,roughnessMap:C,anisotropy:b,anisotropyMap:ye,clearcoat:V,clearcoatMap:Se,clearcoatNormalMap:Ze,clearcoatRoughnessMap:he,dispersion:ie,iridescence:re,iridescenceMap:Ae,iridescenceThicknessMap:ke,sheen:te,sheenColorMap:He,sheenRoughnessMap:Ie,specularMap:je,specularColorMap:Ye,specularIntensityMap:rt,transmission:Ue,transmissionMap:H,thicknessMap:ge,gradientMap:$,opaque:E.transparent===!1&&E.blending===ps&&E.alphaToCoverage===!1,alphaMap:se,alphaTest:ve,alphaHash:be,combine:E.combine,mapUv:Ge&&y(E.map.channel),aoMapUv:B&&y(E.aoMap.channel),lightMapUv:ae&&y(E.lightMap.channel),bumpMapUv:de&&y(E.bumpMap.channel),normalMapUv:Te&&y(E.normalMap.channel),displacementMapUv:le&&y(E.displacementMap.channel),emissiveMapUv:Xe&&y(E.emissiveMap.channel),metalnessMapUv:De&&y(E.metalnessMap.channel),roughnessMapUv:C&&y(E.roughnessMap.channel),anisotropyMapUv:ye&&y(E.anisotropyMap.channel),clearcoatMapUv:Se&&y(E.clearcoatMap.channel),clearcoatNormalMapUv:Ze&&y(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&y(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&y(E.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&y(E.iridescenceThicknessMap.channel),sheenColorMapUv:He&&y(E.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&y(E.sheenRoughnessMap.channel),specularMapUv:je&&y(E.specularMap.channel),specularColorMapUv:Ye&&y(E.specularColorMap.channel),specularIntensityMapUv:rt&&y(E.specularIntensityMap.channel),transmissionMapUv:H&&y(E.transmissionMap.channel),thicknessMapUv:ge&&y(E.thicknessMap.channel),alphaMapUv:se&&y(E.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Te||b),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!J.attributes.uv&&(Ge||se),fog:!!Z,useFog:E.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ce,skinning:G.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Be,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:Et,decodeVideoTexture:Ge&&E.map.isVideoTexture===!0&&nt.getTransfer(E.map.colorSpace)===gt,decodeVideoTextureEmissive:Xe&&E.emissiveMap.isVideoTexture===!0&&nt.getTransfer(E.emissiveMap.colorSpace)===gt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===bt,flipSided:E.side===Ct,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:We&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&E.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function d(E){let S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(let F in E.defines)S.push(F),S.push(E.defines[F]);return E.isRawShaderMaterial===!1&&(_(S,E),v(S,E),S.push(i.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function _(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function v(E,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),E.push(a.mask)}function x(E){let S=g[E.type],F;if(S){let W=Tn[S];F=zp.clone(W.uniforms)}else F=E.uniforms;return F}function P(E,S){let F;for(let W=0,G=h.length;W<G;W++){let Z=h[W];if(Z.cacheKey===S){F=Z,++F.usedTimes;break}}return F===void 0&&(F=new Yx(i,S,E,r),h.push(F)),F}function R(E){if(--E.usedTimes===0){let S=h.indexOf(E);h[S]=h[h.length-1],h.pop(),E.destroy()}}function L(E){c.remove(E)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:P,releaseProgram:R,releaseShaderCache:L,programs:h,dispose:N}}function Kx(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Jx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function yu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function vu(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,p,g,y,m){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=y,d.group=m),e++,d}function a(u,f,p,g,y,m){let d=o(u,f,p,g,y,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):t.push(d)}function c(u,f,p,g,y,m){let d=o(u,f,p,g,y,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||Jx),n.length>1&&n.sort(f||yu),s.length>1&&s.sort(f||yu)}function h(){for(let u=e,f=i.length;u<f;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function $x(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new vu,i.set(n,[o])):s>=r.length?(o=new vu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function jx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Le};break;case"SpotLight":t={position:new z,direction:new z,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function Qx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var e_=0;function t_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function n_(i){let e=new jx,t=Qx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);let s=new z,r=new qe,o=new qe;function a(l){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,g=0,y=0,m=0,d=0,_=0,v=0,x=0,P=0,R=0,L=0;l.sort(t_);for(let E=0,S=l.length;E<S;E++){let F=l[E],W=F.color,G=F.intensity,Z=F.distance,J=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)h+=W.r*G,u+=W.g*G,f+=W.b*G;else if(F.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(F.sh.coefficients[q],G);L++}else if(F.isDirectionalLight){let q=e.get(F);if(q.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let ue=F.shadow,K=t.get(F);K.shadowIntensity=ue.intensity,K.shadowBias=ue.bias,K.shadowNormalBias=ue.normalBias,K.shadowRadius=ue.radius,K.shadowMapSize=ue.mapSize,n.directionalShadow[p]=K,n.directionalShadowMap[p]=J,n.directionalShadowMatrix[p]=F.shadow.matrix,_++}n.directional[p]=q,p++}else if(F.isSpotLight){let q=e.get(F);q.position.setFromMatrixPosition(F.matrixWorld),q.color.copy(W).multiplyScalar(G),q.distance=Z,q.coneCos=Math.cos(F.angle),q.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),q.decay=F.decay,n.spot[y]=q;let ue=F.shadow;if(F.map&&(n.spotLightMap[P]=F.map,P++,ue.updateMatrices(F),F.castShadow&&R++),n.spotLightMatrix[y]=ue.matrix,F.castShadow){let K=t.get(F);K.shadowIntensity=ue.intensity,K.shadowBias=ue.bias,K.shadowNormalBias=ue.normalBias,K.shadowRadius=ue.radius,K.shadowMapSize=ue.mapSize,n.spotShadow[y]=K,n.spotShadowMap[y]=J,x++}y++}else if(F.isRectAreaLight){let q=e.get(F);q.color.copy(W).multiplyScalar(G),q.halfWidth.set(F.width*.5,0,0),q.halfHeight.set(0,F.height*.5,0),n.rectArea[m]=q,m++}else if(F.isPointLight){let q=e.get(F);if(q.color.copy(F.color).multiplyScalar(F.intensity),q.distance=F.distance,q.decay=F.decay,F.castShadow){let ue=F.shadow,K=t.get(F);K.shadowIntensity=ue.intensity,K.shadowBias=ue.bias,K.shadowNormalBias=ue.normalBias,K.shadowRadius=ue.radius,K.shadowMapSize=ue.mapSize,K.shadowCameraNear=ue.camera.near,K.shadowCameraFar=ue.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=F.shadow.matrix,v++}n.point[g]=q,g++}else if(F.isHemisphereLight){let q=e.get(F);q.skyColor.copy(F.color).multiplyScalar(G),q.groundColor.copy(F.groundColor).multiplyScalar(G),n.hemi[d]=q,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let N=n.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==y||N.rectAreaLength!==m||N.hemiLength!==d||N.numDirectionalShadows!==_||N.numPointShadows!==v||N.numSpotShadows!==x||N.numSpotMaps!==P||N.numLightProbes!==L)&&(n.directional.length=p,n.spot.length=y,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+P-R,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=L,N.directionalLength=p,N.pointLength=g,N.spotLength=y,N.rectAreaLength=m,N.hemiLength=d,N.numDirectionalShadows=_,N.numPointShadows=v,N.numSpotShadows=x,N.numSpotMaps=P,N.numLightProbes=L,n.version=e_++)}function c(l,h){let u=0,f=0,p=0,g=0,y=0,m=h.matrixWorldInverse;for(let d=0,_=l.length;d<_;d++){let v=l[d];if(v.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(v.isSpotLight){let x=n.spot[p];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let x=n.point[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let x=n.hemi[y];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),y++}}}return{setup:a,setupView:c,state:n}}function Mu(i){let e=new n_(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function i_(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Mu(i),e.set(s,[a])):r>=o.length?(a=new Mu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Gc=class extends Xt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Kd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Wc=class extends Xt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},s_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r_=`uniform sampler2D shadow_pass;
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
}`;function o_(i,e,t){let n=new dr,s=new Ve,r=new Ve,o=new ht,a=new Gc({depthPacking:Jd}),c=new Wc,l={},h=t.maxTextureSize,u={[Cn]:Ct,[Ct]:Cn,[bt]:bt},f=new Yt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:s_,fragmentShader:r_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new vt;g.setAttribute("position",new xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Ne(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gu;let d=this.type;this.render=function(R,L,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let E=i.getRenderTarget(),S=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),W=i.state;W.setBlending(ci),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let G=d!==zn&&this.type===zn,Z=d===zn&&this.type!==zn;for(let J=0,q=R.length;J<q;J++){let ue=R[J],K=ue.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);let me=K.getFrameExtents();if(s.multiply(me),r.copy(K.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/me.x),s.x=r.x*me.x,K.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/me.y),s.y=r.y*me.y,K.mapSize.y=r.y)),K.map===null||G===!0||Z===!0){let we=this.type!==zn?{minFilter:Lt,magFilter:Lt}:{};K.map!==null&&K.map.dispose(),K.map=new Xn(s.x,s.y,we),K.map.texture.name=ue.name+".shadowMap",K.camera.updateProjectionMatrix()}i.setRenderTarget(K.map),i.clear();let _e=K.getViewportCount();for(let we=0;we<_e;we++){let Be=K.getViewport(we);o.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),W.viewport(o),K.updateMatrices(ue,we),n=K.getFrustum(),x(L,N,K.camera,ue,this.type)}K.isPointLightShadow!==!0&&this.type===zn&&_(K,N),K.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(E,S,F)};function _(R,L){let N=e.update(y);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Xn(s.x,s.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(L,null,N,f,y,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(L,null,N,p,y,null)}function v(R,L,N,E){let S=null,F=N.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(F!==void 0)S=F;else if(S=N.isPointLight===!0?c:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){let W=S.uuid,G=L.uuid,Z=l[W];Z===void 0&&(Z={},l[W]=Z);let J=Z[G];J===void 0&&(J=S.clone(),Z[G]=J,L.addEventListener("dispose",P)),S=J}if(S.visible=L.visible,S.wireframe=L.wireframe,E===zn?S.side=L.shadowSide!==null?L.shadowSide:L.side:S.side=L.shadowSide!==null?L.shadowSide:u[L.side],S.alphaMap=L.alphaMap,S.alphaTest=L.alphaTest,S.map=L.map,S.clipShadows=L.clipShadows,S.clippingPlanes=L.clippingPlanes,S.clipIntersection=L.clipIntersection,S.displacementMap=L.displacementMap,S.displacementScale=L.displacementScale,S.displacementBias=L.displacementBias,S.wireframeLinewidth=L.wireframeLinewidth,S.linewidth=L.linewidth,N.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let W=i.properties.get(S);W.light=N}return S}function x(R,L,N,E,S){if(R.visible===!1)return;if(R.layers.test(L.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===zn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,R.matrixWorld);let G=e.update(R),Z=R.material;if(Array.isArray(Z)){let J=G.groups;for(let q=0,ue=J.length;q<ue;q++){let K=J[q],me=Z[K.materialIndex];if(me&&me.visible){let _e=v(R,me,E,S);R.onBeforeShadow(i,R,L,N,G,_e,K),i.renderBufferDirect(N,null,G,_e,R,K),R.onAfterShadow(i,R,L,N,G,_e,K)}}}else if(Z.visible){let J=v(R,Z,E,S);R.onBeforeShadow(i,R,L,N,G,J,null),i.renderBufferDirect(N,null,G,J,R,null),R.onAfterShadow(i,R,L,N,G,J,null)}}let W=R.children;for(let G=0,Z=W.length;G<Z;G++)x(W[G],L,N,E,S)}function P(R){R.target.removeEventListener("dispose",P);for(let N in l){let E=l[N],S=R.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}var a_={[Ja]:$a,[ja]:tc,[Qa]:nc,[_s]:ec,[$a]:Ja,[tc]:ja,[nc]:Qa,[ec]:_s};function c_(i,e){function t(){let H=!1,ge=new ht,$=null,se=new ht(0,0,0,0);return{setMask:function(ve){$!==ve&&!H&&(i.colorMask(ve,ve,ve,ve),$=ve)},setLocked:function(ve){H=ve},setClear:function(ve,be,We,Et,Tt){Tt===!0&&(ve*=Et,be*=Et,We*=Et),ge.set(ve,be,We,Et),se.equals(ge)===!1&&(i.clearColor(ve,be,We,Et),se.copy(ge))},reset:function(){H=!1,$=null,se.set(-1,0,0,0)}}}function n(){let H=!1,ge=!1,$=null,se=null,ve=null;return{setReversed:function(be){if(ge!==be){let We=e.get("EXT_clip_control");ge?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);let Et=ve;ve=null,this.setClear(Et)}ge=be},getReversed:function(){return ge},setTest:function(be){be?X(i.DEPTH_TEST):ce(i.DEPTH_TEST)},setMask:function(be){$!==be&&!H&&(i.depthMask(be),$=be)},setFunc:function(be){if(ge&&(be=a_[be]),se!==be){switch(be){case Ja:i.depthFunc(i.NEVER);break;case $a:i.depthFunc(i.ALWAYS);break;case ja:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case Qa:i.depthFunc(i.EQUAL);break;case ec:i.depthFunc(i.GEQUAL);break;case tc:i.depthFunc(i.GREATER);break;case nc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}se=be}},setLocked:function(be){H=be},setClear:function(be){ve!==be&&(ge&&(be=1-be),i.clearDepth(be),ve=be)},reset:function(){H=!1,$=null,se=null,ve=null,ge=!1}}}function s(){let H=!1,ge=null,$=null,se=null,ve=null,be=null,We=null,Et=null,Tt=null;return{setTest:function(at){H||(at?X(i.STENCIL_TEST):ce(i.STENCIL_TEST))},setMask:function(at){ge!==at&&!H&&(i.stencilMask(at),ge=at)},setFunc:function(at,st,nn){($!==at||se!==st||ve!==nn)&&(i.stencilFunc(at,st,nn),$=at,se=st,ve=nn)},setOp:function(at,st,nn){(be!==at||We!==st||Et!==nn)&&(i.stencilOp(at,st,nn),be=at,We=st,Et=nn)},setLocked:function(at){H=at},setClear:function(at){Tt!==at&&(i.clearStencil(at),Tt=at)},reset:function(){H=!1,ge=null,$=null,se=null,ve=null,be=null,We=null,Et=null,Tt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,_=null,v=null,x=null,P=null,R=null,L=new Le(0,0,0),N=0,E=!1,S=null,F=null,W=null,G=null,Z=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,ue=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(ue=parseFloat(/^WebGL (\d)/.exec(K)[1]),q=ue>=1):K.indexOf("OpenGL ES")!==-1&&(ue=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),q=ue>=2);let me=null,_e={},we=i.getParameter(i.SCISSOR_BOX),Be=i.getParameter(i.VIEWPORT),et=new ht().fromArray(we),Q=new ht().fromArray(Be);function D(H,ge,$,se){let ve=new Uint8Array(4),be=i.createTexture();i.bindTexture(H,be),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let We=0;We<$;We++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,se,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(ge+We,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return be}let O={};O[i.TEXTURE_2D]=D(i.TEXTURE_2D,i.TEXTURE_2D,1),O[i.TEXTURE_CUBE_MAP]=D(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[i.TEXTURE_2D_ARRAY]=D(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),O[i.TEXTURE_3D]=D(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),X(i.DEPTH_TEST),o.setFunc(_s),de(!1),Te(Th),X(i.CULL_FACE),B(ci);function X(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function ce(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function fe(H,ge){return u[H]!==ge?(i.bindFramebuffer(H,ge),u[H]=ge,H===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ge),H===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Pe(H,ge){let $=p,se=!1;if(H){$=f.get(ge),$===void 0&&($=[],f.set(ge,$));let ve=H.textures;if($.length!==ve.length||$[0]!==i.COLOR_ATTACHMENT0){for(let be=0,We=ve.length;be<We;be++)$[be]=i.COLOR_ATTACHMENT0+be;$.length=ve.length,se=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,se=!0);se&&i.drawBuffers($)}function Ge(H){return g!==H?(i.useProgram(H),g=H,!0):!1}let Ce={[Ti]:i.FUNC_ADD,[yd]:i.FUNC_SUBTRACT,[vd]:i.FUNC_REVERSE_SUBTRACT};Ce[Md]=i.MIN,Ce[bd]=i.MAX;let tt={[Sd]:i.ZERO,[Ed]:i.ONE,[wd]:i.SRC_COLOR,[Za]:i.SRC_ALPHA,[Pd]:i.SRC_ALPHA_SATURATE,[Cd]:i.DST_COLOR,[Ad]:i.DST_ALPHA,[Td]:i.ONE_MINUS_SRC_COLOR,[Ka]:i.ONE_MINUS_SRC_ALPHA,[Id]:i.ONE_MINUS_DST_COLOR,[Rd]:i.ONE_MINUS_DST_ALPHA,[Ld]:i.CONSTANT_COLOR,[Dd]:i.ONE_MINUS_CONSTANT_COLOR,[Nd]:i.CONSTANT_ALPHA,[Ud]:i.ONE_MINUS_CONSTANT_ALPHA};function B(H,ge,$,se,ve,be,We,Et,Tt,at){if(H===ci){y===!0&&(ce(i.BLEND),y=!1);return}if(y===!1&&(X(i.BLEND),y=!0),H!==_d){if(H!==m||at!==E){if((d!==Ti||x!==Ti)&&(i.blendEquation(i.FUNC_ADD),d=Ti,x=Ti),at)switch(H){case ps:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case po:i.blendFunc(i.ONE,i.ONE);break;case Ah:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case po:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ah:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}_=null,v=null,P=null,R=null,L.set(0,0,0),N=0,m=H,E=at}return}ve=ve||ge,be=be||$,We=We||se,(ge!==d||ve!==x)&&(i.blendEquationSeparate(Ce[ge],Ce[ve]),d=ge,x=ve),($!==_||se!==v||be!==P||We!==R)&&(i.blendFuncSeparate(tt[$],tt[se],tt[be],tt[We]),_=$,v=se,P=be,R=We),(Et.equals(L)===!1||Tt!==N)&&(i.blendColor(Et.r,Et.g,Et.b,Tt),L.copy(Et),N=Tt),m=H,E=!1}function ae(H,ge){H.side===bt?ce(i.CULL_FACE):X(i.CULL_FACE);let $=H.side===Ct;ge&&($=!$),de($),H.blending===ps&&H.transparent===!1?B(ci):B(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);let se=H.stencilWrite;a.setTest(se),se&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Xe(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?X(i.SAMPLE_ALPHA_TO_COVERAGE):ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function de(H){S!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),S=H)}function Te(H){H!==md?(X(i.CULL_FACE),H!==F&&(H===Th?i.cullFace(i.BACK):H===gd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ce(i.CULL_FACE),F=H}function le(H){H!==W&&(q&&i.lineWidth(H),W=H)}function Xe(H,ge,$){H?(X(i.POLYGON_OFFSET_FILL),(G!==ge||Z!==$)&&(i.polygonOffset(ge,$),G=ge,Z=$)):ce(i.POLYGON_OFFSET_FILL)}function De(H){H?X(i.SCISSOR_TEST):ce(i.SCISSOR_TEST)}function C(H){H===void 0&&(H=i.TEXTURE0+J-1),me!==H&&(i.activeTexture(H),me=H)}function b(H,ge,$){$===void 0&&(me===null?$=i.TEXTURE0+J-1:$=me);let se=_e[$];se===void 0&&(se={type:void 0,texture:void 0},_e[$]=se),(se.type!==H||se.texture!==ge)&&(me!==$&&(i.activeTexture($),me=$),i.bindTexture(H,ge||O[H]),se.type=H,se.texture=ge)}function V(){let H=_e[me];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ie(){try{i.compressedTexImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function re(){try{i.compressedTexImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function te(){try{i.texSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ue(){try{i.texSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ye(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Se(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ze(){try{i.texStorage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function he(){try{i.texStorage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ae(){try{i.texImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ke(){try{i.texImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function He(H){et.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),et.copy(H))}function Ie(H){Q.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Q.copy(H))}function je(H,ge){let $=l.get(ge);$===void 0&&($=new WeakMap,l.set(ge,$));let se=$.get(H);se===void 0&&(se=i.getUniformBlockIndex(ge,H.name),$.set(H,se))}function Ye(H,ge){let se=l.get(ge).get(H);c.get(ge)!==se&&(i.uniformBlockBinding(ge,se,H.__bindingPointIndex),c.set(ge,se))}function rt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},me=null,_e={},u={},f=new WeakMap,p=[],g=null,y=!1,m=null,d=null,_=null,v=null,x=null,P=null,R=null,L=new Le(0,0,0),N=0,E=!1,S=null,F=null,W=null,G=null,Z=null,et.set(0,0,i.canvas.width,i.canvas.height),Q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:X,disable:ce,bindFramebuffer:fe,drawBuffers:Pe,useProgram:Ge,setBlending:B,setMaterial:ae,setFlipSided:de,setCullFace:Te,setLineWidth:le,setPolygonOffset:Xe,setScissorTest:De,activeTexture:C,bindTexture:b,unbindTexture:V,compressedTexImage2D:ie,compressedTexImage3D:re,texImage2D:Ae,texImage3D:ke,updateUBOMapping:je,uniformBlockBinding:Ye,texStorage2D:Ze,texStorage3D:he,texSubImage2D:te,texSubImage3D:Ue,compressedTexSubImage2D:ye,compressedTexSubImage3D:Se,scissor:He,viewport:Ie,reset:rt}}function bu(i,e,t,n){let s=l_(n);switch(t){case Zu:return i*e;case Ju:return i*e;case $u:return i*e*2;case pl:return i*e/s.components*s.byteLength;case ml:return i*e/s.components*s.byteLength;case ju:return i*e*2/s.components*s.byteLength;case gl:return i*e*2/s.components*s.byteLength;case Ku:return i*e*3/s.components*s.byteLength;case dn:return i*e*4/s.components*s.byteLength;case xl:return i*e*4/s.components*s.byteLength;case co:case lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ho:case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case oc:case cc:return Math.max(i,16)*Math.max(e,8)/4;case rc:case ac:return Math.max(i,8)*Math.max(e,8)/2;case lc:case hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case dc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case pc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case mc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case gc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case xc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case _c:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case yc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case vc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case bc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ec:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case fo:case Tc:case Ac:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Qu:case Rc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Cc:case Ic:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function l_(i){switch(i){case Gn:case Xu:return{byteLength:1,components:1};case ur:case Yu:case yr:return{byteLength:2,components:1};case fl:case dl:return{byteLength:2,components:4};case Ci:case ul:case bn:return{byteLength:4,components:1};case qu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function h_(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ve,h=new WeakMap,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,b){return p?new OffscreenCanvas(C,b):fr("canvas")}function y(C,b,V){let ie=1,re=De(C);if((re.width>V||re.height>V)&&(ie=V/Math.max(re.width,re.height)),ie<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let te=Math.floor(ie*re.width),Ue=Math.floor(ie*re.height);u===void 0&&(u=g(te,Ue));let ye=b?g(te,Ue):u;return ye.width=te,ye.height=Ue,ye.getContext("2d").drawImage(C,0,0,te,Ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+te+"x"+Ue+")."),ye}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),C;return C}function m(C){return C.generateMipmaps}function d(C){i.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(C,b,V,ie,re=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let te=b;if(b===i.RED&&(V===i.FLOAT&&(te=i.R32F),V===i.HALF_FLOAT&&(te=i.R16F),V===i.UNSIGNED_BYTE&&(te=i.R8)),b===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(te=i.R8UI),V===i.UNSIGNED_SHORT&&(te=i.R16UI),V===i.UNSIGNED_INT&&(te=i.R32UI),V===i.BYTE&&(te=i.R8I),V===i.SHORT&&(te=i.R16I),V===i.INT&&(te=i.R32I)),b===i.RG&&(V===i.FLOAT&&(te=i.RG32F),V===i.HALF_FLOAT&&(te=i.RG16F),V===i.UNSIGNED_BYTE&&(te=i.RG8)),b===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(te=i.RG8UI),V===i.UNSIGNED_SHORT&&(te=i.RG16UI),V===i.UNSIGNED_INT&&(te=i.RG32UI),V===i.BYTE&&(te=i.RG8I),V===i.SHORT&&(te=i.RG16I),V===i.INT&&(te=i.RG32I)),b===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(te=i.RGB8UI),V===i.UNSIGNED_SHORT&&(te=i.RGB16UI),V===i.UNSIGNED_INT&&(te=i.RGB32UI),V===i.BYTE&&(te=i.RGB8I),V===i.SHORT&&(te=i.RGB16I),V===i.INT&&(te=i.RGB32I)),b===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),V===i.UNSIGNED_INT&&(te=i.RGBA32UI),V===i.BYTE&&(te=i.RGBA8I),V===i.SHORT&&(te=i.RGBA16I),V===i.INT&&(te=i.RGBA32I)),b===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),b===i.RGBA){let Ue=re?Ko:nt.getTransfer(ie);V===i.FLOAT&&(te=i.RGBA32F),V===i.HALF_FLOAT&&(te=i.RGBA16F),V===i.UNSIGNED_BYTE&&(te=Ue===gt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function x(C,b){let V;return C?b===null||b===Ci||b===Ms?V=i.DEPTH24_STENCIL8:b===bn?V=i.DEPTH32F_STENCIL8:b===ur&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ci||b===Ms?V=i.DEPTH_COMPONENT24:b===bn?V=i.DEPTH_COMPONENT32F:b===ur&&(V=i.DEPTH_COMPONENT16),V}function P(C,b){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Lt&&C.minFilter!==Qt?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function R(C){let b=C.target;b.removeEventListener("dispose",R),N(b),b.isVideoTexture&&h.delete(b)}function L(C){let b=C.target;b.removeEventListener("dispose",L),S(b)}function N(C){let b=n.get(C);if(b.__webglInit===void 0)return;let V=C.source,ie=f.get(V);if(ie){let re=ie[b.__cacheKey];re.usedTimes--,re.usedTimes===0&&E(C),Object.keys(ie).length===0&&f.delete(V)}n.remove(C)}function E(C){let b=n.get(C);i.deleteTexture(b.__webglTexture);let V=C.source,ie=f.get(V);delete ie[b.__cacheKey],o.memory.textures--}function S(C){let b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(b.__webglFramebuffer[ie]))for(let re=0;re<b.__webglFramebuffer[ie].length;re++)i.deleteFramebuffer(b.__webglFramebuffer[ie][re]);else i.deleteFramebuffer(b.__webglFramebuffer[ie]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[ie])}else{if(Array.isArray(b.__webglFramebuffer))for(let ie=0;ie<b.__webglFramebuffer.length;ie++)i.deleteFramebuffer(b.__webglFramebuffer[ie]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ie=0;ie<b.__webglColorRenderbuffer.length;ie++)b.__webglColorRenderbuffer[ie]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[ie]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let V=C.textures;for(let ie=0,re=V.length;ie<re;ie++){let te=n.get(V[ie]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),o.memory.textures--),n.remove(V[ie])}n.remove(C)}let F=0;function W(){F=0}function G(){let C=F;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),F+=1,C}function Z(C){let b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function J(C,b){let V=n.get(C);if(C.isVideoTexture&&le(C),C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){let ie=C.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(V,C,b);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+b)}function q(C,b){let V=n.get(C);if(C.version>0&&V.__version!==C.version){Q(V,C,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+b)}function ue(C,b){let V=n.get(C);if(C.version>0&&V.__version!==C.version){Q(V,C,b);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+b)}function K(C,b){let V=n.get(C);if(C.version>0&&V.__version!==C.version){D(V,C,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+b)}let me={[Ri]:i.REPEAT,[kn]:i.CLAMP_TO_EDGE,[hr]:i.MIRRORED_REPEAT},_e={[Lt]:i.NEAREST,[hl]:i.NEAREST_MIPMAP_NEAREST,[hs]:i.NEAREST_MIPMAP_LINEAR,[Qt]:i.LINEAR,[or]:i.LINEAR_MIPMAP_NEAREST,[Rn]:i.LINEAR_MIPMAP_LINEAR},we={[jd]:i.NEVER,[sp]:i.ALWAYS,[Qd]:i.LESS,[tf]:i.LEQUAL,[ep]:i.EQUAL,[ip]:i.GEQUAL,[tp]:i.GREATER,[np]:i.NOTEQUAL};function Be(C,b){if(b.type===bn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Qt||b.magFilter===or||b.magFilter===hs||b.magFilter===Rn||b.minFilter===Qt||b.minFilter===or||b.minFilter===hs||b.minFilter===Rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,me[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,me[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,me[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,_e[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,_e[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,we[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Lt||b.minFilter!==hs&&b.minFilter!==Rn||b.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function et(C,b){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",R));let ie=b.source,re=f.get(ie);re===void 0&&(re={},f.set(ie,re));let te=Z(b);if(te!==C.__cacheKey){re[te]===void 0&&(re[te]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),re[te].usedTimes++;let Ue=re[C.__cacheKey];Ue!==void 0&&(re[C.__cacheKey].usedTimes--,Ue.usedTimes===0&&E(b)),C.__cacheKey=te,C.__webglTexture=re[te].texture}return V}function Q(C,b,V){let ie=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ie=i.TEXTURE_3D);let re=et(C,b),te=b.source;t.bindTexture(ie,C.__webglTexture,i.TEXTURE0+V);let Ue=n.get(te);if(te.version!==Ue.__version||re===!0){t.activeTexture(i.TEXTURE0+V);let ye=nt.getPrimaries(nt.workingColorSpace),Se=b.colorSpace===An?null:nt.getPrimaries(b.colorSpace),Ze=b.colorSpace===An||ye===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let he=y(b.image,!1,s.maxTextureSize);he=Xe(b,he);let Ae=r.convert(b.format,b.colorSpace),ke=r.convert(b.type),He=v(b.internalFormat,Ae,ke,b.colorSpace,b.isVideoTexture);Be(ie,b);let Ie,je=b.mipmaps,Ye=b.isVideoTexture!==!0,rt=Ue.__version===void 0||re===!0,H=te.dataReady,ge=P(b,he);if(b.isDepthTexture)He=x(b.format===bs,b.type),rt&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,He,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,He,he.width,he.height,0,Ae,ke,null));else if(b.isDataTexture)if(je.length>0){Ye&&rt&&t.texStorage2D(i.TEXTURE_2D,ge,He,je[0].width,je[0].height);for(let $=0,se=je.length;$<se;$++)Ie=je[$],Ye?H&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,Ie.width,Ie.height,Ae,ke,Ie.data):t.texImage2D(i.TEXTURE_2D,$,He,Ie.width,Ie.height,0,Ae,ke,Ie.data);b.generateMipmaps=!1}else Ye?(rt&&t.texStorage2D(i.TEXTURE_2D,ge,He,he.width,he.height),H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he.width,he.height,Ae,ke,he.data)):t.texImage2D(i.TEXTURE_2D,0,He,he.width,he.height,0,Ae,ke,he.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ye&&rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,He,je[0].width,je[0].height,he.depth);for(let $=0,se=je.length;$<se;$++)if(Ie=je[$],b.format!==dn)if(Ae!==null)if(Ye){if(H)if(b.layerUpdates.size>0){let ve=bu(Ie.width,Ie.height,b.format,b.type);for(let be of b.layerUpdates){let We=Ie.data.subarray(be*ve/Ie.data.BYTES_PER_ELEMENT,(be+1)*ve/Ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,be,Ie.width,Ie.height,1,Ae,We)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Ie.width,Ie.height,he.depth,Ae,Ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,He,Ie.width,Ie.height,he.depth,0,Ie.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,Ie.width,Ie.height,he.depth,Ae,ke,Ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,He,Ie.width,Ie.height,he.depth,0,Ae,ke,Ie.data)}else{Ye&&rt&&t.texStorage2D(i.TEXTURE_2D,ge,He,je[0].width,je[0].height);for(let $=0,se=je.length;$<se;$++)Ie=je[$],b.format!==dn?Ae!==null?Ye?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,Ie.width,Ie.height,Ae,Ie.data):t.compressedTexImage2D(i.TEXTURE_2D,$,He,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?H&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,Ie.width,Ie.height,Ae,ke,Ie.data):t.texImage2D(i.TEXTURE_2D,$,He,Ie.width,Ie.height,0,Ae,ke,Ie.data)}else if(b.isDataArrayTexture)if(Ye){if(rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,He,he.width,he.height,he.depth),H)if(b.layerUpdates.size>0){let $=bu(he.width,he.height,b.format,b.type);for(let se of b.layerUpdates){let ve=he.data.subarray(se*$/he.data.BYTES_PER_ELEMENT,(se+1)*$/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,se,he.width,he.height,1,Ae,ke,ve)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Ae,ke,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,He,he.width,he.height,he.depth,0,Ae,ke,he.data);else if(b.isData3DTexture)Ye?(rt&&t.texStorage3D(i.TEXTURE_3D,ge,He,he.width,he.height,he.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Ae,ke,he.data)):t.texImage3D(i.TEXTURE_3D,0,He,he.width,he.height,he.depth,0,Ae,ke,he.data);else if(b.isFramebufferTexture){if(rt)if(Ye)t.texStorage2D(i.TEXTURE_2D,ge,He,he.width,he.height);else{let $=he.width,se=he.height;for(let ve=0;ve<ge;ve++)t.texImage2D(i.TEXTURE_2D,ve,He,$,se,0,Ae,ke,null),$>>=1,se>>=1}}else if(je.length>0){if(Ye&&rt){let $=De(je[0]);t.texStorage2D(i.TEXTURE_2D,ge,He,$.width,$.height)}for(let $=0,se=je.length;$<se;$++)Ie=je[$],Ye?H&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,Ae,ke,Ie):t.texImage2D(i.TEXTURE_2D,$,He,Ae,ke,Ie);b.generateMipmaps=!1}else if(Ye){if(rt){let $=De(he);t.texStorage2D(i.TEXTURE_2D,ge,He,$.width,$.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ae,ke,he)}else t.texImage2D(i.TEXTURE_2D,0,He,Ae,ke,he);m(b)&&d(ie),Ue.__version=te.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function D(C,b,V){if(b.image.length!==6)return;let ie=et(C,b),re=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+V);let te=n.get(re);if(re.version!==te.__version||ie===!0){t.activeTexture(i.TEXTURE0+V);let Ue=nt.getPrimaries(nt.workingColorSpace),ye=b.colorSpace===An?null:nt.getPrimaries(b.colorSpace),Se=b.colorSpace===An||Ue===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let Ze=b.isCompressedTexture||b.image[0].isCompressedTexture,he=b.image[0]&&b.image[0].isDataTexture,Ae=[];for(let se=0;se<6;se++)!Ze&&!he?Ae[se]=y(b.image[se],!0,s.maxCubemapSize):Ae[se]=he?b.image[se].image:b.image[se],Ae[se]=Xe(b,Ae[se]);let ke=Ae[0],He=r.convert(b.format,b.colorSpace),Ie=r.convert(b.type),je=v(b.internalFormat,He,Ie,b.colorSpace),Ye=b.isVideoTexture!==!0,rt=te.__version===void 0||ie===!0,H=re.dataReady,ge=P(b,ke);Be(i.TEXTURE_CUBE_MAP,b);let $;if(Ze){Ye&&rt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,je,ke.width,ke.height);for(let se=0;se<6;se++){$=Ae[se].mipmaps;for(let ve=0;ve<$.length;ve++){let be=$[ve];b.format!==dn?He!==null?Ye?H&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ve,0,0,be.width,be.height,He,be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ve,je,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ve,0,0,be.width,be.height,He,Ie,be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ve,je,be.width,be.height,0,He,Ie,be.data)}}}else{if($=b.mipmaps,Ye&&rt){$.length>0&&ge++;let se=De(Ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,je,se.width,se.height)}for(let se=0;se<6;se++)if(he){Ye?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ae[se].width,Ae[se].height,He,Ie,Ae[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,je,Ae[se].width,Ae[se].height,0,He,Ie,Ae[se].data);for(let ve=0;ve<$.length;ve++){let We=$[ve].image[se].image;Ye?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ve+1,0,0,We.width,We.height,He,Ie,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ve+1,je,We.width,We.height,0,He,Ie,We.data)}}else{Ye?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,He,Ie,Ae[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,je,He,Ie,Ae[se]);for(let ve=0;ve<$.length;ve++){let be=$[ve];Ye?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ve+1,0,0,He,Ie,be.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ve+1,je,He,Ie,be.image[se])}}}m(b)&&d(i.TEXTURE_CUBE_MAP),te.__version=re.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function O(C,b,V,ie,re,te){let Ue=r.convert(V.format,V.colorSpace),ye=r.convert(V.type),Se=v(V.internalFormat,Ue,ye,V.colorSpace),Ze=n.get(b),he=n.get(V);if(he.__renderTarget=b,!Ze.__hasExternalTextures){let Ae=Math.max(1,b.width>>te),ke=Math.max(1,b.height>>te);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,te,Se,Ae,ke,b.depth,0,Ue,ye,null):t.texImage2D(re,te,Se,Ae,ke,0,Ue,ye,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Te(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,re,he.__webglTexture,0,de(b)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,re,he.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function X(C,b,V){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){let ie=b.depthTexture,re=ie&&ie.isDepthTexture?ie.type:null,te=x(b.stencilBuffer,re),Ue=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=de(b);Te(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye,te,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,te,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,te,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ue,i.RENDERBUFFER,C)}else{let ie=b.textures;for(let re=0;re<ie.length;re++){let te=ie[re],Ue=r.convert(te.format,te.colorSpace),ye=r.convert(te.type),Se=v(te.internalFormat,Ue,ye,te.colorSpace),Ze=de(b);V&&Te(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ze,Se,b.width,b.height):Te(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ze,Se,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Se,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ie=n.get(b.depthTexture);ie.__renderTarget=b,(!ie.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),J(b.depthTexture,0);let re=ie.__webglTexture,te=de(b);if(b.depthTexture.format===ms)Te(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0);else if(b.depthTexture.format===bs)Te(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function fe(C){let b=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){let ie=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ie){let re=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ie.removeEventListener("dispose",re)};ie.addEventListener("dispose",re),b.__depthDisposeCallback=re}b.__boundDepthTexture=ie}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");ce(b.__webglFramebuffer,C)}else if(V){b.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ie]),b.__webglDepthbuffer[ie]===void 0)b.__webglDepthbuffer[ie]=i.createRenderbuffer(),X(b.__webglDepthbuffer[ie],C,!1);else{let re=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=b.__webglDepthbuffer[ie];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,te)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),X(b.__webglDepthbuffer,C,!1);else{let ie=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,re)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(C,b,V){let ie=n.get(C);b!==void 0&&O(ie.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&fe(C)}function Ge(C){let b=C.texture,V=n.get(C),ie=n.get(b);C.addEventListener("dispose",L);let re=C.textures,te=C.isWebGLCubeRenderTarget===!0,Ue=re.length>1;if(Ue||(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=b.version,o.memory.textures++),te){V.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[ye]=[];for(let Se=0;Se<b.mipmaps.length;Se++)V.__webglFramebuffer[ye][Se]=i.createFramebuffer()}else V.__webglFramebuffer[ye]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let ye=0;ye<b.mipmaps.length;ye++)V.__webglFramebuffer[ye]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Ue)for(let ye=0,Se=re.length;ye<Se;ye++){let Ze=n.get(re[ye]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&Te(C)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ye=0;ye<re.length;ye++){let Se=re[ye];V.__webglColorRenderbuffer[ye]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ye]);let Ze=r.convert(Se.format,Se.colorSpace),he=r.convert(Se.type),Ae=v(Se.internalFormat,Ze,he,Se.colorSpace,C.isXRRenderTarget===!0),ke=de(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,Ae,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,V.__webglColorRenderbuffer[ye])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),X(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),Be(i.TEXTURE_CUBE_MAP,b);for(let ye=0;ye<6;ye++)if(b.mipmaps&&b.mipmaps.length>0)for(let Se=0;Se<b.mipmaps.length;Se++)O(V.__webglFramebuffer[ye][Se],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Se);else O(V.__webglFramebuffer[ye],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);m(b)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ue){for(let ye=0,Se=re.length;ye<Se;ye++){let Ze=re[ye],he=n.get(Ze);t.bindTexture(i.TEXTURE_2D,he.__webglTexture),Be(i.TEXTURE_2D,Ze),O(V.__webglFramebuffer,C,Ze,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,0),m(Ze)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let ye=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ye=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ye,ie.__webglTexture),Be(ye,b),b.mipmaps&&b.mipmaps.length>0)for(let Se=0;Se<b.mipmaps.length;Se++)O(V.__webglFramebuffer[Se],C,b,i.COLOR_ATTACHMENT0,ye,Se);else O(V.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,ye,0);m(b)&&d(ye),t.unbindTexture()}C.depthBuffer&&fe(C)}function Ce(C){let b=C.textures;for(let V=0,ie=b.length;V<ie;V++){let re=b[V];if(m(re)){let te=_(C),Ue=n.get(re).__webglTexture;t.bindTexture(te,Ue),d(te),t.unbindTexture()}}}let tt=[],B=[];function ae(C){if(C.samples>0){if(Te(C)===!1){let b=C.textures,V=C.width,ie=C.height,re=i.COLOR_BUFFER_BIT,te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ue=n.get(C),ye=b.length>1;if(ye)for(let Se=0;Se<b.length;Se++)t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let Se=0;Se<b.length;Se++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),ye){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ue.__webglColorRenderbuffer[Se]);let Ze=n.get(b[Se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ze,0)}i.blitFramebuffer(0,0,V,ie,0,0,V,ie,re,i.NEAREST),c===!0&&(tt.length=0,B.length=0,tt.push(i.COLOR_ATTACHMENT0+Se),C.depthBuffer&&C.resolveDepthBuffer===!1&&(tt.push(te),B.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,tt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ye)for(let Se=0;Se<b.length;Se++){t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,Ue.__webglColorRenderbuffer[Se]);let Ze=n.get(b[Se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,Ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function de(C){return Math.min(s.maxSamples,C.samples)}function Te(C){let b=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function le(C){let b=o.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function Xe(C,b){let V=C.colorSpace,ie=C.format,re=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==zt&&V!==An&&(nt.getTransfer(V)===gt?(ie!==dn||re!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),b}function De(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=W,this.setTexture2D=J,this.setTexture2DArray=q,this.setTexture3D=ue,this.setTextureCube=K,this.rebindTextures=Pe,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=O,this.useMultisampledRTT=Te}function u_(i,e){function t(n,s=An){let r,o=nt.getTransfer(s);if(n===Gn)return i.UNSIGNED_BYTE;if(n===fl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===dl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Xu)return i.BYTE;if(n===Yu)return i.SHORT;if(n===ur)return i.UNSIGNED_SHORT;if(n===ul)return i.INT;if(n===Ci)return i.UNSIGNED_INT;if(n===bn)return i.FLOAT;if(n===yr)return i.HALF_FLOAT;if(n===Zu)return i.ALPHA;if(n===Ku)return i.RGB;if(n===dn)return i.RGBA;if(n===Ju)return i.LUMINANCE;if(n===$u)return i.LUMINANCE_ALPHA;if(n===ms)return i.DEPTH_COMPONENT;if(n===bs)return i.DEPTH_STENCIL;if(n===pl)return i.RED;if(n===ml)return i.RED_INTEGER;if(n===ju)return i.RG;if(n===gl)return i.RG_INTEGER;if(n===xl)return i.RGBA_INTEGER;if(n===co||n===lo||n===ho||n===uo)if(o===gt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===co)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===co)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ho)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===uo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===rc||n===oc||n===ac||n===cc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===rc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===oc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ac)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===cc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lc||n===hc||n===uc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===lc||n===hc)return o===gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===uc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fc||n===dc||n===pc||n===mc||n===gc||n===xc||n===_c||n===yc||n===vc||n===Mc||n===bc||n===Sc||n===Ec||n===wc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===fc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===dc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===mc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===gc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_c)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Mc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ec)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wc)return o===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fo||n===Tc||n===Ac)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===fo)return o===gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Tc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ac)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Qu||n===Rc||n===Cc||n===Ic)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===fo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Rc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Cc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ic)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Xc=class extends It{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Pt=class extends lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},f_={type:"move"},lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),d=this._getHandJoint(l,y);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(f_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Pt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},d_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,p_=`
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

}`,Yc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new Ot,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Yt({vertexShader:d_,fragmentShader:p_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ne(new hi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qc=class extends Wn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,g=null,y=new Yc,m=t.getContextAttributes(),d=null,_=null,v=[],x=[],P=new Ve,R=null,L=new It;L.viewport=new ht;let N=new It;N.viewport=new ht;let E=[L,N],S=new Xc,F=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let D=v[Q];return D===void 0&&(D=new lr,v[Q]=D),D.getTargetRaySpace()},this.getControllerGrip=function(Q){let D=v[Q];return D===void 0&&(D=new lr,v[Q]=D),D.getGripSpace()},this.getHand=function(Q){let D=v[Q];return D===void 0&&(D=new lr,v[Q]=D),D.getHandSpace()};function G(Q){let D=x.indexOf(Q.inputSource);if(D===-1)return;let O=v[D];O!==void 0&&(O.update(Q.inputSource,Q.frame,l||o),O.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Z(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",J);for(let Q=0;Q<v.length;Q++){let D=x[Q];D!==null&&(x[Q]=null,v[Q].disconnect(D))}F=null,W=null,y.reset(),e.setRenderTarget(d),p=null,f=null,u=null,s=null,_=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(P),s.renderState.layers===void 0){let D={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,D),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Xn(p.framebufferWidth,p.framebufferHeight,{format:dn,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let D=null,O=null,X=null;m.depth&&(X=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,D=m.stencil?bs:ms,O=m.stencil?Ms:Ci);let ce={colorFormat:t.RGBA8,depthFormat:X,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(ce),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new Xn(f.textureWidth,f.textureHeight,{format:dn,type:Gn,depthTexture:new wo(f.textureWidth,f.textureHeight,O,void 0,void 0,void 0,void 0,void 0,void 0,D),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),et.setContext(s),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function J(Q){for(let D=0;D<Q.removed.length;D++){let O=Q.removed[D],X=x.indexOf(O);X>=0&&(x[X]=null,v[X].disconnect(O))}for(let D=0;D<Q.added.length;D++){let O=Q.added[D],X=x.indexOf(O);if(X===-1){for(let fe=0;fe<v.length;fe++)if(fe>=x.length){x.push(O),X=fe;break}else if(x[fe]===null){x[fe]=O,X=fe;break}if(X===-1)break}let ce=v[X];ce&&ce.connect(O)}}let q=new z,ue=new z;function K(Q,D,O){q.setFromMatrixPosition(D.matrixWorld),ue.setFromMatrixPosition(O.matrixWorld);let X=q.distanceTo(ue),ce=D.projectionMatrix.elements,fe=O.projectionMatrix.elements,Pe=ce[14]/(ce[10]-1),Ge=ce[14]/(ce[10]+1),Ce=(ce[9]+1)/ce[5],tt=(ce[9]-1)/ce[5],B=(ce[8]-1)/ce[0],ae=(fe[8]+1)/fe[0],de=Pe*B,Te=Pe*ae,le=X/(-B+ae),Xe=le*-B;if(D.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Xe),Q.translateZ(le),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),ce[10]===-1)Q.projectionMatrix.copy(D.projectionMatrix),Q.projectionMatrixInverse.copy(D.projectionMatrixInverse);else{let De=Pe+le,C=Ge+le,b=de-Xe,V=Te+(X-Xe),ie=Ce*Ge/C*De,re=tt*Ge/C*De;Q.projectionMatrix.makePerspective(b,V,ie,re,De,C),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function me(Q,D){D===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(D.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let D=Q.near,O=Q.far;y.texture!==null&&(y.depthNear>0&&(D=y.depthNear),y.depthFar>0&&(O=y.depthFar)),S.near=N.near=L.near=D,S.far=N.far=L.far=O,(F!==S.near||W!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),F=S.near,W=S.far),L.layers.mask=Q.layers.mask|2,N.layers.mask=Q.layers.mask|4,S.layers.mask=L.layers.mask|N.layers.mask;let X=Q.parent,ce=S.cameras;me(S,X);for(let fe=0;fe<ce.length;fe++)me(ce[fe],X);ce.length===2?K(S,L,N):S.projectionMatrix.copy(L.projectionMatrix),_e(Q,S,X)};function _e(Q,D,O){O===null?Q.matrix.copy(D.matrixWorld):(Q.matrix.copy(O.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(D.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(D.projectionMatrix),Q.projectionMatrixInverse.copy(D.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ws*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(Q){c=Q,f!==null&&(f.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(S)};let we=null;function Be(Q,D){if(h=D.getViewerPose(l||o),g=D,h!==null){let O=h.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let X=!1;O.length!==S.cameras.length&&(S.cameras.length=0,X=!0);for(let fe=0;fe<O.length;fe++){let Pe=O[fe],Ge=null;if(p!==null)Ge=p.getViewport(Pe);else{let tt=u.getViewSubImage(f,Pe);Ge=tt.viewport,fe===0&&(e.setRenderTargetTextures(_,tt.colorTexture,f.ignoreDepthValues?void 0:tt.depthStencilTexture),e.setRenderTarget(_))}let Ce=E[fe];Ce===void 0&&(Ce=new It,Ce.layers.enable(fe),Ce.viewport=new ht,E[fe]=Ce),Ce.matrix.fromArray(Pe.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(Pe.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),fe===0&&(S.matrix.copy(Ce.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),X===!0&&S.cameras.push(Ce)}let ce=s.enabledFeatures;if(ce&&ce.includes("depth-sensing")){let fe=u.getDepthInformation(O[0]);fe&&fe.isValid&&fe.texture&&y.init(e,fe,s.renderState)}}for(let O=0;O<v.length;O++){let X=x[O],ce=v[O];X!==null&&ce!==void 0&&ce.update(X,D,l||o)}we&&we(Q,D),D.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:D}),g=null}let et=new cf;et.setAnimationLoop(Be),this.setAnimationLoop=function(Q){we=Q},this.dispose=function(){}}},Ei=new En,m_=new qe;function g_(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,af(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,_,v,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),y(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,_,v):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ct&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ct&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let _=e.get(d),v=_.envMap,x=_.envMapRotation;v&&(m.envMap.value=v,Ei.copy(x),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),m.envMapRotation.value.setFromMatrix4(m_.makeRotationFromEuler(Ei)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,_,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*_,m.scale.value=v*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,_){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ct&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function y(m,d){let _=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function x_(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,v){let x=v.program;n.uniformBlockBinding(_,x)}function l(_,v){let x=s[_.id];x===void 0&&(g(_),x=h(_),s[_.id]=x,_.addEventListener("dispose",m));let P=v.program;n.updateUBOMapping(_,P);let R=e.render.frame;r[_.id]!==R&&(f(_),r[_.id]=R)}function h(_){let v=u();_.__bindingPointIndex=v;let x=i.createBuffer(),P=_.__size,R=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,P,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let v=s[_.id],x=_.uniforms,P=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let R=0,L=x.length;R<L;R++){let N=Array.isArray(x[R])?x[R]:[x[R]];for(let E=0,S=N.length;E<S;E++){let F=N[E];if(p(F,R,E,P)===!0){let W=F.__offset,G=Array.isArray(F.value)?F.value:[F.value],Z=0;for(let J=0;J<G.length;J++){let q=G[J],ue=y(q);typeof q=="number"||typeof q=="boolean"?(F.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,W+Z,F.__data)):q.isMatrix3?(F.__data[0]=q.elements[0],F.__data[1]=q.elements[1],F.__data[2]=q.elements[2],F.__data[3]=0,F.__data[4]=q.elements[3],F.__data[5]=q.elements[4],F.__data[6]=q.elements[5],F.__data[7]=0,F.__data[8]=q.elements[6],F.__data[9]=q.elements[7],F.__data[10]=q.elements[8],F.__data[11]=0):(q.toArray(F.__data,Z),Z+=ue.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(_,v,x,P){let R=_.value,L=v+"_"+x;if(P[L]===void 0)return typeof R=="number"||typeof R=="boolean"?P[L]=R:P[L]=R.clone(),!0;{let N=P[L];if(typeof R=="number"||typeof R=="boolean"){if(N!==R)return P[L]=R,!0}else if(N.equals(R)===!1)return N.copy(R),!0}return!1}function g(_){let v=_.uniforms,x=0,P=16;for(let L=0,N=v.length;L<N;L++){let E=Array.isArray(v[L])?v[L]:[v[L]];for(let S=0,F=E.length;S<F;S++){let W=E[S],G=Array.isArray(W.value)?W.value:[W.value];for(let Z=0,J=G.length;Z<J;Z++){let q=G[Z],ue=y(q),K=x%P,me=K%ue.boundary,_e=K+me;x+=me,_e!==0&&P-_e<ue.storage&&(x+=P-_e),W.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=x,x+=ue.storage}}}let R=x%P;return R>0&&(x+=P-R),_.__size=x,_.__cache={},this}function y(_){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function m(_){let v=_.target;v.removeEventListener("dispose",m);let x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function d(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}var To=class{constructor(e={}){let{canvas:t=Mp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,d=null,_=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=At,this.toneMapping=li,this.toneMappingExposure=1;let x=this,P=!1,R=0,L=0,N=null,E=-1,S=null,F=new ht,W=new ht,G=null,Z=new Le(0),J=0,q=t.width,ue=t.height,K=1,me=null,_e=null,we=new ht(0,0,q,ue),Be=new ht(0,0,q,ue),et=!1,Q=new dr,D=!1,O=!1,X=new qe,ce=new qe,fe=new z,Pe=new ht,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ce=!1;function tt(){return N===null?K:1}let B=n;function ae(M,U){return t.getContext(M,U)}try{let M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${al}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",be,!1),B===null){let U="webgl2";if(B=ae(U,M),B===null)throw ae(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let de,Te,le,Xe,De,C,b,V,ie,re,te,Ue,ye,Se,Ze,he,Ae,ke,He,Ie,je,Ye,rt,H;function ge(){de=new D0(B),de.init(),Ye=new u_(B,de),Te=new A0(B,de,e,Ye),le=new c_(B,de),Te.reverseDepthBuffer&&f&&le.buffers.depth.setReversed(!0),Xe=new F0(B),De=new Kx,C=new h_(B,de,le,De,Te,Ye,Xe),b=new C0(x),V=new L0(x),ie=new Gp(B),rt=new w0(B,ie),re=new N0(B,ie,Xe,rt),te=new z0(B,re,ie,Xe),He=new O0(B,Te,C),he=new R0(De),Ue=new Zx(x,b,V,de,Te,rt,he),ye=new g_(x,De),Se=new $x,Ze=new i_(de),ke=new E0(x,b,V,le,te,p,c),Ae=new o_(x,te,Te),H=new x_(B,Xe,Te,le),Ie=new T0(B,de,Xe),je=new U0(B,de,Xe),Xe.programs=Ue.programs,x.capabilities=Te,x.extensions=de,x.properties=De,x.renderLists=Se,x.shadowMap=Ae,x.state=le,x.info=Xe}ge();let $=new qc(x,B);this.xr=$,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let M=de.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=de.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(M){M!==void 0&&(K=M,this.setSize(q,ue,!1))},this.getSize=function(M){return M.set(q,ue)},this.setSize=function(M,U,T=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=M,ue=U,t.width=Math.floor(M*K),t.height=Math.floor(U*K),T===!0&&(t.style.width=M+"px",t.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(q*K,ue*K).floor()},this.setDrawingBufferSize=function(M,U,T){q=M,ue=U,K=T,t.width=Math.floor(M*T),t.height=Math.floor(U*T),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(F)},this.getViewport=function(M){return M.copy(we)},this.setViewport=function(M,U,T,A){M.isVector4?we.set(M.x,M.y,M.z,M.w):we.set(M,U,T,A),le.viewport(F.copy(we).multiplyScalar(K).round())},this.getScissor=function(M){return M.copy(Be)},this.setScissor=function(M,U,T,A){M.isVector4?Be.set(M.x,M.y,M.z,M.w):Be.set(M,U,T,A),le.scissor(W.copy(Be).multiplyScalar(K).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(M){le.setScissorTest(et=M)},this.setOpaqueSort=function(M){me=M},this.setTransparentSort=function(M){_e=M},this.getClearColor=function(M){return M.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(M=!0,U=!0,T=!0){let A=0;if(M){let I=!1;if(N!==null){let Y=N.texture.format;I=Y===xl||Y===gl||Y===ml}if(I){let Y=N.texture.type,ee=Y===Gn||Y===Ci||Y===ur||Y===Ms||Y===fl||Y===dl,pe=ke.getClearColor(),oe=ke.getClearAlpha(),Ee=pe.r,Re=pe.g,xe=pe.b;ee?(g[0]=Ee,g[1]=Re,g[2]=xe,g[3]=oe,B.clearBufferuiv(B.COLOR,0,g)):(y[0]=Ee,y[1]=Re,y[2]=xe,y[3]=oe,B.clearBufferiv(B.COLOR,0,y))}else A|=B.COLOR_BUFFER_BIT}U&&(A|=B.DEPTH_BUFFER_BIT),T&&(A|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(A)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Se.dispose(),Ze.dispose(),De.dispose(),b.dispose(),V.dispose(),te.dispose(),rt.dispose(),H.dispose(),Ue.dispose(),$.dispose(),$.removeEventListener("sessionstart",Vs),$.removeEventListener("sessionend",xi),gn.stop()};function se(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let M=Xe.autoReset,U=Ae.enabled,T=Ae.autoUpdate,A=Ae.needsUpdate,I=Ae.type;ge(),Xe.autoReset=M,Ae.enabled=U,Ae.autoUpdate=T,Ae.needsUpdate=A,Ae.type=I}function be(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function We(M){let U=M.target;U.removeEventListener("dispose",We),Et(U)}function Et(M){Tt(M),De.remove(M)}function Tt(M){let U=De.get(M).programs;U!==void 0&&(U.forEach(function(T){Ue.releaseProgram(T)}),M.isShaderMaterial&&Ue.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,T,A,I,Y){U===null&&(U=Ge);let ee=I.isMesh&&I.matrixWorld.determinant()<0,pe=ne(M,U,T,A,I);le.setMaterial(A,ee);let oe=T.index,Ee=1;if(A.wireframe===!0){if(oe=re.getWireframeAttribute(T),oe===void 0)return;Ee=2}let Re=T.drawRange,xe=T.attributes.position,$e=Re.start*Ee,ct=(Re.start+Re.count)*Ee;Y!==null&&($e=Math.max($e,Y.start*Ee),ct=Math.min(ct,(Y.start+Y.count)*Ee)),oe!==null?($e=Math.max($e,0),ct=Math.min(ct,oe.count)):xe!=null&&($e=Math.max($e,0),ct=Math.min(ct,xe.count));let dt=ct-$e;if(dt<0||dt===1/0)return;rt.setup(I,A,pe,T,oe);let kt,ut=Ie;if(oe!==null&&(kt=ie.get(oe),ut=je,ut.setIndex(kt)),I.isMesh)A.wireframe===!0?(le.setLineWidth(A.wireframeLinewidth*tt()),ut.setMode(B.LINES)):ut.setMode(B.TRIANGLES);else if(I.isLine){let Oe=A.linewidth;Oe===void 0&&(Oe=1),le.setLineWidth(Oe*tt()),I.isLineSegments?ut.setMode(B.LINES):I.isLineLoop?ut.setMode(B.LINE_LOOP):ut.setMode(B.LINE_STRIP)}else I.isPoints?ut.setMode(B.POINTS):I.isSprite&&ut.setMode(B.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)ut.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(de.get("WEBGL_multi_draw"))ut.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{let Oe=I._multiDrawStarts,Pn=I._multiDrawCounts,ft=I._multiDrawCount,xn=oe?ie.get(oe).bytesPerElement:1,Hi=De.get(A).currentProgram.getUniforms();for(let sn=0;sn<ft;sn++)Hi.setValue(B,"_gl_DrawID",sn),ut.render(Oe[sn]/xn,Pn[sn])}else if(I.isInstancedMesh)ut.renderInstances($e,dt,I.count);else if(T.isInstancedBufferGeometry){let Oe=T._maxInstanceCount!==void 0?T._maxInstanceCount:1/0,Pn=Math.min(T.instanceCount,Oe);ut.renderInstances($e,dt,Pn)}else ut.render($e,dt)};function at(M,U,T){M.transparent===!0&&M.side===bt&&M.forceSinglePass===!1?(M.side=Ct,M.needsUpdate=!0,ki(M,U,T),M.side=Cn,M.needsUpdate=!0,ki(M,U,T),M.side=bt):ki(M,U,T)}this.compile=function(M,U,T=null){T===null&&(T=M),d=Ze.get(T),d.init(U),v.push(d),T.traverseVisible(function(I){I.isLight&&I.layers.test(U.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),M!==T&&M.traverseVisible(function(I){I.isLight&&I.layers.test(U.layers)&&(d.pushLight(I),I.castShadow&&d.pushShadow(I))}),d.setupLights();let A=new Set;return M.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;let Y=I.material;if(Y)if(Array.isArray(Y))for(let ee=0;ee<Y.length;ee++){let pe=Y[ee];at(pe,T,I),A.add(pe)}else at(Y,T,I),A.add(Y)}),v.pop(),d=null,A},this.compileAsync=function(M,U,T=null){let A=this.compile(M,U,T);return new Promise(I=>{function Y(){if(A.forEach(function(ee){De.get(ee).currentProgram.isReady()&&A.delete(ee)}),A.size===0){I(M);return}setTimeout(Y,10)}de.get("KHR_parallel_shader_compile")!==null?Y():setTimeout(Y,10)})};let st=null;function nn(M){st&&st(M)}function Vs(){gn.stop()}function xi(){gn.start()}let gn=new cf;gn.setAnimationLoop(nn),typeof self<"u"&&gn.setContext(self),this.setAnimationLoop=function(M){st=M,$.setAnimationLoop(M),M===null?gn.stop():gn.start()},$.addEventListener("sessionstart",Vs),$.addEventListener("sessionend",xi),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(U),U=$.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,U,N),d=Ze.get(M,v.length),d.init(U),v.push(d),ce.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Q.setFromProjectionMatrix(ce),O=this.localClippingEnabled,D=he.init(this.clippingPlanes,O),m=Se.get(M,_.length),m.init(),_.push(m),$.enabled===!0&&$.isPresenting===!0){let Y=x.xr.getDepthSensingMesh();Y!==null&&Gs(Y,U,-1/0,x.sortObjects)}Gs(M,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(me,_e),Ce=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Ce&&ke.addToRenderList(m,M),this.info.render.frame++,D===!0&&he.beginShadows();let T=d.state.shadowsArray;Ae.render(T,M,U),D===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();let A=m.opaque,I=m.transmissive;if(d.setupLights(),U.isArrayCamera){let Y=U.cameras;if(I.length>0)for(let ee=0,pe=Y.length;ee<pe;ee++){let oe=Y[ee];Ar(A,I,M,oe)}Ce&&ke.render(M);for(let ee=0,pe=Y.length;ee<pe;ee++){let oe=Y[ee];Ws(m,M,oe,oe.viewport)}}else I.length>0&&Ar(A,I,M,U),Ce&&ke.render(M),Ws(m,M,U);N!==null&&(C.updateMultisampleRenderTarget(N),C.updateRenderTargetMipmap(N)),M.isScene===!0&&M.onAfterRender(x,M,U),rt.resetDefaultState(),E=-1,S=null,v.pop(),v.length>0?(d=v[v.length-1],D===!0&&he.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function Gs(M,U,T,A){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)T=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Q.intersectsSprite(M)){A&&Pe.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ce);let ee=te.update(M),pe=M.material;pe.visible&&m.push(M,ee,pe,T,Pe.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Q.intersectsObject(M))){let ee=te.update(M),pe=M.material;if(A&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Pe.copy(M.boundingSphere.center)):(ee.boundingSphere===null&&ee.computeBoundingSphere(),Pe.copy(ee.boundingSphere.center)),Pe.applyMatrix4(M.matrixWorld).applyMatrix4(ce)),Array.isArray(pe)){let oe=ee.groups;for(let Ee=0,Re=oe.length;Ee<Re;Ee++){let xe=oe[Ee],$e=pe[xe.materialIndex];$e&&$e.visible&&m.push(M,ee,$e,T,Pe.z,xe)}}else pe.visible&&m.push(M,ee,pe,T,Pe.z,null)}}let Y=M.children;for(let ee=0,pe=Y.length;ee<pe;ee++)Gs(Y[ee],U,T,A)}function Ws(M,U,T,A){let I=M.opaque,Y=M.transmissive,ee=M.transparent;d.setupLightsView(T),D===!0&&he.setGlobalState(x.clippingPlanes,T),A&&le.viewport(F.copy(A)),I.length>0&&Bi(I,U,T),Y.length>0&&Bi(Y,U,T),ee.length>0&&Bi(ee,U,T),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function Ar(M,U,T,A){if((T.isScene===!0?T.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[A.id]===void 0&&(d.state.transmissionRenderTarget[A.id]=new Xn(1,1,{generateMipmaps:!0,type:de.has("EXT_color_buffer_half_float")||de.has("EXT_color_buffer_float")?yr:Gn,minFilter:Rn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));let Y=d.state.transmissionRenderTarget[A.id],ee=A.viewport||F;Y.setSize(ee.z,ee.w);let pe=x.getRenderTarget();x.setRenderTarget(Y),x.getClearColor(Z),J=x.getClearAlpha(),J<1&&x.setClearColor(16777215,.5),x.clear(),Ce&&ke.render(T);let oe=x.toneMapping;x.toneMapping=li;let Ee=A.viewport;if(A.viewport!==void 0&&(A.viewport=void 0),d.setupLightsView(A),D===!0&&he.setGlobalState(x.clippingPlanes,A),Bi(M,T,A),C.updateMultisampleRenderTarget(Y),C.updateRenderTargetMipmap(Y),de.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let xe=0,$e=U.length;xe<$e;xe++){let ct=U[xe],dt=ct.object,kt=ct.geometry,ut=ct.material,Oe=ct.group;if(ut.side===bt&&dt.layers.test(A.layers)){let Pn=ut.side;ut.side=Ct,ut.needsUpdate=!0,Rr(dt,T,A,kt,ut,Oe),ut.side=Pn,ut.needsUpdate=!0,Re=!0}}Re===!0&&(C.updateMultisampleRenderTarget(Y),C.updateRenderTargetMipmap(Y))}x.setRenderTarget(pe),x.setClearColor(Z,J),Ee!==void 0&&(A.viewport=Ee),x.toneMapping=oe}function Bi(M,U,T){let A=U.isScene===!0?U.overrideMaterial:null;for(let I=0,Y=M.length;I<Y;I++){let ee=M[I],pe=ee.object,oe=ee.geometry,Ee=A===null?ee.material:A,Re=ee.group;pe.layers.test(T.layers)&&Rr(pe,U,T,oe,Ee,Re)}}function Rr(M,U,T,A,I,Y){M.onBeforeRender(x,U,T,A,I,Y),M.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),I.onBeforeRender(x,U,T,A,M,Y),I.transparent===!0&&I.side===bt&&I.forceSinglePass===!1?(I.side=Ct,I.needsUpdate=!0,x.renderBufferDirect(T,U,A,I,M,Y),I.side=Cn,I.needsUpdate=!0,x.renderBufferDirect(T,U,A,I,M,Y),I.side=bt):x.renderBufferDirect(T,U,A,I,M,Y),M.onAfterRender(x,U,T,A,I,Y)}function ki(M,U,T){U.isScene!==!0&&(U=Ge);let A=De.get(M),I=d.state.lights,Y=d.state.shadowsArray,ee=I.state.version,pe=Ue.getParameters(M,I.state,Y,U,T),oe=Ue.getProgramCacheKey(pe),Ee=A.programs;A.environment=M.isMeshStandardMaterial?U.environment:null,A.fog=U.fog,A.envMap=(M.isMeshStandardMaterial?V:b).get(M.envMap||A.environment),A.envMapRotation=A.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Ee===void 0&&(M.addEventListener("dispose",We),Ee=new Map,A.programs=Ee);let Re=Ee.get(oe);if(Re!==void 0){if(A.currentProgram===Re&&A.lightsStateVersion===ee)return k(M,pe),Re}else pe.uniforms=Ue.getUniforms(M),M.onBeforeCompile(pe,x),Re=Ue.acquireProgram(pe,oe),Ee.set(oe,Re),A.uniforms=pe.uniforms;let xe=A.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(xe.clippingPlanes=he.uniform),k(M,pe),A.needsLights=Fe(M),A.lightsStateVersion=ee,A.needsLights&&(xe.ambientLightColor.value=I.state.ambient,xe.lightProbe.value=I.state.probe,xe.directionalLights.value=I.state.directional,xe.directionalLightShadows.value=I.state.directionalShadow,xe.spotLights.value=I.state.spot,xe.spotLightShadows.value=I.state.spotShadow,xe.rectAreaLights.value=I.state.rectArea,xe.ltc_1.value=I.state.rectAreaLTC1,xe.ltc_2.value=I.state.rectAreaLTC2,xe.pointLights.value=I.state.point,xe.pointLightShadows.value=I.state.pointShadow,xe.hemisphereLights.value=I.state.hemi,xe.directionalShadowMap.value=I.state.directionalShadowMap,xe.directionalShadowMatrix.value=I.state.directionalShadowMatrix,xe.spotShadowMap.value=I.state.spotShadowMap,xe.spotLightMatrix.value=I.state.spotLightMatrix,xe.spotLightMap.value=I.state.spotLightMap,xe.pointShadowMap.value=I.state.pointShadowMap,xe.pointShadowMatrix.value=I.state.pointShadowMatrix),A.currentProgram=Re,A.uniformsList=null,Re}function w(M){if(M.uniformsList===null){let U=M.currentProgram.getUniforms();M.uniformsList=xs.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function k(M,U){let T=De.get(M);T.outputColorSpace=U.outputColorSpace,T.batching=U.batching,T.batchingColor=U.batchingColor,T.instancing=U.instancing,T.instancingColor=U.instancingColor,T.instancingMorph=U.instancingMorph,T.skinning=U.skinning,T.morphTargets=U.morphTargets,T.morphNormals=U.morphNormals,T.morphColors=U.morphColors,T.morphTargetsCount=U.morphTargetsCount,T.numClippingPlanes=U.numClippingPlanes,T.numIntersection=U.numClipIntersection,T.vertexAlphas=U.vertexAlphas,T.vertexTangents=U.vertexTangents,T.toneMapping=U.toneMapping}function ne(M,U,T,A,I){U.isScene!==!0&&(U=Ge),C.resetTextureUnits();let Y=U.fog,ee=A.isMeshStandardMaterial?U.environment:null,pe=N===null?x.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:zt,oe=(A.isMeshStandardMaterial?V:b).get(A.envMap||ee),Ee=A.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,Re=!!T.attributes.tangent&&(!!A.normalMap||A.anisotropy>0),xe=!!T.morphAttributes.position,$e=!!T.morphAttributes.normal,ct=!!T.morphAttributes.color,dt=li;A.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(dt=x.toneMapping);let kt=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,ut=kt!==void 0?kt.length:0,Oe=De.get(A),Pn=d.state.lights;if(D===!0&&(O===!0||M!==S)){let un=M===S&&A.id===E;he.setState(A,M,un)}let ft=!1;A.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Pn.state.version||Oe.outputColorSpace!==pe||I.isBatchedMesh&&Oe.batching===!1||!I.isBatchedMesh&&Oe.batching===!0||I.isBatchedMesh&&Oe.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Oe.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Oe.instancing===!1||!I.isInstancedMesh&&Oe.instancing===!0||I.isSkinnedMesh&&Oe.skinning===!1||!I.isSkinnedMesh&&Oe.skinning===!0||I.isInstancedMesh&&Oe.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Oe.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Oe.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Oe.instancingMorph===!1&&I.morphTexture!==null||Oe.envMap!==oe||A.fog===!0&&Oe.fog!==Y||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==he.numPlanes||Oe.numIntersection!==he.numIntersection)||Oe.vertexAlphas!==Ee||Oe.vertexTangents!==Re||Oe.morphTargets!==xe||Oe.morphNormals!==$e||Oe.morphColors!==ct||Oe.toneMapping!==dt||Oe.morphTargetsCount!==ut)&&(ft=!0):(ft=!0,Oe.__version=A.version);let xn=Oe.currentProgram;ft===!0&&(xn=ki(A,U,I));let Hi=!1,sn=!1,Xs=!1,Mt=xn.getUniforms(),wn=Oe.uniforms;if(le.useProgram(xn.program)&&(Hi=!0,sn=!0,Xs=!0),A.id!==E&&(E=A.id,sn=!0),Hi||S!==M){le.buffers.depth.getReversed()?(X.copy(M.projectionMatrix),Sp(X),Ep(X),Mt.setValue(B,"projectionMatrix",X)):Mt.setValue(B,"projectionMatrix",M.projectionMatrix),Mt.setValue(B,"viewMatrix",M.matrixWorldInverse);let jn=Mt.map.cameraPosition;jn!==void 0&&jn.setValue(B,fe.setFromMatrixPosition(M.matrixWorld)),Te.logarithmicDepthBuffer&&Mt.setValue(B,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(A.isMeshPhongMaterial||A.isMeshToonMaterial||A.isMeshLambertMaterial||A.isMeshBasicMaterial||A.isMeshStandardMaterial||A.isShaderMaterial)&&Mt.setValue(B,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,sn=!0,Xs=!0)}if(I.isSkinnedMesh){Mt.setOptional(B,I,"bindMatrix"),Mt.setOptional(B,I,"bindMatrixInverse");let un=I.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),Mt.setValue(B,"boneTexture",un.boneTexture,C))}I.isBatchedMesh&&(Mt.setOptional(B,I,"batchingTexture"),Mt.setValue(B,"batchingTexture",I._matricesTexture,C),Mt.setOptional(B,I,"batchingIdTexture"),Mt.setValue(B,"batchingIdTexture",I._indirectTexture,C),Mt.setOptional(B,I,"batchingColorTexture"),I._colorsTexture!==null&&Mt.setValue(B,"batchingColorTexture",I._colorsTexture,C));let Ys=T.morphAttributes;if((Ys.position!==void 0||Ys.normal!==void 0||Ys.color!==void 0)&&He.update(I,T,xn),(sn||Oe.receiveShadow!==I.receiveShadow)&&(Oe.receiveShadow=I.receiveShadow,Mt.setValue(B,"receiveShadow",I.receiveShadow)),A.isMeshGouraudMaterial&&A.envMap!==null&&(wn.envMap.value=oe,wn.flipEnvMap.value=oe.isCubeTexture&&oe.isRenderTargetTexture===!1?-1:1),A.isMeshStandardMaterial&&A.envMap===null&&U.environment!==null&&(wn.envMapIntensity.value=U.environmentIntensity),sn&&(Mt.setValue(B,"toneMappingExposure",x.toneMappingExposure),Oe.needsLights&&j(wn,Xs),Y&&A.fog===!0&&ye.refreshFogUniforms(wn,Y),ye.refreshMaterialUniforms(wn,A,K,ue,d.state.transmissionRenderTarget[M.id]),xs.upload(B,w(Oe),wn,C)),A.isShaderMaterial&&A.uniformsNeedUpdate===!0&&(xs.upload(B,w(Oe),wn,C),A.uniformsNeedUpdate=!1),A.isSpriteMaterial&&Mt.setValue(B,"center",I.center),Mt.setValue(B,"modelViewMatrix",I.modelViewMatrix),Mt.setValue(B,"normalMatrix",I.normalMatrix),Mt.setValue(B,"modelMatrix",I.matrixWorld),A.isShaderMaterial||A.isRawShaderMaterial){let un=A.uniformsGroups;for(let jn=0,Qn=un.length;jn<Qn;jn++){let ph=un[jn];H.update(ph,xn),H.bind(ph,xn)}}return xn}function j(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function Fe(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(M,U,T){De.get(M.texture).__webglTexture=U,De.get(M.depthTexture).__webglTexture=T;let A=De.get(M);A.__hasExternalTextures=!0,A.__autoAllocateDepthBuffer=T===void 0,A.__autoAllocateDepthBuffer||de.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),A.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,U){let T=De.get(M);T.__webglFramebuffer=U,T.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(M,U=0,T=0){N=M,R=U,L=T;let A=!0,I=null,Y=!1,ee=!1;if(M){let oe=De.get(M);if(oe.__useDefaultFramebuffer!==void 0)le.bindFramebuffer(B.FRAMEBUFFER,null),A=!1;else if(oe.__webglFramebuffer===void 0)C.setupRenderTarget(M);else if(oe.__hasExternalTextures)C.rebindTextures(M,De.get(M.texture).__webglTexture,De.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let xe=M.depthTexture;if(oe.__boundDepthTexture!==xe){if(xe!==null&&De.has(xe)&&(M.width!==xe.image.width||M.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(M)}}let Ee=M.texture;(Ee.isData3DTexture||Ee.isDataArrayTexture||Ee.isCompressedArrayTexture)&&(ee=!0);let Re=De.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Re[U])?I=Re[U][T]:I=Re[U],Y=!0):M.samples>0&&C.useMultisampledRTT(M)===!1?I=De.get(M).__webglMultisampledFramebuffer:Array.isArray(Re)?I=Re[T]:I=Re,F.copy(M.viewport),W.copy(M.scissor),G=M.scissorTest}else F.copy(we).multiplyScalar(K).floor(),W.copy(Be).multiplyScalar(K).floor(),G=et;if(le.bindFramebuffer(B.FRAMEBUFFER,I)&&A&&le.drawBuffers(M,I),le.viewport(F),le.scissor(W),le.setScissorTest(G),Y){let oe=De.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+U,oe.__webglTexture,T)}else if(ee){let oe=De.get(M.texture),Ee=U||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,oe.__webglTexture,T||0,Ee)}E=-1},this.readRenderTargetPixels=function(M,U,T,A,I,Y,ee){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pe=De.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ee!==void 0&&(pe=pe[ee]),pe){le.bindFramebuffer(B.FRAMEBUFFER,pe);try{let oe=M.texture,Ee=oe.format,Re=oe.type;if(!Te.textureFormatReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Te.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-A&&T>=0&&T<=M.height-I&&B.readPixels(U,T,A,I,Ye.convert(Ee),Ye.convert(Re),Y)}finally{let oe=N!==null?De.get(N).__webglFramebuffer:null;le.bindFramebuffer(B.FRAMEBUFFER,oe)}}},this.readRenderTargetPixelsAsync=async function(M,U,T,A,I,Y,ee){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pe=De.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ee!==void 0&&(pe=pe[ee]),pe){let oe=M.texture,Ee=oe.format,Re=oe.type;if(!Te.textureFormatReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Te.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=M.width-A&&T>=0&&T<=M.height-I){le.bindFramebuffer(B.FRAMEBUFFER,pe);let xe=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,xe),B.bufferData(B.PIXEL_PACK_BUFFER,Y.byteLength,B.STREAM_READ),B.readPixels(U,T,A,I,Ye.convert(Ee),Ye.convert(Re),0);let $e=N!==null?De.get(N).__webglFramebuffer:null;le.bindFramebuffer(B.FRAMEBUFFER,$e);let ct=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await bp(B,ct,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,xe),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Y),B.deleteBuffer(xe),B.deleteSync(ct),Y}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,U=null,T=0){M.isTexture!==!0&&(sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,M=arguments[1]);let A=Math.pow(2,-T),I=Math.floor(M.image.width*A),Y=Math.floor(M.image.height*A),ee=U!==null?U.x:0,pe=U!==null?U.y:0;C.setTexture2D(M,0),B.copyTexSubImage2D(B.TEXTURE_2D,T,0,0,ee,pe,I,Y),le.unbindTexture()},this.copyTextureToTexture=function(M,U,T=null,A=null,I=0){M.isTexture!==!0&&(sr("WebGLRenderer: copyTextureToTexture function signature has changed."),A=arguments[0]||null,M=arguments[1],U=arguments[2],I=arguments[3]||0,T=null);let Y,ee,pe,oe,Ee,Re,xe,$e,ct,dt=M.isCompressedTexture?M.mipmaps[I]:M.image;T!==null?(Y=T.max.x-T.min.x,ee=T.max.y-T.min.y,pe=T.isBox3?T.max.z-T.min.z:1,oe=T.min.x,Ee=T.min.y,Re=T.isBox3?T.min.z:0):(Y=dt.width,ee=dt.height,pe=dt.depth||1,oe=0,Ee=0,Re=0),A!==null?(xe=A.x,$e=A.y,ct=A.z):(xe=0,$e=0,ct=0);let kt=Ye.convert(U.format),ut=Ye.convert(U.type),Oe;U.isData3DTexture?(C.setTexture3D(U,0),Oe=B.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(C.setTexture2DArray(U,0),Oe=B.TEXTURE_2D_ARRAY):(C.setTexture2D(U,0),Oe=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,U.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,U.unpackAlignment);let Pn=B.getParameter(B.UNPACK_ROW_LENGTH),ft=B.getParameter(B.UNPACK_IMAGE_HEIGHT),xn=B.getParameter(B.UNPACK_SKIP_PIXELS),Hi=B.getParameter(B.UNPACK_SKIP_ROWS),sn=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,dt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,dt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,oe),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ee),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Re);let Xs=M.isDataArrayTexture||M.isData3DTexture,Mt=U.isDataArrayTexture||U.isData3DTexture;if(M.isRenderTargetTexture||M.isDepthTexture){let wn=De.get(M),Ys=De.get(U),un=De.get(wn.__renderTarget),jn=De.get(Ys.__renderTarget);le.bindFramebuffer(B.READ_FRAMEBUFFER,un.__webglFramebuffer),le.bindFramebuffer(B.DRAW_FRAMEBUFFER,jn.__webglFramebuffer);for(let Qn=0;Qn<pe;Qn++)Xs&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,De.get(M).__webglTexture,I,Re+Qn),M.isDepthTexture?(Mt&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,De.get(U).__webglTexture,I,ct+Qn),B.blitFramebuffer(oe,Ee,Y,ee,xe,$e,Y,ee,B.DEPTH_BUFFER_BIT,B.NEAREST)):Mt?B.copyTexSubImage3D(Oe,I,xe,$e,ct+Qn,oe,Ee,Y,ee):B.copyTexSubImage2D(Oe,I,xe,$e,ct+Qn,oe,Ee,Y,ee);le.bindFramebuffer(B.READ_FRAMEBUFFER,null),le.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Mt?M.isDataTexture||M.isData3DTexture?B.texSubImage3D(Oe,I,xe,$e,ct,Y,ee,pe,kt,ut,dt.data):U.isCompressedArrayTexture?B.compressedTexSubImage3D(Oe,I,xe,$e,ct,Y,ee,pe,kt,dt.data):B.texSubImage3D(Oe,I,xe,$e,ct,Y,ee,pe,kt,ut,dt):M.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,I,xe,$e,Y,ee,kt,ut,dt.data):M.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,I,xe,$e,dt.width,dt.height,kt,dt.data):B.texSubImage2D(B.TEXTURE_2D,I,xe,$e,Y,ee,kt,ut,dt);B.pixelStorei(B.UNPACK_ROW_LENGTH,Pn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ft),B.pixelStorei(B.UNPACK_SKIP_PIXELS,xn),B.pixelStorei(B.UNPACK_SKIP_ROWS,Hi),B.pixelStorei(B.UNPACK_SKIP_IMAGES,sn),I===0&&U.generateMipmaps&&B.generateMipmap(Oe),le.unbindTexture()},this.copyTextureToTexture3D=function(M,U,T=null,A=null,I=0){return M.isTexture!==!0&&(sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),T=arguments[0]||null,A=arguments[1]||null,M=arguments[2],U=arguments[3],I=arguments[4]||0),sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,U,T,A,I)},this.initRenderTarget=function(M){De.get(M).__webglFramebuffer===void 0&&C.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?C.setTextureCube(M,0):M.isData3DTexture?C.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?C.setTexture2DArray(M,0):C.setTexture2D(M,0),le.unbindTexture()},this.resetState=function(){R=0,L=0,N=null,le.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}};var Ao=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Le(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ro=class extends lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Cs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pc,this.updateRanges=[],this.version=0,this.uuid=Sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Zt=new z,Ii=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new xt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},pr=class extends Xt{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},rs,$s=new z,os=new z,as=new z,cs=new Ve,js=new Ve,df=new qe,jr=new z,Qs=new z,Qr=new z,Su=new Ve,Va=new Ve,Eu=new Ve,Co=class extends lt{constructor(e=new pr){if(super(),this.isSprite=!0,this.type="Sprite",rs===void 0){rs=new vt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Cs(t,5);rs.setIndex([0,1,2,0,2,3]),rs.setAttribute("position",new Ii(n,3,0,!1)),rs.setAttribute("uv",new Ii(n,2,3,!1))}this.geometry=rs,this.material=e,this.center=new Ve(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),os.setFromMatrixScale(this.matrixWorld),df.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),as.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&os.multiplyScalar(-as.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;eo(jr.set(-.5,-.5,0),as,o,os,s,r),eo(Qs.set(.5,-.5,0),as,o,os,s,r),eo(Qr.set(.5,.5,0),as,o,os,s,r),Su.set(0,0),Va.set(1,0),Eu.set(1,1);let a=e.ray.intersectTriangle(jr,Qs,Qr,!1,$s);if(a===null&&(eo(Qs.set(-.5,.5,0),as,o,os,s,r),Va.set(0,1),a=e.ray.intersectTriangle(jr,Qr,Qs,!1,$s),a===null))return;let c=e.ray.origin.distanceTo($s);c<e.near||c>e.far||t.push({distance:c,point:$s.clone(),uv:oi.getInterpolation($s,jr,Qs,Qr,Su,Va,Eu,new Ve),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function eo(i,e,t,n,s,r){cs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(js.x=r*cs.x-s*cs.y,js.y=s*cs.x+r*cs.y):js.copy(cs),i.copy(e),i.x+=js.x,i.y+=js.y,i.applyMatrix4(df)}var wu=new z,Tu=new ht,Au=new ht,__=new z,Ru=new qe,to=new z,Ga=new an,Cu=new qe,Wa=new Ts,Is=class extends Ne{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ch,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Wt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,to),this.boundingBox.expandByPoint(to)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new an),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,to),this.boundingSphere.expandByPoint(to)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ga.copy(this.boundingSphere),Ga.applyMatrix4(s),e.ray.intersectsSphere(Ga)!==!1&&(Cu.copy(s).invert(),Wa.copy(e.ray).applyMatrix4(Cu),!(this.boundingBox!==null&&Wa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Wa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ht,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ch?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Wd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Tu.fromBufferAttribute(s.attributes.skinIndex,e),Au.fromBufferAttribute(s.attributes.skinWeight,e),wu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Au.getComponent(r);if(o!==0){let a=Tu.getComponent(r);Ru.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(__.copy(wu).applyMatrix4(Ru),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},mr=class extends lt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Io=class extends Ot{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Lt,h=Lt,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Iu=new qe,y_=new qe,Po=class i{constructor(e=[],t=[]){this.uuid=Sn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:y_;Iu.multiplyMatrices(a,t[r]),Iu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Io(t,e,e,dn,bn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new mr),this.bones.push(o),this.boneInverses.push(new qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Pi=class extends xt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ls=new qe,Pu=new qe,no=[],Lu=new Wt,v_=new qe,er=new Ne,tr=new an,cn=class extends Ne{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,v_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ls),Lu.copy(e.boundingBox).applyMatrix4(ls),this.boundingBox.union(Lu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new an),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ls),tr.copy(e.boundingSphere).applyMatrix4(ls),this.boundingSphere.union(tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(er.geometry=this.geometry,er.material=this.material,er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tr.copy(this.boundingSphere),tr.applyMatrix4(n),e.ray.intersectsSphere(tr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ls),Pu.multiplyMatrices(n,ls),er.matrixWorld=Pu,er.raycast(e,no);for(let o=0,a=no.length;o<a;o++){let c=no[o];c.instanceId=r,c.object=this,t.push(c)}no.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Pi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Io(new Float32Array(s*this.count),s,this.count,pl,bn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var gr=class extends Xt{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Lo=new z,Do=new z,Du=new qe,nr=new Ts,io=new an,Xa=new z,Nu=new z,Ps=class extends lt{constructor(e=new vt,t=new gr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Lo.fromBufferAttribute(t,s-1),Do.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Lo.distanceTo(Do);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(s),io.radius+=r,e.ray.intersectsSphere(io)===!1)return;Du.copy(s).invert(),nr.copy(e.ray).applyMatrix4(Du);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let y=p,m=g-1;y<m;y+=l){let d=h.getX(y),_=h.getX(y+1),v=so(this,e,nr,c,d,_);v&&t.push(v)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(p),d=so(this,e,nr,c,y,m);d&&t.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let y=p,m=g-1;y<m;y+=l){let d=so(this,e,nr,c,y,y+1);d&&t.push(d)}if(this.isLineLoop){let y=so(this,e,nr,c,g-1,p);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function so(i,e,t,n,s,r){let o=i.geometry.attributes.position;if(Lo.fromBufferAttribute(o,s),Do.fromBufferAttribute(o,r),t.distanceSqToSegment(Lo,Do,Xa,Nu)>n)return;Xa.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Xa);if(!(c<e.near||c>e.far))return{distance:c,point:Nu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var Uu=new z,Fu=new z,No=class extends Ps{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Uu.fromBufferAttribute(t,s),Fu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Uu.distanceTo(Fu);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Uo=class extends Ps{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Li=class extends Xt{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ou=new qe,Zc=new Ts,ro=new an,oo=new z,Ls=class extends lt{constructor(e=new vt,t=new Li){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(s),ro.radius+=r,e.ray.intersectsSphere(ro)===!1)return;Ou.copy(s).invert(),Zc.copy(e.ray).applyMatrix4(Ou);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=f,y=p;g<y;g++){let m=l.getX(g);oo.fromBufferAttribute(u,m),zu(oo,m,c,s,e,t,this)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=f,y=p;g<y;g++)oo.fromBufferAttribute(u,g),zu(oo,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function zu(i,e,t,n,s,r,o){let a=Zc.distanceSqToPoint(i);if(a<t){let c=new z;Zc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Ds=class extends Ot{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var In=class i extends vt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new z,h=new Ve;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let p=n+u/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(a,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},$t=class i extends vt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],p=[],g=0,y=[],m=n/2,d=0;_(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new it(u,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(p,2));function _(){let x=new z,P=new z,R=0,L=(t-e)/n;for(let N=0;N<=r;N++){let E=[],S=N/r,F=S*(t-e)+e;for(let W=0;W<=s;W++){let G=W/s,Z=G*c+a,J=Math.sin(Z),q=Math.cos(Z);P.x=F*J,P.y=-S*n+m,P.z=F*q,u.push(P.x,P.y,P.z),x.set(J,L,q).normalize(),f.push(x.x,x.y,x.z),p.push(G,1-S),E.push(g++)}y.push(E)}for(let N=0;N<s;N++)for(let E=0;E<r;E++){let S=y[E][N],F=y[E+1][N],W=y[E+1][N+1],G=y[E][N+1];(e>0||E!==0)&&(h.push(S,F,G),R+=3),(t>0||E!==r-1)&&(h.push(F,W,G),R+=3)}l.addGroup(d,R,0),d+=R}function v(x){let P=g,R=new Ve,L=new z,N=0,E=x===!0?e:t,S=x===!0?1:-1;for(let W=1;W<=s;W++)u.push(0,m*S,0),f.push(0,S,0),p.push(.5,.5),g++;let F=g;for(let W=0;W<=s;W++){let Z=W/s*c+a,J=Math.cos(Z),q=Math.sin(Z);L.x=E*q,L.y=m*S,L.z=E*J,u.push(L.x,L.y,L.z),f.push(0,S,0),R.x=J*.5+.5,R.y=q*.5*S+.5,p.push(R.x,R.y),g++}for(let W=0;W<s;W++){let G=P+W,Z=F+W;x===!0?h.push(Z,Z+1,G):h.push(Z+1,Z,G),N+=3}l.addGroup(d,N,x===!0?1:2),d+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Yn=class i extends $t{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Fo=class i extends vt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new it(r,3)),this.setAttribute("normal",new it(r.slice(),3)),this.setAttribute("uv",new it(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let v=new z,x=new z,P=new z;for(let R=0;R<t.length;R+=3)p(t[R+0],v),p(t[R+1],x),p(t[R+2],P),c(v,x,P,_)}function c(_,v,x,P){let R=P+1,L=[];for(let N=0;N<=R;N++){L[N]=[];let E=_.clone().lerp(x,N/R),S=v.clone().lerp(x,N/R),F=R-N;for(let W=0;W<=F;W++)W===0&&N===R?L[N][W]=E:L[N][W]=E.clone().lerp(S,W/F)}for(let N=0;N<R;N++)for(let E=0;E<2*(R-N)-1;E++){let S=Math.floor(E/2);E%2===0?(f(L[N][S+1]),f(L[N+1][S]),f(L[N][S])):(f(L[N][S+1]),f(L[N+1][S+1]),f(L[N+1][S]))}}function l(_){let v=new z;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(_),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){let _=new z;for(let v=0;v<r.length;v+=3){_.x=r[v+0],_.y=r[v+1],_.z=r[v+2];let x=m(_)/2/Math.PI+.5,P=d(_)/Math.PI+.5;o.push(x,1-P)}g(),u()}function u(){for(let _=0;_<o.length;_+=6){let v=o[_+0],x=o[_+2],P=o[_+4],R=Math.max(v,x,P),L=Math.min(v,x,P);R>.9&&L<.1&&(v<.2&&(o[_+0]+=1),x<.2&&(o[_+2]+=1),P<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function p(_,v){let x=_*3;v.x=e[x+0],v.y=e[x+1],v.z=e[x+2]}function g(){let _=new z,v=new z,x=new z,P=new z,R=new Ve,L=new Ve,N=new Ve;for(let E=0,S=0;E<r.length;E+=9,S+=6){_.set(r[E+0],r[E+1],r[E+2]),v.set(r[E+3],r[E+4],r[E+5]),x.set(r[E+6],r[E+7],r[E+8]),R.set(o[S+0],o[S+1]),L.set(o[S+2],o[S+3]),N.set(o[S+4],o[S+5]),P.copy(_).add(v).add(x).divideScalar(3);let F=m(P);y(R,S+0,_,F),y(L,S+2,v,F),y(N,S+4,x,F)}}function y(_,v,x,P){P<0&&_.x===1&&(o[v]=_.x-1),x.x===0&&x.z===0&&(o[v]=P/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var Di=class i extends Fo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Oo=class i extends Fo{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ns=class i extends vt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=e,f=(t-e)/s,p=new z,g=new Ve;for(let y=0;y<=s;y++){for(let m=0;m<=n;m++){let d=r+m/n*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let y=0;y<s;y++){let m=y*(n+1);for(let d=0;d<n;d++){let _=d+m,v=_,x=_+n+1,P=_+n+2,R=_+1;a.push(v,x,R),a.push(x,P,R)}}this.setIndex(a),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var qt=class i extends vt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new z,f=new z,p=[],g=[],y=[],m=[];for(let d=0;d<=n;d++){let _=[],v=d/n,x=0;d===0&&o===0?x=.5/t:d===n&&c===Math.PI&&(x=-.5/t);for(let P=0;P<=t;P++){let R=P/t;u.x=-e*Math.cos(s+R*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(s+R*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),m.push(R+x,1-v),_.push(l++)}h.push(_)}for(let d=0;d<n;d++)for(let _=0;_<t;_++){let v=h[d][_+1],x=h[d][_],P=h[d+1][_],R=h[d+1][_+1];(d!==0||o>0)&&p.push(v,x,R),(d!==n-1||c<Math.PI)&&p.push(x,P,R)}this.setIndex(p),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(y,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ni=class i extends vt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new z,u=new z,f=new z;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){let y=g/s*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(y),u.y=(e+t*Math.cos(m))*Math.sin(y),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){let y=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,_=(s+1)*p+g;o.push(y,m,_),o.push(m,d,_)}this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Us=class extends Xt{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zo,this.normalScale=new Ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ln=class extends Us{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ve(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var mt=class extends Xt{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new Le(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zo,this.normalScale=new Ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Fs=class extends Xt{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zo,this.normalScale=new Ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function ao(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function M_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function b_(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Bu(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function pf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var ui=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Kc=class extends ui{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:us,endingEnd:us}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case fs:r=e,a=2*t-n;break;case mo:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case fs:o=e,c=2*n-t;break;case mo:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),y=g*g,m=y*g,d=-f*m+2*f*y-f*g,_=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,v=(-1-p)*m+(1.5+p)*y+.5*g,x=p*m-p*y;for(let P=0;P!==a;++P)r[P]=d*o[h+P]+_*o[l+P]+v*o[c+P]+x*o[u+P];return r}},zo=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},Jc=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},pn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ao(t,this.TimeBufferType),this.values=ao(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ao(e.times,Array),values:ao(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Jc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new zo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Kc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ss:t=this.InterpolantFactoryMethodDiscrete;break;case Es:t=this.InterpolantFactoryMethodLinear;break;case ma:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return Es;case this.InterpolantFactoryMethodSmooth:return ma}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&M_(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ma,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,f=u-n,p=u+n;for(let g=0;g!==n;++g){let y=t[u+g];if(y!==t[f+g]||y!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let p=0;p!==n;++p)t[f+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=Es;var fi=class extends pn{constructor(e,t,n){super(e,t,n)}};fi.prototype.ValueTypeName="bool";fi.prototype.ValueBufferType=Array;fi.prototype.DefaultInterpolation=Ss;fi.prototype.InterpolantFactoryMethodLinear=void 0;fi.prototype.InterpolantFactoryMethodSmooth=void 0;var Bo=class extends pn{};Bo.prototype.ValueTypeName="color";var qn=class extends pn{};qn.prototype.ValueTypeName="number";var $c=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)en.slerpFlat(r,0,o,l-a,o,l,c);return r}},Zn=class extends pn{InterpolantFactoryMethodLinear(e){return new $c(this.times,this.values,this.getValueSize(),e)}};Zn.prototype.ValueTypeName="quaternion";Zn.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends pn{constructor(e,t,n){super(e,t,n)}};di.prototype.ValueTypeName="string";di.prototype.ValueBufferType=Array;di.prototype.DefaultInterpolation=Ss;di.prototype.InterpolantFactoryMethodLinear=void 0;di.prototype.InterpolantFactoryMethodSmooth=void 0;var Kn=class extends pn{};Kn.prototype.ValueTypeName="vector";var Os=class{constructor(e="",t=-1,n=[],s=_l){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Sn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(E_(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(pn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=b_(c);c=Bu(c,1,h),l=Bu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new qn(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,p,g,y){if(p.length!==0){let m=[],d=[];pf(p,m,d,g),m.length!==0&&y.push(new u(f,m,d))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let p={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let y=0;y<f[g].morphTargets.length;y++)p[f[g].morphTargets[y]]=-1;for(let y in p){let m=[],d=[];for(let _=0;_!==f[g].morphTargets.length;++_){let v=f[g];m.push(v.time),d.push(v.morphTarget===y?1:0)}s.push(new qn(".morphTargetInfluence["+y+"]",m,d))}c=p.length*o}else{let p=".bones["+t[u].name+"]";n(Kn,p+".position",f,"pos",s),n(Zn,p+".quaternion",f,"rot",s),n(Kn,p+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function S_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return qn;case"vector":case"vector2":case"vector3":case"vector4":return Kn;case"color":return Bo;case"quaternion":return Zn;case"bool":case"boolean":return fi;case"string":return di}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function E_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=S_(i.type);if(i.times===void 0){let t=[],n=[];pf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var ai={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},jc=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},w_=new jc,Jn=class{constructor(e){this.manager=e!==void 0?e:w_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Jn.DEFAULT_MATERIAL_NAME="__DEFAULT";var On={},Qc=class extends Error{constructor(e,t){super(e),this.response=t}},xr=class extends Jn{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ai.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(On[e]!==void 0){On[e].push({onLoad:t,onProgress:n,onError:s});return}On[e]=[],On[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=On[e],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=f?parseInt(f):0,g=p!==0,y=0,m=new ReadableStream({start(d){_();function _(){u.read().then(({done:v,value:x})=>{if(v)d.close();else{y+=x.byteLength;let P=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:p});for(let R=0,L=h.length;R<L;R++){let N=h[R];N.onProgress&&N.onProgress(P)}d.enqueue(x),_()}},v=>{d.error(v)})}}});return new Response(m)}else throw new Qc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(f);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{ai.add(e,l);let h=On[e];delete On[e];for(let u=0,f=h.length;u<f;u++){let p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{let h=On[e];if(h===void 0)throw this.manager.itemError(e),l;delete On[e];for(let u=0,f=h.length;u<f;u++){let p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var el=class extends Jn{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=ai.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=fr("img");function c(){h(),ai.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var ko=class extends Jn{constructor(e){super(e)}load(e,t,n,s){let r=new Ot,o=new el(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},zs=class extends lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Ho=class extends zs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ya=new qe,ku=new z,Hu=new z,_r=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ve(512,512),this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dr,this._frameExtents=new Ve(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ku.setFromMatrixPosition(e.matrixWorld),t.position.copy(ku),Hu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hu),t.updateMatrixWorld(),Ya.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ya),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ya)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},tl=class extends _r{constructor(){super(new It(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=ws*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Vo=class extends zs{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new tl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Vu=new qe,ir=new z,qa=new z,nl=class extends _r{constructor(){super(new It(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ve(4,2),this._viewportCount=6,this._viewports=[new ht(2,1,1,1),new ht(0,1,1,1),new ht(3,1,1,1),new ht(1,1,1,1),new ht(3,0,1,1),new ht(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ir.setFromMatrixPosition(e.matrixWorld),n.position.copy(ir),qa.copy(n.position),qa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(qa),n.updateMatrixWorld(),s.makeTranslation(-ir.x,-ir.y,-ir.z),Vu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vu)}},Go=class extends zs{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new nl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},il=class extends _r{constructor(){super(new Rs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ui=class extends zs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.shadow=new il}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var pi=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Wo=class extends Jn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=ai.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ai.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),ai.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ai.add(e,c),r.manager.itemStart(e)}};var sl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){en.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;en.multiplyQuaternionsFlat(e,o,e,t,e,n),en.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},Ml="\\[\\]\\.:\\/",T_=new RegExp("["+Ml+"]","g"),bl="[^"+Ml+"]",A_="[^"+Ml.replace("\\.","")+"]",R_=/((?:WC+[\/:])*)/.source.replace("WC",bl),C_=/(WCOD+)?/.source.replace("WCOD",A_),I_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",bl),P_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",bl),L_=new RegExp("^"+R_+C_+I_+P_+"$"),D_=["material","materials","bones","map"],rl=class{constructor(e,t,n){let s=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(T_,"")}static parseTrackName(e){let t=L_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);D_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=rl;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ol=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:us,endingEnd:us};for(let l=0;l!==o;++l){let h=r[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Yd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Zd:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case _l:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===qd;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===Xd){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=fs,s.endingEnd=fs):(e?s.endingStart=this.zeroSlopeAtStart?fs:us:s.endingStart=mo,t?s.endingEnd=this.zeroSlopeAtEnd?fs:us:s.endingEnd=mo)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},N_=new Float32Array(1),Xo=class extends Wn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=s[u],p=f.name,g=h[p];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}let y=t&&t._propertyBindings[u].binding.parsedPath;g=new sl(yt.create(n,p,y),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new zo(new Float32Array(2),new Float32Array(2),1,N_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Os.findByName(s,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=_l),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let h=new ol(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Os.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:al}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=al);function El(i,e){if(e===ef)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===vr||e===qo){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===vr)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var $o=class extends Jn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Pl(t)}),this.register(function(t){return new Ll(t)}),this.register(function(t){return new Hl(t)}),this.register(function(t){return new Vl(t)}),this.register(function(t){return new Gl(t)}),this.register(function(t){return new Nl(t)}),this.register(function(t){return new Ul(t)}),this.register(function(t){return new Fl(t)}),this.register(function(t){return new Ol(t)}),this.register(function(t){return new Il(t)}),this.register(function(t){return new zl(t)}),this.register(function(t){return new Dl(t)}),this.register(function(t){return new kl(t)}),this.register(function(t){return new Bl(t)}),this.register(function(t){return new Rl(t)}),this.register(function(t){return new Wl(t)}),this.register(function(t){return new Xl(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=pi.extractUrlBase(e);o=pi.resolveURL(l,this.path)}else o=pi.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new xr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===yf){try{o[Qe.KHR_BINARY_GLTF]=new Yl(e)}catch(u){s&&s(u);return}r=JSON.parse(o[Qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Ql(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case Qe.KHR_MATERIALS_UNLIT:o[u]=new Cl;break;case Qe.KHR_DRACO_MESH_COMPRESSION:o[u]=new ql(r,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:o[u]=new Zl;break;case Qe.KHR_MESH_QUANTIZATION:o[u]=new Kl;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function U_(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Rl=class{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Le(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],zt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ui(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Go(h),l.distance=u;break;case"spot":l=new Vo(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,$n(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Cl=class{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return _t}extendParams(e,t,n){let s=[];e.color=new Le(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],zt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,At))}return Promise.all(s)}},Il=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Pl=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ve(a,a)}return Promise.all(r)}},Ll=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Dl=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Nl=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Le(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],zt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,At)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Ul=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Fl=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Le().setRGB(a[0],a[1],a[2],zt),Promise.all(r)}},Ol=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},zl=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Le().setRGB(a[0],a[1],a[2],zt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,At)),Promise.all(r)}},Bl=class{constructor(e){this.parser=e,this.name=Qe.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},kl=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ln}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Hl=class{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Vl=class{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Gl=class{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Wl=class{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,f,s.mode,s.filter),p})})}else return null}},Xl=class{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==mn.TRIANGLES&&l.mode!==mn.TRIANGLE_STRIP&&l.mode!==mn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,p=[];for(let g of u){let y=new qe,m=new z,d=new en,_=new z(1,1,1),v=new cn(g.geometry,g.material,f);for(let x=0;x<f;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,x),c.SCALE&&_.fromBufferAttribute(c.SCALE,x),v.setMatrixAt(x,y.compose(m,d,_));for(let x in c)if(x==="_COLOR_0"){let P=c[x];v.instanceColor=new Pi(P.array,P.itemSize,P.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);lt.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),p.push(v)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},yf="glTF",Mr=12,mf={JSON:1313821514,BIN:5130562},Yl=class{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Mr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==yf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Mr,r=new DataView(e,Mr),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===mf.JSON){let l=new Uint8Array(e,Mr+o,a);this.content=n.decode(l)}else if(c===mf.BIN){let l=Mr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ql=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=$l[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=$l[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[e.attributes[h]],p=ks[f.componentType];l[u]=p.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(p){for(let g in p.attributes){let y=p.attributes[g],m=c[g];m!==void 0&&(y.normalized=m)}u(p)},a,l,zt,f)})})}},Zl=class{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Kl=class{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}},jo=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,f=u*u,p=f*u,g=e*l,y=g-l,m=-2*p+3*f,d=p-f,_=1-m,v=d-f+u;for(let x=0;x!==a;x++){let P=o[y+x+a],R=o[y+x+c]*h,L=o[g+x+a],N=o[g+x]*h;r[x]=_*P+v*R+m*L+d*N}return r}},F_=new en,Jl=class extends jo{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return F_.fromArray(r).normalize().toArray(r),r}},mn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ks={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},gf={9728:Lt,9729:Qt,9984:hl,9985:or,9986:hs,9987:Rn},xf={33071:kn,33648:hr,10497:Ri},wl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},$l={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},mi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},O_={CUBICSPLINE:void 0,LINEAR:Es,STEP:Ss},Tl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function z_(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Us({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Cn})),i.DefaultMaterial}function Fi(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function $n(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function B_(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function k_(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function H_(i){let e,t=i.extensions&&i.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Al(t.attributes):e=i.indices+":"+Al(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Al(i.targets[n]);return e}function Al(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function jl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function V_(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var G_=new qe,Ql=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new U_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new ko(this.options.manager):this.textureLoader=new Wo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new xr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Fi(r,a,s),$n(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(pi.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=wl[s.type],a=ks[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new xt(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=wl[s.type],l=ks[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,y,m;if(p&&p!==u){let d=Math.floor(f/p),_="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+d+":"+s.count,v=t.cache.get(_);v||(y=new l(a,d*p,s.count*p/h),v=new Cs(y,p/h),t.cache.add(_,v)),m=new Ii(v,c,f%p/h,g)}else a===null?y=new l(s.count*c):y=new l(a,f,s.count*c),m=new xt(y,c,g);if(s.sparse!==void 0){let d=wl.SCALAR,_=ks[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,P=new _(o[1],v,s.sparse.count*d),R=new l(o[2],x,s.sparse.count*c);a!==null&&(m=new xt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let L=0,N=P.length;L<N;L++){let E=P[L];if(m.setX(E,R[L*c]),c>=2&&m.setY(E,R[L*c+1]),c>=3&&m.setZ(E,R[L*c+2]),c>=4&&m.setW(E,R[L*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=gf[f.magFilter]||Qt,h.minFilter=gf[f.minFilter]||Rn,h.wrapS=xf[f.wrapS]||Ri,h.wrapT=xf[f.wrapT]||Ri,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Lt&&h.minFilter!==Qt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,p){let g=f;t.isImageBitmapLoader===!0&&(g=function(y){let m=new Ot(y);m.needsUpdate=!0,f(m)}),t.load(pi.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),$n(u,o),u.userData.mimeType=o.mimeType||V_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Qe.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Li,Xt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new gr,Xt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Us}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[Qe.KHR_MATERIALS_UNLIT]){let u=s[Qe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Le(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],zt),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,At)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=bt);let h=r.alphaMode||Tl.OPAQUE;if(h===Tl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Tl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==_t&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ve(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==_t&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==_t){let u=r.emissiveFactor;a.emissive=new Le().setRGB(u[0],u[1],u[2],zt)}return r.emissiveTexture!==void 0&&o!==_t&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,At)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),$n(u,r),t.associations.set(u,{materials:e}),r.extensions&&Fi(s,u,r),u})}createUniqueName(e){let t=yt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return _f(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=H_(l),u=s[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=_f(new vt,l,t),s[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?z_(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let y=h[p],m=o[p],d,_=l[p];if(m.mode===mn.TRIANGLES||m.mode===mn.TRIANGLE_STRIP||m.mode===mn.TRIANGLE_FAN||m.mode===void 0)d=r.isSkinnedMesh===!0?new Is(y,_):new Ne(y,_),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),m.mode===mn.TRIANGLE_STRIP?d.geometry=El(d.geometry,qo):m.mode===mn.TRIANGLE_FAN&&(d.geometry=El(d.geometry,vr));else if(m.mode===mn.LINES)d=new No(y,_);else if(m.mode===mn.LINE_STRIP)d=new Ps(y,_);else if(m.mode===mn.LINE_LOOP)d=new Uo(y,_);else if(m.mode===mn.POINTS)d=new Ls(y,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(d.geometry.morphAttributes).length>0&&k_(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),$n(d,r),m.extensions&&Fi(s,d,m),t.assignFinalMaterial(d),u.push(d)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&Fi(s,u[0],r),u[0];let f=new Pt;r.extensions&&Fi(s,f,r),t.associations.set(f,{meshes:e});for(let p=0,g=u.length;p<g;p++)f.add(u[p]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new It(sf.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Rs(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),$n(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let f=new qe;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Po(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let p=s.channels[u],g=s.samplers[p.sampler],y=p.target,m=y.node,d=s.parameters!==void 0?s.parameters[g.input]:g.input,_=s.parameters!==void 0?s.parameters[g.output]:g.output;y.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",_)),l.push(g),h.push(y))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],p=u[1],g=u[2],y=u[3],m=u[4],d=[];for(let _=0,v=f.length;_<v;_++){let x=f[_],P=p[_],R=g[_],L=y[_],N=m[_];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();let E=n._createAnimationTracks(x,P,R,L,N);if(E)for(let S=0;S<E.length;S++)d.push(E[S])}return new Os(r,void 0,d)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(f,G_)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new mr:l.length>1?h=new Pt:l.length===1?h=l[0]:h=new lt,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),$n(h,r),r.extensions&&Fi(n,h,r),r.matrix!==void 0){let u=new qe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Pt;n.name&&(r.name=s.createUniqueName(n.name)),$n(r,n),n.extensions&&Fi(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,p]of s.associations)(f instanceof Xt||f instanceof Ot)&&u.set(f,p);return h.traverse(f=>{let p=s.associations.get(f);p!=null&&u.set(f,p)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];mi[r.path]===mi.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(mi[r.path]){case mi.weights:l=qn;break;case mi.rotation:l=Zn;break;case mi.position:case mi.scale:l=Kn;break;default:switch(n.itemSize){case 1:l=qn;break;case 2:case 3:default:l=Kn;break}break}let h=s.interpolation!==void 0?O_[s.interpolation]:Es,u=this._getArrayFromAccessor(n);for(let f=0,p=c.length;f<p;f++){let g=new l(c[f]+"."+mi[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=jl(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Zn?Jl:jo;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function W_(i,e,t){let n=e.attributes,s=new Wt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new z(c[0],c[1],c[2]),new z(l[0],l[1],l[2])),a.normalized){let h=jl(ks[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new z,c=new z;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],p=f.min,g=f.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),f.normalized){let y=jl(ks[f.componentType]);c.multiplyScalar(y)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new an;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function _f(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=$l[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return nt.workingColorSpace!==zt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${nt.workingColorSpace}" not supported.`),$n(i,e),W_(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?B_(i,e.targets,t):i})}function vf(i){let e=new Map,t=new Map,n=i.clone();return Mf(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Mf(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Mf(i.children[n],e.children[n],t)}var bf={meadow:{top:6080767,mid:10477823,fog:9426162,bot:7323530,near:72,far:230},canyon:{top:16742970,mid:16756858,fog:16751202,bot:12863520,near:64,far:200},sky:{top:8309759,mid:13168383,fog:12051711,bot:9357552,near:78,far:250},ice:{top:12971263,mid:15202047,fog:12049912,bot:7255791,near:70,far:230},climb:{top:16762218,mid:16769184,fog:16764806,bot:14716976,near:68,far:210},ship:{top:9426175,mid:16770992,fog:13165823,bot:9355504,near:80,far:240}};function Sf(i){return bf[i]||bf.meadow}function wt(i){let e=Math.sin(i*127.1)*43758.5453;return e-Math.floor(e)}function Ef(){let i=document.createElement("canvas");i.width=4,i.height=1;let e=i.getContext("2d");e.fillStyle="#b7c3dc",e.fillRect(0,0,1,1),e.fillStyle="#e7eef8",e.fillRect(1,0,1,1),e.fillStyle="#ffffff",e.fillRect(2,0,2,1);let t=new Ds(i);return t.magFilter=Lt,t.minFilter=Lt,t.generateMipmaps=!1,t.colorSpace=An||zt,t}function jt(i,e){return new mt({color:i,gradientMap:e,side:bt})}function wf(i,e,t){let n=new lt,s=new Le,r=[];function o(D,O,X,ce){if(!X.length)return null;let fe=new cn(D,O,X.length);return X.forEach((Pe,Ge)=>{ce(n,Pe,Ge),n.updateMatrix(),fe.setMatrixAt(Ge,n.matrix),Pe.color&&(s.set(Pe.color),fe.setColorAt(Ge,s))}),fe.instanceMatrix.needsUpdate=!0,fe.instanceColor&&(fe.instanceColor.needsUpdate=!0),i.add(fe),r.push(fe),fe}let a={meadow:[],canyon:[],sky:[],ice:[],climb:[],ship:[]};for(let D of e.tiles)a[D.zone]&&(Math.abs(D.col)<2||Math.abs(D.col*5+D.row*3)%3===0&&a[D.zone].push(D));let c=new Yn(.28,1.15,5),l=new Di(.55,0),h=new qt(.32,8,6),u=new $t(.18,.18,1.4,8),f=new Di(.9,0);o(l,jt(12876373,t),a.canyon,(D,O,X)=>{D.position.set(O.x,O.y+.35,O.z),D.rotation.set(X,X*.5,0),D.scale.set(1,.75,1.1)}),o(u,jt(3029611,t),a.canyon.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+.35,O.z),D.rotation.set(0,0,Math.PI/2),D.scale.set(1,1,1)}),o(c,jt(12051711,t),a.sky,(D,O,X)=>{D.position.set(O.x,O.y+.55,O.z),D.rotation.set(.1,X,.2),D.scale.setScalar(.8+X%3*.15)}),o(c,jt(13219583,t),a.ice,(D,O,X)=>{D.position.set(O.x,O.y+.7,O.z),D.rotation.set(0,X,.15),D.scale.setScalar(1+X%3*.2)}),o(h,jt(16055295,t),a.ice.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+.28,O.z),D.rotation.set(0,0,0),D.scale.set(1.15,.7,1.15)}),o(l,jt(14721370,t),a.climb,(D,O,X)=>{D.position.set(O.x,O.y+.4,O.z),D.rotation.set(.2,X,0),D.scale.setScalar(.7)});let p=new $t(.28,.34,2.4,6),g=new qt(.45,8,6),y=new qt(.42,10,8),m=new $t(.7,.7,.12,7),d=new Jt(.16,1.6,.16),_=new qt(.12,6,6),v=a.canyon.filter((D,O)=>wt(O+4)>.62);o(new Di(.7,1),jt(2759714,t),v,(D,O,X)=>{let ce=wt(X+O.z);D.position.set(O.x+(ce-.5)*1.8,O.y+.15+ce*.4,O.z+(wt(X+2)-.5)*1.6),D.rotation.set(ce*2,wt(X)*4,wt(X+9)),D.scale.set(.45+ce*1.3,.55+wt(X+3)*1.6,.5+wt(X+6)*1.1)}),o(y,jt(16748497,t),a.sky.filter((D,O)=>O%3===0),(D,O,X)=>{D.position.set(O.x,O.y+3.2+X%3,O.z),D.rotation.set(0,0,0),D.scale.set(1,1.15,1)}),o(h,jt(16777215,t),a.sky,(D,O,X)=>{D.position.set(O.x+(O.col>0?2:-2),O.y+2.4,O.z),D.rotation.set(0,X,0),D.scale.set(1.6,.7,1.2)}),o(m,jt(16055295,t),a.ice.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+.08,O.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)}),o(c,jt(10189823,t),a.ice.filter((D,O)=>O%2===1),(D,O,X)=>{D.position.set(O.x,O.y+1.1,O.z+.4),D.rotation.set(.2,X,0),D.scale.setScalar(1.35)}),o(d,jt(16774885,t),a.climb.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+.8,O.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)}),o(l,jt(9067066,t),a.climb.filter((D,O)=>O%3===0),(D,O,X)=>{D.position.set(O.x,O.y+.3,O.z+.6),D.rotation.set(.4,X,.2),D.scale.setScalar(.55)});let x=new mt({color:16739179,emissive:16739179,emissiveIntensity:.7,gradientMap:t});o(_,x,a.climb.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+1.7,O.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)});function P(){let D=new Di(1,1),O=D.attributes.position;for(let X=0;X<O.count;X++){let ce=O.getX(X),fe=O.getY(X),Pe=O.getZ(X),Ge=1+Math.sin(ce*2.8+fe*1.7)*.22+Math.sin(Pe*2.4+.6)*.16,Ce=fe>.15?.62:1.05;O.setXYZ(X,ce*Ge,fe*Ge*Ce+.2,Pe*Ge)}return D.computeVertexNormals(),D}function R(){let D=new $t(1,1.25,1.1,7,3),O=D.attributes.position,X=new Float32Array(O.count*3);for(let ce=0;ce<O.count;ce++){let fe=O.getY(ce),Pe=fe>.25;X[ce*3]=Pe?.35:.45,X[ce*3+1]=Pe?.72:.32,X[ce*3+2]=Pe?.32:.24,fe>.35&&O.setY(ce,fe*.45+.35)}return D.setAttribute("color",new xt(X,3)),D.computeVertexNormals(),D}let L={meadow:3971656,canyon:4858912,sky:8300240,ice:4034516,climb:12085800,ship:14858360},N=[],E=e.stations||[];e.hubs&&e.hubs.length&&e.hubs.forEach((D,O)=>{for(let X=0;X<8;X++){let ce=X/8*Math.PI*2+O*.4,fe=D.r+6+wt(O*19+X)*12,Pe=4.2+wt(X+O*5)*5.5;N.push({x:D.x+Math.cos(ce)*fe,y:-.4,z:D.z+Math.sin(ce)*fe,s:Pe,ry:ce,rx:(wt(X+2)-.5)*.25,color:L[D.zone]||8378506,zone:D.zone,side:Math.cos(ce)>0?1:-1})}});for(let D=0;D<E.length&&!(e.hubs&&e.hubs.length);D+=14){let O=E[D];if(!(!O||O.gap))for(let X=0;X<2;X++)for(let ce of[-1,1]){let fe=wt(D+X*17+ce*3),Pe=(X===0?16:30)+fe*8,Ge=3.2+wt(D+4+X)*4.2;N.push({x:O.x+ce*Pe,y:O.y-.8,z:O.z+(wt(D+X+6)-.5)*12,s:Ge*(X===0?1:1.35),ry:fe*6.2,rx:(wt(D+2)-.5)*.4,color:L[O.zone]||8378506,zone:O.zone,side:ce})}}let S=o(P(),jt(16777215,t),N,(D,O)=>{D.position.set(O.x,O.y+O.s*.35,O.z),D.rotation.set(O.rx,O.ry,O.rx*.5),D.scale.set(O.s,O.s*.72,O.s*.9)}),F=new mt({vertexColors:!0,gradientMap:t}),W=N.filter((D,O)=>O%3===0).map(D=>({...D,color:0}));o(R(),F,W,(D,O)=>{D.position.set(O.x,O.y+.4,O.z),D.rotation.set(0,O.ry,0),D.scale.set(O.s*.85,O.s*.55,O.s*.8)});let G=[];function Z(D){let O=E.filter(B=>B&&B.zone==="canyon"&&!B.gap);if(O.length<4)return;let X=2,ce=[];for(let B=0;B<O.length;B+=X)ce.push(O[B]);let fe=[],Pe=[],Ge=[];ce.forEach((B,ae)=>{let de=Math.sin(B.z*.09)*.9+Math.sin(B.z*.027)*.55,Te=1.15+Math.sin(B.z*.06+D)*.4,le=B.x+D*(B.half+1.15+de*.35);fe.push(le-Te*.65,B.y-.55,B.z,le+Te*.65,B.y-.42,B.z);let Xe=ae/Math.max(1,ce.length-1);Pe.push(0,Xe*8,1,Xe*8)});for(let B=0;B<ce.length-1;B++){let ae=B*2;Ge.push(ae,ae+2,ae+1,ae+1,ae+2,ae+3)}let Ce=new vt;Ce.setAttribute("position",new it(fe,3)),Ce.setAttribute("uv",new it(Pe,2)),Ce.setIndex(Ge);let tt=new Yt({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float flow=fract(vUv.y-uTime*0.35); float lane=abs(vUv.x-0.5); float body=smoothstep(0.5,0.08,lane); float streak=smoothstep(0.12,0.9,flow); vec3 col=mix(vec3(0.42,0.04,0.01), vec3(1.0,0.55,0.05), streak*body); float rim=smoothstep(0.2,0.38,lane)*(1.0-smoothstep(0.38,0.5,lane)); col+=vec3(1.0,0.8,0.25)*rim; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }"});i.add(new Ne(Ce,tt)),G.push(tt)}if(e.crater){let D=e.crater,O=new In(D.r,36),X=new Yt({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ vec2 p=vUv-0.5; float r=length(p); float flow=fract(r*4.0-uTime*0.32); float ang=sin(atan(p.y,p.x)*5.0+uTime*0.8); float body=smoothstep(0.52,0.06,r); float streak=smoothstep(0.05,0.95,flow); vec3 col=mix(vec3(0.28,0.02,0.01), vec3(1.0,0.58,0.06), streak); col+=vec3(1.0,0.35,0.02)*ang*0.15*body; col+=vec3(1.0,0.85,0.3)*smoothstep(0.5,0.22,r); if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }"}),ce=new Ne(O,X);ce.rotation.x=-Math.PI/2,ce.position.set(D.x,D.y,D.z),i.add(ce),G.push(X)}else Z(1),Z(-1);let J=N.filter((D,O)=>(D.zone==="meadow"||D.zone==="sky")&&O%7===0).slice(0,10),q=new Yt({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float f=fract(vUv.y*3.0-uTime*0.8); float a=smoothstep(0.0,0.15,vUv.x)*smoothstep(1.0,0.85,vUv.x)*0.55; vec3 col=mix(vec3(0.75,0.92,1.0), vec3(1.0,1.0,1.0), f); gl_FragColor=vec4(col,a); }"});G.push(q);for(let D of J){let O=new Ne(new hi(1.4,4.2),q);O.position.set(D.x+D.side*1.5,D.y+D.s*.2,D.z),i.add(O)}let ue=[],K={meadow:8378506,canyon:16742938,sky:12051711,ice:14152703,climb:16762218,ship:16774885};for(let D=0;D<36;D++){let O=e.ship.z*(D+.5)/36,X=D%2===0?-1:1,ce=e.zones[0].id;for(let fe of e.zones)O>=fe.z0&&(ce=fe.id);ue.push({x:X*(14+wt(D)*8),y:6+wt(D+3)*8,z:O,s:.6+wt(D+9)*.9,phase:wt(D+2)*6,color:K[ce]||16774885})}let me=o(f,jt(16777215,t),ue,(D,O)=>{D.position.set(O.x,O.y,O.z),D.rotation.set(O.phase,O.phase*.3,0),D.scale.setScalar(O.s)}),_e=160,we=new Float32Array(_e*3),Be=[];for(let D=0;D<_e;D++)Be.push({ox:(wt(D)-.5)*18,oy:wt(D+1)*6,oz:(wt(D+2)-.4)*22,sp:.4+wt(D+4)*1.6});let et=new vt;et.setAttribute("position",new xt(we,3));let Q=new Ls(et,new Li({color:16774885,size:.16,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0}));return i.add(Q),{update(D,O){let X=D.time||0;me&&(ue.forEach((Ce,tt)=>{n.position.set(Ce.x,Ce.y+Math.sin(X*.7+Ce.phase)*.45,Ce.z),n.rotation.set(Ce.phase,X*.15+Ce.phase,0),n.scale.setScalar(Ce.s),n.updateMatrix(),me.setMatrixAt(tt,n.matrix)}),me.instanceMatrix.needsUpdate=!0);for(let Ce of G)Ce.uniforms.uTime.value=X;let ce=D.player,fe=D.zoneId||"meadow",Pe=fe==="canyon"?16742938:fe==="ice"?16055295:fe==="sky"?16777215:fe==="climb"?16765503:16774856;Q.material.color.setHex(Pe),Q.material.size=fe==="ice"?.28:fe==="canyon"?.22:.16,Q.material.opacity=fe==="ice"?.55+Math.abs(Math.sin(X*7))*.4:.85;let Ge=fe==="sky"?4:fe==="canyon"?.4:.8;for(let Ce=0;Ce<_e;Ce++){let tt=Be[Ce],B=(X*tt.sp*Ge+tt.oy)%7;we[Ce*3]=ce.pos.x+tt.ox+(fe==="sky"?Math.sin(X+Ce)*.4:0),we[Ce*3+1]=ce.pos.y+.4+B,we[Ce*3+2]=ce.pos.z+tt.oz}et.attributes.position.needsUpdate=!0}}}var eh={tree:"assets/meadow/tree.glb",treeFat:"assets/meadow/tree_fat.glb",pine:"assets/meadow/tree_pine.glb",bush:"assets/meadow/bush.glb",bushLarge:"assets/meadow/bush_large.glb",bushSmall:"assets/meadow/bush_small.glb",flowerRed:"assets/meadow/flower_red.glb",flowerYellow:"assets/meadow/flower_yellow.glb",flowerPurple:"assets/meadow/flower_purple.glb",grass:"assets/meadow/grass.glb",grassLarge:"assets/meadow/grass_large.glb",rock:"assets/meadow/rock_small.glb",rockLarge:"assets/meadow/rock_large.glb",mushroom:"assets/meadow/mushroom.glb",mushroomTall:"assets/meadow/mushroom_tall.glb",fence:"assets/meadow/fence.glb",fenceBroken:"assets/meadow/fence_broken.glb",platform:"assets/meadow/platform.glb",log:"assets/meadow/log.glb",saw:"assets/meadow/saw.glb",button:"assets/meadow/button.glb",door:"assets/meadow/door.glb"},Tf={woodbark:13206602,woodinner:15782564,wooddark:9263666,wood:14722140,leafsgreen:4050517,grass:5166687,dirt:14135410,colorred:16729180,coloryellow:16765503,colorpurple:13208575,metal:16774354,heart:16735114,_defaultmat:16774885};function Y_(i){let e=String(i||"").toLowerCase().replace(/[^a-z]/g,"");return Tf[e]?Tf[e]:e.includes("leaf")||e.includes("grass")?4050517:e.includes("wood")||e.includes("bark")?13206602:e.includes("red")?16729180:e.includes("yellow")?16765503:e.includes("purple")?13208575:e.includes("dirt")||e.includes("rock")?12042444:16774885}function Af(i,e){let t=i&&i.name||"",n=new mt({color:Y_(t),gradientMap:e,side:bt,name:t});return n.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace("#include <opaque_fragment>",`float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.6);
	outgoingLight += rim * vec3(1.0, 0.96, 0.82) * 0.22;
	#include <opaque_fragment>`)},n}function Rf(i,e){i.traverse(t=>{if(!t.isMesh)return;let n=Array.isArray(t.material)?t.material[0]:t.material;t.material=Af(n,e)})}function q_(i,e){i.scene.updateWorldMatrix(!0,!0);let t=[];i.scene.traverse(s=>{if(!s.isMesh)return;let r=s.geometry.clone();r.applyMatrix4(s.matrixWorld);let o=Array.isArray(s.material)?s.material[0]:s.material;t.push({geom:r,mat:Af(o,e)})});let n=new Wt().setFromObject(i.scene);return{parts:t,lift:-n.min.y}}function Ut(i,e,t,n){if(!e||!n.length)return;let{parts:s,lift:r}=q_(e,t),o=new lt;for(let l of s){let h=new cn(l.geom,l.mat,n.length);h.frustumCulled=!1,n.forEach((u,f)=>{let p=u.s;o.position.set(u.x,(u.y||0)+r*p,u.z),o.rotation.set(0,u.rot||0,0),o.scale.setScalar(p),o.updateMatrix(),h.setMatrixAt(f,o.matrix)}),h.instanceMatrix.needsUpdate=!0,i.add(h)}let a=new cn(new In(1,12),new _t({color:1975360,transparent:!0,opacity:.22,depthWrite:!1}),n.length),c=new lt;n.forEach((l,h)=>{c.position.set(l.x,(l.y||0)+.05,l.z),c.rotation.set(-Math.PI/2,0,0),c.scale.setScalar(Math.max(.35,l.s*1.6)),c.updateMatrix(),a.setMatrixAt(h,c.matrix)}),a.instanceMatrix.needsUpdate=!0,a.frustumCulled=!1,i.add(a)}function Z_(i){let e=Math.abs(i+Math.PI/2),t=Math.abs(i-Math.PI/2);return e<.62||t<.42}function Cf(i,e,t,n){let s=(e.hubs||[]).find(_=>_.zone==="meadow")||{x:0,z:40,r:24},r=(_,v,x,P)=>({x:s.x+Math.cos(_)*v,z:s.z+Math.sin(_)*v,rot:_,s:x,y:P||0}),o=[.15,.7,2.05,2.45,2.9,-2.9,-2.4,-1.85].map((_,v)=>r(_,12.5,v%2?.32:.36)),a=[1.15,2.25,-2.6,-.45].map(_=>r(_,14.8,.4)),c=[.95,2.65,-2.05].map(_=>r(_,16.4,.34)),l=[];for(let _=0;_<12;_++){let v=-2.8+_*.48;Z_(v)||l.push(r(v,8.4+_%3*1.1,_%2?.55:.46))}let h=[];for(let _=0;_<8;_++){let v=-2.4+_*.7;Math.abs(Math.cos(v))<.45||h.push(r(v,9.5+_%2,.42))}let u=[];for(let _=0;_<16;_++){let v=_*.9,x=6.5+_%4*2.1,P=r(v,x,_%2?.2:.28);Math.abs(P.x-s.x)<4.2&&P.z<s.z+1||u.push(P)}let f=[.2,2.2,-2.2,-.5].map((_,v)=>r(_,17+v%2,v%2?.42:.32)),p=[1.2,2,-2.1,-1.15].map(_=>r(_,5.4,.7)),g=[-1.15,-.55,.15,.7].map(_=>({x:s.x-19.2,z:s.z+_*6.2,rot:Math.PI/2,s:.3,y:0})),y=[{x:s.x-16.5,z:s.z-6,rot:.4,s:.55,y:0},{x:s.x+15.5,z:s.z+4,rot:1.2,s:.48,y:0}],d=(e.floors||[]).filter(_=>_.zone==="meadow"&&_.rx>5&&_.rx<9).map((_,v)=>({x:_.x,z:_.z,y:_.y,rot:v,s:.62}));if(Ut(i,n.tree,t,o),Ut(i,n.treeFat,t,a),Ut(i,n.pine,t,c),Ut(i,n.bush,t,l.filter((_,v)=>v%3===0)),Ut(i,n.bushLarge,t,l.filter((_,v)=>v%3===1)),Ut(i,n.bushSmall,t,l.filter((_,v)=>v%3===2).map(_=>({..._,s:_.s*.7}))),Ut(i,n.flowerRed,t,h.filter((_,v)=>v%3===0)),Ut(i,n.flowerYellow,t,h.filter((_,v)=>v%3===1)),Ut(i,n.flowerPurple,t,h.filter((_,v)=>v%3===2)),Ut(i,n.grass,t,u.filter((_,v)=>v%2===0)),Ut(i,n.grassLarge,t,u.filter((_,v)=>v%2===1)),Ut(i,n.rock,t,f),Ut(i,n.rockLarge,t,f.filter((_,v)=>v%2===0).map(_=>({..._,s:.38}))),Ut(i,n.mushroomTall,t,p),Ut(i,n.fence,t,g),Ut(i,n.fenceBroken,t,g.slice(0,2).map(_=>({..._,x:_.x+2.2,s:.26}))),Ut(i,n.log,t,y),Ut(i,n.platform,t,d),Ut(i,n.door,t,[{x:s.x+17.5,z:s.z-2,rot:-.6,s:.28,y:0}]),n.mushroom){let _=n.mushroom.scene.clone(!0);Rf(_,t);let v=new Wt().setFromObject(n.mushroom.scene),x=4.15;_.scale.setScalar(x),_.position.set(s.x,-v.min.y*x,s.z);let P=[];_.traverse(R=>{R.isMesh&&P.push(R)});for(let R of P){let L=new Ne(R.geometry,new _t({color:1975360,side:Ct}));L.scale.setScalar(1.045),R.add(L)}i.add(_)}}function Qo(i,e,t,n){let s=new Wt().setFromObject(i.scene),r=i.scene.clone(!0);return Rf(r,e),r.scale.setScalar(t),n||(r.position.y=-s.min.y*t),r}var If={buddy:"assets/models/space_buddy.glb",bumper:"assets/models/obstacle_bumper.glb",spinner:"assets/models/obstacle_spinner.glb",pad:"assets/models/obstacle_jump_pad.glb",platform:"assets/models/obstacle_moving_platform.glb",lava:"assets/models/obstacle_lava_pool.glb",chunk:"assets/models/obstacle_falling_chunk.glb",ship:"assets/models/escape_ship.glb",roller:"assets/models/enemy_roller.glb",hopper:"assets/models/enemy_hopper.glb",flyer:"assets/models/enemy_flyer.glb",geyser:"assets/models/hazard_geyser.glb",sweeper:"assets/models/hazard_sweeper.glb",pendulum:"assets/models/hazard_pendulum.glb"},St=Ef();function K_(i){let e=i&&i.color&&i.color.isColor?i.color.clone():new Le(16777215),t=i&&i.emissive&&i.emissive.isColor?i.emissive.clone():new Le(0),n=new mt({color:e,emissive:t,emissiveIntensity:i&&i.emissiveIntensity||0,gradientMap:St,transparent:!!(i&&i.transparent),opacity:i&&i.opacity!=null?i.opacity:1,side:bt,name:i&&i.name||""});return/Lava|Glow|Antenna|Thruster|Pad|Crack|Star|Hot/.test(n.name)&&(n.emissive.copy(e),n.emissiveIntensity=Math.max(n.emissiveIntensity,.55)),n}function J_(i){let e=new Map;i.traverse(t=>{if(!t.isMesh)return;let n=s=>{if(!s)return new Fs({color:16777215});if(e.has(s.uuid))return e.get(s.uuid);let r=K_(s);return e.set(s.uuid,r),r};Array.isArray(t.material)?t.material=t.material.map(n):t.material=n(t.material)})}function Pf(i){i.updateWorldMatrix(!0,!0);let e=[];return i.traverse(t=>{if(!t.isMesh)return;let n=t.geometry.clone();n.applyMatrix4(t.matrixWorld),n.computeBoundingBox();let s=Array.isArray(t.material)?t.material[0]:t.material;e.push({geom:n,mat:s,name:s&&s.name||t.name||"",maxY:n.boundingBox.max.y})}),e}function hn(i,e,t,n){return e+(i-e)*Math.exp(-t*n)}function $_(i,e,t,n){let s=e-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-t*n))}async function Lf(i,e,t,n){let s=new To({canvas:i,antialias:!1,alpha:!1,powerPreference:"high-performance"});s.outputColorSpace=At,s.toneMapping=ll,s.toneMappingExposure=1.12;let r=Math.min(window.devicePixelRatio||1,t.dprCap),o=new URLSearchParams(location.search).get("dpr");o&&(r=Math.max(.75,Math.min(2,Number(o)||r)));let a=new Ro;a.fog=new Ao(10479871,t.fogNear,t.fogFar);let c=new It(t.fovPortrait,1,.15,500),l=new Ho(13103359,8244322,1.05),h=new Ui(16774084,1.35);h.position.set(-18,42,14);let u=new Ui(10475775,.32);u.position.set(22,14,-12),a.add(l,h,u);let f=new Ne(new qt(380,18,12),new Yt({side:Ct,depthWrite:!1,fog:!1,uniforms:{top:{value:new Le(6080767)},mid:{value:new Le(10479871)},bot:{value:new Le(9361328)}},vertexShader:"varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 bot; void main(){ vec3 n=normalize(vP); float h=n.y; vec3 c=mix(mid, top, smoothstep(0.0, 0.55, h)); c=mix(bot, c, smoothstep(-0.35, 0.08, h)); float sun=smoothstep(0.16, 0.0, length(n.xz-vec2(-0.32,0.12))); c+=vec3(1.0,0.84,0.42)*sun*smoothstep(-0.05,0.25,h); gl_FragColor=vec4(c,1.0); }"}));a.add(f);let p=new $o,g=Object.keys(If),y={},m={},d=0,_=Object.keys(eh),v=g.length+_.length;await Promise.all([...g.map(w=>new Promise((k,ne)=>{p.load(If[w],j=>{J_(j.scene),y[w]=j,d++,n&&n(d/v),k()},void 0,ne)})),..._.map(w=>new Promise((k,ne)=>{p.load(eh[w],j=>{m[w]=j,d++,n&&n(d/v),k()},void 0,ne)}))]),Cf(a,e,St,m);let x=new lt,P=new Le;function R(w,k,ne){let j=Pf(w.scene),Fe=0;for(let U of j)Fe=Math.max(Fe,U.maxY);let M=[];for(let U of j){U.geom.translate(0,-Fe,0);let T=/Crack|Glow/.test(U.name),A=T?new mt({color:16742938,emissive:16742938,emissiveIntensity:.85,gradientMap:St}):new mt({color:16777215,gradientMap:St}),I=new cn(U.geom,A,k.length);I.instanceMatrix.setUsage(nf);for(let Y=0;Y<k.length;Y++){let ee=k[Y];if(x.position.set(ee.x,ee.y,ee.z),x.rotation.set(0,0,0),x.scale.set(1,1,1),x.updateMatrix(),I.setMatrixAt(Y,x.matrix),T)P.set(16742938),I.setColorAt(Y,P);else{let pe=U.maxY>Fe-.25?ee.topColor:ee.sideColor;P.set(ne==="crack"&&U.maxY>Fe-.25?ee.topColor:pe),I.setColorAt(Y,P)}}ne==="crack"&&L(I,k.length),I.instanceMatrix.needsUpdate=!0,I.instanceColor&&(I.instanceColor.needsUpdate=!0),I.computeBoundingSphere(),a.add(I),M.push(I)}return M}function L(w,k){for(let ne=0;ne<k;ne++)x.position.set(0,-80,0),x.scale.set(0,0,0),x.rotation.set(0,0,0),x.updateMatrix(),w.setMatrixAt(ne,x.matrix)}let N=wf(a,e,St),E=new mt({vertexColors:!0,gradientMap:St,side:bt}),S=new mt({vertexColors:!0,color:16765104,emissive:16742938,emissiveIntensity:.28,gradientMap:St,side:bt}),F=[];for(let w of e.chunks){if(w.gap||!w.positions){F.push(null);continue}let k=new vt;k.setAttribute("position",new xt(w.positions,3)),k.setAttribute("color",new xt(w.colors,3)),k.setIndex(new xt(w.indices,1)),k.computeVertexNormals();let ne=new Ne(k,E);ne.frustumCulled=!0,a.add(ne),w.mesh=ne,F.push(ne)}let W={meadow:[.26,.52,.3],canyon:[.5,.16,.1],sky:[.42,.58,.75],ice:[.25,.55,.95],climb:[.58,.32,.14],ship:[.68,.5,.28]},G=[],Z=[],J=[],q=[],ue=14,K=9;for(let w=0;w<=e.len;w+=ue){let k=e.stations[Math.min(e.stations.length-1,Math.round(w/2))],ne=W[k.zone]||W.meadow,j=[];for(let Fe=0;Fe<K;Fe++){let M=(Fe/(K-1)*2-1)*32,U=(Math.abs(M)/12)**2;G.push(k.x+M,k.y-8.2-U,k.z);let T=.86+Math.sin(k.z*.04+M*.2)*.08;Z.push(ne[0]*T,ne[1]*T,ne[2]*T),j.push(G.length/3-1)}q.push(j)}for(let w=0;w<q.length-1;w++)for(let k=0;k<K-1;k++){let ne=q[w][k],j=q[w][k+1],Fe=q[w+1][k],M=q[w+1][k+1];J.push(ne,Fe,j,j,Fe,M)}let me=new vt;me.setAttribute("position",new xt(new Float32Array(G),3)),me.setAttribute("color",new xt(new Float32Array(Z),3)),me.setIndex(J),me.computeVertexNormals(),a.add(new Ne(me,E));let _e=null,we=null,Be=new lt;if(e.coins&&e.coins.length){let w=new $t(.32,.32,.08,12),k=new mt({color:16765503,emissive:16765503,emissiveIntensity:.55,gradientMap:St});_e=new cn(w,k,e.coins.length);let ne=new _t({color:16765503,transparent:!0,opacity:.35,depthWrite:!1,blending:po});we=new cn(new In(.7,12),ne,e.coins.length),e.coins.forEach((j,Fe)=>{Be.position.set(j.x,j.y,j.z),Be.rotation.x=Math.PI/2,Be.updateMatrix(),_e.setMatrixAt(Fe,Be.matrix),we.setMatrixAt(Fe,Be.matrix)}),a.add(_e,we)}let et=new mt({color:13206858,gradientMap:St}),Q=new mt({color:16739179,gradientMap:St});for(let w of e.doors||[]){let k=new Ne(new Jt(.28,3.1,.28),et),ne=k.clone(),j=new Ne(new Jt(2.5,.28,.28),et);if(k.position.set(w.x-1.05,w.y+1.55,w.z),ne.position.set(w.x+1.05,w.y+1.55,w.z),j.position.set(w.x,w.y+3.05,w.z),a.add(k,ne,j),w.solid){let Fe=new Ne(new Jt(1.9,2.7,.22),Q);Fe.position.set(w.x,w.y+1.45,w.z),a.add(Fe)}}let D=new mt({color:14826314,gradientMap:St}),O=new mt({color:16048836,gradientMap:St}),X=new mt({color:7306394,gradientMap:St});for(let w of e.landmarks||[])if(w.kind!=="mushroom"){if(w.kind==="tower"){let k=new Ne(new $t(1.3,2.4,11,8),X);k.position.set(w.x,w.y+5.2,w.z);let ne=new Ne(new Yn(2.6,2.4,8),D);ne.position.set(w.x,w.y+11.6,w.z),a.add(k,ne)}}for(let w of e.islands||[]){let k=new Ne(new $t(w.r,w.r*.7,.85,10),new mt({color:w.zone==="canyon"?13720114:9425034,gradientMap:St}));k.position.set(w.x,w.y-.25,w.z),a.add(k)}let ce=Pf(y.chunk.scene)[0].geom,fe=new Fs({color:12166105}),Pe=[];for(let w=0;w<24;w++){let k=new Ne(ce,fe);k.visible=!1,k.scale.setScalar(.85),a.add(k),Pe.push({mesh:k,active:!1,vy:0,life:0})}function Ge(w){let k=w.scene.clone(!0);return k.traverse(ne=>{!ne.isMesh||!ne.material||(ne.material=Array.isArray(ne.material)?ne.material.map(j=>j.clone()):ne.material.clone())}),k}function Ce(w,k,ne,j,Fe=0,M=1){let U=w.scene.clone(!0);return U.position.set(k,ne,j),U.rotation.y=Fe,U.scale.setScalar(M),a.add(U),U}let tt=e.bumpers.map(w=>Ce(y.bumper,w.x,w.y,w.z)),B=e.pads.map(w=>{if(w.zone==="meadow"&&m.button){let k=Qo(m.button,St,.42,!1);return k.position.x=w.x,k.position.z=w.z,k.position.y+=w.y,a.add(k),k}return Ce(y.pad,w.x,w.y,w.z)}),ae=[];e.crater&&ae.push(Ce(y.lava,e.crater.x,e.crater.y,e.crater.z,0,e.crater.r/3));let de=e.spinners.map(w=>{if(w.zone==="meadow"&&m.saw){let j=Qo(m.saw,St,.34,!0);return j.position.set(w.x,w.y+.9,w.z),a.add(j),{obj:j,bar:j,meadow:!0}}let k=Ce(y.spinner,w.x,w.y,w.z);k.scale.setScalar((w.len||1.62)/1.62);let ne=k.getObjectByName("Spinner_Bar");return{obj:k,bar:ne}}),Te=[];e.platforms.forEach((w,k)=>{let ne=Ce(y.platform,w.x,w.y,w.z,0,w.kind==="spin"?1.15:1.35);Te[k]=ne});let le=y.ship.scene;le.scale.setScalar(t.shipScale),le.position.set(e.ship.x,e.ship.y,e.ship.z),le.rotation.y=Math.PI,a.add(le);let Xe=[],De=[];for(let w=1;w<=8;w++){Xe.push(le.getObjectByName("SeatSocket_"+w));let k=le.getObjectByName("Seat_"+w),ne=[];k&&k.traverse(j=>{if(!j.isMesh)return;let M=(Array.isArray(j.material)?j.material:[j.material]).filter(Boolean).map(U=>{let T=U.clone();return ne.push({mat:T,color:T.color?T.color.clone():new Le(16777215),emissive:T.emissive?T.emissive.clone():new Le(0),intensity:T.emissiveIntensity||0}),T});j.material=Array.isArray(j.material)?M:M[0]}),De.push(ne)}let C=new Ne(new $t(.55,1.3,34,10,1,!0),new _t({color:16765503,transparent:!0,opacity:.08,side:bt,depthWrite:!1}));C.position.y=20,le.add(C);let b=new Ne(new Ns(3.1,3.7,28),new _t({color:16765503,side:bt,transparent:!0,opacity:.9,depthWrite:!1}));b.rotation.x=-Math.PI/2,b.position.set(e.ship.x,e.ship.y+.08,e.ship.z-4.2),a.add(b);let V=new Ne(new Yn(.85,2.2,8),new _t({color:16765503}));V.rotation.x=Math.PI,V.position.y=.15,V.visible=!1;let ie=V.clone();ie.material=new _t({color:16739179}),ie.scale.setScalar(.55),V.add(ie),le.add(V);let re=new Ne(new In(26,28),new _t({color:16742938}));re.rotation.x=-Math.PI/2,re.position.set(0,t.lavaStartY,(e.lava.z0+e.lava.z1)/2),a.add(re);let te=e.geysers.map(w=>{let k=Ge(y.geyser);return k.position.set(w.x,w.y,w.z),k.userData.jet=k.getObjectByName("GeyserJet"),k.userData.ring=k.getObjectByName("GeyserRing"),a.add(k),k}),Ue=e.pendulums.map(()=>{let w=Ge(y.pendulum),k=new Ne(new $t(.07,.07,1,6),new mt({color:1975360,gradientMap:St}));return a.add(w,k),{bob:w,rope:k}}),ye=e.sweepers.map(w=>{if(w.zone==="meadow"&&m.saw){let Fe=Qo(m.saw,St,.3,!0);return Fe.position.set(w.x,w.y+.85,w.z),a.add(Fe),Fe}let k=Ge(y.sweeper),ne=w.scale||(w.full?1.15:1);k.scale.set(ne,ne,ne);let j=k.getObjectByName("SweeperBar");return j&&j.material&&j.material.color&&j.material.color.set(w.full?16742938:16739179),a.add(k),k});function Se(w){let k=[];w.traverse(ne=>{ne.isMesh&&k.push(ne)});for(let ne of k){let j=new Ne(ne.geometry,new _t({color:1975360,side:Ct}));j.scale.setScalar(1.08),ne.add(j)}}let Ze=new mt({color:16765503,gradientMap:St}),he=new mt({color:16739179,gradientMap:St}),Ae=e.rollers.map(w=>{let k=Ge(y.roller);k.scale.setScalar(w.radius),w.snow&&k.traverse(U=>{!U.isMesh||!U.material||!U.material.color||U.name==="RollerEye"||U.name==="RollerMouth"||U.material.color.set(16251903)});let ne=new Ne(new Ni(1.2,.07,6,18),new _t({color:w.snow?14152959:16765503,transparent:!0,opacity:.85}));ne.rotation.x=Math.PI/2,ne.position.y=-.82,k.add(ne),k.userData.ring=ne;let j=new Ne(new Yn(.34,.42,7),Ze);j.position.y=1.05;let Fe=new Ne(new Jt(.08,.1,.06),new mt({color:16774885,gradientMap:St}));Fe.position.set(-.08,-.08,.95);let M=Fe.clone();return M.position.x=.08,k.add(j,Fe,M),Se(k),a.add(k),k}),ke=e.hoppers.map(()=>{let w=Ge(y.hopper);w.userData.body=w.getObjectByName("HopperBody"),w.userData.eyes=w.getObjectByName("HopperEye");let k=new Ne(new Jt(.46,.16,.08),he);k.position.set(0,.15,.62);let ne=new Ne(new qt(.09,8,6),he);ne.position.set(.28,.02,.48);let j=ne.clone();j.position.x=-.28;let Fe=new Ne(new qt(.28,10,8),new mt({color:16771266,gradientMap:St}));return Fe.scale.set(1,.7,.45),Fe.position.set(0,-.12,.42),w.add(k,ne,j,Fe),Se(w),a.add(w),w}),He=e.flyers.map(()=>{let w=Ge(y.flyer);w.userData.wing=w.getObjectByName("FlyerWings"),w.userData.eyes=w.getObjectByName("FlyerEye");let k=new Ne(new Ni(.16,.04,6,10),Ze);k.position.set(.16,.12,.34);let ne=k.clone();return ne.position.x=-.16,w.add(k,ne),Se(w),a.add(w),w});function Ie(w){let ne=[],j=[],Fe=[],M=[];for(let A=0;A<6;A++){let I=A/6*Math.PI*2+w,Y=.75+(A*3+w*5)%3*.28;M.push([Math.cos(I)*Y,Math.sin(I)*Y])}ne.push(0,.18,0),j.push(.28,.16,.12),M.forEach(([A,I])=>{ne.push(A,.18,I),j.push(1,.45,.08)}),ne.push(0,-.18,0),j.push(.35,.18,.1),M.forEach(([A,I])=>{ne.push(A*.92,-.22,I*.92),j.push(.85,.22,.04)});for(let A=0;A<6;A++){let I=1+A,Y=1+(A+1)%6;Fe.push(0,Y,I);let ee=8+A,pe=8+(A+1)%6;Fe.push(7,ee,pe),Fe.push(I,Y,pe,I,pe,ee)}let U=6*2+2;ne.push(.2,-.85,.15),j.push(1,.4,.05),ne.push(.05,-.2,.05),j.push(1,.55,.08),ne.push(.35,-.2,.22),j.push(1,.35,.04),Fe.push(U,U+1,U+2);let T=new vt;return T.setAttribute("position",new it(ne,3)),T.setAttribute("color",new it(j,3)),T.setIndex(Fe),T.computeVertexNormals(),T}let je=[],Ye=new mt({vertexColors:!0,emissive:16742938,emissiveIntensity:.35,gradientMap:St,side:bt});for(let w=0;w<12;w++){let k=new Ne(Ie(w*.7),Ye);k.scale.setScalar(2.6+w%3*.9),k.visible=!1,a.add(k);let ne=w%2===0?-1:1;je.push({mesh:k,ox:ne*(7.5+w%5*2.6),oy:7+w%4*3.4,oz:-1-w%5*2.4,spin:.7+w%5*.22,fall:.18+w%3*.08})}let rt=new Pt;for(let w=0;w<10;w++){let k=new Ne(new Jt(.05,.05,1.6),new _t({color:16774885,transparent:!0,opacity:.75}));k.position.set(w%5-2,.4+w%3*.35,-.4-w%4*.35),rt.add(k)}rt.visible=!1,a.add(rt);for(let w=0;w<7;w++){let k=new Ne(new qt(2.2+w%3,8,6),new Fs({color:16774885}));k.position.set(-18+w*9,16+w%2*3,e.zones[2].z0+20+w*18),k.scale.y=.45,a.add(k)}let H=e.checkpoints.map(w=>{let k=new Ne(new Ns(.7,.95,18),new _t({color:16765503,side:bt,transparent:!0,opacity:.85,depthWrite:!1}));return k.rotation.x=-Math.PI/2,k.position.set(w.x,w.y+.08,w.z),a.add(k),k});function ge(w){return new mt({color:w,gradientMap:St})}function $(w){let k={},ne=new Pt,j=new Ne(new $t(.035,.035,.28,5),ge(16739179));j.position.y=1.62;let Fe=new Ne(new Jt(.72,.045,.1),ge(16765503));Fe.position.y=1.76,ne.add(j,Fe),ne.userData.blade=Fe,k.heli=ne;let M=new Pt;for(let Re of[-.18,.18]){let xe=new Ne(new Ni(.13,.04,6,10),ge(6044462));xe.position.set(Re,1.18,.36),M.add(xe)}k.goggles=M;let U=new Pt;for(let Re of[-.18,.18]){let xe=new Ne(new Oo(.12,0),ge(1975360));xe.position.set(Re,1.18,.4),xe.scale.z=.35,U.add(xe)}k.stars=U;let T=new Pt,A=new Ne(new qt(.16,8,6),ge(16748497));A.position.y=1.7,A.scale.y=.45;let I=new Ne(new qt(.07,6,6),ge(16765503));I.position.y=1.72,T.add(A,I),k.flower=T;let Y=new Ne(new Ni(.28,.07,6,12),ge(6080767));Y.position.y=.78,Y.rotation.x=Math.PI/2,k.scarf=Y;let ee=new Pt,pe=new Ne(new qt(.16,8,8),new mt({color:10479871,transparent:!0,opacity:.75,gradientMap:St}));pe.position.y=1.72;let oe=new Ne(new qt(.07,6,6),ge(16747130));oe.position.y=1.72,ee.add(pe,oe),k.fish=ee;let Ee=new Ne(new Yn(.16,.22,5),ge(16765503));Ee.position.y=1.72,k.crown=Ee;for(let Re of Object.values(k))Re.visible=!1,w.add(Re);return k}let se=y.buddy,ve=[],be=new Pt;a.add(be);let We=new In(.48,14),Et=j_();for(let w of e.spawns.length?Array.from({length:t.racers}):[]);for(let w=0;w<t.racers;w++){let k=vf(se.scene),ne=["#5FE3B0","#FFD23F","#FF8FD1","#8C6BFF","#5CC8FF","#7FD88A","#C9B6E8","#FFC38A","#4C6FFF","#2EC4B6","#FF5FA2","#C6E05A","#9BB6FF","#F0B429","#FF8A7A","#7AD0FF"][w%16];k.traverse(ee=>{if(!ee.isMesh)return;let oe=(Array.isArray(ee.material)?ee.material:[ee.material]).map(Ee=>{if(Ee.name==="Buddy_Mint"){let Re=Ee.clone();return Re.color.set(ne),Re}return Ee});ee.material=Array.isArray(ee.material)?oe:oe[0]});let j=new Xo(k),Fe={};for(let ee of se.animations){let pe=j.clipAction(ee);pe.play(),pe.setEffectiveWeight(ee.name==="Idle"?1:0),Fe[ee.name]=pe}w===0&&k.traverse(ee=>{if(!ee.isSkinnedMesh)return;let pe=new Is(ee.geometry,new _t({color:1975360,side:Ct,transparent:!0,opacity:.9}));pe.bind(ee.skeleton,ee.bindMatrix),pe.scale.setScalar(1.05),ee.parent.add(pe)});let M=$(k),U=["classic","heli","goggles","stars","flower","scarf","fish","crown"],T=U[w%U.length];M[T]&&(M[T].visible=!0);let A=new Pt;A.add(k);let I=new Ne(We,new _t({color:1975360,transparent:!0,opacity:.28,depthWrite:!1}));I.rotation.x=-Math.PI/2,A.add(I);let Y=null;if(w===0){let ee=new Ne(new Ns(.5,.68,18),new _t({color:16765503,side:bt,depthWrite:!1}));ee.rotation.x=-Math.PI/2,ee.position.y=.05,A.add(ee),Y=new Co(new pr({map:Et,depthTest:!0})),Y.scale.set(.95,.42,1),Y.position.y=2.05,A.add(Y)}be.add(A),ve.push({group:A,model:k,mixer:j,actions:Fe,shadow:I,current:"Idle",docked:!1,accessories:M,pick:T,dusted:!1,starred:!1})}let Tt=[],at=[16765503,16739179,6284208,16748497,6080767];for(let w=0;w<70;w++){let k=new Ne(new hi(.16,.22),new _t({color:at[w%at.length],side:bt}));k.visible=!1,a.add(k),Tt.push({mesh:k,v:new z,alive:!1})}let st={yaw:0,pitch:t.defaultPitch,autoWait:0,portrait:!0,shake:0};function nn(){let w=i.clientWidth||window.innerWidth,k=i.clientHeight||window.innerHeight;st.portrait=k>=w,s.setPixelRatio(r),s.setSize(w,k,!1),c.aspect=w/Math.max(1,k),c.fov=st.portrait?t.fovPortrait:t.fovLandscape,c.updateProjectionMatrix()}nn();function Vs(w,k){let ne=De[w];if(ne)for(let j of ne){if(!j.mat.color)return;k?(j.mat.color.set(k),j.mat.emissive&&(j.mat.emissive.set(k),j.mat.emissiveIntensity=.35)):(j.mat.color.copy(j.color),j.mat.emissive&&(j.mat.emissive.copy(j.emissive),j.mat.emissiveIntensity=j.intensity))}}function xi(w,k,ne){for(let j of Tt)if(!j.alive){j.alive=!0,j.mesh.visible=!0,j.mesh.position.set(w,k,ne),j.v.set((Math.random()-.5)*4,2+Math.random()*3,(Math.random()-.5)*4);break}}let gn=!1;function Gs(w,k,ne){for(let T of e.chunks){let A=T.mesh;if(!A)continue;if(T.state==="gone"){A.visible=!1,T.dirty=!1;continue}A.visible=!0,A.material=T.state==="cracking"?S:E;let I=T.state==="cracking"?Math.sin(w.time*18+T.jitter*9)*.045:0;if(A.position.y=(T.fallY||0)+I,T.state==="falling"&&T.dirty&&!T.spawned){T.spawned=!0;let Y=Pe.find(ee=>!ee.active);Y&&(Y.active=!0,Y.life=1.4,Y.vy=.6,Y.mesh.visible=!0,Y.mesh.position.set(0,T.positions[1]||0,(T.z0+T.z1)*.5),Y.mesh.rotation.set(0,Math.random(),0))}T.dirty=!1}for(let T of Pe)T.active&&(T.vy-=12*k,T.mesh.position.y+=T.vy*k,T.mesh.rotation.x+=k,T.life-=k,T.life<=0&&(T.active=!1,T.mesh.visible=!1));for(let T=0;T<w.spinners.length;T++){let A=de[T].bar;A&&(A.rotation.y=w.spinners[T].angle)}for(let T=0;T<w.platforms.length;T++){let A=w.platforms[T],I=Te[T];if(I.position.set(A.x,A.y,A.z),A.axis==="spin")I.rotation.y+=k*A.speed;else if(A.axis==="seesaw"){let Y=A.face||0;I.rotation.set(Math.abs(Y)>1&&A.tilt||0,0,Math.abs(Y)>1?0:-(A.tilt||0))}}if(_e){for(let T=0;T<w.course.coins.length;T++){let A=w.course.coins[T];A.got?Be.scale.set(0,0,0):(Be.scale.set(1,1,1),Be.position.set(A.x,A.y+Math.sin(w.time*3+T)*.15,A.z)),Be.rotation.set(Math.PI/2,0,w.time*2.2),Be.updateMatrix(),_e.setMatrixAt(T,Be.matrix),we&&we.setMatrixAt(T,Be.matrix)}_e.instanceMatrix.needsUpdate=!0,we&&(we.instanceMatrix.needsUpdate=!0)}for(let T=0;T<w.geysers.length;T++){let A=w.geysers[T],I=te[T],Y=A.hot?3.1:A.warn?.85:.12,ee=I.userData.jet;ee.scale.set(A.hot?1.3:1,Y,A.hot?1.3:1),ee.position.y=Y*.5,ee.material.color.set(A.hot?16742938:16765503),I.userData.ring.material.color.set(A.warn||A.hot?16765503:16742938),I.userData.ring.scale.setScalar(A.warn?1.25:1)}for(let T=0;T<w.pendulums.length;T++){let A=w.pendulums[T],I=Ue[T];I.bob.position.set(A.bobX,A.bobY,A.bobZ),I.rope.position.set((A.x+A.bobX)/2,(A.y+A.bobY)/2,A.z),I.rope.scale.y=A.len,I.rope.lookAt(A.bobX,A.bobY,A.bobZ)}for(let T=0;T<w.sweepers.length;T++){let A=w.sweepers[T];ye[T].position.set(A.x,A.y+(A.zone==="meadow"?.75:0),A.z),A.zone==="meadow"&&(ye[T].rotation.z=w.time*2.4)}for(let T=0;T<w.rollers.length;T++){let A=w.rollers[T];Ae[T].position.set(A.x,A.y,A.z),Ae[T].rotation.z=A.rot;let I=Ae[T].userData.ring;I&&I.scale.setScalar(1+Math.sin(w.time*7+T)*.14);let Y=!1;for(let oe of w.racers){if(oe.flail<.2)continue;let Ee=oe.pos.x-A.x,Re=oe.pos.z-A.z;Ee*Ee+Re*Re<5&&(Y=!0)}let ee=Y?.78:1,pe=1+Math.sin(w.time*2.2+T)*.04;Ae[T].scale.set(A.radius*(Y?1.15:pe),A.radius*ee,A.radius)}for(let T=0;T<w.hoppers.length;T++){let A=w.hoppers[T];ke[T].position.set(A.x,A.y+.55,A.z);let I=ke[T].userData.body;I&&(I.scale.y=A.hopping?1.18:.62+Math.sin(w.time*3+T)*.04,I.scale.x=A.hopping?.86:1.12);let Y=ke[T].userData.eyes;Y&&(Y.scale.y=Math.sin(w.time*2.4+T*2)>.96?.12:1)}for(let T=0;T<w.flyers.length;T++){let A=w.flyers[T];He[T].position.set(A.x,A.y,A.z),He[T].rotation.y=-A.ang;let I=He[T].userData.wing;I&&(I.rotation.z=Math.sin(w.time*14+T)*.55),He[T].scale.y=1+Math.sin(w.time*14+T)*.08;let Y=He[T].userData.eyes;Y&&(Y.scale.y=Math.sin(w.time*3+T)>.97?.15:1)}re.position.y=w.lavaY;let j=.85+Math.sin(w.time*3)*.15;re.material.color.setRGB(1*j,.35*j,.08),le.position.y=w.shipY;let Fe=w.phase!=="countdown";if(C.material.opacity=Fe?.16+Math.sin(w.time*4)*.05:.04,V.visible=w.phase==="launch"||w.phase==="results",V.visible){let T=.85+Math.sin(w.launchT*30)*.12;V.scale.set(T,T,T)}b.material.opacity=w.phase==="race"?.55+Math.sin(w.time*5)*.25:.2;for(let T=0;T<w.racers.length;T++){let A=w.racers[T],I=ve[T];if(I.mixer.update(k),A.seated){!I.docked&&Xe[A.seatIndex]&&(Xe[A.seatIndex].add(I.group),I.group.position.set(0,.05,0),I.group.rotation.set(0,Math.PI,0),I.group.scale.setScalar(t.seatBuddyScale),I.shadow.visible=!1,I.docked=!0,Vs(A.seatIndex,A.color)),Ws(I,"Cheer",1);continue}I.group.position.set(A.pos.x,A.pos.y,A.pos.z),I.group.rotation.y=A.yaw;let Y=A.squash||0,ee=A.sliding>0?.38:0,pe=!A.grounded&&A.vel.y>1.4?.16:0;if(I.model.position.y=ee*-.15,I.model.scale.set(1+Y*.16+ee*.2-pe*.4,1-Y*.26-ee+pe,1+Y*.12),A.squash>.32&&!I.dusted){I.dusted=!0;for(let xe=0;xe<3;xe++)xi(A.pos.x+(xe-1)*.2,A.pos.y+.1,A.pos.z)}if(A.squash<.05&&(I.dusted=!1),A.flail>.4&&!I.starred){I.starred=!0;for(let xe=0;xe<5;xe++)xi(A.pos.x,A.pos.y+1.55,A.pos.z)}A.flail<.05&&(I.starred=!1),A.sliding>0&&T===0&&xi(A.pos.x,A.pos.y+.15,A.pos.z),T===0&&(rt.visible=!!(A.diving||A.sliding>0),rt.visible&&(rt.position.set(A.pos.x,A.pos.y+.9,A.pos.z),rt.rotation.y=A.yaw));let oe=I.accessories&&I.accessories.heli&&I.accessories.heli.userData.blade;oe&&I.accessories.heli.visible&&(oe.rotation.y+=k*14);let Ee=Math.hypot(A.vel.x,A.vel.z),Re="Idle";A.emote==="cheer"||A.emote==="wave"&&A.flail<=0?Re="Cheer":A.flail>.05||!A.grounded&&A.vel.y<-2?Re="Flail":(Ee>.8||A.sliding>0)&&(Re="Run"),Ws(I,Re,Ee/7),I.shadow&&(I.shadow.visible=A.grounded,I.shadow.position.y=.04)}if(w.phase==="results"&&w.result==="escaped"&&!gn){gn=!0;let T=ve[0].group,A=new z;T.getWorldPosition(A);for(let I=0;I<48;I++)xi(le.position.x+(Math.random()-.5)*3,le.position.y+2+Math.random()*3,le.position.z-2)}for(let T of Tt)T.alive&&(T.v.y-=6*k,T.mesh.position.addScaledVector(T.v,k),T.mesh.rotation.z+=k*4,T.mesh.position.y<e.ship.y-1&&(T.alive=!1,T.mesh.visible=!1));let M=w.phase==="launch"||w.phase==="results";for(let T of je)T.mesh.visible=M,M&&(T.mesh.position.set(e.ship.x+T.ox,e.ship.y+T.oy-w.launchT*T.fall*1.6,e.ship.z+T.oz),T.mesh.rotation.x=-.7,T.mesh.rotation.y=w.launchT*T.spin);C.visible=w.phase!=="launch"&&w.phase!=="results"&&w.seatCine<=0,N.update(w,k);let U=Sf(w.zoneId||"meadow");f.material.uniforms.top.value.setHex(U.top),f.material.uniforms.mid.value.setHex(U.mid),U.bot&&f.material.uniforms.bot.value.setHex(U.bot),a.fog.color.setHex(U.fog),a.fog.near=U.near,a.fog.far=U.far,Ar(w,k,ne),f.position.copy(c.position);for(let T of H)T.rotation.z=w.time*.4}function Ws(w,k,ne){if(w.current===k){w.actions.Run&&k==="Run"&&w.actions.Run.setEffectiveTimeScale(Math.max(.65,Math.min(1.45,ne||1)));return}for(let j of Object.keys(w.actions)){let Fe=j===k;w.actions[j].enabled=!0,w.actions[j].setEffectiveWeight(Fe?1:0)}!w.actions[k]&&w.actions.Idle&&w.actions.Idle.setEffectiveWeight(1),w.current=k}function Ar(w,k,ne){let j=w.player;if(ne&&ne.overview){let oe=ne.overview;c.position.set(oe.x,oe.y,oe.z),c.lookAt(oe.lx,oe.ly,oe.lz);return}let Fe=!!(ne&&(ne.looking||Math.abs(ne.lookDx)+Math.abs(ne.lookDy)>0));if(ne&&ne.intro>0){let oe=1-Math.max(0,Math.min(1,ne.intro/3.3)),Ee=oe*oe*(3-2*oe),Re=st.portrait?t.camDistPortrait:t.camDist,xe=Re*Math.cos(t.defaultPitch),$e=Re*Math.sin(t.defaultPitch),ct=(1-Ee)*(j.pos.x+8)+Ee*(j.pos.x+Math.sin(st.yaw)*xe),dt=(1-Ee)*(j.pos.y+22)+Ee*(j.pos.y+$e+.4),kt=(1-Ee)*(j.pos.z-26)+Ee*(j.pos.z-xe);c.position.set(ct,dt,kt),c.lookAt(j.pos.x,j.pos.y+1,j.pos.z+18*(1-Ee));return}if(w.seatCine>0&&w.player.seated){let oe=new z;ve[0].group.getWorldPosition(oe),c.position.x=hn(c.position.x,le.position.x+6.5,4.2,k),c.position.y=hn(c.position.y,le.position.y+4.2,4.2,k),c.position.z=hn(c.position.z,le.position.z-22,4.2,k),c.lookAt(oe.x,oe.y+.45,oe.z);return}if(w.phase==="results"||w.phase==="launch"){let oe,Ee,Re,xe,$e,ct;if(w.result==="escaped")oe=le.position.x+2,Ee=le.position.y+8,Re=le.position.z+22,xe=le.position.x,$e=le.position.y+1.5,ct=le.position.z-18;else{oe=j.pos.x-6,Ee=j.pos.y+4.2,Re=j.pos.z-8;let dt=Math.max(0,le.position.z-j.pos.z);xe=le.position.x,$e=le.position.y+3+Math.min(8,dt*.02),ct=le.position.z-6}c.position.x=hn(c.position.x,oe,3.2,k),c.position.y=hn(c.position.y,Ee,3.2,k),c.position.z=hn(c.position.z,Re,3.2,k),c.lookAt(xe,$e,ct);return}if(j.seated){let oe=e.ship.x+2,Ee=w.shipY+8,Re=e.ship.z+22;c.position.x=hn(c.position.x,oe,3,k),c.position.y=hn(c.position.y,Ee,3,k),c.position.z=hn(c.position.z,Re,3,k),c.lookAt(e.ship.x,w.shipY+2.2,e.ship.z-36);return}if(Fe){let oe=ne.mouse?t.mouseSens:t.lookSens;st.yaw+=ne.lookDx*oe,st.pitch=Math.max(t.minPitch,Math.min(t.maxPitch,st.pitch+ne.lookDy*oe)),st.autoWait=t.autoFollowDelay}else st.autoWait>0?st.autoWait-=k:(Math.hypot(j.vel.x,j.vel.z)>1.15&&(st.yaw=$_(st.yaw,Math.atan2(j.vel.x,j.vel.z),t.autoYaw,k)),st.pitch=hn(st.pitch,t.defaultPitch,t.autoPitch,k));let M=st.portrait?t.camDistPortrait:t.camDist,U=M*Math.cos(st.pitch),T=M*Math.sin(st.pitch),A=j.pos.x+Math.sin(st.yaw)*U,I=j.pos.y+T+.35,Y=j.pos.z-Math.cos(st.yaw)*U,ee=w.phase==="countdown"?1:0;I+=ee*2.2,Y-=ee*2.4;let pe=(w.shake||0)*.18;pe>.01&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(A+=(Math.random()-.5)*pe,I+=(Math.random()-.5)*pe*.5),c.position.x=hn(c.position.x,A,t.camLerp,k),c.position.y=hn(c.position.y,I,t.camLerp,k),c.position.z=hn(c.position.z,Y,t.camLerp,k),c.lookAt(j.pos.x,j.pos.y+1.15,j.pos.z+Math.cos(st.yaw)*1.4)}function Bi(){gn=!1;for(let w of e.chunks)w.spawned=!1,w.dirty=!0,w.fallY=0,w.mesh&&(w.mesh.visible=!w.gap,w.mesh.position.y=0,w.mesh.material=E);for(let w of Pe)w.active=!1,w.mesh.visible=!1;for(let w of Tt)w.alive=!1,w.mesh.visible=!1;for(let w=0;w<ve.length;w++){let k=ve[w];k.docked&&(be.add(k.group),k.group.scale.setScalar(1),k.group.rotation.set(0,0,0),k.shadow.visible=!0,k.docked=!1)}for(let w=0;w<De.length;w++)Vs(w,null);le.position.y=e.ship.y,V.visible=!1,st.yaw=0,st.pitch=t.defaultPitch}function Rr(){s.render(a,c)}c.position.set(0,8,-10),c.lookAt(0,1,4),s.render(a,c);function ki(w,k){let ne=ve[0];if(ne){ne.model.traverse(j=>{if(!j.isMesh)return;let Fe=Array.isArray(j.material)?j.material:[j.material];for(let M of Fe)M&&M.name==="Buddy_Mint"&&M.color&&M.color.set(w)});for(let j of Object.keys(ne.accessories||{}))ne.accessories[j].visible=j===k}}return{resize:nn,update:Gs,reset:Bi,render:Rr,applyLook:ki,setDpr(w){r=w,nn()},get yaw(){return st.yaw},get canvas(){return i}}}function j_(){let i=document.createElement("canvas");i.width=128,i.height=64;let e=i.getContext("2d");e.fillStyle="#FFF6E5",Q_(e,4,8,120,48,16),e.fill(),e.fillStyle="#1E2440",e.font="700 32px Fredoka, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("YOU",64,34);let t=new Ds(i);return t.colorSpace=At,t}function Q_(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}var Df={ui_tap:"assets/audio/ui_tap.mp3",ui_confirm:"assets/audio/ui_confirm.mp3",jump:"assets/audio/sfx_jump.mp3",land:"assets/audio/sfx_land.mp3",bump:"assets/audio/sfx_bump_boing.mp3",tick:"assets/audio/sfx_countdown_tick.mp3",go:"assets/audio/sfx_countdown_go.mp3",crack:"assets/audio/sfx_ground_crack.mp3",seat:"assets/audio/sfx_seat_filled.mp3",last:"assets/audio/sfx_last_seat_alert.mp3",launch:"assets/audio/sfx_ship_launch.mp3",escaped:"assets/audio/jingle_escaped.mp3",missed:"assets/audio/jingle_missed.mp3",bed:"assets/audio/amb_planet_bed_loop.mp3",rumble:"assets/audio/amb_collapse_rumble_loop.mp3"};function Nf(){let i=window.AudioContext||window.webkitAudioContext,e=i?new i({latencyHint:"interactive"}):null,t={},n={},s,r,o,a,c,l=!1;e&&(s=e.createGain(),s.gain.value=1,s.connect(e.destination),r=e.createGain(),r.gain.value=0,r.connect(s),o=e.createGain(),o.gain.value=0,o.connect(s));async function h(m){if(!e)return;let d=Object.keys(Df),_=0;await Promise.all(d.map(async v=>{let P=await(await fetch(Df[v])).arrayBuffer();t[v]=await e.decodeAudioData(P.slice(0)),_++,m&&m(_/d.length)}))}function u(){if(!e)return;e.state==="suspended"&&e.resume();let m=e.createBuffer(1,1,22050),d=e.createBufferSource();d.buffer=m,d.connect(e.destination),d.start(0)}function f(m){!e||l||(l=!0,t.bed&&(a=e.createBufferSource(),a.buffer=t.bed,a.loop=!0,a.connect(r),a.start(0),r.gain.setTargetAtTime(m,e.currentTime,.4)),t.rumble&&(c=e.createBufferSource(),c.buffer=t.rumble,c.loop=!0,c.connect(o),c.start(0)))}function p(m){!o||!e||o.gain.setTargetAtTime(Math.max(0,Math.min(.5,m)),e.currentTime,.2)}function g(m){if(!e||!s)return;(m==="win"?[523,659,784,1046]:[440,349,262]).forEach((_,v)=>{let x=e.createOscillator(),P=e.createGain();x.type=m==="win"?"triangle":"sawtooth",x.frequency.value=_;let R=e.currentTime+v*.09;P.gain.setValueAtTime(1e-4,R),P.gain.exponentialRampToValueAtTime(m==="win"?.07:.05,R+.03),P.gain.exponentialRampToValueAtTime(1e-4,R+.32),x.connect(P),P.connect(s),x.start(R),x.stop(R+.34)})}function y(m,d=.5,_=.07){if(!e||!t[m])return;let v=e.currentTime;if(n[m]&&v-n[m]<_)return;n[m]=v;let x=e.createBufferSource(),P=e.createGain();P.gain.value=d,x.buffer=t[m],x.connect(P),P.connect(s),x.start(0)}return{load:h,unlock:u,startBeds:f,setRumble:p,play:y,flourish:g,get ctx(){return e}}}function Uf(i){let e=document.getElementById("stick"),t=document.getElementById("knob"),n=new Set,s=new Map,r=0,o=0,a=!1,c=!1,l=0,h=0,u=!1,f=54;function p(v){let x=v.target;if(x.closest&&x.closest("#jump"))return"jump";if(x.closest&&x.closest("#dive"))return"dive";if(x.closest&&x.closest("button, a"))return"ui";let P=window.innerWidth||1;return v.pointerType==="mouse"?"look":v.clientX<P*.46?"move":"look"}function g(v){if(v.target.closest&&v.target.closest("#title, #result"))return;let x=p(v);if(x!=="ui"){v.preventDefault();try{i.setPointerCapture?.(v.pointerId)}catch{}s.set(v.pointerId,{kind:x,x:v.clientX,y:v.clientY,ox:v.clientX,oy:v.clientY}),x==="jump"&&(a=!0),x==="dive"&&(c=!0),x==="move"&&d(v.clientX,v.clientY,v.clientX,v.clientY)}}function y(v){let x=s.get(v.pointerId);x&&(v.preventDefault(),x.kind==="look"&&(r+=v.clientX-x.x,o+=v.clientY-x.y,u=!0),x.kind==="move"&&d(x.ox,x.oy,v.clientX,v.clientY),x.x=v.clientX,x.y=v.clientY)}function m(v){let x=s.get(v.pointerId);s.delete(v.pointerId),x&&x.kind==="move"&&([...s.values()].some(R=>R.kind==="move")||(l=0,h=0,t.style.transform="translate(-50%, -50%)")),x&&x.kind==="look"&&![...s.values()].some(P=>P.kind==="look")&&(u=!1)}function d(v,x,P,R){let L=P-v,N=R-x,E=Math.hypot(L,N)||1,S=Math.min(E,f);L=L/E*S,N=N/E*S,l=L/f,h=-N/f,t.style.transform=`translate(calc(-50% + ${L}px), calc(-50% + ${N}px))`}i.addEventListener("pointerdown",g),i.addEventListener("pointermove",y),i.addEventListener("pointerup",m),i.addEventListener("pointercancel",m),window.addEventListener("keydown",v=>{({KeyW:1,KeyA:1,KeyS:1,KeyD:1,ArrowUp:1,ArrowDown:1,ArrowLeft:1,ArrowRight:1,Space:1,ShiftLeft:1,ShiftRight:1})[v.code]&&v.preventDefault(),!v.repeat&&(n.add(v.code),v.code==="Space"&&(a=!0),(v.code==="ShiftLeft"||v.code==="ShiftRight")&&(c=!0))}),window.addEventListener("keyup",v=>n.delete(v.code)),window.addEventListener("blur",()=>n.clear());function _(){let v=0,x=0;(n.has("KeyA")||n.has("ArrowLeft"))&&(v-=1),(n.has("KeyD")||n.has("ArrowRight"))&&(v+=1),(n.has("KeyW")||n.has("ArrowUp"))&&(x+=1),(n.has("KeyS")||n.has("ArrowDown"))&&(x-=1);let P=l+v,R=h+x,L=Math.hypot(P,R);L>1&&(P/=L,R/=L);let N=(s.size&&[...s.values()].some(S=>S.kind==="look"&&s.values()),1),E={stickX:P,stickY:R,lookDx:r*(n.size?1:N),lookDy:o,looking:u,mouse:[...s.values()].some(S=>S.kind==="look"),jump:a,dive:c};return r=0,o=0,a=!1,c=!1,E}return{read:_}}function Ff(i,e,t){let n=-Math.sin(i),s=Math.cos(i),r=-Math.cos(i),o=-Math.sin(i);return{x:r*e+n*t,z:o*e+s*t}}var na=new URLSearchParams(location.search),tn=mh({quick:na.has("quick"),auto:na.has("auto"),seed:Number(na.get("seed"))||Date.now()%1e5}),ey=document.getElementById("app"),ty=document.getElementById("view"),Wf=document.getElementById("title"),zi=document.getElementById("play"),Xf=document.getElementById("lobby"),ny=document.getElementById("start"),Of=document.getElementById("colors"),zf=document.getElementById("gear"),ca=document.getElementById("tutor"),Bf=document.getElementById("place"),th=document.getElementById("coins"),uh=document.getElementById("hud"),wr=document.getElementById("controls"),Yf=document.getElementById("countdown"),Hs=document.getElementById("count-num"),iy=document.getElementById("count-label"),nh=document.getElementById("timer"),sy=document.getElementById("progress"),fh=document.getElementById("seats"),kf=document.getElementById("seats-label"),qf=document.getElementById("last-banner"),ch=document.getElementById("zone"),lh=document.getElementById("toast"),Er=document.getElementById("result"),ry=document.getElementById("result-kicker"),oy=document.getElementById("result-title"),Hf=document.getElementById("result-sub"),ih=document.getElementById("result-time"),hh=document.getElementById("again"),ay=document.getElementById("danger"),ot=Nf(),cy=Uf(ey),sh="space-buddies-best",ia,ze,Bt,ua=!1,la=!1,fa=!1,sa=0,Sr=0,ra=0,gi={x:0,z:0},Vf=!1,ly=["classic","heli","goggles","stars","flower","scarf","fish","crown"],hy=["Classic","Sunny","Goggles","Stars","Flower","Scarf","Fish","Crown"],Tr=Vi[0],dh="classic",oa=0,ha=0,rh=0;var aa=0,ea=1/60,ta=0,oh=0;for(let i=0;i<8;i++){let e=document.createElement("i");e.className="seat",fh.appendChild(e)}function uy(){return ia=_h(tn),ze=pa(ia,tn,tn.seed),tn.auto&&(ze.player.useAI=!0),Lf(ty,ia,tn,()=>{})}var fy=uy().then(i=>{Bt=i,Bt.resize()}),dy=ot.load();Promise.all([fy,dy]).then(()=>{ua=!0,zi.textContent="TAP TO PLAY",zi.disabled=!1,fa&&da()}).catch(i=>{console.error(i),zi.textContent="COULD NOT LOAD"});function da(){if(!la){if(!ua){fa=!0,zi.textContent="LOADING";return}la=!0,ot.startBeds(tn.bedGain),ot.play("ui_confirm",.55,0),Wf.classList.add("hide"),Xf.hidden=!0,ze.player.color=Tr,Bt.applyLook&&Bt.applyLook(Tr,dh),Sr=tn.auto?.2:3.3,uh.hidden=!1,wr.hidden=!0,ca.hidden=!0,window.__sb={race:ze,cfg:tn,get fps(){return aa}}}}function py(){if(ot.unlock(),!ua){fa=!0,zi.textContent="LOADING";return}if(tn.auto){da();return}Wf.classList.add("hide"),Xf.hidden=!1,ot.play("ui_tap",.4,0)}zi.addEventListener("pointerdown",i=>{i.preventDefault(),py()});zi.addEventListener("click",i=>{i.preventDefault(),ot.unlock(),fa&&ua&&da()});ny.addEventListener("pointerdown",i=>{i.preventDefault(),ot.unlock(),da()});Vi.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="swatch"+(e===0?" on":""),t.style.background=i,t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),Tr=i,Of.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),ot.play("ui_tap",.35,.02)}),Of.appendChild(t)});ly.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="gear"+(e===0?" on":""),t.textContent=hy[e],t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),dh=i,zf.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),ot.play("ui_tap",.35,.02)}),zf.appendChild(t)});hh.addEventListener("pointerdown",i=>{i.preventDefault(),ot.unlock(),ot.play("ui_confirm",.5,0),my()});function my(){let i=ze.seed+1+Math.floor(Math.random()*50)>>>0;bh(ze,i),gi.x=0,gi.z=0,tn.auto&&(ze.player.useAI=!0),ze.player.color=Tr,Bt.applyLook&&Bt.applyLook(Tr,dh),Bt.reset(),Er.hidden=!0,Er.classList.remove("show"),Yf.hidden=!1,wr.hidden=!1,qf.hidden=!0,uh.classList.remove("last")}function br(i){let e=Math.max(0,Math.ceil(i)),t=Math.floor(e/60),n=e%60;return t+":"+String(n).padStart(2,"0")}function Gf(i){lh.textContent=i,lh.hidden=!1,sa=1.5}function gy(i){ch.textContent=i,ch.hidden=!1,oa=1.7}var ah=!1;function xy(i){let e=ze.phase==="countdown"?tn.raceSeconds:Math.max(0,tn.raceSeconds-ze.time),t=br(e);nh.textContent!==t&&(nh.textContent=t),nh.classList.toggle("low",ze.phase==="race"&&e<=15);let n=0;for(let d of ze.racers)d!==ze.player&&!d.seated&&d.pos.z>ze.player.pos.z+.4&&n++;let s=n+1,o=s+(s===1?"ST":s===2?"ND":s===3?"RD":"TH");Bf.textContent!==o&&(Bf.textContent=o);let a=(ze.coins||0)+" COINS";th&&th.textContent!==a&&(th.textContent=a);let c=ze.phase==="race"&&ze.zoneId==="meadow"&&ze.time<8&&!tn.auto;ca.hidden=!c,c&&(ca.textContent=ze.time<2.6?"DRAG THE LEFT SIDE TO RUN":ze.time<5.2?"DRAG THE RIGHT SIDE TO LOOK":"JUMP AND DIVE");let l=Math.max(0,Math.min(1,ze.player.pos.z/ia.ship.z));sy.style.transform="scaleX("+l.toFixed(3)+")";let h=fh.children;for(let d=0;d<8;d++){let _=ze.seats[d],v=h[d];_==null?(v.style.background="#FFF6E5",v.classList.toggle("open",ze.seatsFilled===7)):(v.style.background=ze.racers[_].color,v.classList.remove("open"))}let u="SEATS "+ze.seatsFilled+"/8";kf.textContent!==u&&(kf.textContent=u);let f=ze.seatsFilled===7&&ze.phase==="race";qf.hidden=!f,uh.classList.toggle("last",f);let p=ze.phase==="countdown"||ze.phase==="race"&&ze.time<.45;if(Yf.hidden=!p,p){let d=ze.phase==="race"?0:ze.countCue,_=d>0?String(d):"GO";Hs.textContent!==_&&(Hs.textContent=_,Hs.classList.remove("pop"),Hs.offsetWidth,Hs.classList.add("pop")),iy.textContent=d>0?"GET READY":"GO",Hs.style.color=d>0?"#FF6B6B":"#FFD23F"}let g=ze.player.pos.z-ze.collapseZ,y=ze.phase==="race"?Math.max(0,Math.min(1,1-g/22)):0;ay.style.opacity=String(y),sa>0&&(sa-=i,sa<=0&&(lh.hidden=!0)),oa>0&&(oa-=i,oa<=0&&(ch.hidden=!0));let m=ze.phase==="results";if(wr.hidden=m||!la,m&&!ah){ah=!0;let d=ze.result==="escaped";if(Er.hidden=!1,Er.classList.add("show"),Er.classList.toggle("miss",!d),ry.textContent="SPACE BUDDIES",oy.textContent=d?"YOU ESCAPED!":"MISSED THE SHIP!",d){Hf.textContent="SEAT "+(ze.player.seatIndex+1)+" OF 8",hh.textContent="PLAY AGAIN";let _=ze.time*1e3,v=!1;try{let x=Number(localStorage.getItem(sh)||0);(!x||_<x)&&(localStorage.setItem(sh,String(Math.round(_))),v=!0);let P=Number(localStorage.getItem(sh)||_);ih.textContent="TIME "+br(ze.time)+" \xB7 "+(ze.coins||0)+" COINS"+(v?". NEW BEST.":". BEST "+br(P/1e3)+".")}catch{ih.textContent="TIME "+br(ze.time)+" \xB7 "+(ze.coins||0)+" COINS"}}else Hf.textContent="SO CLOSE",hh.textContent="TRY AGAIN",ih.textContent="TIME "+br(ze.time)+" \xB7 "+(ze.coins||0)+" COINS"}m||(ah=!1)}function _y(){let i=!1;for(let e of ze.events)if(e.t==="tick")ot.play("tick",.55,.05);else if(e.t==="go")ot.play("go",.6,.05);else if(e.t==="jump"&&e.id===0)ot.play("jump",.4,.05);else if(e.t==="coin")ot.play("jump",.32,.04);else if(e.t==="land"&&e.id===0&&e.impact>3)ot.play("land",.35,.08);else if(e.t==="bump")ot.play("bump",e.id===0?.5:.22,.06),e.id===0&&e.big&&(ra=.08);else if(e.t==="dive"&&e.id===0)ot.play("jump",.28,.04);else if(e.t==="crack")i=!0;else if(e.t==="seat"){ot.play("seat",.5,.02);let t=fh.children[e.seat];t&&(t.classList.add("pop"),setTimeout(()=>t.classList.remove("pop"),400)),e.id===0&&Gf("SEAT "+(e.seat+1)+" LOCKED")}else e.t==="lastseat"?ot.play("last",.7,.2):e.t==="launch"?ot.play("launch",.65,.2):e.t==="escaped"?(ot.play("escaped",.7,.2),ot.flourish&&ot.flourish("win")):e.t==="missed"?(ot.play("missed",.65,.2),ot.flourish&&ot.flourish("miss")):e.t==="checkpoint"&&e.name&&e.name!=="START"?Gf("CHECKPOINT"):e.t==="zone"?gy(e.name):e.t==="geyser"&&ot.play("bump",e.id===0?.4:.18,.08);i&&ha<=0&&(ot.play("crack",.32,.12),ha=.34),ze.events.length=0}function Oi(i){requestAnimationFrame(Oi);let e=Math.min(.1,oh?(i-oh)/1e3:ea);if(oh=i,document.hidden||(rh++,Oi.lastWall||(Oi.lastWall=i),i-Oi.lastWall>=500&&(aa=rh/((i-Oi.lastWall)/1e3),rh=0,Oi.lastWall=i),!Bt))return;if(!la){Bt.render();return}if(Sr>0){Sr-=e,Bt.update(ze,e,{intro:Sr,lookDx:0,lookDy:0,looking:!1}),Bt.render(),ca.hidden=!0,wr.hidden=!0,Sr<=0&&(wr.hidden=!1);return}let t=cy.read(),n=Ff(Bt.yaw,t.stickX,t.stickY),s=1-Math.exp(-16*e);gi.x+=(n.x-gi.x)*s,gi.z+=(n.z-gi.z)*s;let r={x:gi.x,z:gi.z,jump:t.jump,dive:t.dive};ze.phase!=="race"&&(r={x:0,z:0,jump:!1,dive:!1}),ra>0?ra-=e:ta+=e;let o=0;for(;ra<=0&&ta>=ea&&o<8;){try{wh(ze,ea,o===0?r:{x:r.x,z:r.z,jump:!1,dive:!1})}catch(l){console.error(l),ta=0;break}ta-=ea,o++}ha=Math.max(0,ha-e),_y();let a=ze.player.pos.z-ze.collapseZ,c=ze.phase==="race"?Math.max(0,Math.min(1,1-a/36)):ze.phase==="launch"?.4:0;ot.setRumble(c*tn.rumbleMax),!Vf&&!na.get("dpr")&&aa>0&&aa<24&&ze.time>5&&Bt.setDpr&&(Vf=!0,Bt.setDpr(1)),window.__sbOverview&&(t.overview=window.__sbOverview),Bt.update(ze,e,t),Bt.render(),xy(e)}window.addEventListener("resize",()=>Bt&&Bt.resize());document.addEventListener("visibilitychange",()=>{document.hidden&&ot.ctx?ot.ctx.suspend():ot.ctx&&ot.ctx.resume()});requestAnimationFrame(Oi);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
