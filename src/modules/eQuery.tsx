import { Col, Row } from "antd";
import React from "react";
import EQueryChat from "./equery/components/EQueryChat";
import EQueryTimeline from "./equery/components/EQueryTimeline";
import EQueryUpload from "./equery/components/EQueryUpload";

const EQuery: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <EQueryUpload />
                </Col>

                <Col xs={24} md={12}>
                    <EQueryChat />
                </Col>

                <Col xs={24}>
                    <EQueryTimeline />
                </Col>
            </Row>
        </div>
    );
};

export default EQuery;
