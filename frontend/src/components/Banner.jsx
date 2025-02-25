import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header_image-removebg-preview.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import ReferralForm from "./ReferralForm";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Upgrade your wallet!!" ];
  const period = 2000;
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    refereeName: "",
    refereeEmail: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.referrerName) tempErrors.referrerName = "Referrer name is required";
    if (!formData.referrerEmail) tempErrors.referrerEmail = "Referrer email is required";
    if (!formData.refereeName) tempErrors.refereeName = "Referee name is required";
    if (!formData.refereeEmail) tempErrors.refereeEmail = "Referee email is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Referral submitted successfully!");
    setShowModal(false);
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Accredian presents</span>
                <h1>{`Upgrade your skills,`} <span className="txt-rotate" data-period="1000" data-rotate='[ "Upgrade your wallet!!" ]'><span className="wrap">{text}</span></span></h1>
                <p>Refer and get a chance to win up to</p>
                <h1>Rs. 15,000</h1>
                <p>Spread the word, Stack the cash!!</p>
                <button onClick={handleOpenModal}>
                    Refer now <ArrowRightCircle size={25} />
                  </button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      <ReferralForm open={modalOpen} onClose={handleCloseModal} />

      
    </section>
  )
}
