import "./CreateGame.css";
import { Formik, Field, Form, useFormik } from "formik"; 
import axios, {AxiosRequestConfig} from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, GAME_PORT } from "../../static/defaults";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getJwt } from "../../util/getJwt";
import lobbyClient from "../../util/lobbyClient";

function CreateNewGameForm() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleNewGame = async (game:{gameName: string, lobbyIsPrivate: boolean}) => {
        const jwt = getJwt();
        if (!jwt) {
            throw new Error("No JWT token found");
        }
        
        const requestConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'gameName': game.gameName,
                'lobbyIsPrivate': "" + game.lobbyIsPrivate,
                'Content-Type': 'application/json'
            }
        }
        
        const PATH = `/createBlackjackGame`;

        lobbyClient.post<string>(PATH, {}, requestConfig)
        .then((res) => {
            navigate('/' + 'blackjack' + '/' + res.data);
        })
        .catch( (err) => console.log("Error:" + err));
    }

    return (
        <div className="game-form-div">
            <Formik 
            initialValues={{gameName: "", lobbyIsPrivate: false,}}
            onSubmit={(values) => {
                handleNewGame(values);
            }}>
            {({ values }) => (
                <Form className="new-game-form">
                    <label className="name-label">Enter a name for your game</label>
                    <Field id="gameName" name="gameName" value={values.gameName}/>
                    
                    <label className="checkbox-label"><Field id="check" type="checkbox" name="lobbyIsPrivate"/>Set table to private</label>
                    <div className="button-div"><button className="create-game" type="submit">Submit</button></div>
                </Form>    
            ) }

            </Formik>
        </div>
        
    )
}; 

export default CreateNewGameForm;



