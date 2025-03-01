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
  default: () => MarkdownInsertPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  defaultTitle: ""
};
var MarkdownInsertPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    (0, import_obsidian.addIcon)(
      "md-link",
      '<path id="Path" d="M45.858 53.117 C41.803 49.062 35.228 49.062 31.174 53.117 L26.947 57.343 C22.892 61.398 22.892 67.973 26.947 72.027 L27.988 73.068 C32.043 77.123 38.617 77.123 42.672 73.068 L46.898 68.842 C50.953 64.787 50.953 58.212 46.898 54.158 Z" fill="none" stroke="#999999" stroke-width="5.4" stroke-opacity="1" stroke-linejoin="round" stroke-linecap="round"/><path id="Shape" d="M40.671 59.399 L58.905 41.036" fill="none" stroke="#999999" stroke-width="5.4" stroke-opacity="1" stroke-linejoin="round" stroke-linecap="round"/><path id="Shape-1" d="M71.984 27.054 C67.912 22.982 61.309 22.982 57.236 27.054 L53.042 31.249 C48.969 35.321 48.969 41.925 53.042 45.997 L54.018 46.974 C58.091 51.046 64.694 51.046 68.766 46.974 L72.961 42.779 C77.033 38.707 77.033 32.103 72.961 28.031 Z" fill="none" stroke="#999999" stroke-width="5.4" stroke-opacity="1" stroke-linejoin="round" stroke-linecap="round"/><path id="Line" d="M33.1 13.7 L12.8 13.7" fill="none" stroke="#999999" stroke-width="7.5" stroke-opacity="1" stroke-linejoin="round" stroke-linecap="round"/><path id="Line-copy" d="M12.8 86.3 L12.8 13.7" fill="none" stroke="#999999" stroke-width="7.5" stroke-opacity="1" stroke-linejoin="round" stroke-linecap="round"/><path id="Line-copy-1" d="M12.8 86.3 L33.1 86.3" fill="none" stroke="#999999" stroke-width="7.5" stroke-opacity="1" stroke-linejoin="round" stroke-linecap="round"/><path id="Line-copy-4" d="M87.4 13.7 L67.1 13.7" fill="none" stroke="#999999" stroke-width="7.5" stroke-opacity="1" stroke-linejoin="round" stroke-linecap="round"/><path id="Line-copy-3" d="M87.2 86.3 L87.2 13.7" fill="none" stroke="#999999" stroke-width="7.5" stroke-opacity="1" stroke-linejoin="round" stroke-linecap="round"/><path id="Line-copy-2" d="M67.1 86.3 L87.4 86.3" fill="none" stroke="#999999" stroke-width="7.5" stroke-opacity="1" stroke-linejoin="round" stroke-linecap="round"/>'
    );
    this.addCommand({
      id: "insert-link-into-selection",
      name: "Insert link into selection",
      icon: "md-link",
      editorCallback: async (editor, ctx) => {
        const clipboardString = await navigator.clipboard.readText();
        if (clipboardString.length == 0) {
          return new import_obsidian.Notice("No text found in clipboard");
        }
        if (editor.somethingSelected()) {
          const selection = editor.getSelection();
          if (this.isURL(selection)) {
            editor.replaceSelection(
              `${this.isImageURL(selection) ? "!" : ""}[${clipboardString}](${selection})`
            );
          } else if (this.isURL(clipboardString)) {
            editor.replaceSelection(
              `${this.isImageURL(clipboardString) ? "!" : ""}[${selection}](${clipboardString})`
            );
          } else {
            return new import_obsidian.Notice("No URL found");
          }
        } else {
          const anchor = editor.listSelections()[0].anchor;
          anchor.ch += this.isImageURL(clipboardString) ? 2 : 1;
          editor.replaceSelection(
            `${this.isImageURL(clipboardString) ? "!" : ""}[${this.settings.defaultTitle}](${clipboardString})`
          );
          if (this.settings.defaultTitle.length == 0) {
            editor.setSelection(anchor);
          }
        }
      }
    });
    this.addSettingTab(new SettingTab(this.app, this));
  }
  onunload() {
  }
  isURL(string) {
    try {
      new URL(string);
    } catch (e) {
      return false;
    }
    return true;
  }
  isImageURL(string) {
    return string.match(
      /\.(jpeg|jpg|gif|png|tif|tiff|bmp|eps|raw|apng|avif|jfif|pjpeg|pjp|svg|webp)$/
    ) != null;
  }
  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    );
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var SettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Default title").setDesc(
      "The title to use when pasting links without text selected."
    ).addText(
      (text) => text.setPlaceholder("Enter default title").setValue(this.plugin.settings.defaultTitle).onChange(async (value) => {
        this.plugin.settings.defaultTitle = value;
        await this.plugin.saveSettings();
      })
    );
  }
};
