import { on } from "events";
import { Formik, Field, Form, useFormik } from "formik"; 


interface NewGameValues {
    gameName: string; 
    lobbyIsPrivate: boolean; 
}

function CreateNewGameForm() {
    // const formik = useFormik({
    //     initialValues: {
    //         gameName: "", 
    //         lobbyIsPrivate: false, 
    //     },
    //     onSubmit: values => {
    //         //insert axios post request here later
    //         console.log(values.gameName, values.lobbyIsPrivate);
    //     }
    // }); 

    return (
        //  <form onSubmit={formik.handleSubmit}>
        //     <label>Enter a name for your game</label>
        //     <input id="gameName" name="gameName" onChange={formik.handleChange} value={formik.values.gameName}/>
        //     <label><Field type="checkbox" name="lobbyIsPrivate" value={formik.values.lobbyIsPrivate}/>PRIVATE</label>
        //     <button className="create-game" type="submit">Submit</button>
        // </form>
        <Formik 
            initialValues={{gameName: "", lobbyIsPrivate: false,}}
            onSubmit={async (values) => {
                console.log(values)
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



