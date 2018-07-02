var piece_board; //盤上の駒の画像のIDを入れておく変数
var piece_dummy; //ダミーの駒の画像のIDを入れておく変数
var piece_black_capture; //先手の駒台の駒の画像のIDを入れておく変数
var piece_white_capture; //後手の駒台の駒の画像のIDを入れておく変数
var piece_promotion_window;  //成／不成を選択するウインドウに表示する駒の画像のIDを入れておく変数
var promotion_window;  //成／不成を選択するウインドウの画像のIDを入れておく変数
var komaName;	//駒の名前入れておく変数

var selectedFlgB;  //盤上の駒が選択された状態かどうか
var selectedFlgC;  //持ち駒が選択された状態かどうか
var promotionWindowFlg;  //成／不成を選択するウインドウが表示されているかどうか
var outeFlg;

var fromClickDan,fromClickSuji;  //駒を選択するときにクリックしたマスの段と筋
var toClickDan,toClickSuji; //指した手のマスの段と筋
var toClickDan2,toClickSuji2; //一手前の情報を格納


var selectedKoma; //選択された駒の種類
var teban;  //手番 trueが先手番  falseが後手番

var board = []; //将棋盤の配列
var board2 = []; //ダミー盤の配列(駒の動ける範囲の色を変えるために用意した)
var capture = []; //持ち駒の配列

var slb,slw;
var cnt = 0;	//手数を数える変数
var kifu = []; kifu[0] = "";//棋譜の指し手を記録する配列
var moveDan = [];	//選択した駒の動ける範囲を入れる配列
var moveSuji = [];	
var janpDan = [];
var janpSuji = [];

//駒の種類を数字で表す 
var OUT_OF_BOARD = 128;  
var EMPTY = 0;
var FU = 1;
var KY = 2;
var KE = 3;
var GI = 4;
var KI = 5;
var KA = 6;
var HI = 7;
var OU = 8;
var PROMOTED = 8;
var TO = PROMOTED + FU;
var NY = PROMOTED + KY;
var NK = PROMOTED + KE;
var NG = PROMOTED + GI;
var UM = PROMOTED + KA;
var RY = PROMOTED + HI;
var ENEMY = 16;
var EFU = ENEMY + FU;
var EKY = ENEMY + KY;
var EKE = ENEMY + KE;
var EGI = ENEMY + GI;
var EKI = ENEMY + KI;
var EKA = ENEMY + KA;
var EHI = ENEMY + HI;
var EOU = ENEMY + OU;
var ETO = ENEMY + TO;
var ENY = ENEMY + NY;
var ENK = ENEMY + NK;
var ENG = ENEMY + NG;
var EUM = ENEMY + UM;
var ERY = ENEMY + RY;



//動きの配列
Direction = [];

Direction[0]  = new Pos(0,-1);   //←
Direction[1]  = new Pos(-1,0);   //↑
Direction[2]  = new Pos(-1,1);   //→↑
Direction[3]  = new Pos(-1,-1);  //←↑
Direction[4]  = new Pos(0,1);  //→
Direction[5]  = new Pos(1,0); //↓
Direction[6]  = new Pos(1,-1);  //←↓
Direction[7]  = new Pos(1,1);  //→↓
Direction[8]  = new Pos(-2,1);  //先手の桂馬飛び
Direction[9]  = new Pos(-2,-1); //先手の桂馬飛び
Direction[10] = new Pos(2,1);   //後手の桂馬飛び
Direction[11] = new Pos(2,-1);  //後手の桂馬飛び

//駒の種類ごとの動きの配列
var canGo = [
    //←
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1
    ],
    
    //↑
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1
    ],
    
    //→↑
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,1
    ],
    
    //←↑
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,1
    ],
    
    //→
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1
    ],
    
    //↓
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1
    ],
    
    //←↓
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1
    ],
    
    //→↓
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1
    ],
    
    //先手の桂馬飛び{-2,1}
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    
    //先手の桂馬飛び{2,1}
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    
    //後手の桂馬飛び{-2,1}
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    
    //後手の桂馬飛び{2,1}
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    
    ];
    //飛車、角用の配列
    var canJump = [
    //←
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1
    ],
    
    //↑
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1
    ],
    
    //→↑
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0
    ],
    
    //←↑
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0
    ],
    
    //→
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1
    ],
    
    //↓
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1
    ],
    
    //←↓
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0
    ],
    
    //→↓
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0
    ],
    
    //先手の桂馬飛び{-2,1}
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    
    //先手の桂馬飛び{2,1}
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    
    //後手の桂馬飛び{-2,1}
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],
    
    //後手の桂馬飛び{2,1}
    [
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //  歩香桂銀金角飛玉と杏圭全金馬竜
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ]
    
    ];

