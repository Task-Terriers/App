import { StatusBar } from "expo-status-bar";
import * as SplashScreen from 'expo-splash-screen';
import useFonts from './hooks/useFonts';

import { Col, Span } from "./src/components/StyleToProps";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await LoadFonts();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        SetIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (IsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [IsReady]);

  if (!IsReady) {
    return null;
  }

  return (
    <Col flex justifyCenter alignCenter onLayout={onLayoutRootView}>
      <Col>
        <Span bodyL colorNeutral40>
          hello
        </Span>
      </Col>
      <StatusBar style="auto" />
    </Col>
  );
}
