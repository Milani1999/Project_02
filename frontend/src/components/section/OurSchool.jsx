import React, { useState } from "react";
import { Row } from "react-bootstrap";
import SupportEngine from "../SupportAssist/SupportEngine";

function Popup({ content, closePopup }) {
  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header"></div>
        <div>
          <Row className="justify-content-end">
            <button onClick={closePopup} className="closeButton">
              X
            </button>
          </Row>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

function Card({ title, content, imageUrl }) {
  const [showPopup, setShowPopup] = useState(false);
  const shortContent = content.substring(0, 325) + "...";

  const handleClickOpen = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="col-sm-4">
      <SupportEngine />
      <div className="rounded shadow-sm py-4 px-4">
        <img
          src={imageUrl}
          alt={title}
          width="100"
          className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
        />
        <h3 className="mb-0">{title}</h3>
        <br />
        <p>{showPopup ? "" : shortContent}</p>
        {content.length > 400 && !showPopup && (
          <button className="btn btn-success" onClick={handleClickOpen}>
            Read More
          </button>
        )}
      </div>
      {showPopup && <Popup content={content} closePopup={closePopup} />}
    </div>
  );
}

function School() {
  const messages = [
    {
      title: "Chairman",
      content:
        "I am delighted to take this opportunity to introduce you to UNIVERSAL INTERNATIONAL SCHOOL, Balangoda, a subsidiary of the Yehiya Foundation, an independent foundation. I am proud to be connected with a school that has shown such phenomenal growth in every aspect of education.Thank you for visiting our School’s web site. We are happy and proud that you decided to check us out and we fervently hope you will be pleased with what you see and read here. I have handed over the complete management of the school into the capable hands of the Managing Director/ Cooperate Principal and I am fully confident that he will lead the school into the future! We offer educational facilities to boys and girls, without any discrimination of any kind…. And I am happy to state that the members of all the communities in Balangoda have trusted us with their children….We have Buddhist, Muslim ,Christian, and Hindu children, all work and play in a peaceful atmosphere of lively co-existence. We offer children a balanced education in a stable, traditional environment, but one none the less, focused on leading into the future. We would be happy to clarify any further points you may have and if you would like to give us a call and come over to see the school for yourself, we will welcome you warmly to the Universal Family!! Enjoy your browsing of our pages!!",
      imageUrl: "https://bootstrapious.com/i/snippets/sn-team/teacher-2.jpg",
    },
    {
      title: "Head Master",
      content:
        "It gives me great pride and joy to share these few words with all who visit our website. Universal International School, Balangoda was established in 9.9.2009, and registered in 2010. Our values are embodied in our School Motto “Lead into the Future” – to live within a multi-ethnic community, give of one’s best and grow up to serve Mankind and lead into a fantastic future. Education is entrusted to our versatile, committed and dedicated academic staff. We believe in continually upgrading the knowledge and skills of our staff, and towards this end the Management supports and invests in providing these opportunities. So far, two batches of students have sat for the Local (Sri Lankan) G.C.E. Ordinary Level Examinations with satisfactory results for them to move in to on to the field of their choice. We hope to start studies for the Advanced Level Examination as soon as we are in the position to house more students and we employ more teachers. I believe that Universal International School will continue to grow in leaps and bounds as the people of the district and its surroundings realize what a big difference this school has made in the lives of its students and teachers (and myself, too!) The School is headed by the innovative and forward-thinking Founder Managing Director, Mr Ifham Yehiya and his policies are visible to everyone from the very first visit….. please come and see for yourself!",
      imageUrl: "https://bootstrapious.com/i/snippets/sn-team/teacher-2.jpg",
    },
    {
      title: "Consultant",
      content:
        "At the time that Universal International School was still in the planning stages, some of the thoughts that were shared with me by the Founder Managing Director/ Corporate Principal, were that his students should be inculcated with the principles of religious unity, co-existence, and exemplary discipline. The guiding beacon of light for our school has been our FMD/Corporate Principal, Mr. Ifham Yehiya and he has, I believe, managed to achieve this wish of his. I have helped numerous people start schools in different environments and am proud to state that I find Universal International School is a place where ideas grow and flourish, where my thoughts are taken by Mr Ifham and put into action and made to bloom and grow beyond my own recognition. My happiness at seeing this is beyond anything that any school can do for me. As a consultant at many schools I have always wanted my schools to have a happy atmosphere where the management staff and students continue to grow in knowledge, where discipline is tempered with love and where the children and teachers grow in experience…..We live in the Computer Age…. Our students are all more at home at computers than we will ever be. The main method of communicating and gaining information has now become the computer…. Our school too has been taken fully into the Computer Age today as we are about to launch our own web !! For this we have to thank our innovative and creative Founder Managing Director / Coperate Principal, who thought of and initiated the whole process of starting the website. He managed to get an excellent website launcher and computer graphics designer, the Venerable Kumarasiri Thero who has spent endless hours working on the web site for us. I hope you will find this website of ours to be upto your expectations and we hope you will give us your feedback, so that we may make necessary improvements. Please feel free to contact me on 00-94-77-4786-924…. I’m just a call away!",
      imageUrl: "https://bootstrapious.com/i/snippets/sn-team/teacher-2.jpg",
    },
  ];

  return (
    <div className="SchoolComponent" id="SchoolComponent">
      <h1 className="h1-heading">Messages</h1>

      <div className="container">
        <div className="row text-center">
          {messages.map((message, index) => (
            <Card
              key={index}
              title={message.title}
              content={message.content}
              imageUrl={message.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default School;
