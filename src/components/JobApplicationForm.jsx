import React, { useState } from 'react';
import './JobApplicationForm.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    email: '',
    phone: '',
    currentAddress: '',
    currentCity: '',
    currentState: '',
    permanentAddress: '',
    permanentCity: '',
    permanentState: '',
    position: '',
    experience: '',
    otherExperience: '',
    education: '',
    otherEducation: '',
    stream: '',
    otherStream: '',
    course: '',
    branch: '',
    otherBranch: '',
    coverLetter: '',
    resume: null,
    availability: '',
    otherAvailability: '',
    expectedSalary: '',
    linkedIn: '',
    portfolio: ''
  });

  const [sameAsPermanent, setSameAsPermanent] = useState(false);

  const [workExperiences, setWorkExperiences] = useState([
    { company: '', jobTitle: '', duration: '', freelancing: '', description: '' }
  ]);

  const [educations, setEducations] = useState([
    { education: '', otherEducation: '', stream: '', otherStream: '', course: '', branch: '', otherBranch: '', schoolName: '', percentage: '', duration: '', passingYear: '' }
  ]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      // Reset branch when education changes
      ...(name === 'education' && { branch: '' })
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSameAsPermanent = (e) => {
    const isChecked = e.target.checked;
    setSameAsPermanent(isChecked);
    
    if (isChecked) {
      setFormData(prevState => ({
        ...prevState,
        currentAddress: prevState.permanentAddress,
        currentCity: prevState.permanentCity,
        currentState: prevState.permanentState
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Please upload a PDF or Word document' }));
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prevState => ({
        ...prevState,
        resume: file
      }));
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index][field] = value;
    setWorkExperiences(updatedExperiences);
    // Clear error for this field
    if (errors[`experience_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`experience_${index}_${field}`]: '' }));
    }
  };

  const addExperience = () => {
    setWorkExperiences([...workExperiences, { company: '', jobTitle: '', duration: '', freelancing: '', description: '' }]);
  };

  const removeExperience = (index) => {
    if (workExperiences.length > 1) {
      const updatedExperiences = workExperiences.filter((_, i) => i !== index);
      setWorkExperiences(updatedExperiences);
      // Clear errors for this experience
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`experience_${index}_`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    // Reset branch and otherBranch when education changes
    if (field === 'education') {
      updatedEducations[index].branch = '';
      updatedEducations[index].otherBranch = '';
    }
    setEducations(updatedEducations);
  };

  const addEducation = () => {
    setEducations([...educations, { education: '', otherEducation: '', stream: '', otherStream: '', course: '', branch: '', otherBranch: '', schoolName: '', percentage: '', duration: '', passingYear: '' }]);
  };

  const removeEducation = (index) => {
    if (educations.length > 1) {
      const updatedEducations = educations.filter((_, i) => i !== index);
      setEducations(updatedEducations);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // All fields are optional now, only validate format if filled
    
    // Email validation - only if provided
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Phone validation - only if provided
    if (formData.phone.trim()) {
      const phoneRegex = /^[0-9]{10,}$/;
      if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number (minimum 10 digits)';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit data
      console.log('Form submitted successfully:', formData);
      console.log('Work Experiences:', workExperiences);
      console.log('Educations:', educations);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          fatherName: '',
          email: '',
          phone: '',
          currentAddress: '',
          currentCity: '',
          currentState: '',
          permanentAddress: '',
          permanentCity: '',
          permanentState: '',
          position: '',
          experience: '',
          otherExperience: '',
          education: '',
          otherEducation: '',
          stream: '',
          otherStream: '',
          course: '',
          branch: '',
          otherBranch: '',
          coverLetter: '',
          resume: null,
          availability: '',
          otherAvailability: '',
          expectedSalary: '',
          linkedIn: '',
          portfolio: ''
        });
        setWorkExperiences([{ company: '', jobTitle: '', duration: '', freelancing: '', description: '' }]);
        setEducations([{ education: '', otherEducation: '', stream: '', otherStream: '', course: '', branch: '', otherBranch: '', schoolName: '', percentage: '', duration: '', passingYear: '' }]);
        setSubmitted(false);
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  if (submitted) {
    return (
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h2>Application Submitted Successfully!</h2>
        <p>Thank you for applying. We'll review your application and get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Job Application Form</h1>
        <p>Please fill out the form to apply for the position</p>
      </div>

      <form onSubmit={handleSubmit} className="job-application-form">
        {/* Personal Information Section */}
        <div className="form-section">
          <h2>Personal Information</h2>
          
          <div className="form-group">
            <label htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="fatherName">
              Father Name
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Father's full name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <h3 style={{ color: '#667eea', fontSize: '18px', marginTop: '20px', marginBottom: '15px' }}>Permanent Address</h3>
          
          <div className="form-group">
            <label htmlFor="permanentAddress">
              Address
            </label>
            <input
              type="text"
              id="permanentAddress"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="Street address, apartment, suite, etc."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="permanentCity">
                City
              </label>
              <input
                type="text"
                id="permanentCity"
                name="permanentCity"
                value={formData.permanentCity}
                onChange={handleChange}
                placeholder="e.g., Pune"
              />
            </div>

            <div className="form-group">
              <label htmlFor="permanentState">
                State
              </label>
              <input
                type="text"
                id="permanentState"
                name="permanentState"
                value={formData.permanentState}
                onChange={handleChange}
                placeholder="e.g., Maharashtra"
              />
            </div>
          </div>

          <h3 style={{ color: '#667eea', fontSize: '18px', marginTop: '20px', marginBottom: '15px' }}>Current Address</h3>
          
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
              <input
                type="checkbox"
                checked={sameAsPermanent}
                onChange={handleSameAsPermanent}
                style={{ marginRight: '8px', cursor: 'pointer', width: '16px', height: '16px' }}
              />
              Same as Permanent Address
            </label>
          </div>
          
          <div className="form-group">
            <label htmlFor="currentAddress">
              Address
            </label>
            <input
              type="text"
              id="currentAddress"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              placeholder="Street address, apartment, suite, etc."
              disabled={sameAsPermanent}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="currentCity">
                City
              </label>
              <input
                type="text"
                id="currentCity"
                name="currentCity"
                value={formData.currentCity}
                onChange={handleChange}
                placeholder="e.g., Mumbai"
                disabled={sameAsPermanent}
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentState">
                State
              </label>
              <input
                type="text"
                id="currentState"
                name="currentState"
                value={formData.currentState}
                onChange={handleChange}
                placeholder="e.g., Maharashtra"
                disabled={sameAsPermanent}
              />
            </div>
          </div>
        </div>

        {/* Education Details Section */}
        <div className="form-section">
          <h2>Education Details</h2>
          <p className="section-description">Add your educational qualifications</p>
          
          {educations.map((edu, index) => (
            <div key={index} className="experience-entry">
              <div className="experience-header">
                <h3>Education {index + 1}</h3>
                {educations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="remove-button"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`education_${index}`}>
                    Highest Education
                  </label>
                  <select
                    id={`education_${index}`}
                    value={edu.education}
                    onChange={(e) => handleEducationChange(index, 'education', e.target.value)}
                  >
                    <option value="">Select education</option>
                    <option value="10th">10th Grade</option>
                    <option value="12th">12th Grade</option>
                    <option value="iti">ITI</option>
                    <option value="diploma">Diploma</option>
                    <option value="btech">B.Tech</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                  {edu.education === 'other' && (
                    <input
                      type="text"
                      value={edu.otherEducation}
                      onChange={(e) => handleEducationChange(index, 'otherEducation', e.target.value)}
                      placeholder="Please specify education"
                      className="other-input"
                    />
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor={`stream_${index}`}>
                    Stream
                  </label>
                  <select
                    id={`stream_${index}`}
                    value={edu.stream}
                    onChange={(e) => handleEducationChange(index, 'stream', e.target.value)}
                  >
                    <option value="">Select stream</option>
                    <option value="science">Science</option>
                    <option value="commerce">Commerce</option>
                    <option value="arts">Arts</option>
                    <option value="engineering">Engineering</option>
                    <option value="medical">Medical</option>
                    <option value="management">Management</option>
                    <option value="law">Law</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="other">Other</option>
                  </select>
                  {edu.stream === 'other' && (
                    <input
                      type="text"
                      value={edu.otherStream}
                      onChange={(e) => handleEducationChange(index, 'otherStream', e.target.value)}
                      placeholder="Please specify stream"
                      className="other-input"
                    />
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor={`course_${index}`}>
                  Course/Specialization
                </label>
                <input
                  type="text"
                  id={`course_${index}`}
                  value={edu.course}
                  onChange={(e) => handleEducationChange(index, 'course', e.target.value)}
                  placeholder="e.g., Computer Engineering, MBA, B.Sc Physics"
                />
              </div>

              {/* Branch Field - Shows only for B.Tech, Diploma, ITI */}
              {(edu.education === 'btech' || edu.education === 'diploma' || edu.education === 'iti') && (
                <div className="form-group">
                  <label htmlFor={`branch_${index}`}>
                    Branch/Trade
                  </label>
                  <select
                    id={`branch_${index}`}
                    value={edu.branch}
                    onChange={(e) => handleEducationChange(index, 'branch', e.target.value)}
                  >
                    <option value="">Select branch</option>
                    {edu.education === 'btech' && (
                      <>
                        <option value="computer-engineering">Computer Engineering</option>
                        <option value="information-technology">Information Technology</option>
                        <option value="electronics-communication">Electronics & Communication</option>
                        <option value="electrical-engineering">Electrical Engineering</option>
                        <option value="mechanical-engineering">Mechanical Engineering</option>
                        <option value="civil-engineering">Civil Engineering</option>
                        <option value="chemical-engineering">Chemical Engineering</option>
                        <option value="biotechnology">Biotechnology</option>
                        <option value="aerospace-engineering">Aerospace Engineering</option>
                        <option value="automobile-engineering">Automobile Engineering</option>
                        <option value="other">Other</option>
                      </>
                    )}
                    {edu.education === 'diploma' && (
                      <>
                        <option value="computer-engineering">Computer Engineering</option>
                        <option value="information-technology">Information Technology</option>
                        <option value="electronics">Electronics</option>
                        <option value="electrical">Electrical</option>
                        <option value="mechanical">Mechanical</option>
                        <option value="civil">Civil</option>
                        <option value="automobile">Automobile</option>
                        <option value="textile">Textile</option>
                        <option value="chemical">Chemical</option>
                        <option value="other">Other</option>
                      </>
                    )}
                    {edu.education === 'iti' && (
                      <>
                        <option value="electrician">Electrician</option>
                        <option value="fitter">Fitter</option>
                        <option value="welder">Welder</option>
                        <option value="turner">Turner</option>
                        <option value="machinist">Machinist</option>
                        <option value="electronics-mechanic">Electronics Mechanic</option>
                        <option value="copa">COPA (Computer Operator & Programming Assistant)</option>
                        <option value="mechanic-motor-vehicle">Mechanic Motor Vehicle</option>
                        <option value="plumber">Plumber</option>
                        <option value="carpenter">Carpenter</option>
                        <option value="draughtsman">Draughtsman (Civil/Mechanical)</option>
                        <option value="other">Other</option>
                      </>
                    )}
                  </select>
                  {edu.branch === 'other' && (
                    <input
                      type="text"
                      value={edu.otherBranch}
                      onChange={(e) => handleEducationChange(index, 'otherBranch', e.target.value)}
                      placeholder="Please specify branch/trade"
                      className="other-input"
                    />
                  )}
                </div>
              )}

              <div className="form-group">
                <label htmlFor={`schoolName_${index}`}>
                  School/College/Institute Name
                </label>
                <input
                  type="text"
                  id={`schoolName_${index}`}
                  value={edu.schoolName}
                  onChange={(e) => handleEducationChange(index, 'schoolName', e.target.value)}
                  placeholder="e.g., ABC College of Engineering"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`percentage_${index}`}>
                    Percentage/CGPA
                  </label>
                  <input
                    type="text"
                    id={`percentage_${index}`}
                    value={edu.percentage}
                    onChange={(e) => handleEducationChange(index, 'percentage', e.target.value)}
                    placeholder="e.g., 85% or 8.5 CGPA"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`passingYear_${index}`}>
                    Passing Year
                  </label>
                  <input
                    type="text"
                    id={`passingYear_${index}`}
                    value={edu.passingYear}
                    onChange={(e) => handleEducationChange(index, 'passingYear', e.target.value)}
                    placeholder="e.g., 2023"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor={`duration_${index}`}>
                  Duration
                </label>
                <input
                  type="text"
                  id={`duration_${index}`}
                  value={edu.duration}
                  onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                  placeholder="e.g., 2019 - 2023 or 4 years"
                />
              </div>
            </div>
          ))}

          <button type="button" onClick={addEducation} className="add-experience-button">
            + Add Another Education
          </button>
        </div>

        {/* Job Details Section */}
        <div className="form-section">
          <h2>Job Details</h2>
          
          <div className="form-group">
            <label htmlFor="position">
              Position Applied For
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., Software Engineer, Marketing Manager"
              className={errors.position ? 'error' : ''}
            />
            {errors.position && <span className="error-message">{errors.position}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experience">
                Years of Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={errors.experience ? 'error' : ''}
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
                <option value="other">Other</option>
              </select>
              {errors.experience && <span className="error-message">{errors.experience}</span>}
              {formData.experience === 'other' && (
                <input
                  type="text"
                  name="otherExperience"
                  value={formData.otherExperience}
                  onChange={handleChange}
                  placeholder="Please specify experience"
                  className="other-input"
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="availability">
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className={errors.availability ? 'error' : ''}
              >
                <option value="">Select availability</option>
                <option value="immediate">Immediate</option>
                <option value="2-weeks">2 Weeks Notice</option>
                <option value="1-month">1 Month Notice</option>
                <option value="2-months">2 Months Notice</option>
                <option value="negotiable">Negotiable</option>
                <option value="other">Other</option>
              </select>
              {errors.availability && <span className="error-message">{errors.availability}</span>}
              {formData.availability === 'other' && (
                <input
                  type="text"
                  name="otherAvailability"
                  value={formData.otherAvailability}
                  onChange={handleChange}
                  placeholder="Please specify availability"
                  className="other-input"
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="expectedSalary">
              Expected Salary (Optional)
            </label>
            <input
              type="text"
              id="expectedSalary"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              placeholder="e.g., $60,000 - $80,000"
            />
          </div>
        </div>

        {/* Work Experience Details Section */}
        <div className="form-section">
          <h2>Work Experience Details</h2>
          <p className="section-description">Add your previous work experience (optional)</p>
          
          {workExperiences.map((exp, index) => (
            <div key={index} className="experience-entry">
              <div className="experience-header">
                <h3>Experience {index + 1}</h3>
                {workExperiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="remove-button"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`company_${index}`}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    id={`company_${index}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    placeholder="e.g., ABC Tech Solutions"
                    className={errors[`experience_${index}_company`] ? 'error' : ''}
                  />
                  {errors[`experience_${index}_company`] && (
                    <span className="error-message">{errors[`experience_${index}_company`]}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor={`jobTitle_${index}`}>
                    Job Title
                  </label>
                  <input
                    type="text"
                    id={`jobTitle_${index}`}
                    value={exp.jobTitle}
                    onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                    placeholder="e.g., Senior Developer"
                    className={errors[`experience_${index}_jobTitle`] ? 'error' : ''}
                  />
                  {errors[`experience_${index}_jobTitle`] && (
                    <span className="error-message">{errors[`experience_${index}_jobTitle`]}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor={`duration_${index}`}>
                  Duration
                </label>
                <input
                  type="text"
                  id={`duration_${index}`}
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                  placeholder="e.g., Jan 2020 - Dec 2022 or 2 years 3 months"
                  className={errors[`experience_${index}_duration`] ? 'error' : ''}
                />
                {errors[`experience_${index}_duration`] && (
                  <span className="error-message">{errors[`experience_${index}_duration`]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor={`freelancing_${index}`}>
                  Freelancing Experience
                </label>
                <select
                  id={`freelancing_${index}`}
                  value={exp.freelancing || ''}
                  onChange={(e) => handleExperienceChange(index, 'freelancing', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor={`description_${index}`}>
                  Job Description & Responsibilities
                </label>
                <textarea
                  id={`description_${index}`}
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  placeholder="Describe your role, responsibilities, and achievements..."
                  rows="4"
                  className={errors[`experience_${index}_description`] ? 'error' : ''}
                />
                {errors[`experience_${index}_description`] && (
                  <span className="error-message">{errors[`experience_${index}_description`]}</span>
                )}
              </div>
            </div>
          ))}

          <button type="button" onClick={addExperience} className="add-experience-button">
            + Add Another Experience
          </button>
        </div>

        {/* Additional Information Section */}
        <div className="form-section">
          <h2>Additional Information</h2>
          
          <div className="form-group">
            <label htmlFor="coverLetter">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Tell us why you're the perfect fit for this position..."
              rows="6"
              className={errors.coverLetter ? 'error' : ''}
            />
            {errors.coverLetter && <span className="error-message">{errors.coverLetter}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="resume">
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className={errors.resume ? 'error' : ''}
            />
            {formData.resume && (
              <span className="file-name">Selected: {formData.resume.name}</span>
            )}
            {errors.resume && <span className="error-message">{errors.resume}</span>}
            <small>Accepted formats: PDF, DOC, DOCX (Max 5MB)</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="linkedIn">
                LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                id="linkedIn"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="form-group">
              <label htmlFor="portfolio">
                Portfolio/Website (Optional)
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
