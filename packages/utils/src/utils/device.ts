const recognizeWidth = () => {
	if (typeof window !== 'object') return null
	if (document.body.offsetWidth < 640) return 'mobile'
	else if (document.body.offsetWidth < 768) return 'sm'
	else if (document.body.offsetWidth < 1024) return 'md'
	else if (document.body.offsetWidth < 1280) return 'lg'
	else if (document.body.offsetWidth < 1536) return 'xl'
	else return '2xl'
}

export const device = { recognizeWidth }
