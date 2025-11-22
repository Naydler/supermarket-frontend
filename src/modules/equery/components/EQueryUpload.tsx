import { FilePdfOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, List, message, Upload } from "antd";
import React, { useState } from "react";

const EQueryUpload: React.FC = () => {
    const [files, setFiles] = useState<any[]>([]);

    const props = {
        beforeUpload: (file: any) => {
            if (file.type !== "application/pdf") {
                message.error("Solo se permiten archivos PDF");
                return Upload.LIST_IGNORE;
            }
            const newFile = {
                uid: file.uid,
                name: file.name,
                size: file.size,
                status: "done",
            };

            setFiles((prev) => [...prev, newFile]);
            message.success(`Archivo ${file.name} añadido correctamente`);
            return false; // Evita subida real
        },
    };

    return (
        <div>
            <h2 style={{ marginBottom: 16 }}>Añadir documentos médicos</h2>
            <Upload {...props} multiple={false} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Subir PDF</Button>
            </Upload>

            <List
                style={{ marginTop: 16 }}
                dataSource={files}
                renderItem={(item) => (
                    <List.Item>
                        <FilePdfOutlined style={{ marginRight: 8, color: "#cf1322" }} />
                        {item.name}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default EQueryUpload;
