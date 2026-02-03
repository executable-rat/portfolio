
class JapaneseMatrix {
    constructor() {
        this.symbols = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'];
        this.container = document.getElementById('matrix-bg');
        this.activeSymbols = [];
        
        this.init();
    }
    
    init() {

        for (let i = 0; i < 20; i++) {
            setTimeout(() => this.createSymbol(), i * 200);
        }
        

        setInterval(() => {
            if (this.activeSymbols.length < 25) {
                this.createSymbol();
            }
        }, 300);
    }
    
    createSymbol() {
        const symbol = document.createElement('div');
        symbol.className = 'japanese-symbol';
        symbol.textContent = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        

        symbol.style.left = Math.random() * 100 + 'vw';
        symbol.style.top = '-30px';
        symbol.style.opacity = Math.random() * 0.4 + 0.1;
        symbol.style.fontSize = (Math.random() * 8 + 14) + 'px';
        
        this.container.appendChild(symbol);
        

        const duration = 5000 + Math.random() * 10000;
        const targetY = window.innerHeight + 30;
        
        anime({
            targets: symbol,
            translateY: targetY,
            duration: duration,
            easing: 'linear',
            complete: () => {
                symbol.remove();
                const index = this.activeSymbols.indexOf(symbol);
                if (index > -1) this.activeSymbols.splice(index, 1);
            }
        });
        
        this.activeSymbols.push(symbol);
    }
}