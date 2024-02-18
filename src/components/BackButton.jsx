import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BackButton = () => {
  const navigate = useNavigate(); // used to call getHistory in previous version

  return (
    <Button
      type="back"
      onClick={e => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
