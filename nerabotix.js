var version = "0.8.4";

var upgrades = 
{
 	"Success": {_var: "taskSolveChance", values: [30, 40, 50, 60, 70, 80, 90, 100], xp: [100, 250, 666, 1000, 1666, 2500, 4000, 6666], info: "Improve your punctuality from $cur% to $next% to complete the tasks"},
 	"Speed": {_var: "taskSolveDuration", values: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0.5, 0.2], xp: [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 1e9, 1e12], info: "Complete the tasks in $next minutes instead of $cur"},
 	"Multitask": {_var: "taskSolveAmount", values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000], xp: [1e5, 2e5, 5e5, 1e6, 1e6, 1e6, 1e6, 1e6, 1e6, 1e7, 2e7, 5e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], info: "Complete $next tasks simultaneously instead of $cur"},
	"Task chance": {_var: "taskChance", values: [20, 30, 40, 50, 60, 70, 80, 90, 100], xp: [100, 250, 666, 1000, 1666, 2500, 4000, 6666, 10000], info: "Increase chance of getting new tasks from $cur% to $next%"},
 	"Task amount": {_var: "taskInterval", values: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0.5, 0.2], xp: [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 1e9, 1e12], info: "You may get new task every $next minutes instead of $cur", onbuy: function(){clock.setInterval(createTask, sets.taskInterval);}},
 	"Moar!!": {_var: "taskIncrement", values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100, 500, 1000, 2000, 5000, 10000], xp: [1e6, 1e7, 1e8, 2e8, 3e8, 4e8, 5e8, 6e8, 8e8, 1e9, 5e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15], info: "Get $next times more tasks instead of $cur"},
 	"Tea drinking": {_var: "teaDuration", values: [18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0.5], xp: [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 1e9, 1e12], info: "Reduce the time of tea drinking from $cur to $next minutes"},
 	"Force of tea": {_var: "teaStrength", values: [15, 20, 25, 30, 35, 40, 45, 50], xp: [100, 250, 500, 1000, 2000, 5000, 10000, 25000], info: "Tea drinking regain $next HP instead of $cur"},
 	"Lunch time": {_var: "lunchDuration", values: [50, 40, 30, 20, 10, 5], xp: [500, 1500, 4000, 6666, 10000, 1e9], info: "Increase chewing speed: lunch takes $next minutes instead of $cur"},
 	"Sleep time": {_var: "baseSleepTime", values: [420, 360, 300, 240, 180, 120, 60], xp: [1000, 2500, 5000, 10000, 25000, 50000, 1e9], info: "Decrease time to full recovery while sleeping from $cur to $next minutes"},
 	"Early morning": {_var: "workBegin", values: ["08:30", "08:00", "07:30", "07:00", "06:30", "06:00"], xp: [1000, 5000, 10000, 50000, 100000, 500000], info: "Work begins at $next, not in $cur"},
 	"Late evening": {_var: "workEnd", values: ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00"], xp: [1000, 5000, 10000, 50000, 100000, 500000], info: "Work ends at $next, not in $cur"},
 	"Quick money": {_var: "salaryPeriod", values: [10, 7, 5, 3, 2, 1], xp: [500000, 1000000, 1500000, 2000000, 2500000, 3000000], info: "Get paid every $next days instead of $cur", onbuy: function(){state.updateMultiplier(1);}},
	"Smart teapot": {_var: "smartTeapot", values: ["smart", "magic"], xp: [1e12, 1e15], info: "Upgrade your teapot from $cur to $next one", visibility: "sets.goodsBought['Teapot'] || 0"},
 	"Coffee cups": {_var: "coffeeCups", values: [2, 5, 10, 100], xp: [1e6, 1e9, 1e12, 1e15], info: "Coffee maker makes $next cups of coffee instead of $cur", visibility: "sets.goodsBought['Coffee maker'] || 0"},
 	"Hardware": {_var: "compSolveAmount", values: [2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100], xp: [1e6, 1e7, 1e8, 1e9, 2e9, 5e9, 1e10, 5e10, 1e11, 1e12, 1e13, 1e14], info: "Upgrade computer hardware to solve $next tasks at once instead of $cur", visibility: "sets.goodsBought['Computer'] || 0"},
 	"Software": {_var: "compDuration", values: [20, 30, 40, 50, 60, 120, 240, 480], xp: [1e6, 1e7, 1e8, 1e9, 1e10, 1e12, 1e14, 1e16], info: "Update computer software to work continuously $next minutes instead of $cur", visibility: "sets.goodsBought['Computer'] || 0"},
 	"Barman": {_var: "mixDuration", values: [25, 20, 15, 10, 5], xp: [1e6, 1e8, 1e10, 1e12, 1e14], info: "Increase the speed of coctail mixing from $cur to $next minutes", visibility: "sets.goodsBought['Shaker'] || 0"},
 	"WatchApp": {_var: "watchApp", values: ["ver 2.0", "ver 3.0"], xp: [1e12, 1e18], info: "Upgrade your SmartWatch from $cur to $next", visibility: "sets.goodsBought['SmartWatch'] || 0"}
};
var upgItems = [];

var achievements = 
{
	"Clerk": 			{mult: 1.01, xp: 100, 		info: "Complete 10 tasks", expr: "state.tasksCompleted", value: 10},
	"Worker": 			{mult: 1.05, xp: 1000, 		info: "Complete 100 tasks", expr: "state.tasksCompleted", value: 100},
	"Senior": 			{mult: 1.10, xp: 10000,		info: "Complete 1000 tasks", expr: "state.tasksCompleted", value: 1000},
	"Master": 			{mult: 1.20, xp: 1e9,		info: "Complete 1M tasks", expr: "state.tasksCompleted", value: 1e6},
	"Freak": 			{mult: 1.50, xp: 1e12,		info: "Complete 1B tasks", expr: "state.tasksCompleted", value: 1e9},
	"Monster": 			{mult: 1.50, xp: 1e15,		info: "Complete 1T tasks", expr: "state.tasksCompleted", value: 1e12},
	"Working hard": 	{mult: 1.05, xp: 10000,		info: "Do work 1000 times", expr: "state.doWorkCount", value: 1000},
	"Working insane":	{mult: 1.50, xp: 1e12,		info: "Do work 1M times", expr: "state.doWorkCount", value: 1e6},
	"Epic fail": 		{mult: 1.05, xp: 1e6,		info: "Fail 1000 tasks", expr: "state.failCount", value: 1000},
	"Loser": 			{mult: 1.05, xp: 500, 		info: "Fail the task 15 times in a row", expr: "state.loserCount", value: 15},
	"Perfectionist":	{mult: 1.10, xp: 5000, 		info: "No more fails"},
	"Mr. Speedy": 		{mult: 1.10, xp: 5000, 		info: "Complete the task just in a minute"},
	"Omnidexter": 		{mult: 1.05, xp: 20000, 	info: "Complete 2 tasks simultaneously"},
	"Kraken": 			{mult: 1.10, xp: 500000, 	info: "Complete 8 tasks simultaneously"},
	"Tea time": 		{mult: 1.01, xp: 100, 		info: "Take a tea 10 times", expr: "state.teaCount", value: 10},
	"Tea cheer": 		{mult: 1.05, xp: 1000, 		info: "Take a tea 100 times", expr: "state.teaCount", value: 100},
	"Tea party": 		{mult: 1.10, xp: 10000,		info: "Take a tea 1000 times", expr: "state.teaCount", value: 1000},
	"Business lunch":	{mult: 1.01, xp: 100, 		info: "Have a lunch 10 times", expr: "state.lunchCount", value: 10},
	"Heavy eater": 		{mult: 1.05, xp: 1000, 		info: "Have a lunch 100 times", expr: "state.lunchCount", value: 100},
	"Om-nom-nom": 		{mult: 1.01, xp: 5000, 		info: "Have a lunch 500 times", expr: "state.lunchCount", value: 500},
	"Sleepyhead": 		{mult: 1.05, xp: 1000, 		info: "Sleep 100 times", expr: "state.sleepCount", value: 100},
	"Red eyes": 		{mult: 1.05, xp: 1000, 		info: "Don't be sleepy for 24 hours", expr: "state.noSleepTime", value: 24},
	"The Robot": 		{mult: 1.10, xp: 100000,	info: "Don't be sleepy for 7 days", expr: "state.noSleepTime/24", value: 7},
	"Undead": 			{mult: 1.20, xp: 1000000,	info: "Don't be sleepy for 30 days", expr: "state.noSleepTime/24", value: 30},
	"Working bad":		{mult: 1.01, xp: 10, 		info: "Don't work for 24 hours", expr: "state.noWorkTime/60", value: 24},
	"Sloven":			{mult: 1.02, xp: 1000, 		info: "Don't work for 7 days", expr: "state.noWorkTime/1440", value: 7},
	"What is work?":	{mult: 1.05, xp: 10000,		info: "Don't work for 30 days", expr: "state.noWorkTime/1440", value: 30},
	"Anniversary":		{mult: 1.50, xp: 1e12,		info: "Work in NerabotiX for 1 year", expr: "state.day", value: 365},
	"Millionaire":		{mult: 1.05, xp: 1e12,		info: "Get 1M of money", expr: "state.money", value: 1e6},
	"Billionaire":		{mult: 1.05, xp: 1e15,		info: "Get 1B of money", expr: "state.money", value: 1e9},
	"Professional":		{mult: 2.00, xp: 5e11,		info: "Reach level 100", expr: "state.lvl", value: 100},
	"Advanced user":	{mult: 1.50, xp: 3e12,		info: "Solve 10M tasks with a computer", expr: "state.compSolvedTasks", value: 1e7, hidden: true},
	"Drunkard":			{mult: 1.00, xp: 100500, 	info: "Drink vodka 100 times", expr: "state.vodkaDrunk", value: 100, hidden: true},
	"Workaholic":		{mult: 1.50, xp: 1e12, 		info: "Pass 13 deadlines in a row, no fails allowed!", expr: "state.deadlinesInRow", value: 13},
	"Procrastinator":	{mult: 1.10, xp: 1e12, 		info: "Complete all tasks at the last minute before deadline"},
	"Party maker":		{mult: 1.10, xp: 1e9,		info: "Use shaker to mix 666 cocktails", expr: "state.shakerUsage", value: 666},
	"Shit producer":	{mult: 1.05, xp: 1e9, 		info: "Make 100 pieces of bullshit", expr: "state.bullshitMade", value: 100},
	"Sommelier":		{mult: 1.05, xp: 1e9,		info: "Discover different kinds of bullshit", expr: "state.bullshitKinds.length", value: "bullshitCount()"},
	"Master of Time":	{mult: 1.05, xp: 1e12,		info: "Stop the time...", hidden: true},
	"Boris-ich":		{mult: 1.05, xp: 1e9, 		info: "Punch the Curly One in the face", hidden: true}
};
var achItems = [];

