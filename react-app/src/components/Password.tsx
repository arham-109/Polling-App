import { Input } from "antd";

export const AntdPass =({ placeholder, onChange }: any) => {
  return (<Input.Password placeholder={placeholder} onChange={onChange}/>);
};
