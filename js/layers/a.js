addLayer("a", {
    name: "Achievements",
    symbol: "A",
    startData() { return {
        unlocked: true,
    }},
    color: "#ffff00",
    row: "side",
	type: "none",
	tooltip: "Achievements",
    layerShown(){return true},
	tabFormat: [
		["display-text", "<h1>Achievements</h1>"],
		"blank",
		"achievements",
	],
	achievements: {
		11: {
			name: "Slow?",
			done() { return player.m.points.gte(1) },
			tooltip: "Get 1 Multiplier",
			style() { return hasAchievement(this.layer, 15) ? {"border-radius":"10px 0px 0px 0px"} : {"border-radius":"10px 0px 0px 10px"} },
		},
		12: {
			name: "Why so greedy?",
			done() { return hasUpgrade("m", 12) },
			tooltip: "Get the 2nd Multiplier upgrade",
		},
		13: {
			name: "It's not cheap?",
			done() { return hasUpgrade("m", 13) },
			tooltip: "Get the 3rd Multiplier upgrade",
		},
		14: {
			name: "Inflation so soon?",
			done() { return hasUpgrade("m", 14) },
			tooltip: "Get the 4th Multiplier upgrade",
		},
		15: {
			name: "Half",
			done() { return player.m.points.gte(250) },
			tooltip: "Get 250 Multiplier",
			style() { return hasAchievement(this.layer, 15) ? {"border-radius":"0px 10px 0px 0px"} : {"border-radius":"0px 10px 10px 0px"} },
		},

		21: {
			name: "Mega",
			done() { return player.mm.points.gte(1) },
			tooltip: "Get 1 Mega Multiplier",
			style() { return hasAchievement(this.layer, 25) ? {"border-radius":"0px 0px 0px 0px"} : {"border-radius":"0px 0px 0px 10px"} },
			unlocked() { return hasAchievement(this.layer, 15) },
		},
		22: {
			name: "Milestones",
			done() { return hasMilestone("mm", 0) },
			tooltip: "Get the 1st Mega Multiplier milestone",
			unlocked() { return hasAchievement(this.layer, 15) },
		},
		23: {
			name: "Bad?",
			done() { return hasUpgrade("mm", 11) },
			tooltip: "Get the 1st Mega Multiplier upgrade",
			unlocked() { return hasAchievement(this.layer, 15) },
		},
		24: {
			name: "Can't count",
			done() { return hasMilestone("mm", 2) },
			tooltip: "Get the 3rd Mega Multiplier milestone",
			unlocked() { return hasAchievement(this.layer, 15) },
		},
		25: {
			name: "To the Extreme",
			done() { return hasUpgrade("mm", 12) },
			tooltip: "Get the 2nd Mega Multiplier upgrade",
			style() { return hasAchievement(this.layer, 25) ? {"border-radius":"0px 0px 0px 0px"} : {"border-radius":"0px 0px 10px 0px"} },
			unlocked() { return hasAchievement(this.layer, 15) },
		},
		
		31: {
			name: "Extreme",
			done() { return player.em.points.gte(1) },
			tooltip: "Get 1 Extreme Multiplier",
			style() { return hasAchievement(this.layer, 35) ? {"border-radius":"0px 0px 0px 10px"} : {"border-radius":"0px 0px 0px 10px"} },
			unlocked() { return hasAchievement(this.layer, 25) },
		},
		32: {
			name: "Four??",
			done() { return hasUpgrade("em", 11) },
			tooltip: "Get the 1st Extreme Multiplier upgrade",
			unlocked() { return hasAchievement(this.layer, 25) },
		},
		33: {
			name: "Was it bad?",
			done() { return hasMilestone("em", 4) },
			tooltip: "Get the 5th Extreme Multiplier upgrade",
			unlocked() { return hasAchievement(this.layer, 25) },
		},
		34: {
			name: "Many",
			done() { return hasUpgrade("em", 12) },
			tooltip: "Get the 2nd Extreme Multiplier upgrade",
			unlocked() { return hasAchievement(this.layer, 25) },
		},
		35: {
			name: "A lot",
			done() { return hasUpgrade("em", 13) },
			tooltip: "Get the 3rd Extreme Multiplier upgrade",
			style() { return hasAchievement(this.layer, 35) ? {"border-radius":"0px 0px 10px 0px"} : {"border-radius":"0px 0px 10px 0px"} },
			unlocked() { return hasAchievement(this.layer, 25) },
		},
	},
})
