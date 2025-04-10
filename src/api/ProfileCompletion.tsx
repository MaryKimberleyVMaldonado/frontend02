import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileU.css';
import Swal from 'sweetalert2';

interface ProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  creditScore: number;
}

const ProfileCompletion = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    creditScore: 300
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validatePhoneNumber = (phone: string): boolean => {
    return /^\d{10,11}$/.test(phone);
  };

  const validateDateOfBirth = (dob: string): boolean => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!profileData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (profileData.firstName.length < 2 || profileData.firstName.length > 20) {
      errors.firstName = 'First name must be 2-20 characters';
    }

    if (!profileData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (profileData.lastName.length < 2 || profileData.lastName.length > 20) {
      errors.lastName = 'Last name must be 2-20 characters';
    }

    if (!profileData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(profileData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10-11 digits';
    }

    if (!profileData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else if (!validateDateOfBirth(profileData.dateOfBirth)) {
      errors.dateOfBirth = 'You must be at least 18 years old';
    }

    if (profileData.creditScore < 300 || profileData.creditScore > 850) {
      errors.creditScore = 'Credit score must be between 300-850';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: name === 'creditScore' ? Math.min(850, Math.max(300, parseInt(value) || 300)) : value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form and show errors if invalid
    const isValid = validateForm();
    if (!isValid) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fix the errors in the form',
        icon: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Submitting with token:', token);
      console.log('Request payload:', {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone_number: profileData.phoneNumber,
        date_of_birth: profileData.dateOfBirth,
        credit_score: profileData.creditScore
      });

      const response = await fetch('http://localhost:8080/api/user-profiles/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone_number: profileData.phoneNumber,
          date_of_birth: profileData.dateOfBirth,
          credit_score: profileData.creditScore
        })
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        const errorData = responseText ? JSON.parse(responseText) : {};
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = responseText ? JSON.parse(responseText) : {};
      console.log('Response data:', data);

      await Swal.fire({
        title: 'Success!',
        text: 'Profile completed successfully. Please log in.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate('/login');
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire({
        title: 'Error!',
        text: error instanceof Error ? error.message : 'Failed to save profile',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-completion-container">
      <div className="profile-completion-form">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={profileData.firstName}
              onChange={handleChange}
            />
            {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={profileData.lastName}
              onChange={handleChange}
            />
            {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
          </div>
          
          <div className="form-group">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              value={profileData.phoneNumber}
              onChange={handleChange}
            />
            {formErrors.phoneNumber && <div className="error-message">{formErrors.phoneNumber}</div>}
          </div>
          
          <div className="form-group">
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              required
              value={profileData.dateOfBirth}
              onChange={handleChange}
            />
            {formErrors.dateOfBirth && <div className="error-message">{formErrors.dateOfBirth}</div>}
          </div>
          
          <div className="form-group">
            <input
              type="number"
              name="creditScore"
              placeholder="Credit Score (300-850)"
              min="300"
              max="850"
              required
              value={profileData.creditScore}
              onChange={handleChange}
            />
            {formErrors.creditScore && <div className="error-message">{formErrors.creditScore}</div>}
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCompletion;