export function handleAnimationsWithName(
	name: string | undefined,
	animations: string[],
	cb: (animation: string) => void
) {
	for(const animation of animations) {
		if(name && animation.endsWith(name)) {
			cb(animation);
		}
	}
}

export function getAnimationName(
	providerId: string,
	localId: string,
	name: string
) {
	return [providerId, localId, name].join('-');
}

export function unRegisterAnimation(name: string) {
	return (prev: string[]) => {
		prev = prev.filter((x) => x !== name);
		return prev;
	};
}