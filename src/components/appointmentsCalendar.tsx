import { Badge, Button, Calendar, Modal, Select, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { useState } from "react";

dayjs.extend(localeData);

const { Title, Text } = Typography;
const { Option } = Select;

const AppointmentsDashboard = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(dayjs().month());
    const [currentYear, setCurrentYear] = useState(dayjs().year());

    // temporal
    const appointments = [
        { date: "2025-11-08", time: "10:00", patient: "John Smith", reason: "General Check-up", status: "Confirmed" },
        { date: "2025-11-08", time: "15:00", patient: "Laura Gomez", reason: "Follow-up", status: "Pending" },
        { date: "2025-11-09", time: "09:30", patient: "Michael Brown", reason: "Blood Test Results", status: "Confirmed" },
        { date: "2025-12-05", time: "11:00", patient: "Anna Lee", reason: "Consultation", status: "Confirmed" },
    ];

    const getListData = (date: Dayjs) =>
        appointments.filter((appt) => dayjs(appt.date).isSame(date, "day"));

    const onDaySelect = (date: Dayjs) => {
        setSelectedDate(date);
        setIsModalVisible(true);
    };

    const prevMonth = () => {
        const newDate = selectedDate.subtract(1, "month");
        setSelectedDate(newDate);
        setCurrentMonth(newDate.month());
        setCurrentYear(newDate.year());
    };

    const nextMonth = () => {
        const newDate = selectedDate.add(1, "month");
        setSelectedDate(newDate);
        setCurrentMonth(newDate.month());
        setCurrentYear(newDate.year());
    };

    const onMonthChange = (month: number) => {
        const newDate = selectedDate.month(month);
        setSelectedDate(newDate);
        setCurrentMonth(month);
    };

    const onYearChange = (year: number) => {
        const newDate = selectedDate.year(year);
        setSelectedDate(newDate);
        const months = dayjs.monthsShort();
    };

    const months = dayjs.months();
    const years = Array.from({ length: 10 }, (_, i) => dayjs().year() - 5 + i);

    const dateCellRender = (value: Dayjs) => {
        const list = getListData(value);
        return (
            <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 10 }}>
                {list.map((item, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Badge status={item.status === "Confirmed" ? "success" : "warning"} />
                        <span>{`${item.time} - ${item.patient}`}</span>
                    </li>
                ))}
            </ul>
        );
    };



    return (
        <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
            <Title level={2}>Calendar</Title>

            {/* Navegación de mes + selectores */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 16,
                }}
            >
                <Button onClick={prevMonth} style={{ cursor: "pointer" }}>
                    &lt;
                </Button>

                <Select value={currentMonth} onChange={onMonthChange} style={{ width: 120 }}>
                    {months.map((m, i) => (
                        <Option key={i} value={i}>
                            {m}
                        </Option>
                    ))}
                </Select>

                <Select value={currentYear} onChange={onYearChange} style={{ width: 100 }}>
                    {years.map((y) => (
                        <Option key={y} value={y}>
                            {y}
                        </Option>
                    ))}
                </Select>

                <Button onClick={nextMonth} style={{ cursor: "pointer" }}>
                    &gt;
                </Button>
            </div>

            <Calendar
                value={selectedDate}
                onSelect={onDaySelect}
                headerRender={() => null}
                cellRender={dateCellRender}
            />

            <Modal open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}
                title={`Appointments on ${selectedDate.format("MMMM D, YYYY")}`}
            >
                {getListData(selectedDate).length > 0 ? (
                    getListData(selectedDate).map((item, index) => (
                        <div key={index} style={{ marginBottom: 8 }}>
                            <Text strong>{item.time}</Text> — {item.patient} ({item.reason}) [{item.status}]
                        </div>
                    ))
                ) : (
                    <Text type="secondary">No appointments scheduled.</Text>
                )}
            </Modal>
        </div>
    );
};

export default AppointmentsDashboard;