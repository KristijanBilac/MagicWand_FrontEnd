import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./table_not_logged_in.css"
import {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

interface MagicWand{
    flexibility: string;
    owner: string;
    length: number;
    wood: string;
    inspect: string;
}


export default function Table_not_logged_in() {

    const [MagicWands, setMagicWands] = useState<MagicWand[]>([]);

    const form = useForm();

    const { handleSubmit } = form;

    const onSubmit = async () => {
        try {
            console.log("FORM submited");

            const response = await axios.get("http://127.0.0.1:8000/api/v1/magic_wands_limietd");
            if (response?.status === 200) {
                setMagicWands(response?.data);

            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };


    return (
        <body>
            <form onSubmit={handleSubmit(onSubmit)} >

                <Card className="card1">

                    <h2>List of magic wands</h2>

                    <div className="buttons">
                        <div className="button-show-list">
                            <Button label="Show List" icon="pi pi-check" raised/>
                        </div>


                        <div className="button-back-to-login">
                            <Link to="/Login ">
                                <Button type="button" label="Back to Login" text raised/>
                            </Link>
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
            </form>
        </body>
    );
}