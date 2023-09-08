import { Row, Col, Card } from "react-bootstrap";

const highlightData = [
  {
    title: "High Quality",
    text: "At MATRIXX, our unwavering commitment to prosthetic craftsmanship blends cutting-edge technology, precise engineering, and a deep understanding of diverse limb loss needs. This dedication shines in our meticulous design and manufacturing, using advanced materials to create empowering prosthetic devices. We believe in restoring independence and confidence, enabling individuals to embrace daily life, chase dreams, and shatter barriers. Our goal is to inspire and facilitate fulfilling lives, making MATRIXX synonymous with innovation, quality, and empathy. We are dedicated to enriching lives",
  },
  {
    title: "Eco Friendly",
    text: "Eco-friendliness is central to all our actions at MATRIXX. Our sustainability commitment guides decisions, spanning design, production, and more. We prioritize eco-conscious materials, minimizing the environmental impact while crafting prosthetic devices. Dedication covers all aspects, including energy-efficient facilities and responsible waste management. Our zeal for conserving the planet inspires others to join the noble cause of environmental preservation. We are deeply committed to a greener future, believing in collective action for a sustainable world for our planet",
  },
  {
    title: "Affordable Price",
    text: "At MATRIXX, affordability is a cornerstone of our mission. We believe that everyone should have access to high-quality prosthetic solutions without financial burden. Our commitment to affordability is reflected in our pricing strategies and product offerings. By optimizing manufacturing processes and cost-efficient materials, we make prosthetic devices accessible to a broader audience. Our goal is to ensure that individuals facing limb loss can regain their independence and confidence without breaking the bank. At MATRIXX, we are proud to provide top-tier prosthetic products.",
  },
];

export default function Highlights() {
  return (
    <Row className="mt-3 mb-5 pb-5">
      {highlightData.map((highlight, index) => (
        <Col md={12} lg={4} key={index}>
          <Card className="cardHighlight p-3 applyBackground border">
            <Card.Body className="textWhite">
              <Card.Title className="pb-1">
                <h2>{highlight.title}</h2>
              </Card.Title>
              <Card.Text>{highlight.text}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
