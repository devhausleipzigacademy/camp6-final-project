export const avatarList = [];
export function Avatars(number: number) {
	number = 25;
	const avatarGenerate = () => {
		for (let i = 0; i < number; i++) {
			avatarList.push(`https://avatars.dicebear.com/api/bottts/${i}.svg?size=50`);
		}
		return avatarList;
	};
	avatarGenerate();

	console.log(avatarList);
	return (
		<div className="flex w-mobile flex-row">
			{avatarList.map((x) => (
				<img src={x}></img>
			))}
		</div>
	);
}
