import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/UserScreen.css"

const UDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    
    <main>
      <nav className="main-menu">
        <h1>Loans App</h1>
        <img className="logo" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/4cfdcb5a-0137-4457-8be1-6e7bd1f29ebb" alt="" />
        <ul>
          <li className="nav-item active">
            <b></b>
            <b></b>
            <a href="#">
              <i className="fa fa-house nav-icon"></i>
              <span className="nav-text">Home</span>
            </a>
          </li>

          <li className="nav-item">
            <b></b>
            <b></b>
            <a href="#">
              <i className="fa fa-user nav-icon"></i>
              <span className="nav-text">Profile</span>
            </a>
          </li>

          <li className="nav-item">
            <b></b>
            <b></b>
            <a href="#">
              <i className="fa fa-sliders nav-icon"></i>
              <span className="nav-text">Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      <section className="content">
        <div className="left-content">
          <div className="activities">
            <h1>Dashboard</h1>
            <div className="activity-container">
              <div className="image-container img-one">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/467cf682-03fb-4fae-b129-5d4f5db304dd" alt="tennis" />
                <div className="overlay">
                  <h3>Tennis</h3>
                </div>
              </div>

              <div className="image-container img-two">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/3bab6a71-c842-4a50-9fed-b4ce650cb478" alt="hiking" />
                <div className="overlay">
                  <h3>Hiking</h3>
                </div>
              </div>

              <div className="image-container img-three">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c8e88356-8df5-4ac5-9e1f-5b9e99685021" alt="running" />
                <div className="overlay">
                  <h3>Running</h3>
                </div>
              </div>

              <div className="image-container img-four">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/69437d08-f203-4905-8cf5-05411cc28c19" alt="cycling" />
                <div className="overlay">
                  <h3>Cycling</h3>
                </div>
              </div>

              <div className="image-container img-five">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e1a66078-1927-4828-b793-15c403d06411" alt="yoga" />
                <div className="overlay">
                  <h3>Yoga</h3>
                </div>
              </div>

              <div className="image-container img-six">
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7568e0ff-edb5-43dd-bff5-aed405fc32d9" alt="swimming" />
                <div className="overlay">
                  <h3>Swimming</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="left-bottom">
            <div className="weekly-schedule">
              <h1>Weekly Schedule</h1>
              <div className="calendar">
                <div className="day-and-activity activity-one">
                  <div className="day">
                    <h1>13</h1>
                    <p>mon</p>
                  </div>
                  <div className="activity">
                    <h2>Swimming</h2>
                    <div className="participants">
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c61daa1c-5881-43f8-a50f-62be3d235daf" style={{ "--i": 1 } as React.CSSProperties} alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/90affa88-8da0-40c8-abe7-f77ea355a9de" style={{ "--i": 2 } as React.CSSProperties} alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/07d4fa6f-6559-4874-b912-3968fdfe4e5e" style={{ "--i": 3 } as React.CSSProperties} alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e082b965-bb88-4192-bce6-0eb8b0bf8e68" style={{ "--i": 4 } as React.CSSProperties} alt="" />
                    </div>
                  </div>
                  <button className="btn">Join</button>
                </div>

                <div className="day-and-activity activity-two">
                  <div className="day">
                    <h1>15</h1>
                    <p>wed</p>
                  </div>
                  <div className="activity">
                    <h2>Yoga</h2>
                    <div className="participants">
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c61daa1c-5881-43f8-a50f-62be3d235daf" style={{ "--i": 1 } as React.CSSProperties} alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/32037044-f076-433a-8a6e-9b80842f29c9" style={{ "--i": 2 } as React.CSSProperties} alt="" />
                    </div>
                  </div>
                  <button className="btn">Join</button>
                </div>

                <div className="day-and-activity activity-three">
                  <div className="day">
                    <h1>17</h1>
                    <p>fri</p>
                  </div>
                  <div className="activity">
                    <h2>Tennis</h2>
                    <div className="participants">
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/32037044-f076-433a-8a6e-9b80842f29c9" style={{ "--i": 1 } as React.CSSProperties} alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e082b965-bb88-4192-bce6-0eb8b0bf8e68" style={{ "--i": 2 } as React.CSSProperties} alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c61daa1c-5881-43f8-a50f-62be3d235daf" style={{ "--i": 3 } as React.CSSProperties} alt="" />
                    </div>
                  </div>
                  <button className="btn">Join</button>
                </div>

                <div className="day-and-activity activity-four">
                  <div className="day">
                    <h1>18</h1>
                    <p>sat</p>
                  </div>
                  <div className="activity">
                    <h2>Hiking</h2>
                    <div className="participants">
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/07d4fa6f-6559-4874-b912-3968fdfe4e5e" style={{ "--i": 1 } as React.CSSProperties} alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/32037044-f076-433a-8a6e-9b80842f29c9" style={{ "--i": 2 } as React.CSSProperties} alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/07d4fa6f-6559-4874-b912-3968fdfe4e5e" alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c61daa1c-5881-43f8-a50f-62be3d235daf" style={{ "--i": 4 } as React.CSSProperties} alt="" />
                      <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/90affa88-8da0-40c8-abe7-f77ea355a9de" style={{ "--i": 5 } as React.CSSProperties} alt="" />
                    </div>
                  </div>
                  <button className="btn">Join</button>
                </div>
              </div>
            </div>

            <div className="personal-bests">
              <h1>Personal Bests</h1>
              <div className="personal-bests-container">
                <div className="best-item box-one">
                  <p>Fastest 5K Run: 22min</p>
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/242bbd8c-aaf8-4aee-a3e4-e0df62d1ab27" alt="" />
                </div>
                <div className="best-item box-two">
                  <p>Longest Distance Cycling: 4 miles</p>
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/a3b3cb3a-5127-498b-91cc-a1d39499164a" alt="" />
                </div>
                <div className="best-item box-three">
                  <p>Longest Roller-Skating: 2 hours</p>
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e0ee8ffb-faa8-462a-b44d-0a18c1d9604c" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-content">
          <div className="user-info">
            <div className="icon-container">
              <i className="fa fa-bell nav-icon"></i>
              <i className="fa fa-message nav-icon"></i>
            </div>
            <h4>Kelsey Miller</h4>
            <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/40b7cce2-c289-4954-9be0-938479832a9c" alt="user" />
          </div>

          <div className="active-calories">
            <h1 style={{ alignSelf: "flex-start" }}>Active Calories</h1>
            <div className="active-calories-container">
              <div className="box" style={{ '--i': '85%' } as React.CSSProperties}>
                <div className="circle">
                  <h2>85<small>%</small></h2>
                </div>
              </div>
              <div className="calories-content">
                <p><span>Today:</span> 400</p>
                <p><span>This Week:</span> 3500</p>
                <p><span>This Month:</span> 14000</p>
              </div>
            </div>
          </div>

          <div className="mobile-personal-bests">
            <h1>Personal Bests</h1>
            <div className="personal-bests-container">
              <div className="best-item box-one">
                <p>Fastest 5K Run: 22min</p>
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/05dfc444-9ed3-44cc-96af-a9cf195f5820" alt="" />
              </div>
              <div className="best-item box-two">
                <p>Longest Distance Cycling: 4 miles</p>
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9ca170e9-1252-4fa6-8677-36493540c1f2" alt="" />
              </div>
              <div className="best-item box-three">
                <p>Longest Roller-Skating: 2 hours</p>
                <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/262d1611-ed4c-4297-981c-480cf7f95714" alt="" />
              </div>
            </div>
          </div>

          <div className="friends-activity">
            <h1>Friends Activity</h1>
            <div className="card-container">
              <div className="card">
                <div className="card-user-info">
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9290037d-a5b2-4f50-aea3-9f3f2b53b441" alt="" />
                  <h2>Jane</h2>
                </div>
                <img className="card-img" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/bef54506-ea45-4e42-a1b6-23a48f61c5e8" alt="" />
                <p>We completed the 30-Day Running Streak Challenge!🏃‍♀️🎉</p>
              </div>

              <div className="card card-two">
                <div className="card-user-info">
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/42616ef2-ba96-49c7-80ea-c3cf1e2ecc89" alt="" />
                  <h2>Mike</h2>
                </div>
                <img className="card-img" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2dcc1b94-06c5-4c62-b886-53b9e433fd44" alt="" />
                <p>I just set a new record in cycling: 30 miles!💪</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}; // close UDashboard

export default UDashboard;
