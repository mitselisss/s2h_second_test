import React from "react";
import "./aboutPage.css";
import SideBar from "../components/sideBar.js";
import Footer from "../components/footer.js";
import image from "../images/graphics/STH - LOGO.png";
import backgroundImage from "../images/graphics/about2.jpg";

function AboutPage() {
  return (
    <div style={{ width: "87%", float: "right", height: "150%" }}>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // This will resize the image to cover the entire element
          backgroundRepeat: "no-repeat", // This will prevent the image from repeating
          backgroundPosition: "center", // This will position the image at the center of the element
        }}
      >
        <div className="parent-container">
          <div className="page-container">
            <SideBar />
            <Footer />
            <div className="about-page">
              <img src={image} style={{ maxWidth: "100%", height: "auto" }} />

              <br></br>
              <br></br>
              <br></br>
              <p className="about-font">
                <p>
                  With a duration of 36 months, SWITCHtoHEALTHY project aims to
                  generate a dietary behaviour change by demonstrating and
                  reinforcing the role of the family in promoting a sustainable
                  change towards enhancing the adherence to the Mediterranean
                  dietary pattern of the family members (adults, adolescents,
                  and children).
                </p>
                <p>
                  This will be done by making available to families a
                  combination of hands-on educational material and digital tools
                  and complementing the dietary and lifestyle recommendations
                  with easy-to-eat healthier snacking products.
                </p>
                <p>
                  In this approach, whereas digital interactive tools
                  (SWITCHtoHEALTHY App) will be used by the parents to support
                  them in preparing weekly healthier dietary plans for the main
                  meals for them and their children, the educational material
                  will be used to support families in acquiring healthier habits
                  and to educate children and adolescents.
                </p>
                <p>
                  Finally, healthy, and nutritious plant-based snacks will be
                  introduced in the children dietary plans to complement it and
                  to substitute less healthier options in-between meals.
                </p>
                <p>
                  SWITCHtoHEALTHY will result in increasing the adherence to
                  Mediterranean Diet (MD) by taking an intra-familiar systemic
                  approach taking the family context into account and assess
                  mutual influence of children/adolescents-parents and their
                  roles in healthy eating and lifestyle; developing innovative
                  solutions (plant -based snacks) based on proximity of
                  ingredients, sustainability andand healthy consumption to
                  support agri-food producers (especially SMEs) in finding new
                  business opportunities; job creation opportunities and
                  diversification in traditional Mediterranean food sector;
                  supporting food companies in getting through the barriers to
                  market uptake and achieving a sustainable competitive
                  advantage by designing innovative consumer-oriented BMs;
                  raising awareness of the healthy benefits derived from a high
                  adherence to a MD, increasing knowledge on local Med products
                  thus contributing to improve healthy food choices among
                  families; synergising cross-sectorial policy coherence across
                  agriculture, health, education, environment, trade, etc. from
                  local to national and international level and discussing with
                  all actors of society.
                </p>
                <p>
                  SWITCHtoHEALTHY involves 18 prestigious organizations – public
                  and private – from 8 countries of both shores of Mediterranean
                  Sea (Italy, Egypt, Spain, Greece, Lebanon, Morocco, Tunisia
                  and Turkey). More information can be found in the project
                  website:
                  <a href="http://switchtohealthy.eu/">
                    http://switchtohealthy.eu/
                  </a>
                  .
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

{
  /* <div class="row gx-5 align-items-center">
                    <div class="col-lg-6">
                        <img class="img-fluid rounded mb-5 mb-lg-0" src="images/resource-01.PNG" alt="vegetables" width="694" height="423">
                    </div>
                    <div class="col-lg-6">
                        <h2 class="fw-bolder">Welcome to SWITCHtoHEALTHY</h2>
                        <p>In the Mediterranean countries profound changes in diet are taking place, largely due to cultural and socio-economic changes in lifestyle, which are leading to the erosion of the Mediterranean food cultures. The diet modernization process is noticeable; it has generated not only a modification of food choices in the direction of unhealthy foods, but also the habit of sedentary behaviours leading to an imbalance between energy intake and consumption. All of this has negative health impacts, as shown by the ever-increasing prevalence of overweight and obesity, as well as the rise of chronic diet-related diseases. The SWITCHtoHEALTHY project aims to generate an overall change of approach to the modern problem of eating behaviours, by strengthening the role of families towards the promotion of the sustainable Mediterranean food model. The main goal is to generate an actual switch to healthier dietary models, that are more consistent with the Mediterranean Diet.</p>
                    </div>
                </div> */
}
