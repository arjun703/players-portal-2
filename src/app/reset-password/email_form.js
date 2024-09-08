import toast from "react-hot-toast"
import validateEmail from "../_components/utils/email-validation"
import { TextField } from "@mui/material"
import { Button } from "@mui/joy"
import { useState } from "react"
import Alert from '@mui/material/Alert';
import { pOSTRequest } from "../_components/file_upload";
import {Stack} from "@mui/material"
import Link from "next/link"

export default function EmailForm(){

    const [email, setEmail]  = useState(true)

    const [emailSent, setEmailSent] = useState(false)

    const [isLoading, setIsLoading]  = useState(false);

    const handleSendCode = async () => {
        if(!validateEmail(email)){
            toast("Enter valid email address")
            return
        }

        try{

            setIsLoading(true)

            const sendCodeResponse = await fetch('/api/reset-password/send-verification-code/?email='+email)

            const sendCodeResponseJson = await sendCodeResponse.json()

            if(!sendCodeResponseJson.success){
                throw new Error(sendCodeResponseJson.msg)
            }

            setEmailSent(true)

            toast('Email sent')

        }catch(error){

            toast(error.message)

        }finally{
            setIsLoading(false)
        }

    }

    const [verificationCode, setVerificationCode]  = useState('')

    const [codeVerified, setCodeVerified]  = useState(false)

    const handleVerificationCodeSubmission = async () => {

        if(verificationCode.trim().length != 6){
            toast('Verification code format wrong')
            return
        }

        const formData = new FormData();
        formData.append('email', email)
        formData.append('code', verificationCode)
        
        try{

            setIsLoading(true)

            const verifyCodeResponseJSON  = await pOSTRequest(formData, '/api/reset-password/verify-code/')

            if(!verifyCodeResponseJSON.success){
                throw new Error(verifyCodeResponseJSON.msg)
            }

            toast('Code verification successful')

            setCodeVerified(true)
            
        }catch(error){
            toast(error.message)
        }finally{
            setIsLoading(false)
        }

    }

    const [newPassword, setNewPassword] = useState('')

    const [resettingPassword, setResettingPassword]  =useState(false)

    const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false)

    const handleSetNewPassword =  async () => {
        if(newPassword.trim().length < 6){
            toast("At least 6 character password is required")
            return
        }
        const formData = new FormData()
        formData.append('email', email)
        formData.append('verificaiton_code' , verificationCode)
        formData.append('new_password', newPassword)

        try{

            setResettingPassword(true)
            const setNewPasswordResponseJSON = await pOSTRequest(formData, '/api/reset-password')
            if(!setNewPasswordResponseJSON.success){
                throw new Error(setNewPasswordResponseJSON.msg)
            }
            setPasswordResetSuccessful(true)
            toast('Password reset successful')

        }catch(error){
            toast(error.message)
        }finally{
            setResettingPassword(false)
        }

    }

    return(
        <Stack spacing={3}>
            {
                emailSent ? (
                    <>
                        {
                            codeVerified ? (
                                <>
                                    {
                                        passwordResetSuccessful ? (
                                            <>
                                                <Alert severity={'success'}>
                                                    Password reset successfully.
                                                </Alert>
                                                <Link href='/login'>
                                                    <Button fullWidth>
                                                        Login
                                                    </Button>
                                                </Link>
                                            </>
                                        ) :(
                                            <>
                                                <Alert severity={'success'}>Code verification successful. Enter new password.</Alert>
                                                <TextField
                                                    label="New Password"
                                                    type="password"
                                                    disabled={resettingPassword}
                                                    onChange = {(e)=>setNewPassword(e.target.value)}
                                                    fullWidth
                                                />
                                                <Button 
                                                    loading={resettingPassword} 
                                                    onClick={handleSetNewPassword}
                                                >
                                                    Set Password
                                                </Button>
                                            </>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <Alert severity="info">An email with a verification code has been sent to {email}. It may take a few minutes to arrive at your inbox. Do not forget to check your spam folder.</Alert>
                                    <TextField
                                        label="Enter code"
                                        type="number"
                                        onChange = {(e)=>setVerificationCode(e.target.value)}
                                        fullWidth
                                    />
                                    <Button
                                        loading={isLoading} 
                                        onClick={handleVerificationCodeSubmission}
                                    >
                                        Verify Code
                                    </Button>
                                </>
                            )
                        }
                    </>
                ): (
                    <>
                        <p>Enter your email to reset password</p>
                        <TextField
                            label="Email"
                            onChange = {(e)=>setEmail(event.target.value)}
                            fullWidth
                        />
                        <Button loading={isLoading} onClick={handleSendCode}>Request verification code</Button>
                    </>
                )
            }
        </Stack>
    )
}