//関数
//先手の駒かどうか
var blackKoma = function(koma){
	return (FU <= koma && koma <= RY);
}

//後手の駒かどうか
var whiteKoma = function(koma){
	return (EFU <= koma && koma <= ERY);
}

//成ることができる駒かどうか
var canPromoteKoma = function(koma){
	var k = koma & ~ENEMY;
	return (FU <= k && k <= HI && k != KI && k != OU);
}

//駒かどうか
var Koma = function(koma){
	return ((FU <= koma && koma <= RY) || (EFU <= koma && koma <= ERY));
}

//先手の陣地かどうか
var blackArea = function(dan,suji){
	return (7 <= dan && dan <= 9 && 1 <= suji && suji <= 9);
}

//後手の陣地かどうか
var whiteArea = function(dan,suji){
	return (1 <= dan && dan <= 3 && 1 <= suji && suji <= 9);
}

//成ることができるかどうか
var canPromote = function(koma,teban,dan,suji){
	return (canPromoteKoma(koma) && (blackKoma(koma) && whiteArea(dan,suji) || whiteKoma(koma) && blackArea(dan,suji)));
}

//駒が成る時に操作する関数 
var doPromoto = function(pos){
		board[pos.dan][pos.suji] += +PROMOTED;	//駒を成る
		selectedKoma += +PROMOTED; 				//outeJudgmentでselectedKomaを使うので書き換え
		toClickDan2 = toClickDan;
		toClickSuji2 = toClickSuji;
		toClickDan = pos.dan;
		toClickSuji = pos.suji;
		outeJudgment(pos);
		var _kifu = kifu[cnt].slice(0,3);	//1文字目から3文字目までを格納
		var _kifu2 =  kifu[cnt].slice(3,7); //4文字目から7文字目までを格納
		kifu[cnt] = _kifu + "成" + _kifu2;
		kifWrite();
		showBoard();
	}

//棋譜の書き出し
var kifWrite = function(){
	var t = document.getElementById("textBox");
	var ret = ( '  ' + cnt ).slice( -2 );
	console.log(ret);
	
	t.childNodes[1].childNodes[1].childNodes[0].value += "" + "\n" + "  " + ret + " " + kifu[cnt]
	+ " ( 0:00/00:00:00)";  
}




//王手がかかってるかどうか。
var outeJudgment = function(pos){
	var b = document.getElementById("board");
	outeFlg = false;　//呼び出す度に初期化する
	movingColor(pos);
	for(var i=0; i<12 ; i++){
		if(moveDan[i] != 0 && moveSuji[i] != 0 ){
			if(board[moveDan[i]][moveSuji[i]] == EOU && teban){
				outeFlg = true;
			}
			else if(board[moveDan[i]][moveSuji[i]] == OU && !teban){
				outeFlg = true;
			}
		}
	}
	for(var i=0; i<8; i++){
		for(var j=0; j<8; j++){
			if(janpDan[i][j] != 0 && janpSuji[i][j] != 0 && !(isNaN(janpDan[i][j]))){
				if(board[janpDan[i][j]][janpSuji[i][j]] == EOU && teban){
					outeFlg = true;
				}
				else if (board[janpDan[i][j]][janpSuji[i][j]] == OU && !teban)
					outeFlg = true;
			}
		}
	}
	if(outeFlg == true)
	alert("王手です！");


}

//数値を駒表記に変換
var conversionKifu = function(koma){
	switch(koma){
	case FU:  komaName = "歩";
						break;
	case KY:  komaName = "香";
						break;
	case KE:	komaName = "桂";
						break;
	case GI:  komaName = "銀";
						break;
	case KI:  komaName = "金";
						break;
	case KA:	komaName = "角";
						break;
	case HI:  komaName = "飛";
						break;
	case OU:  komaName = "玉";
						break;
	case NY:	komaName = "成香";
						break;
	case NK:  komaName = "成桂";
						break;
	case NG:  komaName = "成銀";
						break;
	case UM:	komaName = "馬";
						break;
	case RY:	komaName = "龍"									 
						 break;
	case EFU:  komaName = "歩";
						break;
	case EKY:  komaName = "香";
						break;
	case EKE:	komaName = "桂";
						break;
	case EGI:  komaName = "銀";
						break;
	case EKI:  komaName = "金";
						break;
	case EKA:	komaName = "角";
						break;
	case EHI:  komaName = "飛";
						break;
	case EOU:  komaName = "玉";
						break;
	case ENY:	komaName = "成香";
						break;
	case ENK:  komaName = "成桂";
						break;
	case ENG:  komaName = "成銀";
						break;
	case EUM:	komaName = "馬";
						break;
	case ERY:	komaName = "龍"									 
					 	break;

	}
	return komaName;
}

