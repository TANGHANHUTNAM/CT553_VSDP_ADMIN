import React, { useState } from "react";
import { Card, Tabs, Table, Button, Descriptions, Tag, message } from "antd";
const duLieuGia = {
  form: {
    id: "form-1",
    name: "Học bổng 2025",
    scope: "SCHOLARSHIP",
  },
  scoringSections: [
    {
      id: 1,
      name: "Điểm học tập",
      description: "Đánh giá thành tích học tập",
      max_score: 100,
      form_id: "form-1",
    },
    {
      id: 2,
      name: "Điểm chứng chỉ",
      description: "Đánh giá hoạt động ngoại khóa",
      max_score: 50,
      form_id: "form-1",
    },
  ],
  scoringCriterias: [
    // Cho phần Học tập
    {
      id: 1,
      name: "Điểm GPA",
      max_score: 50,
      min_score: 0,
      scoring_section_id: 1,
    },
    {
      id: 2,
      name: "Giải thưởng",
      max_score: 50,
      min_score: 0,
      scoring_section_id: 1,
    },
    // Cho phần Hoạt động ngoại khóa
    {
      id: 3,
      name: "Vai trò lãnh đạo",
      max_score: 25,
      min_score: 0,
      scoring_section_id: 2,
    },
    {
      id: 4,
      name: "Phục vụ cộng đồng",
      max_score: 25,
      min_score: 0,
      scoring_section_id: 2,
    },
  ],
  users: [
    { id: 1, name: "Người chấm 1", email: "nguoicham1@example.com", roleId: 2 },
    { id: 2, name: "Người chấm 2", email: "nguoicham2@example.com", roleId: 2 },
    { id: 3, name: "Admin", email: "admin@example.com", roleId: 1 },
  ],
  formResponses: [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone_number: "1234567890",
      form_id: "form-1",
      status: "SUBMITTED",
      total_final_score: null,
      snapshot_version: "v1",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone_number: "0987654321",
      form_id: "form-1",
      status: "SUBMITTED",
      total_final_score: null,
      snapshot_version: "v1",
    },
  ],
  responseAssignments: [
    // Cho hồ sơ 1, phần Học tập
    {
      id: 1,
      form_response_id: 1,
      user_id: 1,
      scoring_section_id: 1,
      is_completed: true,
      completed_at: new Date("2025-04-10"),
    },
    {
      id: 2,
      form_response_id: 1,
      user_id: 2,
      scoring_section_id: 1,
      is_completed: false,
      completed_at: null,
    },
    // Cho hồ sơ 1, phần Hoạt động ngoại khóa
    {
      id: 3,
      form_response_id: 1,
      user_id: 2,
      scoring_section_id: 2,
      is_completed: true,
      completed_at: new Date("2025-04-11"),
    },
    // Cho hồ sơ 2, phần Học tập
    {
      id: 4,
      form_response_id: 2,
      user_id: 1,
      scoring_section_id: 1,
      is_completed: true,
      completed_at: new Date("2025-04-09"),
    },
    // Cho hồ sơ 2, phần Hoạt động ngoại khóa
    {
      id: 5,
      form_response_id: 2,
      user_id: 1,
      scoring_section_id: 2,
      is_completed: false,
      completed_at: null,
    },
  ],
  responseScores: [
    // Điểm của Người chấm 1 cho Hồ sơ 1, phần Học tập
    {
      id: 1,
      form_response_id: 1,
      scoring_criteria_id: 1,
      user_id: 1,
      score_value: 45,
      comment: "GPA xuất sắc",
      finalized_by: null,
    },
    {
      id: 2,
      form_response_id: 1,
      scoring_criteria_id: 2,
      user_id: 1,
      score_value: 40,
      comment: "Nhiều giải thưởng",
      finalized_by: null,
    },
    // Điểm của Người chấm 2 cho Hồ sơ 1, phần Học tập (chưa hoàn thành)
    {
      id: 3,
      form_response_id: 1,
      scoring_criteria_id: 1,
      user_id: 2,
      score_value: 0,
      comment: null,
      finalized_by: null,
    },
    // Điểm của Người chấm 2 cho Hồ sơ 1, phần Hoạt động ngoại khóa
    {
      id: 4,
      form_response_id: 1,
      scoring_criteria_id: 3,
      user_id: 2,
      score_value: 20,
      comment: "Lãnh đạo tốt",
      finalized_by: null,
    },
    {
      id: 5,
      form_response_id: 1,
      scoring_criteria_id: 4,
      user_id: 2,
      score_value: 15,
      comment: "Phục vụ cộng đồng trung bình",
      finalized_by: null,
    },
    // Điểm của Người chấm 1 cho Hồ sơ 2, phần Học tập
    {
      id: 6,
      form_response_id: 2,
      scoring_criteria_id: 1,
      user_id: 1,
      score_value: 48,
      comment: "GPA nổi bật",
      finalized_by: null,
    },
    {
      id: 7,
      form_response_id: 2,
      scoring_criteria_id: 2,
      user_id: 1,
      score_value: 42,
      comment: "Một số giải thưởng",
      finalized_by: null,
    },
  ],
  formSnapshots: [
    {
      id: 1,
      form_id: "form-1",
      version: "v1",
      snapshot_json: [],
      created_at: new Date("2025-04-01"),
    },
  ],
};

