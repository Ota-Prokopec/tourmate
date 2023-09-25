export const navigate = (param: string | number) => {
	if (typeof param === 'string') location.pathname = param
	else history.go(param)
}
