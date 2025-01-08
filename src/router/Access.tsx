import { Result } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { IPermissionResponse } from "../interfaces/permission";

interface IAccessProps {
  permission: IPermissionResponse;
  children: React.ReactNode;
  hideChildren?: boolean;
}

const Access: React.FC<IAccessProps> = ({
  permission,
  children,
  hideChildren = false,
}) => {
  const [allow, setAllow] = useState<boolean>(false);
  const permissions = useAppSelector((state) => state.user?.user?.permissions);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    setIsChecking(true);
    if (permissions?.length) {
      const check = permissions.find(
        (item: IPermissionResponse) =>
          item.api_path === permission.api_path &&
          item.method === permission.method &&
          item.module === permission.module,
      );
      if (check) {
        setAllow(true);
      } else setAllow(false);
    }
    setIsChecking(false);
  }, [permissions, permission]);

  if (isChecking) {
    return <></>;
  }

  return (
    <>
      {allow === true || import.meta.env.VITE_ACL_ENABLE === "true" ? (
        <>{children}</>
      ) : (
        <>
          {hideChildren === false ? (
            <Result
              status="403"
              title="Truy cập bị từ chối"
              subTitle="Xin lỗi, bạn không có quyền hạn truy cập thông tin này"
            />
          ) : (
            <>{/* render nothing */}</>
          )}
        </>
      )}
    </>
  );
};

export default Access;
