import createCache, { EmotionCache } from '@emotion/cache';
import { getWindow } from '../helpers/windowHelper';

export function createEmotionCache(): EmotionCache {
    let insertionPoint;

    if (getWindow()) {
        const emotionInsertionPoint = document.querySelector<HTMLMetaElement>('meta[name="emotion-insertion-point"]');
        insertionPoint = emotionInsertionPoint ?? undefined;
    }

    return createCache({ key: 'mui-style', insertionPoint });
}
