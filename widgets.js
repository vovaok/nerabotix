HTMLElement.prototype.remove = function()
{
    this.parentNode.removeChild(this);
}

HTMLElement.prototype.clear = function()
{
	while (this.childNodes.length)
		this.removeChild(this.childNodes[this.childNodes.length-1]);
}

HTMLElement.prototype.setVisible = function(value)
{
	if (value)
		this.style.display = "";
	else
		this.style.display = "none";
}

function getById(id)
{
	return document.getElementById(id);
}

function beanum(n)
{
	if (n < 1)
		return 0;
	var e = Math.floor(Math.log10(n));
	var f = n / Math.pow(10, e-2);
	var r = Math.floor(f + 0.000001);
	var e3 = Math.floor(e/3) * 3;
	var de = 2 - (e - e3);
	if (de == 1)
		r /= 10;
	else if (de == 2)
		r /= 100;
	if (e3 < 3) return r;
	if (e3 < 6) return r + "K";
	if (e3 < 9) return r + "M";
	if (e3 < 12) return r + "B";
	if (e3 < 15) return r + "T";
	if (e3 < 18) return r + "Q";
	if (e3 < 21) return r + "X";
	if (e3 < 24) return r + "P";
	if (e3 < 27) return r + "O";
	if (e3 < 30) return r + "N";
	if (e3 < 33) return r + "D";
	return r+"e"+e3;
}

function beaday(d)
{
	var h = Math.round(d * 24);
	var m = Math.round(h * 60);
	if (m == 1) return "a minute";
	if (m < 60) return m + " minutes";
	if (h == 1)	return "a hour";
	if (h < 24) return h + " hours";
	if (d < 2) return "a day";
	if (d == 7) return "a week";
	if (d == 14) return "2 weeks"
	if (d == 21) return "3 weeks"
	if (d == 28) return "4 weeks"
	if (d == 30) return "a month";
	return d + " days";
}

class Widget
{
    constructor(args)
    {
    	this._elem = null;

    	if (args instanceof HTMLElement)
    		args = [args];

    	for (var a in args)
    	{
    		var arg = args[a];
    		if (arg instanceof HTMLElement)
    		{
    			this._elem = arg;
    			var varname = this._elem.id;
    			if (this._elem.hasAttribute("var"))
    				varname = this._elem.getAttribute("var");
    			window[varname] = this;
				if (this._elem.className && this._elem.className.indexOf(this.constructor.name) < 0)
					console.warn("Class name mismatch! "+this._elem.className+" instead of "+this.constructor.name);
    		}
    	}
    	
        this._visible = true;
    }

    get widget() {return this._elem;}

    get visible() {return this._visible;}
    set visible(value)
    {
    	if (this._visible == value)
    		return;
        this._visible = value;
        if (value)
            this._elem.style = "";
        else
            this._elem.style = "display: none;";
    }
}

class Table extends Widget
{
	constructor(rows, cols)
	{
		super(arguments);

		if (!this._elem)
		{
			this._elem = document.createElement("div");
			this._elem.className = "Table";
		}

		var table = document.createElement("table");
		this._elem.appendChild(table);
		var body = document.createElement("tbody");
		table.appendChild(body);
		this._body = body;
		this._rows = 0;
		this._cols = 0;
		this._cells = [];

		if (typeof(rows) == "number" && typeof(cols) == "number")
		{
			this._rows = rows;
			this._cols = cols;
			for (var i=0; i<rows; i++)
			{
				var tr = document.createElement("tr");
				this._body.appendChild(tr);
				this._cells.push(new Array);
				for (var j=0; j<cols; j++)
				{
					var td = document.createElement("td");
					tr.appendChild(td);
					this._cells[i].push("");
				}
			}
		}
	}

	get rows() {return this._rows;}
	set rows(n)
	{
		if (n > this._rows)
		{
			for (var i=this._rows; i<n; i++)
			{
				var tr = document.createElement("tr");
				this._body.appendChild(tr);
				this._cells.push(new Array);
				for (var j=0; j<this._cols; j++)
				{
					var td = document.createElement("td");
					tr.appendChild(td);
					this._cells[i].push("");
				}
			}
		}
		else if (n < this._rows)
		{
			for (var i=this._rows-1; i>=n; i--)
			{
				this._body.removeChild(this._body.childNodes[i]);
			}
			this._cells.length = n;
		}
		this._rows = n;
	}

