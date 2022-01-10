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
    row: 0,
    layerShown(){return true},
	effect() { return player[this.layer].points.mul(2).max(1) },
	effectDescription() { return `which boosts Cash gain by ${GetEffectText("h2", "x"+format(tmp[this.layer].effect), tmp[this.layer].color)}` },
	tabFormat: {
		Main: {
			content: [
				"main-display",
				["display-text", function() { return GetText("h2", "Conversion:", "#ffffff") }],
				["display-text", function() {
					return `${GetEffectText("h2", format(tmp[this.layer].conversionIn), modInfo.pointColor)} Cash -> ${GetEffectText("h2", format(tmp[this.layer].conversionOut), tmp[this.layer].color)} Multiplier`
				}]
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
		return new Decimal(100)
	},
	update() {
		if (player.points.gte(tmp[this.layer].conversionIn)) {
			addPoints(this.layer, tmp[this.layer].conversionOut)
			player.points = new Decimal(0)
		}
	},
	branches: ["mm"],
})
