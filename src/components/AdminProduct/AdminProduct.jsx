import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import InputComponent from '../../components/InputComponent/InputComponent';
import { getBase64 } from '../../utils.js'
import * as ProductService from '../../service/ProductService.js';
import { useMutationHooks } from '../../hooks/useMutationHook.js'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent.jsx';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModelComponent.jsx';


const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state.user);
    console.log('user Admin Product', user);


    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        countInStock: '',
        type: '',
        discount: '',
    });

    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        countInStock: '',
        type: '',
        discount: '',
    });

    const mutation = useMutationHooks(
        (data) => {
            const { name, price, description, rating, image, countInStock, type, discount } = data
            const res = ProductService.createProduct({ name, price, description, rating, image, countInStock, type, discount });
            return res;
        }
    );

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data
            const res = ProductService.updateProduct(id, token, { ...rests });
            return res;
        }
    );

    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, token } = data;
            const res = ProductService.deleteProduct(id, token);
            return res;
        }
    );

    const { data, isSuccess, isError } = mutation;
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
    useEffect(() => {
        if (isSuccess && data.status === 'OK') {
            message.success()
            handleCancel()
        }
        else if (isError) {
            message.error()
        }
    }, [isSuccess])

    useEffect(() => {
        if (isSuccessDeleted && data.status === 'OK') {
            message.success()
            handleCancel()
        }
        else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDeleted])

    const handleCancel = () => {
        setIsModalOpen(false)
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            countInStock: '',
            type: '',
            discount: '',
        });
        form.resetFields()
    }

    const onFinish = () => {
        mutation.mutate(stateProduct)
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        console.log('Field:', e.target.name, 'Value:', e.target.value);
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        });
    };
    

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }

    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }


    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct();
        return res;
    }

    const { data: products } = useQuery(['products'], getAllProducts);


    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected);
        console.log('res', res.data);

        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                countInStock: res?.data?.countInStock,
                type: res?.data?.type,
                discount: res?.data?.discount,
            })
        }
    }
    console.log('set', stateProductDetails);

    useEffect(() => {
        form.setFieldsValue(stateProductDetails)
    }, [form, stateProductDetails])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected])


    const handleDetailsProduct = () => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected);
        }
        setIsOpenDrawer(true);
        console.log('row', rowSelected);

    }

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        );
    }

    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails })
    }
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success('Cập nhật sản phẩm thành công');
            setIsOpenDrawer(false); // Đóng Drawer sau khi cập nhật thành công
        } else if (isErrorUpdated) {
            message.error('Cập nhật sản phẩm thất bại');
        }
    }, [isSuccessUpdated, isErrorUpdated]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success('Xóa sản phẩm thành công');
            setIsModalOpenDelete(false); // Đóng modal xác nhận xóa
        } else if (isErrorDeleted) {
            message.error('Xóa sản phẩm thất bại');
        }
    }, [isSuccessDeleted, isErrorDeleted]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable = products?.data?.map((product) => {
        return {
            ...product,
            key: product._id
        }
    })

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token })
    }
    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button
                    style={{
                        height: '150px',
                        width: '150px',
                        borderRadius: '6px',
                        borderStyle: 'dashed'
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    }
                }} />
            </div>

            <ModalComponent title="Basic Modal" open={isModalOpen} onCancel={handleCancel} okText=' ' footer={null}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your Type!' }]}
                    >
                        <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
                    </Form.Item>

                    <Form.Item
                        label="Count inStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your Count inStock!' }]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your Price!' }]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your Description!' }]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your Rating!' }]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                    </Form.Item>

                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please input your Discount!' }]}
                    >
                        <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your Image!' }]}
                    >
                        <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button>Select file</Button>

                            {stateProduct?.image && (
                                <img src={stateProduct?.image} style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt="avatar" />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </ModalComponent>


            {/* Khung chi tiết sản phẩm khi update */}
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onUpdateProduct}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your Type!' }]}
                    >
                        <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type" />
                    </Form.Item>

                    <Form.Item
                        label="Count inStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your Count inStock!' }]}
                    >
                        <InputComponent value={stateProductDetails['countInStock']} onChange={handleOnchangeDetails} name="countInStock" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your Price!' }]}
                    >
                        <InputComponent value={stateProductDetails['price']} onChange={handleOnchangeDetails} name="price" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your Description!' }]}
                    >
                        <InputComponent value={stateProductDetails['description']} onChange={handleOnchangeDetails} name="description" />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your Rating!' }]}
                    >
                        <InputComponent value={stateProductDetails['rating']} onChange={handleOnchangeDetails} name="rating" />
                    </Form.Item>

                    
                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{ required: true, message: 'Please input your Discount Product!' }]}
                    >
                        <InputComponent value={stateProductDetails['discount']} onChange={handleOnchangeDetails} name="discount" />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your Image!' }]}
                    >
                        <WrapperUploadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                            <Button>Select file</Button>

                            {stateProductDetails?.image && (
                                <img src={stateProductDetails['image']} style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt="avatar" />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>

            {/* Khung xóa sản phẩm */}
            <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                <div>Bạn có chắc muốn xóa sản phẩm này không?</div>
            </ModalComponent>
        </div>
    );
}

export default AdminProduct