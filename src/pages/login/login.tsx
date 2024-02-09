import { FieldErrors, useForm } from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button } from 'primereact/button';
import {InputText} from "primereact/inputtext";
import "./login.css"
import { Card } from "primereact/card";


export default function Login() {

    type FormValues = {
        username: string;
        password: string;
    };

    const form  = useForm<FormValues>({
        defaultValues: {
            username: "",
            password: "",
        },
    });


    const navigate = useNavigate();

    const { register, handleSubmit ,formState} = form;

    const { errors } = formState;
    const onSubmit = async (data: FormValues) => {
        try {
            console.log("Form submitted", data);

            const response = await axios.post(
                "http://127.0.0.1:8000/api/v1/user/login",
                {
                    username: data.username,
                    password: data.password,
                },
            );

            if (response.status === 200) {
                document.cookie = `token=${response.data.access_token}`;
                navigate("/wand/table/all");
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };
    const onError = (errors: FieldErrors<FormValues>) => {
        console.log("Form errors", errors);
        throw "Error"
    };

    return (

        <div className="container">
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>

                <Card className="card">

                    <h2>Login</h2>

                    <div className="user-box">
                                <span className="p-float-label">
                                    <InputText {...register("username", {
                                        required: "Username is required",
                                    })}
                                               type="username"
                                               id="username"/>
                                    <label htmlFor="username">Username</label>
                                </span>
                        <p className="error">{errors.username?.message}</p>
                    </div>


                    <div className="user-box">
                                <span className="p-float-label">
                                    <InputText
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                        type="password"
                                        id="password"
                                    />
                                    <label htmlFor="password">Password</label>
                                </span>
                        <p className="error">{errors.password?.message}</p>
                    </div>


                    <div className="button-login">
                        <Button label="Login" icon="pi pi-check" raised/>
                    </div>


                    <div className="button-login">
                            <Button type="button" label="Continue as Guest" text raised onClick={() => navigate("/wand/table/part") }/>
                    </div>

                </Card>
            </form>
        </div>
    );
}
