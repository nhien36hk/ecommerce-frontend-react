import React from 'react';
import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style.js';
import Search from 'antd/lib/transfer/search';
import {useNavigate} from 'react-router-dom';
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useSelector } from 'react-redux';
const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user )

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    console.log("user", user);
    
  return (
    <div style={{width: '100%', background: 'rgb(26,248,255)',justifyContent: 'center'}}>
        <WrapperHeader gutter={16}>
            <Col span={5} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <WrapperTextHeader>NHOM 3</WrapperTextHeader>
            </Col>
            <Col span={13}>
                <ButtonInputSearch
                size="large"
                textButton="Tìm Kiếm"
                placeholder="input search text" />
            </Col>
            <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: '30px' }} />
{user?.name ? (
    <div style={{cursor:'pointer'}}>{user.name}</div>
) : (
<div onClick={handleNavigateLogin} style={{cursor:'pointer'}}>
                            <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
)}

                        
                    </WrapperHeaderAccount>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Badge count = {4} size='small'>
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>

                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                    </div>
                </div>
            </Col>
        </WrapperHeader>
    </div>
  );
}

export default HeaderComponent;
