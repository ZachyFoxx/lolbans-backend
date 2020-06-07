import { ApiServer } from "./ApiServer";
import { VERSION } from "./utils/env";

console.log(`\nlolbans-api v${VERSION}`);
console.log("made with 💜 by skye\n");

const server = new ApiServer();
server.listen();
