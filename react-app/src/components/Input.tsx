import { Input } from "antd";

export const AndInput = ({ placeholder, onChange, className, value }: any) => {
  return (
    <div>
      <Input
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        value={value}
        
      />
    </div>
  );
};
