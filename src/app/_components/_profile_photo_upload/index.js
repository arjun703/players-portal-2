'use client'
import { Modal, Box, Avatar, Divider  } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Button from '@mui/joy/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {pOSTRequest, dELETErequest} from '@/app/_components/file_upload';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

const ProfilePictureModal = ({ existingProfileImageLink, onClose }) => {
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const [ showButtons, setShowButtons] = useState(false); // State to manage showing buttons
  const [media, setMedia]  = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  console.log(existingProfileImageLink) 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file)
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewProfileImage(file);
        setShowButtons(true); // Show buttons once image is selected
      };
      reader.readAsDataURL(file);
    }
  };


  const router = useRouter()

  const handleFileUpload = async () => {
    if(!(!media && caption.trim().length == 0)){
      try{
        setIsUploading(true)
        const formData = new FormData();
        formData.append('profile_photo', media);
        const result = await pOSTRequest(formData, '/api/profile-photo/')
        if(result.success){
          setTimeout(() => {
            location.reload()
          }, 1000);
        }else{
          throw new Error(result.msg);
        }
      }catch(error){
        console.error(error)
        setIsUploading(false)
      }finally{
        
      }
    }
  }
console.log(existingProfileImageLink)


  return (
    <Modal
      open={true} // You need to manage the open state in your parent component
      onClose={()=>{}}
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

        {
          !isUploading ?
              <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ position: 'absolute', fontWeight:'bold', top: 10, right: 10, color: 'grey' }}
          >
              <CloseIcon />
          </IconButton>
          : ''  
      }



        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar sx={{ width: 200, height: 200 }} src={previewImage || existingProfileImageLink} alt="Profile Picture" />
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
              sx={{display: isUploading ? 'none': ''}}
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
            <Button sx={{width: isUploading ? '100%': 'auto'}} onClick={handleFileUpload} variant="solid" loading={isUploading} >
              Confirm
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ProfilePictureModal;
