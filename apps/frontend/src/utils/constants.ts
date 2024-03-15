export const SUPPORTED_DOMAINS = ["B2B", "SERVICES"];

export const USER_GUIDE_LINK = "https://github.com/tanyamadaan/b2b_mock_server/blob/feat-monorepo/README.md"; 

export const SWAGGER_BUILD_LINK =
	"https://raw.githubusercontent.com/abhik-wil/b2b_mock_server/feat-monorepo/apps/backend/src/openapi/build/swagger.yaml";
export const URL_MAPPING = {
	bpp: ["search", "select", "init", "confirm", "update", "status", "cancel"],
	bap: [
		"on_search",
		"on_select",
		"on_init",
		"on_confirm",
		"on_update",
		"on_status",
		"on_cancel",
	],
};

export const NEXT_ACTION = {
	search: "on_search",
	on_search: "select",
	select: "on_select",
	on_select: "init",
	init: "on_init",
	on_init: "confirm",
	confirm: "on_confirm",
	update: "on_update",
	status: "on_status",
	cancel: "on_cancel",
};


