(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const Ae="modulepreload",Fe=function(e){return"/"+e},le={},ae=function(t,n,a){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),m=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=Promise.allSettled(n.map(l=>{if(l=Fe(l),l in le)return;le[l]=!0;const w=l.endsWith(".css"),Le=w?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${Le}`))return;const k=document.createElement("link");if(k.rel=w?"stylesheet":Ae,w||(k.as="script"),k.crossOrigin="",k.href=l,m&&k.setAttribute("nonce",m),document.head.appendChild(k),w)return new Promise((Te,Ce)=>{k.addEventListener("load",Te),k.addEventListener("error",()=>Ce(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=i,window.dispatchEvent(m),!m.defaultPrevented)throw i}return o.then(i=>{for(const m of i||[])m.status==="rejected"&&r(m.reason);return t().catch(r)})};async function ge(){try{const e=await fetch("/api/auth/verify",{credentials:"include"}),t=await e.json();return e.ok}catch(e){return console.error("JWT verification failed",e),!1}}async function Me(e){const t=e.get("email");if(!t){alert("enter email to get the code");return}try{const n=await fetch("/api/send2FACode",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}),a=n.json();n.ok?alert("code has been sent."):alert("fail to send")}catch{alert("got info which is not json?")}}function Ne(e){const t=document.getElementById("qrModal"),n=document.getElementById("qrImage"),a=document.getElementById("closeModalBtn");t&&n&&(n.src=e,t.classList.remove("hidden"),a&&(a.onclick=()=>{t.classList.add("hidden")}))}async function Oe(e){const t=e.get("email");if(!t){alert("Enter email for auth app check");return}try{const n=await fetch("/api/authAppSecretCheck",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})});if(!n.ok){alert("please register first.");return}const a=await n.json();a.qrCodeDataUrl?Ne(a.qrCodeDataUrl):alert("unexpected case?")}catch{alert("catched err")}}function De(){const e=document.getElementById("sendCodeBtn"),t=document.getElementById("loginForm");e&&e.addEventListener("click",async()=>{const n=new FormData(t),a=n.get("method");a==="email"?await Me(n):a==="authApp"&&await Oe(n)})}async function je(){const e=document.getElementById("loginForm");e.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(e),a=n.get("email"),o=n.get("password"),r=n.get("code"),i=n.get("method"),m=await fetch("api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a,password:o,authCode:r,method:i})}),l=await m.json();m.ok?(alert("login succeeded"),ae(()=>Promise.resolve().then(()=>Pe),void 0).then(w=>w.navigate("/home"))):alert("login failed: "+String(l.error))})}async function $e(){var e;(e=document.getElementById("showTermsBtn"))==null||e.addEventListener("click",t=>{var n;t.preventDefault(),(n=document.getElementById("terms"))==null||n.classList.toggle("hidden")})}async function He(){if(await ge()){ae(()=>Promise.resolve().then(()=>Pe),void 0).then(t=>t.navigate("/home"));return}De(),je(),$e()}function _e(){const e=document.getElementById("registerForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(e),a=n.get("email"),o=n.get("password"),r="localhost:3000";try{const i=await fetch(`//${r}/api/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a,password:o})}),m=await i.json();i.ok?(alert("registration succeeded"),f("/login")):alert("registration failed: "+m.error)}catch{console.error("registration failed?"),alert("registration failed?")}})}function Re(){var e;(e=document.getElementById("passwordForm"))==null||e.classList.remove("hidden")}function K(){var e;(e=document.getElementById("passwordForm"))==null||e.classList.add("hidden")}async function Ue(){const e=document.getElementById("oldPassword").value,t=document.getElementById("newPassword").value;try{const n=await fetch("/api/profile/password",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({oldPassword:e,newPassword:t})}),a=await n.json();n.ok?alert("Password updated."):alert("Failed to update password: "+a.message),K()}catch{alert("catched err: failed to update password."),K()}}async function qe(){var e,t,n;(e=document.getElementById("showPasswordForm"))==null||e.addEventListener("click",Re),(t=document.getElementById("submitPasswordChange"))==null||t.addEventListener("click",Ue),(n=document.getElementById("hidePasswordForm"))==null||n.addEventListener("click",K)}function G(e){const t=document.getElementById("profileName"),n=document.getElementById("changeName"),a=document.getElementById("nameInput"),o=document.getElementById("saveName");e?(t.classList.add("hidden"),n.classList.add("invisible"),a.classList.remove("hidden"),o.classList.remove("hidden"),a.value=t.textContent||"",a.focus()):(a.classList.add("hidden"),o.classList.add("hidden"),t.classList.remove("hidden"),n.classList.remove("invisible"))}async function Je(e){try{return(await fetch("/api/profile/name",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({newName:e}),credentials:"include"})).ok?(alert("name updated."),!0):(alert("name updating failed"),!1)}catch{return alert("name updating failed?"),!1}}function We(){const e=document.getElementById("profileName"),t=document.getElementById("changeName"),n=document.getElementById("nameInput"),a=document.getElementById("saveName");t.addEventListener("click",()=>{G(!0)}),a.addEventListener("click",async()=>{const o=n.value.trim();if(o===""||o===e.textContent){G(!1);return}await Je(o)&&(e.textContent=o),G(!1)})}function he(e){const t=document.getElementById("avatarImg");document.getElementById("avatarInput"),t.src=`/avatar/upload/${e}.png?${Date.now()}`,t.onerror=()=>{t.onerror=null,t.src="/avatar/42.svg"}}async function ze(e,t){const n=new FormData;n.append("avatar",t);try{const a=await fetch("/api/avatar",{method:"POST",body:n}),o=await a.json();a.ok?(alert("avatar updated."),he(e)):alert(o.message||"avatar updating failed.")}catch{alert("Failed updating avatar?")}}async function Ve(e){document.getElementById("avatarImg");const t=document.getElementById("avatarInput");he(e.id),t.addEventListener("change",async()=>{var a;const n=(a=t.files)==null?void 0:a[0];if(n){if(n.size>5*1024*1024){alert("img limitation: 5MB");return}console.log("user id: ",e.id),await ze(e.id,n)}})}function ye(e){const t=D(e);return t&&t.isFriend?t.online?"🟢":"🔴":"-"}function Ge(e){return D(e).isFriend?"bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-600"}function X(e){return D(e).isFriend?"added":"add"}function Qe(e){const t=document.getElementById(`onlineStatus${e}`);t&&D(e).isFriend&&(t.textContent=ye(e))}function Ye(e){const t=document.getElementById(`addFriend${e}`);if(t){t.textContent=X(e);const n=D(e).isFriend;t.disabled=n,n?(t.classList.remove("bg-blue-500","hover:bg-blue-600"),t.classList.add("bg-gray-400","cursor-not-allowed")):(t.classList.add("bg-blue-500","hover:bg-blue-600"),t.classList.remove("bg-gray-400","cursor-not-allowed"))}}function Q(e){D(e)&&(Ye(e),Qe(e))}function Ke(){document.querySelectorAll('[id^="addFriend"]').forEach(e=>{const t=Number(e.id.replace("addFriend",""));e.addEventListener("click",()=>{ae(async()=>{const{addFriend:n}=await Promise.resolve().then(()=>Ze);return{addFriend:n}},void 0).then(({addFriend:n})=>n(t))})})}const I={},oe=()=>{const e=window.location.protocol==="https:"?"wss:":"ws:",t=window.location.host;return`${e}//${t}/ws`};console.log(oe());let c=new WebSocket(oe());function be(){(!c||c.readyState===WebSocket.CLOSED)&&(c=new WebSocket(oe())),c.onopen=()=>console.log("ws connected"),c.onclose=()=>console.log("ws closed"),c.onerror=e=>console.log("websocket error: ",e),c.onmessage=e=>{if(c.readyState!==WebSocket.OPEN){console.log("ws yet to be ready");return}const t=JSON.parse(e.data);console.log(t),t.method==="friendAdded"?(I[t.id]?I[t.id].isFriend=!0:I[t.id]={id:t.id,isFriend:!0,online:!1},Q(t.id)):t.method==="onlineStatus"?(I[t.id]?I[t.id].online=t.online:I[t.id]={id:t.id,isFriend:!1,online:t.online},Q(t.id)):t.method==="isFriend"&&(I[t.id]?I[t.id].isFriend=t.isFriend:I[t.id]={id:t.id,isFriend:t.isFriend,online:!1},Q(t.id))}}function Xe(e){c&&c.readyState===WebSocket.OPEN&&c.send(JSON.stringify({method:"addFriend",targetId:e}))}function ve(e){c&&c.readyState===WebSocket.OPEN&&c.send(JSON.stringify({method:"checkFriendship",targetId:e}))}function we(e){c&&c.readyState===WebSocket.OPEN&&c.send(JSON.stringify({method:"checkOnline",id:e}))}function D(e){return I[e]||{id:e,isFriend:!1,online:!1}}function xe(){c&&c.readyState===WebSocket.OPEN&&c.close()}const Ze=Object.freeze(Object.defineProperty({__proto__:null,addFriend:Xe,checkFriendship:ve,checkUserOnline:we,connectWebSocket:be,disconnectWebSocket:xe,getFriendStatus:D},Symbol.toStringTag,{value:"Module"}));async function Ee(){try{(await fetch("/api/logout",{method:"POST",credentials:"include"})).ok?(xe(),f("/login")):alert("logout failed")}catch{alert("logout failed")}}async function et(){var e;(e=document.getElementById("deleteAccount"))==null||e.addEventListener("click",async()=>{try{(await fetch("/api/account",{method:"DELETE",credentials:"include"})).ok?(alert("account deleted. logging out..."),Ee()):alert("failed to delete account")}catch{alert("failed to delete account?")}})}function z(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function tt(e){const t=document.getElementById("main-content");t.innerHTML=`
			<div class="flex-col space-y-4">
				<div class="flex items-center gap-x-4">
					<img id="avatarImg" src="" class="w-16 h-16 rounded-full" />
					<label for="avatarInput" class="cursor-pointer text-gray-400 hover:text-gray-600"> ✎ </label>
					<input type="file" id="avatarInput" class="hidden" accept="image/*"/>
				</div>
				<div class="flex gap-x-8">
					<span class="w-[150px]"> Email: </span>
					<span> ${z(e.email)} </span>
				</div>
				<div class="flex gap-x-4">
					<span class="w-[140px]"> password_hashed: </span>
					<button type="button" id="showPasswordForm" class="w-[10px] text-gray-400 hover:text-gray-600 text-sm"> ✎ </button>
					<span> ${e.password_hash||""} </span>
				</div>
				<div class="flex gap-x-4">
					<span class="w-[140px]"> Name: </span>
					<div id="nameContainer" class="flex items-center gap-x-2">
						<button type="button" id="changeName" class="w-[10px] text-gray-500 hover:text-gray-600 text-sm"> ✎ </button>
						<span id="profileName" class="ml-2"> ${z(e.name)} </span>
						<input id="nameInput" type="text" class="hidden ml-2 border rounded-md p-1 text-sm" />
						<button id="saveName" type="button" class="hidden rounded px-2 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600"> Save </button>
					</div>
				</div>
				<div class="flex gap-x-8">
					<span class="w-[150px]"> Stat versus AI: </span>
					<span> win: ${e.win}, lose: ${e.lose} ${e.lose>e.win?"-> you loser":""} </span>
				</div>
				<div class="flex gap-x-8">
					<span class="w-[150px]"> Created at: </span>
					<span> ${e.created_at} </span>
				</div>
				<div> 
					<button id="deleteAccount" type="button" class="rounded px-2 py-1 w-20 text-white bg-blue-500 hover:bg-blue-600"> delete </button> 
				</div>
			</div>
			<div id="passwordForm" class="hidden flex flex-col space-y-4 p-10">
				<input type="password" id="oldPassword" placeholder="current password" class="text-center placeholder-gray-200 p-2 border rounded-md" required>
				<input type="password" id="newPassword" placeholder="new password" class="text-center placeholder-gray-200 p-2 border rounded-md" required>
				<div class="flex justify-center space-x-3">
					<button type="button" id="submitPasswordChange" class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"> Save </button>
					<button type="button" id="hidePasswordForm" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"> cancel </button>
				</div>
			</div>
			`,qe(),We(),Ve(e),et()}function nt(e){return e.map(t=>`
		<tr class="hover:bg-gray-50">
			<td class="text-center p-3"> ${t.round} </td>
			<td class="text-center p-3"> ${t.user1} </td>
			<td class="text-center p-3"> ${t.user2} </td>
			<td class="text-center p-3 text-blue-700"> ${t.winner} </td>
			<td class="text-center p-3"> ${t.played_at} </td>
		</tr>
		`).join("")}function at(e){const t=document.getElementById("main-content");if(!t)return;if(e.length===0){t.innerHTML='<h2 class="p-8"> No matches found </h2>';return}const n=nt(e);t.innerHTML=`
	<div class="flex-1 min-h-screen">
		<table class="w-full border-collapse text-sm">
			<thead>
				<tr class="bg-gray-200">
					<th class="w-1/5 p-5 text-center"> Round </th>
					<th class="w-1/5 p-5 text-center"> Player 1 </th>
					<th class="w-1/5 p-5 text-center"> Player 2 </th>
					<th class="w-1/5 p-5 text-center"> Winner </th>
					<th class="w-1/5 p-5 text-center"> Time </th>
				</tr>
			</thead>
			<tbody> ${n} </tbody>
		</table>
	</div>
	`}function ot(e){return e.map(n=>{const a=ye(n.id),o=Ge(n.id),r=X(n.id);return`
			<tr class="hover:bg-gray-50">
				<td id="onlineStatus${n.id}" class="text-center p-3"> ${a} </td>
				<td class="text-center p-3"> ${z(n.email)} </td>
				<td class="text-center p-3"> ${z(n.name)} </td>
				<td class="text-center p-3"> ${n.created_at} </td>
				<td class="text-center p-3"> 
					<button 
						id="addFriend${n.id}"
						class="w-1/3 ${o} rounded text-white px-4 py-2"
						${X(n.id)==="added"?"disabled":""}>
						${r} 
					</button>
				</td>
			</tr>
			`}).join("")}async function st(e){const t=document.getElementById("main-content");if(e.length===0){t.innerHTML='<h2 class="p-8"> no other users </h2>';return}e.forEach(a=>{we(a.id),ve(a.id)});const n=ot(e);t.innerHTML=`
	<div class="flex-1 min-h-screen">
		<table class="w-full border-collapse text-sm">
			<thead>
				<tr class="bg-gray-200">
					<th class="w-1/5 p-5 text-center"> on/offline </th>
					<th class="w-1/5 p-5 text-center"> Email </th>
					<th class="w-1/5 p-5 text-center"> Name </th>
					<th class="w-1/5 p-5 text-center"> Register at </th>
					<th class="w-1/5 p-5 text-center"> add friend</th>
				</tr>
			</thead>
			<tbody> ${n} </tbody>
		</table>
	</div>
	`,Ke()}async function rt(){try{const e=await fetch("/api/profile",{credentials:"include"}),{ok:t,data:n}=await e.json();e.ok?tt(n):(alert(String(n.error)),f("/login"))}catch{alert("Pass may have expired. Please login again"),f("/login")}}async function it(){try{const e=await fetch("/api/match/history",{credentials:"include"});if(e.ok){const t=await e.json();at(t)}else alert("Pass may have expired. Please login again"),f("/login")}catch{alert("Pass may have expired. Please login again?"),f("/login")}}async function lt(){try{const e=await fetch("/api/users",{credentials:"include"});if(e.ok){const t=await e.json();st(t)}else alert("Pass may have expired. Please login again"),f("/login")}catch{alert("Pass may have expired. Please login again?"),f("/login")}}const de={profile:rt,matchHistory:it,users:lt};async function ce(){var t,n,a;await ge()?(be(),(n=document.getElementById("sidebar"))==null||n.classList.remove("hidden"),(a=document.getElementById("main-content"))==null||a.classList.add("ml-64"),document.getElementById("logout-button").addEventListener("click",Ee),document.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",async r=>{r.preventDefault();const i=o.getAttribute("data-tab");i&&de[i]&&await de[i]()})})):(document.querySelector("#login-logout a[data-link]").classList.remove("hidden"),(t=document.getElementById("main-content"))==null||t.classList.remove("ml-64"))}var u,p;const B={w:!1,s:!1,ArrowUp:!1,ArrowDown:!1};var F=0,M=0,P,A="",Ie=0,Be=0,_,j,V,E,H,S,Z,R,U,se,b,$,v,ee,T,C,d,te,x,L,h,g,N,O,q,y=null;function W(){p.fillStyle="black",p.fillRect(0,0,u.width,u.height),p.strokeStyle="white",p.beginPath(),p.setLineDash([5,15]),p.moveTo(u.width/2,5),p.lineTo(u.width/2,u.height),p.stroke(),p.fillStyle=Z,p.fillRect(H,S,V,E),p.fillStyle=ee,p.fillRect($,v,se,b),p.fillStyle="white",p.fillRect(h,g,d,d),_&&N&&O&&(p.fillStyle="red",p.fillRect(N,O,q,q))}function J(e,t,n){return n>0&&e<u.height-t?!0:n<0&&e>0}function dt(){B.w&&J(S,E,R)?S+=R:B.s&&J(S,E,U)&&(S+=U),B.ArrowUp&&J(v,b,T)?v+=T:B.ArrowDown&&J(v,b,C)&&(v+=C)}async function ct(){const t=Math.abs($-(h+d))/Math.abs(x);let n=g+d+L*t,a=g+L*t;if(a<0?(a=0,n=d):n>u.height&&(n=u.height,a=u.height-d),n>v+b){const o=Math.abs(v+b-n),r=Math.ceil(o/Math.abs(C))*(1e3/60);B[C>0?"ArrowDown":"ArrowUp"]=!0,setTimeout(()=>{B[C>0?"ArrowDown":"ArrowUp"]=!1},r+100)}else if(a<v){const o=Math.abs(v-a),r=Math.ceil(o/Math.abs(T))*(1e3/60);B[T<0?"ArrowUp":"ArrowDown"]=!0,setTimeout(()=>{B[T<0?"ArrowUp":"ArrowDown"]=!1},r+100)}}function ue(e,t,n){return((t+d/2-e)/n-.5)*5}function ut(){h+=x,g+=L,h<0&&(M++,document.getElementById("player2Score")&&(document.getElementById("player2Score").textContent=M.toString()),ne()),h+d>u.width&&(F++,document.getElementById("player1Score")&&(document.getElementById("player1Score").textContent=F.toString()),ne()),(g<0||g+d>u.height)&&(L=-L),h<H+V&&h+d>H&&g+d>S&&g<S+E&&(x=-x,L=ue(S,g,E),h=H+V+1,me()),h+d>$&&h<$+se&&g+d>v&&g<v+b&&(x=-x,L=ue(v,g,b),h=$-d-1,me()),_&&h+d>N&&h<N+q&&g+d>O&&g<O+q&&(N=0,O=0,mt(x))}function me(){Math.random()<.25&&_&&!N&&!O&&(N=Math.random()*(u.width-150-150)+150,O=Math.random()*(u.height-100-100)+100)}function mt(e){const t=e>0?1:-1,n=Math.random();n<.25?(document.getElementById("powerupInfo").textContent="Paddle size increased!",t==1&&E<200?E+=25:b<200&&(b+=25)):n<.5?(document.getElementById("powerupInfo").textContent="Opponent paddle shrunk!",t==1&&b>20?b-=7:E>20&&(E-=7)):n<.75?(document.getElementById("powerupInfo").textContent="Opponent control reversed!",t==1?(T=-T,C=-C):(R=-R,U=-U)):(document.getElementById("powerupInfo").textContent="Ball size increased!",d<50&&(d+=5))}async function pt(e){try{(await fetch("/api/match-result",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok||alert("failed saving match result")}catch{alert("failed saving match result?")}}async function ft(){if(!j)return;const e=A==="Player 1"?"win":"lose";try{if(!(await fetch("/api/stat",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({result:e})})).ok){console.log("would not update if not sign in");return}}catch{alert("didnt update stat versus AI")}}function gt(){if(dt(),ut(),W(),F==P||M==P)if(clearInterval(Ie),clearInterval(Be),y&&y.started&&y.matches){const e=y.matches.find(t=>t.winner===null);e&&(F==P?(e.winner=e.user1,A=e.user1):M==P&&(e.winner=e.user2,A=e.user2),y.matchnumber++,localStorage.setItem("tournament",JSON.stringify(y)),pt(y),F=0,M=0,document.getElementById("winnerInfo").innerHTML=`<p>${A} wins!</p>`,document.getElementById("winnerInfo").innerHTML+='<button id="finish-button" class="px-4 py-2 bg-white text-black rounded">Finish match</button>',document.getElementById("finish-button").addEventListener("click",()=>{f("/tournament")}))}else F==P?A="Player 1":M==P&&(A=j?"AI":"Player 2"),ft(),F=0,M=0,document.getElementById("winnerInfo").innerHTML=`<p>${A} wins!</p>`,document.getElementById("winnerInfo").innerHTML+='<button id="finish-button" class="px-4 py-2 bg-white text-black rounded">Finish match</button>',document.getElementById("finish-button").addEventListener("click",()=>{f("/")})}function Se(){V=15,E=75,H=25,R=-12,U=12,se=15,b=75,$=u.width-30,T=-12,C=12,d=10,te=10,q=35}function ne(){Se(),document.getElementById("powerupInfo").textContent="",h=u.width/2-d/2,g=u.height/2-d/2,x=-x,L=0,S=u.height/2-E/2,v=u.height/2-b/2}function ht(){var t,n,a,o,r,i,m;var e=localStorage.getItem("tournament");if(e?y=JSON.parse(e):y=null,u=document.getElementById("pongCanvas"),p=u.getContext("2d"),Se(),x=te,(t=document.getElementById("ballSpeed"))==null||t.addEventListener("input",()=>{const l=document.getElementById("ballSpeed").valueAsNumber;x=te*(l/100),document.getElementById("speedText").textContent=`Ball Speed: (${l}%)`}),P=5,(n=document.getElementById("winAmount"))==null||n.addEventListener("input",()=>{const l=document.getElementById("winAmount").valueAsNumber;P=l,document.getElementById("winAmountText").textContent=`Winning Score: (${l})`,document.getElementById("winAmountInfoText").textContent=`First to ${l} points wins`}),Z="#ffffff",ee="#ffffff",(a=document.getElementById("paddle1Color"))==null||a.addEventListener("input",()=>{Z=document.getElementById("paddle1Color").value,W()}),(o=document.getElementById("paddle2Color"))==null||o.addEventListener("input",()=>{ee=document.getElementById("paddle2Color").value,W()}),_=!0,(r=document.getElementById("powerupsEnabled"))==null||r.addEventListener("input",()=>{_=document.getElementById("powerupsEnabled").checked}),j=!1,(i=document.getElementById("aiEnabled"))==null||i.addEventListener("input",()=>{j=document.getElementById("aiEnabled").checked,document.getElementById("player2Name").textContent=j?"AI":"Player 2"}),y&&y.started&&y.matches){const l=y.matches.find(w=>w.winner===null);l&&(document.getElementById("player1Name").textContent=l.user1,document.getElementById("player2Name").textContent=l.user2,document.getElementById("match-title").textContent=`Tournament Match ${y.matchnumber}`,document.getElementById("aiEnabled").disabled=!0)}ne(),W(),(m=document.getElementById("startButton"))==null||m.addEventListener("click",()=>{const l=document.getElementById("startInfo");l&&(l.style.visibility="hidden"),document.addEventListener("keydown",function(w){B[w.key]=!0}),document.addEventListener("keyup",function(w){B[w.key]=!1}),Ie=setInterval(gt,1e3/60),j&&(Be=setInterval(ct,1e3))})}var s=null;function yt(){return`
		<h1 class="text-5xl font-bold">Create a tournament</h1>
		<div id="add-user" class="flex flex-row items-center justify-center gap-4">
			<input type="text" id="add-user-input" class="block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300" placeholder="enter alias...">
			<button id="add-user-button" class="block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300">Add user</button>
		</div>
		<h1 class="text-2xl font-bold">Current users</h1>
		<div id="current-users">
		</div>
		<button id="create-tournament-button" class="block p-2 text-gray-800 bg-gray-300 rounded border-2 border-gray-300" disabled>Start tournament</button>
	`}function bt(){return`
		<button id="end-tournament" class="font-bold block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300">End tournament</button>
		<h1 id="match-title" class="text-5xl font-bold">Match </h1>
		<div id="match-users">
			<p id="match-user1"></p>
			<p id="match-user2"></p>
		</div>
		<button id="match-start" class="block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300">Start match</button>
	`}function ke(){const e=document.getElementById("current-users");e.innerHTML="",s.users.forEach(n=>{const a=document.createElement("button");a.id=n,a.innerHTML=n,a.classList.add("block","p-2","text-gray-800","bg-gray-200","rounded-md","border-2","border-gray-200","hover:bg-red-200"),a.addEventListener("click",()=>{s.users=s.users.filter(o=>o!==n),ke()}),e.appendChild(a)});const t=document.getElementById("create-tournament-button");s.users.length>1?(t.disabled=!1,t.classList.remove("bg-gray-300"),t.classList.add("bg-gray-100"),t.classList.add("hover:bg-gray-200")):(t.disabled=!0,t.classList.remove("bg-gray-100"),t.classList.remove("hover:bg-gray-200"),t.classList.add("bg-gray-300"))}function pe(){s.matches=[];for(let e=0;e<s.users.length;e+=2)e+1<s.users.length?s.matches.push({user1:s.users[e],user2:s.users[e+1],winner:null}):s.matches.push({user1:s.users[e],user2:"BYE",winner:s.users[e]});localStorage.setItem("tournament",JSON.stringify(s))}function vt(){var e=localStorage.getItem("tournament");if(e?s=JSON.parse(e):s=null,s&&s.started&&s.matches){s.matches.every(n=>n.winner!==null)&&(s.users=s.matches.map(n=>n.winner),pe()),s.users.length===1&&(alert("tournament done, winner is "+s.users[0]),localStorage.removeItem("tournament"),f("/")),document.getElementById("tournament-main").innerHTML=bt();const t=s.matches.find(n=>n.winner===null);document.getElementById("match-title").innerHTML=`Match ${s.matchnumber}`,document.getElementById("match-user1").innerHTML=t.user1,document.getElementById("match-user2").innerHTML=t.user2,document.getElementById("match-start").addEventListener("click",()=>{f("/play")}),document.getElementById("end-tournament").addEventListener("click",()=>{alert("tournament ended early"),localStorage.removeItem("tournament"),f("/")})}else s={users:[],matches:[],matchnumber:1,started:!1},localStorage.setItem("tournament",JSON.stringify(s)),document.getElementById("tournament-main").innerHTML=yt(),document.getElementById("add-user-button").addEventListener("click",()=>{const t=document.getElementById("add-user-input"),n=t.value;n&&!s.users.includes(n)&&(s.users.push(n),t.value="",ke())}),document.getElementById("create-tournament-button").addEventListener("click",()=>{s.started=!0,pe(),f("/tournament")})}function wt(){return`
	<div class="flex flex-col items-center">
		<div class="bg-white p-6 rounded shadow-md w-80 text-left">
			<h2 class="text-2xl font-bold mb-4 text-center"> Login </h2>

			<form id="loginForm" class="space-y-4 mb-4">

				<div class="space-y-4">
					<label class="block text-sm font-medium"> Email: </label>
					<input id="email" name="email" type="email" class="border w-full p-2 mb-4 rounded" required/>
				</div>

				<div class="space-y-4">
					<label class="block text-sm font-medium"> Password: </label>
					<input id="password" name= "password" type="password" class="border w-full p-2 mb-4 rounded" required/>
				</div>
				
				<div class="flex items-center text-sm ml-2">
					<label class="w-20"> 2FA Code: </label>
					<input type="text" name="code" class="border rounded w-20 h-8 ml-1 text-center placeholder-gray-200" placeholder="6 digits" required />
					<button type="button" id="sendCodeBtn" class="text-xs p-1 bg-blue-500 hover:bg-blue-600 text-white h-8 rounded w-20 ml-4">
						Send Code
					</button>
				</div>

				<div class="flex justify-center">
					<label class="text-sm"> send/verify via: </label>
					<label class="text-sm ml-2"><input type="radio" name="method" value="email" checked /> Email </label>
					<label class="text-sm ml-2"><input type="radio" name="method" value="authApp" checked /> AuthApp </label>
				</div>

				<div class="mt-4">
					<button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full mb-2"> Login </button>
				</div>

			</form>

			<div class="flex flex-col space-y-2">
				<a href="/register" data-link class="text-sm text-gray-600 underline text-center"> Register </a>
				<a href="/api/auth/google" class="flex w-full items-center justify-center text-sm text-gray-600 underline">
					<img src="https://www.google.com/favicon.ico" alt="Google" class="w-4 h-4 mr-2" />
					Sign in with Google
				</a>
			</div>

       		<p class="text-xs mt-4 text-gray-400 text-center">
				By continuing, you agree to our <a href="#" id="showTermsBtn" class="underline"> terms </a>
			</p>

		</div>

		<div id="terms" class="text-xs text-gray-600 mt-2 hidden space-y-1">
			<h2 class="font-bold text-center"> Terms and Conditions(GDPR compilance) </h2>
			<p> This project: Transcendence uses data solely to provide web functionality </p>
			<p> Data collection:
			<p> - Registration: email and password(hashed before storage)</p>
			<p> - Google sign-in: email, google id and name </p>
			<p> Legal Basis: Necessary for providing account functionality </p>
			<p> Data Storage: All data is stored locally on your own device. </p>
			<p> Data Retention: Until account deletion </p>
			<p> Your Rights: Access, modify and delete your data </p>
			<p> Contact: 42ADL </p>
			<p> Complaints: You may lodge complaints with your local data protection authority </p>
		</div>
	</div>
		<div id="qrModal" class="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-end justify-end hidden z-50>
			<div class="bg-white p-6 rounded-xl shadow-xl w-80 text-center relative">
				<h2 class="text-sm mb-4"> Scan this QR code to register google auth secret </h2>
				<img id="qrImage" src="" alt="QR Code" class="mb-4 w-40 h-40" />
				<button id="closeModalBtn" class="px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded"> Close </button>
			</div>
		</div>
		`}function xt(){return`
		<div class="bg-white p-6 rounded shadow-md w-80 text-left">
			<h2 class="text-2xl font-bold mb-4 text-center"> Register </h2>
			<form id="registerForm" class="space-y-4">
				<div class="space-y-4">
					<label for="email" class="block text-sm font-medium"> Email: </label>
					<input type="email" id="email" name="email" class="w-full p-2 border border-gray-300 rounded" required/>
				</div>
				<div class="space-y-4">
					<label for="password" class="block text-sm font-medium"> Password: </label>
					<input type="password" id="password" name="password" class="w-full p-2 border border-gray-300 rounded" required/>
				</div>
				<button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
					Register
				</button>
			</form>
			<p class="text-sm text-center mt-4">
				Already have an account? <a href="/login" class="text-blue-500 underline" data-link>Login</a>
			</p>
		</div>
	`}function fe(){return`
			<!-- Sidebar -->
			<nav id="sidebar" class="hidden w-64 bg-white fixed left-0 h-full p-10">
				<ul id="menu" class="space-y-2">
					<li class="block font-bold underline p-2 text-gray-800 rounded text-center"> Menu </li>
					<li> <a href="#" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-tab="profile"> Profile </a> </li>
					<li> <a href="#" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-tab="users"> users </a> </li>
					<li> <a href="#" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-tab="matchHistory"> Match History </a> </li>
					<li> <a href="/play" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-link> Play Pong </a> </li>
					<li> <a href="/tournament" class="block p-2 text-gray-800 hover:bg-gray-200 rounded text-center" data-link> Tournament </a> </li>
					<button id="logout-button" class="absolute bottom-10 left-10 right-10 block p-2 text-gray-800 hover:bg-gray-200 rounded"> Logout </button>
				</ul>
			</nav>

			<!-- Main Content -->
			<main id="main-content" class="flex flex-row flex-1 justify-center items-center ml-64 min-h-screen w-full text-gray-800">
				<div class="flex items-center space-x-4">
					<a href="/play" class="block py-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300 w-32 text-center" data-link> Play Pong </a>
					<a href="/tournament" class="block py-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300 w-32 text-center" data-link> Tournament </a>
				</div>
				<div id="login-logout" class="absolute top-5 right-5">
					<a href="/login" class="block p-2 text-white bg-blue-500 hover:bg-blue-600 rounded w-20 text-center hidden" data-link> Login </a>
				</div>
			</main>
	`}function Et(){return`
		<div class="flex flex-col items-center justify-center min-h-screen bg-black">
			<h1 id="match-title" class="text-white text-4xl mb-4"></h1>
			<div id="user-names"class="mb-4 text-white">
				<span id="player1Name" class="text-5xl mr-10">Player 1</span>
				<span id="player2Name" class="text-5xl">Player 2</span>
			</div>
			<div class="mb-4 text-white">
				<span id="player1Score" class="text-5xl mr-10">0</span>
				<span id="player2Score" class="text-5xl">0</span>
			</div>
			<canvas id="pongCanvas" width="800" height="400" class="border border-white"></canvas>
			<p id="powerupInfo" class="text-white text-center"></p>
			<div id="startInfo" class="mt-4 text-white text-center gap-2 flex flex-col">
				<button id="startButton" class="px-4 py-2 bg-white text-black rounded">Start</button>
				<p>Player 1: W & S for movement</p>
				<p>Player 2: Arrow Up & Arrow Down for movement</p>
				<p>Hitting the red powerup boxes can give various effects</p>
				<p id="winAmountInfoText">First to 5 points wins</p>
				<hr class="border-white">
				<h1 class="text-white text-2xl"> Customisation </h1>
				<div id="customisation" class="flex flex-col justify-center gap-y-2">
					<div class="flex flex-row justify-center gap-x-8">
						<p> Powerups enabled? </p>
						<input type="checkbox" id="powerupsEnabled" checked>
					</div>
					<div class="flex flex-row justify-center gap-x-8">
						<p> Player 2 AI enabled? </p>
						<input type="checkbox" id="aiEnabled">
					</div>
					<div class="flex flex-row justify-center gap-x-8">
						<p id="speedText"> Ball Speed: (100%) </p>
						<input type="range" id="ballSpeed" min="50" max="150" value="100">
					</div>
					<div class="flex flex-row justify-center gap-x-8">
						<p id="winAmountText"> Winning Score: (5) </p>
						<input type="range" id="winAmount" min="1" max="10" value="5">
					</div>
					<div class="flex flex-row justify-center gap-x-6">
						<p> Paddle 1 Color: </p>
						<p> Paddle 2 Color: </p>
					</div>
					<div class="flex flex-row justify-center gap-x-20">
						<input type="color" id="paddle1Color" value="#ffffff" class="w-10 h-10">
						<input type="color" id="paddle2Color" value="#ffffff" class="w-10 h-10">
					</div>
				</div>
			</div>
			<div id="winnerInfo" class="mt-4 text-white text-center gap-2 flex flex-col">
			</div>
		</div>
	`}function It(){return`
		<div class="flex flex-col items-center justify-center h-screen">
			<h1 class="text-4xl font-bold">404 - Page Not Found</h1>
		</div>
	`}function Bt(){return`
		<main id="tournament-main" class="flex flex-col items-center justify-center gap-4">
		</main>
	`}const St={"/":fe,"/login":wt,"/register":xt,"/home":fe,"/play":Et,"/404":It,"/tournament":Bt},Y={"/":ce,"/login":He,"/register":_e,"/home":ce,"/play":ht,"/tournament":vt};function re(e){var n;const t=St[e];t||f("/404"),document.body.innerHTML=t(),(n=Y[e])==null||n.call(Y)}function ie(e){const t={"/":"Home","/login":"Login","/register":"Register","/play":"Pong","/tournament":"Tournament"};document.title=t[e]||"ft_transcendence"}function f(e){history.pushState({},"",e),ie(e),re(e)}function kt(){document.body.addEventListener("click",e=>{const t=e.target;if(t.matches("[data-link]")){e.preventDefault();const n=t.getAttribute("href");n&&f(n)}})}window.addEventListener("load",()=>{re(location.pathname),ie(location.pathname),kt()});window.addEventListener("popstate",()=>{re(location.pathname),ie(location.pathname)});const Pe=Object.freeze(Object.defineProperty({__proto__:null,navigate:f},Symbol.toStringTag,{value:"Module"}));
