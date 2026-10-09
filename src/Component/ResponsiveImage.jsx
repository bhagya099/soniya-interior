import React from "react";
import { Image, Row, Col, Container } from "react-bootstrap";

const ResponsiveImage = ({ images, alt, width, height }) => (
  <Container>
    <Row>
      {images.map((image, index) => (
        <Col className="p-1" xs={12} md={4}>
          <Image
            key={index + 1}
            src={image}
            alt={alt}
            width={width}
            height={height}
            thumbnail
            fluid
          />
        </Col>
      ))}
    </Row>
  </Container>
);

export default ResponsiveImage;