var goods = 
{
	"Coffee":			{cost: 5, 		info: "After coffee you feel less sleepy"},
	"Waffles":			{cost: 5, 		info: "Work takes less HP"},
	"Kvass":			{cost: 20, 		info: "Just drink it and don't ask the questions"},
	"Beer":				{cost: 40,		info: "Has stronger effect than kvass"},
	"Vodka":			{cost: 100,		info: "You seem to drop out of reality"},
	"Milk":				{cost: 30,		info: "Milk is good for your health"},
	"Teapot":			{cost: 500, 	info: "With teapot you can drink tea while working", maxcount: 1},
	"Coffee maker": 	{cost: 1000, 	info: "Makes the cup of aromatic coffee", maxcount: 1},
	"Computer": 		{cost: 5000, 	info: "Work on the tasks for you", maxcount: 5},
	"Overclocker kit": 	{cost: 10000, 	info: "Overclock your computer to achieve unbelievable performance!\nBut this is dangerous! You are warned", maxcount: 5},
	"Shaker": 			{cost: 800, 	info: "You can make some cocktails", maxcount: 1},
	"SmartWatch":		{cost: 3300,	info: "Helps you manage time", maxcount: 1, hidden: true}
};
var goodsItems = [];
var haveItems = [];

var drinks = ["Beer", "Vodka", "Kvass", "Coffee", "Milk", "Yorsh", "Milkshake", "Latte", "Black russian", "White russian"];
//------------------------------------------------------------------------

var sets = 
{
	taskInterval: 10,
	taskChance: 10,
	taskIncrement: 1,
	taskSolveChance: 20,
	taskSolveDuration: 10,
	taskSolveAmount: 1,
	workBegin: "09:00",
	workEnd: "18:00",
	teaDuration: 20,
	teaStrength: 10,
	lunchDuration: 60,
	baseSleepTime: 480,
	roadTime: 40,
	salaryPeriod: 14,
	smartTeapot: "usual",
	coffeeDuration: 10,
	coffeeCups: 1,
	compDuration: 10,
	compSolveAmount: 1,
	mixDuration: 30,
	watchApp: "ver 1.0",
	purchasedUpgrades: {},
	achievementsUnlocked: {},
	goodsBought: {},
};

// class Settings
// {
// 	constructor()
// 	{
// 		this._taskInterval = 10000;
// 		this._taskChance = 10;
// 	}

// 	get taskInterval() {return this._taskInterval;}
// 	set taskInterval(value) {this._taskInterval = value;}
// };

function getXPdeltaForLvl(lvl)
{
	return Math.round((Math.pow(1.125, 2*lvl) - 1) * 37.647);
}

function getXPforLvl(lvl)
{
	var xp = 0;
	for (var i=0; i<=lvl; i++)
		xp += getXPdeltaForLvl(i);
	return Math.round(xp);
}

class State
{
	constructor()
	{
		this._version = version;
		this.step = 0;
		this._multiplier = 1;
		this.jobless = true;

		this.doWorkCount = 0;
		this.failCount = 0;
		this.loserCount = 0;
		this.teaCount = 0;
		this.lunchCount = 0;
		this.sleepCount = 0;
		this.noSleepTime = 0;
		this.noWorkTime = 0;
		this.deadlinesPassed = 0;
		this.deadlinesFailed = 0;
		this.compSolvedTasks = 0;
		this.kvassDrunk = 0;
		this.beerDrunk = 0;
		this.vodkaDrunk = 0;
		this.bullshitMade = 0;
		this.shakerUsage = 0;
		this.bullshitKinds = [];
		this.resetCount = 0;
		this.skill = 0;
		this.timeAtWork = [];

		this.reset();		
		this.load();

		this._setTimestamp = function(value)
		{
			this._timestamp = value;
			if (!this._beginTimestamp)
			{
				this._beginTimestamp = this._timestamp;
				if (clock.time > "18:00" || clock.time < "03:00")
					this._beginTimestamp += 86400000;
			}
		}
	}

	reset()
	{
		this._timestamp = 0;
		this._beginTimestamp = 0;
		this._tasksPending = 0;
		this._tasksCompleted = 0;
		this._XP = 0;
		this._availXP = 0;
		this._HP = 100;
		this._sleepy = 0;
		this._weight = 100; // authority
		this._lvl = 0;
		this.eatFlag = false;
		this.sleepedToday = false;
		this.sleepyMult = 1;
		this._home = false;
		this._money = 0;
		this._baseSalary = 500; // per month
		this._lastSalaryDay = 0;
		this._deadlineDay = 0;
		this._deadlineStartTasks = 0;
		this._workHPmult = 1;
		this.coffeeStrength = 0;
		this.lunchCountAfterSleep = 0;
		this.lastBeSleepy = 0;
		this._compProgress = [0, 0, 0, 0, 0];
		this._compOverclock = [0, 0, 0, 0, 0];
		this._compState = [0, 0, 0, 0, 0];
		this._blackRusActive = 0;
		this._whiteRus = false;
		this._borschActive = 0;
		this._cantWork = false;
		this._uselessWork = false;
		this._checkinActive = false;

		this.deadlinesInRow = 0;
	}

	save()
	{
		if (this.curNpc)
			this._npcState = this.curNpc.state;
		else
			delete this._npcState;
		localStorage["state"] = JSON.stringify(this);
	}

	load()
	{
		var val = localStorage.getItem("state");
		if (val)
		{
			val = JSON.parse(val);
			for (var f in val)
			{
				this[f] = val[f];
			}

			if (this._version != version)
				this._version = version;

			this._isLoaded = true;
			if (this._timestamp)
				clock._timestamp = this._timestamp;
			clock._update();	
			this.XP = this._XP;
			this.HP = this._HP;
			this.sleepy = this._sleepy;
			this.weight = this._weight;
			if (this._npcState)
				this.curNpc = new (eval(this._npcState.name))(this._npcState);
			_oldDay = this.day;
					
			return true;
		}
		this._isLoaded = false;
		return false;
	}

	get loaded() {return this._isLoaded;}

	get timestamp() {return this._timestamp;}	
	get day() {return Math.floor(this._timestamp / 86400000) - Math.floor(this._beginTimestamp / 86400000) + 1;}

	get tasksPending() {return this._tasksPending;}
	set tasksPending(value)
	{
		this._tasksPending = value;
		newTaskItem.value = value;
	}

	get tasksCompleted() {return this._tasksCompleted;}
	set tasksCompleted(value)
	{
		this._tasksCompleted = value;
		compTaskItem.value = value;
	}

	get XP() {return this._XP;}
	set XP(value)
	{
		if (value < this._XP)
			return;
		var delta = value - this._XP;
		this._XP = value;
// 		xpItem.value = this._XP;
		this._availXP += delta;
		availXP.value = beanum(this._availXP);	
		while (this._XP >= getXPforLvl(this._lvl+1))
		{
			this.lvl++;
			if (typeof(onLvlChange) == "function")
				onLvlChange(this._lvl);
		}
		for (var upg in upgItems)
		{
			upgItems[upg].updateAvail();
		}

		var dxp = (this._XP - getXPforLvl(this._lvl)) / getXPdeltaForLvl(this._lvl+1);
		xpProgress.value = dxp * 100;
		xpProgress.text = beanum(this._XP) + "/" + beanum(getXPforLvl(this._lvl+1));
	}

	get availXP() {return this._availXP;}
	spendXP(value)
	{	
		this._availXP -= value;
		availXP.value = beanum(this._availXP);
		for (var upg in upgItems)
		{
			upgItems[upg].updateAvail();
		}
	}

	get HP() {return this._HP;}
	set HP(value)
	{
		hpProgress.value = value;
		this._HP = hpProgress.value;
		hpProgress.text = Math.round(this._HP) + "/" + "100";
	}

