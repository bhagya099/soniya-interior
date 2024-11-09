import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Footer from "../Component/Footer";

const About = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={6} className="p-3 mt-2">
            <h5>
              Your Home Should be "LIVING SPACE"
              <span> Not a Storage Space</span>
            </h5>
            <br></br>
            <p>
              Sparkle Design Studio are Design Studio that offers services aimed
              at the end design of space. They have different kind if aspect
              towards design and believe in working witht clean lines and simple
            </p>
            <p>
              As abudding designer they trained under several products and
              Interior Designers,inspired by Styles.History, Art, books, Movies
              TRaveling anything that makes them creative.
            </p>
            <p>
              They blend of diffrent styles like traditional and Modern rather
              than having a signature style thye takes an Organic and
              Multipurpose approch
            </p>
            <br></br>
            <br></br>
            <p>
              Soniya is always a passionate Designer and Stylisht. She completed
              her undergraduate degree at Annamalai University and International
              Institute with a major in BSC Interior Designing in the top 10% of
              her class.She has very keen eye for the detailing and designing.
            </p>
            <br></br>
            <p>
              She has 5 year of experince in the filed where she has completed
              variuos project lie Resdential, Commercial and Styling Home.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <Image
              src={require("../image/Soniya_pic.JPG")}
              alt="Soniya_pic"
              className="p-3 mr-3"
              fluid
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default About;
