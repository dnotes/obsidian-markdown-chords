import MarkdownIt from 'markdown-it';
// @ts-ignore
import MarkdownItChords from 'markdown-it-chords'
import {  MarkdownPostProcessorContext, Plugin } from 'obsidian';

export default class MarkdownChords extends Plugin {

	// settings: MarkdownChordsSettings;

	md: MarkdownIt = new MarkdownIt('commonmark', { breaks:true } ).disable(['code','fence','html_block','lheading','list','reference','table','autolink','backticks','html_inline','linkify']).use(MarkdownItChords)

	/**
	 * This function parses song and lyric code blocks using markdown-it and markdown-it-chords.
	 * I know that the use of innerHTML is considered insecure on principle, which is a good standard;
	 * however, since this code uses a stripped-down version of markdown-it with HTML blocks disabled,
	 * I think it should be more secure and performant than me trying to replicate that functionality.
	 */
	parseCodeBlock = (source:string,el:HTMLDivElement,ctx:MarkdownPostProcessorContext) => { el.innerHTML = this.md.render(source); }

	async onload() {

		this.registerMarkdownCodeBlockProcessor("song", this.parseCodeBlock)
		this.registerMarkdownCodeBlockProcessor("lyrics", this.parseCodeBlock)

	}

}
