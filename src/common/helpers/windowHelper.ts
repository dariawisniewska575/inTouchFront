export const getWindow = (): (Window & typeof globalThis) | undefined => {
    if (typeof window !== 'undefined' && window) {
        return window;
    }
    return undefined;
};

export const getWindowDocument = (): Document | undefined => {
    const currentWindow = getWindow();
    if (currentWindow) {
        return currentWindow.document;
    }
    return undefined;
};

export const getWindowDocumentBody = (): HTMLElement | undefined => {
    const currentDocument = getWindowDocument();
    if (currentDocument) {
        return currentDocument.body;
    }
    return undefined;
};

export const isServer = (): boolean => !Boolean(getWindow());
