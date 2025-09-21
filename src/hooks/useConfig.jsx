import { getCookie, setCookie } from "cookies-next";
import jsYaml from "js-yaml";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

const defaultConfig = {
  title: "SRM University Assistant",
  description: "AI-powered assistant for SRM University students and prospective students",
  settings: {
    editable: true,
    theme_color: "blue",
    chat: true,
    inputs: {
      mic: true,
    },
    outputs: {
      audio: true,
    },
    ws_url: "",
    token: "",
  },
  show_qr: false,
};

const useAppConfig = () => {
  return useMemo(() => {
    if (import.meta.env.VITE_APP_CONFIG) {
      try {
        const parsedConfig = jsYaml.load(import.meta.env.VITE_APP_CONFIG);
        if (parsedConfig.settings === undefined) {
          parsedConfig.settings = defaultConfig.settings;
        }
        if (parsedConfig.settings.editable === undefined) {
          parsedConfig.settings.editable = true;
        }
        return parsedConfig;
      } catch (e) {
        console.error("Error parsing app config:", e);
      }
    }
    return defaultConfig;
  }, []);
};

const ConfigContext = createContext(undefined);

export const ConfigProvider = ({ children }) => {
  const appConfig = useAppConfig();
  const [localColorOverride, setLocalColorOverride] = useState(null);

  const getSettingsFromUrl = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }
    if (!window.location.hash) {
      return null;
    }
    const appConfigFromSettings = appConfig;
    if (appConfigFromSettings.settings.editable === false) {
      return null;
    }
    const params = new URLSearchParams(window.location.hash.replace("#", ""));
    return {
      editable: true,
      chat: params.get("chat") === "1",
      theme_color: params.get("theme_color"),
      inputs: {
        mic: params.get("mic") === "1",
      },
      outputs: {
        audio: params.get("audio") === "1",
      },
      ws_url: "",
      token: "",
    };
  }, [appConfig]);

  const getSettingsFromCookies = useCallback(() => {
    const appConfigFromSettings = appConfig;
    if (appConfigFromSettings.settings.editable === false) {
      return null;
    }
    const jsonSettings = getCookie("lk_settings");
    if (!jsonSettings) {
      return null;
    }
    return JSON.parse(jsonSettings);
  }, [appConfig]);

  const setUrlSettings = useCallback((us) => {
    const obj = new URLSearchParams({
      mic: boolToString(us.inputs.mic),
      audio: boolToString(us.outputs.audio),
      chat: boolToString(us.chat),
      theme_color: us.theme_color || "blue",
    });
    window.location.hash = obj.toString();
  }, []);

  const setCookieSettings = useCallback((us) => {
    const json = JSON.stringify(us);
    setCookie("lk_settings", json);
  }, []);

  const getConfig = useCallback(() => {
    const appConfigFromSettings = appConfig;

    if (appConfigFromSettings.settings.editable === false) {
      if (localColorOverride) {
        appConfigFromSettings.settings.theme_color = localColorOverride;
      }
      return appConfigFromSettings;
    }
    const cookieSettings = getSettingsFromCookies();
    const urlSettings = getSettingsFromUrl();
    if (!cookieSettings) {
      if (urlSettings) {
        setCookieSettings(urlSettings);
      }
    }
    if (!urlSettings) {
      if (cookieSettings) {
        setUrlSettings(cookieSettings);
      }
    }
    const newCookieSettings = getSettingsFromCookies();
    if (!newCookieSettings) {
      return appConfigFromSettings;
    }
    appConfigFromSettings.settings = newCookieSettings;
    return { ...appConfigFromSettings };
  }, [
    appConfig,
    getSettingsFromCookies,
    getSettingsFromUrl,
    localColorOverride,
    setCookieSettings,
    setUrlSettings,
  ]);

  const setUserSettings = useCallback((settings) => {
    const appConfigFromSettings = appConfig;
    if (appConfigFromSettings.settings.editable === false) {
      setLocalColorOverride(settings.theme_color);
      return;
    }
    setUrlSettings(settings);
    setCookieSettings(settings);
    _setConfig((prev) => {
      return {
        ...prev,
        settings: settings,
      };
    });
  }, [appConfig, setCookieSettings, setUrlSettings]);

  const [config, _setConfig] = useState(getConfig());

  useEffect(() => {
    _setConfig(getConfig());
  }, [getConfig]);

  return (
    <ConfigContext.Provider value={{ config, setUserSettings }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = React.useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};

const boolToString = (b) => (b ? "1" : "0");
