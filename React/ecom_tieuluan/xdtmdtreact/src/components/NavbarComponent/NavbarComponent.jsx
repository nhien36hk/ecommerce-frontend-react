
import React from 'react';
import { WrapperContent, WrapperLableText, WrapperTextValue } from './style';
import { Checkbox, Rate } from 'antd';
const NavbarComponent = () => {
    const onChange = () => { };
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => (
                    <WrapperTextValue key={option}>{option}</WrapperTextValue>
                ));
            // case 'checkbox':
            //     return (
            //         <Checkbox.Group
            //             style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}
            //             onChange={onChange}
            //         >
            //             {options.map((option) => (
            //                 <Checkbox style={{ marginLeft: 0 }} value={option.value} key={option.value}>
            //                     {option.label}
            //                 </Checkbox>
            //             ))}
            //         </Checkbox.Group>
            //     );
            // case 'star':
            //     return (
            //         <div style={{ marginBottom: '8px' }}>
            //             <span>Đánh giá:</span>
            //             {options.map((value) => (
            //                 <div key={value} style={{ marginTop: '4px' }}>
            //                     <Rate disabled defaultValue={value} />
            //                 </div>
            //             ))}
            //         </div>
            //     );
            // case 'price':
            //     return options.map((option) => (
            //         <div key={option} style={{ borderRadius: '10px', backgroundColor: '#ccc' }}>
            //             {option}
            //         </div>
            //     ));
            default:
                return null;
        }
    };
    return (
        <div>
            <WrapperLableText>Label</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Điện tử', 'Mỹ phẩm', 'Thực phẩm'])}
                {renderContent('checkbox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' }
                ])}
            </WrapperContent>
            {/* <WrapperContent>
                {renderContent('star', [3, 4, 5])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', ['Dưới 40.000', 'Từ 50.000 đến 150.000', 'Từ 150.000 đến 450.000', 'Trên 500.000'])}
            </WrapperContent> */}
        </div>
    );
};
export default NavbarComponent;
