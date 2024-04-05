export const GET = () => {
	fetch(process.env.SERVER_HOSTNAME, {
		method: 'GET'
	});
};
