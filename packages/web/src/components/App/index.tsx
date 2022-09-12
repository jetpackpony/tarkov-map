import { h } from "preact";
import { Provider } from "react-redux";
import makeStore from "../../store";
import { getDB } from "../../db/index";
import useFullScreen from "./useFullScreen";
import Routes from "./Routes";

const offline =
  process.env.OFFLINE === "true" && process.env.NODE_ENV !== "production";
const db = offline ? null : getDB();
const store = makeStore(db);

const App = () => {
  useFullScreen();
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
