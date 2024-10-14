import React from 'react';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  const location = useLocation();
  const loginType = location.pathname.split('/')[2];

  const styles = {
    container: {
      backgroundColor: '#f2f2f2', // Light grey background color
      padding: '20px',
      borderRadius: '10px',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #ccc', // Border around the form
      borderRadius: '5px', // Border radius
      padding: '20px', // Padding inside the form
      backgroundColor: '#fff', // Background color inside the form
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      width: '20rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    },
    forgotPassword: {
      fontSize: '12px',
      float: 'right',
      marginBottom: '1rem',
      marginLeft: '4rem',
    },
    submitButton: {
      backgroundColor: '#3498db',
      fontSize:'1.02rem',
      color: '#fff',
      borderRadius: '1rem',
      minHeight: '35px',
      minWidth: '6rem',
      cursor: 'pointer',
    },
    register:{
        textDecoration:'none',
        color:'rgb(73, 20, 142)',
        fontWeight:'600'
    }
  };

  const getHeadingAndStyle = () => {
    switch (loginType) {
      case 'student':
        return { heading: 'Student Login' };
      case 'college':
        return { heading: 'College Login' };
      case 'sports':
        return { heading: 'Games / Sports Login' };
      case 'personal':
        return { heading: 'Personal Use Login' };
      default:
        return { heading: 'Login' }; // Default heading and style
    }
  };

  const { heading } = getHeadingAndStyle();

  return (
    <div style={styles.container}>
      <div style={styles.heading}>
        <h1>{heading}</h1>
      </div>
      <form style={styles.form}>
        <h3>Username or Email</h3>
        <input style={styles.input} type="text" placeholder="Email" />
        <h3>Password</h3>
        <input style={styles.input} type="password" placeholder="Password" />
        <p style={styles.forgotPassword}><a href='forgotpassword' style={styles.register}>FORGOT PASSWORD</a></p>
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
      <div>
        <p>
            Don't have an account? <a style={styles.register} href='/register'>Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
