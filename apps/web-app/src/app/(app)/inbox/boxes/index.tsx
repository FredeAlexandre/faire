import * as actions from "./actions";
import * as delegated from "./delegated";
import * as events from "./events";
import * as trash from "./trash";

export default [actions, events, delegated, trash] as const;
