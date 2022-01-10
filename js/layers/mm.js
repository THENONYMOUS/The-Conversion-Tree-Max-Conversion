addLayer("mm", {
    name: "Mega Multiplier",
    symbol: "Mm",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ac4df0",
    resource: "Mega Multiplier",
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
				}]
			],
		},
	},
	conversionOut() {
		return new Decimal(1)
	},
	conversionIn() {
		return new Decimal(1000)
	},
	update() {
		if (player.m.points.gte(tmp[this.layer].conversionIn)) {
			addPoints(this.layer, tmp[this.layer].conversionOut)
			player.m.points = new Decimal(0)
		}
	},
})
