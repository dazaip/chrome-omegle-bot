const setStyles = (elem: HTMLElement, styles: { [key: string]: string }) => {
    for (const [key, val] of Object.entries(styles)) {
        elem.style[key] = val;
    }
};

export enum ElementIds {
    START = 'start-bot-button',
    STOP = 'stop-bot-button',
    SENT_TEXT = 'bot-sent-text',
    STATUS = 'bot-run-status',
}

const button = (type: 'START' | 'STOP') => {
    const styles = {
        background: type === 'START' ? 'linear-gradient(135deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)' : 'red',
        'font-size': 'clamp(25px, 2.5vw, 35px)',
        'border-radius': '10px',
        border: 'none',
        cursor: 'pointer',
        width: '80%',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        color: 'white',
        'font-weight': '400',
        'font-style': 'italic',
        'text-shadow': '-1px 1px 10px black',
        'box-shadow': '-1px 1px 5px black',
    };

    const button = document.createElement('div');
    button.setAttribute('id', type === 'START' ? ElementIds.START : ElementIds.STOP);
    button.textContent = type === 'START' ? 'Start bot' : 'Stop bot';
    setStyles(button, styles);
    return button;
};

const text = (text: string, id: string, extraStyles?: { [key: string]: string }) => {
    const styles = {
        'font-size': 'clamp(20px, 1.5vw, 30px)',
        ...extraStyles,
    };

    const h3 = document.createElement('h3');
    setStyles(h3, styles);
    h3.textContent = text;
    h3.setAttribute('id', id);
    return h3;
};

export const box = () => {
    const styles = {
        position: 'fixed',
        top: '5px',
        right: '5px',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        width: '10vw',
        'min-width': '150px',
        'max-width': '250px',
        'flex-direction': 'column',
        'backdrop-filter': 'blur(6px)',
        'text-align': 'center',
        'z-index': '9999999999',
    };

    const div = document.createElement('div');
    setStyles(div, styles);

    div.appendChild(button('START'));
    const stop = button('STOP');
    stop.style.display = 'none';
    div.appendChild(stop);
    div.appendChild(text('Sent: 0', ElementIds.SENT_TEXT));

    return div;
};
