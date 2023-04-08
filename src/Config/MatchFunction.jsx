async function overallMatch(targetUser, otherUsers) {
	if (!otherUsers || otherUsers.length < 1)
		return console.log("no other users present");
	let weights = {
		Clean: 1,
		Drinking: 1,
		Friendly: 1,
		Responsible: 1,
		Smoking: 1,
	};
	let diffSum = 0;
	let maxDiffSum = 0;
	let c = [];
	await otherUsers.forEach(async (user) => {
		if (user.uid == targetUser.uid) return;
		let r = await matchUsers(targetUser.attr, user.attr);
		c.push(r);

		let userDiffSum = 0;
		let userMaxDiffSum = 0;
		Object.keys(targetUser.attr).forEach((quality) => {
			let diff = Math.abs(targetUser.attr[quality] - user.attr[quality]);

			if (weights[quality] == undefined) return;
			userDiffSum += diff * weights[quality];
			userMaxDiffSum += 5 * weights[quality]; // assuming qualities range from 0 to 5
		});

		// Add the current user's weighted difference sum to the overall sum
		diffSum += userDiffSum;
		maxDiffSum += userMaxDiffSum;
	});
	if (c.length < 1) return;
	const total = c
		.map((percent) => parseFloat(percent))
		.reduce((sum, value) => sum + value);
	const average = (total / c.length).toFixed(2);
	// console.log("rezult>",maxDiffSum,diffSum,maxDiffSum);
	// Calculate the overall match percentage by dividing the weighted difference
	// sum by the maximum possible weighted difference sum for all users
	return average + "%";
}

async function matchUsers(user1, user2) {
	if (user1 == "x") return;
	if (user2 == "x" || user2 == undefined || user2 == "undefined") return;
	let weights = {
		Clean: 1,
		Drinking: 1,
		Friendly: 1,
		Responsable: 1,
		Smoking: 1,
	};
	let diffSum = 0;
	let maxDiffSum = 0;

	// Loop through each quality and calculate the absolute difference
	// multiplied by the corresponding weight
	Object.keys(user1).forEach((quality) => {
		let diff = Math.abs(user1[quality] - user2[quality]);
		diffSum += diff * weights[quality];
		maxDiffSum += 5 * weights[quality]; // assuming qualities range from 0 to 5
	});
	// console.log(maxDiffSum, maxDiffSum);
	// Calculate the match percentage by dividing the weighted difference
	// sum by the maximum possible weighted difference sum
	let matchPct = ((maxDiffSum - diffSum) / maxDiffSum) * 100;
	return matchPct.toFixed(2) + "%";
}

export { matchUsers, overallMatch };
