import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const Admin: React.FC<AdminProps> = () => {
  const history = useHistory();
  const { id } = useParams(); 

  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value); 
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value); 

  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/chirps/${id}`); 
      let chirp = await res.json();
      setUsername(chirp.username); 
      setMessage(chirp.message); 
    })(); 
  }, [id]); 

  const editChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let res = await fetch(`/api/chirps/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, message })
    });
    if (res.ok) {
      history.push(`/details/${id}`);
    } else {
      console.log("uh oh");
    }
  };

  const deleteChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let res = await fetch(`/api/chirps/${id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      history.push("/"); 
    } else {
      console.log("uh oh");
    }
  };

  return (
    <main className="container">
      <section className="row my-2 justify-content-center">
        <div className="col-md-8">
          <form className="form-group p-3 shadow border rounded">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={handleUsernameChange}
              placeholder="Who goes there?"
              id="username"
              type="text"
              className="form-control"
            />
            <label htmlFor="message">Message</label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              rows={6}
              placeholder="What say you?"
              className="form-control"
              id="message"
            />
            <button
              onClick={editChirp}
              className="btn btn-outline-primary btn-block mt-3 w-50 mx-auto shadow-sm"
            >
              Edit Chirp!
            </button>
            <button
              onClick={deleteChirp}
              className="btn btn-outline-danger btn-block mt-3 w-50 mx-auto shadow-sm"
            >
              Delete Chirp!
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

interface AdminProps {}

export default Admin;