	get sleepy() {return this._sleepy;}
	set sleepy(value)
	{
		sleepyProgress.value = value;
		this._sleepy = sleepyProgress.value;
		sleepyProgress.text = Math.floor(this._sleepy) + "/" + "100";
		if (this._sleepy == 100)
			this.lastBeSleepy = 0;
		else if (!this.lastBeSleepy)
			this.lastBeSleepy = this._timestamp;
	}

	get lvl() {return this._lvl;}
	set lvl(value)
	{
		this._lvl = value;
		lvlItem.value = this._lvl;
	}

	get home() {return this._home;}
	set home(value)
	{
		this._home = value;
		if (this._home)
		{
			homeBtn.text = "Go to job";
			setHeader("Home, sweet home :3");
		}
		else
		{
			homeBtn.text = "Go home";
			setHeader("NerabotiX");
		}
	}

	get money() {return this._money;}
	set money(val) 
	{
		this._money = val;
		moneyItem.value = "$" + beanum(this._money);
		for (var name in goodsItems)
			goodsItems[name].update();
		achItems["Millionaire"].update();
		achItems["Billionaire"].update();
	}
	paySalary()
	{
		this.money += this.salary;
		this._lastSalaryDay += sets.salaryPeriod;
		updateAppearance();
		setFooter("You've got the salary for the last "+beaday(sets.salaryPeriod)+": $" + this.salary);
	}
	payAttempt() 
	{ 
		while (this.day - this._lastSalaryDay >= sets.salaryPeriod)
		{
			this.paySalary();
		}
	}
	salaryPayed() {if (this._lastSalaryDay > 0) return true; return false;}

// 	get salaryPeriod() {return sets.salaryPeriod;}
// 	set salaryPeriod(v)
// 	{
// 		sets.salaryPeriod = v;
// 		salaryItem.value = "$"+state.salary+" / "+beaday(state._salaryPeriod);
// 	}

	get multiplier() {return this._multiplier;}
	get salary() {return Math.round(this._baseSalary * (sets.salaryPeriod/30) * this._multiplier)};
	updateMultiplier(value)
	{
		this._multiplier *= value;
		salaryItem.value = "$"+state.salary+" / "+beaday(sets.salaryPeriod);
	}

	get weight() {return this._weight;}
	set weight(value)
	{
		this._weight = value;
		weightProgress.value = this._weight;
		weightProgress.text = Math.floor(this._weight) + "/100";
	}

	get curNpc() {return window._curNpc;}
	set curNpc(npc)
	{
		var oldNpc = window._curNpc;
		if (npc != oldNpc && oldNpc)
		{
			oldNpc.disappear();
		}

		window._curNpc = npc;
		if (npc && (npc instanceof Npc))
		{
			getById("npc").setVisible(true);
			if (started)
				npc.appear();
		}
		else
		{
			getById("npc").setVisible(false);
		}
	}

	get cantWork() {return this._cantWork;}
	set cantWork(v) {this._cantWork = v;}

	overallOverwork()
	{
		var result = 0;
		for (var d in this.timeAtWork)
		{
			if (d == state.day)
				continue;
			var tw = this.timeAtWork[d];
			if (tw)
			{
				var sub = clock.hoursFromTime(clock.timeSub(tw, "09:00"));
				if (tw < "09:00")
					sub = sub - 24;
				result += sub;
			}
		}
		return result;
	}
};

// var settings = new Settings;
//---------------------------------------------------------------------------

var nextStep = 0;
var _oldDay = 0;
var started = false;
//---------------------------------------------------------------------------

var doc;
var header;
var ws;
var items;
var footer;
var tabs={};
//---------------------------------------------------------------------------

function save()
{
	state.save();
	localStorage["sets"] = JSON.stringify(sets);
}

function load()
{
	if (typeof(localStorage["sets"]) != "undefined")
	{
		var arr = JSON.parse(localStorage["sets"]);
		for (var key in arr)
			sets[key] = arr[key];
	}
}
//---------------------------------------------------------------------------

window.onload = function()
{	
	doc = getById("doc");
	stat = getById("stat");
// 	progress = getById("progress");
	tabs["upgrades"] = getById("upgrades");
	tabs["achievements"] = getById("achievements");
	tabs["shop"] = getById("shop");
	activeTab = "";
	header = document.getElementById("header");
	ws = document.getElementById("ws");
	npcDiv = getById("npc");
	items = document.getElementById("items");
	itemsHave = getById("itemsHave");
	footer = document.getElementById("footer");

	setTimeout(() => doc.classList.remove("closed"), 100);

	headerSpan = document.getElementById("caption");
	
	var sel = document.getElementsByClassName("ProgressBar");
	for (var i=0; i<sel.length; i++)
	{
		var e = new ProgressBar(sel[i]);
		//e.visible = false;
	}

	var sel = document.getElementsByClassName("Item");
	for (var i=0; i<sel.length; i++)
	{
		var e = new Item(sel[i]);
	}

	var sel = document.getElementsByClassName("CheckBox");
	for (var i=0; i<sel.length; i++)
		new CheckBox(sel[i]);

	var sel = document.getElementsByTagName("button");
	for (var i=0; i<sel.length; i++)
		new Button(sel[i]);

	var sel = document.getElementsByClassName("Table");
	for (var i=0; i<sel.length; i++)
		new Table(sel[i]);

	userBtn = new Button();
	userBtn.widget.id = "userBtn";

	clock = new Clock();

	load();
	state = new State;

	newTaskItem.value = state.tasksPending;
	compTaskItem.value = state.tasksCompleted;
	nextStep = state.step;
// 	xpItem.value = state.XP;
	hpProgress.value = state.HP;
	sleepyProgress.value = state.sleepy;
	state.weight = state.weight;
	lvlItem.value = state.lvl;
	moneyItem.value = "$"+beanum(state.money);
	salaryItem.value = "$"+state.salary+" / "+beaday(sets.salaryPeriod);
	state.home = state.home;
	skillItem.value = state.skill;

	var verspan = document.createElement("span");
	verspan.id = "version";
	verspan.innerHTML = "&copy; 2016-2023 NerabotiX v" + state._version;
	document.body.appendChild(verspan);

	clock.onnight = function()
	{
		//state.curNpc = null;
		document.body.classList.add("night");
		if (!homeBtn.visible && sleepBtn.visible)
		{
			homeBtn.visible = true;
			homeProgress.visible = true;
			homeBtn.widget.showHint("Workday is round. Go home. Please.");
		}
		state.payAttempt();
		achItems["Anniversary"].update();
	};
	clock.onday = function()
	{
		// document.body.style.transition = "unset";
		// document.body.style.backgroundPositionX = "";
		// getComputedStyle(document.body);
		// document.body.style.transition = "";
		document.body.classList.remove("night");
		document.body.style = "";
		
		if (state.lvl >= 50 && started)
		{
			if (state._deadlineDay == state.day)
			{
				checkDeadline();
			}
			else if (state._deadlineDay < state.day)
			{
				var chance = (state.day - state._deadlineDay) * 100 / 30;
				var chance2 = state.lvl - 50;
				chance = Math.max(chance, chance2);
				if (Math.random() * 100 < chance)
					declareDeadline();
			}
			else
			{
				updateAppearance();
			}
		}
		if (state.lvl >= 100 && started && !state.curNpc)
		{
			var chance = state.lvl - 50;
			var p = Math.random() * 100 < chance;
			if (p)
			{
				var npcCount = Npc.list().length;
				var idx = parseInt(Math.random() * npcCount);
				console.log(Npc.list()[idx]);
				state.curNpc = eval("new " + Npc.list()[idx]);
			}
		}

		if (started && state.weight == 0)
			showFired("authority");
	};

	for (var upg in upgrades)
		upgItems[upg] = new UpgradeItem(upg);
	for (var ach in achievements)
		achItems[ach] = new Achievement(ach);
	for (var key in goods)
		goodsItems[key] = new ShopItem(key);

	var m = 0;
	for (var i=0; i<5; i++)
	{
		var ovc = window["overclock"+i];
		ovc.widget.onclick = overclockCheck;
		if (state._compProgress[i] || state._compState[i])
		{
			state._compState[i] = 1;
			m++;
		}
	}
	for (var i=0; i<5 && (m < (sets.goodsBought["Computer"]||0)); i++)
	{
		if (!state._compState[i])
		{
			state._compState[i] = 1;
			m++;
		}
	}

// 	if (clock.isNight)
// 		clock.onnight();
// 	else
// 		clock.onday();

// 	start();
}

function start()
{
	if (!state.loaded)
	{
		nextStep = 1;
		save();
	}
	else
	{
		state.jobless = false;
	}
	
	header.removeChild(document.getElementById("temp"));

	update();
	updateAppearance();

// 	var sel = document.getElementsByClassName("appearing");
// 	for (var i=0; i<sel.length; i++)
// 		sel[i].style = "";

	getById("headerline").style = "";
	getById("ws").style = "";

// 	getById("stat").style = "";

 	ws.className = "minh";

 	doStep();

	setActiveTab("upgrades");

	clock.setInterval(noWorkUpdate, 1); // 1 in-game minute

	clock.setInterval(update, 0.1); // 0.1 in-game minute
	setInterval(save, 60000); // auto-save every 1 real minute

	if (clock.isNight)
		clock.onnight();
	else
		clock.onday();

	for (var i=0; i<5; i++)
	{
		if (state._compProgress[i] > 0)
		{
			window["compProgress"+i].value = state._compProgress[i];
			window["overclock"+i].checked = state._compOverclock[i];
			startComputer(i);
		}
	}

	setActiveTab("");

	if (state.curNpc)
		state.curNpc.appear();

	started = true;
}

function doStep()
{
	state.step = nextStep;
	updateAppearance();

	if (state.step == 1)
	{
		setHeader("Do you really want to work in Nerabotix?");
		showButton("Yes!");
		nextStep = 2;
	}
	else if (state.step == 2)
	{
		setHeader("");
		clock.widget.showHint("The clock shows current time of the day.\n \
				  But the time runs faster than usual...", doStep);
		if (clock.isNight)
			nextStep = 3;
		else
			nextStep = 5;
	}
	else if (state.step == 3) // nigth
	{
		setHeader("HR department is closed for night. Come back later.")
		showButton("Okay.", function(){
			if (clock.isNight)
				nextStep = 4;
			else
				nextStep = 5;
			doStep();
		});
	}
	else if (state.step == 4)
	{
		clock.widget.showHint("Look at the time!", doStep);
		nextStep = 3;
	}
	else if (state.step == 5)
	{
		setHeader("You become an employee");
		showButton("Okay.");
		state.jobless = false;
		nextStep = 6;
	}
	else if (state.step == 6)
	{
		setFooter("You're waiting for something happens...");
 		nextStep = 7;
	}
	else if (state.step == 7)
	{
		workBtn.widget.showHint("You should work on the task!\n \
				  However your skill is too low yet.");
		nextStep = 8;
	}
	else if (state.step == 8)
	{
		compTaskItem.inner.showHint("You have finished your first task!", doStep);
		nextStep = 9;
	}
	else if (state.step == 9)
	{
		setFooter("Wait for more tasks...");
		nextStep = 10;
		setTimeout(function()
		{
			setFooter("");
			doStep();
		}, 5000);
	}
	else if (state.step == 10)
	{
		teaBtn.widget.showHint("When waiting, you can have a rest\n \
								and take a cup of tea or coffee.", 
								function(){teaBtn.widget.click();});
		nextStep = 11;
	}
	else if (state.step == 11)
	{
		nextStep = 12;
	}
	else if (state.step == 12)
	{
		hpProgress.widget.showHint("Tea helps you regain some HP");
		nextStep = 13;
		setTimeout(doStep, 30000/clock.speed);
	}
	else if (state.step == 13)
	{
		nextStep = 14;
		lunchBtn.widget.showHint("Have a lunch to regain full HP");
	}
	else if (state.step == 14)
	{
		nextStep = 15;
	}
	else if (state.step == 15)
	{
		sleepyProgress.widget.showHint("But you feel more sleepy after eating");
		nextStep = 16;
	}
	else if (state.step == 16)
	{
		sleepBtn.widget.showHint("Now you are tired as a horse\nand should go to sleep");
		if (clock.isNight)
			setTimeout(function()
			{
				updateAppearance();
				homeBtn.widget.showHint("Workday is round. Go home. Please.");
			}, 10000/clock.speed);
		nextStep = 17;
	}

	if (nextStep < 17)
		save();
}

function updateAppearance()
{
	clock.visible = (state.step >= 2);
	clock.enabled = (state.step >= 3);
	newTaskItem.visible = ((state.step == 6) && (state.tasksPending)) || (state.step > 6);
	if (state.step >= 6 && state.step < 15)
		setHeader("The first day on the job");
	workBtn.visible = (state.step >= 7);
	solveProgress.visible = (state.step > 7);
	compTaskItem.visible = (state.step >= 8);
	teaBtn.visible = (state.step >= 10);
	teaProgress.visible = (state.step > 10);
	hpProgress.visible = (state.step > 11);
	lunchBtn.visible = (state.step >= 13);
	lunchProgress.visible = (state.step > 13);
	homeBtn.visible = (sleepBtn.visible) && (clock.isNight || (state.day > 1));
	homeProgress.visible = (homeBtn.visible && state.step > 1);
	sleepyProgress.visible = (state.step >= 15);
	sleepBtn.visible = (state.step >= 16);
	moneyItem.visible = state.salaryPayed();
	salaryItem.visible = moneyItem.visible;

	skillItem.visible = (state.skill > 0);

	weightProgress.visible = (state.deadlinesFailed > 0);
	deadlineItem.visible = (state.deadlinesPassed > 0);

	hpProgress.widget.parentNode.parentNode.setVisible(hpProgress.visible);
	sleepyProgress.widget.parentNode.parentNode.setVisible(sleepyProgress.visible);
	weightProgress.widget.parentNode.parentNode.setVisible(weightProgress.visible);

	coffeeBtn.visible = sets.goodsBought["Coffee maker"] || 0;
	coffeeProgress.visible = coffeeBtn.visible;

	for (var i=0; i<5; i++)
	{
		window["compBtn"+i].visible = state._compState[i] > 0;
		window["compProgress"+i].visible = window["compBtn"+i].visible;
	}

	stoutBtn.visible = sets.goodsBought["Stout"] || false;
	beerBtn.visible = (sets.goodsBought["Beer"] || false);
	vodkaBtn.visible = sets.goodsBought["Vodka"] || false;
	borschBtn.visible = sets.goodsBought["Borsch"] || false;
	yorshBtn.visible = sets.goodsBought["Yorsh"] || false;
	whiteRusBtn.visible = sets.goodsBought["White russian"] || false;
	blackRusBtn.visible = (sets.goodsBought["Black russian"] || false);

	mixBtn.widget.parentNode.parentNode.setVisible(sets.goodsBought['Shaker']);

	checkinBtn.visible = state._checkinActive;

	if ((state.XP > 0 || state.resetCount > 0) && stat.style.display == "none")
	{
		stat.removeAttribute("style");
		setTimeout(() => stat.classList.remove("closed"), 100);
	}

	updateAchieveProgress();

	if (moneyItem.visible)
	{
		showTab("shop");
	}
	for (var name in goodsItems)
		goodsItems[name].update();

	for (var upg in upgItems)
	{
		upgItems[upg].updateAvail();
	}

	var itcnt = 0;
	for (var name in sets.goodsBought)
	{
		if (typeof(haveItems[name]) == "undefined")
		{
			haveItems[name] = new Item(name+":");
			itemsHave.appendChild(haveItems[name].widget);
		}
		if (name == "Teapot" && sets.smartTeapot != "usual")
		{
			haveItems[name].value = sets.goodsBought[name] + " " + sets.smartTeapot;
		}
		else if (name == "SmartWatch" && sets.watchApp != "ver 1.0")
		{
			haveItems[name].value = sets.watchApp;
		}
		else
		{
			haveItems[name].value = sets.goodsBought[name];
		}
		itcnt++;
	}
	if (itcnt > 0)
		itemsHave.style.display = "";

	if (state.step == 6 && !clock.isInterval(createTask))
	{
		clock.setInterval(createTask, sets.taskInterval/10);
	}
	else if (state.step >= 8 && !clock.isInterval(createTask))
	{
		clock.setInterval(createTask, sets.taskInterval);
	}

	if (state._deadlineDay > state.day)
	{
		if (state._deadlineDay - state.day == 1)
			setHeader("Deadline tomorrow! Don't forget to complete all tasks and be at work!");
		else
			setHeader("Deadline in "+beaday(state._deadlineDay - state.day)+"!");
	}
	else if (state._deadlineDay == state.day && clock.time < sets.workBegin && clock.time > "03:00")
	{
		if (state.home)
			setHeader("Deadline at this morning!!! Go to work!");
		else
			setHeader("Deadline at this morning!!!");
	}

	deadlineItem.value = state.deadlinesPassed;

	coffeeChk.visible = ((typeof(sets.goodsBought["Coffee"]) != "undefined") && (sets.goodsBought["Coffee"] > 0));
	wafflesChk.visible = ((typeof(sets.goodsBought["Waffles"]) != "undefined") && (sets.goodsBought["Waffles"] > 0));
	kvassChk.visible = ((typeof(sets.goodsBought["Kvass"]) != "undefined") && (sets.goodsBought["Kvass"] > 0));
	teapotChk.visible = (sets.goodsBought["Teapot"] || false);

	var m = 0;
	for (var i=0; i<5; i++)
	{
		var ovc = window["overclock"+i];
		if (!window["compBtn"+i].visible)
			ovc.checked = false;
		if (ovc.checked && !ovc.disabled)
			m++;
	}
	for (var i=0; i<5; i++)
	{
		var ovc = window["overclock"+i];
		ovc.visible = ((m < (sets.goodsBought["Overclocker kit"] || 0)) && window["compBtn"+i].visible) || ovc.checked;
	}

	var mixAvail = drinks.slice();
	var sel1 = getById("mixItem1");
	var opt1 = sel1.getElementsByTagName("option");
	var sel2 = getById("mixItem2");
	var opt2 = sel2.getElementsByTagName("option");
	for (var i=0; i<opt1.length; i++)
	{
		var opt = opt1[i];
		var val = opt.value;
		if (!(sets.goodsBought[val] || 0))
		{
			sel1.removeChild(opt);
			i--;
		}
		var idx = mixAvail.indexOf(val);
		if (idx >= 0)
			mixAvail[idx] = "";
	}
	for (var i=0; i<opt2.length; i++)
	{
		var opt = opt2[i];
		var val = opt.value;
		if (!(sets.goodsBought[val] || 0))
		{
			sel2.removeChild(opt);
			i--;
		}
	}
	for (var i=0; i<mixAvail.length; i++)
	{
		var val = mixAvail[i];
		if (val != "" && sets.goodsBought[val])
		{
			var opt1 = document.createElement("option");
			opt1.value = val;
			opt1.text = val;
			sel1.appendChild(opt1);
			var opt2 = document.createElement("option");
			opt2.value = val;
			opt2.text = val;
			sel2.appendChild(opt2);
		}
	}

	if (sets.goodsBought["Latte"] || 0)
		coffeeChk.text = "Latte";
	else
		coffeeChk.text = "Coffee";

	if (state._checkinActive)
		goodsItems["SmartWatch"].hidden = false;
	if (sets.goodsBought["SmartWatch"])
	{
		getById("smartWatchTime").setVisible(true);
		updateSmartWatch();
	}
	if (sets.watchApp != "ver 1.0")
	{
		getById("smartWatch2").setVisible(true);
		updateSmartWatch();
	}
}
//---------------------------------------------------------------------------

function setHeader(txt)
{
	headerSpan.innerText = txt;
}

function setFooter(txt)
{
	var div = document.createElement("div");
	div.innerText = txt;
	footer.appendChild(div);

	var _tim = setTimeout(function()
	{
		clearTimeout(_tim);
		footer.removeChild(div);
	}, 10000);

// 	if (typeof(_footer_tim) != "undefined")
// 		clearTimeout(_footer_tim);
// 	footer.innerText = txt;
// 	_footer_tim = setTimeout(function()
// 	{	
// 		footer.innerText = "";
// 		clearTimeout(_footer_tim);
// 		delete _footer_tim;
// 	}, 10000);
}

function showButton(txt)
{
	userBtn.text = txt;
	ws.appendChild(userBtn.widget);
	var args = arguments;
	userBtn.onclick = function()
	{
		ws.removeChild(userBtn.widget);
		if (args.length > 1 && typeof(args[1]) == "function")
			args[1]();
		else
			doStep();
	}
}
//---------------------------------------------------------------------------

function createTask(warpTime)
{
	if (clock.isNight)
		return;

	warpTime = warpTime || 1;

	for (var i=0; i<warpTime; i++)
	{
		if (Math.random() * 100 < sets.taskChance)
		{
			state.tasksPending += sets.taskIncrement;
			if (!compTaskItem.visible)
				updateAppearance();

			if (state.step < 7) // only in tutorial
			{
				if (state.tasksCompleted == 0 && state.tasksPending == 1)
				{
					clock.clearInterval(createTask);
					newTaskItem.inner.showHint("This is your first task", doStep);
				}
			}
		}
	}
}

function doWork()
{
	solveProgress.visible = true;
	workBtn.widget.collapseHint();
	workBtn.widget.disabled = true;
	state.noWorkTime = 0;

	var tim = setInterval(function()
	{
		var cs = clock.speed;
		if (cs < 1)
			cs = 1;			
		var step = cs / sets.taskSolveDuration;
		if ((teaProgress.value && !teapotChk.checked) || lunchProgress.value || (hpProgress.value == 0))
			step = 0;
		solveProgress.value += step;
		if (solveProgress.value == 100)
		{
			clearInterval(tim);
			solveProgress.value = 0;

			onWorkDone();

			state.doWorkCount++;
			achItems["Working hard"].update();
			achItems["Working insane"].update();

			if (teapotChk.checked && (hpProgress.value < 10 || (sets.smartTeapot!="usual" && hpProgress.value < 50)))
			{
				teaBtn.widget.click();
				if (sets.smartTeapot != "usual" && sets.smartTeapot != "smart" && Math.random() < 0.1)
				{
					if (typeof(sets.goodsBought["Kvass"]) == "undefined")
						sets.goodsBought["Kvass"] = 0;
					sets.goodsBought["Kvass"] += 1;
				}
			}
		}
	}, 10);
}

function onWorkDone()
{
	if (state.tasksPending)
		state.XP += state.tasksCompleted * (state.skill + 1);
	if (!state.tasksCompleted || !state.tasksPending)
		state.XP += parseInt(state.skill / 2);

	state.HP -= 10*state._workHPmult;
	var slpts = 5 - state.lunchCountAfterSleep*2;
	if (slpts < 0)
		slpts = 0;
	state.sleepy += slpts;

	checkTask();
}

function checkTask()
{	
	if (state._uselessWork && state.curNpc)
	{
		state.curNpc.work(0.2);
	}
	else if ((Math.random()*100<sets.taskSolveChance && state.tasksPending>0) ||
		(!state.tasksCompleted && state.HP <= 50))
	{
		if (!state.tasksCompleted && !clock.isNight)
			setTimeout(function(){while (!state.tasksPending) createTask();}, 3000);
		var t = Math.min(sets.taskSolveAmount, state.tasksPending)

		if ((state._deadlineDay == state.day) && t && (t == state.tasksPending) && (clock.time < sets.workBegin) && (clock.time >= clock.timeSub(sets.workBegin, "00:01")))
			achItems["Procrastinator"].unlock();

		state.tasksPending -= t;
		state.tasksCompleted += t;
		state.XP += (2*state.tasksCompleted - t) * t * (state.skill+1);
// 		state.sleepy -= 10;
		state.loserCount = 0;

		if ((sets.taskSolveAmount == 2) && achItems["Omnidexter"].locked)
			achItems["Omnidexter"].unlock();
		if ((sets.taskSolveAmount == 8) && achItems["Kraken"].locked)
			achItems["Kraken"].unlock();

		achItems["Clerk"].update();
		achItems["Worker"].update();
		achItems["Senior"].update();
		achItems["Master"].update();
		achItems["Freak"].update();
		achItems["Monster"].update();
		
		if (state.step < 9 && state.tasksCompleted == 1) // first time
		{
			workBtn.widget.collapseHint();
			doStep();
		}
	}
	else if (state.tasksPending>0)
	{
		state.loserCount++;
		state.failCount++;
		
		achItems["Epic fail"].update();
		achItems["Loser"].update();

		if (!state.tasksCompleted)
			workBtn.widget.showHint("You failed to finish the task.\nTry again!");
	}	
	else if (!state.tasksPending && state._deadlineDay == state.day && state.home)
	{
		homeBtn.widget.showHint("You must go to the job to submit a report by deadline");
	}
}

function tea()
{
	teaBtn.widget.collapseHint();
	teaBtn.widget.disabled = true;

	if (!teaProgress.visible)
	{
		teaProgress.visible = true;
		if (state.step < 13)
		{
			workBtn.widget.showHint("But you can't work at the same time");
			doStep();
		}
	}

	var tim = setInterval(function()
	{
		var cs = clock.speed;
		if (cs < 1)
			cs = 1;	
		var step = cs / sets.teaDuration;
		teaProgress.value += step;
		if (state.step < 14)
		{
			if (teaProgress.value > 65 && !hpProgress.visible)
				doStep();
		}
		if (teaProgress.value == 100)
		{
			teaProgress.value = 0;
			clearInterval(tim);

			if (coffeeChk.checked)
				useItem(coffeeChk.text);			
			if (wafflesChk.checked)
				useItem("Waffles");
			if (kvassChk.checked)
				useItem("Kvass");

			state.HP += sets.teaStrength - state.coffeeStrength;
			state.sleepy -= state.coffeeStrength;

			state.teaCount++;

			achItems["Tea time"].update();
			achItems["Tea cheer"].update();
			achItems["Tea party"].update();
		}
	}, 10);
}

function lunch()
{
	lunchBtn.widget.collapseHint();
	lunchBtn.widget.disabled = true;
	state.eatFlag = true;

	if (!lunchProgress.visible)
	{
		lunchProgress.visible = true;
		if (state.step < 15)
		{
			lunchBtn.widget.showHint("Om-nom-nom");
			doStep();
		}
	}

	var tim = setInterval(function()
	{
		var step = clock.speed / sets.lunchDuration;
		lunchProgress.value += step;
		if (state.step < 16)
		{
			if (lunchProgress.value > 80 && !sleepyProgress.visible)
				doStep();
		}

		if (lunchProgress.value == 100)
		{
			lunchProgress.value = 0;
			clearInterval(tim);
			state.HP = 100;
			state.sleepy += 20;
			state.lunchCountAfterSleep = 5;

			state.lunchCount++;
			achItems["Business lunch"].update();
			achItems["Heavy eater"].update();
			achItems["Om-nom-nom"].update();
		}
	}, 10);
}
//---------------------------------------------------------------------------

function update(warpCount)
{	
	warpCount = warpCount || 1;

	if (state.curNpc)
	{
		state.curNpc.update(warpCount);
	}

	if (state.sleepy < 100)
	{ 
		if (lunchBtn.visible)
			state.sleepy += 0.02 * warpCount * (state.coffeeStrength/5 + 1);
	}
	else if (!sleepBtn.visible && state.step < 17)
	{
		doStep();
	}

    var busy = solveProgress.value || (teaProgress.value && !teapotChk.checked) || lunchProgress.value || homeProgress.value;

 	workBtn.widget.disabled = busy || (hpProgress.value < 10) || (sleepyProgress.value == 100) || state._blackRusActive || state.cantWork;// || clock.isNight;

 	busy = busy || teaProgress.value;

  	teaBtn.widget.disabled = teaProgress.value || lunchProgress.value || homeProgress.value || (sleepyProgress.value == 100);

  	lunchBtn.widget.disabled = teaProgress.value || lunchProgress.value || homeProgress.value || (sleepyProgress.value == 100) || state.eatFlag;

	if (clock.time >= "03:00" && clock.time < "11:00" && lunchBtn.text != "Breakfast")
	{
		lunchBtn.text = "Breakfast";
		state.eatFlag = false;
	}
	else if (clock.time >= "11:00" && clock.time < "19:00" && lunchBtn.text != "Lunch")
	{
		lunchBtn.text = "Lunch";
		state.eatFlag = false;
	}
	else if ((clock.time >= "19:00" || clock.time < "03:00") && lunchBtn.text != "Dinner")
	{
		lunchBtn.text = "Dinner";
		state.eatFlag = false;
	}

	sleepBtn.widget.disabled = busy || (state.sleepy < 20);

	homeBtn.widget.disabled = busy || (sleepyProgress.value == 100);
	checkinBtn.widget.disabled = busy || (sleepyProgress.value == 100) || state.home || checkinBtn.piupiu;

	coffeeBtn.widget.disabled = (coffeeProgress.value) || (sleepyProgress.value == 100);
	mixBtn.widget.disabled = (mixProgress.value) || (sleepyProgress.value == 100);

	beerBtn.widget.disabled = (hpProgress.value == 0) || (sleepyProgress.value == 100);
	stoutBtn.widget.disabled = (hpProgress.value == 0) || (sleepyProgress.value == 100);
	vodkaBtn.widget.disabled = (hpProgress.value == 0) || (sleepyProgress.value == 100);
	yorshBtn.widget.disabled = (hpProgress.value == 0) || (sleepyProgress.value == 100);
	blackRusBtn.widget.disabled = (hpProgress.value == 0) || (sleepyProgress.value == 100);
	whiteRusBtn.widget.disabled = (hpProgress.value == 0) || (sleepyProgress.value == 100);
	borschBtn.widget.disabled = (sleepyProgress.value == 100) || state._borschActive;

	dayItem.value = state.day;
	dayItem.visible = state.day > 1;

	if (_oldDay != state.day && state.day > 0)
	{
		_oldDay = state.day;
		onNewDay();
	}

	var achFlag = false;
	for (var key in sets.achievementsUnlocked)
	{
		achFlag = true;
		break;
	}
	if (achFlag)
	{
		showTab("achievements");		
	}

	if (state.XP >= 100)
	{
		showTab("upgrades");
	}

	if (state.lastBeSleepy)
	{
		state.noSleepTime = (state.timestamp - state.lastBeSleepy) / 3600000;
		achItems["Red eyes"].update();
		achItems["The Robot"].update();
		achItems["Undead"].update();
	}

	for (var i=0; i<warpCount; i++)
	{
		state._workHPmult = state._workHPmult * 0.995 + 1 * 0.005;
		state.coffeeStrength = state.coffeeStrength * 0.99;
		state.lunchCountAfterSleep *= 0.999;
	}

	if (state._blackRusActive)
	{
		state._blackRusActive--;
		solveProgress.color = "black";
		solveProgress.value = 100 - state._blackRusActive;
		if (state.HP && state.sleepy != 100)
		{
			onWorkDone();
			if (state._whiteRus)
				state.HP += 9;
		}

		if (!state._blackRusActive)
		{
			solveProgress.color = "";
			solveProgress.value = 0;
		}
	}

	if (state._borschActive)
	{
		state._borschActive--;
		state.HP++;
		state.sleepy += 0.2;
		state.lunchCountAfterSleep += 0.05;			
	}

	if (clock.isNight)
	{
		let p = clock.percentOfNight;
		document.body.style.backgroundPositionX = `${p}vw`;
	}
}
//---------------------------------------------------------------------------

function sleep()
{
	sleepBtn.widget.disabled = true;
	sleepBtn.widget.collapseHint();
	if (state.step == 16)
		doStep();

	var sleepTime = sets.baseSleepTime * state.sleepy / 100;
	if (!state.home)
	{
		sleepTime *= 0.1 + Math.random()*0.1;
	}

	doc.classList.add("closed");

	var sleepyBeforeSleep = state.sleepy;

 	setTimeout(function()
 	{
		clock.warpTime(sleepTime);
		this.lastBeSleepy = this._timestamp;
		state._workHPmult = 1;
		state.coffeeStrength = 0;		
		state.lunchCountAfterSleep = 0;
		var pts = sleepTime*100/sets.baseSleepTime;
		state.HP -= pts;
		state.sleepy = sleepyBeforeSleep - pts;
		state.sleepedToday = true;
		state.sleepCount++;
		
		achItems["Sleepyhead"].update();
		if (state.home)
		{
			state.eatFlag = false;
		}
		else
		{
			setFooter("Someone nasty woke you up! Go home if you want to sleep deeply.");
		}

		save();

		doc.classList.remove("closed");

 	}, 2000);
}

function onNewDay()
{
	state.sleepedToday = false;

	delete state._checkinBegin;
	if (state._checkinActive)
		state.timeAtWork[state.day] = "00:00";
	updateSmartWatch();
}

function goHome()
{
	if (state.step == 1)
	{
		homeBtn.visible = false;
		userBtn.widget.showHint("You have no choice :)");
	}
	else
	{
		homeBtn.widget.disabled = true;

		var tim = setInterval(function()
		{
			var step = clock.speed / sets.roadTime;
			homeProgress.value += step;
			if (homeProgress.value == 100)
			{
				homeProgress.value = 0;
				clearInterval(tim);
				state.home = !state.home;

				updateAppearance();
			}
		}, 10);
	}
}

function checkin()
{
	checkinBtn.piupiu = true;
	checkinBtn.text = "Pew-pew-";
	setTimeout(function()
	{
		checkinBtn.piupiu = false;
// 		if (!state._checkinBegin)
			checkinBtn.text = "Check in";
// 		else
// 			checkinBtn.text = "Check out";
	}, 5000);
	if (!state._checkinBegin)
		state._checkinBegin = clock.time;
	else
		state.timeAtWork[state.day] = clock.timeSub(clock.time, state._checkinBegin);
	updateSmartWatch();
}

function updateSmartWatch()
{
	var tw = state.timeAtWork[state.day];
	if (tw)
	{
		var span = getById("smartWatchTime");
		span.innerText = tw;
		if (!state._checkinBegin)
			span.innerText = "--:--";
		var hint = "SmartWatch";
		span.style.color = (tw < "09:00")? "red": "green";

		if (!state._checkinBegin)
			hint = "SmartWatch: Don't forget to check in";
		else if (tw == "00:00")
			hint = "SmartWatch: You're at work since " + state._checkinBegin + ". Don't forget to check out";
		else
			hint = "SmartWatch: You worked from " + state._checkinBegin + " to " + clock.timeSum(state._checkinBegin, tw);
		span.title = hint;

		var ow = parseInt(state.overallOverwork());
		var span2 = getById("smartWatch2");
		span2.innerText = ow + "h";
		span2.style.color = (ow < 0)? "red": "green";
	}
}
//---------------------------------------------------------------------------

function onLvlChange(lvl)
{
	state.sleepy -= 20;
	state.HP += 20;
	achItems["Professional"].update();
	save();
	setFooter("You earned the next level");
}
//---------------------------------------------------------------------------

function updateAchieveProgress()
{
	var cnt = 0;
	var all = 0;
	for (var ach in achievements)
	{
		all++;
		if (typeof(sets.achievementsUnlocked[ach]) != "undefined")
			cnt++;
	}
	achProgress.value = cnt * 100 / all;
	achProgress.text = cnt + "/" + all;
}
//---------------------------------------------------------------------------

function onUpgradePurchased()
{
	if (upgItems["Success"].isFull() && achItems["Perfectionist"].locked)
		achItems["Perfectionist"].unlock();
	if (upgItems["Speed"].isFull() && achItems["Mr. Speedy"].locked)
		achItems["Mr. Speedy"].unlock();
	updateAppearance();
}

function onItemPurchased(name)
{
	if (name == "Computer")
	{
		for (var i=0; i<5; i++)
		{
			if (state._compState[i] == 0)
			{
				state._compState[i] = 1;
				break;
			}
		}
	}
	updateAppearance();
}
//---------------------------------------------------------------------------

function showTab(name)
{
	if (tabs[name].style.display == "none")
	{
		tabs[name].style.display = "";
		setTimeout(() => setActiveTab(name), 100);
	}
}

function setActiveTab(tab)
{
	if (tab == activeTab)
		return;

	if (!activeTab)
		activeTab = tab;

	let cur = getById(tab);
// 	let old = getById(activeTab);

	for (let name in tabs)
		tabs[name].classList.add("closed");

	if (typeof(_tab_timer) != "undefined")
		clearTimeout(_tab_timer);

	_tab_timer = setTimeout(function()
	{
		for (let name in tabs)
			tabs[name].removeAttribute("active");
		
		if (cur) // reorder tabs
		{
			cur.setAttribute("active", true);
			document.body.appendChild(cur);
		}

		setTimeout(function()
		{
			for (let name in tabs)
				tabs[name].classList.remove("closed");
		}, 50);
	}, 2000);

	// if (typeof(_tab_timer) != "undefined")
	// 	clearTimeout(_tab_timer);

	// _tab_timer = setTimeout(function()
	// {
	// 	var zidx = 10;
	// 	var pad = 8;
	// 	for (var name in tabs)
	// 	{
	// 		if (name == tab)
	// 			continue;
	// 		tabs[name].style.top = (-tabs[name].getBoundingClientRect().height) + "px";
	// 		tabs[name].children[1].style.display = "none";
	// 		tabs[name].style.zIndex = --zidx;
	// 		tabs[name].style.paddingTop = pad + "px";
	// 		tabs[name].style.top = "0";
	// 		if (tabs[name].style.display != "none")
	// 			pad += 32;
	// 	}
	// 	if (cur)
	// 	{
	// 		cur.style.visibility = "hidden";
	// 		cur.children[1].style.display = "block";
	// 		cur.style.paddingTop = pad + "px";
	// 		cur.style.transitionDuration = "0s";
	// 		cur.style.top = (-cur.getBoundingClientRect().height) + "px";
	// 		cur.style.zIndex = "0";
	// 		setTimeout(function()
	// 		{
	// 			cur.style.visibility = "";
	// 			cur.style.transitionDuration = "";
	// 			cur.style.top = "0";
	// 		}, 50);
	// 	}
	// }, 2000);
	

	activeTab = tab;
}
//---------------------------------------------------------------------------

function useItem(name)
{
	if (typeof(sets.goodsBought[name]) == "undefined")
		return;
	if (sets.goodsBought[name] > 0)
	{
		if (name == "Coffee")
		{
			state.coffeeStrength += 5;
		}
		else if (name == "Latte")
		{
			state.coffeeStrength += 5;
			state.HP += 10;
		}	
		else if (name == "Waffles")
		{
			state._workHPmult *= 0.5;
		}
		else if (name == "Kvass")
		{
			if (clock.speed < 5)
			{
				clock.speed += 1;
				setTimeout(function(){clock.speed -= 1;}, 60000 / clock.speed);
			}
			state.kvassDrunk++;
		}
		else if (name == "Beer")
		{
			if (clock.speed < 10)
			{
				clock.speed += 2;
				setTimeout(function(){clock.speed -= 2;}, 60000 / clock.speed);
			}
			else 
			{
				clock.warpTime(Math.random()*50 + 10);
				state.HP -= 5;
			}
			state.beerDrunk++;
			if (!state.home && !clock.isNight && Math.random() < 0.2)
			{
				state.weight -= 2;
				setFooter("The boss reminded you drinking alcohol at job isn't allowed");
			}
		}
		else if (name == "Stout")
		{
			if (clock.speed > 0)
			{
				var nsp = clock.speed / 2;
				if (nsp < 0.001)
					nsp = clock.speed;
				clock.speed -= nsp;
				if (!clock.speed)
					achItems["Master of Time"].unlock();
				setTimeout(function(){clock.speed += nsp;}, 5000 * (clock.speed*12 + 1));
			}
			if (!state.home && !clock.isNight && Math.random() < 0.2)
			{
				state.weight -= 2;
				setFooter("The boss reminded you drinking alcohol at job isn't allowed");
			}
		}
		else if (name == "Vodka")
		{
			state.vodkaDrunk++;
			var t = Math.round(Math.random()*480 + 120);
			clock.warpTime(t);
			state.HP -= 20;
			setFooter("You were drunk for " + beaday(t/1440));
			if (!state.home && !clock.isNight && Math.random() < 0.2)
			{
				state.weight -= 5;
				setFooter("The boss found you drunk and disappointed in you");
			}
		}
		else if (name == "Yorsh")
		{
			var t = Math.round(Math.random()*960 + 480);
			clock.warpTime(t);
			state.HP = 0;
			setFooter("You were drunk for " + beaday(t/1440));
			if (!state.home && !clock.isNight && Math.random() < 0.5)
			{
				state.weight -= 5;
				setFooter("The boss found you drunk and disappointed in you");
			}
		}
		else if (name == "Black russian")
		{
			state._blackRusActive = 100;
			state._whiteRus = false;
			if (!state.home && !clock.isNight && Math.random() < 0.2)
			{
				state.weight -= 2;
				setFooter("The boss reminded you drinking alcohol at job isn't allowed");
			}
		}
		else if (name == "White russian")
		{
			state._blackRusActive = 100;
			state._whiteRus = true;
			if (!state.home && !clock.isNight && Math.random() < 0.2)
			{
				state.weight -= 2;
				setFooter("The boss reminded you drinking alcohol at job isn't allowed");
			}
		}
		else if (name == "Borsch")
		{
			state._borschActive = 100;
		}

		sets.goodsBought[name]--;
		updateAppearance();
	}	
}
//---------------------------------------------------------------------------

function noWorkUpdate(warpCount)
{
	state.noWorkTime += warpCount;
	achItems["Working bad"].update();
	achItems["Sloven"].update();
	achItems["What is work?"].update();
}
//---------------------------------------------------------------------------

function declareDeadline()
{
	var maxdays = (190 - state.lvl) / 20;
	var d = Math.round(Math.random()*maxdays + 1);
	state._deadlineDay = state.day + d;
	state._deadlineStartTasks = state.tasksCompleted;
	setFooter("Deadline is coming!");
	newTaskItem.widget.showHint("You must complete all tasks by deadline!");
	updateAppearance();
}

function checkDeadline()
{
	if (state.tasksPending == 0 && !state.home)
	{
		var t = state.tasksCompleted - state._deadlineStartTasks;
		var m = t / 1000;
		state.money += m;
		state.deadlinesPassed++;
		state.deadlinesInRow++;
		achItems["Workaholic"].update();
		setFooter("You pass the deadline and boss give you a bonus: $"+m);
	}
	else
	{
		state.deadlinesFailed++;
		state.deadlinesInRow = 0;
		state.weight -= 10;
		if (state.weight < 0)
			state.weight = 0;
		if (state.home)
			setFooter("You did not come to work by the deadline and boss changed his mind about you");
		else
			setFooter("You failed the deadline and boss changed his mind about you");
	}
	state.home = state.home;
	updateAppearance();
}
//---------------------------------------------------------------------------

function makeCoffee()
{
	coffeeBtn.widget.disabled = true;
	var coffeeTim = function(warpCount)
	{
		var step = warpCount / sets.coffeeDuration;
		coffeeProgress.value += step;
		if (coffeeProgress.value == 100)
		{
			coffeeProgress.value = 0;
			clock.clearInterval(coffeeTim);
			if (typeof(sets.goodsBought["Coffee"]) == "undefined")
				sets.goodsBought["Coffee"] = 0;
			sets.goodsBought["Coffee"] += sets.coffeeCups;
			updateAppearance();
			coffeeBtn.widget.disabled = false;
		}
	}
	clock.setInterval(coffeeTim, 1/100);
}
//---------------------------------------------------------------------------

function startComputer(n)
{
	var btn = window["compBtn"+n];
	var bar = window["compProgress"+n];
	var ovc = window["overclock"+n];

	if (state.cantWork)
	{
		if (!bar.value)
		{
			btn.widget.showHint("Computer doesn't work");
			return;
		}
	}
	

	btn.widget.disabled = true;
	ovc.disabled = true;
	if (ovc.checked)
	{
		bar.color = "#ff4040";
		if (!state._compOverclock[n])
			sets.goodsBought["Overclocker kit"]--;
		state._compOverclock[n] = 1;
	}
	else
	{
		bar.color = "";
	}

	var f = function(warpCount)
	{
		var cnt = warpCount;
// 		if (clock.speed < 1)
// 			cnt /= clock.speed;

		if (state.cantWork)
		{
			bar.value = 100;
			btn.widget.showHint("Computer doesn't work");
		}

		var step = cnt / sets.compDuration;
		var t = cnt * sets.compSolveAmount;
		if (ovc.checked)
			t *= sets.compSolveAmount;
		if (bar.value + step > 100)
			t = parseInt(t * (100 - bar.value) / step);
		t = Math.min(state.tasksPending, t);

		if (state._uselessWork && state.curNpc)
		{
			if (ovc.checked)
				state.curNpc.work(0.01);
			else
				state.curNpc.work(0.001);
		}
		else
		{
			state.tasksPending -= t;
			state.tasksCompleted += t;
			state.compSolvedTasks += t;
		}

		bar.value += step;
		state._compProgress[n] = bar.value;
		if (bar.value == 100)
		{
			bar.value = 0;
			state._compProgress[n] = 0;
			state._compOverclock[n] = 0;
			btn.widget.disabled = false;
			if (ovc.checked)
			{
				sets.goodsBought["Computer"]--;
				state._compState[n] = 0;
				setFooter("One of your computers burned due to overclocking! But you can buy another one");
			}
			ovc.disabled = false;
			ovc.checked = false;
			clock.clearInterval("comp"+n);
			achItems["Advanced user"].update();
			updateAppearance();
		}
	};
	Object.defineProperty(f, "name", {value: "comp"+n})
	clock.setInterval(f, 1/100);

	updateAppearance();
}

function overclockCheck()
{
	updateAppearance();
}
//---------------------------------------------------------------------------------

