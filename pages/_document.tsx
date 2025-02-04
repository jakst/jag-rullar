import { FavIcons } from "@volvo-cars/favicons/react";
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
} from "next/document";
import { type ReactElement } from "react";
import { renderStyles, styleRenderer } from "vcc-ui";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const renderer = styleRenderer();
    const originalRenderPage = ctx.renderPage;

    renderer.renderStatic(
      {
        margin: 0,
        padding: 0,
      },
      "body",
    );

    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line react/display-name
        enhanceApp: (App: any) => (props) =>
          <App {...props} renderer={renderer} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = renderStyles(renderer);

    return {
      ...initialProps,
      styles: [...(initialProps.styles as ReactElement[]), ...styles],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <FavIcons />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
