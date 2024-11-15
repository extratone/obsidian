/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CodePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var CodePlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("console", (source, el, ctx) => {
      const lines = source.split("\n");
      const pre = el.createEl("pre", { cls: "language-console" });
      for (const line of lines) {
        const m = line.match(/^\s*([>#%\$])\s*(.+)$/);
        if (m != null) {
          const div = pre.createEl("div");
          div.createEl("span", {
            text: m[1],
            cls: "console-prompt" + (m[1] === "#" ? " console-prompt-root" : "")
          });
          div.createEl("span", { text: m[2], cls: "console-command" });
        } else {
          pre.createEl("div", { text: line, cls: "console-output" });
        }
      }
    });
  }
};


/* nosourcemap */