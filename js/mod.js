let modInfo = {
	name: "The Conversion Tree",
	id: "TheConversionTree",
	author: "Patfr",
	pointsName: "Cash",
	modFiles: ["layers/m.js", "layers/mm.js", "layers/em.js", "func.js", "tree.js"],

	discordName: "My discord server",
	discordLink: "https://discord.gg/7ahtMyv5hX",
	initialStartPoints: new Decimal (0),
	pointColor: "#16cf0c",
	offlineLimit: 0,
}

let VERSION = {
	num: "0.2",
	name: "Extreme",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h3>v0.2</h3><br>
		- Added Extreme Multiplier.<br>
		- Added more upgrades to Multiplier and Mega Multiplier layers.<br>
	<h3>v0.15</h3><br>
		- Added more content to Mega Multiplier.<br>
	<br>
	<h3>v0.1</h3><br>
		- Added 2 layers.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints(){
	return true
}

function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("m", 11)) gain = gain.mul(upgradeEffect("m", 11))
	if (hasUpgrade("m", 12)) gain = gain.mul(upgradeEffect("m", 12))
	if (hasUpgrade("m", 14)) gain = gain.mul(tmp.m.effect)
	gain = gain.mul(tmp.mm.effect)
	return gain
}

function addedPlayerData() { return {
}}

var displayThings = [
	"<br>",
	function() { return `<h3>Current Endgame:</h3> ${GetEffectText("h3", 1, tmp.em.color)} Extreme Multiplier` },
]

function isEndgame() {
	return player.em.points.gte(new Decimal(1))
}

var backgroundStyle = {

}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
}