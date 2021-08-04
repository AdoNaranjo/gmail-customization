import { INBOXAPPID } from "../config/env-var";

export default class InboxManager {
  public SDK: InboxSDK.InboxSDKInstance = null;

  public init = async (): Promise<void> => {
    try {
      this.SDK = await this.setUp();
    } catch (error) {
      console.log(" error ======= ", error);
    }
  };

  /* <=================== init InboxSDK ===================> */
  private setUp = (): Promise<InboxSDK.InboxSDKInstance> => {
    return new Promise((resolve) => {
      InboxSDK.load(2, INBOXAPPID).then(resolve);
    });
  };

  /* <=================== Customizing Compose View ===================> */
  public setComposeView = (
    title: string,
    onClick: (event: InboxSDK.Compose.ComposeButtonClickEvent) => void,
    iconUrl?: string
  ): void => {
    this.SDK.Compose.registerComposeViewHandler(function (composeView) {
      composeView.addButton({ title, iconUrl, onClick });
    });
  };

  /* <=================== Customizing Thread Row View ===================> */
  public setThreadRowView = (
    title: string,
    onClick: (event: InboxSDK.Lists.ThreadRowButtonClickEvent) => void,
    iconUrl?: string
  ): void => {
    this.SDK.Lists.registerThreadRowViewHandler(function (threadRowView) {
      threadRowView.addButton({ title, iconUrl, onClick });
    });
  };

  /* <=================== Customizing Thread Row View ===================> */
  public setThreadRowAttachmentView = (iconHtml?: string): void => {
    this.SDK.Lists.registerThreadRowViewHandler(function (threadRowView) {
      threadRowView.addAttachmentIcon({
        iconHtml,
      });
    });
  };
}
