import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Stepper from "./components/Stepper";

const App = () => {
  return (
    <div>
      <div className="App-header">
        <Provider store={store}>
          <div>
            <Stepper />
          </div>
        </Provider>
      </div>
    </div>
  );
};

export default App;
