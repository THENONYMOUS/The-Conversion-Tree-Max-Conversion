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
	getResetGain() { return tmp[this.layer].conversionOut },
	canReset() { return player.em.points.gte(tmp[this.layer].conversionIn) },
	autoPrestige() { return player[this.layer].convert },
	baseAmount() { return player.em.points },
	baseResource: "Extreme Multiplier",
    row: 3,
	displayRow: 0,
    layerShown(){return player.em.unlocked},
	//effect() { return player[this.layer].points.mul(2).max(1) },
	//effectDescription() { return `which boosts Cash and Multiplier gain by ${GetEffectText("h2", "x"+format(tmp[this.layer].effect), tmp[this.layer].color)}` },
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
			],
		},
	},
	conversionOut() {
		return new Decimal(1)
	},
	conversionIn() {
		let amount = new Decimal(2500)
		return amount
	},
	doReset(layer) {
		let keep = [];
		if (layer == this.layer) {
			keep.push("points")
		}
		keep.push("convert")
		layerDataReset(this.layer, keep)
	},
})