	get cols() {return this._rows;}
	set cols(n)
	{
		for (var i=0; i<this._rows; i++)
		{
			var tr = this._body.childNodes[i];
			if (n > this._cols)
			{
				for (var j=this._cols; j<n; j++)
				{
					var td = document.createElement("td");
					tr.appendChild(td);
					this._cells[i].push("");
				}
			}
			else if (n < this._cols)
			{
				for (var j=this._cols-1; j>=n; j--)
				{
					tr.removeChild(tr.childNodes[j]);
				}
				this._cells[i].length = 0;
			}
		}
		this._cols = n;
	}

	item(row, col)
	{
		if (row >= this._rows) {return undefined;}
		if (col >= this._cols) {return undefined;}
		return this._cells[row][col];
	}

	setItem(row, col, item)
	{		
		if (row >= this._rows) {this.rows = row+1;}
		if (col >= this._cols) {this.cols = col+1;}

		this._cells[row][col] = item;
		var tr = this._body.childNodes[row];
		var td = tr.childNodes[col];
		td.innerHTML = "";
		if (typeof(item) == "object")
		{
			if (typeof(item.widget) != "undefined")
				td.appendChild(item.widget);
			else if (item instanceof HTMLElement)
				td.appendChild(item);
			else
				td.innerText = item.toString();
		}
		else
		{
			td.innerText = item;
		}
	}

	hideRow(n)
	{
		if (n < this._rows)
		{
			var tr = this._body.childNodes[n];
			tr.style.display = "none";
		}
	}
	showRow(n)
	{
		if (n < this._rows)
		{
			var tr = this._body.childNodes[n];
			tr.style.display = "";
		}
	}

	clear()
	{
		this.rows = 0;
	}
}

class Item extends Widget
{
    constructor(text, hint)
    {
        super(arguments);

        if (!this._elem)
        {
        	this._elem = document.createElement("div");
        	this._elem.className = "Item";
        }

        if (typeof(text) == "string")
        {
        	this._text = text;
        }
        else
        {
        	this._text = this._elem.innerText;
        	this._elem.innerText = "";
        }

        if (typeof(hint) == "string")
        	this._elem.title = hint;

        var span = document.createElement("span");

        this._elem.appendChild(span);
        this._inner = span;
        this._value = "";
    }

    get value() {return this._value;}
    set value(val)
    {
        this._value = val;
        this._inner.innerText = this._text + " " + val;
    }

    get inner() {return this._inner;}
};

class UpgradeItem extends Widget
{
	constructor(name)
	{
		super(arguments);

		this._name = name;

		var bar = new ProgressBar();
		bar.widget.className += " upgradebar";
		bar.value = (this.curIndex+1) / this.count * 100;
		bar.text = (this.curIndex+1) + "/" + this.count;
		this._bar = bar;

		var _this = this;
		var btn = new Button("Bye"); // nextXP
		if (this.isFull())
			btn.text = "FULL";
		else
			btn.text = beanum(this.nextXP) + " XP";
		btn.onclick = function(){_this.buy()};
// 		btn.widget.onmouseover = function(){btn.widget.showHint(_this.hintText);};
// 		btn.widget.onmouseout = function(){btn.widget.collapseHint();};
		this._btn = btn;

		var tr = document.createElement("tr");
		tr.onmouseover = function(){btn.widget.showHint(_this.hintText);};
		tr.onmouseout = function(){btn.widget.collapseHint();};
 		this._tr = tr;
		var td = document.createElement("td");
		td.innerText = name;
		tr.appendChild(td);
		var td = document.createElement("td");
		td.appendChild(this._bar.widget);
		tr.appendChild(td);
		var td = document.createElement("td");
		td.appendChild(this._btn.widget);
		tr.appendChild(td);
		var container = document.getElementById("upgradetable");

		this.updateAvail();
		container.appendChild(tr);
	}

	get obj() {return upgrades[this._name];}

	get curIndex()
	{
		var idx = -1;
		if (typeof(sets.purchasedUpgrades[this._name]) != "undefined")
			idx = sets.purchasedUpgrades[this._name];
		return idx;
	}

	get count()
	{
		return this.obj.xp.length;
	}

	get nextXP()
	{
		var idx = this.curIndex + 1;
		if (idx < this.count)
			return this.obj.xp[idx];
		return "FULL";
	}

	isVisible()
	{
		return eval(this.obj.visibility || true);
	}

	isAvailable()
	{
		var idx = this.curIndex + 1;
		return (idx < this.count) && (state.availXP >= this.obj.xp[idx]);
	}

