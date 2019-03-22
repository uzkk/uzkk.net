fadeInTime = 200;
fadeOutTime = 0;
RankNum = 0;
noFacePatternNo = 99;
FacePattern = 0;
FacePatternDefault = 1;
BackupTree = null;
EvenList = [];
ElapsedTime = 0;
TimeStarted = null;
isFirstRemoveChoice = true;
// 初始化
$(document).ready(function() {
	$("#caption").hide();
	$("#result").hide();
	$("#ui").hide();
	$("#reset").hide();
	$("#samp").toggle();
	$("#sampback").toggle();
	$("#start_button").bind("click", ask_start);
	$("#reset_button").bind("click", reset_do);
	$("#left > *").bind("click", {
		win: 0
		, lose: 1
	}, button_click);
	$("#right > *").bind("click", {
		win: 1
		, lose: 0
	}, button_click);
	if (show_result_from_hash()) {
		$("#init").hide();
		$("#reset").show();
	}
	loadImage();
});

/**
* 预加载资源数据的图像。
*/
function loadImage(){
	var kPatterns = [1, 2, 99];
	for( var i = ResourceData.length -1; i>=0; i-- ){
		var obj = new SortObject(ResourceData[i]);
		for( var j in kPatterns ){
			FacePattern = j;
			var path = new Image(obj.getImagePath());
		}
		delete obj;
	}
}

function backup() {
	// 保存到ID树
	QuestionBackup = [Question[0].id, Question[1].id];
	BackupTree.setupCTree();
	BackupTree.initTree(SortTree, BackupTree);
}

function restore() {
	// 从ID树还原
	Question = [QuestionBackup[0], QuestionBackup[1]];
	QuestionBackup = null;
	// 暂时清除已确定的排名
	$("#caption").hide();
	SortTree = BackupTree.restoreCTree(BackupTree, null);
}