//半角数値を全角数値に変換
var conversionNumber = function(number){
	switch(number){
		case 1: return "１";
				break;
		
		case 2: return "２";
				break;

		case 3: return "３";
				break;

		case 4: return "４";
				break;
		
		case 5: return "５";
				break;

		case 6: return "６";
				break;
				
		case 7: return "７";
				break;
		
		case 8: return "８";
				break;

		case 9: return "９";
				break;

	}
}

//半角数値を漢数字に変換
var conversionKanzi = function(number){
	switch(number){
		case 1: return "一";
				break;
		
		case 2: return "二";
				break;

		case 3: return "三";
				break;

		case 4: return "四";
				break;
		
		case 5: return "五";
				break;

		case 6: return "六";
				break;
				
		case 7: return "七";
				break;
		
		case 8: return "八";
				break;

		case 9: return "九";
				break;

	}
}


function Pos (dan,suji){
	this.dan = dan;
	this.suji =suji;
}



//選択した駒が、選択したマスに動けるかどうかしらべる関数
//1なら動ける
var canMove = function(pos){
	for(var i = 0; i < 12; i++){
		if(canGo[i][selectedKoma]){
			if(pos.dan == fromClickDan + Direction[i].dan && pos.suji == fromClickSuji + Direction[i].suji)return 1;
			
			
			if(canJump[i][selectedKoma]){
				for(var j = 1; j <= 8; j++){
					var moved2 = new Pos(0,0);
					moved2.dan  = fromClickDan + Direction[i].dan * j;
					moved2.suji = fromClickSuji + Direction[i].suji * j;
					if(pos.dan == moved2.dan && pos.suji == moved2.suji)return 1;
					if(board[moved2.dan][moved2.suji] != EMPTY && board[moved2.dan][moved2.suji] != ENEMY)break;
				}
			}
			
		}
	}
}

//選択した駒の動ける箇所の配列を求める
 var movingColor = function(pos){
	for(var i = 0; i < 12; i++){
		moveDan[i] = 0;
		moveSuji[i] = 0;
		janpDan[i] = 0;
		janpSuji[i] = 0;
		if(canGo[i][selectedKoma]){
			var selectColorDan = pos.dan + Direction[i].dan;
			var selectColorSuji = pos.suji + Direction[i].suji;
			
			janpDan[i] = [,,,,,,,];
			janpSuji[i] = [,,,,,,,];
				if(teban){
					if(board[selectColorDan][selectColorSuji] == EMPTY || whiteKoma(board[selectColorDan][selectColorSuji]))
					{
						moveDan[i] = pos.dan + Direction[i].dan;
						moveSuji[i] = pos.suji + Direction[i].suji;
					}
					else{
		
						moveDan[i] = 0;
						moveSuji[i] = 0;
					}
				}else{
					if(board[selectColorDan][selectColorSuji] == EMPTY || blackKoma(board[selectColorDan][selectColorSuji]))
					{
						moveDan[i] = pos.dan + Direction[i].dan;
						moveSuji[i] = pos.suji + Direction[i].suji;
					}
					else{
						moveDan[i] = 0;
						moveSuji[i] = 0;
					}
				}
		}
		if(canJump[i][selectedKoma]){
			for(var j = 1; j <= 8; j++){
				var moved = new Pos(0,0);
				moved.dan  = pos.dan + Direction[i].dan * j;
				moved.suji = pos.suji + Direction[i].suji * j;
				if(teban){
					if(!(blackKoma(board[moved.dan][moved.suji])) && board[moved.dan][moved.suji] != OUT_OF_BOARD){
					janpDan[i][j] = moved.dan;
					janpSuji[i][j] = moved.suji;
					}
					if( board[moved.dan][moved.suji] != EMPTY)break;
				}
				else{
					if(!(whiteKoma(board[moved.dan][moved.suji])) && board[moved.dan][moved.suji] != OUT_OF_BOARD){
					janpDan[i][j] = moved.dan;	
					janpSuji[i][j] = moved.suji;
					}
					if( board[moved.dan][moved.suji] != EMPTY)break;
				}
			
				
				
			}
		} 
	}
		return moveDan,moveSuji,janpDan,janpSuji;
}

