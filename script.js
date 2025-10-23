const startBox = document.getElementById("start-box");
const startButton = document.getElementById("start-button");
const chatBox = document.getElementById("chat-box");
const questionBox = document.getElementById("question-box");

// 質問と答えのセット（10個）
const qaList = [
  { question: "ねー、あやか偉い？", answer: "ふつーー！！" },
  { question: "一緒にガスト行ぐが？", answer: "行こうよ行こうよー。おっかあガストだーい好き。" },
  { question: "今何やってらの？", answer: "今、テレビっこ見でらよー" },
  { question: "つとむしってうんこ虫なの？", answer: "つとむしは、つーよーむーし！" },
  { question: "彼氏に振られたー", answer: "まあ、そういうときもあるさあ" },
  { question: "仕事で嫌なことあったんだけどー", answer: "そういうときはさ、美味しいもの食べればいいんだね。" },
  { question: "おっかあ、今何食べでらの？", answer: "おっかあ、今エビフライ食べでらよー" },
  { question: "ガストで何頼むの？", answer: "んー、今日ハンバーグにするべかなあ" },
  { question: "おっかあゴンタ好き？", answer: "ゴンタ一番好きだな、ゴンタっちゅ！" },
  { question: "オバマとクリントンで女性はどっち？", answer: "う～ん、オバマ！！" }
];

let remaining = [...qaList];
let round = 0;

// 効果音の関数
function playReplySound() {
  const sound = document.getElementById("reply-sound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
function playClickSound() {
  const click = document.getElementById("click-sound");
  if (click) {
    click.currentTime = 0;
    click.play();
  }
}

function resetChat() {
  chatBox.innerHTML = "";
  questionBox.innerHTML = "";
  remaining = [...qaList];
  round = 0;
  startBox.style.display = "block";
}

function addMessage(text, side, iconPath) {
  const div = document.createElement("div");
  div.className = `message ${side}`;

  const img = document.createElement("img");
  img.src = iconPath;
  img.className = "icon";

  const p = document.createElement("p");
  p.textContent = text;

  div.appendChild(img);
  div.appendChild(p);
  chatBox.appendChild(div);
}

startButton.onclick = () => {
  playClickSound();
  startBox.style.display = "none";
  showQuestionChoices();
};

function showQuestionChoices() {
  questionBox.innerHTML = "";
  addMessage("さあ、どれにするべ？", "left", "mihoko.png");

  const choices = remaining.sort(() => 0.5 - Math.random()).slice(0, 3);

  choices.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.question;
    btn.onclick = () => {
      playClickSound();
      addMessage(item.question, "right", "user.png");

      // 0.5秒後に返信
      setTimeout(() => {
        addMessage(item.answer, "left", "mihoko.png");
        playReplySound(); 
        remaining = remaining.filter(q => q.question !== item.question);
        round++;

        if (round < 3 && remaining.length >= 3) {
          showQuestionChoices();
        } else {
          setTimeout(() => {
            addMessage("今日は終わり。またお話しよ～よ", "left", "mihoko.png");
            playReplySound();
            questionBox.innerHTML = "";
            // リセットボタンを追加
            const resetBtn = document.createElement("button");
            resetBtn.textContent = "もう一回話す";
            resetBtn.className = "reset-button";
            resetBtn.onclick = resetChat;
            questionBox.appendChild(resetBtn);
          }, 1000);
        }
      }, 1000);
    };
    questionBox.appendChild(btn);
  });
}
