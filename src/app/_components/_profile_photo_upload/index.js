import React, { useState } from 'react';
import { Modal, Box, Avatar, Divider  } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Button from '@mui/joy/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const ProfilePictureModal = ({ existingProfileImage, onClose }) => {
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(existingProfileImage);
  const [showButtons, setShowButtons] = useState(false); // State to manage showing buttons

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewProfileImage(file);
        setShowButtons(true); // Show buttons once image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    // Logic to handle confirmation of the new profile image (newProfileImage)
    onClose();
  };

  const handleCancel = () => {
    setPreviewImage(existingProfileImage);
    setNewProfileImage(null);
    setShowButtons(false); // Hide buttons on cancel
  };

  return (
    <Modal
      open={true} // You need to manage the open state in your parent component
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >


      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxWidth: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
        }}
      >

        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', fontWeight:'bold', top: 10, right: 10, color: 'grey' }}
        >
            <CloseIcon />
        </IconButton>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar sx={{ width: 200, height: 200 }} src={previewImage} alt="Profile Picture" />
        </Box>
        <Divider></Divider>
        {!showButtons && (
          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCameraIcon />}
            sx={{ marginTop: '20px',  }}
          >
            Change
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Button>
        )}
        {showButtons && (
          <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              component="label"
              startDecorator={<PhotoCameraIcon />}
              onClick={handleFileChange}
            >
              Change
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Button>
            <Button onClick={handleConfirm} variant="solid" >
              Confirm
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ProfilePictureModal;
