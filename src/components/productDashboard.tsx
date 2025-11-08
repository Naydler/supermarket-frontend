import { CalendarOutlined, MedicineBoxOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Table, Tag, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;
const { TextArea } = Input;

export default function PatientsDashboard() {
    const [isPrescriptionModalVisible, setIsPrescriptionModalVisible] = useState(false);
    const [isVisitModalVisible, setIsVisitModalVisible] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [form] = Form.useForm();

    // Simulación de pacientes asignados al doctor
    const patients = [
        {
            id: 1,
            name: "Laura Gómez",
            age: 29,
            gender: "Female",
            lastVisit: "2025-10-21",
            nextVisit: "2025-11-15",
            condition: "Diabetes Type II",
            status: "Stable",
        },
        {
            id: 2,
            name: "Carlos Ruiz",
            age: 42,
            gender: "Male",
            lastVisit: "2025-10-10",
            nextVisit: "2025-11-20",
            condition: "Hypertension",
            status: "Under Observation",
        },
        {
            id: 3,
            name: "Marta López",
            age: 36,
            gender: "Female",
            lastVisit: "2025-09-28",
            nextVisit: "2025-11-12",
            condition: "Asthma",
            status: "Improving",
        },
    ];

    const columns = [
        { title: "Patient Name", dataIndex: "name", key: "name" },
        { title: "Age", dataIndex: "age", key: "age" },
        { title: "Gender", dataIndex: "gender", key: "gender" },
        { title: "Last Visit", dataIndex: "lastVisit", key: "lastVisit" },
        { title: "Next Visit", dataIndex: "nextVisit", key: "nextVisit" },
        { title: "Condition", dataIndex: "condition", key: "condition" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text: string) => {
                const color =
                    text === "Stable"
                        ? "green"
                        : text === "Improving"
                            ? "blue"
                            : "orange";
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
                <>
                    <Button
                        icon={<MedicineBoxOutlined />}
                        type="primary"
                        style={{ marginRight: 8 }}
                        onClick={() => handleAddPrescription(record)}
                    >
                        Add Prescription
                    </Button>
                    <Button
                        icon={<CalendarOutlined />}
                        onClick={() => handleAddVisit(record)}
                    >
                        Add Visit
                    </Button>
                </>
            ),
        },
    ];

    const handleAddPrescription = (patient: any) => {
        setSelectedPatient(patient);
        form.resetFields();
        setIsPrescriptionModalVisible(true);
    };

    const handleAddVisit = (patient: any) => {
        setSelectedPatient(patient);
        form.resetFields();
        setIsVisitModalVisible(true);
    };

    const handleOkPrescription = () => {
        form.validateFields().then((values) => {
            console.log("New prescription:", { ...values, patient: selectedPatient });
            setIsPrescriptionModalVisible(false);
            // TODO: enviar datos al backend
        });
    };

    const handleOkVisit = () => {
        form.validateFields().then((values) => {
            console.log("New visit:", { ...values, patient: selectedPatient });
            setIsVisitModalVisible(false);
            // TODO: enviar datos al backend
        });
    };

    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Title level={2}>My Patients</Title>
                </Col>
                <Col>
                    <Button type="primary" icon={<PlusOutlined />}>
                        Add New Patient
                    </Button>
                </Col>
            </Row>

            <Card>
                <Table columns={columns} dataSource={patients} rowKey="id" />
            </Card>

            {/* Modal for prescriptions */}
            <Modal
                title={`Add Prescription for ${selectedPatient?.name || ""}`}
                open={isPrescriptionModalVisible}
                onOk={handleOkPrescription}
                onCancel={() => setIsPrescriptionModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="medication"
                        label="Medication"
                        rules={[{ required: true, message: "Please enter the medication" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dosage"
                        label="Dosage"
                        rules={[{ required: true, message: "Please enter the dosage" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="notes" label="Notes">
                        <TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={`Add Visit for ${selectedPatient?.name || ""}`}
                open={isVisitModalVisible}
                onOk={handleOkVisit}
                onCancel={() => setIsVisitModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="date"
                        label="Visit Date"
                        rules={[{ required: true, message: "Please select a date" }]}
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="reason"
                        label="Reason for Visit"
                        rules={[{ required: true, message: "Please enter a reason" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
