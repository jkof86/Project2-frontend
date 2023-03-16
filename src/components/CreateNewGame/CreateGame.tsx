import { on } from "events";
import { Formik, Field, Form, useFormik } from "formik"; 


interface NewGameValues {
    gameName: string; 
    lobbyIsPrivate: boolean; 
}

function CreateNewGameForm() {
   
    return (
        <Formik 
            initialValues={{gameName: "", lobbyIsPrivate: false,}}
            onSubmit={async (values) => {
                console.log(values);
                //insert axios post request here later
            }}>
            {({ values }) => (
                <Form>
                    <label>Enter a name for your game</label>
                    <Field id="gameName" name="gameName" value={values.gameName}/>
                    <label><Field type="checkbox" name="lobbyIsPrivate"/>{`${values.lobbyIsPrivate}`}</label>
                    <button className="create-game" type="submit">Submit</button>
                </Form>    
            ) }

        </Formik>
        
    )
}; 

export default CreateNewGameForm;



