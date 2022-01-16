import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="container-fluid w-100 d-flex justify-content-center mt-3">
      <div className="row">
        <div>
          <Signup />
        </div>
      </div>
    </div>
  );
}

export default App;
