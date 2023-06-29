import React from "react";
import {
  useLoaderData,
  Form,
  useActionData,
  useSubmit,
} from "react-router-dom";
import { database, auth } from "../firebase";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";
import { toast } from "react-toastify";
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
  const arr = data.get("button");
  const array = arr.split(",");

  const surname = data.get("surname") ? data.get("surname") : array[1];
  const name = data.get("name") ? data.get("name") : array[0];
  const adress = data.get("adress") ? data.get("adress") : array[2];

  const email = data.get("email");

  let err = "no error";


  if (email) {
  

    const timeout=setTimeout(()=>{
      return toast.success( () => {
        return <h1>Email changed</h1>;
      },),{autoClose: 1500, position: "top-left"}
    },2000)


    updateEmail(auth.currentUser, email)
      .then((success) => {})
      .catch((error) => {
        clearTimeout(timeout)
        err = error.message
          .replace("Firebase: Error (auth/", " ")
          .replace("-", " ")
          .replace(")", "");

        toast.error(
          () => {
            return <h1>{err}</h1>;
          },
          { autoClose: 1500, position: "top-left" }
        );

        return err;
      })
 .finally (  

 )
  }

  const users = doc(database, "users", auth.currentUser.uid);

  await updateDoc(users, { surname: surname, name: name, adress: adress });
  return "123";
}

export default function Account() {
  const actiondata = useActionData();

  const id = auth.currentUser.uid;

  const submit = useSubmit();
  const data = useLoaderData();
  const filtred = data.filter((each) => {
    const eachdata = each.id;
    return eachdata === id;
  });

  const filtreddata = filtred.map((each) => {
    return { ...each.data(), id: each.id };
  });

  const [name, setname] = React.useState(false);
  const [email, setemail] = React.useState(false);
  const [surname, setsurname] = React.useState(false);
  const [adress, setadress] = React.useState(false);

  const displayedname = filtreddata[0].name
    ? filtreddata[0].name
    : "Add your name";
  const displayedsurname = filtreddata[0].surname
    ? filtreddata[0].surname
    : "Add your surname";
  const displayedadress = filtreddata[0].adress
    ? filtreddata[0].adress
    : "Add your adress";

  return (
    <>
      <Form className="change form" method="post">
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
        <button
          style={{ height: "100px", width: "100px" }}
          type="submit"
          name="button"
          value={[displayedname, displayedsurname, displayedadress]}
        ></button>
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
        <div>{auth.currentUser.email}</div>
        <br></br>
        <div>adress</div>
        <div>{displayedadress}</div>
      </div>
    </>
  );
}
