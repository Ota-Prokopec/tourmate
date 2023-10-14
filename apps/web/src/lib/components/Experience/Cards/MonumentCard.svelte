<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Common/Icon.svelte';
	import LikeSection from '$lib/components/Common/LikeSection.svelte';
	import Row from '$lib/components/Common/Row.svelte';
	import Text from '$lib/components/Common/Text.svelte';
	import UserItem from '$lib/components/Common/UserItem.svelte';
	import { Query, collections, user } from '@app/appwrite-client';
	import permissions from '@app/appwrite-server/src/permissions';
	import type { MonumentCard } from '@app/ts-types';
	import { Card, Img } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	export let monument: MonumentCard;

	let className = '';
	export { className as class };

	$: imgSrcAsString = monument.pictureURL as unknown as string | undefined;

	const like = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		const doc = await collections.monumentLike.createDocument(
			{ monumentId: monument._id, userId: $user.$id },
			permissions.owner($user.$id)
		);
		monument.liked = doc;
	};
	const unlike = async () => {
		if (!$user?.$id) throw new Error('user is not authed');
		await collections.monumentLike.deleteDocument([
			Query.equal('monumentId', monument._id),
			Query.equal('userId', $user.$id)
		]);
		monument.liked = null;
	};
</script>

<Card class={twMerge(' justify-self-center gap-2', className)} padding="sm">
	<UserItem
		on:click={({ detail: { userId } }) => goto(`/account/${userId}`)}
		avatarClass="w-10 h-10"
		class="h-auto"
		user={monument.creator}
	/>

	<button on:click={() => goto(`/monument/${monument._id}`)}>
		<Img class="rounded-lg object-cover " src={imgSrcAsString} />
	</button>

	<LikeSection
		on:like={like}
		on:unlike={unlike}
		data={{
			liked: monument.liked ? true : false,
			otherUsersThatLiked: monument.likes.map((l) => l.user)
		}}
	/>

	<Row class="justify-between">
		<h5 class="mb-2 text-xl text-black">
			{monument.name}
		</h5>
		<Text class="text-right">
			<button on:click={() => goto(`/search/places/${monument.placeDetail.name}`)}>
				<Row class="gap-1">
					<Icon icon="fas fa-map-marker-alt" class="text-xl " />
					{monument.placeDetail.name}
				</Row>
			</button>
		</Text>
	</Row>
</Card>
