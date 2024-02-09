import axios from '../../axiosInstance';
import "./viewdetails.css"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {RingLoader} from "react-spinners";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";


interface formValues{
    flexibility: string;
    owner: string;
    length: number;
    wood: string;
    inspect: string;
}
export default function ViewDetails(){

    const [loading, setLoading] = useState(true)

    const { id } = useParams<{ id: string }>();

    const [magicWand, setMagicWand] = useState<formValues>({
        flexibility: "",
        owner: "",
        length: 0,
        wood: "",
        inspect: "",
    });


    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
    );

    useEffect(() => {
        const fetchMagicWandDetails = async () => {
            try {
                setLoading(true)
                await new Promise(resolve => setTimeout(resolve, 600));

                const response = await axios.get(`http://127.0.0.1:8000/api/v1/magic_wand/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response?.status === 200) {
                    console.log("Fetching details for magic wand id:",id,"submited")
                    setMagicWand(response?.data);
                }
            } catch (error) {
                console.error("There was an error!", error);
            }finally {
                setLoading(false)
            }};

        fetchMagicWandDetails();

    }, [id]);


    return(
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
                            <Card className="card">

                                <h2>Magic Wand details</h2>

                                <div className="details1">
                                    <label>Flexibility:</label>
                                    <InputText
                                        readOnly
                                        tabIndex={-1}
                                        value={magicWand.flexibility}
                                    />
                                </div>
                                <div className="details1">
                                    <label>Owner:</label>
                                    <InputText
                                        readOnly
                                        tabIndex={-1}
                                        value={magicWand.owner}
                                    />
                                </div>
                                <div className="details1">
                                    <label>Length:</label>
                                    <InputNumber
                                        readOnly
                                        tabIndex={-1}
                                        value={magicWand.length}
                                    />
                                </div>
                                <div className="details1">
                                    <label>Wood:</label>
                                    <InputText
                                        readOnly
                                        tabIndex={-1}
                                        value={magicWand.wood}
                                    />
                                </div>


                                <div className="button-login">
                                    <Button
                                        label="Back"
                                        icon="pi pi-check"
                                        raised
                                        onClick={() => window.history.back()}
                                    />
                                </div>


                            </Card>
                    </div>
            )}
        </div>
    );
}