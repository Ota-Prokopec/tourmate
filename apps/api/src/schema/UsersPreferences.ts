import { objectType } from 'nexus'

export default objectType({
	name: 'UsersPreferences',
	definition: (t) => {
		t.int('mapRange')
		t.boolean('termsAccepted')
		t.field('colorTheme', { type: 'ColorTheme' })
		t.field('language', { type: 'Language' })
	},
})