function initRankNum() {
	if (!RankNum) {
		if (location.search.length < 2) {
			var numObj = $("#rank_num option:selected");
			var numLen = parseInt(numObj.val());
			RankNum = numLen;
		} else {
			RankNum = location.search.slice(1).split("-").length;
		}
	}
}
// 检查是否有结果并显示
function show_result_from_hash() {
	if (location.search.length < 2) {
		return false;
	}
	var strParams = location.search.slice(1).split("-");
	QuestionCount = 0;
	FacePattern = 0;
	initRankNum();
	
	if( !RankNum ){
		// 浏览器不对应。是用了较早型号的手机吗？
		alert("動作非対応ブラウザをお使いのようです。オプション指定無しのまま実行します。");
		RankNum = 10;
		FacePattern = FacePatternDefault;
	}
	// 若给出了经过的秒数（cs ver1.16.0～）
	var lastQuery = strParams[strParams.length - 1];
	if (lastQuery.charAt(0) == "t") { // face
		strParams.pop();
		lastQuery = lastQuery.slice(1, lastQuery.length);
		if (isNaN(lastQuery) == false) {
			ElapsedTime = parseInt(lastQuery);
		}
	}
	
	// 若给定了角色表情（cs ver1.8.0～）
	lastQuery = strParams[strParams.length - 1];
	if (lastQuery.charAt(0) == "f") { // face
		strParams.pop();
		lastQuery = lastQuery.slice(1, lastQuery.length);
		if (isNaN(lastQuery) == false) {
			FacePattern = parseInt(lastQuery);
		}
	}
	// 若给定了问题数（cs ver1.7.0～）
	lastQuery = strParams[strParams.length - 1];
	if (lastQuery.charAt(0) == "q") { // question
		strParams.pop();
		lastQuery = lastQuery.slice(1, lastQuery.length);
		if (isNaN(lastQuery) == false) {
			QuestionCount = parseInt(lastQuery) + 1;
		}
	}
	SortTree = new SortObject(["!root", , , , ]);
	var objPal = SortTree;
	for (var i = 0; i < strParams.length; i++) {
		var isEven = (strParams[i].charAt(0) == "!");
		if(isEven){
			strParams[i] = strParams[i].substr(1, strParams[i].length - 1);
		}
		for (var j = 0; j < ResourceData.length; j++) {
			if (strParams[i] == ResourceData[j][0]) {
				var objChil = new SortObject(ResourceData[j]);
				objChil.isEven = isEven;
				objPal.add(objChil, false);
				objPal = objChil;
				// thanks @ide_an
				break;
			}
		}
	}
	show_result();
	return true;
}
// 区分旧作与新作中的同名角色：除了幽香以外，替换alt属性对应的值
function initOldVersionStyle() {
	if ($("#enableOldVersionStyle").is(":checked")) {
		$(":checkbox[alt].char").each(function(index) {
			var v = $(this).attr("alt");
			$(this).val(v);
		});
	}
}
// 开始排序
function ask_start() {
	QuestionBackup = null;
	QuestionCount = 0;
	initRankNum();
	SortTree = new SortObject(["!root", , , , ]);
	initOldVersionStyle();
	FacePattern = $("[name='facePattern']:checked").val();
	// 构造已选择的角色（唯一）
	selectedChars = [];
	$(":checkbox.char").each(function(index) {
		var v = $(this).attr("value");
		if ($(this).is(":checked") && $.inArray(v, selectedChars) === -1) {
			selectedChars.push(v);
		}
	});
	// 这种设定没问题吗？
	if( selectedChars.length >= 400){
		if( confirm("共有 " + selectedChars.length + " 个待排序对象。\n预计问题数会非常多，确定做好觉悟了吗？") === false ){
			return false;
		}
	}
	if (selectedChars.length <= 1) {
		alert("没有用于排序的对象。");
		return false;
	}
	for (var i = 0; i < ResourceData.length; i++) {
		var resourceId = ResourceData[i][0];
		// 若通过ID属性找到了角色，以其创建对象
		if ($.inArray(resourceId, selectedChars) > -1) {
			SortTree.add(new SortObject(ResourceData[i]), false);
		}
	}
	$("div.caption").show();
	TimeStarted = new Date();
	ask_next();
	// 准备复原
	BackupTree = new IDSortTree();
	BackupTree.setupCTree();
	BackupTree.initTree(SortTree, BackupTree);
	$("#init").hide(0);
	$("#ui").fadeIn(1000);
	$("#reset").show();
}
// 下一问
function ask_next(isBacked) {
	QuestionCount++;
	hide_question();
	//$("#samp").html(SortTree.toString());
	$("#count").text(QuestionCount);
	$("#hold").css("visibility", "visible");
	$("#back").css("visibility", "visible");
	// 因为是第一问无法返回上一题，所以清除这个按钮
	if (QuestionCount == 1) {
		$("#back").css("visibility", "hidden");
	}
	// 选择「等下」时，回到上一题
	if (isBacked === true) {
		$("#back").css("visibility", "hidden");
		Question = SortTree.ask(Question);
	} else {
		Question = SortTree.ask();
	}
	if (Question) {
		if (Question[1].level() > RankNum) {
			return false;
		}
		show_question();
		return true;
	}
	return false;
}
// 等下！
function ask_back() {
	// 复原，并再次询问
	restore();
	QuestionCount -= 2;
	return ask_next(true);
}
// 跳过
function ask_hold() {
	// 本来在这里是想让问题数+1的，但仔细考虑一番觉得会导致后续选择变多所以不这样了
	// QuestionCount++;
	backup();
	var currentQ = [Question[0].id, Question[1].id];
	var isHoldedBefore = false;
	// 若这对组合之前也被跳过了，确认是否平局 (因为没有相同ID所以只是单纯的比较组合(?))
	var len = EvenList.length;
	for( var i = 0; i < len; i++ ){
		if(EvenList[i][0] === currentQ[0] || EvenList[i][1] === currentQ[0]){
			if(EvenList[i][1] === currentQ[1] || EvenList[i][1] === currentQ[1]){
				if( confirm("先前已经选择跳过了。\n要设为平局吗？") ){
					return select_even();
				} else {
					isHoldedBefore = true;
					break;
				}
			}
		}
	}
	// 若之前没跳过同样的组合，则记录
	if( isHoldedBefore === false ){
		EvenList.push(currentQ);
	}

	// 前と違う質問を探す（もうパスできない時を考慮し、ある程度回数を制限する）
	var limit = 20;
	var isChange = false;
	for (var i = 1; i <= limit; i++) {
		if (currentQ && Question) {
			// 強制パス指定でask
			Question = SortTree.ask("PASS");
			if ($.inArray(Question[0].id, currentQ) == -1 || $.inArray(Question[1].id, currentQ) == -1) {
				hide_question();
				isChange = true;
				break;
			}
		}
	}
	if (isChange == false) {
		if( confirm("パスできません。\n引き分けにしますか？") ){
			var up = null;
			var down = null;
			if(Question[0].id < Question[1].id){
				up = Question[0];
				down = Question[1];
			} else {
				up = Question[1];
				down = Question[0];
			}
			down.isEven = true;
			up.add(down, true);
		}
	}
	if (ask_next() == false) {
		show_result();
		return false;
	}
	$("#count").text(QuestionCount);
	$("#hold").css("visibility", "visible");
	$("#back").css("visibility", "visible");
	if (Question) {
		if (Question[1].level() > RankNum) {
			return false;
		}
		show_question();
		return true;
	}
	return false;
}

