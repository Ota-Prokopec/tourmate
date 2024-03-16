<script lang="ts">
	import LL from '$src/i18n/i18n-svelte';
	import Alert from './Alert.svelte';
	import Column from '../Common/Column.svelte';
	import Text from '../Common/Text.svelte';
</script>

<Alert class="bg-red-100" color="red">
	<Text slot="title" class="text-red-500">{$LL.component.SystemDownAlert.title()}</Text>
	<Column class="gap-0" slot="message">
		<Text>{$LL.component.SystemDownAlert.message()}</Text>
		<Text>{$LL.component.SystemDownAlert.donationAsking()}</Text>
	</Column>
</Alert>
