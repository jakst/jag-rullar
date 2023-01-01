import { AppProps } from "next/app";
import { StrictMode } from "react";
import { StyleProvider, StyleRenderer, ThemePicker } from "vcc-ui";

interface CustomAppProps extends AppProps {
  renderer: StyleRenderer;
}

function App({ Component, pageProps, renderer }: CustomAppProps) {
  return (
    <StrictMode>
      <StyleProvider renderer={renderer}>
        <ThemePicker variant="light">
          <Component {...pageProps} />
        </ThemePicker>
      </StyleProvider>
    </StrictMode>
  );
}

export default App;
