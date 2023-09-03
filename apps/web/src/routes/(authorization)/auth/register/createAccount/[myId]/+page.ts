export const load = async ({ params, url }) => {
	const quiziId = params?.myId;

	return {
		quiziId
	};
};
