
// EnteredDetails.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function EnteredDetails(props) {
    const navigate = useNavigate();

    const submit = () => {
        navigate('/thanks');
    };
    // Function to format a percentage value
    const formatPercentage = (value) => {
        return `${(value * 100).toFixed(2)}%`;
    };
    return (
        <div className="container-fluid qform">
            <div className="col-md-5 m-auto">
                <div className="mt-3">
                    <div className="card text-left h-100">
                        <div className="card-body my-3">
                            <h4 className="qform-title">Entered Details</h4>
                            <p><b className="qform-label">Name:</b> {props.data.name}</p>
                            <p><b className="qform-label">Email:</b> {props.data.email}</p>
                            <p><b className="qform-label">Contact No.:</b> {props.data.contact}</p>
                            <h4 className="qform-title">Your match percentage: </h4>
                            <p><b className="qform-label">Result:</b> {props.data.embeddings.map(formatPercentage).join(', ')}</p>
                            <button type="submit" onClick={submit} className="btn btn-success qform-btn">
                                Finish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

