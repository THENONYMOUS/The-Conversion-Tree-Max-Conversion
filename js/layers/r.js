addLayer("r", {
    name: "Rebirth",
    symbol: "R",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		convert: true,
    }},
    color: "#00bfff",
    resource: "Rebirth",
	type: "custom",
	requires() { return tmp[this.layer].conversionIn },
	getNextAt() { return tmp[this.layer].conversionIn },
	getResetGain() { return tmp[this.layer].conversionOut.times(tmp[this.layer].baseAmount.div(tmp[this.layer].requires).floor()) },
	canReset() { return player.um.points.gte(tmp[this.layer].conversionIn) },
	autoPrestige() { return player[this.layer].convert },
	baseAmount() { return player.um.points },
	baseResource: "Ultra Multiplier",
    row: 4,
	displayRow: 1,
    layerShown(){return player.um.unlocked},
	//effect() { return player[this.layer].points.mul(2).max(1) },
	//effectDescription() { return `which boosts Extreme Multiplier gain by ${GetEffectText("h2", "x"+format(tmp[this.layer].effect), tmp[this.layer].color)}` },
	tabFormat: {
		Main: {
			content: [
				"main-display",
				["blank", "100px"],
				["display-text", function() { return GetText("h2", "Conversion:", "#ffffff") }],
				["display-text", function() {
					return `${GetEffectText("h2", format(tmp[this.layer].conversionIn), tmp.um.color)} Ultra Multiplier -> ${GetEffectText("h2", format(tmp[this.layer].conversionOut), tmp[this.layer].color)} Rebirth`
				}],
				["toggle", ["r", "convert"]],
			],
		},
	},
	conversionOut() {
		let amount = new Decimal(1)
		return amount
	},
	conversionIn() {
		let amount = new Decimal(3000)
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