function view_character(id, data) {
	$(id + " img").attr("src", data.getImagePath());
	$(id + " img").attr("alt", data.name);
	$(id + " p").text(data.name);
	$(id + " h3").text(data.nick);
}

function hide_question() {
	$("#left").fadeOut(fadeOutTime);
	$("#right").fadeOut(fadeOutTime);
}

function show_question() {
	view_character("#left", Question[0]);
	view_character("#right", Question[1]);
	$("#left").fadeIn(fadeInTime);
	$("#right").fadeIn(fadeInTime);
}

function view_progress() {}

// 選択
function button_click(arg) {
	$("#left").fadeOut(fadeOutTime);
	$("#right").fadeOut(fadeOutTime);
	backup();
	// 敗者と同着ツリー最上位の上に、勝者を追加する
	var winner = Question[arg.data.win];
	var loser = Question[arg.data.lose];
	winner.add(loser, false);

	if (ask_next() == false) {
		show_result();
	}
}

// 引き分け
function select_even() {
	$("#left").fadeOut(fadeOutTime);
	$("#right").fadeOut(fadeOutTime);
	backup();
	Question[1].isEven = true;
	Question[0].add(Question[1], true);
	if (ask_next() == false) {
		show_result();
	}
}

function toggle_current() {
	$("#samp").toggle();
	$("#samp").html(SortTree.toString());
	return false;
}

// どっちも除外
function remove_both() {
	Question[0].remove();
	Question[1].remove();
	if (ask_next() == false) {
		show_result();
	}
}

// 左は除外
function remove_left() {
	if(isFirstRemoveChoice){
		alert("注意：「ソートから外す」を選択すると、\n結果にも表示されなくなります。\nなるべく枠内を選択してくださいね。");
		isFirstRemoveChoice = false;
	}
	backup();
	Question[0].remove();
	if (ask_next() == false) {
		show_result();
	}
}

// 右は除外
function remove_right() {
	if(isFirstRemoveChoice){
		alert("注意：「ソートから外す」を選択すると、\n結果にも表示されなくなります。\nなるべく枠内を選択してくださいね。");
		isFirstRemoveChoice = false;
	}
	backup();
	Question[1].remove();
	if (ask_next() == false) {
		show_result();
	}
}

/**
* ランダム自動ソート用自動選択処理。タイマーをかけて使う。
*/
function realtimeSelect(){
	if( ask_next() ){
		Question[0].add(Question[1], false);
		return true;
	} else {
		clearInterval(GIntervalTimer);
		show_result();
		return false;
	}
};

/**
* ランダム自動ソート
*/
function auto_sort() {
	$(".special_select").hide();
	fadeInTime = 0;
	// グローバルスコープでタイマーをセット
	GIntervalTimer = setInterval(realtimeSelect, 50);
	
	return false;
}

