
import React, { useState } from 'react';
import './Register.css'; 
import { Link } from 'react-router-dom';


async function addUser(userId, userName, userPassword, displayName, userImgFile) {
    const response = await fetch('http://localhost:12345/users/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, userName, userPassword, displayName, userImgFile })
    });

    if (response.ok) {
        const newUser = await response.json();
        console.log('User added:', newUser);
    } else {
        console.error('Failed to add user', await response.json());
    }
}

function Register({ users, setUsers}) {
    const [formData, setFormData] = useState({   // hold the current user that register
        userName: '',
        displayName: '',
        password: '',
        confirmPassword: '',
        imageFile: null,
        imagePreview: null
    });
    const [errors, setErrors] = useState({}); //errors state
    const [successMessage, setSuccessMessage] = useState('');


    //function that update the fromData state. fromData holsds the deatils of current user who register now.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // function that update the user's image
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
    
            reader.onloadend = () => {
                // reader.result contains the Base64 encoded string of the file
                const base64String = reader.result;
    
                // Update your form state with the new Base64 string along with other form data
                setFormData({ ...formData, imageFile: file, imagePreview: base64String });
            };
    
            // Read the file as a data URL (Base64 string)
            reader.readAsDataURL(file);
        }
    };
    

    //function who validate password
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    // function add users to state
    const handleSubmit = async (event) => {
        event.preventDefault();  //prevent refreshing the page
    
        let formErrors = {};
    
        if (!validatePassword(formData.password)) {
            formErrors.password = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
        }
    
        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Password and Confirm Password fields do not match.";
        }
    
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setSuccessMessage(''); // clear success message if there are errors
            return;
        }

        const len = users.length;

        // Add the new user to the users array
        const newUser = {
            userId: len,
            userName: formData.userName,
            userPassword: formData.password,
            displayName: formData.displayName,
            userImgFile: formData.imagePreview ? formData.imagePreview : '',
        };
    
        setUsers([...users, newUser]);
    
        // Make POST request to add user
        try {
            const addedUser = await addUser(newUser.userId, newUser.userName, newUser.userPassword, newUser.displayName, newUser.userImgFile);
            console.log('Added User:', addedUser);
            setSuccessMessage('Registration completed successfully'); // set success message
    
            // Clear the form
            setFormData({
                userName: '',
                displayName: '',
                password: '',
                confirmPassword: '',
                imageFile: null,
                imagePreview: null
            });
            setErrors({});
    
        } catch (error) {
            console.error('Failed to add user:', error);
            setErrors({ apiError: 'Failed to register user due to server error.' });
        }
    };
    return (
        <div className="main-div"> 
           <Link to='/login' className="cr-acc btn btn-info login-page-link">Login Page</Link>    
            <div className="card">
                <div className="card-body">
                    Sign in Form
                </div>
            </div>
            <div className="frame">  
                <form onSubmit={handleSubmit}>
                    <div className="form-group row sign-up-field">
                        <label htmlFor="userName" className="col-sm-2 col-form-label">UserName</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="userName"
                                placeholder="UserName"
                                value={formData.userName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row sign-up-field">
                        <label htmlFor="displayName" className="col-sm-2 col-form-label">Display Name</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="displayName"
                                placeholder="The name that display at App"
                                value={formData.displayName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row sign-up-field">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>
                        <div className="valid-feedback d-block">
                            Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and the rest numbers.
                        </div>
                    </div>
                    <div className="form-group row sign-up-field">
                        <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-10">
                            <input 
                                type="password" 
                                className="form-control" 
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                        </div>
                    </div>
                    <div className="form-group row sign-up-field">
                        <label htmlFor="userImage" className="col-sm-2 col-form-label">Upload Image</label>
                        <div className="col-sm-10">
                            <input 
                                type="file" 
                                className="form-control" 
                                id="userImage" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                            {formData.imagePreview && (
                                <div className="preview">
                                    <img src={formData.imagePreview} alt="Preview" className="img-preview" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary sign-in-btn">Sign in</button>
                        </div>
                    </div>
                </form>
                {/*visulation if registerion complete successfuly*/}
                {successMessage && (
                <div className="form-group row">
                    <div className="col-sm-10">
                        <small className="text-success" style={{ color: 'green', fontWeight: 'bold' }}>
                            {successMessage}
                        </small>
                    </div>
                </div>
            )}
            </div>        
        </div>
    );
};

export default Register;
