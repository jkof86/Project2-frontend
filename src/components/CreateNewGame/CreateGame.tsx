import "./CreateGame.css";
import { Formik, Field, Form } from "formik"; 


interface NewGameValues {
    gameName: string; 
    lobbyIsPrivate: boolean; 
}

function CreateNewGameForm() {
   
    return (
        <div className="game-form">
            <Formik 
            initialValues={{gameName: "", lobbyIsPrivate: false,}}
            onSubmit={async (values) => {
                console.log(values);
                //insert axios post request here later
            }}>
            {({ values }) => (
                <Form>
                    <label className="name-label">Enter a name for your game</label>
                    <Field id="gameName" name="gameName" value={values.gameName}/>
                    <label><Field id="check" type="checkbox" name="lobbyIsPrivate"/>Set table to private</label>
                    <div className="button-div"><button className="create-game" type="submit">Submit</button></div>
                </Form>    
            ) }

            </Formik>
        </div>
        
    )
}; 

export default CreateNewGameForm;