	isFull()
	{
		return ((this.curIndex + 1) == this.count);
	}

	buy()
	{
		if (this.isAvailable())
		{
			var idx = this.curIndex + 1;
			sets[this.obj._var] = this.obj.values[idx];
			if (typeof(this.obj.onbuy) == "function")
				this.obj.onbuy();
			state.spendXP(this.nextXP);
			sets.purchasedUpgrades[this._name] = idx;
			this._bar.value = (idx+1) / this.count * 100;
			this._bar.text = (idx+1) + "/" + this.count;
			if (this.isFull())
				this._btn.text = "FULL";
			else
				this._btn.text = beanum(this.nextXP) + " XP";
			this._btn.widget.disabled = !this.isAvailable();
			if (typeof(onUpgradePurchased) == "function")
				onUpgradePurchased();
			save();
		}
	}

	get hintText()
	{
		var info = this.obj.info;
		var idx = this.curIndex;
		if (this.isFull())
			return "You reached the optimal " + this._name + ": " + sets[this.obj._var];
		return info.replace("$cur", sets[this.obj._var]).replace("$next", this.obj.values[idx+1]);
	}

	updateAvail()
	{
		if (this.isVisible())
			this._tr.style.display = "";
		else
			this._tr.style.display = "none";
		this._btn.widget.disabled = !this.isAvailable();
	}
};

class Achievement extends Widget
{
	constructor(name)
	{
		super(arguments);

		this._name = name;

		if (typeof(this.obj.expr) != "undefined")
		{
			var bar = new ProgressBar();
			bar.widget.className += " upgradebar";
			this._bar = bar;
		}

		var _this = this;
		var btn = new Button("Bye"); // nextXP
		if (this.done)
		{
			btn.text = "Done";
			btn.widget.disabled = true;
		}
		else
		{
			btn.text = "+" + beanum(this.obj.xp) + " XP";
			btn.widget.disabled = this.locked;
		}
		btn.onclick = function(){_this.getXP()};
		this._btn = btn;

		var _this = this;

		var tr = document.createElement("tr");
		tr.setAttribute("hint", _this.hintText);
		this._tr = tr;
		// tr.onmouseover = function(){btn.widget.showHint(_this.hintText);};
		// tr.onmouseout = function(){btn.widget.collapseHint();};
		var td = document.createElement("td");
		td.innerText = name;
		tr.appendChild(td);
		var td = document.createElement("td");
		if (this._bar)
			td.appendChild(this._bar.widget);
		tr.appendChild(td);
		var td = document.createElement("td");
		td.appendChild(this._btn.widget);
		tr.appendChild(td);
		var container = document.getElementById("achievetable");
		container.appendChild(tr);

		if ((this.obj.hidden || 0) && this.locked)
			this._tr.style.display = "none";
		this.update(true);
	}

	get obj() {return achievements[this._name];}
	
	get hintText()
	{
		return this.obj.info;
	}

	get locked()
	{
		return (typeof(sets.achievementsUnlocked[this._name]) == "undefined");	
	}

	get done()
	{
		if (this.locked)
			return false;
		return sets.achievementsUnlocked[this._name] == 2;
	}

	unlock()
	{
		if (this.locked)
		{
			this._tr.style.display = "";
			sets.achievementsUnlocked[this._name] = 1;
			state.updateMultiplier(this.obj.mult);
			this._btn.widget.disabled = false;
			updateAchieveProgress();
			setFooter(`Achievement unlocked: <b>${this._name}</b> - ${this.hintText}`);
			save();
		}
	}

	update()
	{
		if ((this.locked || arguments.length) && this._bar)
		{
			var cur = eval(this.obj.expr);
			var val = eval(this.obj.value);
			if (!this.locked)
				cur = val;
			this._bar.value = cur / val * 100;
			if (this._bar.value == 100)
			{
				this._bar.text = beanum(val) + "/" + beanum(val);
				if (this.locked)
					this.unlock();
			}
			else
			{
				this._bar.text = beanum(Math.floor(cur)) + "/" + beanum(val);
			}
		}
	}

	getXP()
	{
		if (!this.done)
		{
			sets.achievementsUnlocked[this._name] = 2;
			this._btn.widget.disabled = true;
			this._btn.text = "Done";
			state.XP += this.obj.xp;
			save();
		}
	}
};

