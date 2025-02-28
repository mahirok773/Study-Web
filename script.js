const shortcuts = [
    { keys: ["Ctrl+C", "Command+C"], description: "コピーする" },
    { keys: ["Ctrl+V", "Command+V"], description: "貼り付ける" },
    { keys: ["Ctrl+Z", "Command+Z"], description: "直前の操作を取り消す（元に戻す）" },
    { keys: ["Ctrl+Y", "Command+Y"], description: "操作をやり直す" },
    { keys: ["Ctrl+A", "Command+A"], description: "すべて選択する" },
    { keys: ["Ctrl+X", "Command+X"], description: "切り取る" },
    { keys: ["Ctrl+F", "Command+F"], description: "文字検索する" },
    { keys: ["Ctrl+N", "Command+N"], description: "ファイルの新規作成する" },
    { keys: ["Ctrl+S", "Command+S"], description: "保存する" },
    { keys: ["Ctrl+P", "Command+P"], description: "印刷する" }
];

let timer;
let timeLeft = 30;
let currentShortcut;
let correctCount = 0;
let totalCount = 0;

document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
    correctCount = 0;
    totalCount = 0;
    timeLeft = 30;
    document.getElementById('timer-value').innerText = timeLeft;
    document.getElementById('result').innerText = '';
    document.getElementById('feedback').innerText = ''; // 追加
    document.getElementById('user-input').value = '';
    document.getElementById('user-input').disabled = false;
    document.getElementById('start-button').disabled = true;

    showRandomShortcut();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-value').innerText = timeLeft;

        if (timeLeft <= 0 || totalCount >= 11) {
            clearInterval(timer);
            document.getElementById('user-input').disabled = true;
            document.getElementById('start-button').disabled = false;
            document.getElementById('result').innerText = `終了！正解数: ${correctCount}/${totalCount}`;
        }
    }, 1000);
}

function showRandomShortcut() {
    const randomIndex = Math.floor(Math.random() * shortcuts.length);
    currentShortcut = shortcuts[randomIndex];
    document.getElementById('shortcut-display').innerText = `${currentShortcut.description}ためのショートカットは？`;
}

// 入力イベントリスナー（ショートカットキー対応）
document.getElementById('user-input').addEventListener('keydown', function(event) {
    event.preventDefault(); // ショートカットキーの実際の動作を防ぐ
    const keyCombination = `${event.ctrlKey ? 'Ctrl+' : ''}${event.metaKey ? 'Command+' : ''}${event.key.toUpperCase()}`;
    
    if (event.key === 'Enter') {
        totalCount++;
        const userInput = this.value.trim();
        if (currentShortcut.keys.includes(userInput)) {
            correctCount++;
            document.getElementById('feedback').innerText = '正解！';
        } else {
            document.getElementById('feedback').innerText = `間違い！正解は: ${currentShortcut.keys.join(' または ')}`;
        }
        this.value = '';
        showRandomShortcut();
    } else {
        this.value = keyCombination;
    }
});
