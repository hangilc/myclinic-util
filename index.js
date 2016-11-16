
exports.hokenRep = function(visit){
	var terms = [];
	if( visit.shahokokuho ){
		var shahokokuho = visit.shahokokuho;
		terms.push(exports.shahokokuhoRep(shahokokuho.hokensha_bangou));
		if( shahokokuho.kourei > 0 ){
			terms.push("高齢" + shahokokuho.kourei + "割");
		}
	}
	if( visit.koukikourei ){
		var koukikourei = visit.koukikourei;
		terms.push(exports.koukikoureiRep(koukikourei.futan_wari));
	}
	if( visit.roujin ){
		var roujin = visit.roujin;
		terms.push(exports.roujinRep(roujin.futan_wari));
	}
	visit.kouhi_list.forEach(function(kouhi){
		terms.push(exports.kouhiRep(kouhi.futansha));
	});
	return terms.length > 0 ? terms.join("・") : "保険なし";
};
    
exports.shahokokuhoRep = function(hokenshaBangou){
	var bangou = parseInt(hokenshaBangou, 10);
	if( bangou <= 9999 )
		return "政管健保";
	if( bangou <= 999999 )
		return "国保";
	switch(Math.floor(bangou/1000000)){
		case 1: return "協会けんぽ";
		case 2: return "船員";
		case 3: return "日雇一般";
		case 4: return "日雇特別";
		case 6: return "組合健保";
		case 7: return "自衛官";
		case 31: return "国家公務員共済";
		case 32: return "地方公務員共済";
		case 33: return "警察公務員共済";
		case 34: return "学校共済";
		case 63: return "特定健保退職";
		case 67: return "国保退職";
		case 72: return "国家公務員共済退職";
		case 73: return "地方公務員共済退職";
		case 74: return "警察公務員共済退職";
		case 75: return "学校共済退職";
		default: return "不明";
	}
}

exports.koukikoureiRep = function(futan_wari){
	return "後期高齢" + futan_wari + "割"
}

exports.roujinRep = function(futan_wari){
	return "老人" + futan_wari + "割";
}

exports.kouhiRep = function(futansha_bangou){
	futansha_bangou = parseInt(futansha_bangou, 10);
	if (Math.floor(futansha_bangou / 1000000)  == 41)
		return "マル福";
	else if (Math.floor(futansha_bangou / 1000) == 80136)
		return "マル障（１割負担）";
	else if (Math.floor(futansha_bangou / 1000) == 80137)
		return "マル障（負担なし）";
	else if (Math.floor(futansha_bangou / 1000) == 81136)
		return "マル親（１割負担）";
	else if (Math.floor(futansha_bangou / 1000) == 81137)
		return "マル親（負担なし）";
	else if (Math.floor(futansha_bangou / 1000000) == 88)
		return "マル乳";
	else
		return "公費負担";
}
