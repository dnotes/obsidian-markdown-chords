import MarkdownIt from 'markdown-it';
// @ts-ignore
import MarkdownItChords from 'markdown-it-chords'
import { App, Editor, MarkdownPostProcessorContext, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

// interface MarkdownChordsSettings {
// 	fullText: boolean;
// }

// const DEFAULT_SETTINGS: MarkdownChordsSettings = {
// 	fullText: false
// }

export default class MarkdownChords extends Plugin {
	// settings: MarkdownChordsSettings;
	md: MarkdownIt = new MarkdownIt('commonmark', { breaks:true } ).disable(['code','fence','html_block','lheading','list','reference','table','autolink','backticks','html_inline','linkify']).use(MarkdownItChords)
	parseCodeBlock = (source:string,el:HTMLDivElement,ctx:MarkdownPostProcessorContext) => { el.innerHTML = this.md.render(source); }
	async onload() {
		// await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new MarkdownChordsSettingsTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("song", this.parseCodeBlock)
		this.registerMarkdownCodeBlockProcessor("lyrics", this.parseCodeBlock)

	}

	onunload() {

	}

	// async loadSettings() {
	// 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
}

// class MarkdownChordsSettingsTab extends PluginSettingTab {
// 	plugin: MarkdownChords;

// 	constructor(app: App, plugin: MarkdownChords) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const {containerEl} = this;

// 		containerEl.empty();

// 		containerEl.createEl('h2', {text: 'Markdown Chords'});

// 		new Setting(containerEl)
// 			.setName(`Use Markdown Chords in full text`)
// 			.setDesc(`Markdown Chords formats code blocks with the "song" or "lyrics" language. Enabling this setting will also display Markdown Chords in the full text of documents.`)
// 			.addToggle(t => t
// 				.setTooltip('Do you want chords available in ALL text?')
// 				.setValue(this.plugin.settings.fullText)
// 				.onChange(async (value) => {
// 					this.plugin.settings.fullText = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }
