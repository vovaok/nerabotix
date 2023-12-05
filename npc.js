class Npc
{
	constructor(state)
	{
		if (state)
			this._state = state;
		this._name = "Generic NPC";
		this._info = "If you see this, everything is very bad";
	}

	get name() {return this._name;}
	get info() {return this._info;}
	static list() {return ["TheCurlyOne", "MiniMan", "HonoredTrainer"];}

	get state()
	{
		var obj = new Object;
		obj.name = this.constructor.name;
		for (var c in this.counters)
		{
			var cname = this.counters[c].name;
// 			console.log(cname);
// 			console.log(this);
			obj[cname] = this[cname].value;
		}
		return obj;
	}

	appear()
	{
		npcName.value = this._name;
		npcInfo.value = this._info;

		for (var i=0; i<this.counters.length; i++)
		{
			var obj = this.counters[i];
			var name = obj.name;
			var bar = new ProgressBar(obj.color);
			bar.widget.className += " smooth";
			bar.autoText = true;
			bar.value = obj.def | 0;
			npcStat.setItem(i, 0, name);
			npcStat.setItem(i, 1, bar);
			this[name] = bar;
			if (obj.hidden)
				npcStat.hideRow(i);
		}

		for (var i=0; i<this.actions.length; i++)
		{
			var act = this.actions[i];
			var type = act.type? act.type: "button";
			var name = act.name;
			var obj;
			if (type == "button")
			{
				obj = new Button(name);
				obj.widget.title = act.info;
				if (act.hidden)
					obj.widget.hidden = true;
				var func = this[name];
				if (func)
					obj.onclick = func.bind(this);
				this["btn"+name] = obj;
			}
			else
			{
				obj = document.createElement(type);
				for (var p in act)
				{
					if (p == "type" || p == "name")
						continue;
					if (typeof(act[p]) == "function")
					{
						obj[p] = act[p].bind(this);
					}
					else
						obj[p] = act[p];
					this["act"+name] = obj;
				}
			}
			npcActs.setItem(0, i, obj);			
		}

		if (this._state)
		{
			for (var c in this.counters)
			{
				var cname = this.counters[c].name;
				this[cname].value = this._state[cname];
			}
			//delete this._state;
		}
		else if (this.firstAppear)
		{
			this.firstAppear();
		}

		this._appeared = true;
	}

	disappear()
	{
		setFooter("You got rid of " + this._name);
		npcStat.clear();
		npcActs.clear();
		npcExtra.clear();
	}

	goAway()
	{
		state.curNpc = null;
	}
}
//---------------------------------------------------------

class TheCurlyOne extends Npc
{
	constructor(state)
	{
		super(state);

		this._name = "The Curly One";
		this._info = "He is sure that you are working incorrectly.\nYour tasks become uncompleted again!";
		
		this.counters =
		[
			{name: "HP",	color: "#F1B5BB", 	def: 100},
			{name: "RAGE", 	color: "red"},
			{name: "PURGE", color: "brown",		hidden: true}
		];
		this.actions = 
		[
			{name: "Edit", 	type: "input", hidden: true, maxLength: 20, onkeypress: this.editKeyPress},
			{name: "Talk", 	info: "You can ask him to leave"},
			{name: "Purge", info: "He will have to use WC and won't interfere you"},
			{name: "Hit", 	info: "If he is in full RAGE, punch him in the face!\n(You must have full HP)"}
		];
		this.intext =
		[
			"What do you want?",
			"No.",
			"You're a fool",
			"You hardly know how to do your work",
			"ARRRRGGGHHH!!",
			"Don't say more"
		];
		this.outtext =
		[
			"Leave me alone",
			"Why?",
			"You're so",
			"It is not true",
			"Throat cancer?"
		];
		this._chatline = 0;
		this._chattext = "";
	}

	firstAppear()
	{
		compTaskItem.widget.showHint("Everything you did is shit");
		workBtn.widget.showHint("You literally can't work while he is close");
	}

	disappear()
	{
		state.cantWork = false;
		super.disappear();
	}

