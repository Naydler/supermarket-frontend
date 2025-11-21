// src/components/dashboard/ReportsAndResults.tsx
import { DownloadOutlined, EyeOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Space, Table, Tag, Typography } from "antd";
import React, { useState } from "react";

const { Title } = Typography;
const { Option } = Select;

const ReportsAndResults: React.FC = () => {
    const [filterType, setFilterType] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const data = [
        {
            key: "1",
            name: "Blood Test",
            type: "Laboratory",
            date: "2025-11-05",
            status: "Available",
        },
        {
            key: "2",
            name: "X-Ray Chest",
            type: "Radiology",
            date: "2025-10-28",
            status: "Reviewed",
        },
        {
            key: "3",
            name: "MRI Brain Scan",
            type: "Radiology",
            date: "2025-09-20",
            status: "Pending",
        },
    ];

    const filteredData = data.filter((item) => {
        return (
            (!filterType || item.type === filterType) &&
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    });

    const columns = [
        {
            title: "Report Name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => (
                <span>
                    <FileTextOutlined style={{ marginRight: 8, color: "#1890ff" }} />
                    {text}
                </span>
            ),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type: string) => <Tag color="blue">{type}</Tag>,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const color =
                    status === "Available"
                        ? "green"
                        : status === "Reviewed"
                            ? "blue"
                            : "orange";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: () => (
                <Space>
                    <Button icon={<EyeOutlined />} type="default" size="small">
                        View
                    </Button>
                    <Button icon={<DownloadOutlined />} type="primary" size="small">
                        Download
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={2}>Reports & Results</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8}>
                    <Input
                        placeholder="Search report..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Select
                        placeholder="Filter by type"
                        style={{ width: "100%" }}
                        allowClear
                        onChange={(value) => setFilterType(value)}
                    >
                        <Option value="Laboratory">Laboratory</Option>
                        <Option value="Radiology">Radiology</Option>
                    </Select>
                </Col>
            </Row>

            <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default ReportsAndResults;
