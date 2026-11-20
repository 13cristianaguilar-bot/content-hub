(()=>{var us=["#5FE3B0","#FFD23F","#FF8FD1","#8C6BFF","#5CC8FF","#7FD88A","#C9B6E8","#FFC38A","#4C6FFF","#2EC4B6","#FF5FA2","#C6E05A","#9BB6FF","#F0B429","#FF8A7A","#7AD0FF"],cp={raceSeconds:180,countdownBeats:3,goHold:.65,racers:16,seats:8,collapseDelay:6,collapseArrive:168,crackTime:1.05,crackJitter:.7,fallTime:1.2,skirtLead:22,fragileCrack:.62,accel:62,airAccel:58,maxSpeed:8.4,playerSpeed:1,friction:36,iceAccel:14,iceFriction:5,gravity:29,fallGravityMul:1.48,jumpVel:10.15,coyoteTime:.22,jumpBuffer:.2,ungroundTime:.1,maxFallSpeed:28,bodyRadius:.44,stepUp:.55,voidY:-16,bumpPush:7.4,bumpUp:3.6,bumpCooldown:.32,diveDashSpeed:12.4,diveDashTime:.28,diveFall:26,diveCooldown:.55,slideHeight:.55,poundRadius:2.15,poundPush:7.5,poundUp:4.6,padUp:13.2,padForward:7.2,padRadius:2.35,padCooldown:.28,bumperPush:11,bumperUp:5.2,bumperRadius:1.05,bumperCooldown:.36,spinnerLength:1.62,spinnerPush:9.5,spinnerUp:4.2,spinnerHit:.58,spinnerMinY:.55,spinnerMaxY:1.45,spinnerCooldown:.45,lavaRadius:1.35,lavaHop:6.5,lavaStartY:-3.4,lavaRisePerSec:.022,platformRadius:2.15,platformTop:.28,stunTime:.72,knockCooldown:.55,windPush:3.6,boardHalfX:4.2,boardZMin:-8.5,boardZMax:-.4,botSpeeds:[1.05,1.02,.99,.97,.95,.93,.9,.88,.85,.82,.78,.74,.7,.66,.62],camDist:8.4,camDistPortrait:7.6,defaultPitch:.62,minPitch:.28,maxPitch:1.12,lookSens:.0052,mouseSens:.0042,autoFollowDelay:.85,autoYaw:2.6,autoPitch:1.5,camLerp:7.5,fovPortrait:64,fovLandscape:50,shipScale:1.7,seatBuddyScale:.44,dprCap:1.25,fogNear:42,fogFar:125,bedGain:.15,rumbleMax:.32};function du(i={}){let e={...cp,quick:!!i.quick,auto:!!i.auto,seed:i.seed||1};return i.quick&&(e.raceSeconds=46,e.collapseArrive=42,e.collapseDelay=2.5,e.playerSpeed=1.12,e.botSpeeds=e.botSpeeds.map(t=>t*.9),e.lavaRisePerSec=.08),e}var no={meadow:[.38,.8,.36],canyon:[.18,.12,.13],sky:[.35,.78,1],ice:[.72,.94,1],climb:[1,.55,.18],ship:[.95,.86,.62]};function fs(i,e,t){return i+(e-i)*t}function lp(i){return[{id:"meadow",name:"MEADOW",z0:0,z1:i*.16},{id:"canyon",name:"LAVA CANYON",z0:i*.16,z1:i*.38},{id:"sky",name:"SKY ISLANDS",z0:i*.38,z1:i*.58},{id:"ice",name:"ICE SLIDE",z0:i*.58,z1:i*.74},{id:"climb",name:"THE CLIMB",z0:i*.74,z1:i*.9},{id:"ship",name:"ESCAPE SHIP",z0:i*.9,z1:i}]}function pu(i,e){let t=i[0].id;for(let n of i)e>=n.z0&&(t=n.id);return t}function hp(i,e,t,n,s,r,o){let a=no[r]||no.meadow,c=3,l=18,h=[],u=[],f=[],p=l+1;for(let g=0;g<=c;g++){let x=g/c,m=x>.78?(x-.78)*(x-.78)*10:0;for(let d=0;d<=l;d++){let b=d/l*Math.PI*2,v=1+Math.sin(b*3+i*.2+t*.05)*.07;h.push(i+Math.cos(b)*n*x*v,e-m,t+Math.sin(b)*s*x*v);let y=r==="canyon"&&Math.abs(Math.sin(b*5+g*2.2+i))>.82,T=o&&x>.72;if(y)u.push(1,.42,.06);else if(T)u.push(.15,.35,.75);else if(o)u.push(.85,.97,1);else if(r==="canyon")x>.62?u.push(.42,.16,.09):u.push(.98,.91,.72);else if(r==="meadow"){let S=i+Math.cos(b)*n*x,A=t+Math.sin(b)*s*x,I=S-i,E=A-t,M=.5+.5*Math.sin(S*.47+A*.29),L=Math.abs(I)<5.4&&E<3||I<-6&&I>-18&&E>-10&&E<16||I>5&&I<17&&E>-8&&E<18;x>.8?u.push(.42,.26,.14):L?u.push(.38+M*.06,.26+M*.04,.12):u.push(.1+M*.1,.55+M*.22,.12+M*.05)}else if(r==="ice")u.push(.62,.9,1);else{let S=x>.7?.42:1-x*.08;u.push(a[0]*S,a[1]*S,a[2]*S)}}}for(let g=0;g<c;g++)for(let x=0;x<l;x++){let m=g*p+x,d=m+p;f.push(m,d,m+1,m+1,d,d+1)}return{positions:new Float32Array(h),colors:new Float32Array(u),indices:new Uint16Array(f)}}function up(i,e,t,n,s,r,o,a){let c=no[a]||no.meadow,l=10,h=[],u=[],f=[],p=t-i,g=n-e,x=Math.hypot(p,g)||1,m=-g/x,d=p/x;for(let b=0;b<=l;b++){let v=b/l,y=fs(i,t,v),T=fs(e,n,v),S=Math.sin(v*Math.PI)*.4;for(let A=-1;A<=1;A+=2){let I=(o*.5+S)*A;if(h.push(y+m*I,fs(s,r,v),T+d*I),a==="canyon"){let E=Math.abs(Math.sin(v*7+A*3))>.92;u.push(E?.55:.98,E?.22:.9,E?.1:.7)}else if(a==="meadow"){let E=.5+.5*Math.sin(y*.4+T*.3);u.push(.45+E*.08,.34+E*.05,.16)}else u.push(c[0],c[1],c[2])}}for(let b=0;b<l;b++){let v=b*2;f.push(v,v+2,v+1,v+1,v+2,v+3)}return{positions:new Float32Array(h),colors:new Float32Array(u),indices:new Uint16Array(f)}}function mu(i,e,t,n,s){let r={index:i.length,z0:t,z1:n,zone:e,gap:!s,state:"solid",crackT:0,fallT:0,fallY:0,dirty:!0,fragile:!1,ice:e==="ice",jitter:i.length%7/7,tilt:0};return s&&Object.assign(r,s),i.push(r),r.index}function jn(i,e,t){let n=i.floors||[],s=null;for(let r=0;r<n.length;r++){let o=n[r],a=i.chunks[o.chunk];if(!a||a.state==="falling"||a.state==="gone")continue;let c=(e-o.x)/o.rx,l=(t-o.z)/o.rz,h=o.zone==="meadow"?1.08:1;c*c+l*l>h||(!s||o.y>=s.y)&&(s={y:o.y,x:o.x,z:t,ice:o.zone==="ice",conveyX:o.conveyX||0,zone:o.zone,chunk:a,state:a.state,fragile:!!a.fragile})}if(!s){let r=null,o=1e9;for(let a=0;a<n.length;a++){let c=n[a],l=i.chunks[c.chunk];if(!l||l.state==="falling"||l.state==="gone")continue;let h=e-c.x,u=t-c.z,f=Math.hypot(h,u),p=Math.max(c.rx,c.rz)+(c.zone==="meadow"?8:3.6);f<p&&f<o&&(o=f,r=c)}if(r){let a=i.chunks[r.chunk];s={y:r.y,x:r.x,z:t,ice:r.zone==="ice",conveyX:r.conveyX||0,zone:r.zone,chunk:a,state:a.state,fragile:!!a.fragile}}}if(!s&&i.islands)for(let r of i.islands){let o=e-r.x,a=t-r.z;o*o+a*a>r.r*r.r||(s={y:r.y,x:r.x,z:t,ice:!1,conveyX:0,zone:r.zone,chunk:null,state:"solid",fragile:!1})}return s}function gu(i){let t=!!i.quick?.42:1,n=le=>le*t,s=n(400),r=lp(s),o=[],a=[],c=i.seed||1,l=c>>>0,h=()=>(l=Math.imul(1664525,l)+1013904223>>>0,l/4294967296),u=Math.floor(h()*3);function f(le,ge,Re,Ce,rt,Ne,C){let w=mu(o,Ne,Re-rt,Re+rt,hp(le,ge,Re,Ce,rt,Ne,C&&C.hex)),q={x:le,y:ge,z:Re,rx:Ce,rz:rt,zone:Ne,chunk:w,conveyX:C&&C.conveyX};return a.push(q),C&&C.fragile&&(o[w].fragile=!0),q}function p(le,ge,Re,Ce,rt,Ne,C,w,q){let re=q&&q.gap,ae=mu(o,w,Math.min(ge,Ce),Math.max(ge,Ce),up(le,ge,Re,Ce,rt,Ne,C,w)),se=[],Oe=Math.hypot(Re-le,Ce-ge),ce=Math.max(4,Math.ceil(Oe/Math.max(2.2,C*.5)));for(let Me=0;Me<=ce;Me++){let tt=Me/ce;if(re&&Math.abs(tt-re)<.12)continue;let fe={x:fs(le,Re,tt),z:fs(ge,Ce,tt),y:fs(rt,Ne,tt),rx:C*.78,rz:C*.78,zone:w,chunk:ae,conveyX:q&&q.conveyX};a.push(fe),se.push(fe)}return se}f(0,0,n(40),24,24,"meadow"),f(0,2.6,n(40),1.8,1.8,"meadow"),f(-16,.2,n(28),7,7,"meadow"),f(16,.8,n(52),6,6,"meadow"),f(0,.2,n(92),16,14,"canyon"),p(0,n(78),-16,n(100),.15,.3,7,"canyon"),p(-16,n(100),-18,n(118),.3,.35,6.5,"canyon"),p(-18,n(118),-6,n(136),.35,.3,6.5,"canyon"),p(2,n(86),14,n(108),.2,1.6,5.5,"canyon"),p(14,n(108),16,n(126),1.6,2.6,5.2,"canyon"),p(0,n(96),6,n(112),.3,.45,4.2,"canyon"),p(6,n(114),-4,n(128),.45,.35,4.2,"canyon"),p(16,n(126),2,n(140),2.6,.4,5.5,"canyon",{gap:.48}),f(0,.25,n(148),16,12,"canyon"),f(0,4,n(178),12,11,"sky"),f(-16,4.4,n(196),7,6,"sky"),f(14,6.8,n(194),6,6,"sky"),f(0,5.6,n(210),6,5,"sky"),p(0,n(186),-14,n(196),4,4.4,5,"sky"),p(-14,n(200),0,n(214),4.4,5.6,4.6,"sky"),p(4,n(184),14,n(194),4.1,6.8,4.4,"sky"),p(12,n(200),2,n(214),6.8,5.6,4.2,"sky"),f(0,5.2,n(232),13,11,"sky"),p(-2,n(156),6,n(172),.35,4,6.6,"canyon"),p(2,n(62),10,n(80),.05,.2,7.2,"meadow"),p(0,n(240),-10,n(258),5.2,3.3,6.2,"sky"),p(4,n(236),12,n(264),5.2,3.3,6,"sky"),p(0,n(336),-3,n(352),6.2,8,5.8,"climb"),p(0,n(292),6,n(306),3.1,3,6.2,"ice"),p(6,n(304),4,n(318),3,3.4,5.4,"climb"),f(-14,3.2,n(268),8,8,"ice",{conveyX:5}),f(14,3.3,n(270),8,8,"ice",{conveyX:-5}),f(0,3.1,n(286),10,8,"ice");for(let le=-2;le<=2;le++)for(let ge=-3;ge<=3;ge++)(ge+le)%2===0&&h()<.15||f(-7+ge*2.5,3.15,n(268+le*2.4),1.25,1.25,"ice",{fragile:!0,hex:!0});f(0,3,n(312),12,10,"climb"),f(-14,4.4,n(326),6,6,"climb"),f(0,6.2,n(334),6,5,"climb"),f(14,7.6,n(324),6,6,"climb"),p(-2,n(318),-14,n(326),3,4.4,5,"climb"),p(-12,n(330),0,n(336),4.4,6.2,4.6,"climb"),p(2,n(316),14,n(324),3.1,7.6,4.4,"climb"),p(12,n(330),0,n(348),7.6,8,5,"climb"),f(0,8,n(360),14,12,"ship");let g=a[a.length-1],x={x:g.x,y:g.y,z:g.z+n(6)};function m(le){let ge=[];for(let[Re,Ce,rt,Ne]of le)ge.push({x:Ce,y:rt||0,z:n(Re),gap:!!Ne});return ge.push({x:x.x,y:x.y,z:x.z-4}),ge}let d=[-8,-4,0,4,8],b=d.map((le,ge)=>ge);for(let le=b.length-1;le>0;le--){let ge=Math.floor(h()*(le+1)),Re=b[le];b[le]=b[ge],b[ge]=Re}let v=2+c%2,y=new Set(b.slice(0,v)),T=d.map((le,ge)=>({x:le,y:.35,z:n(146),solid:y.has(ge)})),S=T.filter(le=>!le.solid).map(le=>le.x),A=le=>S[le%S.length],I=[m([[24,-6,0],[34,-16,.2],[50,-14,0],[64,2,0],[82,8,.2],[100,-14,.3],[118,-18,.35],[136,-8,.3],[146,A(0),.3,!0],[156,-2,.25],[168,4,2.4],[186,-6,4],[198,-14,4.4],[214,-2,5.6],[232,0,5.2],[258,-10,3.3],[270,-14,3.2],[286,-2,3.1],[306,4,3],[318,-4,3.2],[328,-12,4.4],[334,0,6.2],[350,0,8],[360,0,8]]),m([[26,4,0],[42,10,.2],[58,12,.6],[80,6,.2],[96,2,.3],[112,4,.4],[128,-4,.35],[146,A(1),.3,!0],[156,2,.25],[168,4,2.4],[186,2,4.1],[196,-12,4.4],[210,-2,5.6],[232,2,5.2],[250,-6,4.2],[262,-10,3.3],[272,-12,3.2],[286,-2,3.1],[312,0,3],[326,-10,4.4],[336,0,6.2],[348,-2,7.6],[360,0,8]]),m([[28,6,0],[44,12,.4],[52,14,.8],[70,12,.2],[90,8,.4],[108,14,1.6],[126,16,2.6],[141,3,.5],[146,A(2),.3,!0],[168,5,2.4],[184,8,4.6],[194,14,6.8],[208,6,6.2],[232,2,5.2],[248,8,4.4],[264,13,3.3],[274,14,3.3],[286,4,3.1],[304,6,3],[316,8,4.6],[324,14,7.6],[340,6,7.8],[352,0,8],[360,0,8]])],E=[];for(let le=0;le<=s;le+=8){let ge=pu(r,le);E.push({x:0,y:0,z:le,half:ge==="meadow"?16:12,zone:ge,gap:!1,chunk:0,ice:ge==="ice",conveyX:0,route:0,shelf:0,shelfH:0,guard:ge==="meadow"&&le<50*t})}let M=[];for(let le of a)if(!(le.rx<6))for(let ge=0;ge<6;ge++){let Re=h()*Math.PI*2;M.push({x:le.x+Math.cos(Re)*le.rx*.85,y:le.y,z:le.z+Math.sin(Re)*le.rz*.75,zone:le.zone,col:Math.cos(Re)>0?4:-4,row:Math.floor(le.z)})}let L=[],W=(le,ge,Re)=>L.push({x:ge,y:Re+1.15,z:n(le),got:!1}),X=I[2];for(let le=1;le<X.length-1;le+=2)W(X[le].z/t,X[le].x,X[le].y);W(52,14,.8),W(108,14,1.6),W(194,14,6.8),W(324,14,7.6),W(40,-10,.2);let J=[{x:0,y:1.2,z:n(40),r:2.3}];for(let le of T)le.solid&&J.push({x:le.x,y:le.y+1.2,z:le.z,r:1.35});J.push({x:-13.2,y:1.4,z:n(146),r:2.6}),J.push({x:13.2,y:1.4,z:n(146),r:2.6}),J.push({x:x.x,y:x.y,z:x.z,r:2.4,ship:!0});let K=(le,ge,Re)=>({x:ge,y:Re,z:n(le),zone:pu(r,n(le))}),Q=(le,ge,Re,Ce)=>Math.atan2(Re-le,Ce-ge),he=[K(30,12,0),K(48,-8,0),K(178,6,4),K(312,-6,3)],$=[{...K(32,0,0),face:Q(0,32,0,40)},{...K(40,0,2.6),face:Q(0,40,14,52)},{...K(100,8,.6),face:Q(8,100,14,108)},{...K(126,16,2.6),face:Q(16,126,2,140)},{...K(316,6,3.4),face:Q(6,316,14,324)}],xe=[{id:0,kind:"ferry",originX:0,originZ:n(204),x:0,z:n(204),prevX:0,prevZ:n(204),y:6.4,originY:6.4,amp:8,speed:.7,phase:h()*2,radius:2.8,axis:"x"},{id:1,kind:"spin",originX:-16,originZ:n(196),x:-16,z:n(196),prevX:-16,prevZ:n(196),y:4.7,originY:4.7,amp:0,speed:1.3,phase:0,radius:3.1,axis:"spin"},{id:2,kind:"seesaw",originX:0,originZ:n(278),x:0,z:n(278),prevX:0,prevZ:n(278),y:3.7,originY:3.7,amp:0,speed:0,phase:0,radius:3.6,axis:"seesaw",tilt:0,face:Math.PI/2},{id:3,kind:"seesaw",originX:0,originZ:n(338),x:0,z:n(338),prevX:0,prevZ:n(338),y:6.8,originY:6.8,amp:0,speed:0,phase:0,radius:3.4,axis:"seesaw",tilt:0,face:Math.PI/2},{id:4,kind:"seesaw",zone:"canyon",originX:11,originZ:n(156),x:11,z:n(156),prevX:11,prevZ:n(156),y:.85,originY:.85,amp:0,speed:0,phase:0,radius:3.3,axis:"seesaw",tilt:0,face:0}],be=[{...K(36,-8,.15),len:3.6,angle:h()*3,spin:1.5},{...K(148,-8,.4),len:3.2,angle:h()*2,spin:-1.35},{...K(210,0,5.7),len:2.8,angle:.4,spin:1.6},{...K(312,4,3.1),len:3.1,angle:1,spin:-1.4}],Fe=[K(104,3,.4),K(118,-2,.2)].map((le,ge)=>({...le,period:2.6+ge*.35,t:h()*2,hot:!1,wasHot:!1,warn:!1,radius:1.35})),$e=[{...K(44,0,1.15),originX:0,amp:6,speed:.85,halfLen:3.2,height:1.05,full:!1,radius:1.15,scale:1.7},{...K(108,-16,1.15),originX:-16,amp:4.5,speed:1.05,halfLen:2.6,height:1.05,full:!0,radius:1.05,scale:1.55},{...K(268,-14,4.15),originX:-14,amp:4,speed:1.1,halfLen:2.4,height:1,full:!1,radius:1,scale:1.45}],ht=[{...K(68,8,4.6),len:3.2,amp:1.05,speed:1.15,phase:h(),radius:.95},{...K(207,-7,9.2),len:3.4,amp:1.1,speed:1.25,phase:h(),radius:1},{...K(330,-6,8.4),len:3.1,amp:1,speed:1.2,phase:h()*2,radius:.9}],ne=[{...K(116,14,2.5),x0:10,x1:18,dir:1,speed:3.1,radius:1.15,rot:0},{...K(270,14,4.2),x0:8,x1:18,dir:-1,speed:2.6,radius:1.05,rot:0,snow:!0},{...K(324,14,8.5),x0:8,x1:18,dir:1,speed:2.8,radius:1.1,rot:0}],D=[{...K(152,6,.4),homeX:6,homeZ:n(152),homeY:.4,vy:0,hopping:!1,t:h(),period:1.7,dirx:1,dirz:0,radius:.95}],F=[{cx:0,cz:n(210),cy:9.2,x:0,y:9.2,z:n(210),ang:h()*6,span:7,radius:.95}],Y=[{z0:n(198),z1:n(216),x0:-10,x1:12,y0:4,y1:12,ax:1}],ue={z0:n(108),z1:n(128),x0:-7,x1:7},de={x:0,y:.08,z:n(118),r:7.5},De=[{x:0,z:n(40),zone:"meadow",r:26},{x:0,z:n(118),zone:"canyon",r:24},{x:0,z:n(204),zone:"sky",r:22},{x:0,z:n(274),zone:"ice",r:20},{x:0,z:n(332),zone:"climb",r:20}],Ye=[{kind:"mushroom",x:0,y:0,z:n(40)},{kind:"tower",x:0,y:5.6,z:n(210)}],Te=["meadow","canyon","sky","ice","climb"].map(le=>{let ge=r.find(Re=>Re.id===le);return{x:0,y:0,z:ge.z0+8,name:ge.name,row:0}}),je=[{x:0,y:0,z:n(22),row:0,col:0}];for(let le=1;le<16;le++){let ge=Math.floor((le-1)/5),Re=(le-1)%5;je.push({x:(Re-2)*2.1,y:0,z:n(26+ge*2.2),row:ge+1,col:Re})}return{len:s,stations:E,chunks:o,floors:a,tiles:M,islands:[],blockers:J,coins:L,zones:r,bumpers:he,spinners:be,pads:$,platforms:xe,pendulums:ht,sweepers:$e,geysers:Fe,rollers:ne,hoppers:D,flyers:F,winds:Y,lava:ue,crater:de,hubs:De,landmarks:Ye,doors:T,checkpoints:Te,waypoints:I[0],routes:I,openDoor:u,spawns:je,crateSpawns:[{x:-6,y:.4,z:n(34)},{x:7,y:.4,z:n(46)},{x:-12,y:.5,z:n(108)}],ship:x,endZ:x.z}}function fp(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function io(i,e,t){return Math.max(e,Math.min(t,i))}function Hi(i,e){return Math.hypot(i,e)}function Ka(i,e,t=1){let n=fp(t||1),s=i.spawns.slice(),r=s.find(h=>h.col===0&&h.row===s[0].row+3)||s[Math.min(8,s.length-1)],o=s.filter(h=>h!==r);for(let h=o.length-1;h>0;h--){let u=Math.floor(n()*(h+1)),f=o[h];o[h]=o[u],o[u]=f}let a=[];for(let h=0;h<e.racers;h++){let u=h===0?r:o[h-1]||r,f=h===0?e.playerSpeed:e.botSpeeds[Math.min(h-1,e.botSpeeds.length-1)];a.push({id:h,isPlayer:h===0,useAI:h!==0,color:us[h%us.length],pos:{x:u.x,y:u.y,z:u.z},lastSafe:{x:u.x,y:u.y,z:u.z},vel:{x:0,y:0,z:0},yaw:0,grounded:!0,platformId:null,coyote:e.coyoteTime,buffer:0,ungroundT:0,flail:0,invuln:.4,controlLock:0,sliding:0,squash:0,seated:!1,seatIndex:-1,eliminated:!1,cp:0,padCd:0,canGlide:0,qualified:!1,grabT:0,boost:0,bumpCd:0,spinCd:0,diveCd:0,knockCd:0,diving:!1,wasDiving:!1,dashX:0,dashZ:1,onIce:!1,emote:"idle",attached:!1,profile:{speed:f,skill:f>.96?.94:f>.86?.78:.5,mistake:h===0?0:f>.96?.012:f>.86?.035:.07,phase:n()*6},wait:h===0?0:(u.row||0)*.42+n()*.55,stumble:0,wp:0,routeId:h%3})}let c={cfg:e,course:i,racers:a,player:a[0],seed:t,rand:n,phase:"countdown",countClock:0,countCue:-1,time:0,collapseZ:i.zones[0].z0-16,collapseSpeed:1,seats:Array(e.seats).fill(null),seatsFilled:0,lastSeatEvent:!1,result:null,launchT:0,launchV:0,launchY:0,shipY:i.ship.y,events:[],platforms:i.platforms.map(h=>({...h})),spinners:i.spinners.map(h=>({...h})),geysers:i.geysers.map(h=>({...h})),rollers:i.rollers.map(h=>({...h})),hoppers:i.hoppers.map(h=>({...h})),flyers:i.flyers.map(h=>({...h})),pendulums:i.pendulums.map(h=>({...h,bobX:h.x,bobY:h.y-h.len,bobZ:h.z})),sweepers:i.sweepers.map(h=>({...h})),lavaY:e.lavaStartY,coins:0,crates:(i.crateSpawns||[]).map(h=>({x:h.x,y:h.y,z:h.z,vx:0,vz:0})),finishZ:null,shipRound:!1,qualifyN:0,qualCount:0,shake:0,activated:!1,zoneId:"meadow"},l=Math.max(30,i.ship.z-i.zones[0].z0);c.collapseSpeed=l/Math.max(8,e.collapseArrive-e.collapseDelay);for(let h of i.chunks)h.state="solid",h.crackT=0,h.fallT=0,h.fallY=0,h.dirty=!0,h.tilt=0,h.stepped=!1,h.spawned=!1;return c}function oo(i,e){for(let n of i.course.chunks)n.state="solid",n.crackT=0,n.fallT=0,n.fallY=0,n.dirty=!0,n.tilt=0,n.stepped=!1;let t=Ka(i.course,i.cfg,e||i.seed+17>>>0);return Object.assign(i,t),i}function bu(i){return i&&(i.state==="solid"||i.state==="cracking")}function xu(i,e,t){let n=Math.min(i,e);return!(t-n>1.2||n>t+1.6&&e>t+.5)}function dp(i,e,t){if(i.axis!=="seesaw")return i.y;let n=i.face||0,s=(e-i.x)*Math.cos(n)+(t-i.z)*Math.sin(n);return i.originY-s*Math.sin(i.tilt||0)}function pp(i,e,t,n,s){let r=null,o=i.platforms;for(let c=0;c<o.length;c++){let l=o[c],h=e-l.x,u=t-l.z;if(h*h+u*u>l.radius*l.radius)continue;let f=dp(l,e,t);xu(n,s,f)&&(!r||f>=r.y)&&(r={y:f,platformId:c,tile:null})}let a=jn(i.course,e,t);return a&&bu(a)&&xu(n,s,a.y)&&(!r||a.y>=r.y-.02)&&(r={y:a.y,platformId:null,tile:a}),r}function Za(i,e,t,n){let s=jn(i.course,e,t);if(s&&bu(s)&&Math.abs(s.y-n)<1.4)return!0;for(let r of i.platforms){let o=e-r.x,a=t-r.z;if(o*o+a*a<=r.radius*r.radius&&Math.abs(r.y-n)<1.6)return!0}return!1}function yu(i,e){for(let t of i.course.winds)if(e.pos.z>=t.z0&&e.pos.z<=t.z1&&e.pos.x>=t.x0&&e.pos.x<=t.x1&&e.pos.y>=t.y0&&e.pos.y<=t.y1)return t;return null}function ds(i,e,t,n,s){e.seated||e.eliminated||e.invuln>0||e.knockCd>0||e.lockImmune>0||(e.vel.x+=t,e.vel.z+=n,e.vel.y=Math.max(e.vel.y,s),e.grounded=!1,e.platformId=null,e.ungroundT=Math.max(e.ungroundT,.08),e.flail=Math.min(1.4,Math.max(e.flail,i.cfg.stunTime)),e.controlLock=Math.min(1.4,Math.max(e.controlLock,i.cfg.stunTime)),e.knockCd=i.cfg.knockCooldown,e.sliding=0,i.events.push({t:"bump",id:e.id,big:!0}),e.isPlayer&&(i.shake=Math.max(i.shake,.72)))}function mp(i,e){if(i.lockImmune>0){i.lockImmune-=e,i.controlLock=0,i.grabT=0,i.flail>.12&&(i.flail=.12),i.lockAge=0;return}if(!(i.controlLock>.04||i.flail>.25||i.grabT>.25)){i.lockAge=0;return}i.lockAge=(i.lockAge||0)+e,!(i.lockAge<2)&&(i.controlLock=0,i.flail=0,i.grabT=0,i.sliding=0,i.lockAge=0,i.lockImmune=1.2)}function ro(i,e,t){let n=i.course.floors||[],s=null;for(let r=0;r<n.length;r++){let o=n[r],a=i.course.chunks[o.chunk];if(!a||a.state!=="solid"&&a.state!=="cracking")continue;let c=(e-o.x)/o.rx,l=(t-o.z)/o.rz,h=o.zone==="meadow"?1.08:.98;c*c+l*l>h||(!s||o.y>=s.y)&&(s={x:e,y:o.y,z:t})}return s}function gp(i,e){let t=e.lastSafe;if(t&&t.z>i.collapseZ+2){let c=ro(i,t.x,t.z);if(c)return c}let n=i.course.routes||[i.course.waypoints],s=null,r=1e9,o=Math.max(t&&t.z||e.pos.z||0,i.collapseZ+8);for(let c=0;c<n.length;c++){let l=n[c];for(let h=0;h<l.length;h++){let u=l[h];if(u.z<i.collapseZ+4)continue;let f=ro(i,u.x,u.z);if(!f)continue;let p=Math.abs(u.z-o)+(u.z>o+18?40:0);p<r&&(r=p,s=f)}}if(s)return s;let a=i.course.floors||[];for(let c=0;c<a.length;c++){let l=a[c],h=i.course.chunks[l.chunk];if(!(!h||h.state!=="solid"&&h.state!=="cracking")&&!(l.z<i.collapseZ+4))return{x:l.x,y:l.y,z:l.z}}return null}function so(i,e){let t=gp(i,e);t&&(e.pos.x=t.x,e.pos.y=t.y+.05,e.pos.z=t.z,e.vel.x=0,e.vel.y=0,e.vel.z=0,e.grounded=!0,e.platformId=null,e.flail=0,e.invuln=.85,e.controlLock=0,e.lockAge=0,e.airStuck=0,e.stallT=0,e.sliding=0,e.diving=!1,e.wasDiving=!1,e.lastSafe={x:t.x,y:t.y,z:t.z},e.markX=t.x,e.markZ=t.z,i.events.push({t:"respawn",id:e.id,fade:e.isPlayer}),e.isPlayer&&(i.shake=Math.max(i.shake,.3)))}function xp(i,e){let t=i.cfg;for(let n of i.racers){if(n===e||n.seated||n.invuln>0)continue;let s=n.pos.x-e.pos.x,r=n.pos.z-e.pos.z,o=Math.hypot(s,r);if(o<t.poundRadius&&Math.abs(n.pos.y-e.pos.y)<1.5){let a=o>.05?s/o:1,c=o>.05?r/o:0;n.vel.x+=a*t.poundPush,n.vel.z+=c*t.poundPush,n.vel.y=Math.max(n.vel.y,t.poundUp),n.grounded=!1,n.flail=.35,n.ungroundT=.06}}i.events.push({t:"bump",id:e.id,big:!0})}function bp(i,e){let t=i.course.blockers;if(!t)return;let n=i.course.ship;for(let s=0;s<t.length;s++){let r=t[s];if(Math.abs(e.pos.y-r.y)>2.2)continue;if(r.ship){let p=e.pos.z-n.z,g=Math.hypot(e.pos.x-r.x,e.pos.z-r.z);if(p<-.5&&p>-9&&g>r.r*.35)continue}let o=e.pos.x-r.x,a=e.pos.z-r.z,c=Math.hypot(o,a);if(c>=r.r||c<1e-4)continue;let l=o/c,h=a/c,u=r.r-c;e.pos.x+=l*u,e.pos.z+=h*u;let f=e.vel.x*l+e.vel.z*h;f<0&&(e.vel.x-=l*f,e.vel.z-=h*f)}}function yp(i,e,t,n,s,r,o){let a=Hi(e,t),c=r*Math.min(1,a),l=0,h=0;a>.001&&(l=e/a,h=t/a);let u=l*c+(o||0),f=h*c,p=u-i.vel.x,g=f-i.vel.z,x=Math.hypot(p,g),m=Math.min(x,s*n);x>1e-4&&(i.vel.x+=p/x*m,i.vel.z+=g/x*m)}function _p(i,e){let t=i.course.blockers;if(!t)return;let n=i.course.ship;for(let s=0;s<2;s++)for(let r=0;r<t.length;r++){let o=t[r];if(Math.abs(e.pos.y-o.y)>2.4)continue;let a=e.pos.x-o.x,c=e.pos.z-o.z,l=Math.hypot(a,c);if(l>=o.r)continue;if(o.ship&&n){let p=e.pos.z-n.z;if(p<-.2&&p>-9&&l>o.r*.35)continue}l<1e-4&&(a=1,c=.15,l=Math.hypot(a,c));let h=a/l,u=c/l,f=o.r-l+.06;e.pos.x+=h*f,e.pos.z+=u*f,e.vel.x*h+e.vel.z*u<0&&(e.vel.x+=h*2,e.vel.z+=u*2)}}function vp(i,e,t,n){let s=i.cfg;if(e.seated||e.eliminated)return;if(e.qualified){e.pos.z+=2.4*n,e.vel.x*=.8,e.vel.z=2.4;return}if(mp(e,n),e.controlLock>0&&(e.controlLock-=n,t={x:0,z:0,jump:!1,dive:!1}),e.invuln>0&&(e.invuln-=n),e.padCd>0&&(e.padCd-=n),e.bumpCd>0&&(e.bumpCd-=n),e.spinCd>0&&(e.spinCd-=n),e.diveCd>0&&(e.diveCd-=n),e.knockCd>0&&(e.knockCd-=n),e.flail>0&&(e.flail-=n),e.squash>0&&(e.squash=Math.max(0,e.squash-n*3.2)),e.grounded&&e.platformId!=null){let A=i.platforms[e.platformId];if(A){if(e.pos.x+=A.x-A.prevX,e.pos.z+=A.z-A.prevZ,A.axis==="spin"){let I=e.pos.x-A.x,E=e.pos.z-A.z;e.vel.x+=-E*A.speed*n*5.5,e.vel.z+=I*A.speed*n*5.5}else if(A.axis==="seesaw"){let I=A.face||0,E=Math.sin(A.tilt||0)*9*n;e.vel.x+=Math.cos(I)*E,e.vel.z+=Math.sin(I)*E}}}if(e.grounded?e.coyote=s.coyoteTime:e.coyote=Math.max(0,e.coyote-n),t.jump?e.buffer=s.jumpBuffer:e.buffer=Math.max(0,e.buffer-n),t.dive&&e.diveCd<=0){let A=Hi(t.x,t.z);A>.15?(e.dashX=t.x/A,e.dashZ=t.z/A):(e.dashX=Math.sin(e.yaw),e.dashZ=Math.cos(e.yaw)),e.grounded?(e.sliding=s.diveDashTime,e.diveCd=s.diveCooldown,i.events.push({t:"dive",id:e.id})):(e.vel.y=-s.diveFall,e.diving=!0,e.wasDiving=!0,e.diveCd=s.diveCooldown,e.grounded=!1,i.events.push({t:"dive",id:e.id}))}let r=yu(i,e),o=r?r.ax*s.windPush:0,a=e.controlLock>0?8:e.onIce?Hi(t.x,t.z)>.1?s.iceAccel:s.iceFriction:Hi(t.x,t.z)>.08?s.accel:s.friction,c=s.maxSpeed*(e.profile.speed||1);if(e.sliding>0)e.sliding-=n,e.vel.x=e.dashX*s.diveDashSpeed,e.vel.z=e.dashZ*s.diveDashSpeed,e.vel.x+=t.x*10*n,e.vel.z+=t.z*10*n;else if(e.grounded)yp(e,t.x,t.z,n,a,c,o),e.groundTile&&e.groundTile.conveyX&&(e.vel.x+=e.groundTile.conveyX*n);else{e.vel.x+=t.x*s.airAccel*n+o*n*.6,e.vel.z+=t.z*s.airAccel*n;let A=e.diving?s.diveDashSpeed:e.boost>0?s.padForward+c:c*1.18;e.boost>0&&(e.boost-=n);let I=Hi(e.vel.x,e.vel.z);I>A&&(e.vel.x*=A/I,e.vel.z*=A/I)}let l=!1;e.buffer>0&&e.ungroundT<=0&&(e.grounded||e.coyote>0)&&e.sliding<=0&&(e.vel.y=s.jumpVel,e.grounded=!1,e.platformId=null,e.coyote=0,e.buffer=0,e.ungroundT=s.ungroundTime,l=!0,i.events.push({t:"jump",id:e.id}));let h=s.gravity;e.vel.y<0&&(h*=s.fallGravityMul),e.vel.y-=h*n,e.vel.y<-s.maxFallSpeed&&(e.vel.y=-s.maxFallSpeed),e.vel.x=io(e.vel.x,-24,24),e.vel.z=io(e.vel.z,-24,24),e.ungroundT>0&&(e.ungroundT-=n),e.canGlide>0&&(e.canGlide-=n,!e.grounded&&t.holdJump&&e.vel.y<2&&(e.vel.y=Math.max(e.vel.y,-3.2),e.vel.y+=11*n,e.glided||(e.glided=!0,i.events.push({t:"glide",id:e.id})))),e.grounded&&(e.glided=!1),e.grabT>0&&(e.grabT-=n),t.grab&&e.grabT<=0&&(Rp(i,e),e.grabT=.4);let u=e.grounded,f=e.pos.x,p=e.pos.z,g=Math.hypot(e.vel.x,e.vel.z)*n,x=Math.max(1,Math.min(4,Math.ceil(g/.42))),m=n/x;for(let A=0;A<x;A++)e.pos.x+=e.vel.x*m,e.pos.z+=e.vel.z*m,bp(i,e);let d=e.pos.y+e.vel.y*n;if(e.ungroundT>0||l)e.pos.y=d,e.grounded=!1,e.platformId=null;else{let A=pp(i,e.pos.x,e.pos.z,e.pos.y,d);if(A&&e.vel.y<=.85){let I=-e.vel.y,E=!e.grounded;e.pos.y=A.y,e.vel.y=0,e.grounded=!0,e.platformId=A.platformId,e.groundTile=A.tile,e.onIce=!!(A.tile&&A.tile.ice),e.diving=!1,E&&I>2.4&&(e.squash=io(I/16,.12,1),i.events.push({t:"land",id:e.id,impact:I}),e.wasDiving&&I>8&&xp(i,e)),e.wasDiving=!1,A.tile&&!A.tile.fragile&&(e.lastSafe={x:A.tile.x,y:A.y,z:e.pos.z}),A.tile&&A.tile.chunk&&A.tile.state==="solid"&&A.tile.fragile&&!A.tile.chunk.stepped&&(A.tile.chunk.stepped=!0,A.tile.chunk.state="cracking",A.tile.chunk.crackT=s.fragileCrack,A.tile.chunk.dirty=!0,i.events.push({t:"crack"}))}else if(u&&e.pos.z<50&&e.vel.y<=.6&&ro(i,e.pos.x,e.pos.z)){let I=ro(i,e.pos.x,e.pos.z);e.pos.y=I.y,e.vel.y=0,e.grounded=!0,e.groundTile=I}else e.pos.y=d,e.grounded=!1,e.platformId=null,e.groundTile=null,e.onIce=!1}let b=i.course.checkpoints;for(;e.grounded&&e.cp<b.length-1&&e.pos.z>b[e.cp+1].z-1.5;)e.cp++,e.isPlayer&&i.events.push({t:"checkpoint",name:b[e.cp].name});let v=e.lastSafe?e.lastSafe.y-10:s.voidY;(e.pos.y<s.voidY||e.pos.y<v)&&so(i,e);let y=i.course.lava;e.pos.z>y.z0&&e.pos.z<y.z1&&e.pos.x>y.x0&&e.pos.x<y.x1&&e.pos.y<i.lavaY+.2&&!e.seated&&so(i,e),Hi(e.vel.x,e.vel.z)>.7&&e.sliding<=0?e.yaw=Math.atan2(e.vel.x,e.vel.z):e.sliding>0&&(e.yaw=Math.atan2(e.dashX,e.dashZ)),!e.grounded&&e.vel.y<-2&&e.flail<=0&&e.lockImmune<=0&&(e.flail=.2),e.grounded||Za(i,e.pos.x,e.pos.z,e.pos.y)?e.airStuck=0:e.airStuck=(e.airStuck||0)+n,e.airStuck>3&&(e.airStuck=0,so(i,e)),_p(i,e)}function Mp(i,e,t){let n={x:0,z:0,jump:!1,dive:!1};if(e.wait>0)return e.wait-=t,n;if(e.stumble>0)return e.stumble-=t,n;let s=e.profile;i.rand()<s.mistake*t&&(e.stumble=.18+i.rand()*.28);let r=i.course.routes,o=r&&r[e.routeId]||i.course.waypoints;for(;e.wp<o.length-1;){let T=o[e.wp],S=e.pos.x-T.x,A=e.pos.z-T.z;if(S*S+A*A>9)break;e.wp++}let a=o[Math.min(e.wp,o.length-1)],c=(e.id%5-2)*(e.pos.y>5.5?.4:.85),l=a.x+c;a.gap&&(l=a.x);for(let T of i.course.pads){let S=(T.x-a.x)**2+(T.z-a.z)**2<36,A=(T.x-e.pos.x)**2+(T.z-e.pos.z)**2<49;S&&A&&(l=T.x)}let h=a.z,u=a.y;if(a.z-e.pos.z>6){let T=null,S=1e9;for(let A of i.platforms){if(A.kind!=="ferry"||A.z<e.pos.z+.5||A.z>a.z+1)continue;let I=A.z-e.pos.z;I<S&&(S=I,T=A)}T&&(l=T.x,h=T.z,u=T.y)}let f=l-e.pos.x,p=h-e.pos.z;yu(i,e)&&(f-=2.4*s.skill);for(let T of i.spinners){let S=T.z-e.pos.z;S>-.2&&S<7&&Math.abs(T.x-e.pos.x)<2.2&&(f+=(e.pos.x>=T.x?1:-1)*3.2*s.skill)}for(let T of i.sweepers){let S=T.z-e.pos.z;S>.3&&S<6&&Math.abs(T.x-e.pos.x)<1.6&&(T.full&&s.skill>.4||(f+=(e.pos.x>=T.x?1:-1)*3*s.skill))}for(let T of i.geysers){if(!T.warn&&!T.hot)continue;let S=T.z-e.pos.z;S>-.5&&S<7&&Math.abs(T.x-e.pos.x)<2.4&&(f+=(e.pos.x>=T.x?1:-1)*4.2*s.skill)}for(let T of i.rollers)Math.abs(T.z-e.pos.z)<3&&Math.abs(T.x-e.pos.x)<3&&(p+=2.5,f+=(e.pos.x>=T.x?1:-1)*2);let g=Math.hypot(f,p)||1;f/=g,p/=g;let x=!1,m=e.pos.x+f*1.05,d=e.pos.z+p*1.05,b=Za(i,m,d,e.pos.y);e.grounded&&!b&&(Za(i,e.pos.x+f*3.2,e.pos.z+p*4.2,e.pos.y)||u>e.pos.y-.4?x=!0:p*=.15),e.grounded&&u>e.pos.y+.65&&Math.hypot(l-e.pos.x,h-e.pos.z)<3.2&&(x=!0);let v=!1;for(let T of i.course.pads){let S=T.z-e.pos.z;S>-.4&&S<8&&Math.abs(T.x-e.pos.x)<2.2&&(v=!0)}v&&(x=!1);for(let T of i.sweepers){if(!T.full)continue;let S=T.z-e.pos.z;e.grounded&&S>.6&&S<2.8&&(x=!0)}let y=!1;if(i.rand()<.45*t)for(let T of i.racers)T!==e&&!T.seated&&Math.hypot(T.pos.x-e.pos.x,T.pos.z-e.pos.z)<1.6&&(y=!0);return{x:f,z:p,jump:x,dive:!1,grab:y}}function Sp(i){let e=i.cfg,t=i.racers,n=e.bodyRadius*1.7;for(let s=0;s<t.length;s++){let r=t[s];if(!(r.seated||r.eliminated||r.qualified))for(let o=s+1;o<t.length;o++){let a=t[o];if(a.seated||a.eliminated||a.qualified)continue;let c=a.pos.x-r.pos.x,l=a.pos.z-r.pos.z;if(Math.abs(r.pos.y-a.pos.y)>1.3)continue;let u=Math.hypot(c,l);if(u<8e-4&&(c=s%2?1:-1,l=.35,u=Math.hypot(c,l)),u>=n)continue;let f=c/u,p=l/u,g=(n-u)*.35,x=r.isPlayer?r:a.isPlayer?a:null;if(x){let d=x===r?a:r,b=x===r?1:-1,v=Math.hypot(x.vel.x,x.vel.z)>1.2;d.pos.x+=f*b*g*1.8,d.pos.z+=p*b*g*1.8,v&&(x.pos.x-=f*b*g*.15,x.pos.z-=p*b*g*.15);let y=-p*b,T=f*b;d.vel.x+=y*2.2,d.vel.z+=T*2.2;continue}if(r.invuln<=0&&(r.pos.x-=f*g,r.pos.z-=p*g),a.invuln<=0&&(a.pos.x+=f*g,a.pos.z+=p*g),(r.vel.x-a.vel.x)*f+(r.vel.z-a.vel.z)*p>6&&r.bumpCd<=0&&a.bumpCd<=0&&r.invuln<=0&&a.invuln<=0){r.vel.x-=f*e.bumpPush*.45,r.vel.z-=p*e.bumpPush*.45,a.vel.x+=f*e.bumpPush*.45,a.vel.z+=p*e.bumpPush*.45,r.bumpCd=e.bumpCooldown,a.bumpCd=e.bumpCooldown;let d=r.isPlayer?r.id:a.isPlayer?a.id:r.id;i.events.push({t:"bump",id:d})}}}}function Ep(i,e){let t=i.cfg;for(let n of i.spinners)n.angle+=n.spin*e;for(let n of i.course.bumpers)for(let s of i.racers){if(s.seated||s.bumpCd>0||s.invuln>0)continue;let r=s.pos.x-n.x,o=s.pos.z-n.z,a=Math.hypot(r,o);if(a<t.bumperRadius+.2&&Math.abs(s.pos.y-n.y)<1.4){let c=a>.05?r/a:1,l=a>.05?o/a:0;s.vel.x=c*t.bumperPush,s.vel.z=l*t.bumperPush,s.vel.y=Math.max(s.vel.y,t.bumperUp),s.grounded=!1,s.ungroundT=.08,s.flail=.4,s.bumpCd=t.bumperCooldown,s.controlLock=Math.max(s.controlLock,.12),i.events.push({t:"bump",id:s.id,big:!0}),s.isPlayer&&(i.shake=Math.max(i.shake,.28))}}for(let n of i.spinners){let s=Math.cos(n.angle),r=Math.sin(n.angle),o=n.len||t.spinnerLength,a=s*o,c=r*o,l=n.x-a,h=n.z-c,u=n.x+a,f=n.z+c,p=u-l,g=f-h,x=p*p+g*g||1;for(let m of i.racers){if(m.seated||m.spinCd>0||m.invuln>0||m.sliding>0)continue;let d=m.pos.y-n.y;if(d<t.spinnerMinY||d>t.spinnerMaxY)continue;let b=((m.pos.x-l)*p+(m.pos.z-h)*g)/x;b=io(b,0,1);let v=l+p*b,y=h+g*b,T=m.pos.x-v,S=m.pos.z-y;if(T*T+S*S>t.spinnerHit*t.spinnerHit)continue;let A=-r,I=s,E=Math.sign((m.pos.x-n.x)*A+(m.pos.z-n.z)*I)||1;ds(i,m,A*E*t.spinnerPush,I*E*t.spinnerPush,t.spinnerUp),m.spinCd=t.spinnerCooldown}}for(let n of i.course.pads)for(let s of i.racers){if(s.seated||s.padCd>0)continue;let r=s.pos.x-n.x,o=s.pos.z-n.z;if(r*r+o*o>t.padRadius*t.padRadius)continue;let a=s.pos.y-n.y;if(a>1.35||a<-3.4)continue;let c=n.face!=null?n.face:Hi(s.vel.x,s.vel.z)>.4?Math.atan2(s.vel.x,s.vel.z):0;s.vel.y=t.padUp,s.vel.x=Math.sin(c)*t.padForward,s.vel.z=Math.cos(c)*t.padForward,s.grounded=!1,s.platformId=null,s.ungroundT=.12,s.padCd=t.padCooldown,s.boost=1.15,s.canGlide=2.4,s.glided=!1,n.pulse=.28,i.events.push({t:"jump",id:s.id,pad:!0})}for(let n of i.geysers){n.t+=e;let s=n.t%n.period;if(n.warn=s>n.period-.7&&s<n.period-.18,n.hot=s>=n.period-.18||s<.28,n.hot&&!n.wasHot)for(let r of i.racers){if(r.seated)continue;Math.hypot(r.pos.x-n.x,r.pos.z-n.z)<n.radius+.3&&Math.abs(r.pos.y-n.y)<1.3&&(r.vel.y=Math.max(r.vel.y,13),r.grounded=!1,r.ungroundT=.1,r.flail=.3,i.events.push({t:"geyser",id:r.id}),r.isPlayer&&(i.shake=Math.max(i.shake,.2)))}n.wasHot=n.hot}for(let n of i.sweepers){n.x=n.originX+Math.sin(i.time*n.speed+n.z)*n.amp;for(let s of i.racers){if(s.seated||s.invuln>0||s.knockCd>0||Math.abs(s.pos.z-n.z)>1.7||Math.abs(s.pos.x-n.x)>n.radius+.85)continue;let r=s.pos.y-(n.y-n.height),o=s.sliding>0?t.slideHeight:1.35;if(r>o||s.pos.y+.2<n.y-.35||s.sliding>0&&n.height>.8)continue;let a=Math.cos(i.time*n.speed+n.z)>=0?1:-1;ds(i,s,a*8,3.5,3.2)}}for(let n of i.pendulums){let s=(i.time*n.speed+n.phase)%(Math.PI*2),r=.72,o;s<r?o=1:o=Math.cos((s-r)/(Math.PI*2-r)*Math.PI*2);let a=o*n.amp;n.bobX=n.x+Math.sin(a)*n.len,n.bobY=n.y-Math.cos(a)*n.len,n.bobZ=n.z;let c=Math.cos(i.time*n.speed+n.phase);for(let l of i.racers){if(l.seated||l.invuln>0)continue;Math.hypot(l.pos.x-n.bobX,l.pos.z-n.bobZ)<n.radius+.35&&Math.abs(l.pos.y+.7-n.bobY)<1&&ds(i,l,c*9,2,3)}}}function wp(i,e){for(let t of i.rollers){t.x+=t.dir*t.speed*e,t.rot+=e*2.4,t.x>t.x1&&(t.dir=-1),t.x<t.x0&&(t.dir=1);for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+.35&&Math.abs(n.pos.y-t.y)<1.4){let r=s>.05?(n.pos.x-t.x)/s:t.dir;ds(i,n,r*10+t.dir*4,2,4.5)}}}for(let t of i.hoppers){if(t.t+=e,!t.hopping&&t.t>t.period){t.t=0,t.hopping=!0,t.vy=8;let n=t.homeX+Math.sin(i.time)*2.5,s=t.homeZ,r=12;for(let l of i.racers){if(l.seated)continue;let h=Math.hypot(l.pos.x-t.x,l.pos.z-t.z);h<r&&(r=h,n=l.pos.x,s=l.pos.z)}let o=n-t.x,a=s-t.z,c=Math.hypot(o,a)||1;t.dirx=o/c,t.dirz=a/c}if(t.hopping&&(t.vy-=18*e,t.y+=t.vy*e,t.x+=t.dirx*4.2*e,t.z+=t.dirz*4.2*e,t.y<=t.homeY)){t.y=t.homeY,t.hopping=!1;for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+.55&&Math.abs(n.pos.y-t.y)<1.3){let r=s>.05?(n.pos.x-t.x)/s:1;ds(i,n,r*9,3,5)}}}}for(let t of i.flyers){t.ang+=e*.85,t.x=t.cx+Math.sin(t.ang)*t.span,t.z=t.cz+Math.cos(t.ang)*t.span*.45,t.y=t.cy+Math.sin(t.ang*2)*.7;for(let n of i.racers){if(n.seated)continue;Math.hypot(n.pos.x-t.x,n.pos.z-t.z)<t.radius+.4&&Math.abs(n.pos.y+.8-t.y)<1.1&&ds(i,n,Math.cos(t.ang)*8,Math.sin(t.ang)*6,3.4)}}}function Tp(i,e){for(let t of i.platforms)if(t.prevX=t.x,t.prevZ=t.z,t.phase+=e*t.speed,t.axis==="x")t.x=t.originX+Math.sin(t.phase)*t.amp;else if(t.axis==="bob"||t.axis==="tilt")t.y=t.originY+Math.sin(t.phase)*t.amp;else if(t.axis==="seesaw"){let n=0,s=0,r=t.face||0;for(let a of i.racers){if(a.seated||a.eliminated||!a.grounded)continue;let c=a.pos.x-t.x,l=a.pos.z-t.z;if(c*c+l*l>t.radius*t.radius||Math.abs(a.pos.y-t.originY)>1.8)continue;let h=c*Math.cos(r)+l*Math.sin(r);n+=Math.max(-1,Math.min(1,h/(t.radius*.65))),s++}let o=s?n/s*.62:0;t.tilt=(t.tilt||0)+(o-(t.tilt||0))*Math.min(1,e*3.2),t.tilt=Math.max(-.5,Math.min(.5,t.tilt)),t.y=t.originY}}function Ap(i,e){let t=i.cfg;if(i.time<t.collapseDelay)return;let n=i.course.ship.z-18,s=1+Math.min(2.4,(i.time||0)/45);i.collapseZ+=i.collapseSpeed*s*e,i.collapseZ>n&&(i.collapseZ=n),i.lavaY=t.lavaStartY+i.time*t.lavaRisePerSec;let r=!1;for(let o of i.course.chunks)if(!(o.zone==="ship"||o.gap)){if(o.state==="solid")i.collapseZ>o.z0&&(o.state="cracking",o.crackT=t.crackTime+o.jitter*.35,o.dirty=!0,r=!0);else if(o.state==="cracking"){if(o.crackT-=e,o.dirty=!0,o.crackT<=0){o.state="falling",o.fallT=t.fallTime;let a=(o.z0+o.z1)*.5,c=i.player.pos.z-a;c*c<420&&(i.shake=Math.max(i.shake,.42))}}else o.state==="falling"&&(o.fallT-=e,o.fallY-=(7+o.jitter*6)*s*e,o.dirty=!0,o.fallT<=0&&(o.state="gone"));o.ice&&(o.tilt=Math.sin(i.time*1.35+o.jitter*8)*.22)}r&&i.events.push({t:"crack"})}function Rp(i,e){let t=null,n=2.1;for(let a of i.racers){if(a===e||a.seated||a.eliminated||a.qualified)continue;let c=Math.hypot(a.pos.x-e.pos.x,a.pos.z-e.pos.z);c<n&&Math.abs(a.pos.y-e.pos.y)<1.6&&(n=c,t=a)}if(t){let a=0;for(let l of i.racers)l!==e&&Math.hypot(l.pos.x-e.pos.x,l.pos.z-e.pos.z)<2.4&&a++;let c=a>=4;t.vel.x*=c?.85:.35,t.vel.z*=c?.85:.35,!c&&t.lockImmune<=0&&!t.isPlayer&&(t.controlLock=Math.min(.6,Math.max(t.controlLock,.25)),t.flail=Math.min(.6,Math.max(t.flail,.3))),t.pos.x+=(e.pos.x-t.pos.x)*.2,t.pos.z+=(e.pos.z-t.pos.z)*.2,i.events.push({t:"grab",id:e.id});return}let s=e.pos.x+Math.sin(e.yaw)*1.2,r=e.pos.z+Math.cos(e.yaw)*1.2,o=jn(i.course,s,r);if(o&&o.y>e.pos.y+.45&&o.y<e.pos.y+1.9){e.pos.x=s,e.pos.z=r,e.pos.y=o.y,e.vel.y=3.2,e.grounded=!0,i.events.push({t:"grab",id:e.id,ledge:!0});return}for(let a of i.crates||[])if(Math.hypot(a.x-e.pos.x,a.z-e.pos.z)<1.8&&Math.abs(a.y-e.pos.y)<2){a.x+=Math.sin(e.yaw)*1.1,a.z+=Math.cos(e.yaw)*1.1,a.vx+=Math.sin(e.yaw)*4,a.vz+=Math.cos(e.yaw)*4,i.events.push({t:"grab",id:e.id,prop:!0});return}}function Cp(i){for(let e of i.crates||[]){e.vx*=.9,e.vz*=.9,e.x+=e.vx*.016,e.z+=e.vz*.016;let t=jn(i.course,e.x,e.z);t&&(e.y=t.y+.45);for(let n of i.racers){if(n.seated||n.eliminated)continue;let s=e.x-n.pos.x,r=e.z-n.pos.z,o=Math.hypot(s,r);if(o>1.15||o<.001||Math.abs((e.y||0)-n.pos.y)>1.8)continue;let a=s/o,c=r/o;e.vx+=n.vel.x*.4+a*1.5,e.vz+=n.vel.z*.4+c*1.5,e.x+=a*(1.15-o),e.z+=c*(1.15-o)}}}function _u(i){i.phase="results",i.result="out",i.player.seated=!1,i.events.push({t:"eliminated"})}function Ip(i,e){if(e.pos.y<-6)return!1;let t=i.gate;if(t){let n=(e.pos.x-t.x)/(t.rx||8),s=(e.pos.z-t.z)/(t.rz||6);return n*n+s*s<=1&&Math.abs(e.pos.y-(t.y==null?e.pos.y:t.y))<2.6}return i.finishZ!=null&&e.pos.z>=i.finishZ&&Math.abs(e.pos.x)<16}function Pp(i){if(!(i.shipRound||i.phase!=="race")&&!(!i.gate&&i.finishZ==null)){for(let e of i.racers)e.qualified||e.eliminated||e.seated||Ip(i,e)&&(e.qualified=!0,i.qualCount++,i.events.push({t:"qualify",id:e.id}));i.qualifyN>0&&i.qualCount>=i.qualifyN&&(i.phase="results",i.result=i.player.qualified?"qualified":"out",i.player.qualified||(i.player.seated=!1),i.events.push({t:i.player.qualified?"roundwin":"eliminated"}))}}function Lp(i){if(!i.shipRound||i.seatsFilled>=i.cfg.seats)return;let e=i.course.ship,t=i.cfg,n=[];for(let s of i.racers){if(s.seated||s.eliminated||!s.grounded)continue;let r=s.pos.x-e.x,o=s.pos.z-e.z;Math.abs(r)<t.boardHalfX&&o<t.boardZMax&&o>t.boardZMin&&Math.abs(s.pos.y-e.y)<1.8&&n.push({r:s,d:r*r+o*o})}n.sort((s,r)=>s.d-r.d||(s.r.isPlayer?-1:1)-(r.r.isPlayer?-1:1));for(let s of n){if(i.seatsFilled>=t.seats)break;let r=s.r,o=i.seatsFilled;i.seats[o]=r.id,i.seatsFilled++,r.seated=!0,r.seatIndex=o,r.vel.x=r.vel.y=r.vel.z=0,r.emote="cheer",r.isPlayer&&(i.seatCine=1.85),i.events.push({t:"seat",id:r.id,seat:o,pop:!0}),i.seatsFilled===t.seats-1&&!i.lastSeatEvent&&(i.lastSeatEvent=!0,i.events.push({t:"lastseat"}))}}function Dp(i){if(!i.player.seated){_u(i);return}i.phase="launch",i.launchT=0,i.launchV=1.5,i.seatCine=0,i.result="escaped",i.events.push({t:"launch"}),i.events.push({t:"escaped",time:i.time}),i.shake=.65}function Up(i,e,t){if(!e.useAI||e.seated||e.eliminated||e.qualified)return;if(e.markZ==null){e.markX=e.pos.x,e.markZ=e.pos.z,e.stallT=0;return}if(Math.hypot(e.pos.x-e.markX,e.pos.z-e.markZ)>1.25||e.pos.z>e.markZ+.9){e.stallT=0,e.stallTries=0,e.markX=e.pos.x,e.markZ=e.pos.z;return}if(e.stallT=(e.stallT||0)+t,e.stallT<3)return;e.stallT=0,e.routeId=((e.routeId||0)+1)%3,e.wp=0;let s=i.course.routes&&i.course.routes[e.routeId]||i.course.waypoints;for(;e.wp<s.length-1&&s[e.wp].z<e.pos.z+1;)e.wp++;e.stallTries=(e.stallTries||0)+1,e.markX=e.pos.x,e.markZ=e.pos.z,e.stallTries>=2&&(e.stallTries=0,so(i,e))}function vu(i,e,t){let n=i.cfg;if(i.events.length>80&&i.events.splice(0,i.events.length-80),i.phase==="countdown"){i.countClock+=e;let s=i.countClock<1?3:i.countClock<2?2:i.countClock<3?1:0;s!==i.countCue&&(i.countCue=s,i.events.push({t:s===0?"go":"tick",n:s})),i.countClock>=n.countdownBeats+n.goHold&&(i.phase="race",i.activated=!0,i.time=0);return}if(i.phase==="race"){i.activated=!0,i.time+=e,i.seatCine>0&&(i.seatCine-=e),Tp(i,e),Ap(i,e);for(let o of i.racers)if(!(o.seated||o.eliminated))try{let a=o.isPlayer&&!o.useAI?t||{x:0,z:0,jump:!1,dive:!1}:Mp(i,o,e);vp(i,o,a,e),Up(i,o,e)}catch(a){o.controlLock=0,o.flail=0,o.grabT=0,i.fault||(i.fault=a&&a.message||String(a),i.events.push({t:"error",message:i.fault}))}Sp(i);let s=i.course.coins;if(s){let o=i.player;for(let a=0;a<s.length;a++){let c=s[a];if(c.got||o.seated)continue;let l=o.pos.x-c.x,h=o.pos.z-c.z;l*l+h*h>1.6||Math.abs(o.pos.y+.8-c.y)>1.5||(c.got=!0,i.coins++,i.events.push({t:"coin",n:i.coins}))}}Ep(i,e),wp(i,e),Lp(i),Cp(i),Pp(i);let r=zp(i,i.player.pos.z);if(r&&r!==i.zoneId){i.zoneId=r;let o=i.course.zones.find(a=>a.id===r);o&&i.events.push({t:"zone",name:o.name})}i.phase==="race"&&i.shipRound&&(i.seatsFilled>=n.seats||i.time>=n.raceSeconds)?i.player.seated?Dp(i):_u(i):i.phase==="race"&&!i.shipRound&&i.time>=n.raceSeconds&&(i.phase="results",i.result=i.player.qualified?"qualified":"out",i.player.qualified||(i.player.seated=!1),i.events.push({t:i.player.qualified?"roundwin":"eliminated"})),i.shake>0&&(i.shake=Math.max(0,i.shake-e*1.5));return}(i.phase==="launch"||i.phase==="results"&&i.result==="escaped")&&(i.launchT+=e,i.launchV+=4.5*e,i.launchY+=i.launchV*e,i.shipY=i.course.ship.y+i.launchY,i.player.emote==="wave"&&(i.player.waveT=(i.player.waveT||0)+e,i.player.waveT>.7&&i.player.waveT<2.2&&(i.player.emote="cheer"),i.player.waveT>=2.2&&(i.player.emote="idle")),i.phase==="launch"&&i.launchT>1.25&&(i.phase="results"),i.shake>0&&(i.shake=Math.max(0,i.shake-e*.7)))}function zp(i,e){let t=i.course.zones[0].id;for(let n of i.course.zones)e>=n.z0&&(t=n.id);return t}var Vl="170";var Np=0,Mu=1,Fp=2;var Bf=1,Wl=2,ti=3,_n=0,Vt=1,Dt=2,wi=0,Fs=1,zr=2,Su=3,Eu=4,Op=5,Zi=100,kp=101,Bp=102,Hp=103,Gp=104,Vp=200,Wp=201,Xp=202,qp=203,Ic=204,Pc=205,Yp=206,jp=207,Zp=208,Kp=209,Jp=210,Qp=211,$p=212,em=213,tm=214,Lc=0,Dc=1,Uc=2,Hs=3,zc=4,Nc=5,Fc=6,Oc=7,Xl=0,nm=1,im=2,Ti=0,sm=1,rm=2,om=3,ql=4,am=5,cm=6,lm=7,wu="attached",hm="detached",Hf=300,Gs=301,Vs=302,kc=303,Bc=304,va=306,Ji=1e3,ii=1001,Nr=1002,Wt=1003,Yl=1004;var Ds=1005;var sn=1006,Pr=1007;var An=1008;var oi=1009,Gf=1010,Vf=1011,Fr=1012,jl=1013,Qi=1014,Fn=1015,Xr=1016,Zl=1017,Kl=1018,Ws=1020,Wf=35902,Xf=1021,qf=1022,Rn=1023,Yf=1024,jf=1025,Os=1026,Xs=1027,Jl=1028,Ql=1029,Zf=1030,$l=1031;var eh=1033,Oo=33776,ko=33777,Bo=33778,Ho=33779,Hc=35840,Gc=35841,Vc=35842,Wc=35843,Xc=36196,qc=37492,Yc=37496,jc=37808,Zc=37809,Kc=37810,Jc=37811,Qc=37812,$c=37813,el=37814,tl=37815,nl=37816,il=37817,sl=37818,rl=37819,ol=37820,al=37821,Go=36492,cl=36494,ll=36495,Kf=36283,hl=36284,ul=36285,fl=36286,th=2200,nh=2201,um=2202,qs=2300,Ys=2301,Ja=2302,Us=2400,zs=2401,Vo=2402,ih=2500,fm=2501,Jf=0,Ma=1,qr=2,dm=3200,pm=3201;var Sa=0,mm=1,Wn="",zt="srgb",Kt="srgb-linear",Ea="linear",Et="srgb";var ps=7680;var Tu=519,gm=512,xm=513,bm=514,Qf=515,ym=516,_m=517,vm=518,Mm=519,dl=35044,$f=35048;var Au="300 es",si=2e3,Wo=2001,ai=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ru=1234567,Lr=Math.PI/180,js=180/Math.PI;function On(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function nn(i,e,t){return Math.max(e,Math.min(t,i))}function sh(i,e){return(i%e+e)%e}function Sm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Em(i,e,t){return i!==e?(t-i)/(e-i):0}function Dr(i,e,t){return(1-t)*i+t*e}function wm(i,e,t,n){return Dr(i,e,1-Math.exp(-t*n))}function Tm(i,e=1){return e-Math.abs(sh(i,e*2)-e)}function Am(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Rm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Cm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Im(i,e){return i+Math.random()*(e-i)}function Pm(i){return i*(.5-Math.random())}function Lm(i){i!==void 0&&(Ru=i);let e=Ru+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Dm(i){return i*Lr}function Um(i){return i*js}function zm(i){return(i&i-1)===0&&i!==0}function Nm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Fm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Om(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Nn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function vt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ed={DEG2RAD:Lr,RAD2DEG:js,generateUUID:On,clamp:nn,euclideanModulo:sh,mapLinear:Sm,inverseLerp:Em,lerp:Dr,damp:wm,pingpong:Tm,smoothstep:Am,smootherstep:Rm,randInt:Cm,randFloat:Im,randFloatSpread:Pm,seededRandom:Lm,degToRad:Dm,radToDeg:Um,isPowerOfTwo:zm,ceilPowerOfTwo:Nm,floorPowerOfTwo:Fm,setQuaternionFromProperEuler:Om,normalize:vt,denormalize:Nn},We=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},st=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],x=s[0],m=s[3],d=s[6],b=s[1],v=s[4],y=s[7],T=s[2],S=s[5],A=s[8];return r[0]=o*x+a*b+c*T,r[3]=o*m+a*v+c*S,r[6]=o*d+a*y+c*A,r[1]=l*x+h*b+u*T,r[4]=l*m+h*v+u*S,r[7]=l*d+h*y+u*A,r[2]=f*x+p*b+g*T,r[5]=f*m+p*v+g*S,r[8]=f*d+p*y+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,p=l*r-o*c,g=t*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(s*l-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Qa.makeScale(e,t)),this}rotate(e){return this.premultiply(Qa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Qa=new st;function td(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Or(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function km(){let i=Or("canvas");return i.style.display="block",i}var Cu={};function Cr(i){i in Cu||(Cu[i]=!0,console.warn(i))}function Bm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Hm(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Gm(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var ft={enabled:!0,workingColorSpace:Kt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Et&&(i.r=ri(i.r),i.g=ri(i.g),i.b=ri(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Et&&(i.r=ks(i.r),i.g=ks(i.g),i.b=ks(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Wn?Ea:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ks(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Iu=[.64,.33,.3,.6,.15,.06],Pu=[.2126,.7152,.0722],Lu=[.3127,.329],Du=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uu=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ft.define({[Kt]:{primaries:Iu,whitePoint:Lu,transfer:Ea,toXYZ:Du,fromXYZ:Uu,luminanceCoefficients:Pu,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:Iu,whitePoint:Lu,transfer:Et,toXYZ:Du,fromXYZ:Uu,luminanceCoefficients:Pu,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}});var ms,pl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ms===void 0&&(ms=Or("canvas")),ms.width=e.width,ms.height=e.height;let n=ms.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ms}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Or("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ri(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Vm=0,Xo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vm++}),this.uuid=On(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push($a(s[o].image)):r.push($a(s[o]))}else r=$a(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function $a(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Wm=0,jt=class i extends ai{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=ii,s=ii,r=sn,o=An,a=Rn,c=oi,l=i.DEFAULT_ANISOTROPY,h=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=On(),this.name="",this.source=new Xo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ji:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case Nr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ji:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case Nr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=Hf;jt.DEFAULT_ANISOTROPY=1;var _t=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],g=c[9],x=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,y=(p+1)/2,T=(d+1)/2,S=(h+f)/4,A=(u+x)/4,I=(g+m)/4;return v>y&&v>T?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=S/n,r=A/n):y>T?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=S/s,r=I/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=A/r,s=I/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-x)/b,this.z=(f-h)/b,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ml=class extends ai{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new jt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Xo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ci=class extends ml{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qo=class extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var gl=class extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=x;return}if(u!==x||c!==f||l!==p||h!==g){let m=1-a,d=c*f+l*p+h*g+u*x,b=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){let T=Math.sqrt(v),S=Math.atan2(T,d*b);m=Math.sin(m*S)/T,a=Math.sin(a*S)/T}let y=a*b;if(c=c*m+f*y,l=l*m+p*y,h=h*m+g*y,u=u*m+x*y,m===1-a){let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*f,e[t+1]=c*g+h*f+l*u-a*p,e[t+2]=l*g+h*p+a*f-c*u,e[t+3]=h*g-a*u-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"YZX":this._x=f*h*u+l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u-f*p*g;break;case"XZY":this._x=f*h*u-l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ec.copy(this).projectOnVector(e),this.sub(ec)}reflect(e){return this.sub(ec.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ec=new O,zu=new mn,Ht=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Dn):Dn.fromBufferAttribute(r,o),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ao.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ao.copy(n.boundingBox)),ao.applyMatrix4(e.matrixWorld),this.union(ao)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(br),co.subVectors(this.max,br),gs.subVectors(e.a,br),xs.subVectors(e.b,br),bs.subVectors(e.c,br),xi.subVectors(xs,gs),bi.subVectors(bs,xs),Gi.subVectors(gs,bs);let t=[0,-xi.z,xi.y,0,-bi.z,bi.y,0,-Gi.z,Gi.y,xi.z,0,-xi.x,bi.z,0,-bi.x,Gi.z,0,-Gi.x,-xi.y,xi.x,0,-bi.y,bi.x,0,-Gi.y,Gi.x,0];return!tc(t,gs,xs,bs,co)||(t=[1,0,0,0,1,0,0,0,1],!tc(t,gs,xs,bs,co))?!1:(lo.crossVectors(xi,bi),t=[lo.x,lo.y,lo.z],tc(t,gs,xs,bs,co))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Zn=[new O,new O,new O,new O,new O,new O,new O,new O],Dn=new O,ao=new Ht,gs=new O,xs=new O,bs=new O,xi=new O,bi=new O,Gi=new O,br=new O,co=new O,lo=new O,Vi=new O;function tc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Vi.fromArray(i,r);let a=s.x*Math.abs(Vi.x)+s.y*Math.abs(Vi.y)+s.z*Math.abs(Vi.z),c=e.dot(Vi),l=t.dot(Vi),h=n.dot(Vi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Xm=new Ht,yr=new O,nc=new O,vn=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Xm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yr.subVectors(e,this.center);let t=yr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(yr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yr.copy(e.center).add(nc)),this.expandByPoint(yr.copy(e.center).sub(nc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Kn=new O,ic=new O,ho=new O,yi=new O,sc=new O,uo=new O,rc=new O,Zs=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ic.copy(e).add(t).multiplyScalar(.5),ho.copy(t).sub(e).normalize(),yi.copy(this.origin).sub(ic);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ho),a=yi.dot(this.direction),c=-yi.dot(ho),l=yi.lengthSq(),h=Math.abs(1-o*o),u,f,p,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let x=1/h;u*=x,f*=x,p=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ic).addScaledVector(ho,f),p}intersectSphere(e,t){Kn.subVectors(e.center,this.origin);let n=Kn.dot(this.direction),s=Kn.dot(Kn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,n,s,r){sc.subVectors(t,e),uo.subVectors(n,e),rc.crossVectors(sc,uo);let o=this.direction.dot(rc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;yi.subVectors(this.origin,e);let c=a*this.direction.dot(uo.crossVectors(yi,uo));if(c<0)return null;let l=a*this.direction.dot(sc.cross(yi));if(l<0||c+l>o)return null;let h=-a*yi.dot(rc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},it=class i{constructor(e,t,n,s,r,o,a,c,l,h,u,f,p,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,f,p,g,x,m)}set(e,t,n,s,r,o,a,c,l,h,u,f,p,g,x,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/ys.setFromMatrixColumn(e,0).length(),r=1/ys.setFromMatrixColumn(e,1).length(),o=1/ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,p=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=f-x*l,t[9]=-a*c,t[2]=x-f*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*h,p=c*u,g=l*h,x=l*u;t[0]=f+x*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=x+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*h,p=c*u,g=l*h,x=l*u;t[0]=f-x*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=x-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*h,p=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=f*l+x,t[1]=c*u,t[5]=x*l+f,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,p=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=x-f*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=f-x*u}else if(e.order==="XZY"){let f=o*c,p=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+x,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=x*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qm,e,Ym)}lookAt(e,t,n){let s=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),_i.crossVectors(n,bn),_i.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),_i.crossVectors(n,bn)),_i.normalize(),fo.crossVectors(bn,_i),s[0]=_i.x,s[4]=fo.x,s[8]=bn.x,s[1]=_i.y,s[5]=fo.y,s[9]=bn.y,s[2]=_i.z,s[6]=fo.z,s[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],x=n[6],m=n[10],d=n[14],b=n[3],v=n[7],y=n[11],T=n[15],S=s[0],A=s[4],I=s[8],E=s[12],M=s[1],L=s[5],W=s[9],X=s[13],J=s[2],K=s[6],Q=s[10],he=s[14],$=s[3],xe=s[7],be=s[11],Fe=s[15];return r[0]=o*S+a*M+c*J+l*$,r[4]=o*A+a*L+c*K+l*xe,r[8]=o*I+a*W+c*Q+l*be,r[12]=o*E+a*X+c*he+l*Fe,r[1]=h*S+u*M+f*J+p*$,r[5]=h*A+u*L+f*K+p*xe,r[9]=h*I+u*W+f*Q+p*be,r[13]=h*E+u*X+f*he+p*Fe,r[2]=g*S+x*M+m*J+d*$,r[6]=g*A+x*L+m*K+d*xe,r[10]=g*I+x*W+m*Q+d*be,r[14]=g*E+x*X+m*he+d*Fe,r[3]=b*S+v*M+y*J+T*$,r[7]=b*A+v*L+y*K+T*xe,r[11]=b*I+v*W+y*Q+T*be,r[15]=b*E+v*X+y*he+T*Fe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],x=e[7],m=e[11],d=e[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*p-n*c*p)+x*(+t*c*p-t*l*f+r*o*f-s*o*p+s*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+d*(-s*a*h-t*c*u+t*a*f+s*o*u-n*o*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],x=e[13],m=e[14],d=e[15],b=u*m*l-x*f*l+x*c*p-a*m*p-u*c*d+a*f*d,v=g*f*l-h*m*l-g*c*p+o*m*p+h*c*d-o*f*d,y=h*x*l-g*u*l+g*a*p-o*x*p-h*a*d+o*u*d,T=g*u*c-h*x*c-g*a*f+o*x*f+h*a*m-o*u*m,S=t*b+n*v+s*y+r*T;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/S;return e[0]=b*A,e[1]=(x*f*r-u*m*r-x*s*p+n*m*p+u*s*d-n*f*d)*A,e[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*d+n*c*d)*A,e[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*p-n*c*p)*A,e[4]=v*A,e[5]=(h*m*r-g*f*r+g*s*p-t*m*p-h*s*d+t*f*d)*A,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*d-t*c*d)*A,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*p+t*c*p)*A,e[8]=y*A,e[9]=(g*u*r-h*x*r-g*n*p+t*x*p+h*n*d-t*u*d)*A,e[10]=(o*x*r-g*a*r+g*n*l-t*x*l-o*n*d+t*a*d)*A,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*A,e[12]=T*A,e[13]=(h*x*s-g*u*s+g*n*f-t*x*f-h*n*m+t*u*m)*A,e[14]=(g*a*s-o*x*s-g*n*c+t*x*c+o*n*m-t*a*m)*A,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*f+t*a*f)*A,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,p=r*h,g=r*u,x=o*h,m=o*u,d=a*u,b=c*l,v=c*h,y=c*u,T=n.x,S=n.y,A=n.z;return s[0]=(1-(x+d))*T,s[1]=(p+y)*T,s[2]=(g-v)*T,s[3]=0,s[4]=(p-y)*S,s[5]=(1-(f+d))*S,s[6]=(m+b)*S,s[7]=0,s[8]=(g+v)*A,s[9]=(m-b)*A,s[10]=(1-(f+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=ys.set(s[0],s[1],s[2]).length(),o=ys.set(s[4],s[5],s[6]).length(),a=ys.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Un.copy(this);let l=1/r,h=1/o,u=1/a;return Un.elements[0]*=l,Un.elements[1]*=l,Un.elements[2]*=l,Un.elements[4]*=h,Un.elements[5]*=h,Un.elements[6]*=h,Un.elements[8]*=u,Un.elements[9]*=u,Un.elements[10]*=u,t.setFromRotationMatrix(Un),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=si){let c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),p,g;if(a===si)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Wo)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=si){let c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),f=(t+e)*l,p=(n+s)*h,g,x;if(a===si)g=(o+r)*u,x=-2*u;else if(a===Wo)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ys=new O,Un=new it,qm=new O(0,0,0),Ym=new O(1,1,1),_i=new O,fo=new O,bn=new O,Nu=new it,Fu=new mn,kn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(nn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-nn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(nn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-nn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(nn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-nn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Nu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fu.setFromEuler(this),this.setFromQuaternion(Fu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};kn.DEFAULT_ORDER="XYZ";var Yo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},jm=0,Ou=new O,_s=new mn,Jn=new it,po=new O,_r=new O,Zm=new O,Km=new mn,ku=new O(1,0,0),Bu=new O(0,1,0),Hu=new O(0,0,1),Gu={type:"added"},Jm={type:"removed"},vs={type:"childadded",child:null},oc={type:"childremoved",child:null},dt=class i extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=On(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new O,t=new kn,n=new mn,s=new O(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new st}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.multiply(_s),this}rotateOnWorldAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.premultiply(_s),this}rotateX(e){return this.rotateOnAxis(ku,e)}rotateY(e){return this.rotateOnAxis(Bu,e)}rotateZ(e){return this.rotateOnAxis(Hu,e)}translateOnAxis(e,t){return Ou.copy(e).applyQuaternion(this.quaternion),this.position.add(Ou.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ku,e)}translateY(e){return this.translateOnAxis(Bu,e)}translateZ(e){return this.translateOnAxis(Hu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?po.copy(e):po.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),_r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(_r,po,this.up):Jn.lookAt(po,_r,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),_s.setFromRotationMatrix(Jn),this.quaternion.premultiply(_s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gu),vs.child=e,this.dispatchEvent(vs),vs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jm),oc.child=e,this.dispatchEvent(oc),oc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gu),vs.child=e,this.dispatchEvent(vs),vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,e,Zm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,Km,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};dt.DEFAULT_UP=new O(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var zn=new O,Qn=new O,ac=new O,$n=new O,Ms=new O,Ss=new O,Vu=new O,cc=new O,lc=new O,hc=new O,uc=new _t,fc=new _t,dc=new _t,Si=class i{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),zn.subVectors(e,t),s.cross(zn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){zn.subVectors(s,t),Qn.subVectors(n,t),ac.subVectors(e,t);let o=zn.dot(zn),a=zn.dot(Qn),c=zn.dot(ac),l=Qn.dot(Qn),h=Qn.dot(ac),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,$n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,$n.x),c.addScaledVector(o,$n.y),c.addScaledVector(a,$n.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return uc.setScalar(0),fc.setScalar(0),dc.setScalar(0),uc.fromBufferAttribute(e,t),fc.fromBufferAttribute(e,n),dc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(uc,r.x),o.addScaledVector(fc,r.y),o.addScaledVector(dc,r.z),o}static isFrontFacing(e,t,n,s){return zn.subVectors(n,t),Qn.subVectors(e,t),zn.cross(Qn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),zn.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Ms.subVectors(s,n),Ss.subVectors(r,n),cc.subVectors(e,n);let c=Ms.dot(cc),l=Ss.dot(cc);if(c<=0&&l<=0)return t.copy(n);lc.subVectors(e,s);let h=Ms.dot(lc),u=Ss.dot(lc);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ms,o);hc.subVectors(e,r);let p=Ms.dot(hc),g=Ss.dot(hc);if(g>=0&&p<=g)return t.copy(r);let x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Ss,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Vu.subVectors(r,s),a=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(Vu,a);let d=1/(m+x+f);return o=x*d,a=f*d,t.copy(n).addScaledVector(Ms,o).addScaledVector(Ss,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},mo={h:0,s:0,l:0};function pc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Le=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=ft.workingColorSpace){if(e=sh(e,1),t=nn(t,0,1),n=nn(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=pc(o,r,e+1/3),this.g=pc(o,r,e),this.b=pc(o,r,e-1/3)}return ft.toWorkingColorSpace(this,s),this}setStyle(e,t=zt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){let n=nd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return ft.fromWorkingColorSpace(tn.copy(this),e),Math.round(nn(tn.r*255,0,255))*65536+Math.round(nn(tn.g*255,0,255))*256+Math.round(nn(tn.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.fromWorkingColorSpace(tn.copy(this),t);let n=tn.r,s=tn.g,r=tn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ft.workingColorSpace){return ft.fromWorkingColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=zt){ft.fromWorkingColorSpace(tn.copy(this),e);let t=tn.r,n=tn.g,s=tn.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+t,vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vi),e.getHSL(mo);let n=Dr(vi.h,mo.h,t),s=Dr(vi.s,mo.s,t),r=Dr(vi.l,mo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},tn=new Le;Le.NAMES=nd;var Qm=0,rn=class extends ai{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=On(),this.name="",this.blending=Fs,this.side=_n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ic,this.blendDst=Pc,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ps,this.stencilZFail=ps,this.stencilZPass=ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fs&&(n.blending=this.blending),this.side!==_n&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ic&&(n.blendSrc=this.blendSrc),this.blendDst!==Pc&&(n.blendDst=this.blendDst),this.blendEquation!==Zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ps&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ps&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ps&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},pt=class extends rn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Xl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Bt=new O,go=new We,wt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=dl,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)go.fromBufferAttribute(this,t),go.applyMatrix3(e),this.setXY(t,go.x,go.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==dl&&(e.usage=this.usage),e}};var jo=class extends wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Zo=class extends wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ct=class extends wt{constructor(e,t,n){super(new Float32Array(e),t,n)}},$m=0,Tn=new it,mc=new dt,Es=new O,yn=new Ht,vr=new Ht,Yt=new O,Ct=class i extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$m++}),this.uuid=On(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(td(e)?Zo:jo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,n){return Tn.makeTranslation(e,t,n),this.applyMatrix4(Tn),this}scale(e,t,n){return Tn.makeScale(e,t,n),this.applyMatrix4(Tn),this}lookAt(e){return mc.lookAt(e),mc.updateMatrix(),this.applyMatrix4(mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Es).negate(),this.translate(Es.x,Es.y,Es.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ct(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ht);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(yn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];vr.setFromBufferAttribute(a),this.morphTargetsRelative?(Yt.addVectors(yn.min,vr.min),yn.expandByPoint(Yt),Yt.addVectors(yn.max,vr.max),yn.expandByPoint(Yt)):(yn.expandByPoint(vr.min),yn.expandByPoint(vr.max))}yn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Yt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Yt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Yt.fromBufferAttribute(a,l),c&&(Es.fromBufferAttribute(e,l),Yt.add(Es)),s=Math.max(s,n.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new O,c[I]=new O;let l=new O,h=new O,u=new O,f=new We,p=new We,g=new We,x=new O,m=new O;function d(I,E,M){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,I),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),p.sub(f),g.sub(f);let L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(L),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),a[I].add(x),a[E].add(x),a[M].add(x),c[I].add(m),c[E].add(m),c[M].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let I=0,E=b.length;I<E;++I){let M=b[I],L=M.start,W=M.count;for(let X=L,J=L+W;X<J;X+=3)d(e.getX(X+0),e.getX(X+1),e.getX(X+2))}let v=new O,y=new O,T=new O,S=new O;function A(I){T.fromBufferAttribute(s,I),S.copy(T);let E=a[I];v.copy(E),v.sub(T.multiplyScalar(T.dot(E))).normalize(),y.crossVectors(S,E);let L=y.dot(c[I])<0?-1:1;o.setXYZW(I,v.x,v.y,v.z,L)}for(let I=0,E=b.length;I<E;++I){let M=b[I],L=M.start,W=M.count;for(let X=L,J=L+W;X<J;X+=3)A(e.getX(X+0)),A(e.getX(X+1)),A(e.getX(X+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,h=new O,u=new O;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),p=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let d=0;d<h;d++)f[g++]=l[p++]}return new wt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],p=e(f,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wu=new it,Wi=new Zs,xo=new vn,Xu=new O,bo=new O,yo=new O,_o=new O,gc=new O,vo=new O,qu=new O,Mo=new O,we=class extends dt{constructor(e=new Ct,t=new pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){vo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(gc.fromBufferAttribute(u,e),o?vo.addScaledVector(gc,h):vo.addScaledVector(gc.sub(t),h))}t.add(vo)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xo.copy(n.boundingSphere),xo.applyMatrix4(r),Wi.copy(e.ray).recast(e.near),!(xo.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(xo,Xu)===null||Wi.origin.distanceToSquared(Xu)>(e.far-e.near)**2))&&(Wu.copy(r).invert(),Wi.copy(e.ray).applyMatrix4(Wu),!(n.boundingBox!==null&&Wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],d=o[m.materialIndex],b=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=b,T=v;y<T;y+=3){let S=a.getX(y),A=a.getX(y+1),I=a.getX(y+2);s=So(this,d,e,n,l,h,u,S,A,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let b=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);s=So(this,o,e,n,l,h,u,b,v,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let m=f[g],d=o[m.materialIndex],b=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=b,T=v;y<T;y+=3){let S=y,A=y+1,I=y+2;s=So(this,d,e,n,l,h,u,S,A,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let b=m,v=m+1,y=m+2;s=So(this,o,e,n,l,h,u,b,v,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function eg(i,e,t,n,s,r,o,a){let c;if(e.side===Vt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===_n,a),c===null)return null;Mo.copy(a),Mo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Mo);return l<t.near||l>t.far?null:{distance:l,point:Mo.clone(),object:i}}function So(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,bo),i.getVertexPosition(c,yo),i.getVertexPosition(l,_o);let h=eg(i,e,t,n,bo,yo,_o,qu);if(h){let u=new O;Si.getBarycoord(qu,bo,yo,_o,u),s&&(h.uv=Si.getInterpolatedAttribute(s,a,c,l,u,new We)),r&&(h.uv1=Si.getInterpolatedAttribute(r,a,c,l,u,new We)),o&&(h.normal=Si.getInterpolatedAttribute(o,a,c,l,u,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new O,materialIndex:0};Si.getNormal(bo,yo,_o,f.normal),h.face=f,h.barycoord=u}return h}var Mn=class i extends Ct{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(u,2));function g(x,m,d,b,v,y,T,S,A,I,E){let M=y/A,L=T/I,W=y/2,X=T/2,J=S/2,K=A+1,Q=I+1,he=0,$=0,xe=new O;for(let be=0;be<Q;be++){let Fe=be*L-X;for(let $e=0;$e<K;$e++){let ht=$e*M-W;xe[x]=ht*b,xe[m]=Fe*v,xe[d]=J,l.push(xe.x,xe.y,xe.z),xe[x]=0,xe[m]=0,xe[d]=S>0?1:-1,h.push(xe.x,xe.y,xe.z),u.push($e/A),u.push(1-be/I),he+=1}}for(let be=0;be<I;be++)for(let Fe=0;Fe<A;Fe++){let $e=f+Fe+K*be,ht=f+Fe+K*(be+1),ne=f+(Fe+1)+K*(be+1),D=f+(Fe+1)+K*be;c.push($e,ht,D),c.push(ht,ne,D),$+=6}a.addGroup(p,$,E),p+=$,f+=he}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ks(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function hn(i){let e={};for(let t=0;t<i.length;t++){let n=Ks(i[t]);for(let s in n)e[s]=n[s]}return e}function tg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function id(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}var ng={clone:Ks,merge:hn},ig=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Zt=class extends rn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ig,this.fragmentShader=sg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ks(e.uniforms),this.uniformsGroups=tg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ko=class extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=si}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Mi=new O,Yu=new We,ju=new We,Gt=class extends Ko{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=js*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Lr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return js*2*Math.atan(Math.tan(Lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z)}getViewSize(e,t){return this.getViewBounds(e,Yu,ju),t.subVectors(ju,Yu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Lr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ws=-90,Ts=1,xl=class extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Gt(ws,Ts,e,t);s.layers=this.layers,this.add(s);let r=new Gt(ws,Ts,e,t);r.layers=this.layers,this.add(r);let o=new Gt(ws,Ts,e,t);o.layers=this.layers,this.add(o);let a=new Gt(ws,Ts,e,t);a.layers=this.layers,this.add(a);let c=new Gt(ws,Ts,e,t);c.layers=this.layers,this.add(c);let l=new Gt(ws,Ts,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===si)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Wo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Jo=class extends jt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Gs,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},bl=class extends ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Jo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:sn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Mn(5,5,5),r=new Zt({name:"CubemapFromEquirect",uniforms:Ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:wi});r.uniforms.tEquirect.value=t;let o=new we(s,r),a=t.minFilter;return t.minFilter===An&&(t.minFilter=sn),new xl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},xc=new O,rg=new O,og=new st,ni=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=xc.subVectors(n,t).cross(rg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(xc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||og.getNormalMatrix(e),s=this.coplanarPoint(xc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Xi=new vn,Eo=new O,kr=class{constructor(e=new ni,t=new ni,n=new ni,s=new ni,r=new ni,o=new ni){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=si){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],x=s[10],m=s[11],d=s[12],b=s[13],v=s[14],y=s[15];if(n[0].setComponents(c-r,f-l,m-p,y-d).normalize(),n[1].setComponents(c+r,f+l,m+p,y+d).normalize(),n[2].setComponents(c+o,f+h,m+g,y+b).normalize(),n[3].setComponents(c-o,f-h,m-g,y-b).normalize(),n[4].setComponents(c-a,f-u,m-x,y-v).normalize(),t===si)n[5].setComponents(c+a,f+u,m+x,y+v).normalize();else if(t===Wo)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(e){return Xi.center.set(0,0,0),Xi.radius=.7071067811865476,Xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Eo.x=s.normal.x>0?e.max.x:e.min.x,Eo.y=s.normal.y>0?e.max.y:e.min.y,Eo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Eo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function sd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ag(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){let g=u[f],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){let x=u[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var li=class i extends Ct{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,p=[],g=[],x=[],m=[];for(let d=0;d<h;d++){let b=d*f-o;for(let v=0;v<l;v++){let y=v*u-r;g.push(y,-b,0),x.push(0,0,1),m.push(v/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<a;b++){let v=b+l*d,y=b+l*(d+1),T=b+1+l*(d+1),S=b+1+l*d;p.push(v,y,S),p.push(y,T,S)}this.setIndex(p),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(x,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},cg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lg=`#ifdef USE_ALPHAHASH
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
#endif`,hg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ug=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pg=`#ifdef USE_AOMAP
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
#endif`,mg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gg=`#ifdef USE_BATCHING
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
#endif`,xg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_g=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vg=`#ifdef USE_IRIDESCENCE
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
#endif`,Mg=`#ifdef USE_BUMPMAP
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
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ag=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ig=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Pg=`#define PI 3.141592653589793
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
} // validated`,Lg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dg=`vec3 transformedNormal = objectNormal;
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
#endif`,Ug=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ng=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Og="gl_FragColor = linearToOutputTexel( gl_FragColor );",kg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bg=`#ifdef USE_ENVMAP
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
#endif`,Hg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gg=`#ifdef USE_ENVMAP
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
#endif`,Vg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wg=`#ifdef USE_ENVMAP
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
#endif`,Xg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zg=`#ifdef USE_GRADIENTMAP
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
}`,Kg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$g=`uniform bool receiveShadow;
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
#endif`,e0=`#ifdef USE_ENVMAP
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
#endif`,t0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,n0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,i0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,s0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,r0=`PhysicalMaterial material;
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
#endif`,o0=`struct PhysicalMaterial {
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
}`,a0=`
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
#endif`,c0=`#if defined( RE_IndirectDiffuse )
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
#endif`,l0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,h0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,u0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,f0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,p0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,m0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,g0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,x0=`#if defined( USE_POINTS_UV )
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
#endif`,b0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,v0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,M0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S0=`#ifdef USE_MORPHTARGETS
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
#endif`,E0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,T0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,A0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,C0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,I0=`#ifdef USE_NORMALMAP
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
#endif`,P0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,L0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,D0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,U0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,z0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,F0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,O0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,k0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,B0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,H0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,G0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,V0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,W0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,X0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,q0=`float getShadowMask() {
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
}`,Y0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,j0=`#ifdef USE_SKINNING
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
#endif`,Z0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,K0=`#ifdef USE_SKINNING
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
#endif`,J0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Q0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ex=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tx=`#ifdef USE_TRANSMISSION
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
#endif`,nx=`#ifdef USE_TRANSMISSION
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
#endif`,ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ox=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ax=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cx=`uniform sampler2D t2D;
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
}`,lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dx=`#include <common>
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
}`,px=`#if DEPTH_PACKING == 3200
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
}`,mx=`#define DISTANCE
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
}`,gx=`#define DISTANCE
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
}`,xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yx=`uniform float scale;
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
}`,_x=`uniform vec3 diffuse;
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
}`,vx=`#include <common>
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
}`,Mx=`uniform vec3 diffuse;
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
}`,Sx=`#define LAMBERT
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
}`,Ex=`#define LAMBERT
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
}`,wx=`#define MATCAP
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
}`,Tx=`#define MATCAP
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
}`,Ax=`#define NORMAL
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
}`,Rx=`#define NORMAL
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
}`,Cx=`#define PHONG
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
}`,Ix=`#define PHONG
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
}`,Px=`#define STANDARD
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
}`,Lx=`#define STANDARD
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
}`,Dx=`#define TOON
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
}`,Ux=`#define TOON
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
}`,zx=`uniform float size;
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
}`,Nx=`uniform vec3 diffuse;
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
}`,Fx=`#include <common>
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
}`,Ox=`uniform vec3 color;
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
}`,kx=`uniform float rotation;
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
}`,Bx=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:cg,alphahash_pars_fragment:lg,alphamap_fragment:hg,alphamap_pars_fragment:ug,alphatest_fragment:fg,alphatest_pars_fragment:dg,aomap_fragment:pg,aomap_pars_fragment:mg,batching_pars_vertex:gg,batching_vertex:xg,begin_vertex:bg,beginnormal_vertex:yg,bsdfs:_g,iridescence_fragment:vg,bumpmap_pars_fragment:Mg,clipping_planes_fragment:Sg,clipping_planes_pars_fragment:Eg,clipping_planes_pars_vertex:wg,clipping_planes_vertex:Tg,color_fragment:Ag,color_pars_fragment:Rg,color_pars_vertex:Cg,color_vertex:Ig,common:Pg,cube_uv_reflection_fragment:Lg,defaultnormal_vertex:Dg,displacementmap_pars_vertex:Ug,displacementmap_vertex:zg,emissivemap_fragment:Ng,emissivemap_pars_fragment:Fg,colorspace_fragment:Og,colorspace_pars_fragment:kg,envmap_fragment:Bg,envmap_common_pars_fragment:Hg,envmap_pars_fragment:Gg,envmap_pars_vertex:Vg,envmap_physical_pars_fragment:e0,envmap_vertex:Wg,fog_vertex:Xg,fog_pars_vertex:qg,fog_fragment:Yg,fog_pars_fragment:jg,gradientmap_pars_fragment:Zg,lightmap_pars_fragment:Kg,lights_lambert_fragment:Jg,lights_lambert_pars_fragment:Qg,lights_pars_begin:$g,lights_toon_fragment:t0,lights_toon_pars_fragment:n0,lights_phong_fragment:i0,lights_phong_pars_fragment:s0,lights_physical_fragment:r0,lights_physical_pars_fragment:o0,lights_fragment_begin:a0,lights_fragment_maps:c0,lights_fragment_end:l0,logdepthbuf_fragment:h0,logdepthbuf_pars_fragment:u0,logdepthbuf_pars_vertex:f0,logdepthbuf_vertex:d0,map_fragment:p0,map_pars_fragment:m0,map_particle_fragment:g0,map_particle_pars_fragment:x0,metalnessmap_fragment:b0,metalnessmap_pars_fragment:y0,morphinstance_vertex:_0,morphcolor_vertex:v0,morphnormal_vertex:M0,morphtarget_pars_vertex:S0,morphtarget_vertex:E0,normal_fragment_begin:w0,normal_fragment_maps:T0,normal_pars_fragment:A0,normal_pars_vertex:R0,normal_vertex:C0,normalmap_pars_fragment:I0,clearcoat_normal_fragment_begin:P0,clearcoat_normal_fragment_maps:L0,clearcoat_pars_fragment:D0,iridescence_pars_fragment:U0,opaque_fragment:z0,packing:N0,premultiplied_alpha_fragment:F0,project_vertex:O0,dithering_fragment:k0,dithering_pars_fragment:B0,roughnessmap_fragment:H0,roughnessmap_pars_fragment:G0,shadowmap_pars_fragment:V0,shadowmap_pars_vertex:W0,shadowmap_vertex:X0,shadowmask_pars_fragment:q0,skinbase_vertex:Y0,skinning_pars_vertex:j0,skinning_vertex:Z0,skinnormal_vertex:K0,specularmap_fragment:J0,specularmap_pars_fragment:Q0,tonemapping_fragment:$0,tonemapping_pars_fragment:ex,transmission_fragment:tx,transmission_pars_fragment:nx,uv_pars_fragment:ix,uv_pars_vertex:sx,uv_vertex:rx,worldpos_vertex:ox,background_vert:ax,background_frag:cx,backgroundCube_vert:lx,backgroundCube_frag:hx,cube_vert:ux,cube_frag:fx,depth_vert:dx,depth_frag:px,distanceRGBA_vert:mx,distanceRGBA_frag:gx,equirect_vert:xx,equirect_frag:bx,linedashed_vert:yx,linedashed_frag:_x,meshbasic_vert:vx,meshbasic_frag:Mx,meshlambert_vert:Sx,meshlambert_frag:Ex,meshmatcap_vert:wx,meshmatcap_frag:Tx,meshnormal_vert:Ax,meshnormal_frag:Rx,meshphong_vert:Cx,meshphong_frag:Ix,meshphysical_vert:Px,meshphysical_frag:Lx,meshtoon_vert:Dx,meshtoon_frag:Ux,points_vert:zx,points_frag:Nx,shadow_vert:Fx,shadow_frag:Ox,sprite_vert:kx,sprite_frag:Bx},ye={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Vn={basic:{uniforms:hn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:hn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Le(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:hn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:hn([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:hn([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Le(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:hn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:hn([ye.points,ye.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:hn([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:hn([ye.common,ye.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:hn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:hn([ye.sprite,ye.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:hn([ye.common,ye.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:hn([ye.lights,ye.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};Vn.physical={uniforms:hn([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var wo={r:0,b:0,g:0},qi=new kn,Hx=new it;function Gx(i,e,t,n,s,r,o){let a=new Le(0),c=r===!0?0:1,l,h,u=null,f=0,p=null;function g(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?t:e).get(v)),v}function x(b){let v=!1,y=g(b);y===null?d(a,c):y&&y.isColor&&(d(y,1),v=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,v){let y=g(v);y&&(y.isCubeTexture||y.mapping===va)?(h===void 0&&(h=new we(new Mn(1,1,1),new Zt({name:"BackgroundCubeMaterial",uniforms:Ks(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),qi.copy(v.backgroundRotation),qi.x*=-1,qi.y*=-1,qi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Hx.makeRotationFromEuler(qi)),h.material.toneMapped=ft.getTransfer(y.colorSpace)!==Et,(u!==y||f!==y.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,p=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new we(new li(2,2),new Zt({name:"BackgroundMaterial",uniforms:Ks(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ft.getTransfer(y.colorSpace)!==Et,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,p=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function d(b,v){b.getRGB(wo,id(i)),n.buffers.color.setClear(wo.r,wo.g,wo.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(b,v=1){a.set(b),c=v,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,d(a,c)},render:x,addToRenderList:m}}function Vx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(M,L,W,X,J){let K=!1,Q=u(X,W,L);r!==Q&&(r=Q,l(r.object)),K=p(M,X,W,J),K&&g(M,X,W,J),J!==null&&e.update(J,i.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,y(M,L,W,X),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,L,W){let X=W.wireframe===!0,J=n[M.id];J===void 0&&(J={},n[M.id]=J);let K=J[L.id];K===void 0&&(K={},J[L.id]=K);let Q=K[X];return Q===void 0&&(Q=f(c()),K[X]=Q),Q}function f(M){let L=[],W=[],X=[];for(let J=0;J<t;J++)L[J]=0,W[J]=0,X[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:W,attributeDivisors:X,object:M,attributes:{},index:null}}function p(M,L,W,X){let J=r.attributes,K=L.attributes,Q=0,he=W.getAttributes();for(let $ in he)if(he[$].location>=0){let be=J[$],Fe=K[$];if(Fe===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(Fe=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(Fe=M.instanceColor)),be===void 0||be.attribute!==Fe||Fe&&be.data!==Fe.data)return!0;Q++}return r.attributesNum!==Q||r.index!==X}function g(M,L,W,X){let J={},K=L.attributes,Q=0,he=W.getAttributes();for(let $ in he)if(he[$].location>=0){let be=K[$];be===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(be=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(be=M.instanceColor));let Fe={};Fe.attribute=be,be&&be.data&&(Fe.data=be.data),J[$]=Fe,Q++}r.attributes=J,r.attributesNum=Q,r.index=X}function x(){let M=r.newAttributes;for(let L=0,W=M.length;L<W;L++)M[L]=0}function m(M){d(M,0)}function d(M,L){let W=r.newAttributes,X=r.enabledAttributes,J=r.attributeDivisors;W[M]=1,X[M]===0&&(i.enableVertexAttribArray(M),X[M]=1),J[M]!==L&&(i.vertexAttribDivisor(M,L),J[M]=L)}function b(){let M=r.newAttributes,L=r.enabledAttributes;for(let W=0,X=L.length;W<X;W++)L[W]!==M[W]&&(i.disableVertexAttribArray(W),L[W]=0)}function v(M,L,W,X,J,K,Q){Q===!0?i.vertexAttribIPointer(M,L,W,J,K):i.vertexAttribPointer(M,L,W,X,J,K)}function y(M,L,W,X){x();let J=X.attributes,K=W.getAttributes(),Q=L.defaultAttributeValues;for(let he in K){let $=K[he];if($.location>=0){let xe=J[he];if(xe===void 0&&(he==="instanceMatrix"&&M.instanceMatrix&&(xe=M.instanceMatrix),he==="instanceColor"&&M.instanceColor&&(xe=M.instanceColor)),xe!==void 0){let be=xe.normalized,Fe=xe.itemSize,$e=e.get(xe);if($e===void 0)continue;let ht=$e.buffer,ne=$e.type,D=$e.bytesPerElement,F=ne===i.INT||ne===i.UNSIGNED_INT||xe.gpuType===jl;if(xe.isInterleavedBufferAttribute){let Y=xe.data,ue=Y.stride,de=xe.offset;if(Y.isInstancedInterleavedBuffer){for(let De=0;De<$.locationSize;De++)d($.location+De,Y.meshPerAttribute);M.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let De=0;De<$.locationSize;De++)m($.location+De);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let De=0;De<$.locationSize;De++)v($.location+De,Fe/$.locationSize,ne,be,ue*D,(de+Fe/$.locationSize*De)*D,F)}else{if(xe.isInstancedBufferAttribute){for(let Y=0;Y<$.locationSize;Y++)d($.location+Y,xe.meshPerAttribute);M.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let Y=0;Y<$.locationSize;Y++)m($.location+Y);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let Y=0;Y<$.locationSize;Y++)v($.location+Y,Fe/$.locationSize,ne,be,Fe*D,Fe/$.locationSize*Y*D,F)}}else if(Q!==void 0){let be=Q[he];if(be!==void 0)switch(be.length){case 2:i.vertexAttrib2fv($.location,be);break;case 3:i.vertexAttrib3fv($.location,be);break;case 4:i.vertexAttrib4fv($.location,be);break;default:i.vertexAttrib1fv($.location,be)}}}}b()}function T(){I();for(let M in n){let L=n[M];for(let W in L){let X=L[W];for(let J in X)h(X[J].object),delete X[J];delete L[W]}delete n[M]}}function S(M){if(n[M.id]===void 0)return;let L=n[M.id];for(let W in L){let X=L[W];for(let J in X)h(X[J].object),delete X[J];delete L[W]}delete n[M.id]}function A(M){for(let L in n){let W=n[L];if(W[M.id]===void 0)continue;let X=W[M.id];for(let J in X)h(X[J].object),delete X[J];delete W[M.id]}}function I(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:E,dispose:T,releaseStatesOfGeometry:S,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function Wx(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function c(l,h,u,f){if(u===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*f[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Xx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Rn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let I=A===Xr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==oi&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Fn&&!I)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:b,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:T,maxSamples:S}}function qx(i){let e=this,t=null,n=0,s=!1,r=!1,o=new ni,a=new st,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let b=r?0:n,v=b*4,y=d.clippingState||null;c.value=y,y=h(g,f,v,p);for(let T=0;T!==v;++T)y[T]=t[T];d.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let d=p+x*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,y=p;v!==x;++v,y+=4)o.copy(u[v]).applyMatrix4(b,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Yx(i){let e=new WeakMap;function t(o,a){return a===kc?o.mapping=Gs:a===Bc&&(o.mapping=Vs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===kc||a===Bc)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new bl(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Js=class extends Ko{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ns=4,Zu=[.125,.215,.35,.446,.526,.582],Ki=20,bc=new Js,Ku=new Le,yc=null,_c=0,vc=0,Mc=!1,ji=(1+Math.sqrt(5))/2,As=1/ji,Ju=[new O(-ji,As,0),new O(ji,As,0),new O(-As,0,ji),new O(As,0,ji),new O(0,ji,-As),new O(0,ji,As),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],Qo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){yc=this._renderer.getRenderTarget(),_c=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ef(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$u(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(yc,_c,vc),this._renderer.xr.enabled=Mc,e.scissorTest=!1,To(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gs||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yc=this._renderer.getRenderTarget(),_c=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:Xr,format:Rn,colorSpace:Kt,depthBuffer:!1},s=Qu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jx(r)),this._blurMaterial=Zx(r,e,t)}return s}_compileMaterial(e){let t=new we(this._lodPlanes[0],e);this._renderer.compile(t,bc)}_sceneToCubeUV(e,t,n,s){let a=new Gt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Ku),h.toneMapping=Ti,h.autoClear=!1;let p=new pt({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),g=new we(new Mn,p),x=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(Ku),x=!0);for(let d=0;d<6;d++){let b=d%3;b===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):b===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));let v=this._cubeSize;To(s,b*v,d>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Gs||e.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ef()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$u());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new we(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;To(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,bc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ju[(s-r-1)%Ju.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new we(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ki-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ki;m>Ki&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ki}`);let d=[],b=0;for(let A=0;A<Ki;++A){let I=A/x,E=Math.exp(-I*I/2);d.push(E),A===0?b+=E:A<m&&(b+=2*E)}for(let A=0;A<d.length;A++)d[A]=d[A]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;let y=this._sizeLods[s],T=3*y*(s>v-Ns?s-v+Ns:0),S=4*(this._cubeSize-y);To(t,T,S,3*y,2*y),c.setRenderTarget(t),c.render(u,bc)}};function jx(i){let e=[],t=[],n=[],s=i,r=i-Ns+1+Zu.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Ns?c=Zu[o-i+Ns-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,d=1,b=new Float32Array(x*g*p),v=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let S=0;S<p;S++){let A=S%3*2/3-1,I=S>2?0:-1,E=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];b.set(E,x*g*S),v.set(f,m*g*S);let M=[S,S,S,S,S,S];y.set(M,d*g*S)}let T=new Ct;T.setAttribute("position",new wt(b,x)),T.setAttribute("uv",new wt(v,m)),T.setAttribute("faceIndex",new wt(y,d)),e.push(T),s>Ns&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Qu(i,e,t){let n=new ci(i,e,t);return n.texture.mapping=va,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function To(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Zx(i,e,t){let n=new Float32Array(Ki),s=new O(0,1,0);return new Zt({name:"SphericalGaussianBlur",defines:{n:Ki,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:rh(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function $u(){return new Zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rh(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function ef(){return new Zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function rh(){return`

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
	`}function Kx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===kc||c===Bc,h=c===Gs||c===Vs;if(l||h){let u=e.get(a),f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Qo(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Qo(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Jx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Cr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Qx(i,e,t,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let x=f.morphAttributes[g];for(let m=0,d=x.length;m<d;m++)e.remove(x[m])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)e.update(f[g],i.ARRAY_BUFFER);let p=u.morphAttributes;for(let g in p){let x=p[g];for(let m=0,d=x.length;m<d;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(u){let f=[],p=u.index,g=u.attributes.position,x=0;if(p!==null){let b=p.array;x=p.version;for(let v=0,y=b.length;v<y;v+=3){let T=b[v+0],S=b[v+1],A=b[v+2];f.push(T,S,S,A,A,T)}}else if(g!==void 0){let b=g.array;x=g.version;for(let v=0,y=b.length/3-1;v<y;v+=3){let T=v+0,S=v+1,A=v+2;f.push(T,S,S,A,A,T)}}else return;let m=new(td(f)?Zo:jo)(f,1);m.version=x;let d=r.get(u);d&&e.remove(d),r.set(u,m)}function h(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function $x(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function l(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*o,g),t.update(p,n,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,n,1)}function u(f,p,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/o,p[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,x,0,g);let d=0;for(let b=0;b<g;b++)d+=p[b]*x[b];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function eb(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function tb(i,e,t){let n=new WeakMap,s=new _t;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let E=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],v=0;p===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let y=a.attributes.position.count*v,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let S=new Float32Array(y*T*4*u),A=new qo(S,y,T,u);A.type=Fn,A.needsUpdate=!0;let I=v*4;for(let M=0;M<u;M++){let L=m[M],W=d[M],X=b[M],J=y*T*4*M;for(let K=0;K<L.count;K++){let Q=K*I;p===!0&&(s.fromBufferAttribute(L,K),S[J+Q+0]=s.x,S[J+Q+1]=s.y,S[J+Q+2]=s.z,S[J+Q+3]=0),g===!0&&(s.fromBufferAttribute(W,K),S[J+Q+4]=s.x,S[J+Q+5]=s.y,S[J+Q+6]=s.z,S[J+Q+7]=0),x===!0&&(s.fromBufferAttribute(X,K),S[J+Q+8]=s.x,S[J+Q+9]=s.y,S[J+Q+10]=s.z,S[J+Q+11]=X.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new We(y,T)},n.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function nb(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var $o=class extends jt{constructor(e,t,n,s,r,o,a,c,l,h=Os){if(h!==Os&&h!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Os&&(n=Qi),n===void 0&&h===Xs&&(n=Ws),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Wt,this.minFilter=c!==void 0?c:Wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},rd=new jt,tf=new $o(1,1),od=new qo,ad=new gl,cd=new Jo,nf=[],sf=[],rf=new Float32Array(16),of=new Float32Array(9),af=new Float32Array(4);function rr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=nf[s];if(r===void 0&&(r=new Float32Array(s),nf[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function qt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function wa(i,e){let t=sf[e];t===void 0&&(t=new Int32Array(e),sf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ib(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function sb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2fv(this.addr,e),qt(t,e)}}function rb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;i.uniform3fv(this.addr,e),qt(t,e)}}function ob(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4fv(this.addr,e),qt(t,e)}}function ab(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;af.set(n),i.uniformMatrix2fv(this.addr,!1,af),qt(t,n)}}function cb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;of.set(n),i.uniformMatrix3fv(this.addr,!1,of),qt(t,n)}}function lb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;rf.set(n),i.uniformMatrix4fv(this.addr,!1,rf),qt(t,n)}}function hb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ub(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2iv(this.addr,e),qt(t,e)}}function fb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;i.uniform3iv(this.addr,e),qt(t,e)}}function db(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4iv(this.addr,e),qt(t,e)}}function pb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function mb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2uiv(this.addr,e),qt(t,e)}}function gb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;i.uniform3uiv(this.addr,e),qt(t,e)}}function xb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4uiv(this.addr,e),qt(t,e)}}function bb(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(tf.compareFunction=Qf,r=tf):r=rd,t.setTexture2D(e||r,s)}function yb(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ad,s)}function _b(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||cd,s)}function vb(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||od,s)}function Mb(i){switch(i){case 5126:return ib;case 35664:return sb;case 35665:return rb;case 35666:return ob;case 35674:return ab;case 35675:return cb;case 35676:return lb;case 5124:case 35670:return hb;case 35667:case 35671:return ub;case 35668:case 35672:return fb;case 35669:case 35673:return db;case 5125:return pb;case 36294:return mb;case 36295:return gb;case 36296:return xb;case 35678:case 36198:case 36298:case 36306:case 35682:return bb;case 35679:case 36299:case 36307:return yb;case 35680:case 36300:case 36308:case 36293:return _b;case 36289:case 36303:case 36311:case 36292:return vb}}function Sb(i,e){i.uniform1fv(this.addr,e)}function Eb(i,e){let t=rr(e,this.size,2);i.uniform2fv(this.addr,t)}function wb(i,e){let t=rr(e,this.size,3);i.uniform3fv(this.addr,t)}function Tb(i,e){let t=rr(e,this.size,4);i.uniform4fv(this.addr,t)}function Ab(i,e){let t=rr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Rb(i,e){let t=rr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Cb(i,e){let t=rr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ib(i,e){i.uniform1iv(this.addr,e)}function Pb(i,e){i.uniform2iv(this.addr,e)}function Lb(i,e){i.uniform3iv(this.addr,e)}function Db(i,e){i.uniform4iv(this.addr,e)}function Ub(i,e){i.uniform1uiv(this.addr,e)}function zb(i,e){i.uniform2uiv(this.addr,e)}function Nb(i,e){i.uniform3uiv(this.addr,e)}function Fb(i,e){i.uniform4uiv(this.addr,e)}function Ob(i,e,t){let n=this.cache,s=e.length,r=wa(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||rd,r[o])}function kb(i,e,t){let n=this.cache,s=e.length,r=wa(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||ad,r[o])}function Bb(i,e,t){let n=this.cache,s=e.length,r=wa(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||cd,r[o])}function Hb(i,e,t){let n=this.cache,s=e.length,r=wa(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||od,r[o])}function Gb(i){switch(i){case 5126:return Sb;case 35664:return Eb;case 35665:return wb;case 35666:return Tb;case 35674:return Ab;case 35675:return Rb;case 35676:return Cb;case 5124:case 35670:return Ib;case 35667:case 35671:return Pb;case 35668:case 35672:return Lb;case 35669:case 35673:return Db;case 5125:return Ub;case 36294:return zb;case 36295:return Nb;case 36296:return Fb;case 35678:case 36198:case 36298:case 36306:case 35682:return Ob;case 35679:case 36299:case 36307:return kb;case 35680:case 36300:case 36308:case 36293:return Bb;case 36289:case 36303:case 36311:case 36292:return Hb}}var yl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Mb(t.type)}},_l=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gb(t.type)}},vl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Sc=/(\w+)(\])?(\[|\.)?/g;function cf(i,e){i.seq.push(e),i.map[e.id]=e}function Vb(i,e,t){let n=i.name,s=n.length;for(Sc.lastIndex=0;;){let r=Sc.exec(n),o=Sc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){cf(t,l===void 0?new yl(a,i,e):new _l(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new vl(a),cf(t,u)),t=u}}}var Bs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Vb(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function lf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Wb=37297,Xb=0;function qb(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var hf=new st;function Yb(i){ft._getMatrix(hf,ft.workingColorSpace,i);let e=`mat3( ${hf.elements.map(t=>t.toFixed(4))} )`;switch(ft.getTransfer(i)){case Ea:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function uf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+qb(i.getShaderSource(e),o)}else return s}function jb(i,e){let t=Yb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Zb(i,e){let t;switch(e){case sm:t="Linear";break;case rm:t="Reinhard";break;case om:t="Cineon";break;case ql:t="ACESFilmic";break;case cm:t="AgX";break;case lm:t="Neutral";break;case am:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ao=new O;function Kb(){ft.getLuminanceCoefficients(Ao);let i=Ao.x.toFixed(4),e=Ao.y.toFixed(4),t=Ao.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ir).join(`
`)}function Qb(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function $b(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ir(i){return i!==""}function ff(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function df(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ey=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ml(i){return i.replace(ey,ny)}var ty=new Map;function ny(i,e){let t=ot[e];if(t===void 0){let n=ty.get(e);if(n!==void 0)t=ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ml(t)}var iy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pf(i){return i.replace(iy,sy)}function sy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function mf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function ry(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Wl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ti&&(e="SHADOWMAP_TYPE_VSM"),e}function oy(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Gs:case Vs:e="ENVMAP_TYPE_CUBE";break;case va:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ay(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vs:e="ENVMAP_MODE_REFRACTION";break}return e}function cy(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Xl:e="ENVMAP_BLENDING_MULTIPLY";break;case nm:e="ENVMAP_BLENDING_MIX";break;case im:e="ENVMAP_BLENDING_ADD";break}return e}function ly(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function hy(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=ry(t),l=oy(t),h=ay(t),u=cy(t),f=ly(t),p=Jb(t),g=Qb(r),x=s.createProgram(),m,d,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ir).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ir).join(`
`),d.length>0&&(d+=`
`)):(m=[mf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ir).join(`
`),d=[mf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ti?"#define TONE_MAPPING":"",t.toneMapping!==Ti?ot.tonemapping_pars_fragment:"",t.toneMapping!==Ti?Zb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,jb("linearToOutputTexel",t.outputColorSpace),Kb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ir).join(`
`)),o=Ml(o),o=ff(o,t),o=df(o,t),a=Ml(a),a=ff(a,t),a=df(a,t),o=pf(o),a=pf(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Au?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Au?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let v=b+m+o,y=b+d+a,T=lf(s,s.VERTEX_SHADER,v),S=lf(s,s.FRAGMENT_SHADER,y);s.attachShader(x,T),s.attachShader(x,S),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function A(L){if(i.debug.checkShaderErrors){let W=s.getProgramInfoLog(x).trim(),X=s.getShaderInfoLog(T).trim(),J=s.getShaderInfoLog(S).trim(),K=!0,Q=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,S);else{let he=uf(s,T,"vertex"),$=uf(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+W+`
`+he+`
`+$)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(X===""||J==="")&&(Q=!1);Q&&(L.diagnostics={runnable:K,programLog:W,vertexShader:{log:X,prefix:m},fragmentShader:{log:J,prefix:d}})}s.deleteShader(T),s.deleteShader(S),I=new Bs(s,x),E=$b(s,x)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,Wb)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Xb++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=S,this}var uy=0,Sl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new El(e),t.set(e,n)),n}},El=class{constructor(e){this.id=uy++,this.code=e,this.usedTimes=0}};function fy(i,e,t,n,s,r,o){let a=new Yo,c=new Sl,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,M,L,W,X){let J=W.fog,K=X.geometry,Q=E.isMeshStandardMaterial?W.environment:null,he=(E.isMeshStandardMaterial?t:e).get(E.envMap||Q),$=he&&he.mapping===va?he.image.height:null,xe=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let be=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Fe=be!==void 0?be.length:0,$e=0;K.morphAttributes.position!==void 0&&($e=1),K.morphAttributes.normal!==void 0&&($e=2),K.morphAttributes.color!==void 0&&($e=3);let ht,ne,D,F;if(xe){let yt=Vn[xe];ht=yt.vertexShader,ne=yt.fragmentShader}else ht=E.vertexShader,ne=E.fragmentShader,c.update(E),D=c.getVertexShaderID(E),F=c.getFragmentShaderID(E);let Y=i.getRenderTarget(),ue=i.state.buffers.depth.getReversed(),de=X.isInstancedMesh===!0,De=X.isBatchedMesh===!0,Ye=!!E.map,Te=!!E.matcap,je=!!he,k=!!E.aoMap,le=!!E.lightMap,ge=!!E.bumpMap,Re=!!E.normalMap,Ce=!!E.displacementMap,rt=!!E.emissiveMap,Ne=!!E.metalnessMap,C=!!E.roughnessMap,w=E.anisotropy>0,q=E.clearcoat>0,re=E.dispersion>0,ae=E.iridescence>0,se=E.sheen>0,Oe=E.transmission>0,ce=w&&!!E.anisotropyMap,Me=q&&!!E.clearcoatMap,tt=q&&!!E.clearcoatNormalMap,fe=q&&!!E.clearcoatRoughnessMap,Ue=ae&&!!E.iridescenceMap,Xe=ae&&!!E.iridescenceThicknessMap,Ve=se&&!!E.sheenColorMap,Ae=se&&!!E.sheenRoughnessMap,Ke=!!E.specularMap,et=!!E.specularColorMap,ut=!!E.specularIntensityMap,B=Oe&&!!E.transmissionMap,_e=Oe&&!!E.thicknessMap,ee=!!E.gradientMap,oe=!!E.alphaMap,Se=E.alphaTest>0,ve=!!E.alphaHash,Je=!!E.extensions,Pt=Ti;E.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Pt=i.toneMapping);let Ut={shaderID:xe,shaderType:E.type,shaderName:E.name,vertexShader:ht,fragmentShader:ne,defines:E.defines,customVertexShaderID:D,customFragmentShaderID:F,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:De,batchingColor:De&&X._colorsTexture!==null,instancing:de,instancingColor:de&&X.instanceColor!==null,instancingMorph:de&&X.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Y===null?i.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Kt,alphaToCoverage:!!E.alphaToCoverage,map:Ye,matcap:Te,envMap:je,envMapMode:je&&he.mapping,envMapCubeUVHeight:$,aoMap:k,lightMap:le,bumpMap:ge,normalMap:Re,displacementMap:f&&Ce,emissiveMap:rt,normalMapObjectSpace:Re&&E.normalMapType===mm,normalMapTangentSpace:Re&&E.normalMapType===Sa,metalnessMap:Ne,roughnessMap:C,anisotropy:w,anisotropyMap:ce,clearcoat:q,clearcoatMap:Me,clearcoatNormalMap:tt,clearcoatRoughnessMap:fe,dispersion:re,iridescence:ae,iridescenceMap:Ue,iridescenceThicknessMap:Xe,sheen:se,sheenColorMap:Ve,sheenRoughnessMap:Ae,specularMap:Ke,specularColorMap:et,specularIntensityMap:ut,transmission:Oe,transmissionMap:B,thicknessMap:_e,gradientMap:ee,opaque:E.transparent===!1&&E.blending===Fs&&E.alphaToCoverage===!1,alphaMap:oe,alphaTest:Se,alphaHash:ve,combine:E.combine,mapUv:Ye&&x(E.map.channel),aoMapUv:k&&x(E.aoMap.channel),lightMapUv:le&&x(E.lightMap.channel),bumpMapUv:ge&&x(E.bumpMap.channel),normalMapUv:Re&&x(E.normalMap.channel),displacementMapUv:Ce&&x(E.displacementMap.channel),emissiveMapUv:rt&&x(E.emissiveMap.channel),metalnessMapUv:Ne&&x(E.metalnessMap.channel),roughnessMapUv:C&&x(E.roughnessMap.channel),anisotropyMapUv:ce&&x(E.anisotropyMap.channel),clearcoatMapUv:Me&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:tt&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Xe&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&x(E.sheenRoughnessMap.channel),specularMapUv:Ke&&x(E.specularMap.channel),specularColorMapUv:et&&x(E.specularColorMap.channel),specularIntensityMapUv:ut&&x(E.specularIntensityMap.channel),transmissionMapUv:B&&x(E.transmissionMap.channel),thicknessMapUv:_e&&x(E.thicknessMap.channel),alphaMapUv:oe&&x(E.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Re||w),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!K.attributes.uv&&(Ye||oe),fog:!!J,useFog:E.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ue,skinning:X.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Fe,morphTextureStride:$e,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Pt,decodeVideoTexture:Ye&&E.map.isVideoTexture===!0&&ft.getTransfer(E.map.colorSpace)===Et,decodeVideoTextureEmissive:rt&&E.emissiveMap.isVideoTexture===!0&&ft.getTransfer(E.emissiveMap.colorSpace)===Et,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Dt,flipSided:E.side===Vt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Je&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&E.extensions.multiDraw===!0||De)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ut.vertexUv1s=l.has(1),Ut.vertexUv2s=l.has(2),Ut.vertexUv3s=l.has(3),l.clear(),Ut}function d(E){let M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(let L in E.defines)M.push(L),M.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(b(M,E),v(M,E),M.push(i.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function b(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function v(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),E.push(a.mask)}function y(E){let M=g[E.type],L;if(M){let W=Vn[M];L=ng.clone(W.uniforms)}else L=E.uniforms;return L}function T(E,M){let L;for(let W=0,X=h.length;W<X;W++){let J=h[W];if(J.cacheKey===M){L=J,++L.usedTimes;break}}return L===void 0&&(L=new hy(i,M,E,r),h.push(L)),L}function S(E){if(--E.usedTimes===0){let M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function A(E){c.remove(E)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:T,releaseProgram:S,releaseShaderCache:A,programs:h,dispose:I}}function dy(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function py(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function gf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,p,g,x,m){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=x,d.group=m),e++,d}function a(u,f,p,g,x,m){let d=o(u,f,p,g,x,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):t.push(d)}function c(u,f,p,g,x,m){let d=o(u,f,p,g,x,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||py),n.length>1&&n.sort(f||gf),s.length>1&&s.sort(f||gf)}function h(){for(let u=e,f=i.length;u<f;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function my(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new xf,i.set(n,[o])):s>=r.length?(o=new xf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function gy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Le};break;case"SpotLight":t={position:new O,direction:new O,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new O,halfWidth:new O,halfHeight:new O};break}return i[e.id]=t,t}}}function xy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var by=0;function yy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function _y(i){let e=new gy,t=xy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new O);let s=new O,r=new it,o=new it;function a(l){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,g=0,x=0,m=0,d=0,b=0,v=0,y=0,T=0,S=0,A=0;l.sort(yy);for(let E=0,M=l.length;E<M;E++){let L=l[E],W=L.color,X=L.intensity,J=L.distance,K=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=W.r*X,u+=W.g*X,f+=W.b*X;else if(L.isLightProbe){for(let Q=0;Q<9;Q++)n.probe[Q].addScaledVector(L.sh.coefficients[Q],X);A++}else if(L.isDirectionalLight){let Q=e.get(L);if(Q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let he=L.shadow,$=t.get(L);$.shadowIntensity=he.intensity,$.shadowBias=he.bias,$.shadowNormalBias=he.normalBias,$.shadowRadius=he.radius,$.shadowMapSize=he.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=L.shadow.matrix,b++}n.directional[p]=Q,p++}else if(L.isSpotLight){let Q=e.get(L);Q.position.setFromMatrixPosition(L.matrixWorld),Q.color.copy(W).multiplyScalar(X),Q.distance=J,Q.coneCos=Math.cos(L.angle),Q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Q.decay=L.decay,n.spot[x]=Q;let he=L.shadow;if(L.map&&(n.spotLightMap[T]=L.map,T++,he.updateMatrices(L),L.castShadow&&S++),n.spotLightMatrix[x]=he.matrix,L.castShadow){let $=t.get(L);$.shadowIntensity=he.intensity,$.shadowBias=he.bias,$.shadowNormalBias=he.normalBias,$.shadowRadius=he.radius,$.shadowMapSize=he.mapSize,n.spotShadow[x]=$,n.spotShadowMap[x]=K,y++}x++}else if(L.isRectAreaLight){let Q=e.get(L);Q.color.copy(W).multiplyScalar(X),Q.halfWidth.set(L.width*.5,0,0),Q.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=Q,m++}else if(L.isPointLight){let Q=e.get(L);if(Q.color.copy(L.color).multiplyScalar(L.intensity),Q.distance=L.distance,Q.decay=L.decay,L.castShadow){let he=L.shadow,$=t.get(L);$.shadowIntensity=he.intensity,$.shadowBias=he.bias,$.shadowNormalBias=he.normalBias,$.shadowRadius=he.radius,$.shadowMapSize=he.mapSize,$.shadowCameraNear=he.camera.near,$.shadowCameraFar=he.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=L.shadow.matrix,v++}n.point[g]=Q,g++}else if(L.isHemisphereLight){let Q=e.get(L);Q.skyColor.copy(L.color).multiplyScalar(X),Q.groundColor.copy(L.groundColor).multiplyScalar(X),n.hemi[d]=Q,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let I=n.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==x||I.rectAreaLength!==m||I.hemiLength!==d||I.numDirectionalShadows!==b||I.numPointShadows!==v||I.numSpotShadows!==y||I.numSpotMaps!==T||I.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+T-S,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,I.directionalLength=p,I.pointLength=g,I.spotLength=x,I.rectAreaLength=m,I.hemiLength=d,I.numDirectionalShadows=b,I.numPointShadows=v,I.numSpotShadows=y,I.numSpotMaps=T,I.numLightProbes=A,n.version=by++)}function c(l,h){let u=0,f=0,p=0,g=0,x=0,m=h.matrixWorldInverse;for(let d=0,b=l.length;d<b;d++){let v=l[d];if(v.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(v.isSpotLight){let y=n.spot[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let y=n.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let y=n.hemi[x];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function bf(i){let e=new _y(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function vy(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new bf(i),e.set(s,[a])):r>=o.length?(a=new bf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var wl=class extends rn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=dm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Tl=class extends rn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},My=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sy=`uniform sampler2D shadow_pass;
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
}`;function Ey(i,e,t){let n=new kr,s=new We,r=new We,o=new _t,a=new wl({depthPacking:pm}),c=new Tl,l={},h=t.maxTextureSize,u={[_n]:Vt,[Vt]:_n,[Dt]:Dt},f=new Zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:My,fragmentShader:Sy}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new Ct;g.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new we(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bf;let d=this.type;this.render=function(S,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;let E=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),W=i.state;W.setBlending(wi),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let X=d!==ti&&this.type===ti,J=d===ti&&this.type!==ti;for(let K=0,Q=S.length;K<Q;K++){let he=S[K],$=he.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",he,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);let xe=$.getFrameExtents();if(s.multiply(xe),r.copy($.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/xe.x),s.x=r.x*xe.x,$.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/xe.y),s.y=r.y*xe.y,$.mapSize.y=r.y)),$.map===null||X===!0||J===!0){let Fe=this.type!==ti?{minFilter:Wt,magFilter:Wt}:{};$.map!==null&&$.map.dispose(),$.map=new ci(s.x,s.y,Fe),$.map.texture.name=he.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();let be=$.getViewportCount();for(let Fe=0;Fe<be;Fe++){let $e=$.getViewport(Fe);o.set(r.x*$e.x,r.y*$e.y,r.x*$e.z,r.y*$e.w),W.viewport(o),$.updateMatrices(he,Fe),n=$.getFrustum(),y(A,I,$.camera,he,this.type)}$.isPointLightShadow!==!0&&this.type===ti&&b($,I),$.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(E,M,L)};function b(S,A){let I=e.update(x);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new ci(s.x,s.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(A,null,I,f,x,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(A,null,I,p,x,null)}function v(S,A,I,E){let M=null,L=I.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(L!==void 0)M=L;else if(M=I.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let W=M.uuid,X=A.uuid,J=l[W];J===void 0&&(J={},l[W]=J);let K=J[X];K===void 0&&(K=M.clone(),J[X]=K,A.addEventListener("dispose",T)),M=K}if(M.visible=A.visible,M.wireframe=A.wireframe,E===ti?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let W=i.properties.get(M);W.light=I}return M}function y(S,A,I,E,M){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&M===ti)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,S.matrixWorld);let X=e.update(S),J=S.material;if(Array.isArray(J)){let K=X.groups;for(let Q=0,he=K.length;Q<he;Q++){let $=K[Q],xe=J[$.materialIndex];if(xe&&xe.visible){let be=v(S,xe,E,M);S.onBeforeShadow(i,S,A,I,X,be,$),i.renderBufferDirect(I,null,X,be,S,$),S.onAfterShadow(i,S,A,I,X,be,$)}}}else if(J.visible){let K=v(S,J,E,M);S.onBeforeShadow(i,S,A,I,X,K,null),i.renderBufferDirect(I,null,X,K,S,null),S.onAfterShadow(i,S,A,I,X,K,null)}}let W=S.children;for(let X=0,J=W.length;X<J;X++)y(W[X],A,I,E,M)}function T(S){S.target.removeEventListener("dispose",T);for(let I in l){let E=l[I],M=S.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}var wy={[Lc]:Dc,[Uc]:Fc,[zc]:Oc,[Hs]:Nc,[Dc]:Lc,[Fc]:Uc,[Oc]:zc,[Nc]:Hs};function Ty(i,e){function t(){let B=!1,_e=new _t,ee=null,oe=new _t(0,0,0,0);return{setMask:function(Se){ee!==Se&&!B&&(i.colorMask(Se,Se,Se,Se),ee=Se)},setLocked:function(Se){B=Se},setClear:function(Se,ve,Je,Pt,Ut){Ut===!0&&(Se*=Pt,ve*=Pt,Je*=Pt),_e.set(Se,ve,Je,Pt),oe.equals(_e)===!1&&(i.clearColor(Se,ve,Je,Pt),oe.copy(_e))},reset:function(){B=!1,ee=null,oe.set(-1,0,0,0)}}}function n(){let B=!1,_e=!1,ee=null,oe=null,Se=null;return{setReversed:function(ve){if(_e!==ve){let Je=e.get("EXT_clip_control");_e?Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.ZERO_TO_ONE_EXT):Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.NEGATIVE_ONE_TO_ONE_EXT);let Pt=Se;Se=null,this.setClear(Pt)}_e=ve},getReversed:function(){return _e},setTest:function(ve){ve?Y(i.DEPTH_TEST):ue(i.DEPTH_TEST)},setMask:function(ve){ee!==ve&&!B&&(i.depthMask(ve),ee=ve)},setFunc:function(ve){if(_e&&(ve=wy[ve]),oe!==ve){switch(ve){case Lc:i.depthFunc(i.NEVER);break;case Dc:i.depthFunc(i.ALWAYS);break;case Uc:i.depthFunc(i.LESS);break;case Hs:i.depthFunc(i.LEQUAL);break;case zc:i.depthFunc(i.EQUAL);break;case Nc:i.depthFunc(i.GEQUAL);break;case Fc:i.depthFunc(i.GREATER);break;case Oc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=ve}},setLocked:function(ve){B=ve},setClear:function(ve){Se!==ve&&(_e&&(ve=1-ve),i.clearDepth(ve),Se=ve)},reset:function(){B=!1,ee=null,oe=null,Se=null,_e=!1}}}function s(){let B=!1,_e=null,ee=null,oe=null,Se=null,ve=null,Je=null,Pt=null,Ut=null;return{setTest:function(yt){B||(yt?Y(i.STENCIL_TEST):ue(i.STENCIL_TEST))},setMask:function(yt){_e!==yt&&!B&&(i.stencilMask(yt),_e=yt)},setFunc:function(yt,fn,Ln){(ee!==yt||oe!==fn||Se!==Ln)&&(i.stencilFunc(yt,fn,Ln),ee=yt,oe=fn,Se=Ln)},setOp:function(yt,fn,Ln){(ve!==yt||Je!==fn||Pt!==Ln)&&(i.stencilOp(yt,fn,Ln),ve=yt,Je=fn,Pt=Ln)},setLocked:function(yt){B=yt},setClear:function(yt){Ut!==yt&&(i.clearStencil(yt),Ut=yt)},reset:function(){B=!1,_e=null,ee=null,oe=null,Se=null,ve=null,Je=null,Pt=null,Ut=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,b=null,v=null,y=null,T=null,S=null,A=new Le(0,0,0),I=0,E=!1,M=null,L=null,W=null,X=null,J=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Q=!1,he=0,$=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(he=parseFloat(/^WebGL (\d)/.exec($)[1]),Q=he>=1):$.indexOf("OpenGL ES")!==-1&&(he=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),Q=he>=2);let xe=null,be={},Fe=i.getParameter(i.SCISSOR_BOX),$e=i.getParameter(i.VIEWPORT),ht=new _t().fromArray(Fe),ne=new _t().fromArray($e);function D(B,_e,ee,oe){let Se=new Uint8Array(4),ve=i.createTexture();i.bindTexture(B,ve),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Je=0;Je<ee;Je++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(_e+Je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return ve}let F={};F[i.TEXTURE_2D]=D(i.TEXTURE_2D,i.TEXTURE_2D,1),F[i.TEXTURE_CUBE_MAP]=D(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),F[i.TEXTURE_2D_ARRAY]=D(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),F[i.TEXTURE_3D]=D(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Y(i.DEPTH_TEST),o.setFunc(Hs),ge(!1),Re(Mu),Y(i.CULL_FACE),k(wi);function Y(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function ue(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function de(B,_e){return u[B]!==_e?(i.bindFramebuffer(B,_e),u[B]=_e,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_e),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function De(B,_e){let ee=p,oe=!1;if(B){ee=f.get(_e),ee===void 0&&(ee=[],f.set(_e,ee));let Se=B.textures;if(ee.length!==Se.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,Je=Se.length;ve<Je;ve++)ee[ve]=i.COLOR_ATTACHMENT0+ve;ee.length=Se.length,oe=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,oe=!0);oe&&i.drawBuffers(ee)}function Ye(B){return g!==B?(i.useProgram(B),g=B,!0):!1}let Te={[Zi]:i.FUNC_ADD,[kp]:i.FUNC_SUBTRACT,[Bp]:i.FUNC_REVERSE_SUBTRACT};Te[Hp]=i.MIN,Te[Gp]=i.MAX;let je={[Vp]:i.ZERO,[Wp]:i.ONE,[Xp]:i.SRC_COLOR,[Ic]:i.SRC_ALPHA,[Jp]:i.SRC_ALPHA_SATURATE,[Zp]:i.DST_COLOR,[Yp]:i.DST_ALPHA,[qp]:i.ONE_MINUS_SRC_COLOR,[Pc]:i.ONE_MINUS_SRC_ALPHA,[Kp]:i.ONE_MINUS_DST_COLOR,[jp]:i.ONE_MINUS_DST_ALPHA,[Qp]:i.CONSTANT_COLOR,[$p]:i.ONE_MINUS_CONSTANT_COLOR,[em]:i.CONSTANT_ALPHA,[tm]:i.ONE_MINUS_CONSTANT_ALPHA};function k(B,_e,ee,oe,Se,ve,Je,Pt,Ut,yt){if(B===wi){x===!0&&(ue(i.BLEND),x=!1);return}if(x===!1&&(Y(i.BLEND),x=!0),B!==Op){if(B!==m||yt!==E){if((d!==Zi||y!==Zi)&&(i.blendEquation(i.FUNC_ADD),d=Zi,y=Zi),yt)switch(B){case Fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zr:i.blendFunc(i.ONE,i.ONE);break;case Su:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Su:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}b=null,v=null,T=null,S=null,A.set(0,0,0),I=0,m=B,E=yt}return}Se=Se||_e,ve=ve||ee,Je=Je||oe,(_e!==d||Se!==y)&&(i.blendEquationSeparate(Te[_e],Te[Se]),d=_e,y=Se),(ee!==b||oe!==v||ve!==T||Je!==S)&&(i.blendFuncSeparate(je[ee],je[oe],je[ve],je[Je]),b=ee,v=oe,T=ve,S=Je),(Pt.equals(A)===!1||Ut!==I)&&(i.blendColor(Pt.r,Pt.g,Pt.b,Ut),A.copy(Pt),I=Ut),m=B,E=!1}function le(B,_e){B.side===Dt?ue(i.CULL_FACE):Y(i.CULL_FACE);let ee=B.side===Vt;_e&&(ee=!ee),ge(ee),B.blending===Fs&&B.transparent===!1?k(wi):k(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);let oe=B.stencilWrite;a.setTest(oe),oe&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),rt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?Y(i.SAMPLE_ALPHA_TO_COVERAGE):ue(i.SAMPLE_ALPHA_TO_COVERAGE)}function ge(B){M!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),M=B)}function Re(B){B!==Np?(Y(i.CULL_FACE),B!==L&&(B===Mu?i.cullFace(i.BACK):B===Fp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ue(i.CULL_FACE),L=B}function Ce(B){B!==W&&(Q&&i.lineWidth(B),W=B)}function rt(B,_e,ee){B?(Y(i.POLYGON_OFFSET_FILL),(X!==_e||J!==ee)&&(i.polygonOffset(_e,ee),X=_e,J=ee)):ue(i.POLYGON_OFFSET_FILL)}function Ne(B){B?Y(i.SCISSOR_TEST):ue(i.SCISSOR_TEST)}function C(B){B===void 0&&(B=i.TEXTURE0+K-1),xe!==B&&(i.activeTexture(B),xe=B)}function w(B,_e,ee){ee===void 0&&(xe===null?ee=i.TEXTURE0+K-1:ee=xe);let oe=be[ee];oe===void 0&&(oe={type:void 0,texture:void 0},be[ee]=oe),(oe.type!==B||oe.texture!==_e)&&(xe!==ee&&(i.activeTexture(ee),xe=ee),i.bindTexture(B,_e||F[B]),oe.type=B,oe.texture=_e)}function q(){let B=be[xe];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function re(){try{i.compressedTexImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ae(){try{i.compressedTexImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function se(){try{i.texSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Oe(){try{i.texSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ce(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function tt(){try{i.texStorage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function fe(){try{i.texStorage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ue(){try{i.texImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Xe(){try{i.texImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ve(B){ht.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),ht.copy(B))}function Ae(B){ne.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),ne.copy(B))}function Ke(B,_e){let ee=l.get(_e);ee===void 0&&(ee=new WeakMap,l.set(_e,ee));let oe=ee.get(B);oe===void 0&&(oe=i.getUniformBlockIndex(_e,B.name),ee.set(B,oe))}function et(B,_e){let oe=l.get(_e).get(B);c.get(_e)!==oe&&(i.uniformBlockBinding(_e,oe,B.__bindingPointIndex),c.set(_e,oe))}function ut(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},xe=null,be={},u={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,b=null,v=null,y=null,T=null,S=null,A=new Le(0,0,0),I=0,E=!1,M=null,L=null,W=null,X=null,J=null,ht.set(0,0,i.canvas.width,i.canvas.height),ne.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Y,disable:ue,bindFramebuffer:de,drawBuffers:De,useProgram:Ye,setBlending:k,setMaterial:le,setFlipSided:ge,setCullFace:Re,setLineWidth:Ce,setPolygonOffset:rt,setScissorTest:Ne,activeTexture:C,bindTexture:w,unbindTexture:q,compressedTexImage2D:re,compressedTexImage3D:ae,texImage2D:Ue,texImage3D:Xe,updateUBOMapping:Ke,uniformBlockBinding:et,texStorage2D:tt,texStorage3D:fe,texSubImage2D:se,texSubImage3D:Oe,compressedTexSubImage2D:ce,compressedTexSubImage3D:Me,scissor:Ve,viewport:Ae,reset:ut}}function yf(i,e,t,n){let s=Ay(n);switch(t){case Xf:return i*e;case Yf:return i*e;case jf:return i*e*2;case Jl:return i*e/s.components*s.byteLength;case Ql:return i*e/s.components*s.byteLength;case Zf:return i*e*2/s.components*s.byteLength;case $l:return i*e*2/s.components*s.byteLength;case qf:return i*e*3/s.components*s.byteLength;case Rn:return i*e*4/s.components*s.byteLength;case eh:return i*e*4/s.components*s.byteLength;case Oo:case ko:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Bo:case Ho:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Gc:case Wc:return Math.max(i,16)*Math.max(e,8)/4;case Hc:case Vc:return Math.max(i,8)*Math.max(e,8)/2;case Xc:case qc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Yc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Kc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Jc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Qc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case $c:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case el:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case tl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case nl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case il:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case sl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case rl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ol:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case al:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Go:case cl:case ll:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Kf:case hl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ul:case fl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ay(i){switch(i){case oi:case Gf:return{byteLength:1,components:1};case Fr:case Vf:case Xr:return{byteLength:2,components:1};case Zl:case Kl:return{byteLength:2,components:4};case Qi:case jl:case Fn:return{byteLength:4,components:1};case Wf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Ry(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,h=new WeakMap,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,w){return p?new OffscreenCanvas(C,w):Or("canvas")}function x(C,w,q){let re=1,ae=Ne(C);if((ae.width>q||ae.height>q)&&(re=q/Math.max(ae.width,ae.height)),re<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let se=Math.floor(re*ae.width),Oe=Math.floor(re*ae.height);u===void 0&&(u=g(se,Oe));let ce=w?g(se,Oe):u;return ce.width=se,ce.height=Oe,ce.getContext("2d").drawImage(C,0,0,se,Oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+se+"x"+Oe+")."),ce}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),C;return C}function m(C){return C.generateMipmaps}function d(C){i.generateMipmap(C)}function b(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(C,w,q,re,ae=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let se=w;if(w===i.RED&&(q===i.FLOAT&&(se=i.R32F),q===i.HALF_FLOAT&&(se=i.R16F),q===i.UNSIGNED_BYTE&&(se=i.R8)),w===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(se=i.R8UI),q===i.UNSIGNED_SHORT&&(se=i.R16UI),q===i.UNSIGNED_INT&&(se=i.R32UI),q===i.BYTE&&(se=i.R8I),q===i.SHORT&&(se=i.R16I),q===i.INT&&(se=i.R32I)),w===i.RG&&(q===i.FLOAT&&(se=i.RG32F),q===i.HALF_FLOAT&&(se=i.RG16F),q===i.UNSIGNED_BYTE&&(se=i.RG8)),w===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(se=i.RG8UI),q===i.UNSIGNED_SHORT&&(se=i.RG16UI),q===i.UNSIGNED_INT&&(se=i.RG32UI),q===i.BYTE&&(se=i.RG8I),q===i.SHORT&&(se=i.RG16I),q===i.INT&&(se=i.RG32I)),w===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(se=i.RGB8UI),q===i.UNSIGNED_SHORT&&(se=i.RGB16UI),q===i.UNSIGNED_INT&&(se=i.RGB32UI),q===i.BYTE&&(se=i.RGB8I),q===i.SHORT&&(se=i.RGB16I),q===i.INT&&(se=i.RGB32I)),w===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(se=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(se=i.RGBA16UI),q===i.UNSIGNED_INT&&(se=i.RGBA32UI),q===i.BYTE&&(se=i.RGBA8I),q===i.SHORT&&(se=i.RGBA16I),q===i.INT&&(se=i.RGBA32I)),w===i.RGB&&q===i.UNSIGNED_INT_5_9_9_9_REV&&(se=i.RGB9_E5),w===i.RGBA){let Oe=ae?Ea:ft.getTransfer(re);q===i.FLOAT&&(se=i.RGBA32F),q===i.HALF_FLOAT&&(se=i.RGBA16F),q===i.UNSIGNED_BYTE&&(se=Oe===Et?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(se=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(se=i.RGB5_A1)}return(se===i.R16F||se===i.R32F||se===i.RG16F||se===i.RG32F||se===i.RGBA16F||se===i.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function y(C,w){let q;return C?w===null||w===Qi||w===Ws?q=i.DEPTH24_STENCIL8:w===Fn?q=i.DEPTH32F_STENCIL8:w===Fr&&(q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Qi||w===Ws?q=i.DEPTH_COMPONENT24:w===Fn?q=i.DEPTH_COMPONENT32F:w===Fr&&(q=i.DEPTH_COMPONENT16),q}function T(C,w){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Wt&&C.minFilter!==sn?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function S(C){let w=C.target;w.removeEventListener("dispose",S),I(w),w.isVideoTexture&&h.delete(w)}function A(C){let w=C.target;w.removeEventListener("dispose",A),M(w)}function I(C){let w=n.get(C);if(w.__webglInit===void 0)return;let q=C.source,re=f.get(q);if(re){let ae=re[w.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&E(C),Object.keys(re).length===0&&f.delete(q)}n.remove(C)}function E(C){let w=n.get(C);i.deleteTexture(w.__webglTexture);let q=C.source,re=f.get(q);delete re[w.__cacheKey],o.memory.textures--}function M(C){let w=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(w.__webglFramebuffer[re]))for(let ae=0;ae<w.__webglFramebuffer[re].length;ae++)i.deleteFramebuffer(w.__webglFramebuffer[re][ae]);else i.deleteFramebuffer(w.__webglFramebuffer[re]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[re])}else{if(Array.isArray(w.__webglFramebuffer))for(let re=0;re<w.__webglFramebuffer.length;re++)i.deleteFramebuffer(w.__webglFramebuffer[re]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let re=0;re<w.__webglColorRenderbuffer.length;re++)w.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[re]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let q=C.textures;for(let re=0,ae=q.length;re<ae;re++){let se=n.get(q[re]);se.__webglTexture&&(i.deleteTexture(se.__webglTexture),o.memory.textures--),n.remove(q[re])}n.remove(C)}let L=0;function W(){L=0}function X(){let C=L;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),L+=1,C}function J(C){let w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function K(C,w){let q=n.get(C);if(C.isVideoTexture&&Ce(C),C.isRenderTargetTexture===!1&&C.version>0&&q.__version!==C.version){let re=C.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ne(q,C,w);return}}t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+w)}function Q(C,w){let q=n.get(C);if(C.version>0&&q.__version!==C.version){ne(q,C,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+w)}function he(C,w){let q=n.get(C);if(C.version>0&&q.__version!==C.version){ne(q,C,w);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+w)}function $(C,w){let q=n.get(C);if(C.version>0&&q.__version!==C.version){D(q,C,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+w)}let xe={[Ji]:i.REPEAT,[ii]:i.CLAMP_TO_EDGE,[Nr]:i.MIRRORED_REPEAT},be={[Wt]:i.NEAREST,[Yl]:i.NEAREST_MIPMAP_NEAREST,[Ds]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[Pr]:i.LINEAR_MIPMAP_NEAREST,[An]:i.LINEAR_MIPMAP_LINEAR},Fe={[gm]:i.NEVER,[Mm]:i.ALWAYS,[xm]:i.LESS,[Qf]:i.LEQUAL,[bm]:i.EQUAL,[vm]:i.GEQUAL,[ym]:i.GREATER,[_m]:i.NOTEQUAL};function $e(C,w){if(w.type===Fn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===sn||w.magFilter===Pr||w.magFilter===Ds||w.magFilter===An||w.minFilter===sn||w.minFilter===Pr||w.minFilter===Ds||w.minFilter===An)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,xe[w.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,xe[w.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,xe[w.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,be[w.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,be[w.minFilter]),w.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Fe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Wt||w.minFilter!==Ds&&w.minFilter!==An||w.type===Fn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function ht(C,w){let q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",S));let re=w.source,ae=f.get(re);ae===void 0&&(ae={},f.set(re,ae));let se=J(w);if(se!==C.__cacheKey){ae[se]===void 0&&(ae[se]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ae[se].usedTimes++;let Oe=ae[C.__cacheKey];Oe!==void 0&&(ae[C.__cacheKey].usedTimes--,Oe.usedTimes===0&&E(w)),C.__cacheKey=se,C.__webglTexture=ae[se].texture}return q}function ne(C,w,q){let re=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(re=i.TEXTURE_3D);let ae=ht(C,w),se=w.source;t.bindTexture(re,C.__webglTexture,i.TEXTURE0+q);let Oe=n.get(se);if(se.version!==Oe.__version||ae===!0){t.activeTexture(i.TEXTURE0+q);let ce=ft.getPrimaries(ft.workingColorSpace),Me=w.colorSpace===Wn?null:ft.getPrimaries(w.colorSpace),tt=w.colorSpace===Wn||ce===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let fe=x(w.image,!1,s.maxTextureSize);fe=rt(w,fe);let Ue=r.convert(w.format,w.colorSpace),Xe=r.convert(w.type),Ve=v(w.internalFormat,Ue,Xe,w.colorSpace,w.isVideoTexture);$e(re,w);let Ae,Ke=w.mipmaps,et=w.isVideoTexture!==!0,ut=Oe.__version===void 0||ae===!0,B=se.dataReady,_e=T(w,fe);if(w.isDepthTexture)Ve=y(w.format===Xs,w.type),ut&&(et?t.texStorage2D(i.TEXTURE_2D,1,Ve,fe.width,fe.height):t.texImage2D(i.TEXTURE_2D,0,Ve,fe.width,fe.height,0,Ue,Xe,null));else if(w.isDataTexture)if(Ke.length>0){et&&ut&&t.texStorage2D(i.TEXTURE_2D,_e,Ve,Ke[0].width,Ke[0].height);for(let ee=0,oe=Ke.length;ee<oe;ee++)Ae=Ke[ee],et?B&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Ae.width,Ae.height,Ue,Xe,Ae.data):t.texImage2D(i.TEXTURE_2D,ee,Ve,Ae.width,Ae.height,0,Ue,Xe,Ae.data);w.generateMipmaps=!1}else et?(ut&&t.texStorage2D(i.TEXTURE_2D,_e,Ve,fe.width,fe.height),B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe.width,fe.height,Ue,Xe,fe.data)):t.texImage2D(i.TEXTURE_2D,0,Ve,fe.width,fe.height,0,Ue,Xe,fe.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){et&&ut&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Ve,Ke[0].width,Ke[0].height,fe.depth);for(let ee=0,oe=Ke.length;ee<oe;ee++)if(Ae=Ke[ee],w.format!==Rn)if(Ue!==null)if(et){if(B)if(w.layerUpdates.size>0){let Se=yf(Ae.width,Ae.height,w.format,w.type);for(let ve of w.layerUpdates){let Je=Ae.data.subarray(ve*Se/Ae.data.BYTES_PER_ELEMENT,(ve+1)*Se/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,ve,Ae.width,Ae.height,1,Ue,Je)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Ae.width,Ae.height,fe.depth,Ue,Ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Ve,Ae.width,Ae.height,fe.depth,0,Ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?B&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Ae.width,Ae.height,fe.depth,Ue,Xe,Ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Ve,Ae.width,Ae.height,fe.depth,0,Ue,Xe,Ae.data)}else{et&&ut&&t.texStorage2D(i.TEXTURE_2D,_e,Ve,Ke[0].width,Ke[0].height);for(let ee=0,oe=Ke.length;ee<oe;ee++)Ae=Ke[ee],w.format!==Rn?Ue!==null?et?B&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,Ae.width,Ae.height,Ue,Ae.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Ve,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?B&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Ae.width,Ae.height,Ue,Xe,Ae.data):t.texImage2D(i.TEXTURE_2D,ee,Ve,Ae.width,Ae.height,0,Ue,Xe,Ae.data)}else if(w.isDataArrayTexture)if(et){if(ut&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Ve,fe.width,fe.height,fe.depth),B)if(w.layerUpdates.size>0){let ee=yf(fe.width,fe.height,w.format,w.type);for(let oe of w.layerUpdates){let Se=fe.data.subarray(oe*ee/fe.data.BYTES_PER_ELEMENT,(oe+1)*ee/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,fe.width,fe.height,1,Ue,Xe,Se)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Ue,Xe,fe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ve,fe.width,fe.height,fe.depth,0,Ue,Xe,fe.data);else if(w.isData3DTexture)et?(ut&&t.texStorage3D(i.TEXTURE_3D,_e,Ve,fe.width,fe.height,fe.depth),B&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Ue,Xe,fe.data)):t.texImage3D(i.TEXTURE_3D,0,Ve,fe.width,fe.height,fe.depth,0,Ue,Xe,fe.data);else if(w.isFramebufferTexture){if(ut)if(et)t.texStorage2D(i.TEXTURE_2D,_e,Ve,fe.width,fe.height);else{let ee=fe.width,oe=fe.height;for(let Se=0;Se<_e;Se++)t.texImage2D(i.TEXTURE_2D,Se,Ve,ee,oe,0,Ue,Xe,null),ee>>=1,oe>>=1}}else if(Ke.length>0){if(et&&ut){let ee=Ne(Ke[0]);t.texStorage2D(i.TEXTURE_2D,_e,Ve,ee.width,ee.height)}for(let ee=0,oe=Ke.length;ee<oe;ee++)Ae=Ke[ee],et?B&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Ue,Xe,Ae):t.texImage2D(i.TEXTURE_2D,ee,Ve,Ue,Xe,Ae);w.generateMipmaps=!1}else if(et){if(ut){let ee=Ne(fe);t.texStorage2D(i.TEXTURE_2D,_e,Ve,ee.width,ee.height)}B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ue,Xe,fe)}else t.texImage2D(i.TEXTURE_2D,0,Ve,Ue,Xe,fe);m(w)&&d(re),Oe.__version=se.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function D(C,w,q){if(w.image.length!==6)return;let re=ht(C,w),ae=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+q);let se=n.get(ae);if(ae.version!==se.__version||re===!0){t.activeTexture(i.TEXTURE0+q);let Oe=ft.getPrimaries(ft.workingColorSpace),ce=w.colorSpace===Wn?null:ft.getPrimaries(w.colorSpace),Me=w.colorSpace===Wn||Oe===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let tt=w.isCompressedTexture||w.image[0].isCompressedTexture,fe=w.image[0]&&w.image[0].isDataTexture,Ue=[];for(let oe=0;oe<6;oe++)!tt&&!fe?Ue[oe]=x(w.image[oe],!0,s.maxCubemapSize):Ue[oe]=fe?w.image[oe].image:w.image[oe],Ue[oe]=rt(w,Ue[oe]);let Xe=Ue[0],Ve=r.convert(w.format,w.colorSpace),Ae=r.convert(w.type),Ke=v(w.internalFormat,Ve,Ae,w.colorSpace),et=w.isVideoTexture!==!0,ut=se.__version===void 0||re===!0,B=ae.dataReady,_e=T(w,Xe);$e(i.TEXTURE_CUBE_MAP,w);let ee;if(tt){et&&ut&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,Ke,Xe.width,Xe.height);for(let oe=0;oe<6;oe++){ee=Ue[oe].mipmaps;for(let Se=0;Se<ee.length;Se++){let ve=ee[Se];w.format!==Rn?Ve!==null?et?B&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Se,0,0,ve.width,ve.height,Ve,ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Se,Ke,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):et?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Se,0,0,ve.width,ve.height,Ve,Ae,ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Se,Ke,ve.width,ve.height,0,Ve,Ae,ve.data)}}}else{if(ee=w.mipmaps,et&&ut){ee.length>0&&_e++;let oe=Ne(Ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,Ke,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(fe){et?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ue[oe].width,Ue[oe].height,Ve,Ae,Ue[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ke,Ue[oe].width,Ue[oe].height,0,Ve,Ae,Ue[oe].data);for(let Se=0;Se<ee.length;Se++){let Je=ee[Se].image[oe].image;et?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Se+1,0,0,Je.width,Je.height,Ve,Ae,Je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Se+1,Ke,Je.width,Je.height,0,Ve,Ae,Je.data)}}else{et?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ve,Ae,Ue[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ke,Ve,Ae,Ue[oe]);for(let Se=0;Se<ee.length;Se++){let ve=ee[Se];et?B&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Se+1,0,0,Ve,Ae,ve.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Se+1,Ke,Ve,Ae,ve.image[oe])}}}m(w)&&d(i.TEXTURE_CUBE_MAP),se.__version=ae.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function F(C,w,q,re,ae,se){let Oe=r.convert(q.format,q.colorSpace),ce=r.convert(q.type),Me=v(q.internalFormat,Oe,ce,q.colorSpace),tt=n.get(w),fe=n.get(q);if(fe.__renderTarget=w,!tt.__hasExternalTextures){let Ue=Math.max(1,w.width>>se),Xe=Math.max(1,w.height>>se);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,se,Me,Ue,Xe,w.depth,0,Oe,ce,null):t.texImage2D(ae,se,Me,Ue,Xe,0,Oe,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Re(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ae,fe.__webglTexture,0,ge(w)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,ae,fe.__webglTexture,se),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Y(C,w,q){if(i.bindRenderbuffer(i.RENDERBUFFER,C),w.depthBuffer){let re=w.depthTexture,ae=re&&re.isDepthTexture?re.type:null,se=y(w.stencilBuffer,ae),Oe=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=ge(w);Re(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,se,w.width,w.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,se,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,se,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Oe,i.RENDERBUFFER,C)}else{let re=w.textures;for(let ae=0;ae<re.length;ae++){let se=re[ae],Oe=r.convert(se.format,se.colorSpace),ce=r.convert(se.type),Me=v(se.internalFormat,Oe,ce,se.colorSpace),tt=ge(w);q&&Re(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,Me,w.width,w.height):Re(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt,Me,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Me,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ue(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let re=n.get(w.depthTexture);re.__renderTarget=w,(!re.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),K(w.depthTexture,0);let ae=re.__webglTexture,se=ge(w);if(w.depthTexture.format===Os)Re(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(w.depthTexture.format===Xs)Re(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function de(C){let w=n.get(C),q=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){let re=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),re){let ae=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,re.removeEventListener("dispose",ae)};re.addEventListener("dispose",ae),w.__depthDisposeCallback=ae}w.__boundDepthTexture=re}if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ue(w.__webglFramebuffer,C)}else if(q){w.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[re]),w.__webglDepthbuffer[re]===void 0)w.__webglDepthbuffer[re]=i.createRenderbuffer(),Y(w.__webglDepthbuffer[re],C,!1);else{let ae=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=w.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,se)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Y(w.__webglDepthbuffer,C,!1);else{let re=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,ae)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(C,w,q){let re=n.get(C);w!==void 0&&F(re.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&de(C)}function Ye(C){let w=C.texture,q=n.get(C),re=n.get(w);C.addEventListener("dispose",A);let ae=C.textures,se=C.isWebGLCubeRenderTarget===!0,Oe=ae.length>1;if(Oe||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=w.version,o.memory.textures++),se){q.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(w.mipmaps&&w.mipmaps.length>0){q.__webglFramebuffer[ce]=[];for(let Me=0;Me<w.mipmaps.length;Me++)q.__webglFramebuffer[ce][Me]=i.createFramebuffer()}else q.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){q.__webglFramebuffer=[];for(let ce=0;ce<w.mipmaps.length;ce++)q.__webglFramebuffer[ce]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Oe)for(let ce=0,Me=ae.length;ce<Me;ce++){let tt=n.get(ae[ce]);tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&Re(C)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ce=0;ce<ae.length;ce++){let Me=ae[ce];q.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[ce]);let tt=r.convert(Me.format,Me.colorSpace),fe=r.convert(Me.type),Ue=v(Me.internalFormat,tt,fe,Me.colorSpace,C.isXRRenderTarget===!0),Xe=ge(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Xe,Ue,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,q.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),Y(q.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),$e(i.TEXTURE_CUBE_MAP,w);for(let ce=0;ce<6;ce++)if(w.mipmaps&&w.mipmaps.length>0)for(let Me=0;Me<w.mipmaps.length;Me++)F(q.__webglFramebuffer[ce][Me],C,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Me);else F(q.__webglFramebuffer[ce],C,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(w)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Oe){for(let ce=0,Me=ae.length;ce<Me;ce++){let tt=ae[ce],fe=n.get(tt);t.bindTexture(i.TEXTURE_2D,fe.__webglTexture),$e(i.TEXTURE_2D,tt),F(q.__webglFramebuffer,C,tt,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,0),m(tt)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ce=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,re.__webglTexture),$e(ce,w),w.mipmaps&&w.mipmaps.length>0)for(let Me=0;Me<w.mipmaps.length;Me++)F(q.__webglFramebuffer[Me],C,w,i.COLOR_ATTACHMENT0,ce,Me);else F(q.__webglFramebuffer,C,w,i.COLOR_ATTACHMENT0,ce,0);m(w)&&d(ce),t.unbindTexture()}C.depthBuffer&&de(C)}function Te(C){let w=C.textures;for(let q=0,re=w.length;q<re;q++){let ae=w[q];if(m(ae)){let se=b(C),Oe=n.get(ae).__webglTexture;t.bindTexture(se,Oe),d(se),t.unbindTexture()}}}let je=[],k=[];function le(C){if(C.samples>0){if(Re(C)===!1){let w=C.textures,q=C.width,re=C.height,ae=i.COLOR_BUFFER_BIT,se=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Oe=n.get(C),ce=w.length>1;if(ce)for(let Me=0;Me<w.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let Me=0;Me<w.length;Me++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Oe.__webglColorRenderbuffer[Me]);let tt=n.get(w[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,tt,0)}i.blitFramebuffer(0,0,q,re,0,0,q,re,ae,i.NEAREST),c===!0&&(je.length=0,k.length=0,je.push(i.COLOR_ATTACHMENT0+Me),C.depthBuffer&&C.resolveDepthBuffer===!1&&(je.push(se),k.push(se),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,k)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,je))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let Me=0;Me<w.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,Oe.__webglColorRenderbuffer[Me]);let tt=n.get(w[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,tt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let w=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function ge(C){return Math.min(s.maxSamples,C.samples)}function Re(C){let w=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ce(C){let w=o.render.frame;h.get(C)!==w&&(h.set(C,w),C.update())}function rt(C,w){let q=C.colorSpace,re=C.format,ae=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||q!==Kt&&q!==Wn&&(ft.getTransfer(q)===Et?(re!==Rn||ae!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),w}function Ne(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=W,this.setTexture2D=K,this.setTexture2DArray=Q,this.setTexture3D=he,this.setTextureCube=$,this.rebindTextures=De,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=F,this.useMultisampledRTT=Re}function Cy(i,e){function t(n,s=Wn){let r,o=ft.getTransfer(s);if(n===oi)return i.UNSIGNED_BYTE;if(n===Zl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Wf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gf)return i.BYTE;if(n===Vf)return i.SHORT;if(n===Fr)return i.UNSIGNED_SHORT;if(n===jl)return i.INT;if(n===Qi)return i.UNSIGNED_INT;if(n===Fn)return i.FLOAT;if(n===Xr)return i.HALF_FLOAT;if(n===Xf)return i.ALPHA;if(n===qf)return i.RGB;if(n===Rn)return i.RGBA;if(n===Yf)return i.LUMINANCE;if(n===jf)return i.LUMINANCE_ALPHA;if(n===Os)return i.DEPTH_COMPONENT;if(n===Xs)return i.DEPTH_STENCIL;if(n===Jl)return i.RED;if(n===Ql)return i.RED_INTEGER;if(n===Zf)return i.RG;if(n===$l)return i.RG_INTEGER;if(n===eh)return i.RGBA_INTEGER;if(n===Oo||n===ko||n===Bo||n===Ho)if(o===Et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Oo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Oo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ko)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Bo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ho)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Hc||n===Gc||n===Vc||n===Wc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Hc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Gc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Vc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xc||n===qc||n===Yc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xc||n===qc)return o===Et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Yc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===jc||n===Zc||n===Kc||n===Jc||n===Qc||n===$c||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===ol||n===al)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===jc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Kc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qc)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$c)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===el)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===tl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===nl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===il)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===sl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===rl)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ol)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===al)return o===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Go||n===cl||n===ll)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Go)return o===Et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kf||n===hl||n===ul||n===fl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===hl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ul)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Al=class extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Nt=class extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Iy={type:"move"},Ur=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),d=this._getHandJoint(l,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Iy)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Nt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Py=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ly=`
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

}`,Rl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new jt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Zt({vertexShader:Py,fragmentShader:Ly,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new we(new li(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Cl=class extends ai{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,g=null,x=new Rl,m=t.getContextAttributes(),d=null,b=null,v=[],y=[],T=new We,S=null,A=new Gt;A.viewport=new _t;let I=new Gt;I.viewport=new _t;let E=[A,I],M=new Al,L=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let D=v[ne];return D===void 0&&(D=new Ur,v[ne]=D),D.getTargetRaySpace()},this.getControllerGrip=function(ne){let D=v[ne];return D===void 0&&(D=new Ur,v[ne]=D),D.getGripSpace()},this.getHand=function(ne){let D=v[ne];return D===void 0&&(D=new Ur,v[ne]=D),D.getHandSpace()};function X(ne){let D=y.indexOf(ne.inputSource);if(D===-1)return;let F=v[D];F!==void 0&&(F.update(ne.inputSource,ne.frame,l||o),F.dispatchEvent({type:ne.type,data:ne.inputSource}))}function J(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",K);for(let ne=0;ne<v.length;ne++){let D=y[ne];D!==null&&(y[ne]=null,v[ne].disconnect(D))}L=null,W=null,x.reset(),e.setRenderTarget(d),p=null,f=null,u=null,s=null,b=null,ht.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){r=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){a=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ne){l=ne},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ne){if(s=ne,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",J),s.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0){let D={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,D),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new ci(p.framebufferWidth,p.framebufferHeight,{format:Rn,type:oi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let D=null,F=null,Y=null;m.depth&&(Y=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,D=m.stencil?Xs:Os,F=m.stencil?Ws:Qi);let ue={colorFormat:t.RGBA8,depthFormat:Y,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(ue),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new ci(f.textureWidth,f.textureHeight,{format:Rn,type:oi,depthTexture:new $o(f.textureWidth,f.textureHeight,F,void 0,void 0,void 0,void 0,void 0,void 0,D),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ht.setContext(s),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function K(ne){for(let D=0;D<ne.removed.length;D++){let F=ne.removed[D],Y=y.indexOf(F);Y>=0&&(y[Y]=null,v[Y].disconnect(F))}for(let D=0;D<ne.added.length;D++){let F=ne.added[D],Y=y.indexOf(F);if(Y===-1){for(let de=0;de<v.length;de++)if(de>=y.length){y.push(F),Y=de;break}else if(y[de]===null){y[de]=F,Y=de;break}if(Y===-1)break}let ue=v[Y];ue&&ue.connect(F)}}let Q=new O,he=new O;function $(ne,D,F){Q.setFromMatrixPosition(D.matrixWorld),he.setFromMatrixPosition(F.matrixWorld);let Y=Q.distanceTo(he),ue=D.projectionMatrix.elements,de=F.projectionMatrix.elements,De=ue[14]/(ue[10]-1),Ye=ue[14]/(ue[10]+1),Te=(ue[9]+1)/ue[5],je=(ue[9]-1)/ue[5],k=(ue[8]-1)/ue[0],le=(de[8]+1)/de[0],ge=De*k,Re=De*le,Ce=Y/(-k+le),rt=Ce*-k;if(D.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(rt),ne.translateZ(Ce),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),ue[10]===-1)ne.projectionMatrix.copy(D.projectionMatrix),ne.projectionMatrixInverse.copy(D.projectionMatrixInverse);else{let Ne=De+Ce,C=Ye+Ce,w=ge-rt,q=Re+(Y-rt),re=Te*Ye/C*Ne,ae=je*Ye/C*Ne;ne.projectionMatrix.makePerspective(w,q,re,ae,Ne,C),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function xe(ne,D){D===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(D.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(s===null)return;let D=ne.near,F=ne.far;x.texture!==null&&(x.depthNear>0&&(D=x.depthNear),x.depthFar>0&&(F=x.depthFar)),M.near=I.near=A.near=D,M.far=I.far=A.far=F,(L!==M.near||W!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,W=M.far),A.layers.mask=ne.layers.mask|2,I.layers.mask=ne.layers.mask|4,M.layers.mask=A.layers.mask|I.layers.mask;let Y=ne.parent,ue=M.cameras;xe(M,Y);for(let de=0;de<ue.length;de++)xe(ue[de],Y);ue.length===2?$(M,A,I):M.projectionMatrix.copy(A.projectionMatrix),be(ne,M,Y)};function be(ne,D,F){F===null?ne.matrix.copy(D.matrixWorld):(ne.matrix.copy(F.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(D.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(D.projectionMatrix),ne.projectionMatrixInverse.copy(D.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=js*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(ne){c=ne,f!==null&&(f.fixedFoveation=ne),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ne)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let Fe=null;function $e(ne,D){if(h=D.getViewerPose(l||o),g=D,h!==null){let F=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let Y=!1;F.length!==M.cameras.length&&(M.cameras.length=0,Y=!0);for(let de=0;de<F.length;de++){let De=F[de],Ye=null;if(p!==null)Ye=p.getViewport(De);else{let je=u.getViewSubImage(f,De);Ye=je.viewport,de===0&&(e.setRenderTargetTextures(b,je.colorTexture,f.ignoreDepthValues?void 0:je.depthStencilTexture),e.setRenderTarget(b))}let Te=E[de];Te===void 0&&(Te=new Gt,Te.layers.enable(de),Te.viewport=new _t,E[de]=Te),Te.matrix.fromArray(De.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(De.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),de===0&&(M.matrix.copy(Te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Y===!0&&M.cameras.push(Te)}let ue=s.enabledFeatures;if(ue&&ue.includes("depth-sensing")){let de=u.getDepthInformation(F[0]);de&&de.isValid&&de.texture&&x.init(e,de,s.renderState)}}for(let F=0;F<v.length;F++){let Y=y[F],ue=v[F];Y!==null&&ue!==void 0&&ue.update(Y,D,l||o)}Fe&&Fe(ne,D),D.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:D}),g=null}let ht=new sd;ht.setAnimationLoop($e),this.setAnimationLoop=function(ne){Fe=ne},this.dispose=function(){}}},Yi=new kn,Dy=new it;function Uy(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,id(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,b,v,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,b,v):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Vt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Vt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let b=e.get(d),v=b.envMap,y=b.envMapRotation;v&&(m.envMap.value=v,Yi.copy(y),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),m.envMapRotation.value.setFromMatrix4(Dy.makeRotationFromEuler(Yi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,b,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=v*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Vt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){let b=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function zy(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,v){let y=v.program;n.uniformBlockBinding(b,y)}function l(b,v){let y=s[b.id];y===void 0&&(g(b),y=h(b),s[b.id]=y,b.addEventListener("dispose",m));let T=v.program;n.updateUBOMapping(b,T);let S=e.render.frame;r[b.id]!==S&&(f(b),r[b.id]=S)}function h(b){let v=u();b.__bindingPointIndex=v;let y=i.createBuffer(),T=b.__size,S=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,T,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,y),y}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let v=s[b.id],y=b.uniforms,T=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let S=0,A=y.length;S<A;S++){let I=Array.isArray(y[S])?y[S]:[y[S]];for(let E=0,M=I.length;E<M;E++){let L=I[E];if(p(L,S,E,T)===!0){let W=L.__offset,X=Array.isArray(L.value)?L.value:[L.value],J=0;for(let K=0;K<X.length;K++){let Q=X[K],he=x(Q);typeof Q=="number"||typeof Q=="boolean"?(L.__data[0]=Q,i.bufferSubData(i.UNIFORM_BUFFER,W+J,L.__data)):Q.isMatrix3?(L.__data[0]=Q.elements[0],L.__data[1]=Q.elements[1],L.__data[2]=Q.elements[2],L.__data[3]=0,L.__data[4]=Q.elements[3],L.__data[5]=Q.elements[4],L.__data[6]=Q.elements[5],L.__data[7]=0,L.__data[8]=Q.elements[6],L.__data[9]=Q.elements[7],L.__data[10]=Q.elements[8],L.__data[11]=0):(Q.toArray(L.__data,J),J+=he.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,v,y,T){let S=b.value,A=v+"_"+y;if(T[A]===void 0)return typeof S=="number"||typeof S=="boolean"?T[A]=S:T[A]=S.clone(),!0;{let I=T[A];if(typeof S=="number"||typeof S=="boolean"){if(I!==S)return T[A]=S,!0}else if(I.equals(S)===!1)return I.copy(S),!0}return!1}function g(b){let v=b.uniforms,y=0,T=16;for(let A=0,I=v.length;A<I;A++){let E=Array.isArray(v[A])?v[A]:[v[A]];for(let M=0,L=E.length;M<L;M++){let W=E[M],X=Array.isArray(W.value)?W.value:[W.value];for(let J=0,K=X.length;J<K;J++){let Q=X[J],he=x(Q),$=y%T,xe=$%he.boundary,be=$+xe;y+=xe,be!==0&&T-be<he.storage&&(y+=T-be),W.__data=new Float32Array(he.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=y,y+=he.storage}}}let S=y%T;return S>0&&(y+=T-S),b.__size=y,b.__cache={},this}function x(b){let v={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=48,v.storage=48):b.isMatrix4?(v.boundary=64,v.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),v}function m(b){let v=b.target;v.removeEventListener("dispose",m);let y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function d(){for(let b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}var ea=class{constructor(e={}){let{canvas:t=km(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,d=null,b=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this.toneMapping=Ti,this.toneMappingExposure=1;let y=this,T=!1,S=0,A=0,I=null,E=-1,M=null,L=new _t,W=new _t,X=null,J=new Le(0),K=0,Q=t.width,he=t.height,$=1,xe=null,be=null,Fe=new _t(0,0,Q,he),$e=new _t(0,0,Q,he),ht=!1,ne=new kr,D=!1,F=!1,Y=new it,ue=new it,de=new O,De=new _t,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function je(){return I===null?$:1}let k=n;function le(R,H){return t.getContext(R,H)}try{let R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vl}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",ve,!1),k===null){let H="webgl2";if(k=le(H,R),k===null)throw le(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ge,Re,Ce,rt,Ne,C,w,q,re,ae,se,Oe,ce,Me,tt,fe,Ue,Xe,Ve,Ae,Ke,et,ut,B;function _e(){ge=new Jx(k),ge.init(),et=new Cy(k,ge),Re=new Xx(k,ge,e,et),Ce=new Ty(k,ge),Re.reverseDepthBuffer&&f&&Ce.buffers.depth.setReversed(!0),rt=new eb(k),Ne=new dy,C=new Ry(k,ge,Ce,Ne,Re,et,rt),w=new Yx(y),q=new Kx(y),re=new ag(k),ut=new Vx(k,re),ae=new Qx(k,re,rt,ut),se=new nb(k,ae,re,rt),Ve=new tb(k,Re,C),fe=new qx(Ne),Oe=new fy(y,w,q,ge,Re,ut,fe),ce=new Uy(y,Ne),Me=new my,tt=new vy(ge),Xe=new Gx(y,w,q,Ce,se,p,c),Ue=new Ey(y,se,Re),B=new zy(k,rt,Re,Ce),Ae=new Wx(k,ge,rt),Ke=new $x(k,ge,rt),rt.programs=Oe.programs,y.capabilities=Re,y.extensions=ge,y.properties=Ne,y.renderLists=Me,y.shadowMap=Ue,y.state=Ce,y.info=rt}_e();let ee=new Cl(y,k);this.xr=ee,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let R=ge.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=ge.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(R){R!==void 0&&($=R,this.setSize(Q,he,!1))},this.getSize=function(R){return R.set(Q,he)},this.setSize=function(R,H,j=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=R,he=H,t.width=Math.floor(R*$),t.height=Math.floor(H*$),j===!0&&(t.style.width=R+"px",t.style.height=H+"px"),this.setViewport(0,0,R,H)},this.getDrawingBufferSize=function(R){return R.set(Q*$,he*$).floor()},this.setDrawingBufferSize=function(R,H,j){Q=R,he=H,$=j,t.width=Math.floor(R*j),t.height=Math.floor(H*j),this.setViewport(0,0,R,H)},this.getCurrentViewport=function(R){return R.copy(L)},this.getViewport=function(R){return R.copy(Fe)},this.setViewport=function(R,H,j,Z){R.isVector4?Fe.set(R.x,R.y,R.z,R.w):Fe.set(R,H,j,Z),Ce.viewport(L.copy(Fe).multiplyScalar($).round())},this.getScissor=function(R){return R.copy($e)},this.setScissor=function(R,H,j,Z){R.isVector4?$e.set(R.x,R.y,R.z,R.w):$e.set(R,H,j,Z),Ce.scissor(W.copy($e).multiplyScalar($).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(R){Ce.setScissorTest(ht=R)},this.setOpaqueSort=function(R){xe=R},this.setTransparentSort=function(R){be=R},this.getClearColor=function(R){return R.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor.apply(Xe,arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha.apply(Xe,arguments)},this.clear=function(R=!0,H=!0,j=!0){let Z=0;if(R){let G=!1;if(I!==null){let pe=I.texture.format;G=pe===eh||pe===$l||pe===Ql}if(G){let pe=I.texture.type,Ee=pe===oi||pe===Qi||pe===Fr||pe===Ws||pe===Zl||pe===Kl,ze=Xe.getClearColor(),ke=Xe.getClearAlpha(),Qe=ze.r,nt=ze.g,Be=ze.b;Ee?(g[0]=Qe,g[1]=nt,g[2]=Be,g[3]=ke,k.clearBufferuiv(k.COLOR,0,g)):(x[0]=Qe,x[1]=nt,x[2]=Be,x[3]=ke,k.clearBufferiv(k.COLOR,0,x))}else Z|=k.COLOR_BUFFER_BIT}H&&(Z|=k.DEPTH_BUFFER_BIT),j&&(Z|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),Me.dispose(),tt.dispose(),Ne.dispose(),w.dispose(),q.dispose(),se.dispose(),ut.dispose(),B.dispose(),Oe.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",Hn),ee.removeEventListener("sessionend",cs),Yn.stop()};function oe(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let R=rt.autoReset,H=Ue.enabled,j=Ue.autoUpdate,Z=Ue.needsUpdate,G=Ue.type;_e(),rt.autoReset=R,Ue.enabled=H,Ue.autoUpdate=j,Ue.needsUpdate=Z,Ue.type=G}function ve(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Je(R){let H=R.target;H.removeEventListener("dispose",Je),Pt(H)}function Pt(R){Ut(R),Ne.remove(R)}function Ut(R){let H=Ne.get(R).programs;H!==void 0&&(H.forEach(function(j){Oe.releaseProgram(j)}),R.isShaderMaterial&&Oe.releaseShaderCache(R))}this.renderBufferDirect=function(R,H,j,Z,G,pe){H===null&&(H=Ye);let Ee=G.isMesh&&G.matrixWorld.determinant()<0,ze=to(R,H,j,Z,G);Ce.setMaterial(Z,Ee);let ke=j.index,Qe=1;if(Z.wireframe===!0){if(ke=ae.getWireframeAttribute(j),ke===void 0)return;Qe=2}let nt=j.drawRange,Be=j.attributes.position,gt=nt.start*Qe,Mt=(nt.start+nt.count)*Qe;pe!==null&&(gt=Math.max(gt,pe.start*Qe),Mt=Math.min(Mt,(pe.start+pe.count)*Qe)),ke!==null?(gt=Math.max(gt,0),Mt=Math.min(Mt,ke.count)):Be!=null&&(gt=Math.max(gt,0),Mt=Math.min(Mt,Be.count));let At=Mt-gt;if(At<0||At===1/0)return;ut.setup(G,Z,ze,j,ke);let _,P=Ae;if(ke!==null&&(_=re.get(ke),P=Ke,P.setIndex(_)),G.isMesh)Z.wireframe===!0?(Ce.setLineWidth(Z.wireframeLinewidth*je()),P.setMode(k.LINES)):P.setMode(k.TRIANGLES);else if(G.isLine){let N=Z.linewidth;N===void 0&&(N=1),Ce.setLineWidth(N*je()),G.isLineSegments?P.setMode(k.LINES):G.isLineLoop?P.setMode(k.LINE_LOOP):P.setMode(k.LINE_STRIP)}else G.isPoints?P.setMode(k.POINTS):G.isSprite&&P.setMode(k.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)P.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(ge.get("WEBGL_multi_draw"))P.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let N=G._multiDrawStarts,V=G._multiDrawCounts,ie=G._multiDrawCount,Ie=ke?re.get(ke).bytesPerElement:1,Ge=Ne.get(Z).currentProgram.getUniforms();for(let at=0;at<ie;at++)Ge.setValue(k,"_gl_DrawID",at),P.render(N[at]/Ie,V[at])}else if(G.isInstancedMesh)P.renderInstances(gt,At,G.count);else if(j.isInstancedBufferGeometry){let N=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,V=Math.min(j.instanceCount,N);P.renderInstances(gt,At,V)}else P.render(gt,At)};function yt(R,H,j){R.transparent===!0&&R.side===Dt&&R.forceSinglePass===!1?(R.side=Vt,R.needsUpdate=!0,hs(R,H,j),R.side=_n,R.needsUpdate=!0,hs(R,H,j),R.side=Dt):hs(R,H,j)}this.compile=function(R,H,j=null){j===null&&(j=R),d=tt.get(j),d.init(H),v.push(d),j.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),R!==j&&R.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();let Z=new Set;return R.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let pe=G.material;if(pe)if(Array.isArray(pe))for(let Ee=0;Ee<pe.length;Ee++){let ze=pe[Ee];yt(ze,j,G),Z.add(ze)}else yt(pe,j,G),Z.add(pe)}),v.pop(),d=null,Z},this.compileAsync=function(R,H,j=null){let Z=this.compile(R,H,j);return new Promise(G=>{function pe(){if(Z.forEach(function(Ee){Ne.get(Ee).currentProgram.isReady()&&Z.delete(Ee)}),Z.size===0){G(R);return}setTimeout(pe,10)}ge.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let fn=null;function Ln(R){fn&&fn(R)}function Hn(){Yn.stop()}function cs(){Yn.start()}let Yn=new sd;Yn.setAnimationLoop(Ln),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(R){fn=R,ee.setAnimationLoop(R),R===null?Yn.stop():Yn.start()},ee.addEventListener("sessionstart",Hn),ee.addEventListener("sessionend",cs),this.render=function(R,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(H),H=ee.getCamera()),R.isScene===!0&&R.onBeforeRender(y,R,H,I),d=tt.get(R,v.length),d.init(H),v.push(d),ue.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ne.setFromProjectionMatrix(ue),F=this.localClippingEnabled,D=fe.init(this.clippingPlanes,F),m=Me.get(R,b.length),m.init(),b.push(m),ee.enabled===!0&&ee.isPresenting===!0){let pe=y.xr.getDepthSensingMesh();pe!==null&&gn(pe,H,-1/0,y.sortObjects)}gn(R,H,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(xe,be),Te=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Te&&Xe.addToRenderList(m,R),this.info.render.frame++,D===!0&&fe.beginShadows();let j=d.state.shadowsArray;Ue.render(j,R,H),D===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();let Z=m.opaque,G=m.transmissive;if(d.setupLights(),H.isArrayCamera){let pe=H.cameras;if(G.length>0)for(let Ee=0,ze=pe.length;Ee<ze;Ee++){let ke=pe[Ee];dr(Z,G,R,ke)}Te&&Xe.render(R);for(let Ee=0,ze=pe.length;Ee<ze;Ee++){let ke=pe[Ee];$r(m,R,ke,ke.viewport)}}else G.length>0&&dr(Z,G,R,H),Te&&Xe.render(R),$r(m,R,H);I!==null&&(C.updateMultisampleRenderTarget(I),C.updateRenderTargetMipmap(I)),R.isScene===!0&&R.onAfterRender(y,R,H),ut.resetDefaultState(),E=-1,M=null,v.pop(),v.length>0?(d=v[v.length-1],D===!0&&fe.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function gn(R,H,j,Z){if(R.visible===!1)return;if(R.layers.test(H.layers)){if(R.isGroup)j=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(H);else if(R.isLight)d.pushLight(R),R.castShadow&&d.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ne.intersectsSprite(R)){Z&&De.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ue);let Ee=se.update(R),ze=R.material;ze.visible&&m.push(R,Ee,ze,j,De.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ne.intersectsObject(R))){let Ee=se.update(R),ze=R.material;if(Z&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),De.copy(R.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),De.copy(Ee.boundingSphere.center)),De.applyMatrix4(R.matrixWorld).applyMatrix4(ue)),Array.isArray(ze)){let ke=Ee.groups;for(let Qe=0,nt=ke.length;Qe<nt;Qe++){let Be=ke[Qe],gt=ze[Be.materialIndex];gt&&gt.visible&&m.push(R,Ee,gt,j,De.z,Be)}}else ze.visible&&m.push(R,Ee,ze,j,De.z,null)}}let pe=R.children;for(let Ee=0,ze=pe.length;Ee<ze;Ee++)gn(pe[Ee],H,j,Z)}function $r(R,H,j,Z){let G=R.opaque,pe=R.transmissive,Ee=R.transparent;d.setupLightsView(j),D===!0&&fe.setGlobalState(y.clippingPlanes,j),Z&&Ce.viewport(L.copy(Z)),G.length>0&&dn(G,H,j),pe.length>0&&dn(pe,H,j),Ee.length>0&&dn(Ee,H,j),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function dr(R,H,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Z.id]===void 0&&(d.state.transmissionRenderTarget[Z.id]=new ci(1,1,{generateMipmaps:!0,type:ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float")?Xr:oi,minFilter:An,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ft.workingColorSpace}));let pe=d.state.transmissionRenderTarget[Z.id],Ee=Z.viewport||L;pe.setSize(Ee.z,Ee.w);let ze=y.getRenderTarget();y.setRenderTarget(pe),y.getClearColor(J),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),Te&&Xe.render(j);let ke=y.toneMapping;y.toneMapping=Ti;let Qe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),d.setupLightsView(Z),D===!0&&fe.setGlobalState(y.clippingPlanes,Z),dn(R,j,Z),C.updateMultisampleRenderTarget(pe),C.updateRenderTargetMipmap(pe),ge.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let Be=0,gt=H.length;Be<gt;Be++){let Mt=H[Be],At=Mt.object,_=Mt.geometry,P=Mt.material,N=Mt.group;if(P.side===Dt&&At.layers.test(Z.layers)){let V=P.side;P.side=Vt,P.needsUpdate=!0,ls(At,j,Z,_,P,N),P.side=V,P.needsUpdate=!0,nt=!0}}nt===!0&&(C.updateMultisampleRenderTarget(pe),C.updateRenderTargetMipmap(pe))}y.setRenderTarget(ze),y.setClearColor(J,K),Qe!==void 0&&(Z.viewport=Qe),y.toneMapping=ke}function dn(R,H,j){let Z=H.isScene===!0?H.overrideMaterial:null;for(let G=0,pe=R.length;G<pe;G++){let Ee=R[G],ze=Ee.object,ke=Ee.geometry,Qe=Z===null?Ee.material:Z,nt=Ee.group;ze.layers.test(j.layers)&&ls(ze,H,j,ke,Qe,nt)}}function ls(R,H,j,Z,G,pe){R.onBeforeRender(y,H,j,Z,G,pe),R.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),G.onBeforeRender(y,H,j,Z,R,pe),G.transparent===!0&&G.side===Dt&&G.forceSinglePass===!1?(G.side=Vt,G.needsUpdate=!0,y.renderBufferDirect(j,H,Z,G,R,pe),G.side=_n,G.needsUpdate=!0,y.renderBufferDirect(j,H,Z,G,R,pe),G.side=Dt):y.renderBufferDirect(j,H,Z,G,R,pe),R.onAfterRender(y,H,j,Z,G,pe)}function hs(R,H,j){H.isScene!==!0&&(H=Ye);let Z=Ne.get(R),G=d.state.lights,pe=d.state.shadowsArray,Ee=G.state.version,ze=Oe.getParameters(R,G.state,pe,H,j),ke=Oe.getProgramCacheKey(ze),Qe=Z.programs;Z.environment=R.isMeshStandardMaterial?H.environment:null,Z.fog=H.fog,Z.envMap=(R.isMeshStandardMaterial?q:w).get(R.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&R.envMap===null?H.environmentRotation:R.envMapRotation,Qe===void 0&&(R.addEventListener("dispose",Je),Qe=new Map,Z.programs=Qe);let nt=Qe.get(ke);if(nt!==void 0){if(Z.currentProgram===nt&&Z.lightsStateVersion===Ee)return Bi(R,ze),nt}else ze.uniforms=Oe.getUniforms(R),R.onBeforeCompile(ze,y),nt=Oe.acquireProgram(ze,ke),Qe.set(ke,nt),Z.uniforms=ze.uniforms;let Be=Z.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Be.clippingPlanes=fe.uniform),Bi(R,ze),Z.needsLights=pr(R),Z.lightsStateVersion=Ee,Z.needsLights&&(Be.ambientLightColor.value=G.state.ambient,Be.lightProbe.value=G.state.probe,Be.directionalLights.value=G.state.directional,Be.directionalLightShadows.value=G.state.directionalShadow,Be.spotLights.value=G.state.spot,Be.spotLightShadows.value=G.state.spotShadow,Be.rectAreaLights.value=G.state.rectArea,Be.ltc_1.value=G.state.rectAreaLTC1,Be.ltc_2.value=G.state.rectAreaLTC2,Be.pointLights.value=G.state.point,Be.pointLightShadows.value=G.state.pointShadow,Be.hemisphereLights.value=G.state.hemi,Be.directionalShadowMap.value=G.state.directionalShadowMap,Be.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Be.spotShadowMap.value=G.state.spotShadowMap,Be.spotLightMatrix.value=G.state.spotLightMatrix,Be.spotLightMap.value=G.state.spotLightMap,Be.pointShadowMap.value=G.state.pointShadowMap,Be.pointShadowMatrix.value=G.state.pointShadowMatrix),Z.currentProgram=nt,Z.uniformsList=null,nt}function eo(R){if(R.uniformsList===null){let H=R.currentProgram.getUniforms();R.uniformsList=Bs.seqWithValue(H.seq,R.uniforms)}return R.uniformsList}function Bi(R,H){let j=Ne.get(R);j.outputColorSpace=H.outputColorSpace,j.batching=H.batching,j.batchingColor=H.batchingColor,j.instancing=H.instancing,j.instancingColor=H.instancingColor,j.instancingMorph=H.instancingMorph,j.skinning=H.skinning,j.morphTargets=H.morphTargets,j.morphNormals=H.morphNormals,j.morphColors=H.morphColors,j.morphTargetsCount=H.morphTargetsCount,j.numClippingPlanes=H.numClippingPlanes,j.numIntersection=H.numClipIntersection,j.vertexAlphas=H.vertexAlphas,j.vertexTangents=H.vertexTangents,j.toneMapping=H.toneMapping}function to(R,H,j,Z,G){H.isScene!==!0&&(H=Ye),C.resetTextureUnits();let pe=H.fog,Ee=Z.isMeshStandardMaterial?H.environment:null,ze=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Kt,ke=(Z.isMeshStandardMaterial?q:w).get(Z.envMap||Ee),Qe=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,nt=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Be=!!j.morphAttributes.position,gt=!!j.morphAttributes.normal,Mt=!!j.morphAttributes.color,At=Ti;Z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(At=y.toneMapping);let _=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,P=_!==void 0?_.length:0,N=Ne.get(Z),V=d.state.lights;if(D===!0&&(F===!0||R!==M)){let Ze=R===M&&Z.id===E;fe.setState(Z,R,Ze)}let ie=!1;Z.version===N.__version?(N.needsLights&&N.lightsStateVersion!==V.state.version||N.outputColorSpace!==ze||G.isBatchedMesh&&N.batching===!1||!G.isBatchedMesh&&N.batching===!0||G.isBatchedMesh&&N.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&N.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&N.instancing===!1||!G.isInstancedMesh&&N.instancing===!0||G.isSkinnedMesh&&N.skinning===!1||!G.isSkinnedMesh&&N.skinning===!0||G.isInstancedMesh&&N.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&N.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&N.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&N.instancingMorph===!1&&G.morphTexture!==null||N.envMap!==ke||Z.fog===!0&&N.fog!==pe||N.numClippingPlanes!==void 0&&(N.numClippingPlanes!==fe.numPlanes||N.numIntersection!==fe.numIntersection)||N.vertexAlphas!==Qe||N.vertexTangents!==nt||N.morphTargets!==Be||N.morphNormals!==gt||N.morphColors!==Mt||N.toneMapping!==At||N.morphTargetsCount!==P)&&(ie=!0):(ie=!0,N.__version=Z.version);let Ie=N.currentProgram;ie===!0&&(Ie=hs(Z,H,G));let Ge=!1,at=!1,U=!1,z=Ie.getUniforms(),te=N.uniforms;if(Ce.useProgram(Ie.program)&&(Ge=!0,at=!0,U=!0),Z.id!==E&&(E=Z.id,at=!0),Ge||M!==R){Ce.buffers.depth.getReversed()?(Y.copy(R.projectionMatrix),Hm(Y),Gm(Y),z.setValue(k,"projectionMatrix",Y)):z.setValue(k,"projectionMatrix",R.projectionMatrix),z.setValue(k,"viewMatrix",R.matrixWorldInverse);let bt=z.map.cameraPosition;bt!==void 0&&bt.setValue(k,de.setFromMatrixPosition(R.matrixWorld)),Re.logarithmicDepthBuffer&&z.setValue(k,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&z.setValue(k,"isOrthographic",R.isOrthographicCamera===!0),M!==R&&(M=R,at=!0,U=!0)}if(G.isSkinnedMesh){z.setOptional(k,G,"bindMatrix"),z.setOptional(k,G,"bindMatrixInverse");let Ze=G.skeleton;Ze&&(Ze.boneTexture===null&&Ze.computeBoneTexture(),z.setValue(k,"boneTexture",Ze.boneTexture,C))}G.isBatchedMesh&&(z.setOptional(k,G,"batchingTexture"),z.setValue(k,"batchingTexture",G._matricesTexture,C),z.setOptional(k,G,"batchingIdTexture"),z.setValue(k,"batchingIdTexture",G._indirectTexture,C),z.setOptional(k,G,"batchingColorTexture"),G._colorsTexture!==null&&z.setValue(k,"batchingColorTexture",G._colorsTexture,C));let Pe=j.morphAttributes;if((Pe.position!==void 0||Pe.normal!==void 0||Pe.color!==void 0)&&Ve.update(G,j,Ie),(at||N.receiveShadow!==G.receiveShadow)&&(N.receiveShadow=G.receiveShadow,z.setValue(k,"receiveShadow",G.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(te.envMap.value=ke,te.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&H.environment!==null&&(te.envMapIntensity.value=H.environmentIntensity),at&&(z.setValue(k,"toneMappingExposure",y.toneMappingExposure),N.needsLights&&Lt(te,U),pe&&Z.fog===!0&&ce.refreshFogUniforms(te,pe),ce.refreshMaterialUniforms(te,Z,$,he,d.state.transmissionRenderTarget[R.id]),Bs.upload(k,eo(N),te,C)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Bs.upload(k,eo(N),te,C),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&z.setValue(k,"center",G.center),z.setValue(k,"modelViewMatrix",G.modelViewMatrix),z.setValue(k,"normalMatrix",G.normalMatrix),z.setValue(k,"modelMatrix",G.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){let Ze=Z.uniformsGroups;for(let bt=0,qe=Ze.length;bt<qe;bt++){let St=Ze[bt];B.update(St,Ie),B.bind(St,Ie)}}return Ie}function Lt(R,H){R.ambientLightColor.needsUpdate=H,R.lightProbe.needsUpdate=H,R.directionalLights.needsUpdate=H,R.directionalLightShadows.needsUpdate=H,R.pointLights.needsUpdate=H,R.pointLightShadows.needsUpdate=H,R.spotLights.needsUpdate=H,R.spotLightShadows.needsUpdate=H,R.rectAreaLights.needsUpdate=H,R.hemisphereLights.needsUpdate=H}function pr(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(R,H,j){Ne.get(R.texture).__webglTexture=H,Ne.get(R.depthTexture).__webglTexture=j;let Z=Ne.get(R);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=j===void 0,Z.__autoAllocateDepthBuffer||ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,H){let j=Ne.get(R);j.__webglFramebuffer=H,j.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(R,H=0,j=0){I=R,S=H,A=j;let Z=!0,G=null,pe=!1,Ee=!1;if(R){let ke=Ne.get(R);if(ke.__useDefaultFramebuffer!==void 0)Ce.bindFramebuffer(k.FRAMEBUFFER,null),Z=!1;else if(ke.__webglFramebuffer===void 0)C.setupRenderTarget(R);else if(ke.__hasExternalTextures)C.rebindTextures(R,Ne.get(R.texture).__webglTexture,Ne.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let Be=R.depthTexture;if(ke.__boundDepthTexture!==Be){if(Be!==null&&Ne.has(Be)&&(R.width!==Be.image.width||R.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(R)}}let Qe=R.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(Ee=!0);let nt=Ne.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(nt[H])?G=nt[H][j]:G=nt[H],pe=!0):R.samples>0&&C.useMultisampledRTT(R)===!1?G=Ne.get(R).__webglMultisampledFramebuffer:Array.isArray(nt)?G=nt[j]:G=nt,L.copy(R.viewport),W.copy(R.scissor),X=R.scissorTest}else L.copy(Fe).multiplyScalar($).floor(),W.copy($e).multiplyScalar($).floor(),X=ht;if(Ce.bindFramebuffer(k.FRAMEBUFFER,G)&&Z&&Ce.drawBuffers(R,G),Ce.viewport(L),Ce.scissor(W),Ce.setScissorTest(X),pe){let ke=Ne.get(R.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+H,ke.__webglTexture,j)}else if(Ee){let ke=Ne.get(R.texture),Qe=H||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,ke.__webglTexture,j||0,Qe)}E=-1},this.readRenderTargetPixels=function(R,H,j,Z,G,pe,Ee){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=Ne.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ee!==void 0&&(ze=ze[Ee]),ze){Ce.bindFramebuffer(k.FRAMEBUFFER,ze);try{let ke=R.texture,Qe=ke.format,nt=ke.type;if(!Re.textureFormatReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Re.textureTypeReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=R.width-Z&&j>=0&&j<=R.height-G&&k.readPixels(H,j,Z,G,et.convert(Qe),et.convert(nt),pe)}finally{let ke=I!==null?Ne.get(I).__webglFramebuffer:null;Ce.bindFramebuffer(k.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(R,H,j,Z,G,pe,Ee){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=Ne.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ee!==void 0&&(ze=ze[Ee]),ze){let ke=R.texture,Qe=ke.format,nt=ke.type;if(!Re.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Re.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=R.width-Z&&j>=0&&j<=R.height-G){Ce.bindFramebuffer(k.FRAMEBUFFER,ze);let Be=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Be),k.bufferData(k.PIXEL_PACK_BUFFER,pe.byteLength,k.STREAM_READ),k.readPixels(H,j,Z,G,et.convert(Qe),et.convert(nt),0);let gt=I!==null?Ne.get(I).__webglFramebuffer:null;Ce.bindFramebuffer(k.FRAMEBUFFER,gt);let Mt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Bm(k,Mt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Be),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,pe),k.deleteBuffer(Be),k.deleteSync(Mt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,H=null,j=0){R.isTexture!==!0&&(Cr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,R=arguments[1]);let Z=Math.pow(2,-j),G=Math.floor(R.image.width*Z),pe=Math.floor(R.image.height*Z),Ee=H!==null?H.x:0,ze=H!==null?H.y:0;C.setTexture2D(R,0),k.copyTexSubImage2D(k.TEXTURE_2D,j,0,0,Ee,ze,G,pe),Ce.unbindTexture()},this.copyTextureToTexture=function(R,H,j=null,Z=null,G=0){R.isTexture!==!0&&(Cr("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,R=arguments[1],H=arguments[2],G=arguments[3]||0,j=null);let pe,Ee,ze,ke,Qe,nt,Be,gt,Mt,At=R.isCompressedTexture?R.mipmaps[G]:R.image;j!==null?(pe=j.max.x-j.min.x,Ee=j.max.y-j.min.y,ze=j.isBox3?j.max.z-j.min.z:1,ke=j.min.x,Qe=j.min.y,nt=j.isBox3?j.min.z:0):(pe=At.width,Ee=At.height,ze=At.depth||1,ke=0,Qe=0,nt=0),Z!==null?(Be=Z.x,gt=Z.y,Mt=Z.z):(Be=0,gt=0,Mt=0);let _=et.convert(H.format),P=et.convert(H.type),N;H.isData3DTexture?(C.setTexture3D(H,0),N=k.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(C.setTexture2DArray(H,0),N=k.TEXTURE_2D_ARRAY):(C.setTexture2D(H,0),N=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,H.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,H.unpackAlignment);let V=k.getParameter(k.UNPACK_ROW_LENGTH),ie=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Ie=k.getParameter(k.UNPACK_SKIP_PIXELS),Ge=k.getParameter(k.UNPACK_SKIP_ROWS),at=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,At.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,At.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,ke),k.pixelStorei(k.UNPACK_SKIP_ROWS,Qe),k.pixelStorei(k.UNPACK_SKIP_IMAGES,nt);let U=R.isDataArrayTexture||R.isData3DTexture,z=H.isDataArrayTexture||H.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){let te=Ne.get(R),Pe=Ne.get(H),Ze=Ne.get(te.__renderTarget),bt=Ne.get(Pe.__renderTarget);Ce.bindFramebuffer(k.READ_FRAMEBUFFER,Ze.__webglFramebuffer),Ce.bindFramebuffer(k.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let qe=0;qe<ze;qe++)U&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ne.get(R).__webglTexture,G,nt+qe),R.isDepthTexture?(z&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ne.get(H).__webglTexture,G,Mt+qe),k.blitFramebuffer(ke,Qe,pe,Ee,Be,gt,pe,Ee,k.DEPTH_BUFFER_BIT,k.NEAREST)):z?k.copyTexSubImage3D(N,G,Be,gt,Mt+qe,ke,Qe,pe,Ee):k.copyTexSubImage2D(N,G,Be,gt,Mt+qe,ke,Qe,pe,Ee);Ce.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else z?R.isDataTexture||R.isData3DTexture?k.texSubImage3D(N,G,Be,gt,Mt,pe,Ee,ze,_,P,At.data):H.isCompressedArrayTexture?k.compressedTexSubImage3D(N,G,Be,gt,Mt,pe,Ee,ze,_,At.data):k.texSubImage3D(N,G,Be,gt,Mt,pe,Ee,ze,_,P,At):R.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,G,Be,gt,pe,Ee,_,P,At.data):R.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,G,Be,gt,At.width,At.height,_,At.data):k.texSubImage2D(k.TEXTURE_2D,G,Be,gt,pe,Ee,_,P,At);k.pixelStorei(k.UNPACK_ROW_LENGTH,V),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ie),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Ie),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ge),k.pixelStorei(k.UNPACK_SKIP_IMAGES,at),G===0&&H.generateMipmaps&&k.generateMipmap(N),Ce.unbindTexture()},this.copyTextureToTexture3D=function(R,H,j=null,Z=null,G=0){return R.isTexture!==!0&&(Cr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,Z=arguments[1]||null,R=arguments[2],H=arguments[3],G=arguments[4]||0),Cr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,H,j,Z,G)},this.initRenderTarget=function(R){Ne.get(R).__webglFramebuffer===void 0&&C.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?C.setTextureCube(R,0):R.isData3DTexture?C.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?C.setTexture2DArray(R,0):C.setTexture2D(R,0),Ce.unbindTexture()},this.resetState=function(){S=0,A=0,I=null,Ce.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=ft._getUnpackColorSpace()}};var ta=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Le(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},na=class extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Qs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=dl,this.updateRanges=[],this.version=0,this.uuid=On()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ln=new O,$i=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix4(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.applyNormalMatrix(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ln.fromBufferAttribute(this,t),ln.transformDirection(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=vt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),s=vt(s,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Br=class extends rn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Rs,Mr=new O,Cs=new O,Is=new O,Ps=new We,Sr=new We,ld=new it,Ro=new O,Er=new O,Co=new O,_f=new We,Ec=new We,vf=new We,ia=class extends dt{constructor(e=new Br){if(super(),this.isSprite=!0,this.type="Sprite",Rs===void 0){Rs=new Ct;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Qs(t,5);Rs.setIndex([0,1,2,0,2,3]),Rs.setAttribute("position",new $i(n,3,0,!1)),Rs.setAttribute("uv",new $i(n,2,3,!1))}this.geometry=Rs,this.material=e,this.center=new We(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Cs.setFromMatrixScale(this.matrixWorld),ld.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Cs.multiplyScalar(-Is.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Io(Ro.set(-.5,-.5,0),Is,o,Cs,s,r),Io(Er.set(.5,-.5,0),Is,o,Cs,s,r),Io(Co.set(.5,.5,0),Is,o,Cs,s,r),_f.set(0,0),Ec.set(1,0),vf.set(1,1);let a=e.ray.intersectTriangle(Ro,Er,Co,!1,Mr);if(a===null&&(Io(Er.set(-.5,.5,0),Is,o,Cs,s,r),Ec.set(0,1),a=e.ray.intersectTriangle(Ro,Co,Er,!1,Mr),a===null))return;let c=e.ray.origin.distanceTo(Mr);c<e.near||c>e.far||t.push({distance:c,point:Mr.clone(),uv:Si.getInterpolation(Mr,Ro,Er,Co,_f,Ec,vf,new We),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Io(i,e,t,n,s,r){Ps.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Sr.x=r*Ps.x-s*Ps.y,Sr.y=s*Ps.x+r*Ps.y):Sr.copy(Ps),i.copy(e),i.x+=Sr.x,i.y+=Sr.y,i.applyMatrix4(ld)}var Mf=new O,Sf=new _t,Ef=new _t,Ny=new O,wf=new it,Po=new O,wc=new vn,Tf=new it,Tc=new Zs,sa=class extends we{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=wu,this.bindMatrix=new it,this.bindMatrixInverse=new it,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ht),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Po),this.boundingBox.expandByPoint(Po)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Po),this.boundingSphere.expandByPoint(Po)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wc.copy(this.boundingSphere),wc.applyMatrix4(s),e.ray.intersectsSphere(wc)!==!1&&(Tf.copy(s).invert(),Tc.copy(e.ray).applyMatrix4(Tf),!(this.boundingBox!==null&&Tc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Tc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new _t,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===wu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Sf.fromBufferAttribute(s.attributes.skinIndex,e),Ef.fromBufferAttribute(s.attributes.skinWeight,e),Mf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Ef.getComponent(r);if(o!==0){let a=Sf.getComponent(r);wf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Ny.copy(Mf).applyMatrix4(wf),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Hr=class extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}},ra=class extends jt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Wt,h=Wt,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Af=new it,Fy=new it,oa=class i{constructor(e=[],t=[]){this.uuid=On(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new it)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new it;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Fy;Af.multiplyMatrices(a,t[r]),Af.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ra(t,e,e,Rn,Fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Hr),this.bones.push(o),this.boneInverses.push(new it().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},es=class extends wt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ls=new it,Rf=new it,Lo=[],Cf=new Ht,Oy=new it,wr=new we,Tr=new vn,on=class extends we{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new es(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Oy)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ht),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ls),Cf.copy(e.boundingBox).applyMatrix4(Ls),this.boundingBox.union(Cf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ls),Tr.copy(e.boundingSphere).applyMatrix4(Ls),this.boundingSphere.union(Tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(wr.geometry=this.geometry,wr.material=this.material,wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Tr.copy(this.boundingSphere),Tr.applyMatrix4(n),e.ray.intersectsSphere(Tr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ls),Rf.multiplyMatrices(n,Ls),wr.matrixWorld=Rf,wr.raycast(e,Lo);for(let o=0,a=Lo.length;o<a;o++){let c=Lo[o];c.instanceId=r,c.object=this,t.push(c)}Lo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new es(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ra(new Float32Array(s*this.count),s,this.count,Jl,Fn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Gr=class extends rn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},aa=new O,ca=new O,If=new it,Ar=new Zs,Do=new vn,Ac=new O,Pf=new O,$s=class extends dt{constructor(e=new Ct,t=new Gr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)aa.fromBufferAttribute(t,s-1),ca.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=aa.distanceTo(ca);e.setAttribute("lineDistance",new ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Do.copy(n.boundingSphere),Do.applyMatrix4(s),Do.radius+=r,e.ray.intersectsSphere(Do)===!1)return;If.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(If);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=l){let d=h.getX(x),b=h.getX(x+1),v=Uo(this,e,Ar,c,d,b);v&&t.push(v)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(p),d=Uo(this,e,Ar,c,x,m);d&&t.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=l){let d=Uo(this,e,Ar,c,x,x+1);d&&t.push(d)}if(this.isLineLoop){let x=Uo(this,e,Ar,c,g-1,p);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Uo(i,e,t,n,s,r){let o=i.geometry.attributes.position;if(aa.fromBufferAttribute(o,s),ca.fromBufferAttribute(o,r),t.distanceSqToSegment(aa,ca,Ac,Pf)>n)return;Ac.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Ac);if(!(c<e.near||c>e.far))return{distance:c,point:Pf.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var Lf=new O,Df=new O,la=class extends $s{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Lf.fromBufferAttribute(t,s),Df.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Lf.distanceTo(Df);e.setAttribute("lineDistance",new ct(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ha=class extends $s{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},hi=class extends rn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Uf=new it,Il=new Zs,zo=new vn,No=new O,Ai=class extends dt{constructor(e=new Ct,t=new hi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(s),zo.radius+=r,e.ray.intersectsSphere(zo)===!1)return;Uf.copy(s).invert(),Il.copy(e.ray).applyMatrix4(Uf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=f,x=p;g<x;g++){let m=l.getX(g);No.fromBufferAttribute(u,m),zf(No,m,c,s,e,t,this)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=f,x=p;g<x;g++)No.fromBufferAttribute(u,g),zf(No,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function zf(i,e,t,n,s,r,o){let a=Il.distanceSqToPoint(i);if(a<t){let c=new O;Il.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var er=class extends jt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Sn=class i extends Ct{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new O,h=new We;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let p=n+u/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ct(o,3)),this.setAttribute("normal",new ct(a,3)),this.setAttribute("uv",new ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},an=class i extends Ct{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],p=[],g=0,x=[],m=n/2,d=0;b(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ct(u,3)),this.setAttribute("normal",new ct(f,3)),this.setAttribute("uv",new ct(p,2));function b(){let y=new O,T=new O,S=0,A=(t-e)/n;for(let I=0;I<=r;I++){let E=[],M=I/r,L=M*(t-e)+e;for(let W=0;W<=s;W++){let X=W/s,J=X*c+a,K=Math.sin(J),Q=Math.cos(J);T.x=L*K,T.y=-M*n+m,T.z=L*Q,u.push(T.x,T.y,T.z),y.set(K,A,Q).normalize(),f.push(y.x,y.y,y.z),p.push(X,1-M),E.push(g++)}x.push(E)}for(let I=0;I<s;I++)for(let E=0;E<r;E++){let M=x[E][I],L=x[E+1][I],W=x[E+1][I+1],X=x[E][I+1];(e>0||E!==0)&&(h.push(M,L,X),S+=3),(t>0||E!==r-1)&&(h.push(L,W,X),S+=3)}l.addGroup(d,S,0),d+=S}function v(y){let T=g,S=new We,A=new O,I=0,E=y===!0?e:t,M=y===!0?1:-1;for(let W=1;W<=s;W++)u.push(0,m*M,0),f.push(0,M,0),p.push(.5,.5),g++;let L=g;for(let W=0;W<=s;W++){let J=W/s*c+a,K=Math.cos(J),Q=Math.sin(J);A.x=E*Q,A.y=m*M,A.z=E*K,u.push(A.x,A.y,A.z),f.push(0,M,0),S.x=K*.5+.5,S.y=Q*.5*M+.5,p.push(S.x,S.y),g++}for(let W=0;W<s;W++){let X=T+W,J=L+W;y===!0?h.push(J,J+1,X):h.push(J+1,J,X),I+=3}l.addGroup(d,I,y===!0?1:2),d+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Xn=class i extends an{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ua=class i extends Ct{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new ct(r,3)),this.setAttribute("normal",new ct(r.slice(),3)),this.setAttribute("uv",new ct(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){let v=new O,y=new O,T=new O;for(let S=0;S<t.length;S+=3)p(t[S+0],v),p(t[S+1],y),p(t[S+2],T),c(v,y,T,b)}function c(b,v,y,T){let S=T+1,A=[];for(let I=0;I<=S;I++){A[I]=[];let E=b.clone().lerp(y,I/S),M=v.clone().lerp(y,I/S),L=S-I;for(let W=0;W<=L;W++)W===0&&I===S?A[I][W]=E:A[I][W]=E.clone().lerp(M,W/L)}for(let I=0;I<S;I++)for(let E=0;E<2*(S-I)-1;E++){let M=Math.floor(E/2);E%2===0?(f(A[I][M+1]),f(A[I+1][M]),f(A[I][M])):(f(A[I][M+1]),f(A[I+1][M+1]),f(A[I+1][M]))}}function l(b){let v=new O;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(b),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function h(){let b=new O;for(let v=0;v<r.length;v+=3){b.x=r[v+0],b.y=r[v+1],b.z=r[v+2];let y=m(b)/2/Math.PI+.5,T=d(b)/Math.PI+.5;o.push(y,1-T)}g(),u()}function u(){for(let b=0;b<o.length;b+=6){let v=o[b+0],y=o[b+2],T=o[b+4],S=Math.max(v,y,T),A=Math.min(v,y,T);S>.9&&A<.1&&(v<.2&&(o[b+0]+=1),y<.2&&(o[b+2]+=1),T<.2&&(o[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function p(b,v){let y=b*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function g(){let b=new O,v=new O,y=new O,T=new O,S=new We,A=new We,I=new We;for(let E=0,M=0;E<r.length;E+=9,M+=6){b.set(r[E+0],r[E+1],r[E+2]),v.set(r[E+3],r[E+4],r[E+5]),y.set(r[E+6],r[E+7],r[E+8]),S.set(o[M+0],o[M+1]),A.set(o[M+2],o[M+3]),I.set(o[M+4],o[M+5]),T.copy(b).add(v).add(y).divideScalar(3);let L=m(T);x(S,M+0,b,L),x(A,M+2,v,L),x(I,M+4,y,L)}}function x(b,v,y,T){T<0&&b.x===1&&(o[v]=b.x-1),y.x===0&&y.z===0&&(o[v]=T/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function d(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var ts=class i extends ua{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},fa=class i extends ua{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},tr=class i extends Ct{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=e,f=(t-e)/s,p=new O,g=new We;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let d=r+m/n*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let x=0;x<s;x++){let m=x*(n+1);for(let d=0;d<n;d++){let b=d+m,v=b,y=b+n+1,T=b+n+2,S=b+1;a.push(v,y,S),a.push(y,T,S)}}this.setIndex(a),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var kt=class i extends Ct{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new O,f=new O,p=[],g=[],x=[],m=[];for(let d=0;d<=n;d++){let b=[],v=d/n,y=0;d===0&&o===0?y=.5/t:d===n&&c===Math.PI&&(y=-.5/t);for(let T=0;T<=t;T++){let S=T/t;u.x=-e*Math.cos(s+S*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(s+S*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(S+y,1-v),b.push(l++)}h.push(b)}for(let d=0;d<n;d++)for(let b=0;b<t;b++){let v=h[d][b+1],y=h[d][b],T=h[d+1][b],S=h[d+1][b+1];(d!==0||o>0)&&p.push(v,y,S),(d!==n-1||c<Math.PI)&&p.push(y,T,S)}this.setIndex(p),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(x,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ri=class i extends Ct{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new O,u=new O,f=new O;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){let x=g/s*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){let x=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,b=(s+1)*p+g;o.push(x,m,b),o.push(m,d,b)}this.setIndex(o),this.setAttribute("position",new ct(a,3)),this.setAttribute("normal",new ct(c,3)),this.setAttribute("uv",new ct(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ci=class extends rn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sa,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},En=class extends Ci{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new We(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return nn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Tt=class extends rn{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new Le(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sa,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var nr=class extends rn{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sa,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Xl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Fo(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ky(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function By(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Nf(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function hd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var Ii=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Pl=class extends Ii{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Us,endingEnd:Us}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case zs:r=e,a=2*t-n;break;case Vo:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case zs:o=e,c=2*n-t;break;case Vo:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,d=-f*m+2*f*x-f*g,b=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,v=(-1-p)*m+(1.5+p)*x+.5*g,y=p*m-p*x;for(let T=0;T!==a;++T)r[T]=d*o[h+T]+b*o[l+T]+v*o[c+T]+y*o[u+T];return r}},da=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},Ll=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Cn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fo(t,this.TimeBufferType),this.values=Fo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Fo(e.times,Array),values:Fo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ll(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Pl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case qs:t=this.InterpolantFactoryMethodDiscrete;break;case Ys:t=this.InterpolantFactoryMethodLinear;break;case Ja:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qs;case this.InterpolantFactoryMethodLinear:return Ys;case this.InterpolantFactoryMethodSmooth:return Ja}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&ky(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ja,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,f=u-n,p=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[f+g]||x!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let p=0;p!==n;++p)t[f+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=Ys;var Pi=class extends Cn{constructor(e,t,n){super(e,t,n)}};Pi.prototype.ValueTypeName="bool";Pi.prototype.ValueBufferType=Array;Pi.prototype.DefaultInterpolation=qs;Pi.prototype.InterpolantFactoryMethodLinear=void 0;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var pa=class extends Cn{};pa.prototype.ValueTypeName="color";var ui=class extends Cn{};ui.prototype.ValueTypeName="number";var Dl=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)mn.slerpFlat(r,0,o,l-a,o,l,c);return r}},fi=class extends Cn{InterpolantFactoryMethodLinear(e){return new Dl(this.times,this.values,this.getValueSize(),e)}};fi.prototype.ValueTypeName="quaternion";fi.prototype.InterpolantFactoryMethodSmooth=void 0;var Li=class extends Cn{constructor(e,t,n){super(e,t,n)}};Li.prototype.ValueTypeName="string";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=qs;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends Cn{};di.prototype.ValueTypeName="vector";var ir=class{constructor(e="",t=-1,n=[],s=ih){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=On(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Gy(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Cn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=By(c);c=Nf(c,1,h),l=Nf(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ui(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,p,g,x){if(p.length!==0){let m=[],d=[];hd(p,m,d,g),m.length!==0&&x.push(new u(f,m,d))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let p={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let x=0;x<f[g].morphTargets.length;x++)p[f[g].morphTargets[x]]=-1;for(let x in p){let m=[],d=[];for(let b=0;b!==f[g].morphTargets.length;++b){let v=f[g];m.push(v.time),d.push(v.morphTarget===x?1:0)}s.push(new ui(".morphTargetInfluence["+x+"]",m,d))}c=p.length*o}else{let p=".bones["+t[u].name+"]";n(di,p+".position",f,"pos",s),n(fi,p+".quaternion",f,"rot",s),n(di,p+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Hy(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ui;case"vector":case"vector2":case"vector3":case"vector4":return di;case"color":return pa;case"quaternion":return fi;case"bool":case"boolean":return Pi;case"string":return Li}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Gy(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Hy(i.type);if(i.times===void 0){let t=[],n=[];hd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Ei={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Ul=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Vy=new Ul,pi=class{constructor(e){this.manager=e!==void 0?e:Vy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};pi.DEFAULT_MATERIAL_NAME="__DEFAULT";var ei={},zl=class extends Error{constructor(e,t){super(e),this.response=t}},Vr=class extends pi{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Ei.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ei[e]!==void 0){ei[e].push({onLoad:t,onProgress:n,onError:s});return}ei[e]=[],ei[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=ei[e],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=f?parseInt(f):0,g=p!==0,x=0,m=new ReadableStream({start(d){b();function b(){u.read().then(({done:v,value:y})=>{if(v)d.close();else{x+=y.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:p});for(let S=0,A=h.length;S<A;S++){let I=h[S];I.onProgress&&I.onProgress(T)}d.enqueue(y),b()}},v=>{d.error(v)})}}});return new Response(m)}else throw new zl(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(f);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Ei.add(e,l);let h=ei[e];delete ei[e];for(let u=0,f=h.length;u<f;u++){let p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{let h=ei[e];if(h===void 0)throw this.manager.itemError(e),l;delete ei[e];for(let u=0,f=h.length;u<f;u++){let p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Nl=class extends pi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Ei.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Or("img");function c(){h(),Ei.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var ma=class extends pi{constructor(e){super(e)}load(e,t,n,s){let r=new jt,o=new Nl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},sr=class extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ga=class extends sr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Rc=new it,Ff=new O,Of=new O,Wr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kr,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ff.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ff),Of.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Of),t.updateMatrixWorld(),Rc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Rc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fl=class extends Wr{constructor(){super(new Gt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=js*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},xa=class extends sr{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Fl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},kf=new it,Rr=new O,Cc=new O,Ol=class extends Wr{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new We(4,2),this._viewportCount=6,this._viewports=[new _t(2,1,1,1),new _t(0,1,1,1),new _t(3,1,1,1),new _t(1,1,1,1),new _t(3,0,1,1),new _t(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Rr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Rr),Cc.copy(n.position),Cc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Cc),n.updateMatrixWorld(),s.makeTranslation(-Rr.x,-Rr.y,-Rr.z),kf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kf)}},ba=class extends sr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ol}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},kl=class extends Wr{constructor(){super(new Js(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ns=class extends sr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new kl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Di=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var ya=class extends pi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Ei.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ei.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Ei.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ei.add(e,c),r.manager.itemStart(e)}};var Bl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){mn.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;mn.multiplyQuaternionsFlat(e,o,e,t,e,n),mn.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},oh="\\[\\]\\.:\\/",Wy=new RegExp("["+oh+"]","g"),ah="[^"+oh+"]",Xy="[^"+oh.replace("\\.","")+"]",qy=/((?:WC+[\/:])*)/.source.replace("WC",ah),Yy=/(WCOD+)?/.source.replace("WCOD",Xy),jy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ah),Zy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ah),Ky=new RegExp("^"+qy+Yy+jy+Zy+"$"),Jy=["material","materials","bones","map"],Hl=class{constructor(e,t,n){let s=n||Rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Rt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Wy,"")}static parseTrackName(e){let t=Ky.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Jy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Rt.Composite=Hl;Rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Rt.prototype.GetterByBindingType=[Rt.prototype._getValue_direct,Rt.prototype._getValue_array,Rt.prototype._getValue_arrayElement,Rt.prototype._getValue_toArray];Rt.prototype.SetterByBindingTypeAndVersioning=[[Rt.prototype._setValue_direct,Rt.prototype._setValue_direct_setNeedsUpdate,Rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_array,Rt.prototype._setValue_array_setNeedsUpdate,Rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_arrayElement,Rt.prototype._setValue_arrayElement_setNeedsUpdate,Rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_fromArray,Rt.prototype._setValue_fromArray_setNeedsUpdate,Rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Gl=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:Us,endingEnd:Us};for(let l=0;l!==o;++l){let h=r[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=nh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case fm:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case ih:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===um;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===th){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=zs,s.endingEnd=zs):(e?s.endingStart=this.zeroSlopeAtStart?zs:Us:s.endingStart=Vo,t?s.endingEnd=this.zeroSlopeAtEnd?zs:Us:s.endingEnd=Vo)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},Qy=new Float32Array(1),_a=class extends ai{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=s[u],p=f.name,g=h[p];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;g=new Bl(Rt.create(n,p,x),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new da(new Float32Array(2),new Float32Array(2),1,Qy),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?ir.findByName(s,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=ih),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let h=new Gl(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?ir.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vl);function lh(i,e){if(e===Jf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===qr||e===Ma){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===qr)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var Ta=class extends pi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new gh(t)}),this.register(function(t){return new xh(t)}),this.register(function(t){return new Th(t)}),this.register(function(t){return new Ah(t)}),this.register(function(t){return new Rh(t)}),this.register(function(t){return new yh(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new Mh(t)}),this.register(function(t){return new mh(t)}),this.register(function(t){return new Sh(t)}),this.register(function(t){return new bh(t)}),this.register(function(t){return new wh(t)}),this.register(function(t){return new Eh(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new Ch(t)}),this.register(function(t){return new Ih(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Di.extractUrlBase(e);o=Di.resolveURL(l,this.path)}else o=Di.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Vr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===md){try{o[lt.KHR_BINARY_GLTF]=new Ph(e)}catch(u){s&&s(u);return}r=JSON.parse(o[lt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Oh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case lt.KHR_MATERIALS_UNLIT:o[u]=new ph;break;case lt.KHR_DRACO_MESH_COMPRESSION:o[u]=new Lh(r,this.dracoLoader);break;case lt.KHR_TEXTURE_TRANSFORM:o[u]=new Dh;break;case lt.KHR_MESH_QUANTIZATION:o[u]=new Uh;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function $y(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var lt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},dh=class{constructor(e){this.parser=e,this.name=lt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Le(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Kt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ns(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ba(h),l.distance=u;break;case"spot":l=new xa(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,mi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},ph=class{constructor(){this.name=lt.KHR_MATERIALS_UNLIT}getMaterialType(){return pt}extendParams(e,t,n){let s=[];e.color=new Le(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Kt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,zt))}return Promise.all(s)}},mh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},gh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new We(a,a)}return Promise.all(r)}},xh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},bh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},yh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Le(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Kt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,zt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},_h=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},vh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Le().setRGB(a[0],a[1],a[2],Kt),Promise.all(r)}},Mh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Sh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Le().setRGB(a[0],a[1],a[2],Kt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,zt)),Promise.all(r)}},Eh=class{constructor(e){this.parser=e,this.name=lt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},wh=class{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Th=class{constructor(e){this.parser=e,this.name=lt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Ah=class{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Rh=class{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Ch=class{constructor(e){this.name=lt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,f,s.mode,s.filter),p})})}else return null}},Ih=class{constructor(e){this.name=lt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==In.TRIANGLES&&l.mode!==In.TRIANGLE_STRIP&&l.mode!==In.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,p=[];for(let g of u){let x=new it,m=new O,d=new mn,b=new O(1,1,1),v=new on(g.geometry,g.material,f);for(let y=0;y<f;y++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,y),c.SCALE&&b.fromBufferAttribute(c.SCALE,y),v.setMatrixAt(y,x.compose(m,d,b));for(let y in c)if(y==="_COLOR_0"){let T=c[y];v.instanceColor=new es(T.array,T.itemSize,T.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,c[y]);dt.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),p.push(v)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},md="glTF",Yr=12,ud={JSON:1313821514,BIN:5130562},Ph=class{constructor(e){this.name=lt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Yr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==md)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Yr,r=new DataView(e,Yr),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===ud.JSON){let l=new Uint8Array(e,Yr+o,a);this.content=n.decode(l)}else if(c===ud.BIN){let l=Yr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Lh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=lt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=Nh[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Nh[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[e.attributes[h]],p=or[f.componentType];l[u]=p.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(p){for(let g in p.attributes){let x=p.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}u(p)},a,l,Kt,f)})})}},Dh=class{constructor(){this.name=lt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Uh=class{constructor(){this.name=lt.KHR_MESH_QUANTIZATION}},Aa=class extends Ii{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,f=u*u,p=f*u,g=e*l,x=g-l,m=-2*p+3*f,d=p-f,b=1-m,v=d-f+u;for(let y=0;y!==a;y++){let T=o[x+y+a],S=o[x+y+c]*h,A=o[g+y+a],I=o[g+y]*h;r[y]=b*T+v*S+m*A+d*I}return r}},e_=new mn,zh=class extends Aa{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return e_.fromArray(r).normalize().toArray(r),r}},In={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},or={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},fd={9728:Wt,9729:sn,9984:Yl,9985:Pr,9986:Ds,9987:An},dd={33071:ii,33648:Nr,10497:Ji},hh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Nh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ui={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},t_={CUBICSPLINE:void 0,LINEAR:Ys,STEP:qs},uh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function n_(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Ci({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:_n})),i.DefaultMaterial}function is(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function mi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function i_(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function s_(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function r_(i){let e,t=i.extensions&&i.extensions[lt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+fh(t.attributes):e=i.indices+":"+fh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+fh(i.targets[n]);return e}function fh(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Fh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function o_(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var a_=new it,Oh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new $y,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new ma(this.options.manager):this.textureLoader=new ya(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Vr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return is(r,a,s),mi(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[lt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(Di.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=hh[s.type],a=or[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new wt(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=hh[s.type],l=or[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,m;if(p&&p!==u){let d=Math.floor(f/p),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+d+":"+s.count,v=t.cache.get(b);v||(x=new l(a,d*p,s.count*p/h),v=new Qs(x,p/h),t.cache.add(b,v)),m=new $i(v,c,f%p/h,g)}else a===null?x=new l(s.count*c):x=new l(a,f,s.count*c),m=new wt(x,c,g);if(s.sparse!==void 0){let d=hh.SCALAR,b=or[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,T=new b(o[1],v,s.sparse.count*d),S=new l(o[2],y,s.sparse.count*c);a!==null&&(m=new wt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,I=T.length;A<I;A++){let E=T[A];if(m.setX(E,S[A*c]),c>=2&&m.setY(E,S[A*c+1]),c>=3&&m.setZ(E,S[A*c+2]),c>=4&&m.setW(E,S[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=fd[f.magFilter]||sn,h.minFilter=fd[f.minFilter]||An,h.wrapS=dd[f.wrapS]||Ji,h.wrapT=dd[f.wrapT]||Ji,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Wt&&h.minFilter!==sn,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,p){let g=f;t.isImageBitmapLoader===!0&&(g=function(x){let m=new jt(x);m.needsUpdate=!0,f(m)}),t.load(Di.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),mi(u,o),u.userData.mimeType=o.mimeType||o_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[lt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[lt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[lt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new hi,rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Gr,rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Ci}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[lt.KHR_MATERIALS_UNLIT]){let u=s[lt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Le(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Kt),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,zt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Dt);let h=r.alphaMode||uh.OPAQUE;if(h===uh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===uh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==pt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new We(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==pt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==pt){let u=r.emissiveFactor;a.emissive=new Le().setRGB(u[0],u[1],u[2],Kt)}return r.emissiveTexture!==void 0&&o!==pt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,zt)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),mi(u,r),t.associations.set(u,{materials:e}),r.extensions&&is(s,u,r),u})}createUniqueName(e){let t=Rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[lt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return pd(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=r_(l),u=s[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[lt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=pd(new Ct,l,t),s[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?n_(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let x=h[p],m=o[p],d,b=l[p];if(m.mode===In.TRIANGLES||m.mode===In.TRIANGLE_STRIP||m.mode===In.TRIANGLE_FAN||m.mode===void 0)d=r.isSkinnedMesh===!0?new sa(x,b):new we(x,b),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),m.mode===In.TRIANGLE_STRIP?d.geometry=lh(d.geometry,Ma):m.mode===In.TRIANGLE_FAN&&(d.geometry=lh(d.geometry,qr));else if(m.mode===In.LINES)d=new la(x,b);else if(m.mode===In.LINE_STRIP)d=new $s(x,b);else if(m.mode===In.LINE_LOOP)d=new ha(x,b);else if(m.mode===In.POINTS)d=new Ai(x,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(d.geometry.morphAttributes).length>0&&s_(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),mi(d,r),m.extensions&&is(s,d,m),t.assignFinalMaterial(d),u.push(d)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&is(s,u[0],r),u[0];let f=new Nt;r.extensions&&is(s,f,r),t.associations.set(f,{meshes:e});for(let p=0,g=u.length;p<g;p++)f.add(u[p]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Gt(ed.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Js(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),mi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let f=new it;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new oa(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let p=s.channels[u],g=s.samplers[p.sampler],x=p.target,m=x.node,d=s.parameters!==void 0?s.parameters[g.input]:g.input,b=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",b)),l.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],p=u[1],g=u[2],x=u[3],m=u[4],d=[];for(let b=0,v=f.length;b<v;b++){let y=f[b],T=p[b],S=g[b],A=x[b],I=m[b];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let E=n._createAnimationTracks(y,T,S,A,I);if(E)for(let M=0;M<E.length;M++)d.push(E[M])}return new ir(r,void 0,d)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(f,a_)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Hr:l.length>1?h=new Nt:l.length===1?h=l[0]:h=new dt,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),mi(h,r),r.extensions&&is(n,h,r),r.matrix!==void 0){let u=new it;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Nt;n.name&&(r.name=s.createUniqueName(n.name)),mi(r,n),n.extensions&&is(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,p]of s.associations)(f instanceof rn||f instanceof jt)&&u.set(f,p);return h.traverse(f=>{let p=s.associations.get(f);p!=null&&u.set(f,p)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];Ui[r.path]===Ui.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Ui[r.path]){case Ui.weights:l=ui;break;case Ui.rotation:l=fi;break;case Ui.position:case Ui.scale:l=di;break;default:switch(n.itemSize){case 1:l=ui;break;case 2:case 3:default:l=di;break}break}let h=s.interpolation!==void 0?t_[s.interpolation]:Ys,u=this._getArrayFromAccessor(n);for(let f=0,p=c.length;f<p;f++){let g=new l(c[f]+"."+Ui[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Fh(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof fi?zh:Aa;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function c_(i,e,t){let n=e.attributes,s=new Ht;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new O(c[0],c[1],c[2]),new O(l[0],l[1],l[2])),a.normalized){let h=Fh(or[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new O,c=new O;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],p=f.min,g=f.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),f.normalized){let x=Fh(or[f.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new vn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function pd(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=Nh[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return ft.workingColorSpace!==Kt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ft.workingColorSpace}" not supported.`),mi(i,e),c_(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?i_(i,e.targets,t):i})}var gd=function(){"use strict";var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?e:i,r,o=WebAssembly.instantiate(a(s),{}).then(function(d){r=d.instance,r.exports.__wasm_call_ctors()});function a(d){for(var b=new Uint8Array(d.length),v=0;v<d.length;++v){var y=d.charCodeAt(v);b[v]=y>96?y-97:y>64?y-39:y+4}for(var T=0,v=0;v<d.length;++v)b[T++]=b[v]<60?n[b[v]]:(b[v]-60)*64+b[++v];return b.buffer.slice(0,T)}function c(d,b,v,y,T,S){var A=r.exports.sbrk,I=v+3&-4,E=A(I*y),M=A(T.length),L=new Uint8Array(r.exports.memory.buffer);L.set(T,M);var W=d(E,v,y,M,T.length);if(W==0&&S&&S(E,I,y),b.set(L.subarray(E,E+v*y)),A(E-A(0)),W!=0)throw new Error("Malformed buffer data: "+W)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],f=0;function p(d){var b={object:new Worker(d),pending:0,requests:{}};return b.object.onmessage=function(v){var y=v.data;b.pending-=y.count,b.requests[y.id][y.action](y.value),delete b.requests[y.id]},b}function g(d){for(var b="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(a(s))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),v=new Blob([b],{type:"text/javascript"}),y=URL.createObjectURL(v),T=0;T<d;++T)u[T]=p(y);URL.revokeObjectURL(y)}function x(d,b,v,y,T){for(var S=u[0],A=1;A<u.length;++A)u[A].pending<S.pending&&(S=u[A]);return new Promise(function(I,E){var M=new Uint8Array(v),L=f++;S.pending+=d,S.requests[L]={resolve:I,reject:E},S.object.postMessage({id:L,count:d,size:b,source:M,mode:y,filter:T},[M.buffer])})}function m(d){o.then(function(){var b=d.data;try{var v=new Uint8Array(b.count*b.size);c(r.exports[b.mode],v,b.count,b.size,b.source,r.exports[b.filter]),self.postMessage({id:b.id,count:b.count,action:"resolve",value:v},[v.buffer])}catch(y){self.postMessage({id:b.id,count:b.count,action:"reject",value:y})}})}return{ready:o,supported:!0,useWorkers:function(d){g(d)},decodeVertexBuffer:function(d,b,v,y,T){c(r.exports.meshopt_decodeVertexBuffer,d,b,v,y,r.exports[l[T]])},decodeIndexBuffer:function(d,b,v,y){c(r.exports.meshopt_decodeIndexBuffer,d,b,v,y)},decodeIndexSequence:function(d,b,v,y){c(r.exports.meshopt_decodeIndexSequence,d,b,v,y)},decodeGltfBuffer:function(d,b,v,y,T,S){c(r.exports[h[T]],d,b,v,y,r.exports[l[S]])},decodeGltfBufferAsync:function(d,b,v,y,T){return u.length>0?x(d,b,v,h[y],l[T]):o.then(function(){var S=new Uint8Array(d*b);return c(r.exports[h[y]],S,d,b,v,r.exports[l[T]]),S})}}}();function xd(i){let e=new Map,t=new Map,n=i.clone();return bd(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function bd(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)bd(i.children[n],e.children[n],t)}var yd={meadow:{top:6080767,mid:10477823,fog:9426162,bot:7323530,near:72,far:230},canyon:{top:4029680,mid:9356543,fog:15911082,bot:16742972,near:180,far:380},sky:{top:8309759,mid:13168383,fog:12051711,bot:9357552,near:78,far:250},ice:{top:12971263,mid:15202047,fog:12049912,bot:7255791,near:70,far:230},climb:{top:16762218,mid:16769184,fog:16764806,bot:14716976,near:68,far:210},ship:{top:9426175,mid:16770992,fog:13165823,bot:9355504,near:80,far:240}};function _d(i){return yd[i]||yd.meadow}function Ft(i){let e=Math.sin(i*127.1)*43758.5453;return e-Math.floor(e)}function vd(){let i=document.createElement("canvas");i.width=4,i.height=1;let e=i.getContext("2d");e.fillStyle="#c5d0e4",e.fillRect(0,0,1,1),e.fillStyle="#ffe7c8",e.fillRect(1,0,1,1),e.fillStyle="#ffffff",e.fillRect(2,0,2,1);let t=new er(i);return t.magFilter=Wt,t.minFilter=Wt,t.generateMipmaps=!1,t.colorSpace=Wn||Kt,t}function un(i,e){return new Tt({color:i,gradientMap:e,side:Dt})}function Md(i,e,t){let n=new dt,s=new Le,r=[];function o(D,F,Y,ue){if(!Y.length)return null;let de=new on(D,F,Y.length);return Y.forEach((De,Ye)=>{ue(n,De,Ye),n.updateMatrix(),de.setMatrixAt(Ye,n.matrix),De.color&&(s.set(De.color),de.setColorAt(Ye,s))}),de.instanceMatrix.needsUpdate=!0,de.instanceColor&&(de.instanceColor.needsUpdate=!0),i.add(de),r.push(de),de}let a={meadow:[],canyon:[],sky:[],ice:[],climb:[],ship:[]};for(let D of e.tiles)a[D.zone]&&(Math.abs(D.col)<2||Math.abs(D.col*5+D.row*3)%3===0&&a[D.zone].push(D));let c=new Xn(.28,1.15,5),l=new ts(.55,0),h=new kt(.32,8,6),u=new an(.18,.18,1.4,8),f=new ts(.9,0);o(l,un(12876373,t),a.canyon,(D,F,Y)=>{D.position.set(F.x,F.y+.35,F.z),D.rotation.set(Y,Y*.5,0),D.scale.set(1,.75,1.1)}),o(u,un(3029611,t),a.canyon.filter((D,F)=>F%2===0),(D,F)=>{D.position.set(F.x,F.y+.35,F.z),D.rotation.set(0,0,Math.PI/2),D.scale.set(1,1,1)}),o(c,un(12051711,t),a.sky,(D,F,Y)=>{D.position.set(F.x,F.y+.55,F.z),D.rotation.set(.1,Y,.2),D.scale.setScalar(.8+Y%3*.15)}),o(c,un(13219583,t),a.ice,(D,F,Y)=>{D.position.set(F.x,F.y+.7,F.z),D.rotation.set(0,Y,.15),D.scale.setScalar(1+Y%3*.2)}),o(h,un(16055295,t),a.ice.filter((D,F)=>F%2===0),(D,F)=>{D.position.set(F.x,F.y+.28,F.z),D.rotation.set(0,0,0),D.scale.set(1.15,.7,1.15)}),o(l,un(14721370,t),a.climb,(D,F,Y)=>{D.position.set(F.x,F.y+.4,F.z),D.rotation.set(.2,Y,0),D.scale.setScalar(.7)});let p=new an(.28,.34,2.4,6),g=new kt(.45,8,6),x=new kt(.42,10,8),m=new an(.7,.7,.12,7),d=new Mn(.16,1.6,.16),b=new kt(.12,6,6),v=a.canyon.filter((D,F)=>Ft(F+4)>.62);o(new ts(.7,1),un(2759714,t),v,(D,F,Y)=>{let ue=Ft(Y+F.z);D.position.set(F.x+(ue-.5)*1.8,F.y+.15+ue*.4,F.z+(Ft(Y+2)-.5)*1.6),D.rotation.set(ue*2,Ft(Y)*4,Ft(Y+9)),D.scale.set(.45+ue*1.3,.55+Ft(Y+3)*1.6,.5+Ft(Y+6)*1.1)}),o(x,un(16748497,t),a.sky.filter((D,F)=>F%3===0),(D,F,Y)=>{D.position.set(F.x,F.y+3.2+Y%3,F.z),D.rotation.set(0,0,0),D.scale.set(1,1.15,1)}),o(h,un(16777215,t),a.sky,(D,F,Y)=>{D.position.set(F.x+(F.col>0?2:-2),F.y+2.4,F.z),D.rotation.set(0,Y,0),D.scale.set(1.6,.7,1.2)}),o(m,un(16055295,t),a.ice.filter((D,F)=>F%2===0),(D,F)=>{D.position.set(F.x,F.y+.08,F.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)}),o(c,un(10189823,t),a.ice.filter((D,F)=>F%2===1),(D,F,Y)=>{D.position.set(F.x,F.y+1.1,F.z+.4),D.rotation.set(.2,Y,0),D.scale.setScalar(1.35)}),o(d,un(16774885,t),a.climb.filter((D,F)=>F%2===0),(D,F)=>{D.position.set(F.x,F.y+.8,F.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)}),o(l,un(9067066,t),a.climb.filter((D,F)=>F%3===0),(D,F,Y)=>{D.position.set(F.x,F.y+.3,F.z+.6),D.rotation.set(.4,Y,.2),D.scale.setScalar(.55)});let y=new Tt({color:16739179,emissive:16739179,emissiveIntensity:.7,gradientMap:t});o(b,y,a.climb.filter((D,F)=>F%2===0),(D,F)=>{D.position.set(F.x,F.y+1.7,F.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)});function T(){let D=new ts(1,1),F=D.attributes.position;for(let Y=0;Y<F.count;Y++){let ue=F.getX(Y),de=F.getY(Y),De=F.getZ(Y),Ye=1+Math.sin(ue*2.8+de*1.7)*.22+Math.sin(De*2.4+.6)*.16,Te=de>.15?.62:1.05;F.setXYZ(Y,ue*Ye,de*Ye*Te+.2,De*Ye)}return D.computeVertexNormals(),D}function S(){let D=new an(1,1.25,1.1,7,3),F=D.attributes.position,Y=new Float32Array(F.count*3);for(let ue=0;ue<F.count;ue++){let de=F.getY(ue),De=de>.25;Y[ue*3]=De?.35:.45,Y[ue*3+1]=De?.72:.32,Y[ue*3+2]=De?.32:.24,de>.35&&F.setY(ue,de*.45+.35)}return D.setAttribute("color",new wt(Y,3)),D.computeVertexNormals(),D}let A={meadow:3971656,canyon:4858912,sky:8300240,ice:4034516,climb:12085800,ship:14858360},I=[],E=e.stations||[];e.hubs&&e.hubs.length&&e.hubs.forEach((D,F)=>{if(!D)for(let Y=0;Y<8;Y++){let ue=Y/8*Math.PI*2+F*.4,de=D.r+6+Ft(F*19+Y)*12,De=4.2+Ft(Y+F*5)*5.5;I.push({x:D.x+Math.cos(ue)*de,y:-.4,z:D.z+Math.sin(ue)*de,s:De,ry:ue,rx:(Ft(Y+2)-.5)*.25,color:A[D.zone]||8378506,zone:D.zone,side:Math.cos(ue)>0?1:-1})}});for(let D=0;D<E.length&&!(e.hubs&&e.hubs.length);D+=14){let F=E[D];if(!(!F||F.gap))for(let Y=0;Y<2;Y++)for(let ue of[-1,1]){let de=Ft(D+Y*17+ue*3),De=(Y===0?16:30)+de*8,Ye=3.2+Ft(D+4+Y)*4.2;I.push({x:F.x+ue*De,y:F.y-.8,z:F.z+(Ft(D+Y+6)-.5)*12,s:Ye*(Y===0?1:1.35),ry:de*6.2,rx:(Ft(D+2)-.5)*.4,color:A[F.zone]||8378506,zone:F.zone,side:ue})}}let M=o(T(),un(16777215,t),I,(D,F)=>{D.position.set(F.x,F.y+F.s*.35,F.z),D.rotation.set(F.rx,F.ry,F.rx*.5),D.scale.set(F.s,F.s*.72,F.s*.9)}),L=new Tt({vertexColors:!0,gradientMap:t}),W=I.filter((D,F)=>F%3===0).map(D=>({...D,color:0}));o(S(),L,W,(D,F)=>{D.position.set(F.x,F.y+.4,F.z),D.rotation.set(0,F.ry,0),D.scale.set(F.s*.85,F.s*.55,F.s*.8)});let X=[];function J(D){let F=E.filter(k=>k&&k.zone==="canyon"&&!k.gap);if(F.length<4)return;let Y=2,ue=[];for(let k=0;k<F.length;k+=Y)ue.push(F[k]);let de=[],De=[],Ye=[];ue.forEach((k,le)=>{let ge=Math.sin(k.z*.09)*.9+Math.sin(k.z*.027)*.55,Re=1.15+Math.sin(k.z*.06+D)*.4,Ce=k.x+D*(k.half+1.15+ge*.35);de.push(Ce-Re*.65,k.y-.55,k.z,Ce+Re*.65,k.y-.42,k.z);let rt=le/Math.max(1,ue.length-1);De.push(0,rt*8,1,rt*8)});for(let k=0;k<ue.length-1;k++){let le=k*2;Ye.push(le,le+2,le+1,le+1,le+2,le+3)}let Te=new Ct;Te.setAttribute("position",new ct(de,3)),Te.setAttribute("uv",new ct(De,2)),Te.setIndex(Ye);let je=new Zt({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float flow=fract(vUv.y-uTime*0.35); float lane=abs(vUv.x-0.5); float body=smoothstep(0.5,0.08,lane); float streak=smoothstep(0.12,0.9,flow); vec3 col=mix(vec3(0.42,0.04,0.01), vec3(1.0,0.55,0.05), streak*body); float rim=smoothstep(0.2,0.38,lane)*(1.0-smoothstep(0.38,0.5,lane)); col+=vec3(1.0,0.8,0.25)*rim; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }"});i.add(new we(Te,je)),X.push(je)}if(e.crater){let D=e.crater,F=new Sn(D.r,36),Y=new Zt({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ vec2 p=vUv-0.5; float r=length(p); float flow=fract(r*4.0-uTime*0.32); float ang=sin(atan(p.y,p.x)*5.0+uTime*0.8); float body=smoothstep(0.48,0.08,r); float streak=smoothstep(0.05,0.95,flow); vec3 col=mix(vec3(0.45,0.08,0.02), vec3(1.0,0.42,0.05), streak*0.65); col+=vec3(1.0,0.28,0.02)*ang*0.08*body; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }"}),ue=new we(F,Y);ue.rotation.x=-Math.PI/2,ue.position.set(D.x,D.y,D.z),i.add(ue),X.push(Y)}else J(1),J(-1);let K=I.filter((D,F)=>(D.zone==="meadow"||D.zone==="sky")&&F%7===0).slice(0,10),Q=new Zt({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float f=fract(vUv.y*3.0-uTime*0.8); float a=smoothstep(0.0,0.15,vUv.x)*smoothstep(1.0,0.85,vUv.x)*0.55; vec3 col=mix(vec3(0.75,0.92,1.0), vec3(1.0,1.0,1.0), f); gl_FragColor=vec4(col,a); }"});X.push(Q);for(let D of K){let F=new we(new li(1.4,4.2),Q);F.position.set(D.x+D.side*1.5,D.y+D.s*.2,D.z),i.add(F)}let he=[],$={meadow:8378506,canyon:16742938,sky:12051711,ice:14152703,climb:16762218,ship:16774885};for(let D=0;D<36;D++){let F=e.ship.z*(D+.5)/36,Y=D%2===0?-1:1,ue=e.zones[0].id;for(let de of e.zones)F>=de.z0&&(ue=de.id);he.push({x:Y*(14+Ft(D)*8),y:6+Ft(D+3)*8,z:F,s:.6+Ft(D+9)*.9,phase:Ft(D+2)*6,color:$[ue]||16774885})}let xe=o(f,un(16777215,t),he,(D,F)=>{D.position.set(F.x,F.y,F.z),D.rotation.set(F.phase,F.phase*.3,0),D.scale.setScalar(F.s)}),be=160,Fe=new Float32Array(be*3),$e=[];for(let D=0;D<be;D++)$e.push({ox:(Ft(D)-.5)*18,oy:Ft(D+1)*6,oz:(Ft(D+2)-.4)*22,sp:.4+Ft(D+4)*1.6});let ht=new Ct;ht.setAttribute("position",new wt(Fe,3));let ne=new Ai(ht,new hi({color:16774885,size:.16,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0}));return i.add(ne),{update(D,F){let Y=D.time||0;xe&&(he.forEach((Te,je)=>{n.position.set(Te.x,Te.y+Math.sin(Y*.7+Te.phase)*.45,Te.z),n.rotation.set(Te.phase,Y*.15+Te.phase,0),n.scale.setScalar(Te.s),n.updateMatrix(),xe.setMatrixAt(je,n.matrix)}),xe.instanceMatrix.needsUpdate=!0);for(let Te of X)Te.uniforms.uTime.value=Y;let ue=D.player,de=D.zoneId||"meadow",De=de==="canyon"?16742938:de==="ice"?16055295:de==="sky"?16777215:de==="climb"?16765503:16774856;ne.material.color.setHex(De),ne.material.size=de==="ice"?.28:de==="canyon"?.22:.16,ne.material.opacity=de==="ice"?.55+Math.abs(Math.sin(Y*7))*.4:.85;let Ye=de==="sky"?4:de==="canyon"?.4:.8;for(let Te=0;Te<be;Te++){let je=$e[Te],k=(Y*je.sp*Ye+je.oy)%7;Fe[Te*3]=ue.pos.x+je.ox+(de==="sky"?Math.sin(Y+Te)*.4:0),Fe[Te*3+1]=ue.pos.y+.4+k,Fe[Te*3+2]=ue.pos.z+je.oz}ht.attributes.position.needsUpdate=!0}}}var Wh={tree:"assets/meadow/tree.glb",treeFat:"assets/meadow/tree_fat.glb",pine:"assets/meadow/tree_pine.glb",bush:"assets/meadow/bush.glb",bushLarge:"assets/meadow/bush_large.glb",bushSmall:"assets/meadow/bush_small.glb",flowerRed:"assets/meadow/flower_red.glb",flowerYellow:"assets/meadow/flower_yellow.glb",flowerPurple:"assets/meadow/flower_purple.glb",grass:"assets/meadow/grass.glb",grassLarge:"assets/meadow/grass_large.glb",rock:"assets/meadow/rock_small.glb",rockLarge:"assets/meadow/rock_large.glb",mushroom:"assets/meadow/mushroom.glb",mushroomTall:"assets/meadow/mushroom_tall.glb",fence:"assets/meadow/fence.glb",fenceBroken:"assets/meadow/fence_broken.glb",platform:"assets/meadow/platform.glb",log:"assets/meadow/log.glb",saw:"assets/meadow/saw.glb",button:"assets/meadow/button.glb",door:"assets/meadow/door.glb"},Xh={cliff:"assets/kenney/cliff.glb",cliffLarge:"assets/kenney/cliff_large.glb",cliffTop:"assets/kenney/cliff_top.glb",formation:"assets/kenney/formation.glb",formationLarge:"assets/kenney/formation_large.glb",plank:"assets/kenney/plank.glb",block:"assets/kenney/block.glb",doorOpen:"assets/kenney/door_open.glb"},Sd={woodbark:13206602,woodinner:15782564,wooddark:9263666,wood:14722140,leafsgreen:4050517,grass:5166687,dirt:14135410,colorred:16729180,coloryellow:16765503,colorpurple:13208575,metal:16774354,heart:16735114,_defaultmat:16774885};function h_(i){let e=String(i||"").toLowerCase().replace(/[^a-z]/g,"");return Sd[e]?Sd[e]:e.includes("leaf")||e.includes("grass")?4050517:e.includes("wood")||e.includes("bark")?13206602:e.includes("red")?16729180:e.includes("yellow")?16765503:e.includes("purple")?13208575:e.includes("dirt")||e.includes("rock")?12042444:16774885}var wd={value:0};function Td(i){wd.value=i}function Ad(i,e,t,n){let s=i&&i.name||"",r=new Tt({color:t?t(s):h_(s),gradientMap:e,side:Dt,name:s});return r.onBeforeCompile=o=>{n&&(o.uniforms.uWindTime=wd,o.vertexShader=`uniform float uWindTime;
`+o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
float sway = sin(uWindTime * 1.7 + position.x * 0.45 + position.z * 0.2) * 0.075 * smoothstep(0.3, 1.8, position.y);
transformed.x += sway;
transformed.z += sway * 0.35;`)),o.fragmentShader=o.fragmentShader.replace("#include <opaque_fragment>",`float ndl = clamp(dot(normalize(normal), normalize(vec3(-0.35, 0.86, 0.25))), 0.0, 1.0);
	outgoingLight *= mix(0.62, 1.18, ndl);
	float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.4);
	outgoingLight += rim * vec3(1.0, 0.96, 0.86) * 0.34;
	#include <opaque_fragment>`)},r}function Vh(i,e){i.traverse(t=>{if(!t.isMesh)return;let n=Array.isArray(t.material)?t.material[0]:t.material;t.material=Ad(n,e)})}function u_(i,e,t,n){i.scene.updateWorldMatrix(!0,!0);let s=[];i.scene.traverse(o=>{if(!o.isMesh)return;let a=o.geometry.clone();a.applyMatrix4(o.matrixWorld);let c=Array.isArray(o.material)?o.material[0]:o.material;s.push({geom:a,mat:Ad(c,e,t,n)})});let r=new Ht().setFromObject(i.scene);return{parts:s,lift:-r.min.y}}function xt(i,e,t,n,s,r){if(!e||!n.length)return;let{parts:o,lift:a}=u_(e,t,s,r),c=new dt;for(let u of o){let f=new on(u.geom,u.mat,n.length);f.frustumCulled=!1,n.forEach((p,g)=>{let x=p.s;c.position.set(p.x,(p.y||0)+a*x,p.z),c.rotation.set(0,p.rot||0,0),c.scale.setScalar(x),c.updateMatrix(),f.setMatrixAt(g,c.matrix)}),f.instanceMatrix.needsUpdate=!0,i.add(f)}let l=new on(new Sn(1,12),new pt({color:1975360,transparent:!0,opacity:.22,depthWrite:!1}),n.length),h=new dt;n.forEach((u,f)=>{h.position.set(u.x,(u.y||0)+.05,u.z),h.rotation.set(-Math.PI/2,0,0),h.scale.setScalar(Math.max(.35,u.s*1.6)),h.updateMatrix(),l.setMatrixAt(f,h.matrix)}),l.instanceMatrix.needsUpdate=!0,l.frustumCulled=!1,i.add(l)}function Pn(i,e,t,n,s){let r=[];for(let o=0;o<t;o++){let a=o*2.4+i*.1,c=n*(.25+o%4*.22);r.push({x:i+Math.cos(a)*c,z:e+Math.sin(a)*c,rot:a,s:s*(.82+o%3*.14),y:0})}return r}function Qt(i,e,t,n,s,r,o){let a=[];for(let c=0;c<t;c++){let l=o+c/t*Math.PI*2;a.push({x:i+Math.cos(l)*n,z:e+Math.sin(l)*n,rot:l,s:s*(.85+c%3*.12),y:r})}return a}var ar=i=>{let e=String(i||"").toLowerCase();return e.includes("sand")||e.includes("grass")||e.includes("leaf")?14711346:e.includes("red")?12863544:e.includes("wood")||e.includes("dirt")?9058856:7220770};function Ed(i,e,t,n){if(!e.length)return;let s=new kt(.85,12,9),r=new Tt({color:t,gradientMap:n}),o=new on(s,r,e.length),a=new dt,c=new on(new Sn(1,12),new pt({color:1975360,transparent:!0,opacity:.22,depthWrite:!1}),e.length),l=new dt;e.forEach((h,u)=>{a.position.set(h.x,(h.y||0)+.7*h.s,h.z),a.scale.set(h.s,h.s*.82,h.s),a.rotation.set(0,h.rot||0,0),a.updateMatrix(),o.setMatrixAt(u,a.matrix),l.position.set(h.x,(h.y||0)+.06,h.z),l.rotation.set(-Math.PI/2,0,0),l.scale.setScalar(Math.max(.5,h.s*1.4)),l.updateMatrix(),c.setMatrixAt(u,l.matrix)}),o.instanceMatrix.needsUpdate=!0,c.instanceMatrix.needsUpdate=!0,i.add(o,c)}var kh=i=>{let e=String(i||"").toLowerCase();return e.includes("leaf")||e.includes("grass")||e.includes("sand")?8315080:16054271},Bh=i=>{let e=String(i||"").toLowerCase();return e.includes("leaf")||e.includes("grass")||e.includes("sand")?14153471:9357552},Hh=i=>{let e=String(i||"").toLowerCase();return e.includes("leaf")||e.includes("grass")||e.includes("sand")?16757082:13920818},Gh=i=>{let e=String(i||"").toLowerCase();return e.includes("sand")||e.includes("grass")||e.includes("leaf")?4050517:e.includes("wood")||e.includes("dirt")?9267268:7166016};function Rd(i,e,t,n){let s=(e.hubs||[]).find(S=>S.zone==="meadow")||{x:0,z:40,r:24},r=Pn(s.x-10,s.z-1,6,3.2,.62),o=Pn(s.x+9,s.z+13,4,2.8,.72),a=Pn(s.x-8,s.z+12,3,2.2,.58),c=Pn(s.x-11,s.z+6,5,2.4,.85),l=Pn(s.x-7,s.z-13,8,2.2,.78),h=Pn(s.x+8,s.z-9,7,2,.72),u=Pn(s.x+6,s.z-14,8,2.6,.42).concat(Pn(s.x-6,s.z+8,6,2.2,.4)),f=Pn(s.x+16,s.z+2,5,2.6,.95),p=[{x:s.x+7.2,z:s.z-5.5,rot:.4,s:2.15,y:0},{x:s.x+9.4,z:s.z-7.2,rot:1.2,s:1.55,y:0},{x:s.x+6.1,z:s.z-7.6,rot:2.1,s:1.25,y:0}],g=[];for(let S=0;S<6;S++)g.push({x:s.x-18.6,z:s.z-12+S*3.6,rot:Math.PI/2,s:.52,y:0});let m=(e.floors||[]).filter(S=>S.zone==="meadow"&&S.rx>5&&S.rx<9).map((S,A)=>({x:S.x,z:S.z,y:S.y,rot:A,s:.85}));if(xt(i,n.tree,t,r,null,!0),xt(i,n.treeFat,t,o,null,!0),xt(i,n.pine,t,a,null,!0),xt(i,n.bushLarge,t,c,null,!0),xt(i,n.bush,t,Pn(s.x+12,s.z+8,4,2,.7),null,!0),xt(i,n.flowerRed,t,l.filter((S,A)=>A%2===0),null,!0),xt(i,n.flowerYellow,t,l.filter((S,A)=>A%2===1),null,!0),xt(i,n.flowerPurple,t,h,null,!0),xt(i,n.grass,t,u,null,!0),xt(i,n.grassLarge,t,Pn(s.x-9,s.z-8,4,1.8,.48),null,!0),xt(i,n.rockLarge,t,f),xt(i,n.rock,t,Pn(s.x+15,s.z-1,4,1.6,.55)),xt(i,n.mushroomTall,t,p),xt(i,n.fence,t,g),xt(i,n.log,t,[{x:s.x-15.5,z:s.z-8,rot:.5,s:.7,y:0}]),xt(i,n.platform,t,m),xt(i,n.cliff,t,Qt(s.x,s.z,12,21.2,.62,-1.2,.05),Gh),xt(i,n.cliffLarge,t,Qt(s.x,s.z,12,23.4,.55,-1.5,.2),Gh),xt(i,n.cliffTop,t,Qt(s.x,s.z,8,36,1.15,-1.2,.4),Gh),n.mushroom){let S=n.mushroom.scene.clone(!0);Vh(S,t);let A=new Ht().setFromObject(n.mushroom.scene),I=4.6;S.scale.setScalar(I),S.position.set(s.x,-A.min.y*I,s.z);let E=[];S.traverse(L=>{L.isMesh&&E.push(L)});for(let L of E){let W=new we(L.geometry,new pt({color:1975360,side:Vt}));W.scale.setScalar(1.045),L.add(W)}[[.22,1.28,.05],[-.18,1.22,.2],[.05,1.32,-.22],[.28,1.18,-.12]].forEach((L,W)=>{let X=n.mushroomTall.scene.clone(!0);Vh(X,t),X.scale.setScalar(.16+W%2*.05),X.position.set(L[0],L[1],L[2]),X.rotation.y=W,S.add(X)}),i.add(S)}let d=(e.hubs||[]).find(S=>S.zone==="canyon"),b=e.crater;if(d){let S=b?b.x:d.x,A=b?b.z:d.z;Ed(i,Qt(S,A,8,12,1.15,.15,.2),16747098,t),Ed(i,Qt(S,A,6,8.5,.7,.1,.4),16765503,t),xt(i,n.cliffLarge,t,Qt(d.x,d.z,10,21,.7,-1.4,.05),ar),xt(i,n.cliff,t,Qt(d.x,d.z,10,23.2,.62,-1.6,.18),ar),xt(i,n.cliffTop,t,Qt(d.x,d.z,7,36,1.25,-.8,.3),ar);let I=[{x:d.x-16,z:d.z+8,rot:.4,s:.7,y:0},{x:d.x-16,z:d.z+14,rot:.4,s:.7,y:0},{x:d.x-16,z:d.z+11,rot:Math.PI/2,s:.55,y:4.2}];xt(i,n.cliff,t,I.slice(0,2),ar),xt(i,n.cliffTop,t,I.slice(2),ar);let E=e.doors&&e.doors[0]?e.doors[0].z:A+28;n.block&&xt(i,n.block,t,[{x:-12.6,z:E,rot:0,s:.28,y:.15},{x:12.6,z:E,rot:0,s:.28,y:.15}],ar)}let v=(e.hubs||[]).find(S=>S.zone==="sky"),y=(e.hubs||[]).find(S=>S.zone==="ice"),T=(e.hubs||[]).find(S=>S.zone==="climb");v&&(xt(i,n.pine,t,Qt(v.x,v.z,6,14,.42,4.2,.2),kh,!0),xt(i,n.bush,t,Qt(v.x,v.z,8,10,.45,4.1,.6),kh,!0),xt(i,n.cliffTop,t,Qt(v.x,v.z,6,28,1,2,.4),kh)),y&&(xt(i,n.pine,t,Qt(y.x,y.z,7,14,.4,3.2,.3),Bh,!0),xt(i,n.rockLarge,t,Qt(y.x,y.z,6,16,.7,3.1,.8),Bh),xt(i,n.cliff,t,Qt(y.x,y.z,12,18,.5,1.6,.1),Bh)),T&&(xt(i,n.tree,t,Qt(T.x,T.z,6,13,.4,3.2,.5),Hh,!0),xt(i,n.rockLarge,t,Qt(T.x,T.z,5,15,.75,3,1),Hh),xt(i,n.cliffLarge,t,Qt(T.x,T.z,10,18,.55,1.4,.2),Hh))}function zi(i,e,t,n){let s=new Ht().setFromObject(i.scene),r=i.scene.clone(!0);return Vh(r,e),r.scale.setScalar(t),n||(r.position.y=-s.min.y*t),r}var Cd={buddy:"assets/space_buddy_rigged.glb",bumper:"assets/models/obstacle_bumper.glb",spinner:"assets/models/obstacle_spinner.glb",pad:"assets/models/obstacle_jump_pad.glb",platform:"assets/models/obstacle_moving_platform.glb",lava:"assets/models/obstacle_lava_pool.glb",chunk:"assets/models/obstacle_falling_chunk.glb",ship:"assets/escape_ship_web.glb",roller:"assets/models/enemy_roller.glb",hopper:"assets/models/enemy_hopper.glb",flyer:"assets/models/enemy_flyer.glb",geyser:"assets/models/hazard_geyser.glb",sweeper:"assets/models/hazard_sweeper.glb",pendulum:"assets/models/hazard_pendulum.glb"},It=vd();function f_(i){let e=!!i.userData.stripes;i.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCandyW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vCandyW = (modelMatrix * vec4(transformed, 1.0)).xyz;`),t.fragmentShader=`varying vec3 vCandyW;
`+t.fragmentShader.replace("#include <opaque_fragment>",`float ndl = clamp(dot(normalize(normal), normalize(vec3(-0.35, 0.86, 0.25))), 0.0, 1.0);
outgoingLight *= mix(0.78, 1.08, ndl);
float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.2);
outgoingLight += rim * vec3(1.0, 0.97, 0.9) * 0.28;
`+(e?`float stripe = step(0.5, fract(vCandyW.y * 1.7));
outgoingLight = mix(outgoingLight * 0.72, outgoingLight * vec3(1.12, 1.04, 0.92), stripe);
`:"")+"#include <opaque_fragment>")}}function Id(i,e){let t=e?new Le(e):i&&i.color&&i.color.isColor?i.color.clone():new Le(16777215),n=i&&i.emissive&&i.emissive.isColor?i.emissive.clone():new Le(0),s=new Tt({color:t,emissive:n,emissiveIntensity:i&&i.emissiveIntensity||0,gradientMap:It,transparent:!!(i&&i.transparent),opacity:i&&i.opacity!=null?i.opacity:1,side:Dt,name:i&&i.name||""});return e&&(s.userData.stripes=!0),/Lava|Glow|Antenna|Thruster|Pad|Crack|Star|Hot/.test(s.name)&&(s.emissive.copy(t),s.emissiveIntensity=Math.max(s.emissiveIntensity,.35)),f_(s),s}function d_(i){let e=i.getAttribute("position"),t=i.getIndex();if(!e||!t)return;let n=t.array,s=[],r=new Map,o=.012;for(let a=0;a<n.length;a+=3){let c=n[a],l=n[a+1],h=n[a+2],u=(e.getX(c)+e.getX(l)+e.getX(h))/3,f=(e.getY(c)+e.getY(l)+e.getY(h))/3,p=(e.getZ(c)+e.getZ(l)+e.getZ(h))/3,g=Math.round(u/o)+":"+Math.round(f/o)+":"+Math.round(p/o),x=r.get(g)||[],m=!1;for(let d=0;d<x.length;d++){let b=x[d];if(Math.abs(b[0]-u)+Math.abs(b[1]-f)+Math.abs(b[2]-p)<.008){m=!0;break}}m||(x.push([u,f,p]),r.set(g,x),s.push(c,l,h))}s.length<n.length&&i.setIndex(s)}function p_(i){let e=i.getAttribute("position"),t=i.getIndex();if(!e||!t)return;let n=t.array,s=[],r=u=>e.getX(u),o=u=>e.getY(u),a=u=>e.getZ(u),c=1/0,l=-1/0;for(let u=0;u<e.count;u++){let f=o(u);f<c&&(c=f),f>l&&(l=f)}let h=Math.max(.001,l-c);for(let u=0;u<n.length;u+=3){let f=n[u],p=n[u+1],g=n[u+2],x=Math.hypot(r(f)-r(p),o(f)-o(p),a(f)-a(p)),m=Math.hypot(r(p)-r(g),o(p)-o(g),a(p)-a(g)),d=Math.hypot(r(g)-r(f),o(g)-o(f),a(g)-a(f)),b=Math.max(x,m,d),v=Math.min(x,m,d);v<8e-4||b/Math.max(v,1e-6)>18||b>h*.42||s.push(f,p,g)}s.length<n.length&&i.setIndex(s)}function m_(i,e){i.updateWorldMatrix(!0,!0),i.traverse(r=>{r.isMesh&&(r.geometry=r.geometry.clone(),r.geometry.applyMatrix4(r.matrixWorld),d_(r.geometry),p_(r.geometry),r.position.set(0,0,0),r.quaternion.identity(),r.scale.set(1,1,1))}),i.position.set(0,0,0),i.quaternion.identity(),i.scale.set(1,1,1),i.updateWorldMatrix(!0,!0);let t=new Ht().setFromObject(i),n=Math.max(.001,t.getSize(new O).y);i.scale.setScalar(e/n),i.updateWorldMatrix(!0,!0);let s=new Ht().setFromObject(i);i.position.y-=s.min.y}var Ld=4;function Dd(i){return i?(i.colorSpace=zt,i.generateMipmaps=!0,i.minFilter=An,i.magFilter=sn,i.anisotropy=Ld,i.needsUpdate=!0,i):null}function g_(i,e){let t=new Le(e),n=Dd(i&&i.map),s=new Ci({map:n,color:16777215,roughness:1,metalness:0,emissive:0,emissiveIntensity:0,name:"BuddyHue"});return s.transparent=!1,s.depthWrite=!0,s.opacity=1,s.alphaTest=0,s.side=_n,s.polygonOffset=!0,s.polygonOffsetFactor=1,s.polygonOffsetUnits=1,s.userData.tint=t,s.onBeforeCompile=r=>{r.uniforms.uTint={value:t},s.userData.shader=r,r.fragmentShader=`uniform vec3 uTint;
`+r.fragmentShader.replace("#include <opaque_fragment>",`vec3 albedo = diffuseColor.rgb;
float luma = dot(albedo, vec3(0.299, 0.587, 0.114));
float mx = max(albedo.r, max(albedo.g, albedo.b));
float mn = min(albedo.r, min(albedo.g, albedo.b));
float sat = mx - mn;
float suit = smoothstep(0.36, 0.62, sat);
float face = (1.0 - suit) * smoothstep(0.08, 0.28, luma);
vec3 tinted = uTint * luma;
diffuseColor.rgb = mix(albedo, tinted, suit);
diffuseColor.rgb = mix(diffuseColor.rgb, max(diffuseColor.rgb, albedo * 1.65 + vec3(0.08)), face);
outgoingLight = mix(outgoingLight, diffuseColor.rgb, suit * 0.35 + face * 0.72);
float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.5);
outgoingLight += rim * vec3(1.0, 0.97, 0.9) * 0.22 * (0.25 + suit);
#include <opaque_fragment>`)},s}function x_(i){let e=Dd(i&&i.map),t=new pt({map:e,color:16777215,fog:!1,toneMapped:!1,name:"ShipPaint"});return t.transparent=!1,t.depthWrite=!0,t.opacity=1,t.side=_n,t}function b_(i,e){let t=new Map;i.traverse(n=>{if(!n.isMesh)return;let s=r=>{if(!r)return Id(null,e);if(!e&&t.has(r.uuid))return t.get(r.uuid);let o=Id(r,e);return e||t.set(r.uuid,o),o};Array.isArray(n.material)?n.material=n.material.map(s):n.material=s(n.material)})}function Pd(i){i.updateWorldMatrix(!0,!0);let e=[];return i.traverse(t=>{if(!t.isMesh)return;let n=t.geometry.clone();n.applyMatrix4(t.matrixWorld),n.computeBoundingBox();let s=Array.isArray(t.material)?t.material[0]:t.material;e.push({geom:n,mat:s,name:s&&s.name||t.name||"",maxY:n.boundingBox.max.y})}),e}function wn(i,e,t,n){return e+(i-e)*Math.exp(-t*n)}function y_(i,e,t,n){let s=e-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-t*n))}async function Ud(i,e,t,n){let s=new ea({canvas:i,antialias:!1,alpha:!1,powerPreference:"high-performance"});s.outputColorSpace=zt,Ld=Math.max(1,Math.min(8,s.capabilities.getMaxAnisotropy())),s.toneMapping=ql,s.toneMappingExposure=1.12;let r=Math.min(window.devicePixelRatio||1,t.dprCap),o=new URLSearchParams(location.search).get("dpr");o&&(r=Math.max(.75,Math.min(2,Number(o)||r)));let a=new na;a.fog=new ta(10479871,t.fogNear,t.fogFar);let c=new Gt(t.fovPortrait,1,.15,500);s.shadowMap.enabled=!0,s.shadowMap.type=Wl;let l=new ga(10474751,16761994,.9),h=new ns(16773314,1.5);h.position.set(-18,28,10),h.castShadow=!0,h.shadow.mapSize.set(1024,1024),h.shadow.camera.near=2,h.shadow.camera.far=38,h.shadow.camera.left=h.shadow.camera.bottom=-12,h.shadow.camera.right=h.shadow.camera.top=12,h.shadow.bias=-6e-4;let u=new ns(12180735,.28);u.position.set(16,10,-18),a.add(l,h,h.target,u);let f=new we(new kt(380,18,12),new Zt({side:Vt,depthWrite:!1,fog:!1,uniforms:{top:{value:new Le(6080767)},mid:{value:new Le(10479871)},bot:{value:new Le(9361328)}},vertexShader:"varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 bot; void main(){ vec3 n=normalize(vP); float h=n.y; vec3 c=mix(bot, mid, smoothstep(-0.15, 0.0, h)); c=mix(c, top, smoothstep(-0.02, 0.16, h)); float sun=smoothstep(0.14, 0.0, length(n.xz-vec2(-0.32,0.12))); c+=vec3(1.0,0.86,0.48)*sun*smoothstep(0.0,0.2,h); gl_FragColor=vec4(c,1.0); }"}));a.add(f);let p=new Nt,g=[];for(let _=0;_<180;_++){let P=Math.random()*Math.PI*2,N=Math.acos(Math.random()*.65+.15),V=260;g.push(Math.sin(N)*Math.cos(P)*V,Math.cos(N)*V*.65+40,Math.sin(N)*Math.sin(P)*V)}let x=new Ct;x.setAttribute("position",new ct(g,3));let m=new Ai(x,new hi({color:16774880,size:2.2,sizeAttenuation:!1,depthWrite:!1})),d=new we(new kt(28,18,14),new Zt({fog:!1,vertexShader:"varying vec3 vN; void main(){ vN=normalize(normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec3 vN; void main(){ float b=sin(vN.y*9.0)*0.5+0.5; vec3 c=mix(vec3(1.0,0.42,0.62), vec3(0.28,0.62,1.0), b); c=mix(c, vec3(1.0,0.86,0.35), smoothstep(0.72,0.9,b)); gl_FragColor=vec4(c,1.0); }"}));d.position.set(-90,55,-160);let b=new we(new Ri(40,3.2,8,28),new pt({color:16769448,fog:!1}));b.rotation.x=1.1,b.position.copy(d.position),p.add(b);let v=new we(new kt(8,12,10),new pt({color:16773577,fog:!1}));v.position.set(70,42,-150),p.add(m,d,v),m.material.transparent=!0;let y=[],T=new pt({color:16777215,fog:!1,transparent:!0,opacity:.94});for(let _=0;_<8;_++){let P=new Nt;for(let V=0;V<4;V++){let ie=new we(new kt(5.5,8,6),T);ie.position.set((V-1.5)*4.6,Math.sin(V*1.4)*1.6,V%2*1.4),ie.scale.set(1,.55,.85),P.add(ie)}let N=_/8*Math.PI*2;P.position.set(Math.cos(N)*110,48+_%3*14,Math.sin(N)*110),p.add(P),y.push(P)}let S=[];for(let _=0;_<4;_++){let P=new we(new Xn(2.2,7,6),new pt({color:_%2?16748497:16765503,fog:!1}));P.rotation.x=Math.PI/2,P.position.set(-40+_*28,36+_%2*8,-90-_*12),p.add(P),S.push(P)}let A=[];for(let _=0;_<6;_++){let P=new we(new an(.06,.06,2.2,5),new pt({color:16774885})),N=new we(new li(1.1,.55),new pt({color:_%2?16739179:6284208,side:Dt}));N.position.set(.55,.85,0),P.add(N),P.position.set(-10+_*4.5,.2,16+_%3),a.add(P),A.push(N)}a.add(p);let I=new Ta;I.setMeshoptDecoder(gd);let E=Object.keys(Cd),M={},L={},W=0,X=Object.keys(Wh).concat(Object.keys(Xh)),J=E.length+X.length;await Promise.all([...E.map(_=>new Promise((P,N)=>{I.load(Cd[_],V=>{if(_==="ship")m_(V.scene,6.6),V.scene.traverse(ie=>{if(!ie.isMesh||!ie.material)return;let Ie=Array.isArray(ie.material)?ie.material[0]:ie.material;ie.material=x_(Ie)});else if(_!=="buddy"){let ie={bumper:16736162,spinner:16765503,pad:6087167,platform:13208575,lava:16738858,chunk:16757082,roller:16747066,hopper:8052896,flyer:9221887,geyser:16765503,sweeper:16743121,pendulum:13219583}[_];b_(V.scene,ie)}M[_]=V,W++,n&&n(W/J),P()},void 0,N)})),...X.map(_=>new Promise((P,N)=>{I.load(Wh[_]||Xh[_],V=>{L[_]=V,W++,n&&n(W/J),P()},void 0,N)}))]),Rd(a,e,It,L);let K=new dt,Q=new Le;function he(_,P,N){let V=Pd(_.scene),ie=0;for(let Ge of V)ie=Math.max(ie,Ge.maxY);let Ie=[];for(let Ge of V){Ge.geom.translate(0,-ie,0);let at=/Crack|Glow/.test(Ge.name),U=at?new Tt({color:16742938,emissive:16742938,emissiveIntensity:.85,gradientMap:It}):new Tt({color:16777215,gradientMap:It}),z=new on(Ge.geom,U,P.length);z.instanceMatrix.setUsage($f);for(let te=0;te<P.length;te++){let Pe=P[te];if(K.position.set(Pe.x,Pe.y,Pe.z),K.rotation.set(0,0,0),K.scale.set(1,1,1),K.updateMatrix(),z.setMatrixAt(te,K.matrix),at)Q.set(16742938),z.setColorAt(te,Q);else{let Ze=Ge.maxY>ie-.25?Pe.topColor:Pe.sideColor;Q.set(N==="crack"&&Ge.maxY>ie-.25?Pe.topColor:Ze),z.setColorAt(te,Q)}}N==="crack"&&$(z,P.length),z.instanceMatrix.needsUpdate=!0,z.instanceColor&&(z.instanceColor.needsUpdate=!0),z.computeBoundingSphere(),a.add(z),Ie.push(z)}return Ie}function $(_,P){for(let N=0;N<P;N++)K.position.set(0,-80,0),K.scale.set(0,0,0),K.rotation.set(0,0,0),K.updateMatrix(),_.setMatrixAt(N,K.matrix)}let xe=Md(a,e,It),be=new nr({vertexColors:!0,side:Dt});be.onBeforeCompile=_=>{_.fragmentShader=_.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb = pow(max(diffuseColor.rgb, vec3(0.0)), vec3(0.84));`).replace("#include <opaque_fragment>",`float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.4);
outgoingLight += rim * vec3(1.0, 0.96, 0.88) * 0.18;
#include <opaque_fragment>`)};let Fe=new Tt({vertexColors:!0,color:16765104,emissive:16742938,emissiveIntensity:.28,gradientMap:It,side:Dt}),$e=[];for(let _ of e.chunks){if(_.gap||!_.positions){$e.push(null);continue}let P=new Ct;P.setAttribute("position",new wt(_.positions,3)),P.setAttribute("color",new wt(_.colors,3)),P.setIndex(new wt(_.indices,1)),P.computeVertexNormals();let N=new we(P,be);N.frustumCulled=!0,N.receiveShadow=!0,a.add(N),_.mesh=N,$e.push(N)}let ht={meadow:[.26,.52,.3],canyon:[.5,.16,.1],sky:[.42,.58,.75],ice:[.25,.55,.95],climb:[.58,.32,.14],ship:[.68,.5,.28]},ne=[],D=[],F=[],Y=[],ue=14,de=9;for(let _=0;_<=e.len;_+=ue){let P=e.stations[Math.min(e.stations.length-1,Math.round(_/2))],N=ht[P.zone]||ht.meadow,V=[];for(let ie=0;ie<de;ie++){let Ie=(ie/(de-1)*2-1)*32,Ge=(Math.abs(Ie)/12)**2;ne.push(P.x+Ie,P.y-8.2-Ge,P.z);let at=.86+Math.sin(P.z*.04+Ie*.2)*.08;D.push(N[0]*at,N[1]*at,N[2]*at),V.push(ne.length/3-1)}Y.push(V)}for(let _=0;_<Y.length-1;_++)for(let P=0;P<de-1;P++){let N=Y[_][P],V=Y[_][P+1],ie=Y[_+1][P],Ie=Y[_+1][P+1];F.push(N,ie,V,V,ie,Ie)}let De=new Ct;if(De.setAttribute("position",new wt(new Float32Array(ne),3)),De.setAttribute("color",new wt(new Float32Array(D),3)),De.setIndex(F),De.computeVertexNormals(),a.add(new we(De,be)),e.floors&&e.floors.length){let _=new on(new Sn(1,10),new pt({color:1975360,transparent:!0,opacity:.16,depthWrite:!1}),e.floors.length),P=new dt;e.floors.forEach((N,V)=>{P.position.set(N.x,N.y+.05,N.z),P.rotation.set(-Math.PI/2,0,0),P.scale.set(Math.max(.8,N.rx*.55),Math.max(.8,N.rz*.55),1),P.updateMatrix(),_.setMatrixAt(V,P.matrix)}),_.instanceMatrix.needsUpdate=!0,a.add(_)}let Ye=null,Te=null,je=new dt;if(e.coins&&e.coins.length){let _=new an(.32,.32,.08,12),P=new Tt({color:16765503,emissive:16765503,emissiveIntensity:.55,gradientMap:It});Ye=new on(_,P,e.coins.length);let N=new pt({color:16765503,transparent:!0,opacity:.35,depthWrite:!1,blending:zr});Te=new on(new Sn(.7,12),N,e.coins.length),e.coins.forEach((V,ie)=>{je.position.set(V.x,V.y,V.z),je.rotation.x=Math.PI/2,je.updateMatrix(),Ye.setMatrixAt(ie,je.matrix),Te.setMatrixAt(ie,je.matrix)}),a.add(Ye,Te)}let k=[];for(let _ of e.doors||[]){let P=_.solid?L.door:L.doorOpen;if(!P)continue;let N=zi(P,It,.4,!1);N.position.x=_.x,N.position.z=_.z,N.position.y+=_.y,_.solid&&N.traverse(V=>{V.isMesh&&V.material&&V.material.color&&V.material.color.set(12862778)}),a.add(N),k.push(N)}let le=new Tt({color:14826314,gradientMap:It}),ge=new Tt({color:16048836,gradientMap:It}),Re=new Tt({color:7306394,gradientMap:It});for(let _ of e.landmarks||[])if(_.kind!=="mushroom"){if(_.kind==="tower"){let P=new we(new an(1.3,2.4,11,8),Re);P.position.set(_.x,_.y+5.2,_.z);let N=new we(new Xn(2.6,2.4,8),le);N.position.set(_.x,_.y+11.6,_.z),a.add(P,N)}}for(let _ of e.islands||[]){let P=new we(new an(_.r,_.r*.7,.85,10),new Tt({color:_.zone==="canyon"?13720114:9425034,gradientMap:It}));P.position.set(_.x,_.y-.25,_.z),a.add(P)}let Ce=Pd(M.chunk.scene)[0].geom,rt=new nr({color:12166105}),Ne=[];for(let _=0;_<24;_++){let P=new we(Ce,rt);P.visible=!1,P.scale.setScalar(.85),a.add(P),Ne.push({mesh:P,active:!1,vy:0,life:0})}function C(_){let P=_.scene.clone(!0);return P.traverse(N=>{!N.isMesh||!N.material||(N.material=Array.isArray(N.material)?N.material.map(V=>V.clone()):N.material.clone())}),P}function w(_,P,N,V,ie=0,Ie=1){let Ge=_.scene.clone(!0);return Ge.position.set(P,N,V),Ge.rotation.y=ie,Ge.scale.setScalar(Ie),a.add(Ge),Ge}let q=e.bumpers.map(_=>w(M.bumper,_.x,_.y,_.z)),re=e.pads.map(_=>{if(_.zone==="meadow"&&L.button){let P=zi(L.button,It,.42,!1);return P.position.x=_.x,P.position.z=_.z,P.position.y+=_.y,a.add(P),P}return w(M.pad,_.x,_.y,_.z)});re.forEach(_=>{_.userData.base=_.scale.x||1});let ae=[];e.crater&&ae.push(w(M.lava,e.crater.x,e.crater.y,e.crater.z,0,e.crater.r/3));let se=e.spinners.map(_=>{if((_.zone==="meadow"||_.zone==="canyon")&&L.saw){let V=zi(L.saw,It,.34,!0);return V.position.set(_.x,_.y+.9,_.z),a.add(V),{obj:V,bar:V,meadow:!0}}let P=w(M.spinner,_.x,_.y,_.z);P.scale.setScalar((_.len||1.62)/1.62);let N=P.getObjectByName("Spinner_Bar");return{obj:P,bar:N}}),Oe=[];e.platforms.forEach((_,P)=>{let N;_.zone==="canyon"&&L.plank?(N=zi(L.plank,It,.24,!0),N.position.set(_.x,_.y,_.z),a.add(N)):N=w(M.platform,_.x,_.y,_.z,0,_.kind==="spin"?1.15:1.35),Oe[P]=N});let ce=M.ship.scene;ce.position.set(e.ship.x,e.ship.y,e.ship.z),ce.rotation.y=Math.PI,a.add(ce);let Me=[],tt=[],fe=new Ht().setFromObject(ce),Ue=fe.getSize(new O),Xe=fe.getCenter(new O);for(let _=1;_<=8;_++){let P=ce.getObjectByName("SeatSocket_"+_);if(!P){P=new dt;let ie=(_-1)%4,Ie=Math.floor((_-1)/4);P.position.set((ie-1.5)*.55,Ue.y*.46,(Ie-.5)*.42),ce.add(P)}Me.push(P);let N=ce.getObjectByName("Seat_"+_),V=[];N&&N.traverse(ie=>{if(!ie.isMesh)return;let Ge=(Array.isArray(ie.material)?ie.material:[ie.material]).filter(Boolean).map(at=>{let U=at.clone();return V.push({mat:U,color:U.color?U.color.clone():new Le(16777215),emissive:U.emissive?U.emissive.clone():new Le(0),intensity:U.emissiveIntensity||0}),U});ie.material=Array.isArray(ie.material)?Ge:Ge[0]}),tt.push(V)}let Ve=new we(new an(.55,1.3,34,10,1,!0),new pt({color:16765503,transparent:!0,opacity:.08,side:Dt,depthWrite:!1}));Ve.position.y=20,ce.add(Ve);let Ae=new we(new tr(3.1,3.7,28),new pt({color:16765503,side:Dt,transparent:!0,opacity:.9,depthWrite:!1}));Ae.rotation.x=-Math.PI/2,Ae.position.set(e.ship.x,e.ship.y+.08,e.ship.z-4.2),a.add(Ae);let Ke=new we(new Xn(.85,2.2,8),new pt({color:16765503}));Ke.rotation.x=Math.PI,Ke.position.y=.15,Ke.visible=!1;let et=Ke.clone();et.material=new pt({color:16739179}),et.scale.setScalar(.55),Ke.add(et),Ke.position.set(0,.15,-1.4),ce.add(Ke);let ut=new we(new Sn(26,28),new Zt({vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec2 vUv; void main(){ float d=length(vUv-0.5)*2.0; vec3 hot=vec3(1.0,0.46,0.08); vec3 crust=vec3(0.42,0.1,0.05); vec3 c=mix(hot, crust, smoothstep(0.28,0.82,d)); c*=0.85+0.15*sin(d*18.0); gl_FragColor=vec4(c,1.0); }"}));if(ut.rotation.x=-Math.PI/2,ut.position.set(0,t.lavaStartY,(e.lava.z0+e.lava.z1)/2),a.add(ut),e.crater){let _=new we(new Sn(e.crater.r*1.35,20),new pt({color:16757082,transparent:!0,opacity:.12,depthWrite:!1,blending:zr}));_.rotation.x=-Math.PI/2,_.scale.setScalar(.72),_.position.set(e.crater.x,e.crater.y+.2,e.crater.z),a.add(_)}let B=e.geysers.map(_=>{let P=C(M.geyser);return P.position.set(_.x,_.y,_.z),P.userData.jet=P.getObjectByName("GeyserJet"),P.userData.ring=P.getObjectByName("GeyserRing"),a.add(P),P}),_e=e.pendulums.map(_=>{let P;if(_.zone==="canyon"&&L.log&&L.rockLarge){P=new Nt;let V=zi(L.log,It,.48,!0);V.rotation.z=Math.PI/2;let ie=zi(L.rockLarge,It,.72,!0);ie.position.set(1.15,0,0),ie.traverse(Ie=>{Ie.isMesh&&Ie.material&&Ie.material.color&&Ie.material.color.set(2760740)}),P.add(V,ie)}else P=C(M.pendulum);let N=new we(new an(.07,.07,1,6),new Tt({color:1975360,gradientMap:It}));return a.add(P,N),{bob:P,rope:N}}),ee=e.sweepers.map(_=>{if((_.zone==="meadow"||_.zone==="canyon")&&L.saw){let ie=zi(L.saw,It,.3,!0);return ie.position.set(_.x,_.y+.85,_.z),a.add(ie),ie}let P=C(M.sweeper),N=_.scale||(_.full?1.15:1);P.scale.set(N,N,N);let V=P.getObjectByName("SweeperBar");return V&&V.material&&V.material.color&&V.material.color.set(_.full?16742938:16739179),a.add(P),P});function oe(_){let P=[];_.traverse(N=>{N.isMesh&&P.push(N)});for(let N of P){let V=new we(N.geometry,new pt({color:1975360,side:Vt}));V.scale.setScalar(1.08),N.add(V)}}let Se=new Tt({color:16765503,gradientMap:It}),ve=new Tt({color:16739179,gradientMap:It}),Je=e.rollers.map(_=>{let P=C(M.roller);P.scale.setScalar(_.radius),_.snow&&P.traverse(Ge=>{!Ge.isMesh||!Ge.material||!Ge.material.color||Ge.name==="RollerEye"||Ge.name==="RollerMouth"||Ge.material.color.set(16251903)});let N=new we(new Ri(1.2,.07,6,18),new pt({color:_.snow?14152959:16765503,transparent:!0,opacity:.85}));N.rotation.x=Math.PI/2,N.position.y=-.82,P.add(N),P.userData.ring=N;let V=new we(new Xn(.34,.42,7),Se);V.position.y=1.05;let ie=new we(new Mn(.08,.1,.06),new Tt({color:16774885,gradientMap:It}));ie.position.set(-.08,-.08,.95);let Ie=ie.clone();return Ie.position.x=.08,P.add(V,ie,Ie),oe(P),a.add(P),P}),Pt=e.hoppers.map(()=>{let _=C(M.hopper);_.userData.body=_.getObjectByName("HopperBody"),_.userData.eyes=_.getObjectByName("HopperEye");let P=new we(new Mn(.46,.16,.08),ve);P.position.set(0,.15,.62);let N=new we(new kt(.09,8,6),ve);N.position.set(.28,.02,.48);let V=N.clone();V.position.x=-.28;let ie=new we(new kt(.28,10,8),new Tt({color:16771266,gradientMap:It}));return ie.scale.set(1,.7,.45),ie.position.set(0,-.12,.42),_.add(P,N,V,ie),oe(_),a.add(_),_}),Ut=e.flyers.map(()=>{let _=C(M.flyer);_.userData.wing=_.getObjectByName("FlyerWings"),_.userData.eyes=_.getObjectByName("FlyerEye");let P=new we(new Ri(.16,.04,6,10),Se);P.position.set(.16,.12,.34);let N=P.clone();return N.position.x=-.16,_.add(P,N),oe(_),a.add(_),_});function yt(_){let N=[],V=[],ie=[],Ie=[];for(let U=0;U<6;U++){let z=U/6*Math.PI*2+_,te=.75+(U*3+_*5)%3*.28;Ie.push([Math.cos(z)*te,Math.sin(z)*te])}N.push(0,.18,0),V.push(.28,.16,.12),Ie.forEach(([U,z])=>{N.push(U,.18,z),V.push(1,.45,.08)}),N.push(0,-.18,0),V.push(.35,.18,.1),Ie.forEach(([U,z])=>{N.push(U*.92,-.22,z*.92),V.push(.85,.22,.04)});for(let U=0;U<6;U++){let z=1+U,te=1+(U+1)%6;ie.push(0,te,z);let Pe=8+U,Ze=8+(U+1)%6;ie.push(7,Pe,Ze),ie.push(z,te,Ze,z,Ze,Pe)}let Ge=6*2+2;N.push(.2,-.85,.15),V.push(1,.4,.05),N.push(.05,-.2,.05),V.push(1,.55,.08),N.push(.35,-.2,.22),V.push(1,.35,.04),ie.push(Ge,Ge+1,Ge+2);let at=new Ct;return at.setAttribute("position",new ct(N,3)),at.setAttribute("color",new ct(V,3)),at.setIndex(ie),at.computeVertexNormals(),at}let fn=[],Ln=new Tt({vertexColors:!0,emissive:16742938,emissiveIntensity:.35,gradientMap:It,side:Dt});for(let _=0;_<12;_++){let P=new we(yt(_*.7),Ln);P.scale.setScalar(2.6+_%3*.9),P.visible=!1,a.add(P);let N=_%2===0?-1:1;fn.push({mesh:P,ox:N*(7.5+_%5*2.6),oy:7+_%4*3.4,oz:-1-_%5*2.4,spin:.7+_%5*.22,fall:.18+_%3*.08})}let Hn=new Nt;for(let _=0;_<10;_++){let P=new we(new Mn(.05,.05,1.6),new pt({color:16774885,transparent:!0,opacity:.75}));P.position.set(_%5-2,.4+_%3*.35,-.4-_%4*.35),Hn.add(P)}Hn.visible=!1,a.add(Hn);let cs=[];for(let _=0;_<7;_++){let P=new we(new kt(2.2+_%3,8,6),new nr({color:16774885}));P.position.set(-18+_*9,16+_%2*3,e.zones[2].z0+20+_*18),P.scale.y=.45,P.userData.ox=P.position.x,P.userData.oz=P.position.z,a.add(P),cs.push(P)}let Yn=e.checkpoints.map(_=>{let P=new we(new tr(.7,.95,18),new pt({color:16765503,side:Dt,transparent:!0,opacity:.85,depthWrite:!1}));return P.rotation.x=-Math.PI/2,P.position.set(_.x,_.y+.08,_.z),a.add(P),P});function gn(_){return new Tt({color:_,gradientMap:It})}function $r(_){let P={},N=new Nt,V=new we(new an(.035,.035,.28,5),gn(16739179));V.position.y=1.62;let ie=new we(new Mn(.72,.045,.1),gn(16765503));ie.position.y=1.76,N.add(V,ie),N.userData.blade=ie,P.heli=N;let Ie=new Nt;for(let St of[-.18,.18]){let cn=new we(new Ri(.13,.04,6,10),gn(6044462));cn.position.set(St,1.18,.36),Ie.add(cn)}P.goggles=Ie;let Ge=new Nt;for(let St of[-.18,.18]){let cn=new we(new fa(.12,0),gn(1975360));cn.position.set(St,1.18,.4),cn.scale.z=.35,Ge.add(cn)}P.stars=Ge;let at=new Nt,U=new we(new kt(.16,8,6),gn(16748497));U.position.y=1.7,U.scale.y=.45;let z=new we(new kt(.07,6,6),gn(16765503));z.position.y=1.72,at.add(U,z),P.flower=at;let te=new we(new Ri(.28,.07,6,12),gn(6080767));te.position.y=.78,te.rotation.x=Math.PI/2,P.scarf=te;let Pe=new Nt,Ze=new we(new kt(.16,8,8),new Tt({color:10479871,transparent:!0,opacity:.75,gradientMap:It}));Ze.position.y=1.72;let bt=new we(new kt(.07,6,6),gn(16747130));bt.position.y=1.72,Pe.add(Ze,bt),P.fish=Pe;let qe=new we(new Xn(.16,.22,5),gn(16765503));qe.position.y=1.72,P.crown=qe;for(let St of Object.values(P))St.visible=!1,_.add(St);return P}let dr=M.buddy,dn=[],ls=new Nt;a.add(ls);let hs=new Sn(.48,14),eo=__();for(let _ of e.spawns.length?Array.from({length:t.racers}):[]);for(let _=0;_<t.racers;_++){let P=xd(dr.scene),N=["#5FE3B0","#FFD23F","#FF8FD1","#8C6BFF","#5CC8FF","#7FD88A","#C9B6E8","#FFC38A","#4C6FFF","#2EC4B6","#FF5FA2","#C6E05A","#9BB6FF","#F0B429","#FF8A7A","#7AD0FF"][_%16];P.traverse(qe=>{if(!qe.isMesh||!qe.material)return;let St=Array.isArray(qe.material)?qe.material[0]:qe.material;qe.material=g_(St,N),qe.frustumCulled=!1,qe.castShadow=!0,qe.receiveShadow=!0});let V=new _a(P),ie={},Ie=["Idle","Run","Jump","Fall","Land","Dive","Grab","Tumble","Celebrate","Eliminated","Emote"],Ge=new Set(["Idle","Run","Fall","Grab","Tumble","Celebrate"]);for(let qe of dr.animations){if(!Ie.includes(qe.name))continue;let St=V.clipAction(qe);Ge.has(qe.name)?St.setLoop(nh,1/0):(St.setLoop(th,1),St.clampWhenFinished=!0),St.play(),St.setEffectiveWeight(qe.name==="Idle"?1:0),ie[qe.name]=St}let at=Ie.some(qe=>ie[qe]),U=$r(P),z=["classic","heli","goggles","stars","flower","scarf","fish","crown"],te=z[_%z.length];U[te]&&(U[te].visible=!0);let Pe=new Nt;Pe.add(P);let Ze=new we(hs,new pt({color:1975360,transparent:!0,opacity:.28,depthWrite:!1}));Ze.rotation.x=-Math.PI/2,Pe.add(Ze);let bt=null;if(_===0){let qe=new we(new tr(.5,.68,18),new pt({color:16765503,side:Dt,depthWrite:!1}));qe.rotation.x=-Math.PI/2,qe.position.y=.05,Pe.add(qe),bt=new ia(new Br({map:eo,depthTest:!1,transparent:!0,opacity:1})),bt.scale.set(.34,.14,1),bt.position.set(.22,2.22,0),bt.center.set(.5,0),Pe.add(bt)}ls.add(Pe),Pe.traverse(qe=>{qe.isMesh&&(qe.castShadow=!0,qe.receiveShadow=!0)}),dn.push({group:Pe,model:P,mixer:V,actions:ie,hasClips:at,shadow:Ze,tag:bt,current:"Idle",docked:!1,accessories:U,pick:te,dusted:!1,starred:!1,mixAcc:0,wasAir:!1,landUntil:0})}let Bi=[],to=[16765503,16739179,6284208,16748497,6080767];for(let _=0;_<70;_++){let P=new we(new li(.16,.22),new pt({color:to[_%to.length],side:Dt}));P.visible=!1,a.add(P),Bi.push({mesh:P,v:new O,alive:!1})}let Lt={yaw:0,pitch:t.defaultPitch,autoWait:0,portrait:!0,shake:0};function pr(){let _=i.clientWidth||window.innerWidth,P=i.clientHeight||window.innerHeight;Lt.portrait=P>=_,s.setPixelRatio(r),s.setSize(_,P,!1),c.aspect=_/Math.max(1,P),c.fov=Lt.portrait?t.fovPortrait:t.fovLandscape,c.updateProjectionMatrix()}pr();let R=Array(8).fill(0);function H(_,P){let N=tt[_];if(P&&(R[_]=1),!!N)for(let V of N){if(!V.mat.color)return;P?(V.mat.color.set(P),V.mat.emissive&&(V.mat.emissive.set(P),V.mat.emissiveIntensity=.35)):(V.mat.color.copy(V.color),V.mat.emissive&&(V.mat.emissive.copy(V.emissive),V.mat.emissiveIntensity=V.intensity))}}function j(_,P,N,V){for(let ie of Bi)if(!ie.alive){ie.alive=!0,ie.mesh.visible=!0,ie.mesh.position.set(_,P,N),V&&ie.mesh.material.color.setHex(V),ie.v.set((Math.random()-.5)*4,2+Math.random()*3,(Math.random()-.5)*4);break}}let Z=!1;function G(_,P,N){if(_.crates&&ze.length!==_.crates.length){for(let U of ze)a.remove(U);ze.length=0;for(let U of _.crates){let z=new we(ke,Qe);z.position.set(U.x,U.y,U.z),a.add(z),ze.push(z)}}for(let U=0;U<ze.length;U++){let z=_.crates[U];ze[U].position.set(z.x,z.y,z.z)}for(let U of e.chunks){let z=U.mesh;if(!z)continue;if(U.state==="gone"){z.visible=!1,U.dirty=!1;continue}z.visible=!0,z.material=U.state==="cracking"?Fe:be;let te=U.state==="cracking"?Math.sin(_.time*18+U.jitter*9)*.045:0;if(z.position.y=(U.fallY||0)+te,U.state==="falling"&&U.dirty&&!U.spawned){U.spawned=!0;let Pe=Ne.find(Ze=>!Ze.active);if(Pe){Pe.active=!0,Pe.life=1.4,Pe.vy=.6,Pe.mesh.visible=!0;let Ze=(U.z0+U.z1)*.5;Pe.mesh.position.set((Math.random()-.5)*6,U.positions&&U.positions[1]||4,Ze),Pe.mesh.rotation.set(0,Math.random(),0),j(Pe.mesh.position.x,Pe.mesh.position.y,Ze,14140580),j(Pe.mesh.position.x+.4,Pe.mesh.position.y+.2,Ze,14140580)}}U.dirty=!1}for(let U of Ne)U.active&&(U.vy-=12*P,U.mesh.position.y+=U.vy*P,U.mesh.rotation.x+=P,U.life-=P,U.life<=0&&(U.active=!1,U.mesh.visible=!1));for(let U=0;U<_.spinners.length;U++){let z=se[U].bar;z&&(z.rotation.y=_.spinners[U].angle)}for(let U=0;U<_.platforms.length;U++){let z=_.platforms[U],te=Oe[U];if(te.position.set(z.x,z.y,z.z),z.axis==="spin")te.rotation.y+=P*z.speed;else if(z.axis==="seesaw"){let Pe=z.face||0;te.rotation.set(Math.abs(Pe)>1&&z.tilt||0,0,Math.abs(Pe)>1?0:-(z.tilt||0))}}if(Ye){for(let U=0;U<_.course.coins.length;U++){let z=_.course.coins[U];z.got?je.scale.set(0,0,0):(je.scale.set(1,1,1),je.position.set(z.x,z.y+Math.sin(_.time*3+U)*.15,z.z)),je.rotation.set(Math.PI/2,0,_.time*2.2),je.updateMatrix(),Ye.setMatrixAt(U,je.matrix),Te&&Te.setMatrixAt(U,je.matrix)}Ye.instanceMatrix.needsUpdate=!0,Te&&(Te.instanceMatrix.needsUpdate=!0)}for(let U=0;U<_.geysers.length;U++){let z=_.geysers[U],te=B[U],Pe=z.hot?3.1:z.warn?.85:.12,Ze=te.userData.jet;Ze.scale.set(z.hot?1.3:1,Pe,z.hot?1.3:1),Ze.position.y=Pe*.5,Ze.material.color.set(z.hot?16742938:16765503),te.userData.ring.material.color.set(z.warn||z.hot?16765503:16742938),te.userData.ring.scale.setScalar(z.warn?1.25:1)}for(let U=0;U<_.pendulums.length;U++){let z=_.pendulums[U],te=_e[U];te.bob.position.set(z.bobX,z.bobY,z.bobZ),te.rope.position.set((z.x+z.bobX)/2,(z.y+z.bobY)/2,z.z),te.rope.scale.y=z.len,te.rope.lookAt(z.bobX,z.bobY,z.bobZ)}for(let U=0;U<_.sweepers.length;U++){let z=_.sweepers[U],te=z.zone==="meadow"||z.zone==="canyon";ee[U].position.set(z.x,z.y+(te?.75:0),z.z),te&&(ee[U].rotation.z=_.time*2.4)}for(let U=0;U<_.rollers.length;U++){let z=_.rollers[U];Je[U].position.set(z.x,z.y,z.z),Je[U].rotation.z=z.rot;let te=Je[U].userData.ring;te&&te.scale.setScalar(1+Math.sin(_.time*7+U)*.14);let Pe=!1;for(let qe of _.racers){if(qe.flail<.2)continue;let St=qe.pos.x-z.x,cn=qe.pos.z-z.z;St*St+cn*cn<5&&(Pe=!0)}let Ze=Pe?.78:1,bt=1+Math.sin(_.time*2.2+U)*.04;Je[U].scale.set(z.radius*(Pe?1.15:bt),z.radius*Ze,z.radius)}for(let U=0;U<_.hoppers.length;U++){let z=_.hoppers[U];Pt[U].position.set(z.x,z.y+.55,z.z);let te=Pt[U].userData.body;te&&(te.scale.y=z.hopping?1.18:.62+Math.sin(_.time*3+U)*.04,te.scale.x=z.hopping?.86:1.12);let Pe=Pt[U].userData.eyes;Pe&&(Pe.scale.y=Math.sin(_.time*2.4+U*2)>.96?.12:1)}for(let U=0;U<_.flyers.length;U++){let z=_.flyers[U];Ut[U].position.set(z.x,z.y,z.z),Ut[U].rotation.y=-z.ang;let te=Ut[U].userData.wing;te&&(te.rotation.z=Math.sin(_.time*14+U)*.55),Ut[U].scale.y=1+Math.sin(_.time*14+U)*.08;let Pe=Ut[U].userData.eyes;Pe&&(Pe.scale.y=Math.sin(_.time*3+U)>.97?.15:1)}ut.position.y=_.lavaY;let V=.85+Math.sin(_.time*3)*.15;ut.material.color&&ut.material.color.setRGB(1*V,.35*V,.08),ut.material.uniforms&&ut.material.uniforms.pulse&&(ut.material.uniforms.pulse.value=V),ce.position.y=_.shipY;let ie=_.phase!=="countdown";if(Ve.material.opacity=ie?.16+Math.sin(_.time*4)*.05:.04,Ke.visible=_.phase==="launch"||_.phase==="results",Ke.visible){let U=.85+Math.sin(_.launchT*30)*.12;Ke.scale.set(U,U,U)}Ae.material.opacity=_.phase==="race"?.55+Math.sin(_.time*5)*.25:.2;for(let U=0;U<_.racers.length;U++){let z=_.racers[U],te=dn[U],Pe=U===0?0:Math.hypot(z.pos.x-_.player.pos.x,z.pos.z-_.player.pos.z);te.mixAcc+=P;let Ze=Pe<16?0:Pe<36?.1:.2;if(te.mixAcc>=Ze&&(te.mixer.update(te.mixAcc),te.mixAcc=0),z.seated){!te.docked&&Me[z.seatIndex]&&(Me[z.seatIndex].add(te.group),te.group.position.set(0,.05,0),te.group.rotation.set(0,Math.PI,0),te.group.scale.setScalar(t.seatBuddyScale),te.shadow.visible=!1,te.docked=!0,H(z.seatIndex,z.color)),pe(te,"Celebrate",1);continue}te.group.position.set(z.pos.x,z.pos.y,z.pos.z),te.face==null&&(te.face=z.yaw);let bt=z.yaw-te.face;for(;bt>Math.PI;)bt-=Math.PI*2;for(;bt<-Math.PI;)bt+=Math.PI*2;te.face+=bt*Math.min(1,P*10),te.group.rotation.y=te.face;let qe=Math.min(1,z.squash||0);if(te.group.scale.set(1+qe*.035,1-qe*.07,1+qe*.035),z.squash>.32&&!te.dusted){te.dusted=!0;for(let Gn=0;Gn<3;Gn++)j(z.pos.x+(Gn-1)*.2,z.pos.y+.1,z.pos.z,14140580)}z.squash<.05&&(te.dusted=!1);let St=Math.hypot(z.vel.x,z.vel.z);if(z.grounded&&St>.8&&U===0&&(te.stepT=(te.stepT||0)-P,te.stepT<=0&&(te.stepT=.28,j(z.pos.x,z.pos.y+.08,z.pos.z,14140580))),z.flail>.4&&!te.starred){te.starred=!0;for(let Gn=0;Gn<5;Gn++)j(z.pos.x,z.pos.y+1.55,z.pos.z,16774856)}if(z.flail<.05&&(te.starred=!1),z.sliding>0&&U===0&&j(z.pos.x,z.pos.y+.15,z.pos.z),te.tag){let mr=_.phase==="countdown"?1:Math.max(0,te.tag.material.opacity-P*1.6);te.tag.material.opacity=mr,te.tag.visible=mr>.04}U===0&&(Hn.visible=!!(z.diving||z.sliding>0),Hn.visible&&(Hn.position.set(z.pos.x,z.pos.y+.9,z.pos.z),Hn.rotation.y=z.yaw));let cn=te.accessories&&te.accessories.heli&&te.accessories.heli.userData.blade;cn&&te.accessories.heli.visible&&(cn.rotation.y+=P*14),te.wasAir&&z.grounded&&(te.landUntil=(_.time||0)+.2),te.wasAir=!z.grounded;let pn="Idle";z.eliminated?pn="Eliminated":z.seated||z.qualified||z.emote==="cheer"?pn="Celebrate":z.flail>.2?pn="Tumble":z.grabT>0?pn="Grab":z.diving||z.sliding>0?pn="Dive":z.grounded&&(_.time||0)<te.landUntil?pn="Land":!z.grounded&&z.vel.y>.35?pn="Jump":z.grounded?_.phase==="countdown"&&U!==0?pn="Emote":St>.8&&(pn="Run"):pn="Fall",pe(te,pn,St/6.5),te.shadow&&(te.shadow.visible=z.grounded,te.shadow.position.y=.04)}if((_.popConfetti||_.phase==="results"&&_.result==="escaped")&&!Z){Z=!0,_.popConfetti=0;let U=dn[0].group,z=new O;U.getWorldPosition(z);for(let te=0;te<48;te++)j(ce.position.x+(Math.random()-.5)*3,ce.position.y+2+Math.random()*3,ce.position.z-2)}for(let U of Bi)U.alive&&(U.v.y-=6*P,U.mesh.position.addScaledVector(U.v,P),U.mesh.rotation.z+=P*4,U.mesh.position.y<e.ship.y-1&&(U.alive=!1,U.mesh.visible=!1));let Ie=_.phase==="launch"||_.phase==="results";for(let U of fn)U.mesh.visible=Ie,Ie&&(U.mesh.position.set(e.ship.x+U.ox,e.ship.y+U.oy-_.launchT*U.fall*1.6,e.ship.z+U.oz),U.mesh.rotation.x=-.7,U.mesh.rotation.y=_.launchT*U.spin);Ve.visible=_.phase!=="launch"&&_.phase!=="results"&&_.seatCine<=0,xe.update(_,P),Td(_.time||0);for(let U=0;U<cs.length;U++){let z=cs[U];z.position.x=z.userData.ox+Math.sin(_.time*.15+U)*6,z.position.z=z.userData.oz+_.time*(1.2+U*.15)}for(let U=0;U<k.length;U++){let z=k[U],te=z.position.z-_.player.pos.z;z.rotation.z=te>0&&te<9?Math.sin(_.time*26)*.045:0}for(let U=0;U<re.length;U++){let z=e.pads[U],te=z&&z.pulse?z.pulse:0,Pe=re[U].userData.base||1;re[U].scale.set(Pe*(1+te*.28),Pe*(1-te*.42),Pe*(1+te*.28)),z&&z.pulse>0&&(z.pulse=Math.max(0,z.pulse-P*1.5))}for(let U=0;U<R.length;U++){if(R[U]<=0)continue;R[U]=Math.max(0,R[U]-P*1.4);let z=tt[U];if(z)for(let te of z)te.mat.emissive&&(te.mat.emissiveIntensity=.35+R[U]*1.4)}let Ge=_d(_.zoneId||"meadow");f.material.uniforms.top.value.setHex(Ge.top),f.material.uniforms.mid.value.setHex(Ge.mid),Ge.bot&&f.material.uniforms.bot.value.setHex(Ge.bot),a.fog.color.setHex(Ge.fog),a.fog.near=Ge.near,a.fog.far=Ge.far,h.position.set(_.player.pos.x-10,_.player.pos.y+18,_.player.pos.z+6),h.target.position.set(_.player.pos.x,_.player.pos.y+1,_.player.pos.z),h.target.updateMatrixWorld();for(let U=0;U<_.racers.length;U++){let z=Math.hypot(_.racers[U].pos.x-_.player.pos.x,_.racers[U].pos.z-_.player.pos.z)<14;dn[U].group.traverse(te=>{te.isMesh&&(te.castShadow=z)})}nt(_,P,N),f.position.copy(c.position),p.position.copy(c.position),d.rotation.y=(_.time||0)*.08;let at=_.zoneId==="canyon"||_.zoneId==="climb";m.material.opacity=at?.35+Math.sin((_.time||0)*5)*.2:.08;for(let U=0;U<y.length;U++)y[U].position.x+=Math.sin((_.time||0)*.2+U)*.03;for(let U=0;U<A.length;U++)A[U].rotation.y=Math.sin((_.time||0)*2.2+U)*.45;for(let U=0;U<S.length;U++)S[U].position.x+=Math.sin((_.time||0)*.3+U)*.02;for(let U of Yn)U.rotation.z=_.time*.4}function pe(_,P,N){if(!_.hasClips)return;let V=_.actions[P]?P:_.actions.Idle?"Idle":"",ie=V&&_.actions[V];if(!ie||(V==="Run"&&ie.setEffectiveTimeScale(Math.max(.65,Math.min(1.65,(N||1)*1.15))),_.current===V))return;let Ie=_.current&&_.actions[_.current];Ie&&Ie!==ie&&Ie.fadeOut(.16),ie.reset().setEffectiveWeight(1).fadeIn(.16).play(),_.current=V}function Ee(_,P){let N=jn(e,_,P);return N?N.y:null}let ze=[],ke=new Mn(.9,.9,.9),Qe=new Tt({color:14722140,gradientMap:It});function nt(_,P,N){let V=_.player;if(N&&N.overview){let mt=N.overview;c.position.set(mt.x,mt.y,mt.z),c.lookAt(mt.lx,mt.ly,mt.lz);return}let ie=!!(N&&(N.looking||Math.abs(N.lookDx)+Math.abs(N.lookDy)>0)),Ie=Lt.portrait?t.fovPortrait:t.fovLandscape,Ge=_.player&&(_.player.diving||_.player.boost>0)?7:0,at=Ie+Ge;if(Math.abs(c.fov-at)>.15&&(c.fov+=(at-c.fov)*Math.min(1,P*7),c.updateProjectionMatrix()),_.phase==="countdown"){let mt=t.countdownBeats+t.goHold,Jt=Math.max(0,Math.min(1,(_.countClock||0)/mt)),xn=Jt*Jt*(3-2*Jt),gi=_.finishZ?Math.min(40,Math.max(10,(_.finishZ-V.pos.z)*.35)):28;c.position.set(V.pos.x+12-xn*8,V.pos.y+16-xn*8,V.pos.z-18+xn*10),c.lookAt(V.pos.x,V.pos.y+1.2,V.pos.z+8+gi*xn);return}if(N&&N.intro>0){let mt=1-Math.max(0,Math.min(1,N.intro/3.3)),Jt=mt*mt*(3-2*mt),xn=Lt.portrait?t.camDistPortrait:t.camDist,gi=xn*Math.cos(t.defaultPitch),gr=xn*Math.sin(t.defaultPitch),xr=(1-Jt)*(V.pos.x+8)+Jt*(V.pos.x+Math.sin(Lt.yaw)*gi),ja=(1-Jt)*(V.pos.y+22)+Jt*(V.pos.y+gr+.4),ap=(1-Jt)*(V.pos.z-26)+Jt*(V.pos.z-gi);c.position.set(xr,ja,ap),c.lookAt(V.pos.x,V.pos.y+1,V.pos.z+18*(1-Jt));return}if(_.seatCine>0&&_.player.seated){let mt=new O;dn[0].group.getWorldPosition(mt),c.position.x=wn(c.position.x,ce.position.x+6.5,4.2,P),c.position.y=wn(c.position.y,ce.position.y+4.2,4.2,P),c.position.z=wn(c.position.z,ce.position.z-22,4.2,P),c.lookAt(mt.x,mt.y+.45,mt.z);return}if(_.phase==="results"||_.phase==="launch"){let mt,Jt,xn,gi,gr,xr;if(_.result==="escaped")mt=ce.position.x+2,Jt=ce.position.y+8,xn=ce.position.z+22,gi=ce.position.x,gr=ce.position.y+1.5,xr=ce.position.z-18;else{mt=V.pos.x-6,Jt=V.pos.y+4.2,xn=V.pos.z-8;let ja=Math.max(0,ce.position.z-V.pos.z);gi=ce.position.x,gr=ce.position.y+3+Math.min(8,ja*.02),xr=ce.position.z-6}c.position.x=wn(c.position.x,mt,3.2,P),c.position.y=wn(c.position.y,Jt,3.2,P),c.position.z=wn(c.position.z,xn,3.2,P),c.lookAt(gi,gr,xr);return}if(V.seated){let mt=e.ship.x+2,Jt=_.shipY+8,xn=e.ship.z+22;c.position.x=wn(c.position.x,mt,3,P),c.position.y=wn(c.position.y,Jt,3,P),c.position.z=wn(c.position.z,xn,3,P),c.lookAt(e.ship.x,_.shipY+2.2,e.ship.z-36);return}if(ie){let mt=N.mouse?t.mouseSens:t.lookSens;Lt.yaw+=N.lookDx*mt,Lt.pitch=Math.max(t.minPitch,Math.min(t.maxPitch,Lt.pitch+N.lookDy*mt)),Lt.autoWait=t.autoFollowDelay}else Lt.autoWait>0?Lt.autoWait-=P:(Math.hypot(V.vel.x,V.vel.z)>1.15&&(Lt.yaw=y_(Lt.yaw,Math.atan2(V.vel.x,V.vel.z),t.autoYaw,P)),Lt.pitch=wn(Lt.pitch,t.defaultPitch,t.autoPitch,P));let U=Math.max(Lt.portrait?t.camDistPortrait:t.camDist,6.4),z=U*Math.cos(Lt.pitch),te=U*Math.sin(Lt.pitch);z<4&&(z=4),te<2&&(te=2);let Pe=V.pos.x+Math.sin(Lt.yaw)*z,Ze=V.pos.y+te,bt=V.pos.z-Math.cos(Lt.yaw)*z,qe=Ee(Pe,bt);qe!=null&&Ze<qe+1.2&&(Ze=qe+1.6);let St=V.pos.x,cn=V.pos.y+1.2,pn=V.pos.z,Gn=Pe-St,mr=Ze-cn,ou=bt-pn,au=Math.hypot(Gn,mr,ou)||1;if(au<2.5){let mt=2.5/au;Pe=St+Gn*mt,Ze=cn+mr*mt,bt=pn+ou*mt}let cu=_.phase==="countdown"?1:0;Ze+=cu*2.2,bt-=cu*2.4;let qa=(_.shake||0)*.18;qa>.01&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(Pe+=(Math.random()-.5)*qa,Ze+=(Math.random()-.5)*qa*.5);let Ya=5.5;c.position.x=wn(c.position.x,Pe,Ya,P),c.position.y=wn(c.position.y,Ze,Ya,P),c.position.z=wn(c.position.z,bt,Ya,P);let lu=c.position.x-V.pos.x,hu=c.position.y-(V.pos.y+1.2),uu=c.position.z-V.pos.z,fu=Math.hypot(lu,hu,uu)||1;if(fu<2.5){let mt=2.5/fu;c.position.x=V.pos.x+lu*mt,c.position.y=V.pos.y+1.2+hu*mt,c.position.z=V.pos.z+uu*mt}c.lookAt(V.pos.x,V.pos.y+1.15,V.pos.z+Math.cos(Lt.yaw)*1.4),Be(Math.hypot(c.position.x-V.pos.x,c.position.y-(V.pos.y+1.1),c.position.z-V.pos.z))}function Be(_){let P=dn[0];if(!P)return;let N=_>=3.4?1:Math.max(.15,(_-2.2)/1.2);P.model.traverse(V=>{if(!V.isMesh||!V.material||V.material.name!=="BuddyHue")return;let ie=Array.isArray(V.material)?V.material:[V.material];for(let Ie of ie)Ie.opacity=N,Ie.transparent=N<.98,Ie.depthWrite=N>.45})}function gt(){Z=!1;for(let _ of e.chunks)_.spawned=!1,_.dirty=!0,_.fallY=0,_.mesh&&(_.mesh.visible=!_.gap,_.mesh.position.y=0,_.mesh.material=be);for(let _ of Ne)_.active=!1,_.mesh.visible=!1;for(let _ of Bi)_.alive=!1,_.mesh.visible=!1;for(let _=0;_<dn.length;_++){let P=dn[_];P.docked&&(ls.add(P.group),P.group.scale.setScalar(1),P.group.rotation.set(0,0,0),P.shadow.visible=!0,P.docked=!1)}for(let _=0;_<tt.length;_++)H(_,null);ce.position.y=e.ship.y,Ke.visible=!1,Lt.yaw=0,Lt.pitch=t.defaultPitch}function Mt(){s.render(a,c)}c.position.set(0,8,-10),c.lookAt(0,1,4),s.render(a,c);function At(_,P){let N=dn[0];if(N){N.model.traverse(V=>{if(!V.isMesh||!V.material)return;let ie=Array.isArray(V.material)?V.material:[V.material];for(let Ie of ie)Ie&&(Ie.userData&&Ie.userData.shader&&Ie.userData.shader.uniforms.uTint&&Ie.userData.shader.uniforms.uTint.value.set(_),Ie.name==="Buddy_Mint"&&Ie.color&&Ie.color.set(_))});for(let V of Object.keys(N.accessories||{}))N.accessories[V].visible=V===P}}return{resize:pr,update:G,reset:gt,render:Mt,applyLook:At,setTheme(_){let P=[{sky:13103359,ground:8244322,sun:16774084},{sky:16761505,ground:12868146,sun:16769200},{sky:12048127,ground:6987992,sun:16054271}],N=P[(Math.max(1,_)-1)%P.length];l.color.set(N.sky),l.groundColor.set(N.ground),h.color.set(N.sun)},setDpr(_){r=_,pr()},get yaw(){return Lt.yaw},get canvas(){return i}}}function __(){let i=document.createElement("canvas");i.width=128,i.height=64;let e=i.getContext("2d");e.fillStyle="#FFF6E5",v_(e,4,8,120,48,16),e.fill(),e.fillStyle="#1E2440",e.font="700 32px Fredoka, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("YOU",64,34);let t=new er(i);return t.colorSpace=zt,t}function v_(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}var zd={ui_tap:"assets/audio/ui_tap.mp3",ui_confirm:"assets/audio/ui_confirm.mp3",jump:"assets/audio/sfx_jump.mp3",land:"assets/audio/sfx_land.mp3",bump:"assets/audio/sfx_bump_boing.mp3",tick:"assets/audio/sfx_countdown_tick.mp3",go:"assets/audio/sfx_countdown_go.mp3",crack:"assets/audio/sfx_ground_crack.mp3",seat:"assets/audio/sfx_seat_filled.mp3",last:"assets/audio/sfx_last_seat_alert.mp3",launch:"assets/audio/sfx_ship_launch.mp3",escaped:"assets/audio/jingle_escaped.mp3",missed:"assets/audio/jingle_missed.mp3",bed:"assets/audio/amb_planet_bed_loop.mp3",rumble:"assets/audio/amb_collapse_rumble_loop.mp3"};function Nd(){let i=window.AudioContext||window.webkitAudioContext,e=i?new i({latencyHint:"interactive"}):null,t={},n={},s,r,o,a,c,l=!1,h=0,u=!1;e&&(s=e.createGain(),s.gain.value=1,s.connect(e.destination),r=e.createGain(),r.gain.value=0,r.connect(s),o=e.createGain(),o.gain.value=0,o.connect(s));async function f(T){if(!e)return;let S=Object.keys(zd),A=0;await Promise.all(S.map(async I=>{let M=await(await fetch(zd[I])).arrayBuffer();t[I]=await e.decodeAudioData(M.slice(0)),A++,T&&T(A/S.length)})),l&&x(h)}function p(){if(!e)return;e.state==="suspended"&&e.resume();let T=e.createBuffer(1,1,22050),S=e.createBufferSource();S.buffer=T,S.connect(e.destination),S.start(0),l&&x(h)}function g(){let I=e.createBuffer(1,88200,44100),E=I.getChannelData(0),M=[0,.5,1,1.5],L=[55,55,73,65];for(let W=0;W<88200;W++){let X=W/44100,J=Math.floor(X*2),K=0;for(let he of M){let $=X-he;$>=0&&$<.12&&(K+=Math.sin($*180)*Math.exp(-$*28)*.7)}let Q=L[J%L.length];if(K+=Math.sin(X*Q*Math.PI*2)*.18*(.6+.4*Math.sin(X*8)),J%2===0){let he=X*8%1;K+=(Math.random()*2-1)*Math.exp(-he*40)*.08}E[W]=Math.max(-1,Math.min(1,K))}return I}function x(T){return e?(l=!0,h=T,e.state==="suspended"&&e.resume(),a||(a=e.createBufferSource(),a.buffer=g(),a.loop=!0,a.connect(r),a.start(0),r.gain.setTargetAtTime(T*1.35,e.currentTime,.4),t.rumble&&!c&&(c=e.createBufferSource(),c.buffer=t.rumble,c.loop=!0,c.connect(o),c.start(0))),!0):!1}function m(T){!o||!e||o.gain.setTargetAtTime(Math.max(0,Math.min(.5,T)),e.currentTime,.2)}function d(T){if(!e||!s)return;(T==="win"?[523,659,784,1046]:[440,349,262]).forEach((A,I)=>{let E=e.createOscillator(),M=e.createGain();E.type=T==="win"?"triangle":"sawtooth",E.frequency.value=A;let L=e.currentTime+I*.09;M.gain.setValueAtTime(1e-4,L),M.gain.exponentialRampToValueAtTime(T==="win"?.07:.05,L+.03),M.gain.exponentialRampToValueAtTime(1e-4,L+.32),E.connect(M),M.connect(s),E.start(L),E.stop(L+.34)})}function b(T){u=!!T,s&&s.gain.setTargetAtTime(u?0:1,e.currentTime,.05)}function v(T){if(!a)return;let S={meadow:1,canyon:.9,sky:1.08,ice:.84,climb:1.02,ship:1.12}[T]||1;a.playbackRate.value=S}function y(T,S=.5,A=.07){if(r&&e&&!u&&(r.gain.cancelScheduledValues(e.currentTime),r.gain.setTargetAtTime(h*.28,e.currentTime,.02),r.gain.setTargetAtTime(h*1.35,e.currentTime+.35,.18)),!e||!t[T]||u)return;let I=e.currentTime;if(n[T]&&I-n[T]<A)return;n[T]=I;let E=e.createBufferSource(),M=e.createGain();M.gain.value=S,E.buffer=t[T],E.connect(M),M.connect(s),E.start(0)}return{load:f,unlock:p,startBeds:x,setRumble:m,setMuted:b,setZone:v,play:y,flourish:d,get ctx(){return e},get muted(){return u},get playing(){return!!a}}}function Fd(i){let e=document.getElementById("stick"),t=document.getElementById("knob"),n=new Set,s=new Map,r=0,o=0,a=!1,c=!1,l=!1,h=!1,u=0,f=0,p=!1,g=54;function x(T){let S=T.target;if(S.closest&&S.closest("#jump"))return"jump";if(S.closest&&S.closest("#dive"))return"dive";if(S.closest&&S.closest("#grab"))return"grab";if(S.closest&&S.closest("#pause, #mute")||S.closest&&S.closest("button, a"))return"ui";let A=window.innerWidth||1;return T.pointerType==="mouse"?"look":T.clientX<A*.46?"move":"look"}function m(T){if(T.target.closest&&T.target.closest("#title, #result"))return;let S=x(T);if(S!=="ui"){T.preventDefault();try{i.setPointerCapture?.(T.pointerId)}catch{}s.set(T.pointerId,{kind:S,x:T.clientX,y:T.clientY,ox:T.clientX,oy:T.clientY}),S==="jump"&&(a=!0,h=!0),S==="dive"&&(c=!0),S==="grab"&&(l=!0),S==="move"&&(e.style.left=T.clientX+"px",e.style.top=T.clientY+"px",e.style.bottom="auto",e.classList.add("float"),v(T.clientX,T.clientY,T.clientX,T.clientY))}}function d(T){let S=s.get(T.pointerId);S&&(T.preventDefault(),S.kind==="look"&&(r+=T.clientX-S.x,o+=T.clientY-S.y,p=!0),S.kind==="move"&&v(S.ox,S.oy,T.clientX,T.clientY),S.x=T.clientX,S.y=T.clientY)}function b(T){let S=s.get(T.pointerId);s.delete(T.pointerId),S&&S.kind==="move"&&([...s.values()].some(I=>I.kind==="move")||(u=0,f=0,t.style.transform="translate(-50%, -50%)",e.classList.remove("float"))),S&&S.kind==="look"&&![...s.values()].some(A=>A.kind==="look")&&(p=!1),S&&S.kind==="jump"&&![...s.values()].some(A=>A.kind==="jump")&&(h=!1)}function v(T,S,A,I){let E=A-T,M=I-S,L=Math.hypot(E,M)||1,W=Math.min(L,g);E=E/L*W,M=M/L*W,u=E/g,f=-M/g,t.style.transform=`translate(calc(-50% + ${E}px), calc(-50% + ${M}px))`}i.addEventListener("pointerdown",m),i.addEventListener("pointermove",d),i.addEventListener("pointerup",b),i.addEventListener("pointercancel",b),window.addEventListener("keydown",T=>{({KeyW:1,KeyA:1,KeyS:1,KeyD:1,ArrowUp:1,ArrowDown:1,ArrowLeft:1,ArrowRight:1,Space:1,ShiftLeft:1,ShiftRight:1,KeyE:1,Escape:1})[T.code]&&T.preventDefault(),!T.repeat&&(n.add(T.code),T.code==="Space"&&(a=!0,h=!0),(T.code==="ShiftLeft"||T.code==="ShiftRight")&&(c=!0),T.code==="KeyE"&&(l=!0))}),window.addEventListener("keyup",T=>{n.delete(T.code),T.code==="Space"&&(h=!1)}),window.addEventListener("blur",()=>n.clear());function y(){let T=0,S=0;(n.has("KeyA")||n.has("ArrowLeft"))&&(T-=1),(n.has("KeyD")||n.has("ArrowRight"))&&(T+=1),(n.has("KeyW")||n.has("ArrowUp"))&&(S+=1),(n.has("KeyS")||n.has("ArrowDown"))&&(S-=1);let A=u+T,I=f+S,E=Math.hypot(A,I);E>1&&(A/=E,I/=E);let M=(s.size&&[...s.values()].some(W=>W.kind==="look"&&s.values()),1),L={stickX:A,stickY:I,lookDx:r*(n.size?1:M),lookDy:o,looking:p,mouse:[...s.values()].some(W=>W.kind==="look"),jump:a,holdJump:h||n.has("Space"),dive:c,grab:l,pause:n.has("Escape")};return r=0,o=0,a=!1,c=!1,l=!1,L}return{read:y}}function Od(i,e,t){let n=-Math.sin(i),s=Math.cos(i),r=-Math.cos(i),o=-Math.sin(i);return{x:r*e+n*t,z:o*e+s*t}}var Zr=new URLSearchParams(location.search),$t=du({quick:Zr.has("quick"),auto:Zr.has("auto"),seed:Number(Zr.get("seed"))||Date.now()%1e5}),M_=document.getElementById("app"),S_=document.getElementById("view"),Qr=document.getElementById("title"),os=document.getElementById("play"),Zd=document.getElementById("lobby"),E_=document.getElementById("start"),kd=document.getElementById("colors"),Bd=document.getElementById("gear"),Fa=document.getElementById("tutor"),Hd=document.getElementById("place"),qh=document.getElementById("coins"),Ba=document.getElementById("hud"),Oi=document.getElementById("controls"),Kd=document.getElementById("countdown"),cr=document.getElementById("count-num"),w_=document.getElementById("count-label"),Yh=document.getElementById("timer"),T_=document.getElementById("progress"),eu=document.getElementById("seats"),Gd=document.getElementById("seats-label"),Jd=document.getElementById("last-banner"),Qh=document.getElementById("zone"),$h=document.getElementById("toast"),qn=document.getElementById("result"),A_=document.getElementById("result-kicker"),Ra=document.getElementById("result-title"),Ca=document.getElementById("result-sub"),R_=document.getElementById("result-time"),La=document.getElementById("again"),C_=document.getElementById("menu"),Qd=document.getElementById("next-round"),$d=document.getElementById("next-planet"),tu=document.getElementById("pause"),Oa=document.getElementById("mute"),Ha=document.getElementById("pause-menu"),Vd=document.getElementById("round-name"),I_=document.getElementById("round-kicker"),P_=document.getElementById("round-title"),L_=document.getElementById("round-sub"),nu=document.getElementById("planet"),D_=document.getElementById("planet-sub"),jh=document.getElementById("fade"),ep="space-buddies-career",Fi={planets:0,coins:0,best:""};try{Fi=Object.assign(Fi,JSON.parse(localStorage.getItem(ep)||"{}"))}catch{}function U_(){try{localStorage.setItem(ep,JSON.stringify(Fi))}catch{}}var Bn=1,fr=0,lr=null,as=!1,Wd=!1,Zh=0,Xd=[[{name:"ROUND 1",sub:"12 QUALIFY",qualify:12,startZ:22,finishZ:148,gate:{x:0,z:148,rx:12,rz:8,y:.25}},{name:"ROUND 2",sub:"8 QUALIFY",qualify:8,startZ:156,finishZ:232,gate:{x:0,z:232,rx:12,rz:8,y:5.2}},{name:"FINAL",sub:"8 SEATS ON THE SHIP",qualify:8,startZ:22,ship:!0}],[{name:"SKY HEAT",sub:"12 QUALIFY",qualify:12,startZ:176,finishZ:250,gate:{x:0,z:250,rx:14,rz:8,y:3.3}},{name:"THE CLIMB",sub:"8 QUALIFY",qualify:8,startZ:300,finishZ:350,gate:{x:0,z:350,rx:10,rz:8,y:8}},{name:"FINAL",sub:"8 SEATS ON THE SHIP",qualify:8,startZ:250,ship:!0}]];function iu(){return Xd[(Bn-1)%Xd.length][fr]}var z_=document.getElementById("danger"),He=Nd(),N_=Zr.get("debug")==="1";function rs(i){let e=i&&i.stack||i&&i.message||String(i);if(console.error(i),!N_)return;let t=document.getElementById("debug-error");t&&(t.hidden=!1,t.textContent=String(e).slice(0,700))}window.addEventListener("error",i=>rs(i.error||i.message));window.addEventListener("unhandledrejection",i=>rs(i.reason));window.__sbAudio=()=>({state:He.ctx&&He.ctx.state,bed:He.playing});var F_=Fd(M_);var Kr,me,Ot,Ga=!1,hr=!1,Va=!1,Da=0,jr=0,Ua=0,Ni={x:0,z:0},qd=!1,tp=["classic","heli","goggles","stars","flower","scarf","fish","crown"],O_=["Classic","Sunny","Goggles","Stars","Flower","Scarf","Fish","Crown"],ki=us[0],ur="classic",np="space-buddies-look";try{let i=JSON.parse(localStorage.getItem(np)||"{}");i.color&&(ki=i.color),i.gear&&tp.includes(i.gear)&&(ur=i.gear)}catch{}function su(){try{localStorage.setItem(np,JSON.stringify({color:ki,gear:ur}))}catch{}}var za=0,ka=0,Kh=0;var Na=0,Ia=1/60,Pa=0,Jh=0;for(let i=0;i<8;i++){let e=document.createElement("i");e.className="seat",eu.appendChild(e)}function k_(){return Kr=gu($t),me=Ka(Kr,$t,$t.seed),$t.auto&&(me.player.useAI=!0),Ud(S_,Kr,$t,()=>{})}var B_=k_().then(i=>{Ot=i,Ot.resize()}),H_=He.load();Promise.all([B_,H_]).then(()=>{Ga=!0,os.textContent="TAP TO PLAY",os.disabled=!1,Va&&Wa()}).catch(i=>{console.error(i),os.textContent="COULD NOT LOAD"});function Wa(){if(!hr){if(!Ga){Va=!0,os.textContent="LOADING";return}hr=!0,He.unlock(),He.startBeds($t.bedGain),He.play("ui_confirm",.55,0),Qr.classList.add("hide"),Zd.hidden=!0,me.player.color=ki,su(),Ot.applyLook&&Ot.applyLook(ki,ur),jr=$t.auto?.2:3.3,Ba.hidden=!1,Oi.hidden=!0,Fa.hidden=!0,window.__sb={race:me,cfg:$t,get fps(){return Na},campaign:()=>({planet:Bn,roundIndex:fr,plan:iu()})},window.__sbAudio=()=>({state:He.ctx&&He.ctx.state,bed:He.playing}),Xa(),tu.hidden=!1,Oa.hidden=!1}}function Xa(){let i=iu();me.shipRound=!!i.ship,me.finishZ=i.ship?null:i.finishZ,me.gate=i.ship?null:i.gate||null,me.qualifyN=i.ship?0:i.qualify,me.qualCount=0,me.phase="countdown",me.countClock=0,me.countCue=-1,me.result=null,me.time=0;let e=jn(Kr,0,i.startZ),t=e?e.y:0;me.racers.forEach((n,s)=>{let r=!lr||lr.has(n.id);if(n.qualified=!1,n.seated=!1,n.seatIndex=-1,!r){n.eliminated=!0;return}n.eliminated=!1,n.pos.x=(s%5-2)*1.7,n.pos.z=i.startZ+Math.floor(s/5)*1.2,n.pos.y=t,n.vel.x=0,n.vel.y=0,n.vel.z=0,n.lastSafe={x:n.pos.x,y:t,z:n.pos.z},n.wp=0}),me.seatsFilled=0,me.seats&&(me.seats=me.seats.map(()=>null)),Ot.setTheme&&Ot.setTheme(Bn),He.setZone&&He.setZone(i.ship?"ship":i.startZ>250?"ice":i.startZ>150?"sky":i.startZ>80?"canyon":"meadow"),op(Bn),I_.textContent="PLANET "+Bn,P_.textContent=i.name,L_.textContent=i.sub,Vd.hidden=!1,setTimeout(()=>{Vd.hidden=!0},1400)}function ru(){He.unlock(),He.startBeds($t.bedGain)}function G_(){if(ru(),!Ga){Va=!0,os.textContent="LOADING";return}if($t.auto){Wa();return}Qr.classList.add("hide"),Zd.hidden=!1,He.play("ui_tap",.4,0)}Qr.addEventListener("pointerdown",ru);Qr.addEventListener("touchstart",ru,{passive:!0});os.addEventListener("pointerdown",i=>{i.preventDefault(),G_()});os.addEventListener("click",i=>{i.preventDefault(),He.unlock(),Va&&Ga&&Wa()});E_.addEventListener("pointerdown",i=>{i.preventDefault(),He.unlock(),Wa()});us.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="swatch"+(i===ki?" on":""),t.style.background=i,t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),ki=i,su(),kd.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),He.play("ui_tap",.35,.02)}),kd.appendChild(t)});tp.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="gear"+(i===ur?" on":""),t.textContent=O_[e],t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),ur=i,su(),Bd.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),He.play("ui_tap",.35,.02)}),Bd.appendChild(t)});function ip(){!hr||!me||me.phase==="results"||(as=!as,Ha.hidden=!as)}tu.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),ip()});Oa.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation();let e=!He.muted;He.setMuted(e),Oa.textContent=e?"SOUND":"MUTE"});document.getElementById("resume").addEventListener("pointerdown",i=>{i.preventDefault(),as=!1,Ha.hidden=!0});document.getElementById("restart").addEventListener("pointerdown",i=>{i.preventDefault(),as=!1,Ha.hidden=!0,lr=null,fr=0,rp(),Xa()});document.getElementById("pause-menu-btn").addEventListener("pointerdown",i=>{i.preventDefault(),sp()});C_.addEventListener("pointerdown",i=>{i.preventDefault(),sp()});Qd.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),lr=new Set(me.racers.filter(t=>t.qualified).map(t=>t.id)),fr+=1,qn.hidden=!0,Jr=!1,oo(me,me.seed+11>>>0),$t.auto&&(me.player.useAI=!0),Xa(),Oi.hidden=!1});$d.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),qn.hidden=!0,D_.textContent="Planet "+(Bn+1)+". The sky changes. The ship is waiting.",op(Bn+1),nu.hidden=!1});document.getElementById("land").addEventListener("pointerdown",i=>{i.preventDefault(),Bn+=1,fr=0,lr=null,nu.hidden=!0,Jr=!1,oo(me,me.seed+21>>>0),$t.auto&&(me.player.useAI=!0),Xa(),Oi.hidden=!1});function sp(){as=!1,Ha.hidden=!0,nu.hidden=!0,hr=!1,qn.hidden=!0,qn.classList.remove("show"),Qr.classList.remove("hide"),Ba.hidden=!0,Oi.hidden=!0,tu.hidden=!0,Oa.hidden=!0,fr=0,lr=null}La.addEventListener("pointerdown",i=>{i.preventDefault(),He.unlock(),He.play("ui_confirm",.5,0),rp()});function rp(){let i=me.seed+1+Math.floor(Math.random()*50)>>>0;oo(me,i),Ni.x=0,Ni.z=0,$t.auto&&(me.player.useAI=!0),me.player.color=ki,Ot.applyLook&&Ot.applyLook(ki,ur),Ot.reset(),qn.hidden=!0,qn.classList.remove("show"),Kd.hidden=!1,Oi.hidden=!1,Jd.hidden=!0,Ba.classList.remove("last")}function Yd(i){let e=Math.max(0,Math.ceil(i)),t=Math.floor(e/60),n=e%60;return t+":"+String(n).padStart(2,"0")}function op(i){document.querySelectorAll(".planet-dot").forEach(e=>{let t=Number(e.dataset.planet);e.classList.toggle("on",t===i),e.classList.toggle("done",t<i)})}function jd(i){$h.textContent=i,$h.hidden=!1,Da=1.5}function V_(i){Qh.textContent=i,Qh.hidden=!1,za=1.7}var Jr=!1;function W_(i){let e=me.phase==="countdown"?$t.raceSeconds:Math.max(0,$t.raceSeconds-me.time),t=Yd(e);Yh.textContent!==t&&(Yh.textContent=t),Yh.classList.toggle("low",me.phase==="race"&&e<=15);let n=0;for(let d of me.racers)d!==me.player&&!d.seated&&d.pos.z>me.player.pos.z+.4&&n++;let s=n+1,o=s+(s===1?"ST":s===2?"ND":s===3?"RD":"TH");Hd.textContent!==o&&(Hd.textContent=o);let a=(me.coins||0)+" COINS";qh&&qh.textContent!==a&&(qh.textContent=a);let c=me.phase==="race"&&me.zoneId==="meadow"&&me.time<8&&!$t.auto;Fa.hidden=!c,c&&(Fa.textContent=me.time<2.6?"DRAG THE LEFT SIDE TO RUN":me.time<5.2?"DRAG THE RIGHT SIDE TO LOOK":"JUMP AND DIVE");let l=Math.max(0,Math.min(1,me.player.pos.z/Kr.ship.z));T_.style.transform="scaleX("+l.toFixed(3)+")";let h=eu.children;for(let d=0;d<8;d++){let b=me.seats[d],v=h[d];b==null?(v.style.background="#FFF6E5",v.classList.toggle("open",me.seatsFilled===7)):(v.style.background=me.racers[b].color,v.classList.remove("open"))}let u="SEATS "+me.seatsFilled+"/8";Gd.textContent!==u&&(Gd.textContent=u);let f=me.seatsFilled===7&&me.phase==="race";Jd.hidden=!f,Ba.classList.toggle("last",f);let p=me.phase==="countdown"||me.phase==="race"&&me.time<.45;if(Kd.hidden=!p,p){let d=me.phase==="race"?0:me.countCue,b=d>0?String(d):"GO";cr.textContent!==b&&(cr.textContent=b,cr.classList.remove("pop"),cr.offsetWidth,cr.classList.add("pop")),w_.textContent=d>0?"GET READY":"GO",cr.style.color=d>0?"#FF6B6B":"#FFD23F"}let g=me.player.pos.z-me.collapseZ,x=me.phase==="race"?Math.max(0,Math.min(1,1-g/22)):0;z_.style.opacity=String(x),Da>0&&(Da-=i,Da<=0&&($h.hidden=!0)),za>0&&(za-=i,za<=0&&(Qh.hidden=!0));let m=me.phase==="results";if(Oi.hidden=m||!hr,m&&!Jr){Jr=!0;let d=me.result;qn.hidden=!1,qn.classList.add("show"),qn.classList.toggle("miss",d==="missed"||d==="out"),qn.classList.toggle("win",d==="qualified"||d==="escaped"),A_.textContent="PLANET "+Bn,Qd.hidden=d!=="qualified",$d.hidden=d!=="escaped",La.hidden=d==="qualified"||d==="escaped",d==="qualified"?(Ra.textContent="YOU QUALIFIED!",Ca.textContent=iu().name+" CLEARED"):d==="escaped"?(Ra.textContent="YOU ESCAPED!",Ca.textContent="SEAT "+(me.player.seatIndex+1)+" OF 8",Fi.planets=Math.max(Fi.planets,Bn),Fi.coins+=me.coins||0,Fi.best="PLANET "+Bn,U_()):d==="out"?(Ra.textContent="ELIMINATED",Ca.textContent="YOU DIDN'T QUALIFY",La.textContent="TRY AGAIN"):(Ra.textContent="MISSED THE SHIP!",Ca.textContent="SO CLOSE",La.textContent="TRY AGAIN"),R_.textContent="TIME "+Yd(me.time)+" \xB7 "+(me.coins||0)+" COINS \xB7 PLANETS "+Fi.planets}m||(Jr=!1)}function X_(){let i=!1;for(let e of me.events)if(e.t==="tick")He.play("tick",.55,.05);else if(e.t==="go")He.play("go",.6,.05);else if(e.t==="jump"&&e.id===0)He.play("jump",.4,.05);else if(e.t==="coin")He.play("ui_tap",.45,.03);else if(e.t==="glide"&&e.id===0)He.play("jump",.22,.08);else if(e.t==="grab"&&e.id===0)He.play("bump",.35,.05);else if(e.t==="qualify"&&e.id===0)He.play("seat",.45,.05),me.slowMo=.45,me.popConfetti=(me.popConfetti||0)+1;else if(e.t==="roundwin")He.play("escaped",.55,.1);else if(e.t==="eliminated")He.play("missed",.6,.1);else if(e.t==="respawn"&&e.fade&&jh)jh.classList.add("on"),setTimeout(()=>jh.classList.remove("on"),200);else if(e.t==="land"&&e.id===0&&e.impact>3)He.play("land",.35,.08);else if(e.t==="bump")He.play("bump",e.id===0?.5:.22,.06),e.id===0&&e.big&&(Ua=.08,navigator.vibrate&&navigator.vibrate(24));else if(e.t==="dive"&&e.id===0)He.play("jump",.28,.04);else if(e.t==="crack")i=!0;else if(e.t==="seat"){He.play("seat",.5,.02);let t=eu.children[e.seat];t&&(t.classList.add("pop"),setTimeout(()=>t.classList.remove("pop"),400)),e.id===0&&(jd("SEAT "+(e.seat+1)+" LOCKED"),navigator.vibrate&&navigator.vibrate([16,30,16]))}else e.t==="lastseat"?He.play("last",.7,.2):e.t==="launch"?He.play("launch",.65,.2):e.t==="escaped"?(He.play("escaped",.7,.2),He.flourish&&He.flourish("win")):e.t==="missed"?(He.play("missed",.65,.2),He.flourish&&He.flourish("miss")):e.t==="checkpoint"&&e.name&&e.name!=="START"?jd("CHECKPOINT"):e.t==="zone"?V_(e.name):e.t==="geyser"?He.play("bump",e.id===0?.4:.18,.08):e.t==="error"&&rs(e.message);i&&ka<=0&&(He.play("crack",.32,.12),ka=.34),me.events.length=0}function ss(i){requestAnimationFrame(ss);let e=Math.min(.1,Jh?(i-Jh)/1e3:Ia);if(Jh=i,document.hidden||(Kh++,ss.lastWall||(ss.lastWall=i),i-ss.lastWall>=500&&(Na=Kh/((i-ss.lastWall)/1e3),Kh=0,ss.lastWall=i),!Ot))return;if(!hr){Ot.render();return}if(jr>0){jr-=e;try{Ot.update(me,e,{intro:jr,lookDx:0,lookDy:0,looking:!1}),Ot.render()}catch(h){rs(h)}Fa.hidden=!0,Oi.hidden=!0,jr<=0&&(Oi.hidden=!1);return}let t=F_.read(),n=Od(Ot.yaw,t.stickX,t.stickY),s=1-Math.exp(-16*e);if(Ni.x+=(n.x-Ni.x)*s,Ni.z+=(n.z-Ni.z)*s,t.pause&&!Wd&&ip(),Wd=!!t.pause,as){try{Ot.update(me,0,t),Ot.render()}catch(h){rs(h)}return}me.slowMo>0&&(me.slowMo=Math.max(0,me.slowMo-e));let r=me.slowMo>0?.35:1,o={x:Ni.x,z:Ni.z,jump:t.jump,dive:t.dive,grab:t.grab,holdJump:t.holdJump};me.phase!=="race"&&(o={x:0,z:0,jump:!1,dive:!1,grab:!1,holdJump:!1}),Ua>0?Ua-=e:Pa+=e*r;let a=0;for(;Ua<=0&&Pa>=Ia&&a<8;){try{vu(me,Ia,a===0?o:{x:o.x,z:o.z,jump:!1,dive:!1,grab:!1,holdJump:o.holdJump})}catch(h){rs(h),Pa=0;break}Pa-=Ia,a++}ka=Math.max(0,ka-e),me.phase==="race"&&me.player.grounded&&Math.hypot(me.player.vel.x,me.player.vel.z)>2.2&&(Zh-=e,Zh<=0&&(He.play("land",.1,.02),Zh=.32)),X_();let c=me.player.pos.z-me.collapseZ,l=me.phase==="race"?Math.max(0,Math.min(1,1-c/36)):me.phase==="launch"?.4:0;He.setRumble(l*$t.rumbleMax),!qd&&!Zr.get("dpr")&&Na>0&&Na<24&&me.time>5&&Ot.setDpr&&(qd=!0,Ot.setDpr(1)),window.__sbOverview&&(t.overview=window.__sbOverview);try{Ot.update(me,e,t),Ot.render(),W_(e)}catch(h){rs(h)}}window.addEventListener("resize",()=>Ot&&Ot.resize());document.addEventListener("visibilitychange",()=>{document.hidden&&He.ctx?He.ctx.suspend():He.ctx&&He.ctx.resume()});requestAnimationFrame(ss);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
