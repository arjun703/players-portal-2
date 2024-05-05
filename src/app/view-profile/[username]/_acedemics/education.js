import { Paper, Grid, FormControl, Tooltip, InputLabel, TextField, Select, MenuItem, IconButton, Collapse, Divider, Menu } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { TransitionGroup } from 'react-transition-group';
import SchoolIcon from '@mui/icons-material/School';
import { useState, useEffect } from "react";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Graduate } from "next/font/google";
import Button from '@mui/joy/Button';
import dayjs from 'dayjs'; // Import dayjs library
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreActions from "../_components/more_menu_view_profile";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogBox from "../_video/dialog";
import DialogContentText from '@mui/material/DialogContentText';

const educationLevels = [
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Bachelor\'s Degree', value: 'bachelor' },
    { label: 'Master\'s Degree', value: 'master' },
    { label: 'MPhil Degree', value: 'mphil' },
    { label: 'PhD Degree', value: 'phd' }
]

function AddNewOrEditEducationForm({ edu = false, handleCancel, handleSubmit }) {

    let initialEduInfo;

    const [isDisabled, setIsDisabled] = useState(false)

    if (edu) {
        initialEduInfo = edu.info;
    } else {
        initialEduInfo = {
            level: '',
            field_of_study: '',
            institution: '',
            start_date: '',
            end_date: '',
            extra_info: ''
        };
    }

    const [eduInfo, setEduInfo] = useState(initialEduInfo);

    const handleChange = (value, prop) => {
        setEduInfo(prevState => ({
            ...prevState,
            [prop]: value
        }));
    }

    const validateInfo = async () => {
        if (
            (eduInfo.level.trim().length === 0) ||
            (eduInfo.field_of_study.trim().length === 0) ||
            (eduInfo.institution.trim().length === 0) ||
            (eduInfo.start_date.trim().length === 0) ||
            (eduInfo.end_date.trim().length === 0)
        ){
            alert('Fill all fields')
            return
        }
        setIsDisabled(true)
        const result  = await  handleSubmit(eduInfo)
        if(!result){
            setIsDisabled(false)
        }
    }

    const isMobile = window.innerWidth < 500

    return (
        <>
            <Grid container sx={{ alignItems: 'center' }}>
                <Grid item auto onClick={handleCancel}>
                    <Button variant="plain" startDecorator={<ArrowBackIosIcon />}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs>
                    <Divider style={{margin: '0 20px'}}></Divider>
                </Grid>
                <Grid item sx={{ display: isMobile ? 'flex' : 'none' }} auto onClick={validateInfo}>
                    <Button variant="solid" disabled={isDisabled} >
                        {edu ? 'Edit' : 'Add'}
                    </Button>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Level</InputLabel>
                            <Select
                                id="demo-simple-select"
                                labelId="demo-simple-select-label"
                                label="Level"
                                value={eduInfo.level}
                                onChange={(e) => { handleChange(e.target.value, 'level') }}
                            >
                                {educationLevels.map(({ label, value }, i) => (<MenuItem key={i} value={value}>{label}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            <TextField
                                value={eduInfo.field_of_study}
                                onChange={(e) => { handleChange(e.target.value, 'field_of_study') }}
                                label="Field of Study"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            <TextField
                                value={eduInfo.institution}
                                onChange={(e) => { handleChange(e.target.value, 'institution') }}
                                label="Institution" variant="outlined"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            {edu ?
                                <DatePicker
                                    defaultValue={dayjs(eduInfo.start_date)}
                                    onChange={(newValue) => { handleChange(dayjs(newValue.$d).format('YYYY-MM-DD'), 'start_date') }}
                                    label="Start Date"
                                    variant="outlined"
                                />
                                : 
                                <DatePicker
                                    onChange={(newValue) => { handleChange(dayjs(newValue.$d).format('YYYY-MM-DD'), 'start_date') }}
                                    label="Start Date"
                                    variant="outlined"
                                />
                            }
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            {edu ?
                                <DatePicker
                                    defaultValue={dayjs(eduInfo.start_date)}
                                    onChange={(newValue) => { handleChange(dayjs(newValue.$d).format('YYYY-MM-DD'), 'end_date') }}
                                    label="End Date"
                                    variant="outlined"
                                />
                                : 
                                <DatePicker
                                    onChange={(newValue) => { handleChange(dayjs(newValue.$d).format('YYYY-MM-DD'), 'end_date') }}
                                    label="End Date"
                                    variant="outlined"
                                />
                            }
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ padding: '0 10px', marginTop: { xs: 2 } }}>
                        <FormControl fullWidth>
                            <TextField
                                value={eduInfo.extra_info}
                                onChange={(e) => { handleChange(e.target.value, 'extra_info') }}
                                label="Extra Info ( e.g. Grades, scholarships, ... )"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                </LocalizationProvider>
            </Grid>
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                <Button loading={isDisabled}  loadingPosition="start" variant="solid" onClick={validateInfo} startDecorator={<SchoolIcon />}>
                    {edu ? 'Edit Education' : 'Add Education'}
                </Button>
            </div>
        </>
    );
}

export default function Education({isEditable, educations, handleEditEducation, handleAddEducation, handleDeleteEducation }) {

    const [addingNewEducation, setAddingNewEducation] = useState(false)

    const [editingEducation, setEditingEducation] = useState({ isEditing: false, education: false })

    const [deletingEducation, setDeletingEducation] = useState({ isWaitingDeletion: false, education: false })

    const handleInitiateAddNewEducation = () => { setAddingNewEducation(true) }

    const handleInitiateEditEducation = (education) => { setEditingEducation({ isEditing: true, education: education }) }

    const handleInitiateDeleteEducation = (education) =>{setDeletingEducation({isWaitingDeletion: true, education: education})}

    const closeAddNewEducation = () => { setAddingNewEducation(false) }

    const closeEditEducation = () => { setEditingEducation({ isEditing: false, education: false }) }

    const closeDeleteEducation =() => {setDeletingEducation({isWaitingDeletion: false, education: false})}

    const handleAddEducationInner = async (eduInfo) => {
        const result = await handleAddEducation(eduInfo); 
        if(result){
            closeAddNewEducation() 
        }
    }

    const handleEditEducationInner = async (eduInfo) => { 
        const result = await handleEditEducation( {id: editingEducation.education.id, info:  eduInfo})
        if(result){
            closeEditEducation()
            return true
        }else{
            return false
        }
    }

    const handleDeleteEducationInner = async () => { 
        const result = await handleDeleteEducation(deletingEducation.education.id) 
        if(result){
            closeDeleteEducation()
            return true
        }
        return false;
    }

    return (
        <>
            <Paper sx={{ padding: { xs: 1, md: 2 } }}>
                {
                    addingNewEducation
                        ? <AddNewOrEditEducationForm
                            edu={false}
                            handleCancel={closeAddNewEducation}
                            handleSubmit={handleAddEducationInner}
                        />
                        : editingEducation.isEditing
                            ? <AddNewOrEditEducationForm
                                edu={editingEducation.education}
                                handleCancel={closeEditEducation}
                                handleSubmit={handleEditEducationInner}
                            />
                            :
                            <>
                                {educations.length
                                    ? <>
                                        <NonEmptyHeader handleInitiateAddNewEducation={handleInitiateAddNewEducation} />
                                        <Educations 
                                            educations={educations} 
                                            isEditable={isEditable}
                                            editEducation={handleInitiateEditEducation}
                                            deleteEducation={handleInitiateDeleteEducation}
                                        />
                                    </>
                                    : <NoEducationBlock isEditable={isEditable} handleInitiateAddNewEducation={handleInitiateAddNewEducation} />
                                }
                            </>

                }
            </Paper>
            {
                deletingEducation.isWaitingDeletion &&
                (
                    <DialogBox
                        maxWidth='xs' 
                        dialogTitle='Delete Education'
                        dialogContent={<DialogContentText>Are you sure to delete?</DialogContentText>}
                        handleCancel={closeDeleteEducation}
                        handleConfirm={handleDeleteEducationInner}
                    />
                )
            }
        </>
    )
}


function Educations({isEditable,  educations, editEducation, deleteEducation }) {
    const isMobile = window.innerWidth < 500
    return (
        <TransitionGroup >
            <Grid sx={{marginTop: '5px'}}  container spacing={2}>
                {
                    educations.map(({id, info}, index) => {
                        if (typeof info === 'string') {
                            info = JSON.parse(info)
                        }
                        let {level, field_of_study, institution, start_date, end_date, extra_info } = info
                        level = educationLevels.filter(({value}) => level == value)[0]['label']
                        return (
                            
                            <Grid key={index} item xs={12} sm={6} md={4} sx={{position: 'relative', '&:hover .tooltip': {display: 'block'} }} >
                                <div class="grid-inner" style={{position: 'relative'}}>
                                    <Paper sx={{ padding: 1 }} elevation={2}>
                                        <h4 style={{ margin: '5px 0' }}>{field_of_study}</h4>
                                        <i>{level}</i>
                                        <p>{institution}</p>
                                        <i>{start_date} - {end_date}</i>
                                        <p>{extra_info}</p>
                                    </Paper>
                                    {
                                        isEditable ? (

                                        <div className="tooltip-wrapper"  
                                            style={{position:'absolute', display: !isMobile ? 'none': 'block!important',  bottom: '10px', right: '10px'}} 
                                        >
                                            <Tooltip   title="Options">
                                                <MoreActions 
                                                    menuitems={
                                                        [
                                                            {
                                                                label:'Edit Education', 
                                                                icon: <ModeEditIcon variant='small' />,
                                                                handler: ()=>{editEducation({id: id, info: info})}
                                                            },
                                                            {
                                                                label:'Delete Education', 
                                                                icon: <DeleteIcon variant='small' />,
                                                                handler: ()=>{deleteEducation({id: id, info: info})}
                                                            }
                                                        ]
                                                    } 
                                                />
                                            </Tooltip>
                                        </div>
                                        ): (
                                            <></>
                                        )
                                    }
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </TransitionGroup>
    )
}

function NoEducationBlock({isEditable, handleInitiateAddNewEducation }) {
    return (
        <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
            <div>
                <div>
                    <SchoolIcon sx={{ fontSize: '100px' }} />
                </div>
                <div>
                    No any education has been added
                </div>
                {
                    isEditable ? (
                        <Button variant="plain" onClick={handleInitiateAddNewEducation}>
                            ADD NEW
                        </Button>
                    ): (
                        <></>
                    )
                }
            </div>
        </div>
    )
}

function NonEmptyHeader({handleInitiateAddNewEducation}) {
    return (
        <Grid container sx={{ alignItems: 'center' }}>
            <Grid item auto>
                <h3 style={{margin: 0}}>Educations</h3>
            </Grid>
            <Grid item xs>
                <Divider sx={{margin: '0 20px'}} ></Divider>
            </Grid>
            <Grid item>
                <Tooltip onClick={handleInitiateAddNewEducation} title="Add New Education">
                    <IconButton
                        sx={{
                            ':hover': { color: 'blue' }, backgroundColor: 'blue',
                            color: 'white', border: '1px solid blue'
                        }}
                    >
                        <LibraryAddIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}