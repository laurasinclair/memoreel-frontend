export const createPath = (arr: string[]) => {
	if (!arr.every((s) => typeof s === "string")) return;
	return (
		arr
			.map((s, i) =>
				i === 0 ? s.replace(/\/+$/, "") : s.replace(/^\/+/, "")
			) // remove trailing slash on first, leading on others
			.join("/") || "/"
	);
};

const segments = {
	base: "/",
	dashboard: "dashboard",
	about: "about",
	user: "profile",
	history: "history",
    auth: "auth",
	login: "login",
	signup: "signup",
} as const;

export const paths = {
	base: segments.base,
	auth: createPath([segments.base, segments.auth]),
	login: createPath([segments.base, segments.auth, segments.login]),
	signup: createPath([segments.base, segments.auth, segments.signup]),
	about: createPath([segments.base, segments.about]),
	dashboard: createPath([segments.base, segments.dashboard]),
	history: createPath([segments.base, segments.dashboard, segments.history]),
	userProfile: createPath([segments.base, segments.user]),
};