import { Container } from "react-bootstrap";

export default function NotFound() {
  return (
    <Container className="py-4">
      <Container className="p-5">
        <Container className="applyBackground border text-center my-5 p-5">
          <h1 className="textOrange">WHAT ARE YOU DOING HERE BUDDY?</h1>
          <h3>
            The page you are looking for does not exist!<hr></hr>Go back or else
            your computer will explode!!!
          </h3>
        </Container>
      </Container>
    </Container>
  );
}
