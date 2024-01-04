import { goto } from '$app/navigation';
import { isURL } from '@app/utils';

type Params = [string | number | URL, undefined] | [string, { invalidateAll: boolean }];

export const navigate = (path: Params[0], gotoParams: Params[1] = undefined) => {
	if (typeof path === 'string') {
		if (isURL(path)) location.href = path;
		else if (path.startsWith('/')) goto(path, gotoParams);
		else location.href = `${location.href}/${path}`;
	} else if (path === 1) history.forward();
	else if (path === -1) history.back();
	else if (typeof path === 'number') history.go(path);
	throw new Error('Invalid param path');
};
