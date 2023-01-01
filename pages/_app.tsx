import { HelloWorld } from "../src/components/HelloWorld";
import React from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";

function HomePage() {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <HelloWorld />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default HomePage;
