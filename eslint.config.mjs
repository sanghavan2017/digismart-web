import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude Code tooling — worktrees, installed skills, agent scripts. Not app source.
    ".claude/**",
    // Legacy standalone project folder kept for reference, not part of this app.
    "Quanr tri Web digismartvn.vn/**",
  ]),
]);

export default eslintConfig;
