import React, { useEffect, useState } from "react";
import {
    Layout,
    Menu,
    Input,
    Avatar,
    Card,
    Table,
    Tag,
    Typography,
    Row,
    Col,
    Statistic,
} from "antd";
import {
    DashboardOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    BarChartOutlined,
    SearchOutlined,
    DollarOutlined,
    ShoppingOutlined,
    TeamOutlined,
    InboxOutlined,
    BankOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { getAllProducts, Product } from "../api/products"; 
import ProductDashboard from "./productDashboard";
import CustomerDashboard from "./customerDashboard";
import AnaliticDashboard from "./analiticDashboard";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Dashboard", "1", <DashboardOutlined />),
    getItem("Products", "2", <ShoppingCartOutlined />),
    getItem("Employee", "3", <UserOutlined />),
    getItem("Supplier", "4", <ShoppingOutlined />),
    getItem("Shops", "5", <ShoppingCartOutlined/>),
    getItem("Analytics", "6", <BarChartOutlined />),
];

const columns = [
    {
        title: "Order",
        dataIndex: "order",
        key: "order",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => {
            let color =
                status === "completed"
                    ? "green"
                    : status === "pending"
                        ? "geekblue"
                        : "volcano";
            return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
    },
    {
        title: "Product",
        dataIndex: "product",
        key: "product",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
    },
];

const data = [
    {
        key: "1",
        order: "#001",
        status: "completed",
        customer: "John Doe",
        product: "Product A",
        amount: "$250.00",
    },
    {
        key: "2",
        order: "#002",
        status: "pending",
        customer: "Jane Smith",
        product: "Product B",
        amount: "$150.00",
    },
    {
        key: "3",
        order: "#003",
        status: "cancelled",
        customer: "Bob Johnson",
        product: "Product C",
        amount: "$350.00",
    },
];

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [inventoryValue, setInventoryValue] = useState<number>(0);
    const [selectedMenuKey, setSelectedMenuKey] = useState("1");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products: Product[] = await getAllProducts();
                console.log("Fetched Products:", products); // Log de los productos
                const totalStock = products.reduce(
                    (acc, product) => acc + Number(product.stock),
                    0
                ); // Convierte stock a número
                console.log("Total Stock:", totalStock); // Log del total de stock
                setInventoryValue(totalStock);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: "rgba(255, 255, 255, 0.2)",
                    }}
                />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setSelectedMenuKey(e.key)}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: "#fff" }}>
                    <Row
                        justify="space-between"
                        align="middle"
                        style={{ height: "100%", padding: "0 24px" }}
                    >
                        <Col>
                            <Input
                                placeholder="Search..."
                                prefix={<SearchOutlined />}
                                style={{ width: 200 }}
                            />
                        </Col>
                        <Col>
                            <Avatar icon={<UserOutlined />} />
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                    <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
                        {selectedMenuKey === "1" && (
                            <>
                                <Title level={2}>Dashboard</Title>
                                <Row gutter={16} style={{ marginBottom: 24 }}>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Total Revenue"
                                                value={45231.89}
                                                precision={2}
                                                valueStyle={{ color: "#3f8600" }}
                                                prefix={<DollarOutlined />}
                                                suffix="USD"
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Sales"
                                                value={2350}
                                                valueStyle={{ color: "#cf1322" }}
                                                prefix={<ShoppingOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Active Users"
                                                value={573}
                                                prefix={<TeamOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Inventory"
                                                value={inventoryValue} // Aquí se muestra el valor del inventario
                                                prefix={<InboxOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                                <Title level={3}>Recent Orders</Title>
                                <Table columns={columns} dataSource={data} />
                            </>
                        )}
                        {selectedMenuKey === "2" && <ProductDashboard />} {/* Dashboard de productos */}
                        {selectedMenuKey === "3" && <CustomerDashboard />} {/* Dashboard de productos */}
                        {selectedMenuKey === "6" && <AnaliticDashboard />} {/* Dashboard de productos */}

                        
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}