import { Card, Table, Typography, Button, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { getAllProducts, Product } from "../api/products";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Title } = Typography;

const columns = [
    {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Price",
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
        tittle: "",
        key: "action",
            render: (text: string, record: Product) => (
                <Button type="primary">
                    <EditOutlined />
                </Button>
            ),
    },
    {
        title: "",
        key: "action",
        render: (text: string, record: Product) => (
            <Button type="primary" danger>
                <DeleteOutlined />
            </Button>
        ),
    },
];

export default function ProductDashboard() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getAllProducts();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Title level={2}>Product Dashboard</Title>
                </Col>
                <Col>
                    <Button type="primary">
                        Add Product
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={products} rowKey="id" />
        </div>
    );
}
