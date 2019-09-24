import React from "react";
import { styles } from "../styles/litterMap";
import Button from "@material-ui/core/Button";

const defaultContainer = ({ children }) => (
  <div style={styles.controlStyle}>{children}</div>
);

export default function MapControlPanel(props) {
  const Container = props.containerComponent || defaultContainer;
  return (
    <Container style={styles.infoBox}>
      <h3 style={styles.headText}>Add litter you've found</h3>
      <p style={styles.text}>
        Pinpoint the location you've noticed litter, or where you've picked up
        litter!
      </p>
      {props.isForm ? (
        <Button type="submit" variant="contained" color="primary">
          Add Litter
        </Button>
      ) : null}
    </Container>
  );
}
