import './App.css';
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import FileUploaderView from "./Views/FileUploaderView";
import TextInputView from "./Views/TextInputView";
import TextManagerView from "./Views/TextManagerView";
import FilesListView from "./Views/FilesListView";
import FileContentView from "./Views/FileContentView";

export enum RouteNames {
    Main = "/",
    FilesList= "/files_list",
    TextInput = "/text_input_content",
    FileUpload = "/file_upload",
    FileContentView = "/file_content_view",
}

const Routes : React.FC = () => {
  return (
      <div>
        <BrowserRouter>
          <Switch>
              <Route path={RouteNames.Main} component={TextManagerView} exact />
              <Route path={RouteNames.TextInput} component={TextInputView} exact />
              <Route path={RouteNames.FileUpload} component={FileUploaderView} exact />
              <Route path={RouteNames.FilesList} component={FilesListView} exact />
              <Route path={`${RouteNames.FileContentView}/:name`} component={FileContentView} exact />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
  );
}

function App() {
  return (
      <div>
        <Routes/>
      </div>
  );
}

export default App;
