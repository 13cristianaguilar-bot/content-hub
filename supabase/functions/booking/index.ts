import { handleRequest } from "./http.mjs";
import { createLiveDeps } from "./live.mjs";

const deps = createLiveDeps();

Deno.serve((req: Request) => handleRequest(req, deps));