	update(warpCount)
	{
		if (!this._appeared)
			return;

		if (this.HP.value == 0)
		{
			this._appeared = false;
			setTimeout(this.goAway, 1000);
			return;
		}

		if (this.PURGE.value)
		{
			this.PURGE.value -= warpCount * 0.1;
			this.HP.value -= this.PURGE.value * warpCount * 0.00055;
			state.cantWork = false;
		}
		else
		{
			var rage = this.RAGE.value / 100;
			var factor = parseInt(Math.max(rage * rage * sets.taskSolveAmount / 10, 1));
			var diff = Math.min(warpCount*factor, state.tasksCompleted);

			if (diff > 0)
			{
				state.tasksPending += diff;
				state.tasksCompleted -= diff;
			}
			state.cantWork = true;
		}

		this.RAGE.value += warpCount * 0.01 + this.PURGE.value * 0.001;

		npcActs.visible = (state.sleepy < 100);
		getById("npcExtra").setVisible(state.sleepy < 100);

		var purgeVisible = this.PURGE.value? true: false;
		if (purgeVisible)
			npcStat.showRow(2);
		else
			npcStat.hideRow(2);
		this.btnPurge.widget.disabled = !sets.goodsBought["Purge"] || purgeVisible;
		this.btnTalk.widget.disabled = purgeVisible || (!state.HP && (this.btnTalk.text != "Say")) || (((this.actEdit.value.length < this._chattext.length) || !this._chattext.length) && (this.btnTalk.text == "Say"));
		this.btnHit.widget.disabled = (this.RAGE.value < 100) || purgeVisible || state.HP < 100;
	}

	editKeyPress(e)
	{
		if (e.key == "Enter")
		{
			if (!this.btnTalk.widget.disabled)
				this.btnTalk.onclick();
		}
		else if (this._chattext)
		{
			var n = this.actEdit.value.length;
			var str = this._chattext;
			if (n < str.length)
			{
				this.actEdit.value = str.substr(0, n+1);
			}
		}
		e.cancelBubble = true;
		return false;
	}

	Talk()
	{			
		if (this.btnTalk.text == "Talk")
		{
			this.actEdit.hidden = false;
			this.btnTalk.text = "Say";
			this._chatline = 0;
			this._chattext = this.outtext[this._chatline];
			this.Say(this.intext[this._chatline], "income");
		}
		else if (this.btnTalk.text == "Say")
		{
			var txt = this.actEdit.value;
			this.actEdit.value = "";
			this._chattext = "";
			this.Say(txt, "outcome");
		}
	}

	Say(txt, dir)
	{
		var div = document.createElement("div");
		div.className = "chat " + dir;
		div.innerText = txt;
		getById("npcExtra").appendChild(div);

		var tt = Math.random() * 10 + 5;
		this.RAGE.value += tt;
		state.HP -= tt * 2;

		if (dir == "outcome")
		{
			var npc = this;
			setTimeout(function()
			{
				npc._chatline++;
				npc.Say(npc.intext[npc._chatline], "income");
				if (npc.outtext.length <= npc._chatline)
				{
					npc.actEdit.hidden = true;
					setTimeout(function()
					{
						npc.btnTalk.text = "Talk";
						getById("npcExtra").clear();
					}, 2000);
				}
				else
				{
					npc._chattext = npc.outtext[npc._chatline];
				}
			}, 500 + 2000*Math.random());
		}
	}

	Purge()
	{
		if (sets.goodsBought["Purge"])
		{
			this.PURGE.value = 100;
			sets.goodsBought["Purge"]--;
			updateAppearance();
		}
	}

	Hit()
	{
		this.RAGE.value = 0;
		this.HP.value = 0;
		setTimeout(function()
		{
			achItems["Boris-ich"].unlock();
		}, 1000);
		setTimeout(function()
		{
			showFired("fight");
		}, 3000);
	}
}
//---------------------------------------------------------

class MiniMan extends Npc
{
	constructor(state)
	{
		super(state);

		this._name = "Mini-man";
		this._info = "He is displeased with you, so he watches your presence at work!\nAnd he is still small";
		
		this.counters =
		[
			{name: "HP",	 color: "#F1B5BB", 	def: 100},
			{name: "INFORM", color: "red", 	hidden: true}
		];
		this.actions = 
		[
			{name: "Okay", 	 info: "I understand"},
 			{name: "Payoff", info: "Don't inform boss, please!\nI'll give you 10% of money", hidden: true}
		];
	}

	firstAppear()
	{
		state._checkinActive = true;

		if (checkinBtn.visible)
			checkinBtn.widget.showHint("You must check in when you come to work and before leaving it");
		else
			homeBtn.widget.showHint("You must check in when you come to work and before leaving it");
	}

