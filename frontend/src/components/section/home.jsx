import './home.css'
import image1 from '../../assets/ImageResources/im01.jpg'
import image2 from '../../assets/ImageResources/im02.jpg'
import image3 from '../../assets/ImageResources/im03.jpg'
import image4 from '../../assets/ImageResources/im04.jpg'

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
              <img src={image1} alt="Los Angeles" className="img_carousel" />
            </div>

            <div className="item">
              <img src={image2} alt="Chicago" className="img_carousel"/>
            </div>

            <div className="item">
              <img src={image3} alt="New york" className="img_carousel"/>
            </div>

            <div className="item">
              <img src={image4} alt="New york" className="img_carousel"/>
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