//ダミー盤の中身の削除と初期化
var dummyReset = function(){
	var b2 = document.getElementById("board2");
	for(var i =b2.childNodes.length-1; i>=0; i--){
		b2.removeChild(b2.childNodes[i]);
		}
	for(var i=1; i<10; i++){
			for(var j=1; j<10; j++){
					board2[i][j] = 0;
			}
		}
		showBoard();
}


 
//将棋盤全体（持ち駒もふくむ）を表示する
var showBoard = function(){
	
	var b = document.getElementById("board");    //"board"のIDを取得
	var b2 = document.getElementById("board2");
	 if(b.childNodes.length > 245){   //盤面更新の度にノードが増えすぎるため、一定以上溜まったら削除する
		for(var i = 0;i < 81; i++)
		b.removeChild(b.firstChild);
		}
	for(var dan = 1; dan <= 9; dan++){
	for(var suji = 1; suji <= 9; suji++){
		var c = piece_board[board[dan][suji]].cloneNode(true); //駒画像の要素を複製
		var c2 = piece_dummy[board2[dan][suji]].cloneNode(true);
		c.style.left = 15 + ((suji - 1) * 30) + "px";
		c2.style.left = 15 + ((suji - 1) * 30) + "px";         //位置を調節
		c2.style.zIndex = 30 ; 
		c.style.top = 15 + ((dan - 1) * 32) + "px"; 
		c2.style.top = 15 + ((dan - 1) * 32) + "px";
		c.style.zIndex = 20 ;
		b.appendChild(c);                                //"board"に駒画像のノードを追加
		b2.appendChild(c2);

		if(board[dan][suji] != EMPTY && board[dan][suji] != OUT_OF_BOARD ){  //もしマスに駒があれば
		
			(function(){
				var emp_pos = new Pos(dan,suji);    //danとsujiは1ずつ足されていくので覚えておく
				c2.onclick = function(){   //クリックされたらこの関数が呼び出される
					(teban == blackKoma(board[emp_pos.dan][emp_pos.suji]) && !promotionWindowFlg) ? selectSelfKoma(emp_pos) : selectEnemyKoma(emp_pos);
				};
			})();
		}
		

		if(board[dan][suji] == EMPTY ){    //もしマスに駒がなければ
			(function(){
				var emp_pos = new Pos(dan,suji);
				c2.onclick = function(){
					selectEmptyCell(emp_pos);
					}
			})();
		}
	}
	}
	
	//持ち駒の表示
	var cb = document.getElementById("capture_black"), cw = document.getElementById("capture_white");
	var fragmentB = document.createDocumentFragment(), fragmentC = document.createDocumentFragment();

	
	//先手の持ち駒
	for(var koma = FU; koma <= HI; koma++){
		(function(){
		var _koma = koma;
		if(capture[0][_koma] != EMPTY){
			ShowBlackCapture(_koma);
		}
		})();
	}
	
	//後手の持ち駒
	for(var koma = FU; koma <= HI; koma++){
		(function(){
		var _koma = koma;
		if(capture[1][_koma] != EMPTY){
			showWhiteCapture(_koma);
		}
		}());
	}
	
	//手番の表示
	var TebanMessage = document.getElementById("TebanMessage");
	
	(teban) ? TebanMessage.innerHTML = "先手番<br>" : TebanMessage.innerHTML = "後手番<br>";


	//手数と指し手の表示
	var teMessage = document.getElementById("teMessage");
	teMessage.innerHTML =""+ cnt +"手目" + kifu[cnt] + "<br>"; 

	
};



//手番の駒をクリックしたときにつかう関数
var selectSelfKoma = function(pos){
	var b = document.getElementById("board");
	var b2 = document.getElementById("board2");   
	if(teban){
		slb.style.left =  14 + ((pos.suji - 1) * 30) + "px";
		slb.style.top = 13 + ((pos.dan - 1) * 32) + "px";
		slb.onclick = function(){
			selectedFlgB = false; 
			
			slb.parentElement.removeChild(slb);
			
			}
		b.appendChild(slb);
		
	}

	else{
		slw.style.left = 15 + ((pos.suji - 1) * 30) + "px";
		slw.style.top = 14 + ((pos.dan - 1) * 32) + "px";
		slw.onclick = function(){
			selectedFlgB = false; 
			slw.parentElement.removeChild(slw);
		}
		b.appendChild(slw);
	}
	
	  if(selectedFlgB){		//連続で自分の駒をクリックした時
		dummyReset();
	}  
	selectedFlgB = true; 
	selectedFlgC = false;
	selectedKoma = board[pos.dan][pos.suji];
	
	fromClickDan = pos.dan; fromClickSuji = pos.suji;

	  movingColor(pos);
	for(var i=0; i<12 ; i++){
		if(moveDan[i] != 0 && moveSuji[i] != 0){
			board2[moveDan[i]][moveSuji[i]]= 2;
		}
	}
	for(var i=0; i<8; i++){
		for(var j=0; j<8; j++){
			if(janpDan[i][j] != 0 && janpSuji[i][j] != 0 && !(isNaN(janpDan[i][j]))){
				board2[janpDan[i][j]][janpSuji[i][j]] = 2;
			}
		}
	}
	showBoard(); 
};


