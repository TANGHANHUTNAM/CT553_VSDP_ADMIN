import { useEffect, useState } from "react";
import { IPermissionResponse } from "../interfaces/permission";
import { useAppSelector } from "../hooks";
import { Result } from "antd";

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

  useEffect(() => {
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
  }, [permissions, permission]);

  return (
    <>
      {allow === true || import.meta.env.VITE_ACL_ENABLE === "false" ? (
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
