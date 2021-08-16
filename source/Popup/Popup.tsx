import * as React from "react";
import GoogleButton from "react-google-button";
import { browser, Tabs } from "webextension-polyfill-ts";
import { getDisplayDateTime, getPalette } from "../lib/utils";

import "./styles.scss";

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({ url });
}

const Popup: React.FC = () => {
  const { date, time, period } = getDisplayDateTime();
  const palette = getPalette(period);

  const [isAuth, setAuth] = React.useState<boolean>(false);

  React.useEffect(() => {
    receiveMessage();
  }, []);

  const receiveMessage = async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    console.log(await browser.tabs.sendMessage(tabs[0].id, { action: "Google" }));
    setAuth(await browser.tabs.sendMessage(tabs[0].id, { action: "Google" }));
  };

  const handleClick = async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    await browser.tabs.sendMessage(tabs[0].id, { action: "googleAuth" });
  };

  return (
    <div style={{ backgroundImage: `url('assets/${period}.png')`, width: "100%", height: "100%" }}>
      <div className="root__wrapper">
        <h1 className="root__wrapper__h1" id="date" style={{ color: palette }}>
          {date}
        </h1>
        <h3 className="root__wrapper__h3" id="time" style={{ color: palette }}>
          {time}
        </h3>
        {!isAuth && (
          <div className="root__wrapper__pointer">
            <GoogleButton onClick={handleClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
