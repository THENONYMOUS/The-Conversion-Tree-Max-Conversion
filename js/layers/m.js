addLayer("m", {
    name: "Multiplier",
    symbol: "M",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#9403fc",
    resource: "Multiplier",
	type: "custom",
	requires() { return tmp[this.layer].conversionIn },
	getNextAt() { return tmp[this.layer].conversionIn },
	getResetGain() { return tmp[this.layer].conversionOut },
	canReset() { return player.points.gte(tmp[this.layer].conversionIn) },
	autoPrestige() { return true },
	baseAmount() { return player.points },
    row: 0,
    layerShown(){return true},
	effect() { return player[this.layer].points.mul(2).max(1) },
	effectDescription() { return hasUpgrade(this.layer, 14) ?`which boosts Cash gain by ${GetEffectText("h2", "x"+format(tmp[this.layer].effect), tmp[this.layer].color)}` : "" },
	tabFormat: {
		Main: {
			content: [
				"main-display",
				["blank", "100px"],
				["display-text", function() { return GetText("h2", "Conversion:", "#ffffff") }],
				["display-text", function() {
					return `${GetEffectText("h2", format(tmp[this.layer].conversionIn), modInfo.pointColor)} Cash -> ${GetEffectText("h2", format(tmp[this.layer].conversionOut), tmp[this.layer].color)} Multiplier`
				}],
				"blank",
				["upgrades", 1],
			],
		},
		Disclaimer: {
			content: [
				["infobox", "disclaimer"],
			],
		}
	},
	infoboxes: {
		disclaimer: {
			title: "Disclaimer",
			body() { return "This game is meant to be very slow" },
		}
	},
	conversionOut() {
		return new Decimal(1)
	},
	conversionIn() {
		let amount = new Decimal(100)
		if (hasUpgrade(this.layer, 13)) amount = amount.div(upgradeEffect(this.layer, 13))
		return amount
	},
	branches: ["mm"],
	upgrades: {
		11: {
			title: "More",
			description: "Increase Cash gain",
			cost: new Decimal(1),
			effect() { return new Decimal(2) },
			style() { return {"border-radius":"10px 0px 0px 10px"}}
		},
		12: {
			title: "Greed",
			description: "Even more Cash gain",
			cost: new Decimal(2),
			effect() { return new Decimal(5) },
		},
		13: {
			title: "Cheap",
			description: "Conversion is half as exspensive",
			cost: new Decimal(5),
			effect() { return new Decimal(2) },
		},
		14: {
			title: "Inflation?",
			description: "Multiplier boosts Cash gain",
			cost: new Decimal(10),
			style() { return {"border-radius":"0px 10px 10px 0px"}}
		},
	},
	doReset(layer) {
		let keep = [];
		if (layer == this.layer) {
			keep.push("points")
			keep.push("upgrades")
		}
		layerDataReset(this.layer, keep)
		if (hasMilestone("mm", 0)) player[this.layer].upgrades.push(11)
		if (hasMilestone("mm", 1)) player[this.layer].upgrades.push(12)
		if (hasMilestone("mm", 2)) player[this.layer].upgrades.push(13)
		if (hasMilestone("mm", 3)) player[this.layer].upgrades.push(14)
	},
})
