import { Card, Table, Typography, Button, Row, Col, Modal, Form, Input, InputNumber, Select, Badge } from "antd";
import { useEffect, useState } from "react";
import { createProduct, getAllProducts, Product, updateProduct } from "../api/products";
import { DeleteOutlined, EditOutlined, QuestionOutlined, PlusOutlined } from "@ant-design/icons";
import { getAllSuppliers, OptionSupplier } from "../api/supplier";
import { getAllIvaCategoryOptions, OptionivaCategory } from "../api/ivaCategory";
import { getAllCompanyOptions, OptionCompany } from "../api/company";
import { ColumnType, FilterDropdownProps, Key } from 'antd/es/table/interface';
import { getOffer } from "../api/offer";
const { Title } = Typography;
const { Search } = Input;

export default function ProductDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [suppliers, setSuppliers] = useState<OptionSupplier[]>([]);
    const [IvaCategory, setIvaCategory] = useState<OptionivaCategory[]>([]);
    const [company, setCompany] = useState<OptionCompany[]>([]);
    const [offers, setOffers] = useState<{ [key: number]: boolean }>({});
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
    
    const fetchOffers = async (productId: number) => {
        try {
            const offer = await getOffer(productId);
            setOffers((prev) => ({ ...prev, [productId]: offer !== null }));
        } catch (error) {
            console.error(`Error fetching offer for product ${productId}:`, error);
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

   

    useEffect(() => {
        products.forEach((product) => {
            fetchOffers(product.id);
        });
    }, [products]);

    

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

    const handleCreateOffer = async (id: Product) => {
        try {
          
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

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

    const columns: ColumnType<Product>[] = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text: string) => (
                text ? (
                    <img src={text} alt="Product" style={{ width: '50px', height: '50px' }} />
                ) : (
                    <QuestionOutlined style={{ fontSize: '50px' }} />
                )
            ),
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
                <div style={{ padding: 8 }}>
                    <Search
                        placeholder="Search Product"
                        enterButton
                        onSearch={(value) => {
                            setSelectedKeys(value ? [value] : []);
                            confirm();
                        }}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                </div>
            ),
            onFilter: (value: string | number | boolean | Key, record: Product) =>
                record.name.toLowerCase().includes((value as string).toLowerCase()),
        },
        {
            title: "Price of buy",
            dataIndex: "price_of_buy",
            key: "price_of_buy",
            sorter: (a: Product, b: Product) => a.price_of_buy - b.price_of_buy,

        },
        {
            title: "Price of sell",
            dataIndex: "price_of_sell",
            key: "price_of_sell",
            sorter: (a: Product, b: Product) => a.price_of_sell - b.price_of_sell,
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            sorter: (a: Product, b: Product) => a.stock - b.stock,
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
            title: "Offer Status",
            key: "offerStatus",
            render: (text: string, record: Product) => (
                <>
                    <Badge
                        color={offers[record.id] ? "green" : "red"}
                        text={offers[record.id] ? "Active" : "Inactive"}
                    />
                </>
            ),
        },
        {
            
            title: "",
            key: "Offer",
            render: (text: string, record: Product) => (
                <Button 

                    icon={<PlusOutlined />} 
                    onClick={() => handleCreateOffer(record)} 
                />
            ),
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
