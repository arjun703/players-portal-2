import React, { useState } from 'react';
import { Modal, Box, Avatar, Divider  } from '@mui/material';
import Button from '@mui/joy/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {pOSTRequest} from '@/app/_components/file_upload';
import toast from "react-hot-toast";

const MediaUploadGeneral = ({ onClose, onSuccess }) => {
  
  const [media, setMedia] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isUploadSuccess, setIsUploadSuccess] = useState(false)
  const handleConfirm = () => {
    // Logic to handle confirmation of the new profile image (newProfileImage)
    onClose();
  };

  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async () => {
    if(media){
      try{
        setIsUploading(true)
        const formData = new FormData();
        formData.append('media', media);
        const result = await pOSTRequest(formData, '/api/general-media-upload/')
        if(result.success){
          setIsUploadSuccess(true)
          toast('Media uploaded successfully');
          onSuccess(result.media_location)
        }else{
          throw new Error(result.msg);
        }
      }catch(error){
        toast(error.message)
      }finally{
        setIsUploading(false)
      }
    }else{
        toast('Please choose media to upload')
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setMedia(selectedFile);
      const name = selectedFile.name;
      const parts = name.split('.');
      const ext = parts.pop();
      const baseName = parts.join('.');

      // Truncate the base name if it's longer than 10 characters
      let displayName = baseName;
      if (baseName.length > 10) {
        displayName = baseName.substring(0, 10) + '...';
      }
      // Combine the truncated base name with the extension
      const truncatedFileName = `${displayName}.${ext}`;
      setFileName(truncatedFileName);
    }
  }

  const handleMediaChangeLinkClick = ()=>{
    setMedia(false)
  }

  if(isUploadSuccess){
    onClose();
  }

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
          width: '90%',
          maxWidth: 500,
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
           {!isUploading && <CloseIcon /> || ''}
        </IconButton>

        {
          !media ? 

            <div style={{marginTop:'20px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', alignItems:'center'}}>
              <Button
                variant="outlined"
                component="label"
                sx={{ marginBottom:'20px'  }}
              >
                Choose Media
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Button>
            </div>
            : 
            <div style={{marginBottom: '20px', marginTop: '20px'}}>
              <span>{fileName}</span> <span  onClick={handleMediaChangeLinkClick} style={{ display: isUploading ?'none': '', marginLeft: '10px', fontStyle:'italic', cursor:'pointer', borderBottom: '1px dotted black', paddingBottom: '2px'}}>Change Media</span>
            </div>
        }
        <Divider></Divider>
        <Button
          variant="solid"
          loading={isUploading}
          onClick={handleFileUpload}
          component="label"
          disabled={!media}
          sx={{ marginTop: '20px', minWidth: '250px'  }}
        >
          Upload
        </Button>
      </Box>
    </Modal>
  );
};

export default MediaUploadGeneral;