import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./table_not_logged_in.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {RingLoader} from "react-spinners";

interface MagicWand{
    flexibility: string;
    owner: string;
    length: number;
    wood: string;
    inspect: string;
}


export default function Table_not_logged_in() {

    const [loading, setLoading] = useState(true)

    const [MagicWands, setMagicWands] = useState<MagicWand[]>([]);

    useEffect(() => {
        const fetchMagicWandTable = async () => {

        try {
            setLoading(true)
            console.log("Fetching Magic Wand Table submited");
            await new Promise(resolve => setTimeout(resolve, 1200));

            const response = await axios.get("http://127.0.0.1:8000/api/v1/magic_wands_limited");
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
                    <div>
                        <Card className="card1">

                            <h2>List of magic wands</h2>

                            <div className="buttons">
                                <div className="button-back-to-login">
                                    <Button
                                        label="Back"
                                         text raised
                                        onClick={() => window.history.back()}
                                    />
                                </div>
                            </div>

                            <div className="table">
                                <DataTable value={MagicWands} stripedRows tableStyle={{minWidth: '50rem'}}>
                                    <Column field="flexibility" header="Flexibility"></Column>
                                    <Column field="owner" header="Owner"></Column>
                                    <Column field="length" header="Length"></Column>
                                    <Column field="wood" header="Wood"></Column>
                                    <Column header="Inspect" body={() => <Link to="/inspect" className="inspect-link">View details</Link>}></Column>
                                </DataTable>
                            </div>
                         </Card>
                    </div>
                )}
        </div>
    );
}