class ShopItem extends Widget
{
	constructor(name)
	{
		super(arguments);

		this._name = name;

		var _this = this;
		var btn = new Button("Buy");
		btn.text = "$"+beanum(this.obj.cost);
		btn.widget.disabled = this.locked;
		btn.onclick = function(){_this.buy()};
		this._btn = btn;

		this._hidden = false;
		if (goods[name].hidden)
			this._hidden = true;

// 		var edit = document.createElement("input");
// 		edit.type = "number";
// 		edit.min = 1;
// 		edit.max = 1000;
// 		edit.value = 1;
// 		edit.step = 1;
		
		function createOption(value)
		{
			var o = document.createElement("option");
			o.value = value;
			o.text = value;
			return o;
		}

		var edit = document.createElement("select");
		edit.appendChild(createOption(1));
		edit.appendChild(createOption(10));
		edit.appendChild(createOption(100));
		edit.appendChild(createOption(1000));
		edit.onchange = function()
		{
			btn.text = "$"+beanum(goods[name].cost * edit.value);
		};
		this._edit = edit;

		var _this = this;

		var tr = document.createElement("tr");
		this._tr = tr;
		tr.onmouseover = function(){btn.widget.showHint(_this.hintText);};
		tr.onmouseout = function(){btn.widget.collapseHint();};
		var td = document.createElement("td");
		td.innerText = name;
		tr.appendChild(td);
		var td = document.createElement("td");
		if (typeof(this.obj.maxcount) == "undefined")
			td.appendChild(this._edit);
		tr.appendChild(td);
		var td = document.createElement("td");
		td.appendChild(this._btn.widget);
		tr.appendChild(td);
		var container = document.getElementById("shoptable");
		container.appendChild(tr);

		this.update(true);
	}

	get obj() {return goods[this._name];}
	
	get hintText()
	{
		return this.obj.info;
	}

	isFull()
	{
		if (typeof(this.obj.maxcount) != "undefined")
			if ((sets.goodsBought[this._name] || 0) >= this.obj.maxcount)
				return true;
		return false;
	}

	get locked()
	{
		if (this.isFull())
			return true;
		return this.obj.cost > state.money;	
	}

	get buycount()
	{
		return this._edit.value;
	}

	get hidden() {return this._hidden;}
	set hidden(h) {this._hidden = h; this.update();}

	buy()
	{
		if (!this.locked)
		{
			if (typeof(sets.goodsBought[this._name]) == "undefined")
				sets.goodsBought[this._name] = 0;
			var maxcount = Math.floor(state.money / this.obj.cost);
			var count = Math.min(this.buycount, maxcount);
			state.money -= this.obj.cost * count;
			sets.goodsBought[this._name] += count;
			if (typeof(onItemPurchased) == "function")
				onItemPurchased(this._name);
			this.update();
		}
	}

	update()
	{
		if (this.isFull() || this._hidden)
			this._tr.style.display = "none";
		else
			this._tr.style.display = "";
		this._btn.widget.disabled = this.locked;
	}
};

class Button extends Widget
{
    constructor(text, hint)
    {
        super(arguments);

        if (!this._elem)
		{
			this._elem = document.createElement("button");
		}

        if (typeof(text) == "string")
        	this._elem.innerText = text;
        if (typeof(hint) == "string")
        	this._elem.title = hint;
    }

    get text() {return this._elem.innerText;}
    set text(value)
    {
        this._elem.innerText = value;
    }

    get onclick() {return this._elem.onclick;}
    set onclick(func) {this._elem.onclick = func;}
};

class CheckBox extends Widget
{
    constructor(elem)
    {
        super(arguments);

        this._text = this._elem.innerHTML;
        this._elem.innerHTML = "";

        this._chk = document.createElement("input");
        this._chk.type = "checkbox";

        this._textnode = document.createTextNode(this._text);

        this._elem.appendChild(this._chk);
        this._elem.appendChild(this._textnode);
    }

//     get text() {return this._elem.innerText;}
//     set text(value)
//     {
//         this._elem.innerText = value;
//     }

    get onclick() {return this._elem.onclick;}
    set onclick(func) {this._elem.onclick = func;}

    get checked() {return this._chk.checked;}
    set checked(c) {this._chk.checked = c;}

    get disabled() {return this._chk.disabled;}
    set disabled(d) {this._chk.disabled = d;}

    get text() {return this._textnode.textContent;}
    set text(txt) {return this._textnode.textContent = txt;}
};