function showFired(reason)
{
	clock.enabled = false;
	clock.speed = 1;
	var id = window.setTimeout(function() {}, 0);
	while (id--)
    	window.clearTimeout(id);
    var id = window.setInterval(function() {}, 1000);
	while (id--)
    	window.clearInterval(id);

    state.jobless = true;

    var skillmult = Math.sqrt(state.skill + 1);
	var skillad = parseInt(Math.sqrt(state.deadlinesPassed/skillmult + state.resetCount + Math.sqrt(state.lvl / skillmult) + Math.sqrt(Math.max(state.day-1, 0))));
	if (skillad < 1)
		skillad = 1;

	var additionalText = "";
	var reasonText = "";

	if (reason == "authority")
	{
		reasonText = "because you lost the authority";
	}
	else if (reason == "resign")
	{
		skillad = parseInt(Math.sqrt(Math.sqrt(Math.max(state.lvl-100, 0)) + Math.sqrt(Math.max(state.day-1, 0))));
		additionalText = "<p>But you quit your job :(</p>"
		reasonText = "because you resigned";
	}
	else if (reason == "fight")
	{
		reasonText = "for a fight";
	}

    state.skill += skillad;

	for (var name in tabs)
		tabs[name].classList.add("closed");
	stat.classList.add("closed");
	doc.classList.add("closed");
	
	setTimeout(function()
	{
		getById("headerline").style.display = "none";
		if (getById("temp"))
			header.removeChild(getById("temp"));
		ws.style.display = "none";
		footer.style.display = "none";
		
		var html = '<div id="temp"> \
					<div align="right" style="width: 50%; margin: 0 auto;"> \
					<h1 style="margin-bottom: 0;">You are FIRED!</h1> \
					<p style="margin: 0;">'+reasonText+'</p> \
					</div> \
					<div align="left"> \
					<p>You worked for '+state.day+' days</p> \
					<p>You reached level '+state.lvl+'</p> \
					<p>You passed '+state.deadlinesPassed+' deadlines</p> \
					<p>You was fired '+state.resetCount+' times</p>'
					+ additionalText + 
					'<p>So you earned <b>'+skillad+'</b> skill points</p> \
					</div> \
					<button style="margin: 20px;" onclick="reset();">Get a new job</button> \
					</div>';
		header.insertAdjacentHTML("afterBegin", html);

		setTimeout(function()
		{
			doc.classList.remove("closed");
		}, 50);
	}, 2000);
}

function reset()
{
	state.resetCount++;
	state.reset();
	state.save();
	var s = {achievementsUnlocked: sets.achievementsUnlocked};
	localStorage.sets = JSON.stringify(s);
	location.reload();
}
//---------------------------------------------------------------------------------

function canmix(item1, item2)
{
	return ((sets.goodsBought[item1] || 0) && (sets.goodsBought[item2] || 0));
}

function mixmap(item1, item2)
{
	if (item1 == item2)
		return item1;
	var a = {};
	a[item1] = 1;
	a[item2] = 2;
	if (a["Vodka"] && a["Beer"])
		return "Yorsh";
	else if (a["Coffee"] && a["Vodka"])
		return "Black russian";
	else if (a["Coffee"] && a["Beer"])
		return "Stout";
	else if (a["Kvass"] && a["Vodka"])
		return "Beer";
	else if (a["Kvass"] && a["Beer"])
		return "Dark beer";
	else if (a["Black russian"] && a["Yorsh"])
		return "Borsch";
	else if (a["Coffee"] && a["Milk"])
		return "Latte";
	else if (a["Vodka"] && a["Milk"])
		return "Milkshake";
	else if ((a["Kvass"] || a["Beer"] || a["Yorsh"] || a["Stout"]) && (a["Milk"] || a["Latte"] || a["Milkshake"]))
		return "Purge";
	else if ((a["Black russian"] && a["Milk"]) || (a["Milkshake"] && a["Coffee"]) || (a["Latte"] && a["Vodka"]) || (a["Milkshake"] && a["Latte"]))
		return "White russian";
	
	return "Bullshit";
}

function mix(item1, item2)
{
	if (!canmix(item1, item2))
		return;
	
	mixBtn.widget.disabled = true;
	getById("mixItem1").disabled = true;
	getById("mixItem2").disabled = true;
	sets.goodsBought[item1] = (sets.goodsBought[item1] || 0) - 1;
	sets.goodsBought[item2] = (sets.goodsBought[item2] || 0) - 1;
	updateAppearance();
	var mixTim = function(warpCount)
	{
		var step = warpCount / sets.mixDuration;
		mixProgress.value += step;
		if (mixProgress.value == 100)
		{
			state.shakerUsage++;
			achItems["Party maker"].update();
			mixProgress.value = 0;
			clock.clearInterval(mixTim);
			var res = mixmap(item1, item2);
			if (res == "Bullshit")
			{
				state.bullshitMade++;
				achItems["Shit producer"].update();
				var c = item1 + "+" + item2;
				if (drinks.indexOf(item1) > drinks.indexOf(item2))
					c = item2 + "+" + item1;
				if (state.bullshitKinds.indexOf(c) < 0)
				{
					state.bullshitKinds.push(c);
					achItems["Sommelier"].update();
				}
			}
			
			sets.goodsBought[res] = (sets.goodsBought[res] || 0) + 1;
			updateAppearance();
			setFooter("You made a " + res);
			mixBtn.widget.disabled = false;
			getById("mixItem1").disabled = false;
			getById("mixItem2").disabled = false;
		}
	}
	clock.setInterval(mixTim, 1/100);
}

function makeCocktail()
{
	var item1 = getById("mixItem1").value;
	var item2 = getById("mixItem2").value;
	if (item1.length && item2.length)
		mix(item1, item2);
}

function bullshitCount()
{
	var r = 0;
	for (var i=0; i<drinks.length; i++)
	{
		for (var j=i+1; j<drinks.length; j++)
		{
			if (mixmap(drinks[i], drinks[j]) == "Bullshit")
			{
				//console.log(drinks[i]+"+"+drinks[j]);
				r++;
			}
		}
	}
	return r;
}
//---------------------------------------------------------------------------------

function showOptions()
{
	var x = document.getElementById('temp_more');
	x.style.height='50px';
	x.style.transform='scaleY(1.0)';
	if (state.jobless)
	{
		resignBtn.widget.style.display = "none";
		if (!state.step)
		{
			amnesiaBtn.widget.style.display = "none";
			exportBtn.widget.style.display = "none";
		}
	}
}

function doExport()
{
	//state.save();
	localStorage["sets"] = JSON.stringify(sets);
	localStorage["state"];

	setFooter("Save current progress");

	var obj = new Object;
	obj.state = localStorage["state"];
	obj.sets = localStorage["sets"];

	setFooter("Writing data...")

	var text = JSON.stringify(obj);
	var he = document.createElement("a");
	he.href = "data:attachment/text," + encodeURI(text);
	he.target = "_blank";
	he.download = "nerabotix.txt";
	he.click();

	setFooter("Export completed");
}

function doImport()
{
	if (!window.File || !window.FileReader)
	{
		alert("Your browser does not support import from local file");
		return false;
	}

	var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
	x.onclick = function() {this.value = null;}
	x.onchange = function(evt)
	{
		doc.classList.add("closed");
		var file = evt.target.files[0];
		var reader = new FileReader();
		reader.onload = function()
		{
			try
			{
				var obj = JSON.parse(reader.result);
			}
			catch (err)
			{
				setFooter("The file is shit");
				doc.classList.remove("closed");
				return false;
			}

			if (typeof(obj.sets) == "undefined" || typeof(obj.state) == "undefined")
			{
				setFooter("Import failed!");
				doc.classList.remove("closed");
				return false;
			}
			else
			{
				setFooter("Load data...");
				localStorage["sets"] = obj.sets;
				localStorage["state"] = obj.state;
				setFooter("Import completed");
				setTimeout(function() {location.reload()}, 2000);
			}
		};
		reader.readAsText(file);
		setFooter("Reading file...");
	}
    x.click();

    return true;
}

function doResign()
{
	if (resignBtn.text == "Resign")
	{
		resignBtn.widget.showHint("Are you sure?", function(){resignBtn.text = "Resign";});
		resignBtn.text = "Yep";
	}
	else
	{
		resignBtn.widget.collapseHint();
		resignBtn.widget.disabled = true;
		showFired("resign");
	}
}

function doAmnesia()
{
	if (amnesiaBtn.text == "Amnesia")
	{
		amnesiaBtn.widget.showHint("Are you sure?", function(){if (amnesiaBtn.text == "Yep") amnesiaBtn.text = "Amnesia";});
		amnesiaBtn.text = "Yep";
	}
	else if (amnesiaBtn.text == "Yep")
	{
		amnesiaBtn.widget.collapseHint();
		amnesiaBtn.widget.showHint("Are you definitely sure?\nYou'll lose all skills and achievements!", function(){amnesiaBtn.text = "Amnesia";});
		amnesiaBtn.text = "Yep dude!";
	}
	else
	{
		amnesiaBtn.widget.disabled = true;
		amnesiaBtn.widget.collapseHint();
		document.body.style.backgroundImage = "url('white.png')";
		setFooter("F*** my mind!!");
		doc.classList.add("closed");
		setTimeout(function()
		{
			localStorage.removeItem("state");
			localStorage.removeItem("sets");
			location.reload();
		}, 4000);
	}
}
//------------------------------------------------
