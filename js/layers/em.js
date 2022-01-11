addLayer("em", {
    name: "Extreme Multiplier",
    symbol: "Em",
    position: 2,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#b16be3",
    resource: "Extreme Multiplier",
	type: "custom",
	requires() { return tmp[this.layer].conversionIn },
	getNextAt() { return tmp[this.layer].conversionIn },
	getResetGain() { return tmp[this.layer].conversionOut },
	canReset() { return player.mm.points.gte(tmp[this.layer].conversionIn) },
	autoPrestige() { return true },
	baseAmount() { return player.mm.points },
	baseResource: "Mega Multiplier",
    row: 0,
    layerShown(){return player.mm.unlocked},
	effect() { return player[this.layer].points.mul(2).max(1) },
	effectDescription() { return `which boosts Cash gain by ${GetEffectText("h2", "x"+format(tmp[this.layer].effect), tmp[this.layer].color)}` },
	tabFormat: {
		Main: {
			content: [
				"main-display",
				["blank", "100px"],
				["display-text", function() { return GetText("h2", "Conversion:", "#ffffff") }],
				["display-text", function() {
					return `${GetEffectText("h2", format(tmp[this.layer].conversionIn), tmp.mm.color)} Mega Multiplier -> ${GetEffectText("h2", format(tmp[this.layer].conversionOut), tmp[this.layer].color)} Extreme Multiplier`
				}],
			],
		},
	},
	conversionOut() {
		return new Decimal(1)
	},
	conversionIn() {
		let amount = new Decimal(1000)
		return amount
	},
	doReset(layer) {
		let keep = [];
		if (layer == this.layer || layer == "m" || layer == "mm") {
			keep.push("points")
		}
		layerDataReset(this.layer, keep)
	},
})
