import React, { useRef, useEffect } from "react";
import { Col, Row, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = (props) => {
  const { reducerUserInformation } = props;
  const { balance, name } = reducerUserInformation.data;
  const mountedRef = useRef(true);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
  const formattedBalance = formatter.format(balance);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={6}>
          <Card className="text-center mt-3 text-center">
            {/* <Card.Header>EMPLOYEE DASHBOARD</Card.Header> */}
            <Card.Body>
              <Card.Title>
                Hello,{" "}
                <Link to="/edit">
                  <span className="text-primary">{name}</span>
                </Link>
              </Card.Title>
              <Col>
                <Link to="/new-customer">
                  <Button variant="primary" className="extraButton">
                    Create new account
                  </Button>
                </Link>
              </Col>
              <Col className="mt-2">
                <Link to="/deposit" className="extraButton">
                  <Button variant="primary" className="extraButton">
                    Deposit money for customer
                  </Button>
                </Link>
              </Col>
            </Card.Body>
            {/* <Card.Footer className="text-muted">
              HCMUS - PTUDWNC - 21KTPM1
            </Card.Footer> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
