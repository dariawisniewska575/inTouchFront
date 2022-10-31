/* eslint-disable react/display-name */
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import createEmotionServer from '@emotion/server/create-instance';
import { createEmotionCache } from 'src/common/configs/emotionCache';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;
        const cache = createEmotionCache();
        const { extractCriticalToChunks } = createEmotionServer(cache);

        ctx.renderPage = () =>
            originalRenderPage({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                enhanceApp: (App: any) => (props) => <App {...props} />,
            });

        const initialProps = await Document.getInitialProps(ctx);
        const emotionStyles = extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(' ')}`}
                key={style.key}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style.css }}
            />
        ));

        return {
            ...initialProps,
            styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
        };
    }

    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.INTOUCH = {}`,
                        }}
                    />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgo=" />
                    <meta name="emotion-insertion-point" content="" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