//敵の駒をクリックしたときにつかう関数
var selectEnemyKoma = function(pos){
	var b = document.getElementById("board");
	var b2 = document.getElementById("board2");
	var cb = document.getElementById("capture_black"), cw = document.getElementById("capture_white");
	
	//盤上の駒を選択している状態なら
	if(selectedFlgB && canMove(pos)){

		var intteban = +teban;
		capture[intteban ^ 1][board[pos.dan][pos.suji] & ~ENEMY & ~PROMOTED]++;
		
		
		dummyReset();
		board[pos.dan][pos.suji] = EMPTY;
		showBoard();
		board[pos.dan][pos.suji] = selectedKoma;
		toClickDan2 = toClickDan;
		toClickSuji2 = toClickSuji;
		toClickDan = pos.dan;
		toClickSuji = pos.suji;
		console.log("toDan:" + toClickDan + "toSuji:" + toClickSuji + "toDan2" + toClickDan2 + "toSuji2" + toClickSuji2 );
			if(toClickDan2 == toClickDan && toClickSuji2 == toClickSuji){
				kifu[++cnt] = '' + "同　" + conversionKifu(selectedKoma) + "(" + (10 - fromClickSuji) + fromClickDan + ")  ";
			}
			else{
				kifu[++cnt] = '' + conversionNumber(10 - pos.suji ) + conversionKanzi(pos.dan) + conversionKifu(selectedKoma) + "(" + ( 10 - fromClickSuji) + fromClickDan + ")  ";
			}

		board[fromClickDan][fromClickSuji] = EMPTY;[]
		selectedFlgB = false; 
		selectedFlgC = false; 
		(teban) ? b.removeChild(slb) : b.removeChild(slw);
		
		
		if((canPromote(selectedKoma,teban,pos.dan,pos.suji) || canPromote(selectedKoma,teban,fromClickDan,fromClickSuji))){
			//二段目に桂馬が成る時にウィンドウを生成しないようにする
			//一段目に桂歩香が成る時にウィンドウを生成しないようにする
			if((teban && pos.dan == 2 && selectedKoma == KE || pos.dan == 1 && (selectedKoma == FU || selectedKoma == KY || selectedKoma == KE)) 
			|| !teban && pos.dan == 8 && selectedKoma == EKE || pos.dan == 9 && (selectedKoma == EFU || selectedKoma == EKY || selectedKoma == EKE)){
					teban = !teban; 
					doPromoto(pos);
					
				}
			
			else{
				showPromotionWindow(pos);

			}
		}
		
		else{
			outeJudgment(pos);
			kifWrite();
			selectedKoma = EMPTY;
			teban = !teban;
			showBoard();
			
		}
	}
	//持ち駒を選択している状態なら
	if(selectedFlgC){
		(teban) ? cb.removeChild(slb) : cw.removeChild(slw);
	}
selectedFlgC = false;

}


