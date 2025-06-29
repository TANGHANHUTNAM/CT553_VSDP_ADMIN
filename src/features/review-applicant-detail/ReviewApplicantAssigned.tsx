import { Button, Empty, Result, Tabs, Typography } from "antd";
import { Link } from "react-router-dom";
import { ROUTER_URL } from "../../constants/routerIndex";
import { IAssignmentDetails } from "../../interfaces";
import ApplicantInfo from "./ApplicantInfo";
import ResponseSection from "./ResponseSection";
import ScoringSection from "./ScoringSection";
import Access from "../../router/Access";
import { ALL_PERMISSIONS } from "../../constants/permissions";

const { Title } = Typography;

interface ReviewApplicantAssignedProps {
  detailAssignment: IAssignmentDetails;
}

const ReviewApplicantAssigned: React.FC<ReviewApplicantAssignedProps> = ({
  detailAssignment,
}) => {
  const { form_response, scoring_section, id, is_completed } = detailAssignment;

  return (
    <div className="container mx-auto min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
      <Title level={2} className="mb-8 text-gray-800 dark:text-gray-100">
        Chi tiết hồ sơ ứng viên
      </Title>

      {is_completed ? (
        <Result
          status="success"
          title="Hoàn thành!"
          subTitle="Hồ sơ đã được chấm điểm"
          extra={[
            <Button type="primary" key="console">
              <Link to={ROUTER_URL.REVIEW_APPLICATION_PAGE}>
                Quay lại danh sách hồ sơ
              </Link>
            </Button>,
          ]}
        />
      ) : (
        <Tabs
          defaultActiveKey="info"
          className="shadow-sm"
          items={[
            {
              key: "info",
              label: "Thông tin ứng viên",
              children: <ApplicantInfo formResponse={form_response} />,
            },
            {
              key: "response",
              label: "Nội dung hồ sơ",
              children: (
                <div className="space-y-6">
                  {form_response.sections.length > 0 ? (
                    form_response.sections.map((section, index) => (
                      <ResponseSection
                        key={index}
                        section={section}
                        index={index}
                      />
                    ))
                  ) : (
                    <Empty description="Không có nội dung hồ sơ" />
                  )}
                </div>
              ),
            },
            {
              key: "scoring",
              label: "Chấm điểm",
              children: (
                <Access
                  hideChildren={false}
                  permission={
                    ALL_PERMISSIONS.REVIEW_APPLICANT.REVIEW_SCORE_APPLICANT
                  }
                >
                  <ScoringSection
                    scoringSection={scoring_section}
                    assignmentId={id}
                    formResponseId={form_response.id}
                  />
                </Access>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default ReviewApplicantAssigned;
