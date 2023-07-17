addLayer("em", {
    name: "Extreme Multiplier",
    symbol: "Em",
    position: 2,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		convert: true,
    }},
    color: "#b16be3",
    resource: "Extreme Multiplier",
	type: "custom",
	requires() { return tmp[this.layer].conversionIn },
	getNextAt() { return tmp[this.layer].conversionIn },
	getResetGain() { return tmp[this.layer].conversionOut.times(tmp[this.layer].baseAmount.div(tmp[this.layer].requires).floor()) },
	canReset() { return player.mm.points.gte(tmp[this.layer].conversionIn) },
	autoPrestige() { return player[this.layer].convert },
	baseAmount() { return player.mm.points },
	baseResource: "Mega Multiplier",
    row: 2,
	displayRow: 0,
    layerShown(){return player.mm.unlocked},
	effect() { return player[this.layer].points.mul(2).max(1) },
	effectDescription() { return `which boosts Cash and Multiplier gain by ${GetEffectText("h2", "x"+format(tmp[this.layer].effect), tmp[this.layer].color)}` },
	tabFormat: {
		Main: {
			content: [
				"main-display",
				["blank", "100px"],
				["display-text", function() { return GetText("h2", "Conversion:", "#ffffff") }],
				["display-text", function() {
					return `${GetEffectText("h2", format(tmp[this.layer].conversionIn), tmp.mm.color)} Mega Multiplier -> ${GetEffectText("h2", format(tmp[this.layer].conversionOut), tmp[this.layer].color)} Extreme Multiplier`
				}],
				["toggle", ["em", "convert"]],
				"blank",
				["upgrades", [1]],
			],
		},
		Milestones: {
			content: [
				"main-display",
				"milestones",
			],
		},
	},
	conversionOut() {
		let amount = new Decimal(1)
		if (hasUpgrade(this.layer, 13)) amount = amount.mul(upgradeEffect(this.layer, 13))
		if (hasUpgrade("um", 12)) amount = amount.mul(tmp.um.effect)
		return amount
	},
	conversionIn() {
		let amount = new Decimal(1000)
		if (hasUpgrade(this.layer, 11)) amount = amount.div(upgradeEffect(this.layer, 11))
		return amount
	},
	branches: [
		["um", function() { return player.um.unlocked ? "#b77ae3" : "#303030" }, 25],
	],
	upgrades: {
		11: {
			title: "Easy?",
			description: "Extreme Multiplier is four times as cheap",
			cost: new Decimal(4),
			effect() { return new Decimal(4) },
			style() { return {"border-radius":"10px 0px 0px 10px"}},
		},
		12: {
			title: "Extreme boost",
			description: "Extreme Multiplier boosts Mega Multiplier gain",
			cost: new Decimal(25),
		},
		13: {
			title: "Ten",
			description: "x10 Extreme Multiplier gain",
			cost: new Decimal(100),
			effect() { return new Decimal(10) },
			style() { return {"border-radius":"0px 10px 10px 0px"}},
		},
	},
	milestones: {
		0: {
			requirementDescription: "1 Extreme Multiplier",
			effectDescription: "Unlock 2nd row of Mega Multiplier upgrades.",
			done() { return player.em.points.gte(1) },
			style() { return {"border-radius":"10px 10px 0px 0px"}}
		},
		1: {
			requirementDescription: "2 Extreme Multiplier",
			effectDescription: "Keep the 1st Mega Multiplier milestone on EM resets.",
			done() { return player.em.points.gte(2) },
		},
		2: {
			requirementDescription: "3 Extreme Multiplier",
			effectDescription: "Keep the 1st Mega Multiplier upgrade on EM resets.",
			done() { return player.em.points.gte(3) },
		},
		3: {
			requirementDescription: "4 Extreme Multiplier",
			effectDescription: "Keep all Mega Multiplier milestones and 2nd Mega Multiplier upgrade on EM resets.",
			done() { return player.em.points.gte(4) },
		},
		4: {
			requirementDescription: "10 Extreme Multiplier",
			effectDescription: "Keep all Mega Multiplier upgrades on EM resets.",
			done() { return player.em.points.gte(10) },
			style() { return {"border-radius":"0px 0px 10px 10px"}}
		},
	},
	doReset(layer) {
		let keep = [];
		if (layer == this.layer) {
			keep.push("points")
			keep.push("milestones")
			keep.push("upgrades")
		}
		if (hasMilestone("um", 3)) keep.push("milestones")
		if (hasMilestone("um", 6)) keep.push("upgrades")
		keep.push("convert")
		layerDataReset(this.layer, keep)
		if (!hasMilestone("um", 6)) {
			if (hasMilestone("um", 4)) player[this.layer].upgrades.push(11)
			if (hasMilestone("um", 5)) player[this.layer].upgrades.push(12)
		}
	},
})
