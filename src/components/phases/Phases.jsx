import React,{useEffect, useRef, useState} from 'react'
import './Phases.css';
import {db, firebase} from '../firebase';
import { Link } from 'react-router-dom'
import ExportToXLS from '../ExportToXLS'

function Phases({ setJuryName }) {
    const [name, setName]= useState(null);
    const [group, setGroup] = useState(null);
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        const usr = firebase.auth().currentUser;
        
        const unsubscribe = db.collection("jury").onSnapshot(snapshot => {
            const juryDetails = snapshot.docs.reduce((acc, doc, i) => {
                acc[doc.id] = doc.data();
                console.log("Fetched jury details");
                return acc;
            }, {})
    
            if(juryDetails){
                Object.keys(juryDetails).map(function(key, index) {
                    if(juryDetails[key].number === usr.phoneNumber)
                    {
                        setName(juryDetails[key].name);
                        setPhone(juryDetails[key].number);
                        setGroup(juryDetails[key].group);
                        setJuryName(juryDetails[key].name);
                        console.log("User found in db");
                    } else {
                        console.log("User not in db");
                    }
                });
            }
        })

        return unsubscribe
    }, [])


    return (
        <div className="body__container">
           
            <div className="jury__detail">
                <h3>
                <p>Name: {name?name:"Jury Not in DB"}</p>
                <p>Group: {group}</p>
                <p>Phone: {phone}</p>
                </h3>
            </div>

            {group && group === 'admin' &&  <ExportToXLS />}
            
            <div className="phases__heading">
                <h2>Select the Phase to Evaluate</h2>
            </div>

            <div className="phases__container">
                {/* <p>
                    <Link to="/phases/Requirement" target="_self">Requirement Assessment</Link>
                </p> */}

                <p>
                    <Link to="/phases/DesignCoding" target="_self">Design and Coding Assessment</Link>
                </p>

                {/* <p>
                    <Link to="/phases/Final" target="_self">Final Assessment</Link>
                </p>

                <p>
                    <Link to="/phases/Grand" target="_self">Grand Assessment</Link>
                </p> */}

            </div>
        </div>
    )
}

export default Phases;
