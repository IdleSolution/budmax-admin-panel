import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import List from "./components/List/List";
import RouteGuard from "./components/RouteGuard/RouteGuard";
import AddEntityForm from "./components/AddEntityForm/AddEntityForm";
import Attributes from "./components/Attributes/Attributes";
import Attribute from "./components/Attribute/Attribute";
import Details from "./components/Details/Details";
import EditEntityForm from "./components/EditEntityForm/EditEntityForm";
import { listConfig } from "./components/List/config";
import { detailsConfig } from "./components/Details/config";
import { createConfig } from "./components/AddEntityForm/config";
import { editConfig } from "./components/EditEntityForm/config";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {listConfig.map(list => (
          <Route
            path={list.path}
            element={
              <RouteGuard>
                <List {...list}/>
              </RouteGuard>
            }
          />
        ))}

        <Route
          path="/attributes"
          element={
            <RouteGuard>
              <Attributes />
            </RouteGuard>
          }
        />
        <Route
          path="/attribute/:type"
          element={
            <RouteGuard>
              <Attribute />
            </RouteGuard>
          }
        />
        {detailsConfig.map(detail => (
          <Route
            path={`${detail.path}/:id`}
            element={
              <RouteGuard>
                <Details {...detail} />
              </RouteGuard>
            }
          />
        ))}

        {editConfig.map(edit => (
            <Route
            path={`${edit.path}/edit/:id`}
            element={
              <RouteGuard>
                <EditEntityForm {...edit}/>
              </RouteGuard>
            }
            />
        ))}

        {createConfig.map(create => (
          <Route
            path={`/add${create.path}`}
            element={
              <RouteGuard>
                <AddEntityForm {...create} />
              </RouteGuard>
            }
          />
        ))}

      </Routes>
    </BrowserRouter>
  );
};

export default App;
