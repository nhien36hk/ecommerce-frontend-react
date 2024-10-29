import React from 'react';
import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style.js';
import Search from 'antd/lib/transfer/search';
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
const HeaderComponent = () => {
  return (
    <div>
        <WrapperHeader gutter={16}>
            <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <WrapperTextHeader>NHOM 3</WrapperTextHeader>
            </Col>
            <Col span={12}>
                <ButtonInputSearch
                size="large"
                bordered={false}
                textButton="Tìm Kiếm"
                placeholder="input search text" />
            </Col>
            <Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        <div>
                            <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
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
