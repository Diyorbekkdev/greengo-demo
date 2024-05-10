import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import dayjs from "dayjs";
interface IStationCard {
  id: number;
  name: string;
  longitude: string;
  latitude: string;
  createdAt: string;
  flyToRegion: (el: string) => void;
  handleDelete: (id: number) => void;
  onClose: () => void;
}
const StationCard = ({
  id,
  name,
  longitude,
  latitude,
  createdAt,
  handleDelete,
  onClose,
  flyToRegion,
}: IStationCard) => {
  return (
    <Card
      onClick={() => {
        flyToRegion(longitude + "," + latitude);
        onClose();
      }}
      className="w-full shadow-md mt-2 hover:shadow-lg cursor-pointer"
      actions={[
        <DeleteOutlined
          key="setting"
          onClick={(event: any) => {
            event.stopPropagation();
            handleDelete(id);
          }}
        />,
        // <EditOutlined key="edit" />,
      ]}
    >
      <h3 className="text-lg">{name}</h3>
      <div className="flex items-center  justify-between mt-4">
        <span className="font-semibold">Cordinates:</span>
        <span className="text-blue">
          {longitude}, {latitude}
        </span>
      </div>
      <div className="flex items-center  justify-between mt-4">
        <span className="font-semibold">Created At:</span>
        <span className="text-dark-blue italic">
          {dayjs(createdAt).format("YYYY-MM-DD, HH:mm")}
        </span>
      </div>
    </Card>
  );
};

export default StationCard;
