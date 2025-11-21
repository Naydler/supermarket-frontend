import { BarChartOutlined, BellOutlined, CalendarOutlined, DashboardOutlined, FileTextOutlined, MedicineBoxOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Input, Layout, List, Menu, Row, Statistic, Table, Tag, Typography } from "antd";
import React, { useState } from "react";
import "../../styles.css";
import AppoitmentCalendar from "./appointmentsCalendar";
import ReportsAndResults from "./reportAndResults";
import VaccinesDashboard from "./VaccinesDashboard";


const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

type MenuItem = Required<import("antd").MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode
): MenuItem {
    return { key, icon, label } as MenuItem;
}

const items: MenuItem[] = [
    getItem("My Dashboard", "1", <DashboardOutlined />),
    getItem("Reports & Results", "2", <FileTextOutlined />),
    getItem("Vaccines", "3", <MedicineBoxOutlined />),
    getItem("Medication", "4", <BarChartOutlined />),
    getItem("E-Query", "5", <BellOutlined />),
    getItem("Appointments", "6", <CalendarOutlined />),
    getItem("Diagnoses", "7", <UserOutlined />),
];

export default function PatientDashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuKey, setSelectedMenuKey] = useState("1");

    return (
        <Layout style={{ minHeight: "100vh", margin: -10 }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{ background: "#001529" }}
            >
                <div
                    style={{
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.1)",
                    }}
                >
                    <img
                        src="logo.png"
                        alt="Logo"
                        style={{
                            width: collapsed ? 40 : 120,
                            transition: "width 0.3s",
                        }}
                    />
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedMenuKey]}
                    items={items}
                    onClick={(e) => setSelectedMenuKey(e.key)}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 24px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Input
                                placeholder="Search..."
                                prefix={<SearchOutlined />}
                                style={{ width: 240 }}
                            />
                        </Col>
                        <Col>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </Col>
                    </Row>
                </Header>

                <Content
                    style={{
                        margin: "16px",
                        padding: "24px",
                        background: "#fff",
                        borderRadius: 12,
                        minHeight: "calc(100vh - 64px)",
                        overflow: "auto",
                    }}
                >
                    {selectedMenuKey === "1" && (
                        <>
                            <Title level={2}>Welcome back, Laura</Title>
                            <Text type="secondary">
                                Here’s an overview of your health information.
                            </Text>

                            <Row gutter={16} style={{ marginTop: 24 }}>
                                <Col span={6}>
                                    <Card>
                                        <Statistic title="Next Appointment" value="22 Dec 2025" />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic title="Medications Active" value={3} />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic title="Vaccines Received" value={12} />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="Doctor Messages"
                                            value={"5 news"}
                                            valueStyle={{ color: "#faad14" }}
                                        />
                                    </Card>
                                </Col>
                            </Row>

                            <Title level={3} style={{ marginTop: 32 }}>
                                Recent Reports
                            </Title>
                            <Table
                                pagination={false}
                                columns={[
                                    { title: "Date", dataIndex: "date", key: "date" },
                                    { title: "Type", dataIndex: "type", key: "type" },
                                    {
                                        title: "Status",
                                        dataIndex: "status",
                                        key: "status",
                                        render: (status: string) => (
                                            <Tag
                                                color={
                                                    status === "Available"
                                                        ? "green"
                                                        : status === "Pending"
                                                            ? "orange"
                                                            : "red"
                                                }
                                            >
                                                {status}
                                            </Tag>
                                        ),
                                    },
                                ]}
                                dataSource={[
                                    {
                                        key: 1,
                                        date: "2025-11-05",
                                        type: "Blood Test",
                                        status: "Available",
                                    },
                                    {
                                        key: 2,
                                        date: "2025-10-20",
                                        type: "X-Ray",
                                        status: "Pending",
                                    },
                                ]}
                            />

                            <Title level={3} style={{ marginTop: 32 }}>
                                Health Reminders
                            </Title>
                            <List
                                bordered
                                dataSource={[
                                    "Take vitamin D supplement daily",
                                    "Annual check-up in 2 weeks",
                                    "Renew allergy medication prescription",
                                ]}
                                renderItem={(item) => <List.Item>{item}</List.Item>}
                            />
                        </>
                    )}

                    {selectedMenuKey === "2" && < ReportsAndResults />}
                    {selectedMenuKey === "3" && <VaccinesDashboard />}
                    {selectedMenuKey === "4" && <p>Medication details</p>}
                    {selectedMenuKey === "5" && <p>E-query (messages or questions)</p>}
                    {selectedMenuKey === "6" && <AppoitmentCalendar />}
                    {selectedMenuKey === "7" && <p>Diagnoses and medical history</p>}
                </Content>
            </Layout>
        </Layout>
    );
}
