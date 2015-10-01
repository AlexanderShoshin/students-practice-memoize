export { memoize };

function memoize(func) {
    var cache = {};
	var targetFunc = func;
	
	return function () {
		var key;
		
		key = calcHash(arguments);
		if (cache[key] === undefined) {
			cache[key] = targetFunc.apply(this, arguments);
		}
		
		return cache[key];
	};
}

function calcHash(val) {
	if (typeof(val) === "object") {
		return calcObjectHash(val);
	} else {
		return calcSimpleHash(val);
	}
}

function calcObjectHash(objectVal) {
	var hash, argKey;
	
	hash = "(";
	for (argKey in objectVal) {
		hash += argKey;
		hash += ":";
		hash += calcHash(objectVal[argKey]);
	}
	hash += ")";
	
	return hash;
}

function calcSimpleHash(simpleVal) {
	var hash;
	
	hash = "(";
	hash += simpleVal;
	hash += ",";
	hash += typeof(simpleVal);
	hash += ")";
	
	return hash;
}