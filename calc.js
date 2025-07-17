const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
let expression = '';

function show(value) {
    display.textContent = value;
    display.style.fontSize = value.length > 12 ? '25px' : '40px';
}

function evaluateExpression() {
    if (!expression) return show('0');

    try {
        const cleaned = expression.replace(/\u00D7/g, '*').replace(/\u00F7/g, '/');
        let result = eval(cleaned);

        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(8));
        }

        expression = result.toString();
        show(expression);
    } catch {
        show('Error');
        expression = '';
    }
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.textContent;

        if (val === 'AC') {
            expression = '';
            show('0');
        } else if (val === 'X') {
            expression = expression.slice(0, -1);
            show(expression || '0');
        } else if (val === '=') {
            evaluateExpression();
        } else {
            if (expression === '0' && !isNaN(val)) {
                expression = val;
            } else {
                expression += val;
            }
            show(expression);
        }
    });
});

document.addEventListener('keydown', e => {
    const key = e.key;
    const valid = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','(',')','.','Enter','Escape','Backspace'];

    if (!valid.includes(key)) return;
    e.preventDefault();

    if (key === 'Enter') {
        document.querySelector('.equals').click();
    } else if (key === 'Escape') {
        document.querySelector('.btn.special').click();
    } else if (key === 'Backspace') {
        buttons.forEach(btn => { if (btn.textContent === 'X') btn.click(); });
    } else if (key === '*') {
        buttons.forEach(btn => { if (btn.textContent === '×') btn.click(); });
    } else if (key === '/') {
        buttons.forEach(btn => { if (btn.textContent === '÷') btn.click(); });
    } else {
        buttons.forEach(btn => { if (btn.textContent === key) btn.click(); });
    }
});

window.onerror = () => {
    show('Error');
    expression = '';
    return true;
};
