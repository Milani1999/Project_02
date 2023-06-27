import React from "react";

function AboutUs() {
    return (

        <div className="AboutComponent" id="AboutComponent">
            <h1 className="h1-heading">Our Vision and Mission</h1>

            <div className="row">
                <div className="col-sm-3">
                    <h4 className="h4-heading">Vision</h4>
                    <img src="images/vision.png" alt="vision" />
                </div>
                <div className="col-sm-9">
                    <p className="card-text">All the students who join Universal International School,
                        should find a happy environment where they are encouraged to nurture a lifelong
                        love for knowledge and all wholesome activities that help develop body, mind and soul.
                        When they are ready to move on from here they should take their knowledge and everything
                        they have learned here, improve upon it and pass it on to those younger than themselves.
                        This makes U.I.S. , the tree that branches out and gives life , love , protection ,
                        knowledge and discipline to so many others in the world's society.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-9">
                    <p className="card-text">Universal International School is proud to be a multi religious,
                        multi cultural and multi ethnic institute that builds within youngsters a foundation for
                        success through a formation program, which is rooted in the students' own inherited beliefs
                        and we emphasize faith, leadership, academics, and service. We aspire, through the grace
                        of the Almighty, to be recognized as the best academic institute in Sri Lanka.</p>
                </div>
                <div className="col-sm-3">
                    <h4 className="h4-heading">Mission</h4>
                    <img src="images/mission.png" alt="mission" />
                </div>
            </div>
        </div>
    )
}

export default AboutUs;