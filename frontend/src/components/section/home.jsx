import React from "react";

function Home() {
  return (
    <div className="container-xl-fluid">
      <div className="HomeComponent" id="HomeComponent">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">

          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
          </ol>


          <div className="carousel-inner">
            <div className="item active">
              <img src="images/im01.jpg" alt="Los Angeles" className="img_carousel" />
            </div>

            <div className="item">
              <img src="images/im02.jpg" alt="Chicago" className="img_carousel"/>
            </div>

            <div className="item">
              <img src="images/im03.jpg" alt="New york" className="img_carousel"/>
            </div>

            <div className="item">
              <img src="images/im04.jpg" alt="New york" className="img_carousel"/>
            </div>
          </div>

          <div className="centered">
            <h1 className="h1-heading">Welcome to Universal International School</h1>
            <p className="p-centered">In a multicultural environment such as ours,
              we instill values of respect and tolerance in our students.
            </p>
            <a href="#SchoolComponent"><button type="button" className="btn btn-success">Know more about us !</button></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;