import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./shared/components/Layout/Footer/Footer";
import Header from "./shared/components/Layout/Header/Header";
import Menu from "./shared/components/Layout/Menu/Menu";
import Sidebar from "./shared/components/Layout/Sidebar/Sidebar";
import Slider from "./shared/components/Layout/Slider/Slider";
import { Provider } from "react-redux";
import store, { persistor } from "./redux-setup/store";
import { Routers } from "./routers";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Header />
            <div id="body">
              <div className="container">
                <Menu />
                <div className="row">
                  <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                    <Slider />
                    <Routes>
                      {Routers.map((item) => (
                        <Route path={item.path} element={<item.element />} />
                      ))}
                    </Routes>
                  </div>
                  <Sidebar />
                </div>
              </div>
            </div>
            <Footer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