//空のマスをクリックしたときにつかう関数
var selectEmptyCell = function(pos){
	var b = document.getElementById("board");
	var b2 = document.getElementById("board2");    
	var cb = document.getElementById("capture_black"), cw = document.getElementById("capture_white");
	
		//もし駒が選択された状態なら
	if(selectedFlgB && canMove(pos)){
			
				kifu[++cnt] = '' + conversionNumber(10 - pos.suji ) + conversionKanzi(pos.dan) + conversionKifu(selectedKoma) + "(" + ( 10 - fromClickSuji) + fromClickDan + ")  ";
				dummyReset();
			board[pos.dan][pos.suji] = selectedKoma;
			toClickDan2 = toClickDan;
			toClickSuji2 = toClickSuji;
			toClickDan = pos.dan;
			toClickSuji = pos.suji;
			board[fromClickDan][fromClickSuji] = EMPTY; 
			selectedFlgB = false;   
			selectedFlgC = false;
			
			
			if(canPromote(selectedKoma,teban,pos.dan,pos.suji) || canPromote(selectedKoma,teban,fromClickDan,fromClickSuji)){
				
				
				if((teban && pos.dan == 2 && selectedKoma == KE || pos.dan == 1 && (selectedKoma == FU || selectedKoma == KY || selectedKoma == KE))
				|| !teban && pos.dan == 8 && selectedKoma == EKE || pos.dan == 9 && (selectedKoma == EFU || selectedKoma == EKY || selectedKoma == EKE)){
					
					teban = !teban;
					doPromoto(pos);
					
					
				}
				
				else{
					showPromotionWindow(pos);
					(teban) ? b.removeChild(slb) : b.removeChild(slw);
				}
			}
			
			else{
				outeJudgment(pos);
				kifWrite();
				(teban) ? b.removeChild(slb) : b.removeChild(slw);
				selectedKoma = EMPTY;
				
				teban = !teban;
				
				showBoard(); 
			}
	}
	
	if(selectedFlgC){
		dummyReset();
		//二歩はさせないようにする
		//筋に歩があるかチェック（歩があればiが10未満)
		for(var i=1;i<10;i++){
			
				if(board[i][pos.suji] == FU　&& teban){
					break;
				}
				else if(board[i][pos.suji] == EFU && !teban){
					break;
				}
		}
			if(i==10 && (selectedKoma == FU || selectedKoma == EFU) || selectedKoma != FU && selectedKoma != EFU){	
				if(!(((teban && pos.dan == 2 && selectedKoma == KE || pos.dan == 1 && (selectedKoma == KY || selectedKoma == KE || selectedKoma == FU))	//打った後に進めない駒を打てなくした
				||(!teban && pos.dan == 8 && selectedKoma == EKE || pos.dan == 9 && (selectedKoma == EKY || selectedKoma == EKE || selectedKoma == EFU))))){
					board[pos.dan][pos.suji] = selectedKoma;  
					toClickDan2 = toClickDan;
					toClickSuji2 = toClickSuji;
					toClickDan = pos.dan;
					toClickSuji = pos.suji;
					outeJudgment(pos);
					kifu[++cnt] = '' + conversionNumber(10 - pos.suji ) + conversionKanzi(pos.dan) + conversionKifu(selectedKoma) + "打    ";
					kifWrite();
					var intteban = +teban;
					capture[intteban ^ 1][selectedKoma & ~ENEMY & ~PROMOTED]--;
					(teban) ? cb.removeChild(slb) : cw.removeChild(slw);
					
					if(teban){
					while(cb.firstChild){
						cb.removeChild(cb.firstChild);
					}
					}
					else{
					while(cw.firstChild){
						cw.removeChild(cw.firstChild);
					}
					}
					selectedKoma = EMPTY;
					selectedFlgB = false;   
					selectedFlgC = false;  
					teban = !teban;   
					showBoard(); 
				}
			}
	}
}

	
//先手の持ち駒を表示する関数
var ShowBlackCapture = function(koma){
	var cb = document.getElementById("capture_black"), cw = document.getElementById("capture_white");
	var fragmentB = document.createDocumentFragment(), fragmentC = document.createDocumentFragment();

	for(var i = 1; i <= capture[0][koma]; i++){
		
		var pcb = piece_black_capture[koma].cloneNode(true);
		pcb.style.left = !(koma%2)*72+5+(capture[0][koma]-i)*10 + "px";
		pcb.style.top = (7-koma-(7-koma)%2)/2*46+20+ "px";
	
		if(i == capture[0][koma]){
			pcb.onclick = function(){
			if(teban && !promotionWindowFlg){
				slb.style.left = !(koma%2)*72+3+ "px";
				slb.style.top = (7-koma-(7-koma)%2)/2*46+43 + "px";
				slb.onclick = function(){
					if(teban){
						slb.parentElement.removeChild(slb);
						selectedFlgC = false; 
					}
				}
				
				selectedFlgC = true; 
				selectedKoma = koma;
				cb.appendChild(slb);
			}
			if(teban){
				selectedFlgB = false; 
			}
			}
		}
	fragmentB.appendChild(pcb);
	}
	cb.appendChild(fragmentB);
}


