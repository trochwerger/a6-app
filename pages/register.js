import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function Register(props) {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await registerUser(user, password, password2);
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Register</Card.Title>
        <Card.Text>Register for an account:</Card.Text>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>User:</Form.Label>
            <Form.Control
              type="text"
              value={user}
              id="userName"
              name="userName"
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>
          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
