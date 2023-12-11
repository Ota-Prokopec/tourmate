export type NotificationType = 'newMonument'

export type NotificationBodyPayload<Type extends NotificationType> = {
	type: Type
	monumentId: Type extends 'newMonument' ? string : never
}
