import {Card} from "primereact/card";
import {Button} from "primereact/button";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import "./viewdetails.css"
import {Link} from "react-router-dom";

interface formValues{
    flexibility: string;
    owner: string;
    length: number;
    wood: string;
    inspect: string;
}
export default function Viewdetails(){

    const [magicWand, setMagicWand] = useState<formValues>({
        flexibility: "",
        owner: "",
        length: 0,
        wood: "",
        inspect: "",
    });

    const form  = useForm()

    const { handleSubmit } = form;

    const onSubmit = async () => {
        try {
            console.log("Form submitted");

            const response = await axios.get("http://127.0.0.1:8000/api/v1/magic_wand/{id}");

            if (response?.status === 200) {
                setMagicWand(response?.data)
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };


    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Card className="card">

                    <h2>Magic Wand details</h2>

                    <div className="details1">
                        <label>Flexibility:</label>
                        <InputText
                            readOnly
                            tabIndex="-1"
                            value={magicWand.flexibility}
                        />
                    </div>
                    <div className="details1">
                        <label>Owner:</label>
                        <InputText
                            readOnly
                            tabIndex="-1"
                            value={magicWand.owner}
                        />
                    </div>
                    <div className="details1">
                        <label>Length:</label>
                        <InputText
                            readOnly
                            tabIndex="-1"
                            value={magicWand.length}
                        />
                    </div>
                    <div className="details1">
                        <label>Wood:</label>
                        <InputText
                            readOnly
                            tabIndex="-1"
                            value={magicWand.wood}
                        />
                    </div>


                    <div className="button-login">
                        <Link to="/table ">
                            <Button label="Back" icon="pi pi-check" raised/>
                        </Link>
                    </div>


                </Card>
            </form>
        </>

    )

}