import initModel from "./Model";
import view from "./View";
import update from "./Update";
import app from "./App";

const rootNode = document.querySelector("#app");

app(initModel, update, view, rootNode);
