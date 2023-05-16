import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../App.css";

function newUserProfilePage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [PAL, setPAL] = useState("");

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
        const response = await axios.get(
          "http://127.0.0.1:8000/IdUserProfile/" + user.user_id + "/"
        );
        setHeight(response.data.height);
        setWeight(response.data.weight);
        setGender(response.data.gender);
        setYearOfBirth(response.data.yob);
        setPAL(response.data.pal);
      })();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/IdUserProfile/" + user.user_id + "/",
        {
          height: height,
          weight: weight,
          gender: gender,
          yob: yearOfBirth,
          pal: PAL,
        }
      );
      navigate("/home");
    } catch (error) {
      console.error("Error saving username and password.", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <div className="UserProfile-form-group">
            <label className="custom-font">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              className="line-field"
            />
          </div>

          <div className="UserProfile-form-group">
            <label className="custom-font">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className="line-field"
            />
          </div>

          <div className="UserProfile-form-group">
            <label className="custom-font">Gender:</label>
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(event) => setGender(event.target.value)}
                className="custom-font"
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
                className="custom-font"
              />
              Female
            </div>
          </div>
        </div>

        <div className="center">
          <div className="UserProfile-form-group">
            <label className="custom-font">Year of Birth</label>
            <input
              type="number"
              name="yearOfBirth"
              value={yearOfBirth}
              onChange={(event) => setYearOfBirth(event.target.value)}
              className="line-field"
            />
          </div>
        </div>

        <div class="right">
          <div>
            <div className="UserProfile-form-group">
              <label className="custom-font">Halal</label>
              <div>
                <input
                  type="checkbox"
                  name="halal"
                  checked={halal}
                  onChange={(event) => setHalal(event.target.checked)}
                  className="custom-font"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="UserProfile-form-group">
              <label className="custom-font">Exclude dairy</label>
              <div>
                <input
                  type="checkbox"
                  name="diary"
                  checked={diary}
                  onChange={(event) => setDiary(event.target.checked)}
                  className="custom-font"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="UserProfile-form-group">
              <label className="custom-font">Exclude eggs</label>
              <div>
                <input
                  type="checkbox"
                  name="eggs"
                  checked={eggs}
                  onChange={(event) => setEggs(event.target.checked)}
                  className="custom-font"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="UserProfile-form-group">
              <label className="custom-font">Exclude fish</label>
              <div>
                <input
                  type="checkbox"
                  name="fish"
                  checked={fish}
                  onChange={(event) => setFish(event.target.checked)}
                  className="custom-font"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="bottom">
          <button type="submit" className="UserProfile-submit-button">
            Save Changes
          </button>
        </div>
      </form>
      <SideBar />
    </div>
  );
}
export default newUserProfilePage;
