## Chords in Markdown ... in Obsidian

This is a *very* barebones adaptation of [markdown-it-chords] as an [Obsidian] plugin.
Please see [the markdown-it-chords demo] for full documentation on the chord syntax.

### Installation

You can add this to your Obsidian install using the [BRAT community plugin].
I plan to submit it for review and publication in the community plugins as well.

### Usage

At the moment, the plugin only provides a Markdown Code Processor for fenced code marked
as "song" or "lyrics", e.g.:

	```song
	[C]Do, a deer, a female deer
	[Dm]Ray, a drop of golden sun
	[Eb]May, a possi[D#]bility
	[D/F#]Fee, the price you pay to run

	_(half-time, bossanova guitar)_
	[CΔ913]So, — I'd [C6]like to see Bra[Fmaj9]zil . . . . .[F6(9)]
	[E-7b13]La, — I'd [CM7sus2]really like to [E9]go . . .[E7b9]
	[AmΔ7/9]Tea, — I [A-7]sit and sip so [D#ø7]slow . . .[D#o7]
	That will [Dm7|x57565]bring — [F6(9)|x87788]us —— [Em7|x79787]back — [G13|x,10,x,12,12,12]to —— [8xx987]Do . . . .[8,(10),10,9,10,x]
	```

In the future I may extend it with an option to apply chord formatting to all text.