class Hint extends Widget
{
    constructor(target, text, onfinish)
    {
        super();

        var d = document.createElement("div");
	    d.className = "hint";
	    d.innerText = text;

	    this._elem = d;
	    this._target = target;
	    this._onfinish = onfinish;	    

	    d.onclick = function()
        {
            this.style.opacity = 0;
            this.pause = false;
            this.showstate = -1;
        }

        d.onmouseover = function()
        {
            this.style.opacity = 1.0;
            this.pause = true;
        }

        d.onmouseout = function()
        {
            this.pause = false;
        }
    }

    show()
    {
        var rect = this._target.getBoundingClientRect();
        var d = this._elem;
        d.style.opacity = 0.0;
        d.style.top = rect.top + "px";
        var w = document.body.offsetWidth;
        var x1 = rect.left;
        var x2 = rect.right;
        if (x1 > w/2)
            d.style.right = (w - x1) + "px";
        else
            d.style.left = x2 + "px";
        document.body.appendChild(d);

        d.showstate = 0;
        var onfinish = this._onfinish;
        var tim = setInterval(function()
        {
            var o = parseFloat(d.style.opacity);
            if (d.showstate == 0)
            {
                if (o < 1)
                    o += 0.05;
                else
                    d.showstate = 1;
            }
            else if (d.showstate > 0 && d.showstate < 500)
            {
                d.showstate++;
            }
            else if (!d.pause)
            {
                if (o > 0)
                    o -= 0.01;
                else
                {
                    clearInterval(tim);
                    d.remove();
                    onfinish();
                }
            }                
            d.style.opacity = o;
        }, 20);
    }

    hide()
    {
        this._elem.onclick();
    }
};

HTMLElement.prototype.showHint = function(txt, onfinish)
{
    var hint = new Hint(this, txt, finish);
    hint.show();

    function finish()
    {
        delete hint;
        if (typeof(onfinish) == "function")
            onfinish();
    }

    this._hint = hint;
}

HTMLElement.prototype.collapseHint = function()
{
    if (typeof(this._hint) != "undefined")
        this._hint.hide();
}

class ProgressBar extends Widget
{
	constructor(color)
	{
	    super(arguments);

		if (this._elem)
		{
			if (this._elem.hasAttribute("color"))
			{
				color = this._elem.getAttribute("color");
			}
		}
		else
		{
			this._elem = document.createElement("div");
			this._elem.className = "ProgressBar";
		}
		
		let div = this._elem.appendChild(document.createElement("div"));
		if (typeof(color) == "string")
			div.style.backgroundColor = color;

		this._textSpan = document.createElement("span");
		this._elem.appendChild(this._textSpan);
		
		this._value = 0;
	}

	get value() {return this._value;}
	set value(val)
	{
		if (val < 0)
			val = 0;
		else if (val > 100)
			val = 100;
		this._value = val;
		this._elem.firstChild.style.width = val + "%";
		if (this.autoText)
			this._textSpan.innerText = parseInt(this._value)+"/100";
	}

	set text(txt)
	{
		this._textSpan.innerText = txt;
	}

	get color() {return this._elem.firstChild.style.backgroundColor;}
	set color(col) {this._elem.firstChild.style.backgroundColor = col;}
};

class Clock extends Widget
{
    constructor()
    {
        super(arguments);

        var elem = document.getElementById("clock");
        if (!elem)
        {
            elem = document.createElement("div");
            elem.id = "clock";
        }
        elem.title = "Current time";

        this._elem = elem;
        this._timestamp = Math.floor(Date.now()/60000) * 60000;
        this._time = "00:00";
        this._isNight = false;
        this._speed = 1;
        this._intervals = new Object;

        this.onnignt = 0;
        this.onday = 0;

        var cap = this;
//         var temp = 0;
        this._timeStep = function()
        {
            cap._timestamp += 600 * cap._speed;
//             temp++;
//             if (temp >= (10 / cap._speed))
//             {
//             	temp = 0;
            	cap._update();
//             }
        }
        this._tim = 0;

        this._update();
    }

    timeFromTimestamp(ts)
    {
    	var date = new Date(ts);
        var hh = date.getHours();
        if (hh < 10)
            hh = "0" + hh;
        var mm = date.getMinutes();
        if (mm < 10)
            mm = "0" + mm;
        return hh + ":" + mm;
    }

