import { CHECKMARKICON, TRACKINGICON } from "../lib/icons";
import InboxManager from "../lib/inboxManager";

const icon = `
  <img style="background: url(${CHECKMARKICON}) 0px 0px no-repeat; background-size: 16px; width: 16px; height: 16px; border-radius: 50%">
`;

async function init() {
  console.log("google gmail customization extension content script");

  const sdkManager = new InboxManager();
  await sdkManager.init();

  /* <=================== add checkmark icon to thread row view ===================> */
  sdkManager.setThreadRowAttachmentView(icon);

  /* <=================== add tracking icon to thread row view ===================> */
  sdkManager.setThreadRowView("Tracking", threadViewAction, TRACKINGICON);
}

const composeAction = (event): void => {
  event.composeView.insertTextIntoBodyAtCursor("Hello World!");
};

const threadViewAction = (): void => {
  console.log("asdfasdf");
};

init();
