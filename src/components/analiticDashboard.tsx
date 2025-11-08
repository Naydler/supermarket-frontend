import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Table, Tag, Typography } from "antd";

const { Title } = Typography;

export default function AnaliticDashboard() {
    // Datos de ejemplo para la tabla
    const analyticsData = [
        { key: 1, name: "Patients Today", value: 12, trend: "up" },
        { key: 2, name: "Pending Appointments", value: 5, trend: "down" },
        { key: 3, name: "Completed Visits", value: 20, trend: "up" },
        { key: 4, name: "New Prescriptions", value: 8, trend: "up" },
    ];

    const columns = [
        { title: "Metric", dataIndex: "name", key: "name" },
        { title: "Value", dataIndex: "value", key: "value" },
        {
            title: "Trend",
            dataIndex: "trend",
            key: "trend",
            render: (trend: string) =>
                trend === "up" ? (
                    <Tag color="green">
                        <ArrowUpOutlined /> Up
                    </Tag>
                ) : (
                    <Tag color="red">
                        <ArrowDownOutlined /> Down
                    </Tag>
                ),
        },
    ];

    return (
        <div>
            <Title level={2}>Analytics Dashboard</Title>

            <Row gutter={16} style={{ marginBottom: 24 }}>
                {analyticsData.map((item) => (
                    <Col span={6} key={item.key}>
                        <Card>
                            <Statistic
                                title={item.name}
                                value={item.value}
                                valueStyle={{ color: item.trend === "up" ? "#3f8600" : "#cf1322" }}
                                prefix={item.trend === "up" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card title="Detailed Metrics">
                <Table columns={columns} dataSource={analyticsData} pagination={false} />
            </Card>
        </div>
    );
}