    timeSum(t1, t2)
    {
    	var cap1 = t1.match(/(\d+):(\d+)/);
    	var cap2 = t2.match(/(\d+):(\d+)/);
    	var d = new Date(0);
    	d.setHours(parseInt(cap1[1]) + parseInt(cap2[1]));
    	d.setMinutes(parseInt(cap1[2]) + parseInt(cap2[2]));
    	return this.timeFromTimestamp(d.getTime());
    }

    timeSub(t1, t2)
    {
    	var cap1 = t1.match(/(\d+):(\d+)/);
    	var cap2 = t2.match(/(\d+):(\d+)/);
    	var d = new Date(0);
    	d.setHours(parseInt(cap1[1]) - parseInt(cap2[1]));
    	d.setMinutes(parseInt(cap1[2]) - parseInt(cap2[2]));
    	return this.timeFromTimestamp(d.getTime());
    }

    hoursFromTime(t)
    {
    	var cap = t.match(/(\d+):(\d+)/);
    	return parseInt(cap[1]) + parseInt(cap[2]) / 60;
    }

    _update()
    {
        if (typeof(state) != "undefined")
            state._setTimestamp(this._timestamp);

        var date = new Date(this._timestamp);
        var ss = date.getSeconds();
        var colon = ":";
        if (ss >= 30)
            colon = " ";
        var hh = date.getHours();
        if (hh < 10)
            hh = "0" + hh;
        var mm = date.getMinutes();
        if (mm < 10)
            mm = "0" + mm;
        var ts = hh + colon + mm;
        this._time = hh + ":" + mm;
        var isNight = (this._time < sets.workBegin || this._time > sets.workEnd);
        if (isNight && !this._isNight && typeof(this.onnight) == "function")
        	this.onnight();
        else if (!isNight && this._isNight && typeof(this.onday) == "function")
        	this.onday();
        this._isNight = isNight;
        this._elem.innerText = ts;
        if (this._isNight)
            this._elem.className = "night";
        else
            this._elem.className = "";

        for (var f in this._intervals)
        {
        	if ((this._timestamp - this._intervals[f]._time) >= this._intervals[f]._period)
        	{
        		var warpCount = Math.floor((this._timestamp - this._intervals[f]._time) / this._intervals[f]._period);
        		this._intervals[f]._time += this._intervals[f]._period * warpCount;
        		this._intervals[f]._f(warpCount);
        	}
        }
    }

    get timestamp() {return this._timestamp;}

    get time() {return this._time;}

    get isNight() {return this._isNight;}

    get enabled() {if (this._tim) return true; else return false;}
    set enabled(value)
    {
        if (value && !this._tim)
            this._tim = setInterval(this._timeStep, 10);
        else if (!value && this._tim)
        {
            clearInterval(this._tim);
            this._tim = 0;
        }
    }

	get speed() {return this._speed;}
    set speed(mult)
    {
    	if (this._speed != mult)
    	{
    		this._speed = mult;
    		this._elem.collapseHint();
    		if (this._speed > 1)
    			this._elem.showHint("The time runs "+this._speed+" times faster");
    		else if (this._speed == 1)
    			this._elem.showHint("The time runs at normal speed");
    		else if (this._speed == 0)
    			this._elem.showHint("The time stopped");
    		else if (this._speed < 1)
    			this._elem.showHint("The time slowed to "+Math.round(1/this._speed)+" times");
    		else
    			this._elem.showHint("The time reversed! O_o");
//     		if (this.enabled)
//     		{
//     			this.enabled = false;
//     			this.enabled = true;
//     		}
    	}
    }

    setInterval(f, period)
    {
    	var time = 0;
//     	if (typeof(this._intervals[f.name]) != "undefined")
//     		time = this._intervals[f.name]._time;
		this._intervals[f.name] = {_f:f, _period:period*60000, _time:this._timestamp};
    }

    clearInterval(f)
    {
    	if (typeof(f) == "function")
    		delete this._intervals[f.name];
    	else
    		delete this._intervals[f];
    }

    isInterval(f)
    {
    	if (typeof(f) == "function")
    		return typeof(this._intervals[f.name]) != "undefined";
    	else
    		return typeof(this._intervals[f]) != "undefined";
    }

    warpTime(minutes)
    {
    	var n = minutes;
    	for (var i=0; i<n; i++)
    	{
    		this._timestamp += 60000;
    		this._update();
    	}
    }

	get percentOfNight()
	{
		let span = this.hoursFromTime(this.timeSub(sets.workBegin, sets.workEnd));
		let v = this.hoursFromTime(this.timeSub(this._time, sets.workEnd));
		return v * 100 / span;
	}
}