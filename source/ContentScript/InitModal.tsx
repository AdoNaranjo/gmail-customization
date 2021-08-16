import * as React from "react";
import * as ReactDOM from "react-dom";
import GoogleButton from "react-google-button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

type InitModalPropsType = {
  isOpen: boolean;
  handleClose: () => void;
};

const InitModal: React.FC<InitModalPropsType> = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <div className={classes.paper}>
            <GoogleButton onClick={() => console.log("asdfasdf")} />
            <p id="transition-modal-description">This is message for new USER.</p>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default InitModal;