	appear()
	{
		super.appear();

		this.overwork = state.overallOverwork();
		this.paid = false;

		if (this.overwork < 0)
		{
			this.INFORM.widget.parentNode.parentNode.setVisible(true);
			getById("npcExtra").innerText = "You skipped work for "+parseInt(-this.overwork)+" hours!\nI ought to inform the boss!";

			this.btnOkay.widget.hidden = true;
			this.btnPayoff.widget.hidden = false;
		}
	}

	update(warpCount)
	{
		if (!this._appeared)
			return;

		if (this.HP.value == 0)
		{
			this._appeared = false;
			setTimeout(this.goAway, 1000);
			return;
		}

		if (this.overwork < 0)
		{
			if (this.paid)
				this.INFORM.value -= 1;//warpCount;
			else// if (!state.home)
				this.INFORM.value += 0.2;//warpCount * 0.2;

			this.btnPayoff.widget.disabled = (state.money < 1000) || this.paid;

			if (this.INFORM.value == 100)
			{
				state.weight -= Math.min(state.weight, -this.overwork);
				this.goAway();
				setFooter("The Mini-man informed the boss and you've lost your authority");
			}
			else if (this.paid && this.INFORM.value == 0)
			{
				this.goAway();
			}
		}

		npcActs.visible = (state.sleepy < 100);
		getById("npcExtra").setVisible(state.sleepy < 100);
	}

	Okay()
	{
		var b = this.btnOkay;
		b.widget.disabled = true;

		var changeOkay = function(hint, next)
		{
			b.widget.showHint(hint, function(){b.text = next; b.widget.disabled = false;});
		}

		if (b.text == "Okay")
			changeOkay("Wait, I'll give you advice", "What?");
		else if (b.text == "What?")
			changeOkay("Don't forget to check in at work every day", "Why?");
		else if (b.text == "Why?")
			changeOkay("I'm watching you", "But why?");
		else if (b.text == "But why?")
			changeOkay("I think you're working badly", "No");
		else if (b.text == "No")
			changeOkay("Good bye", "Bye");
		else if (b.text == "Bye")
		{
			b.text = "Okay";
			b.widget.hidden = true;
			updateAppearance();
			this.goAway();
		}
	}

	Payoff()
	{
		var pay = parseInt(state.money * 0.001) * 100;
		state.money -= pay;
		this.btnPayoff.widget.showHint("You paid $" + pay);
		this.paid = true;
	}
}
//---------------------------------------------------------

class HonoredTrainer extends Npc
{
	constructor(state)
	{
		super(state);

		this._name = "Honored trainer";
		this._info = "He can't cope with his tasks, help him";
		
		this.counters =
		[
			{name: "HP",	 color: "#F1B5BB", 	def: 100},
			{name: "TASK"}
		];
		this.actions = 
		[
			{name: "Refuse", 	 info: "Don't help him"},
		];
	}

	firstAppear()
	{
		state._uselessWork = true;
	}

	disappear()
	{
		state._uselessWork = false;
		super.disappear();
	}

	update(warpCount)
	{
		if (!this._appeared)
			return;

		if (this.HP.value == 0)
		{
			this._appeared = false;
			setTimeout(this.goAway, 1000);
			return;
		}

		if (this.TASK.value == 100 && state._uselessWork)
		{
			if (Math.random() < 0.5)
			{
				this.TASK.value = 0;
				this.TASK.widget.showHint("Good! But I have another task");
			}
			else
			{
				state._uselessWork = false;
				this.TASK.widget.showHint("You resqued me!", this.goAway);
			}
		}

		if (this.refused)
		{
			var wd = ((100 - this.TASK.value) * state.weight / 400);
			if (wd < 1)
				wd = 1;
			state.weight -= wd;
			this._appeared = false;
		}
		
		npcActs.visible = (state.sleepy < 100);
		getById("npcExtra").setVisible(state.sleepy < 100);
	}

	Refuse()
	{
		this.btnRefuse.widget.showHint("You'll regret it!", this.goAway);
		this.refused = true;
		this.btnRefuse.widget.disabled = true;
	}

	work(value)
	{
		this.TASK.value += value;
	}
}


// // 	"Hot chick":		{info: "Invites you to a cup of coffee"},
// // 	"The Boss":			{info: "He is watching you!"},	
// // 	"Sysadmin":			{info: "Deals with computers"}
// };