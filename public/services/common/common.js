export const common = new class Common {
    constructor() {
        this.lf = localforage;
        this.lf = localforage;
        console.log('common init success');
        window.addEventListener('unhandledrejection', (event) => {
            console.group('未处理的reject错误');
            console.log('%c%s ↓↓↓%o', 'color: red;', event.reason && (event.reason.message || event.reason), event);
            console.groupEnd();
        });
    }
    template2string({ string, params }) {
        const keys = Object.keys(params);
        const values = Object.values(params);
        return new Function(...keys, `return \`${string}\``)(...values);
    }
    nextMarco(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, time || 0);
        });
    }
};
