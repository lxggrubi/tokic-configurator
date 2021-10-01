import React, { useRef, toggleHidden, state, handleChange, useEffect, useState } from "react";
import { Row, Col, InputGroup, Form, Modal, Button } from "react-bootstrap";
import './modal.css';

const ManufacturerModal = () => {
  const [modalState, setModalState] = useState("manufacturerModal" | "serviceModal" | "contactModal" | "confirmationModal" | "close");
  const [style, setStyle] = useState("couponGroup");
  const [vehMake, setVehMake] = useState([]);
  const [serviceOption, setServiceOption] = useState([]);
  const [isDisabled, setDisabled] = useState(false);

  const finalPrice = useRef();
  const couponButton = useRef();
  const finalMake = useRef();
  const finalService = useRef();
  const finalName = useRef();
  const finalEmail = useRef();
  const finalNumber = useRef();
  const finalComment = useRef();
  const makeNext = useRef();

  const onFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('fullName', event.target.fullName.value);
    localStorage.setItem('email', event.target.email.value);
    localStorage.setItem('phoneNumber', event.target.phoneNumber.value);
    localStorage.setItem('comment', event.target.comment.value);

    finalMake.current.innerText = localStorage.getItem('make');
    finalService.current.innerText = localStorage.getItem('serviceName');
    finalName.current.innerText = localStorage.getItem('fullName');
    finalEmail.current.innerText = localStorage.getItem('email');
    finalNumber.current.innerText = localStorage.getItem('phoneNumber');
    finalComment.current.innerText = localStorage.getItem('comment');
  }

  const OnMakeChange = (event) => {
    vehMake.pop();
    vehMake.push(event.target.value);
    localStorage.setItem('make', event.target.value);

    if(localStorage.getItem('make') == "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  const onServiceChange = (event) => {
    serviceOption.push(event.target.value);
    const uniqueNumbers = Array.from(new Set(serviceOption));
    const sum = uniqueNumbers.reduce((result,number)=> parseInt(result) + parseInt(number));
    localStorage.setItem('serviceName', event.target.name + " " + event.target.value);
    localStorage.setItem('finalPrice', sum);
    finalPrice.current.innerText = "UKUPNO: " + sum + " KN";
  }

  const onCouponSubmit = (event) => {
    serviceOption.push(event.target.value);
    const uniqueNumbers = Array.from(new Set(serviceOption));
    let sum =  uniqueNumbers.reduce((result,number)=> parseInt(result) + parseInt(number));
    let discountedSum = sum - (1 -  (35/100));
    finalPrice.current.innerText = "UKUPNO: " + discountedSum + " KN";
    console.log(discountedSum);
  }

  const changeStyle = () => {
    setStyle("showCoupon");
  };

  const handleShowManufacturerModal = () => {
   setModalState("manufacturerModal")
  }

  const handleShowServiceModal = () => {
   setModalState("serviceModal")
  }

  const handleShowContactModal = () => {
   setModalState("contactModal")
  }

  const handleShowConfirmationModal = () => {
   setModalState("confirmationModal")
  }

  const handleClose = () => {
   setModalState("close")
   localStorage.clear();
   window.location.reload(false);
  }

  return (
    <>
    <button type="button" class="btn btn-outline-secondary btn-sm px-4"  onClick={handleShowManufacturerModal}>Pokreni konfigurator</button>

      <Modal size="lg" show={modalState === "manufacturerModal"} onhide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Konfigurator servisa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>Korak 1. Odaberite proizvodaca vaseg vozila</h5>
        </Modal.Body>
        <Modal.Body>
        <Form>
        <Form.Group hasValidation controlId="vehicleManufacturer" className="mb-3" onChange={OnMakeChange} >
          <Form.Check required inline type="radio" label="Peugeot" name="group1" id="radio1" value="Peugeot" />
          <Form.Check inline type="radio" label="Volkswagen" name="group1" id="radio1" value="Volkswagen" />
          <Form.Check inline type="radio" label="Citroen" name="group1" id="radio1" value="Citroen" />
          <Form.Check inline type="radio" label="Audi" name="group1" id="radio1" value="Audi" />
          <Form.Check inline type="radio" label="BMW" name="group1" id="radio1" value="BMW" />
          <Form.Check inline type="radio" label="Seat" name="group1" id="radio1" value="Seat" />
          <Form.Check inline type="radio" label="Alfa Romeo" name="group1" id="radio1" value="Alfa Romeo" />
          <Form.Check inline type="radio" label="Kia" name="group1" id="radio1" value="Kia" />
          <Form.Check inline type="radio" label="Hyundai" name="group1" id="radio1" value="Hyundai" />
          <Form.Check inline type="radio" label="Honda" name="group1" id="radio1" value="Honda" />
          <Form.Check inline type="radio" label="Toyota" name="group1" id="radio1" value="Toyota" />
        </Form.Group>
        <Modal.Footer>
          <Button type="submit" variant="primary" disabled={isDisabled} onClick={handleShowServiceModal}>Dalje</Button>
          <Button variant="secondary" onClick={handleClose}>Zatvori</Button>
        </Modal.Footer>
        </Form>
        </Modal.Body>

      </Modal>

          <Modal size="lg" show={modalState === "serviceModal"} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>Konfigurator servisa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h5>Korak 2. Odaberite jednu ili vise vrsta usluga</h5>
          </Modal.Body>
          <Modal.Body>
          <Form>
          <Form.Group controlId="vehicleManufacturer" className="mb-4" onChange={onServiceChange}>
            <Form.Check inline type="checkbox" label="Zamjena ulja i filtera (500 kn)" value="500" id="ulje" name="Zamjena ulja i filtera" id="radio1"/>
            <Form.Check inline type="checkbox" label="Promjena pakni (450 kn)" value="450" id="pakne" name="Promjena pakni" id="radio1"/>
            <Form.Check inline type="checkbox" label="Promjena guma (100 kn)" value="100" id="gume" name="Promjena guma" id="radio1"/>
            <Form.Check inline type="checkbox" label="Servis klima uredaja (299 kn)" value="299" id="klima" name="Servis klima uredaja" id="radio1"/>
            <Form.Check inline type="checkbox" label="Balansiranje guma (50 kn)" value="50" id="balans" name="Balansiranje guma" id="radio1"/>
            <Form.Check inline type="checkbox" label="Zamjena ulja u kocnicama (229 kn)" value="229" id="kocnUlje" name="Zamjena ulja u kocnicama" id="radio1"/>
          </Form.Group>

          <p id="finalPrice" ref={finalPrice}></p>

          <a href="#" class="link-primary" id="couponButton" onClick={changeStyle}>Imam kupon</a>

          <Form.Group className={style}>
          <Row>
            <Col>
              <Form.Control type="text" placeholder="Unesite kod kupona ovdje" required/>
            </Col>
            <Col>
              <Button variant="secondary" onClick={onCouponSubmit}>Primjeni</Button>
            </Col>
          </Row>
          </Form.Group>
          </Form>

          <Modal.Footer>
          <Button variant="primary" onClick={handleShowContactModal}>Dalje</Button>
          <Button variant="primary" onClick={handleShowManufacturerModal}>Nazad</Button>
          <Button variant="secondary" onClick={handleClose}>Zatvori</Button>
          </Modal.Footer>
          </Modal.Body>
       </Modal>

       <Modal size="lg" show={modalState === "contactModal"} backdrop="static" keyboard={false}>
       <Modal.Header>
         <Modal.Title>Konfigurator servisa</Modal.Title>
       </Modal.Header>
       <Modal.Body>
       <h5>Korak 3. Vasi kontakt podaci</h5>
       </Modal.Body>

       <Modal.Body>
       <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Ime i prezime*" id="fullName" name="fullName" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="email" placeholder="Email adresa*" id="email" name="email" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Broj telefona*" id="phoneNumber" name="phoneNumber" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" placeholder="Napomena (opcionalno)" id="comment" name="comment" rows={3} />
        </Form.Group>


          <Modal.Footer>
            <Button type="submit" variant="primary" onClick={handleShowConfirmationModal}>Dalje</Button>
          <Button variant="primary" onClick={handleShowServiceModal}>Nazad</Button>
          <Button variant="secondary" onClick={handleClose}>Zatvori</Button>
          </Modal.Footer>
        </Form>
       </Modal.Body>
    </Modal>

    <Modal size="lg" show={modalState === "confirmationModal"} backdrop="static" keyboard={false}>
    <Modal.Header>
      <Modal.Title>Konfigurator servisa</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <h5>Korak 4. Pregled i potvrda vaseg odabira</h5>
    <h6>Molimo vas da jos jednom pregledate i potvrdite unesene podatke. Ukoliko zelite promijeniti neke od podataka,
    mozete  pritisnuti gumb za uredivanje pored svake od kategorija. Kada ste provjerili i potvrdili ispravnost svojih podataka
    pritisnite gumb posalji na dnu, za slanje upita za servis.</h6>
    </Modal.Body>
    <Modal.Body>
      <div class="wrapper">
      <div class="firstDiv">
        <h3>MODEL VOZILA <Button variant="secondary">Uredi</Button></h3>
        <p id="finalMake" ref={finalMake}></p>
      </div>
      <div class="secondDiv">
        <h3>ODABRANE USLUGE <Button variant="secondary">Uredi</Button></h3>
        <p id="finalService" ref={finalService}></p>
      </div>
    </div>

    </Modal.Body>
    <hr></hr>
    <Modal.Body>
      <div class="wrapper">
      <div class="firstDiv">
        <h3>KONTAKT PODACI <Button variant="secondary">Uredi</Button></h3>
        <p> Ime i prezime: <p id="finalName" ref={finalName}></p></p>
        <p> Broj telefona: <p id="finalNumber" ref={finalNumber}></p></p>
      </div>
      <div class="secondDiv">
        <h3></h3>
        <p> Email adresa: <p id="finalEmail" ref={finalEmail}></p></p>
        <p> Napomena: <p id="finalComment" ref={finalComment}></p></p>
      </div>
    </div>
    </Modal.Body>
    <br></br>
    <br></br>
    <Modal.Footer>
    <Button variant="primary">Posalji</Button>
    <Button variant="primary" onClick={handleShowContactModal}>Nazad</Button>
    <Button variant="secondary" onClick={handleClose}>Zatvori</Button>
    </Modal.Footer>
 </Modal>
    </>
  );
}

export default ManufacturerModal;
