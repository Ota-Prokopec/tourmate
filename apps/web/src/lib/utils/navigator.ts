import { goto } from '$app/navigation';

export const navigate = (param: string | number) => {
	if (typeof param === 'string') {
		if (param.startsWith('http')) location.href = param;
		else if (param.startsWith('/')) goto(param);
		else location.href = `${location.href}/${param}`;
	} else if (param === 1) history.forward();
	else if (param === -1) history.back();
	else history.go(param);
};