//後手の持ち駒を表示する関数
var showWhiteCapture = function(koma){
	var cb = document.getElementById("capture_black"), cw = document.getElementById("capture_white");
	var fragmentB = document.createDocumentFragment(), fragmentC = document.createDocumentFragment();
	for(var i = 1; i <= capture[1][koma]; i++){

		var pcw = piece_white_capture[koma].cloneNode(true);
		pcw.style.left = (koma%2)*72+30-(capture[1][koma]-i)*10 + "px";
		pcw.style.top = (koma-(koma)%2)/2*46+10 + "px";
		
		if(i == capture[1][koma]){
			pcw.onclick = function(){
				if(!teban  && !promotionWindowFlg){
					slw.style.left = (koma%2)*72+29+ "px";
					slw.style.top = (koma-(koma)%2)/2*46+10 + "px";
					slw.onclick = function(){
							slw.parentElement.removeChild(slw);
							selectedFlgC = false; 
					}
					
					selectedFlgC = true; 
					selectedKoma = koma | ENEMY;
					cw.appendChild(slw);
				}
			if(!teban){
				selectedFlgB = false; 
			}
			}
		}
		fragmentC.appendChild(pcw);
	}
	cw.appendChild(fragmentC);
}


//成／不成を選択するウインドウを表示する関数
var showPromotionWindow = function(pos){
	var b = document.getElementById("board");   
	var promotion_window = document.getElementById("promotion_window");
	var fragment = document.createDocumentFragment();
	
	var WindowClickFlg;
	
	var showPromotionWindow = function (){		//ウィンドウを生成する
		pw_img.style.left = (pos.suji - 1) * 32 + 10 + "px";
		pw_img.style.top = 8 + ((pos.dan - 1) * 30) + "px";
		pw_img.style.zIndex  = 40;
		
		var ppw = piece_promotion_window[selectedKoma & ~ENEMY];
		ppw.style.left = (pos.suji - 1) * 32 + 15 + "px";	//成る方のウィンドウ
		ppw.style.top = 8 + ((pos.dan - 1) * 30) + "px";
		ppw.style.zIndex  = 40;
		ppw.onclick = function(){
			b.removeChild(pw_img);				//生成したウィンドウをクリックしたら３つとも削除する
			b.removeChild(ppw);
			b.removeChild(pc);
			doPromoto(pos);
			promotionWindowFlg = false;
		}

		var pc = piece_black_capture[selectedKoma & ~ENEMY & ~PROMOTED];
		pc.style.left = (pos.suji - 1) * 32 - 30 + "px";	//成らない方のウィンドウ
		pc.style.top = 8 + ((pos.dan - 1) * 30) + "px";
		pc.style.zIndex  = 40;
		pc.onclick = function(){
			outeJudgment(pos);
			kifWrite();
			var _kifu = kifu[cnt].slice(0,3);	//1文字目から3文字目までを格納
			var _kifu2 =  kifu[cnt].slice(3,7); //4文字目から7文字目までを格納
			kifu[cnt] = _kifu + "不成" + _kifu2;
			b.removeChild(pw_img);
			b.removeChild(ppw);
			b.removeChild(pc);
			promotionWindowFlg = false;
		}
		
		fragment.appendChild(pw_img);
		fragment.appendChild(ppw);
		fragment.appendChild(pc);

	};
	
	promotionWindowFlg = true;
	showPromotionWindow(pos);
	b.appendChild(fragment);

	var timerID = setInterval(function(){
	if(!promotionWindowFlg){
		clearInterval(timerID);
		timerID = null;
		selectedKoma = EMPTY;
		teban = !teban;
		showBoard();
	}
	},100);	
}


