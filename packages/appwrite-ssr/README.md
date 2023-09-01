<h1 align="center" id="title">appwrite-ssr</h1>

<p id="description">appwrite-ssr will help you to create ssr applications with appwrite.</p>

<h2>🛠️ Installation Steps:</h2>

<p>1. download appwrite-ssr</p>

```
npm i appwrite-ssr
```

<p>2. import appwrite-ssr</p>

```
import appwriteSSR from "appwrite-ssr";
```

<p>3. set up envirenment variables.ą Variables have to be APPWRITE_ENDPOINT and APPWRITE_PROJECT_ID</p>

```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1 APPWRITE_PROJECT_ID="jfdajfjajůlaj"
```

<p>4. set users session into appwriteSSR</p>

```
appwriteSSR.setSession(); OR appwriteSSR.setCookie(cookies); OR appwriteSSR.none()
```

<p>5. log user into your application</p>

```
const { account } = appwriteSSR.none()
const { sessionLegacyToken, sessionToken } = await account.logInViaEmail(
    email,
    password
  );
```

<p>6. initialize buckets</p>

```
    import appwriteSSR from '@app/appwrite-ssr'

	const { Bucket } = appwriteSSR.setSession(session)

	const bucket = new Bucket('bucket id')

    bucket.getParamsFromURL(url)
	bucket.createFile()

```

<p>7. initialize collections</p>

```
  import type {
	UserInfoDocument,
	UserInfoDocumentCreate,
  } from '@app/ts-types'

    import appwriteSSR from '@app/appwrite-ssr'

	const { Collection } = appwriteSSR.setSession(session)

	const userInfo =new Collection<UserInfoDocument, UserInfoDocumentCreate>('account', 'userInfo'),
	userInfo.createDocument({}, [userId])

}
```

<h2>used packages/technologies:</h2>
appwrite

<h2>🛡️ License:</h2>

This project is licensed under the MIT

<h2>💖 Any questions?</h2>
otaprokopec@gmail.com
