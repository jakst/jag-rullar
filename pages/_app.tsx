import { AppProps } from "next/app";
import React from "react";
import { StyleProvider, StyleRenderer, ThemePicker } from "vcc-ui";

interface CustomAppProps extends AppProps {
  renderer: StyleRenderer;
}

function App({ Component, pageProps, renderer }: CustomAppProps) {
  return (
    <React.StrictMode>
      <StyleProvider renderer={renderer}>
        <ThemePicker variant="light">
          <Component {...pageProps} />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default App;
