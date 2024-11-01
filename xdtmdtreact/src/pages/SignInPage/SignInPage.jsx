import React,{ useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../accsets/images/logo-login.png'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { Divider, Image } from 'antd'; // thêm dòng này
import {useNavigate} from 'react-router-dom';
import * as UserService from '../../service/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  );
  const {data, isLoading} = mutation;
  

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  }
  const handleOnChangePassword = (value) => {
    setPassword(value);
  }
  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh', width: '100vw'}}>
      <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
      <WrapperContainerLeft>
        <h1>Xin chào</h1>
        <p>Đăng nhập và tạo tài khoản</p>
        <InputForm  style={{marginBottom: '10px'}} placeholder='abc@gmail.com' value = {email} onChange = {handleOnChangeEmail}  />
        <div style={{ position: 'relative' }}>
          <span 
            onClick={() => setIsShowPassword(!isShowPassword)}
            style={{zIndex: 10,position: 'absolute',top: '9px',right: '8px'}}  
            >{
              isShowPassword ? (
                  <EyeFilled />
              ) : (
                  <EyeInvisibleFilled />
              )}
          </span>
          
          <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value = {password}
              onChange = {handleOnChangePassword}
          />
      </div>

      {data?.status === 'error' && <span style={{color: 'red'}}>{data?.message}</span>}
      <Loading isLoading={isLoading}>
        <ButtonComponent
            disabled = {!email.length || !password.length}
            onClick = {handleSignIn}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              border: 'none',
              height: '48px',
              width: '100%',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            textButton={'Đăng nhập'}
          />
          </Loading>
        <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
        <p>Chưa có tài khoản <span><WrapperTextLight onClick={handleNavigateSignUp} style={{cursor:'pointer'}}>Tạo tài khoản</WrapperTextLight></span></p>
      </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={imageLogo} preview={false} alt="Image-logo" height="203px" width="203px"></Image>
        <h4>Mua sắm tại LTTD</h4>
      </WrapperContainerRight>
    </div>
    </div>
  )
}

export default SignInPage