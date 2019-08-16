import React, { Component } from "react";
import MediaCard from "../../common/MediaCard";
import Button from "@material-ui/core/Button";

class HowTo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="how-to-main">
        <header className="site-splash dashboard">
          <h1>How it works</h1>
        </header>
        <section className="card-container">
          <MediaCard
            headline="First,"
            imageSource="https://greenlete.s3-us-west-1.amazonaws.com/assets/_ionicons_svg_md-bicycle.svg"
            imageAlt="Working out"
            imageTitle="Workout"
            description="Pick up some trash during your run, ride, or gym workout."
          />
          <MediaCard
            headline="Then,"
            imageSource="https://greenlete.s3-us-west-1.amazonaws.com/assets/_ionicons_svg_md-camera.svg"
            imageAlt="Picked-up litter"
            title="Trash"
            description="Take a picture of the litter you grabbed."
          />
          <MediaCard
            headline="Finally"
            imageSource="https://greenlete.s3-us-west-1.amazonaws.com/assets/_ionicons_svg_md-cloud-upload.svg"
            imageAlt="Uploading to the web"
            imageTitle="Upload"
            description="Upload it here and keep track of your progress!"
          />
        </section>
        <Button variant="outlined" color="primary" href="">
          Let's go!
        </Button>
      </article>
    );
  }
}

export default HowTo;
