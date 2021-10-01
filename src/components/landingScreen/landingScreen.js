import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ManufacturerModal from '../manufacturer_modal/manufacturerModal';

const LandingScreen = ({}) => {

  return (
    <div id="wrapper">
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" id="tokicLogo">
      <img src="https://obitelji3plus.hr/wp-content/uploads/2019/12/tokic-logo-Final.png" width="150" height="150"  alt=""></img>
      </a>
    </nav>

    <div id="main">
    <div class="px-4 py-5 my-5 text-center">
    <h6>Pritisnite gumb nize kako biste pokrenuli</h6>
    <div class="col-lg-6 mx-auto">
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <ManufacturerModal />
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default LandingScreen;
