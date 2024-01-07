
// 変数の初期化
let untyped="";
let typed="";
let score=0;
let typedCount = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById("untyped");
const typedfield = document.getElementById("typed");
const wrap = document.getElementById('wrap');
const start = document.getElementById("start");
const count = document.getElementById('count');
// !追加コード
const count_type = document.getElementById('count_type');


// 複数のテキストを格納する配列
const textLists=[
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

const createText = () =>{
  typed="";
  typedfield.textContent=typed;
  let random =  Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};
// createText();

const keyPress = e =>{
  if(e.key!== untyped.substring(0,1)){
    wrap.classList.add('mistyped');
    setTimeout(() =>{
      wrap.classList.remove("mistyped");
    },100);
    // 関数終了
    return;
  }
  score++;
  wrap.classList.remove('mistyped');
  typed+=untyped.substring(0,1);
  untyped=untyped.substring(1);
  typedfield.textContent=typed;
  untypedfield.textContent=untyped;
  
  //!確認用 
  console.log(score);
  //!追加コード スコア表示
  typedCount++;
  count_type.textContent = typedCount;
  // ここまで

  if(untyped === ""){
    //!追加コード スコア表示
    typedCount=0;
    createText();
  }
};

const rankCheck = score =>{
  let text = "";
  if(score < 100){
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
     text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
     text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
     text = `あなたのランクはSです。\nおめでとうございます!`;    
  }

  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
  // return `${score}文字打てました!`;
};

const gameOver = id =>{
  // タイマーストップ
  clearInterval(id);
  //confirm→ OK」「キャンセル」ボタン付きのダイアログを表示する。
  const result = confirm(rankCheck(score));
  if(result == true){
    window.location.reload();
  }

};

const timer =() =>{
  // 60が入る
  let time = count.textContent;
  const id = setInterval(() =>{
    time--;
    // 残り時間を代入して表示する。
    count.textContent=time;
    if(time <=0){
        //!追加コード
      setTimeout(() =>{
        untypedfield.textContent = 'タイムアップ！';
       },100);
      //  !ここまで
      gameOver(id);
    }
  },1000);
};

start.addEventListener("click",() =>{
  timer();
  createText();
  start.style.display = 'none';
  document.addEventListener("keypress",keyPress);
});
untypedfield.textContent = 'スタートボタンで開始';
