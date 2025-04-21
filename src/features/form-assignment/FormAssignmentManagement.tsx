import { useQuery } from "@tanstack/react-query";
import { Card, Tabs, TabsProps } from "antd";
import { useParams } from "react-router-dom";
import { getAllScoringSectionsByFormIdService } from "../../services/form-scoring-sections/form-scoring-sections-service";
import LoadingComponent from "../../components/LoadingComponent";
import SegmentApplicationsBySectionsScore from "./SegmentApplicationsBySectionsScore";
import { useState } from "react";
import { getFormResponsesWithReviewersService } from "../../services";

const FormAssignmentManagement: React.FC = () => {
  const { form_id } = useParams<"form_id">();

  const { data: dataScoringSections, isLoading: isLoadingScoringSections } =
    useQuery({
      queryKey: ["scoring-sections", form_id],
      queryFn: () => getAllScoringSectionsByFormIdService(form_id as string),
      enabled: !!form_id,
    });

  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sectionId, setSectionId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [universityId, setUniversityId] = useState<number | null>(null);
  const [assigned, setAssigned] = useState<boolean | undefined>(undefined);

  const scoringSections = dataScoringSections?.data?.scoring_sections;
  if (scoringSections?.length && !sectionId) {
    setSectionId(scoringSections[0].id);
  }

  const { data: dataDetailResponse, isLoading: isLoadingDetailResponse } =
    useQuery({
      queryKey: [
        "form-response-detail-reviewer",
        form_id,
        current,
        pageSize,
        sectionId,
        searchText,
        universityId,
        assigned,
      ],
      queryFn: () =>
        getFormResponsesWithReviewersService(
          form_id as string,
          sectionId!,
          searchText,
          universityId,
          current,
          pageSize,
          assigned,
        ),
      enabled: !!form_id && !!sectionId,
    });

  const onChange = (key: string) => {
    setCurrent(1);
    setPageSize(10);
    setSectionId(Number(key));
    setSearchText("");
    setUniversityId(null);
  };

  const items: TabsProps["items"] = scoringSections?.map((item) => ({
    key: String(item.id),
    label: item.name,
    children: (
      <SegmentApplicationsBySectionsScore
        sectionId={sectionId}
        current={current}
        pageSize={pageSize}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        data={dataDetailResponse?.data}
        isLoading={isLoadingDetailResponse}
        setSearchText={setSearchText}
        universityId={universityId}
        setUniversityId={setUniversityId}
        assigned={assigned}
        setAssigned={setAssigned}
      />
    ),
  }));

  return (
    <div className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-screen-xl flex-col space-y-3 rounded-md">
      <Card
        className="py-3"
        title={
          <div className="flex w-full items-center justify-between rounded-md bg-primary px-4 py-2 text-2xl font-semibold text-white">
            <div>Phân công hồ sơ</div>
          </div>
        }
      >
        {isLoadingScoringSections ? (
          <LoadingComponent />
        ) : (
          <Tabs
            size="large"
            items={items}
            onChange={onChange}
            activeKey={sectionId?.toString()}
          />
        )}
      </Card>
    </div>
  );
};

export default FormAssignmentManagement;
