import "./App.css";
import Login from "./pages/login/login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Table from "./pages/table/table.tsx";
import Table_not_logged_in from "./pages/table_not_logged_in/table_not_logged_in.tsx";
import VeiwDetails from "./pages/view_details/viewdetails.tsx"
import Createwand from "./pages/create_wand/createwand.tsx";


export default function App() {

  return (
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
                        <BrowserRouter>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/wand/table/all" element={<Table /> } />
                                <Route path="/wand/table/part" element={<Table_not_logged_in /> } />
                                <Route path="/wand/details/:id" element={<VeiwDetails />} />
                                <Route path="/wand/create" element={<Createwand />} />
                                <Route path="*" element={<Login />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </body>

            </PrimeReactProvider>
  )
}

