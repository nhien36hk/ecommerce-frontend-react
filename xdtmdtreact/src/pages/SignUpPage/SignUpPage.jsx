import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../accsets/images/logo-login.png'
import { Divider, Image } from 'antd'; // thêm dòng này

const SignUpPage = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh', width: '100vw'}}>
      <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
      <WrapperContainerLeft>
        <h1>Xin chào</h1>
        <p>Đăng nhập và tạo tài khoản</p>
        <InputForm  style={{marginBottom: '10px'}} placeholder='abc@gmail.com'/>
        <InputForm placeholder='password' style={{marginBottom: '10px'}}/>
        <InputForm placeholder='confirm password'/>
        <ButtonComponent
            bordered={false}
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
            textButton={'Đăng ký'}
          />
        <p>Bạn đã có tài khoản <span><WrapperTextLight>Đăng nhập</WrapperTextLight></span></p>
      </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={imageLogo} preview={false} alt="Image-logo" height="203px" width="203px"></Image>
        <h4>Mua sắm tại LTTD</h4>
      </WrapperContainerRight>
    </div>
    </div>
  )
}

export default SignUpPage