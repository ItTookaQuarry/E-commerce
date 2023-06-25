import React from "react";
import {
  useLoaderData,
  Form,
  useActionData,
  useSubmit,
} from "react-router-dom";
import { database,auth} from "../firebase";
import { getDocs, collection, doc, updateDoc,} from "firebase/firestore";
import { updateProfile} from "firebase/auth";
export function loader() {
  const userscollection = collection(database, "users");
  const getuser = async () => {
    try {
      const data = await getDocs(userscollection);
      return data.docs;
    } catch (error) {
      return error;
    }
  };

  return getuser();
}

export async function action({ request }) {
  const data = await request.formData();

  const name = data.get("name");
  const surname = data.get("surname");
  const email = data.get("email");
  const adress = data.get("adress");
  return { name: name, surname: surname, email: email, adress: adress };
}

export default function Account() {





  
const actiondata=useActionData()
  React.useEffect(() => {
    const time = setTimeout( async()  => {
      updateProfile(auth.currentUser,{
        displayName:actiondata?.email || "123"
      })

    }, 5000);
    return () => clearTimeout(time);
  }, [actiondata]);


console.log(auth.currentUser.displayName)


  const mail = localStorage.getItem("email");
  const submit = useSubmit();
  const data = useLoaderData();
  const filtred = data.filter((each) => {
    const eachdata = each.data();
    return eachdata.email === mail;
  });

  const filtreddata = filtred.map((each) => {
    return { ...each.data(), id: each.id };
  });



  const currentuser = doc(database, "users", filtreddata[0].id);

  const [name, setname] = React.useState(false);
  const [email, setemail] = React.useState(false);
  const [surname, setsurname] = React.useState(false);
  const [adress, setadress] = React.useState(false);

  const displayedemail = filtreddata[0].email
    ? filtreddata[0].email
    : "Add your email adrres";
  const displayedname = filtreddata[0].name
    ? filtreddata[0].name
    : "Add your name";
  const displayedsurname = filtreddata[0].surname
    ? filtreddata[0].surname
    : "Add your surname";
  const displayedadress = filtreddata[0].adress
    ? filtreddata[0].email
    : "Add your adress";

  return (
    <>
      <Form
        className="change form"
        onChange={(event) => {
          {
            submit(event.currentTarget);
          }
        }}
        method="post"
      >
        <h1>Change your account</h1>
        <input
          onMouseEnter={() => {
            setname(true);
          }}
          onMouseLeave={() => {
            setname(false);
          }}
          type="text"
          name="name"
          placeholder="change name"
          style={name ? { border: "1px solid black" } : { border: "none" }}
        />

        <input
          onMouseEnter={() => {
            setsurname(true);
          }}
          onMouseLeave={() => {
            setsurname(false);
          }}
          type="text"
          name="surname"
          placeholder="change surname"
          style={surname ? { border: "1px solid black" } : { border: "none" }}
        />
        <input
          onMouseEnter={() => {
            setemail(true);
          }}
          onMouseLeave={() => {
            setemail(false);
          }}
          type="text"
          name="email"
          placeholder="change email"
          style={email ? { border: "1px solid black" } : { border: "none" }}
        />

        <input
          onMouseEnter={() => {
            setadress(true);
          }}
          onMouseLeave={() => {
            setadress(false);
          }}
          type="text"
          name="adress"
          placeholder="change adress"
          style={adress ? { border: "1px solid black" } : { border: "none" }}
        />
      </Form>

      <div className="account">
        <h1>Your Account:</h1>
        <br></br>
        <div>name:</div>
        <div>{displayedname}</div>
        <br></br>
        surname:
        <div>{displayedsurname}</div>
        <br></br>
        <div>email:</div>
        <div>{displayedemail}</div>
        <br></br>
        <div>adress</div>
        <div>{displayedadress}</div>
      </div>
    </>
  );
}
