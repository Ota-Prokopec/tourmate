import { goto } from '$app/navigation';

type Params =
	| {
			path: string | number;
	  }
	| {
			path: string;
			gotoParams?: { invalidateAll: boolean };
	  };

export const navigate = (path: string | number, gotoParams?: { invalidateAll: boolean }) => {
	if (typeof path === 'string') {
		if (path.startsWith('http')) location.href = path;
		else if (path.startsWith('/')) goto(path, gotoParams);
		else location.href = `${location.href}/${path}`;
	} else if (path === 1) history.forward();
	else if (path === -1) history.back();
	else history.go(path);
};
