import * as React from "react";
import { browser, Tabs } from "webextension-polyfill-ts";
import { getDisplayDateTime, getPalette } from "../lib/utils";

import "./styles.scss";

// function openWebPage(url: string): Promise<Tabs.Tab> {
//   return browser.tabs.create({ url });
// }

const Popup: React.FC = () => {
  const { date, time, period } = getDisplayDateTime();
  const palette = getPalette(period);
  return (
    <div style={{ backgroundImage: `url('assets/${period}.png')`, width: "100%", height: "100%" }}>
      <div className="root__wrapper">
        <h1 className="root__wrapper__h2" id="date" style={{ color: palette }}>
          {date}
        </h1>
        <h3 className="root__wrapper__h3" id="time" style={{ color: palette }}>
          {time}
        </h3>
      </div>
    </div>
  );
};

export default Popup;
