import { goto } from '$app/navigation';

export const navigate = (param: string | number) => {
	if (typeof param === 'string') goto(param);
	else if (param === 1) history.forward();
	else if (param === -1) history.back();
	else history.go(param);
};
