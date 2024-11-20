import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../service/UserService.js';
import * as message from '../../components/Message/Message'
import {useMutationHooks} from '../../hooks/useMutationHook.js'
import { updateUser } from '../../redux/slides/userSlide.js'
import { Button, Upload } from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../utils.js'


const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    const mutation = useMutationHooks(
        (data) => {
            const {id,access_token ,...rests} = data
            UserService.updateUser(id,rests,access_token)
        }
      );
      const {data, isLoading ,isSuccess, isError, error} = mutation;

    //   console.log('data', data);
      

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);


    useEffect(() => {
        if(isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token);
        }
        else if (isError) {
            message.error()
        }
    },[isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id,token);
        dispatch(updateUser({...res?.data, access_token: token}));
        // console.log("res",res); 
      }

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }
    const handleOnChangeName = (value) => {
        setName(value);
    }
    const handleOnChangePhone = (value) => {
        setPhone(value);
    }
    const handleOnChangeAddress = (value) => {
        setAddress(value);
    }
    const handleOnChangeAvatar = async ({fileList}) => {
        const file = fileList[0];
        if(!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    
    const handleUpdate = () => {
        console.log("id truyền vào:", user?.id);
        
        UserService.updateUser(user?.id, { email, name, phone, address, avatar }, user?.access_token);
    }
  return (
    <div style={{width: '1270px', margin: '0 auto'}}>
        <WrapperHeader>Thông tin cá nhân </WrapperHeader>
        <WrapperContentProfile>
            <WrapperInput>
                <WrapperLabel htmlFor="email">Email</WrapperLabel>
                <InputForm style = {{width: '300px'}} id = "email" value = {email} onChange = {handleOnChangeEmail}/>
                <ButtonComponent
                    onClick = {handleUpdate}
                    size={40}
                    styleButton={{
                        border: '1px solid rgb(26,148,255)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        margin: '26px 0 10px',
                        padding: '4px 6px'
                    }}
                    styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    textButton={'Cập nhật'}
                />
            </WrapperInput>
            <WrapperInput>
                <WrapperLabel htmlFor="name">Name</WrapperLabel>
                <InputForm style = {{width: '300px'}} id = "name" value = {name} onChange = {handleOnChangeName}/>
                <ButtonComponent
                    onClick = {handleUpdate}
                    size={40}
                    styleButton={{
                        border: '1px solid rgb(26,148,255)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        margin: '26px 0 10px',
                        padding: '4px 6px'
                    }}
                    styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    textButton={'Cập nhật'}
                />
            </WrapperInput>
            <WrapperInput>
                <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                <InputForm style = {{width: '300px'}} id = "phone" value = {phone} onChange = {handleOnChangePhone}/>
                <ButtonComponent
                    onClick = {handleUpdate}
                    size={40}
                    styleButton={{
                        border: '1px solid rgb(26,148,255)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        margin: '26px 0 10px',
                        padding: '4px 6px'
                    }}
                    styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    textButton={'Cập nhật'}
                />
            </WrapperInput>
            <WrapperInput>
                <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
                <InputForm style = {{width: '300px'}} id = "address" value = {address} onChange = {handleOnChangeAddress}/>
                <ButtonComponent
                    onClick = {handleUpdate}
                    size={40}
                    styleButton={{
                        border: '1px solid rgb(26,148,255)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        margin: '26px 0 10px',
                        padding: '4px 6px'
                    }}
                    styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    textButton={'Cập nhật'}
                />
            </WrapperInput>
            <WrapperInput>
                <WrapperLabel htmlFor="phone">Avatar</WrapperLabel>
                <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                    <Button icon = {<UploadOutlined />} >Select file</Button>
                </WrapperUploadFile>
                {avatar && (
                    <img src={avatar} style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }}  alt = "avatar"/>
                )}
                {/* <InputForm style = {{width: '300px'}} id = "phone" value = {avatar} onChange = {handleOnChangeAvatar}/> */}
                <ButtonComponent
                    onClick = {handleUpdate}
                    size={40}
                    styleButton={{
                        border: '1px solid rgb(26,148,255)',
                        height: '30px',
                        width: 'fit-content',
                        borderRadius: '4px',
                        margin: '26px 0 10px',
                        padding: '4px 6px'
                    }}
                    styleTextButton={{ color: 'rgb(26,148,255)', fontSize: '15px', fontWeight: '700' }}
                    textButton={'Cập nhật'}
                />
            </WrapperInput>
        </WrapperContentProfile>
    </div>
  )
}

export default ProfilePage