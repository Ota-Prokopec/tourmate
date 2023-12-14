export type NotificationType = 'newMonument'

type newMonumentPayload = {
	monumentId: string
	monumentName: string
	img: string
	type: 'newMonument'
}

export type NotificationBodyPayload<Type extends NotificationType> =
	(Type extends 'newMonument' ? newMonumentPayload : never) & { type: Type }
