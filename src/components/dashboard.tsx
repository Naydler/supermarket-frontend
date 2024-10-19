import React, { useState } from 'react';
import { Layout, Menu, Input, Avatar, Card, Table, Tag, Typography, Row, Col, Statistic } from 'antd';
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
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', '1', <DashboardOutlined />),
    getItem('Products', '2', <ShoppingCartOutlined />),
    getItem('Customers', '3', <UserOutlined />),
    getItem('Analytics', '4', <BarChartOutlined />),
];

const columns = [
    {
        title: 'Order',
        dataIndex: 'order',
        key: 'order',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => {
            let color = status === 'completed' ? 'green' : status === 'pending' ? 'geekblue' : 'volcano';
            return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
    },
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
];

const data = [
    {
        key: '1',
        order: '#001',
        status: 'completed',
        customer: 'John Doe',
        product: 'Product A',
        amount: '$250.00',
    },
    {
        key: '2',
        order: '#002',
        status: 'pending',
        customer: 'Jane Smith',
        product: 'Product B',
        amount: '$150.00',
    },
    {
        key: '3',
        order: '#003',
        status: 'cancelled',
        customer: 'Bob Johnson',
        product: 'Product C',
        amount: '$350.00',
    },
];

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: '#fff' }}>
                    <Row justify="space-between" align="middle" style={{ height: '100%', padding: '0 24px' }}>
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
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                        <Title level={2}>Dashboard</Title>
                        <Row gutter={16} style={{ marginBottom: 24 }}>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Total Revenue"
                                        value={45231.89}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
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
                                        valueStyle={{ color: '#cf1322' }}
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
                                        value={12234}
                                        prefix={<InboxOutlined />}
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Title level={3}>Recent Orders</Title>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}