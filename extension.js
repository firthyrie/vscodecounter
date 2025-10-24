const vscode = require('vscode');

let chars = 0;
let start = Date.now();
let bar;

function activate(context) {
    bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    bar.show();

    setInterval(() => {
        const elapsed = Date.now() - start;
        const sec = Math.floor(elapsed / 1000);
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;

        const time = [h, m, s].map(v => String(v).padStart(2, '0')).join(':');

        bar.text = `Time: ${time} | Chars: ${chars}`;
    }, 1000);

    vscode.workspace.onDidChangeTextDocument(e => {
        e.contentChanges.forEach(change => chars += change.text.length);
    });

    const reset = vscode.commands.registerCommand('miniCounter.reset', () => {
        chars = 0;
        start = Date.now();
        vscode.window.showInformationMessage('Сброшено!');
    });

    context.subscriptions.push(bar, reset);
}

function deactivate() {}

module.exports = { activate, deactivate };