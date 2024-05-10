import { Button, Select } from "antd";
import { ReactNode } from "react";
import { useRouterQuery } from "@/hooks";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
const { Search } = Input;
interface IHeader {
  title: string;
  buttonText?: string;
  onAdd?: () => void;
  icon?: ReactNode;
  type: "primary" | "default" | "dashed" | "link" | "text" | undefined;
  isSelect?: boolean;
  options?: any[];
  isLoading?: boolean;
  isButton?: boolean;
  placeholder?: string;
  filterType?: string;
  isSearch?: boolean;
  isSearchType?: any;
}

export const Header = (props: IHeader) => {
  const {
    title,
    isSearch,
    isSearchType,
    isSelect,
    options,
    isLoading,
    buttonText,
    type,
    icon,
    placeholder,
    // filterType = <PlusCircleOutlined />,
    onAdd,
    isButton = true,
  } = props;
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
  const onSearch: SearchProps["onSearch"] = (value) => {
    SetRouterQuery({
      ...GetRouterQuery,
      [isSearchType ? isSearchType : "name"]: value,
    });
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onSearch(event.currentTarget.value);
  };
  return (
    <div className="flex items-center justify-between shadow-lg p-4 rounded-md">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        {isSearch && (
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            onKeyUp={onKeyUp}
            style={{ width: 304 }}
          />
        )}
        {isSelect && (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={placeholder}
            optionFilterProp="children"
            allowClear
            loading={isLoading}
            onChange={(value) => {
              if (value) {
                SetRouterQuery({ ...GetRouterQuery, paramId: value });
              } else {
                SetRouterQuery({
                  ...GetRouterQuery,
                  paramId: "",
                });
              }
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={options || []}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          />
        )}

        {isButton && (
          <Button onClick={onAdd} icon={icon} type={type}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};
