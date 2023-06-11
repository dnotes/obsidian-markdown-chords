import MarkdownIt from 'markdown-it';
// @ts-ignore
import MarkdownItChords from 'markdown-it-chords'
import {  App, MarkdownPostProcessorContext, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface MarkdownChordsSettings {
	color: string
	opacity: string
	bold: boolean
	textSize: number
	diagramSize: number
}

const DEFAULT_SETTINGS:MarkdownChordsSettings = {
	color: "accent",
	opacity: "muted",
	bold: false,
	textSize: 90,
	diagramSize: 10,
}

export default class MarkdownChords extends Plugin {

	settings: MarkdownChordsSettings;

	md: MarkdownIt = new MarkdownIt('commonmark', { breaks:true } ).disable(['code','fence','html_block','lheading','list','reference','table','autolink','backticks','html_inline','linkify']).use(MarkdownItChords)

	/**
	 * This function parses song and lyric code blocks using markdown-it and markdown-it-chords.
	 * I know that the use of innerHTML is considered insecure on principle, which is a good standard;
	 * however, since this code uses a stripped-down version of markdown-it with HTML blocks disabled,
	 * I think it should be more secure and performant than me trying to replicate that functionality.
	 */
	parseCodeBlock = (source:string,el:HTMLDivElement,ctx:MarkdownPostProcessorContext) => {
		el.style.setProperty('--chord-color', this.textColor)
		el.style.setProperty('--chord-weight', this.settings.bold ? 'bold' : 'normal')
		el.style.setProperty('--chord-font-size', `${this.settings.textSize}%`)
		el.style.setProperty('--chord-diagram-font-size', `${this.settings.diagramSize}px`)
		el.innerHTML = this.md.render(source);
	}

	async onload() {

		await this.loadSettings()

		this.registerMarkdownCodeBlockProcessor("song", this.parseCodeBlock)
		this.registerMarkdownCodeBlockProcessor("lyrics", this.parseCodeBlock)

		this.addSettingTab(new SettingTab(this.app,this))

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}

	get textOpacity() {
		if (this.settings.opacity === 'faint') return .5
		if (this.settings.opacity === 'muted') return .8
		return 1
	}

	get textColor() {
		if (this.settings.color === 'text') return `var(--text-${this.settings.opacity})`
		if (this.settings.color === 'accent') return `hsla(var(--accent-h), var(--accent-s), var(--accent-l), ${this.textOpacity})`
		return `rgba(var(--color-${this.settings.color}-rgb), ${this.textOpacity})`
	}

}

class SettingTab extends PluginSettingTab {
	plugin: MarkdownChords;
	constructor(app:App,plugin:MarkdownChords) {
		super(app,plugin)
		this.plugin = plugin
	}
	display(): void {
		const {containerEl} = this

		containerEl.empty()

		containerEl.createEl('h2', {text:'Markdown Chords'})

		containerEl.createEl('p', {
			text: 'To use chords in Markdown, you must create a "song" or "lyrics" code block '
				+ 'with the lyrics and chords of the song. For example:'
		})

		containerEl.createEl('pre', {
			text: '```song\n[C]This is the [F]shortest [G]song in the [C]world!\n```'
		})

		containerEl.createEl('p', {
			text: 'Please visit the link below for examples illustrating how to structure chords '
				+ 'and chord diagrams.'
		})

		containerEl.createEl('a', { text:'Markdown Chords documentation', href:'https://dnotes.github.io/markdown-it-chords' })

		containerEl.createEl('hr')

		containerEl.createEl('h2', {text:'Settings'})

		new Setting(containerEl)
			.setName('Color')
			.setDesc('Pick a color for chord display')
			.addDropdown(c => c
				.addOption('text', 'text')
				.addOption('accent', 'accent')
				.addOption('red', 'red')
				.addOption('orange', 'orange')
				.addOption('yellow', 'yellow')
				.addOption('green', 'green')
				.addOption('cyan', 'cyan')
				.addOption('blue', 'blue')
				.addOption('purple', 'purple')
				.addOption('pink', 'pink')
				.setValue(this.plugin.settings.color)
				.onChange(async value => {
					this.plugin.settings.color = value
					await this.plugin.saveSettings()
				}));

		new Setting(containerEl)
			.setName('Opacity')
			.setDesc('Set opacity for chord display')
			.addDropdown(c => c
				.addOption('normal', 'normal')
				.addOption('muted', 'muted')
				.addOption('faint', 'faint')
				.setValue(this.plugin.settings.opacity)
				.onChange(async value => {
					this.plugin.settings.opacity = value
					await this.plugin.saveSettings()
				}));

		new Setting(containerEl)
			.setName('Chord name size (%)')
			.setDesc('The font size of chord names, as a percentage.')
			.addSlider(c => c
				.setLimits(40,120,10)
				.setValue(this.plugin.settings.textSize)
				.setDynamicTooltip()
				.onChange(async value => {
					this.plugin.settings.textSize = value
					await this.plugin.saveSettings()
				}));

		new Setting(containerEl)
			.setName('Bold')
			.setDesc('Bold chord names')
			.addToggle(c => c
				.setValue(this.plugin.settings.bold)
				.onChange(async value => {
					this.plugin.settings.bold = value
					await this.plugin.saveSettings()
				}));


		new Setting(containerEl)
		.setName('Chord diagram size (px)')
		.setDesc('The font size of chord diagrams, in pixels.')
		.addSlider(c => c
			.setLimits(9,15,1)
			.setValue(this.plugin.settings.diagramSize)
			.setDynamicTooltip()
			.onChange(async value => {
				this.plugin.settings.diagramSize = value
				await this.plugin.saveSettings()
			}));

	}
}
