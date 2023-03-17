import "./CreateGame.css";
import { Formik, Field, Form, useFormik } from "formik"; 
import axios, {AxiosRequestConfig} from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, GAME_PORT } from "../../static/defaults";
import { useState } from "react";

interface NewGameValues {
    gameName: string; 
    lobbyIsPrivate: boolean; 
}

function CreateNewGameForm() {
    const navigate = useNavigate();
   
    const handleNewGame = (game:{gameName: string, lobbyIsPrivate: boolean}) => {
        //e.preventDefault();
        //e: React.MouseEvent<HTMLButtonElement>
        
        const requestConfig: AxiosRequestConfig = {
            baseURL: `http://${BASE_URL}:${GAME_PORT}`,
            headers: {
                'gameName': game.gameName,
                'lobbyIsPrivate': "" + game.lobbyIsPrivate,
                'Content-Type': 'application/json'
            }
        }

        console.log(requestConfig);
        

        const PATH = `/createBlackjackGame`;

        axios.post<string>(PATH, {}, requestConfig)
        .then((res) => {
            console.log(res.data);
            navigate('/' + 'blackjack' + '/' + res.data);
        })
        .catch( (err) => console.log(err));
    }

    return (
        <div className="game-form">
            <Formik 
            initialValues={{gameName: "", lobbyIsPrivate: false,}}
            onSubmit={(values) => {
                handleNewGame(values);
            }}>
            {({ values }) => (
                <Form>
                    <label>Enter a name for your game</label>
                    <Field id="gameName" name="gameName" value={values.gameName}/>
                    <label><Field id="check" type="checkbox" name="lobbyIsPrivate"/>Set table to private</label>
                    <button className="create-game" type="submit">Submit</button>
                </Form>    
            ) }

        </Formik>
        </div>
        
    )
}; 

export default CreateNewGameForm;



