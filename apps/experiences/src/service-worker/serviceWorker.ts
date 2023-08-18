import { autoLocalizationStart } from './autoLocalizationServiceWorker';

export const start = () => {
	//update service-worker
	navigator.serviceWorker.getRegistration().then((registration) => {
		if (registration?.active) {
			registration.update();
		}
	});

	//start autolocalization
	autoLocalizationStart();
};
