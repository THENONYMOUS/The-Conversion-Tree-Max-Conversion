addLayer("um", {
    name: "Ultra Multiplier",
    symbol: "Um",
    position: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		convert: true,
    }},
    color: "#bd88e3",
    resource: "Ultra Multiplier",
	type: "custom",
	requires() { return tmp[this.layer].conversionIn },
	getNextAt() { return tmp[this.layer].conversionIn },
	getResetGain() { return tmp[this.layer].conversionOut.times(tmp[this.layer].baseAmount.div(tmp[this.layer].requires).floor()) },
	canReset() { return player.em.points.gte(tmp[this.layer].conversionIn) },
	autoPrestige() { return player[this.layer].convert },
	baseAmount() { return player.em.points },
	baseResource: "Extreme Multiplier",
    row: 3,
	displayRow: 0,
    layerShown(){return player.em.unlocked},
	effect() { return player[this.layer].points.mul(2).max(1) },
	effectDescription() { return hasUpgrade(this.layer, 12) ?`which boosts all previous layers gain by ${GetEffectText("h2", "x"+format(tmp[this.layer].effect), tmp[this.layer].color)}` : "" },
	tabFormat: {
		Main: {
			content: [
				"main-display",
				["blank", "100px"],
				["display-text", function() { return GetText("h2", "Conversion:", "#ffffff") }],
				["display-text", function() {
					return `${GetEffectText("h2", format(tmp[this.layer].conversionIn), tmp.em.color)} Extreme Multiplier -> ${GetEffectText("h2", format(tmp[this.layer].conversionOut), tmp[this.layer].color)} Ultra Multiplier`
				}],
				["toggle", ["um", "convert"]],
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
		return amount
	},
	conversionIn() {
		let amount = new Decimal(2500)
		if (hasUpgrade(this.layer, 11)) amount = amount.div(upgradeEffect(this.layer, 11))
		return amount
	},
	branches: [
		["r", function() { return player.r.unlocked ? "#5fa4f1" : "#303030" }, 25],
	],
	upgrades: {
		11: {
			title: "More for less",
			description: "Ultra Multiplier is 2.5 times as cheap",
			cost: new Decimal(10),
			effect() { return new Decimal(2.5) },
			style() { return {"border-radius":"10px 0px 0px 10px"}},
		},
		12: {
			title: "Fast??",
			description: "Unlock Ultra Multiplier boost",
			cost: new Decimal(15),
		},
		13: {
			title: "Ten Again?",
			description: "Ultra Multiplier gain is ten times higher",
			cost: new Decimal(250),
			effect() { return new Decimal(10) },
			style() { return {"border-radius":"0px 10px 10px 0px"}},
		},
	},
	milestones: {
		0: {
			requirementDescription: "1 Ultra Multiplier",
			effectDescription: "Multiplier conversion is free.",
			done() { return player.um.points.gte(1) },
			style() { return {"border-radius":"10px 10px 0px 0px"}}
		},
		1: {
			requirementDescription: "2 Ultra Multiplier",
			effectDescription: "Keep all Multiplier upgrades on UM resets.",
			done() { return player.um.points.gte(2) },
		},
		2: {
			requirementDescription: "3 Ultra Multiplier",
			effectDescription: "Keep all Mega Multiplier milestones on UM resets.",
			done() { return player.um.points.gte(3) },
		},
		3: {
			requirementDescription: "4 Ultra Multiplier",
			effectDescription: "Keep all Extreme Multiplier milestones on UM resets.",
			done() { return player.um.points.gte(4) },
		},
		4: {
			requirementDescription: "5 Ultra Multiplier",
			effectDescription: "Keep the 1st Extreme Multiplier upgrade on UM resets.",
			done() { return player.um.points.gte(5) },
		},
		5: {
			requirementDescription: "7 Ultra Multiplier",
			effectDescription: "Keep the 2nd Extreme Multiplier upgrade on UM resets.",
			done() { return player.um.points.gte(7) },
		},
		6: {
			requirementDescription: "9 Ultra Multiplier",
			effectDescription: "Keep all Extreme Multiplier upgrades on UM resets.",
			done() { return player.um.points.gte(9) },
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
		keep.push("convert")
		layerDataReset(this.layer, keep)
	},
})
