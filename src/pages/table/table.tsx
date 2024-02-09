import "./table.css"
import {useEffect, useState} from "react";
import axios from '../../axiosInstance';
import {RingLoader} from "react-spinners";
import {Link, useNavigate} from "react-router-dom";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


interface MagicWand{
    id: string
    flexibility: string;
    owner: string;
    length: number;
    wood: string;
    inspect: string;
}


export default function Table() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)

    const [MagicWands, setMagicWands] = useState<MagicWand[]>([]);

    useEffect(() => {
        const fetchMagicWandTable = async () => {
            try {
                console.log("Fetching wands submitted");

                setLoading(true)

                const token = document.cookie.replace(
                    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
                    "$1",
                );


                await new Promise(resolve => setTimeout(resolve, 1200));

                const response = await axios.get("http://127.0.0.1:8000/api/v1/magic_wands",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response?.status === 200) {
                    setMagicWands(response?.data);
                }
            } catch (error) {
                console.error("There was an error!", error);
            } finally {
                setLoading(false)
            }};

        fetchMagicWandTable();
    }, []);


    return (
        <div className="container">
            {loading ? (
                <div className="loader">
                    <RingLoader
                        color="#ffffff"
                        size={50}
                    />

                </div>

            ) : (
                    <Card className="card1">

                        <h2>List of magic wands</h2>

                        <div className="buttons">
                            <div className="button-show-list">
                                <Button label="Create Wand" icon="pi pi-check" raised onClick={() => navigate("/wand/create")}/>
                            </div>


                            <div className="button-back-to-login1">
                                <Link to="/Login ">
                                    <Button type="button" label="Logout" text raised/>
                                </Link>
                            </div>
                        </div>

                        <div className="table">
                            <DataTable value={MagicWands} tableStyle={{minWidth: '50rem'}}>
                                <Column field="flexibility" header="Flexibility"></Column>
                                <Column field="owner" header="Owner"></Column>
                                <Column field="length" header="Length"></Column>
                                <Column field="wood" header="Wood"></Column>
                                <Column header="Inspect" body={(wand: MagicWand) => {
                                    return <Link to={`/wand/details/${wand.id}`} className="inspect-link1">
                                        View details
                                    </Link>
                                    }
                                }
                                ></Column>
                            </DataTable>

                        </div>

                    </Card>
            )}
        </div>
    );
}