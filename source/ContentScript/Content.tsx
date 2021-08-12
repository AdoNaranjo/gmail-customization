import * as React from "react";
import * as ReactDOM from "react-dom";
import { BACKEND_URL, INBOXAPPID } from "../config/env-var";
import { CHECKMARKICON, CLOSEICON, TRACKINGICON } from "../lib/icons";
import { FetchClient } from "../lib/utils";
import { set } from "./isAuth";
import Modal from "./Modal";

const checkMarkHTML = `
  <img style="background: url(${CHECKMARKICON}) 0px 0px no-repeat; background-size: 16px; width: 16px; height: 16px; border-radius: 50%" />
`;

const closeHTML = `
<img style="background: url(${CLOSEICON}) 0px 0px no-repeat; background-size: 16px; width: 16px; height: 16px; border-radius: 50%" />
`;

const Content: React.FC = () => {
  console.log("google gmail customization extension content script");

  const [isAuth, setAuth] = React.useState<boolean>(false);
  const [sdk, setSDK] = React.useState<InboxSDK.InboxSDKInstance | null>(null);

  const email = sdk ? sdk.User.getEmailAddress() : "";

  React.useEffect(() => {
    if (!sdk) {
      getSDK();
    } else {
      if (isAuth) {
        setCheckingIcon();
        setTrackingIcon();
      } else {
        checkAuthorization();
      }
      set(isAuth);
    }
  }, [sdk, isAuth]);

  const getSDK = async () => {
    setSDK(
      await new Promise((resolve) => {
        InboxSDK.load(2, INBOXAPPID).then(resolve);
      })
    );
  };

  const checkAuthorization = async () => {
    const fetchClient = new FetchClient();
    const response = await fetchClient.get(`${BACKEND_URL}/api/account/?email=${email}`);
    if (response) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  const setCheckingIcon = async () => {
    const fetchClient = new FetchClient();
    const response = await fetchClient.get(`${BACKEND_URL}/api/contacts/?email=${email}`);
    const data = response as { emails: string[] }[];

    sdk.Lists.registerThreadRowViewHandler(function (threadRowView) {
      const results = threadRowView
        .getContacts()
        .map((contact) => contact.emailAddress)
        .filter((email) => {
          return data.some((res) => res.emails.some((mail) => email.indexOf(mail) !== -1));
        });

      const iconHtml = results.length > 0 ? checkMarkHTML : closeHTML;
      threadRowView.addAttachmentIcon({
        iconHtml: iconHtml,
      });
    });
  };

  const setTrackingIcon = () => {
    sdk.Lists.registerThreadRowViewHandler(function (threadRowView) {
      threadRowView.addButton({
        title: "Tracking",
        iconUrl: TRACKINGICON,
        onClick: function () {
          showModal();
        },
      });
    });
  };

  const showModal = () => {
    const el = document.createElement("div");
    let modal: InboxSDK.Widgets.ModalView;

    ReactDOM.render(<Modal onClick={() => modal.close()} />, el);

    modal = sdk.Widgets.showModalView({ el: el, chrome: true });
    modal.on("destroy", () => {
      ReactDOM.unmountComponentAtNode(el);
    });
  };

  return <React.Fragment></React.Fragment>;
};

export default Content;
