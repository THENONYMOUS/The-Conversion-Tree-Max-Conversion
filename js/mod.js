let modInfo = {
	name: "The Conversion Tree",
	id: "TheConversionTree",
	author: "Patfr",
	pointsName: "Cash",
	modFiles: ["layers/m.js", "layers/mm.js", "func.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0),
	pointColor: "#16cf0c",
	offlineLimit: 0,
}

let VERSION = {
	num: "0.1",
	name: "Release",
}

let changelog = `<h1>Changelog:</h1><br>
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
	return gain
}

function addedPlayerData() { return {
}}

var displayThings = [
]

function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}

var backgroundStyle = {

}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
}