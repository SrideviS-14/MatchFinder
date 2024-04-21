// BasicInfo.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function BasicInfo({ addBasicData }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [personSkills1, setPersonSkills1] = useState("");
    const [personSkills2, setPersonSkills2] = useState("");
    const navigate = useNavigate();

    const query = async (data) => {
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/marianodo/labels-per-job-title-fine-tune",
                {
                    headers: { Authorization: "Bearer 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" },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error querying Hugging Face API:", error);
            throw error;
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!name || !email || !contact || !jobDescription || !personSkills1 || !personSkills2) {
            alert("All fields necessary!");
        } else {
            try {
                const response = await query({
                    "inputs": {
                        "source_sentence": jobDescription,
                        "sentences": [personSkills1, personSkills2]
                    }
                });
                console.log(response);

                // Extract embeddings from the response and pass them to addBasicData
                const embeddings = response;
                addBasicData(name, email, contact, jobDescription, personSkills1, personSkills2, embeddings);
                
                navigate('/details');
            } catch (error) {
                console.error("Error querying Hugging Face API:", error);
            }
        }
    };

    return (
        <div className="container-fluid qform">
            <div className="col-md-5 m-auto">
                <div className="mt-3">
                    <div className="card text-left h-100">
                        <h1 className="qform-title">MatchFinder</h1>
                        <div className="card-body my-3">
                            <form onSubmit={submit}>
                                <label htmlFor="" className="qform-label">
                                    <h4>Fill in the details below to find how much your soft skills nad technical skills match with the job description </h4>
                                </label>
                                <div className="form-group my-3">
                                    <label htmlFor="" className="qform-label">
                                        <b>1.</b> Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        className='form-control my-2 qform-input'
                                        placeholder='Enter your Name'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="" className="qform-label">
                                        <b>2.</b> Email
                                    </label>
                                    <input
                                        type="email"
                                        name='email'
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        className='form-control my-2 qform-input'
                                        placeholder='Enter your Email'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="" className="qform-label">
                                        <b>3.</b> Contact No.
                                    </label>
                                    <input
                                        type="tel"
                                        name='contact'
                                        value={contact}
                                        onChange={(e) => { setContact(e.target.value) }}
                                        className='form-control my-2 qform-input'
                                        placeholder='Enter your Contact No.'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="" className="qform-label">
                                        <b>4.</b> Job Description
                                    </label>
                                    <input
                                        type="text"
                                        name='jobDescription'
                                        value={jobDescription}
                                        onChange={(e) => { setJobDescription(e.target.value) }}
                                        className='form-control my-2 qform-input'
                                        placeholder='Enter Job Description'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="" className="qform-label">
                                        <b>5.</b> Technical Skills 
                                    </label>
                                    <input
                                        type="text"
                                        name='personSkills1'
                                        value={personSkills1}
                                        onChange={(e) => { setPersonSkills1(e.target.value) }}
                                        className='form-control my-2 qform-input'
                                        placeholder='Enter Person Skills 1'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="" className="qform-label">
                                        <b>6.</b> Soft Skills 
                                    </label>
                                    <input
                                        type="text"
                                        name='personSkills2'
                                        value={personSkills2}
                                        onChange={(e) => { setPersonSkills2(e.target.value) }}
                                        className='form-control my-2 qform-input'
                                        placeholder='Enter Person Skills 2'
                                        autoComplete='off'
                                    />
                                </div>
                                <button type='submit' className='btn btn-success mx-3 qform-btn'>Next</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
