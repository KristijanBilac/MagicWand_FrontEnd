import "./App.css";
import Login from "./pages/login/login.tsx";
// import Register from "./Register.tsx";
// import Home from "./Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Tablenli from "./pages/table_not_logged_in/table_not_logged_in.tsx";
import Table_not_logged_in from "./pages/table_not_logged_in/table_not_logged_in.tsx";
export default function App() {

  return (
        <BrowserRouter>
            <PrimeReactProvider>

                <header>
                    <div className="header">
                        <div className="text">
                            <h1>Magic Wands</h1>
                        </div>
                    </div>
                </header>

                <body>

                <div className="content">
                    <Routes>
                        {/*<Route path="/" element={<Login />} />*/}
                        {/*<Route path="/table_not_logged_in" element={<Table_not_logged_in />*/}
                        {/*<Route path="/table_logged_in" element={<Table_logged_in />*/}
                        {/*<Route path="/update_user" element={<Update_user />} />*/}
                        {/*<Route path="/home" element={<Home />} />*/}
                        <Route path="*" element={<Login />} />
                    </Routes>
                </div>
                </body>
            </PrimeReactProvider>
        </BrowserRouter>
  )
}

