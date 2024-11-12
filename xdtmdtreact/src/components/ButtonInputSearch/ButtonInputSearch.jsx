import React from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
const ButtonInputSearch = (props) => {
    const { 
        size, 
        placeholder, 
        textButton, 
        bordered, 
        backgroundColorInput = '#fff', 
        backgroundColorButton = 'rgb(13, 92, 182)', 
        colorButton ='#fff' 
    } = props
  return (
    <div style={{ display: 'flex' }}>
        <Input 
        size={size} 
        placeholder={placeholder} 
        style={{ backgroundColor: backgroundColorInput}}
        />
        <ButtonComponent
          size={size} 
          styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }} 
          icon={<SearchOutlined color={colorButton} style={{ color: colorButton}}/>}
          styleTextButton={{color: colorButton}}
          textButton={textButton}
        />
    </div>
  )
}

export default ButtonInputSearch
