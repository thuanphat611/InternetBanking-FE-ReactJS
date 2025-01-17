import React, { useState } from "react";
import { Spinner, Button, Form, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddAmountForm = (props) => {
  const {
    formVariables,
    setFormVariables,
    setStep,
    balance,
    accountNumber,
    setFormError,
    email,
  } = props;
  const [validated, setValidated] = useState(false);

  // Update giá trị điền vào Form
  const handleChange = (e) => {
    formVariables[e.target.name] = e.target.value;
    setFormVariables({ ...formVariables });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (
      form.checkValidity() === false ||
      formVariables.name === "" ||
      formVariables.name === "KHONG TIM THAY"
    ) {
      event.stopPropagation();
    } else {
      const payFee = formVariables.isReceiverPaid ? 0 : 10000;
      if (balance - formVariables.amount - payFee >= 0) {
        setFormVariables({ ...formVariables, isLoading: true });
        await axios
          .post(`/otp/generate-otp`, {
            otp: "111",
            email,
          })
          .then((result) => {
            console.log(result);
            setFormVariables({ ...formVariables, isLoading: false });

            // formVariables["createdAt"] = result.data.data.createdAt;
            // formVariables["transactionId"] = result.data.data.transactionId;
            setFormVariables({ ...formVariables });
            setStep(3);
            setFormError(null, "");
          })
          .catch((err) => console.log(err.response));
        setFormVariables({ ...formVariables, isLoading: false });

        console.log(formVariables);
      } else return setFormError(true, "Not enough money");
      setStep(3);
    }
    setValidated(true);
  };

  console.log(formVariables);

  return (
    <>
      <h5>Step 2: Add money amount and description</h5>
      <hr />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          {/* <Form.Label className="font-weight-bold">ID and UserName</Form.Label> */}
          <Row>
            <Col>
              <Form.Text className="text-muted font-weight-bold">
                Account Number
              </Form.Text>
              <Form.Control
                required
                type="text"
                name="accountNumber"
                value={formVariables.accountNumber}
                onChange={(e) => handleChange(e)}
                disabled
              />
            </Col>
            <Col>
              <Form.Text className="text-muted font-weight-bold">
                Bank
              </Form.Text>
              <Form.Control
                size="sm"
                as="select"
                name="bankId"
                value={formVariables.bankId}
                onChange={(e) => handleChange(e)}
                disabled
              >
                <option value={-1}></option>
                <option value={0}>DOMLand Bank</option>
                <option value={1}>Team3 Bank</option>
                <option value={2}>Hoa Bank</option>
              </Form.Control>
            </Col>
          </Row>
          <Form.Text className="text-muted font-weight-bold">
            Full name
          </Form.Text>
          <Form.Control
            required
            type="text"
            name="name"
            value={formVariables.name}
            onChange={(e) => handleChange(e)}
            isInvalid={
              formVariables.name === "" ||
              formVariables.name === "KHONG TIM THAY"
            }
            disabled
          />
        </Form.Group>
        <Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              name="isReceiverPaid"
              onChange={(e) => {
                formVariables.isReceiverPaid = e.target.checked;
                setFormVariables({ ...formVariables });
              }}
              label="The recipient bears the fee (1,000 VND)."
            />
          </Form.Group>
          <Form.Text className="text-muted font-weight-bold">Amount</Form.Text>
          <Form.Control
            required
            type="number"
            step="1000"
            min="1000"
            name="amount"
            value={formVariables.amount}
            onChange={(e) => handleChange(e)}
            isInvalid={formVariables.amount % 1000 !== 0}
          />
          <Form.Control.Feedback type="invalid">
            The amount must be divisible by 1,000
          </Form.Control.Feedback>
          <Form.Text className="text-muted font-weight-bold">Message</Form.Text>
          <Form.Control
            required
            as="textarea"
            rows="3"
            type="text"
            name="content"
            value={formVariables.content}
            onChange={(e) => handleChange(e)}
            isInvalid={formVariables.content === ""}
          />
          <Form.Control.Feedback type="invalid">
            Give your receiver a message to know
          </Form.Control.Feedback>
        </Form.Group>
        <Col className="mt-3 d-flex justify-content-center">
          <Button
            variant="primary-outline"
            type="button"
            onClick={() => setStep(1)}
          >
            <FontAwesomeIcon icon={faBackward} /> Back
          </Button>
          <Button variant="primary" type="submit" className="float-right">
            {formVariables.isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Waiting...
              </>
            ) : (
              <>Next</>
            )}
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default AddAmountForm;
