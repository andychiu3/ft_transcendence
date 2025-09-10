import { loginHandler } from "./handlers/loginHandler";
import { registerHandler } from "./handlers/registerHandler";
import { homeHandler } from "./handlers/homeHandler";
import { pongHandler } from "./handlers/pongHandler";
import { tournamentHandler } from "./handlers/tournamentHandler";

import { renderLoginPage } from "./pages/login";
import { renderRegisterPage } from "./pages/register";
import { renderHomePage } from "./pages/home";
import { renderPongPage } from "./pages/pong";
import { render404Page } from "./pages/404";
import { renderTournamentPage } from "./pages/tournament";

const route: { [key: string]: () => string } = {
	"/": renderLoginPage,
	"/login": renderLoginPage,
	"/register": renderRegisterPage,
	"/home": renderHomePage,
	"/play": renderPongPage,
	"/404": render404Page,
	"/tournament": renderTournamentPage,
};

const handler: { [key: string]: () => void } = {
	"/": loginHandler,
	"/login": loginHandler,
	"/register": registerHandler,
	"/home": homeHandler,
	"/play": pongHandler,
	"/tournament": tournamentHandler,
};

function	render(path: string) {
	const view = route[path];
	if (!view)
		navigate("/404");

	document.body.innerHTML = view();
	handler[path]?.();
	// attachLinks();
}

//to dynamically change title based on the page (stored in path)
function	changeTitle(path: string) {
	const titles: { [key: string]: string } = {
		"/": "Home",
		"/login": "Login",
		"/register": "Register",
		"/play": "Pong",
		"/tournament": "Tournament",
	};
	document.title = titles[path] || "ft_transcendence"; //default title if no page
}

function	navigate(path: string) {
	history.pushState({}, "", path);
	changeTitle(path);
	render(path);
}

function	eventDelegate() {
	document.body.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (target.matches('[data-link]')) {
			e.preventDefault();
			const href = target.getAttribute('href');
			if (href)
				navigate(href);
		}
	});
}

window.addEventListener("load", () => {
	render(location.pathname);
	changeTitle(location.pathname);
	eventDelegate();
});

window.addEventListener("popstate", () => {
	render(location.pathname)
	changeTitle(location.pathname)
});

export { navigate };

// export function	attachLinks() {
// 	document.querySelectorAll("[data-link]").forEach((link) => {
// 		link.addEventListener("click", (e) => {
// 			e.preventDefault();
// 			const href = (e.target as HTMLAnchorElement).getAttribute("href");
// 			if (href)
// 				navigate(href);
// 		});
// 	});
// }
