const { spawn } = require("child_process");
const port = process.env.PORT || 3000;
const listen = `tcp://0.0.0.0:${port}`;

/** Static multi-page site — no SPA fallback (avoids HTML responses for missing assets). */
const child = spawn("npx", ["serve", ".", "-l", listen], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
