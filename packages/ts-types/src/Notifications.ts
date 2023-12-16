export type NotificationType = 'newMonument'

type newMonumentPayload = {
	monumentId: string
	type: 'newMonument'
}

export type NotificationBodyPayload<Type extends NotificationType> =
	(Type extends 'newMonument' ? newMonumentPayload : never) & { type: Type }
