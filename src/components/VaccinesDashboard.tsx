// src/components/dashboard/VaccinesDashboard.tsx
import { CheckCircleOutlined, ClockCircleOutlined, DownloadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Progress, Row, Space, Table, Tag, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

const VaccinesDashboard: React.FC = () => {
    const vaccines = [
        {
            key: "1",
            name: "COVID-19",
            doses: "2 / 2",
            nextDose: "-",
            status: "Completed",
            date: "2023-08-20",
        },
        {
            key: "2",
            name: "Influenza (Flu)",
            doses: "1 / 1",
            nextDose: "2025-11-15",
            status: "Pending",
            date: "2024-11-20",
        },
        {
            key: "3",
            name: "Tetanus Booster",
            doses: "2 / 3",
            nextDose: "2025-12-02",
            status: "Upcoming",
            date: "2024-12-01",
        },
    ];

    const columns = [
        {
            title: "Vaccine",
            dataIndex: "name",
            key: "name",
            render: (text: string) => (
                <span style={{ fontWeight: 500 }}>{text}</span>
            ),
        },
        {
            title: "Doses",
            dataIndex: "doses",
            key: "doses",
        },
        {
            title: "Next Dose",
            dataIndex: "nextDose",
            key: "nextDose",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "blue";
                let icon = <InfoCircleOutlined />;
                if (status === "Completed") {
                    color = "green";
                    icon = <CheckCircleOutlined />;
                } else if (status === "Pending") {
                    color = "orange";
                    icon = <ClockCircleOutlined />;
                }
                return (
                    <Tag color={color} icon={icon}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: "Date of Last Dose",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Actions",
            key: "actions",
            render: () => (
                <Space>
                    <Button type="primary" icon={<DownloadOutlined />} size="small">
                        Certificate
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={2}>Vaccination Record</Title>
            <Text type="secondary">Track your vaccination history and upcoming doses.</Text>

            <Row gutter={16} style={{ marginTop: 24, marginBottom: 16 }}>
                <Col span={8}>
                    <Card>
                        <Text strong>Overall Progress</Text>
                        <Progress percent={70} status="active" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Text strong>Vaccines Completed</Text>
                        <Title level={3} style={{ margin: 0 }}>3</Title>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Text strong>Next Appointment</Text>
                        <Title level={4} style={{ margin: 0 }}>15 Nov 2025</Title>
                    </Card>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={vaccines}
                pagination={{ pageSize: 5 }}
                style={{ marginTop: 16 }}
            />
        </div>
    );
};

export default VaccinesDashboard;
