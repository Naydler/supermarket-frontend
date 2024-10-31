import { Card, Table, Typography, Button, Row, Col, Modal, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { createProduct, getAllProducts, Product, updateProduct } from "../api/products";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getAllSuppliers, OptionSupplier } from "../api/supplier";
import { getAllIvaCategoryOptions, OptionivaCategory } from "../api/ivaCategory";
import { getAllCompanyOptions, OptionCompany } from "../api/Company";
const { Title } = Typography;

export default function ProductDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [suppliers, setSuppliers] = useState<OptionSupplier[]>([]);
    const [IvaCategory, setIvaCategory] = useState<OptionivaCategory[]>([]);
    const [company, setCompany] = useState<OptionCompany[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const fetchProducts = async () => {
        try {
            const productsData = await getAllProducts();
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const SuppliersData = await getAllSuppliers();
                setSuppliers(SuppliersData);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };
        fetchSuppliers();
    }, []);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const company = await getAllCompanyOptions();
                setCompany(company);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };
        fetchCompany();
    }, []);
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const IvaCategory = await getAllIvaCategoryOptions();
                setIvaCategory(IvaCategory);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };
        fetchSuppliers();
    }, []);

    

    const handleAddProduct = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        form.setFieldsValue(product);
        setIsModalVisible(true);
    };

    const handleDeleteProduct = async (id: Product) => {
        try {
            await updateProduct(id);
            await fetchProducts(); 
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        try {
            if (editingProduct) {
                await updateProduct({ ...editingProduct, ...values });
            } else {
                 await createProduct(values);

            }
            setIsModalVisible(false);
            await fetchProducts()
        } catch (error) {
            console.error("Error updating/creating product:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            image: "Image",
            dataIndex: "image",
            key: "image",
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price of buy",
            dataIndex: "price_of_buy",
            key: "price_of_buy",
        },
        {
            title: "Price of sell",
            dataIndex: "price_of_sell",
            key: "price_of_sell",
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "EAN",
            dataIndex: "ean",
            key: "ean",
        },
        {
            title: "Supplier",
            dataIndex: "supplier_name",
            key: "supplier_name",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "",
            key: "edit",
            render: (text: string, record: Product) => (
                <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    onClick={() => handleEditProduct(record)} 
                />
            ),
        },
        {
            title: "",
            key: "delete",
            render: (text: string, record: Product) => (
                <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeleteProduct(record)} />
            ),
        },
    ];

    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Title level={2}>Product Dashboard</Title>
                </Col>
                <Col>
                    <Button type="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={products} rowKey="id" />

            <Modal
                title={editingProduct ? "Edit Product" : "Add Product"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please input the product name!' }]}>
                        <Input />
                    </Form.Item>
                    
                    <Form.Item name="price_of_buy" label="Price of buy" rules={[{ required: true, message: 'Please input the price!' }]}>
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item name="price_of_sell" label="Price of sell" rules={[{ required: true, message: 'Please input the price!' }]}>
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item name="stock_warning" label="Stock Warning" rules={[{ required: true, message: 'Please input the stock amount!' }]}>
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item name="stock" label="Stock" rules={[{ required: true, message: 'Please input the stock amount!' }]}>
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item name="image" label="Image" rules={[{ message: 'Please input the image URL!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="ean" label="EAN" rules={[{ required: true, message: 'Please input the EAN!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="id_supplier" label="Supplier" rules={[{ required: true, message: 'Please select the supplier!' }]}>
                        <Select
                            options={suppliers}
                            placeholder="Select Supplier"
                        />
                    </Form.Item>
                    <Form.Item name="iva_category_id" label="IVA Category" rules={[{ required: true, message: 'Please select IVA category!' }]}>
                        <Select
                            options={IvaCategory}
                            placeholder="Select ivaCategory"
                        />
                    </Form.Item>
                    <Form.Item name="id_company" label="Company" rules={[{ required: true, message: 'Please select the company!' }]}>
                        <Select
                            options={company}
                            placeholder="Select Company"
                        />
                    </Form.Item>  
                </Form>
            </Modal>
        </div>
    );
}
