const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, '\n') ?? ''

export default {
	private_key: privateKey ?? 'notfound',
	type: 'service_account',
	project_id: 'experiences-5dfad',
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	client_email: 'firebase-adminsdk-xopyz@experiences-5dfad.iam.gserviceaccount.com',
	client_id: '110119845593257399449',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xopyz%40experiences-5dfad.iam.gserviceaccount.com',
	universe_domain: 'googleapis.com',
}