function reset_do() {
	$("#init").removeAttr("style");
	$("#ui").hide();
	$("#result").hide();
	$("#reset").hide();
	$("#hold").css("visibility", "visible");
	$("#back").css("visibility", "visible");
	Question = null;
	QuestionBackup = null;
	SortTree = null;
	document.location = location.pathname;
}
// 結果表示
function show_result() {
	// 結果が出た時点でインクリメント済みなので1つ戻す
	--QuestionCount;
	// 経過時間の確認
	var timeElapsed = 0;
	var timeElapsedMinutes = 0;
	if( !ElapsedTime && TimeStarted ){
		timeElapsed = Math.floor((new Date().getTime() - TimeStarted.getTime()) / 1000);
		timeElapsedMinutes = Math.floor((timeElapsed / 60));
		ElapsedTime = timeElapsed;
		console.log("経過時間: " + timeElapsed + " 秒( " + timeElapsedMinutes +" 分)");
	} else if (ElapsedTime){
		timeElapsed = ElapsedTime;
		timeElapsedMinutes = Math.floor((timeElapsed / 60));
	}
	
	$("#ui").hide();
	$("#result").html("");
	var aryRanks = [];
	// ツリーを全て辿って一次元配列化（SortTreeメソッド化要検討）
	var objCur = SortTree.children[0];
	while(aryRanks.length < RankNum) {
		aryRanks.push(objCur);
		if (objCur.children.length >= 1) {
			objCur = objCur.children[0];
		} else {
			break;
		}
	}
	
	var strHtm = "";
	var strResults = [];
	var tweetResult = [];
	var simpleResult = [];
	simpleResult.push('<button id="viewSimpleResult">結果のテキスト版を表示</button><ul class="simpleResult">');
	tweetResult.push(encodeURIComponent("東方キャラソート結果！\n"));
	strHtm += '\n<h2>ソート結果発表！';
	if (QuestionCount > 0) {
		strHtm += '<span id="times">(第 ' + QuestionCount + ' 問で終了)</span>';
	}
	if( timeElapsed > 0 ){
		strHtm += '<span id="elapsed"> (' + timeElapsedMinutes + ' 分)</span>';
	}
	strHtm += '</h2>\n<ul class="rs_1st">\n';
	for (var i = 0; i < aryRanks.length; i++) {
		if (i == 2) {
			strHtm += '</ul>\n<ul class="rs_2nd">\n';
		}
		if (i == 6) {
			strHtm += '</ul>\n<ul class="rs_3rd">\n';
		}
		if (i >= 10 && i % 10 == 0) {
			strHtm += '</ul>\n<ul class="rs_4th">\n';
		}
		var rankNo = aryRanks[i].rank();
		strHtm += '<li><h3>' + rankNo + '</h3>';
		if (FacePattern == noFacePatternNo) {
			strHtm += aryRanks[i].name + '</li>\n';
		} else {
			strHtm += '<img src="' + aryRanks[i].getImagePath() + '" alt="' + aryRanks[i].nick + '" /><br />' + aryRanks[i].name + '</li>\n';
		}
		// 引き分けている場合は先頭に識別子を付加
		strResults.push((aryRanks[i].isEven ? "!" : "") + aryRanks[i].id);
		
		var recordText = rankNo + "位：" + aryRanks[i].name;
		if (i < 7) {
			tweetResult.push(encodeURIComponent(recordText + "\n"));
		}
		simpleResult.push("<li>" + recordText + "</li>");
	}
	tweetResult.push(encodeURIComponent("全" + aryRanks.length + "位を見る→ "));
	simpleResult.push("</ul>");
	strHtm += "</ul>\n";
	var siteQuery = strResults.join("-") + '-q' + QuestionCount + '-f' + FacePattern + '-t'  + ElapsedTime;
	if (location.search.length < 2) {
		strHtm += '<div class="special_select"><br />';
		strHtm += '[<a target="_blank" href="https://twitter.com/intent/tweet?url=' + location.href + '?' + siteQuery + '&amp;text=' +
			tweetResult.join("") + '">ソート結果をツイート</a>]<br />';
		strHtm += '[<a href="?' + siteQuery + '">このソート結果の URL</a>] (Twitter 以外のサイトに貼り付ける場合はこちら)<br />';
		strHtm += '</div>';
	}
	strHtm += simpleResult.join("\n");
	$("#result").html(strHtm);
	$("#result").fadeIn(1000);
	
	$(".simpleResult").slideToggle();
	$("#viewSimpleResult").click(function(){
		$(".simpleResult").slideToggle();
	});
}
