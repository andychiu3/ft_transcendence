(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const Ae="modulepreload",Fe=function(e){return"/"+e},de={},se=function(t,n,o){let a=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),p=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));a=Promise.allSettled(n.map(l=>{if(l=Fe(l),l in de)return;de[l]=!0;const x=l.endsWith(".css"),Q=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${Q}`))return;const L=document.createElement("link");if(L.rel=x?"stylesheet":Ae,x||(L.as="script"),L.crossOrigin="",L.href=l,p&&L.setAttribute("nonce",p),document.head.appendChild(L),x)return new Promise((Te,Ce)=>{L.addEventListener("load",Te),L.addEventListener("error",()=>Ce(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(i){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=i,window.dispatchEvent(p),!p.defaultPrevented)throw i}return a.then(i=>{for(const p of i||[])p.status==="rejected"&&s(p.reason);return t().catch(s)})};function m(e){return window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?e:`https://ft-transcendence-rtjp.onrender.com${e}`}function Me(){return window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws`:"wss://websocket-o3f2.onrender.com/ws"}async function he(){try{const e=m("/api/auth/verify"),t=await fetch(e,{credentials:"include"}),n=await t.json();return t.ok}catch(e){return console.error("JWT verification failed",e),!1}}async function Ne(e){const t=e.get("email");if(!t){alert("enter email to get the code");return}try{const n=m("/api/send2FACode"),o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t}),credentials:"include"}),a=o.json();o.ok?alert("code has been sent."):alert("fail to send")}catch{alert("got info which is not json?")}}function Oe(e){const t=document.getElementById("qrModal"),n=document.getElementById("qrImage"),o=document.getElementById("closeModalBtn");t&&n&&(n.src=e,t.classList.remove("hidden"),o&&(o.onclick=()=>{t.classList.add("hidden")}))}async function De(e){const t=e.get("email");if(!t){alert("Enter email for auth app check");return}try{const n=m("/api/authAppSecretCheck"),o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t}),credentials:"include"});if(!o.ok){alert("please register first.");return}const a=await o.json();a.qrCodeDataUrl?Oe(a.qrCodeDataUrl):alert("unexpected case?")}catch{alert("catched err")}}function je(){const e=document.getElementById("sendCodeBtn"),t=document.getElementById("loginForm");e&&e.addEventListener("click",async()=>{const n=new FormData(t),o=n.get("method");o==="email"?await Ne(n):o==="authApp"&&await De(n)})}async function Ue(){const e=document.getElementById("loginForm");e.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(e),o=n.get("email"),a=n.get("password"),s=n.get("code"),i=n.get("method");try{const p=m("/api/login"),l=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:o,password:a,authCode:s,method:i}),credentials:"include"}),x=await l.json();l.ok?(alert("login succeeded"),se(()=>Promise.resolve().then(()=>Pe),void 0).then(Q=>Q.navigate("/home"))):alert("login failed: "+String(x.error))}catch{alert("login failed?")}})}async function $e(){var e;(e=document.getElementById("showTermsBtn"))==null||e.addEventListener("click",t=>{var n;t.preventDefault(),(n=document.getElementById("terms"))==null||n.classList.toggle("hidden")})}async function He(){if(await he()){se(()=>Promise.resolve().then(()=>Pe),void 0).then(t=>t.navigate("/home"));return}je(),Ue(),$e()}function _e(){const e=document.getElementById("registerForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(e),o=n.get("email"),a=n.get("password"),s=m("/api/register");try{const i=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:o,password:a})}),p=await i.json();i.ok?(alert("registration succeeded"),g("/login")):alert("registration failed: "+p.error)}catch{console.error("registration failed?"),alert("registration failed?")}})}function Re(){var e;(e=document.getElementById("passwordForm"))==null||e.classList.remove("hidden")}function Z(){var e;(e=document.getElementById("passwordForm"))==null||e.classList.add("hidden")}async function qe(){const e=document.getElementById("oldPassword").value,t=document.getElementById("newPassword").value;try{const n=m("/api/profile/password"),o=await fetch(n,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({oldPassword:e,newPassword:t}),credentials:"include"}),a=await o.json();o.ok?alert("Password updated."):alert("Failed to update password: "+a.message),Z()}catch{alert("catched err: failed to update password."),Z()}}async function Je(){var e,t,n;(e=document.getElementById("showPasswordForm"))==null||e.addEventListener("click",Re),(t=document.getElementById("submitPasswordChange"))==null||t.addEventListener("click",qe),(n=document.getElementById("hidePasswordForm"))==null||n.addEventListener("click",Z)}function Y(e){const t=document.getElementById("profileName"),n=document.getElementById("changeName"),o=document.getElementById("nameInput"),a=document.getElementById("saveName");e?(t.classList.add("hidden"),n.classList.add("invisible"),o.classList.remove("hidden"),a.classList.remove("hidden"),o.value=t.textContent||"",o.focus()):(o.classList.add("hidden"),a.classList.add("hidden"),t.classList.remove("hidden"),n.classList.remove("invisible"))}async function We(e){try{const t=m("/api/profile/name");return(await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({newName:e}),credentials:"include"})).ok?(alert("name updated."),!0):(alert("name updating failed"),!1)}catch{return alert("name updating failed?"),!1}}function ze(){const e=document.getElementById("profileName"),t=document.getElementById("changeName"),n=document.getElementById("nameInput"),o=document.getElementById("saveName");t.addEventListener("click",()=>{Y(!0)}),o.addEventListener("click",async()=>{const a=n.value.trim();if(a===""||a===e.textContent){Y(!1);return}await We(a)&&(e.textContent=a),Y(!1)})}function ye(e){const t=document.getElementById("avatarImg"),n=m(`/avatar/upload/${e}.png?${Date.now}`),o=m("/avatar/42.svg");t.src=n,t.onerror=()=>{t.onerror=null,t.src=o}}async function Ve(e,t){const n=new FormData;n.append("avatar",t);try{const o=m("/api/avatar"),a=await fetch(o,{method:"POST",body:n,credentials:"include"}),s=await a.json();a.ok?(alert("avatar updated."),ye(e)):alert(s.message||"avatar updating failed.")}catch{alert("Failed updating avatar?")}}async function Ge(e){document.getElementById("avatarImg");const t=document.getElementById("avatarInput");ye(e.id),t.addEventListener("change",async()=>{var o;const n=(o=t.files)==null?void 0:o[0];if(n){if(n.size>5*1024*1024){alert("img limitation: 5MB");return}console.log("user id: ",e.id),await Ve(e.id,n)}})}function be(e){const t=j(e);return t&&t.isFriend?t.online?"🟢":"🔴":"-"}function Qe(e){return j(e).isFriend?"bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-600"}function ee(e){return j(e).isFriend?"added":"add"}function Ye(e){const t=document.getElementById(`onlineStatus${e}`);t&&j(e).isFriend&&(t.textContent=be(e))}function Ke(e){const t=document.getElementById(`addFriend${e}`);if(t){t.textContent=ee(e);const n=j(e).isFriend;t.disabled=n,n?(t.classList.remove("bg-blue-500","hover:bg-blue-600"),t.classList.add("bg-gray-400","cursor-not-allowed")):(t.classList.add("bg-blue-500","hover:bg-blue-600"),t.classList.remove("bg-gray-400","cursor-not-allowed"))}}function K(e){j(e)&&(Ke(e),Ye(e))}function Xe(){document.querySelectorAll('[id^="addFriend"]').forEach(e=>{const t=Number(e.id.replace("addFriend",""));e.addEventListener("click",()=>{se(async()=>{const{addFriend:n}=await Promise.resolve().then(()=>et);return{addFriend:n}},void 0).then(({addFriend:n})=>n(t))})})}const B={};let c;async function ve(){try{const e=m("/api/auth/verify"),t=await fetch(e,{credentials:"include"}),{data:n}=await t.json();(!c||c.readyState===WebSocket.CLOSED)&&(c=new WebSocket(`${Me()}?token=${n.id}`)),c.onopen=()=>console.log("ws connected"),c.onclose=()=>console.log("ws closed"),c.onerror=o=>console.log("websocket error: ",o),c.onmessage=o=>{if(c.readyState!==WebSocket.OPEN){console.log("ws yet to be ready");return}const a=JSON.parse(o.data);a.method==="friendAdded"?(B[a.id]?B[a.id].isFriend=!0:B[a.id]={id:a.id,isFriend:!0,online:!1},K(a.id)):a.method==="onlineStatus"?(B[a.id]?B[a.id].online=a.online:B[a.id]={id:a.id,isFriend:!1,online:a.online},K(a.id)):a.method==="isFriend"&&(B[a.id]?B[a.id].isFriend=a.isFriend:B[a.id]={id:a.id,isFriend:a.isFriend,online:!1},K(a.id))}}catch{console.error("JWT verify failed before WS?")}}function Ze(e){c&&c.readyState===WebSocket.OPEN&&c.send(JSON.stringify({method:"addFriend",targetId:e}))}function we(e){c&&c.readyState===WebSocket.OPEN&&c.send(JSON.stringify({method:"checkFriendship",targetId:e}))}function xe(e){c&&c.readyState===WebSocket.OPEN&&c.send(JSON.stringify({method:"checkOnline",id:e}))}function j(e){return B[e]||{id:e,isFriend:!1,online:!1}}function Ee(){c&&c.readyState===WebSocket.OPEN&&c.close()}const et=Object.freeze(Object.defineProperty({__proto__:null,addFriend:Ze,checkFriendship:we,checkUserOnline:xe,connectWebSocket:ve,disconnectWebSocket:Ee,getFriendStatus:j},Symbol.toStringTag,{value:"Module"}));async function Ie(){try{const e=m("/api/logout");(await fetch(e,{method:"POST",credentials:"include"})).ok?(Ee(),g("/login")):alert("logout failed")}catch{alert("logout failed")}}async function tt(){var e;(e=document.getElementById("deleteAccount"))==null||e.addEventListener("click",async()=>{try{const t=m("/api/account");(await fetch(t,{method:"DELETE",credentials:"include"})).ok?(alert("account deleted. logging out..."),Ie()):alert("failed to delete account")}catch{alert("failed to delete account?")}})}function V(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function nt(e){const t=document.getElementById("main-content");t.innerHTML=`
			<div class="flex-col space-y-4">
				<div class="flex items-center gap-x-4">
					<img id="avatarImg" src="" class="w-16 h-16 rounded-full" />
					<label for="avatarInput" class="cursor-pointer text-gray-400 hover:text-gray-600"> ✎ </label>
					<input type="file" id="avatarInput" class="hidden" accept="image/*"/>
				</div>
				<div class="flex gap-x-8">
					<span class="w-[150px]"> Email: </span>
					<span> ${V(e.email)} </span>
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
						<span id="profileName" class="ml-2"> ${V(e.name)} </span>
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
			`,Je(),ze(),Ge(e),tt()}function at(e){return e.map(t=>`
		<tr class="hover:bg-gray-50">
			<td class="text-center p-3"> ${t.round} </td>
			<td class="text-center p-3"> ${t.user1} </td>
			<td class="text-center p-3"> ${t.user2} </td>
			<td class="text-center p-3 text-blue-700"> ${t.winner} </td>
			<td class="text-center p-3"> ${t.played_at} </td>
		</tr>
		`).join("")}function ot(e){const t=document.getElementById("main-content");if(!t)return;if(e.length===0){t.innerHTML='<h2 class="p-8"> No matches found </h2>';return}const n=at(e);t.innerHTML=`
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
	`}function st(e){return e.map(n=>{const o=be(n.id),a=Qe(n.id),s=ee(n.id);return`
			<tr class="hover:bg-gray-50">
				<td id="onlineStatus${n.id}" class="text-center p-3"> ${o} </td>
				<td class="text-center p-3"> ${V(n.email)} </td>
				<td class="text-center p-3"> ${V(n.name)} </td>
				<td class="text-center p-3"> ${n.created_at} </td>
				<td class="text-center p-3"> 
					<button 
						id="addFriend${n.id}"
						class="w-1/3 ${a} rounded text-white px-4 py-2"
						${ee(n.id)==="added"?"disabled":""}>
						${s} 
					</button>
				</td>
			</tr>
			`}).join("")}async function rt(e){const t=document.getElementById("main-content");if(e.length===0){t.innerHTML='<h2 class="p-8"> no other users </h2>';return}e.forEach(o=>{xe(o.id),we(o.id)});const n=st(e);t.innerHTML=`
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
	`,Xe()}async function it(){try{const e=m("/api/profile"),t=await fetch(e,{credentials:"include"}),{ok:n,data:o}=await t.json();t.ok?nt(o):(alert(String(o.error)),g("/login"))}catch{alert("Pass may have expired. Please login again"),g("/login")}}async function lt(){try{const e=m("/api/match/history"),t=await fetch(e,{credentials:"include"});if(t.ok){const n=await t.json();ot(n)}else alert("Pass may have expired. Please login again"),g("/login")}catch{alert("Pass may have expired. Please login again?"),g("/login")}}async function dt(){try{const e=m("/api/users"),t=await fetch(e,{credentials:"include"});if(t.ok){const n=await t.json();rt(n)}else alert("Pass may have expired. Please login again"),g("/login")}catch{alert("Pass may have expired. Please login again?"),g("/login")}}const ce={profile:it,matchHistory:lt,users:dt};async function ue(){var t,n,o;await he()?(ve(),(n=document.getElementById("sidebar"))==null||n.classList.remove("hidden"),(o=document.getElementById("main-content"))==null||o.classList.add("ml-64"),document.getElementById("logout-button").addEventListener("click",Ie),document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",async s=>{s.preventDefault();const i=a.getAttribute("data-tab");i&&ce[i]&&await ce[i]()})})):(document.querySelector("#login-logout a[data-link]").classList.remove("hidden"),(t=document.getElementById("main-content"))==null||t.classList.remove("ml-64"))}var u,f;const S={w:!1,s:!1,ArrowUp:!1,ArrowDown:!1};var M=0,N=0,P,F="",Be=0,Se=0,_,U,G,I,H,k,te,R,q,re,v,$,w,ne,C,A,d,ae,E,T,y,h,O,D,J,b=null;function z(){f.fillStyle="black",f.fillRect(0,0,u.width,u.height),f.strokeStyle="white",f.beginPath(),f.setLineDash([5,15]),f.moveTo(u.width/2,5),f.lineTo(u.width/2,u.height),f.stroke(),f.fillStyle=te,f.fillRect(H,k,G,I),f.fillStyle=ne,f.fillRect($,w,re,v),f.fillStyle="white",f.fillRect(y,h,d,d),_&&O&&D&&(f.fillStyle="red",f.fillRect(O,D,J,J))}function W(e,t,n){return n>0&&e<u.height-t?!0:n<0&&e>0}function ct(){S.w&&W(k,I,R)?k+=R:S.s&&W(k,I,q)&&(k+=q),S.ArrowUp&&W(w,v,C)?w+=C:S.ArrowDown&&W(w,v,A)&&(w+=A)}async function ut(){const t=Math.abs($-(y+d))/Math.abs(E);let n=h+d+T*t,o=h+T*t;if(o<0?(o=0,n=d):n>u.height&&(n=u.height,o=u.height-d),n>w+v){const a=Math.abs(w+v-n),s=Math.ceil(a/Math.abs(A))*(1e3/60);S[A>0?"ArrowDown":"ArrowUp"]=!0,setTimeout(()=>{S[A>0?"ArrowDown":"ArrowUp"]=!1},s+100)}else if(o<w){const a=Math.abs(w-o),s=Math.ceil(a/Math.abs(C))*(1e3/60);S[C<0?"ArrowUp":"ArrowDown"]=!0,setTimeout(()=>{S[C<0?"ArrowUp":"ArrowDown"]=!1},s+100)}}function me(e,t,n){return((t+d/2-e)/n-.5)*5}function mt(){y+=E,h+=T,y<0&&(N++,document.getElementById("player2Score")&&(document.getElementById("player2Score").textContent=N.toString()),oe()),y+d>u.width&&(M++,document.getElementById("player1Score")&&(document.getElementById("player1Score").textContent=M.toString()),oe()),(h<0||h+d>u.height)&&(T=-T),y<H+G&&y+d>H&&h+d>k&&h<k+I&&(E=-E,T=me(k,h,I),y=H+G+1,pe()),y+d>$&&y<$+re&&h+d>w&&h<w+v&&(E=-E,T=me(w,h,v),y=$-d-1,pe()),_&&y+d>O&&y<O+J&&h+d>D&&h<D+J&&(O=0,D=0,pt(E))}function pe(){Math.random()<.25&&_&&!O&&!D&&(O=Math.random()*(u.width-150-150)+150,D=Math.random()*(u.height-100-100)+100)}function pt(e){const t=e>0?1:-1,n=Math.random();n<.25?(document.getElementById("powerupInfo").textContent="Paddle size increased!",t==1&&I<200?I+=25:v<200&&(v+=25)):n<.5?(document.getElementById("powerupInfo").textContent="Opponent paddle shrunk!",t==1&&v>20?v-=7:I>20&&(I-=7)):n<.75?(document.getElementById("powerupInfo").textContent="Opponent control reversed!",t==1?(C=-C,A=-A):(R=-R,q=-q)):(document.getElementById("powerupInfo").textContent="Ball size increased!",d<50&&(d+=5))}async function ft(e){try{const t=m("/api/match-result");(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),credentials:"include"})).ok||alert("failed saving match result")}catch{alert("failed saving match result?")}}async function gt(){if(!U)return;const e=F==="Player 1"?"win":"lose";try{const t=m("/api/stat");if(!(await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({result:e}),credentials:"include"})).ok){console.log("would not update if not sign in");return}}catch{alert("didnt update stat versus AI")}}function ht(){if(ct(),mt(),z(),M==P||N==P)if(clearInterval(Be),clearInterval(Se),b&&b.started&&b.matches){const e=b.matches.find(t=>t.winner===null);e&&(M==P?(e.winner=e.user1,F=e.user1):N==P&&(e.winner=e.user2,F=e.user2),b.matchnumber++,localStorage.setItem("tournament",JSON.stringify(b)),ft(b),M=0,N=0,document.getElementById("winnerInfo").innerHTML=`<p>${F} wins!</p>`,document.getElementById("winnerInfo").innerHTML+='<button id="finish-button" class="px-4 py-2 bg-white text-black rounded">Finish match</button>',document.getElementById("finish-button").addEventListener("click",()=>{g("/tournament")}))}else M==P?F="Player 1":N==P&&(F=U?"AI":"Player 2"),gt(),M=0,N=0,document.getElementById("winnerInfo").innerHTML=`<p>${F} wins!</p>`,document.getElementById("winnerInfo").innerHTML+='<button id="finish-button" class="px-4 py-2 bg-white text-black rounded">Finish match</button>',document.getElementById("finish-button").addEventListener("click",()=>{g("/")})}function ke(){G=15,I=75,H=25,R=-12,q=12,re=15,v=75,$=u.width-30,C=-12,A=12,d=10,ae=10,J=35}function oe(){ke(),document.getElementById("powerupInfo").textContent="",y=u.width/2-d/2,h=u.height/2-d/2,E=-E,T=0,k=u.height/2-I/2,w=u.height/2-v/2}function yt(){var t,n,o,a,s,i,p;var e=localStorage.getItem("tournament");if(e?b=JSON.parse(e):b=null,u=document.getElementById("pongCanvas"),f=u.getContext("2d"),ke(),E=ae,(t=document.getElementById("ballSpeed"))==null||t.addEventListener("input",()=>{const l=document.getElementById("ballSpeed").valueAsNumber;E=ae*(l/100),document.getElementById("speedText").textContent=`Ball Speed: (${l}%)`}),P=5,(n=document.getElementById("winAmount"))==null||n.addEventListener("input",()=>{const l=document.getElementById("winAmount").valueAsNumber;P=l,document.getElementById("winAmountText").textContent=`Winning Score: (${l})`,document.getElementById("winAmountInfoText").textContent=`First to ${l} points wins`}),te="#ffffff",ne="#ffffff",(o=document.getElementById("paddle1Color"))==null||o.addEventListener("input",()=>{te=document.getElementById("paddle1Color").value,z()}),(a=document.getElementById("paddle2Color"))==null||a.addEventListener("input",()=>{ne=document.getElementById("paddle2Color").value,z()}),_=!0,(s=document.getElementById("powerupsEnabled"))==null||s.addEventListener("input",()=>{_=document.getElementById("powerupsEnabled").checked}),U=!1,(i=document.getElementById("aiEnabled"))==null||i.addEventListener("input",()=>{U=document.getElementById("aiEnabled").checked,document.getElementById("player2Name").textContent=U?"AI":"Player 2"}),b&&b.started&&b.matches){const l=b.matches.find(x=>x.winner===null);l&&(document.getElementById("player1Name").textContent=l.user1,document.getElementById("player2Name").textContent=l.user2,document.getElementById("match-title").textContent=`Tournament Match ${b.matchnumber}`,document.getElementById("aiEnabled").disabled=!0)}oe(),z(),(p=document.getElementById("startButton"))==null||p.addEventListener("click",()=>{const l=document.getElementById("startInfo");l&&(l.style.visibility="hidden"),document.addEventListener("keydown",function(x){S[x.key]=!0}),document.addEventListener("keyup",function(x){S[x.key]=!1}),Be=setInterval(ht,1e3/60),U&&(Se=setInterval(ut,1e3))})}var r=null;function bt(){return`
		<h1 class="text-5xl font-bold">Create a tournament</h1>
		<div id="add-user" class="flex flex-row items-center justify-center gap-4">
			<input type="text" id="add-user-input" class="block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300" placeholder="enter alias...">
			<button id="add-user-button" class="block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300">Add user</button>
		</div>
		<h1 class="text-2xl font-bold">Current users</h1>
		<div id="current-users">
		</div>
		<button id="create-tournament-button" class="block p-2 text-gray-800 bg-gray-300 rounded border-2 border-gray-300" disabled>Start tournament</button>
	`}function vt(){return`
		<button id="end-tournament" class="font-bold block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300">End tournament</button>
		<h1 id="match-title" class="text-5xl font-bold">Match </h1>
		<div id="match-users">
			<p id="match-user1"></p>
			<p id="match-user2"></p>
		</div>
		<button id="match-start" class="block p-2 text-gray-800 hover:bg-gray-200 rounded border-2 border-gray-300">Start match</button>
	`}function Le(){const e=document.getElementById("current-users");e.innerHTML="",r.users.forEach(n=>{const o=document.createElement("button");o.id=n,o.innerHTML=n,o.classList.add("block","p-2","text-gray-800","bg-gray-200","rounded-md","border-2","border-gray-200","hover:bg-red-200"),o.addEventListener("click",()=>{r.users=r.users.filter(a=>a!==n),Le()}),e.appendChild(o)});const t=document.getElementById("create-tournament-button");r.users.length>1?(t.disabled=!1,t.classList.remove("bg-gray-300"),t.classList.add("bg-gray-100"),t.classList.add("hover:bg-gray-200")):(t.disabled=!0,t.classList.remove("bg-gray-100"),t.classList.remove("hover:bg-gray-200"),t.classList.add("bg-gray-300"))}function fe(){r.matches=[];for(let e=0;e<r.users.length;e+=2)e+1<r.users.length?r.matches.push({user1:r.users[e],user2:r.users[e+1],winner:null}):r.matches.push({user1:r.users[e],user2:"BYE",winner:r.users[e]});localStorage.setItem("tournament",JSON.stringify(r))}function wt(){var e=localStorage.getItem("tournament");if(e?r=JSON.parse(e):r=null,r&&r.started&&r.matches){r.matches.every(n=>n.winner!==null)&&(r.users=r.matches.map(n=>n.winner),fe()),r.users.length===1&&(alert("tournament done, winner is "+r.users[0]),localStorage.removeItem("tournament"),g("/")),document.getElementById("tournament-main").innerHTML=vt();const t=r.matches.find(n=>n.winner===null);document.getElementById("match-title").innerHTML=`Match ${r.matchnumber}`,document.getElementById("match-user1").innerHTML=t.user1,document.getElementById("match-user2").innerHTML=t.user2,document.getElementById("match-start").addEventListener("click",()=>{g("/play")}),document.getElementById("end-tournament").addEventListener("click",()=>{alert("tournament ended early"),localStorage.removeItem("tournament"),g("/")})}else r={users:[],matches:[],matchnumber:1,started:!1},localStorage.setItem("tournament",JSON.stringify(r)),document.getElementById("tournament-main").innerHTML=bt(),document.getElementById("add-user-button").addEventListener("click",()=>{const t=document.getElementById("add-user-input"),n=t.value;n&&!r.users.includes(n)&&(r.users.push(n),t.value="",Le())}),document.getElementById("create-tournament-button").addEventListener("click",()=>{r.started=!0,fe(),g("/tournament")})}function xt(){return`
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
				<a href="${m("/api/auth/google")}" class="flex w-full items-center justify-center text-sm text-gray-600 underline">
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
		`}function Et(){return`
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
	`}function ge(){return`
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
	`}function It(){return`
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
	`}function Bt(){return`
		<div class="flex flex-col items-center justify-center h-screen">
			<h1 class="text-4xl font-bold">404 - Page Not Found</h1>
		</div>
	`}function St(){return`
		<main id="tournament-main" class="flex flex-col items-center justify-center gap-4">
		</main>
	`}const kt={"/":ge,"/login":xt,"/register":Et,"/home":ge,"/play":It,"/404":Bt,"/tournament":St},X={"/":ue,"/login":He,"/register":_e,"/home":ue,"/play":yt,"/tournament":wt};function ie(e){var n;const t=kt[e];t||g("/404"),document.body.innerHTML=t(),(n=X[e])==null||n.call(X)}function le(e){const t={"/":"Home","/login":"Login","/register":"Register","/play":"Pong","/tournament":"Tournament"};document.title=t[e]||"ft_transcendence"}function g(e){history.pushState({},"",e),le(e),ie(e)}function Lt(){document.body.addEventListener("click",e=>{const t=e.target;if(t.matches("[data-link]")){e.preventDefault();const n=t.getAttribute("href");n&&g(n)}})}window.addEventListener("load",()=>{ie(location.pathname),le(location.pathname),Lt()});window.addEventListener("popstate",()=>{ie(location.pathname),le(location.pathname)});const Pe=Object.freeze(Object.defineProperty({__proto__:null,navigate:g},Symbol.toStringTag,{value:"Module"}));
