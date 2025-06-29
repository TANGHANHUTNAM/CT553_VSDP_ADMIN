import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, List, Space, Typography } from "antd";
import parse from "html-react-parser";
import React from "react";
import toast from "react-hot-toast";
import DeleteComponent from "../../components/DeleteComponent";
import {
  IFormResponse,
  IScoringCriteria,
  IScoringSecions,
} from "../../interfaces";
import { deleteScoringCriteriaService } from "../../services/form-scoring-criterias/form-scoring-criteria-service";
import { deleteScoringSectionService } from "../../services/form-scoring-sections/form-scoring-sections-service";
import ModalCreateNewScoringCriteria from "./ModalCreateNewScoringCriteria";
import ModalCreateNewScoringSections from "./ModalCreateNewScoringSections";
import ModalUpdateScoringCriteria from "./ModalUpdateScoringCriteria";
import ModalUpdaeScoringSection from "./ModalUpdateScoringSection";
const { Title, Text } = Typography;

interface ScoringSectionManagementProps {
  formData: IFormResponse;
}

const ScoringSectionManagement: React.FC<ScoringSectionManagementProps> = ({
  formData,
}) => {
  const queryClient = useQueryClient();

  const maxScore = formData?.scoring_sections?.reduce(
    (acc, curr) => acc + curr.max_score,
    0,
  );

  const mutationDeleteScoringSection = useMutation({
    mutationFn: async (sectionId: number) =>
      deleteScoringSectionService(sectionId),
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["scoring-sections", formData.id],
        });
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const mutationDeleteScoringCriteria = useMutation({
    mutationFn: async (criteriaId: number) =>
      deleteScoringCriteriaService(criteriaId),
    onSuccess: (data) => {
      if (data && data.data) {
        toast.success(data.message as string);
        queryClient.invalidateQueries({
          queryKey: ["scoring-sections", formData.id],
        });
      }
      if (data && data.error) {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  return (
    <div className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-screen-xl flex-col space-y-3 rounded-md">
      <Card
        className="py-3"
        title={
          <div className="flex w-full items-center justify-between rounded-md bg-primary px-4 py-2 text-2xl font-semibold text-white">
            <div>Quản lý phần điểm: {formData?.name || "Form Response"}</div>
            <div className="text-xl">Điểm tối đa: {maxScore}</div>
          </div>
        }
      >
        <Space className="w-full justify-between">
          <Title level={4}>Thông tin các phần điểm</Title>
          <ModalCreateNewScoringSections form_id={formData.id} />
        </Space>

        <List
          dataSource={formData?.scoring_sections}
          renderItem={(section: IScoringSecions) => (
            <List.Item>
              <Card
                style={{ width: "100%" }}
                title={
                  <Space className="w-full justify-between">
                    <Text strong className="text-lg">
                      Phần điểm: {section.name} (Điểm tối đa:{" "}
                      {section.max_score})
                    </Text>
                    <Space size={"large"}>
                      <ModalUpdaeScoringSection scoringSection={section} />
                      <DeleteComponent
                        titlePopconfirm={`Xóa ${section.name}`}
                        onConfirm={() =>
                          mutationDeleteScoringSection.mutate(section.id)
                        }
                      />
                      <ModalCreateNewScoringCriteria scoringSection={section} />
                    </Space>
                  </Space>
                }
              >
                <Text>{parse(section.description)}</Text>
                <List
                  size="small"
                  dataSource={section.scoring_criteria}
                  renderItem={(criteria: IScoringCriteria) => (
                    <List.Item
                      actions={[
                        <ModalUpdateScoringCriteria
                          scoringSection={section}
                          criteria={criteria}
                        />,
                        <DeleteComponent
                          titlePopconfirm={`Xóa tiêu chí ${criteria.name}`}
                          onConfirm={() =>
                            mutationDeleteScoringCriteria.mutate(criteria.id)
                          }
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <div className="text-base font-semibold">
                            Tiêu chí: {criteria.name}
                            <span className="ml-2 text-sm font-normal italic">
                              {`(Khoảng điểm: ${criteria.min_score} -
                              ${criteria.max_score} điểm)`}
                            </span>
                          </div>
                        }
                        description={<Text>{parse(criteria.description)}</Text>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ScoringSectionManagement;
