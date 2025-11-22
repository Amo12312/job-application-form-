# Job Application Form

A professional React-based job application form for collecting applicant details, built with Vite.

## Features

- ✅ Comprehensive form fields for applicant information
- ✅ Real-time form validation
- ✅ File upload for resumes (PDF, DOC, DOCX)
- ✅ Responsive design for all devices
- ✅ Beautiful gradient UI with smooth animations
- ✅ Success message on submission
- ⚡ Lightning fast development with Vite

## Form Fields

### Personal Information
- Full Name (required)
- Email Address (required)
- Phone Number (required)

### Job Details
- Position Applied For (required)
- Years of Experience (required)
- Highest Education (required)
- Availability (required)
- Expected Salary (optional)

### Additional Information
- Cover Letter (required, minimum 50 characters)
- Resume Upload (required, PDF/DOC/DOCX, max 5MB)
- LinkedIn Profile (optional)
- Portfolio/Website (optional)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm run dev` - Runs the app in development mode with Vite
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally

## Technologies Used

- React 18.2.0
- Vite 5.0.8
- CSS3 with modern features
- Form validation
- File handling

## Customization

You can customize the form by modifying:
- `src/components/JobApplicationForm.jsx` - Form logic and fields
- `src/components/JobApplicationForm.css` - Styling and colors
- Form validation rules in the `validateForm` function

## Browser Support

Works on all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
