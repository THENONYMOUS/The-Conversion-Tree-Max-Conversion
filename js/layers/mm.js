addLayer("mm", {
    name: "Mega Multiplier",
    symbol: "Mm",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		convert: true,
    }},
    color: "#ac4df0",
    resource: "Mega Multiplier",
	type: "custom",
	requires() { return tmp[this.layer].conversionIn },
	getNextAt() { return tmp[this.layer].conversionIn },
	getResetGain() { return tmp[this.layer].conversionOut },
	canReset() { return player.m.points.gte(tmp[this.layer].conversionIn) },
	autoPrestige() { return player[this.layer].convert },
	baseAmount() { return player.m.points },
	baseResource: "Multiplier",
    row: 0,
    layerShown(){return player.m.unlocked},
	effect() { return player[this.layer].points.mul(2).max(1) },
	effectDescription() { return `which boosts Cash gain by ${GetEffectText("h2", "x"+format(tmp[this.layer].effect), tmp[this.layer].color)}` },
	tabFormat: {
		Main: {
			content: [
				"main-display",
				["blank", "100px"],
				["display-text", function() { return GetText("h2", "Conversion:", "#ffffff") }],
				["display-text", function() {
					return `${GetEffectText("h2", format(tmp[this.layer].conversionIn), tmp.m.color)} Multiplier -> ${GetEffectText("h2", format(tmp[this.layer].conversionOut), tmp[this.layer].color)} Mega Multiplier`
				}],
				["toggle", ["mm", "convert"]],
				"blank",
				["upgrades", 1],
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
		return new Decimal(1)
	},
	conversionIn() {
		let amount = new Decimal(500)
		if (hasUpgrade(this.layer, 11)) amount = amount.div(upgradeEffect(this.layer, 11))
		return amount
	},
	branches: [
		["em", function() { return player.em.unlocked ? "#af5cea" : "#303030" }, 25],
	],
	upgrades: {
		11: {
			title: "Why not sooner?",
			description: "Mega Multiplier is five times as cheap",
			cost: new Decimal(5),
			effect() { return new Decimal(5) },
			style() { return {"border-radius":"10px 0px 0px 10px"}},
		},
		12: {
			title: "More?",
			description: "Unlock 2nd row of Multiplier upgrades",
			cost: new Decimal(10),
			style() { return {"border-radius":"0px 10px 10px 0px"}}
		},
	},
	milestones: {
		0: {
			requirementDescription: "2 Mega Multiplier",
			effectDescription: "Keep the 1st Multiplier upgrade on MM resets.",
			done() { return player.mm.points.gte(2) },
			style() { return {"border-radius":"10px 10px 0px 0px"}}
		},
		1: {
			requirementDescription: "4 Mega Multiplier",
			effectDescription: "Keep the 2nd Multiplier upgrade on MM resets.",
			done() { return player.mm.points.gte(4) },
		},
		2: {
			requirementDescription: "6 Mega Multiplier",
			effectDescription: "Keep the 3rd Multiplier upgrade on MM resets.",
			done() { return player.mm.points.gte(6) },
		},
		3: {
			requirementDescription: "10 Mega Multiplier",
			effectDescription: "Keep the all Multiplier upgrade on MM resets.",
			done() { return player.mm.points.gte(10) },
			style() { return {"border-radius":"0px 0px 10px 10px"}}
		},
	},
	doReset(layer) {
		let keep = [];
		if (layer == this.layer || layer == "m") {
			keep.push("points")
			keep.push("upgrades")
			keep.push("milestones")
		}
		keep.push("convert")
		layerDataReset(this.layer, keep)
	},
})
