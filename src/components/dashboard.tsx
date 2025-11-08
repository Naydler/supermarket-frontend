import { BarChartOutlined, BellOutlined, CalendarOutlined, DashboardOutlined, FileTextOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Card, Col, Input, Layout, List, Menu, Row, Statistic, Table, Typography } from "antd";
import React, { useState } from "react";
import '../../styles.css';
import AnaliticDashboard from "./analiticDashboard";
import CustomerDashboard from "./appointmentsCalendar";
import ProductDashboard from "./productDashboard";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return { key, icon, children, label, } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Dashboard", "1", <DashboardOutlined />),
    getItem("Patients", "2", <UserOutlined />),
    getItem("Appointments", "3", <CalendarOutlined />),
    getItem("Medical Records", "4", <FileTextOutlined />),
    getItem("Tasks & Reminders", "5", <BellOutlined />),
    getItem("Analytics", "6", <BarChartOutlined />),
];




export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuKey, setSelectedMenuKey] = useState("1");

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const products: Product[] = await getAllProducts();
    //             console.log("Fetched Products:", products); // Log de los productos
    //             const totalStock = products.reduce(
    //                 (acc, product) => acc + Number(product.stock),
    //                 0
    //             ); // Convierte stock a número
    //             console.log("Total Stock:", totalStock); // Log del total de stock
    //             setInventoryValue(totalStock);
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //         }
    //     };

    //     fetchProducts();
    // }, []);

    return (
        <Layout style={{ minHeight: "100h", margin: -10 }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <img
                        src="logo.png"
                        alt="Logo"
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setSelectedMenuKey(e.key)}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{
                    background: "#fff",
                    padding: "0 24px",
                    margin: "16px 16px 0 16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}>
                    <Row justify="space-between" align="middle" style={{ height: "100%", padding: "0 24px" }}>
                        <Col>
                            <Input placeholder="Search..." prefix={<SearchOutlined />}
                                style={{ width: 200 }}
                            />
                        </Col>
                        <Col>
                            <Avatar icon={<UserOutlined />} />
                        </Col>
                    </Row>
                </Header>
                <Content style={{
                    margin: "16px",
                    padding: "24px",
                    background: "#fff",
                    minHeight: "calc(100vh - 64px)", // 64px = altura aproximada del Header
                    overflow: "auto",
                }}>
                    <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
                        {selectedMenuKey === "1" && (
                            <>
                                <Title level={2}>Dashboard</Title>
                                <Row gutter={16} style={{ marginBottom: 24 }}>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Appointments Today"
                                                value={12}
                                            // prefix={<DollarOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Patients Waiting"
                                                value={3}
                                                valueStyle={{ color: "#faad14" }}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Appointments Completed"
                                                value={9}
                                                // prefix={<TeamOutlined />}
                                                valueStyle={{ color: "#3f8600" }}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Next Appointment"
                                                value="15:30"
                                                prefix={<UserOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                </Row>

                                <Title level={3}>Upcoming Appointments</Title>
                                <Table
                                    columns={[
                                        { title: "Patient", dataIndex: "patient", key: "patient" },
                                        { title: "Time", dataIndex: "time", key: "time" },
                                        { title: "Reason", dataIndex: "reason", key: "reason" },
                                        { title: "Status", dataIndex: "status", key: "status" },
                                    ]}
                                    dataSource={[
                                        {
                                            key: 1,
                                            patient: "John Smith",
                                            time: "14:00",
                                            reason: "General Consultation",
                                            status: "In Progress",
                                        },
                                        {
                                            key: 2,
                                            patient: "Laura Gomez",
                                            time: "15:30",
                                            reason: "Routine Check-up",
                                            status: "Pending",
                                        },
                                    ]}
                                />

                                <Title level={3} style={{ marginTop: 32 }}>
                                    Recent Notes
                                </Title>
                                <List
                                    dataSource={[
                                        "Update John Smith’s medical record",
                                        "Review Laura Gomez’s lab results",
                                        "Confirm next visit for Peter Ruiz",
                                    ]}
                                    renderItem={(item) => <List.Item>{item}</List.Item>}
                                />
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