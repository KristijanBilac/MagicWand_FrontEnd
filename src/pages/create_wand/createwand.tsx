import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import "./createwand.css"
import {InputNumber} from "primereact/inputnumber";
import {useRef, useState} from "react";
import { Toast } from 'primereact/toast';
import axios from '../../axiosInstance';
import {useForm} from "react-hook-form";




export default function Createwand(){

    const toast = useRef<Toast>(null);

    const form  = useForm<FormValues>()

    const { handleSubmit} = form;

    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
    );


    type FormValues ={
        flexibility: string;
        owner: string;
        length: number;
        wood: string;
    }

    const [magicWand, setMagicWand] = useState<FormValues>({
        flexibility: "",
        owner: "",
        length: 0,
        wood: "",
    });

    const onSubmit = async () => {
        try {
            console.log("Form submitted ");
            const response = await axios.post(
                "http://127.0.0.1:8000/api/v1/magic_wand",
                {
                    flexibility: magicWand.flexibility,
                    owner: magicWand.owner,
                    length: magicWand.length,
                    wood: magicWand.wood
                }, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.current?.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Magic wand created successfully",
                });
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };




    return(
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <Card className="card">

                        <h2>Magic Wand details</h2>

                        <div className="details2">
                            <label>Flexibility:</label>
                            <InputText
                                value={magicWand.flexibility}
                                onChange={(e) =>
                                    setMagicWand({...magicWand, flexibility: e.target.value})
                                }
                            />
                        </div>
                        <div className="details2">
                            <label>Owner:</label>
                            <InputText
                                value={magicWand.owner.toString()}
                                onChange={(e) =>
                                    setMagicWand({...magicWand, owner: e.target.value})
                                }
                            />
                        </div>
                        <div className="details2">
                            <label>Length:</label>
                            <InputNumber
                                value={magicWand.length}
                                onChange={(e) =>
                                    setMagicWand({...magicWand, length: e.value as number})
                                }
                            />
                        </div>
                        <div className="details2">
                            <label>Wood:</label>
                            <InputText
                                value={magicWand.wood}
                                onChange={(e) =>
                                    setMagicWand({...magicWand, wood: e.target.value})
                                }
                            />
                        </div>

                        <div className="button_block gap-3">
                            <div className="button-login">
                                <Toast ref={toast}></Toast>
                                <Button label="Submit" icon="pi pi-check" iconPos="right"/>
                            </div>

                            <div className="button-login">
                                <Button
                                    label="Back"
                                    icon="pi pi-check"
                                    raised
                                    onClick={() => window.history.back()}
                                />
                            </div>
                        </div>


                    </Card>
                </div>
            </form>
        </div>
);
}