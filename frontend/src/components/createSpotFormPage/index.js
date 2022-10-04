import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as spotActions from "../../store/spots";
import './SpotForm.css'

const States = ["Alaska", "Alabama", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "South Carolina", "Tennessee",
    "Texas", "Utah", "Vermont", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
// I did actually type these all out, don't want to run afoul of copy/paste rules lol
function SpotFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("Alaska");
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState(0)
    const [lng, setLong] = useState(0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const updateState = (e) => setState(e.target.value);

    // this should probably be a dropdown/scroll menu
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState(true)
    useEffect(() => {
        if (validationErrors.length === 0) {
            setDisableSubmit(false)
        } else {
            setDisableSubmit(true)
        }
    }, [validationErrors])
    useEffect(() => {
        const currentErrors = [];
        if (!image.endsWith("png") && !image.endsWith("jpg")) {
            currentErrors.push("Please choose a .jpg or .png file to upload")
        }
        if (description.length<10){
            currentErrors.push("Please add a longer description")
        }
        setValidationErrors(currentErrors);
    }, [image, description])
    if (!sessionUser) return <Redirect to="/" />;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            address, city, state, country, lat, lng, name, description, price
        }

        const spot = await dispatch(spotActions.createSpot(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        if (spot) {
            console.log("SPOT :", spot)
            const picture = await dispatch(spotActions.addSpotPhoto(spot.id, image))
            // console.log(picture)
            history.push(`/spots/${spot.id}`);
        }
    }


    return (
        <div className='notSpotCreatorRoot'>
            <form onSubmit={handleSubmit} className="form">
                <div className="errors">
                    {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                    {
                        validationErrors.map(error => (
                            <div key={error}>{error}</div>
                        ))}
                </div>
                <div className="formItem">
                    Address
                    <label>
                        <input
                            className="inputField"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="formItem">
                    City
                    <label>
                        <input
                            className="inputField"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="formItem">
                    State
                    <label>
                        <select onChange={updateState} value={state} className="inputField">
                            {States.map(state =>
                                <option key={state}>{state}</option>
                            )}
                        </select>
                    </label>
                </div>
                <div className="formItem">
                    Country
                    <label>
                        <input
                            className="inputField"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                    {/* I am not making a dropdown for every country lol */}
                </div>
                <div className="formItem">
                    Latitude
                    <label>
                        <input
                            className="inputField"
                            type="number"
                            step="0.1"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="formItem">
                    Longitude
                    <label>
                        <input
                            className="inputField"
                            type="number"
                            step="0.1"
                            value={lng}
                            onChange={(e) => setLong(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="formItem">
                    Name
                    <label>
                        <input
                            className="inputField"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="formItem">
                    Description
                    <label>
                        <input
                            className="inputField"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="formItem">
                    Price
                    <label>
                        <input
                            className="inputField"
                            type="number"
                            step="0.1"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="formItem">
                    Image url
                    <label>
                        <input
                            className="inputField"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="formItem">
                    <button type="submit" disabled={disableSubmit} className="submitButton">Add spot</button>
                </div>
            </form>
        </div>
    );
}

export default SpotFormPage;
