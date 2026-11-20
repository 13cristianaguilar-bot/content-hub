(()=>{var qs=["#5FE3B0","#FFD23F","#FF8FD1","#8C6BFF","#5CC8FF","#7FD88A","#C9B6E8","#FFC38A","#4C6FFF","#2EC4B6","#FF5FA2","#C6E05A","#9BB6FF","#F0B429","#FF8A7A","#7AD0FF"],pm={raceSeconds:180,countdownBeats:3,goHold:.65,racers:16,seats:8,collapseDelay:6,collapseArrive:168,crackTime:1.05,crackJitter:.7,fallTime:1.2,skirtLead:22,fragileCrack:.62,accel:62,airAccel:58,maxSpeed:8.4,playerSpeed:1,friction:36,iceAccel:14,iceFriction:5,gravity:29,fallGravityMul:1.48,jumpVel:10.15,coyoteTime:.22,jumpBuffer:.2,ungroundTime:.1,maxFallSpeed:28,bodyRadius:.44,stepUp:.55,voidY:-16,bumpPush:7.4,bumpUp:3.6,bumpCooldown:.32,diveDashSpeed:12.4,diveDashTime:.28,diveFall:26,diveCooldown:.55,slideHeight:.55,poundRadius:2.15,poundPush:7.5,poundUp:4.6,padUp:13.2,padForward:7.2,padRadius:2.35,padCooldown:.28,bumperPush:11,bumperUp:5.2,bumperRadius:1.05,bumperCooldown:.36,spinnerLength:1.62,spinnerPush:9.5,spinnerUp:4.2,spinnerHit:.58,spinnerMinY:.55,spinnerMaxY:1.45,spinnerCooldown:.45,lavaRadius:1.35,lavaHop:6.5,lavaStartY:-3.4,lavaRisePerSec:.022,platformRadius:2.15,platformTop:.28,stunTime:.72,knockCooldown:.55,windPush:3.6,boardHalfX:4.2,boardZMin:-8.5,boardZMax:-.4,botSpeeds:[1.05,1.02,.99,.97,.95,.93,.9,.88,.85,.82,.78,.74,.7,.66,.62],camDist:9.2,camDistPortrait:8.6,camHeight:3.7,camHeightLand:3.9,camNear:5,camFar:12,defaultPitch:.406,minPitch:.28,maxPitch:1.12,lookSens:.0052,mouseSens:.0042,autoFollowDelay:.85,autoYaw:2.6,autoPitch:1.5,camLerp:7.5,fovPortrait:65,fovLandscape:58,shipScale:1.7,seatBuddyScale:.44,dprCap:1.25,fogNear:55,fogFar:190,bedGain:.15,rumbleMax:.32};function rf(i={}){let e={...pm,quick:!!i.quick,auto:!!i.auto,seed:i.seed||1};return i.quick&&(e.raceSeconds=46,e.collapseArrive=42,e.collapseDelay=2.5,e.playerSpeed=1.12,e.botSpeeds=e.botSpeeds.map(t=>t*.9),e.lavaRisePerSec=.08),e}var Go={meadow:{a:[.5,.85,.54],b:[1,.91,.76],rim:[.31,.68,.38]},canyon:{a:[1,.72,.47],b:[1,.88,.69],rim:[.88,.48,.29]},sky:{a:[.55,.42,1],b:[1,.82,.25],rim:[.4,.27,.88]},ice:{a:[.24,.78,1],b:[.76,.69,1],rim:[.24,.42,1]},climb:{a:[1,.82,.25],b:[1,.48,.1],rim:[.49,.4,.66]},ship:{a:[1,.82,.25],b:[1,.42,.42],rim:[.78,.2,.28]}};function mm(i,e,t,n){let s=Go[i]||Go.meadow;return e>.58?s.rim:Math.sin(t*.31+n*.23)>0?s.b:s.a}function Ys(i,e,t){return i+(e-i)*t}function gm(i){return[{id:"meadow",name:"MEADOW",z0:0,z1:i*.16},{id:"canyon",name:"LAVA CANYON",z0:i*.16,z1:i*.38},{id:"sky",name:"SKY ISLANDS",z0:i*.38,z1:i*.58},{id:"ice",name:"ICE SLIDE",z0:i*.58,z1:i*.74},{id:"climb",name:"THE CLIMB",z0:i*.74,z1:i*.9},{id:"ship",name:"ESCAPE SHIP",z0:i*.9,z1:i}]}function of(i,e){let t=i[0].id;for(let n of i)e>=n.z0&&(t=n.id);return t}function xm(i,e,t,n,s,r,o){let l=[],u=[],h=[];for(let p=0;p<=4;p++){let g=p/4,b=g>.58?(g-.58)*1.35:0;for(let m=0;m<=18;m++){let d=m/18*Math.PI*2,_=1+Math.sin(d*3+i*.2+t*.05)*.05,v=i+Math.cos(d)*n*g*_,y=t+Math.sin(d)*s*g*_;l.push(v,e-b,y);let R=mm(r,o?Math.max(g,g>.45?.7:g):g,v,y);u.push(R[0],R[1],R[2])}}for(let p=0;p<4;p++)for(let g=0;g<18;g++){let b=p*19+g,m=b+19;h.push(b,m,b+1,b+1,m,m+1)}return{positions:new Float32Array(l),colors:new Float32Array(u),indices:new Uint16Array(h)}}function bm(i,e,t,n,s,r,o,a){let c=Go[a]||Go.meadow,l=10,u=[],h=[],f=[],p=t-i,g=n-e,b=Math.hypot(p,g)||1,m=-g/b,d=p/b;for(let _=0;_<=l;_++){let v=_/l,y=Ys(i,t,v),R=Ys(e,n,v),T=Ys(s,r,v),I=_%2===0?c.a:c.b;for(let w=-1;w<=1;w++){let M=w!==0,S=M?o*.5*w:0;u.push(y+m*S,T-(M?.22:0),R+d*S);let z=M?c.rim:I;h.push(z[0],z[1],z[2])}}for(let _=0;_<l;_++){let v=_*3;f.push(v,v+3,v+1,v+1,v+3,v+4),f.push(v+1,v+4,v+2,v+2,v+4,v+5)}return{positions:new Float32Array(u),colors:new Float32Array(h),indices:new Uint16Array(f)}}function af(i,e,t,n,s){let r={index:i.length,z0:t,z1:n,zone:e,gap:!s,state:"solid",crackT:0,fallT:0,fallY:0,dirty:!0,fragile:!1,ice:e==="ice",jitter:i.length%7/7,tilt:0};return s&&Object.assign(r,s),i.push(r),r.index}function ni(i,e,t){let n=i.floors||[],s=null;for(let r=0;r<n.length;r++){let o=n[r],a=i.chunks[o.chunk];if(!a||a.state==="falling"||a.state==="gone")continue;let c=(e-o.x)/o.rx,l=(t-o.z)/o.rz,u=o.zone==="meadow"?1.08:1;c*c+l*l>u||(!s||o.y>=s.y)&&(s={y:o.y,x:o.x,z:t,ice:o.zone==="ice",conveyX:o.conveyX||0,zone:o.zone,chunk:a,state:a.state,fragile:!!a.fragile})}if(!s&&i.islands)for(let r of i.islands){let o=e-r.x,a=t-r.z;o*o+a*a>r.r*r.r||(s={y:r.y,x:r.x,z:t,ice:!1,conveyX:0,zone:r.zone,chunk:null,state:"solid",fragile:!1})}return s}var ym=1.65;function Bc(i){return(i?.42:1)*ym}function cf(i){let e=!!i.quick,t=Bc(e),n=ue=>ue*t,s=n(400),r=gm(s),o=[],a=[],c=i.seed||1,l=c>>>0,u=()=>(l=Math.imul(1664525,l)+1013904223>>>0,l/4294967296),h=Math.floor(u()*3);function f(ue,ge,we,Ae,Je,ze,P){let E=af(o,ze,we-Je,we+Je,xm(ue,ge,we,Ae,Je,ze,P&&P.hex)),q={x:ue,y:ge,z:we,rx:Ae,rz:Je,zone:ze,chunk:E,conveyX:P&&P.conveyX};return a.push(q),P&&P.fragile&&(o[E].fragile=!0),q}function p(ue,ge,we,Ae,Je,ze,P,E,q){let se=q&&q.gap,ae=af(o,E,Math.min(ge,Ae),Math.max(ge,Ae),bm(ue,ge,we,Ae,Je,ze,P,E)),ie=[],Oe=Math.hypot(we-ue,Ae-ge),Me=Math.max(4,Math.ceil(Oe/Math.max(2.2,P*.5)));for(let Re=0;Re<=Me;Re++){let $e=Re/Me;if(se&&Math.abs($e-se)<.12)continue;let he={x:Ys(ue,we,$e),z:Ys(ge,Ae,$e),y:Ys(Je,ze,$e),rx:P*.78,rz:P*.78,zone:E,chunk:ae,conveyX:q&&q.conveyX};a.push(he),ie.push(he)}return ie}f(0,0,n(40),24,24,"meadow"),f(0,2.6,n(40),1.8,1.8,"meadow"),f(-16,.2,n(28),7,7,"meadow"),f(16,.8,n(52),6,6,"meadow"),f(0,.2,n(92),16,14,"canyon"),p(0,n(78),-16,n(100),.15,.3,7,"canyon"),p(-16,n(100),-18,n(118),.3,.35,6.5,"canyon"),p(-18,n(118),-6,n(136),.35,.3,6.5,"canyon"),p(2,n(86),14,n(108),.2,1.6,5.5,"canyon"),p(14,n(108),16,n(126),1.6,2.6,5.2,"canyon"),p(0,n(96),6,n(112),.3,.45,4.2,"canyon"),p(6,n(114),-4,n(128),.45,.35,4.2,"canyon"),p(16,n(126),2,n(140),2.6,.4,5.5,"canyon",{gap:.48}),f(0,.25,n(148),16,12,"canyon"),f(0,4,n(178),12,11,"sky"),f(-16,4.4,n(196),7,6,"sky"),f(14,6.8,n(194),6,6,"sky"),f(0,5.6,n(210),6,5,"sky"),p(0,n(186),-14,n(196),4,4.4,5,"sky"),p(-14,n(200),0,n(214),4.4,5.6,4.6,"sky"),p(4,n(184),14,n(194),4.1,6.8,4.4,"sky"),p(12,n(200),2,n(214),6.8,5.6,4.2,"sky"),f(0,5.2,n(232),13,11,"sky"),p(-2,n(156),6,n(172),.35,4,6.6,"canyon"),p(2,n(62),10,n(80),.05,.2,7.2,"meadow"),p(0,n(240),-10,n(258),5.2,3.3,6.2,"sky"),p(4,n(236),12,n(264),5.2,3.3,6,"sky"),p(0,n(336),-3,n(352),6.2,8,5.8,"climb"),p(0,n(292),6,n(306),3.1,3,6.2,"ice"),p(6,n(304),4,n(318),3,3.4,5.4,"climb"),f(-14,3.2,n(268),8,8,"ice",{conveyX:5}),f(14,3.3,n(270),8,8,"ice",{conveyX:-5}),f(0,3.1,n(286),10,8,"ice");for(let ue=-2;ue<=2;ue++)for(let ge=-3;ge<=3;ge++)(ge+ue)%2===0&&u()<.15||f(-7+ge*2.5,3.15,n(268+ue*2.4),1.25,1.25,"ice",{fragile:!0,hex:!0});f(0,3,n(312),12,10,"climb"),f(-14,4.4,n(326),6,6,"climb"),f(0,6.2,n(334),6,5,"climb"),f(14,7.6,n(324),6,6,"climb"),p(-2,n(318),-14,n(326),3,4.4,5,"climb"),p(-12,n(330),0,n(336),4.4,6.2,4.6,"climb"),p(2,n(316),14,n(324),3.1,7.6,4.4,"climb"),p(12,n(330),0,n(348),7.6,8,5,"climb"),f(0,8,n(360),14,12,"ship");let g=a[a.length-1],b={x:g.x,y:g.y,z:g.z+n(6)};function m(ue){let ge=[];for(let[we,Ae,Je,ze]of ue)ge.push({x:Ae,y:Je||0,z:n(we),gap:!!ze});return ge.push({x:b.x,y:b.y,z:b.z-4}),ge}let d=[-8,-4,0,4,8],_=d.map((ue,ge)=>ge);for(let ue=_.length-1;ue>0;ue--){let ge=Math.floor(u()*(ue+1)),we=_[ue];_[ue]=_[ge],_[ge]=we}let v=2+c%2,y=new Set(_.slice(0,v)),R=d.map((ue,ge)=>({x:ue,y:.35,z:n(146),solid:y.has(ge)})),T=R.filter(ue=>!ue.solid).map(ue=>ue.x),I=ue=>T[ue%T.length],w=[m([[24,-6,0],[34,-16,.2],[50,-14,0],[64,2,0],[82,8,.2],[100,-14,.3],[118,-18,.35],[136,-8,.3],[146,I(0),.3,!0],[156,-2,.25],[168,4,2.4],[186,-6,4],[198,-14,4.4],[214,-2,5.6],[232,0,5.2],[258,-10,3.3],[270,-14,3.2],[286,-2,3.1],[306,4,3],[318,-4,3.2],[328,-12,4.4],[334,0,6.2],[350,0,8],[360,0,8]]),m([[26,4,0],[42,10,.2],[58,12,.6],[80,6,.2],[96,2,.3],[112,4,.4],[128,-4,.35],[146,I(1),.3,!0],[156,2,.25],[168,4,2.4],[186,2,4.1],[196,-12,4.4],[210,-2,5.6],[232,2,5.2],[250,-6,4.2],[262,-10,3.3],[272,-12,3.2],[286,-2,3.1],[312,0,3],[326,-10,4.4],[336,0,6.2],[348,-2,7.6],[360,0,8]]),m([[28,6,0],[44,12,.4],[52,14,.8],[70,12,.2],[90,8,.4],[108,14,1.6],[126,16,2.6],[141,3,.5],[146,I(2),.3,!0],[168,5,2.4],[184,8,4.6],[194,14,6.8],[208,6,6.2],[232,2,5.2],[248,8,4.4],[264,13,3.3],[274,14,3.3],[286,4,3.1],[304,6,3],[316,8,4.6],[324,14,7.6],[340,6,7.8],[352,0,8],[360,0,8]])],M=[];for(let ue=0;ue<=s;ue+=8){let ge=of(r,ue);M.push({x:0,y:0,z:ue,half:ge==="meadow"?16:12,zone:ge,gap:!1,chunk:0,ice:ge==="ice",conveyX:0,route:0,shelf:0,shelfH:0,guard:ge==="meadow"&&ue<50*t})}let S=[];for(let ue of a)if(!(ue.rx<6))for(let ge=0;ge<3;ge++){let we=u()*Math.PI*2,Ae=Math.cos(we)*.9,Je=Math.sin(we)*.82;Ae*Ae+Je*Je<.62||S.push({x:ue.x+Ae*ue.rx,y:ue.y,z:ue.z+Je*ue.rz,zone:ue.zone,col:Math.cos(we)>0?4:-4,row:Math.floor(ue.z)})}let z=[],W=(ue,ge,we)=>z.push({x:ge,y:we+1.15,z:n(ue),got:!1}),X=w[2];for(let ue=1;ue<X.length-1;ue+=2)W(X[ue].z/t,X[ue].x,X[ue].y);W(52,14,.8),W(108,14,1.6),W(194,14,6.8),W(324,14,7.6),W(40,-10,.2);let j=[{x:0,y:1.2,z:n(40),r:2.3}];for(let ue of R)ue.solid&&j.push({x:ue.x,y:ue.y+1.2,z:ue.z,r:1.35});j.push({x:-13.2,y:1.4,z:n(146),r:2.6}),j.push({x:13.2,y:1.4,z:n(146),r:2.6}),j.push({x:b.x,y:b.y,z:b.z,r:2.4,ship:!0});let J=(ue,ge,we)=>({x:ge,y:we,z:n(ue),zone:of(r,n(ue))}),ee=(ue,ge,we,Ae)=>Math.atan2(we-ue,Ae-ge),le=[J(30,12,0),J(48,-8,0),J(178,6,4),J(312,-6,3)],Q=[{...J(32,0,0),face:ee(0,32,0,40)},{...J(40,0,2.6),face:ee(0,40,14,52)},{...J(100,8,.6),face:ee(8,100,14,108)},{...J(126,16,2.6),face:ee(16,126,2,140)},{...J(316,6,3.4),face:ee(6,316,14,324)}],ye=[{id:0,kind:"ferry",originX:0,originZ:n(204),x:0,z:n(204),prevX:0,prevZ:n(204),y:6.4,originY:6.4,amp:8,speed:.7,phase:u()*2,radius:2.8,axis:"x"},{id:1,kind:"spin",originX:-16,originZ:n(196),x:-16,z:n(196),prevX:-16,prevZ:n(196),y:4.7,originY:4.7,amp:0,speed:1.3,phase:0,radius:3.1,axis:"spin"},{id:2,kind:"seesaw",originX:0,originZ:n(278),x:0,z:n(278),prevX:0,prevZ:n(278),y:3.7,originY:3.7,amp:0,speed:0,phase:0,radius:3.6,axis:"seesaw",tilt:0,face:Math.PI/2},{id:3,kind:"seesaw",originX:0,originZ:n(338),x:0,z:n(338),prevX:0,prevZ:n(338),y:6.8,originY:6.8,amp:0,speed:0,phase:0,radius:3.4,axis:"seesaw",tilt:0,face:Math.PI/2},{id:4,kind:"seesaw",zone:"canyon",originX:11,originZ:n(156),x:11,z:n(156),prevX:11,prevZ:n(156),y:.85,originY:.85,amp:0,speed:0,phase:0,radius:3.3,axis:"seesaw",tilt:0,face:0}],me=[{...J(36,-8,.15),len:3.6,angle:u()*3,spin:1.5},{...J(148,-8,.4),len:3.2,angle:u()*2,spin:-1.35},{...J(210,0,5.7),len:2.8,angle:.4,spin:1.6},{...J(312,4,3.1),len:3.1,angle:1,spin:-1.4}],ve=[J(104,3,.4),J(118,-2,.2)].map((ue,ge)=>({...ue,period:2.6+ge*.35,t:u()*2,hot:!1,wasHot:!1,warn:!1,radius:1.35})),Ze=[{...J(44,0,1.15),originX:0,amp:6,speed:.85,halfLen:3.2,height:1.05,full:!1,radius:1.15,scale:1.7},{...J(108,-16,1.15),originX:-16,amp:4.5,speed:1.05,halfLen:2.6,height:1.05,full:!0,radius:1.05,scale:1.55},{...J(268,-14,4.15),originX:-14,amp:4,speed:1.1,halfLen:2.4,height:1,full:!1,radius:1,scale:1.45}],pt=[{...J(68,8,4.6),len:3.2,amp:1.05,speed:1.15,phase:u(),radius:.95},{...J(207,-7,9.2),len:3.4,amp:1.1,speed:1.25,phase:u(),radius:1},{...J(330,-6,8.4),len:3.1,amp:1,speed:1.2,phase:u()*2,radius:.9}],ne=[{...J(116,14,2.5),x0:10,x1:18,dir:1,speed:3.1,radius:1.15,rot:0},{...J(270,14,4.2),x0:8,x1:18,dir:-1,speed:2.6,radius:1.05,rot:0,snow:!0},{...J(324,14,8.5),x0:8,x1:18,dir:1,speed:2.8,radius:1.1,rot:0}],D=[{...J(152,6,.4),homeX:6,homeZ:n(152),homeY:.4,vy:0,hopping:!1,t:u(),period:1.7,dirx:1,dirz:0,radius:.95}],O=[{cx:0,cz:n(210),cy:9.2,x:0,y:9.2,z:n(210),ang:u()*6,span:7,radius:.95}],Y=[{z0:n(198),z1:n(216),x0:-10,x1:12,y0:4,y1:12,ax:1}],fe={z0:n(108),z1:n(128),x0:-7,x1:7},pe={x:0,y:.08,z:n(118),r:7.5},De=[{x:0,z:n(40),zone:"meadow",r:26},{x:0,z:n(118),zone:"canyon",r:24},{x:0,z:n(204),zone:"sky",r:22},{x:0,z:n(274),zone:"ice",r:20},{x:0,z:n(332),zone:"climb",r:20}],it=[{kind:"mushroom",x:0,y:0,z:n(40)},{kind:"tower",x:0,y:5.6,z:n(210)}],Ne=["meadow","canyon","sky","ice","climb"].map(ue=>{let ge=r.find(we=>we.id===ue);return{x:0,y:0,z:ge.z0+8,name:ge.name,row:0}}),lt=[{x:0,y:0,z:n(22),row:0,col:0}];for(let ue=1;ue<16;ue++){let ge=Math.floor((ue-1)/5),we=(ue-1)%5;lt.push({x:(we-2)*2.1,y:0,z:n(26+ge*2.2),row:ge+1,col:we})}return{len:s,stations:M,chunks:o,floors:a,tiles:S,islands:[],blockers:j,coins:z,zones:r,bumpers:le,spinners:me,pads:Q,platforms:ye,pendulums:pt,sweepers:Ze,geysers:ve,rollers:ne,hoppers:D,flyers:O,winds:Y,lava:fe,crater:pe,hubs:De,landmarks:it,doors:R,checkpoints:Ne,waypoints:w[0],routes:w,openDoor:h,spawns:lt,crateSpawns:[{x:-6,y:.4,z:n(34)},{x:7,y:.4,z:n(46)},{x:-12,y:.5,z:n(108)}],ship:b,endZ:b.z}}var lf="space-buddies-board";function vm(){try{let i=JSON.parse(localStorage.getItem(lf)||"[]");return Array.isArray(i)?i:[]}catch{return[]}}function uf(i){let e=[i,...vm()].slice(0,12);try{localStorage.setItem(lf,JSON.stringify(e))}catch{}let t=typeof window<"u"?window.SPACE_BUDDIES_SUPABASE:null;if(t&&t.url&&t.key){let n=String(t.url).replace(/\/$/,"")+"/rest/v1/runs";fetch(n,{method:"POST",headers:{apikey:t.key,Authorization:"Bearer "+t.key,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(i)}).catch(()=>{})}return e}function _m(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function Vo(i,e,t){return Math.max(e,Math.min(t,i))}function gs(i,e){return Math.hypot(i,e)}function Gc(i,e,t=1){let n=_m(t||1),s=i.spawns.slice(),r=s.find(u=>u.col===0&&u.row===s[0].row+3)||s[Math.min(8,s.length-1)],o=s.filter(u=>u!==r);for(let u=o.length-1;u>0;u--){let h=Math.floor(n()*(u+1)),f=o[u];o[u]=o[h],o[h]=f}let a=[];for(let u=0;u<e.racers;u++){let h=u===0?r:o[u-1]||r,f=u===0?e.playerSpeed:e.botSpeeds[Math.min(u-1,e.botSpeeds.length-1)];a.push({id:u,isPlayer:u===0,useAI:u!==0,color:qs[u%qs.length],pos:{x:h.x,y:h.y,z:h.z},lastSafe:{x:h.x,y:h.y,z:h.z},vel:{x:0,y:0,z:0},yaw:0,grounded:!0,platformId:null,coyote:e.coyoteTime,buffer:0,ungroundT:0,flail:0,invuln:.4,controlLock:0,sliding:0,squash:0,seated:!1,seatIndex:-1,eliminated:!1,cp:0,padCd:0,canGlide:0,qualified:!1,grabT:0,boost:0,bumpCd:0,spinCd:0,diveCd:0,knockCd:0,diving:!1,wasDiving:!1,dashX:0,dashZ:1,onIce:!1,emote:"idle",attached:!1,profile:{speed:f,skill:f>.96?.94:f>.86?.78:.5,mistake:u===0?0:f>.96?.012:f>.86?.035:.07,phase:n()*6},wait:u===0?0:(h.row||0)*.42+n()*.55,stumble:0,wp:0,routeId:u%3})}let c={cfg:e,course:i,racers:a,player:a[0],seed:t,rand:n,phase:"countdown",countClock:0,countCue:-1,time:0,collapseZ:i.zones[0].z0-16,collapseSpeed:1,seats:Array(e.seats).fill(null),seatsFilled:0,lastSeatEvent:!1,result:null,launchT:0,launchV:0,launchY:0,shipY:i.ship.y,events:[],platforms:i.platforms.map(u=>({...u})),spinners:i.spinners.map(u=>({...u})),geysers:i.geysers.map(u=>({...u})),rollers:i.rollers.map(u=>({...u})),hoppers:i.hoppers.map(u=>({...u})),flyers:i.flyers.map(u=>({...u})),pendulums:i.pendulums.map(u=>({...u,bobX:u.x,bobY:u.y-u.len,bobZ:u.z})),sweepers:i.sweepers.map(u=>({...u})),lavaY:e.lavaStartY,coins:0,crates:(i.crateSpawns||[]).map(u=>({x:u.x,y:u.y,z:u.z,vx:0,vz:0})),finishZ:null,shipRound:!1,kind:"gate",crown:null,qualifyN:0,qualCount:0,shake:0,activated:!1,zoneId:"meadow"},l=Math.max(30,i.ship.z-i.zones[0].z0);c.collapseSpeed=l/Math.max(8,e.collapseArrive-e.collapseDelay);for(let u of i.chunks)u.state="solid",u.crackT=0,u.fallT=0,u.fallY=0,u.dirty=!0,u.tilt=0,u.stepped=!1,u.spawned=!1;return c}function qo(i,e){for(let n of i.course.chunks)n.state="solid",n.crackT=0,n.fallT=0,n.fallY=0,n.dirty=!0,n.tilt=0,n.stepped=!1;let t=Gc(i.course,i.cfg,e||i.seed+17>>>0);return Object.assign(i,t),i}function df(i){return i&&(i.state==="solid"||i.state==="cracking")}function hf(i,e,t){return!(t-i>.42||i>t+.08&&e>t+.08)}function Kr(i,e){let t=e+1;return i<t?t:i}function Mm(i,e,t){if(i.axis!=="seesaw")return i.y;let n=i.face||0,s=(e-i.x)*Math.cos(n)+(t-i.z)*Math.sin(n);return i.originY-s*Math.sin(i.tilt||0)}function Sm(i,e,t,n,s){let r=null,o=i.platforms;for(let c=0;c<o.length;c++){let l=o[c],u=e-l.x,h=t-l.z;if(u*u+h*h>l.radius*l.radius)continue;let f=Mm(l,e,t);hf(n,s,f)&&(!r||f>=r.y)&&(r={y:f,platformId:c,tile:null})}let a=ni(i.course,e,t);return a&&df(a)&&hf(n,s,a.y)&&(!r||a.y>=r.y-.02)&&(r={y:a.y,platformId:null,tile:a}),r}function Hc(i,e,t,n){let s=ni(i.course,e,t);if(s&&df(s)&&Math.abs(s.y-n)<1.4)return!0;for(let r of i.platforms){let o=e-r.x,a=t-r.z;if(o*o+a*a<=r.radius*r.radius&&Math.abs(r.y-n)<1.6)return!0}return!1}function pf(i,e){for(let t of i.course.winds)if(e.pos.z>=t.z0&&e.pos.z<=t.z1&&e.pos.x>=t.x0&&e.pos.x<=t.x1&&e.pos.y>=t.y0&&e.pos.y<=t.y1)return t;return null}function js(i,e,t,n,s){e.seated||e.eliminated||e.invuln>0||e.knockCd>0||e.lockImmune>0||(e.vel.x+=t,e.vel.z+=n,e.vel.y=Math.max(e.vel.y,s),e.grounded=!1,e.platformId=null,e.ungroundT=Math.max(e.ungroundT,.08),e.flail=Math.min(1.4,Math.max(e.flail,i.cfg.stunTime)),e.controlLock=Math.min(1.4,Math.max(e.controlLock,i.cfg.stunTime)),e.knockCd=i.cfg.knockCooldown,e.sliding=0,i.events.push({t:"bump",id:e.id,big:!0}),e.isPlayer&&(i.shake=Math.max(i.shake,.72)))}function Em(i,e){if(i.lockImmune>0){i.lockImmune-=e,i.controlLock=0,i.grabT=0,i.flail>.12&&(i.flail=.12),i.lockAge=0;return}if(!(i.controlLock>.04||i.flail>.25||i.grabT>.25)){i.lockAge=0;return}i.lockAge=(i.lockAge||0)+e,!(i.lockAge<2)&&(i.controlLock=0,i.flail=0,i.grabT=0,i.sliding=0,i.lockAge=0,i.lockImmune=1.2)}function Xo(i,e,t){let n=i.course.floors||[],s=null;for(let r=0;r<n.length;r++){let o=n[r],a=i.course.chunks[o.chunk];if(!a||a.state!=="solid"&&a.state!=="cracking")continue;let c=(e-o.x)/o.rx,l=(t-o.z)/o.rz,u=o.zone==="meadow"?1.08:.98;c*c+l*l>u||(!s||o.y>=s.y)&&(s={x:e,y:o.y,z:t})}return s}function wm(i,e){let t=e.lastSafe;if(t&&t.z>i.collapseZ+2){let c=Xo(i,t.x,t.z);if(c)return c}let n=i.course.routes||[i.course.waypoints],s=null,r=1e9,o=Math.max(t&&t.z||e.pos.z||0,i.collapseZ+8);for(let c=0;c<n.length;c++){let l=n[c];for(let u=0;u<l.length;u++){let h=l[u];if(h.z<i.collapseZ+4)continue;let f=Xo(i,h.x,h.z);if(!f)continue;let p=Math.abs(h.z-o)+(h.z>o+18?40:0);p<r&&(r=p,s=f)}}if(s)return s;let a=i.course.floors||[];for(let c=0;c<a.length;c++){let l=a[c],u=i.course.chunks[l.chunk];if(!(!u||u.state!=="solid"&&u.state!=="cracking")&&l.zone!=="ship"&&!(l.z<i.collapseZ+4))return{x:l.x,y:l.y,z:l.z}}return null}function Wo(i,e){let t=wm(i,e);t&&(e.pos.x=t.x,e.pos.y=t.y+.05,e.pos.z=t.z,e.vel.x=0,e.vel.y=0,e.vel.z=0,e.grounded=!0,e.platformId=null,e.flail=0,e.invuln=.85,e.controlLock=0,e.lockAge=0,e.airStuck=0,e.stallT=0,e.sliding=0,e.diving=!1,e.wasDiving=!1,e.lastSafe={x:t.x,y:t.y,z:t.z},e.markX=t.x,e.markZ=t.z,i.events.push({t:"respawn",id:e.id,fade:e.isPlayer}),e.isPlayer&&(i.shake=Math.max(i.shake,.3)))}function Tm(i,e){let t=i.cfg;for(let n of i.racers){if(n===e||n.seated||n.invuln>0)continue;let s=n.pos.x-e.pos.x,r=n.pos.z-e.pos.z,o=Math.hypot(s,r);if(o<t.poundRadius&&Math.abs(n.pos.y-e.pos.y)<1.5){let a=o>.05?s/o:1,c=o>.05?r/o:0;n.vel.x+=a*t.poundPush,n.vel.z+=c*t.poundPush,n.vel.y=Math.max(n.vel.y,t.poundUp),n.grounded=!1,n.flail=.35,n.ungroundT=.06}}i.events.push({t:"bump",id:e.id,big:!0})}function Am(i,e){let t=i.course.blockers;if(!t)return;let n=i.course.ship;for(let s=0;s<t.length;s++){let r=t[s];if(Math.abs(e.pos.y-r.y)>2.2)continue;if(r.ship){let p=e.pos.z-n.z,g=Math.hypot(e.pos.x-r.x,e.pos.z-r.z);if(p<-.5&&p>-9&&g>r.r*.35)continue}let o=e.pos.x-r.x,a=e.pos.z-r.z,c=Math.hypot(o,a);if(c>=r.r||c<1e-4)continue;let l=o/c,u=a/c,h=r.r-c;e.pos.x+=l*h,e.pos.z+=u*h;let f=e.vel.x*l+e.vel.z*u;f<0&&(e.vel.x-=l*f,e.vel.z-=u*f)}}function Rm(i,e,t,n,s,r,o){let a=gs(e,t),c=r*Math.min(1,a),l=0,u=0;a>.001&&(l=e/a,u=t/a);let h=l*c+(o||0),f=u*c,p=h-i.vel.x,g=f-i.vel.z,b=Math.hypot(p,g),m=Math.min(b,s*n);b>1e-4&&(i.vel.x+=p/b*m,i.vel.z+=g/b*m)}function Cm(i,e){let t=i.course.blockers;if(!t)return;let n=i.course.ship;for(let s=0;s<2;s++)for(let r=0;r<t.length;r++){let o=t[r];if(Math.abs(e.pos.y-o.y)>2.4)continue;let a=e.pos.x-o.x,c=e.pos.z-o.z,l=Math.hypot(a,c);if(l>=o.r)continue;if(o.ship&&n){let p=e.pos.z-n.z;if(p<-.2&&p>-9&&l>o.r*.35)continue}l<1e-4&&(a=1,c=.15,l=Math.hypot(a,c));let u=a/l,h=c/l,f=o.r-l+.06;e.pos.x+=u*f,e.pos.z+=h*f,e.vel.x*u+e.vel.z*h<0&&(e.vel.x+=u*2,e.vel.z+=h*2)}}function Im(i,e,t,n){let s=i.cfg;if(e.prevZ=e.pos.z,e.prevX=e.pos.x,e.seated||e.eliminated)return;if(e.qualified){e.pos.z+=2.4*n,e.vel.x*=.8,e.vel.z=2.4;return}if(Em(e,n),e.controlLock>0&&(e.controlLock-=n,t={x:0,z:0,jump:!1,dive:!1}),e.invuln>0&&(e.invuln-=n),e.padCd>0&&(e.padCd-=n),e.bumpCd>0&&(e.bumpCd-=n),e.spinCd>0&&(e.spinCd-=n),e.diveCd>0&&(e.diveCd-=n),e.knockCd>0&&(e.knockCd-=n),e.flail>0&&(e.flail-=n),e.squash>0&&(e.squash=Math.max(0,e.squash-n*3.2)),e.grounded&&e.platformId!=null){let w=i.platforms[e.platformId];if(w){if(e.pos.x+=w.x-w.prevX,e.pos.z+=w.z-w.prevZ,w.axis==="spin"){let M=e.pos.x-w.x,S=e.pos.z-w.z;e.vel.x+=-S*w.speed*n*5.5,e.vel.z+=M*w.speed*n*5.5}else if(w.axis==="seesaw"){let M=w.face||0,S=Math.sin(w.tilt||0)*9*n;e.vel.x+=Math.cos(M)*S,e.vel.z+=Math.sin(M)*S}}}if(e.grounded?e.coyote=s.coyoteTime:e.coyote=Math.max(0,e.coyote-n),t.jump?e.buffer=s.jumpBuffer:e.buffer=Math.max(0,e.buffer-n),t.dive&&e.diveCd<=0){let w=gs(t.x,t.z);w>.15?(e.dashX=t.x/w,e.dashZ=t.z/w):(e.dashX=Math.sin(e.yaw),e.dashZ=Math.cos(e.yaw)),e.grounded?(e.sliding=s.diveDashTime,e.diveCd=s.diveCooldown,i.events.push({t:"dive",id:e.id})):(e.vel.y=-s.diveFall,e.diving=!0,e.wasDiving=!0,e.diveCd=s.diveCooldown,e.grounded=!1,i.events.push({t:"dive",id:e.id}))}let r=pf(i,e),o=r?r.ax*s.windPush:0,a=e.controlLock>0?8:e.onIce?gs(t.x,t.z)>.1?s.iceAccel:s.iceFriction:gs(t.x,t.z)>.08?s.accel:s.friction,c=s.maxSpeed*(e.profile.speed||1);if(e.sliding>0)e.sliding-=n,e.vel.x=e.dashX*s.diveDashSpeed,e.vel.z=e.dashZ*s.diveDashSpeed,e.vel.x+=t.x*10*n,e.vel.z+=t.z*10*n;else if(e.grounded)Rm(e,t.x,t.z,n,a,c,o),e.groundTile&&e.groundTile.conveyX&&(e.vel.x+=e.groundTile.conveyX*n);else{e.vel.x+=t.x*s.airAccel*n+o*n*.6,e.vel.z+=t.z*s.airAccel*n;let w=e.diving?s.diveDashSpeed:e.boost>0?s.padForward+c:c*1.18;e.boost>0&&(e.boost-=n);let M=gs(e.vel.x,e.vel.z);M>w&&(e.vel.x*=w/M,e.vel.z*=w/M)}let l=!1;e.buffer>0&&e.ungroundT<=0&&(e.grounded||e.coyote>0)&&e.sliding<=0&&(e.vel.y=s.jumpVel,e.grounded=!1,e.platformId=null,e.coyote=0,e.buffer=0,e.ungroundT=s.ungroundTime,l=!0,i.events.push({t:"jump",id:e.id}));let u=s.gravity;e.vel.y<0&&(u*=s.fallGravityMul),e.vel.y-=u*n,e.vel.y<-s.maxFallSpeed&&(e.vel.y=-s.maxFallSpeed),e.vel.x=Vo(e.vel.x,-24,24),e.vel.z=Vo(e.vel.z,-24,24),e.ungroundT>0&&(e.ungroundT-=n),e.canGlide>0&&(e.canGlide-=n,!e.grounded&&t.holdJump&&e.vel.y<2&&(e.vel.y=Math.max(e.vel.y,-3.2),e.vel.y+=11*n,e.glided||(e.glided=!0,i.events.push({t:"glide",id:e.id})))),e.grounded&&(e.glided=!1),e.grabT>0&&(e.grabT-=n),t.grab&&e.grabT<=0&&(Fm(i,e),e.grabT=.4);let h=e.grounded,f=e.pos.x,p=e.pos.z,g=Math.hypot(e.vel.x,e.vel.z)*n,b=Math.max(1,Math.min(4,Math.ceil(g/.42))),m=n/b;for(let w=0;w<b;w++)e.pos.x+=e.vel.x*m,e.pos.z+=e.vel.z*m,Am(i,e);let d=e.pos.y+e.vel.y*n;if(e.ungroundT>0||l)e.pos.y=d,e.grounded=!1,e.platformId=null;else{let w=Sm(i,e.pos.x,e.pos.z,e.pos.y,d);if(w&&e.vel.y<=.85){let M=-e.vel.y,S=!e.grounded;e.pos.y=w.y,e.vel.y=0,e.grounded=!0,e.platformId=w.platformId,e.groundTile=w.tile,e.onIce=!!(w.tile&&w.tile.ice),e.diving=!1,S&&M>2.4&&(e.squash=Vo(M/16,.12,1),i.events.push({t:"land",id:e.id,impact:M}),e.wasDiving&&M>8&&Tm(i,e)),e.wasDiving=!1,w.tile&&!w.tile.fragile&&(e.lastSafe={x:w.tile.x,y:w.y,z:e.pos.z}),w.tile&&w.tile.chunk&&w.tile.state==="solid"&&w.tile.fragile&&!w.tile.chunk.stepped&&(w.tile.chunk.stepped=!0,w.tile.chunk.state="cracking",w.tile.chunk.crackT=s.fragileCrack,w.tile.chunk.dirty=!0,i.events.push({t:"crack"}))}else if(h&&e.pos.z<50&&e.vel.y<=.6&&Xo(i,e.pos.x,e.pos.z)){let M=Xo(i,e.pos.x,e.pos.z);e.pos.y=M.y,e.vel.y=0,e.grounded=!0,e.groundTile=M}else e.pos.y=d,e.grounded=!1,e.platformId=null,e.groundTile=null,e.onIce=!1}let _=i.course.checkpoints;for(;e.grounded&&e.cp<_.length-1&&e.pos.z>_[e.cp+1].z-1.5;)e.cp++,e.isPlayer&&i.events.push({t:"checkpoint",name:_[e.cp].name});let v=ni(i.course,e.pos.x,e.pos.z),y=v?v.y:e.lastSafe?e.lastSafe.y:0;(e.pos.y<s.voidY||e.pos.y<y-15)&&Wo(i,e);let R=i.course.lava;if(e.pos.z>R.z0&&e.pos.z<R.z1&&e.pos.x>R.x0&&e.pos.x<R.x1&&e.pos.y<i.lavaY+.2&&!e.seated&&Wo(i,e),gs(e.vel.x,e.vel.z)>.7&&e.sliding<=0?e.yaw=Math.atan2(e.vel.x,e.vel.z):e.sliding>0&&(e.yaw=Math.atan2(e.dashX,e.dashZ)),h&&!e.grounded&&(e.fallFrom=e.pos.y),e.grounded&&e.fallFrom!=null&&(e.fallFrom-e.pos.y>4.5&&!(e.lockImmune>0)&&(e.flail=.7,e.controlLock=Math.max(e.controlLock,.35)),e.fallFrom=null),e.flailWas>0&&e.flail<=0){let w=ni(i.course,e.pos.x,e.pos.z);w&&Math.abs(e.pos.y-w.y)<1.4&&(e.pos.y=w.y,e.vel.y=0,e.grounded=!0)}e.flailWas=e.flail,e.grounded||Hc(i,e.pos.x,e.pos.z,e.pos.y)?e.airStuck=0:e.airStuck=(e.airStuck||0)+n,e.airStuck>3&&(e.airStuck=0,Wo(i,e)),Cm(i,e)}function Pm(i,e,t){let n={x:0,z:0,jump:!1,dive:!1};if(e.wait>0)return e.wait-=t,n;if(e.stumble>0)return e.stumble-=t,n;let s=e.profile;i.rand()<s.mistake*t&&(e.stumble=.18+i.rand()*.28);let r=i.course.routes,o=r&&r[e.routeId]||i.course.waypoints;for(;e.wp<o.length-1;){let R=o[e.wp],T=e.pos.x-R.x,I=e.pos.z-R.z;if(T*T+I*I>9)break;e.wp++}let a=o[Math.min(e.wp,o.length-1)],c=(e.id%5-2)*(e.pos.y>5.5?.4:.85),l=a.x+c;a.gap&&(l=a.x);for(let R of i.course.pads){let T=(R.x-a.x)**2+(R.z-a.z)**2<36,I=(R.x-e.pos.x)**2+(R.z-e.pos.z)**2<49;T&&I&&(l=R.x)}let u=a.z,h=a.y;if(a.z-e.pos.z>6){let R=null,T=1e9;for(let I of i.platforms){if(I.kind!=="ferry"||I.z<e.pos.z+.5||I.z>a.z+1)continue;let w=I.z-e.pos.z;w<T&&(T=w,R=I)}R&&(l=R.x,u=R.z,h=R.y)}let f=l-e.pos.x,p=u-e.pos.z;pf(i,e)&&(f-=2.4*s.skill);for(let R of i.spinners){let T=R.z-e.pos.z;T>-.2&&T<7&&Math.abs(R.x-e.pos.x)<2.2&&(f+=(e.pos.x>=R.x?1:-1)*3.2*s.skill)}for(let R of i.sweepers){let T=R.z-e.pos.z;T>.3&&T<6&&Math.abs(R.x-e.pos.x)<1.6&&(R.full&&s.skill>.4||(f+=(e.pos.x>=R.x?1:-1)*3*s.skill))}for(let R of i.geysers){if(!R.warn&&!R.hot)continue;let T=R.z-e.pos.z;T>-.5&&T<7&&Math.abs(R.x-e.pos.x)<2.4&&(f+=(e.pos.x>=R.x?1:-1)*4.2*s.skill)}for(let R of i.rollers)Math.abs(R.z-e.pos.z)<3&&Math.abs(R.x-e.pos.x)<3&&(p+=2.5,f+=(e.pos.x>=R.x?1:-1)*2);let g=Math.hypot(f,p)||1;f/=g,p/=g;let b=!1,m=e.pos.x+f*1.05,d=e.pos.z+p*1.05,_=Hc(i,m,d,e.pos.y);e.grounded&&!_&&(Hc(i,e.pos.x+f*3.2,e.pos.z+p*4.2,e.pos.y)||h>e.pos.y-.4?b=!0:p*=.15),e.grounded&&h>e.pos.y+.65&&Math.hypot(l-e.pos.x,u-e.pos.z)<3.2&&(b=!0);let v=!1;for(let R of i.course.pads){let T=R.z-e.pos.z;T>-.4&&T<8&&Math.abs(R.x-e.pos.x)<2.2&&(v=!0)}v&&(b=!1);for(let R of i.sweepers){if(!R.full)continue;let T=R.z-e.pos.z;e.grounded&&T>.6&&T<2.8&&(b=!0)}let y=!1;if(i.rand()<.45*t)for(let R of i.racers)R!==e&&!R.seated&&Math.hypot(R.pos.x-e.pos.x,R.pos.z-e.pos.z)<1.6&&(y=!0);return{x:f,z:p,jump:b,dive:!1,grab:y}}function Lm(i){let e=i.cfg,t=i.racers,n=e.bodyRadius*1.7;for(let s=0;s<t.length;s++){let r=t[s];if(!(r.seated||r.eliminated||r.qualified))for(let o=s+1;o<t.length;o++){let a=t[o];if(a.seated||a.eliminated||a.qualified)continue;let c=a.pos.x-r.pos.x,l=a.pos.z-r.pos.z;if(Math.abs(r.pos.y-a.pos.y)>1.3)continue;let h=Math.hypot(c,l);if(h<8e-4&&(c=s%2?1:-1,l=.35,h=Math.hypot(c,l)),h>=n)continue;let f=c/h,p=l/h,g=(n-h)*.35,b=r.isPlayer?r:a.isPlayer?a:null;if(b){let d=b===r?a:r,_=b===r?1:-1,v=Math.hypot(b.vel.x,b.vel.z)>1.2;d.pos.x+=f*_*g,d.pos.z+=p*_*g,v&&(b.pos.x-=f*_*g*.08,b.pos.z-=p*_*g*.08);let y=-p*_,R=f*_;d.vel.x+=y*.7,d.vel.z+=R*.7;continue}if(r.invuln<=0&&(r.pos.x-=f*g,r.pos.z-=p*g),a.invuln<=0&&(a.pos.x+=f*g,a.pos.z+=p*g),(r.vel.x-a.vel.x)*f+(r.vel.z-a.vel.z)*p>6&&r.bumpCd<=0&&a.bumpCd<=0&&r.invuln<=0&&a.invuln<=0){r.vel.x-=f*e.bumpPush*.45,r.vel.z-=p*e.bumpPush*.45,a.vel.x+=f*e.bumpPush*.45,a.vel.z+=p*e.bumpPush*.45,r.bumpCd=e.bumpCooldown,a.bumpCd=e.bumpCooldown;let d=r.isPlayer?r.id:a.isPlayer?a.id:r.id;i.events.push({t:"bump",id:d})}}}}function Dm(i,e){let t=i.cfg;for(let n of i.spinners)n.angle+=n.spin*e;for(let n of i.course.bumpers)for(let s of i.racers){if(s.seated||s.bumpCd>0||s.invuln>0)continue;let r=s.pos.x-n.x,o=s.pos.z-n.z,a=Math.hypot(r,o);if(a<t.bumperRadius+.2&&Math.abs(s.pos.y-n.y)<1.4){let c=a>.05?r/a:1,l=a>.05?o/a:0;s.vel.x=c*t.bumperPush,s.vel.z=l*t.bumperPush,s.vel.y=Math.max(s.vel.y,t.bumperUp),s.grounded=!1,s.ungroundT=.08,s.flail=.4,s.bumpCd=t.bumperCooldown,s.controlLock=Math.max(s.controlLock,.12),i.events.push({t:"bump",id:s.id,big:!0}),s.isPlayer&&(i.shake=Math.max(i.shake,.28))}}for(let n of i.spinners){let s=Math.cos(n.angle),r=Math.sin(n.angle),o=n.len||t.spinnerLength,a=s*o,c=r*o,l=n.x-a,u=n.z-c,h=n.x+a,f=n.z+c,p=h-l,g=f-u,b=p*p+g*g||1;for(let m of i.racers){if(m.seated||m.spinCd>0||m.invuln>0||m.sliding>0)continue;let d=m.pos.y-n.y;if(d<t.spinnerMinY||d>t.spinnerMaxY)continue;let _=((m.pos.x-l)*p+(m.pos.z-u)*g)/b;_=Vo(_,0,1);let v=l+p*_,y=u+g*_,R=m.pos.x-v,T=m.pos.z-y;if(R*R+T*T>t.spinnerHit*t.spinnerHit)continue;let I=-r,w=s,M=Math.sign((m.pos.x-n.x)*I+(m.pos.z-n.z)*w)||1;js(i,m,I*M*t.spinnerPush,w*M*t.spinnerPush,t.spinnerUp),m.spinCd=t.spinnerCooldown}}for(let n of i.course.pads)for(let s of i.racers){if(s.seated||s.padCd>0)continue;let r=s.pos.x-n.x,o=s.pos.z-n.z;if(r*r+o*o>t.padRadius*t.padRadius)continue;let a=s.pos.y-n.y;if(a>1.35||a<-3.4)continue;let c=n.face!=null?n.face:gs(s.vel.x,s.vel.z)>.4?Math.atan2(s.vel.x,s.vel.z):0;s.vel.y=t.padUp,s.vel.x=Math.sin(c)*t.padForward,s.vel.z=Math.cos(c)*t.padForward,s.grounded=!1,s.platformId=null,s.ungroundT=.12,s.padCd=t.padCooldown,s.boost=1.15,s.canGlide=2.4,s.glided=!1,n.pulse=.28,i.events.push({t:"jump",id:s.id,pad:!0})}for(let n of i.geysers){n.t+=e;let s=n.t%n.period;if(n.warn=s>n.period-.7&&s<n.period-.18,n.hot=s>=n.period-.18||s<.28,n.hot&&!n.wasHot)for(let r of i.racers){if(r.seated)continue;Math.hypot(r.pos.x-n.x,r.pos.z-n.z)<n.radius+.3&&Math.abs(r.pos.y-n.y)<1.3&&(r.vel.y=Math.max(r.vel.y,13),r.grounded=!1,r.ungroundT=.1,r.flail=.3,i.events.push({t:"geyser",id:r.id}),r.isPlayer&&(i.shake=Math.max(i.shake,.2)))}n.wasHot=n.hot}for(let n of i.sweepers){n.x=n.originX+Math.sin(i.time*n.speed+n.z)*n.amp;for(let s of i.racers){if(s.seated||s.invuln>0||s.knockCd>0||Math.abs(s.pos.z-n.z)>1.7||Math.abs(s.pos.x-n.x)>n.radius+.85)continue;let r=s.pos.y-(n.y-n.height),o=s.sliding>0?t.slideHeight:1.35;if(r>o||s.pos.y+.2<n.y-.35||s.sliding>0&&n.height>.8)continue;let a=Math.cos(i.time*n.speed+n.z)>=0?1:-1;js(i,s,a*8,3.5,3.2)}}for(let n of i.pendulums){let s=(i.time*n.speed+n.phase)%(Math.PI*2),r=.72,o;s<r?o=1:o=Math.cos((s-r)/(Math.PI*2-r)*Math.PI*2);let a=o*n.amp;n.bobX=n.x+Math.sin(a)*n.len,n.bobY=n.y-Math.cos(a)*n.len,n.bobZ=n.z;let c=Math.cos(i.time*n.speed+n.phase);for(let l of i.racers){if(l.seated||l.invuln>0)continue;Math.hypot(l.pos.x-n.bobX,l.pos.z-n.bobZ)<n.radius+.35&&Math.abs(l.pos.y+.7-n.bobY)<1&&js(i,l,c*9,2,3)}}}function zm(i,e){for(let t of i.rollers){t.x+=t.dir*t.speed*e,t.rot+=e*2.4,t.x>t.x1&&(t.dir=-1),t.x<t.x0&&(t.dir=1);for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+.35&&Math.abs(n.pos.y-t.y)<1.4){let r=s>.05?(n.pos.x-t.x)/s:t.dir;js(i,n,r*10+t.dir*4,2,4.5)}}}for(let t of i.hoppers){if(t.t+=e,!t.hopping&&t.t>t.period){t.t=0,t.hopping=!0,t.vy=8;let n=t.homeX+Math.sin(i.time)*2.5,s=t.homeZ,r=12;for(let l of i.racers){if(l.seated)continue;let u=Math.hypot(l.pos.x-t.x,l.pos.z-t.z);u<r&&(r=u,n=l.pos.x,s=l.pos.z)}let o=n-t.x,a=s-t.z,c=Math.hypot(o,a)||1;t.dirx=o/c,t.dirz=a/c}if(t.hopping&&(t.vy-=18*e,t.y+=t.vy*e,t.x+=t.dirx*4.2*e,t.z+=t.dirz*4.2*e,t.y<=t.homeY)){t.y=t.homeY,t.hopping=!1;for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+.55&&Math.abs(n.pos.y-t.y)<1.3){let r=s>.05?(n.pos.x-t.x)/s:1;js(i,n,r*9,3,5)}}}}for(let t of i.flyers){t.ang+=e*.85,t.x=t.cx+Math.sin(t.ang)*t.span,t.z=t.cz+Math.cos(t.ang)*t.span*.45,t.y=t.cy+Math.sin(t.ang*2)*.7;for(let n of i.racers){if(n.seated)continue;Math.hypot(n.pos.x-t.x,n.pos.z-t.z)<t.radius+.4&&Math.abs(n.pos.y+.8-t.y)<1.1&&js(i,n,Math.cos(t.ang)*8,Math.sin(t.ang)*6,3.4)}}}function Um(i,e){for(let t of i.platforms)if(t.prevX=t.x,t.prevZ=t.z,t.phase+=e*t.speed,t.axis==="x")t.x=t.originX+Math.sin(t.phase)*t.amp;else if(t.axis==="bob"||t.axis==="tilt")t.y=t.originY+Math.sin(t.phase)*t.amp;else if(t.axis==="seesaw"){let n=0,s=0,r=t.face||0;for(let a of i.racers){if(a.seated||a.eliminated||!a.grounded)continue;let c=a.pos.x-t.x,l=a.pos.z-t.z;if(c*c+l*l>t.radius*t.radius||Math.abs(a.pos.y-t.originY)>1.8)continue;let u=c*Math.cos(r)+l*Math.sin(r);n+=Math.max(-1,Math.min(1,u/(t.radius*.65))),s++}let o=s?n/s*.62:0;t.tilt=(t.tilt||0)+(o-(t.tilt||0))*Math.min(1,e*3.2),t.tilt=Math.max(-.5,Math.min(.5,t.tilt)),t.y=t.originY}}function Nm(i,e){let t=i.cfg;if(i.time<t.collapseDelay)return;let n=i.course.ship.z-18,s=1+Math.min(2.4,(i.time||0)/45);i.collapseZ+=i.collapseSpeed*s*e,i.collapseZ>n&&(i.collapseZ=n),i.lavaY=t.lavaStartY+i.time*t.lavaRisePerSec;let r=!1;for(let o of i.course.chunks)if(!(o.zone==="ship"||o.gap)){if(o.state==="solid")i.collapseZ>o.z0&&(o.state="cracking",o.crackT=t.crackTime+o.jitter*.35,o.dirty=!0,r=!0);else if(o.state==="cracking"){if(o.crackT-=e,o.dirty=!0,o.crackT<=0){o.state="falling",o.fallT=t.fallTime;let a=(o.z0+o.z1)*.5,c=i.player.pos.z-a;c*c<420&&(i.shake=Math.max(i.shake,.42))}}else o.state==="falling"&&(o.fallT-=e,o.fallY-=(7+o.jitter*6)*s*e,o.dirty=!0,o.fallT<=0&&(o.state="gone"));o.ice&&(o.tilt=Math.sin(i.time*1.35+o.jitter*8)*.22)}r&&i.events.push({t:"crack"})}function Fm(i,e){let t=null,n=2.1;for(let a of i.racers){if(a===e||a.seated||a.eliminated||a.qualified)continue;let c=Math.hypot(a.pos.x-e.pos.x,a.pos.z-e.pos.z);c<n&&Math.abs(a.pos.y-e.pos.y)<1.6&&(n=c,t=a)}if(t){let a=0;for(let l of i.racers)l!==e&&Math.hypot(l.pos.x-e.pos.x,l.pos.z-e.pos.z)<2.4&&a++;let c=a>=4;t.vel.x*=c?.85:.35,t.vel.z*=c?.85:.35,!c&&t.lockImmune<=0&&!t.isPlayer&&(t.controlLock=Math.min(.6,Math.max(t.controlLock,.25)),t.flail=Math.min(.6,Math.max(t.flail,.3))),t.pos.x+=(e.pos.x-t.pos.x)*.2,t.pos.z+=(e.pos.z-t.pos.z)*.2,i.events.push({t:"grab",id:e.id});return}let s=e.pos.x+Math.sin(e.yaw)*1.2,r=e.pos.z+Math.cos(e.yaw)*1.2,o=ni(i.course,s,r);if(o&&o.y>e.pos.y+.45&&o.y<e.pos.y+1.9){e.pos.x=s,e.pos.z=r,e.pos.y=o.y,e.vel.y=3.2,e.grounded=!0,i.events.push({t:"grab",id:e.id,ledge:!0});return}for(let a of i.crates||[])if(Math.hypot(a.x-e.pos.x,a.z-e.pos.z)<1.8&&Math.abs(a.y-e.pos.y)<2){a.x+=Math.sin(e.yaw)*1.1,a.z+=Math.cos(e.yaw)*1.1,a.vx+=Math.sin(e.yaw)*4,a.vz+=Math.cos(e.yaw)*4,i.events.push({t:"grab",id:e.id,prop:!0});return}}function km(i){for(let e of i.crates||[]){e.vx*=.9,e.vz*=.9,e.x+=e.vx*.016,e.z+=e.vz*.016;let t=ni(i.course,e.x,e.z);t&&(e.y=t.y+.45);for(let n of i.racers){if(n.seated||n.eliminated)continue;let s=e.x-n.pos.x,r=e.z-n.pos.z,o=Math.hypot(s,r);if(o>1.15||o<.001||Math.abs((e.y||0)-n.pos.y)>1.8)continue;let a=s/o,c=r/o;e.vx+=n.vel.x*.4+a*1.5,e.vz+=n.vel.z*.4+c*1.5,e.x+=a*(1.15-o),e.z+=c*(1.15-o)}}}function mf(i){i.phase="results",i.result="out",i.player.seated=!1,i.events.push({t:"eliminated"})}function Om(i,e){if(e.pos.y<-6)return!1;let t=i.gate;if(!t)return!1;let n=t.rx||4.5,s=t.rz||1.4;if(Math.abs(e.pos.x-t.x)>n||Math.abs(e.pos.y-(t.y==null?0:t.y))>1.7)return!1;let r=e.prevZ==null?e.pos.z:e.prevZ,o=r<t.z&&e.pos.z>=t.z-.15,a=e.pos.z>=t.z-s&&e.pos.z<=t.z+s&&r<t.z;return o||a}function Vc(i){i.phase="results",i.result=i.player.qualified?"qualified":"out",i.player.qualified||(i.player.seated=!1),i.events.push({t:i.player.qualified?"roundwin":"eliminated"})}function Bm(i){if(i.kind!=="survival"||i.phase!=="race")return;let e=i.racers.filter(t=>!t.eliminated&&!t.qualified);if(!(e.length>i.qualifyN||e.length===0)){for(let t of e)t.qualified=!0,i.qualCount++,i.events.push({t:"qualify",id:t.id});Vc(i)}}function Hm(i,e){if(i.kind!=="crown"||i.phase!=="race"||!i.crown)return;let t=i.crown,n=null,s=t.r*t.r;for(let r of i.racers){if(r.eliminated||r.qualified)continue;let o=r.pos.x-t.x,a=r.pos.z-t.z,c=o*o+a*a;c<=s&&Math.abs(r.pos.y-(t.y||0))<3.2&&(s=c,n=r)}i.crownHolder=n?n.id:-1;for(let r of i.racers)r===n?r.crownT=(r.crownT||0)+e:r.crownT=Math.max(0,(r.crownT||0)-e*.35),(r.crownT||0)>=5&&!r.qualified&&!r.eliminated&&(r.qualified=!0,r.crownT=0,i.qualCount++,i.events.push({t:"qualify",id:r.id}));i.qualifyN>0&&i.qualCount>=i.qualifyN&&Vc(i)}function Gm(i){if(!(i.shipRound||i.phase!=="race")&&!(i.kind==="survival"||i.kind==="crown")&&!(!i.gate&&i.finishZ==null)){for(let e of i.racers)e.qualified||e.eliminated||e.seated||Om(i,e)&&(e.qualified=!0,i.qualCount++,i.events.push({t:"qualify",id:e.id}));i.qualifyN>0&&i.qualCount>=i.qualifyN&&Vc(i)}}function Vm(i){if(!i.shipRound||i.seatsFilled>=i.cfg.seats)return;let e=i.course.ship,t=i.cfg,n=[];for(let s of i.racers){if(s.seated||s.eliminated||!s.grounded)continue;let r=s.pos.x-e.x,o=s.pos.z-e.z;Math.abs(r)<t.boardHalfX&&o<t.boardZMax&&o>t.boardZMin&&Math.abs(s.pos.y-e.y)<1.8&&n.push({r:s,d:r*r+o*o})}n.sort((s,r)=>s.d-r.d||(s.r.isPlayer?-1:1)-(r.r.isPlayer?-1:1));for(let s of n){if(i.seatsFilled>=t.seats)break;let r=s.r,o=i.seatsFilled;i.seats[o]=r.id,i.seatsFilled++,r.seated=!0,r.seatIndex=o,r.vel.x=r.vel.y=r.vel.z=0,r.emote="cheer",r.isPlayer&&(i.seatCine=1.85),i.events.push({t:"seat",id:r.id,seat:o,pop:!0}),i.seatsFilled===t.seats-1&&!i.lastSeatEvent&&(i.lastSeatEvent=!0,i.events.push({t:"lastseat"}))}}function ff(i){if(!i.player.seated){mf(i);return}i.phase="launch",i.launchT=0,i.launchV=1.5,i.seatCine=0,i.result="escaped",i.events.push({t:"launch"}),i.events.push({t:"escaped",time:i.time}),i.shake=.65}function Wm(i,e,t){if(!e.useAI||e.seated||e.eliminated||e.qualified)return;if(e.markZ==null){e.markX=e.pos.x,e.markZ=e.pos.z,e.stallT=0;return}if(Math.hypot(e.pos.x-e.markX,e.pos.z-e.markZ)>1.25||e.pos.z>e.markZ+.9){e.stallT=0,e.stallTries=0,e.markX=e.pos.x,e.markZ=e.pos.z;return}if(e.stallT=(e.stallT||0)+t,e.stallT<3)return;e.stallT=0,e.routeId=((e.routeId||0)+1)%3,e.wp=0;let s=i.course.routes&&i.course.routes[e.routeId]||i.course.waypoints;for(;e.wp<s.length-1&&s[e.wp].z<e.pos.z+1;)e.wp++;e.stallTries=(e.stallTries||0)+1,e.markX=e.pos.x,e.markZ=e.pos.z,e.stallTries>=2&&(e.stallTries=0,Wo(i,e))}function gf(i,e,t){let n=i.cfg;if(i.events.length>80&&i.events.splice(0,i.events.length-80),i.phase==="countdown"){i.countClock+=e;let s=i.countClock<1?3:i.countClock<2?2:i.countClock<3?1:0;s!==i.countCue&&(i.countCue=s,i.events.push({t:s===0?"go":"tick",n:s})),i.countClock>=n.countdownBeats+n.goHold&&(i.phase="race",i.activated=!0,i.time=0);return}if(i.phase==="race"){i.activated=!0,i.time+=e,i.seatCine>0&&(i.seatCine-=e),Um(i,e),Nm(i,e);for(let o of i.racers)if(!(o.seated||o.eliminated))try{let a=o.isPlayer&&!o.useAI?t||{x:0,z:0,jump:!1,dive:!1}:Pm(i,o,e);Im(i,o,a,e),Wm(i,o,e)}catch(a){o.controlLock=0,o.flail=0,o.grabT=0,i.fault||(i.fault=a&&a.message||String(a),i.events.push({t:"error",message:i.fault}))}Lm(i);let s=i.course.coins;if(s){let o=i.player;for(let a=0;a<s.length;a++){let c=s[a];if(c.got||o.seated)continue;let l=o.pos.x-c.x,u=o.pos.z-c.z;l*l+u*u>1.6||Math.abs(o.pos.y+.8-c.y)>1.5||(c.got=!0,i.coins++,i.events.push({t:"coin",n:i.coins}))}}if(Dm(i,e),zm(i,e),Vm(i),km(i),i.kind==="survival"&&i.phase==="race"){let o=Math.sin(i.time*.7)*6;for(let a of i.racers)!a.eliminated&&!a.seated&&(a.vel.x+=o*e)}Gm(i),Bm(i),Hm(i,e);let r=Xm(i,i.player.pos.z);if(r&&r!==i.zoneId){i.zoneId=r;let o=i.course.zones.find(a=>a.id===r);o&&i.events.push({t:"zone",name:o.name})}i.phase==="race"&&i.shipRound&&i.forceLaunch&&i.player.seated?ff(i):i.phase==="race"&&i.shipRound&&(i.seatsFilled>=n.seats||i.time>=n.raceSeconds)?i.player.seated?ff(i):mf(i):i.phase==="race"&&!i.shipRound&&i.time>=n.raceSeconds&&(i.phase="results",i.result=i.player.qualified?"qualified":"out",i.player.qualified||(i.player.seated=!1),i.events.push({t:i.player.qualified?"roundwin":"eliminated"})),i.shake>0&&(i.shake=Math.max(0,i.shake-e*1.5));return}(i.phase==="launch"||i.phase==="results"&&i.result==="escaped")&&(i.launchT+=e,i.launchV+=4.5*e,i.launchY+=i.launchV*e,i.shipY=i.course.ship.y+i.launchY,i.player.emote==="wave"&&(i.player.waveT=(i.player.waveT||0)+e,i.player.waveT>.7&&i.player.waveT<2.2&&(i.player.emote="cheer"),i.player.waveT>=2.2&&(i.player.emote="idle")),i.phase==="launch"&&i.launchT>1.25&&(i.phase="results"),i.shake>0&&(i.shake=Math.max(0,i.shake-e*.7)))}function Xm(i,e){let t=i.course.zones[0].id;for(let n of i.course.zones)e>=n.z0&&(t=n.id);return t}var Fu="170";var qm=0,xf=1,Ym=2;var Nd=1,ku=2,Si=3,Bn=0,rn=1,Dt=2,Zi=0,br=1,Mr=2,bf=3,yf=4,jm=5,Es=100,Zm=101,Km=102,Jm=103,Qm=104,$m=200,eg=201,tg=202,ng=203,Sl=204,El=205,ig=206,sg=207,rg=208,og=209,ag=210,cg=211,lg=212,ug=213,hg=214,wl=0,Tl=1,Al=2,Sr=3,Rl=4,Cl=5,Il=6,Pl=7,Ou=0,fg=1,dg=2,Ki=0,pg=1,mg=2,gg=3,Bu=4,xg=5,bg=6,yg=7,vf="attached",vg="detached",Fd=300,Er=301,wr=302,Ll=303,Dl=304,sc=306,Ts=1e3,wi=1001,mo=1002,on=1003,Hu=1004;var pr=1005;var vn=1006,uo=1007;var Yn=1008;var Ri=1009,kd=1010,Od=1011,go=1012,Gu=1013,As=1014,ai=1015,Ro=1016,Vu=1017,Wu=1018,Tr=1020,Bd=35902,Hd=1021,Gd=1022,jn=1023,Vd=1024,Wd=1025,yr=1026,Ar=1027,Xu=1028,qu=1029,Xd=1030,Yu=1031;var ju=1033,Sa=33776,Ea=33777,wa=33778,Ta=33779,zl=35840,Ul=35841,Nl=35842,Fl=35843,kl=36196,Ol=37492,Bl=37496,Hl=37808,Gl=37809,Vl=37810,Wl=37811,Xl=37812,ql=37813,Yl=37814,jl=37815,Zl=37816,Kl=37817,Jl=37818,Ql=37819,$l=37820,eu=37821,Aa=36492,tu=36494,nu=36495,qd=36283,iu=36284,su=36285,ru=36286,Zu=2200,Ku=2201,_g=2202,Rr=2300,Cr=2301,Wc=2302,mr=2400,gr=2401,Ra=2402,Ju=2500,Mg=2501,Yd=0,rc=1,Co=2,Sg=3200,Eg=3201;var oc=0,wg=1,di="",Xt="srgb",dn="srgb-linear",ac="linear",Lt="srgb";var Zs=7680;var _f=519,Tg=512,Ag=513,Rg=514,jd=515,Cg=516,Ig=517,Pg=518,Lg=519,ou=35044,Zd=35048;var Mf="300 es",Ti=2e3,Ca=2001,Ci=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sf=1234567,ho=Math.PI/180,Ir=180/Math.PI;function ci(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xn[i&255]+xn[i>>8&255]+xn[i>>16&255]+xn[i>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]).toLowerCase()}function yn(i,e,t){return Math.max(e,Math.min(t,i))}function Qu(i,e){return(i%e+e)%e}function Dg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function zg(i,e,t){return i!==e?(t-i)/(e-i):0}function fo(i,e,t){return(1-t)*i+t*e}function Ug(i,e,t,n){return fo(i,e,1-Math.exp(-t*n))}function Ng(i,e=1){return e-Math.abs(Qu(i,e*2)-e)}function Fg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function kg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Og(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Bg(i,e){return i+Math.random()*(e-i)}function Hg(i){return i*(.5-Math.random())}function Gg(i){i!==void 0&&(Sf=i);let e=Sf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Vg(i){return i*ho}function Wg(i){return i*Ir}function Xg(i){return(i&i-1)===0&&i!==0}function qg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Yg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function jg(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*h,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function oi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Kd={DEG2RAD:ho,RAD2DEG:Ir,generateUUID:ci,clamp:yn,euclideanModulo:Qu,mapLinear:Dg,inverseLerp:zg,lerp:fo,damp:Ug,pingpong:Ng,smoothstep:Fg,smootherstep:kg,randInt:Og,randFloat:Bg,randFloatSpread:Hg,seededRandom:Gg,degToRad:Vg,radToDeg:Wg,isPowerOfTwo:Xg,ceilPowerOfTwo:qg,floorPowerOfTwo:Yg,setQuaternionFromProperEuler:jg,normalize:Ct,denormalize:oi},qe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(yn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},st=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],p=n[5],g=n[8],b=s[0],m=s[3],d=s[6],_=s[1],v=s[4],y=s[7],R=s[2],T=s[5],I=s[8];return r[0]=o*b+a*_+c*R,r[3]=o*m+a*v+c*T,r[6]=o*d+a*y+c*I,r[1]=l*b+u*_+h*R,r[4]=l*m+u*v+h*T,r[7]=l*d+u*y+h*I,r[2]=f*b+p*_+g*R,r[5]=f*m+p*v+g*T,r[8]=f*d+p*y+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*r,p=l*r-o*c,g=t*h+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/g;return e[0]=h*b,e[1]=(s*l-u*n)*b,e[2]=(a*n-s*o)*b,e[3]=f*b,e[4]=(u*t-s*c)*b,e[5]=(s*r-a*t)*b,e[6]=p*b,e[7]=(n*c-l*t)*b,e[8]=(o*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Xc.makeScale(e,t)),this}rotate(e){return this.premultiply(Xc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Xc=new st;function Jd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function xo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Zg(){let i=xo("canvas");return i.style.display="block",i}var Ef={};function co(i){i in Ef||(Ef[i]=!0,console.warn(i))}function Kg(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Jg(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Qg(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var gt={enabled:!0,workingColorSpace:dn,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Lt&&(i.r=Ai(i.r),i.g=Ai(i.g),i.b=Ai(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Lt&&(i.r=vr(i.r),i.g=vr(i.g),i.b=vr(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===di?ac:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var wf=[.64,.33,.3,.6,.15,.06],Tf=[.2126,.7152,.0722],Af=[.3127,.329],Rf=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cf=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);gt.define({[dn]:{primaries:wf,whitePoint:Af,transfer:ac,toXYZ:Rf,fromXYZ:Cf,luminanceCoefficients:Tf,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:wf,whitePoint:Af,transfer:Lt,toXYZ:Rf,fromXYZ:Cf,luminanceCoefficients:Tf,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}});var Ks,au=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ks===void 0&&(Ks=xo("canvas")),Ks.width=e.width,Ks.height=e.height;let n=Ks.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ks}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=xo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ai(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ai(t[n]/255)*255):t[n]=Ai(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},$g=0,Ia=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$g++}),this.uuid=ci(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(qc(s[o].image)):r.push(qc(s[o]))}else r=qc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function qc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?au.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var e0=0,hn=class i extends Ci{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=wi,s=wi,r=vn,o=Yn,a=jn,c=Ri,l=i.DEFAULT_ANISOTROPY,u=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:e0++}),this.uuid=ci(),this.name="",this.source=new Ia(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ts:e.x=e.x-Math.floor(e.x);break;case wi:e.x=e.x<0?0:1;break;case mo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ts:e.y=e.y-Math.floor(e.y);break;case wi:e.y=e.y<0?0:1;break;case mo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=Fd;hn.DEFAULT_ANISOTROPY=1;var Tt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],p=c[5],g=c[9],b=c[2],m=c[6],d=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-b)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+b)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,y=(p+1)/2,R=(d+1)/2,T=(u+f)/4,I=(h+b)/4,w=(g+m)/4;return v>y&&v>R?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=I/n):y>R?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=w/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=I/r,s=w/r),this.set(n,s,r,t),this}let _=Math.sqrt((m-g)*(m-g)+(h-b)*(h-b)+(f-u)*(f-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(h-b)/_,this.z=(f-u)/_,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},cu=class extends Ci{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new hn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Ia(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zn=class extends cu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Pa=class extends hn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var lu=class extends hn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Dn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3],f=r[o+0],p=r[o+1],g=r[o+2],b=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=b;return}if(h!==b||c!==f||l!==p||u!==g){let m=1-a,d=c*f+l*p+u*g+h*b,_=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){let R=Math.sqrt(v),T=Math.atan2(R,d*_);m=Math.sin(m*T)/R,a=Math.sin(a*T)/R}let y=a*_;if(c=c*m+f*y,l=l*m+p*y,u=u*m+g*y,h=h*m+b*y,m===1-a){let R=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=R,l*=R,u*=R,h*=R}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*p-l*f,e[t+1]=c*g+u*f+l*h-a*p,e[t+2]=l*g+u*p+a*f-c*h,e[t+3]=u*g-a*h-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),f=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"YZX":this._x=f*u*h+l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h-f*p*g;break;case"XZY":this._x=f*u*h-l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>h){let p=2*Math.sqrt(1+n-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>h){let p=2*Math.sqrt(1+a-n-h);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+h-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(If.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(If.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yc.copy(this).projectOnVector(e),this.sub(Yc)}reflect(e){return this.sub(Yc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(yn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Yc=new k,If=new Dn,Qt=class{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ii):ii.fromBufferAttribute(r,o),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yo.copy(n.boundingBox)),Yo.applyMatrix4(e.matrixWorld),this.union(Yo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Jr),jo.subVectors(this.max,Jr),Js.subVectors(e.a,Jr),Qs.subVectors(e.b,Jr),$s.subVectors(e.c,Jr),Hi.subVectors(Qs,Js),Gi.subVectors($s,Qs),xs.subVectors(Js,$s);let t=[0,-Hi.z,Hi.y,0,-Gi.z,Gi.y,0,-xs.z,xs.y,Hi.z,0,-Hi.x,Gi.z,0,-Gi.x,xs.z,0,-xs.x,-Hi.y,Hi.x,0,-Gi.y,Gi.x,0,-xs.y,xs.x,0];return!jc(t,Js,Qs,$s,jo)||(t=[1,0,0,0,1,0,0,0,1],!jc(t,Js,Qs,$s,jo))?!1:(Zo.crossVectors(Hi,Gi),t=[Zo.x,Zo.y,Zo.z],jc(t,Js,Qs,$s,jo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},xi=[new k,new k,new k,new k,new k,new k,new k,new k],ii=new k,Yo=new Qt,Js=new k,Qs=new k,$s=new k,Hi=new k,Gi=new k,xs=new k,Jr=new k,jo=new k,Zo=new k,bs=new k;function jc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){bs.fromArray(i,r);let a=s.x*Math.abs(bs.x)+s.y*Math.abs(bs.y)+s.z*Math.abs(bs.z),c=e.dot(bs),l=t.dot(bs),u=n.dot(bs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var t0=new Qt,Qr=new k,Zc=new k,Hn=class{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):t0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qr.subVectors(e,this.center);let t=Qr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qr.copy(e.center).add(Zc)),this.expandByPoint(Qr.copy(e.center).sub(Zc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},bi=new k,Kc=new k,Ko=new k,Vi=new k,Jc=new k,Jo=new k,Qc=new k,Rs=class{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,t),bi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Kc.copy(e).add(t).multiplyScalar(.5),Ko.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub(Kc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ko),a=Vi.dot(this.direction),c=-Vi.dot(Ko),l=Vi.lengthSq(),u=Math.abs(1-o*o),h,f,p,g;if(u>0)if(h=o*c-a,f=o*a-c,g=r*u,h>=0)if(f>=-g)if(f<=g){let b=1/u;h*=b,f*=b,p=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Kc).addScaledVector(Ko,f),p}intersectSphere(e,t){bi.subVectors(e.center,this.origin);let n=bi.dot(this.direction),s=bi.dot(bi)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,t,n,s,r){Jc.subVectors(t,e),Jo.subVectors(n,e),Qc.crossVectors(Jc,Jo);let o=this.direction.dot(Qc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Vi.subVectors(this.origin,e);let c=a*this.direction.dot(Jo.crossVectors(Vi,Jo));if(c<0)return null;let l=a*this.direction.dot(Jc.cross(Vi));if(l<0||c+l>o)return null;let u=-a*Vi.dot(Qc);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},nt=class i{constructor(e,t,n,s,r,o,a,c,l,u,h,f,p,g,b,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,h,f,p,g,b,m)}set(e,t,n,s,r,o,a,c,l,u,h,f,p,g,b,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=b,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/er.setFromMatrixColumn(e,0).length(),r=1/er.setFromMatrixColumn(e,1).length(),o=1/er.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=o*u,p=o*h,g=a*u,b=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+g*l,t[5]=f-b*l,t[9]=-a*c,t[2]=b-f*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,p=c*h,g=l*u,b=l*h;t[0]=f+b*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-g,t[6]=b+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,p=c*h,g=l*u,b=l*h;t[0]=f-b*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*u,t[9]=b-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,p=o*h,g=a*u,b=a*h;t[0]=c*u,t[4]=g*l-p,t[8]=f*l+b,t[1]=c*h,t[5]=b*l+f,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,p=o*l,g=a*c,b=a*l;t[0]=c*u,t[4]=b-f*h,t[8]=g*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*h+g,t[10]=f-b*h}else if(e.order==="XZY"){let f=o*c,p=o*l,g=a*c,b=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+b,t[5]=o*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*u,t[10]=b*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(n0,e,i0)}lookAt(e,t,n){let s=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),Wi.crossVectors(n,kn),Wi.lengthSq()===0&&(Math.abs(n.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),Wi.crossVectors(n,kn)),Wi.normalize(),Qo.crossVectors(kn,Wi),s[0]=Wi.x,s[4]=Qo.x,s[8]=kn.x,s[1]=Wi.y,s[5]=Qo.y,s[9]=kn.y,s[2]=Wi.z,s[6]=Qo.z,s[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],p=n[13],g=n[2],b=n[6],m=n[10],d=n[14],_=n[3],v=n[7],y=n[11],R=n[15],T=s[0],I=s[4],w=s[8],M=s[12],S=s[1],z=s[5],W=s[9],X=s[13],j=s[2],J=s[6],ee=s[10],le=s[14],Q=s[3],ye=s[7],me=s[11],ve=s[15];return r[0]=o*T+a*S+c*j+l*Q,r[4]=o*I+a*z+c*J+l*ye,r[8]=o*w+a*W+c*ee+l*me,r[12]=o*M+a*X+c*le+l*ve,r[1]=u*T+h*S+f*j+p*Q,r[5]=u*I+h*z+f*J+p*ye,r[9]=u*w+h*W+f*ee+p*me,r[13]=u*M+h*X+f*le+p*ve,r[2]=g*T+b*S+m*j+d*Q,r[6]=g*I+b*z+m*J+d*ye,r[10]=g*w+b*W+m*ee+d*me,r[14]=g*M+b*X+m*le+d*ve,r[3]=_*T+v*S+y*j+R*Q,r[7]=_*I+v*z+y*J+R*ye,r[11]=_*w+v*W+y*ee+R*me,r[15]=_*M+v*X+y*le+R*ve,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],p=e[14],g=e[3],b=e[7],m=e[11],d=e[15];return g*(+r*c*h-s*l*h-r*a*f+n*l*f+s*a*p-n*c*p)+b*(+t*c*p-t*l*f+r*o*f-s*o*p+s*l*u-r*c*u)+m*(+t*l*h-t*a*p-r*o*h+n*o*p+r*a*u-n*l*u)+d*(-s*a*u-t*c*h+t*a*f+s*o*h-n*o*f+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],p=e[11],g=e[12],b=e[13],m=e[14],d=e[15],_=h*m*l-b*f*l+b*c*p-a*m*p-h*c*d+a*f*d,v=g*f*l-u*m*l-g*c*p+o*m*p+u*c*d-o*f*d,y=u*b*l-g*h*l+g*a*p-o*b*p-u*a*d+o*h*d,R=g*h*c-u*b*c-g*a*f+o*b*f+u*a*m-o*h*m,T=t*_+n*v+s*y+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/T;return e[0]=_*I,e[1]=(b*f*r-h*m*r-b*s*p+n*m*p+h*s*d-n*f*d)*I,e[2]=(a*m*r-b*c*r+b*s*l-n*m*l-a*s*d+n*c*d)*I,e[3]=(h*c*r-a*f*r-h*s*l+n*f*l+a*s*p-n*c*p)*I,e[4]=v*I,e[5]=(u*m*r-g*f*r+g*s*p-t*m*p-u*s*d+t*f*d)*I,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*d-t*c*d)*I,e[7]=(o*f*r-u*c*r+u*s*l-t*f*l-o*s*p+t*c*p)*I,e[8]=y*I,e[9]=(g*h*r-u*b*r-g*n*p+t*b*p+u*n*d-t*h*d)*I,e[10]=(o*b*r-g*a*r+g*n*l-t*b*l-o*n*d+t*a*d)*I,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*p-t*a*p)*I,e[12]=R*I,e[13]=(u*b*s-g*h*s+g*n*f-t*b*f-u*n*m+t*h*m)*I,e[14]=(g*a*s-o*b*s-g*n*c+t*b*c+o*n*m-t*a*m)*I,e[15]=(o*h*s-u*a*s+u*n*c-t*h*c-o*n*f+t*a*f)*I,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,f=r*l,p=r*u,g=r*h,b=o*u,m=o*h,d=a*h,_=c*l,v=c*u,y=c*h,R=n.x,T=n.y,I=n.z;return s[0]=(1-(b+d))*R,s[1]=(p+y)*R,s[2]=(g-v)*R,s[3]=0,s[4]=(p-y)*T,s[5]=(1-(f+d))*T,s[6]=(m+_)*T,s[7]=0,s[8]=(g+v)*I,s[9]=(m-_)*I,s[10]=(1-(f+b))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=er.set(s[0],s[1],s[2]).length(),o=er.set(s[4],s[5],s[6]).length(),a=er.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],si.copy(this);let l=1/r,u=1/o,h=1/a;return si.elements[0]*=l,si.elements[1]*=l,si.elements[2]*=l,si.elements[4]*=u,si.elements[5]*=u,si.elements[6]*=u,si.elements[8]*=h,si.elements[9]*=h,si.elements[10]*=h,t.setFromRotationMatrix(si),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Ti){let c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s),p,g;if(a===Ti)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ca)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Ti){let c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(o-r),f=(t+e)*l,p=(n+s)*u,g,b;if(a===Ti)g=(o+r)*h,b=-2*h;else if(a===Ca)g=r*h,b=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=b,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},er=new k,si=new nt,n0=new k(0,0,0),i0=new k(1,1,1),Wi=new k,Qo=new k,kn=new k,Pf=new nt,Lf=new Dn,li=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(yn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-yn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(yn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-yn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(yn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-yn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Pf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lf.setFromEuler(this),this.setFromQuaternion(Lf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};li.DEFAULT_ORDER="XYZ";var bo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},s0=0,Df=new k,tr=new Dn,yi=new nt,$o=new k,$r=new k,r0=new k,o0=new Dn,zf=new k(1,0,0),Uf=new k(0,1,0),Nf=new k(0,0,1),Ff={type:"added"},a0={type:"removed"},nr={type:"childadded",child:null},$c={type:"childremoved",child:null},at=class i extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new k,t=new li,n=new Dn,s=new k(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new nt},normalMatrix:{value:new st}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.multiply(tr),this}rotateOnWorldAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.premultiply(tr),this}rotateX(e){return this.rotateOnAxis(zf,e)}rotateY(e){return this.rotateOnAxis(Uf,e)}rotateZ(e){return this.rotateOnAxis(Nf,e)}translateOnAxis(e,t){return Df.copy(e).applyQuaternion(this.quaternion),this.position.add(Df.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zf,e)}translateY(e){return this.translateOnAxis(Uf,e)}translateZ(e){return this.translateOnAxis(Nf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$o.copy(e):$o.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),$r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt($r,$o,this.up):yi.lookAt($o,$r,this.up),this.quaternion.setFromRotationMatrix(yi),s&&(yi.extractRotation(s.matrixWorld),tr.setFromRotationMatrix(yi),this.quaternion.premultiply(tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ff),nr.child=e,this.dispatchEvent(nr),nr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(a0),$c.child=e,this.dispatchEvent($c),$c.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ff),nr.child=e,this.dispatchEvent(nr),nr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,e,r0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($r,o0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};at.DEFAULT_UP=new k(0,1,0);at.DEFAULT_MATRIX_AUTO_UPDATE=!0;at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ri=new k,vi=new k,el=new k,_i=new k,ir=new k,sr=new k,kf=new k,tl=new k,nl=new k,il=new k,sl=new Tt,rl=new Tt,ol=new Tt,Yi=class i{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ri.subVectors(e,t),s.cross(ri);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ri.subVectors(s,t),vi.subVectors(n,t),el.subVectors(e,t);let o=ri.dot(ri),a=ri.dot(vi),c=ri.dot(el),l=vi.dot(vi),u=vi.dot(el),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let f=1/h,p=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,_i.x),c.addScaledVector(o,_i.y),c.addScaledVector(a,_i.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return sl.setScalar(0),rl.setScalar(0),ol.setScalar(0),sl.fromBufferAttribute(e,t),rl.fromBufferAttribute(e,n),ol.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(sl,r.x),o.addScaledVector(rl,r.y),o.addScaledVector(ol,r.z),o}static isFrontFacing(e,t,n,s){return ri.subVectors(n,t),vi.subVectors(e,t),ri.cross(vi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ri.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),ri.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;ir.subVectors(s,n),sr.subVectors(r,n),tl.subVectors(e,n);let c=ir.dot(tl),l=sr.dot(tl);if(c<=0&&l<=0)return t.copy(n);nl.subVectors(e,s);let u=ir.dot(nl),h=sr.dot(nl);if(u>=0&&h<=u)return t.copy(s);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(ir,o);il.subVectors(e,r);let p=ir.dot(il),g=sr.dot(il);if(g>=0&&p<=g)return t.copy(r);let b=p*l-c*g;if(b<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(sr,a);let m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return kf.subVectors(r,s),a=(h-u)/(h-u+(p-g)),t.copy(s).addScaledVector(kf,a);let d=1/(m+b+f);return o=b*d,a=f*d,t.copy(n).addScaledVector(ir,o).addScaledVector(sr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},ea={h:0,s:0,l:0};function al(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Le=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,gt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=gt.workingColorSpace){if(e=Qu(e,1),t=yn(t,0,1),n=yn(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=al(o,r,e+1/3),this.g=al(o,r,e),this.b=al(o,r,e-1/3)}return gt.toWorkingColorSpace(this,s),this}setStyle(e,t=Xt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){let n=Qd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}copyLinearToSRGB(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return gt.fromWorkingColorSpace(bn.copy(this),e),Math.round(yn(bn.r*255,0,255))*65536+Math.round(yn(bn.g*255,0,255))*256+Math.round(yn(bn.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.fromWorkingColorSpace(bn.copy(this),t);let n=bn.r,s=bn.g,r=bn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=gt.workingColorSpace){return gt.fromWorkingColorSpace(bn.copy(this),t),e.r=bn.r,e.g=bn.g,e.b=bn.b,e}getStyle(e=Xt){gt.fromWorkingColorSpace(bn.copy(this),e);let t=bn.r,n=bn.g,s=bn.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+t,Xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xi),e.getHSL(ea);let n=fo(Xi.h,ea.h,t),s=fo(Xi.s,ea.s,t),r=fo(Xi.l,ea.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},bn=new Le;Le.NAMES=Qd;var c0=0,_n=class extends Ci{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:c0++}),this.uuid=ci(),this.name="",this.blending=br,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sl,this.blendDst=El,this.blendEquation=Es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_f,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zs,this.stencilZFail=Zs,this.stencilZPass=Zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==br&&(n.blending=this.blending),this.side!==Bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Sl&&(n.blendSrc=this.blendSrc),this.blendDst!==El&&(n.blendDst=this.blendDst),this.blendEquation!==Es&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_f&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Qe=class extends _n{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=Ou,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Jt=new k,ta=new qe,zt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ou,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ta.fromBufferAttribute(this,t),ta.applyMatrix3(e),this.setXY(t,ta.x,ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=oi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ou&&(e.usage=this.usage),e}};var La=class extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Da=class extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ft=class extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},l0=0,qn=new nt,cl=new at,rr=new k,On=new Qt,eo=new Qt,un=new k,kt=class i extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:l0++}),this.uuid=ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jd(e)?Da:La)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,t,n){return qn.makeTranslation(e,t,n),this.applyMatrix4(qn),this}scale(e,t,n){return qn.makeScale(e,t,n),this.applyMatrix4(qn),this}lookAt(e){return cl.lookAt(e),cl.updateMatrix(),this.applyMatrix4(cl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rr).negate(),this.translate(rr.x,rr.y,rr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ft(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];On.setFromBufferAttribute(r),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){let n=this.boundingSphere.center;if(On.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];eo.setFromBufferAttribute(a),this.morphTargetsRelative?(un.addVectors(On.min,eo.min),On.expandByPoint(un),un.addVectors(On.max,eo.max),On.expandByPoint(un)):(On.expandByPoint(eo.min),On.expandByPoint(eo.max))}On.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)un.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(un));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)un.fromBufferAttribute(a,l),c&&(rr.fromBufferAttribute(e,l),un.add(rr)),s=Math.max(s,n.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let w=0;w<n.count;w++)a[w]=new k,c[w]=new k;let l=new k,u=new k,h=new k,f=new qe,p=new qe,g=new qe,b=new k,m=new k;function d(w,M,S){l.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,S),f.fromBufferAttribute(r,w),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,S),u.sub(l),h.sub(l),p.sub(f),g.sub(f);let z=1/(p.x*g.y-g.x*p.y);isFinite(z)&&(b.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(z),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(z),a[w].add(b),a[M].add(b),a[S].add(b),c[w].add(m),c[M].add(m),c[S].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let w=0,M=_.length;w<M;++w){let S=_[w],z=S.start,W=S.count;for(let X=z,j=z+W;X<j;X+=3)d(e.getX(X+0),e.getX(X+1),e.getX(X+2))}let v=new k,y=new k,R=new k,T=new k;function I(w){R.fromBufferAttribute(s,w),T.copy(R);let M=a[w];v.copy(M),v.sub(R.multiplyScalar(R.dot(M))).normalize(),y.crossVectors(T,M);let z=y.dot(c[w])<0?-1:1;o.setXYZW(w,v.x,v.y,v.z,z)}for(let w=0,M=_.length;w<M;++w){let S=_[w],z=S.start,W=S.count;for(let X=z,j=z+W;X<j;X+=3)I(e.getX(X+0)),I(e.getX(X+1)),I(e.getX(X+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new k,r=new k,o=new k,a=new k,c=new k,l=new k,u=new k,h=new k;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),b=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,b),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)un.fromBufferAttribute(e,t),un.normalize(),e.setXYZ(t,un.x,un.y,un.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u),p=0,g=0;for(let b=0,m=c.length;b<m;b++){a.isInterleavedBufferAttribute?p=c[b]*a.data.stride+a.offset:p=c[b]*u;for(let d=0;d<u;d++)f[g++]=l[p++]}return new zt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){let f=l[u],p=e(f,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Of=new nt,ys=new Rs,na=new Hn,Bf=new k,ia=new k,sa=new k,ra=new k,ll=new k,oa=new k,Hf=new k,aa=new k,be=class extends at{constructor(e=new kt,t=new Qe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){oa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],h=r[c];u!==0&&(ll.fromBufferAttribute(h,e),o?oa.addScaledVector(ll,u):oa.addScaledVector(ll.sub(t),u))}t.add(oa)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(r),ys.copy(e.ray).recast(e.near),!(na.containsPoint(ys.origin)===!1&&(ys.intersectSphere(na,Bf)===null||ys.origin.distanceToSquared(Bf)>(e.far-e.near)**2))&&(Of.copy(r).invert(),ys.copy(e.ray).applyMatrix4(Of),!(n.boundingBox!==null&&ys.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ys)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,b=f.length;g<b;g++){let m=f[g],d=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,R=v;y<R;y+=3){let T=a.getX(y),I=a.getX(y+1),w=a.getX(y+2);s=ca(this,d,e,n,l,u,h,T,I,w),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),b=Math.min(a.count,p.start+p.count);for(let m=g,d=b;m<d;m+=3){let _=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);s=ca(this,o,e,n,l,u,h,_,v,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,b=f.length;g<b;g++){let m=f[g],d=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,R=v;y<R;y+=3){let T=y,I=y+1,w=y+2;s=ca(this,d,e,n,l,u,h,T,I,w),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=g,d=b;m<d;m+=3){let _=m,v=m+1,y=m+2;s=ca(this,o,e,n,l,u,h,_,v,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function u0(i,e,t,n,s,r,o,a){let c;if(e.side===rn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Bn,a),c===null)return null;aa.copy(a),aa.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(aa);return l<t.near||l>t.far?null:{distance:l,point:aa.clone(),object:i}}function ca(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,ia),i.getVertexPosition(c,sa),i.getVertexPosition(l,ra);let u=u0(i,e,t,n,ia,sa,ra,Hf);if(u){let h=new k;Yi.getBarycoord(Hf,ia,sa,ra,h),s&&(u.uv=Yi.getInterpolatedAttribute(s,a,c,l,h,new qe)),r&&(u.uv1=Yi.getInterpolatedAttribute(r,a,c,l,h,new qe)),o&&(u.normal=Yi.getInterpolatedAttribute(o,a,c,l,h,new k),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new k,materialIndex:0};Yi.getNormal(ia,sa,ra,f.normal),u.face=f,u.barycoord=h}return u}var zn=class i extends kt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],h=[],f=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ft(l,3)),this.setAttribute("normal",new ft(u,3)),this.setAttribute("uv",new ft(h,2));function g(b,m,d,_,v,y,R,T,I,w,M){let S=y/I,z=R/w,W=y/2,X=R/2,j=T/2,J=I+1,ee=w+1,le=0,Q=0,ye=new k;for(let me=0;me<ee;me++){let ve=me*z-X;for(let Ze=0;Ze<J;Ze++){let pt=Ze*S-W;ye[b]=pt*_,ye[m]=ve*v,ye[d]=j,l.push(ye.x,ye.y,ye.z),ye[b]=0,ye[m]=0,ye[d]=T>0?1:-1,u.push(ye.x,ye.y,ye.z),h.push(Ze/I),h.push(1-me/w),le+=1}}for(let me=0;me<w;me++)for(let ve=0;ve<I;ve++){let Ze=f+ve+J*me,pt=f+ve+J*(me+1),ne=f+(ve+1)+J*(me+1),D=f+(ve+1)+J*me;c.push(Ze,pt,D),c.push(pt,ne,D),Q+=6}a.addGroup(p,Q,M),p+=Q,f+=le}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Pr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function wn(i){let e={};for(let t=0;t<i.length;t++){let n=Pr(i[t]);for(let s in n)e[s]=n[s]}return e}function h0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function $d(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}var f0={clone:Pr,merge:wn},d0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,p0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$t=class extends _n{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=d0,this.fragmentShader=p0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pr(e.uniforms),this.uniformsGroups=h0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},za=class extends at{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=Ti}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},qi=new k,Gf=new qe,Vf=new qe,sn=class extends za{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ir*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ho*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ir*2*Math.atan(Math.tan(ho*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,t){return this.getViewBounds(e,Gf,Vf),t.subVectors(Vf,Gf)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ho*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},or=-90,ar=1,uu=class extends at{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new sn(or,ar,e,t);s.layers=this.layers,this.add(s);let r=new sn(or,ar,e,t);r.layers=this.layers,this.add(r);let o=new sn(or,ar,e,t);o.layers=this.layers,this.add(o);let a=new sn(or,ar,e,t);a.layers=this.layers,this.add(a);let c=new sn(or,ar,e,t);c.layers=this.layers,this.add(c);let l=new sn(or,ar,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Ti)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ca)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ua=class extends hn{constructor(e,t,n,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Er,super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},hu=class extends Zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ua(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:vn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new zn(5,5,5),r=new $t({name:"CubemapFromEquirect",uniforms:Pr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:rn,blending:Zi});r.uniforms.tEquirect.value=t;let o=new be(s,r),a=t.minFilter;return t.minFilter===Yn&&(t.minFilter=vn),new uu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},ul=new k,m0=new k,g0=new st,Ei=class{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=ul.subVectors(n,t).cross(m0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ul),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||g0.getNormalMatrix(e),s=this.coplanarPoint(ul).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},vs=new Hn,la=new k,yo=class{constructor(e=new Ei,t=new Ei,n=new Ei,s=new Ei,r=new Ei,o=new Ei){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ti){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],h=s[6],f=s[7],p=s[8],g=s[9],b=s[10],m=s[11],d=s[12],_=s[13],v=s[14],y=s[15];if(n[0].setComponents(c-r,f-l,m-p,y-d).normalize(),n[1].setComponents(c+r,f+l,m+p,y+d).normalize(),n[2].setComponents(c+o,f+u,m+g,y+_).normalize(),n[3].setComponents(c-o,f-u,m-g,y-_).normalize(),n[4].setComponents(c-a,f-h,m-b,y-v).normalize(),t===Ti)n[5].setComponents(c+a,f+h,m+b,y+v).normalize();else if(t===Ca)n[5].setComponents(a,h,b,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(e){return vs.center.set(0,0,0),vs.radius=.7071067811865476,vs.applyMatrix4(e.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(la.x=s.normal.x>0?e.max.x:e.min.x,la.y=s.normal.y>0?e.max.y:e.min.y,la.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(la)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function ep(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function x0(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){let u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){let g=h[f],b=h[p];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++f,h[f]=b)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){let b=h[p];i.bufferSubData(l,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var ui=class i extends kt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,f=t/c,p=[],g=[],b=[],m=[];for(let d=0;d<u;d++){let _=d*f-o;for(let v=0;v<l;v++){let y=v*h-r;g.push(y,-_,0),b.push(0,0,1),m.push(v/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let _=0;_<a;_++){let v=_+l*d,y=_+l*(d+1),R=_+1+l*(d+1),T=_+1+l*d;p.push(v,y,T),p.push(y,R,T)}this.setIndex(p),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(b,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},b0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,y0=`#ifdef USE_ALPHAHASH
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
#endif`,v0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,M0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,S0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,E0=`#ifdef USE_AOMAP
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
#endif`,w0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,T0=`#ifdef USE_BATCHING
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
#endif`,A0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,R0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,C0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,I0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,P0=`#ifdef USE_IRIDESCENCE
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
#endif`,L0=`#ifdef USE_BUMPMAP
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
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,k0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,O0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,B0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,H0=`#define PI 3.141592653589793
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
} // validated`,G0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,V0=`vec3 transformedNormal = objectNormal;
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
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,X0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,j0="gl_FragColor = linearToOutputTexel( gl_FragColor );",Z0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,K0=`#ifdef USE_ENVMAP
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
#endif`,J0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Q0=`#ifdef USE_ENVMAP
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
#endif`,$0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ex=`#ifdef USE_ENVMAP
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
#endif`,tx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ix=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rx=`#ifdef USE_GRADIENTMAP
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
}`,ox=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ax=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lx=`uniform bool receiveShadow;
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
#endif`,ux=`#ifdef USE_ENVMAP
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
#endif`,hx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,px=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mx=`PhysicalMaterial material;
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
#endif`,gx=`struct PhysicalMaterial {
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
}`,xx=`
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
#endif`,bx=`#if defined( RE_IndirectDiffuse )
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
#endif`,yx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_x=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ex=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ax=`#if defined( USE_POINTS_UV )
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
#endif`,Rx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ix=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Px=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dx=`#ifdef USE_MORPHTARGETS
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
#endif`,zx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ux=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Nx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ox=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bx=`#ifdef USE_NORMALMAP
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
#endif`,Hx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$x=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,eb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,nb=`float getShadowMask() {
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
}`,ib=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sb=`#ifdef USE_SKINNING
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
#endif`,rb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ob=`#ifdef USE_SKINNING
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
#endif`,ab=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ub=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hb=`#ifdef USE_TRANSMISSION
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
#endif`,fb=`#ifdef USE_TRANSMISSION
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
#endif`,db=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,xb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bb=`uniform sampler2D t2D;
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
}`,yb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_b=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sb=`#include <common>
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
}`,Eb=`#if DEPTH_PACKING == 3200
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
}`,wb=`#define DISTANCE
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
}`,Tb=`#define DISTANCE
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
}`,Ab=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cb=`uniform float scale;
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
}`,Ib=`uniform vec3 diffuse;
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
}`,Pb=`#include <common>
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
}`,Lb=`uniform vec3 diffuse;
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
}`,Db=`#define LAMBERT
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
}`,zb=`#define LAMBERT
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
}`,Ub=`#define MATCAP
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
}`,Nb=`#define MATCAP
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
}`,Fb=`#define NORMAL
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
}`,kb=`#define NORMAL
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
}`,Ob=`#define PHONG
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
}`,Bb=`#define PHONG
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
}`,Hb=`#define STANDARD
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
}`,Gb=`#define STANDARD
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
}`,Vb=`#define TOON
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
}`,Wb=`#define TOON
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
}`,Xb=`uniform float size;
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
}`,qb=`uniform vec3 diffuse;
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
}`,Yb=`#include <common>
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
}`,jb=`uniform vec3 color;
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
}`,Zb=`uniform float rotation;
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
}`,Kb=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:b0,alphahash_pars_fragment:y0,alphamap_fragment:v0,alphamap_pars_fragment:_0,alphatest_fragment:M0,alphatest_pars_fragment:S0,aomap_fragment:E0,aomap_pars_fragment:w0,batching_pars_vertex:T0,batching_vertex:A0,begin_vertex:R0,beginnormal_vertex:C0,bsdfs:I0,iridescence_fragment:P0,bumpmap_pars_fragment:L0,clipping_planes_fragment:D0,clipping_planes_pars_fragment:z0,clipping_planes_pars_vertex:U0,clipping_planes_vertex:N0,color_fragment:F0,color_pars_fragment:k0,color_pars_vertex:O0,color_vertex:B0,common:H0,cube_uv_reflection_fragment:G0,defaultnormal_vertex:V0,displacementmap_pars_vertex:W0,displacementmap_vertex:X0,emissivemap_fragment:q0,emissivemap_pars_fragment:Y0,colorspace_fragment:j0,colorspace_pars_fragment:Z0,envmap_fragment:K0,envmap_common_pars_fragment:J0,envmap_pars_fragment:Q0,envmap_pars_vertex:$0,envmap_physical_pars_fragment:ux,envmap_vertex:ex,fog_vertex:tx,fog_pars_vertex:nx,fog_fragment:ix,fog_pars_fragment:sx,gradientmap_pars_fragment:rx,lightmap_pars_fragment:ox,lights_lambert_fragment:ax,lights_lambert_pars_fragment:cx,lights_pars_begin:lx,lights_toon_fragment:hx,lights_toon_pars_fragment:fx,lights_phong_fragment:dx,lights_phong_pars_fragment:px,lights_physical_fragment:mx,lights_physical_pars_fragment:gx,lights_fragment_begin:xx,lights_fragment_maps:bx,lights_fragment_end:yx,logdepthbuf_fragment:vx,logdepthbuf_pars_fragment:_x,logdepthbuf_pars_vertex:Mx,logdepthbuf_vertex:Sx,map_fragment:Ex,map_pars_fragment:wx,map_particle_fragment:Tx,map_particle_pars_fragment:Ax,metalnessmap_fragment:Rx,metalnessmap_pars_fragment:Cx,morphinstance_vertex:Ix,morphcolor_vertex:Px,morphnormal_vertex:Lx,morphtarget_pars_vertex:Dx,morphtarget_vertex:zx,normal_fragment_begin:Ux,normal_fragment_maps:Nx,normal_pars_fragment:Fx,normal_pars_vertex:kx,normal_vertex:Ox,normalmap_pars_fragment:Bx,clearcoat_normal_fragment_begin:Hx,clearcoat_normal_fragment_maps:Gx,clearcoat_pars_fragment:Vx,iridescence_pars_fragment:Wx,opaque_fragment:Xx,packing:qx,premultiplied_alpha_fragment:Yx,project_vertex:jx,dithering_fragment:Zx,dithering_pars_fragment:Kx,roughnessmap_fragment:Jx,roughnessmap_pars_fragment:Qx,shadowmap_pars_fragment:$x,shadowmap_pars_vertex:eb,shadowmap_vertex:tb,shadowmask_pars_fragment:nb,skinbase_vertex:ib,skinning_pars_vertex:sb,skinning_vertex:rb,skinnormal_vertex:ob,specularmap_fragment:ab,specularmap_pars_fragment:cb,tonemapping_fragment:lb,tonemapping_pars_fragment:ub,transmission_fragment:hb,transmission_pars_fragment:fb,uv_pars_fragment:db,uv_pars_vertex:pb,uv_vertex:mb,worldpos_vertex:gb,background_vert:xb,background_frag:bb,backgroundCube_vert:yb,backgroundCube_frag:vb,cube_vert:_b,cube_frag:Mb,depth_vert:Sb,depth_frag:Eb,distanceRGBA_vert:wb,distanceRGBA_frag:Tb,equirect_vert:Ab,equirect_frag:Rb,linedashed_vert:Cb,linedashed_frag:Ib,meshbasic_vert:Pb,meshbasic_frag:Lb,meshlambert_vert:Db,meshlambert_frag:zb,meshmatcap_vert:Ub,meshmatcap_frag:Nb,meshnormal_vert:Fb,meshnormal_frag:kb,meshphong_vert:Ob,meshphong_frag:Bb,meshphysical_vert:Hb,meshphysical_frag:Gb,meshtoon_vert:Vb,meshtoon_frag:Wb,points_vert:Xb,points_frag:qb,shadow_vert:Yb,shadow_frag:jb,sprite_vert:Zb,sprite_frag:Kb},Ee={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},fi={basic:{uniforms:wn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:wn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Le(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:wn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:wn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:wn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new Le(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:wn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:wn([Ee.points,Ee.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:wn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:wn([Ee.common,Ee.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:wn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:wn([Ee.sprite,Ee.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:wn([Ee.common,Ee.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:wn([Ee.lights,Ee.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};fi.physical={uniforms:wn([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};var ua={r:0,b:0,g:0},_s=new li,Jb=new nt;function Qb(i,e,t,n,s,r,o){let a=new Le(0),c=r===!0?0:1,l,u,h=null,f=0,p=null;function g(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?t:e).get(v)),v}function b(_){let v=!1,y=g(_);y===null?d(a,c):y&&y.isColor&&(d(y,1),v=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,v){let y=g(v);y&&(y.isCubeTexture||y.mapping===sc)?(u===void 0&&(u=new be(new zn(1,1,1),new $t({name:"BackgroundCubeMaterial",uniforms:Pr(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,T,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),_s.copy(v.backgroundRotation),_s.x*=-1,_s.y*=-1,_s.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(_s.y*=-1,_s.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Jb.makeRotationFromEuler(_s)),u.material.toneMapped=gt.getTransfer(y.colorSpace)!==Lt,(h!==y||f!==y.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=y,f=y.version,p=i.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new be(new ui(2,2),new $t({name:"BackgroundMaterial",uniforms:Pr(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=gt.getTransfer(y.colorSpace)!==Lt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,p=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function d(_,v){_.getRGB(ua,$d(i)),n.buffers.color.setClear(ua.r,ua.g,ua.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(_,v=1){a.set(_),c=v,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,d(a,c)},render:b,addToRenderList:m}}function $b(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(S,z,W,X,j){let J=!1,ee=h(X,W,z);r!==ee&&(r=ee,l(r.object)),J=p(S,X,W,j),J&&g(S,X,W,j),j!==null&&e.update(j,i.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,y(S,z,W,X),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function h(S,z,W){let X=W.wireframe===!0,j=n[S.id];j===void 0&&(j={},n[S.id]=j);let J=j[z.id];J===void 0&&(J={},j[z.id]=J);let ee=J[X];return ee===void 0&&(ee=f(c()),J[X]=ee),ee}function f(S){let z=[],W=[],X=[];for(let j=0;j<t;j++)z[j]=0,W[j]=0,X[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:W,attributeDivisors:X,object:S,attributes:{},index:null}}function p(S,z,W,X){let j=r.attributes,J=z.attributes,ee=0,le=W.getAttributes();for(let Q in le)if(le[Q].location>=0){let me=j[Q],ve=J[Q];if(ve===void 0&&(Q==="instanceMatrix"&&S.instanceMatrix&&(ve=S.instanceMatrix),Q==="instanceColor"&&S.instanceColor&&(ve=S.instanceColor)),me===void 0||me.attribute!==ve||ve&&me.data!==ve.data)return!0;ee++}return r.attributesNum!==ee||r.index!==X}function g(S,z,W,X){let j={},J=z.attributes,ee=0,le=W.getAttributes();for(let Q in le)if(le[Q].location>=0){let me=J[Q];me===void 0&&(Q==="instanceMatrix"&&S.instanceMatrix&&(me=S.instanceMatrix),Q==="instanceColor"&&S.instanceColor&&(me=S.instanceColor));let ve={};ve.attribute=me,me&&me.data&&(ve.data=me.data),j[Q]=ve,ee++}r.attributes=j,r.attributesNum=ee,r.index=X}function b(){let S=r.newAttributes;for(let z=0,W=S.length;z<W;z++)S[z]=0}function m(S){d(S,0)}function d(S,z){let W=r.newAttributes,X=r.enabledAttributes,j=r.attributeDivisors;W[S]=1,X[S]===0&&(i.enableVertexAttribArray(S),X[S]=1),j[S]!==z&&(i.vertexAttribDivisor(S,z),j[S]=z)}function _(){let S=r.newAttributes,z=r.enabledAttributes;for(let W=0,X=z.length;W<X;W++)z[W]!==S[W]&&(i.disableVertexAttribArray(W),z[W]=0)}function v(S,z,W,X,j,J,ee){ee===!0?i.vertexAttribIPointer(S,z,W,j,J):i.vertexAttribPointer(S,z,W,X,j,J)}function y(S,z,W,X){b();let j=X.attributes,J=W.getAttributes(),ee=z.defaultAttributeValues;for(let le in J){let Q=J[le];if(Q.location>=0){let ye=j[le];if(ye===void 0&&(le==="instanceMatrix"&&S.instanceMatrix&&(ye=S.instanceMatrix),le==="instanceColor"&&S.instanceColor&&(ye=S.instanceColor)),ye!==void 0){let me=ye.normalized,ve=ye.itemSize,Ze=e.get(ye);if(Ze===void 0)continue;let pt=Ze.buffer,ne=Ze.type,D=Ze.bytesPerElement,O=ne===i.INT||ne===i.UNSIGNED_INT||ye.gpuType===Gu;if(ye.isInterleavedBufferAttribute){let Y=ye.data,fe=Y.stride,pe=ye.offset;if(Y.isInstancedInterleavedBuffer){for(let De=0;De<Q.locationSize;De++)d(Q.location+De,Y.meshPerAttribute);S.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let De=0;De<Q.locationSize;De++)m(Q.location+De);i.bindBuffer(i.ARRAY_BUFFER,pt);for(let De=0;De<Q.locationSize;De++)v(Q.location+De,ve/Q.locationSize,ne,me,fe*D,(pe+ve/Q.locationSize*De)*D,O)}else{if(ye.isInstancedBufferAttribute){for(let Y=0;Y<Q.locationSize;Y++)d(Q.location+Y,ye.meshPerAttribute);S.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Y=0;Y<Q.locationSize;Y++)m(Q.location+Y);i.bindBuffer(i.ARRAY_BUFFER,pt);for(let Y=0;Y<Q.locationSize;Y++)v(Q.location+Y,ve/Q.locationSize,ne,me,ve*D,ve/Q.locationSize*Y*D,O)}}else if(ee!==void 0){let me=ee[le];if(me!==void 0)switch(me.length){case 2:i.vertexAttrib2fv(Q.location,me);break;case 3:i.vertexAttrib3fv(Q.location,me);break;case 4:i.vertexAttrib4fv(Q.location,me);break;default:i.vertexAttrib1fv(Q.location,me)}}}}_()}function R(){w();for(let S in n){let z=n[S];for(let W in z){let X=z[W];for(let j in X)u(X[j].object),delete X[j];delete z[W]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;let z=n[S.id];for(let W in z){let X=z[W];for(let j in X)u(X[j].object),delete X[j];delete z[W]}delete n[S.id]}function I(S){for(let z in n){let W=n[z];if(W[S.id]===void 0)continue;let X=W[S.id];for(let j in X)u(X[j].object),delete X[j];delete W[S.id]}}function w(){M(),o=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:M,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:I,initAttributes:b,enableAttribute:m,disableUnusedAttributes:_}}function ey(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];t.update(p,n,1)}function c(l,u,h,f){if(h===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let b=0;b<h;b++)g+=u[b]*f[b];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function ty(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==jn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let w=I===Ro&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Ri&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==ai&&!w)}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:R,maxSamples:T}}function ny(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Ei,a=new st,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let p=h.length!==0||f||n!==0||s;return s=f,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){let g=h.clippingPlanes,b=h.clipIntersection,m=h.clipShadows,d=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{let _=r?0:n,v=_*4,y=d.clippingState||null;c.value=y,y=u(g,f,v,p);for(let R=0;R!==v;++R)y[R]=t[R];d.clippingState=y,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,p,g){let b=h!==null?h.length:0,m=null;if(b!==0){if(m=c.value,g!==!0||m===null){let d=p+b*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,y=p;v!==b;++v,y+=4)o.copy(h[v]).applyMatrix4(_,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function iy(i){let e=new WeakMap;function t(o,a){return a===Ll?o.mapping=Er:a===Dl&&(o.mapping=wr),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ll||a===Dl)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new hu(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Ji=class extends za{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},xr=4,Wf=[.125,.215,.35,.446,.526,.582],ws=20,hl=new Ji,Xf=new Le,fl=null,dl=0,pl=0,ml=!1,Ss=(1+Math.sqrt(5))/2,cr=1/Ss,qf=[new k(-Ss,cr,0),new k(Ss,cr,0),new k(-cr,0,Ss),new k(cr,0,Ss),new k(0,Ss,-cr),new k(0,Ss,cr),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],Na=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){fl=this._renderer.getRenderTarget(),dl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fl,dl,pl),this._renderer.xr.enabled=ml,e.scissorTest=!1,ha(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Er||e.mapping===wr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fl=this._renderer.getRenderTarget(),dl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Ro,format:jn,colorSpace:dn,depthBuffer:!1},s=Yf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yf(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sy(r)),this._blurMaterial=ry(r,e,t)}return s}_compileMaterial(e){let t=new be(this._lodPlanes[0],e);this._renderer.compile(t,hl)}_sceneToCubeUV(e,t,n,s){let a=new sn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Xf),u.toneMapping=Ki,u.autoClear=!1;let p=new Qe({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),g=new be(new zn,p),b=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,b=!0):(p.color.copy(Xf),b=!0);for(let d=0;d<6;d++){let _=d%3;_===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):_===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));let v=this._cubeSize;ha(s,_*v,d>2?v:0,v,v),u.setRenderTarget(s),b&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Er||e.mapping===wr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new be(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;ha(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,hl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=qf[(s-r-1)%qf.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new be(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ws-1),b=r/g,m=isFinite(r)?1+Math.floor(u*b):ws;m>ws&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ws}`);let d=[],_=0;for(let I=0;I<ws;++I){let w=I/b,M=Math.exp(-w*w/2);d.push(M),I===0?_+=M:I<m&&(_+=2*M)}for(let I=0;I<d.length;I++)d[I]=d[I]/_;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;let y=this._sizeLods[s],R=3*y*(s>v-xr?s-v+xr:0),T=4*(this._cubeSize-y);ha(t,R,T,3*y,2*y),c.setRenderTarget(t),c.render(h,hl)}};function sy(i){let e=[],t=[],n=[],s=i,r=i-xr+1+Wf.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-xr?c=Wf[o-i+xr-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,b=3,m=2,d=1,_=new Float32Array(b*g*p),v=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let T=0;T<p;T++){let I=T%3*2/3-1,w=T>2?0:-1,M=[I,w,0,I+2/3,w,0,I+2/3,w+1,0,I,w,0,I+2/3,w+1,0,I,w+1,0];_.set(M,b*g*T),v.set(f,m*g*T);let S=[T,T,T,T,T,T];y.set(S,d*g*T)}let R=new kt;R.setAttribute("position",new zt(_,b)),R.setAttribute("uv",new zt(v,m)),R.setAttribute("faceIndex",new zt(y,d)),e.push(R),s>xr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Yf(i,e,t){let n=new Zn(i,e,t);return n.texture.mapping=sc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ha(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function ry(i,e,t){let n=new Float32Array(ws),s=new k(0,1,0);return new $t({name:"SphericalGaussianBlur",defines:{n:ws,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:$u(),fragmentShader:`

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
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function jf(){return new $t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$u(),fragmentShader:`

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
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Zf(){return new $t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$u(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function $u(){return`

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
	`}function oy(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Ll||c===Dl,u=c===Er||c===wr;if(l||u){let h=e.get(a),f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Na(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let p=a.image;return l&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new Na(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function ay(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&co("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function cy(i,e,t,n){let s={},r=new WeakMap;function o(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let b=f.morphAttributes[g];for(let m=0,d=b.length;m<d;m++)e.remove(b[m])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(h){let f=h.attributes;for(let g in f)e.update(f[g],i.ARRAY_BUFFER);let p=h.morphAttributes;for(let g in p){let b=p[g];for(let m=0,d=b.length;m<d;m++)e.update(b[m],i.ARRAY_BUFFER)}}function l(h){let f=[],p=h.index,g=h.attributes.position,b=0;if(p!==null){let _=p.array;b=p.version;for(let v=0,y=_.length;v<y;v+=3){let R=_[v+0],T=_[v+1],I=_[v+2];f.push(R,T,T,I,I,R)}}else if(g!==void 0){let _=g.array;b=g.version;for(let v=0,y=_.length/3-1;v<y;v+=3){let R=v+0,T=v+1,I=v+2;f.push(R,T,T,I,I,R)}}else return;let m=new(Jd(f)?Da:La)(f,1);m.version=b;let d=r.get(h);d&&e.remove(d),r.set(h,m)}function u(h){let f=r.get(h);if(f){let p=h.index;p!==null&&f.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function ly(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function l(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*o,g),t.update(p,n,g))}function u(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,n,1)}function h(f,p,g,b){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/o,p[d],b[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,b,0,g);let d=0;for(let _=0;_<g;_++)d+=p[_]*b[_];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function uy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function hy(i,e,t){let n=new WeakMap,s=new Tt;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,f=n.get(a);if(f===void 0||f.count!==h){let M=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],_=a.morphAttributes.color||[],v=0;p===!0&&(v=1),g===!0&&(v=2),b===!0&&(v=3);let y=a.attributes.position.count*v,R=1;y>e.maxTextureSize&&(R=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*R*4*h),I=new Pa(T,y,R,h);I.type=ai,I.needsUpdate=!0;let w=v*4;for(let S=0;S<h;S++){let z=m[S],W=d[S],X=_[S],j=y*R*4*S;for(let J=0;J<z.count;J++){let ee=J*w;p===!0&&(s.fromBufferAttribute(z,J),T[j+ee+0]=s.x,T[j+ee+1]=s.y,T[j+ee+2]=s.z,T[j+ee+3]=0),g===!0&&(s.fromBufferAttribute(W,J),T[j+ee+4]=s.x,T[j+ee+5]=s.y,T[j+ee+6]=s.z,T[j+ee+7]=0),b===!0&&(s.fromBufferAttribute(X,J),T[j+ee+8]=s.x,T[j+ee+9]=s.y,T[j+ee+10]=s.z,T[j+ee+11]=X.itemSize===4?s.w:1)}}f={count:h,texture:I,size:new qe(y,R)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let b=0;b<l.length;b++)p+=l[b];let g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function fy(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return h}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var Fa=class extends hn{constructor(e,t,n,s,r,o,a,c,l,u=yr){if(u!==yr&&u!==Ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===yr&&(n=As),n===void 0&&u===Ar&&(n=Tr),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:on,this.minFilter=c!==void 0?c:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},tp=new hn,Kf=new Fa(1,1),np=new Pa,ip=new lu,sp=new Ua,Jf=[],Qf=[],$f=new Float32Array(16),ed=new Float32Array(9),td=new Float32Array(4);function kr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Jf[s];if(r===void 0&&(r=new Float32Array(s),Jf[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function cn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function cc(i,e){let t=Qf[e];t===void 0&&(t=new Int32Array(e),Qf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function dy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function py(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),cn(t,e)}}function my(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),cn(t,e)}}function gy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),cn(t,e)}}function xy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),cn(t,e)}else{if(an(t,n))return;td.set(n),i.uniformMatrix2fv(this.addr,!1,td),cn(t,n)}}function by(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),cn(t,e)}else{if(an(t,n))return;ed.set(n),i.uniformMatrix3fv(this.addr,!1,ed),cn(t,n)}}function yy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),cn(t,e)}else{if(an(t,n))return;$f.set(n),i.uniformMatrix4fv(this.addr,!1,$f),cn(t,n)}}function vy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function _y(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),cn(t,e)}}function My(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),cn(t,e)}}function Sy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),cn(t,e)}}function Ey(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function wy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),cn(t,e)}}function Ty(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),cn(t,e)}}function Ay(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),cn(t,e)}}function Ry(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Kf.compareFunction=jd,r=Kf):r=tp,t.setTexture2D(e||r,s)}function Cy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ip,s)}function Iy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||sp,s)}function Py(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||np,s)}function Ly(i){switch(i){case 5126:return dy;case 35664:return py;case 35665:return my;case 35666:return gy;case 35674:return xy;case 35675:return by;case 35676:return yy;case 5124:case 35670:return vy;case 35667:case 35671:return _y;case 35668:case 35672:return My;case 35669:case 35673:return Sy;case 5125:return Ey;case 36294:return wy;case 36295:return Ty;case 36296:return Ay;case 35678:case 36198:case 36298:case 36306:case 35682:return Ry;case 35679:case 36299:case 36307:return Cy;case 35680:case 36300:case 36308:case 36293:return Iy;case 36289:case 36303:case 36311:case 36292:return Py}}function Dy(i,e){i.uniform1fv(this.addr,e)}function zy(i,e){let t=kr(e,this.size,2);i.uniform2fv(this.addr,t)}function Uy(i,e){let t=kr(e,this.size,3);i.uniform3fv(this.addr,t)}function Ny(i,e){let t=kr(e,this.size,4);i.uniform4fv(this.addr,t)}function Fy(i,e){let t=kr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ky(i,e){let t=kr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Oy(i,e){let t=kr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function By(i,e){i.uniform1iv(this.addr,e)}function Hy(i,e){i.uniform2iv(this.addr,e)}function Gy(i,e){i.uniform3iv(this.addr,e)}function Vy(i,e){i.uniform4iv(this.addr,e)}function Wy(i,e){i.uniform1uiv(this.addr,e)}function Xy(i,e){i.uniform2uiv(this.addr,e)}function qy(i,e){i.uniform3uiv(this.addr,e)}function Yy(i,e){i.uniform4uiv(this.addr,e)}function jy(i,e,t){let n=this.cache,s=e.length,r=cc(t,s);an(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||tp,r[o])}function Zy(i,e,t){let n=this.cache,s=e.length,r=cc(t,s);an(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||ip,r[o])}function Ky(i,e,t){let n=this.cache,s=e.length,r=cc(t,s);an(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||sp,r[o])}function Jy(i,e,t){let n=this.cache,s=e.length,r=cc(t,s);an(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||np,r[o])}function Qy(i){switch(i){case 5126:return Dy;case 35664:return zy;case 35665:return Uy;case 35666:return Ny;case 35674:return Fy;case 35675:return ky;case 35676:return Oy;case 5124:case 35670:return By;case 35667:case 35671:return Hy;case 35668:case 35672:return Gy;case 35669:case 35673:return Vy;case 5125:return Wy;case 36294:return Xy;case 36295:return qy;case 36296:return Yy;case 35678:case 36198:case 36298:case 36306:case 35682:return jy;case 35679:case 36299:case 36307:return Zy;case 35680:case 36300:case 36308:case 36293:return Ky;case 36289:case 36303:case 36311:case 36292:return Jy}}var fu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ly(t.type)}},du=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qy(t.type)}},pu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},gl=/(\w+)(\])?(\[|\.)?/g;function nd(i,e){i.seq.push(e),i.map[e.id]=e}function $y(i,e,t){let n=i.name,s=n.length;for(gl.lastIndex=0;;){let r=gl.exec(n),o=gl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){nd(t,l===void 0?new fu(a,i,e):new du(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new pu(a),nd(t,h)),t=h}}}var _r=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);$y(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function id(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var ev=37297,tv=0;function nv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var sd=new st;function iv(i){gt._getMatrix(sd,gt.workingColorSpace,i);let e=`mat3( ${sd.elements.map(t=>t.toFixed(4))} )`;switch(gt.getTransfer(i)){case ac:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function rd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+nv(i.getShaderSource(e),o)}else return s}function sv(i,e){let t=iv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function rv(i,e){let t;switch(e){case pg:t="Linear";break;case mg:t="Reinhard";break;case gg:t="Cineon";break;case Bu:t="ACESFilmic";break;case bg:t="AgX";break;case yg:t="Neutral";break;case xg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var fa=new k;function ov(){gt.getLuminanceCoefficients(fa);let i=fa.x.toFixed(4),e=fa.y.toFixed(4),t=fa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function av(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lo).join(`
`)}function cv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function lv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function lo(i){return i!==""}function od(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ad(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var uv=/^[ \t]*#include +<([\w\d./]+)>/gm;function mu(i){return i.replace(uv,fv)}var hv=new Map;function fv(i,e){let t=ot[e];if(t===void 0){let n=hv.get(e);if(n!==void 0)t=ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return mu(t)}var dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cd(i){return i.replace(dv,pv)}function pv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ld(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function mv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ku?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Si&&(e="SHADOWMAP_TYPE_VSM"),e}function gv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Er:case wr:e="ENVMAP_TYPE_CUBE";break;case sc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function xv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case wr:e="ENVMAP_MODE_REFRACTION";break}return e}function bv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ou:e="ENVMAP_BLENDING_MULTIPLY";break;case fg:e="ENVMAP_BLENDING_MIX";break;case dg:e="ENVMAP_BLENDING_ADD";break}return e}function yv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function vv(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=mv(t),l=gv(t),u=xv(t),h=bv(t),f=yv(t),p=av(t),g=cv(r),b=s.createProgram(),m,d,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lo).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(lo).join(`
`),d.length>0&&(d+=`
`)):(m=[ld(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lo).join(`
`),d=[ld(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ki?"#define TONE_MAPPING":"",t.toneMapping!==Ki?ot.tonemapping_pars_fragment:"",t.toneMapping!==Ki?rv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,sv("linearToOutputTexel",t.outputColorSpace),ov(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(lo).join(`
`)),o=mu(o),o=od(o,t),o=ad(o,t),a=mu(a),a=od(a,t),a=ad(a,t),o=cd(o),a=cd(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Mf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let v=_+m+o,y=_+d+a,R=id(s,s.VERTEX_SHADER,v),T=id(s,s.FRAGMENT_SHADER,y);s.attachShader(b,R),s.attachShader(b,T),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function I(z){if(i.debug.checkShaderErrors){let W=s.getProgramInfoLog(b).trim(),X=s.getShaderInfoLog(R).trim(),j=s.getShaderInfoLog(T).trim(),J=!0,ee=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,b,R,T);else{let le=rd(s,R,"vertex"),Q=rd(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+W+`
`+le+`
`+Q)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(X===""||j==="")&&(ee=!1);ee&&(z.diagnostics={runnable:J,programLog:W,vertexShader:{log:X,prefix:m},fragmentShader:{log:j,prefix:d}})}s.deleteShader(R),s.deleteShader(T),w=new _r(s,b),M=lv(s,b)}let w;this.getUniforms=function(){return w===void 0&&I(this),w};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(b,ev)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tv++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=R,this.fragmentShader=T,this}var _v=0,gu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new xu(e),t.set(e,n)),n}},xu=class{constructor(e){this.id=_v++,this.code=e,this.usedTimes=0}};function Mv(i,e,t,n,s,r,o){let a=new bo,c=new gu,l=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,S,z,W,X){let j=W.fog,J=X.geometry,ee=M.isMeshStandardMaterial?W.environment:null,le=(M.isMeshStandardMaterial?t:e).get(M.envMap||ee),Q=le&&le.mapping===sc?le.image.height:null,ye=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let me=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ve=me!==void 0?me.length:0,Ze=0;J.morphAttributes.position!==void 0&&(Ze=1),J.morphAttributes.normal!==void 0&&(Ze=2),J.morphAttributes.color!==void 0&&(Ze=3);let pt,ne,D,O;if(ye){let wt=fi[ye];pt=wt.vertexShader,ne=wt.fragmentShader}else pt=M.vertexShader,ne=M.fragmentShader,c.update(M),D=c.getVertexShaderID(M),O=c.getFragmentShaderID(M);let Y=i.getRenderTarget(),fe=i.state.buffers.depth.getReversed(),pe=X.isInstancedMesh===!0,De=X.isBatchedMesh===!0,it=!!M.map,Ne=!!M.matcap,lt=!!le,B=!!M.aoMap,ue=!!M.lightMap,ge=!!M.bumpMap,we=!!M.normalMap,Ae=!!M.displacementMap,Je=!!M.emissiveMap,ze=!!M.metalnessMap,P=!!M.roughnessMap,E=M.anisotropy>0,q=M.clearcoat>0,se=M.dispersion>0,ae=M.iridescence>0,ie=M.sheen>0,Oe=M.transmission>0,Me=E&&!!M.anisotropyMap,Re=q&&!!M.clearcoatMap,$e=q&&!!M.clearcoatNormalMap,he=q&&!!M.clearcoatRoughnessMap,Pe=ae&&!!M.iridescenceMap,We=ae&&!!M.iridescenceThicknessMap,Xe=ie&&!!M.sheenColorMap,Ue=ie&&!!M.sheenRoughnessMap,mt=!!M.specularMap,et=!!M.specularColorMap,Ve=!!M.specularIntensityMap,H=Oe&&!!M.transmissionMap,_e=Oe&&!!M.thicknessMap,te=!!M.gradientMap,re=!!M.alphaMap,Ce=M.alphaTest>0,Se=!!M.alphaHash,Ke=!!M.extensions,Ut=Ki;M.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ut=i.toneMapping);let jt={shaderID:ye,shaderType:M.type,shaderName:M.name,vertexShader:pt,fragmentShader:ne,defines:M.defines,customVertexShaderID:D,customFragmentShaderID:O,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:De,batchingColor:De&&X._colorsTexture!==null,instancing:pe,instancingColor:pe&&X.instanceColor!==null,instancingMorph:pe&&X.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Y===null?i.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:dn,alphaToCoverage:!!M.alphaToCoverage,map:it,matcap:Ne,envMap:lt,envMapMode:lt&&le.mapping,envMapCubeUVHeight:Q,aoMap:B,lightMap:ue,bumpMap:ge,normalMap:we,displacementMap:f&&Ae,emissiveMap:Je,normalMapObjectSpace:we&&M.normalMapType===wg,normalMapTangentSpace:we&&M.normalMapType===oc,metalnessMap:ze,roughnessMap:P,anisotropy:E,anisotropyMap:Me,clearcoat:q,clearcoatMap:Re,clearcoatNormalMap:$e,clearcoatRoughnessMap:he,dispersion:se,iridescence:ae,iridescenceMap:Pe,iridescenceThicknessMap:We,sheen:ie,sheenColorMap:Xe,sheenRoughnessMap:Ue,specularMap:mt,specularColorMap:et,specularIntensityMap:Ve,transmission:Oe,transmissionMap:H,thicknessMap:_e,gradientMap:te,opaque:M.transparent===!1&&M.blending===br&&M.alphaToCoverage===!1,alphaMap:re,alphaTest:Ce,alphaHash:Se,combine:M.combine,mapUv:it&&b(M.map.channel),aoMapUv:B&&b(M.aoMap.channel),lightMapUv:ue&&b(M.lightMap.channel),bumpMapUv:ge&&b(M.bumpMap.channel),normalMapUv:we&&b(M.normalMap.channel),displacementMapUv:Ae&&b(M.displacementMap.channel),emissiveMapUv:Je&&b(M.emissiveMap.channel),metalnessMapUv:ze&&b(M.metalnessMap.channel),roughnessMapUv:P&&b(M.roughnessMap.channel),anisotropyMapUv:Me&&b(M.anisotropyMap.channel),clearcoatMapUv:Re&&b(M.clearcoatMap.channel),clearcoatNormalMapUv:$e&&b(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&b(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&b(M.iridescenceMap.channel),iridescenceThicknessMapUv:We&&b(M.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&b(M.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&b(M.sheenRoughnessMap.channel),specularMapUv:mt&&b(M.specularMap.channel),specularColorMapUv:et&&b(M.specularColorMap.channel),specularIntensityMapUv:Ve&&b(M.specularIntensityMap.channel),transmissionMapUv:H&&b(M.transmissionMap.channel),thicknessMapUv:_e&&b(M.thicknessMap.channel),alphaMapUv:re&&b(M.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(we||E),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!J.attributes.uv&&(it||re),fog:!!j,useFog:M.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:fe,skinning:X.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Ze,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ut,decodeVideoTexture:it&&M.map.isVideoTexture===!0&&gt.getTransfer(M.map.colorSpace)===Lt,decodeVideoTextureEmissive:Je&&M.emissiveMap.isVideoTexture===!0&&gt.getTransfer(M.emissiveMap.colorSpace)===Lt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Dt,flipSided:M.side===rn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ke&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ke&&M.extensions.multiDraw===!0||De)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return jt.vertexUv1s=l.has(1),jt.vertexUv2s=l.has(2),jt.vertexUv3s=l.has(3),l.clear(),jt}function d(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let z in M.defines)S.push(z),S.push(M.defines[z]);return M.isRawShaderMaterial===!1&&(_(S,M),v(S,M),S.push(i.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function _(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function v(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function y(M){let S=g[M.type],z;if(S){let W=fi[S];z=f0.clone(W.uniforms)}else z=M.uniforms;return z}function R(M,S){let z;for(let W=0,X=u.length;W<X;W++){let j=u[W];if(j.cacheKey===S){z=j,++z.usedTimes;break}}return z===void 0&&(z=new vv(i,S,M,r),u.push(z)),z}function T(M){if(--M.usedTimes===0){let S=u.indexOf(M);u[S]=u[u.length-1],u.pop(),M.destroy()}}function I(M){c.remove(M)}function w(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:R,releaseProgram:T,releaseShaderCache:I,programs:u,dispose:w}}function Sv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ev(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ud(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,f,p,g,b,m){let d=i[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:b,group:m},i[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=b,d.group=m),e++,d}function a(h,f,p,g,b,m){let d=o(h,f,p,g,b,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):t.push(d)}function c(h,f,p,g,b,m){let d=o(h,f,p,g,b,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function l(h,f){t.length>1&&t.sort(h||Ev),n.length>1&&n.sort(f||ud),s.length>1&&s.sort(f||ud)}function u(){for(let h=e,f=i.length;h<f;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function wv(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new hd,i.set(n,[o])):s>=r.length?(o=new hd,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Tv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Le};break;case"SpotLight":t={position:new k,direction:new k,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new k,halfWidth:new k,halfHeight:new k};break}return i[e.id]=t,t}}}function Av(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Rv=0;function Cv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Iv(i){let e=new Tv,t=Av(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new k);let s=new k,r=new nt,o=new nt;function a(l){let u=0,h=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,b=0,m=0,d=0,_=0,v=0,y=0,R=0,T=0,I=0;l.sort(Cv);for(let M=0,S=l.length;M<S;M++){let z=l[M],W=z.color,X=z.intensity,j=z.distance,J=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)u+=W.r*X,h+=W.g*X,f+=W.b*X;else if(z.isLightProbe){for(let ee=0;ee<9;ee++)n.probe[ee].addScaledVector(z.sh.coefficients[ee],X);I++}else if(z.isDirectionalLight){let ee=e.get(z);if(ee.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let le=z.shadow,Q=t.get(z);Q.shadowIntensity=le.intensity,Q.shadowBias=le.bias,Q.shadowNormalBias=le.normalBias,Q.shadowRadius=le.radius,Q.shadowMapSize=le.mapSize,n.directionalShadow[p]=Q,n.directionalShadowMap[p]=J,n.directionalShadowMatrix[p]=z.shadow.matrix,_++}n.directional[p]=ee,p++}else if(z.isSpotLight){let ee=e.get(z);ee.position.setFromMatrixPosition(z.matrixWorld),ee.color.copy(W).multiplyScalar(X),ee.distance=j,ee.coneCos=Math.cos(z.angle),ee.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),ee.decay=z.decay,n.spot[b]=ee;let le=z.shadow;if(z.map&&(n.spotLightMap[R]=z.map,R++,le.updateMatrices(z),z.castShadow&&T++),n.spotLightMatrix[b]=le.matrix,z.castShadow){let Q=t.get(z);Q.shadowIntensity=le.intensity,Q.shadowBias=le.bias,Q.shadowNormalBias=le.normalBias,Q.shadowRadius=le.radius,Q.shadowMapSize=le.mapSize,n.spotShadow[b]=Q,n.spotShadowMap[b]=J,y++}b++}else if(z.isRectAreaLight){let ee=e.get(z);ee.color.copy(W).multiplyScalar(X),ee.halfWidth.set(z.width*.5,0,0),ee.halfHeight.set(0,z.height*.5,0),n.rectArea[m]=ee,m++}else if(z.isPointLight){let ee=e.get(z);if(ee.color.copy(z.color).multiplyScalar(z.intensity),ee.distance=z.distance,ee.decay=z.decay,z.castShadow){let le=z.shadow,Q=t.get(z);Q.shadowIntensity=le.intensity,Q.shadowBias=le.bias,Q.shadowNormalBias=le.normalBias,Q.shadowRadius=le.radius,Q.shadowMapSize=le.mapSize,Q.shadowCameraNear=le.camera.near,Q.shadowCameraFar=le.camera.far,n.pointShadow[g]=Q,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=z.shadow.matrix,v++}n.point[g]=ee,g++}else if(z.isHemisphereLight){let ee=e.get(z);ee.skyColor.copy(z.color).multiplyScalar(X),ee.groundColor.copy(z.groundColor).multiplyScalar(X),n.hemi[d]=ee,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;let w=n.hash;(w.directionalLength!==p||w.pointLength!==g||w.spotLength!==b||w.rectAreaLength!==m||w.hemiLength!==d||w.numDirectionalShadows!==_||w.numPointShadows!==v||w.numSpotShadows!==y||w.numSpotMaps!==R||w.numLightProbes!==I)&&(n.directional.length=p,n.spot.length=b,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=I,w.directionalLength=p,w.pointLength=g,w.spotLength=b,w.rectAreaLength=m,w.hemiLength=d,w.numDirectionalShadows=_,w.numPointShadows=v,w.numSpotShadows=y,w.numSpotMaps=R,w.numLightProbes=I,n.version=Rv++)}function c(l,u){let h=0,f=0,p=0,g=0,b=0,m=u.matrixWorldInverse;for(let d=0,_=l.length;d<_;d++){let v=l[d];if(v.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),h++}else if(v.isSpotLight){let y=n.spot[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let y=n.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let y=n.hemi[b];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),b++}}}return{setup:a,setupView:c,state:n}}function fd(i){let e=new Iv(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Pv(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new fd(i),e.set(s,[a])):r>=o.length?(a=new fd(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var bu=class extends _n{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Sg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},yu=class extends _n{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Lv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dv=`uniform sampler2D shadow_pass;
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
}`;function zv(i,e,t){let n=new yo,s=new qe,r=new qe,o=new Tt,a=new bu({depthPacking:Eg}),c=new yu,l={},u=t.maxTextureSize,h={[Bn]:rn,[rn]:Bn,[Dt]:Dt},f=new $t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:Lv,fragmentShader:Dv}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new kt;g.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new be(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nd;let d=this.type;this.render=function(T,I,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;let M=i.getRenderTarget(),S=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),W=i.state;W.setBlending(Zi),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let X=d!==Si&&this.type===Si,j=d===Si&&this.type!==Si;for(let J=0,ee=T.length;J<ee;J++){let le=T[J],Q=le.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",le,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;s.copy(Q.mapSize);let ye=Q.getFrameExtents();if(s.multiply(ye),r.copy(Q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ye.x),s.x=r.x*ye.x,Q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ye.y),s.y=r.y*ye.y,Q.mapSize.y=r.y)),Q.map===null||X===!0||j===!0){let ve=this.type!==Si?{minFilter:on,magFilter:on}:{};Q.map!==null&&Q.map.dispose(),Q.map=new Zn(s.x,s.y,ve),Q.map.texture.name=le.name+".shadowMap",Q.camera.updateProjectionMatrix()}i.setRenderTarget(Q.map),i.clear();let me=Q.getViewportCount();for(let ve=0;ve<me;ve++){let Ze=Q.getViewport(ve);o.set(r.x*Ze.x,r.y*Ze.y,r.x*Ze.z,r.y*Ze.w),W.viewport(o),Q.updateMatrices(le,ve),n=Q.getFrustum(),y(I,w,Q.camera,le,this.type)}Q.isPointLightShadow!==!0&&this.type===Si&&_(Q,w),Q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(M,S,z)};function _(T,I){let w=e.update(b);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Zn(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(I,null,w,f,b,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(I,null,w,p,b,null)}function v(T,I,w,M){let S=null,z=w.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(z!==void 0)S=z;else if(S=w.isPointLight===!0?c:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){let W=S.uuid,X=I.uuid,j=l[W];j===void 0&&(j={},l[W]=j);let J=j[X];J===void 0&&(J=S.clone(),j[X]=J,I.addEventListener("dispose",R)),S=J}if(S.visible=I.visible,S.wireframe=I.wireframe,M===Si?S.side=I.shadowSide!==null?I.shadowSide:I.side:S.side=I.shadowSide!==null?I.shadowSide:h[I.side],S.alphaMap=I.alphaMap,S.alphaTest=I.alphaTest,S.map=I.map,S.clipShadows=I.clipShadows,S.clippingPlanes=I.clippingPlanes,S.clipIntersection=I.clipIntersection,S.displacementMap=I.displacementMap,S.displacementScale=I.displacementScale,S.displacementBias=I.displacementBias,S.wireframeLinewidth=I.wireframeLinewidth,S.linewidth=I.linewidth,w.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let W=i.properties.get(S);W.light=w}return S}function y(T,I,w,M,S){if(T.visible===!1)return;if(T.layers.test(I.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===Si)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,T.matrixWorld);let X=e.update(T),j=T.material;if(Array.isArray(j)){let J=X.groups;for(let ee=0,le=J.length;ee<le;ee++){let Q=J[ee],ye=j[Q.materialIndex];if(ye&&ye.visible){let me=v(T,ye,M,S);T.onBeforeShadow(i,T,I,w,X,me,Q),i.renderBufferDirect(w,null,X,me,T,Q),T.onAfterShadow(i,T,I,w,X,me,Q)}}}else if(j.visible){let J=v(T,j,M,S);T.onBeforeShadow(i,T,I,w,X,J,null),i.renderBufferDirect(w,null,X,J,T,null),T.onAfterShadow(i,T,I,w,X,J,null)}}let W=T.children;for(let X=0,j=W.length;X<j;X++)y(W[X],I,w,M,S)}function R(T){T.target.removeEventListener("dispose",R);for(let w in l){let M=l[w],S=T.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}var Uv={[wl]:Tl,[Al]:Il,[Rl]:Pl,[Sr]:Cl,[Tl]:wl,[Il]:Al,[Pl]:Rl,[Cl]:Sr};function Nv(i,e){function t(){let H=!1,_e=new Tt,te=null,re=new Tt(0,0,0,0);return{setMask:function(Ce){te!==Ce&&!H&&(i.colorMask(Ce,Ce,Ce,Ce),te=Ce)},setLocked:function(Ce){H=Ce},setClear:function(Ce,Se,Ke,Ut,jt){jt===!0&&(Ce*=Ut,Se*=Ut,Ke*=Ut),_e.set(Ce,Se,Ke,Ut),re.equals(_e)===!1&&(i.clearColor(Ce,Se,Ke,Ut),re.copy(_e))},reset:function(){H=!1,te=null,re.set(-1,0,0,0)}}}function n(){let H=!1,_e=!1,te=null,re=null,Ce=null;return{setReversed:function(Se){if(_e!==Se){let Ke=e.get("EXT_clip_control");_e?Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.ZERO_TO_ONE_EXT):Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.NEGATIVE_ONE_TO_ONE_EXT);let Ut=Ce;Ce=null,this.setClear(Ut)}_e=Se},getReversed:function(){return _e},setTest:function(Se){Se?Y(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function(Se){te!==Se&&!H&&(i.depthMask(Se),te=Se)},setFunc:function(Se){if(_e&&(Se=Uv[Se]),re!==Se){switch(Se){case wl:i.depthFunc(i.NEVER);break;case Tl:i.depthFunc(i.ALWAYS);break;case Al:i.depthFunc(i.LESS);break;case Sr:i.depthFunc(i.LEQUAL);break;case Rl:i.depthFunc(i.EQUAL);break;case Cl:i.depthFunc(i.GEQUAL);break;case Il:i.depthFunc(i.GREATER);break;case Pl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=Se}},setLocked:function(Se){H=Se},setClear:function(Se){Ce!==Se&&(_e&&(Se=1-Se),i.clearDepth(Se),Ce=Se)},reset:function(){H=!1,te=null,re=null,Ce=null,_e=!1}}}function s(){let H=!1,_e=null,te=null,re=null,Ce=null,Se=null,Ke=null,Ut=null,jt=null;return{setTest:function(wt){H||(wt?Y(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(wt){_e!==wt&&!H&&(i.stencilMask(wt),_e=wt)},setFunc:function(wt,Un,Cn){(te!==wt||re!==Un||Ce!==Cn)&&(i.stencilFunc(wt,Un,Cn),te=wt,re=Un,Ce=Cn)},setOp:function(wt,Un,Cn){(Se!==wt||Ke!==Un||Ut!==Cn)&&(i.stencilOp(wt,Un,Cn),Se=wt,Ke=Un,Ut=Cn)},setLocked:function(wt){H=wt},setClear:function(wt){jt!==wt&&(i.clearStencil(wt),jt=wt)},reset:function(){H=!1,_e=null,te=null,re=null,Ce=null,Se=null,Ke=null,Ut=null,jt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},h={},f=new WeakMap,p=[],g=null,b=!1,m=null,d=null,_=null,v=null,y=null,R=null,T=null,I=new Le(0,0,0),w=0,M=!1,S=null,z=null,W=null,X=null,j=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,le=0,Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(Q)[1]),ee=le>=1):Q.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),ee=le>=2);let ye=null,me={},ve=i.getParameter(i.SCISSOR_BOX),Ze=i.getParameter(i.VIEWPORT),pt=new Tt().fromArray(ve),ne=new Tt().fromArray(Ze);function D(H,_e,te,re){let Ce=new Uint8Array(4),Se=i.createTexture();i.bindTexture(H,Se),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ke=0;Ke<te;Ke++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,re,0,i.RGBA,i.UNSIGNED_BYTE,Ce):i.texImage2D(_e+Ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ce);return Se}let O={};O[i.TEXTURE_2D]=D(i.TEXTURE_2D,i.TEXTURE_2D,1),O[i.TEXTURE_CUBE_MAP]=D(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[i.TEXTURE_2D_ARRAY]=D(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),O[i.TEXTURE_3D]=D(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Y(i.DEPTH_TEST),o.setFunc(Sr),ge(!1),we(xf),Y(i.CULL_FACE),B(Zi);function Y(H){u[H]!==!0&&(i.enable(H),u[H]=!0)}function fe(H){u[H]!==!1&&(i.disable(H),u[H]=!1)}function pe(H,_e){return h[H]!==_e?(i.bindFramebuffer(H,_e),h[H]=_e,H===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=_e),H===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function De(H,_e){let te=p,re=!1;if(H){te=f.get(_e),te===void 0&&(te=[],f.set(_e,te));let Ce=H.textures;if(te.length!==Ce.length||te[0]!==i.COLOR_ATTACHMENT0){for(let Se=0,Ke=Ce.length;Se<Ke;Se++)te[Se]=i.COLOR_ATTACHMENT0+Se;te.length=Ce.length,re=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,re=!0);re&&i.drawBuffers(te)}function it(H){return g!==H?(i.useProgram(H),g=H,!0):!1}let Ne={[Es]:i.FUNC_ADD,[Zm]:i.FUNC_SUBTRACT,[Km]:i.FUNC_REVERSE_SUBTRACT};Ne[Jm]=i.MIN,Ne[Qm]=i.MAX;let lt={[$m]:i.ZERO,[eg]:i.ONE,[tg]:i.SRC_COLOR,[Sl]:i.SRC_ALPHA,[ag]:i.SRC_ALPHA_SATURATE,[rg]:i.DST_COLOR,[ig]:i.DST_ALPHA,[ng]:i.ONE_MINUS_SRC_COLOR,[El]:i.ONE_MINUS_SRC_ALPHA,[og]:i.ONE_MINUS_DST_COLOR,[sg]:i.ONE_MINUS_DST_ALPHA,[cg]:i.CONSTANT_COLOR,[lg]:i.ONE_MINUS_CONSTANT_COLOR,[ug]:i.CONSTANT_ALPHA,[hg]:i.ONE_MINUS_CONSTANT_ALPHA};function B(H,_e,te,re,Ce,Se,Ke,Ut,jt,wt){if(H===Zi){b===!0&&(fe(i.BLEND),b=!1);return}if(b===!1&&(Y(i.BLEND),b=!0),H!==jm){if(H!==m||wt!==M){if((d!==Es||y!==Es)&&(i.blendEquation(i.FUNC_ADD),d=Es,y=Es),wt)switch(H){case br:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mr:i.blendFunc(i.ONE,i.ONE);break;case bf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yf:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case br:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case bf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yf:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}_=null,v=null,R=null,T=null,I.set(0,0,0),w=0,m=H,M=wt}return}Ce=Ce||_e,Se=Se||te,Ke=Ke||re,(_e!==d||Ce!==y)&&(i.blendEquationSeparate(Ne[_e],Ne[Ce]),d=_e,y=Ce),(te!==_||re!==v||Se!==R||Ke!==T)&&(i.blendFuncSeparate(lt[te],lt[re],lt[Se],lt[Ke]),_=te,v=re,R=Se,T=Ke),(Ut.equals(I)===!1||jt!==w)&&(i.blendColor(Ut.r,Ut.g,Ut.b,jt),I.copy(Ut),w=jt),m=H,M=!1}function ue(H,_e){H.side===Dt?fe(i.CULL_FACE):Y(i.CULL_FACE);let te=H.side===rn;_e&&(te=!te),ge(te),H.blending===br&&H.transparent===!1?B(Zi):B(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);let re=H.stencilWrite;a.setTest(re),re&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Je(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?Y(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function ge(H){S!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),S=H)}function we(H){H!==qm?(Y(i.CULL_FACE),H!==z&&(H===xf?i.cullFace(i.BACK):H===Ym?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),z=H}function Ae(H){H!==W&&(ee&&i.lineWidth(H),W=H)}function Je(H,_e,te){H?(Y(i.POLYGON_OFFSET_FILL),(X!==_e||j!==te)&&(i.polygonOffset(_e,te),X=_e,j=te)):fe(i.POLYGON_OFFSET_FILL)}function ze(H){H?Y(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)}function P(H){H===void 0&&(H=i.TEXTURE0+J-1),ye!==H&&(i.activeTexture(H),ye=H)}function E(H,_e,te){te===void 0&&(ye===null?te=i.TEXTURE0+J-1:te=ye);let re=me[te];re===void 0&&(re={type:void 0,texture:void 0},me[te]=re),(re.type!==H||re.texture!==_e)&&(ye!==te&&(i.activeTexture(te),ye=te),i.bindTexture(H,_e||O[H]),re.type=H,re.texture=_e)}function q(){let H=me[ye];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function se(){try{i.compressedTexImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ae(){try{i.compressedTexImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ie(){try{i.texSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Oe(){try{i.texSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Re(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function $e(){try{i.texStorage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function he(){try{i.texStorage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Pe(){try{i.texImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function We(){try{i.texImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Xe(H){pt.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),pt.copy(H))}function Ue(H){ne.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),ne.copy(H))}function mt(H,_e){let te=l.get(_e);te===void 0&&(te=new WeakMap,l.set(_e,te));let re=te.get(H);re===void 0&&(re=i.getUniformBlockIndex(_e,H.name),te.set(H,re))}function et(H,_e){let re=l.get(_e).get(H);c.get(_e)!==re&&(i.uniformBlockBinding(_e,re,H.__bindingPointIndex),c.set(_e,re))}function Ve(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ye=null,me={},h={},f=new WeakMap,p=[],g=null,b=!1,m=null,d=null,_=null,v=null,y=null,R=null,T=null,I=new Le(0,0,0),w=0,M=!1,S=null,z=null,W=null,X=null,j=null,pt.set(0,0,i.canvas.width,i.canvas.height),ne.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Y,disable:fe,bindFramebuffer:pe,drawBuffers:De,useProgram:it,setBlending:B,setMaterial:ue,setFlipSided:ge,setCullFace:we,setLineWidth:Ae,setPolygonOffset:Je,setScissorTest:ze,activeTexture:P,bindTexture:E,unbindTexture:q,compressedTexImage2D:se,compressedTexImage3D:ae,texImage2D:Pe,texImage3D:We,updateUBOMapping:mt,uniformBlockBinding:et,texStorage2D:$e,texStorage3D:he,texSubImage2D:ie,texSubImage3D:Oe,compressedTexSubImage2D:Me,compressedTexSubImage3D:Re,scissor:Xe,viewport:Ue,reset:Ve}}function dd(i,e,t,n){let s=Fv(n);switch(t){case Hd:return i*e;case Vd:return i*e;case Wd:return i*e*2;case Xu:return i*e/s.components*s.byteLength;case qu:return i*e/s.components*s.byteLength;case Xd:return i*e*2/s.components*s.byteLength;case Yu:return i*e*2/s.components*s.byteLength;case Gd:return i*e*3/s.components*s.byteLength;case jn:return i*e*4/s.components*s.byteLength;case ju:return i*e*4/s.components*s.byteLength;case Sa:case Ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case wa:case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ul:case Fl:return Math.max(i,16)*Math.max(e,8)/4;case zl:case Nl:return Math.max(i,8)*Math.max(e,8)/2;case kl:case Ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Gl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Vl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Wl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Xl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ql:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Yl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case jl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Zl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Kl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Jl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ql:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case $l:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case eu:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Aa:case tu:case nu:return Math.ceil(i/4)*Math.ceil(e/4)*16;case qd:case iu:return Math.ceil(i/4)*Math.ceil(e/4)*8;case su:case ru:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Fv(i){switch(i){case Ri:case kd:return{byteLength:1,components:1};case go:case Od:case Ro:return{byteLength:2,components:1};case Vu:case Wu:return{byteLength:2,components:4};case As:case Gu:case ai:return{byteLength:4,components:1};case Bd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function kv(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new qe,u=new WeakMap,h,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,E){return p?new OffscreenCanvas(P,E):xo("canvas")}function b(P,E,q){let se=1,ae=ze(P);if((ae.width>q||ae.height>q)&&(se=q/Math.max(ae.width,ae.height)),se<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ie=Math.floor(se*ae.width),Oe=Math.floor(se*ae.height);h===void 0&&(h=g(ie,Oe));let Me=E?g(ie,Oe):h;return Me.width=ie,Me.height=Oe,Me.getContext("2d").drawImage(P,0,0,ie,Oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ie+"x"+Oe+")."),Me}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),P;return P}function m(P){return P.generateMipmaps}function d(P){i.generateMipmap(P)}function _(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(P,E,q,se,ae=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ie=E;if(E===i.RED&&(q===i.FLOAT&&(ie=i.R32F),q===i.HALF_FLOAT&&(ie=i.R16F),q===i.UNSIGNED_BYTE&&(ie=i.R8)),E===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.R8UI),q===i.UNSIGNED_SHORT&&(ie=i.R16UI),q===i.UNSIGNED_INT&&(ie=i.R32UI),q===i.BYTE&&(ie=i.R8I),q===i.SHORT&&(ie=i.R16I),q===i.INT&&(ie=i.R32I)),E===i.RG&&(q===i.FLOAT&&(ie=i.RG32F),q===i.HALF_FLOAT&&(ie=i.RG16F),q===i.UNSIGNED_BYTE&&(ie=i.RG8)),E===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.RG8UI),q===i.UNSIGNED_SHORT&&(ie=i.RG16UI),q===i.UNSIGNED_INT&&(ie=i.RG32UI),q===i.BYTE&&(ie=i.RG8I),q===i.SHORT&&(ie=i.RG16I),q===i.INT&&(ie=i.RG32I)),E===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.RGB8UI),q===i.UNSIGNED_SHORT&&(ie=i.RGB16UI),q===i.UNSIGNED_INT&&(ie=i.RGB32UI),q===i.BYTE&&(ie=i.RGB8I),q===i.SHORT&&(ie=i.RGB16I),q===i.INT&&(ie=i.RGB32I)),E===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(ie=i.RGBA16UI),q===i.UNSIGNED_INT&&(ie=i.RGBA32UI),q===i.BYTE&&(ie=i.RGBA8I),q===i.SHORT&&(ie=i.RGBA16I),q===i.INT&&(ie=i.RGBA32I)),E===i.RGB&&q===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),E===i.RGBA){let Oe=ae?ac:gt.getTransfer(se);q===i.FLOAT&&(ie=i.RGBA32F),q===i.HALF_FLOAT&&(ie=i.RGBA16F),q===i.UNSIGNED_BYTE&&(ie=Oe===Lt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function y(P,E){let q;return P?E===null||E===As||E===Tr?q=i.DEPTH24_STENCIL8:E===ai?q=i.DEPTH32F_STENCIL8:E===go&&(q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===As||E===Tr?q=i.DEPTH_COMPONENT24:E===ai?q=i.DEPTH_COMPONENT32F:E===go&&(q=i.DEPTH_COMPONENT16),q}function R(P,E){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==on&&P.minFilter!==vn?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function T(P){let E=P.target;E.removeEventListener("dispose",T),w(E),E.isVideoTexture&&u.delete(E)}function I(P){let E=P.target;E.removeEventListener("dispose",I),S(E)}function w(P){let E=n.get(P);if(E.__webglInit===void 0)return;let q=P.source,se=f.get(q);if(se){let ae=se[E.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&M(P),Object.keys(se).length===0&&f.delete(q)}n.remove(P)}function M(P){let E=n.get(P);i.deleteTexture(E.__webglTexture);let q=P.source,se=f.get(q);delete se[E.__cacheKey],o.memory.textures--}function S(P){let E=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(E.__webglFramebuffer[se]))for(let ae=0;ae<E.__webglFramebuffer[se].length;ae++)i.deleteFramebuffer(E.__webglFramebuffer[se][ae]);else i.deleteFramebuffer(E.__webglFramebuffer[se]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[se])}else{if(Array.isArray(E.__webglFramebuffer))for(let se=0;se<E.__webglFramebuffer.length;se++)i.deleteFramebuffer(E.__webglFramebuffer[se]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let se=0;se<E.__webglColorRenderbuffer.length;se++)E.__webglColorRenderbuffer[se]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[se]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let q=P.textures;for(let se=0,ae=q.length;se<ae;se++){let ie=n.get(q[se]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),o.memory.textures--),n.remove(q[se])}n.remove(P)}let z=0;function W(){z=0}function X(){let P=z;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),z+=1,P}function j(P){let E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function J(P,E){let q=n.get(P);if(P.isVideoTexture&&Ae(P),P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){let se=P.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ne(q,P,E);return}}t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+E)}function ee(P,E){let q=n.get(P);if(P.version>0&&q.__version!==P.version){ne(q,P,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+E)}function le(P,E){let q=n.get(P);if(P.version>0&&q.__version!==P.version){ne(q,P,E);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+E)}function Q(P,E){let q=n.get(P);if(P.version>0&&q.__version!==P.version){D(q,P,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+E)}let ye={[Ts]:i.REPEAT,[wi]:i.CLAMP_TO_EDGE,[mo]:i.MIRRORED_REPEAT},me={[on]:i.NEAREST,[Hu]:i.NEAREST_MIPMAP_NEAREST,[pr]:i.NEAREST_MIPMAP_LINEAR,[vn]:i.LINEAR,[uo]:i.LINEAR_MIPMAP_NEAREST,[Yn]:i.LINEAR_MIPMAP_LINEAR},ve={[Tg]:i.NEVER,[Lg]:i.ALWAYS,[Ag]:i.LESS,[jd]:i.LEQUAL,[Rg]:i.EQUAL,[Pg]:i.GEQUAL,[Cg]:i.GREATER,[Ig]:i.NOTEQUAL};function Ze(P,E){if(E.type===ai&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===vn||E.magFilter===uo||E.magFilter===pr||E.magFilter===Yn||E.minFilter===vn||E.minFilter===uo||E.minFilter===pr||E.minFilter===Yn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,ye[E.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,ye[E.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,ye[E.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,me[E.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,me[E.minFilter]),E.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,ve[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===on||E.minFilter!==pr&&E.minFilter!==Yn||E.type===ai&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function pt(P,E){let q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",T));let se=E.source,ae=f.get(se);ae===void 0&&(ae={},f.set(se,ae));let ie=j(E);if(ie!==P.__cacheKey){ae[ie]===void 0&&(ae[ie]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ae[ie].usedTimes++;let Oe=ae[P.__cacheKey];Oe!==void 0&&(ae[P.__cacheKey].usedTimes--,Oe.usedTimes===0&&M(E)),P.__cacheKey=ie,P.__webglTexture=ae[ie].texture}return q}function ne(P,E,q){let se=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(se=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(se=i.TEXTURE_3D);let ae=pt(P,E),ie=E.source;t.bindTexture(se,P.__webglTexture,i.TEXTURE0+q);let Oe=n.get(ie);if(ie.version!==Oe.__version||ae===!0){t.activeTexture(i.TEXTURE0+q);let Me=gt.getPrimaries(gt.workingColorSpace),Re=E.colorSpace===di?null:gt.getPrimaries(E.colorSpace),$e=E.colorSpace===di||Me===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let he=b(E.image,!1,s.maxTextureSize);he=Je(E,he);let Pe=r.convert(E.format,E.colorSpace),We=r.convert(E.type),Xe=v(E.internalFormat,Pe,We,E.colorSpace,E.isVideoTexture);Ze(se,E);let Ue,mt=E.mipmaps,et=E.isVideoTexture!==!0,Ve=Oe.__version===void 0||ae===!0,H=ie.dataReady,_e=R(E,he);if(E.isDepthTexture)Xe=y(E.format===Ar,E.type),Ve&&(et?t.texStorage2D(i.TEXTURE_2D,1,Xe,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,Xe,he.width,he.height,0,Pe,We,null));else if(E.isDataTexture)if(mt.length>0){et&&Ve&&t.texStorage2D(i.TEXTURE_2D,_e,Xe,mt[0].width,mt[0].height);for(let te=0,re=mt.length;te<re;te++)Ue=mt[te],et?H&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,Ue.width,Ue.height,Pe,We,Ue.data):t.texImage2D(i.TEXTURE_2D,te,Xe,Ue.width,Ue.height,0,Pe,We,Ue.data);E.generateMipmaps=!1}else et?(Ve&&t.texStorage2D(i.TEXTURE_2D,_e,Xe,he.width,he.height),H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he.width,he.height,Pe,We,he.data)):t.texImage2D(i.TEXTURE_2D,0,Xe,he.width,he.height,0,Pe,We,he.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){et&&Ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Xe,mt[0].width,mt[0].height,he.depth);for(let te=0,re=mt.length;te<re;te++)if(Ue=mt[te],E.format!==jn)if(Pe!==null)if(et){if(H)if(E.layerUpdates.size>0){let Ce=dd(Ue.width,Ue.height,E.format,E.type);for(let Se of E.layerUpdates){let Ke=Ue.data.subarray(Se*Ce/Ue.data.BYTES_PER_ELEMENT,(Se+1)*Ce/Ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,Se,Ue.width,Ue.height,1,Pe,Ke)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,Ue.width,Ue.height,he.depth,Pe,Ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,Xe,Ue.width,Ue.height,he.depth,0,Ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,Ue.width,Ue.height,he.depth,Pe,We,Ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,Xe,Ue.width,Ue.height,he.depth,0,Pe,We,Ue.data)}else{et&&Ve&&t.texStorage2D(i.TEXTURE_2D,_e,Xe,mt[0].width,mt[0].height);for(let te=0,re=mt.length;te<re;te++)Ue=mt[te],E.format!==jn?Pe!==null?et?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,Ue.width,Ue.height,Pe,Ue.data):t.compressedTexImage2D(i.TEXTURE_2D,te,Xe,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?H&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,Ue.width,Ue.height,Pe,We,Ue.data):t.texImage2D(i.TEXTURE_2D,te,Xe,Ue.width,Ue.height,0,Pe,We,Ue.data)}else if(E.isDataArrayTexture)if(et){if(Ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Xe,he.width,he.height,he.depth),H)if(E.layerUpdates.size>0){let te=dd(he.width,he.height,E.format,E.type);for(let re of E.layerUpdates){let Ce=he.data.subarray(re*te/he.data.BYTES_PER_ELEMENT,(re+1)*te/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,re,he.width,he.height,1,Pe,We,Ce)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Pe,We,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Xe,he.width,he.height,he.depth,0,Pe,We,he.data);else if(E.isData3DTexture)et?(Ve&&t.texStorage3D(i.TEXTURE_3D,_e,Xe,he.width,he.height,he.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Pe,We,he.data)):t.texImage3D(i.TEXTURE_3D,0,Xe,he.width,he.height,he.depth,0,Pe,We,he.data);else if(E.isFramebufferTexture){if(Ve)if(et)t.texStorage2D(i.TEXTURE_2D,_e,Xe,he.width,he.height);else{let te=he.width,re=he.height;for(let Ce=0;Ce<_e;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,Xe,te,re,0,Pe,We,null),te>>=1,re>>=1}}else if(mt.length>0){if(et&&Ve){let te=ze(mt[0]);t.texStorage2D(i.TEXTURE_2D,_e,Xe,te.width,te.height)}for(let te=0,re=mt.length;te<re;te++)Ue=mt[te],et?H&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,Pe,We,Ue):t.texImage2D(i.TEXTURE_2D,te,Xe,Pe,We,Ue);E.generateMipmaps=!1}else if(et){if(Ve){let te=ze(he);t.texStorage2D(i.TEXTURE_2D,_e,Xe,te.width,te.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Pe,We,he)}else t.texImage2D(i.TEXTURE_2D,0,Xe,Pe,We,he);m(E)&&d(se),Oe.__version=ie.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function D(P,E,q){if(E.image.length!==6)return;let se=pt(P,E),ae=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+q);let ie=n.get(ae);if(ae.version!==ie.__version||se===!0){t.activeTexture(i.TEXTURE0+q);let Oe=gt.getPrimaries(gt.workingColorSpace),Me=E.colorSpace===di?null:gt.getPrimaries(E.colorSpace),Re=E.colorSpace===di||Oe===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let $e=E.isCompressedTexture||E.image[0].isCompressedTexture,he=E.image[0]&&E.image[0].isDataTexture,Pe=[];for(let re=0;re<6;re++)!$e&&!he?Pe[re]=b(E.image[re],!0,s.maxCubemapSize):Pe[re]=he?E.image[re].image:E.image[re],Pe[re]=Je(E,Pe[re]);let We=Pe[0],Xe=r.convert(E.format,E.colorSpace),Ue=r.convert(E.type),mt=v(E.internalFormat,Xe,Ue,E.colorSpace),et=E.isVideoTexture!==!0,Ve=ie.__version===void 0||se===!0,H=ae.dataReady,_e=R(E,We);Ze(i.TEXTURE_CUBE_MAP,E);let te;if($e){et&&Ve&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,mt,We.width,We.height);for(let re=0;re<6;re++){te=Pe[re].mipmaps;for(let Ce=0;Ce<te.length;Ce++){let Se=te[Ce];E.format!==jn?Xe!==null?et?H&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce,0,0,Se.width,Se.height,Xe,Se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce,mt,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):et?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce,0,0,Se.width,Se.height,Xe,Ue,Se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce,mt,Se.width,Se.height,0,Xe,Ue,Se.data)}}}else{if(te=E.mipmaps,et&&Ve){te.length>0&&_e++;let re=ze(Pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,mt,re.width,re.height)}for(let re=0;re<6;re++)if(he){et?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Pe[re].width,Pe[re].height,Xe,Ue,Pe[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,mt,Pe[re].width,Pe[re].height,0,Xe,Ue,Pe[re].data);for(let Ce=0;Ce<te.length;Ce++){let Ke=te[Ce].image[re].image;et?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce+1,0,0,Ke.width,Ke.height,Xe,Ue,Ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce+1,mt,Ke.width,Ke.height,0,Xe,Ue,Ke.data)}}else{et?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Xe,Ue,Pe[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,mt,Xe,Ue,Pe[re]);for(let Ce=0;Ce<te.length;Ce++){let Se=te[Ce];et?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce+1,0,0,Xe,Ue,Se.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ce+1,mt,Xe,Ue,Se.image[re])}}}m(E)&&d(i.TEXTURE_CUBE_MAP),ie.__version=ae.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function O(P,E,q,se,ae,ie){let Oe=r.convert(q.format,q.colorSpace),Me=r.convert(q.type),Re=v(q.internalFormat,Oe,Me,q.colorSpace),$e=n.get(E),he=n.get(q);if(he.__renderTarget=E,!$e.__hasExternalTextures){let Pe=Math.max(1,E.width>>ie),We=Math.max(1,E.height>>ie);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,ie,Re,Pe,We,E.depth,0,Oe,Me,null):t.texImage2D(ae,ie,Re,Pe,We,0,Oe,Me,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),we(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,ae,he.__webglTexture,0,ge(E)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,se,ae,he.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Y(P,E,q){if(i.bindRenderbuffer(i.RENDERBUFFER,P),E.depthBuffer){let se=E.depthTexture,ae=se&&se.isDepthTexture?se.type:null,ie=y(E.stencilBuffer,ae),Oe=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=ge(E);we(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,ie,E.width,E.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,ie,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,ie,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Oe,i.RENDERBUFFER,P)}else{let se=E.textures;for(let ae=0;ae<se.length;ae++){let ie=se[ae],Oe=r.convert(ie.format,ie.colorSpace),Me=r.convert(ie.type),Re=v(ie.internalFormat,Oe,Me,ie.colorSpace),$e=ge(E);q&&we(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$e,Re,E.width,E.height):we(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$e,Re,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Re,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let se=n.get(E.depthTexture);se.__renderTarget=E,(!se.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),J(E.depthTexture,0);let ae=se.__webglTexture,ie=ge(E);if(E.depthTexture.format===yr)we(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(E.depthTexture.format===Ar)we(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function pe(P){let E=n.get(P),q=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){let se=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),se){let ae=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,se.removeEventListener("dispose",ae)};se.addEventListener("dispose",ae),E.__depthDisposeCallback=ae}E.__boundDepthTexture=se}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");fe(E.__webglFramebuffer,P)}else if(q){E.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[se]),E.__webglDepthbuffer[se]===void 0)E.__webglDepthbuffer[se]=i.createRenderbuffer(),Y(E.__webglDepthbuffer[se],P,!1);else{let ae=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=E.__webglDepthbuffer[se];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,ie)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),Y(E.__webglDepthbuffer,P,!1);else{let se=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,ae)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(P,E,q){let se=n.get(P);E!==void 0&&O(se.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&pe(P)}function it(P){let E=P.texture,q=n.get(P),se=n.get(E);P.addEventListener("dispose",I);let ae=P.textures,ie=P.isWebGLCubeRenderTarget===!0,Oe=ae.length>1;if(Oe||(se.__webglTexture===void 0&&(se.__webglTexture=i.createTexture()),se.__version=E.version,o.memory.textures++),ie){q.__webglFramebuffer=[];for(let Me=0;Me<6;Me++)if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer[Me]=[];for(let Re=0;Re<E.mipmaps.length;Re++)q.__webglFramebuffer[Me][Re]=i.createFramebuffer()}else q.__webglFramebuffer[Me]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){q.__webglFramebuffer=[];for(let Me=0;Me<E.mipmaps.length;Me++)q.__webglFramebuffer[Me]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Oe)for(let Me=0,Re=ae.length;Me<Re;Me++){let $e=n.get(ae[Me]);$e.__webglTexture===void 0&&($e.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&we(P)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Me=0;Me<ae.length;Me++){let Re=ae[Me];q.__webglColorRenderbuffer[Me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[Me]);let $e=r.convert(Re.format,Re.colorSpace),he=r.convert(Re.type),Pe=v(Re.internalFormat,$e,he,Re.colorSpace,P.isXRRenderTarget===!0),We=ge(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,Pe,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,q.__webglColorRenderbuffer[Me])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),Y(q.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,se.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,E);for(let Me=0;Me<6;Me++)if(E.mipmaps&&E.mipmaps.length>0)for(let Re=0;Re<E.mipmaps.length;Re++)O(q.__webglFramebuffer[Me][Re],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Re);else O(q.__webglFramebuffer[Me],P,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0);m(E)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Oe){for(let Me=0,Re=ae.length;Me<Re;Me++){let $e=ae[Me],he=n.get($e);t.bindTexture(i.TEXTURE_2D,he.__webglTexture),Ze(i.TEXTURE_2D,$e),O(q.__webglFramebuffer,P,$e,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,0),m($e)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let Me=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Me=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Me,se.__webglTexture),Ze(Me,E),E.mipmaps&&E.mipmaps.length>0)for(let Re=0;Re<E.mipmaps.length;Re++)O(q.__webglFramebuffer[Re],P,E,i.COLOR_ATTACHMENT0,Me,Re);else O(q.__webglFramebuffer,P,E,i.COLOR_ATTACHMENT0,Me,0);m(E)&&d(Me),t.unbindTexture()}P.depthBuffer&&pe(P)}function Ne(P){let E=P.textures;for(let q=0,se=E.length;q<se;q++){let ae=E[q];if(m(ae)){let ie=_(P),Oe=n.get(ae).__webglTexture;t.bindTexture(ie,Oe),d(ie),t.unbindTexture()}}}let lt=[],B=[];function ue(P){if(P.samples>0){if(we(P)===!1){let E=P.textures,q=P.width,se=P.height,ae=i.COLOR_BUFFER_BIT,ie=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Oe=n.get(P),Me=E.length>1;if(Me)for(let Re=0;Re<E.length;Re++)t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Oe.__webglFramebuffer);for(let Re=0;Re<E.length;Re++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),Me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Oe.__webglColorRenderbuffer[Re]);let $e=n.get(E[Re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$e,0)}i.blitFramebuffer(0,0,q,se,0,0,q,se,ae,i.NEAREST),c===!0&&(lt.length=0,B.length=0,lt.push(i.COLOR_ATTACHMENT0+Re),P.depthBuffer&&P.resolveDepthBuffer===!1&&(lt.push(ie),B.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Me)for(let Re=0;Re<E.length;Re++){t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,Oe.__webglColorRenderbuffer[Re]);let $e=n.get(E[Re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,$e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Oe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){let E=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function ge(P){return Math.min(s.maxSamples,P.samples)}function we(P){let E=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ae(P){let E=o.render.frame;u.get(P)!==E&&(u.set(P,E),P.update())}function Je(P,E){let q=P.colorSpace,se=P.format,ae=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||q!==dn&&q!==di&&(gt.getTransfer(q)===Lt?(se!==jn||ae!==Ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),E}function ze(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=W,this.setTexture2D=J,this.setTexture2DArray=ee,this.setTexture3D=le,this.setTextureCube=Q,this.rebindTextures=De,this.setupRenderTarget=it,this.updateRenderTargetMipmap=Ne,this.updateMultisampleRenderTarget=ue,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=O,this.useMultisampledRTT=we}function Ov(i,e){function t(n,s=di){let r,o=gt.getTransfer(s);if(n===Ri)return i.UNSIGNED_BYTE;if(n===Vu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Wu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Bd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===kd)return i.BYTE;if(n===Od)return i.SHORT;if(n===go)return i.UNSIGNED_SHORT;if(n===Gu)return i.INT;if(n===As)return i.UNSIGNED_INT;if(n===ai)return i.FLOAT;if(n===Ro)return i.HALF_FLOAT;if(n===Hd)return i.ALPHA;if(n===Gd)return i.RGB;if(n===jn)return i.RGBA;if(n===Vd)return i.LUMINANCE;if(n===Wd)return i.LUMINANCE_ALPHA;if(n===yr)return i.DEPTH_COMPONENT;if(n===Ar)return i.DEPTH_STENCIL;if(n===Xu)return i.RED;if(n===qu)return i.RED_INTEGER;if(n===Xd)return i.RG;if(n===Yu)return i.RG_INTEGER;if(n===ju)return i.RGBA_INTEGER;if(n===Sa||n===Ea||n===wa||n===Ta)if(o===Lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zl||n===Ul||n===Nl||n===Fl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===zl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ul)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Nl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===kl||n===Ol||n===Bl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===kl||n===Ol)return o===Lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Bl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Hl||n===Gl||n===Vl||n===Wl||n===Xl||n===ql||n===Yl||n===jl||n===Zl||n===Kl||n===Jl||n===Ql||n===$l||n===eu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Hl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Gl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ql)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Yl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===jl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Kl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Jl)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ql)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$l)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===eu)return o===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Aa||n===tu||n===nu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Aa)return o===Lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===tu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qd||n===iu||n===su||n===ru)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Aa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===iu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===su)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ru)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Tr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var vu=class extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Wt=class extends at{constructor(){super(),this.isGroup=!0,this.type="Group"}},Bv={type:"move"},po=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let b of e.hand.values()){let m=t.getJointPose(b,n),d=this._getHandJoint(l,b);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Bv)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Wt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Hv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gv=`
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

}`,_u=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new hn,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new $t({vertexShader:Hv,fragmentShader:Gv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new be(new ui(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Mu=class extends Ci{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,p=null,g=null,b=new _u,m=t.getContextAttributes(),d=null,_=null,v=[],y=[],R=new qe,T=null,I=new sn;I.viewport=new Tt;let w=new sn;w.viewport=new Tt;let M=[I,w],S=new vu,z=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let D=v[ne];return D===void 0&&(D=new po,v[ne]=D),D.getTargetRaySpace()},this.getControllerGrip=function(ne){let D=v[ne];return D===void 0&&(D=new po,v[ne]=D),D.getGripSpace()},this.getHand=function(ne){let D=v[ne];return D===void 0&&(D=new po,v[ne]=D),D.getHandSpace()};function X(ne){let D=y.indexOf(ne.inputSource);if(D===-1)return;let O=v[D];O!==void 0&&(O.update(ne.inputSource,ne.frame,l||o),O.dispatchEvent({type:ne.type,data:ne.inputSource}))}function j(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",J);for(let ne=0;ne<v.length;ne++){let D=y[ne];D!==null&&(y[ne]=null,v[ne].disconnect(D))}z=null,W=null,b.reset(),e.setRenderTarget(d),p=null,f=null,h=null,s=null,_=null,pt.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){r=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){a=ne,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ne){l=ne},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ne){if(s=ne,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",j),s.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(R),s.renderState.layers===void 0){let D={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,D),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Zn(p.framebufferWidth,p.framebufferHeight,{format:jn,type:Ri,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let D=null,O=null,Y=null;m.depth&&(Y=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,D=m.stencil?Ar:yr,O=m.stencil?Tr:As);let fe={colorFormat:t.RGBA8,depthFormat:Y,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(fe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new Zn(f.textureWidth,f.textureHeight,{format:jn,type:Ri,depthTexture:new Fa(f.textureWidth,f.textureHeight,O,void 0,void 0,void 0,void 0,void 0,void 0,D),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),pt.setContext(s),pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function J(ne){for(let D=0;D<ne.removed.length;D++){let O=ne.removed[D],Y=y.indexOf(O);Y>=0&&(y[Y]=null,v[Y].disconnect(O))}for(let D=0;D<ne.added.length;D++){let O=ne.added[D],Y=y.indexOf(O);if(Y===-1){for(let pe=0;pe<v.length;pe++)if(pe>=y.length){y.push(O),Y=pe;break}else if(y[pe]===null){y[pe]=O,Y=pe;break}if(Y===-1)break}let fe=v[Y];fe&&fe.connect(O)}}let ee=new k,le=new k;function Q(ne,D,O){ee.setFromMatrixPosition(D.matrixWorld),le.setFromMatrixPosition(O.matrixWorld);let Y=ee.distanceTo(le),fe=D.projectionMatrix.elements,pe=O.projectionMatrix.elements,De=fe[14]/(fe[10]-1),it=fe[14]/(fe[10]+1),Ne=(fe[9]+1)/fe[5],lt=(fe[9]-1)/fe[5],B=(fe[8]-1)/fe[0],ue=(pe[8]+1)/pe[0],ge=De*B,we=De*ue,Ae=Y/(-B+ue),Je=Ae*-B;if(D.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(Je),ne.translateZ(Ae),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),fe[10]===-1)ne.projectionMatrix.copy(D.projectionMatrix),ne.projectionMatrixInverse.copy(D.projectionMatrixInverse);else{let ze=De+Ae,P=it+Ae,E=ge-Je,q=we+(Y-Je),se=Ne*it/P*ze,ae=lt*it/P*ze;ne.projectionMatrix.makePerspective(E,q,se,ae,ze,P),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function ye(ne,D){D===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(D.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(s===null)return;let D=ne.near,O=ne.far;b.texture!==null&&(b.depthNear>0&&(D=b.depthNear),b.depthFar>0&&(O=b.depthFar)),S.near=w.near=I.near=D,S.far=w.far=I.far=O,(z!==S.near||W!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),z=S.near,W=S.far),I.layers.mask=ne.layers.mask|2,w.layers.mask=ne.layers.mask|4,S.layers.mask=I.layers.mask|w.layers.mask;let Y=ne.parent,fe=S.cameras;ye(S,Y);for(let pe=0;pe<fe.length;pe++)ye(fe[pe],Y);fe.length===2?Q(S,I,w):S.projectionMatrix.copy(I.projectionMatrix),me(ne,S,Y)};function me(ne,D,O){O===null?ne.matrix.copy(D.matrixWorld):(ne.matrix.copy(O.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(D.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(D.projectionMatrix),ne.projectionMatrixInverse.copy(D.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=Ir*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(ne){c=ne,f!==null&&(f.fixedFoveation=ne),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ne)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(S)};let ve=null;function Ze(ne,D){if(u=D.getViewerPose(l||o),g=D,u!==null){let O=u.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let Y=!1;O.length!==S.cameras.length&&(S.cameras.length=0,Y=!0);for(let pe=0;pe<O.length;pe++){let De=O[pe],it=null;if(p!==null)it=p.getViewport(De);else{let lt=h.getViewSubImage(f,De);it=lt.viewport,pe===0&&(e.setRenderTargetTextures(_,lt.colorTexture,f.ignoreDepthValues?void 0:lt.depthStencilTexture),e.setRenderTarget(_))}let Ne=M[pe];Ne===void 0&&(Ne=new sn,Ne.layers.enable(pe),Ne.viewport=new Tt,M[pe]=Ne),Ne.matrix.fromArray(De.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(De.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(it.x,it.y,it.width,it.height),pe===0&&(S.matrix.copy(Ne.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),Y===!0&&S.cameras.push(Ne)}let fe=s.enabledFeatures;if(fe&&fe.includes("depth-sensing")){let pe=h.getDepthInformation(O[0]);pe&&pe.isValid&&pe.texture&&b.init(e,pe,s.renderState)}}for(let O=0;O<v.length;O++){let Y=y[O],fe=v[O];Y!==null&&fe!==void 0&&fe.update(Y,D,l||o)}ve&&ve(ne,D),D.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:D}),g=null}let pt=new ep;pt.setAnimationLoop(Ze),this.setAnimationLoop=function(ne){ve=ne},this.dispose=function(){}}},Ms=new li,Vv=new nt;function Wv(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,$d(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,_,v,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),b(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,_,v):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===rn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===rn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let _=e.get(d),v=_.envMap,y=_.envMapRotation;v&&(m.envMap.value=v,Ms.copy(y),Ms.x*=-1,Ms.y*=-1,Ms.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ms.y*=-1,Ms.z*=-1),m.envMapRotation.value.setFromMatrix4(Vv.makeRotationFromEuler(Ms)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,_,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*_,m.scale.value=v*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,_){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===rn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function b(m,d){let _=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Xv(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,v){let y=v.program;n.uniformBlockBinding(_,y)}function l(_,v){let y=s[_.id];y===void 0&&(g(_),y=u(_),s[_.id]=y,_.addEventListener("dispose",m));let R=v.program;n.updateUBOMapping(_,R);let T=e.render.frame;r[_.id]!==T&&(f(_),r[_.id]=T)}function u(_){let v=h();_.__bindingPointIndex=v;let y=i.createBuffer(),R=_.__size,T=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,y),y}function h(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let v=s[_.id],y=_.uniforms,R=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,I=y.length;T<I;T++){let w=Array.isArray(y[T])?y[T]:[y[T]];for(let M=0,S=w.length;M<S;M++){let z=w[M];if(p(z,T,M,R)===!0){let W=z.__offset,X=Array.isArray(z.value)?z.value:[z.value],j=0;for(let J=0;J<X.length;J++){let ee=X[J],le=b(ee);typeof ee=="number"||typeof ee=="boolean"?(z.__data[0]=ee,i.bufferSubData(i.UNIFORM_BUFFER,W+j,z.__data)):ee.isMatrix3?(z.__data[0]=ee.elements[0],z.__data[1]=ee.elements[1],z.__data[2]=ee.elements[2],z.__data[3]=0,z.__data[4]=ee.elements[3],z.__data[5]=ee.elements[4],z.__data[6]=ee.elements[5],z.__data[7]=0,z.__data[8]=ee.elements[6],z.__data[9]=ee.elements[7],z.__data[10]=ee.elements[8],z.__data[11]=0):(ee.toArray(z.__data,j),j+=le.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(_,v,y,R){let T=_.value,I=v+"_"+y;if(R[I]===void 0)return typeof T=="number"||typeof T=="boolean"?R[I]=T:R[I]=T.clone(),!0;{let w=R[I];if(typeof T=="number"||typeof T=="boolean"){if(w!==T)return R[I]=T,!0}else if(w.equals(T)===!1)return w.copy(T),!0}return!1}function g(_){let v=_.uniforms,y=0,R=16;for(let I=0,w=v.length;I<w;I++){let M=Array.isArray(v[I])?v[I]:[v[I]];for(let S=0,z=M.length;S<z;S++){let W=M[S],X=Array.isArray(W.value)?W.value:[W.value];for(let j=0,J=X.length;j<J;j++){let ee=X[j],le=b(ee),Q=y%R,ye=Q%le.boundary,me=Q+ye;y+=ye,me!==0&&R-me<le.storage&&(y+=R-me),W.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=y,y+=le.storage}}}let T=y%R;return T>0&&(y+=R-T),_.__size=y,_.__cache={},this}function b(_){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function m(_){let v=_.target;v.removeEventListener("dispose",m);let y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function d(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}var ka=class{constructor(e={}){let{canvas:t=Zg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),b=new Int32Array(4),m=null,d=null,_=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Xt,this.toneMapping=Ki,this.toneMappingExposure=1;let y=this,R=!1,T=0,I=0,w=null,M=-1,S=null,z=new Tt,W=new Tt,X=null,j=new Le(0),J=0,ee=t.width,le=t.height,Q=1,ye=null,me=null,ve=new Tt(0,0,ee,le),Ze=new Tt(0,0,ee,le),pt=!1,ne=new yo,D=!1,O=!1,Y=new nt,fe=new nt,pe=new k,De=new Tt,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function lt(){return w===null?Q:1}let B=n;function ue(A,V){return t.getContext(A,V)}try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fu}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",Ce,!1),t.addEventListener("webglcontextcreationerror",Se,!1),B===null){let V="webgl2";if(B=ue(V,A),B===null)throw ue(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ge,we,Ae,Je,ze,P,E,q,se,ae,ie,Oe,Me,Re,$e,he,Pe,We,Xe,Ue,mt,et,Ve,H;function _e(){ge=new ay(B),ge.init(),et=new Ov(B,ge),we=new ty(B,ge,e,et),Ae=new Nv(B,ge),we.reverseDepthBuffer&&f&&Ae.buffers.depth.setReversed(!0),Je=new uy(B),ze=new Sv,P=new kv(B,ge,Ae,ze,we,et,Je),E=new iy(y),q=new oy(y),se=new x0(B),Ve=new $b(B,se),ae=new cy(B,se,Je,Ve),ie=new fy(B,ae,se,Je),Xe=new hy(B,we,P),he=new ny(ze),Oe=new Mv(y,E,q,ge,we,Ve,he),Me=new Wv(y,ze),Re=new wv,$e=new Pv(ge),We=new Qb(y,E,q,Ae,ie,p,c),Pe=new zv(y,ie,we),H=new Xv(B,Je,we,Ae),Ue=new ey(B,ge,Je),mt=new ly(B,ge,Je),Je.programs=Oe.programs,y.capabilities=we,y.extensions=ge,y.properties=ze,y.renderLists=Re,y.shadowMap=Pe,y.state=Ae,y.info=Je}_e();let te=new Mu(y,B);this.xr=te,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let A=ge.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=ge.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(A){A!==void 0&&(Q=A,this.setSize(ee,le,!1))},this.getSize=function(A){return A.set(ee,le)},this.setSize=function(A,V,Z=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ee=A,le=V,t.width=Math.floor(A*Q),t.height=Math.floor(V*Q),Z===!0&&(t.style.width=A+"px",t.style.height=V+"px"),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(ee*Q,le*Q).floor()},this.setDrawingBufferSize=function(A,V,Z){ee=A,le=V,Q=Z,t.width=Math.floor(A*Z),t.height=Math.floor(V*Z),this.setViewport(0,0,A,V)},this.getCurrentViewport=function(A){return A.copy(z)},this.getViewport=function(A){return A.copy(ve)},this.setViewport=function(A,V,Z,K){A.isVector4?ve.set(A.x,A.y,A.z,A.w):ve.set(A,V,Z,K),Ae.viewport(z.copy(ve).multiplyScalar(Q).round())},this.getScissor=function(A){return A.copy(Ze)},this.setScissor=function(A,V,Z,K){A.isVector4?Ze.set(A.x,A.y,A.z,A.w):Ze.set(A,V,Z,K),Ae.scissor(W.copy(Ze).multiplyScalar(Q).round())},this.getScissorTest=function(){return pt},this.setScissorTest=function(A){Ae.setScissorTest(pt=A)},this.setOpaqueSort=function(A){ye=A},this.setTransparentSort=function(A){me=A},this.getClearColor=function(A){return A.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor.apply(We,arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha.apply(We,arguments)},this.clear=function(A=!0,V=!0,Z=!0){let K=0;if(A){let G=!1;if(w!==null){let de=w.texture.format;G=de===ju||de===Yu||de===qu}if(G){let de=w.texture.type,Te=de===Ri||de===As||de===go||de===Tr||de===Vu||de===Wu,Fe=We.getClearColor(),ke=We.getClearAlpha(),je=Fe.r,tt=Fe.g,Be=Fe.b;Te?(g[0]=je,g[1]=tt,g[2]=Be,g[3]=ke,B.clearBufferuiv(B.COLOR,0,g)):(b[0]=je,b[1]=tt,b[2]=Be,b[3]=ke,B.clearBufferiv(B.COLOR,0,b))}else K|=B.COLOR_BUFFER_BIT}V&&(K|=B.DEPTH_BUFFER_BIT),Z&&(K|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",Ce,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Re.dispose(),$e.dispose(),ze.dispose(),E.dispose(),q.dispose(),ie.dispose(),Ve.dispose(),H.dispose(),Oe.dispose(),te.dispose(),te.removeEventListener("sessionstart",In),te.removeEventListener("sessionend",ks),tn.stop()};function re(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Ce(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let A=Je.autoReset,V=Pe.enabled,Z=Pe.autoUpdate,K=Pe.needsUpdate,G=Pe.type;_e(),Je.autoReset=A,Pe.enabled=V,Pe.autoUpdate=Z,Pe.needsUpdate=K,Pe.type=G}function Se(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ke(A){let V=A.target;V.removeEventListener("dispose",Ke),Ut(V)}function Ut(A){jt(A),ze.remove(A)}function jt(A){let V=ze.get(A).programs;V!==void 0&&(V.forEach(function(Z){Oe.releaseProgram(Z)}),A.isShaderMaterial&&Oe.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,Z,K,G,de){V===null&&(V=it);let Te=G.isMesh&&G.matrixWorld.determinant()<0,Fe=Hs(A,V,Z,K,G);Ae.setMaterial(K,Te);let ke=Z.index,je=1;if(K.wireframe===!0){if(ke=ae.getWireframeAttribute(Z),ke===void 0)return;je=2}let tt=Z.drawRange,Be=Z.attributes.position,xt=tt.start*je,At=(tt.start+tt.count)*je;de!==null&&(xt=Math.max(xt,de.start*je),At=Math.min(At,(de.start+de.count)*je)),ke!==null?(xt=Math.max(xt,0),At=Math.min(At,ke.count)):Be!=null&&(xt=Math.max(xt,0),At=Math.min(At,Be.count));let It=At-xt;if(It<0||It===1/0)return;Ve.setup(G,K,Fe,Z,ke);let pn,bt=Ue;if(ke!==null&&(pn=se.get(ke),bt=mt,bt.setIndex(pn)),G.isMesh)K.wireframe===!0?(Ae.setLineWidth(K.wireframeLinewidth*lt()),bt.setMode(B.LINES)):bt.setMode(B.TRIANGLES);else if(G.isLine){let He=K.linewidth;He===void 0&&(He=1),Ae.setLineWidth(He*lt()),G.isLineSegments?bt.setMode(B.LINES):G.isLineLoop?bt.setMode(B.LINE_LOOP):bt.setMode(B.LINE_STRIP)}else G.isPoints?bt.setMode(B.POINTS):G.isSprite&&bt.setMode(B.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)bt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(ge.get("WEBGL_multi_draw"))bt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let He=G._multiDrawStarts,Mn=G._multiDrawCounts,_t=G._multiDrawCount,Pn=ke?se.get(ke).bytesPerElement:1,Bi=ze.get(K).currentProgram.getUniforms();for(let Yt=0;Yt<_t;Yt++)Bi.setValue(B,"_gl_DrawID",Yt),bt.render(He[Yt]/Pn,Mn[Yt])}else if(G.isInstancedMesh)bt.renderInstances(xt,It,G.count);else if(Z.isInstancedBufferGeometry){let He=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Mn=Math.min(Z.instanceCount,He);bt.renderInstances(xt,It,Mn)}else bt.render(xt,It)};function wt(A,V,Z){A.transparent===!0&&A.side===Dt&&A.forceSinglePass===!1?(A.side=rn,A.needsUpdate=!0,hs(A,V,Z),A.side=Bn,A.needsUpdate=!0,hs(A,V,Z),A.side=Dt):hs(A,V,Z)}this.compile=function(A,V,Z=null){Z===null&&(Z=A),d=$e.get(Z),d.init(V),v.push(d),Z.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),A!==Z&&A.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();let K=new Set;return A.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let de=G.material;if(de)if(Array.isArray(de))for(let Te=0;Te<de.length;Te++){let Fe=de[Te];wt(Fe,Z,G),K.add(Fe)}else wt(de,Z,G),K.add(de)}),v.pop(),d=null,K},this.compileAsync=function(A,V,Z=null){let K=this.compile(A,V,Z);return new Promise(G=>{function de(){if(K.forEach(function(Te){ze.get(Te).currentProgram.isReady()&&K.delete(Te)}),K.size===0){G(A);return}setTimeout(de,10)}ge.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Un=null;function Cn(A){Un&&Un(A)}function In(){tn.stop()}function ks(){tn.start()}let tn=new ep;tn.setAnimationLoop(Cn),typeof self<"u"&&tn.setContext(self),this.setAnimationLoop=function(A){Un=A,te.setAnimationLoop(A),A===null?tn.stop():tn.start()},te.addEventListener("sessionstart",In),te.addEventListener("sessionend",ks),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(V),V=te.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,V,w),d=$e.get(A,v.length),d.init(V),v.push(d),fe.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ne.setFromProjectionMatrix(fe),O=this.localClippingEnabled,D=he.init(this.clippingPlanes,O),m=Re.get(A,_.length),m.init(),_.push(m),te.enabled===!0&&te.isPresenting===!0){let de=y.xr.getDepthSensingMesh();de!==null&&ki(de,V,-1/0,y.sortObjects)}ki(A,V,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ye,me),Ne=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Ne&&We.addToRenderList(m,A),this.info.render.frame++,D===!0&&he.beginShadows();let Z=d.state.shadowsArray;Pe.render(Z,A,V),D===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();let K=m.opaque,G=m.transmissive;if(d.setupLights(),V.isArrayCamera){let de=V.cameras;if(G.length>0)for(let Te=0,Fe=de.length;Te<Fe;Te++){let ke=de[Te];Fo(K,G,A,ke)}Ne&&We.render(A);for(let Te=0,Fe=de.length;Te<Fe;Te++){let ke=de[Te];mi(m,A,ke,ke.viewport)}}else G.length>0&&Fo(K,G,A,V),Ne&&We.render(A),mi(m,A,V);w!==null&&(P.updateMultisampleRenderTarget(w),P.updateRenderTargetMipmap(w)),A.isScene===!0&&A.onAfterRender(y,A,V),Ve.resetDefaultState(),M=-1,S=null,v.pop(),v.length>0?(d=v[v.length-1],D===!0&&he.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function ki(A,V,Z,K){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLight)d.pushLight(A),A.castShadow&&d.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ne.intersectsSprite(A)){K&&De.setFromMatrixPosition(A.matrixWorld).applyMatrix4(fe);let Te=ie.update(A),Fe=A.material;Fe.visible&&m.push(A,Te,Fe,Z,De.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ne.intersectsObject(A))){let Te=ie.update(A),Fe=A.material;if(K&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),De.copy(A.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),De.copy(Te.boundingSphere.center)),De.applyMatrix4(A.matrixWorld).applyMatrix4(fe)),Array.isArray(Fe)){let ke=Te.groups;for(let je=0,tt=ke.length;je<tt;je++){let Be=ke[je],xt=Fe[Be.materialIndex];xt&&xt.visible&&m.push(A,Te,xt,Z,De.z,Be)}}else Fe.visible&&m.push(A,Te,Fe,Z,De.z,null)}}let de=A.children;for(let Te=0,Fe=de.length;Te<Fe;Te++)ki(de[Te],V,Z,K)}function mi(A,V,Z,K){let G=A.opaque,de=A.transmissive,Te=A.transparent;d.setupLightsView(Z),D===!0&&he.setGlobalState(y.clippingPlanes,Z),K&&Ae.viewport(z.copy(K)),G.length>0&&Os(G,V,Z),de.length>0&&Os(de,V,Z),Te.length>0&&Os(Te,V,Z),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function Fo(A,V,Z,K){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[K.id]===void 0&&(d.state.transmissionRenderTarget[K.id]=new Zn(1,1,{generateMipmaps:!0,type:ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float")?Ro:Ri,minFilter:Yn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:gt.workingColorSpace}));let de=d.state.transmissionRenderTarget[K.id],Te=K.viewport||z;de.setSize(Te.z,Te.w);let Fe=y.getRenderTarget();y.setRenderTarget(de),y.getClearColor(j),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),Ne&&We.render(Z);let ke=y.toneMapping;y.toneMapping=Ki;let je=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),d.setupLightsView(K),D===!0&&he.setGlobalState(y.clippingPlanes,K),Os(A,Z,K),P.updateMultisampleRenderTarget(de),P.updateRenderTargetMipmap(de),ge.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let Be=0,xt=V.length;Be<xt;Be++){let At=V[Be],It=At.object,pn=At.geometry,bt=At.material,He=At.group;if(bt.side===Dt&&It.layers.test(K.layers)){let Mn=bt.side;bt.side=rn,bt.needsUpdate=!0,Bs(It,Z,K,pn,bt,He),bt.side=Mn,bt.needsUpdate=!0,tt=!0}}tt===!0&&(P.updateMultisampleRenderTarget(de),P.updateRenderTargetMipmap(de))}y.setRenderTarget(Fe),y.setClearColor(j,J),je!==void 0&&(K.viewport=je),y.toneMapping=ke}function Os(A,V,Z){let K=V.isScene===!0?V.overrideMaterial:null;for(let G=0,de=A.length;G<de;G++){let Te=A[G],Fe=Te.object,ke=Te.geometry,je=K===null?Te.material:K,tt=Te.group;Fe.layers.test(Z.layers)&&Bs(Fe,V,Z,ke,je,tt)}}function Bs(A,V,Z,K,G,de){A.onBeforeRender(y,V,Z,K,G,de),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),G.onBeforeRender(y,V,Z,K,A,de),G.transparent===!0&&G.side===Dt&&G.forceSinglePass===!1?(G.side=rn,G.needsUpdate=!0,y.renderBufferDirect(Z,V,K,G,A,de),G.side=Bn,G.needsUpdate=!0,y.renderBufferDirect(Z,V,K,G,A,de),G.side=Dt):y.renderBufferDirect(Z,V,K,G,A,de),A.onAfterRender(y,V,Z,K,G,de)}function hs(A,V,Z){V.isScene!==!0&&(V=it);let K=ze.get(A),G=d.state.lights,de=d.state.shadowsArray,Te=G.state.version,Fe=Oe.getParameters(A,G.state,de,V,Z),ke=Oe.getProgramCacheKey(Fe),je=K.programs;K.environment=A.isMeshStandardMaterial?V.environment:null,K.fog=V.fog,K.envMap=(A.isMeshStandardMaterial?q:E).get(A.envMap||K.environment),K.envMapRotation=K.environment!==null&&A.envMap===null?V.environmentRotation:A.envMapRotation,je===void 0&&(A.addEventListener("dispose",Ke),je=new Map,K.programs=je);let tt=je.get(ke);if(tt!==void 0){if(K.currentProgram===tt&&K.lightsStateVersion===Te)return Oi(A,Fe),tt}else Fe.uniforms=Oe.getUniforms(A),A.onBeforeCompile(Fe,y),tt=Oe.acquireProgram(Fe,ke),je.set(ke,tt),K.uniforms=Fe.uniforms;let Be=K.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Be.clippingPlanes=he.uniform),Oi(A,Fe),K.needsLights=Xn(A),K.lightsStateVersion=Te,K.needsLights&&(Be.ambientLightColor.value=G.state.ambient,Be.lightProbe.value=G.state.probe,Be.directionalLights.value=G.state.directional,Be.directionalLightShadows.value=G.state.directionalShadow,Be.spotLights.value=G.state.spot,Be.spotLightShadows.value=G.state.spotShadow,Be.rectAreaLights.value=G.state.rectArea,Be.ltc_1.value=G.state.rectAreaLTC1,Be.ltc_2.value=G.state.rectAreaLTC2,Be.pointLights.value=G.state.point,Be.pointLightShadows.value=G.state.pointShadow,Be.hemisphereLights.value=G.state.hemi,Be.directionalShadowMap.value=G.state.directionalShadowMap,Be.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Be.spotShadowMap.value=G.state.spotShadowMap,Be.spotLightMatrix.value=G.state.spotLightMatrix,Be.spotLightMap.value=G.state.spotLightMap,Be.pointShadowMap.value=G.state.pointShadowMap,Be.pointShadowMatrix.value=G.state.pointShadowMatrix),K.currentProgram=tt,K.uniformsList=null,tt}function ko(A){if(A.uniformsList===null){let V=A.currentProgram.getUniforms();A.uniformsList=_r.seqWithValue(V.seq,A.uniforms)}return A.uniformsList}function Oi(A,V){let Z=ze.get(A);Z.outputColorSpace=V.outputColorSpace,Z.batching=V.batching,Z.batchingColor=V.batchingColor,Z.instancing=V.instancing,Z.instancingColor=V.instancingColor,Z.instancingMorph=V.instancingMorph,Z.skinning=V.skinning,Z.morphTargets=V.morphTargets,Z.morphNormals=V.morphNormals,Z.morphColors=V.morphColors,Z.morphTargetsCount=V.morphTargetsCount,Z.numClippingPlanes=V.numClippingPlanes,Z.numIntersection=V.numClipIntersection,Z.vertexAlphas=V.vertexAlphas,Z.vertexTangents=V.vertexTangents,Z.toneMapping=V.toneMapping}function Hs(A,V,Z,K,G){V.isScene!==!0&&(V=it),P.resetTextureUnits();let de=V.fog,Te=K.isMeshStandardMaterial?V.environment:null,Fe=w===null?y.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:dn,ke=(K.isMeshStandardMaterial?q:E).get(K.envMap||Te),je=K.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,tt=!!Z.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Be=!!Z.morphAttributes.position,xt=!!Z.morphAttributes.normal,At=!!Z.morphAttributes.color,It=Ki;K.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(It=y.toneMapping);let pn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,bt=pn!==void 0?pn.length:0,He=ze.get(K),Mn=d.state.lights;if(D===!0&&(O===!0||A!==S)){let Sn=A===S&&K.id===M;he.setState(K,A,Sn)}let _t=!1;K.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Mn.state.version||He.outputColorSpace!==Fe||G.isBatchedMesh&&He.batching===!1||!G.isBatchedMesh&&He.batching===!0||G.isBatchedMesh&&He.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&He.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&He.instancing===!1||!G.isInstancedMesh&&He.instancing===!0||G.isSkinnedMesh&&He.skinning===!1||!G.isSkinnedMesh&&He.skinning===!0||G.isInstancedMesh&&He.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&He.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&He.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&He.instancingMorph===!1&&G.morphTexture!==null||He.envMap!==ke||K.fog===!0&&He.fog!==de||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==he.numPlanes||He.numIntersection!==he.numIntersection)||He.vertexAlphas!==je||He.vertexTangents!==tt||He.morphTargets!==Be||He.morphNormals!==xt||He.morphColors!==At||He.toneMapping!==It||He.morphTargetsCount!==bt)&&(_t=!0):(_t=!0,He.__version=K.version);let Pn=He.currentProgram;_t===!0&&(Pn=hs(K,V,G));let Bi=!1,Yt=!1,gi=!1,Nt=Pn.getUniforms(),Zt=He.uniforms;if(Ae.useProgram(Pn.program)&&(Bi=!0,Yt=!0,gi=!0),K.id!==M&&(M=K.id,Yt=!0),Bi||S!==A){Ae.buffers.depth.getReversed()?(Y.copy(A.projectionMatrix),Jg(Y),Qg(Y),Nt.setValue(B,"projectionMatrix",Y)):Nt.setValue(B,"projectionMatrix",A.projectionMatrix),Nt.setValue(B,"viewMatrix",A.matrixWorldInverse);let Vt=Nt.map.cameraPosition;Vt!==void 0&&Vt.setValue(B,pe.setFromMatrixPosition(A.matrixWorld)),we.logarithmicDepthBuffer&&Nt.setValue(B,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Nt.setValue(B,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,Yt=!0,gi=!0)}if(G.isSkinnedMesh){Nt.setOptional(B,G,"bindMatrix"),Nt.setOptional(B,G,"bindMatrixInverse");let Sn=G.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),Nt.setValue(B,"boneTexture",Sn.boneTexture,P))}G.isBatchedMesh&&(Nt.setOptional(B,G,"batchingTexture"),Nt.setValue(B,"batchingTexture",G._matricesTexture,P),Nt.setOptional(B,G,"batchingIdTexture"),Nt.setValue(B,"batchingIdTexture",G._indirectTexture,P),Nt.setOptional(B,G,"batchingColorTexture"),G._colorsTexture!==null&&Nt.setValue(B,"batchingColorTexture",G._colorsTexture,P));let fs=Z.morphAttributes;if((fs.position!==void 0||fs.normal!==void 0||fs.color!==void 0)&&Xe.update(G,Z,Pn),(Yt||He.receiveShadow!==G.receiveShadow)&&(He.receiveShadow=G.receiveShadow,Nt.setValue(B,"receiveShadow",G.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(Zt.envMap.value=ke,Zt.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&V.environment!==null&&(Zt.envMapIntensity.value=V.environmentIntensity),Yt&&(Nt.setValue(B,"toneMappingExposure",y.toneMappingExposure),He.needsLights&&Oo(Zt,gi),de&&K.fog===!0&&Me.refreshFogUniforms(Zt,de),Me.refreshMaterialUniforms(Zt,K,Q,le,d.state.transmissionRenderTarget[A.id]),_r.upload(B,ko(He),Zt,P)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(_r.upload(B,ko(He),Zt,P),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Nt.setValue(B,"center",G.center),Nt.setValue(B,"modelViewMatrix",G.modelViewMatrix),Nt.setValue(B,"normalMatrix",G.normalMatrix),Nt.setValue(B,"modelMatrix",G.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){let Sn=K.uniformsGroups;for(let Vt=0,Nn=Sn.length;Vt<Nn;Vt++){let Bo=Sn[Vt];H.update(Bo,Pn),H.bind(Bo,Pn)}}return Pn}function Oo(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function Xn(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(A,V,Z){ze.get(A.texture).__webglTexture=V,ze.get(A.depthTexture).__webglTexture=Z;let K=ze.get(A);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=Z===void 0,K.__autoAllocateDepthBuffer||ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,V){let Z=ze.get(A);Z.__webglFramebuffer=V,Z.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(A,V=0,Z=0){w=A,T=V,I=Z;let K=!0,G=null,de=!1,Te=!1;if(A){let ke=ze.get(A);if(ke.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(B.FRAMEBUFFER,null),K=!1;else if(ke.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(ke.__hasExternalTextures)P.rebindTextures(A,ze.get(A.texture).__webglTexture,ze.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Be=A.depthTexture;if(ke.__boundDepthTexture!==Be){if(Be!==null&&ze.has(Be)&&(A.width!==Be.image.width||A.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}let je=A.texture;(je.isData3DTexture||je.isDataArrayTexture||je.isCompressedArrayTexture)&&(Te=!0);let tt=ze.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(tt[V])?G=tt[V][Z]:G=tt[V],de=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?G=ze.get(A).__webglMultisampledFramebuffer:Array.isArray(tt)?G=tt[Z]:G=tt,z.copy(A.viewport),W.copy(A.scissor),X=A.scissorTest}else z.copy(ve).multiplyScalar(Q).floor(),W.copy(Ze).multiplyScalar(Q).floor(),X=pt;if(Ae.bindFramebuffer(B.FRAMEBUFFER,G)&&K&&Ae.drawBuffers(A,G),Ae.viewport(z),Ae.scissor(W),Ae.setScissorTest(X),de){let ke=ze.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+V,ke.__webglTexture,Z)}else if(Te){let ke=ze.get(A.texture),je=V||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,ke.__webglTexture,Z||0,je)}M=-1},this.readRenderTargetPixels=function(A,V,Z,K,G,de,Te){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=ze.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Te!==void 0&&(Fe=Fe[Te]),Fe){Ae.bindFramebuffer(B.FRAMEBUFFER,Fe);try{let ke=A.texture,je=ke.format,tt=ke.type;if(!we.textureFormatReadable(je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!we.textureTypeReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-K&&Z>=0&&Z<=A.height-G&&B.readPixels(V,Z,K,G,et.convert(je),et.convert(tt),de)}finally{let ke=w!==null?ze.get(w).__webglFramebuffer:null;Ae.bindFramebuffer(B.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(A,V,Z,K,G,de,Te){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=ze.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Te!==void 0&&(Fe=Fe[Te]),Fe){let ke=A.texture,je=ke.format,tt=ke.type;if(!we.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!we.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=A.width-K&&Z>=0&&Z<=A.height-G){Ae.bindFramebuffer(B.FRAMEBUFFER,Fe);let Be=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Be),B.bufferData(B.PIXEL_PACK_BUFFER,de.byteLength,B.STREAM_READ),B.readPixels(V,Z,K,G,et.convert(je),et.convert(tt),0);let xt=w!==null?ze.get(w).__webglFramebuffer:null;Ae.bindFramebuffer(B.FRAMEBUFFER,xt);let At=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Kg(B,At,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Be),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,de),B.deleteBuffer(Be),B.deleteSync(At),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,V=null,Z=0){A.isTexture!==!0&&(co("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,A=arguments[1]);let K=Math.pow(2,-Z),G=Math.floor(A.image.width*K),de=Math.floor(A.image.height*K),Te=V!==null?V.x:0,Fe=V!==null?V.y:0;P.setTexture2D(A,0),B.copyTexSubImage2D(B.TEXTURE_2D,Z,0,0,Te,Fe,G,de),Ae.unbindTexture()},this.copyTextureToTexture=function(A,V,Z=null,K=null,G=0){A.isTexture!==!0&&(co("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,A=arguments[1],V=arguments[2],G=arguments[3]||0,Z=null);let de,Te,Fe,ke,je,tt,Be,xt,At,It=A.isCompressedTexture?A.mipmaps[G]:A.image;Z!==null?(de=Z.max.x-Z.min.x,Te=Z.max.y-Z.min.y,Fe=Z.isBox3?Z.max.z-Z.min.z:1,ke=Z.min.x,je=Z.min.y,tt=Z.isBox3?Z.min.z:0):(de=It.width,Te=It.height,Fe=It.depth||1,ke=0,je=0,tt=0),K!==null?(Be=K.x,xt=K.y,At=K.z):(Be=0,xt=0,At=0);let pn=et.convert(V.format),bt=et.convert(V.type),He;V.isData3DTexture?(P.setTexture3D(V,0),He=B.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(P.setTexture2DArray(V,0),He=B.TEXTURE_2D_ARRAY):(P.setTexture2D(V,0),He=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,V.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,V.unpackAlignment);let Mn=B.getParameter(B.UNPACK_ROW_LENGTH),_t=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Pn=B.getParameter(B.UNPACK_SKIP_PIXELS),Bi=B.getParameter(B.UNPACK_SKIP_ROWS),Yt=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,It.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,It.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,ke),B.pixelStorei(B.UNPACK_SKIP_ROWS,je),B.pixelStorei(B.UNPACK_SKIP_IMAGES,tt);let gi=A.isDataArrayTexture||A.isData3DTexture,Nt=V.isDataArrayTexture||V.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let Zt=ze.get(A),fs=ze.get(V),Sn=ze.get(Zt.__renderTarget),Vt=ze.get(fs.__renderTarget);Ae.bindFramebuffer(B.READ_FRAMEBUFFER,Sn.__webglFramebuffer),Ae.bindFramebuffer(B.DRAW_FRAMEBUFFER,Vt.__webglFramebuffer);for(let Nn=0;Nn<Fe;Nn++)gi&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ze.get(A).__webglTexture,G,tt+Nn),A.isDepthTexture?(Nt&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ze.get(V).__webglTexture,G,At+Nn),B.blitFramebuffer(ke,je,de,Te,Be,xt,de,Te,B.DEPTH_BUFFER_BIT,B.NEAREST)):Nt?B.copyTexSubImage3D(He,G,Be,xt,At+Nn,ke,je,de,Te):B.copyTexSubImage2D(He,G,Be,xt,At+Nn,ke,je,de,Te);Ae.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Nt?A.isDataTexture||A.isData3DTexture?B.texSubImage3D(He,G,Be,xt,At,de,Te,Fe,pn,bt,It.data):V.isCompressedArrayTexture?B.compressedTexSubImage3D(He,G,Be,xt,At,de,Te,Fe,pn,It.data):B.texSubImage3D(He,G,Be,xt,At,de,Te,Fe,pn,bt,It):A.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,G,Be,xt,de,Te,pn,bt,It.data):A.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,G,Be,xt,It.width,It.height,pn,It.data):B.texSubImage2D(B.TEXTURE_2D,G,Be,xt,de,Te,pn,bt,It);B.pixelStorei(B.UNPACK_ROW_LENGTH,Mn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,_t),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Pn),B.pixelStorei(B.UNPACK_SKIP_ROWS,Bi),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Yt),G===0&&V.generateMipmaps&&B.generateMipmap(He),Ae.unbindTexture()},this.copyTextureToTexture3D=function(A,V,Z=null,K=null,G=0){return A.isTexture!==!0&&(co("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,K=arguments[1]||null,A=arguments[2],V=arguments[3],G=arguments[4]||0),co('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,V,Z,K,G)},this.initRenderTarget=function(A){ze.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),Ae.unbindTexture()},this.resetState=function(){T=0,I=0,w=null,Ae.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}};var Oa=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Le(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},vo=class extends at{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Lr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ou,this.updateRanges=[],this.version=0,this.uuid=ci()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},En=new k,Cs=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyMatrix4(e),this.setXYZ(t,En.x,En.y,En.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyNormalMatrix(e),this.setXYZ(t,En.x,En.y,En.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.transformDirection(e),this.setXYZ(t,En.x,En.y,En.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=oi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=oi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=oi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=oi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=oi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),s=Ct(s,this.array),r=Ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},_o=class extends _n{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},lr,to=new k,ur=new k,hr=new k,fr=new qe,no=new qe,rp=new nt,da=new k,io=new k,pa=new k,pd=new qe,xl=new qe,md=new qe,Ba=class extends at{constructor(e=new _o){if(super(),this.isSprite=!0,this.type="Sprite",lr===void 0){lr=new kt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lr(t,5);lr.setIndex([0,1,2,0,2,3]),lr.setAttribute("position",new Cs(n,3,0,!1)),lr.setAttribute("uv",new Cs(n,2,3,!1))}this.geometry=lr,this.material=e,this.center=new qe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ur.setFromMatrixScale(this.matrixWorld),rp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),hr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ur.multiplyScalar(-hr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;ma(da.set(-.5,-.5,0),hr,o,ur,s,r),ma(io.set(.5,-.5,0),hr,o,ur,s,r),ma(pa.set(.5,.5,0),hr,o,ur,s,r),pd.set(0,0),xl.set(1,0),md.set(1,1);let a=e.ray.intersectTriangle(da,io,pa,!1,to);if(a===null&&(ma(io.set(-.5,.5,0),hr,o,ur,s,r),xl.set(0,1),a=e.ray.intersectTriangle(da,pa,io,!1,to),a===null))return;let c=e.ray.origin.distanceTo(to);c<e.near||c>e.far||t.push({distance:c,point:to.clone(),uv:Yi.getInterpolation(to,da,io,pa,pd,xl,md,new qe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ma(i,e,t,n,s,r){fr.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(no.x=r*fr.x-s*fr.y,no.y=s*fr.x+r*fr.y):no.copy(fr),i.copy(e),i.x+=no.x,i.y+=no.y,i.applyMatrix4(rp)}var gd=new k,xd=new Tt,bd=new Tt,qv=new k,yd=new nt,ga=new k,bl=new Hn,vd=new nt,yl=new Rs,Ha=class extends be{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vf,this.bindMatrix=new nt,this.bindMatrixInverse=new nt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Qt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ga),this.boundingBox.expandByPoint(ga)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ga),this.boundingSphere.expandByPoint(ga)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bl.copy(this.boundingSphere),bl.applyMatrix4(s),e.ray.intersectsSphere(bl)!==!1&&(vd.copy(s).invert(),yl.copy(e.ray).applyMatrix4(vd),!(this.boundingBox!==null&&yl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,yl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Tt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===vf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===vg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;xd.fromBufferAttribute(s.attributes.skinIndex,e),bd.fromBufferAttribute(s.attributes.skinWeight,e),gd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=bd.getComponent(r);if(o!==0){let a=xd.getComponent(r);yd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(qv.copy(gd).applyMatrix4(yd),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Mo=class extends at{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ga=class extends hn{constructor(e=null,t=1,n=1,s,r,o,a,c,l=on,u=on,h,f){super(null,o,a,c,l,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},_d=new nt,Yv=new nt,Va=class i{constructor(e=[],t=[]){this.uuid=ci(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new nt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new nt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Yv;_d.multiplyMatrices(a,t[r]),_d.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ga(t,e,e,jn,ai);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Mo),this.bones.push(o),this.boneInverses.push(new nt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Ii=class extends zt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},dr=new nt,Md=new nt,xa=[],Sd=new Qt,jv=new nt,so=new be,ro=new Hn,fn=class extends be{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ii(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jv)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,dr),Sd.copy(e.boundingBox).applyMatrix4(dr),this.boundingBox.union(Sd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,dr),ro.copy(e.boundingSphere).applyMatrix4(dr),this.boundingSphere.union(ro)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(so.geometry=this.geometry,so.material=this.material,so.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ro.copy(this.boundingSphere),ro.applyMatrix4(n),e.ray.intersectsSphere(ro)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,dr),Md.multiplyMatrices(n,dr),so.matrixWorld=Md,so.raycast(e,xa);for(let o=0,a=xa.length;o<a;o++){let c=xa[o];c.instanceId=r,c.object=this,t.push(c)}xa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ii(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ga(new Float32Array(s*this.count),s,this.count,Xu,ai));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var So=class extends _n{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Wa=new k,Xa=new k,Ed=new nt,oo=new Rs,ba=new Hn,vl=new k,wd=new k,Dr=class extends at{constructor(e=new kt,t=new So){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Wa.fromBufferAttribute(t,s-1),Xa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Wa.distanceTo(Xa);e.setAttribute("lineDistance",new ft(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ba.copy(n.boundingSphere),ba.applyMatrix4(s),ba.radius+=r,e.ray.intersectsSphere(ba)===!1)return;Ed.copy(s).invert(),oo.copy(e.ray).applyMatrix4(Ed);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let b=p,m=g-1;b<m;b+=l){let d=u.getX(b),_=u.getX(b+1),v=ya(this,e,oo,c,d,_);v&&t.push(v)}if(this.isLineLoop){let b=u.getX(g-1),m=u.getX(p),d=ya(this,e,oo,c,b,m);d&&t.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let b=p,m=g-1;b<m;b+=l){let d=ya(this,e,oo,c,b,b+1);d&&t.push(d)}if(this.isLineLoop){let b=ya(this,e,oo,c,g-1,p);b&&t.push(b)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ya(i,e,t,n,s,r){let o=i.geometry.attributes.position;if(Wa.fromBufferAttribute(o,s),Xa.fromBufferAttribute(o,r),t.distanceSqToSegment(Wa,Xa,vl,wd)>n)return;vl.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(vl);if(!(c<e.near||c>e.far))return{distance:c,point:wd.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var Td=new k,Ad=new k,qa=class extends Dr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Td.fromBufferAttribute(t,s),Ad.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Td.distanceTo(Ad);e.setAttribute("lineDistance",new ft(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ya=class extends Dr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Pi=class extends _n{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Rd=new nt,Su=new Rs,va=new Hn,_a=new k,Qi=class extends at{constructor(e=new kt,t=new Pi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),va.copy(n.boundingSphere),va.applyMatrix4(s),va.radius+=r,e.ray.intersectsSphere(va)===!1)return;Rd.copy(s).invert(),Su.copy(e.ray).applyMatrix4(Rd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=f,b=p;g<b;g++){let m=l.getX(g);_a.fromBufferAttribute(h,m),Cd(_a,m,c,s,e,t,this)}}else{let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=f,b=p;g<b;g++)_a.fromBufferAttribute(h,g),Cd(_a,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Cd(i,e,t,n,s,r,o){let a=Su.distanceSqToPoint(i);if(a<t){let c=new k;Su.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var zr=class extends hn{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Tn=class i extends kt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new k,u=new qe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){let p=n+h/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new ft(o,3)),this.setAttribute("normal",new ft(a,3)),this.setAttribute("uv",new ft(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},en=class i extends kt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],f=[],p=[],g=0,b=[],m=n/2,d=0;_(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new ft(h,3)),this.setAttribute("normal",new ft(f,3)),this.setAttribute("uv",new ft(p,2));function _(){let y=new k,R=new k,T=0,I=(t-e)/n;for(let w=0;w<=r;w++){let M=[],S=w/r,z=S*(t-e)+e;for(let W=0;W<=s;W++){let X=W/s,j=X*c+a,J=Math.sin(j),ee=Math.cos(j);R.x=z*J,R.y=-S*n+m,R.z=z*ee,h.push(R.x,R.y,R.z),y.set(J,I,ee).normalize(),f.push(y.x,y.y,y.z),p.push(X,1-S),M.push(g++)}b.push(M)}for(let w=0;w<s;w++)for(let M=0;M<r;M++){let S=b[M][w],z=b[M+1][w],W=b[M+1][w+1],X=b[M][w+1];(e>0||M!==0)&&(u.push(S,z,X),T+=3),(t>0||M!==r-1)&&(u.push(z,W,X),T+=3)}l.addGroup(d,T,0),d+=T}function v(y){let R=g,T=new qe,I=new k,w=0,M=y===!0?e:t,S=y===!0?1:-1;for(let W=1;W<=s;W++)h.push(0,m*S,0),f.push(0,S,0),p.push(.5,.5),g++;let z=g;for(let W=0;W<=s;W++){let j=W/s*c+a,J=Math.cos(j),ee=Math.sin(j);I.x=M*ee,I.y=m*S,I.z=M*J,h.push(I.x,I.y,I.z),f.push(0,S,0),T.x=J*.5+.5,T.y=ee*.5*S+.5,p.push(T.x,T.y),g++}for(let W=0;W<s;W++){let X=R+W,j=z+W;y===!0?u.push(j,j+1,X):u.push(j+1,j,X),w+=3}l.addGroup(d,w,y===!0?1:2),d+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Gn=class i extends en{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ja=class i extends kt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new ft(r,3)),this.setAttribute("normal",new ft(r.slice(),3)),this.setAttribute("uv",new ft(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let v=new k,y=new k,R=new k;for(let T=0;T<t.length;T+=3)p(t[T+0],v),p(t[T+1],y),p(t[T+2],R),c(v,y,R,_)}function c(_,v,y,R){let T=R+1,I=[];for(let w=0;w<=T;w++){I[w]=[];let M=_.clone().lerp(y,w/T),S=v.clone().lerp(y,w/T),z=T-w;for(let W=0;W<=z;W++)W===0&&w===T?I[w][W]=M:I[w][W]=M.clone().lerp(S,W/z)}for(let w=0;w<T;w++)for(let M=0;M<2*(T-w)-1;M++){let S=Math.floor(M/2);M%2===0?(f(I[w][S+1]),f(I[w+1][S]),f(I[w][S])):(f(I[w][S+1]),f(I[w+1][S+1]),f(I[w+1][S]))}}function l(_){let v=new k;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(_),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function u(){let _=new k;for(let v=0;v<r.length;v+=3){_.x=r[v+0],_.y=r[v+1],_.z=r[v+2];let y=m(_)/2/Math.PI+.5,R=d(_)/Math.PI+.5;o.push(y,1-R)}g(),h()}function h(){for(let _=0;_<o.length;_+=6){let v=o[_+0],y=o[_+2],R=o[_+4],T=Math.max(v,y,R),I=Math.min(v,y,R);T>.9&&I<.1&&(v<.2&&(o[_+0]+=1),y<.2&&(o[_+2]+=1),R<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function p(_,v){let y=_*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function g(){let _=new k,v=new k,y=new k,R=new k,T=new qe,I=new qe,w=new qe;for(let M=0,S=0;M<r.length;M+=9,S+=6){_.set(r[M+0],r[M+1],r[M+2]),v.set(r[M+3],r[M+4],r[M+5]),y.set(r[M+6],r[M+7],r[M+8]),T.set(o[S+0],o[S+1]),I.set(o[S+2],o[S+3]),w.set(o[S+4],o[S+5]),R.copy(_).add(v).add(y).divideScalar(3);let z=m(R);b(T,S+0,_,z),b(I,S+2,v,z),b(w,S+4,y,z)}}function b(_,v,y,R){R<0&&_.x===1&&(o[v]=_.x-1),y.x===0&&y.z===0&&(o[v]=R/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var Is=class i extends ja{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Eo=class i extends ja{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ur=class i extends kt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],u=[],h=e,f=(t-e)/s,p=new k,g=new qe;for(let b=0;b<=s;b++){for(let m=0;m<=n;m++){let d=r+m/n*o;p.x=h*Math.cos(d),p.y=h*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}h+=f}for(let b=0;b<s;b++){let m=b*(n+1);for(let d=0;d<n;d++){let _=d+m,v=_,y=_+n+1,R=_+n+2,T=_+1;a.push(v,y,T),a.push(y,R,T)}}this.setIndex(a),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(l,3)),this.setAttribute("uv",new ft(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Ot=class i extends kt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],h=new k,f=new k,p=[],g=[],b=[],m=[];for(let d=0;d<=n;d++){let _=[],v=d/n,y=0;d===0&&o===0?y=.5/t:d===n&&c===Math.PI&&(y=-.5/t);for(let R=0;R<=t;R++){let T=R/t;h.x=-e*Math.cos(s+T*r)*Math.sin(o+v*a),h.y=e*Math.cos(o+v*a),h.z=e*Math.sin(s+T*r)*Math.sin(o+v*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),b.push(f.x,f.y,f.z),m.push(T+y,1-v),_.push(l++)}u.push(_)}for(let d=0;d<n;d++)for(let _=0;_<t;_++){let v=u[d][_+1],y=u[d][_],R=u[d+1][_],T=u[d+1][_+1];(d!==0||o>0)&&p.push(v,y,T),(d!==n-1||c<Math.PI)&&p.push(y,R,T)}this.setIndex(p),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(b,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var $i=class i extends kt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],u=new k,h=new k,f=new k;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){let b=g/s*r,m=p/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(b),h.y=(e+t*Math.cos(m))*Math.sin(b),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(b),u.y=e*Math.sin(b),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){let b=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,_=(s+1)*p+g;o.push(b,m,_),o.push(m,d,_)}this.setIndex(o),this.setAttribute("position",new ft(a,3)),this.setAttribute("normal",new ft(c,3)),this.setAttribute("uv",new ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var es=class extends _n{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oc,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Vn=class extends es{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new qe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return yn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var vt=class extends _n{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new Le(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oc,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var wo=class extends _n{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oc,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=Ou,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Ma(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Zv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Kv(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Id(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function op(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var ts=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Eu=class extends ts{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:mr,endingEnd:mr}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case gr:r=e,a=2*t-n;break;case Ra:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case gr:o=e,c=2*n-t;break;case Ra:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),b=g*g,m=b*g,d=-f*m+2*f*b-f*g,_=(1+f)*m+(-1.5-2*f)*b+(-.5+f)*g+1,v=(-1-p)*m+(1.5+p)*b+.5*g,y=p*m-p*b;for(let R=0;R!==a;++R)r[R]=d*o[u+R]+_*o[l+R]+v*o[c+R]+y*o[h+R];return r}},Za=class extends ts{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(s-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}},wu=class extends ts{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Kn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ma(t,this.TimeBufferType),this.values=Ma(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ma(e.times,Array),values:Ma(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new wu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Eu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Rr:t=this.InterpolantFactoryMethodDiscrete;break;case Cr:t=this.InterpolantFactoryMethodLinear;break;case Wc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rr;case this.InterpolantFactoryMethodLinear:return Cr;case this.InterpolantFactoryMethodSmooth:return Wc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Zv(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Wc,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{let h=a*n,f=h-n,p=h+n;for(let g=0;g!==n;++g){let b=t[h+g];if(b!==t[f+g]||b!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,f=o*n;for(let p=0;p!==n;++p)t[f+p]=t[h+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Kn.prototype.TimeBufferType=Float32Array;Kn.prototype.ValueBufferType=Float32Array;Kn.prototype.DefaultInterpolation=Cr;var ns=class extends Kn{constructor(e,t,n){super(e,t,n)}};ns.prototype.ValueTypeName="bool";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=Rr;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var Ka=class extends Kn{};Ka.prototype.ValueTypeName="color";var Li=class extends Kn{};Li.prototype.ValueTypeName="number";var Tu=class extends ts{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let u=l+a;l!==u;l+=4)Dn.slerpFlat(r,0,o,l-a,o,l,c);return r}},Di=class extends Kn{InterpolantFactoryMethodLinear(e){return new Tu(this.times,this.values,this.getValueSize(),e)}};Di.prototype.ValueTypeName="quaternion";Di.prototype.InterpolantFactoryMethodSmooth=void 0;var is=class extends Kn{constructor(e,t,n){super(e,t,n)}};is.prototype.ValueTypeName="string";is.prototype.ValueBufferType=Array;is.prototype.DefaultInterpolation=Rr;is.prototype.InterpolantFactoryMethodLinear=void 0;is.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends Kn{};zi.prototype.ValueTypeName="vector";var Nr=class{constructor(e="",t=-1,n=[],s=Ju){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=ci(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Qv(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Kn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let u=Kv(c);c=Id(c,1,u),l=Id(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Li(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(r);if(u&&u.length>1){let h=u[1],f=s[h];f||(s[h]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,f,p,g,b){if(p.length!==0){let m=[],d=[];op(p,m,d,g),m.length!==0&&b.push(new h(f,m,d))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let p={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let b=0;b<f[g].morphTargets.length;b++)p[f[g].morphTargets[b]]=-1;for(let b in p){let m=[],d=[];for(let _=0;_!==f[g].morphTargets.length;++_){let v=f[g];m.push(v.time),d.push(v.morphTarget===b?1:0)}s.push(new Li(".morphTargetInfluence["+b+"]",m,d))}c=p.length*o}else{let p=".bones["+t[h].name+"]";n(zi,p+".position",f,"pos",s),n(Di,p+".quaternion",f,"rot",s),n(zi,p+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Jv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Li;case"vector":case"vector2":case"vector3":case"vector4":return zi;case"color":return Ka;case"quaternion":return Di;case"bool":case"boolean":return ns;case"string":return is}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Qv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Jv(i.type);if(i.times===void 0){let t=[],n=[];op(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var ji={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Au=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let p=l[h],g=l[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}},$v=new Au,Ui=class{constructor(e){this.manager=e!==void 0?e:$v,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ui.DEFAULT_MATERIAL_NAME="__DEFAULT";var Mi={},Ru=class extends Error{constructor(e,t){super(e),this.response=t}},To=class extends Ui{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ji.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Mi[e]!==void 0){Mi[e].push({onLoad:t,onProgress:n,onError:s});return}Mi[e]=[],Mi[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=Mi[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=f?parseInt(f):0,g=p!==0,b=0,m=new ReadableStream({start(d){_();function _(){h.read().then(({done:v,value:y})=>{if(v)d.close();else{b+=y.byteLength;let R=new ProgressEvent("progress",{lengthComputable:g,loaded:b,total:p});for(let T=0,I=u.length;T<I;T++){let w=u[T];w.onProgress&&w.onProgress(R)}d.enqueue(y),_()}},v=>{d.error(v)})}}});return new Response(m)}else throw new Ru(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(f);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{ji.add(e,l);let u=Mi[e];delete Mi[e];for(let h=0,f=u.length;h<f;h++){let p=u[h];p.onLoad&&p.onLoad(l)}}).catch(l=>{let u=Mi[e];if(u===void 0)throw this.manager.itemError(e),l;delete Mi[e];for(let h=0,f=u.length;h<f;h++){let p=u[h];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Cu=class extends Ui{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=ji.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=xo("img");function c(){u(),ji.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var Ja=class extends Ui{constructor(e){super(e)}load(e,t,n,s){let r=new hn,o=new Cu(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Fr=class extends at{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Qa=class extends Fr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},_l=new nt,Pd=new k,Ld=new k,Ao=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yo,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Pd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pd),Ld.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ld),t.updateMatrixWorld(),_l.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_l),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_l)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Iu=class extends Ao{constructor(){super(new sn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Ir*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},$a=class extends Fr{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Iu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Dd=new nt,ao=new k,Ml=new k,Pu=class extends Ao{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new qe(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ao.setFromMatrixPosition(e.matrixWorld),n.position.copy(ao),Ml.copy(n.position),Ml.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ml),n.updateMatrixWorld(),s.makeTranslation(-ao.x,-ao.y,-ao.z),Dd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dd)}},ec=class extends Fr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Pu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Lu=class extends Ao{constructor(){super(new Ji(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ps=class extends Fr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.shadow=new Lu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ss=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var tc=class extends Ui{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=ji.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ji.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),ji.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ji.add(e,c),r.manager.itemStart(e)}};var Du=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){Dn.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;Dn.multiplyQuaternionsFlat(e,o,e,t,e,n),Dn.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},eh="\\[\\]\\.:\\/",e_=new RegExp("["+eh+"]","g"),th="[^"+eh+"]",t_="[^"+eh.replace("\\.","")+"]",n_=/((?:WC+[\/:])*)/.source.replace("WC",th),i_=/(WCOD+)?/.source.replace("WCOD",t_),s_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",th),r_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",th),o_=new RegExp("^"+n_+i_+s_+r_+"$"),a_=["material","materials","bones","map"],zu=class{constructor(e,t,n){let s=n||Ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ft=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(e_,"")}static parseTrackName(e){let t=o_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);a_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ft.Composite=zu;Ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ft.prototype.GetterByBindingType=[Ft.prototype._getValue_direct,Ft.prototype._getValue_array,Ft.prototype._getValue_arrayElement,Ft.prototype._getValue_toArray];Ft.prototype.SetterByBindingTypeAndVersioning=[[Ft.prototype._setValue_direct,Ft.prototype._setValue_direct_setNeedsUpdate,Ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_array,Ft.prototype._setValue_array_setNeedsUpdate,Ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_arrayElement,Ft.prototype._setValue_arrayElement_setNeedsUpdate,Ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_fromArray,Ft.prototype._setValue_fromArray_setNeedsUpdate,Ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Uu=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:mr,endingEnd:mr};for(let l=0;l!==o;++l){let u=r[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ku,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Mg:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case Ju:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===_g;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===Zu){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=gr,s.endingEnd=gr):(e?s.endingStart=this.zeroSlopeAtStart?gr:mr:s.endingStart=Ra,t?s.endingEnd=this.zeroSlopeAtEnd?gr:mr:s.endingEnd=Ra)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},c_=new Float32Array(1),nc=class extends Ci{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){let f=s[h],p=f.name,g=u[p];if(g!==void 0)++g.referenceCount,o[h]=g;else{if(g=o[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}let b=t&&t._propertyBindings[h].binding.parsedPath;g=new Du(Ft.create(n,p,b),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),o[h]=g}a[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;let h=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Za(new Float32Array(2),new Float32Array(2),1,c_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Nr.findByName(s,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Ju),c!==void 0){let h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let u=new Uu(this,o,t,n);return this._bindAction(u,l),this._addInactiveAction(u,a,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Nr.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var zd=new nt,ic=class{constructor(e,t,n=0,s=1/0){this.ray=new Rs(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new bo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return zd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zd),this}intersectObject(e,t=!0,n=[]){return Nu(e,this,n,t),n.sort(Ud),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Nu(e[s],this,n,t);return n.sort(Ud),n}};function Ud(i,e){return i.distance-e.distance}function Nu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Nu(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fu);function ih(i,e){if(e===Yd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Co||e===rc){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Co)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var lc=class extends Ui{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new uh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new Mh(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new ph(t)}),this.register(function(t){return new mh(t)}),this.register(function(t){return new gh(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new xh(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new yh(t)}),this.register(function(t){return new bh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new Sh(t)}),this.register(function(t){return new Eh(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=ss.extractUrlBase(e);o=ss.resolveURL(l,this.path)}else o=ss.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new To(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===hp){try{o[dt.KHR_BINARY_GLTF]=new wh(e)}catch(h){s&&s(h);return}r=JSON.parse(o[dt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Lh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case dt.KHR_MATERIALS_UNLIT:o[h]=new ch;break;case dt.KHR_DRACO_MESH_COMPRESSION:o[h]=new Th(r,this.dracoLoader);break;case dt.KHR_TEXTURE_TRANSFORM:o[h]=new Ah;break;case dt.KHR_MESH_QUANTIZATION:o[h]=new Rh;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function l_(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var dt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},ah=class{constructor(e){this.parser=e,this.name=dt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new Le(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],dn);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ps(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ec(u),l.distance=h;break;case"spot":l=new $a(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Ni(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},ch=class{constructor(){this.name=dt.KHR_MATERIALS_UNLIT}getMaterialType(){return Qe}extendParams(e,t,n){let s=[];e.color=new Le(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],dn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Xt))}return Promise.all(s)}},lh=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},uh=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new qe(a,a)}return Promise.all(r)}},hh=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},fh=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},dh=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Le(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],dn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Xt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},ph=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},mh=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Le().setRGB(a[0],a[1],a[2],dn),Promise.all(r)}},gh=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},xh=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Le().setRGB(a[0],a[1],a[2],dn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Xt)),Promise.all(r)}},bh=class{constructor(e){this.parser=e,this.name=dt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},yh=class{constructor(e){this.parser=e,this.name=dt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Vn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},vh=class{constructor(e){this.parser=e,this.name=dt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},_h=class{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Mh=class{constructor(e){this.parser=e,this.name=dt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Sh=class{constructor(e){this.name=dt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(p),u,h,f,s.mode,s.filter),p})})}else return null}},Eh=class{constructor(e){this.name=dt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==Jn.TRIANGLES&&l.mode!==Jn.TRIANGLE_STRIP&&l.mode!==Jn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,p=[];for(let g of h){let b=new nt,m=new k,d=new Dn,_=new k(1,1,1),v=new fn(g.geometry,g.material,f);for(let y=0;y<f;y++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,y),c.SCALE&&_.fromBufferAttribute(c.SCALE,y),v.setMatrixAt(y,b.compose(m,d,_));for(let y in c)if(y==="_COLOR_0"){let R=c[y];v.instanceColor=new Ii(R.array,R.itemSize,R.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,c[y]);at.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),p.push(v)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}},hp="glTF",Io=12,ap={JSON:1313821514,BIN:5130562},wh=class{constructor(e){this.name=dt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Io),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==hp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Io,r=new DataView(e,Io),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===ap.JSON){let l=new Uint8Array(e,Io+o,a);this.content=n.decode(l)}else if(c===ap.BIN){let l=Io+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Th=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=dt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let h=Ih[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=Ih[u]||u.toLowerCase();if(o[u]!==void 0){let f=n.accessors[e.attributes[u]],p=Or[f.componentType];l[h]=p.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){s.decodeDracoFile(u,function(p){for(let g in p.attributes){let b=p.attributes[g],m=c[g];m!==void 0&&(b.normalized=m)}h(p)},a,l,dn,f)})})}},Ah=class{constructor(){this.name=dt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Rh=class{constructor(){this.name=dt.KHR_MESH_QUANTIZATION}},uc=class extends ts{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-t,h=(n-t)/u,f=h*h,p=f*h,g=e*l,b=g-l,m=-2*p+3*f,d=p-f,_=1-m,v=d-f+h;for(let y=0;y!==a;y++){let R=o[b+y+a],T=o[b+y+c]*u,I=o[g+y+a],w=o[g+y]*u;r[y]=_*R+v*T+m*I+d*w}return r}},u_=new Dn,Ch=class extends uc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return u_.fromArray(r).normalize().toArray(r),r}},Jn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Or={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},cp={9728:on,9729:vn,9984:Hu,9985:uo,9986:pr,9987:Yn},lp={33071:wi,33648:mo,10497:Ts},sh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ih={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},rs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},h_={CUBICSPLINE:void 0,LINEAR:Cr,STEP:Rr},rh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function f_(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new es({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Bn})),i.DefaultMaterial}function Ls(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ni(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function d_(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(n){let f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(f)}if(s){let f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],f=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function p_(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function m_(i){let e,t=i.extensions&&i.extensions[dt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+oh(t.attributes):e=i.indices+":"+oh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+oh(i.targets[n]);return e}function oh(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Ph(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function g_(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var x_=new nt,Lh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new l_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Ja(this.options.manager):this.textureLoader=new tc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new To(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Ls(r,a,s),Ni(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())r(u,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[dt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(ss.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=sh[s.type],a=Or[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new zt(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=sh[s.type],l=Or[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,b,m;if(p&&p!==h){let d=Math.floor(f/p),_="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+d+":"+s.count,v=t.cache.get(_);v||(b=new l(a,d*p,s.count*p/u),v=new Lr(b,p/u),t.cache.add(_,v)),m=new Cs(v,c,f%p/u,g)}else a===null?b=new l(s.count*c):b=new l(a,f,s.count*c),m=new zt(b,c,g);if(s.sparse!==void 0){let d=sh.SCALAR,_=Or[s.sparse.indices.componentType],v=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,R=new _(o[1],v,s.sparse.count*d),T=new l(o[2],y,s.sparse.count*c);a!==null&&(m=new zt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let I=0,w=R.length;I<w;I++){let M=R[I];if(m.setX(M,T[I*c]),c>=2&&m.setY(M,T[I*c+1]),c>=3&&m.setZ(M,T[I*c+2]),c>=4&&m.setW(M,T[I*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return u.magFilter=cp[f.magFilter]||vn,u.minFilter=cp[f.minFilter]||Yn,u.wrapS=lp[f.wrapS]||Ts,u.wrapT=lp[f.wrapT]||Ts,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==on&&u.minFilter!==vn,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;let f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(f,p){let g=f;t.isImageBitmapLoader===!0&&(g=function(b){let m=new hn(b);m.needsUpdate=!0,f(m)}),t.load(ss.resolveURL(h,r.path),g,void 0,p)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),Ni(h,o),h.userData.mimeType=o.mimeType||g_(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[dt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[dt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[dt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Pi,_n.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new So,_n.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return es}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[dt.KHR_MATERIALS_UNLIT]){let h=s[dt.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new Le(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],dn),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,Xt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Dt);let u=r.alphaMode||rh.OPAQUE;if(u===rh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===rh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Qe&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new qe(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Qe&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Qe){let h=r.emissiveFactor;a.emissive=new Le().setRGB(h[0],h[1],h[2],dn)}return r.emissiveTexture!==void 0&&o!==Qe&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Xt)),Promise.all(l).then(function(){let h=new o(a);return r.name&&(h.name=r.name),Ni(h,r),t.associations.set(h,{materials:e}),r.extensions&&Ls(s,h,r),h})}createUniqueName(e){let t=Ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[dt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return up(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=m_(l),h=s[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[dt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=up(new kt,l,t),s[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?f_(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let p=0,g=u.length;p<g;p++){let b=u[p],m=o[p],d,_=l[p];if(m.mode===Jn.TRIANGLES||m.mode===Jn.TRIANGLE_STRIP||m.mode===Jn.TRIANGLE_FAN||m.mode===void 0)d=r.isSkinnedMesh===!0?new Ha(b,_):new be(b,_),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),m.mode===Jn.TRIANGLE_STRIP?d.geometry=ih(d.geometry,rc):m.mode===Jn.TRIANGLE_FAN&&(d.geometry=ih(d.geometry,Co));else if(m.mode===Jn.LINES)d=new qa(b,_);else if(m.mode===Jn.LINE_STRIP)d=new Dr(b,_);else if(m.mode===Jn.LINE_LOOP)d=new Ya(b,_);else if(m.mode===Jn.POINTS)d=new Qi(b,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(d.geometry.morphAttributes).length>0&&p_(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),Ni(d,r),m.extensions&&Ls(s,d,m),t.assignFinalMaterial(d),h.push(d)}for(let p=0,g=h.length;p<g;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return r.extensions&&Ls(s,h[0],r),h[0];let f=new Wt;r.extensions&&Ls(s,f,r),t.associations.set(f,{meshes:e});for(let p=0,g=h.length;p<g;p++)f.add(h[p]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new sn(Kd.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Ji(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ni(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let h=o[l];if(h){a.push(h);let f=new nt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Va(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=s.channels.length;h<f;h++){let p=s.channels[h],g=s.samplers[p.sampler],b=p.target,m=b.node,d=s.parameters!==void 0?s.parameters[g.input]:g.input,_=s.parameters!==void 0?s.parameters[g.output]:g.output;b.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",_)),l.push(g),u.push(b))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let f=h[0],p=h[1],g=h[2],b=h[3],m=h[4],d=[];for(let _=0,v=f.length;_<v;_++){let y=f[_],R=p[_],T=g[_],I=b[_],w=m[_];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let M=n._createAnimationTracks(y,R,T,I,w);if(M)for(let S=0;S<M.length;S++)d.push(M[S])}return new Nr(r,void 0,d)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(f,x_)});for(let p=0,g=h.length;p<g;p++)u.add(h[p]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new Mo:l.length>1?u=new Wt:l.length===1?u=l[0]:u=new at,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Ni(u,r),r.extensions&&Ls(n,u,r),r.matrix!==void 0){let h=new nt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Wt;n.name&&(r.name=s.createUniqueName(n.name)),Ni(r,n),n.extensions&&Ls(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);let l=u=>{let h=new Map;for(let[f,p]of s.associations)(f instanceof _n||f instanceof hn)&&h.set(f,p);return u.traverse(f=>{let p=s.associations.get(f);p!=null&&h.set(f,p)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];rs[r.path]===rs.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(rs[r.path]){case rs.weights:l=Li;break;case rs.rotation:l=Di;break;case rs.position:case rs.scale:l=zi;break;default:switch(n.itemSize){case 1:l=Li;break;case 2:case 3:default:l=zi;break}break}let u=s.interpolation!==void 0?h_[s.interpolation]:Cr,h=this._getArrayFromAccessor(n);for(let f=0,p=c.length;f<p;f++){let g=new l(c[f]+"."+rs[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Ph(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Di?Ch:uc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function b_(i,e,t){let n=e.attributes,s=new Qt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new k(c[0],c[1],c[2]),new k(l[0],l[1],l[2])),a.normalized){let u=Ph(Or[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new k,c=new k;for(let l=0,u=r.length;l<u;l++){let h=r[l];if(h.POSITION!==void 0){let f=t.json.accessors[h.POSITION],p=f.min,g=f.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),f.normalized){let b=Ph(Or[f.componentType]);c.multiplyScalar(b)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new Hn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function up(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=Ih[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return gt.workingColorSpace!==dn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${gt.workingColorSpace}" not supported.`),Ni(i,e),b_(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?d_(i,e.targets,t):i})}var fp=function(){"use strict";var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?e:i,r,o=WebAssembly.instantiate(a(s),{}).then(function(d){r=d.instance,r.exports.__wasm_call_ctors()});function a(d){for(var _=new Uint8Array(d.length),v=0;v<d.length;++v){var y=d.charCodeAt(v);_[v]=y>96?y-97:y>64?y-39:y+4}for(var R=0,v=0;v<d.length;++v)_[R++]=_[v]<60?n[_[v]]:(_[v]-60)*64+_[++v];return _.buffer.slice(0,R)}function c(d,_,v,y,R,T){var I=r.exports.sbrk,w=v+3&-4,M=I(w*y),S=I(R.length),z=new Uint8Array(r.exports.memory.buffer);z.set(R,S);var W=d(M,v,y,S,R.length);if(W==0&&T&&T(M,w,y),_.set(z.subarray(M,M+v*y)),I(M-I(0)),W!=0)throw new Error("Malformed buffer data: "+W)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],f=0;function p(d){var _={object:new Worker(d),pending:0,requests:{}};return _.object.onmessage=function(v){var y=v.data;_.pending-=y.count,_.requests[y.id][y.action](y.value),delete _.requests[y.id]},_}function g(d){for(var _="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(a(s))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),v=new Blob([_],{type:"text/javascript"}),y=URL.createObjectURL(v),R=0;R<d;++R)h[R]=p(y);URL.revokeObjectURL(y)}function b(d,_,v,y,R){for(var T=h[0],I=1;I<h.length;++I)h[I].pending<T.pending&&(T=h[I]);return new Promise(function(w,M){var S=new Uint8Array(v),z=f++;T.pending+=d,T.requests[z]={resolve:w,reject:M},T.object.postMessage({id:z,count:d,size:_,source:S,mode:y,filter:R},[S.buffer])})}function m(d){o.then(function(){var _=d.data;try{var v=new Uint8Array(_.count*_.size);c(r.exports[_.mode],v,_.count,_.size,_.source,r.exports[_.filter]),self.postMessage({id:_.id,count:_.count,action:"resolve",value:v},[v.buffer])}catch(y){self.postMessage({id:_.id,count:_.count,action:"reject",value:y})}})}return{ready:o,supported:!0,useWorkers:function(d){g(d)},decodeVertexBuffer:function(d,_,v,y,R){c(r.exports.meshopt_decodeVertexBuffer,d,_,v,y,r.exports[l[R]])},decodeIndexBuffer:function(d,_,v,y){c(r.exports.meshopt_decodeIndexBuffer,d,_,v,y)},decodeIndexSequence:function(d,_,v,y){c(r.exports.meshopt_decodeIndexSequence,d,_,v,y)},decodeGltfBuffer:function(d,_,v,y,R,T){c(r.exports[u[R]],d,_,v,y,r.exports[l[T]])},decodeGltfBufferAsync:function(d,_,v,y,R){return h.length>0?b(d,_,v,u[y],l[R]):o.then(function(){var T=new Uint8Array(d*_);return c(r.exports[u[y]],T,d,_,v,r.exports[l[R]]),T})}}}();function dp(i){let e=new Map,t=new Map,n=i.clone();return pp(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function pp(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)pp(i.children[n],e.children[n],t)}function os(i,e={}){i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vPlW;
varying float vPlUp;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;
vPlUp = normalize(mat3(modelMatrix) * objectNormal).y;`);let t=e.floors?`float stripe = step(0.5, fract(vPlW.x * 0.23 + vPlW.z * 0.23));
diffuseColor.rgb *= mix(0.92, 1.08, stripe);
`:"",n=e.stripes?`float band = step(0.5, fract(vPlW.y * 1.7));
lit *= mix(0.86, 1.1, band);
`:"";i.fragmentShader=`varying vec3 vPlW;
varying float vPlUp;
`+i.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+t).replace("#include <opaque_fragment>",`vec3 base = diffuseColor.rgb;
float luma = dot(base, vec3(0.2126, 0.7152, 0.0722));
base = clamp(luma + (base - luma) * 1.35, 0.0, 1.0);
float up = clamp(vPlUp * 0.5 + 0.5, 0.0, 1.0);
float stepLight = up < 0.34 ? 0.82 : (up < 0.68 ? 1.0 : 1.28);
vec3 lit = base * stepLight;
float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.4);
lit *= mix(1.0, 1.28, rim);
float ao = mix(0.84, 1.0, smoothstep(-0.65, 0.2, vPlUp));
lit *= ao;
vec3 L = normalize(vec3(-0.35, 0.86, 0.28));
vec3 V = normalize(vViewPosition);
float spec = pow(clamp(dot(normalize(normal), normalize(L + V)), 0.0, 1.0), 140.0);
lit += vec3(1.0) * spec * 0.45;
`+n+`outgoingLight = lit;
#include <opaque_fragment>`)}var mp={meadow:{top:6080767,mid:10477823,fog:9426162,bot:7323530,near:72,far:230},canyon:{top:4029680,mid:16756858,fog:16175796,bot:2377904,near:160,far:360},sky:{top:8309759,mid:13168383,fog:12051711,bot:9357552,near:78,far:250},ice:{top:12971263,mid:15202047,fog:12049912,bot:7255791,near:70,far:230},climb:{top:16762218,mid:16769184,fog:16764806,bot:14716976,near:68,far:210},ship:{top:9426175,mid:16770992,fog:13165823,bot:9355504,near:80,far:240}};function gp(i){return mp[i]||mp.meadow}function qt(i){let e=Math.sin(i*127.1)*43758.5453;return e-Math.floor(e)}function xp(){let i=document.createElement("canvas");i.width=4,i.height=1;let e=i.getContext("2d");e.fillStyle="#c5d0e4",e.fillRect(0,0,1,1),e.fillStyle="#ffe7c8",e.fillRect(1,0,1,1),e.fillStyle="#ffffff",e.fillRect(2,0,2,1);let t=new zr(i);return t.magFilter=on,t.minFilter=on,t.generateMipmaps=!1,t.colorSpace=di||dn,t}function An(i,e){let t=new vt({color:i,gradientMap:e,side:Dt});return t.onBeforeCompile=n=>os(n,{}),t}function bp(i,e,t){let n=new at,s=new Le,r=[];function o(D,O,Y,fe){if(!Y.length)return null;let pe=new fn(D,O,Y.length);return Y.forEach((De,it)=>{fe(n,De,it),n.updateMatrix(),pe.setMatrixAt(it,n.matrix),De.color&&(s.set(De.color),pe.setColorAt(it,s))}),pe.instanceMatrix.needsUpdate=!0,pe.instanceColor&&(pe.instanceColor.needsUpdate=!0),pe.userData.decor=!0,i.add(pe),r.push(pe),pe}let a={meadow:[],canyon:[],sky:[],ice:[],climb:[],ship:[]};for(let D of e.tiles)a[D.zone]&&(Math.abs(D.col)<2||Math.abs(D.col*5+D.row*3)%3===0&&(D.row+D.col)%2===0&&((D.zone==="canyon"||D.zone==="sky")&&Math.abs(D.x)<8||a[D.zone].push(D)));let c=new Gn(.28,1.15,5),l=new Is(.55,0),u=new Ot(.32,8,6),h=new en(.18,.18,1.4,8),f=new Is(.9,0);o(l,An(12876373,t),a.canyon,(D,O,Y)=>{D.position.set(O.x,O.y+.35,O.z),D.rotation.set(Y,Y*.5,0),D.scale.set(1,.75,1.1)}),o(h,An(3029611,t),a.canyon.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+.35,O.z),D.rotation.set(0,0,Math.PI/2),D.scale.set(1,1,1)}),o(c,An(12051711,t),a.sky,(D,O,Y)=>{D.position.set(O.x,O.y+.55,O.z),D.rotation.set(.1,Y,.2),D.scale.setScalar(.8+Y%3*.15)}),o(c,An(13219583,t),a.ice,(D,O,Y)=>{D.position.set(O.x,O.y+.7,O.z),D.rotation.set(0,Y,.15),D.scale.setScalar(1+Y%3*.2)}),o(u,An(5952767,t),a.ice.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+.28,O.z),D.rotation.set(0,0,0),D.scale.set(1.15,.7,1.15)}),o(l,An(14721370,t),a.climb,(D,O,Y)=>{D.position.set(O.x,O.y+.4,O.z),D.rotation.set(.2,Y,0),D.scale.setScalar(.7)});let p=new en(.28,.34,2.4,6),g=new Ot(.45,8,6),b=new Ot(.42,10,8),m=new en(.7,.7,.12,7),d=new zn(.16,1.6,.16),_=new Ot(.12,6,6),v=a.canyon.filter((D,O)=>qt(O+4)>.62);o(new Is(.7,1),An(2759714,t),v,(D,O,Y)=>{let fe=qt(Y+O.z);D.position.set(O.x+(fe-.5)*1.8,O.y+.15+fe*.4,O.z+(qt(Y+2)-.5)*1.6),D.rotation.set(fe*2,qt(Y)*4,qt(Y+9)),D.scale.set(.45+fe*1.3,.55+qt(Y+3)*1.6,.5+qt(Y+6)*1.1)}),o(b,An(16748497,t),a.sky.filter((D,O)=>O%3===0),(D,O,Y)=>{D.position.set(O.x,O.y+3.2+Y%3,O.z),D.rotation.set(0,0,0),D.scale.set(1,1.15,1)}),o(u,An(16751316,t),a.sky,(D,O,Y)=>{D.position.set(O.x+(O.col>0?2:-2),O.y+2.4,O.z),D.rotation.set(0,Y,0),D.scale.set(1.6,.7,1.2)}),o(m,An(4114687,t),a.ice.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+.08,O.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)}),o(c,An(10189823,t),a.ice.filter((D,O)=>O%2===1),(D,O,Y)=>{D.position.set(O.x,O.y+1.1,O.z+.4),D.rotation.set(.2,Y,0),D.scale.setScalar(1.35)}),o(d,An(16774885,t),a.climb.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+.8,O.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)}),o(l,An(9067066,t),a.climb.filter((D,O)=>O%3===0),(D,O,Y)=>{D.position.set(O.x,O.y+.3,O.z+.6),D.rotation.set(.4,Y,.2),D.scale.setScalar(.55)});let y=new vt({color:16739179,emissive:16739179,emissiveIntensity:.7,gradientMap:t});o(_,y,a.climb.filter((D,O)=>O%2===0),(D,O)=>{D.position.set(O.x,O.y+1.7,O.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)});function R(){let D=new Is(1,1),O=D.attributes.position;for(let Y=0;Y<O.count;Y++){let fe=O.getX(Y),pe=O.getY(Y),De=O.getZ(Y),it=1+Math.sin(fe*2.8+pe*1.7)*.22+Math.sin(De*2.4+.6)*.16,Ne=pe>.15?.62:1.05;O.setXYZ(Y,fe*it,pe*it*Ne+.2,De*it)}return D.computeVertexNormals(),D}function T(){let D=new en(1,1.25,1.1,7,3),O=D.attributes.position,Y=new Float32Array(O.count*3);for(let fe=0;fe<O.count;fe++){let pe=O.getY(fe),De=pe>.25;Y[fe*3]=De?.35:.45,Y[fe*3+1]=De?.72:.32,Y[fe*3+2]=De?.32:.24,pe>.35&&O.setY(fe,pe*.45+.35)}return D.setAttribute("color",new zt(Y,3)),D.computeVertexNormals(),D}let I={meadow:3971656,canyon:4858912,sky:8300240,ice:4034516,climb:12085800,ship:14858360},w=[],M=e.stations||[];e.hubs&&e.hubs.length&&e.hubs.forEach((D,O)=>{if(!D)for(let Y=0;Y<8;Y++){let fe=Y/8*Math.PI*2+O*.4,pe=D.r+6+qt(O*19+Y)*12,De=4.2+qt(Y+O*5)*5.5;w.push({x:D.x+Math.cos(fe)*pe,y:-.4,z:D.z+Math.sin(fe)*pe,s:De,ry:fe,rx:(qt(Y+2)-.5)*.25,color:I[D.zone]||8378506,zone:D.zone,side:Math.cos(fe)>0?1:-1})}});for(let D=0;D<M.length&&!(e.hubs&&e.hubs.length);D+=14){let O=M[D];if(!(!O||O.gap))for(let Y=0;Y<2;Y++)for(let fe of[-1,1]){let pe=qt(D+Y*17+fe*3),De=(Y===0?16:30)+pe*8,it=3.2+qt(D+4+Y)*4.2;w.push({x:O.x+fe*De,y:O.y-.8,z:O.z+(qt(D+Y+6)-.5)*12,s:it*(Y===0?1:1.35),ry:pe*6.2,rx:(qt(D+2)-.5)*.4,color:I[O.zone]||8378506,zone:O.zone,side:fe})}}let S=o(R(),An(16777215,t),w,(D,O)=>{D.position.set(O.x,O.y+O.s*.35,O.z),D.rotation.set(O.rx,O.ry,O.rx*.5),D.scale.set(O.s,O.s*.72,O.s*.9)}),z=new vt({vertexColors:!0,gradientMap:t}),W=w.filter((D,O)=>O%3===0).map(D=>({...D,color:0}));o(T(),z,W,(D,O)=>{D.position.set(O.x,O.y+.4,O.z),D.rotation.set(0,O.ry,0),D.scale.set(O.s*.85,O.s*.55,O.s*.8)});let X=[];function j(D){let O=M.filter(B=>B&&B.zone==="canyon"&&!B.gap);if(O.length<4)return;let Y=2,fe=[];for(let B=0;B<O.length;B+=Y)fe.push(O[B]);let pe=[],De=[],it=[];fe.forEach((B,ue)=>{let ge=Math.sin(B.z*.09)*.9+Math.sin(B.z*.027)*.55,we=1.15+Math.sin(B.z*.06+D)*.4,Ae=B.x+D*(B.half+1.15+ge*.35);pe.push(Ae-we*.65,B.y-.55,B.z,Ae+we*.65,B.y-.42,B.z);let Je=ue/Math.max(1,fe.length-1);De.push(0,Je*8,1,Je*8)});for(let B=0;B<fe.length-1;B++){let ue=B*2;it.push(ue,ue+2,ue+1,ue+1,ue+2,ue+3)}let Ne=new kt;Ne.setAttribute("position",new ft(pe,3)),Ne.setAttribute("uv",new ft(De,2)),Ne.setIndex(it);let lt=new $t({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float flow=fract(vUv.y-uTime*0.35); float lane=abs(vUv.x-0.5); float body=smoothstep(0.5,0.08,lane); float streak=smoothstep(0.12,0.9,flow); vec3 col=mix(vec3(0.42,0.04,0.01), vec3(1.0,0.55,0.05), streak*body); float rim=smoothstep(0.2,0.38,lane)*(1.0-smoothstep(0.38,0.5,lane)); col+=vec3(1.0,0.8,0.25)*rim; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }"});i.add(new be(Ne,lt)),X.push(lt)}if(e.crater){let D=e.crater,O=new Tn(D.r,36),Y=new $t({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ vec2 p=vUv-0.5; float r=length(p); float flow=fract(r*4.0-uTime*0.32); float ang=sin(atan(p.y,p.x)*5.0+uTime*0.8); float body=smoothstep(0.48,0.08,r); float streak=smoothstep(0.05,0.95,flow); vec3 col=mix(vec3(0.45,0.08,0.02), vec3(1.0,0.42,0.05), streak*0.65); col+=vec3(1.0,0.28,0.02)*ang*0.08*body; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }"}),fe=new be(O,Y);fe.rotation.x=-Math.PI/2,fe.position.set(D.x,D.y,D.z),i.add(fe),X.push(Y)}else j(1),j(-1);let J=w.filter((D,O)=>(D.zone==="meadow"||D.zone==="sky")&&O%7===0).slice(0,10),ee=new $t({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float f=fract(vUv.y*3.0-uTime*0.8); float a=smoothstep(0.0,0.15,vUv.x)*smoothstep(1.0,0.85,vUv.x)*0.55; vec3 col=mix(vec3(0.75,0.92,1.0), vec3(1.0,1.0,1.0), f); gl_FragColor=vec4(col,a); }"});X.push(ee);for(let D of J){let O=new be(new ui(1.4,4.2),ee);O.position.set(D.x+D.side*1.5,D.y+D.s*.2,D.z),i.add(O)}let le=[],Q={meadow:8378506,canyon:16742938,sky:12051711,ice:14152703,climb:16762218,ship:16774885};for(let D=0;D<36;D++){let O=e.ship.z*(D+.5)/36,Y=D%2===0?-1:1,fe=e.zones[0].id;for(let pe of e.zones)O>=pe.z0&&(fe=pe.id);le.push({x:Y*(14+qt(D)*8),y:6+qt(D+3)*8,z:O,s:.6+qt(D+9)*.9,phase:qt(D+2)*6,color:Q[fe]||16774885})}let ye=o(f,An(16777215,t),le,(D,O)=>{D.position.set(O.x,O.y,O.z),D.rotation.set(O.phase,O.phase*.3,0),D.scale.setScalar(O.s)}),me=160,ve=new Float32Array(me*3),Ze=[];for(let D=0;D<me;D++)Ze.push({ox:(qt(D)-.5)*18,oy:qt(D+1)*6,oz:(qt(D+2)-.4)*22,sp:.4+qt(D+4)*1.6});let pt=new kt;pt.setAttribute("position",new zt(ve,3));let ne=new Qi(pt,new Pi({color:16774885,size:.16,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0}));return i.add(ne),{update(D,O){let Y=D.time||0;ye&&(le.forEach((Ne,lt)=>{n.position.set(Ne.x,Ne.y+Math.sin(Y*.7+Ne.phase)*.45,Ne.z),n.rotation.set(Ne.phase,Y*.15+Ne.phase,0),n.scale.setScalar(Ne.s),n.updateMatrix(),ye.setMatrixAt(lt,n.matrix)}),ye.instanceMatrix.needsUpdate=!0);for(let Ne of X)Ne.uniforms.uTime.value=Y;let fe=D.player,pe=D.zoneId||"meadow",De=pe==="canyon"?16742938:pe==="ice"?16055295:pe==="sky"?16777215:pe==="climb"?16765503:16774856;ne.material.color.setHex(De),ne.material.size=pe==="ice"?.28:pe==="canyon"?.22:.16,ne.material.opacity=pe==="ice"?.55+Math.abs(Math.sin(Y*7))*.4:.85;let it=pe==="sky"?4:pe==="canyon"?.4:.8;for(let Ne=0;Ne<me;Ne++){let lt=Ze[Ne],B=(Y*lt.sp*it+lt.oy)%7;ve[Ne*3]=fe.pos.x+lt.ox+(pe==="sky"?Math.sin(Y+Ne)*.4:0),ve[Ne*3+1]=fe.pos.y+.4+B,ve[Ne*3+2]=fe.pos.z+lt.oz}pt.attributes.position.needsUpdate=!0}}}var Nh={tree:"assets/meadow/tree.glb",treeFat:"assets/meadow/tree_fat.glb",pine:"assets/meadow/tree_pine.glb",bush:"assets/meadow/bush.glb",bushLarge:"assets/meadow/bush_large.glb",bushSmall:"assets/meadow/bush_small.glb",flowerRed:"assets/meadow/flower_red.glb",flowerYellow:"assets/meadow/flower_yellow.glb",flowerPurple:"assets/meadow/flower_purple.glb",grass:"assets/meadow/grass.glb",grassLarge:"assets/meadow/grass_large.glb",rock:"assets/meadow/rock_small.glb",rockLarge:"assets/meadow/rock_large.glb",mushroom:"assets/meadow/mushroom.glb",mushroomTall:"assets/meadow/mushroom_tall.glb",fence:"assets/meadow/fence.glb",fenceBroken:"assets/meadow/fence_broken.glb",platform:"assets/meadow/platform.glb",log:"assets/meadow/log.glb",saw:"assets/meadow/saw.glb",button:"assets/meadow/button.glb",door:"assets/meadow/door.glb"},Fh={cliff:"assets/kenney/cliff.glb",cliffLarge:"assets/kenney/cliff_large.glb",cliffTop:"assets/kenney/cliff_top.glb",formation:"assets/kenney/formation.glb",formationLarge:"assets/kenney/formation_large.glb",plank:"assets/kenney/plank.glb",block:"assets/kenney/block.glb",doorOpen:"assets/kenney/door_open.glb"},yp={woodbark:13206602,woodinner:15782564,wooddark:9263666,wood:14722140,leafsgreen:4050517,grass:5166687,dirt:14135410,colorred:16729180,coloryellow:16765503,colorpurple:13208575,metal:16774354,heart:16735114,_defaultmat:16774885};function v_(i){let e=String(i||"").toLowerCase().replace(/[^a-z]/g,"");return yp[e]?yp[e]:e.includes("leaf")||e.includes("grass")?4050517:e.includes("wood")||e.includes("bark")?13206602:e.includes("red")?16729180:e.includes("yellow")?16765503:e.includes("purple")?13208575:e.includes("dirt")||e.includes("rock")?12042444:16774885}var Mp={value:0};function Sp(i){Mp.value=i}function Ep(i,e,t,n){let s=i&&i.name||"",r=new vt({color:t?t(s):v_(s),gradientMap:e,side:Dt,name:s});return r.onBeforeCompile=o=>{os(o,{}),n&&(o.uniforms.uWindTime=Mp,o.vertexShader=`uniform float uWindTime;
`+o.vertexShader.replace("vPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;",`float sway = sin(uWindTime * 1.7 + position.x * 0.45 + position.z * 0.2) * 0.075 * smoothstep(0.3, 1.8, position.y);
transformed.x += sway;
transformed.z += sway * 0.35;
vPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;`))},r}function Uh(i,e){i.traverse(t=>{if(!t.isMesh)return;let n=Array.isArray(t.material)?t.material[0]:t.material;t.material=Ep(n,e)})}function __(i,e,t,n){i.scene.updateWorldMatrix(!0,!0);let s=[];i.scene.traverse(o=>{if(!o.isMesh)return;let a=o.geometry.clone();a.applyMatrix4(o.matrixWorld);let c=Array.isArray(o.material)?o.material[0]:o.material;s.push({geom:a,mat:Ep(c,e,t,n)})});let r=new Qt().setFromObject(i.scene);return{parts:s,lift:-r.min.y}}function St(i,e,t,n,s,r){if(!e||!n.length)return;let{parts:o,lift:a}=__(e,t,s,r),c=new at;for(let h of o){let f=new fn(h.geom,h.mat,n.length);f.frustumCulled=!1,n.forEach((p,g)=>{let b=p.s;c.position.set(p.x,(p.y||0)+a*b,p.z),c.rotation.set(0,p.rot||0,0),c.scale.setScalar(b),c.updateMatrix(),f.setMatrixAt(g,c.matrix)}),f.instanceMatrix.needsUpdate=!0,i.add(f)}let l=new fn(new Tn(1,12),new Qe({color:1975360,transparent:!0,opacity:.22,depthWrite:!1}),n.length),u=new at;n.forEach((h,f)=>{u.position.set(h.x,(h.y||0)+.05,h.z),u.rotation.set(-Math.PI/2,0,0),u.scale.setScalar(Math.max(.35,h.s*1.6)),u.updateMatrix(),l.setMatrixAt(f,u.matrix)}),l.instanceMatrix.needsUpdate=!0,l.frustumCulled=!1,i.add(l)}function Qn(i,e,t,n,s){let r=[];for(let o=0;o<t;o++){let a=o*2.4+i*.1,c=n*(.25+o%4*.22);r.push({x:i+Math.cos(a)*c,z:e+Math.sin(a)*c,rot:a,s:s*(.82+o%3*.14),y:0})}return r}function gn(i,e,t,n,s,r,o){let a=[];for(let c=0;c<t;c++){let l=o+c/t*Math.PI*2;a.push({x:i+Math.cos(l)*n,z:e+Math.sin(l)*n,rot:l,s:s*(.85+c%3*.12),y:r})}return a}var Br=i=>{let e=String(i||"").toLowerCase();return e.includes("sand")||e.includes("grass")||e.includes("leaf")?14711346:e.includes("red")?12863544:e.includes("wood")||e.includes("dirt")?9058856:7220770};function hc(i,e,t,n){if(!e.length)return;let s=new Ot(.85,12,9),r=new vt({color:t,gradientMap:n}),o=new fn(s,r,e.length),a=new at,c=new fn(new Tn(1,12),new Qe({color:1975360,transparent:!0,opacity:.22,depthWrite:!1}),e.length),l=new at;e.forEach((u,h)=>{a.position.set(u.x,(u.y||0)+.7*u.s,u.z),a.scale.set(u.s,u.s*.82,u.s),a.rotation.set(0,u.rot||0,0),a.updateMatrix(),o.setMatrixAt(h,a.matrix),l.position.set(u.x,(u.y||0)+.06,u.z),l.rotation.set(-Math.PI/2,0,0),l.scale.setScalar(Math.max(.5,u.s*1.4)),l.updateMatrix(),c.setMatrixAt(h,l.matrix)}),o.instanceMatrix.needsUpdate=!0,c.instanceMatrix.needsUpdate=!0,i.add(o,c)}var Dh=i=>{let e=String(i||"").toLowerCase();return e.includes("leaf")||e.includes("grass")||e.includes("sand")?8315080:13995007},vp=i=>{let e=String(i||"").toLowerCase();return e.includes("leaf")||e.includes("grass")||e.includes("sand")?8317183:3120639},_p=i=>{let e=String(i||"").toLowerCase();return e.includes("leaf")||e.includes("grass")||e.includes("sand")?16761402:16742938},zh=i=>{let e=String(i||"").toLowerCase();return e.includes("sand")||e.includes("grass")||e.includes("leaf")?4050517:e.includes("wood")||e.includes("dirt")?9267268:7166016};function wp(i,e,t,n){let s=(e.hubs||[]).find(T=>T.zone==="meadow")||{x:0,z:40,r:24},r=Qn(s.x-10,s.z-1,6,3.2,.62),o=Qn(s.x+9,s.z+13,4,2.8,.72),a=Qn(s.x-8,s.z+12,3,2.2,.58),c=Qn(s.x-11,s.z+6,5,2.4,.85),l=Qn(s.x-7,s.z-13,8,2.2,.78),u=Qn(s.x+8,s.z-9,7,2,.72),h=Qn(s.x+6,s.z-14,8,2.6,.42).concat(Qn(s.x-6,s.z+8,6,2.2,.4)),f=Qn(s.x+16,s.z+2,5,2.6,.95),p=[{x:s.x+7.2,z:s.z-5.5,rot:.4,s:2.15,y:0},{x:s.x+9.4,z:s.z-7.2,rot:1.2,s:1.55,y:0},{x:s.x+6.1,z:s.z-7.6,rot:2.1,s:1.25,y:0}],g=[];for(let T=0;T<6;T++)g.push({x:s.x-18.6,z:s.z-12+T*3.6,rot:Math.PI/2,s:.52,y:0});let m=(e.floors||[]).filter(T=>T.zone==="meadow"&&T.rx>5&&T.rx<9).map((T,I)=>({x:T.x,z:T.z,y:T.y,rot:I,s:.85}));if(St(i,n.tree,t,r,null,!0),St(i,n.treeFat,t,o,null,!0),St(i,n.pine,t,a,null,!0),St(i,n.bushLarge,t,c,null,!0),St(i,n.bush,t,Qn(s.x+12,s.z+8,4,2,.7),null,!0),St(i,n.flowerRed,t,l.filter((T,I)=>I%2===0),null,!0),St(i,n.flowerYellow,t,l.filter((T,I)=>I%2===1),null,!0),St(i,n.flowerPurple,t,u,null,!0),St(i,n.grass,t,h,null,!0),St(i,n.grassLarge,t,Qn(s.x-9,s.z-8,4,1.8,.48),null,!0),St(i,n.rockLarge,t,f),St(i,n.rock,t,Qn(s.x+15,s.z-1,4,1.6,.55)),St(i,n.mushroomTall,t,p),St(i,n.fence,t,g),St(i,n.log,t,[{x:s.x-15.5,z:s.z-8,rot:.5,s:.7,y:0}]),St(i,n.platform,t,m),St(i,n.cliff,t,gn(s.x,s.z,12,21.2,.62,-1.2,.05),zh),St(i,n.cliffLarge,t,gn(s.x,s.z,12,23.4,.55,-1.5,.2),zh),St(i,n.cliffTop,t,gn(s.x,s.z,8,36,1.15,-1.2,.4),zh),n.mushroom){let T=n.mushroom.scene.clone(!0);Uh(T,t);let I=new Qt().setFromObject(n.mushroom.scene),w=4.6;T.scale.setScalar(w),T.position.set(s.x,-I.min.y*w,s.z);let M=[];T.traverse(z=>{z.isMesh&&M.push(z)});for(let z of M){let W=new be(z.geometry,new Qe({color:1975360,side:rn}));W.scale.setScalar(1.045),z.add(W)}[[.22,1.28,.05],[-.18,1.22,.2],[.05,1.32,-.22],[.28,1.18,-.12]].forEach((z,W)=>{let X=n.mushroomTall.scene.clone(!0);Uh(X,t),X.scale.setScalar(.16+W%2*.05),X.position.set(z[0],z[1],z[2]),X.rotation.y=W,T.add(X)}),i.add(T)}let d=(e.hubs||[]).find(T=>T.zone==="canyon"),_=e.crater;if(d){let T=_?_.x:d.x,I=_?_.z:d.z;hc(i,gn(T,I,5,16,1.05,.15,.2),16747098,t),hc(i,gn(T,I,4,19,.7,.1,.4),16765503,t),St(i,n.cliffLarge,t,gn(d.x,d.z,10,21,.7,-1.4,.05),Br),St(i,n.cliff,t,gn(d.x,d.z,10,23.2,.62,-1.6,.18),Br),St(i,n.cliffTop,t,gn(d.x,d.z,7,36,1.25,-.8,.3),Br);let w=[{x:d.x-16,z:d.z+8,rot:.4,s:.7,y:0},{x:d.x-16,z:d.z+14,rot:.4,s:.7,y:0},{x:d.x-16,z:d.z+11,rot:Math.PI/2,s:.55,y:4.2}];St(i,n.cliff,t,w.slice(0,2),Br),St(i,n.cliffTop,t,w.slice(2),Br);let M=e.doors&&e.doors[0]?e.doors[0].z:I+28;n.block&&St(i,n.block,t,[{x:-12.6,z:M,rot:0,s:.28,y:.15},{x:12.6,z:M,rot:0,s:.28,y:.15}],Br)}let v=(e.hubs||[]).find(T=>T.zone==="sky"),y=(e.hubs||[]).find(T=>T.zone==="ice"),R=(e.hubs||[]).find(T=>T.zone==="climb");v&&(St(i,n.pine,t,gn(v.x,v.z,6,14,.42,4.2,.2),Dh,!0),St(i,n.bush,t,gn(v.x,v.z,5,18,.45,4.1,.6),Dh,!0),St(i,n.cliffTop,t,gn(v.x,v.z,6,28,1,2,.4),Dh)),y&&(St(i,n.pine,t,gn(y.x,y.z,7,14,.4,3.2,.3),vp,!0),hc(i,gn(y.x,y.z,6,16,.7,3.1,.8),4114687,t),St(i,n.cliff,t,gn(y.x,y.z,12,18,.5,1.6,.1),vp)),R&&(St(i,n.tree,t,gn(R.x,R.z,6,13,.4,3.2,.5),_p,!0),hc(i,gn(R.x,R.z,5,15,.75,3,1),16751146,t),St(i,n.cliffLarge,t,gn(R.x,R.z,10,18,.55,1.4,.2),_p))}function as(i,e,t,n){let s=new Qt().setFromObject(i.scene),r=i.scene.clone(!0);return Uh(r,e),r.scale.setScalar(t),n||(r.position.y=-s.min.y*t),r}var Tp={buddy:"assets/space_buddy_rigged.glb",bumper:"assets/models/obstacle_bumper.glb",spinner:"assets/models/obstacle_spinner.glb",pad:"assets/models/obstacle_jump_pad.glb",platform:"assets/models/obstacle_moving_platform.glb",lava:"assets/models/obstacle_lava_pool.glb",chunk:"assets/models/obstacle_falling_chunk.glb",ship:"assets/escape_ship_web.glb",roller:"assets/models/enemy_roller.glb",hopper:"assets/models/enemy_hopper.glb",flyer:"assets/models/enemy_flyer.glb",geyser:"assets/models/hazard_geyser.glb",sweeper:"assets/models/hazard_sweeper.glb",pendulum:"assets/models/hazard_pendulum.glb"},Et=xp();function M_(i){i.onBeforeCompile=e=>os(e,{stripes:!!i.userData.stripes})}function Ap(i,e){let t=e?new Le(e):i&&i.color&&i.color.isColor?i.color.clone():new Le(16777215),n=i&&i.emissive&&i.emissive.isColor?i.emissive.clone():new Le(0),s=new vt({color:t,emissive:n,emissiveIntensity:i&&i.emissiveIntensity||0,gradientMap:Et,transparent:!!(i&&i.transparent),opacity:i&&i.opacity!=null?i.opacity:1,side:Dt,name:i&&i.name||""});return e&&(s.userData.stripes=!0),/Lava|Glow|Antenna|Thruster|Pad|Crack|Star|Hot/.test(s.name)&&(s.emissive.copy(t),s.emissiveIntensity=Math.max(s.emissiveIntensity,.35)),M_(s),s}function S_(i){let e=i.getAttribute("position"),t=i.getIndex();if(!e||!t)return;let n=t.array,s=[],r=new Map,o=.012;for(let a=0;a<n.length;a+=3){let c=n[a],l=n[a+1],u=n[a+2],h=(e.getX(c)+e.getX(l)+e.getX(u))/3,f=(e.getY(c)+e.getY(l)+e.getY(u))/3,p=(e.getZ(c)+e.getZ(l)+e.getZ(u))/3,g=Math.round(h/o)+":"+Math.round(f/o)+":"+Math.round(p/o),b=r.get(g)||[],m=!1;for(let d=0;d<b.length;d++){let _=b[d];if(Math.abs(_[0]-h)+Math.abs(_[1]-f)+Math.abs(_[2]-p)<.008){m=!0;break}}m||(b.push([h,f,p]),r.set(g,b),s.push(c,l,u))}s.length<n.length&&i.setIndex(s)}function E_(i){let e=i.getAttribute("position"),t=i.getIndex();if(!e||!t)return;let n=t.array,s=[],r=h=>e.getX(h),o=h=>e.getY(h),a=h=>e.getZ(h),c=1/0,l=-1/0;for(let h=0;h<e.count;h++){let f=o(h);f<c&&(c=f),f>l&&(l=f)}let u=Math.max(.001,l-c);for(let h=0;h<n.length;h+=3){let f=n[h],p=n[h+1],g=n[h+2],b=Math.hypot(r(f)-r(p),o(f)-o(p),a(f)-a(p)),m=Math.hypot(r(p)-r(g),o(p)-o(g),a(p)-a(g)),d=Math.hypot(r(g)-r(f),o(g)-o(f),a(g)-a(f)),_=Math.max(b,m,d),v=Math.min(b,m,d);v<8e-4||_/Math.max(v,1e-6)>18||_>u*.42||s.push(f,p,g)}s.length<n.length&&i.setIndex(s)}function w_(i,e){i.updateWorldMatrix(!0,!0),i.traverse(r=>{r.isMesh&&(r.geometry=r.geometry.clone(),r.geometry.applyMatrix4(r.matrixWorld),S_(r.geometry),E_(r.geometry),r.position.set(0,0,0),r.quaternion.identity(),r.scale.set(1,1,1))}),i.position.set(0,0,0),i.quaternion.identity(),i.scale.set(1,1,1),i.updateWorldMatrix(!0,!0);let t=new Qt().setFromObject(i),n=Math.max(.001,t.getSize(new k).y);i.scale.setScalar(e/n),i.updateWorldMatrix(!0,!0);let s=new Qt().setFromObject(i);i.position.y-=s.min.y}var Cp=4;function Ip(i){return i?(i.colorSpace=Xt,i.generateMipmaps=!0,i.minFilter=Yn,i.magFilter=vn,i.anisotropy=Cp,i.needsUpdate=!0,i):null}function T_(i,e){let t=new Le(e),n=Ip(i&&i.map),s=new es({map:n,color:16777215,roughness:1,metalness:0,emissive:0,emissiveIntensity:0,name:"BuddyHue"});return s.transparent=!1,s.depthWrite=!0,s.opacity=1,s.alphaTest=0,s.side=Bn,s.polygonOffset=!0,s.polygonOffsetFactor=1,s.polygonOffsetUnits=1,s.userData.tint=t,s.onBeforeCompile=r=>{r.uniforms.uTint={value:t},s.userData.shader=r,r.fragmentShader=`uniform vec3 uTint;
`+r.fragmentShader.replace("#include <opaque_fragment>",`vec3 albedo = diffuseColor.rgb;
float luma = dot(albedo, vec3(0.299, 0.587, 0.114));
float mx = max(albedo.r, max(albedo.g, albedo.b));
float mn = min(albedo.r, min(albedo.g, albedo.b));
float sat = mx - mn;
float warm = smoothstep(0.02, 0.14, albedo.r - max(albedo.g, albedo.b));
float suit = smoothstep(0.12, 0.26, sat) * (1.0 - warm);
vec3 tinted = uTint * mix(0.82, 1.22, clamp(luma, 0.0, 1.0));
vec3 color = mix(albedo, tinted, suit);
outgoingLight = color;
#include <opaque_fragment>`)},s}function A_(i){let e=Ip(i&&i.map),t=new Qe({map:e,color:16777215,fog:!1,toneMapped:!1,name:"ShipPaint"});return t.transparent=!1,t.depthWrite=!0,t.opacity=1,t.side=Bn,t}function R_(i,e){let t=new Map;i.traverse(n=>{if(!n.isMesh)return;let s=r=>{if(!r)return Ap(null,e);if(!e&&t.has(r.uuid))return t.get(r.uuid);let o=Ap(r,e);return e||t.set(r.uuid,o),o};Array.isArray(n.material)?n.material=n.material.map(s):n.material=s(n.material)})}function Rp(i){i.updateWorldMatrix(!0,!0);let e=[];return i.traverse(t=>{if(!t.isMesh)return;let n=t.geometry.clone();n.applyMatrix4(t.matrixWorld),n.computeBoundingBox();let s=Array.isArray(t.material)?t.material[0]:t.material;e.push({geom:n,mat:s,name:s&&s.name||t.name||"",maxY:n.boundingBox.max.y})}),e}function Wn(i,e,t,n){return e+(i-e)*Math.exp(-t*n)}function C_(i,e,t,n){let s=e-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-t*n))}async function Pp(i,e,t,n){let s=new ka({canvas:i,antialias:!1,alpha:!1,powerPreference:"high-performance"});s.outputColorSpace=Xt,Cp=Math.max(1,Math.min(8,s.capabilities.getMaxAnisotropy())),s.toneMapping=Bu,s.toneMappingExposure=1.12;let r=Math.min(window.devicePixelRatio||1,t.dprCap),o=new URLSearchParams(location.search).get("dpr");o&&(r=Math.max(.75,Math.min(2,Number(o)||r)));let a=new vo;a.fog=new Oa(10479871,t.fogNear,t.fogFar);let c=new sn(t.fovPortrait,1,.15,500);c.layers.enable(1);let l=s.getContext(),u=l.getExtension("WEBGL_debug_renderer_info"),h=u?String(l.getParameter(u.UNMASKED_RENDERER_WEBGL)||""):"",f=/SwiftShader|llvmpipe|Mali-4|PowerVR SGX|Adreno \(TM\) [34]/i.test(h)||navigator.deviceMemory&&navigator.deviceMemory<=2,p=!f&&new URLSearchParams(location.search).get("nopost")!=="1";new URLSearchParams(location.search).get("post")==="1"&&(p=!0);let g=new Zn(4,4),b=new Zn(4,4),m=new vo,d=new Ji(-1,1,1,-1,0,1),_=new $t({depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{tScene:{value:g.texture},tBloom:{value:b.texture}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"varying vec2 vUv; uniform sampler2D tScene; uniform sampler2D tBloom; void main(){ vec3 c = texture2D(tScene, vUv).rgb; vec2 o = vec2(0.022, 0.0); vec3 b = texture2D(tBloom, vUv + o).rgb + texture2D(tBloom, vUv - o).rgb + texture2D(tBloom, vUv + o.yx).rgb + texture2D(tBloom, vUv - o.yx).rgb; b += texture2D(tBloom, vUv + o * 2.0).rgb + texture2D(tBloom, vUv - o * 2.0).rgb; c += b * 0.22; float l = dot(c, vec3(0.2126, 0.7152, 0.0722)); c = clamp(l + (c - l) * 1.08, 0.0, 1.35); gl_FragColor = vec4(c, 1.0); }"});m.add(new be(new ui(2,2),_)),s.shadowMap.enabled=!0,s.shadowMap.type=ku;let v=new Qa(10474751,16761994,.9),y=new Ps(16773314,1.5);y.position.set(-18,28,10),y.castShadow=!0,y.shadow.mapSize.set(1024,1024),y.shadow.camera.near=2,y.shadow.camera.far=38,y.shadow.camera.left=y.shadow.camera.bottom=-12,y.shadow.camera.right=y.shadow.camera.top=12,y.shadow.bias=-6e-4;let R=new Ps(12180735,.28);R.position.set(16,10,-18),a.add(v,y,y.target,R);let T=new be(new Ot(380,18,12),new $t({side:rn,depthWrite:!1,fog:!1,uniforms:{top:{value:new Le(6080767)},mid:{value:new Le(10479871)},bot:{value:new Le(9361328)}},vertexShader:"varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 bot; void main(){ vec3 n=normalize(vP); float h=n.y; vec3 c=mix(bot, mid, smoothstep(-0.15, 0.0, h)); c=mix(c, top, smoothstep(-0.02, 0.16, h)); float sun=smoothstep(0.14, 0.0, length(n.xz-vec2(-0.32,0.12))); c+=vec3(1.0,0.86,0.48)*sun*smoothstep(0.0,0.2,h); gl_FragColor=vec4(c,1.0); }"}));T.userData.skipCam=!0,a.add(T);let I=new Wt,w=[];for(let x=0;x<180;x++){let C=Math.random()*Math.PI*2,N=Math.acos(Math.random()*.65+.15),F=260;w.push(Math.sin(N)*Math.cos(C)*F,Math.cos(N)*F*.65+40,Math.sin(N)*Math.sin(C)*F)}let M=new kt;M.setAttribute("position",new ft(w,3));let S=new Qi(M,new Pi({color:16774880,size:2.2,sizeAttenuation:!1,depthWrite:!1})),z=new be(new Ot(28,18,14),new $t({fog:!1,vertexShader:"varying vec3 vN; void main(){ vN=normalize(normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec3 vN; void main(){ float b=sin(vN.y*9.0)*0.5+0.5; vec3 c=mix(vec3(1.0,0.42,0.62), vec3(0.28,0.62,1.0), b); c=mix(c, vec3(1.0,0.86,0.35), smoothstep(0.72,0.9,b)); gl_FragColor=vec4(c,1.0); }"}));z.position.set(-90,55,-160);let W=new be(new $i(40,3.2,8,28),new Qe({color:16769448,fog:!1}));W.rotation.x=1.1,W.position.copy(z.position),I.add(W);let X=new be(new Ot(8,12,10),new Qe({color:16773577,fog:!1}));X.position.set(70,42,-150),I.add(S,z,X),S.material.transparent=!0;let j=[],J=new Qe({color:16777215,fog:!1,transparent:!0,opacity:.94});for(let x=0;x<8;x++){let C=new Wt;for(let F=0;F<4;F++){let oe=new be(new Ot(5.5,8,6),J);oe.position.set((F-1.5)*4.6,Math.sin(F*1.4)*1.6,F%2*1.4),oe.scale.set(1,.55,.85),C.add(oe)}let N=x/8*Math.PI*2;C.position.set(Math.cos(N)*110,48+x%3*14,Math.sin(N)*110),I.add(C),j.push(C)}let ee=[];for(let x=0;x<4;x++){let C=new be(new Gn(2.2,7,6),new Qe({color:x%2?16748497:16765503,fog:!1}));C.rotation.x=Math.PI/2,C.position.set(-40+x*28,36+x%2*8,-90-x*12),I.add(C),ee.push(C)}let le=[];for(let x=0;x<6;x++){let C=new be(new en(.06,.06,2.2,5),new Qe({color:16774885})),N=new be(new ui(1.1,.55),new Qe({color:x%2?16739179:6284208,side:Dt}));N.position.set(.55,.85,0),C.add(N),C.position.set(-10+x*4.5,.2,16+x%3),a.add(C),le.push(N)}I.userData.skipCam=!0,a.add(I);let Q=new lc;Q.setMeshoptDecoder(fp);let ye=Object.keys(Tp),me={},ve={},Ze=0,pt=Object.keys(Nh).concat(Object.keys(Fh)),ne=ye.length+pt.length;await Promise.all([...ye.map(x=>new Promise((C,N)=>{Q.load(Tp[x],F=>{if(x==="ship")w_(F.scene,6.6),F.scene.traverse(oe=>{if(!oe.isMesh||!oe.material)return;let xe=Array.isArray(oe.material)?oe.material[0]:oe.material;oe.material=A_(xe)});else if(x!=="buddy"){let oe={bumper:16736162,spinner:16765503,pad:6087167,platform:13208575,lava:16738858,chunk:16757082,roller:16747066,hopper:8052896,flyer:9221887,geyser:16765503,sweeper:16743121,pendulum:13219583}[x];R_(F.scene,oe)}me[x]=F,Ze++,n&&n(Ze/ne),C()},void 0,N)})),...pt.map(x=>new Promise((C,N)=>{Q.load(Nh[x]||Fh[x],F=>{ve[x]=F,Ze++,n&&n(Ze/ne),C()},void 0,N)}))]),wp(a,e,Et,ve);let D=new at,O=new Le;function Y(x,C,N){let F=Rp(x.scene),oe=0;for(let Ge of F)oe=Math.max(oe,Ge.maxY);let xe=[];for(let Ge of F){Ge.geom.translate(0,-oe,0);let ut=/Crack|Glow/.test(Ge.name),L=ut?new vt({color:16742938,emissive:16742938,emissiveIntensity:.85,gradientMap:Et}):new vt({color:16777215,gradientMap:Et}),U=new fn(Ge.geom,L,C.length);U.instanceMatrix.setUsage(Zd);for(let $=0;$<C.length;$++){let Ie=C[$];if(D.position.set(Ie.x,Ie.y,Ie.z),D.rotation.set(0,0,0),D.scale.set(1,1,1),D.updateMatrix(),U.setMatrixAt($,D.matrix),ut)O.set(16742938),U.setColorAt($,O);else{let Pt=Ge.maxY>oe-.25?Ie.topColor:Ie.sideColor;O.set(N==="crack"&&Ge.maxY>oe-.25?Ie.topColor:Pt),U.setColorAt($,O)}}N==="crack"&&fe(U,C.length),U.instanceMatrix.needsUpdate=!0,U.instanceColor&&(U.instanceColor.needsUpdate=!0),U.computeBoundingSphere(),a.add(U),xe.push(U)}return xe}function fe(x,C){for(let N=0;N<C;N++)D.position.set(0,-80,0),D.scale.set(0,0,0),D.rotation.set(0,0,0),D.updateMatrix(),x.setMatrixAt(N,D.matrix)}let pe=bp(a,e,Et),De=new vt({vertexColors:!0,gradientMap:Et,side:Dt});De.onBeforeCompile=x=>os(x,{floors:!0});let it=new vt({vertexColors:!0,color:16765104,emissive:16742938,emissiveIntensity:.28,gradientMap:Et,side:Dt}),Ne=[];for(let x of e.chunks){if(x.gap||!x.positions){Ne.push(null);continue}let C=new kt;C.setAttribute("position",new zt(x.positions,3)),C.setAttribute("color",new zt(x.colors,3)),C.setIndex(new zt(x.indices,1)),C.computeVertexNormals();let N=new be(C,De);N.frustumCulled=!0,N.receiveShadow=!0,a.add(N),x.mesh=N,Ne.push(N)}let lt={meadow:[.16,.62,.32],canyon:[.72,.24,.16],sky:[.72,.36,.7],ice:[.16,.55,.95],climb:[.9,.42,.1],ship:[.9,.55,.18]},B=[],ue=[],ge=[],we=[],Ae=14,Je=9;for(let x=0;x<=e.len;x+=Ae){let C=e.stations[Math.min(e.stations.length-1,Math.round(x/2))],N=lt[C.zone]||lt.meadow,F=[];for(let oe=0;oe<Je;oe++){let xe=(oe/(Je-1)*2-1)*32,Ge=(Math.abs(xe)/12)**2;B.push(C.x+xe,C.y-8.2-Ge,C.z);let ut=.86+Math.sin(C.z*.04+xe*.2)*.08;ue.push(N[0]*ut,N[1]*ut,N[2]*ut),F.push(B.length/3-1)}we.push(F)}for(let x=0;x<we.length-1;x++)for(let C=0;C<Je-1;C++){let N=we[x][C],F=we[x][C+1],oe=we[x+1][C],xe=we[x+1][C+1];ge.push(N,oe,F,F,oe,xe)}let ze=new kt;if(ze.setAttribute("position",new zt(new Float32Array(B),3)),ze.setAttribute("color",new zt(new Float32Array(ue),3)),ze.setIndex(ge),ze.computeVertexNormals(),a.add(new be(ze,De)),e.floors&&e.floors.length){let x=new fn(new Tn(1,10),new Qe({color:1975360,transparent:!0,opacity:.16,depthWrite:!1}),e.floors.length),C=new at;e.floors.forEach((N,F)=>{C.position.set(N.x,N.y+.05,N.z),C.rotation.set(-Math.PI/2,0,0),C.scale.set(Math.max(.8,N.rx*.55),Math.max(.8,N.rz*.55),1),C.updateMatrix(),x.setMatrixAt(F,C.matrix)}),x.instanceMatrix.needsUpdate=!0,a.add(x)}let P=null,E=null,q=new at;if(e.coins&&e.coins.length){let x=new en(.32,.32,.08,12),C=new vt({color:16765503,emissive:16765503,emissiveIntensity:.55,gradientMap:Et});P=new fn(x,C,e.coins.length);let N=new Qe({color:16765503,transparent:!0,opacity:.35,depthWrite:!1,blending:Mr});E=new fn(new Tn(.7,12),N,e.coins.length),e.coins.forEach((F,oe)=>{q.position.set(F.x,F.y,F.z),q.rotation.x=Math.PI/2,q.updateMatrix(),P.setMatrixAt(oe,q.matrix),E.setMatrixAt(oe,q.matrix)}),P.userData.bloom=!0,E&&(E.userData.bloom=!0),a.add(P,E)}let se=[];for(let x of e.doors||[]){let C=x.solid?ve.door:ve.doorOpen;if(!C)continue;let N=as(C,Et,.4,!1);N.position.x=x.x,N.position.z=x.z,N.position.y+=x.y,x.solid&&N.traverse(F=>{F.isMesh&&F.material&&F.material.color&&F.material.color.set(12862778)}),a.add(N),se.push(N)}let ae=new vt({color:14826314,gradientMap:Et}),ie=new vt({color:16048836,gradientMap:Et}),Oe=new vt({color:7306394,gradientMap:Et});for(let x of e.landmarks||[])if(x.kind!=="mushroom"){if(x.kind==="tower"){let C=new be(new en(1.3,2.4,11,8),Oe);C.position.set(x.x,x.y+5.2,x.z);let N=new be(new Gn(2.6,2.4,8),ae);N.position.set(x.x,x.y+11.6,x.z),a.add(C,N)}}for(let x of e.islands||[]){let C=new be(new en(x.r,x.r*.7,.85,10),new vt({color:x.zone==="canyon"?13720114:9425034,gradientMap:Et}));C.position.set(x.x,x.y-.25,x.z),a.add(C)}let Me=Rp(me.chunk.scene)[0].geom,Re=new wo({color:12166105}),$e=[];for(let x=0;x<24;x++){let C=new be(Me,Re);C.visible=!1,C.scale.setScalar(.85),a.add(C),$e.push({mesh:C,active:!1,vy:0,life:0})}function he(x){let C=x.scene.clone(!0);return C.traverse(N=>{!N.isMesh||!N.material||(N.material=Array.isArray(N.material)?N.material.map(F=>F.clone()):N.material.clone())}),C}function Pe(x,C,N,F,oe=0,xe=1){let Ge=x.scene.clone(!0);return Ge.position.set(C,N,F),Ge.rotation.y=oe,Ge.scale.setScalar(xe),a.add(Ge),Ge}let We=e.bumpers.map(x=>Pe(me.bumper,x.x,x.y,x.z)),Xe=e.pads.map(x=>{if(x.zone==="meadow"&&ve.button){let C=as(ve.button,Et,.42,!1);return C.position.x=x.x,C.position.z=x.z,C.position.y+=x.y,a.add(C),C}return Pe(me.pad,x.x,x.y,x.z)});Xe.forEach(x=>{x.userData.base=x.scale.x||1});let Ue=[];e.crater&&Ue.push(Pe(me.lava,e.crater.x,e.crater.y,e.crater.z,0,e.crater.r/3));let mt=e.spinners.map(x=>{if((x.zone==="meadow"||x.zone==="canyon")&&ve.saw){let F=as(ve.saw,Et,.34,!0);return F.position.set(x.x,x.y+.9,x.z),a.add(F),{obj:F,bar:F,meadow:!0}}let C=Pe(me.spinner,x.x,x.y,x.z);C.scale.setScalar((x.len||1.62)/1.62);let N=C.getObjectByName("Spinner_Bar");return{obj:C,bar:N}}),et=[];e.platforms.forEach((x,C)=>{let N;x.zone==="canyon"&&ve.plank?(N=as(ve.plank,Et,.24,!0),N.position.set(x.x,x.y,x.z),a.add(N)):N=Pe(me.platform,x.x,x.y,x.z,0,x.kind==="spin"?1.15:1.35),et[C]=N});let Ve=me.ship.scene;Ve.position.set(e.ship.x,e.ship.y,e.ship.z),Ve.rotation.y=Math.PI,a.add(Ve);let H=[],_e=[],te=new Qt().setFromObject(Ve),re=te.getSize(new k),Ce=te.getCenter(new k);for(let x=1;x<=8;x++){let C=Ve.getObjectByName("SeatSocket_"+x);if(!C){C=new at;let oe=(x-1)%4,xe=Math.floor((x-1)/4);C.position.set((oe-1.5)*.55,re.y*.46,(xe-.5)*.42),Ve.add(C)}H.push(C);let N=Ve.getObjectByName("Seat_"+x),F=[];N&&N.traverse(oe=>{if(!oe.isMesh)return;let Ge=(Array.isArray(oe.material)?oe.material:[oe.material]).filter(Boolean).map(ut=>{let L=ut.clone();return F.push({mat:L,color:L.color?L.color.clone():new Le(16777215),emissive:L.emissive?L.emissive.clone():new Le(0),intensity:L.emissiveIntensity||0}),L});oe.material=Array.isArray(oe.material)?Ge:Ge[0]}),_e.push(F)}let Se=new be(new en(.55,1.3,34,10,1,!0),new Qe({color:16765503,transparent:!0,opacity:.45,side:Dt,depthWrite:!1}));Se.position.y=20,Ve.add(Se);let Ke=new be(new Ur(3.1,3.7,28),new Qe({color:16765503,side:Dt,transparent:!0,opacity:.9,depthWrite:!1}));Ke.rotation.x=-Math.PI/2,Ke.position.set(e.ship.x,e.ship.y+.08,e.ship.z-4.2),Ke.userData.bloom=!0,a.add(Ke);let Ut=new be(new en(.55,.9,28,10,1,!0),new Qe({color:16765503,transparent:!0,opacity:.55,side:Dt,depthWrite:!1}));Ut.userData.bloom=!0,a.add(Ut);let jt=new Wt,wt=new Gn(.7,1.5,4),Un=new Qe({color:16773544,transparent:!0,opacity:.85,depthWrite:!1}),Cn=e.routes&&e.routes[0]||e.waypoints||[];for(let x=2;x<Cn.length;x+=3){let C=Cn[x],N=Cn[Math.min(Cn.length-1,x+1)],F=new be(wt,Un);F.position.set(C.x,(C.y||0)+1.3,C.z),F.rotation.x=Math.PI/2,F.rotation.z=Math.atan2(N.x-C.x,N.z-C.z),jt.add(F)}a.add(jt);let In=new be(new Gn(.85,2.2,8),new Qe({color:16765503}));In.rotation.x=Math.PI,In.position.y=.15,In.visible=!1;let ks=In.clone();ks.material=new Qe({color:16739179}),ks.scale.setScalar(.55),In.add(ks),In.position.set(0,.15,-1.4),Ve.add(In);let tn=new be(new Tn(14,40),new $t({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ vec2 uv=vUv+vec2(uTime*0.03,-uTime*0.02); float d=length(vUv-0.5)*2.0; float n=sin(uv.x*22.0+uTime)*sin(uv.y*19.0-uTime*0.8); n+=sin((uv.x*2.0+uv.y)*16.0+uTime*1.4)*0.65; float hotMask=smoothstep(0.15,0.72,n*0.5+0.5); vec3 crust=vec3(0.18,0.03,0.03); vec3 hot=vec3(1.0,0.82,0.18); vec3 c=mix(crust, hot, hotMask); c=mix(c, crust, smoothstep(0.48,0.9,d)); c+=vec3(1.0,0.35,0.05)*smoothstep(0.5,0.75,d)*(1.0-smoothstep(0.82,1.0,d)); gl_FragColor=vec4(c,1.0); }"}));tn.rotation.x=-Math.PI/2,tn.position.set(0,t.lavaStartY,(e.lava.z0+e.lava.z1)/2),tn.userData.bloom=!0,a.add(tn);let ki=0,mi=new be(new Gn(.28,.36,5),new Qe({color:16765503}));if(mi.visible=!1,a.add(mi),e.crater){let x=new be(new Tn(e.crater.r*1.35,20),new Qe({color:16757082,transparent:!0,opacity:.12,depthWrite:!1,blending:Mr}));x.rotation.x=-Math.PI/2,x.scale.setScalar(.72),x.position.set(e.crater.x,e.crater.y+.2,e.crater.z),a.add(x)}let Fo=new Ot(.28,8,6),Os=new Qe({color:16769184,transparent:!0,opacity:.55,depthWrite:!1}),Bs=[],hs=(e.lava.z0+e.lava.z1)/2;for(let x=0;x<22;x++){let C=new be(Fo,Os),N=x/22*Math.PI*2,F=3+x%5*2.2;C.position.set(Math.cos(N)*F,t.lavaStartY+.4,hs+Math.sin(N)*F),C.userData.decor=!0,C.userData.base=C.position.clone(),C.userData.speed=.6+x%4*.25,C.userData.phase=x*.7,a.add(C),Bs.push(C)}let ko=new Qe({color:16756832,transparent:!0,opacity:.18,depthWrite:!1,blending:Mr,side:Dt}),Oi=[];for(let x=0;x<8;x++){let C=new be(new ui(3.2,1.4),ko);C.position.set(-10+x*3,t.lavaStartY+1.1,hs+(x%2-.5)*8),a.add(C),Oi.push(C)}let Hs=(e.zones||[]).find(x=>x.id==="sky");if(Hs){let x=new Qe({color:16774395,transparent:!0,opacity:.9,depthWrite:!1});for(let C=0;C<7;C++){let N=new be(new Ot(7+C%3*2,10,8),x);N.scale.y=.28,N.position.set(-16+C%4*10,1.1,Hs.z0+12+C*((Hs.z1-Hs.z0)/8)),a.add(N)}}let Oo={meadow:[4057226,16736162,16765503],canyon:[16738890,16765503,16748497],sky:[16743121,13213951,8048895],ice:[4114687,15268863,4880639],climb:[16761402,16742954,16736162],ship:[16765503,16748497,6284208]},Xn=[];for(let x of e.floors||[]){if(x.rx<2.2||x.zone==="ship")continue;let C=x.rx>8?[.42,.78]:[.78],N=Math.max(3,Math.round((x.rx+x.rz)/5));for(let F of C)for(let oe=0;oe<N;oe++){let xe=oe/N*Math.PI*2+x.z*.07+F;Xn.push({x:x.x+Math.cos(xe)*x.rx*F,y:x.y,z:x.z+Math.sin(xe)*x.rz*F,zone:x.zone,kind:(oe+Math.floor(x.z+F*10))%6,spin:oe})}}function A(x,C,N){let F=C.filter(L=>N.includes(L.kind));if(!F.length)return null;let oe=new vt({vertexColors:!1,gradientMap:Et});oe.onBeforeCompile=L=>os(L,{});let xe=new fn(x,oe,F.length);xe.instanceColor=new Ii(new Float32Array(F.length*3),3);let Ge=new at,ut=new Le;return F.forEach((L,U)=>{let $=Oo[L.zone]||Oo.meadow;ut.setHex($[U%$.length]),xe.setColorAt(U,ut),Ge.position.set(L.x,L.y+(L.kind===4?2.1:L.kind===2?.9:.55),L.z),Ge.rotation.set(L.kind===1?Math.PI/2:0,L.spin,0);let Ie=L.kind===5?1.3:1;Ge.scale.setScalar(Ie),Ge.updateMatrix(),xe.setMatrixAt(U,Ge.matrix)}),xe.instanceMatrix.needsUpdate=!0,xe.instanceColor&&(xe.instanceColor.needsUpdate=!0),a.add(xe),xe.userData.spots=F,xe}let V=A(new en(.28,.34,1.5,8),Xn,[0]),Z=A(new Gn(.38,.9,5),Xn,[1]),K=A(new Ot(.42,8,6),Xn,[2]),G=A(new Eo(.38,0),Xn,[3]);G&&(G.userData.bloom=!0);let de=A(new Ot(.36,8,6),Xn,[4]),Te=A(new zn(1.1,.7,.55),Xn,[5]);if(Xn.length){let x=new fn(new Tn(.55,8),new Qe({color:1709104,transparent:!0,opacity:.28,depthWrite:!1}),Xn.length),C=new at;Xn.forEach((N,F)=>{C.position.set(N.x,N.y+.04,N.z),C.rotation.x=-Math.PI/2,C.scale.setScalar(N.kind===5?1.4:.8),C.updateMatrix(),x.setMatrixAt(F,C.matrix)}),x.instanceMatrix.needsUpdate=!0,a.add(x)}let Fe=[];function ke(x,C,N,F,oe){let xe=new $t({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uColor:{value:new Le(x)}},vertexShader:"uniform float uTime; varying vec2 vUv; void main(){ vUv=uv; vec3 p=position; p.z += sin(position.x*0.55+uTime*1.4)*0.12; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }",fragmentShader:"uniform float uTime; uniform vec3 uColor; varying vec2 vUv; void main(){ vec2 uv=vUv+vec2(uTime*0.05,-uTime*0.03); float n=sin(uv.x*36.0+uTime)+sin(uv.y*30.0-uTime*0.8); float edge=smoothstep(0.02,0.16,min(min(vUv.x,1.0-vUv.x),min(vUv.y,1.0-vUv.y))); float foam=smoothstep(0.45,0.9,n*0.5+0.5)*(1.0-edge); vec3 c=mix(uColor, vec3(0.92,1.0,1.0), foam*0.7); gl_FragColor=vec4(c,0.78); }"}),Ge=new be(new Tn(oe,24),xe);Ge.rotation.x=-Math.PI/2,Ge.position.set(C,N,F),a.add(Ge),Fe.push(xe)}let je=(e.zones||[]).find(x=>x.id==="ice");je&&ke(3066111,0,2.55,(je.z0+je.z1)*.5,16),ke(4050517,10,.08,e.zones?e.zones[0].z0+36:40,5);let tt=e.geysers.map(x=>{let C=he(me.geyser);return C.position.set(x.x,x.y,x.z),C.userData.jet=C.getObjectByName("GeyserJet"),C.userData.ring=C.getObjectByName("GeyserRing"),a.add(C),C}),Be=e.pendulums.map(x=>{let C;if(x.zone==="canyon"&&ve.log&&ve.rockLarge){C=new Wt;let F=as(ve.log,Et,.48,!0);F.rotation.z=Math.PI/2;let oe=as(ve.rockLarge,Et,.72,!0);oe.position.set(1.15,0,0),oe.traverse(xe=>{xe.isMesh&&xe.material&&xe.material.color&&xe.material.color.set(2760740)}),C.add(F,oe)}else C=he(me.pendulum);let N=new be(new en(.07,.07,1,6),new vt({color:1975360,gradientMap:Et}));return a.add(C,N),{bob:C,rope:N}}),xt=e.sweepers.map(x=>{if((x.zone==="meadow"||x.zone==="canyon")&&ve.saw){let oe=as(ve.saw,Et,.3,!0);return oe.position.set(x.x,x.y+.85,x.z),a.add(oe),oe}let C=he(me.sweeper),N=x.scale||(x.full?1.15:1);C.scale.set(N,N,N);let F=C.getObjectByName("SweeperBar");return F&&F.material&&F.material.color&&F.material.color.set(x.full?16742938:16739179),a.add(C),C});function At(x){let C=[];x.traverse(N=>{N.isMesh&&C.push(N)});for(let N of C){let F=new be(N.geometry,new Qe({color:1975360,side:rn}));F.scale.setScalar(1.08),N.add(F)}}let It=new vt({color:16765503,gradientMap:Et}),pn=new vt({color:16739179,gradientMap:Et}),bt=e.rollers.map(x=>{let C=he(me.roller);C.scale.setScalar(x.radius),x.snow&&C.traverse(Ge=>{!Ge.isMesh||!Ge.material||!Ge.material.color||Ge.name==="RollerEye"||Ge.name==="RollerMouth"||Ge.material.color.set(16251903)});let N=new be(new $i(1.2,.07,6,18),new Qe({color:x.snow?14152959:16765503,transparent:!0,opacity:.85}));N.rotation.x=Math.PI/2,N.position.y=-.82,C.add(N),C.userData.ring=N;let F=new be(new Gn(.34,.42,7),It);F.position.y=1.05;let oe=new be(new zn(.08,.1,.06),new vt({color:16774885,gradientMap:Et}));oe.position.set(-.08,-.08,.95);let xe=oe.clone();return xe.position.x=.08,C.add(F,oe,xe),At(C),a.add(C),C}),He=e.hoppers.map(()=>{let x=he(me.hopper);x.userData.body=x.getObjectByName("HopperBody"),x.userData.eyes=x.getObjectByName("HopperEye");let C=new be(new zn(.46,.16,.08),pn);C.position.set(0,.15,.62);let N=new be(new Ot(.09,8,6),pn);N.position.set(.28,.02,.48);let F=N.clone();F.position.x=-.28;let oe=new be(new Ot(.28,10,8),new vt({color:16771266,gradientMap:Et}));return oe.scale.set(1,.7,.45),oe.position.set(0,-.12,.42),x.add(C,N,F,oe),At(x),a.add(x),x}),Mn=e.flyers.map(()=>{let x=he(me.flyer);x.userData.wing=x.getObjectByName("FlyerWings"),x.userData.eyes=x.getObjectByName("FlyerEye");let C=new be(new $i(.16,.04,6,10),It);C.position.set(.16,.12,.34);let N=C.clone();return N.position.x=-.16,x.add(C,N),At(x),a.add(x),x});function _t(x){let N=[],F=[],oe=[],xe=[];for(let L=0;L<6;L++){let U=L/6*Math.PI*2+x,$=.75+(L*3+x*5)%3*.28;xe.push([Math.cos(U)*$,Math.sin(U)*$])}N.push(0,.18,0),F.push(.28,.16,.12),xe.forEach(([L,U])=>{N.push(L,.18,U),F.push(1,.45,.08)}),N.push(0,-.18,0),F.push(.35,.18,.1),xe.forEach(([L,U])=>{N.push(L*.92,-.22,U*.92),F.push(.85,.22,.04)});for(let L=0;L<6;L++){let U=1+L,$=1+(L+1)%6;oe.push(0,$,U);let Ie=8+L,Pt=8+(L+1)%6;oe.push(7,Ie,Pt),oe.push(U,$,Pt,U,Pt,Ie)}let Ge=6*2+2;N.push(.2,-.85,.15),F.push(1,.4,.05),N.push(.05,-.2,.05),F.push(1,.55,.08),N.push(.35,-.2,.22),F.push(1,.35,.04),oe.push(Ge,Ge+1,Ge+2);let ut=new kt;return ut.setAttribute("position",new ft(N,3)),ut.setAttribute("color",new ft(F,3)),ut.setIndex(oe),ut.computeVertexNormals(),ut}let Pn=[],Bi=new vt({vertexColors:!0,emissive:16742938,emissiveIntensity:.35,gradientMap:Et,side:Dt});for(let x=0;x<12;x++){let C=new be(_t(x*.7),Bi);C.scale.setScalar(2.6+x%3*.9),C.visible=!1,a.add(C);let N=x%2===0?-1:1;Pn.push({mesh:C,ox:N*(7.5+x%5*2.6),oy:7+x%4*3.4,oz:-1-x%5*2.4,spin:.7+x%5*.22,fall:.18+x%3*.08})}let Yt=new Wt;for(let x=0;x<10;x++){let C=new be(new zn(.05,.05,1.6),new Qe({color:16774885,transparent:!0,opacity:.75}));C.position.set(x%5-2,.4+x%3*.35,-.4-x%4*.35),Yt.add(C)}Yt.visible=!1,a.add(Yt);let gi=[];for(let x=0;x<7;x++){let C=new be(new Ot(2.2+x%3,8,6),new wo({color:16774885}));C.position.set(-18+x*9,16+x%2*3,e.zones[2].z0+20+x*18),C.scale.y=.45,C.userData.ox=C.position.x,C.userData.oz=C.position.z,a.add(C),gi.push(C)}let Nt=e.checkpoints.map(x=>{let C=new be(new Ur(.7,.95,18),new Qe({color:16765503,side:Dt,transparent:!0,opacity:.85,depthWrite:!1}));return C.rotation.x=-Math.PI/2,C.position.set(x.x,x.y+.08,x.z),a.add(C),C});function Zt(x){return new vt({color:x,gradientMap:Et})}function fs(x){let C={},N=new Wt,F=new be(new en(.035,.035,.28,5),Zt(16739179));F.position.y=1.62;let oe=new be(new zn(.72,.045,.1),Zt(16765503));oe.position.y=1.76,N.add(F,oe),N.userData.blade=oe,C.heli=N;let xe=new Wt;for(let Bt of[-.18,.18]){let Ht=new be(new $i(.13,.04,6,10),Zt(6044462));Ht.position.set(Bt,1.18,.36),xe.add(Ht)}C.goggles=xe;let Ge=new Wt;for(let Bt of[-.18,.18]){let Ht=new be(new Eo(.12,0),Zt(1975360));Ht.position.set(Bt,1.18,.4),Ht.scale.z=.35,Ge.add(Ht)}C.stars=Ge;let ut=new Wt,L=new be(new Ot(.16,8,6),Zt(16748497));L.position.y=1.7,L.scale.y=.45;let U=new be(new Ot(.07,6,6),Zt(16765503));U.position.y=1.72,ut.add(L,U),C.flower=ut;let $=new be(new $i(.28,.07,6,12),Zt(6080767));$.position.y=.78,$.rotation.x=Math.PI/2,C.scarf=$;let Ie=new Wt,Pt=new be(new Ot(.16,8,8),new vt({color:10479871,transparent:!0,opacity:.75,gradientMap:Et}));Pt.position.y=1.72;let Kt=new be(new Ot(.07,6,6),Zt(16747130));Kt.position.y=1.72,Ie.add(Pt,Kt),C.fish=Ie;let yt=new be(new Gn(.16,.22,5),Zt(16765503));yt.position.y=1.72,C.crown=yt;for(let Bt of Object.values(C))Bt.visible=!1,x.add(Bt);return C}let Sn=me.buddy,Vt=[],Nn=new Wt;Nn.userData.buddy=!0,a.add(Nn);let Bo=new Tn(.48,14),tm=I_();for(let x of e.spawns.length?Array.from({length:t.racers}):[]);for(let x=0;x<t.racers;x++){let C=dp(Sn.scene),N=["#7DFFC4","#FFE56A","#FF9FE0","#A78BFF","#7AD8FF","#9AEE6A","#E4C6FF","#FFD09A","#6C8CFF","#4EE0C8","#FF7AB8","#D6F06A","#B4C8FF","#FFC44A","#FFA090","#9AE4FF"][x%16];C.traverse(rt=>{if(!rt.isMesh||!rt.material)return;let nn=Array.isArray(rt.material)?rt.material[0]:rt.material;rt.material=T_(nn,N),rt.frustumCulled=!1,rt.castShadow=!0,rt.receiveShadow=!0});let F=null;C.traverse(rt=>{rt.isBone&&rt.name==="head"&&(F=rt)});let oe=[],xe=[];if(F){let rt=new vt({color:N,gradientMap:Et});for(let nn of[-1,1]){let ei=new be(new en(.018,.018,.26,5),rt);ei.position.set(nn*.1,.18,.05);let mn=new be(new Ot(.04,6,5),new vt({color:16765503,gradientMap:Et}));mn.position.y=.15,ei.add(mn),F.add(ei),oe.push(ei);let Rt=new be(new Ot(.05,6,5),new Qe({color:1840176}));Rt.scale.set(1.1,.08,.45),Rt.position.set(nn*.045,.05,.11),F.add(Rt),xe.push(Rt)}}let Ge=new nc(C),ut={},L=["Idle","Run","Jump","Fall","Land","Dive","Grab","Tumble","Celebrate","Eliminated","Emote"],U=new Set(["Idle","Run","Fall","Grab","Tumble","Celebrate"]);for(let rt of Sn.animations){if(!L.includes(rt.name))continue;let nn=Ge.clipAction(rt);U.has(rt.name)?nn.setLoop(Ku,1/0):(nn.setLoop(Zu,1),nn.clampWhenFinished=!0),nn.play(),nn.setEffectiveWeight(rt.name==="Idle"?1:0),ut[rt.name]=nn}let $=L.some(rt=>ut[rt]),Ie=fs(C),Pt=["classic","heli","goggles","stars","flower","scarf","fish","crown"],Kt=Pt[x%Pt.length];Ie[Kt]&&(Ie[Kt].visible=!0);let yt=new Wt;yt.add(C);let Bt=new be(Bo,new Qe({color:1975360,transparent:!0,opacity:.28,depthWrite:!1}));Bt.rotation.x=-Math.PI/2,yt.add(Bt);let Ht=null;if(x===0){let rt=new be(new Ur(.5,.68,18),new Qe({color:16765503,side:Dt,depthWrite:!1}));rt.rotation.x=-Math.PI/2,rt.position.y=.05,yt.add(rt),Ht=new Ba(new _o({map:tm,depthTest:!1,transparent:!0,opacity:1})),Ht.scale.set(.34,.14,1),Ht.position.set(.22,2.22,0),Ht.center.set(.5,0),yt.add(Ht)}Nn.add(yt),yt.traverse(rt=>{!rt.isMesh||rt.userData.hull||(rt.castShadow=!0,rt.receiveShadow=!0)}),Vt.push({group:yt,model:C,mixer:Ge,actions:ut,hasClips:$,shadow:Bt,tag:Ht,current:"Idle",docked:!1,accessories:Ie,pick:Kt,dusted:!1,starred:!1,mixAcc:0,wasAir:!1,landUntil:0,antennas:oe,lids:xe,splashed:!1})}let Ho=[],Jh=[16765503,16739179,6284208,16748497,6080767];for(let x=0;x<70;x++){let C=new be(new ui(.16,.22),new Qe({color:Jh[x%Jh.length],side:Dt}));C.visible=!1,a.add(C),Ho.push({mesh:C,v:new k,alive:!1})}let Mt={yaw:0,pitch:t.defaultPitch,autoWait:0,portrait:!0,shake:0};function Lc(){let x=i.clientWidth||window.innerWidth,C=i.clientHeight||window.innerHeight;Mt.portrait=C>=x,s.setPixelRatio(r),s.setSize(x,C,!1);let N=Math.max(2,Math.floor((x||2)*r)),F=Math.max(2,Math.floor((C||2)*r));g.setSize(N,F),b.setSize(Math.max(2,N>>1),Math.max(2,F>>1)),c.aspect=x/Math.max(1,C),c.fov=Mt.portrait?t.fovPortrait:t.fovLandscape,c.updateProjectionMatrix()}Lc();let Gs=Array(8).fill(0);function Qh(x,C){let N=_e[x];if(C&&(Gs[x]=1),!!N)for(let F of N){if(!F.mat.color)return;C?(F.mat.color.set(C),F.mat.emissive&&(F.mat.emissive.set(C),F.mat.emissiveIntensity=.35)):(F.mat.color.copy(F.color),F.mat.emissive&&(F.mat.emissive.copy(F.emissive),F.mat.emissiveIntensity=F.intensity))}}function Fn(x,C,N,F,oe){for(let xe of Ho)if(!xe.alive){xe.alive=!0,xe.mesh.visible=!0,xe.mesh.position.set(x,C,N),F&&xe.mesh.material.color.setHex(F),xe.v.set((Math.random()-.5)*(oe?1.2:4),(oe?.6:2)+Math.random()*(oe?1.2:3),(Math.random()-.5)*(oe?1.2:4));break}}let Dc=!1;function nm(x,C,N){if(x.crates&&Vs.length!==x.crates.length){for(let L of Vs)a.remove(L);Vs.length=0;for(let L of x.crates){let U=new be(im,sm);U.position.set(L.x,L.y,L.z),a.add(U),Vs.push(U)}}for(let L=0;L<Vs.length;L++){let U=x.crates[L];Vs[L].position.set(U.x,U.y,U.z)}for(let L of e.chunks){let U=L.mesh;if(!U)continue;if(L.state==="gone"){U.visible=!1,L.dirty=!1;continue}U.visible=!0,U.material=L.state==="cracking"?it:De;let $=L.state==="cracking"?Math.sin(x.time*18+L.jitter*9)*.045:0;if(U.position.y=(L.fallY||0)+$,L.state==="falling"&&L.dirty&&!L.spawned){L.spawned=!0;let Ie=$e.find(Pt=>!Pt.active);if(Ie){Ie.active=!0,Ie.life=1.4,Ie.vy=.6,Ie.mesh.visible=!0;let Pt=(L.z0+L.z1)*.5;Ie.mesh.position.set((Math.random()-.5)*6,L.positions&&L.positions[1]||4,Pt),Ie.mesh.rotation.set(0,Math.random(),0),Fn(Ie.mesh.position.x,Ie.mesh.position.y,Pt,14140580),Fn(Ie.mesh.position.x+.4,Ie.mesh.position.y+.2,Pt,14140580)}}L.dirty=!1}for(let L of $e)L.active&&(L.vy-=12*C,L.mesh.position.y+=L.vy*C,L.mesh.rotation.x+=C,L.life-=C,L.life<=0&&(L.active=!1,L.mesh.visible=!1));for(let L=0;L<x.spinners.length;L++){let U=mt[L].bar;U&&(U.rotation.y=x.spinners[L].angle)}for(let L=0;L<x.platforms.length;L++){let U=x.platforms[L],$=et[L];if($.position.set(U.x,U.y,U.z),U.axis==="spin")$.rotation.y+=C*U.speed;else if(U.axis==="seesaw"){let Ie=U.face||0;$.rotation.set(Math.abs(Ie)>1&&U.tilt||0,0,Math.abs(Ie)>1?0:-(U.tilt||0))}}if(P){for(let L=0;L<x.course.coins.length;L++){let U=x.course.coins[L];if(U.got?q.scale.set(0,0,0):(q.scale.set(1,1,1),q.position.set(U.x,U.y+Math.sin(x.time*3+L)*.15,U.z)),q.rotation.set(Math.PI/2,0,x.time*2.2),q.updateMatrix(),P.setMatrixAt(L,q.matrix),E&&E.setMatrixAt(L,q.matrix),!U.got&&(L+Math.floor((x.time||0)*6))%11===0){let $=U.x-x.player.pos.x,Ie=U.z-x.player.pos.z;$*$+Ie*Ie<220&&Fn(U.x,U.y,U.z,16773544,!0)}}P.instanceMatrix.needsUpdate=!0,E&&(E.instanceMatrix.needsUpdate=!0)}for(let L=0;L<x.geysers.length;L++){let U=x.geysers[L],$=tt[L],Ie=U.hot?3.1:U.warn?.85:.12,Pt=$.userData.jet;Pt.scale.set(U.hot?1.3:1,Ie,U.hot?1.3:1),Pt.position.y=Ie*.5,Pt.material.color.set(U.hot?16742938:16765503),$.userData.ring.material.color.set(U.warn||U.hot?16765503:16742938),$.userData.ring.scale.setScalar(U.warn?1.25:1)}for(let L=0;L<x.pendulums.length;L++){let U=x.pendulums[L],$=Be[L];$.bob.position.set(U.bobX,U.bobY,U.bobZ),$.rope.position.set((U.x+U.bobX)/2,(U.y+U.bobY)/2,U.z),$.rope.scale.y=U.len,$.rope.lookAt(U.bobX,U.bobY,U.bobZ)}for(let L=0;L<x.sweepers.length;L++){let U=x.sweepers[L],$=U.zone==="meadow"||U.zone==="canyon";xt[L].position.set(U.x,U.y+($?.75:0),U.z),$&&(xt[L].rotation.z=x.time*2.4)}for(let L=0;L<x.rollers.length;L++){let U=x.rollers[L];bt[L].position.set(U.x,U.y,U.z),bt[L].rotation.z=U.rot;let $=bt[L].userData.ring;$&&$.scale.setScalar(1+Math.sin(x.time*7+L)*.14);let Ie=!1;for(let yt of x.racers){if(yt.flail<.2)continue;let Bt=yt.pos.x-U.x,Ht=yt.pos.z-U.z;Bt*Bt+Ht*Ht<5&&(Ie=!0)}let Pt=Ie?.78:1,Kt=1+Math.sin(x.time*2.2+L)*.04;bt[L].scale.set(U.radius*(Ie?1.15:Kt),U.radius*Pt,U.radius)}for(let L=0;L<x.hoppers.length;L++){let U=x.hoppers[L];He[L].position.set(U.x,U.y+.55,U.z);let $=He[L].userData.body;$&&($.scale.y=U.hopping?1.18:.62+Math.sin(x.time*3+L)*.04,$.scale.x=U.hopping?.86:1.12);let Ie=He[L].userData.eyes;Ie&&(Ie.scale.y=Math.sin(x.time*2.4+L*2)>.96?.12:1)}for(let L=0;L<x.flyers.length;L++){let U=x.flyers[L];Mn[L].position.set(U.x,U.y,U.z),Mn[L].rotation.y=-U.ang;let $=Mn[L].userData.wing;$&&($.rotation.z=Math.sin(x.time*14+L)*.55),Mn[L].scale.y=1+Math.sin(x.time*14+L)*.08;let Ie=Mn[L].userData.eyes;Ie&&(Ie.scale.y=Math.sin(x.time*3+L)>.97?.15:1)}tn.position.y=x.lavaY;let F=x.shipRound||!x.gate?e.ship:x.gate;F&&(Ut.position.set(F.x||0,(F.y||0)+16,F.z||0),Ut.scale.y=1+Math.sin((x.time||0)*3)*.04),jt.visible=x.phase==="race"||x.phase==="countdown",tn.material.uniforms&&tn.material.uniforms.uTime&&(tn.material.uniforms.uTime.value=x.time||0);for(let L of Fe)L.uniforms.uTime.value=x.time||0;Math.random()<.45&&Fn(tn.position.x+(Math.random()-.5)*8,tn.position.y+.4,tn.position.z+(Math.random()-.5)*8,16747050,!0),x.kind==="survival"&&Math.random()<.5&&Fn(x.player.pos.x+(Math.random()-.5)*6,x.player.pos.y+1.2,x.player.pos.z+2,15202047,!0),x.kind==="crown"&&x.crown&&x.phase==="race"?(mi.visible=!0,mi.position.set(x.crown.x,(x.crown.y||0)+2.2+Math.sin((x.time||0)*3)*.12,x.crown.z),mi.rotation.y=x.time||0):mi.visible=!1;for(let L=0;L<Bs.length;L++){let U=Bs[L],$=(x.time*U.userData.speed+U.userData.phase)%2.4;U.position.y=U.userData.base.y+$,U.position.x=U.userData.base.x+Math.sin(x.time*1.4+U.userData.phase)*.25,U.scale.setScalar(.45+$*.35)}for(let L=0;L<Oi.length;L++)Oi[L].position.y=t.lavaStartY+1.05+Math.sin(x.time*2+L)*.2,Oi[L].rotation.z=Math.sin(x.time+L)*.15,Oi[L].lookAt(c.position);if(ki=(ki+1)%2,G&&ki===0){let L=G.userData.spots||[],U=new at;for(let $=0;$<L.length;$++){let Ie=L[$];U.position.set(Ie.x,Ie.y+1.15,Ie.z),U.rotation.set(.5,x.time*1.6+Ie.spin,.2),U.updateMatrix(),G.setMatrixAt($,U.matrix)}G.instanceMatrix.needsUpdate=!0}if(de&&ki===0){let L=de.userData.spots||[],U=new at;for(let $=0;$<L.length;$++){let Ie=L[$];U.position.set(Ie.x,Ie.y+2.1+Math.sin(x.time*1.6+Ie.spin)*.18,Ie.z),U.scale.setScalar(1),U.updateMatrix(),de.setMatrixAt($,U.matrix)}de.instanceMatrix.needsUpdate=!0}Ve.position.y=x.shipY;let oe=x.phase!=="countdown";if(Se.material.opacity=oe?.16+Math.sin(x.time*4)*.05:.04,In.visible=x.phase==="launch"||x.phase==="results",In.visible){let L=.85+Math.sin(x.launchT*30)*.12;In.scale.set(L,L,L)}Ke.material.opacity=x.phase==="race"?.55+Math.sin(x.time*5)*.25:.2;for(let L=0;L<x.racers.length;L++){let U=x.racers[L],$=Vt[L],Ie=L===0?0:Math.hypot(U.pos.x-x.player.pos.x,U.pos.z-x.player.pos.z);$.mixAcc+=C;let Pt=Ie<16?0:Ie<36?.1:.2;if($.mixAcc>=Pt&&($.mixer.update($.mixAcc),$.mixAcc=0),U.seated){!$.docked&&H[U.seatIndex]&&(H[U.seatIndex].add($.group),$.group.position.set(0,.05,0),$.group.rotation.set(0,Math.PI,0),$.group.scale.setScalar(t.seatBuddyScale),$.shadow.visible=!1,$.docked=!0,Qh(U.seatIndex,U.color)),zc($,"Celebrate",1);continue}let Kt=x.interp||0;$.group.position.set(U.pos.x+U.vel.x*Kt,U.pos.y,U.pos.z+U.vel.z*Kt),$.face==null&&($.face=U.yaw);let yt=U.yaw-$.face;for(;yt>Math.PI;)yt-=Math.PI*2;for(;yt<-Math.PI;)yt+=Math.PI*2;$.face+=yt*Math.min(1,C*10),$.group.rotation.y=$.face;let Bt=Math.min(1,U.squash||0),Ht=1+Bt*.1,rt=1-Bt*.18;if(!U.grounded&&U.vel.y>.5?(rt=1.14,Ht=.9):!U.grounded&&U.vel.y<-2&&(rt=.92,Ht=1.06),$.group.scale.set(Ht,rt,Ht),$.antennas)for(let Rt=0;Rt<$.antennas.length;Rt++)$.antennas[Rt].rotation.z=Math.sin((x.time||0)*3.2+L+Rt)*.35;if($.lids){let Rt=Math.sin((x.time||0)*1.3+L*2.1)>.92;for(let ds of $.lids)ds.scale.y=Rt?1:.05}if(U.squash>.32&&!$.dusted){$.dusted=!0;for(let Rt=0;Rt<3;Rt++)Fn(U.pos.x+(Rt-1)*.2,U.pos.y+.1,U.pos.z,14140580)}U.squash<.05&&($.dusted=!1);let nn=Math.hypot(U.vel.x,U.vel.z);if(U.grounded&&nn>.8&&L===0&&($.stepT=($.stepT||0)-C,$.stepT<=0&&($.stepT=.28,Fn(U.pos.x,U.pos.y+.08,U.pos.z,14140580))),U.flail>.4&&!$.starred){$.starred=!0;for(let Rt=0;Rt<5;Rt++)Fn(U.pos.x,U.pos.y+1.55,U.pos.z,16774856)}if(U.flail<.05&&($.starred=!1),U.sliding>0&&L===0&&Fn(U.pos.x,U.pos.y+.15,U.pos.z),$.tag){let ds=x.phase==="countdown"?1:Math.max(0,$.tag.material.opacity-C*1.6);$.tag.material.opacity=ds,$.tag.visible=ds>.04}L===0&&(Yt.visible=!!(U.diving||U.sliding>0),Yt.visible&&(Yt.position.set(U.pos.x,U.pos.y+.9,U.pos.z),Yt.rotation.y=U.yaw));let ei=$.accessories&&$.accessories.heli&&$.accessories.heli.userData.blade;if(ei&&$.accessories.heli.visible&&(ei.rotation.y+=C*14),$.wasAir&&U.grounded){$.landUntil=(x.time||0)+.2;for(let Rt=0;Rt<4;Rt++)Fn(U.pos.x+(Rt-1.5)*.2,U.pos.y+.1,U.pos.z,15193008,!0);if(U.pos.y<.35)for(let Rt=0;Rt<4;Rt++)Fn(U.pos.x,U.pos.y+.2,U.pos.z,8052735,!0)}U.diving&&L===0&&Math.random()<.35&&Fn(U.pos.x,U.pos.y+.2,U.pos.z,15786696,!0),$.wasAir=!U.grounded;let mn="Idle";U.eliminated?mn="Eliminated":U.seated||U.qualified||U.emote==="cheer"?mn="Celebrate":U.flail>.2?mn="Tumble":U.grabT>0?mn="Grab":U.diving||U.sliding>0?mn="Dive":U.grounded&&(x.time||0)<$.landUntil?mn="Land":!U.grounded&&U.vel.y>.35?mn="Jump":U.grounded?x.phase==="countdown"&&L!==0?mn="Emote":nn>.8&&(mn="Run"):mn="Fall",zc($,mn,nn/6.5),$.shadow&&($.shadow.visible=U.grounded,$.shadow.position.y=.04)}if((x.popConfetti||x.phase==="results"&&x.result==="escaped")&&!Dc){Dc=!0,x.popConfetti=0;let L=Vt[0].group,U=new k;L.getWorldPosition(U);for(let $=0;$<48;$++)Fn(Ve.position.x+(Math.random()-.5)*3,Ve.position.y+2+Math.random()*3,Ve.position.z-2)}for(let L of Ho)L.alive&&(L.v.y-=6*C,L.mesh.position.addScaledVector(L.v,C),L.mesh.rotation.z+=C*4,L.mesh.position.y<e.ship.y-1&&(L.alive=!1,L.mesh.visible=!1));let xe=x.phase==="launch"||x.phase==="results";for(let L of Pn)L.mesh.visible=xe,xe&&(L.mesh.position.set(e.ship.x+L.ox,e.ship.y+L.oy-x.launchT*L.fall*1.6,e.ship.z+L.oz),L.mesh.rotation.x=-.7,L.mesh.rotation.y=x.launchT*L.spin);Se.visible=x.phase!=="launch"&&x.phase!=="results"&&x.seatCine<=0,pe.update(x,C),Sp(x.time||0);for(let L=0;L<gi.length;L++){let U=gi[L];U.position.x=U.userData.ox+Math.sin(x.time*.15+L)*6,U.position.z=U.userData.oz+x.time*(1.2+L*.15)}for(let L=0;L<se.length;L++){let U=se[L],$=U.position.z-x.player.pos.z;U.rotation.z=$>0&&$<9?Math.sin(x.time*26)*.045:0}for(let L=0;L<Xe.length;L++){let U=e.pads[L],$=U&&U.pulse?U.pulse:0,Ie=Xe[L].userData.base||1;Xe[L].scale.set(Ie*(1+$*.28),Ie*(1-$*.42),Ie*(1+$*.28)),U&&U.pulse>0&&(U.pulse=Math.max(0,U.pulse-C*1.5))}for(let L=0;L<Gs.length;L++){if(Gs[L]<=0)continue;Gs[L]=Math.max(0,Gs[L]-C*1.4);let U=_e[L];if(U)for(let $ of U)$.mat.emissive&&($.mat.emissiveIntensity=.35+Gs[L]*1.4)}let Ge=gp(x.zoneId||"meadow");T.material.uniforms.top.value.setHex(Ge.top),T.material.uniforms.mid.value.setHex(Ge.mid),Ge.bot&&T.material.uniforms.bot.value.setHex(Ge.bot),a.fog.color.setHex(Ge.fog),a.fog.near=Ge.near,a.fog.far=Ge.far,y.position.set(x.player.pos.x-10,x.player.pos.y+18,x.player.pos.z+6),y.target.position.set(x.player.pos.x,x.player.pos.y+1,x.player.pos.z),y.target.updateMatrixWorld();for(let L=0;L<x.racers.length;L++){let U=Math.hypot(x.racers[L].pos.x-x.player.pos.x,x.racers[L].pos.z-x.player.pos.z)<14;Vt[L].group.traverse($=>{$.isMesh&&($.castShadow=U)})}am(x,C,N),T.position.copy(c.position),I.position.copy(c.position),z.rotation.y=(x.time||0)*.08;let ut=x.zoneId==="canyon"||x.zoneId==="climb";S.material.opacity=ut?.35+Math.sin((x.time||0)*5)*.2:.08;for(let L=0;L<j.length;L++)j[L].position.x+=Math.sin((x.time||0)*.2+L)*.03;for(let L=0;L<le.length;L++)le[L].rotation.y=Math.sin((x.time||0)*2.2+L)*.45;for(let L=0;L<ee.length;L++)ee[L].position.x+=Math.sin((x.time||0)*.3+L)*.02;for(let L of Nt)L.rotation.z=x.time*.4}function zc(x,C,N){if(!x.hasClips)return;let F=x.actions[C]?C:x.actions.Idle?"Idle":"",oe=F&&x.actions[F];if(!oe||(F==="Run"&&oe.setEffectiveTimeScale(Math.max(.65,Math.min(1.65,(N||1)*1.15))),x.current===F))return;let xe=x.current&&x.actions[x.current];xe&&xe!==oe&&xe.fadeOut(.16),oe.reset().setEffectiveWeight(1).fadeIn(.16).play(),x.current=F}function qr(x,C){let N=ni(e,x,C);return N?N.y:null}let Vs=[],im=new zn(.9,.9,.9),sm=new vt({color:14722140,gradientMap:Et}),Uc=new ic,$h=new k,Yr=new k,Nc=null;function rm(){if(Nc)return Nc;a.updateMatrixWorld(!0);let x=[],C=new k;return a.traverse(N=>{if(!N.isMesh||!N.geometry||!N.matrixWorld)return;let F=N;for(;F;){if(F.userData&&(F.userData.decor||F.userData.buddy||F.userData.skipCam))return;F=F.parent}N.geometry.boundingSphere||N.geometry.computeBoundingSphere(),N.getWorldScale(C),!(N.geometry.boundingSphere.radius*Math.abs(C.x)<1.15)&&x.push(N)}),Nc=x,x}function om(x,C){try{Yr.copy(C).sub(x);let N=Yr.length();if(N<.25)return C;Yr.multiplyScalar(1/N),Uc.set(x,Yr),Uc.far=N;let F=Uc.intersectObjects(rm(),!1),oe=N;for(let xe of F){if(xe.distance>oe-.05)continue;let Ge=!1,ut=xe.object;for(;ut;){if(ut.userData&&(ut.userData.decor||ut.userData.buddy||ut.userData.skipCam)){Ge=!0;break}ut=ut.parent}if(Ge)continue;let L=xe.object.material;L&&!Array.isArray(L)&&L.transparent&&L.opacity<.4||(oe=xe.distance)}return oe>N-.2?C:($h.copy(x).addScaledVector(Yr,Math.max(.9,oe-.45)),$h.clone())}catch(N){return typeof window<"u"&&(window.__sbCamErr=String(N&&N.stack||N)),C}}function am(x,C,N){let F=x.player;if(N&&N.overview){let ht=N.overview;c.position.set(ht.x,ht.y,ht.z),c.lookAt(ht.lx,ht.ly,ht.lz);return}let oe=!!(N&&(N.looking||Math.abs(N.lookDx)+Math.abs(N.lookDy)>0)),xe=Mt.portrait?t.fovPortrait:t.fovLandscape,Ge=x.player&&(x.player.diving||x.player.boost>0)?7:0,ut=xe+Ge;if(Math.abs(c.fov-ut)>.15&&(c.fov+=(ut-c.fov)*Math.min(1,C*7),c.updateProjectionMatrix()),x.phase==="countdown"){let ht=t.countdownBeats+t.goHold,Gt=Math.max(0,Math.min(1,(x.countClock||0)/ht)),Ln=Gt*Gt*(3-2*Gt),ti=x.finishZ?Math.min(40,Math.max(10,(x.finishZ-F.pos.z)*.35)):28;c.position.set(F.pos.x+12-Ln*8,F.pos.y+16-Ln*8,F.pos.z-18+Ln*10),c.lookAt(F.pos.x,F.pos.y+1.2,F.pos.z+8+ti*Ln);return}if(N&&N.intro>0){let ht=1-Math.max(0,Math.min(1,N.intro/3.3)),Gt=ht*ht*(3-2*ht),Ln=Mt.portrait?t.camDistPortrait:t.camDist,ti=Ln*Math.cos(t.defaultPitch),ps=Ln*Math.sin(t.defaultPitch),ms=(1-Gt)*(F.pos.x+8)+Gt*(F.pos.x+Math.sin(Mt.yaw)*ti),Zr=(1-Gt)*(F.pos.y+22)+Gt*(F.pos.y+ps+.4),Xs=(1-Gt)*(F.pos.z-26)+Gt*(F.pos.z-ti);c.position.set(ms,Zr,Xs),c.lookAt(F.pos.x,F.pos.y+1,F.pos.z+18*(1-Gt));return}if(x.seatCine>0&&x.player.seated){let ht=new k;Vt[0].group.getWorldPosition(ht),c.position.x=Wn(c.position.x,Ve.position.x+6.5,4.2,C),c.position.y=Wn(c.position.y,Ve.position.y+4.2,4.2,C),c.position.z=Wn(c.position.z,Ve.position.z-22,4.2,C),c.lookAt(ht.x,ht.y+.45,ht.z);return}if(x.phase==="results"||x.phase==="launch"){let ht,Gt,Ln,ti,ps,ms;if(x.result==="escaped")ht=Ve.position.x+12,Gt=Math.max(Ve.position.y+7,(qr(Ve.position.x,Ve.position.z)||Ve.position.y)+4),Ln=Ve.position.z+14,ti=Ve.position.x,ps=Ve.position.y+2.2,ms=Ve.position.z;else{ht=F.pos.x-6,Gt=F.pos.y+4.2,Ln=F.pos.z-8;let Zr=Math.max(0,Ve.position.z-F.pos.z);ti=Ve.position.x,ps=Ve.position.y+3+Math.min(8,Zr*.02),ms=Ve.position.z-6}c.position.x=Wn(c.position.x,ht,3.2,C),c.position.y=Wn(c.position.y,Gt,3.2,C),c.position.z=Wn(c.position.z,Ln,3.2,C),c.lookAt(ti,ps,ms);return}if(F.seated&&x.phase==="race"){let ht=null;for(let Xs of x.racers)Xs.seated||Xs.eliminated||(!ht||Xs.pos.z>ht.pos.z)&&(ht=Xs);let Gt=ht||F,Ln=(x.time||0)*.16,ti=qr(Gt.pos.x,Gt.pos.z),ps=Math.max((ti??Gt.pos.y)+5,Gt.pos.y+4.8),ms=Gt.pos.x+Math.sin(Ln)*12,Zr=Gt.pos.z-Math.cos(Ln)*12;c.position.x=Wn(c.position.x,ms,4.5,C),c.position.y=Wn(c.position.y,ps,4.5,C),c.position.z=Wn(c.position.z,Zr,4.5,C),c.lookAt(Gt.pos.x,Gt.pos.y+1.1,Gt.pos.z);return}if(oe){let ht=N.mouse?t.mouseSens:t.lookSens;Mt.yaw+=N.lookDx*ht,Mt.pitch=Math.max(t.minPitch,Math.min(t.maxPitch,Mt.pitch+N.lookDy*ht)),Mt.autoWait=t.autoFollowDelay}else Mt.autoWait>0?Mt.autoWait-=C:(Math.hypot(F.vel.x,F.vel.z)>1.15&&(Mt.yaw=C_(Mt.yaw,Math.atan2(F.vel.x,F.vel.z),t.autoYaw,C)),Mt.pitch=Wn(Mt.pitch,t.defaultPitch,t.autoPitch,C));let L=N&&N.zoom?N.zoom:1,U=Math.max(t.camNear||5,Math.min(t.camFar||12,(Mt.portrait?t.camDistPortrait:t.camDist)*L)),$=(Mt.portrait?t.camHeight||3.7:t.camHeightLand||3.9)*(U/(Mt.portrait?t.camDistPortrait:t.camDist)),Ie=U,Pt=$;if(oe||Math.abs(Mt.pitch-t.defaultPitch)>.08){let ht=Math.hypot(U,$);Ie=Math.max(t.camNear||5,ht*Math.cos(Mt.pitch)),Pt=Math.max(2.8,ht*Math.sin(Mt.pitch))}let Kt=F.pos.x+Math.sin(Mt.yaw)*Ie,yt=F.pos.y+Pt,Bt=F.pos.z-Math.cos(Mt.yaw)*Ie,Ht=qr(Kt,Bt);Ht!=null&&yt<Ht+1.2&&(yt=Ht+1.6);let rt=F.pos.x,nn=F.pos.y+1.2,ei=F.pos.z,mn=Kt-rt,Rt=yt-nn,ds=Bt-ei,ef=Math.hypot(mn,Rt,ds)||1;if(ef<(t.camNear||5)){let ht=(t.camNear||5)/ef;Kt=rt+mn*ht,yt=nn+Rt*ht,Bt=ei+ds*ht}let tf=x.phase==="countdown"?1:0;yt+=tf*2.2,Bt-=tf*2.4;let nf=qr(F.pos.x,F.pos.z),jr=nf??F.pos.y;F.vel.y<-1.5&&F.pos.y<jr-.6?(Kt=F.pos.x+Math.sin(Mt.yaw)*7,Bt=F.pos.z-Math.cos(Mt.yaw)*7,yt=Math.max(Mt.fallCamY||jr+4,Kr(-1e9,jr)),Mt.fallCamY=yt):(Mt.fallCamY=null,yt=Kr(yt,jr));let Fc=om(new k(rt,nn,ei),new k(Kt,yt,Bt));Kt=Fc.x,yt=Kr(Fc.y,jr),Bt=Fc.z;let kc=(x.shake||0)*.18;kc>.01&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(Kt+=(Math.random()-.5)*kc,yt+=(Math.random()-.5)*kc*.5);let Oc=5.5;c.position.x=Wn(c.position.x,Kt,Oc,C),c.position.y=Wn(c.position.y,yt,Oc,C),c.position.z=Wn(c.position.z,Bt,Oc,C);let sf=qr(F.pos.x,F.pos.z);c.position.y=Kr(c.position.y,sf??F.pos.y),c.lookAt(F.pos.x,F.pos.y+1.15,F.pos.z+Math.cos(Mt.yaw)*1.4),cm(Math.hypot(c.position.x-F.pos.x,c.position.y-(F.pos.y+1.1),c.position.z-F.pos.z))}function cm(x){let C=Vt[0];if(!C)return;let N=x>=3.4?1:Math.max(.15,(x-2.2)/1.2);C.model.traverse(F=>{if(!F.isMesh||!F.material||F.material.name!=="BuddyHue")return;let oe=Array.isArray(F.material)?F.material:[F.material];for(let xe of oe)xe.opacity=N,xe.transparent=N<.98,xe.depthWrite=N>.45})}function lm(){Dc=!1;for(let x of e.chunks)x.spawned=!1,x.dirty=!0,x.fallY=0,x.mesh&&(x.mesh.visible=!x.gap,x.mesh.position.y=0,x.mesh.material=De);for(let x of $e)x.active=!1,x.mesh.visible=!1;for(let x of Ho)x.alive=!1,x.mesh.visible=!1;for(let x=0;x<Vt.length;x++){let C=Vt[x];C.docked&&(Nn.add(C.group),C.group.scale.setScalar(1),C.group.rotation.set(0,0,0),C.shadow.visible=!0,C.docked=!1)}for(let x=0;x<_e.length;x++)Qh(x,null);Ve.position.y=e.ship.y,In.visible=!1,Mt.yaw=0,Mt.pitch=t.defaultPitch}let Ws=new be(new en(1.35,1.5,.24,24),new vt({color:16765503,gradientMap:Et}));Ws.position.y=.02,Ws.visible=!1,a.add(Ws);function um(x){I.visible=!1,Ws.visible=!0,Ws.position.set(80,12,-40);for(let N=1;N<Vt.length;N++)Vt[N].group.visible=!1;let C=Vt[0];if(C){if(C.group.visible=!0,C.tag&&(C.tag.visible=!1),C.group.position.set(80,12.15,-40),C.group.rotation.x=0,C.group.rotation.z=0,C.group.scale.set(1,1,1),C.group.rotation.y+=x*.7,C.mixer.update(x),zc(C,"Idle",1),C.antennas)for(let N=0;N<C.antennas.length;N++)C.antennas[N].rotation.z=Math.sin(performance.now()*.003+N)*.3;if(C.lids){let N=Math.sin(performance.now()*.002)>.97?1:.08;for(let F of C.lids)F.scale.y=N}c.fov=t.fovPortrait,c.updateProjectionMatrix(),c.position.set(81.6,13.05,-36.2),c.lookAt(80,12.15,-40)}}function hm(){I.visible=!0,Ws.visible=!1;for(let x of Vt)x.group.visible=!0}function fm(){if(!p){s.setRenderTarget(null),s.render(a,c);return}s.setRenderTarget(g),s.render(a,c);let x=c.layers.mask;c.layers.set(1);let C=s.shadowMap.enabled;s.shadowMap.enabled=!1,s.setRenderTarget(b),s.setClearColor(0,1),s.clear(!0,!0,!0),s.render(a,c),s.shadowMap.enabled=C,c.layers.mask=x,s.setRenderTarget(null),s.render(m,d)}a.traverse(x=>{x.isMesh&&x.userData.bloom&&x.layers.enable(1)});for(let x of Fe)x.uniforms.uTime.value=0;c.position.set(0,8,-10),c.lookAt(0,1,4),s.render(a,c);function dm(x,C){let N=Vt[0];if(N){N.model.traverse(F=>{if(!F.isMesh||!F.material)return;let oe=Array.isArray(F.material)?F.material:[F.material];for(let xe of oe)xe&&(xe.userData&&xe.userData.shader&&xe.userData.shader.uniforms.uTint&&xe.userData.shader.uniforms.uTint.value.set(x),xe.name==="Buddy_Mint"&&xe.color&&xe.color.set(x))});for(let F of Object.keys(N.accessories||{}))N.accessories[F].visible=F===C}}return{resize:Lc,update:nm,reset:lm,render:fm,showBuddy:um,hideBuddy:hm,view(){let x=Vt[0]&&Vt[0].group.position;return x?{dist:Math.hypot(c.position.x-x.x,c.position.y-x.y,c.position.z-x.z),back:Math.hypot(c.position.x-x.x,c.position.z-x.z),fov:c.fov}:null},applyLook:dm,setTheme(x){let C=[{sky:13103359,ground:8244322,sun:16774084},{sky:16761505,ground:12868146,sun:16769200},{sky:12048127,ground:6987992,sun:16054271}],N=C[(Math.max(1,x)-1)%C.length];v.color.set(N.sky),v.groundColor.set(N.ground),y.color.set(N.sun)},setPost(x){p=!!x&&!f},setDpr(x){r=x,Lc()},get yaw(){return Mt.yaw},get canvas(){return i}}}function I_(){let i=document.createElement("canvas");i.width=128,i.height=64;let e=i.getContext("2d");e.fillStyle="#FFF6E5",P_(e,4,8,120,48,16),e.fill(),e.fillStyle="#1E2440",e.font="700 32px Fredoka, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("YOU",64,34);let t=new zr(i);return t.colorSpace=Xt,t}function P_(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}var Lp={ui_tap:"assets/audio/ui_tap.mp3",ui_confirm:"assets/audio/ui_confirm.mp3",jump:"assets/audio/sfx_jump.mp3",land:"assets/audio/sfx_land.mp3",bump:"assets/audio/sfx_bump_boing.mp3",tick:"assets/audio/sfx_countdown_tick.mp3",go:"assets/audio/sfx_countdown_go.mp3",crack:"assets/audio/sfx_ground_crack.mp3",seat:"assets/audio/sfx_seat_filled.mp3",last:"assets/audio/sfx_last_seat_alert.mp3",launch:"assets/audio/sfx_ship_launch.mp3",escaped:"assets/audio/jingle_escaped.mp3",missed:"assets/audio/jingle_missed.mp3",bed:"assets/audio/amb_planet_bed_loop.mp3",rumble:"assets/audio/amb_collapse_rumble_loop.mp3"};function Dp(){let i=window.AudioContext||window.webkitAudioContext,e=i?new i({latencyHint:"interactive"}):null,t={},n={},s,r,o,a,c,l=!1,u=0,h=!1;e&&(s=e.createGain(),s.gain.value=1,s.connect(e.destination),r=e.createGain(),r.gain.value=0,r.connect(s),o=e.createGain(),o.gain.value=0,o.connect(s));async function f(R){if(!e)return;let T=Object.keys(Lp),I=0;await Promise.all(T.map(async w=>{let S=await(await fetch(Lp[w])).arrayBuffer();t[w]=await e.decodeAudioData(S.slice(0)),I++,R&&R(I/T.length)})),l&&b(u)}function p(){if(!e)return;e.state==="suspended"&&e.resume();let R=e.createBuffer(1,1,22050),T=e.createBufferSource();T.buffer=R,T.connect(e.destination),T.start(0),l&&b(u)}function g(){let w=e.createBuffer(1,88200,44100),M=w.getChannelData(0),S=[0,.5,1,1.5],z=[55,55,73,65];for(let W=0;W<88200;W++){let X=W/44100,j=Math.floor(X*2),J=0;for(let le of S){let Q=X-le;Q>=0&&Q<.12&&(J+=Math.sin(Q*180)*Math.exp(-Q*28)*.7)}let ee=z[j%z.length];if(J+=Math.sin(X*ee*Math.PI*2)*.18*(.6+.4*Math.sin(X*8)),j%2===0){let le=X*8%1;J+=(Math.random()*2-1)*Math.exp(-le*40)*.08}M[W]=Math.max(-1,Math.min(1,J))}return w}function b(R){return e?(l=!0,u=R,e.state==="suspended"&&e.resume(),a||(a=e.createBufferSource(),a.buffer=g(),a.loop=!0,a.connect(r),a.start(0),r.gain.setTargetAtTime(R*1.35,e.currentTime,.4),t.rumble&&!c&&(c=e.createBufferSource(),c.buffer=t.rumble,c.loop=!0,c.connect(o),c.start(0))),!0):!1}function m(R){!o||!e||o.gain.setTargetAtTime(Math.max(0,Math.min(.5,R)),e.currentTime,.2)}function d(R){if(!e||!s)return;(R==="win"?[523,659,784,1046]:[440,349,262]).forEach((I,w)=>{let M=e.createOscillator(),S=e.createGain();M.type=R==="win"?"triangle":"sawtooth",M.frequency.value=I;let z=e.currentTime+w*.09;S.gain.setValueAtTime(1e-4,z),S.gain.exponentialRampToValueAtTime(R==="win"?.07:.05,z+.03),S.gain.exponentialRampToValueAtTime(1e-4,z+.32),M.connect(S),S.connect(s),M.start(z),M.stop(z+.34)})}function _(R){h=!!R,s&&s.gain.setTargetAtTime(h?0:1,e.currentTime,.05)}function v(R){if(!a)return;let T={meadow:1,canyon:.9,sky:1.08,ice:.84,climb:1.02,ship:1.12}[R]||1;a.playbackRate.value=T}function y(R,T=.5,I=.07){if(r&&e&&!h&&(r.gain.cancelScheduledValues(e.currentTime),r.gain.setTargetAtTime(u*.28,e.currentTime,.02),r.gain.setTargetAtTime(u*1.35,e.currentTime+.35,.18)),!e||!t[R]||h)return;let w=e.currentTime;if(n[R]&&w-n[R]<I)return;n[R]=w;let M=e.createBufferSource(),S=e.createGain();S.gain.value=T,M.buffer=t[R],M.connect(S),S.connect(s),M.start(0)}return{load:f,unlock:p,startBeds:b,setRumble:m,setMuted:_,setZone:v,play:y,flourish:d,get ctx(){return e},get muted(){return h},get playing(){return!!a}}}function zp(i){let e=document.getElementById("stick"),t=document.getElementById("knob"),n=new Set,s=new Map,r=0,o=0,a=!1,c=!1,l=!1,u=!1,h=0,f=0,p=!1,g=54,b="space-buddies-zoom",m=1;try{m=Math.min(12/8.6,Math.max(5/8.6,Number(localStorage.getItem(b))||1))}catch{}let d=0;function _(w){let M=w.target;if(M.closest&&M.closest("#jump"))return"jump";if(M.closest&&M.closest("#dive"))return"dive";if(M.closest&&M.closest("#grab"))return"grab";if(M.closest&&M.closest("#pause, #mute")||M.closest&&M.closest("button, a"))return"ui";let S=window.innerWidth||1;return w.pointerType==="mouse"?"look":w.clientX<S*.46?"move":"look"}function v(w){if(w.target.closest&&w.target.closest("#title, #result"))return;let M=_(w);if(M!=="ui"){w.preventDefault();try{i.setPointerCapture?.(w.pointerId)}catch{}s.set(w.pointerId,{kind:M,x:w.clientX,y:w.clientY,ox:w.clientX,oy:w.clientY}),M==="jump"&&(a=!0,u=!0),M==="dive"&&(c=!0),M==="grab"&&(l=!0),M==="move"&&(e.style.left=w.clientX+"px",e.style.top=w.clientY+"px",e.style.bottom="auto",e.classList.add("float"),T(w.clientX,w.clientY,w.clientX,w.clientY))}}function y(w){let M=s.get(w.pointerId);if(!M)return;w.preventDefault(),M.kind==="look"&&(r+=w.clientX-M.x,o+=w.clientY-M.y,p=!0),M.kind==="move"&&T(M.ox,M.oy,w.clientX,w.clientY),M.x=w.clientX,M.y=w.clientY;let S=[...s.values()];if(S.length>=2){let z=Math.hypot(S[0].x-S[1].x,S[0].y-S[1].y);if(d>8){m=Math.min(12/8.6,Math.max(5/8.6,m*(z/d)));try{localStorage.setItem(b,String(m))}catch{}}d=z,r=0,o=0}else d=0}function R(w){let M=s.get(w.pointerId);s.delete(w.pointerId),M&&M.kind==="move"&&([...s.values()].some(z=>z.kind==="move")||(h=0,f=0,t.style.setProperty("--kx","0px"),t.style.setProperty("--ky","0px"),e.classList.remove("float"))),M&&M.kind==="look"&&![...s.values()].some(S=>S.kind==="look")&&(p=!1),M&&M.kind==="jump"&&![...s.values()].some(S=>S.kind==="jump")&&(u=!1)}function T(w,M,S,z){let W=S-w,X=z-M,j=Math.hypot(W,X)||1,J=Math.min(j,g);W=W/j*J,X=X/j*J,h=W/g,f=-X/g,t.style.setProperty("--kx",W+"px"),t.style.setProperty("--ky",X+"px")}i.addEventListener("pointerdown",v),i.addEventListener("pointermove",y),i.addEventListener("pointerup",R),i.addEventListener("pointercancel",R),window.addEventListener("keydown",w=>{({KeyW:1,KeyA:1,KeyS:1,KeyD:1,ArrowUp:1,ArrowDown:1,ArrowLeft:1,ArrowRight:1,Space:1,ShiftLeft:1,ShiftRight:1,KeyE:1,Escape:1})[w.code]&&w.preventDefault(),!w.repeat&&(n.add(w.code),w.code==="Space"&&(a=!0,u=!0),(w.code==="ShiftLeft"||w.code==="ShiftRight")&&(c=!0),w.code==="KeyE"&&(l=!0))}),window.addEventListener("keyup",w=>{n.delete(w.code),w.code==="Space"&&(u=!1)}),window.addEventListener("blur",()=>n.clear());function I(){let w=0,M=0;(n.has("KeyA")||n.has("ArrowLeft"))&&(w-=1),(n.has("KeyD")||n.has("ArrowRight"))&&(w+=1),(n.has("KeyW")||n.has("ArrowUp"))&&(M+=1),(n.has("KeyS")||n.has("ArrowDown"))&&(M-=1);let S=h+w,z=f+M,W=Math.hypot(S,z);W>1&&(S/=W,z/=W);let X=(s.size&&[...s.values()].some(J=>J.kind==="look"&&s.values()),1),j={stickX:S,stickY:z,lookDx:r*(n.size?1:X),lookDy:o,looking:p,mouse:[...s.values()].some(J=>J.kind==="look"),jump:a,holdJump:u||n.has("Space"),dive:c,grab:l,pause:n.has("Escape"),zoom:m};return r=0,o=0,a=!1,c=!1,l=!1,j}return{read:I}}function Up(i,e,t){let n=-Math.sin(i),s=Math.cos(i),r=-Math.cos(i),o=-Math.sin(i);return{x:r*e+n*t,z:o*e+s*t}}var Vr=new URLSearchParams(location.search),ln=rf({quick:Vr.has("quick"),auto:Vr.has("auto"),seed:Number(Vr.get("seed"))||Date.now()%1e5}),L_=document.getElementById("app"),D_=document.getElementById("view"),No=document.getElementById("title"),Us=document.getElementById("play"),Mc=document.getElementById("lobby"),z_=document.getElementById("start"),Np=document.getElementById("colors"),Fp=document.getElementById("gear"),Sc=document.getElementById("tutor"),kp=document.getElementById("place"),GM=document.getElementById("coins"),Tc=document.getElementById("hud"),us=document.getElementById("controls"),Xp=document.getElementById("countdown"),Hr=document.getElementById("count-num"),U_=document.getElementById("count-label"),N_=document.getElementById("timer"),kh=document.getElementById("timer-num"),Po=document.getElementById("coin-num"),F_=document.getElementById("progress"),Ec=document.getElementById("seats"),Op=document.getElementById("seats-label"),gc=document.getElementById("last-banner"),Wh=document.getElementById("zone"),Xh=document.getElementById("toast"),pi=document.getElementById("result"),k_=document.getElementById("result-kicker"),fc=document.getElementById("result-title"),dc=document.getElementById("result-sub"),O_=document.getElementById("result-time"),xc=document.getElementById("again"),B_=document.getElementById("menu"),qp=document.getElementById("next-round"),Yp=document.getElementById("next-planet"),qh=document.getElementById("pause"),zo=document.getElementById("mute"),Ac=document.getElementById("pause-menu"),Oh=document.getElementById("round-name"),H_=document.getElementById("round-kicker"),G_=document.getElementById("round-title"),V_=document.getElementById("round-sub"),Yh=document.getElementById("planet"),W_=document.getElementById("planet-sub"),Bh=document.getElementById("fade"),jp="space-buddies-career",ls={planets:0,coins:0,best:""};try{ls=Object.assign(ls,JSON.parse(localStorage.getItem(jp)||"{}"))}catch{}function X_(){try{localStorage.setItem(jp,JSON.stringify(ls))}catch{}}var $n=1,Xr=0,Wr=null,Ns=!1,Bp=!1,Hh=0,Rn=i=>i*Bc(ln.quick),pc=(i,e,t)=>({x:0,z:Rn(i),rx:t||5,rz:1.5,y:e}),Hp=[[{name:"ROUND 1",sub:"12 QUALIFY",qualify:12,startZ:Rn(22),finishZ:Rn(158),gate:pc(158,.25,5)},{name:"ROUND 2",sub:"8 QUALIFY",qualify:8,startZ:Rn(168),finishZ:Rn(236),gate:pc(236,5.2,5)},{name:"FINAL",sub:"8 SEATS ON THE SHIP",qualify:8,startZ:Rn(22),ship:!0}],[{name:"SKY HEAT",sub:"12 QUALIFY",qualify:12,startZ:Rn(176),finishZ:Rn(258),gate:pc(258,3.3,5.5)},{name:"THE CLIMB",sub:"8 QUALIFY",qualify:8,startZ:Rn(300),finishZ:Rn(356),gate:pc(356,8,4.5)},{name:"FINAL",sub:"8 SEATS ON THE SHIP",qualify:8,startZ:Rn(250),ship:!0}],[{name:"SURVIVAL",sub:"LAST 8 STANDING",qualify:8,startZ:Rn(22),kind:"survival"},{name:"CROWN",sub:"HOLD THE CROWN",qualify:8,startZ:Rn(176),kind:"crown",crown:{x:0,z:Rn(210),y:5.6,r:3.4}},{name:"FINAL",sub:"8 SEATS ON THE SHIP",qualify:8,startZ:Rn(22),ship:!0}]];function jh(){return Hp[($n-1)%Hp.length][Xr]}var q_=document.getElementById("danger"),Ye=Dp(),Y_=Vr.get("debug")==="1";function zs(i){let e=i&&i.stack||i&&i.message||String(i);if(console.error(i),!Y_)return;let t=document.getElementById("debug-error");t&&(t.hidden=!1,t.textContent=String(e).slice(0,700))}window.addEventListener("error",i=>zs(i.error||i.message));window.addEventListener("unhandledrejection",i=>zs(i.reason));window.__sbAudio=()=>({state:Ye.ctx&&Ye.ctx.state,bed:Ye.playing});var j_=zp(L_);var Uo,ce,ct,Rc=!1,Fs=!1,Cc=!1,bc=0,Do=0,yc=0,cs={x:0,z:0},Gp=!1,Zp=["classic","heli","goggles","stars","flower","scarf","fish","crown"],Z_=["Classic","Sunny","Goggles","Stars","Flower","Scarf","Fish","Crown"],hi=qs[0],Fi="classic",Kp="space-buddies-look";try{let i=JSON.parse(localStorage.getItem(Kp)||"{}");i.color&&(hi=i.color),i.gear&&Zp.includes(i.gear)&&(Fi=i.gear)}catch{}function Zh(){try{localStorage.setItem(Kp,JSON.stringify({color:hi,gear:Fi}))}catch{}}var vc=0,wc=0,Gh=0;var _c=0,mc=1/60,Lo=0,Vh=0,K_=["mint","sun","coral","sky","grape","cream","bubble","lava"];for(let i=0;i<8;i++){let e=document.createElement("img");e.className="seat",e.alt="",e.src="ui/svg/seat_empty.svg",Ec.appendChild(e)}function J_(){return Uo=cf(ln),ce=Gc(Uo,ln,ln.seed),ln.auto&&(ce.player.useAI=!0),Pp(D_,Uo,ln,()=>{})}var Q_=J_().then(i=>{ct=i,ct.resize()}),$_=Ye.load();Promise.all([Q_,$_]).then(()=>{Rc=!0,Us.textContent="TAP TO PLAY",Us.disabled=!1,Cc&&Ic()}).catch(i=>{console.error(i),Us.textContent="COULD NOT LOAD"});function Ic(){if(!Fs){if(!Rc){Cc=!0,Us.textContent="LOADING";return}Fs=!0,ct.hideBuddy&&ct.hideBuddy(),Ye.unlock(),Ye.startBeds(ln.bedGain),Ye.play("ui_confirm",.55,0),No.classList.add("hide"),Mc.hidden=!0,ce.player.color=hi,Zh(),ct.applyLook&&ct.applyLook(hi,Fi),Do=ln.auto?.2:3.3,Tc.hidden=!1,us.hidden=!0,Sc.hidden=!0,window.__sb={race:ce,cfg:ln,get fps(){return _c},view:()=>ct.view?ct.view():null,campaign:()=>({planet:$n,roundIndex:Xr,plan:jh()})},window.__sbAudio=()=>({state:Ye.ctx&&Ye.ctx.state,bed:Ye.playing}),Pc(),qh.hidden=!1,zo.hidden=!1}}function Pc(){let i=jh();ce.shipRound=!!i.ship,ce.kind=i.kind||(i.ship?"ship":"gate"),ce.crown=i.crown?{...i.crown}:null,ce.finishZ=i.ship||i.kind==="survival"||i.kind==="crown"?null:i.finishZ,ce.gate=i.ship||i.kind==="survival"||i.kind==="crown"?null:i.gate||null,ce.qualifyN=i.ship?0:i.qualify,ce.qualCount=0,ce.phase="countdown",ce.countClock=0,ce.countCue=-1,ce.result=null,ce.time=0;let e=ni(Uo,0,i.startZ),t=e?e.y:0;ce.racers.forEach((s,r)=>{let o=!Wr||Wr.has(s.id);if(s.qualified=!1,s.seated=!1,s.seatIndex=-1,!o){s.eliminated=!0;return}s.eliminated=!1,s.pos.x=(r%5-2)*1.7,s.pos.z=i.startZ+Math.floor(r/5)*1.2,s.pos.y=t,s.vel.x=0,s.vel.y=0,s.vel.z=0,s.lastSafe={x:s.pos.x,y:t,z:s.pos.z},s.wp=0}),ce.seatsFilled=0,ce.seats&&(ce.seats=ce.seats.map(()=>null)),ct.setTheme&&ct.setTheme($n),Ye.setZone&&Ye.setZone(i.ship?"ship":i.startZ>250?"ice":i.startZ>150?"sky":i.startZ>80?"canyon":"meadow"),em($n),H_.textContent="PLANET "+$n,G_.textContent=i.name,V_.textContent=i.sub,Oh.hidden=!1;let n=Oh.querySelector(".sb-banner");window.SBUI&&n&&SBUI.slam(n),setTimeout(()=>{Oh.hidden=!0},1400)}function Kh(){Ye.unlock(),Ye.startBeds(ln.bedGain)}function eM(){if(Kh(),!Rc){Cc=!0,Us.textContent="LOADING";return}if(ln.auto){Ic();return}No.classList.add("hide"),Mc.hidden=!1,Mc.classList.add("ui-screen"),ct.applyLook&&ct.applyLook(hi,Fi)}No.addEventListener("pointerdown",Kh);No.addEventListener("touchstart",Kh,{passive:!0});Us.addEventListener("pointerdown",i=>{i.preventDefault(),eM()});Us.addEventListener("click",i=>{i.preventDefault(),Ye.unlock(),Cc&&Rc&&Ic()});document.getElementById("aboard-skip").addEventListener("pointerdown",i=>{i.preventDefault(),ce&&ce.player.seated&&ce.phase==="race"&&(ce.forceLaunch=!0)});z_.addEventListener("pointerdown",i=>{i.preventDefault(),Ye.unlock(),Ic()});qs.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="swatch"+(i===hi?" on":""),t.style.background=i,t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),hi=i,Zh(),Np.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),ct&&ct.applyLook&&ct.applyLook(hi,Fi)}),Np.appendChild(t)});Zp.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="gear"+(i===Fi?" on":""),t.textContent=Z_[e],t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),Fi=i,Zh(),Fp.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),ct&&ct.applyLook&&ct.applyLook(hi,Fi)}),Fp.appendChild(t)});function Jp(){!Fs||!ce||ce.phase==="results"||(Ns=!Ns,Ac.hidden=!Ns)}qh.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),Jp()});zo.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation();let e=!Ye.muted;Ye.setMuted(e);let t=zo.querySelector("img");t&&(t.src=e?"ui/svg/icon_unmute.svg":"ui/svg/icon_mute.svg"),zo.setAttribute("aria-label",e?"Unmute":"Mute")});document.getElementById("resume").addEventListener("pointerdown",i=>{i.preventDefault(),Ns=!1,Ac.hidden=!0});document.getElementById("restart").addEventListener("pointerdown",i=>{i.preventDefault(),Ns=!1,Ac.hidden=!0,Wr=null,Xr=0,$p(),Pc()});document.getElementById("pause-menu-btn").addEventListener("pointerdown",i=>{i.preventDefault(),Qp()});B_.addEventListener("pointerdown",i=>{i.preventDefault(),Qp()});qp.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),Wr=new Set(ce.racers.filter(t=>t.qualified).map(t=>t.id)),Xr+=1,pi.hidden=!0,Gr=!1,qo(ce,ce.seed+11>>>0),ln.auto&&(ce.player.useAI=!0),Pc(),us.hidden=!1});Yp.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),pi.hidden=!0,W_.textContent="Planet "+($n+1)+". The sky changes. The ship is waiting.",em($n+1),Yh.hidden=!1});document.getElementById("land").addEventListener("pointerdown",i=>{i.preventDefault(),$n+=1,Xr=0,Wr=null,Yh.hidden=!0,Gr=!1,qo(ce,ce.seed+21>>>0),ln.auto&&(ce.player.useAI=!0),Pc(),us.hidden=!1});function Qp(){Ns=!1,Ac.hidden=!0,Yh.hidden=!0,Fs=!1,pi.hidden=!0,pi.classList.remove("show"),No.classList.remove("hide"),Tc.hidden=!0,us.hidden=!0,qh.hidden=!0,zo.hidden=!0,Xr=0,Wr=null}xc.addEventListener("pointerdown",i=>{i.preventDefault(),Ye.unlock(),Ye.play("ui_confirm",.5,0),$p()});function $p(){let i=ce.seed+1+Math.floor(Math.random()*50)>>>0;qo(ce,i),cs.x=0,cs.z=0,ln.auto&&(ce.player.useAI=!0),ce.player.color=hi,ct.applyLook&&ct.applyLook(hi,Fi),ct.reset(),pi.hidden=!0,pi.classList.remove("show"),Xp.hidden=!1,us.hidden=!1,gc.hidden=!0,Tc.classList.remove("last")}function Vp(i){let e=Math.max(0,Math.ceil(i)),t=Math.floor(e/60),n=e%60;return t+":"+String(n).padStart(2,"0")}function tM(i){let e=i.racers.slice().sort((t,n)=>{let s=r=>(r.seated?4e3:0)+(r.qualified?2e3:0)+(r.eliminated?-1e3:0)+r.pos.z;return s(n)-s(t)});for(let t=0;t<3;t++){let n=document.getElementById("pod-"+(t+1)),s=e[t];!n||!s||(n.textContent=s.isPlayer?"YOU":"BUDDY",n.style.color="#1e2440")}}document.getElementById("app").addEventListener("pointerdown",i=>{let e=i.target.closest("button");!e||e.disabled||Ye.play("ui_tap",.3,.01)},!0);window.SBUI&&SBUI.bindPress(document.getElementById("app"));window.SPACE_BUDDIES_UI={stylesheet:"ui.css",font:"Fredoka",tokens:["--ui-font","--ui-bg","--ui-ink","--ui-coral","--ui-sun","--ui-mint","--ui-sky"],buttons:"ui-btn",banners:"ui-banner"};function em(i){document.querySelectorAll(".planet-dot").forEach(e=>{let t=Number(e.dataset.planet);e.classList.toggle("on",t===i),e.classList.toggle("done",t<i);let n=e.querySelector("img");n&&(n.src="ui/svg/"+(t<i?"map_node_cleared":t===i?"map_node_current":"map_node_locked")+".svg"),n&&n.classList.toggle("is-current",t===i),t===i&&e.scrollIntoView&&e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})})}function Wp(i){Xh.textContent=i,Xh.hidden=!1,bc=1.5}function nM(i){Wh.textContent=i,Wh.hidden=!1,vc=1.7}var Gr=!1;function iM(i){let e=ce.phase==="countdown"?ln.raceSeconds:Math.max(0,ln.raceSeconds-ce.time),t=Vp(e);kh&&kh.textContent!==t&&(kh.textContent=t),N_.classList.toggle("is-low",ce.phase==="race"&&e<=15);let n=0;for(let v of ce.racers)v!==ce.player&&!v.seated&&v.pos.z>ce.player.pos.z+.4&&n++;let s=n+1,o=s+(s===1?"ST":s===2?"ND":s===3?"RD":"TH");kp.textContent!==o&&(kp.textContent=o);let a=ce.coins||0;Po&&Po.dataset.n!==String(a)&&(Po.dataset.n=String(a),window.SBUI?SBUI.countUp(Po,a,700):Po.textContent=String(a));let c=!ce.player.seated&&ce.phase==="race"&&ce.zoneId==="meadow"&&ce.time<8&&!ln.auto;Sc.hidden=!c,c&&(Sc.textContent=ce.time<2.6?"DRAG THE LEFT SIDE TO RUN":ce.time<5.2?"DRAG THE RIGHT SIDE TO LOOK":"JUMP AND DIVE");let l=Math.max(0,Math.min(1,ce.player.pos.z/Uo.ship.z));F_.parentElement.style.setProperty("--p",Math.round(l*100)+"%");let u=Ec.children;for(let v=0;v<8;v++){let y=ce.seats[v],R=u[v],T=y==null?"ui/svg/seat_empty.svg":"ui/svg/seat_filled_"+K_[v]+".svg";R.getAttribute("src")!==T&&(R.src=T,y!=null&&R.classList.add("is-new"))}let h="SEATS "+ce.seatsFilled+"/8";Op.textContent!==h&&(Op.textContent=h);let f=ce.seatsFilled===7&&ce.phase==="race";f&&gc.hidden&&window.SBUI?SBUI.slam(gc):gc.hidden=!f,Tc.classList.toggle("last",f),Ec.parentElement.classList.toggle("is-last",f);let p=ce.phase==="countdown"||ce.phase==="race"&&ce.time<.45;if(Xp.hidden=!p,p){let v=ce.phase==="race"?0:ce.countCue,y=v>0?String(v):"GO";Hr.textContent!==y&&(Hr.textContent=y,Hr.classList.remove("sb-countdown"),Hr.offsetWidth,Hr.classList.add("sb-countdown")),U_.textContent=v>0?"GET READY":"GO",Hr.style.color=v>0?"#FF6B6B":"#FFD23F"}let g=ce.player.pos.z-ce.collapseZ,b=ce.phase==="race"?Math.max(0,Math.min(1,1-g/22)):0;q_.style.opacity=String(b),bc>0&&(bc-=i,bc<=0&&(Xh.hidden=!0)),vc>0&&(vc-=i,vc<=0&&(Wh.hidden=!0));let m=ce.phase==="results",d=document.getElementById("aboard"),_=Fs&&ce.player.seated&&ce.phase==="race";if(us.hidden=m||!Fs||_,d){d.hidden=!_;let v=Math.max(0,ln.seats-ce.seatsFilled),y=document.getElementById("aboard-copy");y&&(y.textContent=v>0?"You're on board, waiting for "+v+" more":"You're on board")}if(m&&!Gr){Gr=!0;let v=ce.result;pi.hidden=!1,pi.classList.add("show"),pi.classList.toggle("miss",v==="missed"||v==="out"),pi.classList.toggle("win",v==="qualified"||v==="escaped"),k_.textContent="PLANET "+$n,qp.hidden=v!=="qualified",Yp.hidden=v!=="escaped",xc.hidden=v==="qualified"||v==="escaped";let y=document.getElementById("result-banner");v==="qualified"?(fc.textContent="YOU QUALIFIED!",dc.textContent=jh().name+" CLEARED",y&&(y.src="ui/svg/banner_qualified.svg"),window.SBUI&&SBUI.confetti(48)):v==="escaped"?(fc.textContent="YOU ESCAPED!",dc.textContent="SEAT "+(ce.player.seatIndex+1)+" OF 8",y&&(y.src="ui/svg/banner_escaped.svg"),window.SBUI&&SBUI.confetti(60),ls.planets=Math.max(ls.planets,$n),ls.coins+=ce.coins||0,ls.best="PLANET "+$n,X_()):v==="out"?(fc.textContent="ELIMINATED",dc.textContent="YOU DIDN'T QUALIFY",xc.textContent="TRY AGAIN",y&&(y.src="ui/svg/banner_eliminated.svg")):(fc.textContent="MISSED THE SHIP!",dc.textContent="SO CLOSE",xc.textContent="TRY AGAIN"),uf({planet:$n,result:v,time:Math.round((ce.time||0)*10)/10,coins:ce.coins||0,at:new Date().toISOString()}),tM(ce);let R=ce.time||0,T=0,I=Math.max(.08,R/18),w=()=>{Gr&&(T=Math.min(R,T+I),O_.textContent="TIME "+Vp(T)+" \xB7 "+(ce.coins||0)+" COINS \xB7 PLANETS "+ls.planets,T<R&&requestAnimationFrame(w))};w()}m||(Gr=!1)}function sM(){let i=!1;for(let e of ce.events)if(e.t==="tick")Ye.play("tick",.55,.05);else if(e.t==="go")Ye.play("go",.6,.05);else if(e.t==="jump"&&e.id===0)Ye.play("jump",.4,.05);else if(e.t==="coin")Ye.play("ui_tap",.45,.03);else if(e.t==="glide"&&e.id===0)Ye.play("jump",.22,.08);else if(e.t==="grab"&&e.id===0)Ye.play("bump",.35,.05);else if(e.t==="qualify"&&e.id===0)Ye.play("seat",.45,.05),ce.slowMo=.45,ce.popConfetti=(ce.popConfetti||0)+1;else if(e.t==="roundwin")Ye.play("escaped",.55,.1);else if(e.t==="eliminated")Ye.play("missed",.6,.1);else if(e.t==="respawn"&&e.fade&&Bh)Bh.classList.add("on"),setTimeout(()=>Bh.classList.remove("on"),200);else if(e.t==="land"&&e.id===0&&e.impact>3)Ye.play("land",.35,.08);else if(e.t==="bump")Ye.play("bump",e.id===0?.5:.22,.06),e.id===0&&e.big&&(yc=.08);else if(e.t==="dive"&&e.id===0)Ye.play("jump",.28,.04);else if(e.t==="crack")i=!0;else if(e.t==="seat"){Ye.play("seat",.5,.02);let t=Ec.children[e.seat];t&&(t.classList.add("pop"),setTimeout(()=>t.classList.remove("pop"),400)),e.id===0&&Wp("SEAT "+(e.seat+1)+" LOCKED")}else e.t==="lastseat"?Ye.play("last",.7,.2):e.t==="launch"?Ye.play("launch",.65,.2):e.t==="escaped"?(Ye.play("escaped",.7,.2),Ye.flourish&&Ye.flourish("win")):e.t==="missed"?(Ye.play("missed",.65,.2),Ye.flourish&&Ye.flourish("miss")):e.t==="checkpoint"&&e.name&&e.name!=="START"?Wp("CHECKPOINT"):e.t==="zone"?nM(e.name):e.t==="geyser"?Ye.play("bump",e.id===0?.4:.18,.08):e.t==="error"&&zs(e.message);i&&wc<=0&&(Ye.play("crack",.32,.12),wc=.34),ce.events.length=0}function Ds(i){requestAnimationFrame(Ds);let e=Math.min(.1,Vh?(i-Vh)/1e3:mc);if(Vh=i,document.hidden||(Gh++,Ds.lastWall||(Ds.lastWall=i),i-Ds.lastWall>=500&&(_c=Gh/((i-Ds.lastWall)/1e3),Gh=0,Ds.lastWall=i),!ct))return;if(!Fs){!Mc.hidden&&ct.showBuddy&&ct.showBuddy(e),ct.render();return}if(Do>0){Do-=e;try{ct.update(ce,e,{intro:Do,lookDx:0,lookDy:0,looking:!1}),ct.render()}catch(u){zs(u)}Sc.hidden=!0,us.hidden=!0,Do<=0&&(us.hidden=!1);return}let t=j_.read(),n=Up(ct.yaw,t.stickX,t.stickY),s=1-Math.exp(-16*e);if(cs.x+=(n.x-cs.x)*s,cs.z+=(n.z-cs.z)*s,t.pause&&!Bp&&Jp(),Bp=!!t.pause,Ns){try{ct.update(ce,0,t),ct.render()}catch(u){zs(u)}return}ce.slowMo>0&&(ce.slowMo=Math.max(0,ce.slowMo-e));let r=ce.slowMo>0?.35:1,o={x:cs.x,z:cs.z,jump:t.jump,dive:t.dive,grab:t.grab,holdJump:t.holdJump};ce.phase!=="race"&&(o={x:0,z:0,jump:!1,dive:!1,grab:!1,holdJump:!1}),yc>0?yc-=e:Lo+=e*r;let a=0;for(;yc<=0&&Lo>=mc&&a<8;){try{gf(ce,mc,a===0?o:{x:o.x,z:o.z,jump:!1,dive:!1,grab:!1,holdJump:o.holdJump})}catch(u){zs(u),Lo=0;break}Lo-=mc,a++}wc=Math.max(0,wc-e),ce.phase==="race"&&ce.player.grounded&&Math.hypot(ce.player.vel.x,ce.player.vel.z)>2.2&&(Hh-=e,Hh<=0&&(Ye.play("land",.1,.02),Hh=.32)),sM();let c=ce.player.pos.z-ce.collapseZ,l=ce.phase==="race"?Math.max(0,Math.min(1,1-c/36)):ce.phase==="launch"?.4:0;Ye.setRumble(l*ln.rumbleMax),!Gp&&!Vr.get("dpr")&&_c>0&&_c<24&&ce.time>5&&ct.setDpr&&(Gp=!0,ct.setDpr(1),ct.setPost&&Vr.get("post")!=="1"&&ct.setPost(!1)),window.__sbOverview&&(t.overview=window.__sbOverview),ce.interp=Lo;try{ct.update(ce,e,t),ct.render(),iM(e)}catch(u){zs(u)}}"serviceWorker"in navigator&&navigator.serviceWorker.register("sw.js").catch(()=>{});window.addEventListener("resize",()=>ct&&ct.resize());document.addEventListener("visibilitychange",()=>{document.hidden&&Ye.ctx?Ye.ctx.suspend():Ye.ctx&&Ye.ctx.resume()});requestAnimationFrame(Ds);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
