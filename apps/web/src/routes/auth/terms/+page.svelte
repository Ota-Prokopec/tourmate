<script lang="ts">
	import Column from '$lib/components/Common/Column.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import { locale } from '$src/i18n/i18n-svelte';
</script>

<Column class="p-4">
	{#if $locale === 'en'}
		<Text class="text-xl font-bold">1. Acceptance of Terms</Text>

		<Text>
			By accessing or using the TourMate.cz mobile application ("the App"), you agree to comply with
			and be bound by these Terms and Conditions. If you do not agree with these terms, please
			refrain from using the App.
		</Text>

		<Text class="text-xl font-bold">2. User Responsibilities</Text>

		<Text>
			Users are solely responsible for the accuracy, completeness, and legality of any data,
			including images, they upload, submit, or otherwise make available through the App.
			TourMate.cz is not responsible for the content users generate within the app.
		</Text>

		<Text class="text-xl font-bold">3. Privacy and Personal Information</Text>

		<Text>
			TourMate.cz respects your privacy and is committed to protecting your personal information.
			Our Privacy Policy, available at [Privacy Policy Link], outlines how we collect, use, and
			protect your personal information. By using the App, you agree to the terms outlined in the
			Privacy Policy.</Text
		>

		<Text class="text-xl font-bold">4. Cookies</Text>

		<Text
			>TourMate.cz may use cookies to enhance your user experience. Cookies are small pieces of data
			stored on your device that help improve the functionality of the App. By using the App, you
			consent to the use of cookies in accordance with our Cookie Policy, available at [Cookie
			Policy Link].</Text
		>

		<Text class="text-xl font-bold">5. User Account</Text>

		<Text>
			To access certain features of the App, you may be required to create a user account. You are
			responsible for maintaining the confidentiality of your account information, including your
			username and password. Any activities that occur under your account are your responsibility.</Text
		>

		<Text class="text-xl font-bold">6. Intellectual Property</Text>

		<Text>
			The content and materials provided through the App, including but not limited to text,
			graphics, logos, images, and software, are owned or licensed by TourMate.cz and are protected
			by intellectual property laws. You agree not to reproduce, distribute, modify, or create
			derivative works from any content without our express written consent.
		</Text>

		<Text class="text-xl font-bold">7. Limitation of Liability</Text>

		<Text>
			TourMate.cz is not liable for any direct, indirect, incidental, consequential, or punitive
			damages arising out of your use of the App, including but not limited to loss of data,
			profits, or business interruption.
		</Text>

		<Text class="text-xl font-bold">8. Changes to Terms and Conditions</Text>

		<Text>
			TourMate.cz reserves the right to update, modify, or replace these Terms and Conditions at any
			time without prior notice. It is your responsibility to review these terms periodically.
			Continued use of the App after any changes signifies your acceptance of the updated terms.</Text
		>

		<Text class="text-xl font-bold">9. Termination of Access</Text>

		<Text>
			TourMate.cz reserves the right to terminate or suspend your access to the App at its sole
			discretion, without prior notice, for any reason, including but not limited to a violation of
			these Terms and Conditions.
		</Text>

		<Text class="text-xl font-bold">10. Governing Law</Text>

		<Text>
			These Terms and Conditions are governed by and construed in accordance with the laws of
			[Jurisdiction]. Any disputes arising out of or related to these terms shall be subject to the
			exclusive jurisdiction of the courts in [Jurisdiction]. By using the TourMate.cz App, you
			acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you
			have any questions or concerns, please contact us at [Contact Email].
		</Text>

		<Text class="text-xl font-bold">11. Users location</Text>

		<Text>
			Users location will be stored in local storage of your browser. User will be able to choose
			his location to get notifications when a new monument is created near to the user and this
			location will be stored in the database.
		</Text>
	{:else}
		<Text class="text-xl font-bold">1. Přijetí podmínek</Text>

		<Text>
			Přístupem nebo používáním mobilní aplikace TourMate.cz ("Aplikace") souhlasíte s dodržováním a
			vázáním těmito obchodními podmínkami. Pokud s těmito podmínkami nesouhlasíte, prosím, zdržte
			se používání Aplikace.
		</Text>

		<Text class="text-xl font-bold">2. Zodpovědnost uživatele</Text>

		<Text>
			Uživatelé jsou výhradně zodpovědní za přesnost, úplnost a legálnost jakýchkoli dat, včetně
			obrázků, které nahrávají, odesílají nebo jinak poskytují prostřednictvím Aplikace. TourMate.cz
			není zodpovědný za obsah, který uživatelé generují v rámci aplikace.
		</Text>

		<Text class="text-xl font-bold">3. Ochrana soukromí a osobní údaje</Text>

		<Text>
			TourMate.cz respektuje vaše soukromí a zavazuje se chránit vaše osobní údaje. Naše Zásady
			ochrany osobních údajů, dostupné na [Odkaz na zásady ochrany osobních údajů], upřesňují, jak
			shromažďujeme, používáme a chráníme vaše osobní údaje. Používáním Aplikace souhlasíte s
			podmínkami uvedenými v Zásadách ochrany osobních údajů.
		</Text>

		<Text class="text-xl font-bold">4. Cookies</Text>

		<Text>
			TourMate.cz může využívat soubory cookies ke zlepšení vašeho uživatelského zážitku. Cookies
			jsou malé úlomky dat uložené na vašem zařízení, které pomáhají zlepšit funkcionalitu Aplikace.
			Používáním Aplikace souhlasíte s používáním cookies v souladu s našimi Zásadami používání
			cookies, dostupnými na [Odkaz na zásady používání cookies].
		</Text>

		<Text class="text-xl font-bold">5. Uživatelský účet</Text>

		<Text>
			K přístupu k určitým funkcím Aplikace může být vyžadováno vytvoření uživatelského účtu. Jste
			zodpovědní za udržování důvěrnosti informací o svém účtu, včetně uživatelského jména a hesla.
			Za všechny aktivity, které se vyskytnou pod vaším účtem, nesete odpovědnost.
		</Text>

		<Text class="text-xl font-bold">6. Práva duševního vlastnictví</Text>

		<Text>
			Obsah a materiály poskytované prostřednictvím Aplikace, včetně textu, grafiky, log, obrázků a
			softwaru, jsou vlastněny nebo licencovány společností TourMate.cz a jsou chráněny právy
			duševního vlastnictví. Souhlasíte s tím, že nebudete reprodukovat, distribuovat, upravovat
			nebo vytvářet odvozené práce z jakéhokoli obsahu bez našeho výslovného písemného souhlasu.
		</Text>

		<Text class="text-xl font-bold">7. Omezení odpovědnosti</Text>

		<Text>
			TourMate.cz nenese odpovědnost za přímé, nepřímé, náhodné, následné nebo postihové škody
			vzniklé v důsledku vašeho používání Aplikace, včetně, ale neomezeně, ztráty dat, zisku nebo
			přerušení podnikání.
		</Text>

		<Text class="text-xl font-bold">8. Změny v obchodních podmínkách</Text>

		<Text>
			TourMate.cz si vyhrazuje právo aktualizovat, upravit nebo nahradit tyto Obchodní podmínky
			kdykoliv bez předchozího upozornění. Je vaší odpovědností pravidelně tyto podmínky
			zkontrolovat. Pokračující používání Aplikace po jakýchkoli změnách znamená váš souhlas s
			aktualizovanými podmínkami.
		</Text>

		<Text class="text-xl font-bold">9. Ukončení přístupu</Text>

		<Text>
			TourMate.cz si vyhrazuje právo ukončit nebo pozastavit váš přístup k Aplikaci podle svého
			výhradního uvážení, bez předchozího upozornění, z jakéhokoli důvodu, včetně porušení těchto
			Obchodních podmínek.
		</Text>

		<Text class="text-xl font-bold">10. Uplatňování práva</Text>

		<Text>
			Tyto Obchodní podmínky podléhají a jsou vykládány v souladu s právem [Jurisdikce]. Veškeré
			spory vyplývající z těchto podmínek nebo s nimi související spadají do výlučné jurisdikce
			soudů v [Jurisdikce]. Používáním Aplikace Tour
		</Text>

		<Text class="text-xl font-bold">11. Uživatelova poloha</Text>

		<Text>
			Poloha uživatele bude uložena v lokálním úložišti vašeho prohlížeče. Uživatel bude moci vybrat
			svou polohu a dostávat oznámení, když je v blízkosti uživatele vytvořen nový památník, a tato
			poloha bude uložena v databázi.
		</Text>
	{/if}
</Column>
