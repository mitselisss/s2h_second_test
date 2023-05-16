import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./userProfilePage.css";
import { Link } from "react-router-dom";
import SideBar from "../components/sideBar";
import userProfileImage from "../images/graphics/about.jpg";

function UserProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [BMI, setBMI] = useState("");
  const [BMR, setBMR] = useState("");
  const [PAL, setPAL] = useState("");
  const [energyintake, setEnergyintake] = useState("");
  const [halal, setHalal] = useState(false);
  const [diary, setDiary] = useState(false);
  const [eggs, setEggs] = useState(false);
  const [fish, setFish] = useState(false);
  const [country, setCountry] = useState("");

  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  useEffect(() => {
    if (user == null) {
      navigate("/");
    } else {
      (async () => {
        const response = await axios.get("IdUserProfile/" + user.user_id + "/");
        //setUser(response.data.user);
        setUsername(response.data.user.username);
        setEmail(response.data.user.email);
        setHeight(response.data.height);
        setWeight(response.data.weight);
        setGender(response.data.gender);
        setYearOfBirth(response.data.yob);
        setBMI(response.data.bmi);
        setBMR(response.data.bmr);
        setPAL(response.data.pal);
        setEnergyintake(response.data.energy_intake);
        setHalal(response.data.halal);
        setDiary(response.data.diary);
        setEggs(response.data.eggs);
        setFish(response.data.fish);
        setCountry(response.data.country);
      })();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("IdUserProfile/" + user.user_id + "/", {
        height: height,
        weight: weight,
        gender: gender,
        yob: yearOfBirth,
        pal: PAL,
        halal: halal,
        diary: diary,
        eggs: eggs,
        fish: fish,
        country: country,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error saving username and password.", error);
    }
  };

  return (
    <div>
      <SideBar />
      <div className="user-profile-image">
        <div className="user-profile-container">
          <form onSubmit={handleSubmit}>
            <br></br>
            <br></br>
            <div className="user-profile-grid">
              <div>
                <div className="user-profile-font">Personal Info</div>
                <br></br>
                <div className="user-font">Username: {username}</div>
                <br></br>
                <div className="user-font">Email: {email}</div>
              </div>
              <div>
                <div className="user-profile-font">
                  Physical Characteristics
                </div>
                <br></br>
                <div>
                  <label className="user-font">Gender:</label>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(event) => setGender(event.target.value)}
                      className="user-font"
                    />
                    Male
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(event) => setGender(event.target.value)}
                      className="user-font"
                    />
                    Female
                  </div>
                </div>
                <br></br>
                <div>
                  <label className="user-font">Year of Birth</label>
                  <input
                    type="number"
                    name="yearOfBirth"
                    value={yearOfBirth}
                    onChange={(event) => setYearOfBirth(event.target.value)}
                    className="line-field"
                  />
                </div>
                <div>
                  <label className="user-font">Height (m)</label>
                  <input
                    type="number"
                    name="height"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    className="line-field"
                  />
                </div>
                <div>
                  <label className="user-font">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    className="line-field"
                  />
                </div>
                <div>
                  <div className="user-font">
                    BMI: {BMI}{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BMR: {BMR}
                  </div>
                </div>
                <br></br>
                <div>
                  <label className="user-profile-font">
                    Physical Activity Level (PAL):
                  </label>
                  <div>
                    <input
                      type="radio"
                      name="PAL"
                      value="Sedentary"
                      checked={PAL === "Sedentary"}
                      onChange={(event) => setPAL(event.target.value)}
                      className="user-font"
                    />
                    Sedentary
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="PAL"
                      value="Low active"
                      checked={PAL === "Low active"}
                      onChange={(event) => setPAL(event.target.value)}
                      className="user-font"
                    />
                    Low Active
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="PAL"
                      value="Active"
                      checked={PAL === "Active"}
                      onChange={(event) => setPAL(event.target.value)}
                      className="user-font"
                    />
                    Active
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="PAL"
                      value="Very active"
                      checked={PAL === "Very active"}
                      onChange={(event) => setPAL(event.target.value)}
                      className="user-font"
                    />
                    Very Active (Athlete)
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label className="user-profile-font">Allergies</label>
                  </div>
                  <br></br>
                  <div className="allergies-section">
                    <div className="checkbox-options">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            checked={diary}
                            onChange={(event) => setDiary(!diary)}
                          />
                          Diary
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            checked={eggs}
                            onChange={(event) => setEggs(!eggs)}
                          />
                          Eggs
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            checked={fish}
                            onChange={(event) => setFish(!fish)}
                          />
                          Fish/Seafood
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <div>
                  <label className="user-profile-font">Dietary Choices</label>
                </div>
                <br></br>
                <div className="allergies-section">
                  <div className="checkbox-options">
                    <label>
                      <input
                        type="checkbox"
                        checked={halal}
                        onChange={(event) => setHalal(!halal)}
                      />
                      Halal
                    </label>
                  </div>
                </div>
                <br></br>
                <div>
                  <label className="user-profile-font">
                    Choose national cuisine:{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="country"
                    value="Spain"
                    checked={country === "Spain"}
                    onChange={(event) => setCountry(event.target.value)}
                    className="user-font"
                  />
                  Spain
                </div>
                <div>
                  <input
                    type="radio"
                    name="country"
                    value="Turkey"
                    checked={country === "Turkey"}
                    onChange={(event) => setCountry(event.target.value)}
                    className="user-font"
                  />
                  Turkey
                </div>
                <div>
                  <input
                    type="radio"
                    name="country"
                    value="Morocco"
                    checked={country === "Morocco"}
                    onChange={(event) => setCountry(event.target.value)}
                    className="user-font"
                  />
                  Morocco
                </div>
                <br></br>
              </div>
            </div>
            <br></br>
            <br></br>
            <div>
              <Link
                to="/home"
                value="Cancel"
                className="button"
                style={{ float: "left" }}
              >
                Cancel
              </Link>
              <input
                type="submit"
                value="Update"
                className="button"
                style={{ float: "right" }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UserProfilePage;

{
  /* <div className="UserProfile-container">
      <form onSubmit={handleSubmit}>
        <div className="UserProfile-form-container">
          {/* <div className="UserProfile-personal-info-container">
            <div className="UserProfile-form-group">
              <label className="custom-font">Personal Info</label>
              <label className="custom-font">Username</label>
            </div>
            <div className="UserProfile-form-group">
              <label className="custom-font">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="line-field"
              />
            </div>
          </div> */
}

//       <div className="grid-container">
//         <div>
//           <div className="UserProfile-form-group">
//             <label className="custom-font">Height (cm)</label>
//             <input
//               type="number"
//               name="height"
//               value={height}
//               onChange={(event) => setHeight(event.target.value)}
//               className="line-field"
//             />
//           </div>
//         </div>
//         <div>
//           <div className="UserProfile-form-group">
//             <label className="custom-font">Weight (kg)</label>
//             <input
//               type="number"
//               name="weight"
//               value={weight}
//               onChange={(event) => setWeight(event.target.value)}
//               className="line-field"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="grid-container">
//         <div>
//           <div className="UserProfile-form-group">
//             <label className="custom-font">Gender:</label>
//             <div>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="male"
//                 checked={gender === "male"}
//                 onChange={(event) => setGender(event.target.value)}
//                 className="custom-font"
//               />
//               Male
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="female"
//                 checked={gender === "female"}
//                 onChange={(event) => setGender(event.target.value)}
//                 className="custom-font"
//               />
//               Female
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="UserProfile-form-group">
//             <label className="custom-font">Year of Birth</label>
//             <input
//               type="number"
//               name="yearOfBirth"
//               value={yearOfBirth}
//               onChange={(event) => setYearOfBirth(event.target.value)}
//               className="line-field"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="grid-container">
//         <div>
//           <div className="UserProfile-form-group">
//             <label className="custom-font">
//               Physical Activity Level (PAL):
//             </label>
//             <div>
//               <input
//                 type="radio"
//                 name="PAL"
//                 value="Sedentary"
//                 checked={PAL === "Sedentary"}
//                 onChange={(event) => setPAL(event.target.value)}
//                 className="custom-font"
//               />
//               Sedentary
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 name="PAL"
//                 value="Low active"
//                 checked={PAL === "Low active"}
//                 onChange={(event) => setPAL(event.target.value)}
//                 className="custom-font"
//               />
//               Low Active
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 name="PAL"
//                 value="Active"
//                 checked={PAL === "Active"}
//                 onChange={(event) => setPAL(event.target.value)}
//                 className="custom-font"
//               />
//               Active
//             </div>
//             <div>
//               <input
//                 type="radio"
//                 name="PAL"
//                 value="Very active"
//                 checked={PAL === "Very active"}
//                 onChange={(event) => setPAL(event.target.value)}
//                 className="custom-font"
//               />
//               Very Active
//             </div>
//           </div>
//         </div>
//         <div></div>
//       </div>
//       <div className="grid-container">
//         <div>
//           <div className="UserProfile-form-group">
//             <label className="custom-font">Allergies</label>

//             <div className="allergies-section">
//               <div className="checkbox-options">
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={diary}
//                     onChange={(event) => setDiary(!diary)}
//                   />
//                   Diary
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={eggs}
//                     onChange={(event) => setEggs(!eggs)}
//                   />
//                   Eggs
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={fish}
//                     onChange={(event) => setFish(!fish)}
//                   />
//                   Fish
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="UserProfile-form-group">
//             <label className="custom-font">Dietary Choices</label>
//           </div>
//           <div className="allergies-section">
//             <div className="checkbox-options">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={halal}
//                   onChange={(event) => setHalal(!halal)}
//                 />
//                 Halal
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="UserProfile-form-group">
//         <button type="submit">Update</button>
//       </div>
//     </div>
//   </form>
// </div> */}

// import React, { useState, useEffect } from "react";
// import logo from "../images/logo/logo2.png";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import SideBar from "../components/sideBar";

// function UserProfilePage() {
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [gender, setGender] = useState("");
//   const [yearOfBirth, setYearOfBirth] = useState("");
//   const [PAL, setPAL] = useState("");
//   const [halal, setHalal] = useState(false);
//   const [diary, setDiary] = useState(false);
//   const [eggs, setEggs] = useState(false);
//   const [fish, setFish] = useState(false);

//   const navigate = useNavigate();
//   const [authTokens, setAuthTokens] = useState(() =>
//     localStorage.getItem("authTokens")
//       ? JSON.parse(localStorage.getItem("authTokens"))
//       : null
//   );
//   const [user, setUser] = useState(() =>
//     localStorage.getItem("authTokens")
//       ? jwt_decode(localStorage.getItem("authTokens"))
//       : null
//   );

//   useEffect(() => {
//     if (user == null) {
//       navigate("/");
//     } else {
//       (async () => {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/IdUserProfile/" + user.user_id + "/"
//         );
//         //setUser(response.data.user);
//         setHeight(response.data.height);
//         setWeight(response.data.weight);
//         setGender(response.data.gender);
//         setYearOfBirth(response.data.yob);
//         setPAL(response.data.pal);
//         setHalal(response.data.halal);
//         setDiary(response.data.diary);
//         setEggs(response.data.eggs);
//         setFish(response.data.fish);
//       })();
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         "http://127.0.0.1:8000/IdUserProfile/" + user.user_id + "/",
//         {
//           height: height,
//           weight: weight,
//           gender: gender,
//           yob: yearOfBirth,
//           pal: PAL,
//           halal: halal,
//           diary: diary,
//           eggs: eggs,
//           fish: fish,
//         }
//       );
//       navigate("/home");
//     } catch (error) {
//       console.error("Error saving username and password.", error);
//     }
//   };

//   return (
//     <div class="row">
//       <h5 class="mb-4">Personal information</h5>
//       <form class="">
//         <div class="row">
//           <div class="mb-3 col-md-6">
//             <div id="firstName">
//               <label class="form-label">Username</label>
//               <input
//                 required=""
//                 placeholder="Enter your username"
//                 type="text"
//                 class="form-control"
//               ></input>
//             </div>
//           </div>
//           <div class="mb-3 col-md-6">
//             <div id="lastName">
//               <label class="form-label">Password</label>
//               <input
//                 required=""
//                 placeholder="Also your last name"
//                 type="text"
//                 class="form-control"
//               ></input>
//             </div>
//           </div>
//         </div>
//         <div className="UserProfile-container">
//           <SideBar />
//           <form onSubmit={handleSubmit}>
//             <div className="UserProfile-form-container">
//               {/* <div className="UserProfile-personal-info-container">
//             <div className="UserProfile-form-group">
//               <label className="custom-font">Personal Info</label>
//               <label className="custom-font">Username</label>
//             </div>
//             <div className="UserProfile-form-group">
//               <label className="custom-font">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 className="line-field"
//               />
//             </div>
//           </div> */}
//               <div className="grid-container">
//                 <div>
//                   <div className="UserProfile-form-group">
//                     <label className="custom-font">Height (cm)</label>
//                     <input
//                       type="number"
//                       name="height"
//                       value={height}
//                       onChange={(event) => setHeight(event.target.value)}
//                       className="line-field"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="UserProfile-form-group">
//                     <label className="custom-font">Weight (kg)</label>
//                     <input
//                       type="number"
//                       name="weight"
//                       value={weight}
//                       onChange={(event) => setWeight(event.target.value)}
//                       className="line-field"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="grid-container">
//                 <div>
//                   <div className="UserProfile-form-group">
//                     <label className="custom-font">Gender:</label>
//                     <div>
//                       <input
//                         type="radio"
//                         name="gender"
//                         value="male"
//                         checked={gender === "male"}
//                         onChange={(event) => setGender(event.target.value)}
//                         className="custom-font"
//                       />
//                       Male
//                     </div>
//                     <div>
//                       <input
//                         type="radio"
//                         name="gender"
//                         value="female"
//                         checked={gender === "female"}
//                         onChange={(event) => setGender(event.target.value)}
//                         className="custom-font"
//                       />
//                       Female
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="UserProfile-form-group">
//                     <label className="custom-font">Year of Birth</label>
//                     <input
//                       type="number"
//                       name="yearOfBirth"
//                       value={yearOfBirth}
//                       onChange={(event) => setYearOfBirth(event.target.value)}
//                       className="line-field"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="grid-container">
//                 <div>
//                   <div className="UserProfile-form-group">
//                     <label className="custom-font">
//                       Physical Activity Level (PAL):
//                     </label>
//                     <div>
//                       <input
//                         type="radio"
//                         name="PAL"
//                         value="Sedentary"
//                         checked={PAL === "Sedentary"}
//                         onChange={(event) => setPAL(event.target.value)}
//                         className="custom-font"
//                       />
//                       Sedentary
//                     </div>
//                     <div>
//                       <input
//                         type="radio"
//                         name="PAL"
//                         value="Low active"
//                         checked={PAL === "Low active"}
//                         onChange={(event) => setPAL(event.target.value)}
//                         className="custom-font"
//                       />
//                       Low Active
//                     </div>
//                     <div>
//                       <input
//                         type="radio"
//                         name="PAL"
//                         value="Active"
//                         checked={PAL === "Active"}
//                         onChange={(event) => setPAL(event.target.value)}
//                         className="custom-font"
//                       />
//                       Active
//                     </div>
//                     <div>
//                       <input
//                         type="radio"
//                         name="PAL"
//                         value="Very active"
//                         checked={PAL === "Very active"}
//                         onChange={(event) => setPAL(event.target.value)}
//                         className="custom-font"
//                       />
//                       Very Active
//                     </div>
//                   </div>
//                 </div>
//                 <div></div>
//               </div>
//               <div className="grid-container">
//                 <div>
//                   <div className="UserProfile-form-group">
//                     <label className="custom-font">Allergies</label>

//                     <div className="allergies-section">
//                       <div className="checkbox-options">
//                         <label>
//                           <input
//                             type="checkbox"
//                             checked={diary}
//                             onChange={(event) => setDiary(!diary)}
//                           />
//                           Diary
//                         </label>
//                         <label>
//                           <input
//                             type="checkbox"
//                             checked={eggs}
//                             onChange={(event) => setEggs(!eggs)}
//                           />
//                           Eggs
//                         </label>
//                         <label>
//                           <input
//                             type="checkbox"
//                             checked={fish}
//                             onChange={(event) => setFish(!fish)}
//                           />
//                           Fish
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="UserProfile-form-group">
//                     <label className="custom-font">Dietary Choices</label>
//                   </div>
//                   <div className="allergies-section">
//                     <div className="checkbox-options">
//                       <label>
//                         <input
//                           type="checkbox"
//                           checked={halal}
//                           onChange={(event) => setHalal(!halal)}
//                         />
//                         Halal
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="UserProfile-form-group">
//                 <button type="submit">Update</button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </form>
//     </div>
//   );
// }
// export default UserProfilePage;