const { TabPane } = Tabs;

const QuanLyChamDiemChiTiet = () => {
  const [hoSo, setHoSo] = useState(duLieuGia.formResponses);

  // Mô phỏng lưu total_final_score
  const chonDiem = (idHoSo, idNguoiCham, idPhanCham, diemSo) => {
    const tongDiem = diemSo.reduce((tong, diem) => tong + diem.score_value, 0);
    setHoSo((truoc) =>
      truoc.map((hoSo) =>
        hoSo.id === idHoSo ? { ...hoSo, total_final_score: tongDiem } : hoSo,
      ),
    );
    message.success(
      `Đã chọn điểm của Người chấm ${idNguoiCham} cho Hồ sơ ${idHoSo} (Tổng: ${tongDiem})`,
    );
  };

  // Cột cho bảng chính
  const cot = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (trangThai) => (
        <Tag color={trangThai === "SUBMITTED" ? "blue" : "green"}>
          {trangThai === "SUBMITTED" ? "Đã nộp" : trangThai}
        </Tag>
      ),
    },
    {
      title: "Tổng điểm cuối",
      dataIndex: "total_final_score",
      key: "total_final_score",
      render: (diem) => (diem !== null ? diem : "Chưa chốt"),
    },
  ];

  // Hiển thị tab cho từng phần chấm điểm
  return (
    <div className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-screen-xl flex-col space-y-3 rounded-md">
      <Card
        className="py-3"
        title={
          <div className="flex w-full items-center justify-between rounded-md bg-primary px-4 py-2 text-2xl font-semibold text-white">
            <div>Chi tiết điểm hồ sơ</div>
          </div>
        }
      >
        <Tabs defaultActiveKey="1">
          {duLieuGia.scoringSections.map((phan) => (
            <TabPane tab={phan.name} key={phan.id}>
              <Table
                columns={cot}
                dataSource={hoSo}
                rowKey="id"
                expandable={{
                  expandedRowRender: (banGhi) => {
                    // Lấy phân công cho hồ sơ và phần chấm điểm này
                    const phanCong = duLieuGia.responseAssignments.filter(
                      (pc) =>
                        pc.form_response_id === banGhi.id &&
                        pc.scoring_section_id === phan.id,
                    );

                    return (
                      <div className="p-4">
                        <h4>Người chấm được phân công:</h4>
                        {phanCong.length === 0 ? (
                          <p>Chưa có người chấm nào được phân công.</p>
                        ) : (
                          phanCong.map((pc) => {
                            const nguoiCham = duLieuGia.users.find(
                              (user) => user.id === pc.user_id,
                            );
                            const diemSo = duLieuGia.responseScores.filter(
                              (diem) =>
                                diem.form_response_id === banGhi.id &&
                                diem.user_id === pc.user_id &&
                                duLieuGia.scoringCriterias
                                  .filter(
                                    (tc) => tc.scoring_section_id === phan.id,
                                  )
                                  .map((tc) => tc.id)
                                  .includes(diem.scoring_criteria_id),
                            );

                            const tongDiem = diemSo.reduce(
                              (tong, diem) => tong + diem.score_value,
                              0,
                            );

                            return (
                              <Card
                                key={pc.id}
                                style={{ marginBottom: 16 }}
                                title={`Người chấm: ${nguoiCham.name}`}
                              >
                                <Descriptions column={1} bordered>
                                  <Descriptions.Item label="Trạng thái">
                                    {pc.is_completed ? (
                                      <Tag color="green">Hoàn thành</Tag>
                                    ) : (
                                      <Tag color="red">Chưa hoàn thành</Tag>
                                    )}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Thời gian hoàn thành">
                                    {pc.completed_at
                                      ? new Date(
                                          pc.completed_at,
                                        ).toLocaleDateString("vi-VN")
                                      : "N/A"}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Điểm số">
                                    {diemSo.length > 0 ? (
                                      <ul>
                                        {diemSo.map((diem) => {
                                          const tieuChi =
                                            duLieuGia.scoringCriterias.find(
                                              (tc) =>
                                                tc.id ===
                                                diem.scoring_criteria_id,
                                            );
                                          return (
                                            <li key={diem.id}>
                                              {tieuChi.name}: {diem.score_value}{" "}
                                              (
                                              {diem.comment ||
                                                "Không có nhận xét"}
                                              )
                                            </li>
                                          );
                                        })}
                                        <li>
                                          <strong>Tổng: {tongDiem}</strong>
                                        </li>
                                      </ul>
                                    ) : (
                                      "Chưa có điểm số"
                                    )}
                                  </Descriptions.Item>
                                </Descriptions>
                                {pc.is_completed && (
                                  <Button
                                    type="primary"
                                    style={{ marginTop: 16 }}
                                    onClick={() =>
                                      chonDiem(
                                        banGhi.id,
                                        pc.user_id,
                                        phan.id,
                                        diemSo,
                                      )
                                    }
                                    disabled={banGhi.total_final_score !== null}
                                  >
                                    Chọn điểm của người chấm này
                                  </Button>
                                )}
                              </Card>
                            );
                          })
                        )}
                      </div>
                    );
                  },
                }}
              />
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};

export default QuanLyChamDiemChiTiet;
