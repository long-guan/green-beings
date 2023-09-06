import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Main from "./Main";
import LogoutButton from "./Logout";
import AllEventList from "./Events/AllEventsList";
import "./App.css";
// import CommunitiesList from "./CommunitiesList";
import CommunitiesForm from "./CommunitiesForm";
import Navbar from "./Navbar";
import UserProfilePage from "./UserProfilePage/UserProfilePage";
import EventForm from "./EventsForm";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div className="container">
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
        <BrowserRouter basename={basename}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route exact path="/signup" element={<SignupForm />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/logout" element={<LogoutButton />}></Route>
            <Route exact path="/events" element={<AllEventList />}></Route>
            <Route path="communities/">
              <Route path="create" element={<CommunitiesForm />} />
              {/* <Route index element={<CommunitiesList />} /> */}
            </Route>
            <Route path="events/">
              <Route path="create" element={<EventForm />} />
            </Route>
            <Route
              exact
              path="/userprofile"
              element={<UserProfilePage />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
