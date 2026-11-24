(()=>{var or=["#5FE3B0","#FFD23F","#FF8FD1","#8C6BFF","#5CC8FF","#7FD88A","#C9B6E8","#FFC38A","#4C6FFF","#2EC4B6","#FF5FA2","#C6E05A","#9BB6FF","#F0B429","#FF8A7A","#7AD0FF"],Ym={raceSeconds:180,countdownBeats:3,goHold:.65,racers:16,seats:8,collapseDelay:6,collapseArrive:168,crackTime:1.05,crackJitter:.7,fallTime:1.2,skirtLead:22,fragileCrack:.62,accel:62,airAccel:58,maxSpeed:8.4,playerSpeed:1,friction:36,iceAccel:14,iceFriction:5,gravity:29,fallGravityMul:1.48,jumpVel:10.15,coyoteTime:.22,jumpBuffer:.2,ungroundTime:.1,maxFallSpeed:28,bodyRadius:.44,stepUp:.55,voidY:-16,bumpPush:7.4,bumpUp:3.6,bumpCooldown:.32,diveDashSpeed:12.4,diveDashTime:.28,diveFall:26,diveCooldown:.55,slideHeight:.55,poundRadius:2.15,poundPush:7.5,poundUp:4.6,padUp:13.2,padForward:7.2,padRadius:2.35,padCooldown:.28,bumperPush:11,bumperUp:5.2,bumperRadius:1.05,bumperCooldown:.36,spinnerLength:1.62,spinnerPush:9.5,spinnerUp:4.2,spinnerHit:.58,spinnerMinY:.55,spinnerMaxY:1.45,spinnerCooldown:.45,lavaRadius:1.35,lavaHop:6.5,lavaStartY:-3.4,lavaRisePerSec:.022,platformRadius:2.15,platformTop:.28,stunTime:.72,knockCooldown:.55,windPush:3.6,boardHalfX:4.2,boardZMin:-8.5,boardZMax:-.4,botSpeeds:[1.05,1.02,.99,.97,.95,.93,.9,.88,.85,.82,.78,.74,.7,.66,.62],camDist:9.2,camDistPortrait:8.6,camHeight:5.1,camHeightLand:5.3,camNear:5,camFar:12,defaultPitch:.406,minPitch:.28,maxPitch:1.12,lookSens:.0052,mouseSens:.0042,autoFollowDelay:.85,autoYaw:2.6,autoPitch:1.5,camLerp:7.5,fovPortrait:65,fovLandscape:58,shipScale:1.7,seatBuddyScale:.44,dprCap:1.25,fogNear:55,fogFar:190,bedGain:.15,rumbleMax:.32};function Mf(i={}){let e={...Ym,quick:!!i.quick,auto:!!i.auto,seed:i.seed||1,feel:!!i.feel,low:!!i.low};return i.quick&&(e.raceSeconds=46,e.collapseArrive=42,e.collapseDelay=2.5,e.playerSpeed=1.12,e.botSpeeds=e.botSpeeds.map(t=>t*.9),e.lavaRisePerSec=.08),e}var ra={meadow:{a:[.5,.85,.54],b:[1,.91,.76],rim:[.31,.68,.38]},canyon:{a:[1,.72,.47],b:[1,.88,.69],rim:[.88,.48,.29]},sky:{a:[.55,.42,1],b:[1,.82,.25],rim:[.4,.27,.88]},ice:{a:[.24,.78,1],b:[.76,.69,1],rim:[.24,.42,1]},climb:{a:[1,.82,.25],b:[1,.48,.1],rim:[.49,.4,.66]},ship:{a:[1,.82,.25],b:[1,.42,.42],rim:[.78,.2,.28]}};function jm(i,e,t,n){let s=ra[i]||ra.meadow;return e>.58?s.rim:Math.sin(t*.31+n*.23)>0?s.b:s.a}function ar(i,e,t){return i+(e-i)*t}function Zm(i){return[{id:"meadow",name:"MEADOW",z0:0,z1:i*.16},{id:"canyon",name:"LAVA CANYON",z0:i*.16,z1:i*.38},{id:"sky",name:"SKY ISLANDS",z0:i*.38,z1:i*.58},{id:"ice",name:"ICE SLIDE",z0:i*.58,z1:i*.74},{id:"climb",name:"THE CLIMB",z0:i*.74,z1:i*.9},{id:"ship",name:"ESCAPE SHIP",z0:i*.9,z1:i}]}function Sf(i,e){let t=i[0].id;for(let n of i)e>=n.z0&&(t=n.id);return t}function Km(i,e,t,n,s,r,o){let l=[],u=[],h=[];for(let p=0;p<=4;p++){let x=p/4,b=x>.58?(x-.58)*1.35:0;for(let m=0;m<=18;m++){let d=m/18*Math.PI*2,v=1+Math.sin(d*3+i*.2+t*.05)*.05,M=i+Math.cos(d)*n*x*v,y=t+Math.sin(d)*s*x*v;l.push(M,e-b,y);let R=jm(r,o?Math.max(x,x>.45?.7:x):x,M,y);u.push(R[0],R[1],R[2])}}for(let p=0;p<4;p++)for(let x=0;x<18;x++){let b=p*19+x,m=b+19;h.push(b,m,b+1,b+1,m,m+1)}return{positions:new Float32Array(l),colors:new Float32Array(u),indices:new Uint16Array(h)}}function Jm(i,e,t,n,s,r,o,a){let c=ra[a]||ra.meadow,l=10,u=[],h=[],f=[],p=t-i,x=n-e,b=Math.hypot(p,x)||1,m=-x/b,d=p/b;for(let v=0;v<=l;v++){let M=v/l,y=ar(i,t,M),R=ar(e,n,M),E=ar(s,r,M),C=v%2===0?c.a:c.b;for(let I=-1;I<=1;I++){let _=I!==0,S=_?o*.5*I:0;u.push(y+m*S,E-(_?.22:0),R+d*S);let U=_?c.rim:C;h.push(U[0],U[1],U[2])}}for(let v=0;v<l;v++){let M=v*3;f.push(M,M+3,M+1,M+1,M+3,M+4),f.push(M+1,M+4,M+2,M+2,M+4,M+5)}return{positions:new Float32Array(u),colors:new Float32Array(h),indices:new Uint16Array(f)}}function wf(i,e,t,n,s){let r={index:i.length,z0:t,z1:n,zone:e,gap:!s,state:"solid",crackT:0,fallT:0,fallY:0,dirty:!0,fragile:!1,ice:e==="ice",jitter:i.length%7/7,tilt:0};return s&&Object.assign(r,s),i.push(r),r.index}function Qm(i,e,t){return{y:i.y,x:i.x,z:t,px:i.x,pz:i.z,rx:i.rx,rz:i.rz,ice:i.zone==="ice",conveyX:i.conveyX||0,zone:i.zone,chunk:e,state:e.state,fragile:!!e.fragile}}function po(i,e,t){let n=i.floors||[],s=[];for(let r=0;r<n.length;r++){let o=n[r],a=i.chunks[o.chunk];if(!a||a.state==="falling"||a.state==="gone")continue;let c=(e-o.x)/o.rx,l=(t-o.z)/o.rz,u=o.zone==="meadow"?1.08:1;c*c+l*l>u||s.push(Qm(o,a,t))}if(!s.length&&i.islands)for(let r of i.islands){let o=e-r.x,a=t-r.z;o*o+a*a>r.r*r.r||s.push({y:r.y,x:r.x,z:t,ice:!1,conveyX:0,zone:r.zone,chunk:null,state:"solid",fragile:!1})}return s}function yi(i,e,t){let n=po(i,e,t),s=null;for(let r=0;r<n.length;r++)(!s||n[r].y>=s.y)&&(s=n[r]);return s}var $m=1.65;function rl(i){return(i?.42:1)*$m}function Ef(i){let e=!!i.quick,t=rl(e),n=oe=>oe*t,s=n(400),r=Zm(s),o=[],a=[],c=i.seed||1,l=c>>>0,u=()=>(l=Math.imul(1664525,l)+1013904223>>>0,l/4294967296),h=Math.floor(u()*3);function f(oe,ge,be,Ye,Ue,P,w){let Y=wf(o,P,be-Ue,be+Ue,Km(oe,ge,be,Ye,Ue,P,w&&w.hex)),re={x:oe,y:ge,z:be,rx:Ye,rz:Ue,zone:P,chunk:Y,conveyX:w&&w.conveyX};return a.push(re),w&&w.fragile&&(o[Y].fragile=!0),re}function p(oe,ge,be,Ye,Ue,P,w,Y,re){let ce=re&&re.gap,ie=wf(o,Y,Math.min(ge,Ye),Math.max(ge,Ye),Jm(oe,ge,be,Ye,Ue,P,w,Y)),Ie=[],xe=Math.hypot(be-oe,Ye-ge),Ae=Math.max(4,Math.ceil(xe/Math.max(2.2,w*.5)));for(let ht=0;ht<=Ae;ht++){let de=ht/Ae;if(ce&&Math.abs(de-ce)<.12)continue;let Le={x:ar(oe,be,de),z:ar(ge,Ye,de),y:ar(Ue,P,de),rx:w*.78,rz:w*.78,zone:Y,chunk:ie,conveyX:re&&re.conveyX};a.push(Le),Ie.push(Le)}return Ie}f(0,0,n(40),24,24,"meadow"),f(0,2.6,n(40),1.8,1.8,"meadow"),f(-16,.2,n(28),7,7,"meadow"),f(16,.8,n(52),6,6,"meadow"),f(0,.2,n(92),16,14,"canyon"),p(0,n(78),-16,n(100),.15,.3,7,"canyon"),p(-16,n(100),-18,n(118),.3,.35,6.5,"canyon"),p(-18,n(118),-6,n(136),.35,.3,6.5,"canyon"),p(2,n(86),14,n(108),.2,1.6,5.5,"canyon"),p(14,n(108),16,n(126),1.6,2.6,5.2,"canyon"),p(0,n(96),6,n(112),.3,.45,4.2,"canyon"),p(6,n(114),-4,n(128),.45,.35,4.2,"canyon"),p(16,n(126),2,n(140),2.6,.4,5.5,"canyon",{gap:.48}),f(0,.25,n(148),16,12,"canyon"),f(0,4,n(178),12,11,"sky"),f(-16,4.4,n(196),7,6,"sky"),f(14,6.8,n(194),6,6,"sky"),f(0,5.6,n(210),6,5,"sky"),p(0,n(186),-14,n(196),4,4.4,5,"sky"),p(-14,n(200),0,n(214),4.4,5.6,4.6,"sky"),p(4,n(184),14,n(194),4.1,6.8,4.4,"sky"),p(12,n(200),2,n(214),6.8,5.6,4.2,"sky"),f(0,5.2,n(232),13,11,"sky"),p(-2,n(156),6,n(172),.35,4,6.6,"canyon"),p(2,n(62),10,n(80),.05,.2,7.2,"meadow"),p(0,n(240),-10,n(258),5.2,3.3,6.2,"sky"),p(4,n(236),12,n(264),5.2,3.3,6,"sky"),p(0,n(336),-3,n(352),6.2,8,5.8,"climb"),p(0,n(292),6,n(306),3.1,3,6.2,"ice"),p(6,n(304),4,n(318),3,3.4,5.4,"climb"),f(-14,3.2,n(268),8,8,"ice",{conveyX:5}),f(14,3.3,n(270),8,8,"ice",{conveyX:-5}),f(0,3.1,n(286),10,8,"ice");for(let oe=-2;oe<=2;oe++)for(let ge=-3;ge<=3;ge++)(ge+oe)%2===0&&u()<.15||f(-7+ge*2.5,3.15,n(268+oe*2.4),1.25,1.25,"ice",{fragile:!0,hex:!0});f(0,3,n(312),12,10,"climb"),f(-14,4.4,n(326),6,6,"climb"),f(0,6.2,n(334),6,5,"climb"),f(14,7.6,n(324),6,6,"climb"),p(-2,n(318),-14,n(326),3,4.4,5,"climb"),p(-12,n(330),0,n(336),4.4,6.2,4.6,"climb"),p(2,n(316),14,n(324),3.1,7.6,4.4,"climb"),p(12,n(330),0,n(348),7.6,8,5,"climb"),f(0,8,n(360),14,12,"ship");let x=a[a.length-1],b={x:x.x,y:x.y,z:x.z+n(6)};function m(oe){let ge=[];for(let[be,Ye,Ue,P]of oe)ge.push({x:Ye,y:Ue||0,z:n(be),gap:!!P});return ge.push({x:b.x,y:b.y,z:b.z-4}),ge}let d=[-8,-4,0,4,8],v=d.map((oe,ge)=>ge);for(let oe=v.length-1;oe>0;oe--){let ge=Math.floor(u()*(oe+1)),be=v[oe];v[oe]=v[ge],v[ge]=be}let M=2+c%2,y=new Set(v.slice(0,M)),R=d.map((oe,ge)=>({x:oe,y:.35,z:n(146),solid:y.has(ge)})),E=R.filter(oe=>!oe.solid).map(oe=>oe.x),C=oe=>E[oe%E.length],I=[m([[24,-6,0],[34,-16,.2],[50,-14,0],[64,2,0],[82,8,.2],[100,-14,.3],[118,-18,.35],[136,-8,.3],[146,C(0),.3,!0],[156,-2,.25],[168,4,2.4],[186,-6,4],[198,-14,4.4],[214,-2,5.6],[232,0,5.2],[258,-10,3.3],[270,-14,3.2],[286,-2,3.1],[306,4,3],[318,-4,3.2],[328,-12,4.4],[334,0,6.2],[350,0,8],[360,0,8]]),m([[26,4,0],[42,10,.2],[58,12,.6],[80,6,.2],[96,2,.3],[112,4,.4],[128,-4,.35],[146,C(1),.3,!0],[156,2,.25],[168,4,2.4],[186,2,4.1],[196,-12,4.4],[210,-2,5.6],[232,2,5.2],[250,-6,4.2],[262,-10,3.3],[272,-12,3.2],[286,-2,3.1],[312,0,3],[326,-10,4.4],[336,0,6.2],[348,-2,7.6],[360,0,8]]),m([[28,6,0],[44,12,.4],[52,14,.8],[70,12,.2],[90,8,.4],[108,14,1.6],[126,16,2.6],[141,3,.5],[146,C(2),.3,!0],[168,5,2.4],[184,8,4.6],[194,14,6.8],[208,6,6.2],[232,2,5.2],[248,8,4.4],[264,13,3.3],[274,14,3.3],[286,4,3.1],[304,6,3],[316,8,4.6],[324,14,7.6],[340,6,7.8],[352,0,8],[360,0,8]])],_=[];for(let oe=0;oe<=s;oe+=8){let ge=Sf(r,oe);_.push({x:0,y:0,z:oe,half:ge==="meadow"?16:12,zone:ge,gap:!1,chunk:0,ice:ge==="ice",conveyX:0,route:0,shelf:0,shelfH:0,guard:ge==="meadow"&&oe<50*t})}let S=[];for(let oe of a)if(!(oe.rx<6))for(let ge=0;ge<3;ge++){let be=u()*Math.PI*2,Ye=Math.cos(be)*.9,Ue=Math.sin(be)*.82;Ye*Ye+Ue*Ue<.62||S.push({x:oe.x+Ye*oe.rx,y:oe.y,z:oe.z+Ue*oe.rz,zone:oe.zone,col:Math.cos(be)>0?4:-4,row:Math.floor(oe.z)})}let U=[],F=(oe,ge,be)=>U.push({x:ge,y:be+1.15,z:n(oe),got:!1}),G=I[2];for(let oe=1;oe<G.length-1;oe+=2)F(G[oe].z/t,G[oe].x,G[oe].y);F(52,14,.8),F(108,14,1.6),F(194,14,6.8),F(324,14,7.6),F(40,-10,.2);let q=[{x:0,y:1.2,z:n(40),r:2.3}];for(let oe of R)oe.solid&&q.push({x:oe.x,y:oe.y+1.2,z:oe.z,r:1.35});q.push({x:-13.2,y:1.4,z:n(146),r:2.6}),q.push({x:13.2,y:1.4,z:n(146),r:2.6}),q.push({x:b.x,y:b.y,z:b.z,r:2.4,ship:!0});let j=(oe,ge,be)=>({x:ge,y:be,z:n(oe),zone:Sf(r,n(oe))}),K=(oe,ge,be,Ye)=>Math.atan2(be-oe,Ye-ge),ue=[j(30,12,0),j(48,-8,0),j(178,6,4),j(312,-6,3)],$=[{...j(32,0,0),face:K(0,32,0,40)},{...j(40,0,2.6),face:K(0,40,14,52)},{...j(100,8,.6),face:K(8,100,14,108)},{...j(126,16,2.6),face:K(16,126,2,140)},{...j(316,6,3.4),face:K(6,316,14,324)}],ve=[{id:0,kind:"ferry",originX:0,originZ:n(204),x:0,z:n(204),prevX:0,prevZ:n(204),y:6.4,originY:6.4,amp:8,speed:.7,phase:u()*2,radius:2.8,axis:"x"},{id:1,kind:"spin",originX:-16,originZ:n(196),x:-16,z:n(196),prevX:-16,prevZ:n(196),y:4.7,originY:4.7,amp:0,speed:1.3,phase:0,radius:3.1,axis:"spin"},{id:2,kind:"seesaw",originX:0,originZ:n(278),x:0,z:n(278),prevX:0,prevZ:n(278),y:3.7,originY:3.7,amp:0,speed:0,phase:0,radius:3.6,axis:"seesaw",tilt:0,face:Math.PI/2},{id:3,kind:"seesaw",originX:0,originZ:n(338),x:0,z:n(338),prevX:0,prevZ:n(338),y:6.8,originY:6.8,amp:0,speed:0,phase:0,radius:3.4,axis:"seesaw",tilt:0,face:Math.PI/2},{id:4,kind:"seesaw",zone:"canyon",originX:11,originZ:n(156),x:11,z:n(156),prevX:11,prevZ:n(156),y:.85,originY:.85,amp:0,speed:0,phase:0,radius:3.3,axis:"seesaw",tilt:0,face:0}],we=[{...j(36,-8,.15),len:3.6,angle:u()*3,spin:1.5},{...j(148,-8,.4),len:3.2,angle:u()*2,spin:-1.35},{...j(210,0,5.7),len:2.8,angle:.4,spin:1.6},{...j(312,4,3.1),len:3.1,angle:1,spin:-1.4}],Fe=[j(104,3,.4),j(118,-2,.2)].map((oe,ge)=>({...oe,period:2.6+ge*.35,t:u()*2,hot:!1,wasHot:!1,warn:!1,radius:1.35})),Ke=[{...j(44,0,1.15),originX:0,amp:6,speed:.85,halfLen:3.2,height:1.05,full:!1,radius:1.15,scale:1.7},{...j(108,-16,1.15),originX:-16,amp:4.5,speed:1.05,halfLen:2.6,height:1.05,full:!0,radius:1.05,scale:1.55},{...j(268,-14,4.15),originX:-14,amp:4,speed:1.1,halfLen:2.4,height:1,full:!1,radius:1,scale:1.45}],pt=[{...j(68,8,4.6),len:3.2,amp:1.05,speed:1.15,phase:u(),radius:.95},{...j(207,-7,9.2),len:3.4,amp:1.1,speed:1.25,phase:u(),radius:1},{...j(330,-6,8.4),len:3.1,amp:1,speed:1.2,phase:u()*2,radius:.9}],se=[{...j(116,14,2.5),x0:10,x1:18,dir:1,speed:3.1,radius:1.15,rot:0},{...j(270,14,4.2),x0:8,x1:18,dir:-1,speed:2.6,radius:1.05,rot:0,snow:!0},{...j(324,14,8.5),x0:8,x1:18,dir:1,speed:2.8,radius:1.1,rot:0}],D=[{...j(152,6,.4),homeX:6,homeZ:n(152),homeY:.4,vy:0,hopping:!1,t:u(),period:1.7,dirx:1,dirz:0,radius:.95}],k=[{cx:0,cz:n(210),cy:9.2,x:0,y:9.2,z:n(210),ang:u()*6,span:7,radius:.95}],Z=[{z0:n(198),z1:n(216),x0:-10,x1:12,y0:4,y1:12,ax:1}],he={z0:n(108),z1:n(128),x0:-7,x1:7},me={x:0,y:.08,z:n(118),r:7.5},Ce=[{x:0,z:n(40),zone:"meadow",r:26},{x:0,z:n(118),zone:"canyon",r:24},{x:0,z:n(204),zone:"sky",r:22},{x:0,z:n(274),zone:"ice",r:20},{x:0,z:n(332),zone:"climb",r:20}],et=[{kind:"mushroom",x:0,y:0,z:n(40)},{kind:"tower",x:0,y:5.6,z:n(210)}],Be=["meadow","canyon","sky","ice","climb"].map(oe=>{let ge=r.find(be=>be.id===oe);return{x:0,y:0,z:ge.z0+8,name:ge.name,row:0}}),bt=[{x:0,y:0,z:n(22),row:0,col:0}];for(let oe=1;oe<16;oe++){let ge=Math.floor((oe-1)/5),be=(oe-1)%5;bt.push({x:(be-2)*2.1,y:0,z:n(26+ge*2.2),row:ge+1,col:be})}let It={len:s,stations:_,chunks:o,floors:a,tiles:S,islands:[],blockers:q,coins:U,zones:r,bumpers:ue,spinners:we,pads:$,platforms:ve,pendulums:pt,sweepers:Ke,geysers:Fe,rollers:se,hoppers:D,flyers:k,winds:Z,lava:he,crater:me,hubs:Ce,landmarks:et,doors:R,checkpoints:Be,waypoints:I[0],routes:I,openDoor:h,spawns:bt,crateSpawns:[{x:-6,y:.4,z:n(34)},{x:7,y:.4,z:n(46)},{x:-12,y:.5,z:n(108)}],ship:b,endZ:b.z};return eg(It),It}function eg(i){let e=i.blockers||[];for(let t of i.chunks){let n=t.positions,s=t.colors;if(!(!n||!s))for(let r=0;r<n.length;r+=3){let o=n[r],a=n[r+1],c=n[r+2],l=1;for(let f=0;f<e.length;f++){let p=e[f],x=Math.hypot(o-p.x,c-p.z),b=(p.r||1)+1.4;if(x>=b)continue;let m=.62+.38*(x/b);m<l&&(l=m)}let u=0,h=Math.min(n.length,r+48);for(let f=Math.max(0,r-45);f<h;f+=3)n[f+1]>a+.12&&Math.hypot(n[f]-o,n[f+2]-c)<1.8&&u++;u>2&&(l*=.78),s[r]*=l,s[r+1]*=l,s[r+2]*=l}}}var Tf="space-buddies-board";function tg(){try{let i=JSON.parse(localStorage.getItem(Tf)||"[]");return Array.isArray(i)?i:[]}catch{return[]}}function Af(i){let e=[i,...tg()].slice(0,12);try{localStorage.setItem(Tf,JSON.stringify(e))}catch{}let t=typeof window<"u"?window.SPACE_BUDDIES_SUPABASE:null;if(t&&t.url&&t.key){let n=String(t.url).replace(/\/$/,"")+"/rest/v1/runs";fetch(n,{method:"POST",headers:{apikey:t.key,Authorization:"Bearer "+t.key,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(i)}).catch(()=>{})}return e}function Rf(i,e,t,n){return i>3.5&&e<i*.5&&t>.45&&!n}function Cf(i){return i==null||i<.5}function If(){return{snags:0,unfair:0,missed:0,jumps:0,lands:0,falls:0,dies:0,marks:[]}}function cr(i,e,t,n){!i||i.marks.length>500||i.marks.push({x:Math.round(e*10)/10,z:Math.round(t*10)/10,kind:n})}function ng(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function oa(i,e,t){return Math.max(e,Math.min(t,i))}function vi(i,e){return Math.hypot(i,e)}function al(i,e,t=1){let n=ng(t||1),s=i.spawns.slice(),r=s.find(u=>u.col===0&&u.row===s[0].row+3)||s[Math.min(8,s.length-1)],o=s.filter(u=>u!==r);for(let u=o.length-1;u>0;u--){let h=Math.floor(n()*(u+1)),f=o[u];o[u]=o[h],o[h]=f}let a=[];for(let u=0;u<e.racers;u++){let h=u===0?r:o[u-1]||r,f=u===0?e.playerSpeed:e.botSpeeds[Math.min(u-1,e.botSpeeds.length-1)];a.push({id:u,isPlayer:u===0,useAI:u!==0,color:or[u%or.length],pos:{x:h.x,y:h.y,z:h.z},lastSafe:{x:h.x,y:h.y,z:h.z},vel:{x:0,y:0,z:0},yaw:0,grounded:!0,platformId:null,coyote:e.coyoteTime,buffer:0,ungroundT:0,flail:0,invuln:.4,controlLock:0,sliding:0,squash:0,seated:!1,seatIndex:-1,eliminated:!1,cp:0,padCd:0,canGlide:0,qualified:!1,grabT:0,boost:0,bumpCd:0,spinCd:0,diveCd:0,knockCd:0,diving:!1,wasDiving:!1,dashX:0,dashZ:1,onIce:!1,emote:"idle",attached:!1,profile:{speed:f,skill:f>.96?.94:f>.86?.78:.5,mistake:u===0?0:f>.96?.012:f>.86?.035:.07,phase:n()*6},wait:u===0?0:(h.row||0)*.42+n()*.55,stumble:0,wp:0,routeId:u%3})}let c={cfg:e,course:i,racers:a,player:a[0],seed:t,rand:n,phase:"countdown",countClock:0,countCue:-1,time:0,collapseZ:i.zones[0].z0-16,collapseSpeed:1,seats:Array(e.seats).fill(null),seatsFilled:0,lastSeatEvent:!1,result:null,launchT:0,launchV:0,launchY:0,shipY:i.ship.y,events:[],platforms:i.platforms.map(u=>({...u})),spinners:i.spinners.map(u=>({...u})),geysers:i.geysers.map(u=>({...u})),rollers:i.rollers.map(u=>({...u})),hoppers:i.hoppers.map(u=>({...u})),flyers:i.flyers.map(u=>({...u})),pendulums:i.pendulums.map(u=>({...u,bobX:u.x,bobY:u.y-u.len,bobZ:u.z})),sweepers:i.sweepers.map(u=>({...u})),lavaY:e.lavaStartY,coins:0,crates:(i.crateSpawns||[]).map(u=>({x:u.x,y:u.y,z:u.z,vx:0,vz:0})),finishZ:null,shipRound:!1,kind:"gate",crown:null,qualifyN:0,qualCount:0,shake:0,activated:!1,zoneId:"meadow",feel:e.feel?If():null},l=Math.max(30,i.ship.z-i.zones[0].z0);c.collapseSpeed=l/Math.max(8,e.collapseArrive-e.collapseDelay);for(let u of i.chunks)u.state="solid",u.crackT=0,u.fallT=0,u.fallY=0,u.dirty=!0,u.tilt=0,u.stepped=!1,u.spawned=!1;return c}function la(i,e){for(let n of i.course.chunks)n.state="solid",n.crackT=0,n.fallT=0,n.fallY=0,n.dirty=!0,n.tilt=0,n.stepped=!1;let t=al(i.course,i.cfg,e||i.seed+17>>>0);return Object.assign(i,t),i}function zf(i){return i&&(i.state==="solid"||i.state==="cracking")}function Pf(i,e,t){return!(t-i>.42||i>t+.08&&e>t+.08)}function hr(i,e){let t=e+1;return i<t?t:i}function ig(i,e,t){if(i.axis!=="seesaw")return i.y;let n=i.face||0,s=(e-i.x)*Math.cos(n)+(t-i.z)*Math.sin(n);return i.originY-s*Math.sin(i.tilt||0)}function Lf(i,e,t,n,s){let r=null,o=i.platforms;for(let c=0;c<o.length;c++){let l=o[c],u=e-l.x,h=t-l.z;if(u*u+h*h>l.radius*l.radius)continue;let f=ig(l,e,t);Pf(n,s,f)&&(!r||f>=r.y)&&(r={y:f,platformId:c,tile:null})}let a=po(i.course,e,t);for(let c=0;c<a.length;c++){let l=a[c];l&&zf(l)&&Pf(n,s,l.y)&&(!r||l.y>=r.y-.02)&&(r={y:l.y,platformId:null,tile:l})}return r}function ol(i,e,t,n){let s=po(i.course,e,t);for(let r=0;r<s.length;r++){let o=s[r];if(o&&zf(o)&&Math.abs(o.y-n)<1.4)return!0}for(let r of i.platforms){let o=e-r.x,a=t-r.z;if(o*o+a*a<=r.radius*r.radius&&Math.abs(r.y-n)<1.6)return!0}return!1}function Uf(i,e){for(let t of i.course.winds)if(e.pos.z>=t.z0&&e.pos.z<=t.z1&&e.pos.x>=t.x0&&e.pos.x<=t.x1&&e.pos.y>=t.y0&&e.pos.y<=t.y1)return t;return null}function ur(i,e,t,n,s){e.seated||e.eliminated||e.invuln>0||e.knockCd>0||e.lockImmune>0||(e.vel.x+=t,e.vel.z+=n,e.vel.y=Math.max(e.vel.y,s),e.grounded=!1,e.platformId=null,e.ungroundT=Math.max(e.ungroundT,.08),e.flail=Math.min(1.4,Math.max(e.flail,i.cfg.stunTime)),e.controlLock=Math.min(1.4,Math.max(e.controlLock,i.cfg.stunTime)),e.knockCd=i.cfg.knockCooldown,e.sliding=0,i.events.push({t:"bump",id:e.id,big:!0,obstacle:!0}),e.isPlayer&&(i.shake=Math.max(i.shake,.72)))}function sg(i,e){if(i.lockImmune>0){i.lockImmune-=e,i.controlLock=0,i.grabT=0,i.flail>.12&&(i.flail=.12),i.lockAge=0;return}if(!(i.controlLock>.04||i.flail>.25||i.grabT>.25)){i.lockAge=0;return}i.lockAge=(i.lockAge||0)+e,!(i.lockAge<2)&&(i.controlLock=0,i.flail=0,i.grabT=0,i.sliding=0,i.lockAge=0,i.lockImmune=1.2)}function ca(i,e,t){let n=i.course.floors||[],s=null;for(let r=0;r<n.length;r++){let o=n[r],a=i.course.chunks[o.chunk];if(!a||a.state!=="solid"&&a.state!=="cracking")continue;let c=(e-o.x)/o.rx,l=(t-o.z)/o.rz,u=o.zone==="meadow"?1.08:.98;c*c+l*l>u||(!s||o.y>=s.y)&&(s={x:e,y:o.y,z:t})}return s}function rg(i,e){let t=e.lastSafe;if(t&&t.z>i.collapseZ+2){let c=ca(i,t.x,t.z);if(c)return c}let n=i.course.routes||[i.course.waypoints],s=null,r=1e9,o=Math.max(t&&t.z||e.pos.z||0,i.collapseZ+8);for(let c=0;c<n.length;c++){let l=n[c];for(let u=0;u<l.length;u++){let h=l[u];if(h.z<i.collapseZ+4)continue;let f=ca(i,h.x,h.z);if(!f)continue;let p=Math.abs(h.z-o)+(h.z>o+18?40:0);p<r&&(r=p,s=f)}}if(s)return s;let a=i.course.floors||[];for(let c=0;c<a.length;c++){let l=a[c],u=i.course.chunks[l.chunk];if(!(!u||u.state!=="solid"&&u.state!=="cracking")&&l.zone!=="ship"&&!(l.z<i.collapseZ+4))return{x:l.x,y:l.y,z:l.z}}return null}function aa(i,e){let t=rg(i,e);t&&(e.pos.x=t.x,e.pos.y=t.y+.05,e.pos.z=t.z,e.vel.x=0,e.vel.y=0,e.vel.z=0,e.grounded=!0,e.platformId=null,e.flail=0,e.invuln=.85,e.controlLock=0,e.lockAge=0,e.airStuck=0,e.stallT=0,e.sliding=0,e.diving=!1,e.wasDiving=!1,e.lastSafe={x:t.x,y:t.y,z:t.z},e.markX=t.x,e.markZ=t.z,i.events.push({t:"respawn",id:e.id,fade:e.isPlayer}),e.isPlayer&&(i.shake=Math.max(i.shake,.3),i.feel&&(i.feel.falls++,cr(i.feel,t.x,t.z,"fall"),e.jumpArm=0)))}function og(i,e){let t=i.cfg;for(let n of i.racers){if(n===e||n.seated||n.invuln>0)continue;let s=n.pos.x-e.pos.x,r=n.pos.z-e.pos.z,o=Math.hypot(s,r);if(o<t.poundRadius&&Math.abs(n.pos.y-e.pos.y)<1.5){let a=o>.05?s/o:1,c=o>.05?r/o:0;n.vel.x+=a*t.poundPush,n.vel.z+=c*t.poundPush,n.vel.y=Math.max(n.vel.y,t.poundUp),n.grounded=!1,n.flail=.35,n.ungroundT=.06}}i.events.push({t:"bump",id:e.id,big:!0})}function ag(i,e){let t=i.course.blockers;if(!t)return;let n=i.course.ship;for(let s=0;s<t.length;s++){let r=t[s];if(Math.abs(e.pos.y-r.y)>2.2)continue;if(r.ship){let p=e.pos.z-n.z,x=Math.hypot(e.pos.x-r.x,e.pos.z-r.z);if(p<-.5&&p>-9&&x>r.r*.35)continue}let o=e.pos.x-r.x,a=e.pos.z-r.z,c=Math.hypot(o,a);if(c>=r.r||c<1e-4)continue;let l=o/c,u=a/c,h=r.r-c;e.pos.x+=l*h,e.pos.z+=u*h;let f=e.vel.x*l+e.vel.z*u;f<0&&(e.vel.x-=l*f,e.vel.z-=u*f)}}function cg(i,e,t,n,s,r,o){let a=vi(e,t),c=r*Math.min(1,a),l=0,u=0;a>.001&&(l=e/a,u=t/a);let h=l*c+(o||0),f=u*c,p=h-i.vel.x,x=f-i.vel.z,b=Math.hypot(p,x),m=Math.min(b,s*n);b>1e-4&&(i.vel.x+=p/b*m,i.vel.z+=x/b*m)}function lg(i,e){let t=i.course.blockers;if(!t)return;let n=i.course.ship;for(let s=0;s<2;s++)for(let r=0;r<t.length;r++){let o=t[r];if(Math.abs(e.pos.y-o.y)>2.4)continue;let a=e.pos.x-o.x,c=e.pos.z-o.z,l=Math.hypot(a,c);if(l>=o.r)continue;if(o.ship&&n){let p=e.pos.z-n.z;if(p<-.2&&p>-9&&l>o.r*.35)continue}l<1e-4&&(a=1,c=.15,l=Math.hypot(a,c));let u=a/l,h=c/l,f=o.r-l+.06;e.pos.x+=u*f,e.pos.z+=h*f,e.vel.x*u+e.vel.z*h<0&&(e.vel.x+=u*2,e.vel.z+=h*2)}}function ug(i,e,t,n){let s=i.cfg;if(e.prevZ=e.pos.z,e.prevX=e.pos.x,e.prevY=e.pos.y,e.seated||e.eliminated)return;if(e.qualified){e.pos.z+=2.4*n,e.vel.x*=.8,e.vel.z=2.4;return}if(sg(e,n),e.controlLock>0&&(e.controlLock-=n,t={x:0,z:0,jump:!1,dive:!1}),e.invuln>0&&(e.invuln-=n),e.padCd>0&&(e.padCd-=n),e.bumpCd>0&&(e.bumpCd-=n),e.spinCd>0&&(e.spinCd-=n),e.diveCd>0&&(e.diveCd-=n),e.knockCd>0&&(e.knockCd-=n),e.flail>0&&(e.flail-=n),e.squash>0&&(e.squash=Math.max(0,e.squash-n*3.2)),e.grounded&&e.platformId!=null){let F=i.platforms[e.platformId];if(F){if(e.pos.x+=F.x-F.prevX,e.pos.z+=F.z-F.prevZ,F.axis==="spin"){let G=e.pos.x-F.x,q=e.pos.z-F.z;e.vel.x+=-q*F.speed*n*5.5,e.vel.z+=G*F.speed*n*5.5}else if(F.axis==="seesaw"){let G=F.face||0,q=Math.sin(F.tilt||0)*9*n;e.vel.x+=Math.cos(G)*q,e.vel.z+=Math.sin(G)*q}}}if(e.grounded?e.coyote=s.coyoteTime:e.coyote=Math.max(0,e.coyote-n),t.jump?e.buffer=s.jumpBuffer:e.buffer=Math.max(0,e.buffer-n),t.dive&&e.diveCd<=0){let F=vi(t.x,t.z);F>.15?(e.dashX=t.x/F,e.dashZ=t.z/F):(e.dashX=Math.sin(e.yaw),e.dashZ=Math.cos(e.yaw)),e.grounded?(e.sliding=s.diveDashTime,e.diveCd=s.diveCooldown,t.jump&&(e.buffer=Math.max(e.buffer,s.diveDashTime+.08)),i.events.push({t:"dive",id:e.id})):(e.vel.y=-s.diveFall,e.diving=!0,e.wasDiving=!0,e.diveCd=s.diveCooldown,e.grounded=!1,i.events.push({t:"dive",id:e.id}))}let r=Uf(i,e),o=r?r.ax*s.windPush:0,a=e.controlLock>0?8:e.onIce?vi(t.x,t.z)>.1?s.iceAccel:s.iceFriction:vi(t.x,t.z)>.08?s.accel:s.friction,c=s.maxSpeed*(e.profile.speed||1);if(e.sliding>0)e.sliding-=n,e.vel.x=e.dashX*s.diveDashSpeed,e.vel.z=e.dashZ*s.diveDashSpeed,e.vel.x+=t.x*10*n,e.vel.z+=t.z*10*n;else if(e.grounded)cg(e,t.x,t.z,n,a,c,o),e.groundTile&&e.groundTile.conveyX&&(e.vel.x+=e.groundTile.conveyX*n);else{e.vel.x+=t.x*s.airAccel*n+o*n*.6,e.vel.z+=t.z*s.airAccel*n;let F=e.diving?s.diveDashSpeed:e.boost>0?s.padForward+c:c*1.18;e.boost>0&&(e.boost-=n);let G=vi(e.vel.x,e.vel.z);G>F&&(e.vel.x*=F/G,e.vel.z*=F/G)}let l=!1;e.buffer>0&&e.ungroundT<=0&&(e.grounded||e.coyote>0)&&e.sliding<=0&&(e.vel.y=s.jumpVel,e.grounded=!1,e.platformId=null,e.coyote=0,e.buffer=0,e.ungroundT=s.ungroundTime,l=!0,i.events.push({t:"jump",id:e.id}),e.isPlayer&&i.feel&&(e.jumpArm=i.time,i.feel.jumps++));let u=s.gravity;e.vel.y<0&&(u*=s.fallGravityMul),e.vel.y-=u*n,e.vel.y<-s.maxFallSpeed&&(e.vel.y=-s.maxFallSpeed),e.vel.x=oa(e.vel.x,-24,24),e.vel.z=oa(e.vel.z,-24,24),e.ungroundT>0&&(e.ungroundT-=n),e.canGlide>0&&(e.canGlide-=n,!e.grounded&&t.holdJump&&e.vel.y<2&&(e.vel.y=Math.max(e.vel.y,-3.2),e.vel.y+=11*n,e.glided||(e.glided=!0,i.events.push({t:"glide",id:e.id})))),e.grounded&&(e.glided=!1),e.grabT>0&&(e.grabT-=n),t.grab&&e.grabT<=0&&(bg(i,e),e.grabT=.4);let h=e.grounded,f=e.pos.x,p=e.pos.z,x=vi(e.vel.x,e.vel.z),b=e.vel.x,m=e.vel.z,d=Math.hypot(e.vel.x,e.vel.z)*n,v=Math.max(1,Math.min(4,Math.ceil(d/.42))),M=n/v;for(let F=0;F<v;F++)e.pos.x+=e.vel.x*M,e.pos.z+=e.vel.z*M,ag(i,e);let y=vi(e.vel.x,e.vel.z);if(e.isPlayer&&i.feel&&e.grounded&&e.sliding<=0){let F=vi(t.x,t.z),G=F>.2&&x>0?(t.x*b+t.z*m)/(F*x):0,q=e.hitAt!=null&&i.time-e.hitAt<.25;Rf(x,y,G,q)&&(i.feel.snags++,cr(i.feel,e.pos.x,e.pos.z,"snag"))}if(e.isPlayer&&i.feel){let F=vg(i,e);F!=null&&F<7?e.warnT==null&&(e.warnT=i.time):(F==null||F>10)&&(e.warnT=null)}let R=e.pos.y+e.vel.y*n;if(e.ungroundT>0||l)e.pos.y=R,e.grounded=!1,e.platformId=null;else{let F=Math.max(e.pos.y,R),G=Math.min(e.pos.y,R),q=Lf(i,e.pos.x,e.pos.z,F,G);if(q&&e.vel.y<=.85){let j=-e.vel.y,K=!e.grounded;e.pos.y=q.y,e.vel.y=0,e.grounded=!0,e.platformId=q.platformId,e.groundTile=q.tile,e.onIce=!!(q.tile&&q.tile.ice),e.diving=!1,K&&j>2.4&&(e.squash=oa(j/16,.12,1),i.events.push({t:"land",id:e.id,impact:j}),e.wasDiving&&j>8&&og(i,e)),e.wasDiving=!1,e.isPlayer&&i.feel&&e.jumpArm&&(i.feel.lands++,e.jumpArm=0),q.tile&&!q.tile.fragile&&(e.lastSafe={x:q.tile.x,y:q.y,z:e.pos.z}),q.tile&&q.tile.chunk&&q.tile.state==="solid"&&q.tile.fragile&&!q.tile.chunk.stepped&&(q.tile.chunk.stepped=!0,q.tile.chunk.state="cracking",q.tile.chunk.crackT=s.fragileCrack,q.tile.chunk.dirty=!0,i.events.push({t:"crack"}))}else if(h&&e.pos.z<50&&e.vel.y<=.6&&ca(i,e.pos.x,e.pos.z)){let j=ca(i,e.pos.x,e.pos.z);e.pos.y=j.y,e.vel.y=0,e.grounded=!0,e.groundTile=j}else if(e.pos.y=R,e.grounded=!1,e.platformId=null,e.groundTile=null,e.onIce=!1,e.isPlayer&&i.feel&&e.jumpArm&&i.time-e.jumpArm>.35&&e.vel.y<-1){let j=Lf(i,e.pos.x,e.pos.z,e.pos.y+.2,e.pos.y),K=j&&j.tile;if(K&&K.rx&&e.pos.y<j.y-.9&&e.pos.y>j.y-2.2){let ue=(e.pos.x-K.px)/K.rx,$=(e.pos.z-K.pz)/K.rz;ue*ue+$*$<.35&&(i.feel.missed++,cr(i.feel,e.pos.x,e.pos.z,"miss"),e.jumpArm=0)}}}let E=i.course.checkpoints;for(;e.grounded&&e.cp<E.length-1&&e.pos.z>E[e.cp+1].z-1.5;)e.cp++,e.isPlayer&&i.events.push({t:"checkpoint",name:E[e.cp].name});let C=yi(i.course,e.pos.x,e.pos.z),I=C?C.y:e.lastSafe?e.lastSafe.y:0;(e.pos.y<s.voidY||e.pos.y<I-15)&&aa(i,e);let _=i.course.lava;if(e.pos.z>_.z0&&e.pos.z<_.z1&&e.pos.x>_.x0&&e.pos.x<_.x1&&e.pos.y<i.lavaY+.2&&!e.seated&&aa(i,e),vi(e.vel.x,e.vel.z)>.7&&e.sliding<=0?e.yaw=Math.atan2(e.vel.x,e.vel.z):e.sliding>0&&(e.yaw=Math.atan2(e.dashX,e.dashZ)),h&&!e.grounded&&(e.fallFrom=e.pos.y),e.grounded&&e.fallFrom!=null&&(e.fallFrom-e.pos.y>4.5&&!(e.lockImmune>0)&&(e.flail=.7,e.controlLock=Math.max(e.controlLock,.35)),e.fallFrom=null),e.flailWas>0&&e.flail<=0){let F=yi(i.course,e.pos.x,e.pos.z);F&&Math.abs(e.pos.y-F.y)<1.4&&(e.pos.y=F.y,e.vel.y=0,e.grounded=!0)}e.flailWas=e.flail,e.grounded||ol(i,e.pos.x,e.pos.z,e.pos.y)?e.airStuck=0:e.airStuck=(e.airStuck||0)+n,e.airStuck>3&&(e.airStuck=0,aa(i,e)),lg(i,e),hg(i,e)}function hg(i,e){if(!e.isPlayer||e.prevY==null||e.tunneled)return;let t=po(i.course,e.pos.x,e.pos.z);for(let n=0;n<t.length;n++){let s=t[n];if(!s.rx||!s.rz)continue;let r=(e.pos.x-s.px)/s.rx,o=(e.pos.z-s.pz)/s.rz;if(!(r*r+o*o>.35)&&e.prevY>=s.y-.05&&e.pos.y<s.y-.75){e.tunneled=s.y;return}}}function fg(i,e,t){let n={x:0,z:0,jump:!1,dive:!1};if(e.wait>0)return e.wait-=t,n;if(e.stumble>0)return e.stumble-=t,n;let s=e.profile;i.rand()<s.mistake*t&&(e.stumble=.18+i.rand()*.28);let r=i.course.routes,o=r&&r[e.routeId]||i.course.waypoints;for(;e.wp<o.length-1;){let R=o[e.wp],E=e.pos.x-R.x,C=e.pos.z-R.z;if(E*E+C*C>9)break;e.wp++}let a=o[Math.min(e.wp,o.length-1)],c=(e.id%5-2)*(e.pos.y>5.5?.4:.85),l=a.x+c;a.gap&&(l=a.x);for(let R of i.course.pads){let E=(R.x-a.x)**2+(R.z-a.z)**2<36,C=(R.x-e.pos.x)**2+(R.z-e.pos.z)**2<49;E&&C&&(l=R.x)}let u=a.z,h=a.y;if(a.z-e.pos.z>6){let R=null,E=1e9;for(let C of i.platforms){if(C.kind!=="ferry"||C.z<e.pos.z+.5||C.z>a.z+1)continue;let I=C.z-e.pos.z;I<E&&(E=I,R=C)}R&&(l=R.x,u=R.z,h=R.y)}let f=l-e.pos.x,p=u-e.pos.z;Uf(i,e)&&(f-=2.4*s.skill);for(let R of i.spinners){let E=R.z-e.pos.z;E>-.2&&E<7&&Math.abs(R.x-e.pos.x)<2.2&&(f+=(e.pos.x>=R.x?1:-1)*3.2*s.skill)}for(let R of i.sweepers){let E=R.z-e.pos.z;E>.3&&E<6&&Math.abs(R.x-e.pos.x)<1.6&&(R.full&&s.skill>.4||(f+=(e.pos.x>=R.x?1:-1)*3*s.skill))}for(let R of i.geysers){if(!R.warn&&!R.hot)continue;let E=R.z-e.pos.z;E>-.5&&E<7&&Math.abs(R.x-e.pos.x)<2.4&&(f+=(e.pos.x>=R.x?1:-1)*4.2*s.skill)}for(let R of i.rollers)Math.abs(R.z-e.pos.z)<3&&Math.abs(R.x-e.pos.x)<3&&(p+=2.5,f+=(e.pos.x>=R.x?1:-1)*2);let x=Math.hypot(f,p)||1;f/=x,p/=x;let b=!1,m=e.pos.x+f*1.05,d=e.pos.z+p*1.05,v=ol(i,m,d,e.pos.y);e.grounded&&!v&&(ol(i,e.pos.x+f*3.2,e.pos.z+p*4.2,e.pos.y)||h>e.pos.y-.4?b=!0:p*=.15),e.grounded&&h>e.pos.y+.65&&Math.hypot(l-e.pos.x,u-e.pos.z)<3.2&&(b=!0);let M=!1;for(let R of i.course.pads){let E=R.z-e.pos.z;E>-.4&&E<8&&Math.abs(R.x-e.pos.x)<2.2&&(M=!0)}M&&(b=!1);for(let R of i.sweepers){if(!R.full)continue;let E=R.z-e.pos.z;e.grounded&&E>.6&&E<2.8&&(b=!0)}let y=!1;if(i.rand()<.45*t)for(let R of i.racers)R!==e&&!R.seated&&Math.hypot(R.pos.x-e.pos.x,R.pos.z-e.pos.z)<1.6&&(y=!0);return{x:f,z:p,jump:b,dive:!1,grab:y}}function dg(i){let e=i.cfg,t=i.racers,n=e.bodyRadius*1.7;for(let s=0;s<t.length;s++){let r=t[s];if(!(r.seated||r.eliminated||r.qualified))for(let o=s+1;o<t.length;o++){let a=t[o];if(a.seated||a.eliminated||a.qualified)continue;let c=a.pos.x-r.pos.x,l=a.pos.z-r.pos.z;if(Math.abs(r.pos.y-a.pos.y)>1.3)continue;let h=Math.hypot(c,l);if(h<8e-4&&(c=s%2?1:-1,l=.35,h=Math.hypot(c,l)),h>=n)continue;let f=c/h,p=l/h,x=(n-h)*.35,b=r.isPlayer?r:a.isPlayer?a:null;if(b){let d=b===r?a:r,v=b===r?1:-1,M=Math.hypot(b.vel.x,b.vel.z)>1.2;d.pos.x+=f*v*x,d.pos.z+=p*v*x,M&&(b.pos.x-=f*v*x*.08,b.pos.z-=p*v*x*.08);let y=-p*v,R=f*v;d.vel.x+=y*.7,d.vel.z+=R*.7;continue}if(r.invuln<=0&&(r.pos.x-=f*x,r.pos.z-=p*x),a.invuln<=0&&(a.pos.x+=f*x,a.pos.z+=p*x),(r.vel.x-a.vel.x)*f+(r.vel.z-a.vel.z)*p>6&&r.bumpCd<=0&&a.bumpCd<=0&&r.invuln<=0&&a.invuln<=0){r.vel.x-=f*e.bumpPush*.45,r.vel.z-=p*e.bumpPush*.45,a.vel.x+=f*e.bumpPush*.45,a.vel.z+=p*e.bumpPush*.45,r.bumpCd=e.bumpCooldown,a.bumpCd=e.bumpCooldown;let d=r.isPlayer?r.id:a.isPlayer?a.id:r.id;i.events.push({t:"bump",id:d})}}}}var zn=.55;function lr(i,e,t){t.armedAt==null&&(t.armedAt=i.time);let n=i.time-t.armedAt;return t.glow=Math.max(t.glow||0,Math.min(1,n/zn)),e.isPlayer&&(i.player.warnT==null||t.armedAt<i.player.warnT)&&(i.player.warnT=t.armedAt),n>=zn}function pg(i,e){let t=i.cfg;for(let n of i.spinners)n.angle+=n.spin*e;for(let n of i.course.bumpers){n.glow=0;let s=!1;for(let r of i.racers){if(r.seated||r.eliminated)continue;let o=r.pos.x-n.x,a=r.pos.z-n.z;Math.hypot(o,a)<t.bumperRadius+4.2&&Math.abs(r.pos.y-n.y)<2.2&&(s=!0)}s||(n.armedAt=null);for(let r of i.racers){if(r.seated||r.bumpCd>0||r.invuln>0)continue;let o=r.pos.x-n.x,a=r.pos.z-n.z,c=Math.hypot(o,a);if(c<t.bumperRadius+4.2&&Math.abs(r.pos.y-n.y)<2.2&&lr(i,r,n),c<t.bumperRadius+.2&&Math.abs(r.pos.y-n.y)<1.4&&(n.armedAt==null||i.time-n.armedAt>=zn)){let l=c>.05?o/c:1,u=c>.05?a/c:0;r.vel.x=l*t.bumperPush,r.vel.z=u*t.bumperPush,r.vel.y=Math.max(r.vel.y,t.bumperUp),r.grounded=!1,r.ungroundT=.08,r.flail=.4,r.bumpCd=t.bumperCooldown,r.controlLock=Math.max(r.controlLock,.12),i.events.push({t:"bump",id:r.id,big:!0,obstacle:!0}),r.isPlayer&&(i.shake=Math.max(i.shake,.28))}}}for(let n of i.spinners){n.glow=0;let s=!1;for(let d of i.racers)d.seated||d.eliminated||Math.hypot(d.pos.x-n.x,d.pos.z-n.z)<(n.len||t.spinnerLength)+2.4&&Math.abs(d.pos.y-n.y)<2.2&&(s=!0,lr(i,d,n));s||(n.armedAt=null);let r=Math.cos(n.angle),o=Math.sin(n.angle),a=n.len||t.spinnerLength,c=r*a,l=o*a,u=n.x-c,h=n.z-l,f=n.x+c,p=n.z+l,x=f-u,b=p-h,m=x*x+b*b||1;for(let d of i.racers){if(d.seated||d.spinCd>0||d.invuln>0||d.sliding>0)continue;let v=d.pos.y-n.y;if(v<t.spinnerMinY||v>t.spinnerMaxY)continue;let M=((d.pos.x-u)*x+(d.pos.z-h)*b)/m;M=oa(M,0,1);let y=u+x*M,R=h+b*M,E=d.pos.x-y,C=d.pos.z-R;if(E*E+C*C>t.spinnerHit*t.spinnerHit)continue;if(n.armedAt==null||i.time-n.armedAt<zn){lr(i,d,n);continue}let I=-o,_=r,S=Math.sign((d.pos.x-n.x)*I+(d.pos.z-n.z)*_)||1;ur(i,d,I*S*t.spinnerPush,_*S*t.spinnerPush,t.spinnerUp),d.spinCd=t.spinnerCooldown}}for(let n of i.course.pads)for(let s of i.racers){if(s.seated||s.padCd>0)continue;let r=s.pos.x-n.x,o=s.pos.z-n.z;if(r*r+o*o>t.padRadius*t.padRadius)continue;let a=s.pos.y-n.y;if(a>1.35||a<-3.4)continue;let c=n.face!=null?n.face:vi(s.vel.x,s.vel.z)>.4?Math.atan2(s.vel.x,s.vel.z):0;s.vel.y=t.padUp,s.vel.x=Math.sin(c)*t.padForward,s.vel.z=Math.cos(c)*t.padForward,s.grounded=!1,s.platformId=null,s.ungroundT=.12,s.padCd=t.padCooldown,s.boost=1.15,s.canGlide=2.4,s.glided=!1,n.pulse=.28,i.events.push({t:"jump",id:s.id,pad:!0})}for(let n of i.geysers){n.t+=e;let s=n.t%n.period;if(n.warn=s>n.period-.7&&s<n.period-.18,n.hot=s>=n.period-.18||s<.28,n.hot&&!n.wasHot)for(let r of i.racers){if(r.seated)continue;Math.hypot(r.pos.x-n.x,r.pos.z-n.z)<n.radius+.3&&Math.abs(r.pos.y-n.y)<1.3&&(r.vel.y=Math.max(r.vel.y,13),r.grounded=!1,r.ungroundT=.1,r.flail=.3,i.events.push({t:"geyser",id:r.id}),r.isPlayer&&(i.shake=Math.max(i.shake,.2)))}n.wasHot=n.hot}for(let n of i.sweepers){let s=n.originX+Math.sin(i.time*n.speed+n.z)*n.amp,r=!1;for(let o of i.racers)o.seated||o.eliminated||Math.abs(o.pos.z-n.z)<3.2&&Math.abs(o.pos.x-s)<n.amp+2&&(r=!0);r?(n.armedAt==null&&(n.armedAt=i.time),n.glow=Math.min(1,(i.time-n.armedAt)/zn),i.time-n.armedAt<zn?i.player&&Math.abs(i.player.pos.z-n.z)<3.2&&(i.player.warnT==null||n.armedAt<i.player.warnT)&&(i.player.warnT=n.armedAt):n.x=s):(n.armedAt=null,n.glow=0,n.x=s);for(let o of i.racers){if(o.seated||o.invuln>0||o.knockCd>0||n.armedAt!=null&&i.time-n.armedAt<zn||Math.abs(o.pos.z-n.z)>1.7||Math.abs(o.pos.x-n.x)>n.radius+.85)continue;let a=o.pos.y-(n.y-n.height),c=o.sliding>0?t.slideHeight:1.35;if(a>c||o.pos.y+.2<n.y-.35||o.sliding>0&&n.height>.8)continue;let l=Math.cos(i.time*n.speed+n.z)>=0?1:-1;ur(i,o,l*8,3.5,3.2)}}for(let n of i.pendulums){let s=(i.time*n.speed+n.phase)%(Math.PI*2),r=.72,o;s<r?o=1:o=Math.cos((s-r)/(Math.PI*2-r)*Math.PI*2);let a=o*n.amp;n.bobX=n.x+Math.sin(a)*n.len,n.bobY=n.y-Math.cos(a)*n.len,n.bobZ=n.z;let c=Math.cos(i.time*n.speed+n.phase);for(let l of i.racers){if(l.seated||l.invuln>0)continue;let u=Math.hypot(l.pos.x-n.bobX,l.pos.z-n.bobZ);if(u<n.radius+2.4&&Math.abs(l.pos.y+.7-n.bobY)<2.2?lr(i,l,n):n.armedAt!=null&&u>n.radius+3&&(n.armedAt=null),u<n.radius+.35&&Math.abs(l.pos.y+.7-n.bobY)<1){if(n.armedAt==null||i.time-n.armedAt<zn)continue;ur(i,l,c*9,2,3)}}}}function mg(i,e){for(let t of i.rollers){t.x+=t.dir*t.speed*e,t.rot+=e*2.4,t.x>t.x1&&(t.dir=-1),t.x<t.x0&&(t.dir=1);for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+3.2&&Math.abs(n.pos.y-t.y)<2&&lr(i,n,t),s<t.radius+.35&&Math.abs(n.pos.y-t.y)<1.4){if(t.armedAt==null||i.time-t.armedAt<zn)continue;let r=s>.05?(n.pos.x-t.x)/s:t.dir;ur(i,n,r*10+t.dir*4,2,4.5)}}}for(let t of i.hoppers){if(t.t+=e,!t.hopping&&t.t>t.period)if(t.armedAt==null&&(t.armedAt=i.time),t.glow=Math.min(1,(i.time-t.armedAt)/zn),i.player&&i.player.warnT==null&&(i.player.warnT=t.armedAt),i.time-t.armedAt<zn)t.glow=(i.time-t.armedAt)/zn;else{t.t=0,t.hopping=!0,t.armedAt=i.time-zn,t.vy=8;let n=t.homeX+Math.sin(i.time)*2.5,s=t.homeZ,r=12;for(let l of i.racers){if(l.seated)continue;let u=Math.hypot(l.pos.x-t.x,l.pos.z-t.z);u<r&&(r=u,n=l.pos.x,s=l.pos.z)}let o=n-t.x,a=s-t.z,c=Math.hypot(o,a)||1;t.dirx=o/c,t.dirz=a/c}if(t.hopping&&(t.vy-=18*e,t.y+=t.vy*e,t.x+=t.dirx*4.2*e,t.z+=t.dirz*4.2*e,t.y<=t.homeY)){t.y=t.homeY,t.hopping=!1;for(let n of i.racers){if(n.seated)continue;let s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);if(s<t.radius+2.8&&lr(i,n,t),s<t.radius+.55&&Math.abs(n.pos.y-t.y)<1.3){if(t.armedAt==null||i.time-t.armedAt<zn)continue;let r=s>.05?(n.pos.x-t.x)/s:1;ur(i,n,r*9,3,5)}}}}for(let t of i.flyers){t.ang+=e*.85,t.x=t.cx+Math.sin(t.ang)*t.span,t.z=t.cz+Math.cos(t.ang)*t.span*.45,t.y=t.cy+Math.sin(t.ang*2)*.7;for(let n of i.racers){if(n.seated)continue;Math.hypot(n.pos.x-t.x,n.pos.z-t.z)<t.radius+.4&&Math.abs(n.pos.y+.8-t.y)<1.1&&ur(i,n,Math.cos(t.ang)*8,Math.sin(t.ang)*6,3.4)}}}function gg(i,e){for(let t of i.platforms)if(t.prevX=t.x,t.prevZ=t.z,t.phase+=e*t.speed,t.axis==="x")t.x=t.originX+Math.sin(t.phase)*t.amp;else if(t.axis==="bob"||t.axis==="tilt")t.y=t.originY+Math.sin(t.phase)*t.amp;else if(t.axis==="seesaw"){let n=0,s=0,r=t.face||0;for(let a of i.racers){if(a.seated||a.eliminated||!a.grounded)continue;let c=a.pos.x-t.x,l=a.pos.z-t.z;if(c*c+l*l>t.radius*t.radius||Math.abs(a.pos.y-t.originY)>1.8)continue;let u=c*Math.cos(r)+l*Math.sin(r);n+=Math.max(-1,Math.min(1,u/(t.radius*.65))),s++}let o=s?n/s*.62:0;t.tilt=(t.tilt||0)+(o-(t.tilt||0))*Math.min(1,e*3.2),t.tilt=Math.max(-.5,Math.min(.5,t.tilt)),t.y=t.originY}}function xg(i,e){let t=i.cfg;if(i.time<t.collapseDelay)return;let n=i.course.ship.z-18,s=1+Math.min(2.4,(i.time||0)/45);i.collapseZ+=i.collapseSpeed*s*e,i.collapseZ>n&&(i.collapseZ=n),i.lavaY=t.lavaStartY+i.time*t.lavaRisePerSec;let r=!1;for(let o of i.course.chunks)if(!(o.zone==="ship"||o.gap)){if(o.state==="solid")i.collapseZ>o.z0&&(o.state="cracking",o.crackT=t.crackTime+o.jitter*.35,o.dirty=!0,r=!0);else if(o.state==="cracking"){if(o.crackT-=e,o.dirty=!0,o.crackT<=0){o.state="falling",o.fallT=t.fallTime;let a=(o.z0+o.z1)*.5,c=i.player.pos.z-a;c*c<420&&(i.shake=Math.max(i.shake,.42))}}else o.state==="falling"&&(o.fallT-=e,o.fallY-=(7+o.jitter*6)*s*e,o.dirty=!0,o.fallT<=0&&(o.state="gone"));o.ice&&(o.tilt=Math.sin(i.time*1.35+o.jitter*8)*.22)}r&&i.events.push({t:"crack"})}function bg(i,e){let t=null,n=2.1;for(let a of i.racers){if(a===e||a.seated||a.eliminated||a.qualified)continue;let c=Math.hypot(a.pos.x-e.pos.x,a.pos.z-e.pos.z);c<n&&Math.abs(a.pos.y-e.pos.y)<1.6&&(n=c,t=a)}if(t){let a=0;for(let l of i.racers)l!==e&&Math.hypot(l.pos.x-e.pos.x,l.pos.z-e.pos.z)<2.4&&a++;let c=a>=4;t.vel.x*=c?.85:.35,t.vel.z*=c?.85:.35,!c&&t.lockImmune<=0&&!t.isPlayer&&(t.controlLock=Math.min(.6,Math.max(t.controlLock,.25)),t.flail=Math.min(.6,Math.max(t.flail,.3))),t.pos.x+=(e.pos.x-t.pos.x)*.2,t.pos.z+=(e.pos.z-t.pos.z)*.2,i.events.push({t:"grab",id:e.id});return}let s=e.pos.x+Math.sin(e.yaw)*1.2,r=e.pos.z+Math.cos(e.yaw)*1.2,o=yi(i.course,s,r);if(o&&o.y>e.pos.y+.45&&o.y<e.pos.y+1.9){e.pos.x=s,e.pos.z=r,e.pos.y=o.y,e.vel.y=3.2,e.grounded=!0,i.events.push({t:"grab",id:e.id,ledge:!0});return}for(let a of i.crates||[])if(Math.hypot(a.x-e.pos.x,a.z-e.pos.z)<1.8&&Math.abs(a.y-e.pos.y)<2){a.x+=Math.sin(e.yaw)*1.1,a.z+=Math.cos(e.yaw)*1.1,a.vx+=Math.sin(e.yaw)*4,a.vz+=Math.cos(e.yaw)*4,i.events.push({t:"grab",id:e.id,prop:!0});return}}function yg(i){for(let e of i.crates||[]){e.vx*=.9,e.vz*=.9,e.x+=e.vx*.016,e.z+=e.vz*.016;let t=yi(i.course,e.x,e.z);t&&(e.y=t.y+.45);for(let n of i.racers){if(n.seated||n.eliminated)continue;let s=e.x-n.pos.x,r=e.z-n.pos.z,o=Math.hypot(s,r);if(o>1.15||o<.001||Math.abs((e.y||0)-n.pos.y)>1.8)continue;let a=s/o,c=r/o;e.vx+=n.vel.x*.4+a*1.5,e.vz+=n.vel.z*.4+c*1.5,e.x+=a*(1.15-o),e.z+=c*(1.15-o)}}}function vg(i,e){let t=null,n=[i.course.bumpers,i.spinners,i.sweepers,i.pendulums,i.rollers,i.hoppers];for(let s=0;s<n.length;s++){let r=n[s];if(r)for(let o=0;o<r.length;o++){let a=r[o],c=(a.z||0)-e.pos.z;if(c<-1||c>16)continue;let l=Math.hypot((a.x||0)-e.pos.x,c);(t==null||l<t)&&(t=l)}}return t}function _g(i,e){if(i.feel)for(let t=e;t<i.events.length;t++){let n=i.events[t];if(n.t!=="bump"||n.id!==i.player.id||!n.obstacle)continue;i.player.hitAt=i.time;let s=i.player.warnT==null?null:i.time-i.player.warnT;Cf(s)&&(i.feel.unfair++,cr(i.feel,i.player.pos.x,i.player.pos.z,"unfair"))}}function Nf(i){i.phase="results",i.result="out",i.player.seated=!1,i.events.push({t:"eliminated"}),i.feel&&(i.feel.dies++,cr(i.feel,i.player.pos.x,i.player.pos.z,"die"))}function Mg(i,e){if(e.pos.y<-6)return!1;let t=i.gate;if(!t)return!1;let n=t.rx||4.5,s=t.rz||1.4;if(Math.abs(e.pos.x-t.x)>n||Math.abs(e.pos.y-(t.y==null?0:t.y))>1.7)return!1;let r=e.prevZ==null?e.pos.z:e.prevZ,o=r<t.z&&e.pos.z>=t.z-.15,a=e.pos.z>=t.z-s&&e.pos.z<=t.z+s&&r<t.z;return o||a}function cl(i){i.phase="results",i.result=i.player.qualified?"qualified":"out",i.player.qualified||(i.player.seated=!1),i.events.push({t:i.player.qualified?"roundwin":"eliminated"})}function Sg(i){if(i.kind!=="survival"||i.phase!=="race")return;let e=i.racers.filter(t=>!t.eliminated&&!t.qualified);if(!(e.length>i.qualifyN||e.length===0)){for(let t of e)t.qualified=!0,i.qualCount++,i.events.push({t:"qualify",id:t.id});cl(i)}}function wg(i,e){if(i.kind!=="crown"||i.phase!=="race"||!i.crown)return;let t=i.crown,n=null,s=t.r*t.r;for(let r of i.racers){if(r.eliminated||r.qualified)continue;let o=r.pos.x-t.x,a=r.pos.z-t.z,c=o*o+a*a;c<=s&&Math.abs(r.pos.y-(t.y||0))<3.2&&(s=c,n=r)}i.crownHolder=n?n.id:-1;for(let r of i.racers)r===n?r.crownT=(r.crownT||0)+e:r.crownT=Math.max(0,(r.crownT||0)-e*.35),(r.crownT||0)>=5&&!r.qualified&&!r.eliminated&&(r.qualified=!0,r.crownT=0,i.qualCount++,i.events.push({t:"qualify",id:r.id}));i.qualifyN>0&&i.qualCount>=i.qualifyN&&cl(i)}function Eg(i){if(!(i.shipRound||i.phase!=="race")&&!(i.kind==="survival"||i.kind==="crown")&&!(!i.gate&&i.finishZ==null)){for(let e of i.racers)e.qualified||e.eliminated||e.seated||Mg(i,e)&&(e.qualified=!0,i.qualCount++,i.events.push({t:"qualify",id:e.id}));i.qualifyN>0&&i.qualCount>=i.qualifyN&&cl(i)}}function Tg(i){if(!i.shipRound||i.seatsFilled>=i.cfg.seats)return;let e=i.course.ship,t=i.cfg,n=[];for(let s of i.racers){if(s.seated||s.eliminated||!s.grounded)continue;let r=s.pos.x-e.x,o=s.pos.z-e.z;Math.abs(r)<t.boardHalfX&&o<t.boardZMax&&o>t.boardZMin&&Math.abs(s.pos.y-e.y)<1.8&&n.push({r:s,d:r*r+o*o})}n.sort((s,r)=>s.d-r.d||(s.r.isPlayer?-1:1)-(r.r.isPlayer?-1:1));for(let s of n){if(i.seatsFilled>=t.seats)break;let r=s.r,o=i.seatsFilled;i.seats[o]=r.id,i.seatsFilled++,r.seated=!0,r.seatIndex=o,r.vel.x=r.vel.y=r.vel.z=0,r.emote="cheer",r.isPlayer&&(i.seatCine=1.85),i.events.push({t:"seat",id:r.id,seat:o,pop:!0}),i.seatsFilled===t.seats-1&&!i.lastSeatEvent&&(i.lastSeatEvent=!0,i.events.push({t:"lastseat"}))}}function Df(i){if(!i.player.seated){Nf(i);return}i.phase="launch",i.launchT=0,i.launchV=1.5,i.seatCine=0,i.result="escaped",i.events.push({t:"launch"}),i.events.push({t:"escaped",time:i.time}),i.shake=.65}function Ag(i,e,t){if(!e.useAI||e.seated||e.eliminated||e.qualified)return;if(e.markZ==null){e.markX=e.pos.x,e.markZ=e.pos.z,e.stallT=0;return}if(Math.hypot(e.pos.x-e.markX,e.pos.z-e.markZ)>1.25||e.pos.z>e.markZ+.9){e.stallT=0,e.stallTries=0,e.markX=e.pos.x,e.markZ=e.pos.z;return}if(e.stallT=(e.stallT||0)+t,e.stallT<3)return;e.stallT=0,e.routeId=((e.routeId||0)+1)%3,e.wp=0;let s=i.course.routes&&i.course.routes[e.routeId]||i.course.waypoints;for(;e.wp<s.length-1&&s[e.wp].z<e.pos.z+1;)e.wp++;e.stallTries=(e.stallTries||0)+1,e.markX=e.pos.x,e.markZ=e.pos.z,e.stallTries>=2&&(e.stallTries=0,aa(i,e))}function kf(i,e,t){let n=i.cfg;if(i.events.length>80&&i.events.splice(0,i.events.length-80),i.phase==="countdown"){i.countClock+=e;let s=i.countClock<1?3:i.countClock<2?2:i.countClock<3?1:0;s!==i.countCue&&(i.countCue=s,i.events.push({t:s===0?"go":"tick",n:s})),i.countClock>=n.countdownBeats+n.goHold&&(i.phase="race",i.activated=!0,i.time=0);return}if(i.phase==="race"){let s=i.events.length;i.activated=!0,i.time+=e,i.seatCine>0&&(i.seatCine-=e),gg(i,e),xg(i,e);for(let a of i.racers)if(!(a.seated||a.eliminated))try{let c=a.isPlayer&&!a.useAI?t||{x:0,z:0,jump:!1,dive:!1}:fg(i,a,e);ug(i,a,c,e),Ag(i,a,e)}catch(c){a.controlLock=0,a.flail=0,a.grabT=0,i.fault||(i.fault=c&&c.message||String(c),i.events.push({t:"error",message:i.fault}))}dg(i);let r=i.course.coins;if(r){let a=i.player;for(let c=0;c<r.length;c++){let l=r[c];if(l.got||a.seated)continue;let u=a.pos.x-l.x,h=a.pos.z-l.z;u*u+h*h>1.6||Math.abs(a.pos.y+.8-l.y)>1.5||(l.got=!0,i.coins++,i.events.push({t:"coin",n:i.coins}))}}if(pg(i,e),mg(i,e),Tg(i),yg(i),i.kind==="survival"&&i.phase==="race"){let a=Math.sin(i.time*.7)*6;for(let c of i.racers)!c.eliminated&&!c.seated&&(c.vel.x+=a*e)}Eg(i),Sg(i),wg(i,e),_g(i,s);let o=Rg(i,i.player.pos.z);if(o&&o!==i.zoneId){i.zoneId=o;let a=i.course.zones.find(c=>c.id===o);a&&i.events.push({t:"zone",name:a.name})}i.phase==="race"&&i.shipRound&&i.forceLaunch&&i.player.seated?Df(i):i.phase==="race"&&i.shipRound&&(i.seatsFilled>=n.seats||i.time>=n.raceSeconds)?i.player.seated?Df(i):Nf(i):i.phase==="race"&&!i.shipRound&&i.time>=n.raceSeconds&&(i.phase="results",i.result=i.player.qualified?"qualified":"out",i.player.qualified||(i.player.seated=!1),i.events.push({t:i.player.qualified?"roundwin":"eliminated"})),i.shake>0&&(i.shake=Math.max(0,i.shake-e*1.5));return}(i.phase==="launch"||i.phase==="results"&&i.result==="escaped")&&(i.launchT+=e,i.launchV+=4.5*e,i.launchY+=i.launchV*e,i.shipY=i.course.ship.y+i.launchY,i.player.emote==="wave"&&(i.player.waveT=(i.player.waveT||0)+e,i.player.waveT>.7&&i.player.waveT<2.2&&(i.player.emote="cheer"),i.player.waveT>=2.2&&(i.player.emote="idle")),i.phase==="launch"&&i.launchT>1.25&&(i.phase="results"),i.shake>0&&(i.shake=Math.max(0,i.shake-e*.7)))}function Rg(i,e){let t=i.course.zones[0].id;for(let n of i.course.zones)e>=n.z0&&(t=n.id);return t}var nh="170";var Cg=0,Ff=1,Ig=2;var ip=1,ih=2,zi=3,Vn=0,nn=1,Lt=2,ls=0,Ur=1,Or=2,Of=3,Bf=4,Pg=5,Bs=100,Lg=101,Dg=102,zg=103,Ug=104,Ng=200,kg=201,Fg=202,Og=203,Gl=204,Vl=205,Bg=206,Hg=207,Gg=208,Vg=209,Wg=210,Xg=211,qg=212,Yg=213,jg=214,Wl=0,Xl=1,ql=2,Br=3,Yl=4,jl=5,Zl=6,Kl=7,sh=0,Zg=1,Kg=2,us=0,Jg=1,Qg=2,$g=3,rh=4,e0=5,t0=6,n0=7,Hf="attached",i0="detached",sp=300,Hr=301,Gr=302,Jl=303,Ql=304,_c=306,Gs=1e3,Ni=1001,Lo=1002,sn=1003,oh=1004;var Pr=1005;var _n=1006,Ro=1007;var $n=1008;var Oi=1009,rp=1010,op=1011,Do=1012,ah=1013,Vs=1014,pi=1015,Xo=1016,ch=1017,lh=1018,Vr=1020,ap=35902,cp=1021,lp=1022,ei=1023,up=1024,hp=1025,Nr=1026,Wr=1027,uh=1028,hh=1029,fp=1030,fh=1031;var dh=1033,Ba=33776,Ha=33777,Ga=33778,Va=33779,$l=35840,eu=35841,tu=35842,nu=35843,iu=36196,su=37492,ru=37496,ou=37808,au=37809,cu=37810,lu=37811,uu=37812,hu=37813,fu=37814,du=37815,pu=37816,mu=37817,gu=37818,xu=37819,bu=37820,yu=37821,Wa=36492,vu=36494,_u=36495,dp=36283,Mu=36284,Su=36285,wu=36286,ph=2200,mh=2201,s0=2202,Xr=2300,qr=2301,ll=2302,Lr=2400,Dr=2401,Xa=2402,gh=2500,r0=2501,pp=0,Mc=1,qo=2,o0=3200,a0=3201;var Sc=0,c0=1,Mi="",qt="srgb",hn="srgb-linear",wc="linear",Ut="srgb";var fr=7680;var Gf=519,l0=512,u0=513,h0=514,mp=515,f0=516,d0=517,p0=518,m0=519,Eu=35044,gp=35048;var Vf="300 es",ki=2e3,qa=2001,Bi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wf=1234567,Co=Math.PI/180,Yr=180/Math.PI;function mi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]+"-"+bn[e&255]+bn[e>>8&255]+"-"+bn[e>>16&15|64]+bn[e>>24&255]+"-"+bn[t&63|128]+bn[t>>8&255]+"-"+bn[t>>16&255]+bn[t>>24&255]+bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]).toLowerCase()}function vn(i,e,t){return Math.max(e,Math.min(t,i))}function xh(i,e){return(i%e+e)%e}function g0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function x0(i,e,t){return i!==e?(t-i)/(e-i):0}function Io(i,e,t){return(1-t)*i+t*e}function b0(i,e,t,n){return Io(i,e,1-Math.exp(-t*n))}function y0(i,e=1){return e-Math.abs(xh(i,e*2)-e)}function v0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function _0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function M0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function S0(i,e){return i+Math.random()*(e-i)}function w0(i){return i*(.5-Math.random())}function E0(i){i!==void 0&&(Wf=i);let e=Wf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function T0(i){return i*Co}function A0(i){return i*Yr}function R0(i){return(i&i-1)===0&&i!==0}function C0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function I0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function P0(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),p=r((n-e)/2),x=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*h,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*x,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*x,a*l);break;case"ZYZ":i.set(c*x,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function di(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var xp={DEG2RAD:Co,RAD2DEG:Yr,generateUUID:mi,clamp:vn,euclideanModulo:xh,mapLinear:g0,inverseLerp:x0,lerp:Io,damp:b0,pingpong:y0,smoothstep:v0,smootherstep:_0,randInt:M0,randFloat:S0,randFloatSpread:w0,seededRandom:E0,degToRad:T0,radToDeg:A0,isPowerOfTwo:R0,ceilPowerOfTwo:C0,floorPowerOfTwo:I0,setQuaternionFromProperEuler:P0,normalize:Pt,denormalize:di},Xe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(vn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ct=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],p=n[5],x=n[8],b=s[0],m=s[3],d=s[6],v=s[1],M=s[4],y=s[7],R=s[2],E=s[5],C=s[8];return r[0]=o*b+a*v+c*R,r[3]=o*m+a*M+c*E,r[6]=o*d+a*y+c*C,r[1]=l*b+u*v+h*R,r[4]=l*m+u*M+h*E,r[7]=l*d+u*y+h*C,r[2]=f*b+p*v+x*R,r[5]=f*m+p*M+x*E,r[8]=f*d+p*y+x*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*r,p=l*r-o*c,x=t*h+n*f+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/x;return e[0]=h*b,e[1]=(s*l-u*n)*b,e[2]=(a*n-s*o)*b,e[3]=f*b,e[4]=(u*t-s*c)*b,e[5]=(s*r-a*t)*b,e[6]=p*b,e[7]=(n*c-l*t)*b,e[8]=(o*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ul.makeScale(e,t)),this}rotate(e){return this.premultiply(ul.makeRotation(-e)),this}translate(e,t){return this.premultiply(ul.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ul=new ct;function bp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function zo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function L0(){let i=zo("canvas");return i.style.display="block",i}var Xf={};function To(i){i in Xf||(Xf[i]=!0,console.warn(i))}function D0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function z0(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function U0(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var yt={enabled:!0,workingColorSpace:hn,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Ut&&(i.r=Fi(i.r),i.g=Fi(i.g),i.b=Fi(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Ut&&(i.r=kr(i.r),i.g=kr(i.g),i.b=kr(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Mi?wc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Fi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function kr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var qf=[.64,.33,.3,.6,.15,.06],Yf=[.2126,.7152,.0722],jf=[.3127,.329],Zf=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kf=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);yt.define({[hn]:{primaries:qf,whitePoint:jf,transfer:wc,toXYZ:Zf,fromXYZ:Kf,luminanceCoefficients:Yf,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:qf,whitePoint:jf,transfer:Ut,toXYZ:Zf,fromXYZ:Kf,luminanceCoefficients:Yf,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}});var dr,Tu=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{dr===void 0&&(dr=zo("canvas")),dr.width=e.width,dr.height=e.height;let n=dr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=dr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=zo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Fi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Fi(t[n]/255)*255):t[n]=Fi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},N0=0,Ya=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=mi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(hl(s[o].image)):r.push(hl(s[o]))}else r=hl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function hl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Tu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var k0=0,ln=class i extends Bi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Ni,s=Ni,r=_n,o=$n,a=ei,c=Oi,l=i.DEFAULT_ANISOTROPY,u=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:k0++}),this.uuid=mi(),this.name="",this.source=new Ya(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gs:e.x=e.x-Math.floor(e.x);break;case Ni:e.x=e.x<0?0:1;break;case Lo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gs:e.y=e.y-Math.floor(e.y);break;case Ni:e.y=e.y<0?0:1;break;case Lo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=sp;ln.DEFAULT_ANISOTROPY=1;var Ct=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],p=c[5],x=c[9],b=c[2],m=c[6],d=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-b)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+b)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(l+1)/2,y=(p+1)/2,R=(d+1)/2,E=(u+f)/4,C=(h+b)/4,I=(x+m)/4;return M>y&&M>R?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=E/n,r=C/n):y>R?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=E/s,r=I/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=C/r,s=I/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-x)*(m-x)+(h-b)*(h-b)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-x)/v,this.y=(h-b)/v,this.z=(f-u)/v,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Au=class extends Bi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new ln(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Ya(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ti=class extends Au{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ja=class extends ln{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ru=class extends ln{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Un=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3],f=r[o+0],p=r[o+1],x=r[o+2],b=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=x,e[t+3]=b;return}if(h!==b||c!==f||l!==p||u!==x){let m=1-a,d=c*f+l*p+u*x+h*b,v=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){let R=Math.sqrt(M),E=Math.atan2(R,d*v);m=Math.sin(m*E)/R,a=Math.sin(a*E)/R}let y=a*v;if(c=c*m+f*y,l=l*m+p*y,u=u*m+x*y,h=h*m+b*y,m===1-a){let R=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=R,l*=R,u*=R,h*=R}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],f=r[o+1],p=r[o+2],x=r[o+3];return e[t]=a*x+u*h+c*p-l*f,e[t+1]=c*x+u*f+l*h-a*p,e[t+2]=l*x+u*p+a*f-c*h,e[t+3]=u*x-a*h-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),f=c(n/2),p=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*p*x,this._y=l*p*h-f*u*x,this._z=l*u*x+f*p*h,this._w=l*u*h-f*p*x;break;case"YXZ":this._x=f*u*h+l*p*x,this._y=l*p*h-f*u*x,this._z=l*u*x-f*p*h,this._w=l*u*h+f*p*x;break;case"ZXY":this._x=f*u*h-l*p*x,this._y=l*p*h+f*u*x,this._z=l*u*x+f*p*h,this._w=l*u*h-f*p*x;break;case"ZYX":this._x=f*u*h-l*p*x,this._y=l*p*h+f*u*x,this._z=l*u*x-f*p*h,this._w=l*u*h+f*p*x;break;case"YZX":this._x=f*u*h+l*p*x,this._y=l*p*h+f*u*x,this._z=l*u*x-f*p*h,this._w=l*u*h-f*p*x;break;case"XZY":this._x=f*u*h-l*p*x,this._y=l*p*h-f*u*x,this._z=l*u*x+f*p*h,this._w=l*u*h+f*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>h){let p=2*Math.sqrt(1+n-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>h){let p=2*Math.sqrt(1+a-n-h);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+h-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fl.copy(this).projectOnVector(e),this.sub(fl)}reflect(e){return this.sub(fl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(vn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},fl=new B,Jf=new Un,Jt=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ui.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ui.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ui.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ui):ui.fromBufferAttribute(r,o),ui.applyMatrix4(e.matrixWorld),this.expandByPoint(ui);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ua.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ua.copy(n.boundingBox)),ua.applyMatrix4(e.matrixWorld),this.union(ua)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ui),ui.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mo),ha.subVectors(this.max,mo),pr.subVectors(e.a,mo),mr.subVectors(e.b,mo),gr.subVectors(e.c,mo),ts.subVectors(mr,pr),ns.subVectors(gr,mr),Ds.subVectors(pr,gr);let t=[0,-ts.z,ts.y,0,-ns.z,ns.y,0,-Ds.z,Ds.y,ts.z,0,-ts.x,ns.z,0,-ns.x,Ds.z,0,-Ds.x,-ts.y,ts.x,0,-ns.y,ns.x,0,-Ds.y,Ds.x,0];return!dl(t,pr,mr,gr,ha)||(t=[1,0,0,0,1,0,0,0,1],!dl(t,pr,mr,gr,ha))?!1:(fa.crossVectors(ts,ns),t=[fa.x,fa.y,fa.z],dl(t,pr,mr,gr,ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ui).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ui).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Ri=[new B,new B,new B,new B,new B,new B,new B,new B],ui=new B,ua=new Jt,pr=new B,mr=new B,gr=new B,ts=new B,ns=new B,Ds=new B,mo=new B,ha=new B,fa=new B,zs=new B;function dl(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){zs.fromArray(i,r);let a=s.x*Math.abs(zs.x)+s.y*Math.abs(zs.y)+s.z*Math.abs(zs.z),c=e.dot(zs),l=t.dot(zs),u=n.dot(zs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var F0=new Jt,go=new B,pl=new B,Wn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):F0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;go.subVectors(e,this.center);let t=go.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(go,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(go.copy(e.center).add(pl)),this.expandByPoint(go.copy(e.center).sub(pl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ci=new B,ml=new B,da=new B,is=new B,gl=new B,pa=new B,xl=new B,Ws=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ci.copy(this.origin).addScaledVector(this.direction,t),Ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ml.copy(e).add(t).multiplyScalar(.5),da.copy(t).sub(e).normalize(),is.copy(this.origin).sub(ml);let r=e.distanceTo(t)*.5,o=-this.direction.dot(da),a=is.dot(this.direction),c=-is.dot(da),l=is.lengthSq(),u=Math.abs(1-o*o),h,f,p,x;if(u>0)if(h=o*c-a,f=o*a-c,x=r*u,h>=0)if(f>=-x)if(f<=x){let b=1/u;h*=b,f*=b,p=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;else f<=-x?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l):f<=x?(h=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ml).addScaledVector(da,f),p}intersectSphere(e,t){Ci.subVectors(e.center,this.origin);let n=Ci.dot(this.direction),s=Ci.dot(Ci)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ci)!==null}intersectTriangle(e,t,n,s,r){gl.subVectors(t,e),pa.subVectors(n,e),xl.crossVectors(gl,pa);let o=this.direction.dot(xl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;is.subVectors(this.origin,e);let c=a*this.direction.dot(pa.crossVectors(is,pa));if(c<0)return null;let l=a*this.direction.dot(gl.cross(is));if(l<0||c+l>o)return null;let u=-a*is.dot(xl);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ot=class i{constructor(e,t,n,s,r,o,a,c,l,u,h,f,p,x,b,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,h,f,p,x,b,m)}set(e,t,n,s,r,o,a,c,l,u,h,f,p,x,b,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=x,d[11]=b,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/xr.setFromMatrixColumn(e,0).length(),r=1/xr.setFromMatrixColumn(e,1).length(),o=1/xr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=o*u,p=o*h,x=a*u,b=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+x*l,t[5]=f-b*l,t[9]=-a*c,t[2]=b-f*l,t[6]=x+p*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,p=c*h,x=l*u,b=l*h;t[0]=f+b*a,t[4]=x*a-p,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-x,t[6]=b+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,p=c*h,x=l*u,b=l*h;t[0]=f-b*a,t[4]=-o*h,t[8]=x+p*a,t[1]=p+x*a,t[5]=o*u,t[9]=b-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,p=o*h,x=a*u,b=a*h;t[0]=c*u,t[4]=x*l-p,t[8]=f*l+b,t[1]=c*h,t[5]=b*l+f,t[9]=p*l-x,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,p=o*l,x=a*c,b=a*l;t[0]=c*u,t[4]=b-f*h,t[8]=x*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*h+x,t[10]=f-b*h}else if(e.order==="XZY"){let f=o*c,p=o*l,x=a*c,b=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+b,t[5]=o*u,t[9]=p*h-x,t[2]=x*h-p,t[6]=a*u,t[10]=b*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(O0,e,B0)}lookAt(e,t,n){let s=this.elements;return Hn.subVectors(e,t),Hn.lengthSq()===0&&(Hn.z=1),Hn.normalize(),ss.crossVectors(n,Hn),ss.lengthSq()===0&&(Math.abs(n.z)===1?Hn.x+=1e-4:Hn.z+=1e-4,Hn.normalize(),ss.crossVectors(n,Hn)),ss.normalize(),ma.crossVectors(Hn,ss),s[0]=ss.x,s[4]=ma.x,s[8]=Hn.x,s[1]=ss.y,s[5]=ma.y,s[9]=Hn.y,s[2]=ss.z,s[6]=ma.z,s[10]=Hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],p=n[13],x=n[2],b=n[6],m=n[10],d=n[14],v=n[3],M=n[7],y=n[11],R=n[15],E=s[0],C=s[4],I=s[8],_=s[12],S=s[1],U=s[5],F=s[9],G=s[13],q=s[2],j=s[6],K=s[10],ue=s[14],$=s[3],ve=s[7],we=s[11],Fe=s[15];return r[0]=o*E+a*S+c*q+l*$,r[4]=o*C+a*U+c*j+l*ve,r[8]=o*I+a*F+c*K+l*we,r[12]=o*_+a*G+c*ue+l*Fe,r[1]=u*E+h*S+f*q+p*$,r[5]=u*C+h*U+f*j+p*ve,r[9]=u*I+h*F+f*K+p*we,r[13]=u*_+h*G+f*ue+p*Fe,r[2]=x*E+b*S+m*q+d*$,r[6]=x*C+b*U+m*j+d*ve,r[10]=x*I+b*F+m*K+d*we,r[14]=x*_+b*G+m*ue+d*Fe,r[3]=v*E+M*S+y*q+R*$,r[7]=v*C+M*U+y*j+R*ve,r[11]=v*I+M*F+y*K+R*we,r[15]=v*_+M*G+y*ue+R*Fe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],p=e[14],x=e[3],b=e[7],m=e[11],d=e[15];return x*(+r*c*h-s*l*h-r*a*f+n*l*f+s*a*p-n*c*p)+b*(+t*c*p-t*l*f+r*o*f-s*o*p+s*l*u-r*c*u)+m*(+t*l*h-t*a*p-r*o*h+n*o*p+r*a*u-n*l*u)+d*(-s*a*u-t*c*h+t*a*f+s*o*h-n*o*f+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],p=e[11],x=e[12],b=e[13],m=e[14],d=e[15],v=h*m*l-b*f*l+b*c*p-a*m*p-h*c*d+a*f*d,M=x*f*l-u*m*l-x*c*p+o*m*p+u*c*d-o*f*d,y=u*b*l-x*h*l+x*a*p-o*b*p-u*a*d+o*h*d,R=x*h*c-u*b*c-x*a*f+o*b*f+u*a*m-o*h*m,E=t*v+n*M+s*y+r*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/E;return e[0]=v*C,e[1]=(b*f*r-h*m*r-b*s*p+n*m*p+h*s*d-n*f*d)*C,e[2]=(a*m*r-b*c*r+b*s*l-n*m*l-a*s*d+n*c*d)*C,e[3]=(h*c*r-a*f*r-h*s*l+n*f*l+a*s*p-n*c*p)*C,e[4]=M*C,e[5]=(u*m*r-x*f*r+x*s*p-t*m*p-u*s*d+t*f*d)*C,e[6]=(x*c*r-o*m*r-x*s*l+t*m*l+o*s*d-t*c*d)*C,e[7]=(o*f*r-u*c*r+u*s*l-t*f*l-o*s*p+t*c*p)*C,e[8]=y*C,e[9]=(x*h*r-u*b*r-x*n*p+t*b*p+u*n*d-t*h*d)*C,e[10]=(o*b*r-x*a*r+x*n*l-t*b*l-o*n*d+t*a*d)*C,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*p-t*a*p)*C,e[12]=R*C,e[13]=(u*b*s-x*h*s+x*n*f-t*b*f-u*n*m+t*h*m)*C,e[14]=(x*a*s-o*b*s-x*n*c+t*b*c+o*n*m-t*a*m)*C,e[15]=(o*h*s-u*a*s+u*n*c-t*h*c-o*n*f+t*a*f)*C,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,f=r*l,p=r*u,x=r*h,b=o*u,m=o*h,d=a*h,v=c*l,M=c*u,y=c*h,R=n.x,E=n.y,C=n.z;return s[0]=(1-(b+d))*R,s[1]=(p+y)*R,s[2]=(x-M)*R,s[3]=0,s[4]=(p-y)*E,s[5]=(1-(f+d))*E,s[6]=(m+v)*E,s[7]=0,s[8]=(x+M)*C,s[9]=(m-v)*C,s[10]=(1-(f+b))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=xr.set(s[0],s[1],s[2]).length(),o=xr.set(s[4],s[5],s[6]).length(),a=xr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],hi.copy(this);let l=1/r,u=1/o,h=1/a;return hi.elements[0]*=l,hi.elements[1]*=l,hi.elements[2]*=l,hi.elements[4]*=u,hi.elements[5]*=u,hi.elements[6]*=u,hi.elements[8]*=h,hi.elements[9]*=h,hi.elements[10]*=h,t.setFromRotationMatrix(hi),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=ki){let c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s),p,x;if(a===ki)p=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===qa)p=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ki){let c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(o-r),f=(t+e)*l,p=(n+s)*u,x,b;if(a===ki)x=(o+r)*h,b=-2*h;else if(a===qa)x=r*h,b=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=b,c[14]=-x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},xr=new B,hi=new ot,O0=new B(0,0,0),B0=new B(1,1,1),ss=new B,ma=new B,Hn=new B,Qf=new ot,$f=new Un,gi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(vn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-vn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(vn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-vn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(vn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-vn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Qf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $f.setFromEuler(this),this.setFromQuaternion($f,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gi.DEFAULT_ORDER="XYZ";var Uo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},H0=0,ed=new B,br=new Un,Ii=new ot,ga=new B,xo=new B,G0=new B,V0=new Un,td=new B(1,0,0),nd=new B(0,1,0),id=new B(0,0,1),sd={type:"added"},W0={type:"removed"},yr={type:"childadded",child:null},bl={type:"childremoved",child:null},ut=class i extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new gi,n=new Un,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new ct}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return br.setFromAxisAngle(e,t),this.quaternion.multiply(br),this}rotateOnWorldAxis(e,t){return br.setFromAxisAngle(e,t),this.quaternion.premultiply(br),this}rotateX(e){return this.rotateOnAxis(td,e)}rotateY(e){return this.rotateOnAxis(nd,e)}rotateZ(e){return this.rotateOnAxis(id,e)}translateOnAxis(e,t){return ed.copy(e).applyQuaternion(this.quaternion),this.position.add(ed.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(td,e)}translateY(e){return this.translateOnAxis(nd,e)}translateZ(e){return this.translateOnAxis(id,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ii.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ga.copy(e):ga.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),xo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ii.lookAt(xo,ga,this.up):Ii.lookAt(ga,xo,this.up),this.quaternion.setFromRotationMatrix(Ii),s&&(Ii.extractRotation(s.matrixWorld),br.setFromRotationMatrix(Ii),this.quaternion.premultiply(br.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sd),yr.child=e,this.dispatchEvent(yr),yr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(W0),bl.child=e,this.dispatchEvent(bl),bl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sd),yr.child=e,this.dispatchEvent(yr),yr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,e,G0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,V0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),x=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};ut.DEFAULT_UP=new B(0,1,0);ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fi=new B,Pi=new B,yl=new B,Li=new B,vr=new B,_r=new B,rd=new B,vl=new B,_l=new B,Ml=new B,Sl=new Ct,wl=new Ct,El=new Ct,as=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),fi.subVectors(e,t),s.cross(fi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){fi.subVectors(s,t),Pi.subVectors(n,t),yl.subVectors(e,t);let o=fi.dot(fi),a=fi.dot(Pi),c=fi.dot(yl),l=Pi.dot(Pi),u=Pi.dot(yl),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let f=1/h,p=(l*c-a*u)*f,x=(o*u-a*c)*f;return r.set(1-p-x,x,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Li)===null?!1:Li.x>=0&&Li.y>=0&&Li.x+Li.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Li)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Li.x),c.addScaledVector(o,Li.y),c.addScaledVector(a,Li.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Sl.setScalar(0),wl.setScalar(0),El.setScalar(0),Sl.fromBufferAttribute(e,t),wl.fromBufferAttribute(e,n),El.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Sl,r.x),o.addScaledVector(wl,r.y),o.addScaledVector(El,r.z),o}static isFrontFacing(e,t,n,s){return fi.subVectors(n,t),Pi.subVectors(e,t),fi.cross(Pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fi.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),fi.cross(Pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;vr.subVectors(s,n),_r.subVectors(r,n),vl.subVectors(e,n);let c=vr.dot(vl),l=_r.dot(vl);if(c<=0&&l<=0)return t.copy(n);_l.subVectors(e,s);let u=vr.dot(_l),h=_r.dot(_l);if(u>=0&&h<=u)return t.copy(s);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(vr,o);Ml.subVectors(e,r);let p=vr.dot(Ml),x=_r.dot(Ml);if(x>=0&&p<=x)return t.copy(r);let b=p*l-c*x;if(b<=0&&l>=0&&x<=0)return a=l/(l-x),t.copy(n).addScaledVector(_r,a);let m=u*x-p*h;if(m<=0&&h-u>=0&&p-x>=0)return rd.subVectors(r,s),a=(h-u)/(h-u+(p-x)),t.copy(s).addScaledVector(rd,a);let d=1/(m+b+f);return o=b*d,a=f*d,t.copy(n).addScaledVector(vr,o).addScaledVector(_r,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},yp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rs={h:0,s:0,l:0},xa={h:0,s:0,l:0};function Tl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ze=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=yt.workingColorSpace){return this.r=e,this.g=t,this.b=n,yt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=yt.workingColorSpace){if(e=xh(e,1),t=vn(t,0,1),n=vn(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Tl(o,r,e+1/3),this.g=Tl(o,r,e),this.b=Tl(o,r,e-1/3)}return yt.toWorkingColorSpace(this,s),this}setStyle(e,t=qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){let n=yp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=kr(e.r),this.g=kr(e.g),this.b=kr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return yt.fromWorkingColorSpace(yn.copy(this),e),Math.round(vn(yn.r*255,0,255))*65536+Math.round(vn(yn.g*255,0,255))*256+Math.round(vn(yn.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=yt.workingColorSpace){yt.fromWorkingColorSpace(yn.copy(this),t);let n=yn.r,s=yn.g,r=yn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=yt.workingColorSpace){return yt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=qt){yt.fromWorkingColorSpace(yn.copy(this),e);let t=yn.r,n=yn.g,s=yn.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(rs),this.setHSL(rs.h+e,rs.s+t,rs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(rs),e.getHSL(xa);let n=Io(rs.h,xa.h,t),s=Io(rs.s,xa.s,t),r=Io(rs.l,xa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},yn=new ze;ze.NAMES=yp;var X0=0,Mn=class extends Bi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=mi(),this.name="",this.blending=Ur,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gl,this.blendDst=Vl,this.blendEquation=Bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Br,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ur&&(n.blending=this.blending),this.side!==Vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Gl&&(n.blendSrc=this.blendSrc),this.blendDst!==Vl&&(n.blendDst=this.blendDst),this.blendEquation!==Bs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Br&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},tt=class extends Mn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.combine=sh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Kt=new B,ba=new Xe,Nt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Eu,this.updateRanges=[],this.gpuType=pi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ba.fromBufferAttribute(this,t),ba.applyMatrix3(e),this.setXY(t,ba.x,ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=di(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=di(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=di(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=di(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=di(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Eu&&(e.usage=this.usage),e}};var Za=class extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ka=class extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var gt=class extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}},q0=0,Qn=new ot,Al=new ut,Mr=new B,Gn=new Jt,bo=new Jt,cn=new B,Ot=class i extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:q0++}),this.uuid=mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bp(e)?Ka:Za)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ct().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qn.makeRotationFromQuaternion(e),this.applyMatrix4(Qn),this}rotateX(e){return Qn.makeRotationX(e),this.applyMatrix4(Qn),this}rotateY(e){return Qn.makeRotationY(e),this.applyMatrix4(Qn),this}rotateZ(e){return Qn.makeRotationZ(e),this.applyMatrix4(Qn),this}translate(e,t,n){return Qn.makeTranslation(e,t,n),this.applyMatrix4(Qn),this}scale(e,t,n){return Qn.makeScale(e,t,n),this.applyMatrix4(Qn),this}lookAt(e){return Al.lookAt(e),Al.updateMatrix(),this.applyMatrix4(Al.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gt(n,3))}else{for(let n=0,s=t.count;n<s;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Gn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Gn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Gn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Gn.min),this.boundingBox.expandByPoint(Gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(Gn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];bo.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(Gn.min,bo.min),Gn.expandByPoint(cn),cn.addVectors(Gn.max,bo.max),Gn.expandByPoint(cn)):(Gn.expandByPoint(bo.min),Gn.expandByPoint(bo.max))}Gn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(cn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)cn.fromBufferAttribute(a,l),c&&(Mr.fromBufferAttribute(e,l),cn.add(Mr)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new B,c[I]=new B;let l=new B,u=new B,h=new B,f=new Xe,p=new Xe,x=new Xe,b=new B,m=new B;function d(I,_,S){l.fromBufferAttribute(n,I),u.fromBufferAttribute(n,_),h.fromBufferAttribute(n,S),f.fromBufferAttribute(r,I),p.fromBufferAttribute(r,_),x.fromBufferAttribute(r,S),u.sub(l),h.sub(l),p.sub(f),x.sub(f);let U=1/(p.x*x.y-x.x*p.y);isFinite(U)&&(b.copy(u).multiplyScalar(x.y).addScaledVector(h,-p.y).multiplyScalar(U),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(U),a[I].add(b),a[_].add(b),a[S].add(b),c[I].add(m),c[_].add(m),c[S].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let I=0,_=v.length;I<_;++I){let S=v[I],U=S.start,F=S.count;for(let G=U,q=U+F;G<q;G+=3)d(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let M=new B,y=new B,R=new B,E=new B;function C(I){R.fromBufferAttribute(s,I),E.copy(R);let _=a[I];M.copy(_),M.sub(R.multiplyScalar(R.dot(_))).normalize(),y.crossVectors(E,_);let U=y.dot(c[I])<0?-1:1;o.setXYZW(I,M.x,M.y,M.z,U)}for(let I=0,_=v.length;I<_;++I){let S=v[I],U=S.start,F=S.count;for(let G=U,q=U+F;G<q;G+=3)C(e.getX(G+0)),C(e.getX(G+1)),C(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new B,r=new B,o=new B,a=new B,c=new B,l=new B,u=new B,h=new B;if(e)for(let f=0,p=e.count;f<p;f+=3){let x=e.getX(f+0),b=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,b),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,x),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u),p=0,x=0;for(let b=0,m=c.length;b<m;b++){a.isInterleavedBufferAttribute?p=c[b]*a.data.stride+a.offset:p=c[b]*u;for(let d=0;d<u;d++)f[x++]=l[p++]}return new Nt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){let f=l[u],p=e(f,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},od=new ot,Us=new Ws,ya=new Wn,ad=new B,va=new B,_a=new B,Ma=new B,Rl=new B,Sa=new B,cd=new B,wa=new B,ye=class extends ut{constructor(e=new Ot,t=new tt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Sa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],h=r[c];u!==0&&(Rl.fromBufferAttribute(h,e),o?Sa.addScaledVector(Rl,u):Sa.addScaledVector(Rl.sub(t),u))}t.add(Sa)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ya.copy(n.boundingSphere),ya.applyMatrix4(r),Us.copy(e.ray).recast(e.near),!(ya.containsPoint(Us.origin)===!1&&(Us.intersectSphere(ya,ad)===null||Us.origin.distanceToSquared(ad)>(e.far-e.near)**2))&&(od.copy(r).invert(),Us.copy(e.ray).applyMatrix4(od),!(n.boundingBox!==null&&Us.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Us)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,b=f.length;x<b;x++){let m=f[x],d=o[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,R=M;y<R;y+=3){let E=a.getX(y),C=a.getX(y+1),I=a.getX(y+2);s=Ea(this,d,e,n,l,u,h,E,C,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),b=Math.min(a.count,p.start+p.count);for(let m=x,d=b;m<d;m+=3){let v=a.getX(m),M=a.getX(m+1),y=a.getX(m+2);s=Ea(this,o,e,n,l,u,h,v,M,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,b=f.length;x<b;x++){let m=f[x],d=o[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,R=M;y<R;y+=3){let E=y,C=y+1,I=y+2;s=Ea(this,d,e,n,l,u,h,E,C,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=x,d=b;m<d;m+=3){let v=m,M=m+1,y=m+2;s=Ea(this,o,e,n,l,u,h,v,M,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Y0(i,e,t,n,s,r,o,a){let c;if(e.side===nn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Vn,a),c===null)return null;wa.copy(a),wa.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(wa);return l<t.near||l>t.far?null:{distance:l,point:wa.clone(),object:i}}function Ea(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,va),i.getVertexPosition(c,_a),i.getVertexPosition(l,Ma);let u=Y0(i,e,t,n,va,_a,Ma,cd);if(u){let h=new B;as.getBarycoord(cd,va,_a,Ma,h),s&&(u.uv=as.getInterpolatedAttribute(s,a,c,l,h,new Xe)),r&&(u.uv1=as.getInterpolatedAttribute(r,a,c,l,h,new Xe)),o&&(u.normal=as.getInterpolatedAttribute(o,a,c,l,h,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new B,materialIndex:0};as.getNormal(va,_a,Ma,f.normal),u.face=f,u.barycoord=h}return u}var Nn=class i extends Ot{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],h=[],f=0,p=0;x("z","y","x",-1,-1,n,t,e,o,r,0),x("z","y","x",1,-1,n,t,-e,o,r,1),x("x","z","y",1,1,e,n,t,s,o,2),x("x","z","y",1,-1,e,n,-t,s,o,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(h,2));function x(b,m,d,v,M,y,R,E,C,I,_){let S=y/C,U=R/I,F=y/2,G=R/2,q=E/2,j=C+1,K=I+1,ue=0,$=0,ve=new B;for(let we=0;we<K;we++){let Fe=we*U-G;for(let Ke=0;Ke<j;Ke++){let pt=Ke*S-F;ve[b]=pt*v,ve[m]=Fe*M,ve[d]=q,l.push(ve.x,ve.y,ve.z),ve[b]=0,ve[m]=0,ve[d]=E>0?1:-1,u.push(ve.x,ve.y,ve.z),h.push(Ke/C),h.push(1-we/I),ue+=1}}for(let we=0;we<I;we++)for(let Fe=0;Fe<C;Fe++){let Ke=f+Fe+j*we,pt=f+Fe+j*(we+1),se=f+(Fe+1)+j*(we+1),D=f+(Fe+1)+j*we;c.push(Ke,pt,D),c.push(pt,se,D),$+=6}a.addGroup(p,$,_),p+=$,f+=ue}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function jr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Tn(i){let e={};for(let t=0;t<i.length;t++){let n=jr(i[t]);for(let s in n)e[s]=n[s]}return e}function j0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vp(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:yt.workingColorSpace}var Z0={clone:jr,merge:Tn},K0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,J0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qt=class extends Mn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=K0,this.fragmentShader=J0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=jr(e.uniforms),this.uniformsGroups=j0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ja=class extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=ki}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},os=new B,ld=new Xe,ud=new Xe,tn=class extends Ja{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Co*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yr*2*Math.atan(Math.tan(Co*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(os.x,os.y).multiplyScalar(-e/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(os.x,os.y).multiplyScalar(-e/os.z)}getViewSize(e,t){return this.getViewBounds(e,ld,ud),t.subVectors(ud,ld)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Co*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Sr=-90,wr=1,Cu=class extends ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new tn(Sr,wr,e,t);s.layers=this.layers,this.add(s);let r=new tn(Sr,wr,e,t);r.layers=this.layers,this.add(r);let o=new tn(Sr,wr,e,t);o.layers=this.layers,this.add(o);let a=new tn(Sr,wr,e,t);a.layers=this.layers,this.add(a);let c=new tn(Sr,wr,e,t);c.layers=this.layers,this.add(c);let l=new tn(Sr,wr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===ki)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===qa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,p),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},Qa=class extends ln{constructor(e,t,n,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Hr,super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Iu=class extends ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Qa(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:_n}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Nn(5,5,5),r=new Qt({name:"CubemapFromEquirect",uniforms:jr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:ls});r.uniforms.tEquirect.value=t;let o=new ye(s,r),a=t.minFilter;return t.minFilter===$n&&(t.minFilter=_n),new Cu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Cl=new B,Q0=new B,$0=new ct,Ui=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Cl.subVectors(n,t).cross(Q0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Cl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||$0.getNormalMatrix(e),s=this.coplanarPoint(Cl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ns=new Wn,Ta=new B,No=class{constructor(e=new Ui,t=new Ui,n=new Ui,s=new Ui,r=new Ui,o=new Ui){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ki){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],h=s[6],f=s[7],p=s[8],x=s[9],b=s[10],m=s[11],d=s[12],v=s[13],M=s[14],y=s[15];if(n[0].setComponents(c-r,f-l,m-p,y-d).normalize(),n[1].setComponents(c+r,f+l,m+p,y+d).normalize(),n[2].setComponents(c+o,f+u,m+x,y+v).normalize(),n[3].setComponents(c-o,f-u,m-x,y-v).normalize(),n[4].setComponents(c-a,f-h,m-b,y-M).normalize(),t===ki)n[5].setComponents(c+a,f+h,m+b,y+M).normalize();else if(t===qa)n[5].setComponents(a,h,b,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ns)}intersectsSprite(e){return Ns.center.set(0,0,0),Ns.radius=.7071067811865476,Ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ns)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ta.x=s.normal.x>0?e.max.x:e.min.x,Ta.y=s.normal.y>0?e.max.y:e.min.y,Ta.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ta)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function _p(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ex(i){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){let u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((p,x)=>p.start-x.start);let f=0;for(let p=1;p<h.length;p++){let x=h[f],b=h[p];b.start<=x.start+x.count+1?x.count=Math.max(x.count,b.start+b.count-x.start):(++f,h[f]=b)}h.length=f+1;for(let p=0,x=h.length;p<x;p++){let b=h[p];i.bufferSubData(l,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var xi=class i extends Ot{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=e/a,f=t/c,p=[],x=[],b=[],m=[];for(let d=0;d<u;d++){let v=d*f-o;for(let M=0;M<l;M++){let y=M*h-r;x.push(y,-v,0),b.push(0,0,1),m.push(M/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<a;v++){let M=v+l*d,y=v+l*(d+1),R=v+1+l*(d+1),E=v+1+l*d;p.push(M,y,E),p.push(y,R,E)}this.setIndex(p),this.setAttribute("position",new gt(x,3)),this.setAttribute("normal",new gt(b,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},tx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nx=`#ifdef USE_ALPHAHASH
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
#endif`,ix=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ox=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ax=`#ifdef USE_AOMAP
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
#endif`,cx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lx=`#ifdef USE_BATCHING
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
#endif`,ux=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,px=`#ifdef USE_IRIDESCENCE
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
#endif`,mx=`#ifdef USE_BUMPMAP
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
#endif`,gx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_x=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Sx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,wx=`#define PI 3.141592653589793
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
} // validated`,Ex=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Tx=`vec3 transformedNormal = objectNormal;
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
#endif`,Ax=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ix=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Px="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dx=`#ifdef USE_ENVMAP
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
#endif`,zx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ux=`#ifdef USE_ENVMAP
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
#endif`,Nx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kx=`#ifdef USE_ENVMAP
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
#endif`,Fx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ox=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gx=`#ifdef USE_GRADIENTMAP
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
}`,Vx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qx=`uniform bool receiveShadow;
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
#endif`,Yx=`#ifdef USE_ENVMAP
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
#endif`,jx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qx=`PhysicalMaterial material;
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
#endif`,$x=`struct PhysicalMaterial {
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
}`,eb=`
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
#endif`,tb=`#if defined( RE_IndirectDiffuse )
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
#endif`,nb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ib=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sb=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ob=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ab=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ub=`#if defined( USE_POINTS_UV )
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
#endif`,hb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,db=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gb=`#ifdef USE_MORPHTARGETS
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
#endif`,xb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_b=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sb=`#ifdef USE_NORMALMAP
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
#endif`,wb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Eb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ab=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ib=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Db=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ub=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ob=`float getShadowMask() {
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
}`,Bb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hb=`#ifdef USE_SKINNING
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
#endif`,Gb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vb=`#ifdef USE_SKINNING
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
#endif`,Wb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jb=`#ifdef USE_TRANSMISSION
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
#endif`,Zb=`#ifdef USE_TRANSMISSION
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
#endif`,Kb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$b=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ey=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ty=`uniform sampler2D t2D;
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
}`,ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ry=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oy=`#include <common>
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
}`,ay=`#if DEPTH_PACKING == 3200
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
}`,cy=`#define DISTANCE
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
}`,ly=`#define DISTANCE
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
}`,uy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fy=`uniform float scale;
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
}`,dy=`uniform vec3 diffuse;
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
}`,py=`#include <common>
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
}`,my=`uniform vec3 diffuse;
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
}`,gy=`#define LAMBERT
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
}`,xy=`#define LAMBERT
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
}`,by=`#define MATCAP
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
}`,yy=`#define MATCAP
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
}`,vy=`#define NORMAL
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
}`,_y=`#define NORMAL
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
}`,My=`#define PHONG
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
}`,Sy=`#define PHONG
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
}`,wy=`#define STANDARD
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
}`,Ey=`#define STANDARD
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
}`,Ty=`#define TOON
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
}`,Ay=`#define TOON
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
}`,Ry=`uniform float size;
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
}`,Cy=`uniform vec3 diffuse;
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
}`,Iy=`#include <common>
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
}`,Py=`uniform vec3 color;
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
}`,Ly=`uniform float rotation;
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
}`,Dy=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:tx,alphahash_pars_fragment:nx,alphamap_fragment:ix,alphamap_pars_fragment:sx,alphatest_fragment:rx,alphatest_pars_fragment:ox,aomap_fragment:ax,aomap_pars_fragment:cx,batching_pars_vertex:lx,batching_vertex:ux,begin_vertex:hx,beginnormal_vertex:fx,bsdfs:dx,iridescence_fragment:px,bumpmap_pars_fragment:mx,clipping_planes_fragment:gx,clipping_planes_pars_fragment:xx,clipping_planes_pars_vertex:bx,clipping_planes_vertex:yx,color_fragment:vx,color_pars_fragment:_x,color_pars_vertex:Mx,color_vertex:Sx,common:wx,cube_uv_reflection_fragment:Ex,defaultnormal_vertex:Tx,displacementmap_pars_vertex:Ax,displacementmap_vertex:Rx,emissivemap_fragment:Cx,emissivemap_pars_fragment:Ix,colorspace_fragment:Px,colorspace_pars_fragment:Lx,envmap_fragment:Dx,envmap_common_pars_fragment:zx,envmap_pars_fragment:Ux,envmap_pars_vertex:Nx,envmap_physical_pars_fragment:Yx,envmap_vertex:kx,fog_vertex:Fx,fog_pars_vertex:Ox,fog_fragment:Bx,fog_pars_fragment:Hx,gradientmap_pars_fragment:Gx,lightmap_pars_fragment:Vx,lights_lambert_fragment:Wx,lights_lambert_pars_fragment:Xx,lights_pars_begin:qx,lights_toon_fragment:jx,lights_toon_pars_fragment:Zx,lights_phong_fragment:Kx,lights_phong_pars_fragment:Jx,lights_physical_fragment:Qx,lights_physical_pars_fragment:$x,lights_fragment_begin:eb,lights_fragment_maps:tb,lights_fragment_end:nb,logdepthbuf_fragment:ib,logdepthbuf_pars_fragment:sb,logdepthbuf_pars_vertex:rb,logdepthbuf_vertex:ob,map_fragment:ab,map_pars_fragment:cb,map_particle_fragment:lb,map_particle_pars_fragment:ub,metalnessmap_fragment:hb,metalnessmap_pars_fragment:fb,morphinstance_vertex:db,morphcolor_vertex:pb,morphnormal_vertex:mb,morphtarget_pars_vertex:gb,morphtarget_vertex:xb,normal_fragment_begin:bb,normal_fragment_maps:yb,normal_pars_fragment:vb,normal_pars_vertex:_b,normal_vertex:Mb,normalmap_pars_fragment:Sb,clearcoat_normal_fragment_begin:wb,clearcoat_normal_fragment_maps:Eb,clearcoat_pars_fragment:Tb,iridescence_pars_fragment:Ab,opaque_fragment:Rb,packing:Cb,premultiplied_alpha_fragment:Ib,project_vertex:Pb,dithering_fragment:Lb,dithering_pars_fragment:Db,roughnessmap_fragment:zb,roughnessmap_pars_fragment:Ub,shadowmap_pars_fragment:Nb,shadowmap_pars_vertex:kb,shadowmap_vertex:Fb,shadowmask_pars_fragment:Ob,skinbase_vertex:Bb,skinning_pars_vertex:Hb,skinning_vertex:Gb,skinnormal_vertex:Vb,specularmap_fragment:Wb,specularmap_pars_fragment:Xb,tonemapping_fragment:qb,tonemapping_pars_fragment:Yb,transmission_fragment:jb,transmission_pars_fragment:Zb,uv_pars_fragment:Kb,uv_pars_vertex:Jb,uv_vertex:Qb,worldpos_vertex:$b,background_vert:ey,background_frag:ty,backgroundCube_vert:ny,backgroundCube_frag:iy,cube_vert:sy,cube_frag:ry,depth_vert:oy,depth_frag:ay,distanceRGBA_vert:cy,distanceRGBA_frag:ly,equirect_vert:uy,equirect_frag:hy,linedashed_vert:fy,linedashed_frag:dy,meshbasic_vert:py,meshbasic_frag:my,meshlambert_vert:gy,meshlambert_frag:xy,meshmatcap_vert:by,meshmatcap_frag:yy,meshnormal_vert:vy,meshnormal_frag:_y,meshphong_vert:My,meshphong_frag:Sy,meshphysical_vert:wy,meshphysical_frag:Ey,meshtoon_vert:Ty,meshtoon_frag:Ay,points_vert:Ry,points_frag:Cy,shadow_vert:Iy,shadow_frag:Py,sprite_vert:Ly,sprite_frag:Dy},Me={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},_i={basic:{uniforms:Tn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:Tn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new ze(0)}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:Tn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:Tn([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:Tn([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new ze(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:Tn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:Tn([Me.points,Me.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:Tn([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:Tn([Me.common,Me.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:Tn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:Tn([Me.sprite,Me.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distanceRGBA:{uniforms:Tn([Me.common,Me.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distanceRGBA_vert,fragmentShader:lt.distanceRGBA_frag},shadow:{uniforms:Tn([Me.lights,Me.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};_i.physical={uniforms:Tn([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};var Aa={r:0,b:0,g:0},ks=new gi,zy=new ot;function Uy(i,e,t,n,s,r,o){let a=new ze(0),c=r===!0?0:1,l,u,h=null,f=0,p=null;function x(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?t:e).get(M)),M}function b(v){let M=!1,y=x(v);y===null?d(a,c):y&&y.isColor&&(d(y,1),M=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,M){let y=x(M);y&&(y.isCubeTexture||y.mapping===_c)?(u===void 0&&(u=new ye(new Nn(1,1,1),new Qt({name:"BackgroundCubeMaterial",uniforms:jr(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ks.copy(M.backgroundRotation),ks.x*=-1,ks.y*=-1,ks.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ks.y*=-1,ks.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(zy.makeRotationFromEuler(ks)),u.material.toneMapped=yt.getTransfer(y.colorSpace)!==Ut,(h!==y||f!==y.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=y,f=y.version,p=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ye(new xi(2,2),new Qt({name:"BackgroundMaterial",uniforms:jr(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=yt.getTransfer(y.colorSpace)!==Ut,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,p=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function d(v,M){v.getRGB(Aa,vp(i)),n.buffers.color.setClear(Aa.r,Aa.g,Aa.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),c=M,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,d(a,c)},render:b,addToRenderList:m}}function Ny(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(S,U,F,G,q){let j=!1,K=h(G,F,U);r!==K&&(r=K,l(r.object)),j=p(S,G,F,q),j&&x(S,G,F,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,y(S,U,F,G),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function h(S,U,F){let G=F.wireframe===!0,q=n[S.id];q===void 0&&(q={},n[S.id]=q);let j=q[U.id];j===void 0&&(j={},q[U.id]=j);let K=j[G];return K===void 0&&(K=f(c()),j[G]=K),K}function f(S){let U=[],F=[],G=[];for(let q=0;q<t;q++)U[q]=0,F[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:F,attributeDivisors:G,object:S,attributes:{},index:null}}function p(S,U,F,G){let q=r.attributes,j=U.attributes,K=0,ue=F.getAttributes();for(let $ in ue)if(ue[$].location>=0){let we=q[$],Fe=j[$];if(Fe===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(Fe=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(Fe=S.instanceColor)),we===void 0||we.attribute!==Fe||Fe&&we.data!==Fe.data)return!0;K++}return r.attributesNum!==K||r.index!==G}function x(S,U,F,G){let q={},j=U.attributes,K=0,ue=F.getAttributes();for(let $ in ue)if(ue[$].location>=0){let we=j[$];we===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(we=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(we=S.instanceColor));let Fe={};Fe.attribute=we,we&&we.data&&(Fe.data=we.data),q[$]=Fe,K++}r.attributes=q,r.attributesNum=K,r.index=G}function b(){let S=r.newAttributes;for(let U=0,F=S.length;U<F;U++)S[U]=0}function m(S){d(S,0)}function d(S,U){let F=r.newAttributes,G=r.enabledAttributes,q=r.attributeDivisors;F[S]=1,G[S]===0&&(i.enableVertexAttribArray(S),G[S]=1),q[S]!==U&&(i.vertexAttribDivisor(S,U),q[S]=U)}function v(){let S=r.newAttributes,U=r.enabledAttributes;for(let F=0,G=U.length;F<G;F++)U[F]!==S[F]&&(i.disableVertexAttribArray(F),U[F]=0)}function M(S,U,F,G,q,j,K){K===!0?i.vertexAttribIPointer(S,U,F,q,j):i.vertexAttribPointer(S,U,F,G,q,j)}function y(S,U,F,G){b();let q=G.attributes,j=F.getAttributes(),K=U.defaultAttributeValues;for(let ue in j){let $=j[ue];if($.location>=0){let ve=q[ue];if(ve===void 0&&(ue==="instanceMatrix"&&S.instanceMatrix&&(ve=S.instanceMatrix),ue==="instanceColor"&&S.instanceColor&&(ve=S.instanceColor)),ve!==void 0){let we=ve.normalized,Fe=ve.itemSize,Ke=e.get(ve);if(Ke===void 0)continue;let pt=Ke.buffer,se=Ke.type,D=Ke.bytesPerElement,k=se===i.INT||se===i.UNSIGNED_INT||ve.gpuType===ah;if(ve.isInterleavedBufferAttribute){let Z=ve.data,he=Z.stride,me=ve.offset;if(Z.isInstancedInterleavedBuffer){for(let Ce=0;Ce<$.locationSize;Ce++)d($.location+Ce,Z.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Ce=0;Ce<$.locationSize;Ce++)m($.location+Ce);i.bindBuffer(i.ARRAY_BUFFER,pt);for(let Ce=0;Ce<$.locationSize;Ce++)M($.location+Ce,Fe/$.locationSize,se,we,he*D,(me+Fe/$.locationSize*Ce)*D,k)}else{if(ve.isInstancedBufferAttribute){for(let Z=0;Z<$.locationSize;Z++)d($.location+Z,ve.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Z=0;Z<$.locationSize;Z++)m($.location+Z);i.bindBuffer(i.ARRAY_BUFFER,pt);for(let Z=0;Z<$.locationSize;Z++)M($.location+Z,Fe/$.locationSize,se,we,Fe*D,Fe/$.locationSize*Z*D,k)}}else if(K!==void 0){let we=K[ue];if(we!==void 0)switch(we.length){case 2:i.vertexAttrib2fv($.location,we);break;case 3:i.vertexAttrib3fv($.location,we);break;case 4:i.vertexAttrib4fv($.location,we);break;default:i.vertexAttrib1fv($.location,we)}}}}v()}function R(){I();for(let S in n){let U=n[S];for(let F in U){let G=U[F];for(let q in G)u(G[q].object),delete G[q];delete U[F]}delete n[S]}}function E(S){if(n[S.id]===void 0)return;let U=n[S.id];for(let F in U){let G=U[F];for(let q in G)u(G[q].object),delete G[q];delete U[F]}delete n[S.id]}function C(S){for(let U in n){let F=n[U];if(F[S.id]===void 0)continue;let G=F[S.id];for(let q in G)u(G[q].object),delete G[q];delete F[S.id]}}function I(){_(),o=!0,r!==s&&(r=s,l(r.object))}function _(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:_,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:b,enableAttribute:m,disableUnusedAttributes:v}}function ky(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let x=0;x<h;x++)p+=u[x];t.update(p,n,1)}function c(l,u,h,f){if(h===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<l.length;x++)o(l[x],u[x],f[x]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let x=0;for(let b=0;b<h;b++)x+=u[b]*f[b];t.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Fy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==ei&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let I=C===Xo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Oi&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==pi&&!I)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=x>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:x,maxTextureSize:b,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:R,maxSamples:E}}function Oy(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Ui,a=new ct,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let p=h.length!==0||f||n!==0||s;return s=f,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,p){let x=h.clippingPlanes,b=h.clipIntersection,m=h.clipShadows,d=i.get(h);if(!s||x===null||x.length===0||r&&!m)r?u(null):l();else{let v=r?0:n,M=v*4,y=d.clippingState||null;c.value=y,y=u(x,f,M,p);for(let R=0;R!==M;++R)y[R]=t[R];d.clippingState=y,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,p,x){let b=h!==null?h.length:0,m=null;if(b!==0){if(m=c.value,x!==!0||m===null){let d=p+b*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,y=p;M!==b;++M,y+=4)o.copy(h[M]).applyMatrix4(v,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}function By(i){let e=new WeakMap;function t(o,a){return a===Jl?o.mapping=Hr:a===Ql&&(o.mapping=Gr),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Jl||a===Ql)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Iu(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var hs=class extends Ja{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},zr=4,hd=[.125,.215,.35,.446,.526,.582],Hs=20,Il=new hs,fd=new ze,Pl=null,Ll=0,Dl=0,zl=!1,Os=(1+Math.sqrt(5))/2,Er=1/Os,dd=[new B(-Os,Er,0),new B(Os,Er,0),new B(-Er,0,Os),new B(Er,0,Os),new B(0,Os,-Er),new B(0,Os,Er),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)],$a=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Pl=this._renderer.getRenderTarget(),Ll=this._renderer.getActiveCubeFace(),Dl=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=md(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pl,Ll,Dl),this._renderer.xr.enabled=zl,e.scissorTest=!1,Ra(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hr||e.mapping===Gr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pl=this._renderer.getRenderTarget(),Ll=this._renderer.getActiveCubeFace(),Dl=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Xo,format:ei,colorSpace:hn,depthBuffer:!1},s=pd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=pd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hy(r)),this._blurMaterial=Gy(r,e,t)}return s}_compileMaterial(e){let t=new ye(this._lodPlanes[0],e);this._renderer.compile(t,Il)}_sceneToCubeUV(e,t,n,s){let a=new tn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(fd),u.toneMapping=us,u.autoClear=!1;let p=new tt({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),x=new ye(new Nn,p),b=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,b=!0):(p.color.copy(fd),b=!0);for(let d=0;d<6;d++){let v=d%3;v===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):v===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));let M=this._cubeSize;Ra(s,v*M,d>2?M:0,M,M),u.setRenderTarget(s),b&&u.render(x,a),u.render(e,a)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Hr||e.mapping===Gr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=md());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ye(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Ra(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Il)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=dd[(s-r-1)%dd.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new ye(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Hs-1),b=r/x,m=isFinite(r)?1+Math.floor(u*b):Hs;m>Hs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hs}`);let d=[],v=0;for(let C=0;C<Hs;++C){let I=C/b,_=Math.exp(-I*I/2);d.push(_),C===0?v+=_:C<m&&(v+=2*_)}for(let C=0;C<d.length;C++)d[C]=d[C]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:M}=this;f.dTheta.value=x,f.mipInt.value=M-n;let y=this._sizeLods[s],R=3*y*(s>M-zr?s-M+zr:0),E=4*(this._cubeSize-y);Ra(t,R,E,3*y,2*y),c.setRenderTarget(t),c.render(h,Il)}};function Hy(i){let e=[],t=[],n=[],s=i,r=i-zr+1+hd.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-zr?c=hd[o-i+zr-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,x=6,b=3,m=2,d=1,v=new Float32Array(b*x*p),M=new Float32Array(m*x*p),y=new Float32Array(d*x*p);for(let E=0;E<p;E++){let C=E%3*2/3-1,I=E>2?0:-1,_=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];v.set(_,b*x*E),M.set(f,m*x*E);let S=[E,E,E,E,E,E];y.set(S,d*x*E)}let R=new Ot;R.setAttribute("position",new Nt(v,b)),R.setAttribute("uv",new Nt(M,m)),R.setAttribute("faceIndex",new Nt(y,d)),e.push(R),s>zr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function pd(i,e,t){let n=new ti(i,e,t);return n.texture.mapping=_c,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ra(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Gy(i,e,t){let n=new Float32Array(Hs),s=new B(0,1,0);return new Qt({name:"SphericalGaussianBlur",defines:{n:Hs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:bh(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function md(){return new Qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bh(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function gd(){return new Qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ls,depthTest:!1,depthWrite:!1})}function bh(){return`

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
	`}function Vy(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Jl||c===Ql,u=c===Hr||c===Gr;if(l||u){let h=e.get(a),f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new $a(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let p=a.image;return l&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new $a(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Wy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&To("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Xy(i,e,t,n){let s={},r=new WeakMap;function o(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let x in f.attributes)e.remove(f.attributes[x]);for(let x in f.morphAttributes){let b=f.morphAttributes[x];for(let m=0,d=b.length;m<d;m++)e.remove(b[m])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(h){let f=h.attributes;for(let x in f)e.update(f[x],i.ARRAY_BUFFER);let p=h.morphAttributes;for(let x in p){let b=p[x];for(let m=0,d=b.length;m<d;m++)e.update(b[m],i.ARRAY_BUFFER)}}function l(h){let f=[],p=h.index,x=h.attributes.position,b=0;if(p!==null){let v=p.array;b=p.version;for(let M=0,y=v.length;M<y;M+=3){let R=v[M+0],E=v[M+1],C=v[M+2];f.push(R,E,E,C,C,R)}}else if(x!==void 0){let v=x.array;b=x.version;for(let M=0,y=v.length/3-1;M<y;M+=3){let R=M+0,E=M+1,C=M+2;f.push(R,E,E,C,C,R)}}else return;let m=new(bp(f)?Ka:Za)(f,1);m.version=b;let d=r.get(h);d&&e.remove(d),r.set(h,m)}function u(h){let f=r.get(h);if(f){let p=h.index;p!==null&&f.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function qy(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*o),t.update(p,n,1)}function l(f,p,x){x!==0&&(i.drawElementsInstanced(n,p,r,f*o,x),t.update(p,n,x))}function u(f,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,x);let m=0;for(let d=0;d<x;d++)m+=p[d];t.update(m,n,1)}function h(f,p,x,b){if(x===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/o,p[d],b[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,b,0,x);let d=0;for(let v=0;v<x;v++)d+=p[v]*b[v];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Yy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function jy(i,e,t){let n=new WeakMap,s=new Ct;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,f=n.get(a);if(f===void 0||f.count!==h){let _=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",_)};f!==void 0&&f.texture.dispose();let p=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],M=0;p===!0&&(M=1),x===!0&&(M=2),b===!0&&(M=3);let y=a.attributes.position.count*M,R=1;y>e.maxTextureSize&&(R=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let E=new Float32Array(y*R*4*h),C=new ja(E,y,R,h);C.type=pi,C.needsUpdate=!0;let I=M*4;for(let S=0;S<h;S++){let U=m[S],F=d[S],G=v[S],q=y*R*4*S;for(let j=0;j<U.count;j++){let K=j*I;p===!0&&(s.fromBufferAttribute(U,j),E[q+K+0]=s.x,E[q+K+1]=s.y,E[q+K+2]=s.z,E[q+K+3]=0),x===!0&&(s.fromBufferAttribute(F,j),E[q+K+4]=s.x,E[q+K+5]=s.y,E[q+K+6]=s.z,E[q+K+7]=0),b===!0&&(s.fromBufferAttribute(G,j),E[q+K+8]=s.x,E[q+K+9]=s.y,E[q+K+10]=s.z,E[q+K+11]=G.itemSize===4?s.w:1)}}f={count:h,texture:C,size:new Xe(y,R)},n.set(a,f),a.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let b=0;b<l.length;b++)p+=l[b];let x=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Zy(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return h}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var ec=class extends ln{constructor(e,t,n,s,r,o,a,c,l,u=Nr){if(u!==Nr&&u!==Wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Nr&&(n=Vs),n===void 0&&u===Wr&&(n=Vr),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:sn,this.minFilter=c!==void 0?c:sn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Mp=new ln,xd=new ec(1,1),Sp=new ja,wp=new Ru,Ep=new Qa,bd=[],yd=[],vd=new Float32Array(16),_d=new Float32Array(9),Md=new Float32Array(4);function to(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=bd[s];if(r===void 0&&(r=new Float32Array(s),bd[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function rn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function on(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ec(i,e){let t=yd[e];t===void 0&&(t=new Int32Array(e),yd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ky(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2fv(this.addr,e),on(t,e)}}function Qy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;i.uniform3fv(this.addr,e),on(t,e)}}function $y(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4fv(this.addr,e),on(t,e)}}function ev(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(rn(t,n))return;Md.set(n),i.uniformMatrix2fv(this.addr,!1,Md),on(t,n)}}function tv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(rn(t,n))return;_d.set(n),i.uniformMatrix3fv(this.addr,!1,_d),on(t,n)}}function nv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(rn(t,n))return;vd.set(n),i.uniformMatrix4fv(this.addr,!1,vd),on(t,n)}}function iv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function sv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2iv(this.addr,e),on(t,e)}}function rv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;i.uniform3iv(this.addr,e),on(t,e)}}function ov(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4iv(this.addr,e),on(t,e)}}function av(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function cv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;i.uniform2uiv(this.addr,e),on(t,e)}}function lv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;i.uniform3uiv(this.addr,e),on(t,e)}}function uv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;i.uniform4uiv(this.addr,e),on(t,e)}}function hv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(xd.compareFunction=mp,r=xd):r=Mp,t.setTexture2D(e||r,s)}function fv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||wp,s)}function dv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ep,s)}function pv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Sp,s)}function mv(i){switch(i){case 5126:return Ky;case 35664:return Jy;case 35665:return Qy;case 35666:return $y;case 35674:return ev;case 35675:return tv;case 35676:return nv;case 5124:case 35670:return iv;case 35667:case 35671:return sv;case 35668:case 35672:return rv;case 35669:case 35673:return ov;case 5125:return av;case 36294:return cv;case 36295:return lv;case 36296:return uv;case 35678:case 36198:case 36298:case 36306:case 35682:return hv;case 35679:case 36299:case 36307:return fv;case 35680:case 36300:case 36308:case 36293:return dv;case 36289:case 36303:case 36311:case 36292:return pv}}function gv(i,e){i.uniform1fv(this.addr,e)}function xv(i,e){let t=to(e,this.size,2);i.uniform2fv(this.addr,t)}function bv(i,e){let t=to(e,this.size,3);i.uniform3fv(this.addr,t)}function yv(i,e){let t=to(e,this.size,4);i.uniform4fv(this.addr,t)}function vv(i,e){let t=to(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _v(i,e){let t=to(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Mv(i,e){let t=to(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Sv(i,e){i.uniform1iv(this.addr,e)}function wv(i,e){i.uniform2iv(this.addr,e)}function Ev(i,e){i.uniform3iv(this.addr,e)}function Tv(i,e){i.uniform4iv(this.addr,e)}function Av(i,e){i.uniform1uiv(this.addr,e)}function Rv(i,e){i.uniform2uiv(this.addr,e)}function Cv(i,e){i.uniform3uiv(this.addr,e)}function Iv(i,e){i.uniform4uiv(this.addr,e)}function Pv(i,e,t){let n=this.cache,s=e.length,r=Ec(t,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Mp,r[o])}function Lv(i,e,t){let n=this.cache,s=e.length,r=Ec(t,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||wp,r[o])}function Dv(i,e,t){let n=this.cache,s=e.length,r=Ec(t,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Ep,r[o])}function zv(i,e,t){let n=this.cache,s=e.length,r=Ec(t,s);rn(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Sp,r[o])}function Uv(i){switch(i){case 5126:return gv;case 35664:return xv;case 35665:return bv;case 35666:return yv;case 35674:return vv;case 35675:return _v;case 35676:return Mv;case 5124:case 35670:return Sv;case 35667:case 35671:return wv;case 35668:case 35672:return Ev;case 35669:case 35673:return Tv;case 5125:return Av;case 36294:return Rv;case 36295:return Cv;case 36296:return Iv;case 35678:case 36198:case 36298:case 36306:case 35682:return Pv;case 35679:case 36299:case 36307:return Lv;case 35680:case 36300:case 36308:case 36293:return Dv;case 36289:case 36303:case 36311:case 36292:return zv}}var Pu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=mv(t.type)}},Lu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Uv(t.type)}},Du=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Ul=/(\w+)(\])?(\[|\.)?/g;function Sd(i,e){i.seq.push(e),i.map[e.id]=e}function Nv(i,e,t){let n=i.name,s=n.length;for(Ul.lastIndex=0;;){let r=Ul.exec(n),o=Ul.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Sd(t,l===void 0?new Pu(a,i,e):new Lu(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Du(a),Sd(t,h)),t=h}}}var Fr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Nv(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function wd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var kv=37297,Fv=0;function Ov(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Ed=new ct;function Bv(i){yt._getMatrix(Ed,yt.workingColorSpace,i);let e=`mat3( ${Ed.elements.map(t=>t.toFixed(4))} )`;switch(yt.getTransfer(i)){case wc:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Td(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Ov(i.getShaderSource(e),o)}else return s}function Hv(i,e){let t=Bv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Gv(i,e){let t;switch(e){case Jg:t="Linear";break;case Qg:t="Reinhard";break;case $g:t="Cineon";break;case rh:t="ACESFilmic";break;case t0:t="AgX";break;case n0:t="Neutral";break;case e0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ca=new B;function Vv(){yt.getLuminanceCoefficients(Ca);let i=Ca.x.toFixed(4),e=Ca.y.toFixed(4),t=Ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ao).join(`
`)}function Xv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ao(i){return i!==""}function Ad(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function zu(i){return i.replace(Yv,Zv)}var jv=new Map;function Zv(i,e){let t=lt[e];if(t===void 0){let n=jv.get(e);if(n!==void 0)t=lt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return zu(t)}var Kv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cd(i){return i.replace(Kv,Jv)}function Jv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Id(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Qv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ip?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ih?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===zi&&(e="SHADOWMAP_TYPE_VSM"),e}function $v(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hr:case Gr:e="ENVMAP_TYPE_CUBE";break;case _c:e="ENVMAP_TYPE_CUBE_UV";break}return e}function e_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Gr:e="ENVMAP_MODE_REFRACTION";break}return e}function t_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case sh:e="ENVMAP_BLENDING_MULTIPLY";break;case Zg:e="ENVMAP_BLENDING_MIX";break;case Kg:e="ENVMAP_BLENDING_ADD";break}return e}function n_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function i_(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=Qv(t),l=$v(t),u=e_(t),h=t_(t),f=n_(t),p=Wv(t),x=Xv(r),b=s.createProgram(),m,d,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Ao).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Ao).join(`
`),d.length>0&&(d+=`
`)):(m=[Id(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ao).join(`
`),d=[Id(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==us?"#define TONE_MAPPING":"",t.toneMapping!==us?lt.tonemapping_pars_fragment:"",t.toneMapping!==us?Gv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,Hv("linearToOutputTexel",t.outputColorSpace),Vv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ao).join(`
`)),o=zu(o),o=Ad(o,t),o=Rd(o,t),a=zu(a),a=Ad(a,t),a=Rd(a,t),o=Cd(o),a=Cd(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Vf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let M=v+m+o,y=v+d+a,R=wd(s,s.VERTEX_SHADER,M),E=wd(s,s.FRAGMENT_SHADER,y);s.attachShader(b,R),s.attachShader(b,E),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function C(U){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(b).trim(),G=s.getShaderInfoLog(R).trim(),q=s.getShaderInfoLog(E).trim(),j=!0,K=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,b,R,E);else{let ue=Td(s,R,"vertex"),$=Td(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+F+`
`+ue+`
`+$)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(G===""||q==="")&&(K=!1);K&&(U.diagnostics={runnable:j,programLog:F,vertexShader:{log:G,prefix:m},fragmentShader:{log:q,prefix:d}})}s.deleteShader(R),s.deleteShader(E),I=new Fr(s,b),_=qv(s,b)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let _;this.getAttributes=function(){return _===void 0&&C(this),_};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(b,kv)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fv++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=R,this.fragmentShader=E,this}var s_=0,Uu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Nu(e),t.set(e,n)),n}},Nu=class{constructor(e){this.id=s_++,this.code=e,this.usedTimes=0}};function r_(i,e,t,n,s,r,o){let a=new Uo,c=new Uu,l=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(_){return l.add(_),_===0?"uv":`uv${_}`}function m(_,S,U,F,G){let q=F.fog,j=G.geometry,K=_.isMeshStandardMaterial?F.environment:null,ue=(_.isMeshStandardMaterial?t:e).get(_.envMap||K),$=ue&&ue.mapping===_c?ue.image.height:null,ve=x[_.type];_.precision!==null&&(p=s.getMaxPrecision(_.precision),p!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",p,"instead."));let we=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Fe=we!==void 0?we.length:0,Ke=0;j.morphAttributes.position!==void 0&&(Ke=1),j.morphAttributes.normal!==void 0&&(Ke=2),j.morphAttributes.color!==void 0&&(Ke=3);let pt,se,D,k;if(ve){let vt=_i[ve];pt=vt.vertexShader,se=vt.fragmentShader}else pt=_.vertexShader,se=_.fragmentShader,c.update(_),D=c.getVertexShaderID(_),k=c.getFragmentShaderID(_);let Z=i.getRenderTarget(),he=i.state.buffers.depth.getReversed(),me=G.isInstancedMesh===!0,Ce=G.isBatchedMesh===!0,et=!!_.map,Be=!!_.matcap,bt=!!ue,H=!!_.aoMap,It=!!_.lightMap,oe=!!_.bumpMap,ge=!!_.normalMap,be=!!_.displacementMap,Ye=!!_.emissiveMap,Ue=!!_.metalnessMap,P=!!_.roughnessMap,w=_.anisotropy>0,Y=_.clearcoat>0,re=_.dispersion>0,ce=_.iridescence>0,ie=_.sheen>0,Ie=_.transmission>0,xe=w&&!!_.anisotropyMap,Ae=Y&&!!_.clearcoatMap,ht=Y&&!!_.clearcoatNormalMap,de=Y&&!!_.clearcoatRoughnessMap,Le=ce&&!!_.iridescenceMap,We=ce&&!!_.iridescenceThicknessMap,Ze=ie&&!!_.sheenColorMap,De=ie&&!!_.sheenRoughnessMap,at=!!_.specularMap,Je=!!_.specularColorMap,Dt=!!_.specularIntensityMap,V=Ie&&!!_.transmissionMap,_e=Ie&&!!_.thicknessMap,ee=!!_.gradientMap,ae=!!_.alphaMap,Re=_.alphaTest>0,Ee=!!_.alphaHash,nt=!!_.extensions,Ve=us;_.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ve=i.toneMapping);let Zt={shaderID:ve,shaderType:_.type,shaderName:_.name,vertexShader:pt,fragmentShader:se,defines:_.defines,customVertexShaderID:D,customFragmentShaderID:k,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:p,batching:Ce,batchingColor:Ce&&G._colorsTexture!==null,instancing:me,instancingColor:me&&G.instanceColor!==null,instancingMorph:me&&G.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:hn,alphaToCoverage:!!_.alphaToCoverage,map:et,matcap:Be,envMap:bt,envMapMode:bt&&ue.mapping,envMapCubeUVHeight:$,aoMap:H,lightMap:It,bumpMap:oe,normalMap:ge,displacementMap:f&&be,emissiveMap:Ye,normalMapObjectSpace:ge&&_.normalMapType===c0,normalMapTangentSpace:ge&&_.normalMapType===Sc,metalnessMap:Ue,roughnessMap:P,anisotropy:w,anisotropyMap:xe,clearcoat:Y,clearcoatMap:Ae,clearcoatNormalMap:ht,clearcoatRoughnessMap:de,dispersion:re,iridescence:ce,iridescenceMap:Le,iridescenceThicknessMap:We,sheen:ie,sheenColorMap:Ze,sheenRoughnessMap:De,specularMap:at,specularColorMap:Je,specularIntensityMap:Dt,transmission:Ie,transmissionMap:V,thicknessMap:_e,gradientMap:ee,opaque:_.transparent===!1&&_.blending===Ur&&_.alphaToCoverage===!1,alphaMap:ae,alphaTest:Re,alphaHash:Ee,combine:_.combine,mapUv:et&&b(_.map.channel),aoMapUv:H&&b(_.aoMap.channel),lightMapUv:It&&b(_.lightMap.channel),bumpMapUv:oe&&b(_.bumpMap.channel),normalMapUv:ge&&b(_.normalMap.channel),displacementMapUv:be&&b(_.displacementMap.channel),emissiveMapUv:Ye&&b(_.emissiveMap.channel),metalnessMapUv:Ue&&b(_.metalnessMap.channel),roughnessMapUv:P&&b(_.roughnessMap.channel),anisotropyMapUv:xe&&b(_.anisotropyMap.channel),clearcoatMapUv:Ae&&b(_.clearcoatMap.channel),clearcoatNormalMapUv:ht&&b(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&b(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&b(_.iridescenceMap.channel),iridescenceThicknessMapUv:We&&b(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ze&&b(_.sheenColorMap.channel),sheenRoughnessMapUv:De&&b(_.sheenRoughnessMap.channel),specularMapUv:at&&b(_.specularMap.channel),specularColorMapUv:Je&&b(_.specularColorMap.channel),specularIntensityMapUv:Dt&&b(_.specularIntensityMap.channel),transmissionMapUv:V&&b(_.transmissionMap.channel),thicknessMapUv:_e&&b(_.thicknessMap.channel),alphaMapUv:ae&&b(_.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(ge||w),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!j.attributes.uv&&(et||ae),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:he,skinning:G.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Fe,morphTextureStride:Ke,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:et&&_.map.isVideoTexture===!0&&yt.getTransfer(_.map.colorSpace)===Ut,decodeVideoTextureEmissive:Ye&&_.emissiveMap.isVideoTexture===!0&&yt.getTransfer(_.emissiveMap.colorSpace)===Ut,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Lt,flipSided:_.side===nn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:nt&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(nt&&_.extensions.multiDraw===!0||Ce)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Zt.vertexUv1s=l.has(1),Zt.vertexUv2s=l.has(2),Zt.vertexUv3s=l.has(3),l.clear(),Zt}function d(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let U in _.defines)S.push(U),S.push(_.defines[U]);return _.isRawShaderMaterial===!1&&(v(S,_),M(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function v(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function M(_,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),_.push(a.mask)}function y(_){let S=x[_.type],U;if(S){let F=_i[S];U=Z0.clone(F.uniforms)}else U=_.uniforms;return U}function R(_,S){let U;for(let F=0,G=u.length;F<G;F++){let q=u[F];if(q.cacheKey===S){U=q,++U.usedTimes;break}}return U===void 0&&(U=new i_(i,S,_,r),u.push(U)),U}function E(_){if(--_.usedTimes===0){let S=u.indexOf(_);u[S]=u[u.length-1],u.pop(),_.destroy()}}function C(_){c.remove(_)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:R,releaseProgram:E,releaseShaderCache:C,programs:u,dispose:I}}function o_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function a_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Pd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ld(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,f,p,x,b,m){let d=i[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:x,renderOrder:h.renderOrder,z:b,group:m},i[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=x,d.renderOrder=h.renderOrder,d.z=b,d.group=m),e++,d}function a(h,f,p,x,b,m){let d=o(h,f,p,x,b,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):t.push(d)}function c(h,f,p,x,b,m){let d=o(h,f,p,x,b,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function l(h,f){t.length>1&&t.sort(h||a_),n.length>1&&n.sort(f||Pd),s.length>1&&s.sort(f||Pd)}function u(){for(let h=e,f=i.length;h<f;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function c_(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Ld,i.set(n,[o])):s>=r.length?(o=new Ld,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function l_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new ze};break;case"SpotLight":t={position:new B,direction:new B,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function u_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var h_=0;function f_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function d_(i){let e=new l_,t=u_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);let s=new B,r=new ot,o=new ot;function a(l){let u=0,h=0,f=0;for(let _=0;_<9;_++)n.probe[_].set(0,0,0);let p=0,x=0,b=0,m=0,d=0,v=0,M=0,y=0,R=0,E=0,C=0;l.sort(f_);for(let _=0,S=l.length;_<S;_++){let U=l[_],F=U.color,G=U.intensity,q=U.distance,j=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)u+=F.r*G,h+=F.g*G,f+=F.b*G;else if(U.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(U.sh.coefficients[K],G);C++}else if(U.isDirectionalLight){let K=e.get(U);if(K.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ue=U.shadow,$=t.get(U);$.shadowIntensity=ue.intensity,$.shadowBias=ue.bias,$.shadowNormalBias=ue.normalBias,$.shadowRadius=ue.radius,$.shadowMapSize=ue.mapSize,n.directionalShadow[p]=$,n.directionalShadowMap[p]=j,n.directionalShadowMatrix[p]=U.shadow.matrix,v++}n.directional[p]=K,p++}else if(U.isSpotLight){let K=e.get(U);K.position.setFromMatrixPosition(U.matrixWorld),K.color.copy(F).multiplyScalar(G),K.distance=q,K.coneCos=Math.cos(U.angle),K.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),K.decay=U.decay,n.spot[b]=K;let ue=U.shadow;if(U.map&&(n.spotLightMap[R]=U.map,R++,ue.updateMatrices(U),U.castShadow&&E++),n.spotLightMatrix[b]=ue.matrix,U.castShadow){let $=t.get(U);$.shadowIntensity=ue.intensity,$.shadowBias=ue.bias,$.shadowNormalBias=ue.normalBias,$.shadowRadius=ue.radius,$.shadowMapSize=ue.mapSize,n.spotShadow[b]=$,n.spotShadowMap[b]=j,y++}b++}else if(U.isRectAreaLight){let K=e.get(U);K.color.copy(F).multiplyScalar(G),K.halfWidth.set(U.width*.5,0,0),K.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=K,m++}else if(U.isPointLight){let K=e.get(U);if(K.color.copy(U.color).multiplyScalar(U.intensity),K.distance=U.distance,K.decay=U.decay,U.castShadow){let ue=U.shadow,$=t.get(U);$.shadowIntensity=ue.intensity,$.shadowBias=ue.bias,$.shadowNormalBias=ue.normalBias,$.shadowRadius=ue.radius,$.shadowMapSize=ue.mapSize,$.shadowCameraNear=ue.camera.near,$.shadowCameraFar=ue.camera.far,n.pointShadow[x]=$,n.pointShadowMap[x]=j,n.pointShadowMatrix[x]=U.shadow.matrix,M++}n.point[x]=K,x++}else if(U.isHemisphereLight){let K=e.get(U);K.skyColor.copy(U.color).multiplyScalar(G),K.groundColor.copy(U.groundColor).multiplyScalar(G),n.hemi[d]=K,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;let I=n.hash;(I.directionalLength!==p||I.pointLength!==x||I.spotLength!==b||I.rectAreaLength!==m||I.hemiLength!==d||I.numDirectionalShadows!==v||I.numPointShadows!==M||I.numSpotShadows!==y||I.numSpotMaps!==R||I.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=b,n.rectArea.length=m,n.point.length=x,n.hemi.length=d,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+R-E,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,I.directionalLength=p,I.pointLength=x,I.spotLength=b,I.rectAreaLength=m,I.hemiLength=d,I.numDirectionalShadows=v,I.numPointShadows=M,I.numSpotShadows=y,I.numSpotMaps=R,I.numLightProbes=C,n.version=h_++)}function c(l,u){let h=0,f=0,p=0,x=0,b=0,m=u.matrixWorldInverse;for(let d=0,v=l.length;d<v;d++){let M=l[d];if(M.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),h++}else if(M.isSpotLight){let y=n.spot[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(M.isRectAreaLight){let y=n.rectArea[x];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),x++}else if(M.isPointLight){let y=n.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){let y=n.hemi[b];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),b++}}}return{setup:a,setupView:c,state:n}}function Dd(i){let e=new d_(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function p_(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Dd(i),e.set(s,[a])):r>=o.length?(a=new Dd(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var ku=class extends Mn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=o0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Fu=class extends Mn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},m_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g_=`uniform sampler2D shadow_pass;
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
}`;function x_(i,e,t){let n=new No,s=new Xe,r=new Xe,o=new Ct,a=new ku({depthPacking:a0}),c=new Fu,l={},u=t.maxTextureSize,h={[Vn]:nn,[nn]:Vn,[Lt]:Lt},f=new Qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:m_,fragmentShader:g_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let x=new Ot;x.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new ye(x,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ip;let d=this.type;this.render=function(E,C,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let _=i.getRenderTarget(),S=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),F=i.state;F.setBlending(ls),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let G=d!==zi&&this.type===zi,q=d===zi&&this.type!==zi;for(let j=0,K=E.length;j<K;j++){let ue=E[j],$=ue.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);let ve=$.getFrameExtents();if(s.multiply(ve),r.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ve.x),s.x=r.x*ve.x,$.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ve.y),s.y=r.y*ve.y,$.mapSize.y=r.y)),$.map===null||G===!0||q===!0){let Fe=this.type!==zi?{minFilter:sn,magFilter:sn}:{};$.map!==null&&$.map.dispose(),$.map=new ti(s.x,s.y,Fe),$.map.texture.name=ue.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();let we=$.getViewportCount();for(let Fe=0;Fe<we;Fe++){let Ke=$.getViewport(Fe);o.set(r.x*Ke.x,r.y*Ke.y,r.x*Ke.z,r.y*Ke.w),F.viewport(o),$.updateMatrices(ue,Fe),n=$.getFrustum(),y(C,I,$.camera,ue,this.type)}$.isPointLightShadow!==!0&&this.type===zi&&v($,I),$.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(_,S,U)};function v(E,C){let I=e.update(b);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ti(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,I,f,b,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,I,p,b,null)}function M(E,C,I,_){let S=null,U=I.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)S=U;else if(S=I.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let F=S.uuid,G=C.uuid,q=l[F];q===void 0&&(q={},l[F]=q);let j=q[G];j===void 0&&(j=S.clone(),q[G]=j,C.addEventListener("dispose",R)),S=j}if(S.visible=C.visible,S.wireframe=C.wireframe,_===zi?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:h[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let F=i.properties.get(S);F.light=I}return S}function y(E,C,I,_,S){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===zi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,E.matrixWorld);let G=e.update(E),q=E.material;if(Array.isArray(q)){let j=G.groups;for(let K=0,ue=j.length;K<ue;K++){let $=j[K],ve=q[$.materialIndex];if(ve&&ve.visible){let we=M(E,ve,_,S);E.onBeforeShadow(i,E,C,I,G,we,$),i.renderBufferDirect(I,null,G,we,E,$),E.onAfterShadow(i,E,C,I,G,we,$)}}}else if(q.visible){let j=M(E,q,_,S);E.onBeforeShadow(i,E,C,I,G,j,null),i.renderBufferDirect(I,null,G,j,E,null),E.onAfterShadow(i,E,C,I,G,j,null)}}let F=E.children;for(let G=0,q=F.length;G<q;G++)y(F[G],C,I,_,S)}function R(E){E.target.removeEventListener("dispose",R);for(let I in l){let _=l[I],S=E.target.uuid;S in _&&(_[S].dispose(),delete _[S])}}}var b_={[Wl]:Xl,[ql]:Zl,[Yl]:Kl,[Br]:jl,[Xl]:Wl,[Zl]:ql,[Kl]:Yl,[jl]:Br};function y_(i,e){function t(){let V=!1,_e=new Ct,ee=null,ae=new Ct(0,0,0,0);return{setMask:function(Re){ee!==Re&&!V&&(i.colorMask(Re,Re,Re,Re),ee=Re)},setLocked:function(Re){V=Re},setClear:function(Re,Ee,nt,Ve,Zt){Zt===!0&&(Re*=Ve,Ee*=Ve,nt*=Ve),_e.set(Re,Ee,nt,Ve),ae.equals(_e)===!1&&(i.clearColor(Re,Ee,nt,Ve),ae.copy(_e))},reset:function(){V=!1,ee=null,ae.set(-1,0,0,0)}}}function n(){let V=!1,_e=!1,ee=null,ae=null,Re=null;return{setReversed:function(Ee){if(_e!==Ee){let nt=e.get("EXT_clip_control");_e?nt.clipControlEXT(nt.LOWER_LEFT_EXT,nt.ZERO_TO_ONE_EXT):nt.clipControlEXT(nt.LOWER_LEFT_EXT,nt.NEGATIVE_ONE_TO_ONE_EXT);let Ve=Re;Re=null,this.setClear(Ve)}_e=Ee},getReversed:function(){return _e},setTest:function(Ee){Ee?Z(i.DEPTH_TEST):he(i.DEPTH_TEST)},setMask:function(Ee){ee!==Ee&&!V&&(i.depthMask(Ee),ee=Ee)},setFunc:function(Ee){if(_e&&(Ee=b_[Ee]),ae!==Ee){switch(Ee){case Wl:i.depthFunc(i.NEVER);break;case Xl:i.depthFunc(i.ALWAYS);break;case ql:i.depthFunc(i.LESS);break;case Br:i.depthFunc(i.LEQUAL);break;case Yl:i.depthFunc(i.EQUAL);break;case jl:i.depthFunc(i.GEQUAL);break;case Zl:i.depthFunc(i.GREATER);break;case Kl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=Ee}},setLocked:function(Ee){V=Ee},setClear:function(Ee){Re!==Ee&&(_e&&(Ee=1-Ee),i.clearDepth(Ee),Re=Ee)},reset:function(){V=!1,ee=null,ae=null,Re=null,_e=!1}}}function s(){let V=!1,_e=null,ee=null,ae=null,Re=null,Ee=null,nt=null,Ve=null,Zt=null;return{setTest:function(vt){V||(vt?Z(i.STENCIL_TEST):he(i.STENCIL_TEST))},setMask:function(vt){_e!==vt&&!V&&(i.stencilMask(vt),_e=vt)},setFunc:function(vt,In,oi){(ee!==vt||ae!==In||Re!==oi)&&(i.stencilFunc(vt,In,oi),ee=vt,ae=In,Re=oi)},setOp:function(vt,In,oi){(Ee!==vt||nt!==In||Ve!==oi)&&(i.stencilOp(vt,In,oi),Ee=vt,nt=In,Ve=oi)},setLocked:function(vt){V=vt},setClear:function(vt){Zt!==vt&&(i.clearStencil(vt),Zt=vt)},reset:function(){V=!1,_e=null,ee=null,ae=null,Re=null,Ee=null,nt=null,Ve=null,Zt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},h={},f=new WeakMap,p=[],x=null,b=!1,m=null,d=null,v=null,M=null,y=null,R=null,E=null,C=new ze(0,0,0),I=0,_=!1,S=null,U=null,F=null,G=null,q=null,j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,ue=0,$=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(ue=parseFloat(/^WebGL (\d)/.exec($)[1]),K=ue>=1):$.indexOf("OpenGL ES")!==-1&&(ue=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),K=ue>=2);let ve=null,we={},Fe=i.getParameter(i.SCISSOR_BOX),Ke=i.getParameter(i.VIEWPORT),pt=new Ct().fromArray(Fe),se=new Ct().fromArray(Ke);function D(V,_e,ee,ae){let Re=new Uint8Array(4),Ee=i.createTexture();i.bindTexture(V,Ee),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let nt=0;nt<ee;nt++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,ae,0,i.RGBA,i.UNSIGNED_BYTE,Re):i.texImage2D(_e+nt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Re);return Ee}let k={};k[i.TEXTURE_2D]=D(i.TEXTURE_2D,i.TEXTURE_2D,1),k[i.TEXTURE_CUBE_MAP]=D(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[i.TEXTURE_2D_ARRAY]=D(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),k[i.TEXTURE_3D]=D(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(i.DEPTH_TEST),o.setFunc(Br),oe(!1),ge(Ff),Z(i.CULL_FACE),H(ls);function Z(V){u[V]!==!0&&(i.enable(V),u[V]=!0)}function he(V){u[V]!==!1&&(i.disable(V),u[V]=!1)}function me(V,_e){return h[V]!==_e?(i.bindFramebuffer(V,_e),h[V]=_e,V===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=_e),V===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function Ce(V,_e){let ee=p,ae=!1;if(V){ee=f.get(_e),ee===void 0&&(ee=[],f.set(_e,ee));let Re=V.textures;if(ee.length!==Re.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let Ee=0,nt=Re.length;Ee<nt;Ee++)ee[Ee]=i.COLOR_ATTACHMENT0+Ee;ee.length=Re.length,ae=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,ae=!0);ae&&i.drawBuffers(ee)}function et(V){return x!==V?(i.useProgram(V),x=V,!0):!1}let Be={[Bs]:i.FUNC_ADD,[Lg]:i.FUNC_SUBTRACT,[Dg]:i.FUNC_REVERSE_SUBTRACT};Be[zg]=i.MIN,Be[Ug]=i.MAX;let bt={[Ng]:i.ZERO,[kg]:i.ONE,[Fg]:i.SRC_COLOR,[Gl]:i.SRC_ALPHA,[Wg]:i.SRC_ALPHA_SATURATE,[Gg]:i.DST_COLOR,[Bg]:i.DST_ALPHA,[Og]:i.ONE_MINUS_SRC_COLOR,[Vl]:i.ONE_MINUS_SRC_ALPHA,[Vg]:i.ONE_MINUS_DST_COLOR,[Hg]:i.ONE_MINUS_DST_ALPHA,[Xg]:i.CONSTANT_COLOR,[qg]:i.ONE_MINUS_CONSTANT_COLOR,[Yg]:i.CONSTANT_ALPHA,[jg]:i.ONE_MINUS_CONSTANT_ALPHA};function H(V,_e,ee,ae,Re,Ee,nt,Ve,Zt,vt){if(V===ls){b===!0&&(he(i.BLEND),b=!1);return}if(b===!1&&(Z(i.BLEND),b=!0),V!==Pg){if(V!==m||vt!==_){if((d!==Bs||y!==Bs)&&(i.blendEquation(i.FUNC_ADD),d=Bs,y=Bs),vt)switch(V){case Ur:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Or:i.blendFunc(i.ONE,i.ONE);break;case Of:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bf:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Ur:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Or:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Of:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bf:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}v=null,M=null,R=null,E=null,C.set(0,0,0),I=0,m=V,_=vt}return}Re=Re||_e,Ee=Ee||ee,nt=nt||ae,(_e!==d||Re!==y)&&(i.blendEquationSeparate(Be[_e],Be[Re]),d=_e,y=Re),(ee!==v||ae!==M||Ee!==R||nt!==E)&&(i.blendFuncSeparate(bt[ee],bt[ae],bt[Ee],bt[nt]),v=ee,M=ae,R=Ee,E=nt),(Ve.equals(C)===!1||Zt!==I)&&(i.blendColor(Ve.r,Ve.g,Ve.b,Zt),C.copy(Ve),I=Zt),m=V,_=!1}function It(V,_e){V.side===Lt?he(i.CULL_FACE):Z(i.CULL_FACE);let ee=V.side===nn;_e&&(ee=!ee),oe(ee),V.blending===Ur&&V.transparent===!1?H(ls):H(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);let ae=V.stencilWrite;a.setTest(ae),ae&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ye(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):he(i.SAMPLE_ALPHA_TO_COVERAGE)}function oe(V){S!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),S=V)}function ge(V){V!==Cg?(Z(i.CULL_FACE),V!==U&&(V===Ff?i.cullFace(i.BACK):V===Ig?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):he(i.CULL_FACE),U=V}function be(V){V!==F&&(K&&i.lineWidth(V),F=V)}function Ye(V,_e,ee){V?(Z(i.POLYGON_OFFSET_FILL),(G!==_e||q!==ee)&&(i.polygonOffset(_e,ee),G=_e,q=ee)):he(i.POLYGON_OFFSET_FILL)}function Ue(V){V?Z(i.SCISSOR_TEST):he(i.SCISSOR_TEST)}function P(V){V===void 0&&(V=i.TEXTURE0+j-1),ve!==V&&(i.activeTexture(V),ve=V)}function w(V,_e,ee){ee===void 0&&(ve===null?ee=i.TEXTURE0+j-1:ee=ve);let ae=we[ee];ae===void 0&&(ae={type:void 0,texture:void 0},we[ee]=ae),(ae.type!==V||ae.texture!==_e)&&(ve!==ee&&(i.activeTexture(ee),ve=ee),i.bindTexture(V,_e||k[V]),ae.type=V,ae.texture=_e)}function Y(){let V=we[ve];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function re(){try{i.compressedTexImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ce(){try{i.compressedTexImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ie(){try{i.texSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ie(){try{i.texSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function xe(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ae(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ht(){try{i.texStorage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function de(){try{i.texStorage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Le(){try{i.texImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function We(){try{i.texImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ze(V){pt.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),pt.copy(V))}function De(V){se.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),se.copy(V))}function at(V,_e){let ee=l.get(_e);ee===void 0&&(ee=new WeakMap,l.set(_e,ee));let ae=ee.get(V);ae===void 0&&(ae=i.getUniformBlockIndex(_e,V.name),ee.set(V,ae))}function Je(V,_e){let ae=l.get(_e).get(V);c.get(_e)!==ae&&(i.uniformBlockBinding(_e,ae,V.__bindingPointIndex),c.set(_e,ae))}function Dt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ve=null,we={},h={},f=new WeakMap,p=[],x=null,b=!1,m=null,d=null,v=null,M=null,y=null,R=null,E=null,C=new ze(0,0,0),I=0,_=!1,S=null,U=null,F=null,G=null,q=null,pt.set(0,0,i.canvas.width,i.canvas.height),se.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:he,bindFramebuffer:me,drawBuffers:Ce,useProgram:et,setBlending:H,setMaterial:It,setFlipSided:oe,setCullFace:ge,setLineWidth:be,setPolygonOffset:Ye,setScissorTest:Ue,activeTexture:P,bindTexture:w,unbindTexture:Y,compressedTexImage2D:re,compressedTexImage3D:ce,texImage2D:Le,texImage3D:We,updateUBOMapping:at,uniformBlockBinding:Je,texStorage2D:ht,texStorage3D:de,texSubImage2D:ie,texSubImage3D:Ie,compressedTexSubImage2D:xe,compressedTexSubImage3D:Ae,scissor:Ze,viewport:De,reset:Dt}}function zd(i,e,t,n){let s=v_(n);switch(t){case cp:return i*e;case up:return i*e;case hp:return i*e*2;case uh:return i*e/s.components*s.byteLength;case hh:return i*e/s.components*s.byteLength;case fp:return i*e*2/s.components*s.byteLength;case fh:return i*e*2/s.components*s.byteLength;case lp:return i*e*3/s.components*s.byteLength;case ei:return i*e*4/s.components*s.byteLength;case dh:return i*e*4/s.components*s.byteLength;case Ba:case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:case Va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case eu:case nu:return Math.max(i,16)*Math.max(e,8)/4;case $l:case tu:return Math.max(i,8)*Math.max(e,8)/2;case iu:case su:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ru:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ou:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case au:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case cu:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case lu:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case uu:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case hu:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case fu:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case du:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case pu:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case mu:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case gu:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case xu:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case bu:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case yu:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Wa:case vu:case _u:return Math.ceil(i/4)*Math.ceil(e/4)*16;case dp:case Mu:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Su:case wu:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function v_(i){switch(i){case Oi:case rp:return{byteLength:1,components:1};case Do:case op:case Xo:return{byteLength:2,components:1};case ch:case lh:return{byteLength:2,components:4};case Vs:case ah:case pi:return{byteLength:4,components:1};case ap:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function __(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xe,u=new WeakMap,h,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,w){return p?new OffscreenCanvas(P,w):zo("canvas")}function b(P,w,Y){let re=1,ce=Ue(P);if((ce.width>Y||ce.height>Y)&&(re=Y/Math.max(ce.width,ce.height)),re<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ie=Math.floor(re*ce.width),Ie=Math.floor(re*ce.height);h===void 0&&(h=x(ie,Ie));let xe=w?x(ie,Ie):h;return xe.width=ie,xe.height=Ie,xe.getContext("2d").drawImage(P,0,0,ie,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+ie+"x"+Ie+")."),xe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),P;return P}function m(P){return P.generateMipmaps}function d(P){i.generateMipmap(P)}function v(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(P,w,Y,re,ce=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ie=w;if(w===i.RED&&(Y===i.FLOAT&&(ie=i.R32F),Y===i.HALF_FLOAT&&(ie=i.R16F),Y===i.UNSIGNED_BYTE&&(ie=i.R8)),w===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.R8UI),Y===i.UNSIGNED_SHORT&&(ie=i.R16UI),Y===i.UNSIGNED_INT&&(ie=i.R32UI),Y===i.BYTE&&(ie=i.R8I),Y===i.SHORT&&(ie=i.R16I),Y===i.INT&&(ie=i.R32I)),w===i.RG&&(Y===i.FLOAT&&(ie=i.RG32F),Y===i.HALF_FLOAT&&(ie=i.RG16F),Y===i.UNSIGNED_BYTE&&(ie=i.RG8)),w===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.RG8UI),Y===i.UNSIGNED_SHORT&&(ie=i.RG16UI),Y===i.UNSIGNED_INT&&(ie=i.RG32UI),Y===i.BYTE&&(ie=i.RG8I),Y===i.SHORT&&(ie=i.RG16I),Y===i.INT&&(ie=i.RG32I)),w===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(ie=i.RGB16UI),Y===i.UNSIGNED_INT&&(ie=i.RGB32UI),Y===i.BYTE&&(ie=i.RGB8I),Y===i.SHORT&&(ie=i.RGB16I),Y===i.INT&&(ie=i.RGB32I)),w===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(ie=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(ie=i.RGBA16UI),Y===i.UNSIGNED_INT&&(ie=i.RGBA32UI),Y===i.BYTE&&(ie=i.RGBA8I),Y===i.SHORT&&(ie=i.RGBA16I),Y===i.INT&&(ie=i.RGBA32I)),w===i.RGB&&Y===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),w===i.RGBA){let Ie=ce?wc:yt.getTransfer(re);Y===i.FLOAT&&(ie=i.RGBA32F),Y===i.HALF_FLOAT&&(ie=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(ie=Ie===Ut?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function y(P,w){let Y;return P?w===null||w===Vs||w===Vr?Y=i.DEPTH24_STENCIL8:w===pi?Y=i.DEPTH32F_STENCIL8:w===Do&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Vs||w===Vr?Y=i.DEPTH_COMPONENT24:w===pi?Y=i.DEPTH_COMPONENT32F:w===Do&&(Y=i.DEPTH_COMPONENT16),Y}function R(P,w){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==sn&&P.minFilter!==_n?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function E(P){let w=P.target;w.removeEventListener("dispose",E),I(w),w.isVideoTexture&&u.delete(w)}function C(P){let w=P.target;w.removeEventListener("dispose",C),S(w)}function I(P){let w=n.get(P);if(w.__webglInit===void 0)return;let Y=P.source,re=f.get(Y);if(re){let ce=re[w.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&_(P),Object.keys(re).length===0&&f.delete(Y)}n.remove(P)}function _(P){let w=n.get(P);i.deleteTexture(w.__webglTexture);let Y=P.source,re=f.get(Y);delete re[w.__cacheKey],o.memory.textures--}function S(P){let w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(w.__webglFramebuffer[re]))for(let ce=0;ce<w.__webglFramebuffer[re].length;ce++)i.deleteFramebuffer(w.__webglFramebuffer[re][ce]);else i.deleteFramebuffer(w.__webglFramebuffer[re]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[re])}else{if(Array.isArray(w.__webglFramebuffer))for(let re=0;re<w.__webglFramebuffer.length;re++)i.deleteFramebuffer(w.__webglFramebuffer[re]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let re=0;re<w.__webglColorRenderbuffer.length;re++)w.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[re]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let Y=P.textures;for(let re=0,ce=Y.length;re<ce;re++){let ie=n.get(Y[re]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),o.memory.textures--),n.remove(Y[re])}n.remove(P)}let U=0;function F(){U=0}function G(){let P=U;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),U+=1,P}function q(P){let w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function j(P,w){let Y=n.get(P);if(P.isVideoTexture&&be(P),P.isRenderTargetTexture===!1&&P.version>0&&Y.__version!==P.version){let re=P.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{se(Y,P,w);return}}t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+w)}function K(P,w){let Y=n.get(P);if(P.version>0&&Y.__version!==P.version){se(Y,P,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+w)}function ue(P,w){let Y=n.get(P);if(P.version>0&&Y.__version!==P.version){se(Y,P,w);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+w)}function $(P,w){let Y=n.get(P);if(P.version>0&&Y.__version!==P.version){D(Y,P,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+w)}let ve={[Gs]:i.REPEAT,[Ni]:i.CLAMP_TO_EDGE,[Lo]:i.MIRRORED_REPEAT},we={[sn]:i.NEAREST,[oh]:i.NEAREST_MIPMAP_NEAREST,[Pr]:i.NEAREST_MIPMAP_LINEAR,[_n]:i.LINEAR,[Ro]:i.LINEAR_MIPMAP_NEAREST,[$n]:i.LINEAR_MIPMAP_LINEAR},Fe={[l0]:i.NEVER,[m0]:i.ALWAYS,[u0]:i.LESS,[mp]:i.LEQUAL,[h0]:i.EQUAL,[p0]:i.GEQUAL,[f0]:i.GREATER,[d0]:i.NOTEQUAL};function Ke(P,w){if(w.type===pi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===_n||w.magFilter===Ro||w.magFilter===Pr||w.magFilter===$n||w.minFilter===_n||w.minFilter===Ro||w.minFilter===Pr||w.minFilter===$n)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,ve[w.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,ve[w.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,ve[w.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,we[w.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,we[w.minFilter]),w.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Fe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===sn||w.minFilter!==Pr&&w.minFilter!==$n||w.type===pi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function pt(P,w){let Y=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",E));let re=w.source,ce=f.get(re);ce===void 0&&(ce={},f.set(re,ce));let ie=q(w);if(ie!==P.__cacheKey){ce[ie]===void 0&&(ce[ie]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),ce[ie].usedTimes++;let Ie=ce[P.__cacheKey];Ie!==void 0&&(ce[P.__cacheKey].usedTimes--,Ie.usedTimes===0&&_(w)),P.__cacheKey=ie,P.__webglTexture=ce[ie].texture}return Y}function se(P,w,Y){let re=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(re=i.TEXTURE_3D);let ce=pt(P,w),ie=w.source;t.bindTexture(re,P.__webglTexture,i.TEXTURE0+Y);let Ie=n.get(ie);if(ie.version!==Ie.__version||ce===!0){t.activeTexture(i.TEXTURE0+Y);let xe=yt.getPrimaries(yt.workingColorSpace),Ae=w.colorSpace===Mi?null:yt.getPrimaries(w.colorSpace),ht=w.colorSpace===Mi||xe===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);let de=b(w.image,!1,s.maxTextureSize);de=Ye(w,de);let Le=r.convert(w.format,w.colorSpace),We=r.convert(w.type),Ze=M(w.internalFormat,Le,We,w.colorSpace,w.isVideoTexture);Ke(re,w);let De,at=w.mipmaps,Je=w.isVideoTexture!==!0,Dt=Ie.__version===void 0||ce===!0,V=ie.dataReady,_e=R(w,de);if(w.isDepthTexture)Ze=y(w.format===Wr,w.type),Dt&&(Je?t.texStorage2D(i.TEXTURE_2D,1,Ze,de.width,de.height):t.texImage2D(i.TEXTURE_2D,0,Ze,de.width,de.height,0,Le,We,null));else if(w.isDataTexture)if(at.length>0){Je&&Dt&&t.texStorage2D(i.TEXTURE_2D,_e,Ze,at[0].width,at[0].height);for(let ee=0,ae=at.length;ee<ae;ee++)De=at[ee],Je?V&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,De.width,De.height,Le,We,De.data):t.texImage2D(i.TEXTURE_2D,ee,Ze,De.width,De.height,0,Le,We,De.data);w.generateMipmaps=!1}else Je?(Dt&&t.texStorage2D(i.TEXTURE_2D,_e,Ze,de.width,de.height),V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de.width,de.height,Le,We,de.data)):t.texImage2D(i.TEXTURE_2D,0,Ze,de.width,de.height,0,Le,We,de.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Je&&Dt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Ze,at[0].width,at[0].height,de.depth);for(let ee=0,ae=at.length;ee<ae;ee++)if(De=at[ee],w.format!==ei)if(Le!==null)if(Je){if(V)if(w.layerUpdates.size>0){let Re=zd(De.width,De.height,w.format,w.type);for(let Ee of w.layerUpdates){let nt=De.data.subarray(Ee*Re/De.data.BYTES_PER_ELEMENT,(Ee+1)*Re/De.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Ee,De.width,De.height,1,Le,nt)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,De.width,De.height,de.depth,Le,De.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Ze,De.width,De.height,de.depth,0,De.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?V&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,De.width,De.height,de.depth,Le,We,De.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Ze,De.width,De.height,de.depth,0,Le,We,De.data)}else{Je&&Dt&&t.texStorage2D(i.TEXTURE_2D,_e,Ze,at[0].width,at[0].height);for(let ee=0,ae=at.length;ee<ae;ee++)De=at[ee],w.format!==ei?Le!==null?Je?V&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,De.width,De.height,Le,De.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Ze,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?V&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,De.width,De.height,Le,We,De.data):t.texImage2D(i.TEXTURE_2D,ee,Ze,De.width,De.height,0,Le,We,De.data)}else if(w.isDataArrayTexture)if(Je){if(Dt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Ze,de.width,de.height,de.depth),V)if(w.layerUpdates.size>0){let ee=zd(de.width,de.height,w.format,w.type);for(let ae of w.layerUpdates){let Re=de.data.subarray(ae*ee/de.data.BYTES_PER_ELEMENT,(ae+1)*ee/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ae,de.width,de.height,1,Le,We,Re)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Le,We,de.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ze,de.width,de.height,de.depth,0,Le,We,de.data);else if(w.isData3DTexture)Je?(Dt&&t.texStorage3D(i.TEXTURE_3D,_e,Ze,de.width,de.height,de.depth),V&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Le,We,de.data)):t.texImage3D(i.TEXTURE_3D,0,Ze,de.width,de.height,de.depth,0,Le,We,de.data);else if(w.isFramebufferTexture){if(Dt)if(Je)t.texStorage2D(i.TEXTURE_2D,_e,Ze,de.width,de.height);else{let ee=de.width,ae=de.height;for(let Re=0;Re<_e;Re++)t.texImage2D(i.TEXTURE_2D,Re,Ze,ee,ae,0,Le,We,null),ee>>=1,ae>>=1}}else if(at.length>0){if(Je&&Dt){let ee=Ue(at[0]);t.texStorage2D(i.TEXTURE_2D,_e,Ze,ee.width,ee.height)}for(let ee=0,ae=at.length;ee<ae;ee++)De=at[ee],Je?V&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Le,We,De):t.texImage2D(i.TEXTURE_2D,ee,Ze,Le,We,De);w.generateMipmaps=!1}else if(Je){if(Dt){let ee=Ue(de);t.texStorage2D(i.TEXTURE_2D,_e,Ze,ee.width,ee.height)}V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Le,We,de)}else t.texImage2D(i.TEXTURE_2D,0,Ze,Le,We,de);m(w)&&d(re),Ie.__version=ie.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function D(P,w,Y){if(w.image.length!==6)return;let re=pt(P,w),ce=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+Y);let ie=n.get(ce);if(ce.version!==ie.__version||re===!0){t.activeTexture(i.TEXTURE0+Y);let Ie=yt.getPrimaries(yt.workingColorSpace),xe=w.colorSpace===Mi?null:yt.getPrimaries(w.colorSpace),Ae=w.colorSpace===Mi||Ie===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let ht=w.isCompressedTexture||w.image[0].isCompressedTexture,de=w.image[0]&&w.image[0].isDataTexture,Le=[];for(let ae=0;ae<6;ae++)!ht&&!de?Le[ae]=b(w.image[ae],!0,s.maxCubemapSize):Le[ae]=de?w.image[ae].image:w.image[ae],Le[ae]=Ye(w,Le[ae]);let We=Le[0],Ze=r.convert(w.format,w.colorSpace),De=r.convert(w.type),at=M(w.internalFormat,Ze,De,w.colorSpace),Je=w.isVideoTexture!==!0,Dt=ie.__version===void 0||re===!0,V=ce.dataReady,_e=R(w,We);Ke(i.TEXTURE_CUBE_MAP,w);let ee;if(ht){Je&&Dt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,at,We.width,We.height);for(let ae=0;ae<6;ae++){ee=Le[ae].mipmaps;for(let Re=0;Re<ee.length;Re++){let Ee=ee[Re];w.format!==ei?Ze!==null?Je?V&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Re,0,0,Ee.width,Ee.height,Ze,Ee.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Re,at,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Je?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Re,0,0,Ee.width,Ee.height,Ze,De,Ee.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Re,at,Ee.width,Ee.height,0,Ze,De,Ee.data)}}}else{if(ee=w.mipmaps,Je&&Dt){ee.length>0&&_e++;let ae=Ue(Le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,at,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(de){Je?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Le[ae].width,Le[ae].height,Ze,De,Le[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,at,Le[ae].width,Le[ae].height,0,Ze,De,Le[ae].data);for(let Re=0;Re<ee.length;Re++){let nt=ee[Re].image[ae].image;Je?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Re+1,0,0,nt.width,nt.height,Ze,De,nt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Re+1,at,nt.width,nt.height,0,Ze,De,nt.data)}}else{Je?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ze,De,Le[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,at,Ze,De,Le[ae]);for(let Re=0;Re<ee.length;Re++){let Ee=ee[Re];Je?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Re+1,0,0,Ze,De,Ee.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Re+1,at,Ze,De,Ee.image[ae])}}}m(w)&&d(i.TEXTURE_CUBE_MAP),ie.__version=ce.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function k(P,w,Y,re,ce,ie){let Ie=r.convert(Y.format,Y.colorSpace),xe=r.convert(Y.type),Ae=M(Y.internalFormat,Ie,xe,Y.colorSpace),ht=n.get(w),de=n.get(Y);if(de.__renderTarget=w,!ht.__hasExternalTextures){let Le=Math.max(1,w.width>>ie),We=Math.max(1,w.height>>ie);ce===i.TEXTURE_3D||ce===i.TEXTURE_2D_ARRAY?t.texImage3D(ce,ie,Ae,Le,We,w.depth,0,Ie,xe,null):t.texImage2D(ce,ie,Ae,Le,We,0,Ie,xe,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),ge(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ce,de.__webglTexture,0,oe(w)):(ce===i.TEXTURE_2D||ce>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,ce,de.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(P,w,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,P),w.depthBuffer){let re=w.depthTexture,ce=re&&re.isDepthTexture?re.type:null,ie=y(w.stencilBuffer,ce),Ie=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xe=oe(w);ge(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xe,ie,w.width,w.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,xe,ie,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ie,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ie,i.RENDERBUFFER,P)}else{let re=w.textures;for(let ce=0;ce<re.length;ce++){let ie=re[ce],Ie=r.convert(ie.format,ie.colorSpace),xe=r.convert(ie.type),Ae=M(ie.internalFormat,Ie,xe,ie.colorSpace),ht=oe(w);Y&&ge(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,Ae,w.width,w.height):ge(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,Ae,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function he(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let re=n.get(w.depthTexture);re.__renderTarget=w,(!re.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),j(w.depthTexture,0);let ce=re.__webglTexture,ie=oe(w);if(w.depthTexture.format===Nr)ge(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ce,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ce,0);else if(w.depthTexture.format===Wr)ge(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ce,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ce,0);else throw new Error("Unknown depthTexture format")}function me(P){let w=n.get(P),Y=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){let re=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),re){let ce=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,re.removeEventListener("dispose",ce)};re.addEventListener("dispose",ce),w.__depthDisposeCallback=ce}w.__boundDepthTexture=re}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");he(w.__webglFramebuffer,P)}else if(Y){w.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[re]),w.__webglDepthbuffer[re]===void 0)w.__webglDepthbuffer[re]=i.createRenderbuffer(),Z(w.__webglDepthbuffer[re],P,!1);else{let ce=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=w.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,ie)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Z(w.__webglDepthbuffer,P,!1);else{let re=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,ce)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ce(P,w,Y){let re=n.get(P);w!==void 0&&k(re.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&me(P)}function et(P){let w=P.texture,Y=n.get(P),re=n.get(w);P.addEventListener("dispose",C);let ce=P.textures,ie=P.isWebGLCubeRenderTarget===!0,Ie=ce.length>1;if(Ie||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=w.version,o.memory.textures++),ie){Y.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(w.mipmaps&&w.mipmaps.length>0){Y.__webglFramebuffer[xe]=[];for(let Ae=0;Ae<w.mipmaps.length;Ae++)Y.__webglFramebuffer[xe][Ae]=i.createFramebuffer()}else Y.__webglFramebuffer[xe]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){Y.__webglFramebuffer=[];for(let xe=0;xe<w.mipmaps.length;xe++)Y.__webglFramebuffer[xe]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Ie)for(let xe=0,Ae=ce.length;xe<Ae;xe++){let ht=n.get(ce[xe]);ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&ge(P)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let xe=0;xe<ce.length;xe++){let Ae=ce[xe];Y.__webglColorRenderbuffer[xe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[xe]);let ht=r.convert(Ae.format,Ae.colorSpace),de=r.convert(Ae.type),Le=M(Ae.internalFormat,ht,de,Ae.colorSpace,P.isXRRenderTarget===!0),We=oe(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,Le,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,Y.__webglColorRenderbuffer[xe])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),Z(Y.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),Ke(i.TEXTURE_CUBE_MAP,w);for(let xe=0;xe<6;xe++)if(w.mipmaps&&w.mipmaps.length>0)for(let Ae=0;Ae<w.mipmaps.length;Ae++)k(Y.__webglFramebuffer[xe][Ae],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ae);else k(Y.__webglFramebuffer[xe],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);m(w)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let xe=0,Ae=ce.length;xe<Ae;xe++){let ht=ce[xe],de=n.get(ht);t.bindTexture(i.TEXTURE_2D,de.__webglTexture),Ke(i.TEXTURE_2D,ht),k(Y.__webglFramebuffer,P,ht,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,0),m(ht)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let xe=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(xe=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,re.__webglTexture),Ke(xe,w),w.mipmaps&&w.mipmaps.length>0)for(let Ae=0;Ae<w.mipmaps.length;Ae++)k(Y.__webglFramebuffer[Ae],P,w,i.COLOR_ATTACHMENT0,xe,Ae);else k(Y.__webglFramebuffer,P,w,i.COLOR_ATTACHMENT0,xe,0);m(w)&&d(xe),t.unbindTexture()}P.depthBuffer&&me(P)}function Be(P){let w=P.textures;for(let Y=0,re=w.length;Y<re;Y++){let ce=w[Y];if(m(ce)){let ie=v(P),Ie=n.get(ce).__webglTexture;t.bindTexture(ie,Ie),d(ie),t.unbindTexture()}}}let bt=[],H=[];function It(P){if(P.samples>0){if(ge(P)===!1){let w=P.textures,Y=P.width,re=P.height,ce=i.COLOR_BUFFER_BIT,ie=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ie=n.get(P),xe=w.length>1;if(xe)for(let Ae=0;Ae<w.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Ae=0;Ae<w.length;Ae++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ce|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ce|=i.STENCIL_BUFFER_BIT)),xe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ae]);let ht=n.get(w[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ht,0)}i.blitFramebuffer(0,0,Y,re,0,0,Y,re,ce,i.NEAREST),c===!0&&(bt.length=0,H.length=0,bt.push(i.COLOR_ATTACHMENT0+Ae),P.depthBuffer&&P.resolveDepthBuffer===!1&&(bt.push(ie),H.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,H)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xe)for(let Ae=0;Ae<w.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ae]);let ht=n.get(w[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,ht,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){let w=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function oe(P){return Math.min(s.maxSamples,P.samples)}function ge(P){let w=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function be(P){let w=o.render.frame;u.get(P)!==w&&(u.set(P,w),P.update())}function Ye(P,w){let Y=P.colorSpace,re=P.format,ce=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Y!==hn&&Y!==Mi&&(yt.getTransfer(Y)===Ut?(re!==ei||ce!==Oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),w}function Ue(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=F,this.setTexture2D=j,this.setTexture2DArray=K,this.setTexture3D=ue,this.setTextureCube=$,this.rebindTextures=Ce,this.setupRenderTarget=et,this.updateRenderTargetMipmap=Be,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=k,this.useMultisampledRTT=ge}function M_(i,e){function t(n,s=Mi){let r,o=yt.getTransfer(s);if(n===Oi)return i.UNSIGNED_BYTE;if(n===ch)return i.UNSIGNED_SHORT_4_4_4_4;if(n===lh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ap)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===rp)return i.BYTE;if(n===op)return i.SHORT;if(n===Do)return i.UNSIGNED_SHORT;if(n===ah)return i.INT;if(n===Vs)return i.UNSIGNED_INT;if(n===pi)return i.FLOAT;if(n===Xo)return i.HALF_FLOAT;if(n===cp)return i.ALPHA;if(n===lp)return i.RGB;if(n===ei)return i.RGBA;if(n===up)return i.LUMINANCE;if(n===hp)return i.LUMINANCE_ALPHA;if(n===Nr)return i.DEPTH_COMPONENT;if(n===Wr)return i.DEPTH_STENCIL;if(n===uh)return i.RED;if(n===hh)return i.RED_INTEGER;if(n===fp)return i.RG;if(n===fh)return i.RG_INTEGER;if(n===dh)return i.RGBA_INTEGER;if(n===Ba||n===Ha||n===Ga||n===Va)if(o===Ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ha)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ga)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Va)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$l||n===eu||n===tu||n===nu)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$l)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===eu)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===tu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===iu||n===su||n===ru)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===iu||n===su)return o===Ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ru)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ou||n===au||n===cu||n===lu||n===uu||n===hu||n===fu||n===du||n===pu||n===mu||n===gu||n===xu||n===bu||n===yu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ou)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===au)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===cu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===uu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===du)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===bu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===yu)return o===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Wa||n===vu||n===_u)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Wa)return o===Ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===vu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_u)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dp||n===Mu||n===Su||n===wu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Wa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Mu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Su)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Ou=class extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Wt=class extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}},S_={type:"move"},Po=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let b of e.hand.values()){let m=t.getJointPose(b,n),d=this._getHandJoint(l,b);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,x=.005;l.inputState.pinching&&f>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(S_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Wt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},w_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,E_=`
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

}`,Bu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new ln,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Qt({vertexShader:w_,fragmentShader:E_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ye(new xi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Hu=class extends Bi{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,p=null,x=null,b=new Bu,m=t.getContextAttributes(),d=null,v=null,M=[],y=[],R=new Xe,E=null,C=new tn;C.viewport=new Ct;let I=new tn;I.viewport=new Ct;let _=[C,I],S=new Ou,U=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let D=M[se];return D===void 0&&(D=new Po,M[se]=D),D.getTargetRaySpace()},this.getControllerGrip=function(se){let D=M[se];return D===void 0&&(D=new Po,M[se]=D),D.getGripSpace()},this.getHand=function(se){let D=M[se];return D===void 0&&(D=new Po,M[se]=D),D.getHandSpace()};function G(se){let D=y.indexOf(se.inputSource);if(D===-1)return;let k=M[D];k!==void 0&&(k.update(se.inputSource,se.frame,l||o),k.dispatchEvent({type:se.type,data:se.inputSource}))}function q(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",j);for(let se=0;se<M.length;se++){let D=y[se];D!==null&&(y[se]=null,M[se].disconnect(D))}U=null,F=null,b.reset(),e.setRenderTarget(d),p=null,f=null,h=null,s=null,v=null,pt.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){r=se,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){a=se,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(se){l=se},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(se){if(s=se,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",q),s.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(R),s.renderState.layers===void 0){let D={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,D),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new ti(p.framebufferWidth,p.framebufferHeight,{format:ei,type:Oi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let D=null,k=null,Z=null;m.depth&&(Z=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,D=m.stencil?Wr:Nr,k=m.stencil?Vr:Vs);let he={colorFormat:t.RGBA8,depthFormat:Z,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(he),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new ti(f.textureWidth,f.textureHeight,{format:ei,type:Oi,depthTexture:new ec(f.textureWidth,f.textureHeight,k,void 0,void 0,void 0,void 0,void 0,void 0,D),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),pt.setContext(s),pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function j(se){for(let D=0;D<se.removed.length;D++){let k=se.removed[D],Z=y.indexOf(k);Z>=0&&(y[Z]=null,M[Z].disconnect(k))}for(let D=0;D<se.added.length;D++){let k=se.added[D],Z=y.indexOf(k);if(Z===-1){for(let me=0;me<M.length;me++)if(me>=y.length){y.push(k),Z=me;break}else if(y[me]===null){y[me]=k,Z=me;break}if(Z===-1)break}let he=M[Z];he&&he.connect(k)}}let K=new B,ue=new B;function $(se,D,k){K.setFromMatrixPosition(D.matrixWorld),ue.setFromMatrixPosition(k.matrixWorld);let Z=K.distanceTo(ue),he=D.projectionMatrix.elements,me=k.projectionMatrix.elements,Ce=he[14]/(he[10]-1),et=he[14]/(he[10]+1),Be=(he[9]+1)/he[5],bt=(he[9]-1)/he[5],H=(he[8]-1)/he[0],It=(me[8]+1)/me[0],oe=Ce*H,ge=Ce*It,be=Z/(-H+It),Ye=be*-H;if(D.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(Ye),se.translateZ(be),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),he[10]===-1)se.projectionMatrix.copy(D.projectionMatrix),se.projectionMatrixInverse.copy(D.projectionMatrixInverse);else{let Ue=Ce+be,P=et+be,w=oe-Ye,Y=ge+(Z-Ye),re=Be*et/P*Ue,ce=bt*et/P*Ue;se.projectionMatrix.makePerspective(w,Y,re,ce,Ue,P),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function ve(se,D){D===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(D.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(s===null)return;let D=se.near,k=se.far;b.texture!==null&&(b.depthNear>0&&(D=b.depthNear),b.depthFar>0&&(k=b.depthFar)),S.near=I.near=C.near=D,S.far=I.far=C.far=k,(U!==S.near||F!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),U=S.near,F=S.far),C.layers.mask=se.layers.mask|2,I.layers.mask=se.layers.mask|4,S.layers.mask=C.layers.mask|I.layers.mask;let Z=se.parent,he=S.cameras;ve(S,Z);for(let me=0;me<he.length;me++)ve(he[me],Z);he.length===2?$(S,C,I):S.projectionMatrix.copy(C.projectionMatrix),we(se,S,Z)};function we(se,D,k){k===null?se.matrix.copy(D.matrixWorld):(se.matrix.copy(k.matrixWorld),se.matrix.invert(),se.matrix.multiply(D.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(D.projectionMatrix),se.projectionMatrixInverse.copy(D.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=Yr*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(se){c=se,f!==null&&(f.fixedFoveation=se),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=se)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(S)};let Fe=null;function Ke(se,D){if(u=D.getViewerPose(l||o),x=D,u!==null){let k=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let Z=!1;k.length!==S.cameras.length&&(S.cameras.length=0,Z=!0);for(let me=0;me<k.length;me++){let Ce=k[me],et=null;if(p!==null)et=p.getViewport(Ce);else{let bt=h.getViewSubImage(f,Ce);et=bt.viewport,me===0&&(e.setRenderTargetTextures(v,bt.colorTexture,f.ignoreDepthValues?void 0:bt.depthStencilTexture),e.setRenderTarget(v))}let Be=_[me];Be===void 0&&(Be=new tn,Be.layers.enable(me),Be.viewport=new Ct,_[me]=Be),Be.matrix.fromArray(Ce.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(Ce.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(et.x,et.y,et.width,et.height),me===0&&(S.matrix.copy(Be.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),Z===!0&&S.cameras.push(Be)}let he=s.enabledFeatures;if(he&&he.includes("depth-sensing")){let me=h.getDepthInformation(k[0]);me&&me.isValid&&me.texture&&b.init(e,me,s.renderState)}}for(let k=0;k<M.length;k++){let Z=y[k],he=M[k];Z!==null&&he!==void 0&&he.update(Z,D,l||o)}Fe&&Fe(se,D),D.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:D}),x=null}let pt=new _p;pt.setAnimationLoop(Ke),this.setAnimationLoop=function(se){Fe=se},this.dispose=function(){}}},Fs=new gi,T_=new ot;function A_(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,vp(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,v,M,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(r(m,d),x(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),b(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,v,M):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===nn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===nn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let v=e.get(d),M=v.envMap,y=v.envMapRotation;M&&(m.envMap.value=M,Fs.copy(y),Fs.x*=-1,Fs.y*=-1,Fs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Fs.y*=-1,Fs.z*=-1),m.envMapRotation.value.setFromMatrix4(T_.makeRotationFromEuler(Fs)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,v,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*v,m.scale.value=M*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,v){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===nn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,d){d.matcap&&(m.matcap.value=d.matcap)}function b(m,d){let v=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function R_(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){let y=M.program;n.uniformBlockBinding(v,y)}function l(v,M){let y=s[v.id];y===void 0&&(x(v),y=u(v),s[v.id]=y,v.addEventListener("dispose",m));let R=M.program;n.updateUBOMapping(v,R);let E=e.render.frame;r[v.id]!==E&&(f(v),r[v.id]=E)}function u(v){let M=h();v.__bindingPointIndex=M;let y=i.createBuffer(),R=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,R,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let M=s[v.id],y=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let E=0,C=y.length;E<C;E++){let I=Array.isArray(y[E])?y[E]:[y[E]];for(let _=0,S=I.length;_<S;_++){let U=I[_];if(p(U,E,_,R)===!0){let F=U.__offset,G=Array.isArray(U.value)?U.value:[U.value],q=0;for(let j=0;j<G.length;j++){let K=G[j],ue=b(K);typeof K=="number"||typeof K=="boolean"?(U.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,F+q,U.__data)):K.isMatrix3?(U.__data[0]=K.elements[0],U.__data[1]=K.elements[1],U.__data[2]=K.elements[2],U.__data[3]=0,U.__data[4]=K.elements[3],U.__data[5]=K.elements[4],U.__data[6]=K.elements[5],U.__data[7]=0,U.__data[8]=K.elements[6],U.__data[9]=K.elements[7],U.__data[10]=K.elements[8],U.__data[11]=0):(K.toArray(U.__data,q),q+=ue.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,M,y,R){let E=v.value,C=M+"_"+y;if(R[C]===void 0)return typeof E=="number"||typeof E=="boolean"?R[C]=E:R[C]=E.clone(),!0;{let I=R[C];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return R[C]=E,!0}else if(I.equals(E)===!1)return I.copy(E),!0}return!1}function x(v){let M=v.uniforms,y=0,R=16;for(let C=0,I=M.length;C<I;C++){let _=Array.isArray(M[C])?M[C]:[M[C]];for(let S=0,U=_.length;S<U;S++){let F=_[S],G=Array.isArray(F.value)?F.value:[F.value];for(let q=0,j=G.length;q<j;q++){let K=G[q],ue=b(K),$=y%R,ve=$%ue.boundary,we=$+ve;y+=ve,we!==0&&R-we<ue.storage&&(y+=R-we),F.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=ue.storage}}}let E=y%R;return E>0&&(y+=R-E),v.__size=y,v.__cache={},this}function b(v){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){let M=v.target;M.removeEventListener("dispose",m);let y=o.indexOf(M.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function d(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}var tc=class{constructor(e={}){let{canvas:t=L0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let x=new Uint32Array(4),b=new Int32Array(4),m=null,d=null,v=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this.toneMapping=us,this.toneMappingExposure=1;let y=this,R=!1,E=0,C=0,I=null,_=-1,S=null,U=new Ct,F=new Ct,G=null,q=new ze(0),j=0,K=t.width,ue=t.height,$=1,ve=null,we=null,Fe=new Ct(0,0,K,ue),Ke=new Ct(0,0,K,ue),pt=!1,se=new No,D=!1,k=!1,Z=new ot,he=new ot,me=new B,Ce=new Ct,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Be=!1;function bt(){return I===null?$:1}let H=n;function It(A,X){return t.getContext(A,X)}try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${nh}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",Re,!1),t.addEventListener("webglcontextcreationerror",Ee,!1),H===null){let X="webgl2";if(H=It(X,A),H===null)throw It(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let oe,ge,be,Ye,Ue,P,w,Y,re,ce,ie,Ie,xe,Ae,ht,de,Le,We,Ze,De,at,Je,Dt,V;function _e(){oe=new Wy(H),oe.init(),Je=new M_(H,oe),ge=new Fy(H,oe,e,Je),be=new y_(H,oe),ge.reverseDepthBuffer&&f&&be.buffers.depth.setReversed(!0),Ye=new Yy(H),Ue=new o_,P=new __(H,oe,be,Ue,ge,Je,Ye),w=new By(y),Y=new Vy(y),re=new ex(H),Dt=new Ny(H,re),ce=new Xy(H,re,Ye,Dt),ie=new Zy(H,ce,re,Ye),Ze=new jy(H,ge,P),de=new Oy(Ue),Ie=new r_(y,w,Y,oe,ge,Dt,de),xe=new A_(y,Ue),Ae=new c_,ht=new p_(oe),We=new Uy(y,w,Y,be,ie,p,c),Le=new x_(y,ie,ge),V=new R_(H,Ye,ge,be),De=new ky(H,oe,Ye),at=new qy(H,oe,Ye),Ye.programs=Ie.programs,y.capabilities=ge,y.extensions=oe,y.properties=Ue,y.renderLists=Ae,y.shadowMap=Le,y.state=be,y.info=Ye}_e();let ee=new Hu(y,H);this.xr=ee,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let A=oe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=oe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(A){A!==void 0&&($=A,this.setSize(K,ue,!1))},this.getSize=function(A){return A.set(K,ue)},this.setSize=function(A,X,J=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=A,ue=X,t.width=Math.floor(A*$),t.height=Math.floor(X*$),J===!0&&(t.style.width=A+"px",t.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(K*$,ue*$).floor()},this.setDrawingBufferSize=function(A,X,J){K=A,ue=X,$=J,t.width=Math.floor(A*J),t.height=Math.floor(X*J),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(U)},this.getViewport=function(A){return A.copy(Fe)},this.setViewport=function(A,X,J,Q){A.isVector4?Fe.set(A.x,A.y,A.z,A.w):Fe.set(A,X,J,Q),be.viewport(U.copy(Fe).multiplyScalar($).round())},this.getScissor=function(A){return A.copy(Ke)},this.setScissor=function(A,X,J,Q){A.isVector4?Ke.set(A.x,A.y,A.z,A.w):Ke.set(A,X,J,Q),be.scissor(F.copy(Ke).multiplyScalar($).round())},this.getScissorTest=function(){return pt},this.setScissorTest=function(A){be.setScissorTest(pt=A)},this.setOpaqueSort=function(A){ve=A},this.setTransparentSort=function(A){we=A},this.getClearColor=function(A){return A.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor.apply(We,arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha.apply(We,arguments)},this.clear=function(A=!0,X=!0,J=!0){let Q=0;if(A){let W=!1;if(I!==null){let pe=I.texture.format;W=pe===dh||pe===fh||pe===hh}if(W){let pe=I.texture.type,Se=pe===Oi||pe===Vs||pe===Do||pe===Vr||pe===ch||pe===lh,Pe=We.getClearColor(),ke=We.getClearAlpha(),Qe=Pe.r,rt=Pe.g,He=Pe.b;Se?(x[0]=Qe,x[1]=rt,x[2]=He,x[3]=ke,H.clearBufferuiv(H.COLOR,0,x)):(b[0]=Qe,b[1]=rt,b[2]=He,b[3]=ke,H.clearBufferiv(H.COLOR,0,b))}else Q|=H.COLOR_BUFFER_BIT}X&&(Q|=H.DEPTH_BUFFER_BIT),J&&(Q|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",Re,!1),t.removeEventListener("webglcontextcreationerror",Ee,!1),Ae.dispose(),ht.dispose(),Ue.dispose(),w.dispose(),Y.dispose(),ie.dispose(),Dt.dispose(),V.dispose(),Ie.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",jc),ee.removeEventListener("sessionend",As),kn.stop()};function ae(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Re(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let A=Ye.autoReset,X=Le.enabled,J=Le.autoUpdate,Q=Le.needsUpdate,W=Le.type;_e(),Ye.autoReset=A,Le.enabled=X,Le.autoUpdate=J,Le.needsUpdate=Q,Le.type=W}function Ee(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function nt(A){let X=A.target;X.removeEventListener("dispose",nt),Ve(X)}function Ve(A){Zt(A),Ue.remove(A)}function Zt(A){let X=Ue.get(A).programs;X!==void 0&&(X.forEach(function(J){Ie.releaseProgram(J)}),A.isShaderMaterial&&Ie.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,J,Q,W,pe){X===null&&(X=et);let Se=W.isMesh&&W.matrixWorld.determinant()<0,Pe=nr(A,X,J,Q,W);be.setMaterial(Q,Se);let ke=J.index,Qe=1;if(Q.wireframe===!0){if(ke=ce.getWireframeAttribute(J),ke===void 0)return;Qe=2}let rt=J.drawRange,He=J.attributes.position,ft=rt.start*Qe,At=(rt.start+rt.count)*Qe;pe!==null&&(ft=Math.max(ft,pe.start*Qe),At=Math.min(At,(pe.start+pe.count)*Qe)),ke!==null?(ft=Math.max(ft,0),At=Math.min(At,ke.count)):He!=null&&(ft=Math.max(ft,0),At=Math.min(At,He.count));let kt=At-ft;if(kt<0||kt===1/0)return;Dt.setup(W,Q,Pe,J,ke);let an,Mt=De;if(ke!==null&&(an=re.get(ke),Mt=at,Mt.setIndex(an)),W.isMesh)Q.wireframe===!0?(be.setLineWidth(Q.wireframeLinewidth*bt()),Mt.setMode(H.LINES)):Mt.setMode(H.TRIANGLES);else if(W.isLine){let Ge=Q.linewidth;Ge===void 0&&(Ge=1),be.setLineWidth(Ge*bt()),W.isLineSegments?Mt.setMode(H.LINES):W.isLineLoop?Mt.setMode(H.LINE_LOOP):Mt.setMode(H.LINE_STRIP)}else W.isPoints?Mt.setMode(H.POINTS):W.isSprite&&Mt.setMode(H.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Mt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(oe.get("WEBGL_multi_draw"))Mt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Ge=W._multiDrawStarts,ai=W._multiDrawCounts,wt=W._multiDrawCount,Ln=ke?re.get(ke).bytesPerElement:1,wi=Ue.get(Q).currentProgram.getUniforms();for(let pn=0;pn<wt;pn++)wi.setValue(H,"_gl_DrawID",pn),Mt.render(Ge[pn]/Ln,ai[pn])}else if(W.isInstancedMesh)Mt.renderInstances(ft,kt,W.count);else if(J.isInstancedBufferGeometry){let Ge=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,ai=Math.min(J.instanceCount,Ge);Mt.renderInstances(ft,kt,ai)}else Mt.render(ft,kt)};function vt(A,X,J){A.transparent===!0&&A.side===Lt&&A.forceSinglePass===!1?(A.side=nn,A.needsUpdate=!0,dn(A,X,J),A.side=Vn,A.needsUpdate=!0,dn(A,X,J),A.side=Lt):dn(A,X,J)}this.compile=function(A,X,J=null){J===null&&(J=A),d=ht.get(J),d.init(X),M.push(d),J.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),A!==J&&A.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),d.setupLights();let Q=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let pe=W.material;if(pe)if(Array.isArray(pe))for(let Se=0;Se<pe.length;Se++){let Pe=pe[Se];vt(Pe,J,W),Q.add(Pe)}else vt(pe,J,W),Q.add(pe)}),M.pop(),d=null,Q},this.compileAsync=function(A,X,J=null){let Q=this.compile(A,X,J);return new Promise(W=>{function pe(){if(Q.forEach(function(Se){Ue.get(Se).currentProgram.isReady()&&Q.delete(Se)}),Q.size===0){W(A);return}setTimeout(pe,10)}oe.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let In=null;function oi(A){In&&In(A)}function jc(){kn.stop()}function As(){kn.start()}let kn=new _p;kn.setAnimationLoop(oi),typeof self<"u"&&kn.setContext(self),this.setAnimationLoop=function(A){In=A,ee.setAnimationLoop(A),A===null?kn.stop():kn.start()},ee.addEventListener("sessionstart",jc),ee.addEventListener("sessionend",As),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(X),X=ee.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,X,I),d=ht.get(A,M.length),d.init(X),M.push(d),he.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),se.setFromProjectionMatrix(he),k=this.localClippingEnabled,D=de.init(this.clippingPlanes,k),m=Ae.get(A,v.length),m.init(),v.push(m),ee.enabled===!0&&ee.isPresenting===!0){let pe=y.xr.getDepthSensingMesh();pe!==null&&Zi(pe,X,-1/0,y.sortObjects)}Zi(A,X,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ve,we),Be=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Be&&We.addToRenderList(m,A),this.info.render.frame++,D===!0&&de.beginShadows();let J=d.state.shadowsArray;Le.render(J,A,X),D===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();let Q=m.opaque,W=m.transmissive;if(d.setupLights(),X.isArrayCamera){let pe=X.cameras;if(W.length>0)for(let Se=0,Pe=pe.length;Se<Pe;Se++){let ke=pe[Se];ea(Q,W,A,ke)}Be&&We.render(A);for(let Se=0,Pe=pe.length;Se<Pe;Se++){let ke=pe[Se];$s(m,A,ke,ke.viewport)}}else W.length>0&&ea(Q,W,A,X),Be&&We.render(A),$s(m,A,X);I!==null&&(P.updateMultisampleRenderTarget(I),P.updateRenderTargetMipmap(I)),A.isScene===!0&&A.onAfterRender(y,A,X),Dt.resetDefaultState(),_=-1,S=null,M.pop(),M.length>0?(d=M[M.length-1],D===!0&&de.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Zi(A,X,J,Q){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)J=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)d.pushLight(A),A.castShadow&&d.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||se.intersectsSprite(A)){Q&&Ce.setFromMatrixPosition(A.matrixWorld).applyMatrix4(he);let Se=ie.update(A),Pe=A.material;Pe.visible&&m.push(A,Se,Pe,J,Ce.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||se.intersectsObject(A))){let Se=ie.update(A),Pe=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ce.copy(A.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ce.copy(Se.boundingSphere.center)),Ce.applyMatrix4(A.matrixWorld).applyMatrix4(he)),Array.isArray(Pe)){let ke=Se.groups;for(let Qe=0,rt=ke.length;Qe<rt;Qe++){let He=ke[Qe],ft=Pe[He.materialIndex];ft&&ft.visible&&m.push(A,Se,ft,J,Ce.z,He)}}else Pe.visible&&m.push(A,Se,Pe,J,Ce.z,null)}}let pe=A.children;for(let Se=0,Pe=pe.length;Se<Pe;Se++)Zi(pe[Se],X,J,Q)}function $s(A,X,J,Q){let W=A.opaque,pe=A.transmissive,Se=A.transparent;d.setupLightsView(J),D===!0&&de.setGlobalState(y.clippingPlanes,J),Q&&be.viewport(U.copy(Q)),W.length>0&&er(W,X,J),pe.length>0&&er(pe,X,J),Se.length>0&&er(Se,X,J),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function ea(A,X,J,Q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Q.id]===void 0&&(d.state.transmissionRenderTarget[Q.id]=new ti(1,1,{generateMipmaps:!0,type:oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float")?Xo:Oi,minFilter:$n,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:yt.workingColorSpace}));let pe=d.state.transmissionRenderTarget[Q.id],Se=Q.viewport||U;pe.setSize(Se.z,Se.w);let Pe=y.getRenderTarget();y.setRenderTarget(pe),y.getClearColor(q),j=y.getClearAlpha(),j<1&&y.setClearColor(16777215,.5),y.clear(),Be&&We.render(J);let ke=y.toneMapping;y.toneMapping=us;let Qe=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),d.setupLightsView(Q),D===!0&&de.setGlobalState(y.clippingPlanes,Q),er(A,J,Q),P.updateMultisampleRenderTarget(pe),P.updateRenderTargetMipmap(pe),oe.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let He=0,ft=X.length;He<ft;He++){let At=X[He],kt=At.object,an=At.geometry,Mt=At.material,Ge=At.group;if(Mt.side===Lt&&kt.layers.test(Q.layers)){let ai=Mt.side;Mt.side=nn,Mt.needsUpdate=!0,Rs(kt,J,Q,an,Mt,Ge),Mt.side=ai,Mt.needsUpdate=!0,rt=!0}}rt===!0&&(P.updateMultisampleRenderTarget(pe),P.updateRenderTargetMipmap(pe))}y.setRenderTarget(Pe),y.setClearColor(q,j),Qe!==void 0&&(Q.viewport=Qe),y.toneMapping=ke}function er(A,X,J){let Q=X.isScene===!0?X.overrideMaterial:null;for(let W=0,pe=A.length;W<pe;W++){let Se=A[W],Pe=Se.object,ke=Se.geometry,Qe=Q===null?Se.material:Q,rt=Se.group;Pe.layers.test(J.layers)&&Rs(Pe,X,J,ke,Qe,rt)}}function Rs(A,X,J,Q,W,pe){A.onBeforeRender(y,X,J,Q,W,pe),A.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(y,X,J,Q,A,pe),W.transparent===!0&&W.side===Lt&&W.forceSinglePass===!1?(W.side=nn,W.needsUpdate=!0,y.renderBufferDirect(J,X,Q,W,A,pe),W.side=Vn,W.needsUpdate=!0,y.renderBufferDirect(J,X,Q,W,A,pe),W.side=Lt):y.renderBufferDirect(J,X,Q,W,A,pe),A.onAfterRender(y,X,J,Q,W,pe)}function dn(A,X,J){X.isScene!==!0&&(X=et);let Q=Ue.get(A),W=d.state.lights,pe=d.state.shadowsArray,Se=W.state.version,Pe=Ie.getParameters(A,W.state,pe,X,J),ke=Ie.getProgramCacheKey(Pe),Qe=Q.programs;Q.environment=A.isMeshStandardMaterial?X.environment:null,Q.fog=X.fog,Q.envMap=(A.isMeshStandardMaterial?Y:w).get(A.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,Qe===void 0&&(A.addEventListener("dispose",nt),Qe=new Map,Q.programs=Qe);let rt=Qe.get(ke);if(rt!==void 0){if(Q.currentProgram===rt&&Q.lightsStateVersion===Se)return Pn(A,Pe),rt}else Pe.uniforms=Ie.getUniforms(A),A.onBeforeCompile(Pe,y),rt=Ie.acquireProgram(Pe,ke),Qe.set(ke,rt),Q.uniforms=Pe.uniforms;let He=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(He.clippingPlanes=de.uniform),Pn(A,Pe),Q.needsLights=Zc(A),Q.lightsStateVersion=Se,Q.needsLights&&(He.ambientLightColor.value=W.state.ambient,He.lightProbe.value=W.state.probe,He.directionalLights.value=W.state.directional,He.directionalLightShadows.value=W.state.directionalShadow,He.spotLights.value=W.state.spot,He.spotLightShadows.value=W.state.spotShadow,He.rectAreaLights.value=W.state.rectArea,He.ltc_1.value=W.state.rectAreaLTC1,He.ltc_2.value=W.state.rectAreaLTC2,He.pointLights.value=W.state.point,He.pointLightShadows.value=W.state.pointShadow,He.hemisphereLights.value=W.state.hemi,He.directionalShadowMap.value=W.state.directionalShadowMap,He.directionalShadowMatrix.value=W.state.directionalShadowMatrix,He.spotShadowMap.value=W.state.spotShadowMap,He.spotLightMatrix.value=W.state.spotLightMatrix,He.spotLightMap.value=W.state.spotLightMap,He.pointShadowMap.value=W.state.pointShadowMap,He.pointShadowMatrix.value=W.state.pointShadowMatrix),Q.currentProgram=rt,Q.uniformsList=null,rt}function tr(A){if(A.uniformsList===null){let X=A.currentProgram.getUniforms();A.uniformsList=Fr.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function Pn(A,X){let J=Ue.get(A);J.outputColorSpace=X.outputColorSpace,J.batching=X.batching,J.batchingColor=X.batchingColor,J.instancing=X.instancing,J.instancingColor=X.instancingColor,J.instancingMorph=X.instancingMorph,J.skinning=X.skinning,J.morphTargets=X.morphTargets,J.morphNormals=X.morphNormals,J.morphColors=X.morphColors,J.morphTargetsCount=X.morphTargetsCount,J.numClippingPlanes=X.numClippingPlanes,J.numIntersection=X.numClipIntersection,J.vertexAlphas=X.vertexAlphas,J.vertexTangents=X.vertexTangents,J.toneMapping=X.toneMapping}function nr(A,X,J,Q,W){X.isScene!==!0&&(X=et),P.resetTextureUnits();let pe=X.fog,Se=Q.isMeshStandardMaterial?X.environment:null,Pe=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:hn,ke=(Q.isMeshStandardMaterial?Y:w).get(Q.envMap||Se),Qe=Q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,rt=!!J.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),He=!!J.morphAttributes.position,ft=!!J.morphAttributes.normal,At=!!J.morphAttributes.color,kt=us;Q.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(kt=y.toneMapping);let an=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Mt=an!==void 0?an.length:0,Ge=Ue.get(Q),ai=d.state.lights;if(D===!0&&(k===!0||A!==S)){let Sn=A===S&&Q.id===_;de.setState(Q,A,Sn)}let wt=!1;Q.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==ai.state.version||Ge.outputColorSpace!==Pe||W.isBatchedMesh&&Ge.batching===!1||!W.isBatchedMesh&&Ge.batching===!0||W.isBatchedMesh&&Ge.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ge.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ge.instancing===!1||!W.isInstancedMesh&&Ge.instancing===!0||W.isSkinnedMesh&&Ge.skinning===!1||!W.isSkinnedMesh&&Ge.skinning===!0||W.isInstancedMesh&&Ge.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ge.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ge.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ge.instancingMorph===!1&&W.morphTexture!==null||Ge.envMap!==ke||Q.fog===!0&&Ge.fog!==pe||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==de.numPlanes||Ge.numIntersection!==de.numIntersection)||Ge.vertexAlphas!==Qe||Ge.vertexTangents!==rt||Ge.morphTargets!==He||Ge.morphNormals!==ft||Ge.morphColors!==At||Ge.toneMapping!==kt||Ge.morphTargetsCount!==Mt)&&(wt=!0):(wt=!0,Ge.__version=Q.version);let Ln=Ge.currentProgram;wt===!0&&(Ln=dn(Q,X,W));let wi=!1,pn=!1,Ji=!1,zt=Ln.getUniforms(),mn=Ge.uniforms;if(be.useProgram(Ln.program)&&(wi=!0,pn=!0,Ji=!0),Q.id!==_&&(_=Q.id,pn=!0),wi||S!==A){be.buffers.depth.getReversed()?(Z.copy(A.projectionMatrix),z0(Z),U0(Z),zt.setValue(H,"projectionMatrix",Z)):zt.setValue(H,"projectionMatrix",A.projectionMatrix),zt.setValue(H,"viewMatrix",A.matrixWorldInverse);let Fn=zt.map.cameraPosition;Fn!==void 0&&Fn.setValue(H,me.setFromMatrixPosition(A.matrixWorld)),ge.logarithmicDepthBuffer&&zt.setValue(H,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&zt.setValue(H,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,pn=!0,Ji=!0)}if(W.isSkinnedMesh){zt.setOptional(H,W,"bindMatrix"),zt.setOptional(H,W,"bindMatrixInverse");let Sn=W.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),zt.setValue(H,"boneTexture",Sn.boneTexture,P))}W.isBatchedMesh&&(zt.setOptional(H,W,"batchingTexture"),zt.setValue(H,"batchingTexture",W._matricesTexture,P),zt.setOptional(H,W,"batchingIdTexture"),zt.setValue(H,"batchingIdTexture",W._indirectTexture,P),zt.setOptional(H,W,"batchingColorTexture"),W._colorsTexture!==null&&zt.setValue(H,"batchingColorTexture",W._colorsTexture,P));let Qi=J.morphAttributes;if((Qi.position!==void 0||Qi.normal!==void 0||Qi.color!==void 0)&&Ze.update(W,J,Ln),(pn||Ge.receiveShadow!==W.receiveShadow)&&(Ge.receiveShadow=W.receiveShadow,zt.setValue(H,"receiveShadow",W.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(mn.envMap.value=ke,mn.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&X.environment!==null&&(mn.envMapIntensity.value=X.environmentIntensity),pn&&(zt.setValue(H,"toneMappingExposure",y.toneMappingExposure),Ge.needsLights&&Ki(mn,Ji),pe&&Q.fog===!0&&xe.refreshFogUniforms(mn,pe),xe.refreshMaterialUniforms(mn,Q,$,ue,d.state.transmissionRenderTarget[A.id]),Fr.upload(H,tr(Ge),mn,P)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Fr.upload(H,tr(Ge),mn,P),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&zt.setValue(H,"center",W.center),zt.setValue(H,"modelViewMatrix",W.modelViewMatrix),zt.setValue(H,"normalMatrix",W.normalMatrix),zt.setValue(H,"modelMatrix",W.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let Sn=Q.uniformsGroups;for(let Fn=0,Zn=Sn.length;Fn<Zn;Fn++){let $i=Sn[Fn];V.update($i,Ln),V.bind($i,Ln)}}return Ln}function Ki(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function Zc(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,X,J){Ue.get(A.texture).__webglTexture=X,Ue.get(A.depthTexture).__webglTexture=J;let Q=Ue.get(A);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=J===void 0,Q.__autoAllocateDepthBuffer||oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,X){let J=Ue.get(A);J.__webglFramebuffer=X,J.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,J=0){I=A,E=X,C=J;let Q=!0,W=null,pe=!1,Se=!1;if(A){let ke=Ue.get(A);if(ke.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(H.FRAMEBUFFER,null),Q=!1;else if(ke.__webglFramebuffer===void 0)P.setupRenderTarget(A);else if(ke.__hasExternalTextures)P.rebindTextures(A,Ue.get(A.texture).__webglTexture,Ue.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let He=A.depthTexture;if(ke.__boundDepthTexture!==He){if(He!==null&&Ue.has(He)&&(A.width!==He.image.width||A.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(A)}}let Qe=A.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(Se=!0);let rt=Ue.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(rt[X])?W=rt[X][J]:W=rt[X],pe=!0):A.samples>0&&P.useMultisampledRTT(A)===!1?W=Ue.get(A).__webglMultisampledFramebuffer:Array.isArray(rt)?W=rt[J]:W=rt,U.copy(A.viewport),F.copy(A.scissor),G=A.scissorTest}else U.copy(Fe).multiplyScalar($).floor(),F.copy(Ke).multiplyScalar($).floor(),G=pt;if(be.bindFramebuffer(H.FRAMEBUFFER,W)&&Q&&be.drawBuffers(A,W),be.viewport(U),be.scissor(F),be.setScissorTest(G),pe){let ke=Ue.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+X,ke.__webglTexture,J)}else if(Se){let ke=Ue.get(A.texture),Qe=X||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,ke.__webglTexture,J||0,Qe)}_=-1},this.readRenderTargetPixels=function(A,X,J,Q,W,pe,Se){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=Ue.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Pe=Pe[Se]),Pe){be.bindFramebuffer(H.FRAMEBUFFER,Pe);try{let ke=A.texture,Qe=ke.format,rt=ke.type;if(!ge.textureFormatReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ge.textureTypeReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-Q&&J>=0&&J<=A.height-W&&H.readPixels(X,J,Q,W,Je.convert(Qe),Je.convert(rt),pe)}finally{let ke=I!==null?Ue.get(I).__webglFramebuffer:null;be.bindFramebuffer(H.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(A,X,J,Q,W,pe,Se){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=Ue.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Pe=Pe[Se]),Pe){let ke=A.texture,Qe=ke.format,rt=ke.type;if(!ge.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=A.width-Q&&J>=0&&J<=A.height-W){be.bindFramebuffer(H.FRAMEBUFFER,Pe);let He=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,He),H.bufferData(H.PIXEL_PACK_BUFFER,pe.byteLength,H.STREAM_READ),H.readPixels(X,J,Q,W,Je.convert(Qe),Je.convert(rt),0);let ft=I!==null?Ue.get(I).__webglFramebuffer:null;be.bindFramebuffer(H.FRAMEBUFFER,ft);let At=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await D0(H,At,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,He),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,pe),H.deleteBuffer(He),H.deleteSync(At),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,X=null,J=0){A.isTexture!==!0&&(To("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1]);let Q=Math.pow(2,-J),W=Math.floor(A.image.width*Q),pe=Math.floor(A.image.height*Q),Se=X!==null?X.x:0,Pe=X!==null?X.y:0;P.setTexture2D(A,0),H.copyTexSubImage2D(H.TEXTURE_2D,J,0,0,Se,Pe,W,pe),be.unbindTexture()},this.copyTextureToTexture=function(A,X,J=null,Q=null,W=0){A.isTexture!==!0&&(To("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,A=arguments[1],X=arguments[2],W=arguments[3]||0,J=null);let pe,Se,Pe,ke,Qe,rt,He,ft,At,kt=A.isCompressedTexture?A.mipmaps[W]:A.image;J!==null?(pe=J.max.x-J.min.x,Se=J.max.y-J.min.y,Pe=J.isBox3?J.max.z-J.min.z:1,ke=J.min.x,Qe=J.min.y,rt=J.isBox3?J.min.z:0):(pe=kt.width,Se=kt.height,Pe=kt.depth||1,ke=0,Qe=0,rt=0),Q!==null?(He=Q.x,ft=Q.y,At=Q.z):(He=0,ft=0,At=0);let an=Je.convert(X.format),Mt=Je.convert(X.type),Ge;X.isData3DTexture?(P.setTexture3D(X,0),Ge=H.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(P.setTexture2DArray(X,0),Ge=H.TEXTURE_2D_ARRAY):(P.setTexture2D(X,0),Ge=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,X.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,X.unpackAlignment);let ai=H.getParameter(H.UNPACK_ROW_LENGTH),wt=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Ln=H.getParameter(H.UNPACK_SKIP_PIXELS),wi=H.getParameter(H.UNPACK_SKIP_ROWS),pn=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,kt.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,kt.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,ke),H.pixelStorei(H.UNPACK_SKIP_ROWS,Qe),H.pixelStorei(H.UNPACK_SKIP_IMAGES,rt);let Ji=A.isDataArrayTexture||A.isData3DTexture,zt=X.isDataArrayTexture||X.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let mn=Ue.get(A),Qi=Ue.get(X),Sn=Ue.get(mn.__renderTarget),Fn=Ue.get(Qi.__renderTarget);be.bindFramebuffer(H.READ_FRAMEBUFFER,Sn.__webglFramebuffer),be.bindFramebuffer(H.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let Zn=0;Zn<Pe;Zn++)Ji&&H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ue.get(A).__webglTexture,W,rt+Zn),A.isDepthTexture?(zt&&H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ue.get(X).__webglTexture,W,At+Zn),H.blitFramebuffer(ke,Qe,pe,Se,He,ft,pe,Se,H.DEPTH_BUFFER_BIT,H.NEAREST)):zt?H.copyTexSubImage3D(Ge,W,He,ft,At+Zn,ke,Qe,pe,Se):H.copyTexSubImage2D(Ge,W,He,ft,At+Zn,ke,Qe,pe,Se);be.bindFramebuffer(H.READ_FRAMEBUFFER,null),be.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else zt?A.isDataTexture||A.isData3DTexture?H.texSubImage3D(Ge,W,He,ft,At,pe,Se,Pe,an,Mt,kt.data):X.isCompressedArrayTexture?H.compressedTexSubImage3D(Ge,W,He,ft,At,pe,Se,Pe,an,kt.data):H.texSubImage3D(Ge,W,He,ft,At,pe,Se,Pe,an,Mt,kt):A.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,W,He,ft,pe,Se,an,Mt,kt.data):A.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,W,He,ft,kt.width,kt.height,an,kt.data):H.texSubImage2D(H.TEXTURE_2D,W,He,ft,pe,Se,an,Mt,kt);H.pixelStorei(H.UNPACK_ROW_LENGTH,ai),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,wt),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Ln),H.pixelStorei(H.UNPACK_SKIP_ROWS,wi),H.pixelStorei(H.UNPACK_SKIP_IMAGES,pn),W===0&&X.generateMipmaps&&H.generateMipmap(Ge),be.unbindTexture()},this.copyTextureToTexture3D=function(A,X,J=null,Q=null,W=0){return A.isTexture!==!0&&(To("WebGLRenderer: copyTextureToTexture3D function signature has changed."),J=arguments[0]||null,Q=arguments[1]||null,A=arguments[2],X=arguments[3],W=arguments[4]||0),To('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,X,J,Q,W)},this.initRenderTarget=function(A){Ue.get(A).__webglFramebuffer===void 0&&P.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?P.setTextureCube(A,0):A.isData3DTexture?P.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?P.setTexture2DArray(A,0):P.setTexture2D(A,0),be.unbindTexture()},this.resetState=function(){E=0,C=0,I=null,be.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=yt._getDrawingBufferColorSpace(e),t.unpackColorSpace=yt._getUnpackColorSpace()}};var nc=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ko=class extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gi,this.environmentIntensity=1,this.environmentRotation=new gi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Zr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Eu,this.updateRanges=[],this.version=0,this.uuid=mi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},En=new B,Xs=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyMatrix4(e),this.setXYZ(t,En.x,En.y,En.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyNormalMatrix(e),this.setXYZ(t,En.x,En.y,En.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.transformDirection(e),this.setXYZ(t,En.x,En.y,En.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=di(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=di(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=di(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=di(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=di(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),s=Pt(s,this.array),r=Pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Fo=class extends Mn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Tr,yo=new B,Ar=new B,Rr=new B,Cr=new Xe,vo=new Xe,Tp=new ot,Ia=new B,_o=new B,Pa=new B,Ud=new Xe,Nl=new Xe,Nd=new Xe,ic=class extends ut{constructor(e=new Fo){if(super(),this.isSprite=!0,this.type="Sprite",Tr===void 0){Tr=new Ot;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Zr(t,5);Tr.setIndex([0,1,2,0,2,3]),Tr.setAttribute("position",new Xs(n,3,0,!1)),Tr.setAttribute("uv",new Xs(n,2,3,!1))}this.geometry=Tr,this.material=e,this.center=new Xe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ar.setFromMatrixScale(this.matrixWorld),Tp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Rr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ar.multiplyScalar(-Rr.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;La(Ia.set(-.5,-.5,0),Rr,o,Ar,s,r),La(_o.set(.5,-.5,0),Rr,o,Ar,s,r),La(Pa.set(.5,.5,0),Rr,o,Ar,s,r),Ud.set(0,0),Nl.set(1,0),Nd.set(1,1);let a=e.ray.intersectTriangle(Ia,_o,Pa,!1,yo);if(a===null&&(La(_o.set(-.5,.5,0),Rr,o,Ar,s,r),Nl.set(0,1),a=e.ray.intersectTriangle(Ia,Pa,_o,!1,yo),a===null))return;let c=e.ray.origin.distanceTo(yo);c<e.near||c>e.far||t.push({distance:c,point:yo.clone(),uv:as.getInterpolation(yo,Ia,_o,Pa,Ud,Nl,Nd,new Xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function La(i,e,t,n,s,r){Cr.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(vo.x=r*Cr.x-s*Cr.y,vo.y=s*Cr.x+r*Cr.y):vo.copy(Cr),i.copy(e),i.x+=vo.x,i.y+=vo.y,i.applyMatrix4(Tp)}var kd=new B,Fd=new Ct,Od=new Ct,C_=new B,Bd=new ot,Da=new B,kl=new Wn,Hd=new ot,Fl=new Ws,sc=class extends ye{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Hf,this.bindMatrix=new ot,this.bindMatrixInverse=new ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Da),this.boundingBox.expandByPoint(Da)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Wn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Da),this.boundingSphere.expandByPoint(Da)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),kl.copy(this.boundingSphere),kl.applyMatrix4(s),e.ray.intersectsSphere(kl)!==!1&&(Hd.copy(s).invert(),Fl.copy(e.ray).applyMatrix4(Hd),!(this.boundingBox!==null&&Fl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Fl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ct,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Hf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===i0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Fd.fromBufferAttribute(s.attributes.skinIndex,e),Od.fromBufferAttribute(s.attributes.skinWeight,e),kd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Od.getComponent(r);if(o!==0){let a=Fd.getComponent(r);Bd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(C_.copy(kd).applyMatrix4(Bd),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Oo=class extends ut{constructor(){super(),this.isBone=!0,this.type="Bone"}},rc=class extends ln{constructor(e=null,t=1,n=1,s,r,o,a,c,l=sn,u=sn,h,f){super(null,o,a,c,l,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Gd=new ot,I_=new ot,oc=class i{constructor(e=[],t=[]){this.uuid=mi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ot)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ot;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:I_;Gd.multiplyMatrices(a,t[r]),Gd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new rc(t,e,e,ei,pi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Oo),this.bones.push(o),this.boneInverses.push(new ot().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Hi=class extends Nt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ir=new ot,Vd=new ot,za=[],Wd=new Jt,P_=new ot,Mo=new ye,So=new Wn,un=class extends ye{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Hi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,P_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ir),Wd.copy(e.boundingBox).applyMatrix4(Ir),this.boundingBox.union(Wd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ir),So.copy(e.boundingSphere).applyMatrix4(Ir),this.boundingSphere.union(So)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Mo.geometry=this.geometry,Mo.material=this.material,Mo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),So.copy(this.boundingSphere),So.applyMatrix4(n),e.ray.intersectsSphere(So)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ir),Vd.multiplyMatrices(n,Ir),Mo.matrixWorld=Vd,Mo.raycast(e,za);for(let o=0,a=za.length;o<a;o++){let c=za[o];c.instanceId=r,c.object=this,t.push(c)}za.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Hi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new rc(new Float32Array(s*this.count),s,this.count,uh,pi));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Bo=class extends Mn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ac=new B,cc=new B,Xd=new ot,wo=new Ws,Ua=new Wn,Ol=new B,qd=new B,Kr=class extends ut{constructor(e=new Ot,t=new Bo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ac.fromBufferAttribute(t,s-1),cc.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ac.distanceTo(cc);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(s),Ua.radius+=r,e.ray.intersectsSphere(Ua)===!1)return;Xd.copy(s).invert(),wo.copy(e.ray).applyMatrix4(Xd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let p=Math.max(0,o.start),x=Math.min(u.count,o.start+o.count);for(let b=p,m=x-1;b<m;b+=l){let d=u.getX(b),v=u.getX(b+1),M=Na(this,e,wo,c,d,v);M&&t.push(M)}if(this.isLineLoop){let b=u.getX(x-1),m=u.getX(p),d=Na(this,e,wo,c,b,m);d&&t.push(d)}}else{let p=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let b=p,m=x-1;b<m;b+=l){let d=Na(this,e,wo,c,b,b+1);d&&t.push(d)}if(this.isLineLoop){let b=Na(this,e,wo,c,x-1,p);b&&t.push(b)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Na(i,e,t,n,s,r){let o=i.geometry.attributes.position;if(ac.fromBufferAttribute(o,s),cc.fromBufferAttribute(o,r),t.distanceSqToSegment(ac,cc,Ol,qd)>n)return;Ol.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Ol);if(!(c<e.near||c>e.far))return{distance:c,point:qd.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var Yd=new B,jd=new B,lc=class extends Kr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Yd.fromBufferAttribute(t,s),jd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Yd.distanceTo(jd);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},uc=class extends Kr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Gi=class extends Mn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Zd=new ot,Gu=new Ws,ka=new Wn,Fa=new B,fs=class extends ut{constructor(e=new Ot,t=new Gi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(s),ka.radius+=r,e.ray.intersectsSphere(ka)===!1)return;Zd.copy(s).invert(),Gu.copy(e.ray).applyMatrix4(Zd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let x=f,b=p;x<b;x++){let m=l.getX(x);Fa.fromBufferAttribute(h,m),Kd(Fa,m,c,s,e,t,this)}}else{let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let x=f,b=p;x<b;x++)Fa.fromBufferAttribute(h,x),Kd(Fa,x,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Kd(i,e,t,n,s,r,o){let a=Gu.distanceSqToPoint(i);if(a<t){let c=new B;Gu.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Jr=class extends ln{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var An=class i extends Ot{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new B,u=new Xe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){let p=n+h/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(a,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},$t=class i extends Ot{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],f=[],p=[],x=0,b=[],m=n/2,d=0;v(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new gt(h,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(p,2));function v(){let y=new B,R=new B,E=0,C=(t-e)/n;for(let I=0;I<=r;I++){let _=[],S=I/r,U=S*(t-e)+e;for(let F=0;F<=s;F++){let G=F/s,q=G*c+a,j=Math.sin(q),K=Math.cos(q);R.x=U*j,R.y=-S*n+m,R.z=U*K,h.push(R.x,R.y,R.z),y.set(j,C,K).normalize(),f.push(y.x,y.y,y.z),p.push(G,1-S),_.push(x++)}b.push(_)}for(let I=0;I<s;I++)for(let _=0;_<r;_++){let S=b[_][I],U=b[_+1][I],F=b[_+1][I+1],G=b[_][I+1];(e>0||_!==0)&&(u.push(S,U,G),E+=3),(t>0||_!==r-1)&&(u.push(U,F,G),E+=3)}l.addGroup(d,E,0),d+=E}function M(y){let R=x,E=new Xe,C=new B,I=0,_=y===!0?e:t,S=y===!0?1:-1;for(let F=1;F<=s;F++)h.push(0,m*S,0),f.push(0,S,0),p.push(.5,.5),x++;let U=x;for(let F=0;F<=s;F++){let q=F/s*c+a,j=Math.cos(q),K=Math.sin(q);C.x=_*K,C.y=m*S,C.z=_*j,h.push(C.x,C.y,C.z),f.push(0,S,0),E.x=j*.5+.5,E.y=K*.5*S+.5,p.push(E.x,E.y),x++}for(let F=0;F<s;F++){let G=R+F,q=U+F;y===!0?u.push(q,q+1,G):u.push(q+1,q,G),I+=3}l.addGroup(d,I,y===!0?1:2),d+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Xn=class i extends $t{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},hc=class i extends Ot{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new gt(r,3)),this.setAttribute("normal",new gt(r.slice(),3)),this.setAttribute("uv",new gt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let M=new B,y=new B,R=new B;for(let E=0;E<t.length;E+=3)p(t[E+0],M),p(t[E+1],y),p(t[E+2],R),c(M,y,R,v)}function c(v,M,y,R){let E=R+1,C=[];for(let I=0;I<=E;I++){C[I]=[];let _=v.clone().lerp(y,I/E),S=M.clone().lerp(y,I/E),U=E-I;for(let F=0;F<=U;F++)F===0&&I===E?C[I][F]=_:C[I][F]=_.clone().lerp(S,F/U)}for(let I=0;I<E;I++)for(let _=0;_<2*(E-I)-1;_++){let S=Math.floor(_/2);_%2===0?(f(C[I][S+1]),f(C[I+1][S]),f(C[I][S])):(f(C[I][S+1]),f(C[I+1][S+1]),f(C[I+1][S]))}}function l(v){let M=new B;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(v),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function u(){let v=new B;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];let y=m(v)/2/Math.PI+.5,R=d(v)/Math.PI+.5;o.push(y,1-R)}x(),h()}function h(){for(let v=0;v<o.length;v+=6){let M=o[v+0],y=o[v+2],R=o[v+4],E=Math.max(M,y,R),C=Math.min(M,y,R);E>.9&&C<.1&&(M<.2&&(o[v+0]+=1),y<.2&&(o[v+2]+=1),R<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function p(v,M){let y=v*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function x(){let v=new B,M=new B,y=new B,R=new B,E=new Xe,C=new Xe,I=new Xe;for(let _=0,S=0;_<r.length;_+=9,S+=6){v.set(r[_+0],r[_+1],r[_+2]),M.set(r[_+3],r[_+4],r[_+5]),y.set(r[_+6],r[_+7],r[_+8]),E.set(o[S+0],o[S+1]),C.set(o[S+2],o[S+3]),I.set(o[S+4],o[S+5]),R.copy(v).add(M).add(y).divideScalar(3);let U=m(R);b(E,S+0,v,U),b(C,S+2,M,U),b(I,S+4,y,U)}}function b(v,M,y,R){R<0&&v.x===1&&(o[M]=v.x-1),y.x===0&&y.z===0&&(o[M]=R/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function d(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var qs=class i extends hc{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ho=class i extends hc{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ys=class i extends Ot{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],u=[],h=e,f=(t-e)/s,p=new B,x=new Xe;for(let b=0;b<=s;b++){for(let m=0;m<=n;m++){let d=r+m/n*o;p.x=h*Math.cos(d),p.y=h*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,u.push(x.x,x.y)}h+=f}for(let b=0;b<s;b++){let m=b*(n+1);for(let d=0;d<n;d++){let v=d+m,M=v,y=v+n+1,R=v+n+2,E=v+1;a.push(M,y,E),a.push(y,R,E)}}this.setIndex(a),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Bt=class i extends Ot{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],h=new B,f=new B,p=[],x=[],b=[],m=[];for(let d=0;d<=n;d++){let v=[],M=d/n,y=0;d===0&&o===0?y=.5/t:d===n&&c===Math.PI&&(y=-.5/t);for(let R=0;R<=t;R++){let E=R/t;h.x=-e*Math.cos(s+E*r)*Math.sin(o+M*a),h.y=e*Math.cos(o+M*a),h.z=e*Math.sin(s+E*r)*Math.sin(o+M*a),x.push(h.x,h.y,h.z),f.copy(h).normalize(),b.push(f.x,f.y,f.z),m.push(E+y,1-M),v.push(l++)}u.push(v)}for(let d=0;d<n;d++)for(let v=0;v<t;v++){let M=u[d][v+1],y=u[d][v],R=u[d+1][v],E=u[d+1][v+1];(d!==0||o>0)&&p.push(M,y,E),(d!==n-1||c<Math.PI)&&p.push(y,R,E)}this.setIndex(p),this.setAttribute("position",new gt(x,3)),this.setAttribute("normal",new gt(b,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ds=class i extends Ot{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],u=new B,h=new B,f=new B;for(let p=0;p<=n;p++)for(let x=0;x<=s;x++){let b=x/s*r,m=p/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(b),h.y=(e+t*Math.cos(m))*Math.sin(b),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(b),u.y=e*Math.sin(b),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(x/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let x=1;x<=s;x++){let b=(s+1)*p+x-1,m=(s+1)*(p-1)+x-1,d=(s+1)*(p-1)+x,v=(s+1)*p+x;o.push(b,m,v),o.push(m,d,v)}this.setIndex(o),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var ps=class extends Mn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sc,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},qn=class extends ps{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Xe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return vn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var St=class extends Mn{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new ze(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sc,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Go=class extends Mn{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sc,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gi,this.combine=sh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Oa(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function L_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function D_(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Jd(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Ap(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var ms=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Vu=class extends ms{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Lr,endingEnd:Lr}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Dr:r=e,a=2*t-n;break;case Xa:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Dr:o=e,c=2*n-t;break;case Xa:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,p=this._weightNext,x=(n-t)/(s-t),b=x*x,m=b*x,d=-f*m+2*f*b-f*x,v=(1+f)*m+(-1.5-2*f)*b+(-.5+f)*x+1,M=(-1-p)*m+(1.5+p)*b+.5*x,y=p*m-p*b;for(let R=0;R!==a;++R)r[R]=d*o[u+R]+v*o[l+R]+M*o[c+R]+y*o[h+R];return r}},fc=class extends ms{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(s-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}},Wu=class extends ms{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ni=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Oa(t,this.TimeBufferType),this.values=Oa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Oa(e.times,Array),values:Oa(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Wu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new fc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Vu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Xr:t=this.InterpolantFactoryMethodDiscrete;break;case qr:t=this.InterpolantFactoryMethodLinear;break;case ll:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xr;case this.InterpolantFactoryMethodLinear:return qr;case this.InterpolantFactoryMethodSmooth:return ll}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&L_(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ll,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(s)c=!0;else{let h=a*n,f=h-n,p=h+n;for(let x=0;x!==n;++x){let b=t[h+x];if(b!==t[f+x]||b!==t[p+x]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,f=o*n;for(let p=0;p!==n;++p)t[f+p]=t[h+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};ni.prototype.TimeBufferType=Float32Array;ni.prototype.ValueBufferType=Float32Array;ni.prototype.DefaultInterpolation=qr;var gs=class extends ni{constructor(e,t,n){super(e,t,n)}};gs.prototype.ValueTypeName="bool";gs.prototype.ValueBufferType=Array;gs.prototype.DefaultInterpolation=Xr;gs.prototype.InterpolantFactoryMethodLinear=void 0;gs.prototype.InterpolantFactoryMethodSmooth=void 0;var dc=class extends ni{};dc.prototype.ValueTypeName="color";var Vi=class extends ni{};Vi.prototype.ValueTypeName="number";var Xu=class extends ms{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let u=l+a;l!==u;l+=4)Un.slerpFlat(r,0,o,l-a,o,l,c);return r}},Wi=class extends ni{InterpolantFactoryMethodLinear(e){return new Xu(this.times,this.values,this.getValueSize(),e)}};Wi.prototype.ValueTypeName="quaternion";Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var xs=class extends ni{constructor(e,t,n){super(e,t,n)}};xs.prototype.ValueTypeName="string";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=Xr;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;var Xi=class extends ni{};Xi.prototype.ValueTypeName="vector";var Qr=class{constructor(e="",t=-1,n=[],s=gh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=mi(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(U_(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(ni.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let u=D_(c);c=Jd(c,1,u),l=Jd(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Vi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(r);if(u&&u.length>1){let h=u[1],f=s[h];f||(s[h]=f=[]),f.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,f,p,x,b){if(p.length!==0){let m=[],d=[];Ap(p,m,d,x),m.length!==0&&b.push(new h(f,m,d))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let p={},x;for(x=0;x<f.length;x++)if(f[x].morphTargets)for(let b=0;b<f[x].morphTargets.length;b++)p[f[x].morphTargets[b]]=-1;for(let b in p){let m=[],d=[];for(let v=0;v!==f[x].morphTargets.length;++v){let M=f[x];m.push(M.time),d.push(M.morphTarget===b?1:0)}s.push(new Vi(".morphTargetInfluence["+b+"]",m,d))}c=p.length*o}else{let p=".bones["+t[h].name+"]";n(Xi,p+".position",f,"pos",s),n(Wi,p+".quaternion",f,"rot",s),n(Xi,p+".scale",f,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function z_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Vi;case"vector":case"vector2":case"vector3":case"vector4":return Xi;case"color":return dc;case"quaternion":return Wi;case"bool":case"boolean":return gs;case"string":return xs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function U_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=z_(i.type);if(i.times===void 0){let t=[],n=[];Ap(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var cs={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},qu=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let p=l[h],x=l[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return x}return null}}},N_=new qu,qi=class{constructor(e){this.manager=e!==void 0?e:N_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};qi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Di={},Yu=class extends Error{constructor(e,t){super(e),this.response=t}},Vo=class extends qi{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=cs.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Di[e]!==void 0){Di[e].push({onLoad:t,onProgress:n,onError:s});return}Di[e]=[],Di[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=Di[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=f?parseInt(f):0,x=p!==0,b=0,m=new ReadableStream({start(d){v();function v(){h.read().then(({done:M,value:y})=>{if(M)d.close();else{b+=y.byteLength;let R=new ProgressEvent("progress",{lengthComputable:x,loaded:b,total:p});for(let E=0,C=u.length;E<C;E++){let I=u[E];I.onProgress&&I.onProgress(R)}d.enqueue(y),v()}},M=>{d.error(M)})}}});return new Response(m)}else throw new Yu(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(f);return l.arrayBuffer().then(x=>p.decode(x))}}}).then(l=>{cs.add(e,l);let u=Di[e];delete Di[e];for(let h=0,f=u.length;h<f;h++){let p=u[h];p.onLoad&&p.onLoad(l)}}).catch(l=>{let u=Di[e];if(u===void 0)throw this.manager.itemError(e),l;delete Di[e];for(let h=0,f=u.length;h<f;h++){let p=u[h];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var ju=class extends qi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=cs.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=zo("img");function c(){u(),cs.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var pc=class extends qi{constructor(e){super(e)}load(e,t,n,s){let r=new ln,o=new ju(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},$r=class extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},mc=class extends $r{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Bl=new ot,Qd=new B,$d=new B,Wo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new No,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Qd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Qd),$d.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($d),t.updateMatrixWorld(),Bl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Bl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Zu=class extends Wo{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Yr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},gc=class extends $r{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Zu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},ep=new ot,Eo=new B,Hl=new B,Ku=class extends Wo{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Xe(4,2),this._viewportCount=6,this._viewports=[new Ct(2,1,1,1),new Ct(0,1,1,1),new Ct(3,1,1,1),new Ct(1,1,1,1),new Ct(3,0,1,1),new Ct(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Eo.setFromMatrixPosition(e.matrixWorld),n.position.copy(Eo),Hl.copy(n.position),Hl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Hl),n.updateMatrixWorld(),s.makeTranslation(-Eo.x,-Eo.y,-Eo.z),ep.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ep)}},xc=class extends $r{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ku}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Ju=class extends Wo{constructor(){super(new hs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},eo=class extends $r{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new Ju}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var bs=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var bc=class extends qi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=cs.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return cs.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),cs.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});cs.add(e,c),r.manager.itemStart(e)}};var Qu=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){Un.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;Un.multiplyQuaternionsFlat(e,o,e,t,e,n),Un.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},yh="\\[\\]\\.:\\/",k_=new RegExp("["+yh+"]","g"),vh="[^"+yh+"]",F_="[^"+yh.replace("\\.","")+"]",O_=/((?:WC+[\/:])*)/.source.replace("WC",vh),B_=/(WCOD+)?/.source.replace("WCOD",F_),H_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vh),G_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vh),V_=new RegExp("^"+O_+B_+H_+G_+"$"),W_=["material","materials","bones","map"],$u=class{constructor(e,t,n){let s=n||Ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ft=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(k_,"")}static parseTrackName(e){let t=V_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);W_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ft.Composite=$u;Ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ft.prototype.GetterByBindingType=[Ft.prototype._getValue_direct,Ft.prototype._getValue_array,Ft.prototype._getValue_arrayElement,Ft.prototype._getValue_toArray];Ft.prototype.SetterByBindingTypeAndVersioning=[[Ft.prototype._setValue_direct,Ft.prototype._setValue_direct_setNeedsUpdate,Ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_array,Ft.prototype._setValue_array_setNeedsUpdate,Ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_arrayElement,Ft.prototype._setValue_arrayElement_setNeedsUpdate,Ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_fromArray,Ft.prototype._setValue_fromArray_setNeedsUpdate,Ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var eh=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:Lr,endingEnd:Lr};for(let l=0;l!==o;++l){let u=r[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=mh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case r0:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case gh:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===s0;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===ph){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=Dr,s.endingEnd=Dr):(e?s.endingStart=this.zeroSlopeAtStart?Dr:Lr:s.endingStart=Xa,t?s.endingEnd=this.zeroSlopeAtEnd?Dr:Lr:s.endingEnd=Xa)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},X_=new Float32Array(1),yc=class extends Bi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==r;++h){let f=s[h],p=f.name,x=u[p];if(x!==void 0)++x.referenceCount,o[h]=x;else{if(x=o[h],x!==void 0){x._cacheIndex===null&&(++x.referenceCount,this._addInactiveBinding(x,c,p));continue}let b=t&&t._propertyBindings[h].binding.parsedPath;x=new Qu(Ft.create(n,p,b),f.ValueTypeName,f.getValueSize()),++x.referenceCount,this._addInactiveBinding(x,c,p),o[h]=x}a[h].resultBuffer=x.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;let h=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new fc(new Float32Array(2),new Float32Array(2),1,X_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Qr.findByName(s,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=gh),c!==void 0){let h=c.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let u=new eh(this,o,t,n);return this._bindAction(u,l),this._addInactiveAction(u,a,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Qr.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var tp=new ot,vc=class{constructor(e,t,n=0,s=1/0){this.ray=new Ws(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Uo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return tp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tp),this}intersectObject(e,t=!0,n=[]){return th(e,this,n,t),n.sort(np),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)th(e[s],this,n,t);return n.sort(np),n}};function np(i,e){return i.distance-e.distance}function th(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)th(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nh);function Mh(i,e){if(e===pp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===qo||e===Mc){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===qo)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var Tc=class extends qi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Ch(t)}),this.register(function(t){return new Ih(t)}),this.register(function(t){return new Oh(t)}),this.register(function(t){return new Bh(t)}),this.register(function(t){return new Hh(t)}),this.register(function(t){return new Lh(t)}),this.register(function(t){return new Dh(t)}),this.register(function(t){return new zh(t)}),this.register(function(t){return new Uh(t)}),this.register(function(t){return new Rh(t)}),this.register(function(t){return new Nh(t)}),this.register(function(t){return new Ph(t)}),this.register(function(t){return new Fh(t)}),this.register(function(t){return new kh(t)}),this.register(function(t){return new Th(t)}),this.register(function(t){return new Gh(t)}),this.register(function(t){return new Vh(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=bs.extractUrlBase(e);o=bs.resolveURL(l,this.path)}else o=bs.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Vo(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Lp){try{o[xt.KHR_BINARY_GLTF]=new Wh(e)}catch(h){s&&s(h);return}r=JSON.parse(o[xt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Jh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case xt.KHR_MATERIALS_UNLIT:o[h]=new Ah;break;case xt.KHR_DRACO_MESH_COMPRESSION:o[h]=new Xh(r,this.dracoLoader);break;case xt.KHR_TEXTURE_TRANSFORM:o[h]=new qh;break;case xt.KHR_MESH_QUANTIZATION:o[h]=new Yh;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function q_(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var xt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Th=class{constructor(e){this.parser=e,this.name=xt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new ze(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],hn);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new eo(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new xc(u),l.distance=h;break;case"spot":l=new gc(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Yi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Ah=class{constructor(){this.name=xt.KHR_MATERIALS_UNLIT}getMaterialType(){return tt}extendParams(e,t,n){let s=[];e.color=new ze(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],hn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,qt))}return Promise.all(s)}},Rh=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Ch=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Xe(a,a)}return Promise.all(r)}},Ih=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Ph=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Lh=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new ze(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],hn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,qt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Dh=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},zh=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ze().setRGB(a[0],a[1],a[2],hn),Promise.all(r)}},Uh=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Nh=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new ze().setRGB(a[0],a[1],a[2],hn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,qt)),Promise.all(r)}},kh=class{constructor(e){this.parser=e,this.name=xt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Fh=class{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:qn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Oh=class{constructor(e){this.parser=e,this.name=xt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Bh=class{constructor(e){this.parser=e,this.name=xt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Hh=class{constructor(e){this.parser=e,this.name=xt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Gh=class{constructor(e){this.name=xt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,h=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(p),u,h,f,s.mode,s.filter),p})})}else return null}},Vh=class{constructor(e){this.name=xt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==ii.TRIANGLES&&l.mode!==ii.TRIANGLE_STRIP&&l.mode!==ii.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,p=[];for(let x of h){let b=new ot,m=new B,d=new Un,v=new B(1,1,1),M=new un(x.geometry,x.material,f);for(let y=0;y<f;y++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&d.fromBufferAttribute(c.ROTATION,y),c.SCALE&&v.fromBufferAttribute(c.SCALE,y),M.setMatrixAt(y,b.compose(m,d,v));for(let y in c)if(y==="_COLOR_0"){let R=c[y];M.instanceColor=new Hi(R.array,R.itemSize,R.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&x.geometry.setAttribute(y,c[y]);ut.prototype.copy.call(M,x),this.parser.assignFinalMaterial(M),p.push(M)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}},Lp="glTF",Yo=12,Rp={JSON:1313821514,BIN:5130562},Wh=class{constructor(e){this.name=xt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Yo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Lp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Yo,r=new DataView(e,Yo),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Rp.JSON){let l=new Uint8Array(e,Yo+o,a);this.content=n.decode(l)}else if(c===Rp.BIN){let l=Yo+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Xh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=xt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let h=Zh[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=Zh[u]||u.toLowerCase();if(o[u]!==void 0){let f=n.accessors[e.attributes[u]],p=no[f.componentType];l[h]=p.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){s.decodeDracoFile(u,function(p){for(let x in p.attributes){let b=p.attributes[x],m=c[x];m!==void 0&&(b.normalized=m)}h(p)},a,l,hn,f)})})}},qh=class{constructor(){this.name=xt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Yh=class{constructor(){this.name=xt.KHR_MESH_QUANTIZATION}},Ac=class extends ms{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=s-t,h=(n-t)/u,f=h*h,p=f*h,x=e*l,b=x-l,m=-2*p+3*f,d=p-f,v=1-m,M=d-f+h;for(let y=0;y!==a;y++){let R=o[b+y+a],E=o[b+y+c]*u,C=o[x+y+a],I=o[x+y]*u;r[y]=v*R+M*E+m*C+d*I}return r}},Y_=new Un,jh=class extends Ac{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return Y_.fromArray(r).normalize().toArray(r),r}},ii={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},no={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Cp={9728:sn,9729:_n,9984:oh,9985:Ro,9986:Pr,9987:$n},Ip={33071:Ni,33648:Lo,10497:Gs},Sh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Zh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ys={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},j_={CUBICSPLINE:void 0,LINEAR:qr,STEP:Xr},wh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Z_(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new ps({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Vn})),i.DefaultMaterial}function js(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Yi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function K_(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(n){let f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(f)}if(s){let f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],f=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function J_(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Q_(i){let e,t=i.extensions&&i.extensions[xt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Eh(t.attributes):e=i.indices+":"+Eh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Eh(i.targets[n]);return e}function Eh(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Kh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function $_(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var eM=new ot,Jh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new q_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new pc(this.options.manager):this.textureLoader=new bc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Vo(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return js(r,a,s),Yi(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())r(u,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[xt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(bs.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=Sh[s.type],a=no[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Nt(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Sh[s.type],l=no[s.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,x=s.normalized===!0,b,m;if(p&&p!==h){let d=Math.floor(f/p),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+d+":"+s.count,M=t.cache.get(v);M||(b=new l(a,d*p,s.count*p/u),M=new Zr(b,p/u),t.cache.add(v,M)),m=new Xs(M,c,f%p/u,x)}else a===null?b=new l(s.count*c):b=new l(a,f,s.count*c),m=new Nt(b,c,x);if(s.sparse!==void 0){let d=Sh.SCALAR,v=no[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,R=new v(o[1],M,s.sparse.count*d),E=new l(o[2],y,s.sparse.count*c);a!==null&&(m=new Nt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,I=R.length;C<I;C++){let _=R[C];if(m.setX(_,E[C*c]),c>=2&&m.setY(_,E[C*c+1]),c>=3&&m.setZ(_,E[C*c+2]),c>=4&&m.setW(_,E[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=x}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return u.magFilter=Cp[f.magFilter]||_n,u.minFilter=Cp[f.minFilter]||$n,u.wrapS=Ip[f.wrapS]||Gs,u.wrapT=Ip[f.wrapT]||Gs,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==sn&&u.minFilter!==_n,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;let f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(f,p){let x=f;t.isImageBitmapLoader===!0&&(x=function(b){let m=new ln(b);m.needsUpdate=!0,f(m)}),t.load(bs.resolveURL(h,r.path),x,void 0,p)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),Yi(h,o),h.userData.mimeType=o.mimeType||$_(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[xt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[xt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[xt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Gi,Mn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Bo,Mn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ps}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[xt.KHR_MATERIALS_UNLIT]){let h=s[xt.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new ze(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],hn),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,qt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Lt);let u=r.alphaMode||wh.OPAQUE;if(u===wh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===wh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==tt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Xe(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==tt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==tt){let h=r.emissiveFactor;a.emissive=new ze().setRGB(h[0],h[1],h[2],hn)}return r.emissiveTexture!==void 0&&o!==tt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,qt)),Promise.all(l).then(function(){let h=new o(a);return r.name&&(h.name=r.name),Yi(h,r),t.associations.set(h,{materials:e}),r.extensions&&js(s,h,r),h})}createUniqueName(e){let t=Ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[xt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Pp(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=Q_(l),h=s[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[xt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Pp(new Ot,l,t),s[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?Z_(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let p=0,x=u.length;p<x;p++){let b=u[p],m=o[p],d,v=l[p];if(m.mode===ii.TRIANGLES||m.mode===ii.TRIANGLE_STRIP||m.mode===ii.TRIANGLE_FAN||m.mode===void 0)d=r.isSkinnedMesh===!0?new sc(b,v):new ye(b,v),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),m.mode===ii.TRIANGLE_STRIP?d.geometry=Mh(d.geometry,Mc):m.mode===ii.TRIANGLE_FAN&&(d.geometry=Mh(d.geometry,qo));else if(m.mode===ii.LINES)d=new lc(b,v);else if(m.mode===ii.LINE_STRIP)d=new Kr(b,v);else if(m.mode===ii.LINE_LOOP)d=new uc(b,v);else if(m.mode===ii.POINTS)d=new fs(b,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(d.geometry.morphAttributes).length>0&&J_(d,r),d.name=t.createUniqueName(r.name||"mesh_"+e),Yi(d,r),m.extensions&&js(s,d,m),t.assignFinalMaterial(d),h.push(d)}for(let p=0,x=h.length;p<x;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return r.extensions&&js(s,h[0],r),h[0];let f=new Wt;r.extensions&&js(s,f,r),t.associations.set(f,{meshes:e});for(let p=0,x=h.length;p<x;p++)f.add(h[p]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new tn(xp.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new hs(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Yi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let h=o[l];if(h){a.push(h);let f=new ot;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new oc(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=s.channels.length;h<f;h++){let p=s.channels[h],x=s.samplers[p.sampler],b=p.target,m=b.node,d=s.parameters!==void 0?s.parameters[x.input]:x.input,v=s.parameters!==void 0?s.parameters[x.output]:x.output;b.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",d)),c.push(this.getDependency("accessor",v)),l.push(x),u.push(b))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let f=h[0],p=h[1],x=h[2],b=h[3],m=h[4],d=[];for(let v=0,M=f.length;v<M;v++){let y=f[v],R=p[v],E=x[v],C=b[v],I=m[v];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let _=n._createAnimationTracks(y,R,E,C,I);if(_)for(let S=0;S<_.length;S++)d.push(_[S])}return new Qr(r,void 0,d)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(f,eM)});for(let p=0,x=h.length;p<x;p++)u.add(h[p]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new Oo:l.length>1?u=new Wt:l.length===1?u=l[0]:u=new ut,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Yi(u,r),r.extensions&&js(n,u,r),r.matrix!==void 0){let h=new ot;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Wt;n.name&&(r.name=s.createUniqueName(n.name)),Yi(r,n),n.extensions&&js(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);let l=u=>{let h=new Map;for(let[f,p]of s.associations)(f instanceof Mn||f instanceof ln)&&h.set(f,p);return u.traverse(f=>{let p=s.associations.get(f);p!=null&&h.set(f,p)}),h};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];ys[r.path]===ys.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(ys[r.path]){case ys.weights:l=Vi;break;case ys.rotation:l=Wi;break;case ys.position:case ys.scale:l=Xi;break;default:switch(n.itemSize){case 1:l=Vi;break;case 2:case 3:default:l=Xi;break}break}let u=s.interpolation!==void 0?j_[s.interpolation]:qr,h=this._getArrayFromAccessor(n);for(let f=0,p=c.length;f<p;f++){let x=new l(c[f]+"."+ys[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),o.push(x)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Kh(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Wi?jh:Ac;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function tM(i,e,t){let n=e.attributes,s=new Jt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new B(c[0],c[1],c[2]),new B(l[0],l[1],l[2])),a.normalized){let u=Kh(no[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new B,c=new B;for(let l=0,u=r.length;l<u;l++){let h=r[l];if(h.POSITION!==void 0){let f=t.json.accessors[h.POSITION],p=f.min,x=f.max;if(p!==void 0&&x!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(x[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(x[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(x[2]))),f.normalized){let b=Kh(no[f.componentType]);c.multiplyScalar(b)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new Wn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Pp(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=Zh[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return yt.workingColorSpace!==hn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${yt.workingColorSpace}" not supported.`),Yi(i,e),tM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?K_(i,e.targets,t):i})}var Dp=function(){"use strict";var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?e:i,r,o=WebAssembly.instantiate(a(s),{}).then(function(d){r=d.instance,r.exports.__wasm_call_ctors()});function a(d){for(var v=new Uint8Array(d.length),M=0;M<d.length;++M){var y=d.charCodeAt(M);v[M]=y>96?y-97:y>64?y-39:y+4}for(var R=0,M=0;M<d.length;++M)v[R++]=v[M]<60?n[v[M]]:(v[M]-60)*64+v[++M];return v.buffer.slice(0,R)}function c(d,v,M,y,R,E){var C=r.exports.sbrk,I=M+3&-4,_=C(I*y),S=C(R.length),U=new Uint8Array(r.exports.memory.buffer);U.set(R,S);var F=d(_,M,y,S,R.length);if(F==0&&E&&E(_,I,y),v.set(U.subarray(_,_+M*y)),C(_-C(0)),F!=0)throw new Error("Malformed buffer data: "+F)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],f=0;function p(d){var v={object:new Worker(d),pending:0,requests:{}};return v.object.onmessage=function(M){var y=M.data;v.pending-=y.count,v.requests[y.id][y.action](y.value),delete v.requests[y.id]},v}function x(d){for(var v="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(a(s))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+m.toString(),M=new Blob([v],{type:"text/javascript"}),y=URL.createObjectURL(M),R=0;R<d;++R)h[R]=p(y);URL.revokeObjectURL(y)}function b(d,v,M,y,R){for(var E=h[0],C=1;C<h.length;++C)h[C].pending<E.pending&&(E=h[C]);return new Promise(function(I,_){var S=new Uint8Array(M),U=f++;E.pending+=d,E.requests[U]={resolve:I,reject:_},E.object.postMessage({id:U,count:d,size:v,source:S,mode:y,filter:R},[S.buffer])})}function m(d){o.then(function(){var v=d.data;try{var M=new Uint8Array(v.count*v.size);c(r.exports[v.mode],M,v.count,v.size,v.source,r.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:M},[M.buffer])}catch(y){self.postMessage({id:v.id,count:v.count,action:"reject",value:y})}})}return{ready:o,supported:!0,useWorkers:function(d){x(d)},decodeVertexBuffer:function(d,v,M,y,R){c(r.exports.meshopt_decodeVertexBuffer,d,v,M,y,r.exports[l[R]])},decodeIndexBuffer:function(d,v,M,y){c(r.exports.meshopt_decodeIndexBuffer,d,v,M,y)},decodeIndexSequence:function(d,v,M,y){c(r.exports.meshopt_decodeIndexSequence,d,v,M,y)},decodeGltfBuffer:function(d,v,M,y,R,E){c(r.exports[u[R]],d,v,M,y,r.exports[l[E]])},decodeGltfBufferAsync:function(d,v,M,y,R){return h.length>0?b(d,v,M,u[y],l[R]):o.then(function(){var E=new Uint8Array(d*v);return c(r.exports[u[y]],E,d,v,M,r.exports[l[R]]),E})}}}();function zp(i){let e=new Map,t=new Map,n=i.clone();return Up(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Up(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Up(i.children[n],e.children[n],t)}function Np(i,e,t,n){let s=(e||0)*.1,r=13,o=t==null||!Number.isFinite(t)?i.y:t,a=Math.max(o+11,i.y+9.5),c=i.x+Math.sin(s)*r,l=i.z-Math.cos(s)*r,u=n||[];for(let h=0;h<u.length;h++){let f=u[h];if(!f||f.eliminated)continue;let p=c-f.x,x=l-f.z;p*p+x*x<25&&(a=Math.max(a,f.y+7))}return{x:c,y:a,z:l,look:{x:i.x,y:Math.max(o+1.4,i.y+1.2),z:i.z+9},fogNear:150,fogFar:340}}function vs(i,e={}){i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vPlW;
varying float vPlUp;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;
vPlUp = normalize(mat3(modelMatrix) * objectNormal).y;`);let t=e.floors?.2:e.hero?.5:.35,n=e.hero?.4:.16,s=e.floors?`float stripe = step(0.5, fract(vPlW.x * 0.23 + vPlW.z * 0.23));
diffuseColor.rgb *= mix(0.92, 1.08, stripe);
`:"",r=e.stripes?`float band = step(0.5, fract(vPlW.y * 1.7));
lit *= mix(0.86, 1.1, band);
`:"";i.fragmentShader=`varying vec3 vPlW;
varying float vPlUp;
`+i.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+s).replace("#include <opaque_fragment>",`vec3 base = diffuseColor.rgb;
float luma = dot(base, vec3(0.2126, 0.7152, 0.0722));
base = clamp(luma + (base - luma) * 1.08, 0.0, 1.0);
float up = clamp(vPlUp * 0.5 + 0.5, 0.0, 1.0);
float stepLight = up < 0.34 ? 0.82 : (up < 0.68 ? 1.0 : 1.12);
vec3 lit = base * stepLight;
float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.5);
lit += vec3(1.0) * rim * `+t.toFixed(2)+`;
float ao = mix(0.84, 1.0, smoothstep(-0.65, 0.2, vPlUp));
lit *= ao;
vec3 L = normalize(vec3(-0.35, 0.86, 0.28));
vec3 V = normalize(vViewPosition);
float spec = pow(clamp(dot(normalize(normal), normalize(L + V)), 0.0, 1.0), 72.0);
lit += vec3(1.0) * spec * `+n.toFixed(2)+`;
`+r+`outgoingLight = lit;
#include <opaque_fragment>`)}var kp={meadow:{top:6080767,mid:12120319,fog:13628671,bot:8378506,near:40,far:140},canyon:{top:16752324,mid:16769976,fog:16767424,bot:16758903,near:40,far:140},sky:{top:8031487,mid:16766706,fog:15391999,bot:13227775,near:40,far:140},ice:{top:7327999,mid:15268863,fog:15924479,bot:15137023,near:40,far:140},climb:{top:3817359,mid:16752335,fog:5917854,bot:12166105,near:40,far:140},ship:{top:2825037,mid:9202687,fog:4864634,bot:5988254,near:40,far:140}};function Fp(i){return kp[i]||kp.meadow}function Yt(i){let e=Math.sin(i*127.1)*43758.5453;return e-Math.floor(e)}function Op(){let i=document.createElement("canvas");i.width=3,i.height=1;let e=i.getContext("2d");e.fillStyle="#6F5C93",e.fillRect(0,0,1,1),e.fillStyle="#D4C6EA",e.fillRect(1,0,1,1),e.fillStyle="#ffffff",e.fillRect(2,0,1,1);let t=new Jr(i);return t.magFilter=sn,t.minFilter=sn,t.generateMipmaps=!1,t.colorSpace=Mi||hn,t}function Rn(i,e){let t=new St({color:i,gradientMap:e,side:Lt});return t.onBeforeCompile=n=>vs(n,{}),t}function Bp(i,e,t){let n=new ut,s=new ze,r=[];function o(D,k,Z,he){if(!Z.length)return null;let me=new un(D,k,Z.length);return Z.forEach((Ce,et)=>{he(n,Ce,et),n.updateMatrix(),me.setMatrixAt(et,n.matrix),Ce.color&&(s.set(Ce.color),me.setColorAt(et,s))}),me.instanceMatrix.needsUpdate=!0,me.instanceColor&&(me.instanceColor.needsUpdate=!0),me.userData.decor=!0,i.add(me),r.push(me),me}let a={meadow:[],canyon:[],sky:[],ice:[],climb:[],ship:[]};for(let D of e.tiles)a[D.zone]&&(Math.abs(D.col)<2||Math.abs(D.col*5+D.row*3)%3===0&&(D.row+D.col)%2===0&&((D.zone==="canyon"||D.zone==="sky")&&Math.abs(D.x)<8||a[D.zone].push(D)));let c=new Xn(.28,1.15,5),l=new qs(.55,0),u=new Bt(.32,8,6),h=new $t(.18,.18,1.4,8),f=new qs(.9,0);o(l,Rn(12876373,t),a.canyon,(D,k,Z)=>{D.position.set(k.x,k.y+.35,k.z),D.rotation.set(Z,Z*.5,0),D.scale.set(1,.75,1.1)}),o(h,Rn(3029611,t),a.canyon.filter((D,k)=>k%2===0),(D,k)=>{D.position.set(k.x,k.y+.35,k.z),D.rotation.set(0,0,Math.PI/2),D.scale.set(1,1,1)}),o(c,Rn(12051711,t),a.sky,(D,k,Z)=>{D.position.set(k.x,k.y+.55,k.z),D.rotation.set(.1,Z,.2),D.scale.setScalar(.8+Z%3*.15)}),o(c,Rn(13219583,t),a.ice,(D,k,Z)=>{D.position.set(k.x,k.y+.7,k.z),D.rotation.set(0,Z,.15),D.scale.setScalar(1+Z%3*.2)}),o(u,Rn(5952767,t),a.ice.filter((D,k)=>k%2===0),(D,k)=>{D.position.set(k.x,k.y+.28,k.z),D.rotation.set(0,0,0),D.scale.set(1.15,.7,1.15)}),o(l,Rn(14721370,t),a.climb,(D,k,Z)=>{D.position.set(k.x,k.y+.4,k.z),D.rotation.set(.2,Z,0),D.scale.setScalar(.7)});let p=new $t(.28,.34,2.4,6),x=new Bt(.45,8,6),b=new Bt(.42,10,8),m=new $t(.7,.7,.12,7),d=new Nn(.16,1.6,.16),v=new Bt(.12,6,6),M=a.canyon.filter((D,k)=>Yt(k+4)>.62);o(new qs(.7,1),Rn(2759714,t),M,(D,k,Z)=>{let he=Yt(Z+k.z);D.position.set(k.x+(he-.5)*1.8,k.y+.15+he*.4,k.z+(Yt(Z+2)-.5)*1.6),D.rotation.set(he*2,Yt(Z)*4,Yt(Z+9)),D.scale.set(.45+he*1.3,.55+Yt(Z+3)*1.6,.5+Yt(Z+6)*1.1)}),o(b,Rn(16748497,t),a.sky.filter((D,k)=>k%3===0),(D,k,Z)=>{D.position.set(k.x,k.y+3.2+Z%3,k.z),D.rotation.set(0,0,0),D.scale.set(1,1.15,1)}),o(u,Rn(16751316,t),a.sky,(D,k,Z)=>{D.position.set(k.x+(k.col>0?2:-2),k.y+2.4,k.z),D.rotation.set(0,Z,0),D.scale.set(1.6,.7,1.2)}),o(m,Rn(4114687,t),a.ice.filter((D,k)=>k%2===0),(D,k)=>{D.position.set(k.x,k.y+.08,k.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)}),o(c,Rn(10189823,t),a.ice.filter((D,k)=>k%2===1),(D,k,Z)=>{D.position.set(k.x,k.y+1.1,k.z+.4),D.rotation.set(.2,Z,0),D.scale.setScalar(1.35)}),o(d,Rn(16774885,t),a.climb.filter((D,k)=>k%2===0),(D,k)=>{D.position.set(k.x,k.y+.8,k.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)}),o(l,Rn(9067066,t),a.climb.filter((D,k)=>k%3===0),(D,k,Z)=>{D.position.set(k.x,k.y+.3,k.z+.6),D.rotation.set(.4,Z,.2),D.scale.setScalar(.55)});let y=new St({color:16739179,emissive:16739179,emissiveIntensity:.7,gradientMap:t});o(v,y,a.climb.filter((D,k)=>k%2===0),(D,k)=>{D.position.set(k.x,k.y+1.7,k.z),D.rotation.set(0,0,0),D.scale.set(1,1,1)});function R(){let D=new qs(1,1),k=D.attributes.position;for(let Z=0;Z<k.count;Z++){let he=k.getX(Z),me=k.getY(Z),Ce=k.getZ(Z),et=1+Math.sin(he*2.8+me*1.7)*.22+Math.sin(Ce*2.4+.6)*.16,Be=me>.15?.62:1.05;k.setXYZ(Z,he*et,me*et*Be+.2,Ce*et)}return D.computeVertexNormals(),D}function E(){let D=new $t(1,1.25,1.1,7,3),k=D.attributes.position,Z=new Float32Array(k.count*3);for(let he=0;he<k.count;he++){let me=k.getY(he),Ce=me>.25;Z[he*3]=Ce?.35:.45,Z[he*3+1]=Ce?.72:.32,Z[he*3+2]=Ce?.32:.24,me>.35&&k.setY(he,me*.45+.35)}return D.setAttribute("color",new Nt(Z,3)),D.computeVertexNormals(),D}let C={meadow:3971656,canyon:4858912,sky:8300240,ice:4034516,climb:12085800,ship:14858360},I=[],_=e.stations||[];e.hubs&&e.hubs.length&&e.hubs.forEach((D,k)=>{if(!D)for(let Z=0;Z<8;Z++){let he=Z/8*Math.PI*2+k*.4,me=D.r+6+Yt(k*19+Z)*12,Ce=4.2+Yt(Z+k*5)*5.5;I.push({x:D.x+Math.cos(he)*me,y:-.4,z:D.z+Math.sin(he)*me,s:Ce,ry:he,rx:(Yt(Z+2)-.5)*.25,color:C[D.zone]||8378506,zone:D.zone,side:Math.cos(he)>0?1:-1})}});for(let D=0;D<_.length&&!(e.hubs&&e.hubs.length);D+=14){let k=_[D];if(!(!k||k.gap))for(let Z=0;Z<2;Z++)for(let he of[-1,1]){let me=Yt(D+Z*17+he*3),Ce=(Z===0?16:30)+me*8,et=3.2+Yt(D+4+Z)*4.2;I.push({x:k.x+he*Ce,y:k.y-.8,z:k.z+(Yt(D+Z+6)-.5)*12,s:et*(Z===0?1:1.35),ry:me*6.2,rx:(Yt(D+2)-.5)*.4,color:C[k.zone]||8378506,zone:k.zone,side:he})}}let S=o(R(),Rn(16777215,t),I,(D,k)=>{D.position.set(k.x,k.y+k.s*.35,k.z),D.rotation.set(k.rx,k.ry,k.rx*.5),D.scale.set(k.s,k.s*.72,k.s*.9)}),U=new St({vertexColors:!0,gradientMap:t}),F=I.filter((D,k)=>k%3===0).map(D=>({...D,color:0}));o(E(),U,F,(D,k)=>{D.position.set(k.x,k.y+.4,k.z),D.rotation.set(0,k.ry,0),D.scale.set(k.s*.85,k.s*.55,k.s*.8)});let G=[];function q(D){let k=_.filter(H=>H&&H.zone==="canyon"&&!H.gap);if(k.length<4)return;let Z=2,he=[];for(let H=0;H<k.length;H+=Z)he.push(k[H]);let me=[],Ce=[],et=[];he.forEach((H,It)=>{let oe=Math.sin(H.z*.09)*.9+Math.sin(H.z*.027)*.55,ge=1.15+Math.sin(H.z*.06+D)*.4,be=H.x+D*(H.half+1.15+oe*.35);me.push(be-ge*.65,H.y-.55,H.z,be+ge*.65,H.y-.42,H.z);let Ye=It/Math.max(1,he.length-1);Ce.push(0,Ye*8,1,Ye*8)});for(let H=0;H<he.length-1;H++){let It=H*2;et.push(It,It+2,It+1,It+1,It+2,It+3)}let Be=new Ot;Be.setAttribute("position",new gt(me,3)),Be.setAttribute("uv",new gt(Ce,2)),Be.setIndex(et);let bt=new Qt({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float flow=fract(vUv.y-uTime*0.35); float lane=abs(vUv.x-0.5); float body=smoothstep(0.5,0.08,lane); float streak=smoothstep(0.12,0.9,flow); vec3 col=mix(vec3(0.42,0.04,0.01), vec3(1.0,0.55,0.05), streak*body); float rim=smoothstep(0.2,0.38,lane)*(1.0-smoothstep(0.38,0.5,lane)); col+=vec3(1.0,0.8,0.25)*rim; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }"});i.add(new ye(Be,bt)),G.push(bt)}if(e.crater){let D=e.crater,k=new An(D.r,36),Z=new Qt({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ vec2 p=vUv-0.5; float r=length(p); float flow=fract(r*4.0-uTime*0.32); float ang=sin(atan(p.y,p.x)*5.0+uTime*0.8); float body=smoothstep(0.48,0.08,r); float streak=smoothstep(0.05,0.95,flow); vec3 col=mix(vec3(0.45,0.08,0.02), vec3(1.0,0.42,0.05), streak*0.65); col+=vec3(1.0,0.28,0.02)*ang*0.08*body; if(body<0.04) discard; gl_FragColor=vec4(col,1.0); }"}),he=new ye(k,Z);he.rotation.x=-Math.PI/2,he.position.set(D.x,D.y,D.z),i.add(he),G.push(Z)}else q(1),q(-1);let j=I.filter((D,k)=>(D.zone==="meadow"||D.zone==="sky")&&k%7===0).slice(0,10),K=new Qt({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ float f=fract(vUv.y*3.0-uTime*0.8); float a=smoothstep(0.0,0.15,vUv.x)*smoothstep(1.0,0.85,vUv.x)*0.55; vec3 col=mix(vec3(0.75,0.92,1.0), vec3(1.0,1.0,1.0), f); gl_FragColor=vec4(col,a); }"});G.push(K);for(let D of j){let k=new ye(new xi(1.4,4.2),K);k.position.set(D.x+D.side*1.5,D.y+D.s*.2,D.z),i.add(k)}let ue=[],$={meadow:8378506,canyon:16742938,sky:12051711,ice:14152703,climb:16762218,ship:16774885};for(let D=0;D<36;D++){let k=e.ship.z*(D+.5)/36,Z=D%2===0?-1:1,he=e.zones[0].id;for(let me of e.zones)k>=me.z0&&(he=me.id);ue.push({x:Z*(14+Yt(D)*8),y:6+Yt(D+3)*8,z:k,s:.6+Yt(D+9)*.9,phase:Yt(D+2)*6,color:$[he]||16774885})}let ve=o(f,Rn(16777215,t),ue,(D,k)=>{D.position.set(k.x,k.y,k.z),D.rotation.set(k.phase,k.phase*.3,0),D.scale.setScalar(k.s)}),we=160,Fe=new Float32Array(we*3),Ke=[];for(let D=0;D<we;D++)Ke.push({ox:(Yt(D)-.5)*18,oy:Yt(D+1)*6,oz:(Yt(D+2)-.4)*22,sp:.4+Yt(D+4)*1.6});let pt=new Ot;pt.setAttribute("position",new Nt(Fe,3));let se=new fs(pt,new Gi({color:16774885,size:.16,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0}));return i.add(se),{update(D,k){let Z=D.time||0;ve&&(ue.forEach((Be,bt)=>{n.position.set(Be.x,Be.y+Math.sin(Z*.7+Be.phase)*.45,Be.z),n.rotation.set(Be.phase,Z*.15+Be.phase,0),n.scale.setScalar(Be.s),n.updateMatrix(),ve.setMatrixAt(bt,n.matrix)}),ve.instanceMatrix.needsUpdate=!0);for(let Be of G)Be.uniforms.uTime.value=Z;let he=D.player,me=D.zoneId||"meadow",Ce=me==="canyon"?16742938:me==="ice"?16055295:me==="sky"?16777215:me==="climb"?16765503:16774856;se.material.color.setHex(Ce),se.material.size=me==="ice"?.28:me==="canyon"?.22:.16,se.material.opacity=me==="ice"?.55+Math.abs(Math.sin(Z*7))*.4:.85;let et=me==="sky"?4:me==="canyon"?.4:.8;for(let Be=0;Be<we;Be++){let bt=Ke[Be],H=(Z*bt.sp*et+bt.oy)%7;Fe[Be*3]=he.pos.x+bt.ox+(me==="sky"?Math.sin(Z+Be)*.4:0),Fe[Be*3+1]=he.pos.y+.4+H,Fe[Be*3+2]=he.pos.z+bt.oz}pt.attributes.position.needsUpdate=!0}}}var tf={tree:"assets/meadow/tree.glb",treeFat:"assets/meadow/tree_fat.glb",pine:"assets/meadow/tree_pine.glb",bush:"assets/meadow/bush.glb",bushLarge:"assets/meadow/bush_large.glb",bushSmall:"assets/meadow/bush_small.glb",flowerRed:"assets/meadow/flower_red.glb",flowerYellow:"assets/meadow/flower_yellow.glb",flowerPurple:"assets/meadow/flower_purple.glb",grass:"assets/meadow/grass.glb",grassLarge:"assets/meadow/grass_large.glb",rock:"assets/meadow/rock_small.glb",rockLarge:"assets/meadow/rock_large.glb",mushroom:"assets/meadow/mushroom.glb",mushroomTall:"assets/meadow/mushroom_tall.glb",fence:"assets/meadow/fence.glb",fenceBroken:"assets/meadow/fence_broken.glb",platform:"assets/meadow/platform.glb",log:"assets/meadow/log.glb",saw:"assets/meadow/saw.glb",button:"assets/meadow/button.glb",door:"assets/meadow/door.glb"},nf={cliff:"assets/kenney/cliff.glb",cliffLarge:"assets/kenney/cliff_large.glb",cliffTop:"assets/kenney/cliff_top.glb",formation:"assets/kenney/formation.glb",formationLarge:"assets/kenney/formation_large.glb",plank:"assets/kenney/plank.glb",block:"assets/kenney/block.glb",doorOpen:"assets/kenney/door_open.glb"},Hp={woodbark:13206602,woodinner:15782564,wooddark:9263666,wood:14722140,leafsgreen:4050517,grass:5166687,dirt:14135410,colorred:16729180,coloryellow:16765503,colorpurple:13208575,metal:16774354,heart:16735114,_defaultmat:16774885};function iM(i){let e=String(i||"").toLowerCase().replace(/[^a-z]/g,"");return Hp[e]?Hp[e]:e.includes("leaf")||e.includes("grass")?4050517:e.includes("wood")||e.includes("bark")?13206602:e.includes("red")?16729180:e.includes("yellow")?16765503:e.includes("purple")?13208575:e.includes("dirt")||e.includes("rock")?12042444:16774885}var Wp={value:0};function Xp(i){Wp.value=i}function qp(i,e,t,n){let s=i&&i.name||"",r=new St({color:t?t(s):iM(s),gradientMap:e,side:Lt,name:s});return r.onBeforeCompile=o=>{vs(o,{}),n&&(o.uniforms.uWindTime=Wp,o.vertexShader=`uniform float uWindTime;
`+o.vertexShader.replace("vPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;",`float sway = sin(uWindTime * 1.7 + position.x * 0.45 + position.z * 0.2) * 0.075 * smoothstep(0.3, 1.8, position.y);
transformed.x += sway;
transformed.z += sway * 0.35;
vPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;`))},r}function ef(i,e){i.traverse(t=>{if(!t.isMesh)return;let n=Array.isArray(t.material)?t.material[0]:t.material;t.material=qp(n,e)})}function sM(i,e,t,n){i.scene.updateWorldMatrix(!0,!0);let s=[];i.scene.traverse(o=>{if(!o.isMesh)return;let a=o.geometry.clone();a.applyMatrix4(o.matrixWorld);let c=Array.isArray(o.material)?o.material[0]:o.material;s.push({geom:a,mat:qp(c,e,t,n)})});let r=new Jt().setFromObject(i.scene);return{parts:s,lift:-r.min.y}}function Et(i,e,t,n,s,r){if(!e||!n.length)return;let{parts:o,lift:a}=sM(e,t,s,r),c=new ut;for(let h of o){let f=new un(h.geom,h.mat,n.length);f.frustumCulled=!1,n.forEach((p,x)=>{let b=p.s;c.position.set(p.x,(p.y||0)+a*b,p.z),c.rotation.set(0,p.rot||0,0),c.scale.setScalar(b),c.updateMatrix(),f.setMatrixAt(x,c.matrix)}),f.instanceMatrix.needsUpdate=!0,i.add(f)}let l=new un(new An(1,12),new tt({color:1975360,transparent:!0,opacity:.3,depthWrite:!1}),n.length),u=new ut;n.forEach((h,f)=>{u.position.set(h.x,(h.y||0)+.05,h.z),u.rotation.set(-Math.PI/2,0,0),u.scale.setScalar(Math.max(.35,h.s*1.6)),u.updateMatrix(),l.setMatrixAt(f,u.matrix)}),l.instanceMatrix.needsUpdate=!0,l.frustumCulled=!1,l.userData.blobShadow=!0,i.add(l)}function si(i,e,t,n,s){let r=[];for(let o=0;o<t;o++){let a=o*2.4+i*.1,c=n*(.25+o%4*.22);r.push({x:i+Math.cos(a)*c,z:e+Math.sin(a)*c,rot:a,s:s*(.82+o%3*.14),y:0})}return r}function fn(i,e,t,n,s,r,o){let a=[];for(let c=0;c<t;c++){let l=o+c/t*Math.PI*2;a.push({x:i+Math.cos(l)*n,z:e+Math.sin(l)*n,rot:l,s:s*(.85+c%3*.12),y:r})}return a}var io=i=>{let e=String(i||"").toLowerCase();return e.includes("sand")||e.includes("grass")||e.includes("leaf")?14711346:e.includes("red")?12863544:e.includes("wood")||e.includes("dirt")?9058856:7220770};function Rc(i,e,t,n){if(!e.length)return;let s=new Bt(.85,12,9),r=new St({color:t,gradientMap:n}),o=new un(s,r,e.length),a=new ut,c=new un(new An(1,12),new tt({color:1975360,transparent:!0,opacity:.3,depthWrite:!1}),e.length),l=new ut;e.forEach((u,h)=>{a.position.set(u.x,(u.y||0)+.7*u.s,u.z),a.scale.set(u.s,u.s*.82,u.s),a.rotation.set(0,u.rot||0,0),a.updateMatrix(),o.setMatrixAt(h,a.matrix),l.position.set(u.x,(u.y||0)+.06,u.z),l.rotation.set(-Math.PI/2,0,0),l.scale.setScalar(Math.max(.5,u.s*1.4)),l.updateMatrix(),c.setMatrixAt(h,l.matrix)}),o.instanceMatrix.needsUpdate=!0,c.instanceMatrix.needsUpdate=!0,c.userData.blobShadow=!0,i.add(o,c)}var Qh=i=>{let e=String(i||"").toLowerCase();return e.includes("leaf")||e.includes("grass")||e.includes("sand")?8315080:13995007},Gp=i=>{let e=String(i||"").toLowerCase();return e.includes("leaf")||e.includes("grass")||e.includes("sand")?8317183:3120639},Vp=i=>{let e=String(i||"").toLowerCase();return e.includes("leaf")||e.includes("grass")||e.includes("sand")?16761402:16742938},$h=i=>{let e=String(i||"").toLowerCase();return e.includes("sand")||e.includes("grass")||e.includes("leaf")?4050517:e.includes("wood")||e.includes("dirt")?9267268:7166016};function Yp(i,e,t,n){let s=(e.hubs||[]).find(E=>E.zone==="meadow")||{x:0,z:40,r:24},r=si(s.x-10,s.z-1,6,3.2,.62),o=si(s.x+9,s.z+13,4,2.8,.72),a=si(s.x-8,s.z+12,3,2.2,.58),c=si(s.x-11,s.z+6,5,2.4,.85),l=si(s.x-7,s.z-13,8,2.2,.78),u=si(s.x+8,s.z-9,7,2,.72),h=si(s.x+6,s.z-14,8,2.6,.42).concat(si(s.x-6,s.z+8,6,2.2,.4)),f=si(s.x+16,s.z+2,5,2.6,.95),p=[{x:s.x+7.2,z:s.z-5.5,rot:.4,s:2.15,y:0},{x:s.x+9.4,z:s.z-7.2,rot:1.2,s:1.55,y:0},{x:s.x+6.1,z:s.z-7.6,rot:2.1,s:1.25,y:0}],x=[];for(let E=0;E<6;E++)x.push({x:s.x-18.6,z:s.z-12+E*3.6,rot:Math.PI/2,s:.52,y:0});let m=(e.floors||[]).filter(E=>E.zone==="meadow"&&E.rx>5&&E.rx<9).map((E,C)=>({x:E.x,z:E.z,y:E.y,rot:C,s:.85}));if(Et(i,n.tree,t,r,null,!0),Et(i,n.treeFat,t,o,null,!0),Et(i,n.pine,t,a,null,!0),Et(i,n.bushLarge,t,c,null,!0),Et(i,n.bush,t,si(s.x+12,s.z+8,4,2,.7),null,!0),Et(i,n.flowerRed,t,l.filter((E,C)=>C%2===0),null,!0),Et(i,n.flowerYellow,t,l.filter((E,C)=>C%2===1),null,!0),Et(i,n.flowerPurple,t,u,null,!0),Et(i,n.grass,t,h,null,!0),Et(i,n.grassLarge,t,si(s.x-9,s.z-8,4,1.8,.48),null,!0),Et(i,n.rockLarge,t,f),Et(i,n.rock,t,si(s.x+15,s.z-1,4,1.6,.55)),Et(i,n.mushroomTall,t,p),Et(i,n.fence,t,x),Et(i,n.log,t,[{x:s.x-15.5,z:s.z-8,rot:.5,s:.7,y:0}]),Et(i,n.platform,t,m),Et(i,n.cliff,t,fn(s.x,s.z,12,21.2,.62,-1.2,.05),$h),Et(i,n.cliffLarge,t,fn(s.x,s.z,12,23.4,.55,-1.5,.2),$h),Et(i,n.cliffTop,t,fn(s.x,s.z,8,36,1.15,-1.2,.4),$h),n.mushroom){let E=n.mushroom.scene.clone(!0);ef(E,t);let C=new Jt().setFromObject(n.mushroom.scene),I=4.6;E.scale.setScalar(I),E.position.set(s.x,-C.min.y*I,s.z);let _=[];E.traverse(U=>{U.isMesh&&_.push(U)});for(let U of _){let F=new ye(U.geometry,new tt({color:1975360,side:nn}));F.scale.setScalar(1.045),U.add(F)}[[.22,1.28,.05],[-.18,1.22,.2],[.05,1.32,-.22],[.28,1.18,-.12]].forEach((U,F)=>{let G=n.mushroomTall.scene.clone(!0);ef(G,t),G.scale.setScalar(.16+F%2*.05),G.position.set(U[0],U[1],U[2]),G.rotation.y=F,E.add(G)}),i.add(E)}let d=(e.hubs||[]).find(E=>E.zone==="canyon"),v=e.crater;if(d){let E=v?v.x:d.x,C=v?v.z:d.z;Rc(i,fn(E,C,5,16,1.05,.15,.2),16747098,t),Rc(i,fn(E,C,4,19,.7,.1,.4),16765503,t),Et(i,n.cliffLarge,t,fn(d.x,d.z,10,21,.7,-1.4,.05),io),Et(i,n.cliff,t,fn(d.x,d.z,10,23.2,.62,-1.6,.18),io),Et(i,n.cliffTop,t,fn(d.x,d.z,7,36,1.25,-.8,.3),io);let I=[{x:d.x-16,z:d.z+8,rot:.4,s:.7,y:0},{x:d.x-16,z:d.z+14,rot:.4,s:.7,y:0},{x:d.x-16,z:d.z+11,rot:Math.PI/2,s:.55,y:4.2}];Et(i,n.cliff,t,I.slice(0,2),io),Et(i,n.cliffTop,t,I.slice(2),io);let _=e.doors&&e.doors[0]?e.doors[0].z:C+28;n.block&&Et(i,n.block,t,[{x:-12.6,z:_,rot:0,s:.28,y:.15},{x:12.6,z:_,rot:0,s:.28,y:.15}],io)}let M=(e.hubs||[]).find(E=>E.zone==="sky"),y=(e.hubs||[]).find(E=>E.zone==="ice"),R=(e.hubs||[]).find(E=>E.zone==="climb");M&&(Et(i,n.pine,t,fn(M.x,M.z,6,14,.42,4.2,.2),Qh,!0),Et(i,n.bush,t,fn(M.x,M.z,5,18,.45,4.1,.6),Qh,!0),Et(i,n.cliffTop,t,fn(M.x,M.z,6,28,1,2,.4),Qh)),y&&(Et(i,n.pine,t,fn(y.x,y.z,7,14,.4,3.2,.3),Gp,!0),Rc(i,fn(y.x,y.z,6,16,.7,3.1,.8),4114687,t),Et(i,n.cliff,t,fn(y.x,y.z,12,18,.5,1.6,.1),Gp)),R&&(Et(i,n.tree,t,fn(R.x,R.z,6,13,.4,3.2,.5),Vp,!0),Rc(i,fn(R.x,R.z,5,15,.75,3,1),16751146,t),Et(i,n.cliffLarge,t,fn(R.x,R.z,10,18,.55,1.4,.2),Vp))}function _s(i,e,t,n){let s=new Jt().setFromObject(i.scene),r=i.scene.clone(!0);return ef(r,e),r.scale.setScalar(t),n||(r.position.y=-s.min.y*t),r}var jp={buddy:"assets/space_buddy_rigged.glb",bumper:"assets/models/obstacle_bumper.glb",spinner:"assets/models/obstacle_spinner.glb",pad:"assets/models/obstacle_jump_pad.glb",platform:"assets/models/obstacle_moving_platform.glb",lava:"assets/models/obstacle_lava_pool.glb",chunk:"assets/models/obstacle_falling_chunk.glb",ship:"assets/escape_ship_web.glb",roller:"assets/models/enemy_roller.glb",hopper:"assets/models/enemy_hopper.glb",flyer:"assets/models/enemy_flyer.glb",geyser:"assets/models/hazard_geyser.glb",sweeper:"assets/models/hazard_sweeper.glb",pendulum:"assets/models/hazard_pendulum.glb"},Tt=Op();function rM(i){i.onBeforeCompile=e=>vs(e,{stripes:!!i.userData.stripes})}function Zp(i,e){let t=e?new ze(e):i&&i.color&&i.color.isColor?i.color.clone():new ze(16777215),n=i&&i.emissive&&i.emissive.isColor?i.emissive.clone():new ze(0),s=new St({color:t,emissive:n,emissiveIntensity:i&&i.emissiveIntensity||0,gradientMap:Tt,transparent:!!(i&&i.transparent),opacity:i&&i.opacity!=null?i.opacity:1,side:Lt,name:i&&i.name||""});return e&&(s.userData.stripes=!0),/Lava|Glow|Antenna|Thruster|Pad|Crack|Star|Hot/.test(s.name)&&(s.emissive.copy(t),s.emissiveIntensity=Math.max(s.emissiveIntensity,.35)),rM(s),s}function oM(i){let e=i.getAttribute("position"),t=i.getIndex();if(!e||!t)return;let n=t.array,s=[],r=new Map,o=.012;for(let a=0;a<n.length;a+=3){let c=n[a],l=n[a+1],u=n[a+2],h=(e.getX(c)+e.getX(l)+e.getX(u))/3,f=(e.getY(c)+e.getY(l)+e.getY(u))/3,p=(e.getZ(c)+e.getZ(l)+e.getZ(u))/3,x=Math.round(h/o)+":"+Math.round(f/o)+":"+Math.round(p/o),b=r.get(x)||[],m=!1;for(let d=0;d<b.length;d++){let v=b[d];if(Math.abs(v[0]-h)+Math.abs(v[1]-f)+Math.abs(v[2]-p)<.008){m=!0;break}}m||(b.push([h,f,p]),r.set(x,b),s.push(c,l,u))}s.length<n.length&&i.setIndex(s)}function aM(i){let e=i.getAttribute("position"),t=i.getIndex();if(!e||!t)return;let n=t.array,s=[],r=h=>e.getX(h),o=h=>e.getY(h),a=h=>e.getZ(h),c=1/0,l=-1/0;for(let h=0;h<e.count;h++){let f=o(h);f<c&&(c=f),f>l&&(l=f)}let u=Math.max(.001,l-c);for(let h=0;h<n.length;h+=3){let f=n[h],p=n[h+1],x=n[h+2],b=Math.hypot(r(f)-r(p),o(f)-o(p),a(f)-a(p)),m=Math.hypot(r(p)-r(x),o(p)-o(x),a(p)-a(x)),d=Math.hypot(r(x)-r(f),o(x)-o(f),a(x)-a(f)),v=Math.max(b,m,d),M=Math.min(b,m,d);M<8e-4||v/Math.max(M,1e-6)>18||v>u*.42||s.push(f,p,x)}s.length<n.length&&i.setIndex(s)}function cM(i,e){i.updateWorldMatrix(!0,!0),i.traverse(r=>{r.isMesh&&(r.geometry=r.geometry.clone(),r.geometry.applyMatrix4(r.matrixWorld),oM(r.geometry),aM(r.geometry),r.position.set(0,0,0),r.quaternion.identity(),r.scale.set(1,1,1))}),i.position.set(0,0,0),i.quaternion.identity(),i.scale.set(1,1,1),i.updateWorldMatrix(!0,!0);let t=new Jt().setFromObject(i),n=Math.max(.001,t.getSize(new B).y);i.scale.setScalar(e/n),i.updateWorldMatrix(!0,!0);let s=new Jt().setFromObject(i);i.position.y-=s.min.y}var Jp=4;function Qp(i){return i?(i.colorSpace=qt,i.generateMipmaps=!0,i.minFilter=$n,i.magFilter=_n,i.anisotropy=Jp,i.needsUpdate=!0,i):null}function lM(i,e){let t=new ze(e),n=Qp(i&&i.map),s=new ps({map:n,color:16777215,roughness:1,metalness:0,emissive:0,emissiveIntensity:0,name:"BuddyHue"});return s.transparent=!1,s.depthWrite=!0,s.opacity=1,s.alphaTest=0,s.side=Vn,s.polygonOffset=!0,s.polygonOffsetFactor=1,s.polygonOffsetUnits=1,s.userData.tint=t,s.onBeforeCompile=r=>{r.uniforms.uTint={value:t},s.userData.shader=r,r.fragmentShader=`uniform vec3 uTint;
`+r.fragmentShader.replace("#include <opaque_fragment>",`vec3 albedo = diffuseColor.rgb;
float luma = dot(albedo, vec3(0.299, 0.587, 0.114));
float mx = max(albedo.r, max(albedo.g, albedo.b));
float mn = min(albedo.r, min(albedo.g, albedo.b));
float sat = mx - mn;
float warm = smoothstep(0.02, 0.14, albedo.r - max(albedo.g, albedo.b));
float suit = smoothstep(0.12, 0.26, sat) * (1.0 - warm);
vec3 tinted = uTint * mix(0.82, 1.22, clamp(luma, 0.0, 1.0));
vec3 color = mix(albedo, tinted, suit);
float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.5);
color += vec3(1.0) * rim * 0.5;
vec3 L = normalize(vec3(-0.35, 0.86, 0.28));
vec3 V = normalize(vViewPosition);
float spec = pow(clamp(dot(normalize(normal), normalize(L + V)), 0.0, 1.0), 72.0);
color += vec3(1.0) * spec * 0.4;
outgoingLight = color;
#include <opaque_fragment>`)},s}function uM(i){let e=Qp(i&&i.map),t=new tt({map:e,color:16777215,fog:!1,toneMapped:!1,name:"ShipPaint"});return t.transparent=!1,t.depthWrite=!0,t.opacity=1,t.side=Vn,t}function hM(i,e){let t=new Map;i.traverse(n=>{if(!n.isMesh)return;let s=r=>{if(!r)return Zp(null,e);if(!e&&t.has(r.uuid))return t.get(r.uuid);let o=Zp(r,e);return e||t.set(r.uuid,o),o};Array.isArray(n.material)?n.material=n.material.map(s):n.material=s(n.material)})}function Kp(i){i.updateWorldMatrix(!0,!0);let e=[];return i.traverse(t=>{if(!t.isMesh)return;let n=t.geometry.clone();n.applyMatrix4(t.matrixWorld),n.computeBoundingBox();let s=Array.isArray(t.material)?t.material[0]:t.material;e.push({geom:n,mat:s,name:s&&s.name||t.name||"",maxY:n.boundingBox.max.y})}),e}function Yn(i,e,t,n){return e+(i-e)*Math.exp(-t*n)}function fM(i,e,t,n){let s=e-i;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;return i+s*(1-Math.exp(-t*n))}async function $p(i,e,t,n){let s=new tc({canvas:i,antialias:!1,alpha:!1,powerPreference:"high-performance"});s.outputColorSpace=qt,Jp=Math.max(1,Math.min(8,s.capabilities.getMaxAnisotropy())),s.toneMapping=rh,s.toneMappingExposure=1.05;let r=Math.min(window.devicePixelRatio||1,t.dprCap),o=new URLSearchParams(location.search).get("dpr");o&&(r=Math.max(.75,Math.min(2,Number(o)||r)));let a=new ko;a.fog=new nc(10479871,t.fogNear,t.fogFar);let c=new tn(t.fovPortrait,1,.15,500);c.layers.enable(1);let l=s.getContext(),u=l.getExtension("WEBGL_debug_renderer_info"),h=u?String(l.getParameter(u.UNMASKED_RENDERER_WEBGL)||""):"",f=/SwiftShader|llvmpipe|Mali-4|PowerVR SGX|Adreno \(TM\) [34]/i.test(h)||navigator.deviceMemory&&navigator.deviceMemory<=2,p=!f&&new URLSearchParams(location.search).get("nopost")!=="1";new URLSearchParams(location.search).get("post")==="1"&&(p=!0);let x=new ti(4,4),b=new ti(4,4),m=new ko,d=new hs(-1,1,1,-1,0,1),v=new Qt({depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:{tScene:{value:x.texture},tBloom:{value:b.texture}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:"varying vec2 vUv; uniform sampler2D tScene; uniform sampler2D tBloom; void main(){ vec3 c = texture2D(tScene, vUv).rgb; vec2 o = vec2(0.022, 0.0); vec3 b = texture2D(tBloom, vUv + o).rgb + texture2D(tBloom, vUv - o).rgb + texture2D(tBloom, vUv + o.yx).rgb + texture2D(tBloom, vUv - o.yx).rgb; b += texture2D(tBloom, vUv + o * 2.0).rgb + texture2D(tBloom, vUv - o * 2.0).rgb; c += b * 0.22; float l = dot(c, vec3(0.2126, 0.7152, 0.0722)); c = clamp(l + (c - l) * 1.08, 0.0, 1.35); gl_FragColor = vec4(c, 1.0); }"});m.add(new ye(new xi(2,2),v));let M=new URLSearchParams(location.search),y=window.matchMedia("(pointer: coarse)").matches||window.innerWidth<900||M.has("low"),R=M.get("tier")==="high"||!f&&!y&&M.get("tier")!=="mid";s.shadowMap.enabled=R,s.shadowMap.type=ih;let E=new mc(10474751,16761994,.6),C=new eo(16773314,1.15);C.position.set(-14,26,8),C.castShadow=R;let I=1024;C.shadow.mapSize.set(I,I),C.shadow.camera.near=1,C.shadow.camera.far=46,C.shadow.camera.left=C.shadow.camera.bottom=-14,C.shadow.camera.right=C.shadow.camera.top=14,C.shadow.bias=-35e-5,C.shadow.normalBias=.035,C.shadow.radius=f?1:2.5,a.add(E,C,C.target);let _=R?2:0,S=0,U=new ye(new Bt(380,18,12),new Qt({side:nn,depthWrite:!1,fog:!1,uniforms:{top:{value:new ze(6080767)},mid:{value:new ze(10479871)},bot:{value:new ze(9361328)}},vertexShader:"varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 bot; void main(){ vec3 n=normalize(vP); float h=n.y; vec3 c=mix(bot, mid, smoothstep(-0.15, 0.0, h)); c=mix(c, top, smoothstep(-0.02, 0.16, h)); float sun=smoothstep(0.14, 0.0, length(n.xz-vec2(-0.32,0.12))); c+=vec3(1.0,0.86,0.48)*sun*smoothstep(0.0,0.2,h); gl_FragColor=vec4(c,1.0); }"}));U.userData.skipCam=!0,a.add(U);let F=new Wt,G=[];for(let g=0;g<180;g++){let T=Math.random()*Math.PI*2,L=Math.acos(Math.random()*.65+.15),z=260;G.push(Math.sin(L)*Math.cos(T)*z,Math.cos(L)*z*.65+40,Math.sin(L)*Math.sin(T)*z)}let q=new Ot;q.setAttribute("position",new gt(G,3));let j=new fs(q,new Gi({color:16774880,size:2.2,sizeAttenuation:!1,depthWrite:!1})),K=new ye(new Bt(28,18,14),new Qt({fog:!1,vertexShader:"varying vec3 vN; void main(){ vN=normalize(normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec3 vN; void main(){ float b=sin(vN.y*9.0)*0.5+0.5; vec3 c=mix(vec3(1.0,0.42,0.62), vec3(0.28,0.62,1.0), b); c=mix(c, vec3(1.0,0.86,0.35), smoothstep(0.72,0.9,b)); gl_FragColor=vec4(c,1.0); }"}));K.position.set(-90,55,-160);let ue=new ye(new ds(40,3.2,8,28),new tt({color:16769448,fog:!1}));ue.rotation.x=1.1,ue.position.copy(K.position),F.add(ue);let $=new ye(new Bt(8,12,10),new tt({color:16773577,fog:!1}));$.position.set(70,42,-150),F.add(j,K,$),j.material.transparent=!0;let ve=[],we=new tt({color:16777215,fog:!1,transparent:!0,opacity:.94});for(let g=0;g<8;g++){let T=new Wt;for(let z=0;z<4;z++){let ne=new ye(new Bt(5.5,8,6),we);ne.position.set((z-1.5)*4.6,Math.sin(z*1.4)*1.6,z%2*1.4),ne.scale.set(1,.55,.85),T.add(ne)}let L=g/8*Math.PI*2;T.position.set(Math.cos(L)*110,48+g%3*14,Math.sin(L)*110),F.add(T),ve.push(T)}let Fe=[];for(let g=0;g<4;g++){let T=new ye(new Xn(2.2,7,6),new tt({color:g%2?16748497:16765503,fog:!1}));T.rotation.x=Math.PI/2,T.position.set(-40+g*28,36+g%2*8,-90-g*12),F.add(T),Fe.push(T)}let Ke=[];for(let g=0;g<6;g++){let T=new ye(new $t(.06,.06,2.2,5),new tt({color:16774885})),L=new ye(new xi(1.1,.55),new tt({color:g%2?16739179:6284208,side:Lt}));L.position.set(.55,.85,0),T.add(L),T.position.set(-10+g*4.5,.2,16+g%3),a.add(T),Ke.push(L)}F.userData.skipCam=!0,a.add(F);let pt=new Tc;pt.setMeshoptDecoder(Dp);let se=Object.keys(jp),D={},k={},Z=0,he=Object.keys(tf).concat(Object.keys(nf)),me=se.length+he.length;await Promise.all([...se.map(g=>new Promise((T,L)=>{pt.load(jp[g],z=>{if(g==="ship")cM(z.scene,6.6),z.scene.traverse(ne=>{if(!ne.isMesh||!ne.material)return;let fe=Array.isArray(ne.material)?ne.material[0]:ne.material;ne.material=uM(fe)});else if(g!=="buddy"){let ne={bumper:16736162,spinner:16765503,pad:6087167,platform:13208575,lava:16738858,chunk:16757082,roller:16747066,hopper:8052896,flyer:9221887,geyser:16765503,sweeper:16743121,pendulum:13219583}[g];hM(z.scene,ne)}D[g]=z,Z++,n&&n(Z/me),T()},void 0,L)})),...he.map(g=>new Promise((T,L)=>{pt.load(tf[g]||nf[g],z=>{k[g]=z,Z++,n&&n(Z/me),T()},void 0,L)}))]),Yp(a,e,Tt,k);let Ce=new ut,et=new ze;function Be(g,T,L){let z=Kp(g.scene),ne=0;for(let Ne of z)ne=Math.max(ne,Ne.maxY);let fe=[];for(let Ne of z){Ne.geom.translate(0,-ne,0);let je=/Crack|Glow/.test(Ne.name),Oe=je?new St({color:16742938,emissive:16742938,emissiveIntensity:.85,gradientMap:Tt}):new St({color:16777215,gradientMap:Tt}),it=new un(Ne.geom,Oe,T.length);it.instanceMatrix.setUsage(gp);for(let Rt=0;Rt<T.length;Rt++){let N=T[Rt];if(Ce.position.set(N.x,N.y,N.z),Ce.rotation.set(0,0,0),Ce.scale.set(1,1,1),Ce.updateMatrix(),it.setMatrixAt(Rt,Ce.matrix),je)et.set(16742938),it.setColorAt(Rt,et);else{let O=Ne.maxY>ne-.25?N.topColor:N.sideColor;et.set(L==="crack"&&Ne.maxY>ne-.25?N.topColor:O),it.setColorAt(Rt,et)}}L==="crack"&&bt(it,T.length),it.instanceMatrix.needsUpdate=!0,it.instanceColor&&(it.instanceColor.needsUpdate=!0),it.computeBoundingSphere(),a.add(it),fe.push(it)}return fe}function bt(g,T){for(let L=0;L<T;L++)Ce.position.set(0,-80,0),Ce.scale.set(0,0,0),Ce.rotation.set(0,0,0),Ce.updateMatrix(),g.setMatrixAt(L,Ce.matrix)}let H=Bp(a,e,Tt),It=new St({vertexColors:!0,gradientMap:Tt,side:Lt});It.onBeforeCompile=g=>vs(g,{floors:!0});let oe=new St({vertexColors:!0,color:16765104,emissive:16742938,emissiveIntensity:.28,gradientMap:Tt,side:Lt}),ge=[];for(let g of e.chunks){if(g.gap||!g.positions){ge.push(null);continue}let T=new Ot;T.setAttribute("position",new Nt(g.positions,3)),T.setAttribute("color",new Nt(g.colors,3)),T.setIndex(new Nt(g.indices,1)),T.computeVertexNormals();let L=new ye(T,It);L.frustumCulled=!0,L.receiveShadow=!0,a.add(L),g.mesh=L,ge.push(L)}let be={meadow:[.16,.62,.32],canyon:[.72,.24,.16],sky:[.72,.36,.7],ice:[.16,.55,.95],climb:[.9,.42,.1],ship:[.9,.55,.18]},Ye=[],Ue=[],P=[],w=[],Y=14,re=9;for(let g=0;g<=e.len;g+=Y){let T=e.stations[Math.min(e.stations.length-1,Math.round(g/2))],L=be[T.zone]||be.meadow,z=[];for(let ne=0;ne<re;ne++){let fe=(ne/(re-1)*2-1)*32,Ne=(Math.abs(fe)/12)**2;Ye.push(T.x+fe,T.y-8.2-Ne,T.z);let je=.86+Math.sin(T.z*.04+fe*.2)*.08;Ue.push(L[0]*je,L[1]*je,L[2]*je),z.push(Ye.length/3-1)}w.push(z)}for(let g=0;g<w.length-1;g++)for(let T=0;T<re-1;T++){let L=w[g][T],z=w[g][T+1],ne=w[g+1][T],fe=w[g+1][T+1];P.push(L,ne,z,z,ne,fe)}let ce=new Ot;if(ce.setAttribute("position",new Nt(new Float32Array(Ye),3)),ce.setAttribute("color",new Nt(new Float32Array(Ue),3)),ce.setIndex(P),ce.computeVertexNormals(),a.add(new ye(ce,It)),e.floors&&e.floors.length){let g=new un(new An(1,10),new tt({color:1975360,transparent:!0,opacity:.16,depthWrite:!1}),e.floors.length),T=new ut;e.floors.forEach((L,z)=>{T.position.set(L.x,L.y+.05,L.z),T.rotation.set(-Math.PI/2,0,0),T.scale.set(Math.max(.8,L.rx*.55),Math.max(.8,L.rz*.55),1),T.updateMatrix(),g.setMatrixAt(z,T.matrix)}),g.instanceMatrix.needsUpdate=!0,g.userData.blobShadow=!0,a.add(g)}let ie=null,Ie=null,xe=new ut;if(e.coins&&e.coins.length){let g=new $t(.32,.32,.08,12),T=new St({color:16765503,emissive:16765503,emissiveIntensity:.55,gradientMap:Tt});ie=new un(g,T,e.coins.length);let L=new tt({color:16765503,transparent:!0,opacity:.35,depthWrite:!1,blending:Or});Ie=new un(new An(.7,12),L,e.coins.length),e.coins.forEach((z,ne)=>{xe.position.set(z.x,z.y,z.z),xe.rotation.x=Math.PI/2,xe.updateMatrix(),ie.setMatrixAt(ne,xe.matrix),Ie.setMatrixAt(ne,xe.matrix)}),ie.userData.bloom=!0,Ie&&(Ie.userData.bloom=!0),a.add(ie,Ie)}let Ae=[];for(let g of e.doors||[]){let T=g.solid?k.door:k.doorOpen;if(!T)continue;let L=_s(T,Tt,.4,!1);L.position.x=g.x,L.position.z=g.z,L.position.y+=g.y,g.solid&&L.traverse(z=>{z.isMesh&&z.material&&z.material.color&&z.material.color.set(12862778)}),a.add(L),Ae.push(L)}let ht=new St({color:14826314,gradientMap:Tt}),de=new St({color:16048836,gradientMap:Tt}),Le=new St({color:7306394,gradientMap:Tt});for(let g of e.landmarks||[])if(g.kind!=="mushroom"){if(g.kind==="tower"){let T=new ye(new $t(1.3,2.4,11,8),Le);T.position.set(g.x,g.y+5.2,g.z);let L=new ye(new Xn(2.6,2.4,8),ht);L.position.set(g.x,g.y+11.6,g.z),a.add(T,L)}}for(let g of e.islands||[]){let T=new ye(new $t(g.r,g.r*.7,.85,10),new St({color:g.zone==="canyon"?13720114:9425034,gradientMap:Tt}));T.position.set(g.x,g.y-.25,g.z),a.add(T)}let We=Kp(D.chunk.scene)[0].geom,Ze=new Go({color:12166105}),De=[];for(let g=0;g<24;g++){let T=new ye(We,Ze);T.visible=!1,T.scale.setScalar(.85),a.add(T),De.push({mesh:T,active:!1,vy:0,life:0})}function at(g){let T=g.scene.clone(!0);return T.traverse(L=>{!L.isMesh||!L.material||(L.material=Array.isArray(L.material)?L.material.map(z=>z.clone()):L.material.clone())}),T}function Je(g,T,L,z,ne=0,fe=1){let Ne=g.scene.clone(!0);return Ne.position.set(T,L,z),Ne.rotation.y=ne,Ne.scale.setScalar(fe),a.add(Ne),Ne}let Dt=e.bumpers.map(g=>Je(D.bumper,g.x,g.y,g.z)),V=new Ys(.85,1.15,28);function _e(g,T,L,z){let ne=new ye(V,new tt({color:16774048,transparent:!0,opacity:0,depthWrite:!1,side:Lt}));return ne.rotation.x=-Math.PI/2,ne.position.set(g,T+.14,L),ne.scale.setScalar(z||1),ne.userData.decor=!0,ne.visible=!1,a.add(ne),ne}let ee=e.bumpers.map(g=>_e(g.x,g.y,g.z,1.35)),ae=e.pads.map(g=>{if(g.zone==="meadow"&&k.button){let T=_s(k.button,Tt,.42,!1);return T.position.x=g.x,T.position.z=g.z,T.position.y+=g.y,a.add(T),T}return Je(D.pad,g.x,g.y,g.z)});ae.forEach(g=>{g.userData.base=g.scale.x||1});let Re=[];e.crater&&Re.push(Je(D.lava,e.crater.x,e.crater.y,e.crater.z,0,e.crater.r/3));let Ee=e.spinners.map(g=>{if((g.zone==="meadow"||g.zone==="canyon")&&k.saw){let z=_s(k.saw,Tt,.34,!0);return z.position.set(g.x,g.y+.9,g.z),a.add(z),{obj:z,bar:z,meadow:!0}}let T=Je(D.spinner,g.x,g.y,g.z);T.scale.setScalar((g.len||1.62)/1.62);let L=T.getObjectByName("Spinner_Bar");return{obj:T,bar:L}}),nt=[];e.platforms.forEach((g,T)=>{let L;g.zone==="canyon"&&k.plank?(L=_s(k.plank,Tt,.24,!0),L.position.set(g.x,g.y,g.z),a.add(L)):L=Je(D.platform,g.x,g.y,g.z,0,g.kind==="spin"?1.15:1.35),nt[T]=L});let Ve=D.ship.scene;Ve.position.set(e.ship.x,e.ship.y,e.ship.z),Ve.rotation.y=Math.PI,mn(Ve,.05),a.add(Ve);let Zt=[],vt=[],In=new Jt().setFromObject(Ve),oi=In.getSize(new B),jc=In.getCenter(new B);for(let g=1;g<=8;g++){let T=Ve.getObjectByName("SeatSocket_"+g);if(!T){T=new ut;let ne=(g-1)%4,fe=Math.floor((g-1)/4);T.position.set((ne-1.5)*.55,oi.y*.46,(fe-.5)*.42),Ve.add(T)}Zt.push(T);let L=Ve.getObjectByName("Seat_"+g),z=[];L&&L.traverse(ne=>{if(!ne.isMesh)return;let Ne=(Array.isArray(ne.material)?ne.material:[ne.material]).filter(Boolean).map(je=>{let Oe=je.clone();return z.push({mat:Oe,color:Oe.color?Oe.color.clone():new ze(16777215),emissive:Oe.emissive?Oe.emissive.clone():new ze(0),intensity:Oe.emissiveIntensity||0}),Oe});ne.material=Array.isArray(ne.material)?Ne:Ne[0]}),vt.push(z)}let As=new ye(new $t(.55,1.3,34,10,1,!0),new tt({color:16765503,transparent:!0,opacity:.45,side:Lt,depthWrite:!1}));As.position.y=20,Ve.add(As);let kn=new ye(new Ys(3.1,3.7,28),new tt({color:16765503,side:Lt,transparent:!0,opacity:.9,depthWrite:!1}));kn.rotation.x=-Math.PI/2,kn.position.set(e.ship.x,e.ship.y+.08,e.ship.z-4.2),kn.userData.bloom=!0,a.add(kn);let Zi=new ye(new $t(.55,.9,28,10,1,!0),new tt({color:16765503,transparent:!0,opacity:.55,side:Lt,depthWrite:!1}));Zi.userData.bloom=!0,a.add(Zi);let $s=new Wt,ea=new Xn(.7,1.5,4),er=new tt({color:16773544,transparent:!0,opacity:.85,depthWrite:!1}),Rs=e.routes&&e.routes[0]||e.waypoints||[];for(let g=2;g<Rs.length;g+=3){let T=Rs[g],L=Rs[Math.min(Rs.length-1,g+1)],z=new ye(ea,er);z.position.set(T.x,(T.y||0)+1.3,T.z),z.rotation.x=Math.PI/2,z.rotation.z=Math.atan2(L.x-T.x,L.z-T.z),$s.add(z)}a.add($s);let dn=new ye(new Xn(.85,2.2,8),new tt({color:16765503}));dn.rotation.x=Math.PI,dn.position.y=.15,dn.visible=!1;let tr=dn.clone();tr.material=new tt({color:16739179}),tr.scale.setScalar(.55),dn.add(tr),dn.position.set(0,.15,-1.4),Ve.add(dn);let Pn=new ye(new An(14,40),new Qt({uniforms:{uTime:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){ vec2 uv=vUv+vec2(uTime*0.03,-uTime*0.02); float d=length(vUv-0.5)*2.0; float n=sin(uv.x*22.0+uTime)*sin(uv.y*19.0-uTime*0.8); n+=sin((uv.x*2.0+uv.y)*16.0+uTime*1.4)*0.65; float hotMask=smoothstep(0.15,0.72,n*0.5+0.5); vec3 crust=vec3(0.18,0.03,0.03); vec3 hot=vec3(1.0,0.82,0.18); vec3 c=mix(crust, hot, hotMask); c=mix(c, crust, smoothstep(0.48,0.9,d)); c+=vec3(1.0,0.35,0.05)*smoothstep(0.5,0.75,d)*(1.0-smoothstep(0.82,1.0,d)); gl_FragColor=vec4(c,1.0); }"}));Pn.rotation.x=-Math.PI/2,Pn.position.set(0,t.lavaStartY,(e.lava.z0+e.lava.z1)/2),Pn.userData.bloom=!0,a.add(Pn);let nr=0,Ki=new ye(new Xn(.28,.36,5),new tt({color:16765503}));if(Ki.visible=!1,a.add(Ki),e.crater){let g=new ye(new An(e.crater.r*1.35,20),new tt({color:16757082,transparent:!0,opacity:.12,depthWrite:!1,blending:Or}));g.rotation.x=-Math.PI/2,g.scale.setScalar(.72),g.position.set(e.crater.x,e.crater.y+.2,e.crater.z),a.add(g)}let Zc=new Bt(.28,8,6),A=new tt({color:16769184,transparent:!0,opacity:.55,depthWrite:!1}),X=[],J=(e.lava.z0+e.lava.z1)/2;for(let g=0;g<22;g++){let T=new ye(Zc,A),L=g/22*Math.PI*2,z=3+g%5*2.2;T.position.set(Math.cos(L)*z,t.lavaStartY+.4,J+Math.sin(L)*z),T.userData.decor=!0,T.userData.base=T.position.clone(),T.userData.speed=.6+g%4*.25,T.userData.phase=g*.7,a.add(T),X.push(T)}let Q=new tt({color:16756832,transparent:!0,opacity:.18,depthWrite:!1,blending:Or,side:Lt}),W=[];for(let g=0;g<8;g++){let T=new ye(new xi(3.2,1.4),Q);T.position.set(-10+g*3,t.lavaStartY+1.1,J+(g%2-.5)*8),a.add(T),W.push(T)}let pe=(e.zones||[]).find(g=>g.id==="sky");if(pe){let g=new tt({color:16774395,transparent:!0,opacity:.9,depthWrite:!1});for(let T=0;T<7;T++){let L=new ye(new Bt(7+T%3*2,10,8),g);L.scale.y=.28,L.position.set(-16+T%4*10,1.1,pe.z0+12+T*((pe.z1-pe.z0)/8)),a.add(L)}}let Se={meadow:[4057226,16736162,16765503],canyon:[16738890,16765503,16748497],sky:[16743121,13213951,8048895],ice:[4114687,15268863,4880639],climb:[16761402,16742954,16736162],ship:[16765503,16748497,6284208]},Pe=[];for(let g of e.floors||[]){if(g.rx<2.2||g.zone==="ship")continue;let T=g.rx>8?[.42,.78]:[.78],L=Math.max(3,Math.round((g.rx+g.rz)/5));for(let z of T)for(let ne=0;ne<L;ne++){let fe=ne/L*Math.PI*2+g.z*.07+z;Pe.push({x:g.x+Math.cos(fe)*g.rx*z,y:g.y,z:g.z+Math.sin(fe)*g.rz*z,zone:g.zone,kind:(ne+Math.floor(g.z+z*10))%6,spin:ne})}}function ke(g,T,L){let z=T.filter(Oe=>L.includes(Oe.kind));if(!z.length)return null;let ne=new St({vertexColors:!1,gradientMap:Tt});ne.onBeforeCompile=Oe=>vs(Oe,{});let fe=new un(g,ne,z.length);fe.instanceColor=new Hi(new Float32Array(z.length*3),3);let Ne=new ut,je=new ze;return z.forEach((Oe,it)=>{let Rt=Se[Oe.zone]||Se.meadow;je.setHex(Rt[it%Rt.length]),fe.setColorAt(it,je),Ne.position.set(Oe.x,Oe.y+(Oe.kind===4?2.1:Oe.kind===2?.9:.55),Oe.z),Ne.rotation.set(Oe.kind===1?Math.PI/2:0,Oe.spin,0);let N=Oe.kind===5?1.3:1;Ne.scale.setScalar(N),Ne.updateMatrix(),fe.setMatrixAt(it,Ne.matrix)}),fe.instanceMatrix.needsUpdate=!0,fe.instanceColor&&(fe.instanceColor.needsUpdate=!0),a.add(fe),fe.userData.spots=z,fe}let Qe=ke(new $t(.28,.34,1.5,8),Pe,[0]),rt=ke(new Xn(.38,.9,5),Pe,[1]),He=ke(new Bt(.42,8,6),Pe,[2]),ft=ke(new Ho(.38,0),Pe,[3]);ft&&(ft.userData.bloom=!0);let At=ke(new Bt(.36,8,6),Pe,[4]),kt=ke(new Nn(1.1,.7,.55),Pe,[5]);if(Pe.length){let g=new un(new An(.55,8),new tt({color:1709104,transparent:!0,opacity:.28,depthWrite:!1}),Pe.length),T=new ut;Pe.forEach((L,z)=>{T.position.set(L.x,L.y+.04,L.z),T.rotation.x=-Math.PI/2,T.scale.setScalar(L.kind===5?1.4:.8),T.updateMatrix(),g.setMatrixAt(z,T.matrix)}),g.instanceMatrix.needsUpdate=!0,a.add(g)}let an=[];function Mt(g,T,L,z,ne){let fe=new Qt({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uColor:{value:new ze(g)}},vertexShader:"uniform float uTime; varying vec2 vUv; void main(){ vUv=uv; vec3 p=position; p.z += sin(position.x*0.55+uTime*1.4)*0.12; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }",fragmentShader:"uniform float uTime; uniform vec3 uColor; varying vec2 vUv; void main(){ vec2 uv=vUv+vec2(uTime*0.05,-uTime*0.03); float n=sin(uv.x*36.0+uTime)+sin(uv.y*30.0-uTime*0.8); float edge=smoothstep(0.02,0.16,min(min(vUv.x,1.0-vUv.x),min(vUv.y,1.0-vUv.y))); float foam=smoothstep(0.45,0.9,n*0.5+0.5)*(1.0-edge); vec3 c=mix(uColor, vec3(0.92,1.0,1.0), foam*0.7); gl_FragColor=vec4(c,0.78); }"}),Ne=new ye(new An(ne,24),fe);Ne.rotation.x=-Math.PI/2,Ne.position.set(T,L,z),a.add(Ne),an.push(fe)}let Ge=(e.zones||[]).find(g=>g.id==="ice");Ge&&Mt(3066111,0,2.55,(Ge.z0+Ge.z1)*.5,16),Mt(4050517,10,.08,e.zones?e.zones[0].z0+36:40,5);let ai=e.geysers.map(g=>{let T=at(D.geyser);return T.position.set(g.x,g.y,g.z),T.userData.jet=T.getObjectByName("GeyserJet"),T.userData.ring=T.getObjectByName("GeyserRing"),a.add(T),T}),wt=e.pendulums.map(g=>{let T;if(g.zone==="canyon"&&k.log&&k.rockLarge){T=new Wt;let z=_s(k.log,Tt,.48,!0);z.rotation.z=Math.PI/2;let ne=_s(k.rockLarge,Tt,.72,!0);ne.position.set(1.15,0,0),ne.traverse(fe=>{fe.isMesh&&fe.material&&fe.material.color&&fe.material.color.set(2760740)}),T.add(z,ne)}else T=at(D.pendulum);let L=new ye(new $t(.07,.07,1,6),new St({color:1975360,gradientMap:Tt}));return a.add(T,L),{bob:T,rope:L}}),Ln=e.sweepers.map(g=>{if((g.zone==="meadow"||g.zone==="canyon")&&k.saw){let ne=_s(k.saw,Tt,.3,!0);return ne.position.set(g.x,g.y+.85,g.z),a.add(ne),ne}let T=at(D.sweeper),L=g.scale||(g.full?1.15:1);T.scale.set(L,L,L);let z=T.getObjectByName("SweeperBar");return z&&z.material&&z.material.color&&z.material.color.set(g.full?16742938:16739179),a.add(T),T}),wi=e.spinners.map(g=>_e(g.x,g.y,g.z,(g.len||1.6)*.7)),pn=e.sweepers.map(g=>_e(g.x,g.y,g.z,1.5)),Ji=e.pendulums.map(g=>_e(g.x,g.y-g.len,g.z,1.2)),zt=e.rollers.map(g=>_e(g.x,g.y,g.z,1.3));function mn(g,T){let L=[];g.traverse(z=>{z.isMesh&&L.push(z)});for(let z of L){let ne=new ye(z.geometry,new tt({color:1975360,side:nn}));ne.userData.hull=!0,ne.castShadow=!1,ne.scale.setScalar(1+(T||.04)),z.add(ne)}}let Qi=new St({color:16765503,gradientMap:Tt}),Sn=new St({color:16739179,gradientMap:Tt}),Fn=e.rollers.map(g=>{let T=at(D.roller);T.scale.setScalar(g.radius),g.snow&&T.traverse(Ne=>{!Ne.isMesh||!Ne.material||!Ne.material.color||Ne.name==="RollerEye"||Ne.name==="RollerMouth"||Ne.material.color.set(16251903)});let L=new ye(new ds(1.2,.07,6,18),new tt({color:g.snow?14152959:16765503,transparent:!0,opacity:.85}));L.rotation.x=Math.PI/2,L.position.y=-.82,T.add(L),T.userData.ring=L;let z=new ye(new Xn(.34,.42,7),Qi);z.position.y=1.05;let ne=new ye(new Nn(.08,.1,.06),new St({color:16774885,gradientMap:Tt}));ne.position.set(-.08,-.08,.95);let fe=ne.clone();return fe.position.x=.08,T.add(z,ne,fe),mn(T),a.add(T),T}),Zn=e.hoppers.map(()=>{let g=at(D.hopper);g.userData.body=g.getObjectByName("HopperBody"),g.userData.eyes=g.getObjectByName("HopperEye");let T=new ye(new Nn(.46,.16,.08),Sn);T.position.set(0,.15,.62);let L=new ye(new Bt(.09,8,6),Sn);L.position.set(.28,.02,.48);let z=L.clone();z.position.x=-.28;let ne=new ye(new Bt(.28,10,8),new St({color:16771266,gradientMap:Tt}));return ne.scale.set(1,.7,.45),ne.position.set(0,-.12,.42),g.add(T,L,z,ne),mn(g),a.add(g),g}),$i=e.flyers.map(()=>{let g=at(D.flyer);g.userData.wing=g.getObjectByName("FlyerWings"),g.userData.eyes=g.getObjectByName("FlyerEye");let T=new ye(new ds(.16,.04,6,10),Qi);T.position.set(.16,.12,.34);let L=T.clone();return L.position.x=-.16,g.add(T,L),mn(g),a.add(g),g});function Tm(g){let L=[],z=[],ne=[],fe=[];for(let Oe=0;Oe<6;Oe++){let it=Oe/6*Math.PI*2+g,Rt=.75+(Oe*3+g*5)%3*.28;fe.push([Math.cos(it)*Rt,Math.sin(it)*Rt])}L.push(0,.18,0),z.push(.28,.16,.12),fe.forEach(([Oe,it])=>{L.push(Oe,.18,it),z.push(1,.45,.08)}),L.push(0,-.18,0),z.push(.35,.18,.1),fe.forEach(([Oe,it])=>{L.push(Oe*.92,-.22,it*.92),z.push(.85,.22,.04)});for(let Oe=0;Oe<6;Oe++){let it=1+Oe,Rt=1+(Oe+1)%6;ne.push(0,Rt,it);let N=8+Oe,O=8+(Oe+1)%6;ne.push(7,N,O),ne.push(it,Rt,O,it,O,N)}let Ne=6*2+2;L.push(.2,-.85,.15),z.push(1,.4,.05),L.push(.05,-.2,.05),z.push(1,.55,.08),L.push(.35,-.2,.22),z.push(1,.35,.04),ne.push(Ne,Ne+1,Ne+2);let je=new Ot;return je.setAttribute("position",new gt(L,3)),je.setAttribute("color",new gt(z,3)),je.setIndex(ne),je.computeVertexNormals(),je}let xf=[],Am=new St({vertexColors:!0,emissive:16742938,emissiveIntensity:.35,gradientMap:Tt,side:Lt});for(let g=0;g<12;g++){let T=new ye(Tm(g*.7),Am);T.scale.setScalar(2.6+g%3*.9),T.visible=!1,a.add(T);let L=g%2===0?-1:1;xf.push({mesh:T,ox:L*(7.5+g%5*2.6),oy:7+g%4*3.4,oz:-1-g%5*2.4,spin:.7+g%5*.22,fall:.18+g%3*.08})}let Cs=new Wt;for(let g=0;g<10;g++){let T=new ye(new Nn(.05,.05,1.6),new tt({color:16774885,transparent:!0,opacity:.75}));T.position.set(g%5-2,.4+g%3*.35,-.4-g%4*.35),Cs.add(T)}Cs.visible=!1,a.add(Cs);let Kc=[];for(let g=0;g<7;g++){let T=new ye(new Bt(2.2+g%3,8,6),new Go({color:16774885}));T.position.set(-18+g*9,16+g%2*3,e.zones[2].z0+20+g*18),T.scale.y=.45,T.userData.ox=T.position.x,T.userData.oz=T.position.z,a.add(T),Kc.push(T)}let Rm=e.checkpoints.map(g=>{let T=new ye(new Ys(.7,.95,18),new tt({color:16765503,side:Lt,transparent:!0,opacity:.85,depthWrite:!1}));return T.rotation.x=-Math.PI/2,T.position.set(g.x,g.y+.08,g.z),a.add(T),T});function Ei(g){return new St({color:g,gradientMap:Tt})}function Cm(g){let T={},L=new Wt,z=new ye(new $t(.035,.035,.28,5),Ei(16739179));z.position.y=1.62;let ne=new ye(new Nn(.72,.045,.1),Ei(16765503));ne.position.y=1.76,L.add(z,ne),L.userData.blade=ne,T.heli=L;let fe=new Wt;for(let _t of[-.18,.18]){let Xt=new ye(new ds(.13,.04,6,10),Ei(6044462));Xt.position.set(_t,1.18,.36),fe.add(Xt)}T.goggles=fe;let Ne=new Wt;for(let _t of[-.18,.18]){let Xt=new ye(new Ho(.12,0),Ei(1975360));Xt.position.set(_t,1.18,.4),Xt.scale.z=.35,Ne.add(Xt)}T.stars=Ne;let je=new Wt,Oe=new ye(new Bt(.16,8,6),Ei(16748497));Oe.position.y=1.7,Oe.scale.y=.45;let it=new ye(new Bt(.07,6,6),Ei(16765503));it.position.y=1.72,je.add(Oe,it),T.flower=je;let Rt=new ye(new ds(.28,.07,6,12),Ei(6080767));Rt.position.y=.78,Rt.rotation.x=Math.PI/2,T.scarf=Rt;let N=new Wt,O=new ye(new Bt(.16,8,8),new St({color:10479871,transparent:!0,opacity:.75,gradientMap:Tt}));O.position.y=1.72;let te=new ye(new Bt(.07,6,6),Ei(16747130));te.position.y=1.72,N.add(O,te),T.fish=N;let Te=new ye(new Xn(.16,.22,5),Ei(16765503));Te.position.y=1.72,T.crown=Te;for(let _t of Object.values(T))_t.visible=!1,g.add(_t);return T}let bf=D.buddy,wn=[],ta=new Wt;ta.userData.buddy=!0,a.add(ta);let Im=new An(.48,14),Pm=new tt({color:1975360,transparent:!0,opacity:.3,depthWrite:!1}),Lm=dM();for(let g of e.spawns.length?Array.from({length:t.racers}):[]);for(let g=0;g<t.racers;g++){let T=zp(bf.scene),L=["#7DFFC4","#FFE56A","#FF9FE0","#A78BFF","#7AD8FF","#9AEE6A","#E4C6FF","#FFD09A","#6C8CFF","#4EE0C8","#FF7AB8","#D6F06A","#B4C8FF","#FFC44A","#FFA090","#9AE4FF"][g%16];T.traverse($e=>{if(!$e.isMesh||!$e.material)return;let jt=Array.isArray($e.material)?$e.material[0]:$e.material;$e.material=lM(jt,L),$e.frustumCulled=!1,$e.castShadow=!0,$e.receiveShadow=!0}),mn(T,.025);let z=null;T.traverse($e=>{$e.isBone&&$e.name==="head"&&(z=$e)});let ne=[],fe=[];if(z){let $e=new St({color:L,gradientMap:Tt});for(let jt of[-1,1]){let gn=new ye(new $t(.018,.018,.26,5),$e);gn.position.set(jt*.1,.18,.05);let Ai=new ye(new Bt(.04,6,5),new St({color:16765503,gradientMap:Tt}));Ai.position.y=.15,gn.add(Ai),z.add(gn),ne.push(gn);let ci=new ye(new Bt(.05,6,5),new tt({color:1840176}));ci.scale.set(1.1,.08,.45),ci.position.set(jt*.045,.05,.11),z.add(ci),fe.push(ci)}}let Ne=new yc(T),je={},Oe=["Idle","Run","Jump","Fall","Land","Dive","Grab","Tumble","Celebrate","Eliminated","Emote"],it=new Set(["Idle","Run","Fall","Grab","Tumble","Celebrate"]);for(let $e of bf.animations){if(!Oe.includes($e.name))continue;let jt=Ne.clipAction($e);it.has($e.name)?jt.setLoop(mh,1/0):(jt.setLoop(ph,1),jt.clampWhenFinished=!0),jt.play(),jt.setEffectiveWeight($e.name==="Idle"?1:0),je[$e.name]=jt}let Rt=Oe.some($e=>je[$e]),N=Cm(T),O=["classic","heli","goggles","stars","flower","scarf","fish","crown"],te=O[g%O.length];N[te]&&(N[te].visible=!0);let Te=new Wt;Te.add(T);let _t=new ye(Im,Pm);_t.userData.blobShadow=!0,_t.rotation.x=-Math.PI/2,Te.add(_t);let Xt=null;if(g===0){let $e=new ye(new Ys(.5,.68,18),new tt({color:16765503,side:Lt,depthWrite:!1}));$e.rotation.x=-Math.PI/2,$e.position.y=.05,Te.add($e),Xt=new ic(new Fo({map:Lm,depthTest:!1,transparent:!0,opacity:1})),Xt.scale.set(.34,.14,1),Xt.position.set(.22,2.22,0),Xt.center.set(.5,0),Te.add(Xt)}ta.add(Te),Te.traverse($e=>{!$e.isMesh||$e.userData.hull||($e.castShadow=_>0,$e.receiveShadow=!0)}),wn.push({group:Te,model:T,mixer:Ne,actions:je,hasClips:Rt,shadow:_t,tag:Xt,current:"Idle",docked:!1,accessories:N,pick:te,dusted:!1,starred:!1,mixAcc:0,wasAir:!1,landUntil:0,antennas:ne,lids:fe,splashed:!1})}let na=[],yf=[16765503,16739179,6284208,16748497,6080767];for(let g=0;g<70;g++){let T=new ye(new xi(.16,.22),new tt({color:yf[g%yf.length],side:Lt}));T.visible=!1,a.add(T),na.push({mesh:T,v:new B,alive:!1})}let dt={yaw:0,pitch:t.defaultPitch,autoWait:0,portrait:!0,shake:0};function Jc(){let g=i.clientWidth||window.innerWidth,T=i.clientHeight||window.innerHeight;dt.portrait=T>=g,s.setPixelRatio(r),s.setSize(g,T,!1);let L=Math.max(2,Math.floor((g||2)*r)),z=Math.max(2,Math.floor((T||2)*r));x.setSize(L,z),b.setSize(Math.max(2,L>>1),Math.max(2,z>>1)),c.aspect=g/Math.max(1,T),c.fov=dt.portrait?t.fovPortrait:t.fovLandscape,c.updateProjectionMatrix()}Jc();let ir=Array(8).fill(0);function vf(g,T){let L=vt[g];if(T&&(ir[g]=1),!!L)for(let z of L){if(!z.mat.color)return;T?(z.mat.color.set(T),z.mat.emissive&&(z.mat.emissive.set(T),z.mat.emissiveIntensity=.35)):(z.mat.color.copy(z.color),z.mat.emissive&&(z.mat.emissive.copy(z.emissive),z.mat.emissiveIntensity=z.intensity))}}function On(g,T,L,z,ne){for(let fe of na)if(!fe.alive){fe.alive=!0,fe.mesh.visible=!0,fe.mesh.position.set(g,T,L),z&&fe.mesh.material.color.setHex(z),fe.v.set((Math.random()-.5)*(ne?1.2:4),(ne?.6:2)+Math.random()*(ne?1.2:3),(Math.random()-.5)*(ne?1.2:4));break}}let Qc=!1;function co(g,T,L,z,ne){g&&(g.visible=T>.04,g.material.opacity=T*.85,g.scale.setScalar(1+T*.35),L!=null&&g.position.set(L,z+.14,ne))}function Dm(g){let T=g.course.bumpers||[];for(let L=0;L<ee.length;L++)co(ee[L],T[L]&&T[L].glow||0);for(let L=0;L<wi.length;L++)co(wi[L],g.spinners[L]&&g.spinners[L].glow||0);for(let L=0;L<pn.length;L++){let z=g.sweepers[L];co(pn[L],z&&z.glow||0,z&&z.x,z&&z.y,z&&z.z)}for(let L=0;L<Ji.length;L++){let z=g.pendulums[L];co(Ji[L],z&&z.glow||0,z&&z.bobX,z&&z.bobY-.4,z&&z.bobZ)}for(let L=0;L<zt.length;L++){let z=g.rollers[L];co(zt[L],z&&z.glow||0,z&&z.x,z&&z.y,z&&z.z)}}let lo=null;function $c(g){_=g;let T=g>0;if(C.castShadow=T,s.shadowMap.enabled=T,T){let L=g>=2?1024:512;C.shadow.mapSize.x!==L&&(C.shadow.mapSize.set(L,L),C.shadow.map&&(C.shadow.map.dispose(),C.shadow.map=null)),C.shadow.radius=g>=2?2.5:1}lo||(lo=[],a.traverse(L=>{L.userData&&L.userData.blobShadow&&lo.push(L)}));for(let L=0;L<lo.length;L++)lo[L].visible=!T}$c(_);function zm(g,T,L){if(g.crates&&sr.length!==g.crates.length){for(let N of sr)a.remove(N);sr.length=0;for(let N of g.crates){let O=new ye(Um,Nm);O.position.set(N.x,N.y,N.z),a.add(O),sr.push(O)}}for(let N=0;N<sr.length;N++){let O=g.crates[N];sr[N].position.set(O.x,O.y,O.z)}for(let N of e.chunks){let O=N.mesh;if(!O)continue;if(N.state==="gone"){O.visible=!1,N.dirty=!1;continue}O.visible=!0,O.material=N.state==="cracking"?oe:It;let te=N.state==="cracking"?Math.sin(g.time*18+N.jitter*9)*.045:0;if(O.position.y=(N.fallY||0)+te,N.state==="falling"&&N.dirty&&!N.spawned){N.spawned=!0;let Te=De.find(_t=>!_t.active);if(Te){Te.active=!0,Te.life=1.4,Te.vy=.6,Te.mesh.visible=!0;let _t=(N.z0+N.z1)*.5;Te.mesh.position.set((Math.random()-.5)*6,N.positions&&N.positions[1]||4,_t),Te.mesh.rotation.set(0,Math.random(),0),On(Te.mesh.position.x,Te.mesh.position.y,_t,14140580),On(Te.mesh.position.x+.4,Te.mesh.position.y+.2,_t,14140580)}}N.dirty=!1}for(let N of De)N.active&&(N.vy-=12*T,N.mesh.position.y+=N.vy*T,N.mesh.rotation.x+=T,N.life-=T,N.life<=0&&(N.active=!1,N.mesh.visible=!1));for(let N=0;N<g.spinners.length;N++){let O=Ee[N].bar;O&&(O.rotation.y=g.spinners[N].angle)}for(let N=0;N<g.platforms.length;N++){let O=g.platforms[N],te=nt[N];if(te.position.set(O.x,O.y,O.z),O.axis==="spin")te.rotation.y+=T*O.speed;else if(O.axis==="seesaw"){let Te=O.face||0;te.rotation.set(Math.abs(Te)>1&&O.tilt||0,0,Math.abs(Te)>1?0:-(O.tilt||0))}}if(ie){for(let N=0;N<g.course.coins.length;N++){let O=g.course.coins[N];if(O.got?xe.scale.set(0,0,0):(xe.scale.set(1,1,1),xe.position.set(O.x,O.y+Math.sin(g.time*3+N)*.15,O.z)),xe.rotation.set(Math.PI/2,0,g.time*2.2),xe.updateMatrix(),ie.setMatrixAt(N,xe.matrix),Ie&&Ie.setMatrixAt(N,xe.matrix),!O.got&&(N+Math.floor((g.time||0)*6))%11===0){let te=O.x-g.player.pos.x,Te=O.z-g.player.pos.z;te*te+Te*Te<220&&On(O.x,O.y,O.z,16773544,!0)}}ie.instanceMatrix.needsUpdate=!0,Ie&&(Ie.instanceMatrix.needsUpdate=!0)}for(let N=0;N<g.geysers.length;N++){let O=g.geysers[N],te=ai[N],Te=O.hot?3.1:O.warn?.85:.12,_t=te.userData.jet;_t.scale.set(O.hot?1.3:1,Te,O.hot?1.3:1),_t.position.y=Te*.5,_t.material.color.set(O.hot?16742938:16765503),te.userData.ring.material.color.set(O.warn||O.hot?16765503:16742938),te.userData.ring.scale.setScalar(O.warn?1.25:1)}for(let N=0;N<g.pendulums.length;N++){let O=g.pendulums[N],te=wt[N];te.bob.position.set(O.bobX,O.bobY,O.bobZ),te.rope.position.set((O.x+O.bobX)/2,(O.y+O.bobY)/2,O.z),te.rope.scale.y=O.len,te.rope.lookAt(O.bobX,O.bobY,O.bobZ)}for(let N=0;N<g.sweepers.length;N++){let O=g.sweepers[N],te=O.zone==="meadow"||O.zone==="canyon";Ln[N].position.set(O.x,O.y+(te?.75:0),O.z),te&&(Ln[N].rotation.z=g.time*2.4)}for(let N=0;N<g.rollers.length;N++){let O=g.rollers[N];Fn[N].position.set(O.x,O.y,O.z),Fn[N].rotation.z=O.rot;let te=Fn[N].userData.ring;te&&te.scale.setScalar(1+Math.sin(g.time*7+N)*.14);let Te=!1;for(let $e of g.racers){if($e.flail<.2)continue;let jt=$e.pos.x-O.x,gn=$e.pos.z-O.z;jt*jt+gn*gn<5&&(Te=!0)}let _t=Te?.78:1,Xt=1+Math.sin(g.time*2.2+N)*.04;Fn[N].scale.set(O.radius*(Te?1.15:Xt),O.radius*_t,O.radius)}for(let N=0;N<g.hoppers.length;N++){let O=g.hoppers[N];Zn[N].position.set(O.x,O.y+.55,O.z);let te=Zn[N].userData.body;te&&(te.scale.y=O.hopping?1.18:.62+Math.sin(g.time*3+N)*.04,te.scale.x=O.hopping?.86:1.12);let Te=Zn[N].userData.eyes;Te&&(Te.scale.y=Math.sin(g.time*2.4+N*2)>.96?.12:1)}for(let N=0;N<g.flyers.length;N++){let O=g.flyers[N];$i[N].position.set(O.x,O.y,O.z),$i[N].rotation.y=-O.ang;let te=$i[N].userData.wing;te&&(te.rotation.z=Math.sin(g.time*14+N)*.55),$i[N].scale.y=1+Math.sin(g.time*14+N)*.08;let Te=$i[N].userData.eyes;Te&&(Te.scale.y=Math.sin(g.time*3+N)>.97?.15:1)}Pn.position.y=g.lavaY;let z=g.shipRound||!g.gate?e.ship:g.gate;z&&(Zi.position.set(z.x||0,(z.y||0)+16,z.z||0),Zi.scale.y=1+Math.sin((g.time||0)*3)*.04),$s.visible=g.phase==="race"||g.phase==="countdown",Pn.material.uniforms&&Pn.material.uniforms.uTime&&(Pn.material.uniforms.uTime.value=g.time||0);for(let N of an)N.uniforms.uTime.value=g.time||0;Math.random()<.45&&On(Pn.position.x+(Math.random()-.5)*8,Pn.position.y+.4,Pn.position.z+(Math.random()-.5)*8,16747050,!0),g.kind==="survival"&&Math.random()<.5&&On(g.player.pos.x+(Math.random()-.5)*6,g.player.pos.y+1.2,g.player.pos.z+2,15202047,!0),g.kind==="crown"&&g.crown&&g.phase==="race"?(Ki.visible=!0,Ki.position.set(g.crown.x,(g.crown.y||0)+2.2+Math.sin((g.time||0)*3)*.12,g.crown.z),Ki.rotation.y=g.time||0):Ki.visible=!1;for(let N=0;N<X.length;N++){let O=X[N],te=(g.time*O.userData.speed+O.userData.phase)%2.4;O.position.y=O.userData.base.y+te,O.position.x=O.userData.base.x+Math.sin(g.time*1.4+O.userData.phase)*.25,O.scale.setScalar(.45+te*.35)}for(let N=0;N<W.length;N++)W[N].position.y=t.lavaStartY+1.05+Math.sin(g.time*2+N)*.2,W[N].rotation.z=Math.sin(g.time+N)*.15,W[N].lookAt(c.position);if(nr=(nr+1)%2,ft&&nr===0){let N=ft.userData.spots||[],O=new ut;for(let te=0;te<N.length;te++){let Te=N[te];O.position.set(Te.x,Te.y+1.15,Te.z),O.rotation.set(.5,g.time*1.6+Te.spin,.2),O.updateMatrix(),ft.setMatrixAt(te,O.matrix)}ft.instanceMatrix.needsUpdate=!0}if(At&&nr===0){let N=At.userData.spots||[],O=new ut;for(let te=0;te<N.length;te++){let Te=N[te];O.position.set(Te.x,Te.y+2.1+Math.sin(g.time*1.6+Te.spin)*.18,Te.z),O.scale.setScalar(1),O.updateMatrix(),At.setMatrixAt(te,O.matrix)}At.instanceMatrix.needsUpdate=!0}Ve.position.y=g.shipY;let ne=g.phase!=="countdown";if(As.material.opacity=ne?.16+Math.sin(g.time*4)*.05:.04,dn.visible=g.phase==="launch"||g.phase==="results",dn.visible){let N=.85+Math.sin(g.launchT*30)*.12;dn.scale.set(N,N,N)}kn.material.opacity=g.phase==="race"?.55+Math.sin(g.time*5)*.25:.2;for(let N=0;N<g.racers.length;N++){let O=g.racers[N],te=wn[N],Te=N===0?0:Math.hypot(O.pos.x-g.player.pos.x,O.pos.z-g.player.pos.z);te.mixAcc+=T;let _t=Te<16?0:Te<36?.1:.2;if(te.mixAcc>=_t&&(te.mixer.update(te.mixAcc),te.mixAcc=0),O.seated){!te.docked&&Zt[O.seatIndex]&&(Zt[O.seatIndex].add(te.group),te.group.position.set(0,.05,0),te.group.rotation.set(0,Math.PI,0),te.group.scale.setScalar(t.seatBuddyScale),te.shadow.visible=!1,te.docked=!0,vf(O.seatIndex,O.color)),el(te,"Celebrate",1);continue}let Xt=g.interp||0;te.group.position.set(O.pos.x+O.vel.x*Xt,O.pos.y,O.pos.z+O.vel.z*Xt),te.face==null&&(te.face=O.yaw);let $e=O.yaw-te.face;for(;$e>Math.PI;)$e-=Math.PI*2;for(;$e<-Math.PI;)$e+=Math.PI*2;te.face+=$e*Math.min(1,T*10),te.group.rotation.y=te.face;let jt=Math.min(1,O.squash||0),gn=1+jt*.1,Ai=1-jt*.18;if(!O.grounded&&O.vel.y>.5?(Ai=1.14,gn=.9):!O.grounded&&O.vel.y<-2&&(Ai=.92,gn=1.06),te.group.scale.set(gn,Ai,gn),te.antennas)for(let Gt=0;Gt<te.antennas.length;Gt++)te.antennas[Gt].rotation.z=Math.sin((g.time||0)*3.2+N+Gt)*.35;if(te.lids){let Gt=Math.sin((g.time||0)*1.3+N*2.1)>.92;for(let Ps of te.lids)Ps.scale.y=Gt?1:.05}if(O.squash>.32&&!te.dusted){te.dusted=!0;for(let Gt=0;Gt<3;Gt++)On(O.pos.x+(Gt-1)*.2,O.pos.y+.1,O.pos.z,14140580)}O.squash<.05&&(te.dusted=!1);let ci=Math.hypot(O.vel.x,O.vel.z);if(O.grounded&&ci>.8&&N===0&&(te.stepT=(te.stepT||0)-T,te.stepT<=0&&(te.stepT=.28,On(O.pos.x,O.pos.y+.08,O.pos.z,14140580))),O.flail>.4&&!te.starred){te.starred=!0;for(let Gt=0;Gt<5;Gt++)On(O.pos.x,O.pos.y+1.55,O.pos.z,16774856)}if(O.flail<.05&&(te.starred=!1),O.sliding>0&&N===0&&On(O.pos.x,O.pos.y+.15,O.pos.z),te.tag){let Ps=g.phase==="countdown"?1:Math.max(0,te.tag.material.opacity-T*1.6);te.tag.material.opacity=Ps,te.tag.visible=Ps>.04}N===0&&(Cs.visible=!!(O.diving||O.sliding>0),Cs.visible&&(Cs.position.set(O.pos.x,O.pos.y+.9,O.pos.z),Cs.rotation.y=O.yaw));let uo=te.accessories&&te.accessories.heli&&te.accessories.heli.userData.blade;if(uo&&te.accessories.heli.visible&&(uo.rotation.y+=T*14),te.wasAir&&O.grounded){te.landUntil=(g.time||0)+.2;for(let Gt=0;Gt<4;Gt++)On(O.pos.x+(Gt-1.5)*.2,O.pos.y+.1,O.pos.z,15193008,!0);if(O.pos.y<.35)for(let Gt=0;Gt<4;Gt++)On(O.pos.x,O.pos.y+.2,O.pos.z,8052735,!0)}O.diving&&N===0&&Math.random()<.35&&On(O.pos.x,O.pos.y+.2,O.pos.z,15786696,!0),te.wasAir=!O.grounded;let Dn="Idle";O.eliminated?Dn="Eliminated":O.seated||O.qualified||O.emote==="cheer"?Dn="Celebrate":O.flail>.2?Dn="Tumble":O.grabT>0?Dn="Grab":O.diving||O.sliding>0?Dn="Dive":O.grounded&&(g.time||0)<te.landUntil?Dn="Land":!O.grounded&&O.vel.y>.35?Dn="Jump":O.grounded?g.phase==="countdown"&&N!==0?Dn="Emote":ci>.8&&(Dn="Run"):Dn="Fall",el(te,Dn,ci/6.5),te.shadow&&(te.shadow.visible=O.grounded&&!C.castShadow,te.shadow.position.y=.04)}if((g.popConfetti||g.phase==="results"&&g.result==="escaped")&&!Qc){Qc=!0,g.popConfetti=0;let N=wn[0].group,O=new B;N.getWorldPosition(O);for(let te=0;te<48;te++)On(Ve.position.x+(Math.random()-.5)*3,Ve.position.y+2+Math.random()*3,Ve.position.z-2)}for(let N of na)N.alive&&(N.v.y-=6*T,N.mesh.position.addScaledVector(N.v,T),N.mesh.rotation.z+=T*4,N.mesh.position.y<e.ship.y-1&&(N.alive=!1,N.mesh.visible=!1));let fe=g.phase==="launch"||g.phase==="results";for(let N of xf)N.mesh.visible=fe,fe&&(N.mesh.position.set(e.ship.x+N.ox,e.ship.y+N.oy-g.launchT*N.fall*1.6,e.ship.z+N.oz),N.mesh.rotation.x=-.7,N.mesh.rotation.y=g.launchT*N.spin);As.visible=g.phase!=="launch"&&g.phase!=="results"&&g.seatCine<=0,H.update(g,T),Xp(g.time||0);for(let N=0;N<Kc.length;N++){let O=Kc[N];O.position.x=O.userData.ox+Math.sin(g.time*.15+N)*6,O.position.z=O.userData.oz+g.time*(1.2+N*.15)}for(let N=0;N<Ae.length;N++){let O=Ae[N],te=O.position.z-g.player.pos.z;O.rotation.z=te>0&&te<9?Math.sin(g.time*26)*.045:0}for(let N=0;N<ae.length;N++){let O=e.pads[N],te=O&&O.pulse?O.pulse:0,Te=ae[N].userData.base||1;ae[N].scale.set(Te*(1+te*.28),Te*(1-te*.42),Te*(1+te*.28)),O&&O.pulse>0&&(O.pulse=Math.max(0,O.pulse-T*1.5))}for(let N=0;N<ir.length;N++){if(ir[N]<=0)continue;ir[N]=Math.max(0,ir[N]-T*1.4);let O=vt[N];if(O)for(let te of O)te.mat.emissive&&(te.mat.emissiveIntensity=.35+ir[N]*1.4)}let Ne=Fp(g.zoneId||"meadow");U.material.uniforms.top.value.setHex(Ne.top),U.material.uniforms.mid.value.setHex(Ne.mid),Ne.bot&&U.material.uniforms.bot.value.setHex(Ne.bot),a.fog.color.setHex(Ne.fog),a.fog.near=Ne.near,a.fog.far=Ne.far;let je=g.player.pos.x,Oe=g.player.pos.y,it=g.player.pos.z;if(C.position.set(je-12,Oe+22,it+8),C.target.position.set(je,Oe+.6,it+2),C.target.updateMatrixWorld(),C.castShadow){let N=_>=2?14:10;C.shadow.camera.left=C.shadow.camera.bottom=-N,C.shadow.camera.right=C.shadow.camera.top=N,C.shadow.camera.updateProjectionMatrix()}Dm(g);for(let N=0;N<g.racers.length;N++){let O=Math.hypot(g.racers[N].pos.x-g.player.pos.x,g.racers[N].pos.z-g.player.pos.z)<14;wn[N].group.traverse(te=>{te.isMesh&&(te.castShadow=O)})}Fm(g,T,L),Om(g),U.position.copy(c.position),F.position.copy(c.position),K.rotation.y=(g.time||0)*.08;let Rt=g.zoneId==="canyon"||g.zoneId==="climb";j.material.opacity=Rt?.35+Math.sin((g.time||0)*5)*.2:.08;for(let N=0;N<ve.length;N++)ve[N].position.x+=Math.sin((g.time||0)*.2+N)*.03;for(let N=0;N<Ke.length;N++)Ke[N].rotation.y=Math.sin((g.time||0)*2.2+N)*.45;for(let N=0;N<Fe.length;N++)Fe[N].position.x+=Math.sin((g.time||0)*.3+N)*.02;for(let N of Rm)N.rotation.z=g.time*.4}function el(g,T,L){if(!g.hasClips)return;let z=g.actions[T]?T:g.actions.Idle?"Idle":"",ne=z&&g.actions[z];if(!ne||(z==="Run"&&ne.setEffectiveTimeScale(Math.max(.65,Math.min(1.65,(L||1)*1.15))),g.current===z))return;let fe=g.current&&g.actions[g.current];fe&&fe!==ne&&fe.fadeOut(.16),ne.reset().setEffectiveWeight(1).fadeIn(.16).play(),g.current=z}function Is(g,T){let L=yi(e,g,T);return L?L.y:null}let sr=[],Um=new Nn(.9,.9,.9),Nm=new St({color:14722140,gradientMap:Tt}),Kn=new vc,Ti=new B,Bn=new B,tl=null;function ia(){if(tl)return tl;a.updateMatrixWorld(!0);let g=[],T=new B;return a.traverse(L=>{if(!L.isMesh||!L.geometry||!L.matrixWorld)return;let z=L;for(;z;){if(z.userData&&(z.userData.decor||z.userData.buddy||z.userData.skipCam))return;z=z.parent}L.geometry.boundingSphere||L.geometry.computeBoundingSphere(),L.getWorldScale(T),!(L.geometry.boundingSphere.radius*Math.abs(T.x)<1.15)&&g.push(L)}),tl=g,g}function km(g,T){try{Bn.copy(T).sub(g);let L=Bn.length();if(L<.25)return T;Bn.multiplyScalar(1/L),Kn.set(g,Bn),Kn.far=L;let z=Kn.intersectObjects(ia(),!1),ne=L;for(let fe of z){if(fe.distance>ne-.05)continue;let Ne=!1,je=fe.object;for(;je;){if(je.userData&&(je.userData.decor||je.userData.buddy||je.userData.skipCam)){Ne=!0;break}je=je.parent}if(Ne)continue;let Oe=fe.object.material;Oe&&!Array.isArray(Oe)&&Oe.transparent&&Oe.opacity<.4||(ne=fe.distance)}return ne<L-1.5&&(dt.camBlocked=!0),ne>L-.2?T:(Ti.copy(g).addScaledVector(Bn,Math.max(.9,ne-.45)),Ti.clone())}catch(L){return typeof window<"u"&&(window.__sbCamErr=String(L&&L.stack||L)),T}}function Fm(g,T,L){let z=g.player;if(L&&L.overview){let mt=L.overview;c.position.set(mt.x,mt.y,mt.z),c.lookAt(mt.lx,mt.ly,mt.lz);return}dt.spectate=null,dt.camBlocked=!1;let ne=!!(L&&(L.looking||Math.abs(L.lookDx)+Math.abs(L.lookDy)>0)),fe=dt.portrait?t.fovPortrait:t.fovLandscape,Ne=g.player&&(g.player.diving||g.player.boost>0)?7:0,je=fe+Ne;if(Math.abs(c.fov-je)>.15&&(c.fov+=(je-c.fov)*Math.min(1,T*7),c.updateProjectionMatrix()),g.phase==="countdown"){let mt=t.countdownBeats+t.goHold,Ht=Math.max(0,Math.min(1,(g.countClock||0)/mt)),xn=Ht*Ht*(3-2*Ht),li=g.finishZ?Math.min(40,Math.max(10,(g.finishZ-z.pos.z)*.35)):28;c.position.set(z.pos.x+12-xn*8,z.pos.y+16-xn*8,z.pos.z-18+xn*10),c.lookAt(z.pos.x,z.pos.y+1.2,z.pos.z+8+li*xn);return}if(L&&L.intro>0){let mt=1-Math.max(0,Math.min(1,L.intro/3.3)),Ht=mt*mt*(3-2*mt),xn=dt.portrait?t.camDistPortrait:t.camDist,li=xn*Math.cos(t.defaultPitch),Vt=xn*Math.sin(t.defaultPitch),es=(1-Ht)*(z.pos.x+8)+Ht*(z.pos.x+Math.sin(dt.yaw)*li),Ls=(1-Ht)*(z.pos.y+22)+Ht*(z.pos.y+Vt+.4),sa=(1-Ht)*(z.pos.z-26)+Ht*(z.pos.z-li);c.position.set(es,Ls,sa),c.lookAt(z.pos.x,z.pos.y+1,z.pos.z+18*(1-Ht));return}if(g.seatCine>0&&g.player.seated){let mt=new B;wn[0].group.getWorldPosition(mt),c.position.x=Yn(c.position.x,Ve.position.x+6.5,4.2,T),c.position.y=Yn(c.position.y,Ve.position.y+4.2,4.2,T),c.position.z=Yn(c.position.z,Ve.position.z-22,4.2,T),c.lookAt(mt.x,mt.y+.45,mt.z);return}if(g.phase==="results"||g.phase==="launch"){let mt,Ht,xn,li,Vt,es;if(g.result==="escaped")mt=Ve.position.x+12,Ht=Math.max(Ve.position.y+7,(Is(Ve.position.x,Ve.position.z)||Ve.position.y)+4),xn=Ve.position.z+14,li=Ve.position.x,Vt=Ve.position.y+2.2,es=Ve.position.z;else{mt=z.pos.x-6,Ht=z.pos.y+4.2,xn=z.pos.z-8;let Ls=Math.max(0,Ve.position.z-z.pos.z);li=Ve.position.x,Vt=Ve.position.y+3+Math.min(8,Ls*.02),es=Ve.position.z-6}c.position.x=Yn(c.position.x,mt,3.2,T),c.position.y=Yn(c.position.y,Ht,3.2,T),c.position.z=Yn(c.position.z,xn,3.2,T),c.lookAt(li,Vt,es);return}if(z.seated&&g.phase==="race"){let mt=null;for(let Jn of g.racers)Jn.seated||Jn.eliminated||(!mt||Jn.pos.z>mt.pos.z)&&(mt=Jn);let Ht=mt||z,xn=Is(Ht.pos.x,Ht.pos.z),li=[];for(let Jn=0;Jn<g.racers.length;Jn++){let fo=g.racers[Jn];li.push({x:fo.pos.x,y:fo.pos.y,z:fo.pos.z,eliminated:fo.eliminated})}let Vt=Np({x:Ht.pos.x,y:Ht.pos.y,z:Ht.pos.z},g.time||0,xn??Ht.pos.y,li),es=Vt.x,Ls=Vt.y,sa=Vt.z;try{Bn.set(es-Vt.look.x,Ls-Vt.look.y,sa-Vt.look.z);let Jn=Bn.length()||1;Bn.multiplyScalar(1/Jn),Kn.set(new B(Vt.look.x,Vt.look.y,Vt.look.z),Bn),Kn.far=Jn,Kn.intersectObjects(ia(),!1).length&&(Ls+=8)}catch{}c.position.x=Yn(c.position.x,es,4.5,T),c.position.y=Yn(c.position.y,Ls,4.5,T),c.position.z=Yn(c.position.z,sa,4.5,T),c.lookAt(Vt.look.x,Vt.look.y,Vt.look.z);let qm=xn??Ht.pos.y;dt.spectate={back:Math.hypot(Vt.x-Ht.pos.x,Vt.z-Ht.pos.z),height:Vt.y-qm,lookZ:Vt.look.z,focusZ:Ht.pos.z},a.fog&&(a.fog.near=Vt.fogNear,a.fog.far=Vt.fogFar);return}if(ne){let mt=L.mouse?t.mouseSens:t.lookSens;dt.yaw+=L.lookDx*mt,dt.pitch=Math.max(t.minPitch,Math.min(t.maxPitch,dt.pitch+L.lookDy*mt)),dt.autoWait=t.autoFollowDelay}else dt.autoWait>0?dt.autoWait-=T:(Math.hypot(z.vel.x,z.vel.z)>1.15&&(dt.yaw=fM(dt.yaw,Math.atan2(z.vel.x,z.vel.z),t.autoYaw,T)),dt.pitch=Yn(dt.pitch,t.defaultPitch,t.autoPitch,T));let Oe=L&&L.zoom?L.zoom:1,it=Math.max(t.camNear||5,Math.min(t.camFar||12,(dt.portrait?t.camDistPortrait:t.camDist)*Oe)),Rt=(dt.portrait?t.camHeight||3.7:t.camHeightLand||3.9)*(it/(dt.portrait?t.camDistPortrait:t.camDist)),N=it,O=Rt;if(ne||Math.abs(dt.pitch-t.defaultPitch)>.08){let mt=Math.hypot(it,Rt);N=Math.max(t.camNear||5,mt*Math.cos(dt.pitch)),O=Math.max(2.8,mt*Math.sin(dt.pitch))}let te=z.pos.x+Math.sin(dt.yaw)*N,Te=z.pos.y+O,_t=z.pos.z-Math.cos(dt.yaw)*N,Xt=Is(te,_t);Xt!=null&&Te<Xt+1.2&&(Te=Xt+1.6);let $e=z.pos.x,jt=z.pos.y+1.2,gn=z.pos.z,Ai=te-$e,ci=Te-jt,uo=_t-gn,Dn=Math.hypot(Ai,ci,uo)||1;if(Dn<(t.camNear||5)){let mt=(t.camNear||5)/Dn;te=$e+Ai*mt,Te=jt+ci*mt,_t=gn+uo*mt}let Gt=g.phase==="countdown"?1:0;Te+=Gt*2.2,_t-=Gt*2.4;let Ps=Is(z.pos.x,z.pos.z),ho=Ps??z.pos.y;z.vel.y<-1.5&&z.pos.y<ho-.6?(te=z.pos.x+Math.sin(dt.yaw)*7,_t=z.pos.z-Math.cos(dt.yaw)*7,Te=Math.max(dt.fallCamY||ho+4,hr(-1e9,ho)),dt.fallCamY=Te):(dt.fallCamY=null,Te=hr(Te,ho));let nl=km(new B($e,jt,gn),new B(te,Te,_t));te=nl.x,Te=hr(nl.y,ho),_t=nl.z;let il=(g.shake||0)*.18;il>.01&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(te+=(Math.random()-.5)*il,Te+=(Math.random()-.5)*il*.5);let sl=5.5;c.position.x=Yn(c.position.x,te,sl,T),c.position.y=Yn(c.position.y,Te,sl,T),c.position.z=Yn(c.position.z,_t,sl,T);let _f=Is(z.pos.x,z.pos.z);c.position.y=hr(c.position.y,_f??z.pos.y),c.lookAt(z.pos.x,z.pos.y+1.7,z.pos.z+Math.cos(dt.yaw)*5),Bm(Math.hypot(c.position.x-z.pos.x,c.position.y-(z.pos.y+1.1),c.position.z-z.pos.z))}function Om(g){try{let L=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,1,0],[0,-1,0]],z=ia();for(let ne=0;ne<3;ne++){let fe=null;for(let Ne=0;Ne<L.length;Ne++){Bn.set(L[Ne][0],L[Ne][1],L[Ne][2]),Kn.set(c.position,Bn),Kn.far=.9;let je=Kn.intersectObjects(z,!1);je.length&&(!fe||je[0].distance<fe.distance)&&(fe=je[0])}if(!fe||fe.distance>=.75||!fe.face)break;Ti.copy(fe.face.normal).transformDirection(fe.object.matrixWorld),c.position.copy(fe.point).addScaledVector(Ti,1.05)}}catch{}let T=Is(c.position.x,c.position.z);T!=null&&(c.position.y=hr(c.position.y,T))}function Bm(g){let T=wn[0];if(!T)return;let L=g>=3.4?1:Math.max(.15,(g-2.2)/1.2);T.model.traverse(z=>{if(!z.isMesh||!z.material||z.material.name!=="BuddyHue")return;let ne=Array.isArray(z.material)?z.material:[z.material];for(let fe of ne)fe.opacity=L,fe.transparent=L<.98,fe.depthWrite=L>.45})}function Hm(){Qc=!1;for(let g of e.chunks)g.spawned=!1,g.dirty=!0,g.fallY=0,g.mesh&&(g.mesh.visible=!g.gap,g.mesh.position.y=0,g.mesh.material=It);for(let g of De)g.active=!1,g.mesh.visible=!1;for(let g of na)g.alive=!1,g.mesh.visible=!1;for(let g=0;g<wn.length;g++){let T=wn[g];T.docked&&(ta.add(T.group),T.group.scale.setScalar(1),T.group.rotation.set(0,0,0),T.shadow.visible=!C.castShadow,T.docked=!1)}for(let g=0;g<vt.length;g++)vf(g,null);Ve.position.y=e.ship.y,dn.visible=!1,dt.yaw=0,dt.pitch=t.defaultPitch}let rr=new ye(new $t(1.35,1.5,.24,24),new St({color:16765503,gradientMap:Tt}));rr.position.y=.02,rr.visible=!1,a.add(rr);function Gm(g){F.visible=!1,rr.visible=!0,rr.position.set(80,12,-40);for(let L=1;L<wn.length;L++)wn[L].group.visible=!1;let T=wn[0];if(T){if(T.group.visible=!0,T.tag&&(T.tag.visible=!1),T.group.position.set(80,12.15,-40),T.group.rotation.x=0,T.group.rotation.z=0,T.group.scale.set(1,1,1),T.group.rotation.y+=g*.7,T.mixer.update(g),el(T,"Idle",1),T.antennas)for(let L=0;L<T.antennas.length;L++)T.antennas[L].rotation.z=Math.sin(performance.now()*.003+L)*.3;if(T.lids){let L=Math.sin(performance.now()*.002)>.97?1:.08;for(let z of T.lids)z.scale.y=L}c.fov=t.fovPortrait,c.updateProjectionMatrix(),c.position.set(81.6,13.05,-36.2),c.lookAt(80,12.15,-40)}}function Vm(){F.visible=!0,rr.visible=!1;for(let g of wn)g.group.visible=!0}function Wm(){if(!p){s.setRenderTarget(null),s.render(a,c);return}s.setRenderTarget(x),s.render(a,c);let g=c.layers.mask;c.layers.set(1);let T=s.shadowMap.enabled;s.shadowMap.enabled=!1,s.setRenderTarget(b),s.setClearColor(0,1),s.clear(!0,!0,!0),s.render(a,c),s.shadowMap.enabled=T,c.layers.mask=g,s.setRenderTarget(null),s.render(m,d)}a.traverse(g=>{g.isMesh&&g.userData.bloom&&g.layers.enable(1)});for(let g of an)g.uniforms.uTime.value=0;c.position.set(0,8,-10),c.lookAt(0,1,4),s.render(a,c);function Xm(g,T){let L=wn[0];if(L){L.model.traverse(z=>{if(!z.isMesh||!z.material)return;let ne=Array.isArray(z.material)?z.material:[z.material];for(let fe of ne)fe&&(fe.userData&&fe.userData.shader&&fe.userData.shader.uniforms.uTint&&fe.userData.shader.uniforms.uTint.value.set(g),fe.name==="Buddy_Mint"&&fe.color&&fe.color.set(g))});for(let z of Object.keys(L.accessories||{}))L.accessories[z].visible=z===T}}return{resize:Jc,update:zm,reset:Hm,render:Wm,showBuddy:Gm,hideBuddy:Vm,view(){let g=wn[0]&&wn[0].group.position,T=Is(c.position.x,c.position.z),L=99,z="";try{let je=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,-1,0]];for(let Oe=0;Oe<je.length;Oe++){Bn.set(je[Oe][0],je[Oe][1],je[Oe][2]),Kn.set(c.position,Bn),Kn.far=1.25;let it=Kn.intersectObjects(ia(),!1);if(it.length&&it[0].distance<L){L=it[0].distance;let Rt=it[0].object;z=Rt&&(Rt.name||Rt.parent&&Rt.parent.name)||"mesh"}}}catch{}let ne=g?g.x:0,fe=g?g.y:0,Ne=g?g.z:0;return{dist:g?Math.hypot(c.position.x-ne,c.position.y-fe,c.position.z-Ne):0,back:g?Math.hypot(c.position.x-ne,c.position.z-Ne):0,fov:c.fov,cx:c.position.x,cy:c.position.y,cz:c.position.z,floor:T??null,minSolid:L,solidName:z,fogNear:a.fog?a.fog.near:0,spectate:dt.spectate,blocked:!!dt.camBlocked}},applyLook:Xm,setTheme(g){let T=[{sky:13103359,ground:8244322,sun:16774084},{sky:16761505,ground:12868146,sun:16769200},{sky:12048127,ground:6987992,sun:16054271}],L=T[(Math.max(1,g)-1)%T.length];E.color.set(L.sky),E.groundColor.set(L.ground),C.color.set(L.sun)},setPost(g){p=!!g&&!f},setDpr(g){r=g,Jc()},setLow(){$c(0),setPost(!1),setDpr(.75)},noteFps(g){return g>0&&(g<55?S++:S=Math.max(0,S-1),S>90&&_>0&&(S=0,$c(_-1)),window.__sbLight={tier:_,shadows:C.castShadow,map:C.shadow.mapSize.x,fps:g}),window.__sbLight},sees(g,T,L){try{return Ti.set(g,T,L),Ti.project(c),Ti.z<1&&Math.abs(Ti.x)<1.05&&Math.abs(Ti.y)<1.05}catch{return!0}},get yaw(){return dt.yaw},get canvas(){return i}}}function dM(){let i=document.createElement("canvas");i.width=128,i.height=64;let e=i.getContext("2d");e.fillStyle="#FFF6E5",pM(e,4,8,120,48,16),e.fill(),e.fillStyle="#1E2440",e.font="700 32px Fredoka, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("YOU",64,34);let t=new Jr(i);return t.colorSpace=qt,t}function pM(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}var em={ui_tap:"assets/audio/ui_tap.mp3",ui_confirm:"assets/audio/ui_confirm.mp3",jump:"assets/audio/sfx_jump.mp3",land:"assets/audio/sfx_land.mp3",bump:"assets/audio/sfx_bump_boing.mp3",tick:"assets/audio/sfx_countdown_tick.mp3",go:"assets/audio/sfx_countdown_go.mp3",crack:"assets/audio/sfx_ground_crack.mp3",seat:"assets/audio/sfx_seat_filled.mp3",last:"assets/audio/sfx_last_seat_alert.mp3",launch:"assets/audio/sfx_ship_launch.mp3",escaped:"assets/audio/jingle_escaped.mp3",missed:"assets/audio/jingle_missed.mp3",bed:"assets/audio/amb_planet_bed_loop.mp3",rumble:"assets/audio/amb_collapse_rumble_loop.mp3"};function tm(){let i=window.AudioContext||window.webkitAudioContext,e=i?new i({latencyHint:"interactive"}):null,t={},n={},s,r,o,a,c,l=!1,u=0,h=!1;e&&(s=e.createGain(),s.gain.value=1,s.connect(e.destination),r=e.createGain(),r.gain.value=0,r.connect(s),o=e.createGain(),o.gain.value=0,o.connect(s));async function f(R){if(!e)return;let E=Object.keys(em),C=0;await Promise.all(E.map(async I=>{let S=await(await fetch(em[I])).arrayBuffer();t[I]=await e.decodeAudioData(S.slice(0)),C++,R&&R(C/E.length)})),l&&b(u)}function p(){if(!e)return;e.state==="suspended"&&e.resume();let R=e.createBuffer(1,1,22050),E=e.createBufferSource();E.buffer=R,E.connect(e.destination),E.start(0),l&&b(u)}function x(){let I=e.createBuffer(1,88200,44100),_=I.getChannelData(0),S=[0,.5,1,1.5],U=[55,55,73,65];for(let F=0;F<88200;F++){let G=F/44100,q=Math.floor(G*2),j=0;for(let ue of S){let $=G-ue;$>=0&&$<.12&&(j+=Math.sin($*180)*Math.exp(-$*28)*.7)}let K=U[q%U.length];if(j+=Math.sin(G*K*Math.PI*2)*.18*(.6+.4*Math.sin(G*8)),q%2===0){let ue=G*8%1;j+=(Math.random()*2-1)*Math.exp(-ue*40)*.08}_[F]=Math.max(-1,Math.min(1,j))}return I}function b(R){return e?(l=!0,u=R,e.state==="suspended"&&e.resume(),a||(a=e.createBufferSource(),a.buffer=x(),a.loop=!0,a.connect(r),a.start(0),r.gain.setTargetAtTime(R*1.35,e.currentTime,.4),t.rumble&&!c&&(c=e.createBufferSource(),c.buffer=t.rumble,c.loop=!0,c.connect(o),c.start(0))),!0):!1}function m(R){!o||!e||o.gain.setTargetAtTime(Math.max(0,Math.min(.5,R)),e.currentTime,.2)}function d(R){if(!e||!s)return;(R==="win"?[523,659,784,1046]:[440,349,262]).forEach((C,I)=>{let _=e.createOscillator(),S=e.createGain();_.type=R==="win"?"triangle":"sawtooth",_.frequency.value=C;let U=e.currentTime+I*.09;S.gain.setValueAtTime(1e-4,U),S.gain.exponentialRampToValueAtTime(R==="win"?.07:.05,U+.03),S.gain.exponentialRampToValueAtTime(1e-4,U+.32),_.connect(S),S.connect(s),_.start(U),_.stop(U+.34)})}function v(R){h=!!R,s&&s.gain.setTargetAtTime(h?0:1,e.currentTime,.05)}function M(R){if(!a)return;let E={meadow:1,canyon:.9,sky:1.08,ice:.84,climb:1.02,ship:1.12}[R]||1;a.playbackRate.value=E}function y(R,E=.5,C=.07){if(r&&e&&!h&&(r.gain.cancelScheduledValues(e.currentTime),r.gain.setTargetAtTime(u*.28,e.currentTime,.02),r.gain.setTargetAtTime(u*1.35,e.currentTime+.35,.18)),!e||!t[R]||h)return;let I=e.currentTime;if(n[R]&&I-n[R]<C)return;n[R]=I;let _=e.createBufferSource(),S=e.createGain();S.gain.value=E,_.buffer=t[R],_.connect(S),S.connect(s),_.start(0)}return{load:f,unlock:p,startBeds:b,setRumble:m,setMuted:v,setZone:M,play:y,flourish:d,get ctx(){return e},get muted(){return h},get playing(){return!!a}}}function nm(i){let e=document.getElementById("stick"),t=document.getElementById("knob"),n=new Set,s=new Map,r=0,o=0,a=!1,c=!1,l=!1,u=!1,h=0,f=0,p=!1,x=54,b="space-buddies-zoom",m=1;try{m=Math.min(12/8.6,Math.max(5/8.6,Number(localStorage.getItem(b))||1))}catch{}let d=0;function v(I){let _=I.target;if(_.closest&&_.closest("#jump"))return"jump";if(_.closest&&_.closest("#dive"))return"dive";if(_.closest&&_.closest("#grab"))return"grab";if(_.closest&&_.closest("#pause, #mute")||_.closest&&_.closest("button, a"))return"ui";let S=window.innerWidth||1;return I.pointerType==="mouse"?"look":I.clientX<S*.46?"move":"look"}function M(I){if(I.target.closest&&I.target.closest("#title, #result"))return;let _=v(I);if(_!=="ui"){I.preventDefault();try{i.setPointerCapture?.(I.pointerId)}catch{}s.set(I.pointerId,{kind:_,x:I.clientX,y:I.clientY,ox:I.clientX,oy:I.clientY}),_==="jump"&&(a=!0,u=!0),_==="dive"&&(c=!0),_==="grab"&&(l=!0),_==="move"&&(e.style.left=I.clientX+"px",e.style.top=I.clientY+"px",e.style.bottom="auto",e.classList.add("float"),E(I.clientX,I.clientY,I.clientX,I.clientY))}}function y(I){let _=s.get(I.pointerId);if(!_)return;I.preventDefault(),_.kind==="look"&&(r+=I.clientX-_.x,o+=I.clientY-_.y,p=!0),_.kind==="move"&&E(_.ox,_.oy,I.clientX,I.clientY),_.x=I.clientX,_.y=I.clientY;let S=[...s.values()];if(S.length>=2){let U=Math.hypot(S[0].x-S[1].x,S[0].y-S[1].y);if(d>8){m=Math.min(12/8.6,Math.max(5/8.6,m*(U/d)));try{localStorage.setItem(b,String(m))}catch{}}d=U,r=0,o=0}else d=0}function R(I){let _=s.get(I.pointerId);s.delete(I.pointerId),_&&_.kind==="move"&&([...s.values()].some(U=>U.kind==="move")||(h=0,f=0,t.style.setProperty("--kx","0px"),t.style.setProperty("--ky","0px"),e.classList.remove("float"))),_&&_.kind==="look"&&![...s.values()].some(S=>S.kind==="look")&&(p=!1),_&&_.kind==="jump"&&![...s.values()].some(S=>S.kind==="jump")&&(u=!1)}function E(I,_,S,U){let F=S-I,G=U-_,q=Math.hypot(F,G)||1,j=Math.min(q,x);F=F/q*j,G=G/q*j,h=F/x,f=-G/x,t.style.setProperty("--kx",F+"px"),t.style.setProperty("--ky",G+"px")}i.addEventListener("pointerdown",M),i.addEventListener("pointermove",y),i.addEventListener("pointerup",R),i.addEventListener("pointercancel",R),window.addEventListener("keydown",I=>{({KeyW:1,KeyA:1,KeyS:1,KeyD:1,ArrowUp:1,ArrowDown:1,ArrowLeft:1,ArrowRight:1,Space:1,ShiftLeft:1,ShiftRight:1,KeyE:1,Escape:1})[I.code]&&I.preventDefault(),!I.repeat&&(n.add(I.code),I.code==="Space"&&(a=!0,u=!0),(I.code==="ShiftLeft"||I.code==="ShiftRight")&&(c=!0),I.code==="KeyE"&&(l=!0))}),window.addEventListener("keyup",I=>{n.delete(I.code),I.code==="Space"&&(u=!1)}),window.addEventListener("blur",()=>n.clear());function C(){let I=0,_=0;(n.has("KeyA")||n.has("ArrowLeft"))&&(I-=1),(n.has("KeyD")||n.has("ArrowRight"))&&(I+=1),(n.has("KeyW")||n.has("ArrowUp"))&&(_+=1),(n.has("KeyS")||n.has("ArrowDown"))&&(_-=1);let S=h+I,U=f+_,F=Math.hypot(S,U);F>1&&(S/=F,U/=F);let G=(s.size&&[...s.values()].some(j=>j.kind==="look"&&s.values()),1),q={stickX:S,stickY:U,lookDx:r*(n.size?1:G),lookDy:o,looking:p,mouse:[...s.values()].some(j=>j.kind==="look"),jump:a,holdJump:u||n.has("Space"),dive:c,grab:l,pause:n.has("Escape"),zoom:m};return r=0,o=0,a=!1,c=!1,l=!1,q}return{read:C}}function im(i,e,t){let n=-Math.sin(i),s=Math.cos(i),r=-Math.cos(i),o=-Math.sin(i);return{x:r*e+n*t,z:o*e+s*t}}function sm(i,e,t){return!t||i==="results"||i==="launch"||i==="countdown"?!0:!!(e&&i==="race")}function rm(i,e){if(i&&i.seated&&i.seatIndex>=0)return"SEAT "+(i.seatIndex+1);let t=0,n=e||[];for(let o=0;o<n.length;o++){let a=n[o];a!==i&&!a.seated&&a.pos.z>i.pos.z+.4&&t++}let s=t+1;return s+(s===1?"ST":s===2?"ND":s===3?"RD":"TH")}function mM(i,e){let t=Math.hypot(i,e);return t>1&&(i/=t,e/=t),{x:i,z:e}}function gM(i,e){let n=(i.course&&i.course.routes||[i.course.waypoints])[0]||[],s=n.length?n[n.length-1]:{x:e.pos.x,y:e.pos.y,z:e.pos.z+6};for(let r=0;r<n.length;r++)if(n[r].z>e.pos.z+2){s=n[r];break}return s}function xM(i,e){let t=[["bump",i.course.bumpers],["bar",i.course.spinners],["bar",i.course.sweepers],["bump",i.course.pendulums],["bump",i.course.rollers],["bump",i.course.hoppers],["bump",i.course.blockers]];for(let n=0;n<t.length;n++){let s=t[n][0],r=t[n][1];if(r)for(let o=0;o<r.length;o++){let a=r[o];if(!a||a.ship)continue;let c=a.z-e.pos.z,l=(a.x||0)-e.pos.x;if(c>.3&&c<3.4&&Math.abs(l)<1.8)return{kind:s,z:a.z}}}return null}function om(i,e){let t={x:0,z:0,jump:!1,dive:!1,grab:!1,holdJump:!1},n=i.player;if(!n||n.seated||n.eliminated||e==="still")return t;if(e==="spam"){let m=i.time||0;return{x:0,z:0,jump:Math.floor(m*7)%2===0,dive:Math.floor(m*5)%2===0,grab:!1,holdJump:!1}}if(e==="reverse")return{x:0,z:-1,jump:!1,dive:!1,grab:!1,holdJump:!1};if(e==="edge")return{x:n.pos.x>=0?1:-1,z:.15,jump:(i.time||0)%1.3<.12,dive:!1,grab:!1,holdJump:!1};if(e==="wall")return{x:.92,z:.4,jump:!1,dive:!1,grab:!1,holdJump:!1};let s=i.course&&i.course.ship,r=gM(i,n),o=r.x,a=r.z;i.shipRound&&s&&n.pos.z>s.z-24?(o=s.x,a=s.z-4.2):i.gate&&n.pos.z>i.gate.z-16?(o=i.gate.x,a=i.gate.z+1.2):i.kind==="crown"&&i.crown&&(o=i.crown.x,a=i.crown.z);let c=o-n.pos.x,l=a-n.pos.z;n.botMarkZ==null&&(n.botMarkZ=n.pos.z,n.botMarkT=i.time||0),n.pos.z>n.botMarkZ+1.2&&(n.botMarkZ=n.pos.z,n.botMarkT=i.time||0);let u=(i.time||0)-(n.botMarkT||0)>1.6;u&&(c+=Math.sin((i.time||0)*6)*4);let h=mM(c,l),f=xM(i,n),p=(r.y||0)-n.pos.y,b=!(i.shipRound&&s&&Math.abs(n.pos.x-s.x)<5&&n.pos.z>s.z-10&&n.pos.z<s.z+1)&&(!!r.gap||p>.55||!!(f&&f.kind!=="bar")||u);return{x:h.x,z:h.z,jump:b,dive:!!(f&&f.kind==="bar"),grab:!1,holdJump:!1}}var jn=new URLSearchParams(location.search),en=Mf({quick:jn.has("quick"),auto:jn.has("auto"),seed:Number(jn.get("seed"))||Date.now()%1e5,feel:jn.has("feel"),low:jn.has("low")}),bM=document.getElementById("app"),yM=document.getElementById("view"),$o=document.getElementById("title"),Js=document.getElementById("play"),Fc=document.getElementById("lobby"),vM=document.getElementById("start"),am=document.getElementById("colors"),cm=document.getElementById("gear"),Oc=document.getElementById("tutor"),lm=document.getElementById("place"),N1=document.getElementById("coins"),Gc=document.getElementById("hud"),Ts=document.getElementById("controls"),gm=document.getElementById("countdown"),so=document.getElementById("count-num"),_M=document.getElementById("count-label"),MM=document.getElementById("timer"),sf=document.getElementById("timer-num"),jo=document.getElementById("coin-num"),SM=document.getElementById("progress"),Bc=document.getElementById("seats"),um=document.getElementById("seats-label"),Dc=document.getElementById("last-banner"),uf=document.getElementById("zone"),hf=document.getElementById("toast"),Si=document.getElementById("result"),wM=document.getElementById("result-kicker"),Cc=document.getElementById("result-title"),Ic=document.getElementById("result-sub"),EM=document.getElementById("result-time"),zc=document.getElementById("again"),TM=document.getElementById("menu"),xm=document.getElementById("next-round"),bm=document.getElementById("next-planet"),ff=document.getElementById("pause"),Qo=document.getElementById("mute"),Vc=document.getElementById("pause-menu"),rf=document.getElementById("round-name"),AM=document.getElementById("round-kicker"),RM=document.getElementById("round-title"),CM=document.getElementById("round-sub"),df=document.getElementById("planet"),IM=document.getElementById("planet-sub"),of=document.getElementById("fade"),ym="space-buddies-career",Ss={planets:0,coins:0,best:""};try{Ss=Object.assign(Ss,JSON.parse(localStorage.getItem(ym)||"{}"))}catch{}function PM(){try{localStorage.setItem(ym,JSON.stringify(Ss))}catch{}}var ri=Math.max(1,Math.min(3,Number(jn.get("planet"))||1)),ao=Math.max(0,Math.min(2,Number(jn.get("round"))||0)),oo=null,ws=!1,hm=!1,af=0,Cn=i=>i*rl(en.quick),Pc=(i,e,t)=>({x:0,z:Cn(i),rx:t||5,rz:1.5,y:e}),fm=[[{name:"ROUND 1",sub:"12 QUALIFY",qualify:12,startZ:Cn(22),finishZ:Cn(158),gate:Pc(158,.25,5)},{name:"ROUND 2",sub:"8 QUALIFY",qualify:8,startZ:Cn(168),finishZ:Cn(236),gate:Pc(236,5.2,5)},{name:"FINAL",sub:"8 SEATS ON THE SHIP",qualify:8,startZ:Cn(22),ship:!0}],[{name:"SKY HEAT",sub:"12 QUALIFY",qualify:12,startZ:Cn(176),finishZ:Cn(258),gate:Pc(258,3.3,5.5)},{name:"THE CLIMB",sub:"8 QUALIFY",qualify:8,startZ:Cn(300),finishZ:Cn(356),gate:Pc(356,8,4.5)},{name:"FINAL",sub:"8 SEATS ON THE SHIP",qualify:8,startZ:Cn(250),ship:!0}],[{name:"SURVIVAL",sub:"LAST 8 STANDING",qualify:8,startZ:Cn(22),kind:"survival"},{name:"CROWN",sub:"HOLD THE CROWN",qualify:8,startZ:Cn(176),kind:"crown",crown:{x:0,z:Cn(210),y:5.6,r:3.4}},{name:"FINAL",sub:"8 SEATS ON THE SHIP",qualify:8,startZ:Cn(22),ship:!0}]];function pf(){return fm[(ri-1)%fm.length][ao]}var LM=document.getElementById("danger"),qe=tm(),DM=jn.get("debug")==="1";function Ks(i){let e=i&&i.stack||i&&i.message||String(i);if(console.error(i),!DM)return;let t=document.getElementById("debug-error");t&&(t.hidden=!1,t.textContent=String(e).slice(0,700))}window.addEventListener("error",i=>Ks(i.error||i.message));window.addEventListener("unhandledrejection",i=>Ks(i.reason));window.__sbAudio=()=>({state:qe.ctx&&qe.ctx.state,bed:qe.playing});var zM=nm(bM);var Es,le,st,Wc=!1,Qs=!1,Xc=!1,Uc=0,Ko=0,Nc=0,Ms={x:0,z:0},dm=!1,vm=["classic","heli","goggles","stars","flower","scarf","fish","crown"],UM=["Classic","Sunny","Goggles","Stars","Flower","Scarf","Fish","Crown"],bi=or[0],ji="classic",_m="space-buddies-look";try{let i=JSON.parse(localStorage.getItem(_m)||"{}");i.color&&(bi=i.color),i.gear&&vm.includes(i.gear)&&(ji=i.gear)}catch{}function mf(){try{localStorage.setItem(_m,JSON.stringify({color:bi,gear:ji}))}catch{}}var kc=0,Hc=0,cf=0;var Jo=0,Lc=1/60,Zo=0,lf=0,NM=["mint","sun","coral","sky","grape","cream","bubble","lava"];for(let i=0;i<8;i++){let e=document.createElement("img");e.className="seat",e.alt="",e.src="ui/svg/seat_empty.svg",Bc.appendChild(e)}function kM(){return Es=Ef(en),le=al(Es,en,en.seed),en.auto&&(le.player.useAI=!0),$p(yM,Es,en,()=>{})}var FM=kM().then(i=>{st=i,st.resize()}),OM=qe.load();Promise.all([FM,OM]).then(()=>{Wc=!0,Js.textContent="TAP TO PLAY",Js.disabled=!1,Xc&&qc()}).catch(i=>{console.error(i),Js.textContent="COULD NOT LOAD"});function qc(){if(!Qs){if(!Wc){Xc=!0,Js.textContent="LOADING";return}Qs=!0,st.hideBuddy&&st.hideBuddy(),qe.unlock(),qe.startBeds(en.bedGain),qe.play("ui_confirm",.55,0),$o.classList.add("hide"),Fc.hidden=!0,le.player.color=bi,mf(),st.applyLook&&st.applyLook(bi,ji),Ko=en.auto||jn.get("bot")?.2:3.3,Gc.hidden=!1,Ts.hidden=!0,Oc.hidden=!0,window.__sb={race:le,cfg:en,get fps(){return Jo},get feel(){return le.feel},view:()=>st.view?st.view():null,sees:(i,e,t)=>st.sees?st.sees(i,e,t):!0,ground:(i,e)=>yi(Es,i,e),supports:(i,e,t)=>{let n=null,s=null;for(let r of Es.floors){let o=Es.chunks[r.chunk];if(!o||o.state==="falling"||o.state==="gone")continue;let a=(i-r.x)/r.rx,c=(t-r.z)/r.rz;if(a*a+c*c>1)continue;let l=a*a+c*c<.45;r.y<=e+.45&&(!n||r.y>n.y)&&(n={y:r.y,core:l}),l&&r.y>e+.8&&(!s||r.y<s.y)&&(s={y:r.y})}return{under:n&&n.y,through:!n&&s?s.y:null}},campaign:()=>({planet:ri,roundIndex:ao,plan:pf(),paused:ws})},window.__sbAudio=()=>({state:qe.ctx&&qe.ctx.state,bed:qe.playing}),en.low&&st.setLow&&st.setLow(),Yc(),ff.hidden=!1,Qo.hidden=!1}}function Yc(){let i=pf();le.shipRound=!!i.ship,le.kind=i.kind||(i.ship?"ship":"gate"),le.crown=i.crown?{...i.crown}:null,le.finishZ=i.ship||i.kind==="survival"||i.kind==="crown"?null:i.finishZ,le.gate=i.ship||i.kind==="survival"||i.kind==="crown"?null:i.gate||null,le.qualifyN=i.ship?0:i.qualify,le.qualCount=0,le.phase="countdown",le.countClock=0,le.countCue=-1,le.result=null,le.time=0;let e=yi(Es,0,i.startZ),t=e?e.y:0;le.racers.forEach((s,r)=>{let o=!oo||oo.has(s.id);if(s.qualified=!1,s.seated=!1,s.seatIndex=-1,!o){s.eliminated=!0;return}s.eliminated=!1,s.pos.x=(r%5-2)*1.7,s.pos.z=i.startZ+Math.floor(r/5)*1.2,s.pos.y=t,s.vel.x=0,s.vel.y=0,s.vel.z=0,s.lastSafe={x:s.pos.x,y:t,z:s.pos.z},s.wp=0}),le.seatsFilled=0,le.seats&&(le.seats=le.seats.map(()=>null)),st.setTheme&&st.setTheme(ri),qe.setZone&&qe.setZone(i.ship?"ship":i.startZ>250?"ice":i.startZ>150?"sky":i.startZ>80?"canyon":"meadow"),Em(ri),AM.textContent="PLANET "+ri,RM.textContent=i.name,CM.textContent=i.sub,rf.hidden=!1;let n=rf.querySelector(".sb-banner");window.SBUI&&n&&SBUI.slam(n),setTimeout(()=>{rf.hidden=!0},1400)}function gf(){qe.unlock(),qe.startBeds(en.bedGain)}function BM(){if(gf(),!Wc){Xc=!0,Js.textContent="LOADING";return}if(en.auto){qc();return}$o.classList.add("hide"),Fc.hidden=!1,Fc.classList.add("ui-screen"),st.applyLook&&st.applyLook(bi,ji)}$o.addEventListener("pointerdown",gf);$o.addEventListener("touchstart",gf,{passive:!0});Js.addEventListener("pointerdown",i=>{i.preventDefault(),BM()});Js.addEventListener("click",i=>{i.preventDefault(),qe.unlock(),Xc&&Wc&&qc()});document.getElementById("aboard-skip").addEventListener("pointerdown",i=>{i.preventDefault(),le&&le.player.seated&&le.phase==="race"&&(le.forceLaunch=!0)});vM.addEventListener("pointerdown",i=>{i.preventDefault(),qe.unlock(),qc()});or.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="swatch"+(i===bi?" on":""),t.style.background=i,t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),bi=i,mf(),am.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),st&&st.applyLook&&st.applyLook(bi,ji)}),am.appendChild(t)});vm.forEach((i,e)=>{let t=document.createElement("button");t.type="button",t.className="gear"+(i===ji?" on":""),t.textContent=UM[e],t.addEventListener("pointerdown",n=>{n.preventDefault(),n.stopPropagation(),ji=i,mf(),cm.querySelectorAll("button").forEach(s=>s.classList.remove("on")),t.classList.add("on"),st&&st.applyLook&&st.applyLook(bi,ji)}),cm.appendChild(t)});function Mm(){!Qs||!le||le.phase==="results"||(ws=!ws,Vc.hidden=!ws)}ff.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),Mm()});Qo.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation();let e=!qe.muted;qe.setMuted(e);let t=Qo.querySelector("img");t&&(t.src=e?"ui/svg/icon_unmute.svg":"ui/svg/icon_mute.svg"),Qo.setAttribute("aria-label",e?"Unmute":"Mute")});document.getElementById("resume").addEventListener("pointerdown",i=>{i.preventDefault(),ws=!1,Vc.hidden=!0});document.getElementById("restart").addEventListener("pointerdown",i=>{i.preventDefault(),ws=!1,Vc.hidden=!0,oo=null,ao=0,wm(),Yc()});document.getElementById("pause-menu-btn").addEventListener("pointerdown",i=>{i.preventDefault(),Sm()});TM.addEventListener("pointerdown",i=>{i.preventDefault(),Sm()});xm.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),oo=new Set(le.racers.filter(t=>t.qualified).map(t=>t.id)),ao+=1,Si.hidden=!0,ro=!1,la(le,le.seed+11>>>0),en.auto&&(le.player.useAI=!0),Yc(),Ts.hidden=!1});bm.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation(),Si.hidden=!0,IM.textContent="Planet "+(ri+1)+". The sky changes. The ship is waiting.",Em(ri+1),df.hidden=!1});document.getElementById("land").addEventListener("pointerdown",i=>{i.preventDefault(),ri+=1,ao=0,oo=null,df.hidden=!0,ro=!1,la(le,le.seed+21>>>0),en.auto&&(le.player.useAI=!0),Yc(),Ts.hidden=!1});function Sm(){ws=!1,Vc.hidden=!0,df.hidden=!0,Qs=!1,Si.hidden=!0,Si.classList.remove("show"),$o.classList.remove("hide"),Gc.hidden=!0,Ts.hidden=!0,ff.hidden=!0,Qo.hidden=!0,ao=0,oo=null}zc.addEventListener("pointerdown",i=>{i.preventDefault(),qe.unlock(),qe.play("ui_confirm",.5,0),wm()});function wm(){let i=le.seed+1+Math.floor(Math.random()*50)>>>0;la(le,i),Ms.x=0,Ms.z=0,en.auto&&(le.player.useAI=!0),le.player.color=bi,st.applyLook&&st.applyLook(bi,ji),st.reset(),Si.hidden=!0,Si.classList.remove("show"),gm.hidden=!1,Ts.hidden=!1,Dc.hidden=!0,Gc.classList.remove("last")}function pm(i){let e=Math.max(0,Math.ceil(i)),t=Math.floor(e/60),n=e%60;return t+":"+String(n).padStart(2,"0")}function HM(i){let e=i.racers.slice().sort((t,n)=>{let s=r=>(r.seated?4e3:0)+(r.qualified?2e3:0)+(r.eliminated?-1e3:0)+r.pos.z;return s(n)-s(t)});for(let t=0;t<3;t++){let n=document.getElementById("pod-"+(t+1)),s=e[t];!n||!s||(n.textContent=s.isPlayer?"YOU":"BUDDY",n.style.color="#1e2440")}}document.getElementById("app").addEventListener("pointerdown",i=>{let e=i.target.closest("button");!e||e.disabled||qe.play("ui_tap",.3,.01)},!0);window.SBUI&&SBUI.bindPress(document.getElementById("app"));window.SPACE_BUDDIES_UI={stylesheet:"ui.css",font:"Fredoka",tokens:["--ui-font","--ui-bg","--ui-ink","--ui-coral","--ui-sun","--ui-mint","--ui-sky"],buttons:"ui-btn",banners:"ui-banner"};function Em(i){document.querySelectorAll(".planet-dot").forEach(e=>{let t=Number(e.dataset.planet);e.classList.toggle("on",t===i),e.classList.toggle("done",t<i);let n=e.querySelector("img");n&&(n.src="ui/svg/"+(t<i?"map_node_cleared":t===i?"map_node_current":"map_node_locked")+".svg"),n&&n.classList.toggle("is-current",t===i),t===i&&e.scrollIntoView&&e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})})}function mm(i){hf.textContent=i,hf.hidden=!1,Uc=1.5}function GM(i){uf.textContent=i,uf.hidden=!1,kc=1.7}var ro=!1;function VM(i){let e=le.phase==="countdown"?en.raceSeconds:Math.max(0,en.raceSeconds-le.time),t=pm(e);sf&&sf.textContent!==t&&(sf.textContent=t),MM.classList.toggle("is-low",le.phase==="race"&&e<=15);let n=rm(le.player,le.racers);lm.textContent!==n&&(lm.textContent=n);let s=le.coins||0;jo&&jo.dataset.n!==String(s)&&(jo.dataset.n=String(s),window.SBUI?SBUI.countUp(jo,s,700):jo.textContent=String(s));let r=!le.player.seated&&le.phase==="race"&&le.zoneId==="meadow"&&le.time<8&&!en.auto;Oc.hidden=!r,r&&(Oc.textContent=le.time<2.6?"DRAG THE LEFT SIDE TO RUN":le.time<5.2?"DRAG THE RIGHT SIDE TO LOOK":"JUMP AND DIVE");let o=Math.max(0,Math.min(1,le.player.pos.z/Es.ship.z));SM.parentElement.style.setProperty("--p",Math.round(o*100)+"%");let a=Bc.children;for(let m=0;m<8;m++){let d=le.seats[m],v=a[m],M=d==null?"ui/svg/seat_empty.svg":"ui/svg/seat_filled_"+NM[m]+".svg";v.getAttribute("src")!==M&&(v.src=M,d!=null&&v.classList.add("is-new"))}let c="SEATS "+le.seatsFilled+"/8";um.textContent!==c&&(um.textContent=c);let l=le.seatsFilled===7&&le.phase==="race";l&&Dc.hidden&&window.SBUI?SBUI.slam(Dc):Dc.hidden=!l,Gc.classList.toggle("last",l),Bc.parentElement.classList.toggle("is-last",l);let u=le.phase==="countdown"||le.phase==="race"&&le.time<.45;if(gm.hidden=!u,u){let m=le.phase==="race"?0:le.countCue,d=m>0?String(m):"GO";so.textContent!==d&&(so.textContent=d,so.classList.remove("sb-countdown"),so.offsetWidth,so.classList.add("sb-countdown")),_M.textContent=m>0?"GET READY":"GO",so.style.color=m>0?"#FF6B6B":"#FFD23F"}let h=le.player.pos.z-le.collapseZ,f=le.phase==="race"?Math.max(0,Math.min(1,1-h/22)):0;LM.style.opacity=String(f),Uc>0&&(Uc-=i,Uc<=0&&(hf.hidden=!0)),kc>0&&(kc-=i,kc<=0&&(uf.hidden=!0));let p=le.phase==="results",x=document.getElementById("aboard"),b=Qs&&le.player.seated&&le.phase==="race";if(Ts.hidden=sm(le.phase,le.player.seated,Qs),x){x.hidden=!b;let m=Math.max(0,en.seats-le.seatsFilled),d=document.getElementById("aboard-copy");d&&(d.textContent=m>0?"You're on board, waiting for "+m+" more":"You're on board")}if(p&&!ro){ro=!0;let m=le.result;Si.hidden=!1,Si.classList.add("show"),Si.classList.toggle("miss",m==="missed"||m==="out"),Si.classList.toggle("win",m==="qualified"||m==="escaped"),wM.textContent="PLANET "+ri,xm.hidden=m!=="qualified",bm.hidden=m!=="escaped",zc.hidden=m==="qualified"||m==="escaped";let d=document.getElementById("result-banner");m==="qualified"?(Cc.textContent="YOU QUALIFIED!",Ic.textContent=pf().name+" CLEARED",d&&(d.src="ui/svg/banner_qualified.svg"),window.SBUI&&SBUI.confetti(48)):m==="escaped"?(Cc.textContent="YOU ESCAPED!",Ic.textContent="SEAT "+(le.player.seatIndex+1)+" OF 8",d&&(d.src="ui/svg/banner_escaped.svg"),window.SBUI&&SBUI.confetti(60),Ss.planets=Math.max(Ss.planets,ri),Ss.coins+=le.coins||0,Ss.best="PLANET "+ri,PM()):m==="out"?(Cc.textContent="ELIMINATED",Ic.textContent="YOU DIDN'T QUALIFY",zc.textContent="TRY AGAIN",d&&(d.src="ui/svg/banner_eliminated.svg")):(Cc.textContent="MISSED THE SHIP!",Ic.textContent="SO CLOSE",zc.textContent="TRY AGAIN"),Af({planet:ri,result:m,time:Math.round((le.time||0)*10)/10,coins:le.coins||0,at:new Date().toISOString()}),HM(le);let v=le.time||0,M=0,y=Math.max(.08,v/18),R=()=>{ro&&(M=Math.min(v,M+y),EM.textContent="TIME "+pm(M)+" \xB7 "+(le.coins||0)+" COINS \xB7 PLANETS "+Ss.planets,M<v&&requestAnimationFrame(R))};R()}p||(ro=!1)}function WM(){let i=!1;for(let e of le.events)if(e.t==="tick")qe.play("tick",.55,.05);else if(e.t==="go")qe.play("go",.6,.05);else if(e.t==="jump"&&e.id===0)qe.play("jump",.4,.05);else if(e.t==="coin")qe.play("ui_tap",.45,.03);else if(e.t==="glide"&&e.id===0)qe.play("jump",.22,.08);else if(e.t==="grab"&&e.id===0)qe.play("bump",.35,.05);else if(e.t==="qualify"&&e.id===0)qe.play("seat",.45,.05),le.slowMo=.45,le.popConfetti=(le.popConfetti||0)+1;else if(e.t==="roundwin")qe.play("escaped",.55,.1);else if(e.t==="eliminated")qe.play("missed",.6,.1);else if(e.t==="respawn"&&e.fade&&of)of.classList.add("on"),setTimeout(()=>of.classList.remove("on"),200);else if(e.t==="land"&&e.id===0&&e.impact>3)qe.play("land",.35,.08);else if(e.t==="bump")qe.play("bump",e.id===0?.5:.22,.06),e.id===0&&e.big&&(Nc=.08);else if(e.t==="dive"&&e.id===0)qe.play("jump",.28,.04);else if(e.t==="crack")i=!0;else if(e.t==="seat"){qe.play("seat",.5,.02);let t=Bc.children[e.seat];t&&(t.classList.add("pop"),setTimeout(()=>t.classList.remove("pop"),400)),e.id===0&&mm("SEAT "+(e.seat+1)+" LOCKED")}else e.t==="lastseat"?qe.play("last",.7,.2):e.t==="launch"?qe.play("launch",.65,.2):e.t==="escaped"?(qe.play("escaped",.7,.2),qe.flourish&&qe.flourish("win")):e.t==="missed"?(qe.play("missed",.65,.2),qe.flourish&&qe.flourish("miss")):e.t==="checkpoint"&&e.name&&e.name!=="START"?mm("CHECKPOINT"):e.t==="zone"?GM(e.name):e.t==="geyser"?qe.play("bump",e.id===0?.4:.18,.08):e.t==="error"&&Ks(e.message);i&&Hc<=0&&(qe.play("crack",.32,.12),Hc=.34),le.events.length=0}function Zs(i){requestAnimationFrame(Zs);let e=lf?(i-lf)/1e3:Lc,t=Math.min(.1,e),n=window.__sbClock||(window.__sbClock={maxWall:0,big:0,stepsMax:0});if(e>n.maxWall&&(n.maxWall=e),e>.12&&n.big++,lf=i,document.hidden||window.__sbBackground||(cf++,Zs.lastWall||(Zs.lastWall=i),i-Zs.lastWall>=500&&(Jo=cf/((i-Zs.lastWall)/1e3),st.noteFps&&st.noteFps(Jo),cf=0,Zs.lastWall=i),!st))return;if(!Qs){!Fc.hidden&&st.showBuddy&&st.showBuddy(t),st.render();return}if(Ko>0){Ko-=t;try{st.update(le,t,{intro:Ko,lookDx:0,lookDy:0,looking:!1}),st.render()}catch(x){Ks(x)}Oc.hidden=!0,Ts.hidden=!0,Ko<=0&&(Ts.hidden=!1);return}let s=zM.read(),r=im(st.yaw,s.stickX,s.stickY),o=1-Math.exp(-16*t);if(Ms.x+=(r.x-Ms.x)*o,Ms.z+=(r.z-Ms.z)*o,s.pause&&!hm&&Mm(),hm=!!s.pause,ws){try{st.update(le,0,s),st.render()}catch(x){Ks(x)}return}le.slowMo>0&&(le.slowMo=Math.max(0,le.slowMo-t));let a=le.slowMo>0?.35:1,c={x:Ms.x,z:Ms.z,jump:s.jump,dive:s.dive,grab:s.grab,holdJump:s.holdJump};le.phase!=="race"&&(c={x:0,z:0,jump:!1,dive:!1,grab:!1,holdJump:!1});let l=jn.get("bot");l&&le.phase==="race"&&!le.player.seated&&!le.player.eliminated&&(c=om(le,l));let u=Math.max(1,Math.min(8,Number(jn.get("qa"))||1));Nc>0?Nc-=t:Zo+=t*a*u;let h=0;for(;Nc<=0&&Zo>=Lc&&h<Math.min(48,8*u);){try{kf(le,Lc,h===0?c:{x:c.x,z:c.z,jump:!1,dive:!1,grab:!1,holdJump:c.holdJump})}catch(x){Ks(x),Zo=0;break}Zo-=Lc,h++}h>n.stepsMax&&(n.stepsMax=h),Hc=Math.max(0,Hc-t),le.phase==="race"&&le.player.grounded&&Math.hypot(le.player.vel.x,le.player.vel.z)>2.2&&(af-=t,af<=0&&(qe.play("land",.1,.02),af=.32)),WM();let f=le.player.pos.z-le.collapseZ,p=le.phase==="race"?Math.max(0,Math.min(1,1-f/36)):le.phase==="launch"?.4:0;qe.setRumble(p*en.rumbleMax),!dm&&!jn.get("dpr")&&Jo>0&&Jo<24&&le.time>5&&st.setDpr&&(dm=!0,st.setDpr(1),st.setPost&&jn.get("post")!=="1"&&st.setPost(!1)),window.__sbOverview&&(s.overview=window.__sbOverview),le.interp=Zo;try{st.update(le,t,s),st.render(),VM(t)}catch(x){Ks(x)}}"serviceWorker"in navigator&&navigator.serviceWorker.register("sw.js").catch(()=>{});window.addEventListener("resize",()=>st&&st.resize());document.addEventListener("visibilitychange",()=>{document.hidden&&qe.ctx?qe.ctx.suspend():qe.ctx&&qe.ctx.resume()});requestAnimationFrame(Zs);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
