import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

const BicycleSelect = ({ options }: { options: object[] }) => {
  const navigate = useNavigate();
  return (
    <ul className="h-full w-full ">
      <li className="flex gap-1 w-full cursor-pointer rounded h-8 border-2 items-center">
        <p className="px-2 font-bold border-r-2 w-24">Qr Code</p>
        <p className="font-bold px-2">Number</p>
      </li>
      {options?.map((bicycle: any) => (
        <li
          className="flex gap-1 hover:bg-gray-200 w-full cursor-pointer items-center rounded h-8 py-1"
          onClick={() => navigate(`/bikes-status/${bicycle.id}`)}
        >
          <p className="px-2 font-bold border-r-2 w-24 h-full">
            <Paragraph copyable className="font-bold">
              {bicycle.qrCode}
            </Paragraph>
          </p>
          <p className="font-bold px-2">{bicycle.number}</p>
        </li>
      ))}
    </ul>
  );
};

export default BicycleSelect;