//ページ読み込み時に以下の処理を実行
window.onload = function(){    

	//手番を初期化
	teban = true; //先手番（true）
	
	//選択フラグを初期化
	selectedFlgB = false;
	selectedFlgC = false;
	promotionWindowFlg = false;
	

	//選択した状態の画像のIDを取得
	slb = document.getElementById("selected_black"); slw = document.getElementById("selected_white");  
	
	//pieceにコマ画像のIDを入れておく
	piece_board = [
	document.getElementById("cell_board"),
	document.getElementById("FU_black"),
	document.getElementById("KY_black"),
	document.getElementById("KE_black"),
	document.getElementById("GI_black"),
	document.getElementById("KI_black"),
	document.getElementById("KA_black"),
	document.getElementById("HI_black"),
	document.getElementById("OU_black"),
	document.getElementById("TO_black"),
	document.getElementById("NY_black"),
	document.getElementById("NK_black"),
	document.getElementById("NG_black"),
	document.getElementById("KI_black"),
	document.getElementById("UM_black"),
	document.getElementById("RY_black"),
	document.getElementById("cell_board2"),
	document.getElementById("FU_white"),
	document.getElementById("KY_white"),
	document.getElementById("KE_white"),
	document.getElementById("GI_white"),
	document.getElementById("KI_white"),
	document.getElementById("KA_white"),
	document.getElementById("HI_white"),
	document.getElementById("OU_white"),
	document.getElementById("TO_white"),
	document.getElementById("NY_white"),
	document.getElementById("NK_white"),
	document.getElementById("NG_white"),
	document.getElementById("KI_white"),
	document.getElementById("UM_white"),
	document.getElementById("RY_white"),
	document.getElementById("cell_board2"),
	];
	piece_dummy = [
	document.getElementById("cell_dummy"),
	document.getElementById("cell_dummy"),
	document.getElementById("cell_color")	
	];
	
	

	piece_black_capture = [
	document.getElementById("cell_capture"),
	document.getElementById("FU_black_capture"),
	document.getElementById("KY_black_capture"),
	document.getElementById("KE_black_capture"),
	document.getElementById("GI_black_capture"),
	document.getElementById("KI_black_capture"),
	document.getElementById("KA_black_capture"),
	document.getElementById("HI_black_capture")
	];
	
	piece_white_capture = [
	document.getElementById("cell_capture"),
	document.getElementById("FU_white_capture"),
	document.getElementById("KY_white_capture"),
	document.getElementById("KE_white_capture"),
	document.getElementById("GI_white_capture"),
	document.getElementById("KI_white_capture"),
	document.getElementById("KA_white_capture"),
	document.getElementById("HI_white_capture")
	];
	
	piece_promotion_window = [
	document.getElementById("cell_capture"),
	document.getElementById("TO_window"),
	document.getElementById("NY_window"),
	document.getElementById("NK_window"),
	document.getElementById("NG_window"),
	document.getElementById("cell_capture"),
	document.getElementById("UM_window"),
	document.getElementById("RY_window"),
	];
	
	pw_img = document.getElementById("pw_img");

	//boardの９×９の範囲はEMPTY、それ以外はOUT_OF_BOARD
	for(var i = 0; i <= 10; i++){
		board[i] = [];
		board2[i] = [];
		for(var j = 0; j <= 10; j++){
			board[i][j] = OUT_OF_BOARD;	
			board2[i][j] = 0;
		}
	}
		
	for(var i = 1; i <= 9; i++){
	for(var j = 1; j <= 9; j++){
			board[i][j] = EMPTY;
			board2[i][j] = 0;	
	}
	}

	for(var i = 0; i <= 1; i++){
		capture[i] = [];
		for(var j = 0; j <= HI; j++){
			capture[i][j] = EMPTY;
		}	
	}

	capture[0][HI] = 0;
	capture[0][KA] = 0;
	capture[0][KI] = 0;
	capture[0][GI] = 0;
	capture[0][KE] = 0;
	capture[0][KY] = 0;
	capture[0][FU] = 0;

	capture[1][HI] = 0;
	capture[1][KA] = 0;
	capture[1][KI] = 0;
	capture[1][GI] = 0;
	capture[1][KE] = 0;
	capture[1][KY] = 0;
	capture[1][FU] = 0;

	//boardに駒を初期配置
	board[1][1] = EKY;
	board[1][2] = EKE;
	board[1][3] = EGI;
	board[1][4] = EKI;
	board[1][5] = EOU;
	board[1][6] = EKI;
	board[1][7] = EGI;
	board[1][8] = EKE;
	board[1][9] = EKY;
	board[2][2] = EHI;
	board[2][8] = EKA;
	board[3][1] = EFU;
	board[3][2] = EFU;
	board[3][3] = EFU;
	board[3][4] = EFU;
	board[3][5] = EFU;
	board[3][6] = EFU;
	board[3][7] = EFU;
	board[3][8] = EFU;
	board[3][9] = EFU;
	board[9][1] = KY;
	board[9][2] = KE;
	board[9][3] = GI;
	board[9][4] = KI;
	board[9][5] = OU;
	board[9][6] = KI;
	board[9][7] = GI;
	board[9][8] = KE;
	board[9][9] = KY;
	board[8][8] = HI;
	board[8][2] = KA;
	board[7][1] = FU;
	board[7][2] = FU;
	board[7][3] = FU;
	board[7][4] = FU;
	board[7][5] = FU;
	board[7][6] = FU;
	board[7][7] = FU;
	board[7][8] = FU;
	board[7][9] = FU;
	
	//将棋盤全体（持ち駒もふくむ）を表示する
	showBoard();
};

	
