import { h } from "preact";
import MapPage from "../MapPage";
import { useAppDispatch } from "../../store";
import useFullScreen from "./useFullScreen";
import Router, { route } from "preact-router";
import { loadSession } from "../../store/uiSlice";

const buildQueryParams = (
  ...params: (Record<string, string | undefined> | null)[]
): string => {
  const args = params.reduce((acc, obj) => {
    if (obj) {
      acc = {
        ...acc,
        ...obj,
      };
    }
    return acc;
  });
  const res = Object.entries(args).reduce(
    (acc, [key, value]) => acc + `${key}=${value !== undefined ? value : ""}&`,
    ""
  );
  return res.substring(0, res.length - 1);
};

const Routes = () => {
  const dispatch = useAppDispatch();
  useFullScreen();
  return (
    <Router
      onChange={(args) => {
        if (args.path === "/") {
          dispatch(loadSession(args.matches?.sessionId))
            .unwrap()
            .then(({ session }) => {
              if (args.matches?.sessionId !== session.id) {
                route(
                  args.path +
                    "?" +
                    buildQueryParams(args.matches, { sessionId: session.id })
                );
              }
            })
            .catch((err) => {
              if (err?.name !== "ConditionError") {
                console.error("Error loading session: ", err);
              }
            });
        }
      }}
    >
      <MapPage path="/" />
    </Router>
  );
};

export default Routes;
